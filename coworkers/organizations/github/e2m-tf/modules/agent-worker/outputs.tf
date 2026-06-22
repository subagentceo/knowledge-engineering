output "script_name" {
  value = cloudflare_workers_script.this.name
}

output "kv_namespace_id" {
  value = var.kv_binding == "" ? null : cloudflare_workers_kv_namespace.this[0].id
}
