import type { ThemeRegistrationRaw } from "shiki";

export const avmDarkTheme: ThemeRegistrationRaw = {
  name: "avm-dark",
  type: "dark",
  colors: {
    "editor.background": "#111111",
    "editor.foreground": "#F0EDE8",
  },
  tokenColors: [
    // Keywords: const, let, var, await, async, return, if, else, import, export, interface, type, =>
    {
      scope: [
        "keyword",
        "keyword.control",
        "keyword.operator.new",
        "storage.type",
        "storage.modifier",
      ],
      settings: { foreground: "#FF6B00" },
    },
    // Arrow functions and operators that are keyword-like
    {
      scope: ["storage.type.function.arrow"],
      settings: { foreground: "#FF6B00" },
    },
    // Function names
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call",
      ],
      settings: { foreground: "#00F0E0" },
    },
    // Types and classes
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "support.type",
        "support.class",
        "entity.name.interface",
      ],
      settings: { foreground: "#C396D8" },
    },
    // Strings
    {
      scope: ["string", "string.quoted", "string.template"],
      settings: { foreground: "#8BBF65" },
    },
    // Numbers
    {
      scope: ["constant.numeric"],
      settings: { foreground: "#D4A054" },
    },
    // Constants (true, false, null, undefined)
    {
      scope: ["constant.language"],
      settings: { foreground: "#FF8F3F" },
    },
    // Comments
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#5C5A56", fontStyle: "italic" },
    },
    // Variables
    {
      scope: ["variable", "variable.other"],
      settings: { foreground: "#F0EDE8" },
    },
    // Operators and punctuation
    {
      scope: ["keyword.operator", "punctuation.accessor"],
      settings: { foreground: "#9A9790" },
    },
    // Object keys / properties
    {
      scope: [
        "support.type.property-name",
        "variable.other.property",
        "meta.object-literal.key",
      ],
      settings: { foreground: "#F0EDE8" },
    },
    // Template literal expressions
    {
      scope: ["punctuation.definition.template-expression"],
      settings: { foreground: "#FF6B00" },
    },
    // HTML/JSX tags
    {
      scope: ["entity.name.tag"],
      settings: { foreground: "#FF6B00" },
    },
    // HTML/JSX attributes
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: "#00F0E0" },
    },
  ],
};
