import { c as createLucideIcon, h as useCompare, g as useNavigate, j as jsxRuntimeExports, L as Link, B as Button, X, m as Badge, i as BookOpen } from "./index-D49Ci9rE.js";
import { E as EmptyState } from "./EmptyState-bT6l_Jad.js";
import { G as GitCompare, M as MapPin, T as TrendingUp, S as StarRating } from "./StarRating-Co5aYfz-.js";
import { A as ArrowLeft, m as motion, C as CalendarDays, B as Building2 } from "./proxy-73dO5C0k.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
function formatFees(fees) {
  return `$${fees.toLocaleString()}/year`;
}
function getBestFees(colleges) {
  return Math.min(...colleges.map((c) => c.fees));
}
function getBestRating(colleges) {
  return Math.max(...colleges.map((c) => c.rating));
}
function getBestPlacement(colleges) {
  return Math.max(...colleges.map((c) => c.placement_percentage));
}
function CollegeHeader({
  college,
  isBestValue,
  isTopRated,
  onRemove,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      className: "text-left px-5 py-5 min-w-[220px] align-top",
      "data-ocid": `compare.college_header.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1 mb-2", children: [
            isBestValue && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" }),
              "Best Value"
            ] }),
            isTopRated && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-3 h-3" }),
              "Top Rated"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-base leading-tight line-clamp-2", children: college.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1.5 text-muted-foreground text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: college.location })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: college.rating, size: "sm", showValue: true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/college/$id",
              params: { id: String(college.id) },
              className: "inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline mt-2 transition-colors",
              "data-ocid": `compare.view_detail_link.${index + 1}`,
              children: "View Details →"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onRemove,
            className: "shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth",
            "aria-label": `Remove ${college.name}`,
            "data-ocid": `compare.remove_button.${index + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        )
      ] })
    }
  );
}
function FeesRow({ colleges, bestFees }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: colleges.map((college, idx) => {
    const isLowest = college.fees === bestFees;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "td",
      {
        className: "px-5 py-4",
        "data-ocid": `compare.fees_cell.${idx + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `font-semibold text-sm ${isLowest ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`,
              children: formatFees(college.fees)
            }
          ),
          isLowest && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 inline-flex items-center rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400", children: "↓ Lowest" })
        ]
      },
      college.id
    );
  }) });
}
function RatingRow({ colleges, bestRating }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: colleges.map((college, idx) => {
    const isTop = college.rating === bestRating;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "td",
      {
        className: "px-5 py-4",
        "data-ocid": `compare.rating_cell.${idx + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: college.rating, size: "sm", showValue: true }),
          isTop && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold text-primary", children: "★ Highest" })
        ] })
      },
      college.id
    );
  }) });
}
function PlacementRow({ colleges, bestPlacement }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: colleges.map((college, idx) => {
    const isTop = college.placement_percentage === bestPlacement;
    const pct = college.placement_percentage;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "td",
      {
        className: "px-5 py-4",
        "data-ocid": `compare.placement_cell.${idx + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `font-semibold text-sm ${isTop ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`,
                children: [
                  pct.toFixed(1),
                  "%"
                ]
              }
            ),
            isTop && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400", children: "↑ Highest" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-[120px] h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `h-full rounded-full transition-all ${isTop ? "bg-emerald-500" : "bg-primary/50"}`,
              style: { width: `${pct}%` }
            }
          ) })
        ] })
      },
      college.id
    );
  }) });
}
function DecisionHelper({ colleges }) {
  const bestPlacement = getBestPlacement(colleges);
  const bestFees = getBestFees(colleges);
  const bestRating = getBestRating(colleges);
  const topPlacementCollege = colleges.find(
    (c) => c.placement_percentage === bestPlacement
  );
  const bestValueCollege = colleges.find((c) => c.fees === bestFees);
  const topRatedCollege = colleges.find((c) => c.rating === bestRating);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.3, duration: 0.4 },
      className: "mt-6 rounded-2xl bg-primary/5 border border-primary/20 p-6",
      "data-ocid": "compare.decision_helper",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Our Recommendation" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-card border border-border p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-emerald-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Best Placement" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm leading-tight", children: topPlacementCollege.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-emerald-600 dark:text-emerald-400 mt-0.5 font-medium", children: [
              topPlacementCollege.placement_percentage.toFixed(1),
              "% placement rate"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-card border border-border p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-emerald-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Best Value" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm leading-tight", children: bestValueCollege.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-emerald-600 dark:text-emerald-400 mt-0.5 font-medium", children: formatFees(bestValueCollege.fees) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-card border border-border p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Top Rated" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm leading-tight", children: topRatedCollege.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary mt-0.5 font-medium", children: [
              topRatedCollege.rating.toFixed(1),
              " / 5 stars"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-sm text-muted-foreground leading-relaxed", children: [
          "Based on your selection,",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: topPlacementCollege.name }),
          " ",
          "offers the best placement record at",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-emerald-600 dark:text-emerald-400", children: [
            topPlacementCollege.placement_percentage.toFixed(1),
            "%"
          ] }),
          ", while",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: bestValueCollege.name }),
          " ",
          "is the most affordable option at",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: formatFees(bestValueCollege.fees) }),
          "."
        ] })
      ]
    }
  );
}
function Compare() {
  const { selectedColleges, removeCollege, clearCompare, canCompare } = useCompare();
  const navigate = useNavigate();
  if (selectedColleges.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", "data-ocid": "compare.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
          "data-ocid": "compare.back_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to colleges"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GitCompare, { className: "w-8 h-8" }),
          title: "Select 2–3 colleges to compare",
          description: "Go to the college listing and check the compare boxes on any college card.",
          action: {
            label: "Browse Colleges",
            onClick: () => navigate({ to: "/" }),
            ocid: "compare.browse_button"
          }
        }
      )
    ] });
  }
  if (!canCompare) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", "data-ocid": "compare.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
          "data-ocid": "compare.back_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to colleges"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Compare Colleges" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Making the right choice" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground font-medium", children: [
          2 - selectedColleges.length,
          " more college needed to start comparing"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Go to the college listing and check the compare boxes on more cards." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            className: "mt-3",
            onClick: () => navigate({ to: "/" }),
            "data-ocid": "compare.add_more_button",
            children: "Add More Colleges"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: selectedColleges.map((college, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-border bg-card p-4 flex items-start justify-between gap-3",
          "data-ocid": `compare.pending_card.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm leading-tight", children: college.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                college.location
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => removeCollege(college.id),
                className: "p-1 rounded text-muted-foreground hover:text-destructive transition-smooth",
                "aria-label": `Remove ${college.name}`,
                "data-ocid": `compare.remove_pending_button.${idx + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ]
        },
        college.id
      )) })
    ] });
  }
  const colleges = selectedColleges;
  const bestFees = getBestFees(colleges);
  const bestRating = getBestRating(colleges);
  const bestPlacement = getBestPlacement(colleges);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", "data-ocid": "compare.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3",
          "data-ocid": "compare.back_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to colleges"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Compare Colleges" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Making the right choice — side-by-side analysis" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: clearCompare,
            "data-ocid": "compare.clear_button",
            className: "shrink-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mr-1.5" }),
              "Clear All"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: "easeOut" },
        "data-ocid": "compare.table_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-2xl border border-border bg-card shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-5 w-44 min-w-[160px] bg-muted/30 border-r border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Feature" }) }),
              colleges.map((college, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                CollegeHeader,
                {
                  college,
                  isBestValue: college.fees === bestFees,
                  isTopRated: college.rating === bestRating,
                  onRemove: () => removeCollege(college.id),
                  index: idx
                },
                college.id
              ))
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-border/50 bg-background hover:bg-muted/10 transition-colors",
                  "data-ocid": "compare.row.location",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 bg-muted/20 border-r border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground font-medium text-xs uppercase tracking-wide", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5" }),
                      "Location"
                    ] }) }),
                    colleges.map((college, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        className: "px-5 py-4 text-foreground text-sm",
                        "data-ocid": `compare.location_cell.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 text-muted-foreground shrink-0" }),
                          college.location
                        ] })
                      },
                      college.id
                    ))
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-border/50 bg-muted/10 hover:bg-muted/20 transition-colors",
                  "data-ocid": "compare.row.fees",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 bg-muted/20 border-r border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground font-medium text-xs uppercase tracking-wide", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
                      "Annual Fees"
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FeesRow, { colleges, bestFees })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-border/50 bg-background hover:bg-muted/10 transition-colors",
                  "data-ocid": "compare.row.rating",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 bg-muted/20 border-r border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground font-medium text-xs uppercase tracking-wide", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-3.5 h-3.5" }),
                      "Rating"
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RatingRow, { colleges, bestRating })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-border/50 bg-muted/10 hover:bg-muted/20 transition-colors",
                  "data-ocid": "compare.row.placement",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 bg-muted/20 border-r border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground font-medium text-xs uppercase tracking-wide", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5" }),
                      "Placement %"
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      PlacementRow,
                      {
                        colleges,
                        bestPlacement
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-border/50 bg-background hover:bg-muted/10 transition-colors",
                  "data-ocid": "compare.row.established",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 bg-muted/20 border-r border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground font-medium text-xs uppercase tracking-wide", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3.5 h-3.5" }),
                      "Established"
                    ] }) }),
                    colleges.map((college, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        className: "px-5 py-4 text-foreground text-sm",
                        "data-ocid": `compare.established_cell.${idx + 1}`,
                        children: college.established
                      },
                      college.id
                    ))
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-border/50 bg-muted/10 hover:bg-muted/20 transition-colors",
                  "data-ocid": "compare.row.type",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 bg-muted/20 border-r border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground font-medium text-xs uppercase tracking-wide", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-3.5 h-3.5" }),
                      "Type"
                    ] }) }),
                    colleges.map((college, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        className: "px-5 py-4",
                        "data-ocid": `compare.type_cell.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs font-medium", children: college.type_ })
                      },
                      college.id
                    ))
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "bg-background hover:bg-muted/10 transition-colors",
                  "data-ocid": "compare.row.courses",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 bg-muted/20 border-r border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground font-medium text-xs uppercase tracking-wide", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5" }),
                      "Courses"
                    ] }) }),
                    colleges.map((college, idx) => {
                      const courseList = college.courses.join(", ");
                      const MAX = 80;
                      const display = courseList.length > MAX ? `${courseList.slice(0, MAX)}…` : courseList;
                      return /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "td",
                        {
                          className: "px-5 py-4 text-foreground text-sm",
                          "data-ocid": `compare.courses_cell.${idx + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "text-muted-foreground",
                              title: courseList,
                              children: display
                            }
                          )
                        },
                        college.id
                      );
                    })
                  ]
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DecisionHelper, { colleges }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "mt-6 flex flex-wrap items-center gap-3",
              "data-ocid": "compare.actions",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    onClick: clearCompare,
                    "data-ocid": "compare.clear_all_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mr-1.5" }),
                      "Clear All"
                    ]
                  }
                ),
                colleges.map((college, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/college/$id",
                    params: { id: String(college.id) },
                    "data-ocid": `compare.detail_link.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "secondary", size: "sm", children: [
                      "View ",
                      college.name.split(" ").slice(0, 2).join(" ")
                    ] })
                  },
                  college.id
                ))
              ]
            }
          )
        ]
      }
    )
  ] });
}
export {
  Compare as default
};
