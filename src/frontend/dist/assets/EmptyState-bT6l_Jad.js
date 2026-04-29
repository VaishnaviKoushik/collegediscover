import { j as jsxRuntimeExports, B as Button } from "./index-D49Ci9rE.js";
function EmptyState({
  icon,
  title,
  description,
  action,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex flex-col items-center justify-center py-16 px-6 text-center ${className}`,
      "data-ocid": "empty_state",
      children: [
        icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted/60 flex items-center justify-center mb-4 text-muted-foreground", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: title }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs mb-6", children: description }),
        action && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: action.onClick,
            "data-ocid": action.ocid ?? "empty_state.cta.button",
            children: action.label
          }
        )
      ]
    }
  );
}
export {
  EmptyState as E
};
