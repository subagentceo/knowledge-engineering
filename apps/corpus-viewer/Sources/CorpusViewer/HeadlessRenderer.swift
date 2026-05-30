import SwiftUI
import AppKit

enum HeadlessRenderer {
    @MainActor
    static func renderAndExit(to path: String) {
        let ws = WorkspaceStore()
        ws.bootstrap()
        // Prefer a known-rich markdown file so the right pane has prose to render.
        let preferred = ws.vendors.first(where: { $0.name == "anthropic-sitemap" }) ?? ws.vendors.first
        if let vendor = preferred {
            ws.selectedVendor = vendor
            let entries = ws.children(of: vendor.root)
            let pick = entries.first(where: { !$0.isDirectory && $0.name == "constitution.md" })
                ?? entries.first(where: { !$0.isDirectory })
                ?? entries.first(where: { $0.isDirectory }).flatMap { d in
                    ws.children(of: d.url).first(where: { !$0.isDirectory })
                }
            if let pick { ws.selectFile(pick) }
        }

        let view = HeadlessLayout()
            .environmentObject(ws)
            .frame(width: 1400, height: 880)

        let renderer = ImageRenderer(content: view)
        renderer.scale = 2.0
        guard let cg = renderer.cgImage else {
            FileHandle.standardError.write(Data("ERR: ImageRenderer produced nil cgImage\n".utf8))
            exit(2)
        }
        let bitmap = NSBitmapImageRep(cgImage: cg)
        guard let data = bitmap.representation(using: .png, properties: [:]) else {
            FileHandle.standardError.write(Data("ERR: PNG encoding failed\n".utf8))
            exit(3)
        }
        do {
            try data.write(to: URL(fileURLWithPath: path))
            FileHandle.standardOutput.write(Data("OK \(path) \(data.count) bytes\n".utf8))
            exit(0)
        } catch {
            FileHandle.standardError.write(Data("ERR: write \(path): \(error)\n".utf8))
            exit(4)
        }
    }
}
