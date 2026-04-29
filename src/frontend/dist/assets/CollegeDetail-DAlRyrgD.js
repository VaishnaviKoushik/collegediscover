import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, k as useParams, l as CollegeDetailSkeleton, L as Link, B as Button, m as Badge, i as BookOpen, n as useAuth, h as useCompare, H as Heart, o as ue } from "./index-D49Ci9rE.js";
import { d as useCollege, E as ErrorState, C as ComparePanel, c as useSaveCollege, b as useSavedColleges } from "./useColleges-VyK0Ycrt.js";
import { M as MapPin, S as StarRating, T as TrendingUp, G as GitCompare } from "./StarRating-Co5aYfz-.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, A as ArrowLeft, C as CalendarDays, m as motion, B as Building2 } from "./proxy-73dO5C0k.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
const TOP_RECRUITERS = [
  "Google",
  "Microsoft",
  "Amazon",
  "Apple",
  "Goldman Sachs",
  "JP Morgan",
  "McKinsey",
  "Deloitte",
  "Infosys",
  "TCS",
  "Adobe",
  "Meta",
  "Salesforce",
  "IBM",
  "Accenture"
];
function getRecruiters(college) {
  const seed = college.id + college.name.length;
  const shuffled = [...TOP_RECRUITERS].sort((a, b) => {
    const ha = (a.charCodeAt(0) + seed) % TOP_RECRUITERS.length;
    const hb = (b.charCodeAt(0) + seed) % TOP_RECRUITERS.length;
    return ha - hb;
  });
  return shuffled.slice(0, 6 + seed % 3);
}
const REVIEW_TEMPLATES = [
  (n) => `${n} gave me skills that actually matter in industry. The faculty is world-class and campus culture is vibrant and inclusive.`,
  (n) => `The placements at ${n} exceeded all expectations. I landed my dream job at a top firm thanks to the stellar alumni network.`,
  (n) => `${n} is a great place to grow both academically and professionally. Infrastructure, labs, and support services are all top-notch.`,
  (n) => `The diverse curriculum at ${n} prepared me for real-world challenges. Highly recommend for anyone serious about their career.`
];
const REVIEWER_DATA = [
  ["Arjun Sharma", "AS"],
  ["Priya Kapoor", "PK"],
  ["Rohan Mehta", "RM"],
  ["Sneha Patel", "SP"]
];
function getMockReviews(college) {
  const seed = college.id;
  const shortName = college.name.split(" ")[0];
  return REVIEWER_DATA.map(([name, initials], i) => ({
    initials,
    name,
    year: 2020 + (seed + i) % 4,
    rating: 3.8 + (seed + i) % 12 * 0.1,
    text: REVIEW_TEMPLATES[i](shortName)
  }));
}
function formatFees(fees) {
  if (fees >= 1e5) return `$${(fees / 1e3).toFixed(0)}K/yr`;
  return `$${fees.toLocaleString()}/yr`;
}
function StatCard({
  icon,
  label,
  value,
  highlight = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex flex-col gap-2 rounded-xl border p-4 ${highlight ? "bg-primary/5 border-primary/20" : "bg-card border-border"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: highlight ? "text-primary" : "", children: icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider truncate", children: label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-foreground leading-tight truncate", children: value })
      ]
    }
  );
}
function AnimatedProgressBar({ percentage }) {
  const [ready, setReady] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(t);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-5xl font-bold text-primary leading-none", children: [
        percentage.toFixed(0),
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground pb-1", children: "placement rate" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "h-full bg-gradient-to-r from-primary to-secondary rounded-full",
        initial: { width: 0 },
        animate: { width: ready ? `${percentage}%` : 0 },
        transition: { duration: 1.2, ease: "easeOut" }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Based on last graduating batch" })
  ] });
}
function ReviewCard({ review, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": `college.review.${index + 1}`,
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: index * 0.08 },
      className: "rounded-xl border border-border bg-card p-5 flex flex-col gap-3",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-semibold text-sm shrink-0", children: review.initials }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: review.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Class of ",
              review.year
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: review.rating, size: "sm", showValue: false }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed line-clamp-3", children: [
          "“",
          review.text,
          "”"
        ] })
      ]
    }
  );
}
function NotFound() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "college.not_found",
      className: "flex flex-col items-center justify-center py-24 px-6 text-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-10 h-10 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground mb-2", children: "College Not Found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 max-w-sm text-sm", children: "The college you're looking for doesn't exist or may have been removed." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "data-ocid": "college.not_found.back_button", children: "Browse All Colleges" }) })
      ]
    }
  );
}
function LoginPrompt({ onLogin }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/20 bg-primary/5 p-4 text-center space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Sign in to save this college" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Track your shortlist and compare later" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        size: "sm",
        onClick: onLogin,
        "data-ocid": "college.login_prompt.button",
        className: "w-full",
        children: "Sign In"
      }
    )
  ] });
}
function SidebarActions({ college }) {
  const { isAuthenticated, login } = useAuth();
  const { save, unsave } = useSaveCollege();
  const { data: savedColleges = [] } = useSavedColleges();
  const { addCollege, removeCollege, isSelected, selectedColleges } = useCompare();
  const [showPrompt, setShowPrompt] = reactExports.useState(false);
  const isSaved = reactExports.useMemo(
    () => savedColleges.some((c) => c.id === college.id),
    [savedColleges, college.id]
  );
  const inCompare = isSelected(college.id);
  const compareFull = selectedColleges.length >= 3 && !inCompare;
  function handleSave() {
    if (!isAuthenticated) {
      setShowPrompt(true);
      return;
    }
    if (isSaved) {
      unsave.mutate(college.id, {
        onSuccess: () => ue.success("Removed from saved colleges"),
        onError: () => ue.error("Failed to unsave. Try again.")
      });
    } else {
      save.mutate(college.id, {
        onSuccess: () => ue.success("College saved to your shortlist!"),
        onError: () => ue.error("Failed to save. Try again.")
      });
    }
  }
  function handleCompare() {
    if (inCompare) {
      removeCollege(college.id);
      ue.info(`${college.name} removed from compare`);
    } else if (!compareFull) {
      addCollege(college);
      ue.success(`Added to compare (${selectedColleges.length + 1}/3)`);
    }
  }
  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => ue.success("Link copied to clipboard!")).catch(() => ue.error("Failed to copy link"));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "college.action_bar", className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showPrompt && !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPrompt, { onLogin: login })
      },
      "login-prompt"
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        "data-ocid": "college.save_button",
        variant: isSaved ? "default" : "outline",
        className: "w-full gap-2 transition-smooth",
        onClick: handleSave,
        disabled: save.isPending || unsave.isPending,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Heart,
            {
              className: `w-4 h-4 ${isSaved ? "fill-primary-foreground" : ""}`
            }
          ),
          isSaved ? "Saved to Shortlist" : "Save College"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        "data-ocid": "college.compare_button",
        variant: inCompare ? "secondary" : "outline",
        className: "w-full gap-2 transition-smooth",
        onClick: handleCompare,
        disabled: compareFull,
        title: compareFull ? "Compare list is full (max 3)" : void 0,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GitCompare, { className: "w-4 h-4" }),
          inCompare ? "In Compare List" : compareFull ? "Compare Full (3/3)" : "Add to Compare"
        ]
      }
    ),
    inCompare && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/compare", className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        "data-ocid": "college.view_compare_button",
        className: "w-full gap-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GitCompare, { className: "w-4 h-4" }),
          "View Comparison"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        "data-ocid": "college.share_button",
        variant: "ghost",
        className: "w-full gap-2 text-muted-foreground",
        onClick: handleShare,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
          "Share"
        ]
      }
    )
  ] });
}
function MobileBar({ college }) {
  const { isAuthenticated, login } = useAuth();
  const { save, unsave } = useSaveCollege();
  const { data: savedColleges = [] } = useSavedColleges();
  const { addCollege, removeCollege, isSelected, selectedColleges } = useCompare();
  const isSaved = reactExports.useMemo(
    () => savedColleges.some((c) => c.id === college.id),
    [savedColleges, college.id]
  );
  const inCompare = isSelected(college.id);
  const compareFull = selectedColleges.length >= 3 && !inCompare;
  function handleSave() {
    if (!isAuthenticated) {
      login();
      return;
    }
    if (isSaved) {
      unsave.mutate(college.id, {
        onSuccess: () => ue.success("Removed from saved")
      });
    } else {
      save.mutate(college.id, {
        onSuccess: () => ue.success("College saved!")
      });
    }
  }
  function handleCompare() {
    if (inCompare) {
      removeCollege(college.id);
    } else if (!compareFull) {
      addCollege(college);
      ue.success(`Added to compare (${selectedColleges.length + 1}/3)`);
    }
  }
  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => ue.success("Link copied!"));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        "data-ocid": "college.mobile.save_button",
        variant: isSaved ? "default" : "outline",
        size: "sm",
        onClick: handleSave,
        disabled: save.isPending || unsave.isPending,
        className: "flex-1 gap-1.5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Heart,
            {
              className: `w-4 h-4 ${isSaved ? "fill-primary-foreground" : ""}`
            }
          ),
          isSaved ? "Saved" : "Save"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        "data-ocid": "college.mobile.compare_button",
        variant: inCompare ? "secondary" : "outline",
        size: "sm",
        onClick: handleCompare,
        disabled: compareFull,
        className: "flex-1 gap-1.5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GitCompare, { className: "w-4 h-4" }),
          inCompare ? "In Compare" : "Compare"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        "data-ocid": "college.mobile.share_button",
        variant: "ghost",
        size: "icon",
        onClick: handleShare,
        className: "shrink-0",
        "aria-label": "Share",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" })
      }
    )
  ] });
}
function CollegeDetail() {
  const { id } = useParams({ from: "/college/$id" });
  const numId = Number(id);
  const { data: college, isLoading, isError, refetch } = useCollege(numId);
  const recruiters = reactExports.useMemo(
    () => college ? getRecruiters(college) : [],
    [college]
  );
  const reviews = reactExports.useMemo(
    () => college ? getMockReviews(college) : [],
    [college]
  );
  reactExports.useEffect(() => {
    if (college) {
      document.title = `${college.name} — CollegeDiscover`;
    } else if (!isLoading) {
      document.title = "College Not Found — CollegeDiscover";
    }
    return () => {
      document.title = "CollegeDiscover — Find Your Perfect College";
    };
  }, [college, isLoading]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CollegeDetailSkeleton, {}) });
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ErrorState,
      {
        title: "Failed to load college",
        description: "We couldn't fetch this college's details. Please try again.",
        onRetry: () => refetch()
      }
    ) });
  }
  if (!college) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotFound, {}) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "college.detail_page",
        className: "min-h-screen bg-background",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-6 max-w-6xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "nav",
              {
                "aria-label": "Breadcrumb",
                "data-ocid": "college.breadcrumb",
                className: "flex items-center gap-1.5 text-xs text-muted-foreground mb-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/",
                      "data-ocid": "college.breadcrumb.home_link",
                      className: "hover:text-primary transition-colors",
                      children: "Home"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground truncate max-w-[200px]", children: college.name })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", "aria-label": "Back to listings", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  "data-ocid": "college.back_button",
                  className: "rounded-xl mt-0.5 shrink-0",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", "data-ocid": "college.type_badge", children: college.type_ }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "outline",
                      className: "gap-1 text-muted-foreground",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3 h-3" }),
                        "Est. ",
                        college.established
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight break-words", children: college.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-2 text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: college.location })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "grid grid-cols-2 md:grid-cols-4 gap-3 mt-6",
                "data-ocid": "college.stats_row",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatCard,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
                      label: "Location",
                      value: college.location
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatCard,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-4 h-4" }),
                      label: "Annual Fees",
                      value: formatFees(college.fees),
                      highlight: true
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatCard,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        StarRating,
                        {
                          rating: college.rating,
                          size: "sm",
                          showValue: false
                        }
                      ),
                      label: "Rating",
                      value: `${college.rating.toFixed(1)} / 5.0`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatCard,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
                      label: "Placement",
                      value: `${college.placement_percentage.toFixed(0)}%`,
                      highlight: true
                    }
                  )
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8 max-w-6xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.section,
                {
                  "data-ocid": "college.description_section",
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.05 },
                  className: "bg-card rounded-2xl border border-border p-6",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-bold text-foreground mb-3 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5 text-primary" }),
                      "About the College"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm", children: college.description })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.section,
                {
                  "data-ocid": "college.courses_section",
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.1 },
                  className: "bg-card rounded-2xl border border-border p-6",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-bold text-foreground mb-4 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-primary" }),
                      "Available Courses",
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs font-normal text-muted-foreground", children: [
                        college.courses.length,
                        " programs"
                      ] })
                    ] }),
                    college.courses.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: college.courses.map((course, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-xs px-3 py-1.5 rounded-full border-primary/20 text-primary bg-primary/5 hover:bg-primary/10 transition-colors cursor-default",
                        "data-ocid": `college.course.${i + 1}`,
                        children: course
                      },
                      course
                    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Course information not available." })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.section,
                {
                  "data-ocid": "college.placements_section",
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.15 },
                  className: "bg-card rounded-2xl border border-border p-6 space-y-6",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-bold text-foreground flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-primary" }),
                      "Placement Statistics"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AnimatedProgressBar,
                      {
                        percentage: college.placement_percentage
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary" }),
                        "Top Recruiting Companies"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: recruiters.map((company) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "inline-flex items-center rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-foreground",
                          children: company
                        },
                        company
                      )) })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.section,
                {
                  "data-ocid": "college.reviews_section",
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.2 },
                  className: "space-y-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-bold text-foreground flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-primary" }),
                        "Student Reviews"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground bg-muted rounded-full px-3 py-1", children: "Based on student reviews" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: reviews.map((review, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewCard, { review, index: i }, review.name)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:sticky lg:top-6 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: 16 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: 0.1 },
                  "data-ocid": "college.summary_card",
                  className: "bg-card rounded-2xl border border-border p-5 space-y-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pb-3 border-b border-border", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: college.rating, size: "md" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Overall Rating" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 text-sm", children: [
                      { label: "Location", value: college.location },
                      {
                        label: "Annual Fees",
                        value: formatFees(college.fees),
                        accent: true
                      },
                      { label: "Type", value: college.type_ },
                      {
                        label: "Established",
                        value: String(college.established)
                      },
                      {
                        label: "Placement",
                        value: `${college.placement_percentage.toFixed(0)}%`,
                        accent: true
                      }
                    ].map(({ label, value, accent }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex justify-between items-center",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: `font-medium truncate ml-2 ${accent ? "text-primary font-bold" : "text-foreground"}`,
                              children: value
                            }
                          )
                        ]
                      },
                      label
                    )) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, x: 16 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: 0.15 },
                  className: "bg-card rounded-2xl border border-border p-5",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarActions, { college })
                }
              )
            ] }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "college.mobile_action_bar",
              className: "lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 flex gap-2 z-40 safe-area-bottom",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(MobileBar, { college })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden h-20" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ComparePanel, {})
  ] });
}
export {
  CollegeDetail as default
};
