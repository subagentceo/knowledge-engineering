"""
Tests for ollama/contract.py — the durability invariant for local Ollama over Tailscale.

@cite https://github.com/subagentceo/knowledge-engineering/issues/522
@cite ollama/contract.py
"""
from __future__ import annotations

import pytest
from pydantic import ValidationError

from contract import OllamaTailscaleContract


# ── Fixtures ──────────────────────────────────────────────────────────────────

DURABLE_KWARGS: dict = {
    "tailscale_ip": "100.112.152.5",
    "port": 11434,
    "bind_address": "0.0.0.0",
    "model": "qwen2.5-coder:7b",
    "persistent_override": True,
    "get_reachable": True,
    "post_inference_ok": True,
    "cold_load_timeout_s": 120,
    "warm_response_s": 0.43,
    "survives_wsl_shutdown": True,
}

NOT_DURABLE_KWARGS: dict = {
    **DURABLE_KWARGS,
    "bind_address": "127.0.0.1",
    "persistent_override": False,
    "survives_wsl_shutdown": False,
}


def make(**overrides) -> OllamaTailscaleContract:
    return OllamaTailscaleContract(**{**DURABLE_KWARGS, **overrides})


# ── durable() ─────────────────────────────────────────────────────────────────

class TestDurable:
    def test_fully_durable(self):
        c = make()
        assert c.durable() is True
        assert c.blockers() == []

    def test_loopback_not_durable(self):
        c = make(bind_address="127.0.0.1", survives_wsl_shutdown=False)
        assert c.durable() is False

    def test_no_persistent_override_not_durable(self):
        c = make(persistent_override=False, survives_wsl_shutdown=False)
        assert c.durable() is False

    def test_get_unreachable_not_durable(self):
        c = make(get_reachable=False)
        assert c.durable() is False

    def test_post_inference_fail_not_durable(self):
        c = make(post_inference_ok=False)
        assert c.durable() is False


# ── blockers() ────────────────────────────────────────────────────────────────

class TestBlockers:
    def test_no_blockers_when_durable(self):
        assert make().blockers() == []

    def test_bind_address_blocker(self):
        c = make(bind_address="127.0.0.1", survives_wsl_shutdown=False)
        blockers = c.blockers()
        assert len(blockers) >= 1
        assert any("bind_address" in b for b in blockers)

    def test_persistent_override_blocker(self):
        c = make(persistent_override=False, survives_wsl_shutdown=False)
        blockers = c.blockers()
        assert any("persistent_override" in b for b in blockers)

    def test_get_reachable_blocker(self):
        c = make(get_reachable=False)
        assert any("get_reachable" in b for b in c.blockers())

    def test_post_inference_blocker(self):
        c = make(post_inference_ok=False)
        assert any("post_inference_ok" in b for b in c.blockers())

    def test_multiple_blockers_stack(self):
        c = make(
            bind_address="127.0.0.1",
            persistent_override=False,
            get_reachable=False,
            post_inference_ok=False,
            survives_wsl_shutdown=False,
        )
        assert c.durable() is False
        assert len(c.blockers()) == 4


# ── model_validator (coherence) ───────────────────────────────────────────────

class TestCoherence:
    def test_survives_shutdown_requires_durable_bind(self):
        with pytest.raises(ValidationError, match="incoherent"):
            make(bind_address="127.0.0.1", survives_wsl_shutdown=True)

    def test_survives_shutdown_requires_persistent_override(self):
        with pytest.raises(ValidationError, match="incoherent"):
            make(persistent_override=False, survives_wsl_shutdown=True)

    def test_survives_false_with_loopback_is_valid(self):
        c = make(bind_address="127.0.0.1", survives_wsl_shutdown=False)
        assert c.survives_wsl_shutdown is False


# ── Schema validation ────────────────────────────────────────────────────────

class TestSchema:
    def test_rejects_cold_load_below_120(self):
        with pytest.raises(ValidationError):
            make(cold_load_timeout_s=60)

    def test_rejects_negative_warm_response(self):
        with pytest.raises(ValidationError):
            make(warm_response_s=-1.0)

    def test_rejects_invalid_bind_address(self):
        with pytest.raises(ValidationError):
            make(bind_address="192.168.1.1")

    def test_rejects_invalid_ip(self):
        with pytest.raises(ValidationError):
            make(tailscale_ip="not-an-ip")

    def test_accepts_different_model(self):
        c = make(model="llama3.2:3b")
        assert c.model == "llama3.2:3b"

    def test_default_port(self):
        kwargs = {**DURABLE_KWARGS}
        del kwargs["port"]
        c = OllamaTailscaleContract(**kwargs)
        assert c.port == 11434

    def test_default_model(self):
        kwargs = {**DURABLE_KWARGS}
        del kwargs["model"]
        c = OllamaTailscaleContract(**kwargs)
        assert c.model == "qwen2.5-coder:7b"


# ── main() CLI ────────────────────────────────────────────────────────────────

class TestMain:
    def test_no_args_returns_2(self):
        from contract import main
        assert main(["contract.py"]) == 2

    def test_durable_yaml_returns_0(self, tmp_path):
        import yaml
        from contract import main
        f = tmp_path / "durable.yaml"
        f.write_text(yaml.dump(DURABLE_KWARGS))
        assert main(["contract.py", str(f)]) == 0

    def test_not_durable_returns_1(self, tmp_path):
        import yaml
        from contract import main
        f = tmp_path / "not_durable.yaml"
        f.write_text(yaml.dump(NOT_DURABLE_KWARGS))
        assert main(["contract.py", str(f)]) == 1

    def test_soft_not_durable_returns_0(self, tmp_path):
        import yaml
        from contract import main
        f = tmp_path / "not_durable.yaml"
        f.write_text(yaml.dump(NOT_DURABLE_KWARGS))
        assert main(["contract.py", "--soft", str(f)]) == 0

    def test_invalid_yaml_returns_1(self, tmp_path):
        from contract import main
        f = tmp_path / "bad.yaml"
        f.write_text("tailscale_ip: not-an-ip\nbind_address: '0.0.0.0'\npersistent_override: true\n")
        assert main(["contract.py", str(f)]) == 1
