#if canImport(Combine)
import Foundation
import Combine

/// Loads view.json and reloads it on a timer + file-change, so the app follows
/// the orchestrator live. The path is resolvable relative to the app's CWD
/// (apps/agent-orchestrator/view.json) or overridden via AGENT_VIEW_JSON.
@MainActor
final class OrchestratorStore: ObservableObject {
    @Published var view: OrchestratorView = .empty
    @Published var lastError: String?

    private let url: URL
    private var timer: Timer?

    init(path: String? = nil) {
        let p = path
            ?? ProcessInfo.processInfo.environment["AGENT_VIEW_JSON"]
            ?? FileManager.default.currentDirectoryPath + "/view.json"
        self.url = URL(fileURLWithPath: p)
        reload()
    }

    func start() {
        timer = Timer.scheduledTimer(withTimeInterval: 2.0, repeats: true) { [weak self] _ in
            Task { @MainActor in self?.reload() }
        }
    }

    func reload() {
        guard let data = try? Data(contentsOf: url) else {
            lastError = "waiting for \(url.lastPathComponent) — run: npm run emit:view"
            return
        }
        do {
            view = try JSONDecoder().decode(OrchestratorView.self, from: data)
            lastError = nil
        } catch {
            lastError = "decode error: \(error.localizedDescription)"
        }
    }

    // Group sessions agent-view-style: needs input / working / completed-ish.
    func sessions(in state: SessionState) -> [AgentSession] {
        view.sessions.filter { $0.state == state }
    }

    var taskCounts: (todo: Int, inProgress: Int, done: Int) {
        var t = 0, p = 0, d = 0
        for task in view.tasks {
            switch task.state {
            case .pending: t += 1
            case .inProgress: p += 1
            case .completed: d += 1
            }
        }
        return (t, p, d)
    }
}
#endif // canImport(Combine)
