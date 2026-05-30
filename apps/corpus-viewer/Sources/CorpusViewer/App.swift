import SwiftUI

@main
struct CorpusViewerApp: App {
    @StateObject private var ws = WorkspaceStore()

    init() {
        if let idx = CommandLine.arguments.firstIndex(of: "--render"),
           idx + 1 < CommandLine.arguments.count {
            let path = CommandLine.arguments[idx + 1]
            HeadlessRenderer.renderAndExit(to: path)
        }
    }

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(ws)
                .onAppear { ws.bootstrap() }
        }
        .defaultSize(width: 1300, height: 820)
    }
}
