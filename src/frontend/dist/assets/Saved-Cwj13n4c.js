import { c as createLucideIcon, n as useAuth, g as useNavigate, r as reactExports, j as jsxRuntimeExports, H as Heart, m as Badge, C as CollegeGridSkeleton, o as ue } from "./index-D49Ci9rE.js";
import { h as CollegeCard } from "./CollegeCard-CPzIgOLD.js";
import { b as useSavedColleges, c as useSaveCollege, E as ErrorState, C as ComparePanel } from "./useColleges-VyK0Ycrt.js";
import { E as EmptyState } from "./EmptyState-bT6l_Jad.js";
import "./StarRating-Co5aYfz-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
];
const Bookmark = createLucideIcon("bookmark", __iconNode);
function Saved() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const {
    data: savedColleges = [],
    isLoading,
    isError,
    refetch
  } = useSavedColleges();
  const { unsave } = useSaveCollege();
  reactExports.useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isAuthenticated, authLoading, navigate]);
  if (!isAuthenticated && !authLoading) return null;
  const handleUnsave = async (id) => {
    const result = await unsave.mutateAsync(id);
    if (result.success) ue.success("Removed from saved");
    else ue.error(result.error ?? "Failed to remove");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", "data-ocid": "saved.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-5 h-5 text-primary fill-primary/20" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-3xl font-bold text-foreground", children: "My Saved Colleges" }),
          !isLoading && savedColleges.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "text-sm px-2.5 py-0.5",
              "data-ocid": "saved.count.badge",
              children: savedColleges.length
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm ml-12", children: "Colleges you've saved for later review" })
      ] }) }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(CollegeGridSkeleton, { count: 6 }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        ErrorState,
        {
          title: "Couldn't load saved colleges",
          description: "There was a problem fetching your saved colleges. Please try again.",
          onRetry: () => refetch()
        }
      ) : savedColleges.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8", "data-ocid": "saved.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "w-8 h-8" }),
          title: "No saved colleges yet",
          description: "Start exploring and save colleges you're interested in. They'll appear here for easy comparison.",
          action: {
            label: "Browse Colleges",
            onClick: () => navigate({ to: "/" }),
            ocid: "saved.browse.button"
          }
        }
      ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
          "data-ocid": "saved.college.list",
          children: savedColleges.map((college, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            CollegeCard,
            {
              college,
              isSaved: true,
              onUnsave: handleUnsave,
              index: i + 1
            },
            college.id
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ComparePanel, {})
  ] });
}
export {
  Saved as default
};
