import SwiftUI
import MarkdownUI

struct RootView: View {
    @EnvironmentObject var ws: WorkspaceStore

    var body: some View {
        NavigationSplitView {
            VendorList()
                .frame(minWidth: 200)
        } content: {
            if let vendor = ws.selectedVendor {
                FileTreeView(vendor: vendor)
                    .frame(minWidth: 280)
            } else {
                Text("Pick a vendor").foregroundStyle(.secondary)
            }
        } detail: {
            MarkdownDetail()
        }
        .toolbar {
            ToolbarItem(placement: .automatic) {
                Text(ws.status).font(.caption).foregroundStyle(.secondary)
            }
        }
    }
}

struct VendorList: View {
    @EnvironmentObject var ws: WorkspaceStore

    var body: some View {
        List(ws.vendors, selection: Binding(
            get: { ws.selectedVendor },
            set: { ws.selectedVendor = $0; ws.selectedFile = nil; ws.currentMarkdown = "" }
        )) { vendor in
            HStack {
                Image(systemName: "folder")
                VStack(alignment: .leading) {
                    Text(vendor.name).font(.body)
                    Text("\(vendor.markdownCount) md").font(.caption).foregroundStyle(.secondary)
                }
            }
            .tag(vendor)
        }
        .navigationTitle("Vendors")
    }
}

struct FileTreeView: View {
    let vendor: VendorDir
    @EnvironmentObject var ws: WorkspaceStore

    var body: some View {
        List {
            DirectoryNode(url: vendor.root, depth: 0)
        }
        .navigationTitle(vendor.name)
    }
}

struct DirectoryNode: View {
    let url: URL
    let depth: Int
    @EnvironmentObject var ws: WorkspaceStore
    @State private var expanded: Bool

    init(url: URL, depth: Int) {
        self.url = url
        self.depth = depth
        _expanded = State(initialValue: depth < 1)
    }

    var body: some View {
        let children = ws.children(of: url)
        DisclosureGroup(isExpanded: $expanded) {
            ForEach(children) { entry in
                if entry.isDirectory {
                    DirectoryNode(url: entry.url, depth: depth + 1)
                } else {
                    Button {
                        ws.selectFile(entry)
                    } label: {
                        HStack {
                            Image(systemName: "doc.text").foregroundStyle(.secondary)
                            Text(entry.name).foregroundStyle(.primary)
                            Spacer()
                        }
                    }
                    .buttonStyle(.plain)
                    .padding(.leading, CGFloat(depth) * 8)
                }
            }
        } label: {
            HStack {
                Image(systemName: expanded ? "folder.fill" : "folder")
                Text(depth == 0 ? "/" : url.lastPathComponent)
            }
        }
    }
}

struct HeadlessLayout: View {
    @EnvironmentObject var ws: WorkspaceStore

    var body: some View {
        HStack(alignment: .top, spacing: 0) {
            vendorPane.frame(width: 220, alignment: .topLeading)
            Divider()
            filePane.frame(width: 320, alignment: .topLeading)
            Divider()
            markdownPane.frame(maxWidth: .infinity, alignment: .topLeading)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
        .background(Color(NSColor.windowBackgroundColor))
    }

    private var vendorPane: some View {
        VStack(alignment: .leading, spacing: 0) {
            Text("Vendors").font(.headline)
                .padding(.horizontal, 12).padding(.top, 12).padding(.bottom, 6)
            Divider()
            VStack(alignment: .leading, spacing: 0) {
                ForEach(ws.vendors.prefix(28)) { v in
                    HStack(spacing: 6) {
                        Image(systemName: "folder").foregroundStyle(.secondary)
                        VStack(alignment: .leading, spacing: 0) {
                            Text(v.name).lineLimit(1)
                            Text("\(v.markdownCount) md").font(.caption2).foregroundStyle(.secondary)
                        }
                        Spacer(minLength: 0)
                    }
                    .padding(.horizontal, 12).padding(.vertical, 3)
                    .background(v == ws.selectedVendor ? Color.accentColor.opacity(0.22) : Color.clear)
                }
            }
            Spacer(minLength: 0)
        }
    }

    private var filePane: some View {
        VStack(alignment: .leading, spacing: 0) {
            Text(ws.selectedVendor?.name ?? "—").font(.headline)
                .padding(.horizontal, 12).padding(.top, 12).padding(.bottom, 6)
            Divider()
            if let v = ws.selectedVendor {
                let entries = ws.children(of: v.root)
                VStack(alignment: .leading, spacing: 2) {
                    ForEach(entries.prefix(28)) { entry in
                        HStack(spacing: 6) {
                            Image(systemName: entry.isDirectory ? "folder" : "doc.text").foregroundStyle(.secondary)
                            Text(entry.name).lineLimit(1)
                            Spacer(minLength: 0)
                        }
                        .padding(.horizontal, 12).padding(.vertical, 3)
                        .background(entry == ws.selectedFile ? Color.accentColor.opacity(0.22) : Color.clear)
                    }
                    if entries.count > 28 {
                        Text("… \(entries.count - 28) more")
                            .font(.caption).foregroundStyle(.secondary).padding(.horizontal, 12).padding(.top, 4)
                    }
                }
            }
            Spacer(minLength: 0)
        }
    }

    private var markdownPane: some View {
        VStack(alignment: .leading, spacing: 10) {
            if let f = ws.selectedFile, !f.isDirectory {
                Text(f.relPath).font(.caption).foregroundStyle(.secondary)
                Divider()
                Markdown(markdownPreview(ws.currentMarkdown))
                    .markdownTheme(.gitHub)
            } else {
                Text("Knowledge-engineering corpus").font(.title.bold())
                Text(ws.rootPath).font(.footnote).foregroundStyle(.secondary)
                Text(ws.status).font(.callout).foregroundStyle(.secondary)
            }
            Spacer(minLength: 0)
        }
        .padding(20)
    }

    private func markdownPreview(_ text: String) -> String {
        let lines = text.split(separator: "\n", omittingEmptySubsequences: false)
        let head = lines.prefix(40).joined(separator: "\n")
        return head + (lines.count > 40 ? "\n\n_… truncated for preview …_" : "")
    }
}

struct MarkdownDetail: View {
    @EnvironmentObject var ws: WorkspaceStore

    var body: some View {
        ScrollView {
            if let file = ws.selectedFile, !file.isDirectory {
                VStack(alignment: .leading, spacing: 12) {
                    Text(file.relPath).font(.caption).foregroundStyle(.secondary).textSelection(.enabled)
                    Divider()
                    Markdown(ws.currentMarkdown)
                        .markdownTheme(.gitHub)
                        .textSelection(.enabled)
                }
                .padding(20)
                .frame(maxWidth: .infinity, alignment: .topLeading)
            } else {
                placeholder
            }
        }
        .navigationTitle(ws.selectedFile?.name ?? "Corpus Viewer")
    }

    private var placeholder: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Knowledge-engineering corpus").font(.largeTitle.bold())
            Text(ws.rootPath).font(.footnote).foregroundStyle(.secondary).textSelection(.enabled)
            Text(ws.status).font(.callout).foregroundStyle(.secondary)
            Divider()
            Text("Pick a markdown file from the tree to render with swift-markdown-ui.")
                .foregroundStyle(.secondary)
        }
        .padding(24)
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
    }
}
