// Local ESLint rule: "1 file = 1 logic". A file may export at most one runtime thing
// (function, component, hook, const or class). Type-only exports don't count, and neither do the
// extra exports Next.js expects from route files (metadata, generateMetadata, ...).
// See .claude/rules/one-file-one-job.md.

const NEXT_ROUTE_EXPORTS = new Set([
  "metadata",
  "generateMetadata",
  "generateStaticParams",
  "generateViewport",
  "viewport",
  "dynamic",
  "dynamicParams",
  "revalidate",
  "runtime",
  "preferredRegion",
  "maxDuration",
  "config",
]);

function exportedNames(node) {
  if (node.type === "ExportDefaultDeclaration") return ["default"];
  if (node.exportKind === "type") return [];
  const decl = node.declaration;
  if (decl) {
    if (decl.type === "VariableDeclaration") return decl.declarations.map((d) => d.id.name);
    if (decl.type === "FunctionDeclaration" || decl.type === "ClassDeclaration") return [decl.id.name];
    return []; // type alias, interface, enum-like types
  }
  return node.specifiers.filter((s) => s.exportKind !== "type").map((s) => s.exported.name);
}

const oneLogicPerFile = {
  meta: {
    type: "suggestion",
    docs: { description: "Allow at most one exported runtime unit (one logic) per file" },
    schema: [],
    messages: {
      tooMany:
        "1 file = 1 logic: this file exports {{count}} things ({{names}}). Move each into its own file.",
    },
  },
  create(context) {
    const names = [];
    let first = null;
    const collect = (node) => {
      for (const name of exportedNames(node)) {
        if (NEXT_ROUTE_EXPORTS.has(name)) continue;
        names.push(name);
        first ??= node;
      }
    };
    return {
      ExportNamedDeclaration: collect,
      ExportDefaultDeclaration: collect,
      "Program:exit"() {
        if (names.length > 1) {
          context.report({ node: first, messageId: "tooMany", data: { count: names.length, names: names.join(", ") } });
        }
      },
    };
  },
};

export default oneLogicPerFile;
