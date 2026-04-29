import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Building2,
  CalendarDays,
  GitCompare,
  MapPin,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { EmptyState } from "../components/ui/EmptyState";
import { StarRating } from "../components/ui/StarRating";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useCompare } from "../contexts/compare";
import type { College } from "../types/college";

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatFees(fees: number) {
  return `$${fees.toLocaleString()}/year`;
}

function getBestFees(colleges: College[]): number {
  return Math.min(...colleges.map((c) => c.fees));
}
function getBestRating(colleges: College[]): number {
  return Math.max(...colleges.map((c) => c.rating));
}
function getBestPlacement(colleges: College[]): number {
  return Math.max(...colleges.map((c) => c.placement_percentage));
}

// ── Sub-components ────────────────────────────────────────────────────────────

interface CollegeHeaderProps {
  college: College;
  isBestValue: boolean;
  isTopRated: boolean;
  onRemove: () => void;
  index: number;
}

function CollegeHeader({
  college,
  isBestValue,
  isTopRated,
  onRemove,
  index,
}: CollegeHeaderProps) {
  return (
    <th
      className="text-left px-5 py-5 min-w-[220px] align-top"
      data-ocid={`compare.college_header.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          {/* Badges row */}
          <div className="flex flex-wrap gap-1 mb-2">
            {isBestValue && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                <Sparkles className="w-3 h-3" />
                Best Value
              </span>
            )}
            {isTopRated && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                <Award className="w-3 h-3" />
                Top Rated
              </span>
            )}
          </div>
          <p className="font-display font-bold text-foreground text-base leading-tight line-clamp-2">
            {college.name}
          </p>
          <div className="flex items-center gap-1 mt-1.5 text-muted-foreground text-xs">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{college.location}</span>
          </div>
          <div className="mt-2">
            <StarRating rating={college.rating} size="sm" showValue />
          </div>
          <Link
            to="/college/$id"
            params={{ id: String(college.id) }}
            className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline mt-2 transition-colors"
            data-ocid={`compare.view_detail_link.${index + 1}`}
          >
            View Details →
          </Link>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
          aria-label={`Remove ${college.name}`}
          data-ocid={`compare.remove_button.${index + 1}`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </th>
  );
}

// ── Row Renderers ─────────────────────────────────────────────────────────────

interface FeesRowProps {
  colleges: College[];
  bestFees: number;
}
function FeesRow({ colleges, bestFees }: FeesRowProps) {
  return (
    <>
      {colleges.map((college, idx) => {
        const isLowest = college.fees === bestFees;
        return (
          <td
            key={college.id}
            className="px-5 py-4"
            data-ocid={`compare.fees_cell.${idx + 1}`}
          >
            <span
              className={`font-semibold text-sm ${isLowest ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}
            >
              {formatFees(college.fees)}
            </span>
            {isLowest && (
              <span className="ml-1.5 inline-flex items-center rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                ↓ Lowest
              </span>
            )}
          </td>
        );
      })}
    </>
  );
}

interface RatingRowProps {
  colleges: College[];
  bestRating: number;
}
function RatingRow({ colleges, bestRating }: RatingRowProps) {
  return (
    <>
      {colleges.map((college, idx) => {
        const isTop = college.rating === bestRating;
        return (
          <td
            key={college.id}
            className="px-5 py-4"
            data-ocid={`compare.rating_cell.${idx + 1}`}
          >
            <div className="flex items-center gap-1.5">
              <StarRating rating={college.rating} size="sm" showValue />
              {isTop && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold text-primary">
                  ★ Highest
                </span>
              )}
            </div>
          </td>
        );
      })}
    </>
  );
}

interface PlacementRowProps {
  colleges: College[];
  bestPlacement: number;
}
function PlacementRow({ colleges, bestPlacement }: PlacementRowProps) {
  return (
    <>
      {colleges.map((college, idx) => {
        const isTop = college.placement_percentage === bestPlacement;
        const pct = college.placement_percentage;
        return (
          <td
            key={college.id}
            className="px-5 py-4"
            data-ocid={`compare.placement_cell.${idx + 1}`}
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-semibold text-sm ${isTop ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}
                >
                  {pct.toFixed(1)}%
                </span>
                {isTop && (
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                    ↑ Highest
                  </span>
                )}
              </div>
              <div className="w-full max-w-[120px] h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${isTop ? "bg-emerald-500" : "bg-primary/50"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </td>
        );
      })}
    </>
  );
}

// ── Decision Helper ───────────────────────────────────────────────────────────

function DecisionHelper({ colleges }: { colleges: College[] }) {
  const bestPlacement = getBestPlacement(colleges);
  const bestFees = getBestFees(colleges);
  const bestRating = getBestRating(colleges);

  const topPlacementCollege = colleges.find(
    (c) => c.placement_percentage === bestPlacement,
  )!;
  const bestValueCollege = colleges.find((c) => c.fees === bestFees)!;
  const topRatedCollege = colleges.find((c) => c.rating === bestRating)!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="mt-6 rounded-2xl bg-primary/5 border border-primary/20 p-6"
      data-ocid="compare.decision_helper"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-display font-semibold text-foreground">
          Our Recommendation
        </h3>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-xl bg-card border border-border p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Best Placement
            </span>
          </div>
          <p className="font-display font-bold text-foreground text-sm leading-tight">
            {topPlacementCollege.name}
          </p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5 font-medium">
            {topPlacementCollege.placement_percentage.toFixed(1)}% placement
            rate
          </p>
        </div>

        <div className="rounded-xl bg-card border border-border p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Best Value
            </span>
          </div>
          <p className="font-display font-bold text-foreground text-sm leading-tight">
            {bestValueCollege.name}
          </p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5 font-medium">
            {formatFees(bestValueCollege.fees)}
          </p>
        </div>

        <div className="rounded-xl bg-card border border-border p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Top Rated
            </span>
          </div>
          <p className="font-display font-bold text-foreground text-sm leading-tight">
            {topRatedCollege.name}
          </p>
          <p className="text-xs text-primary mt-0.5 font-medium">
            {topRatedCollege.rating.toFixed(1)} / 5 stars
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
        Based on your selection,{" "}
        <span className="font-semibold text-foreground">
          {topPlacementCollege.name}
        </span>{" "}
        offers the best placement record at{" "}
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          {topPlacementCollege.placement_percentage.toFixed(1)}%
        </span>
        , while{" "}
        <span className="font-semibold text-foreground">
          {bestValueCollege.name}
        </span>{" "}
        is the most affordable option at{" "}
        <span className="font-semibold text-foreground">
          {formatFees(bestValueCollege.fees)}
        </span>
        .
      </p>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Compare() {
  const { selectedColleges, removeCollege, clearCompare, canCompare } =
    useCompare();
  const navigate = useNavigate();

  // ── Empty / Not enough state ──────────────────────────────────────────────

  if (selectedColleges.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8" data-ocid="compare.page">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="compare.back_link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to colleges
          </Link>
        </div>
        <EmptyState
          icon={<GitCompare className="w-8 h-8" />}
          title="Select 2–3 colleges to compare"
          description="Go to the college listing and check the compare boxes on any college card."
          action={{
            label: "Browse Colleges",
            onClick: () => navigate({ to: "/" }),
            ocid: "compare.browse_button",
          }}
        />
      </div>
    );
  }

  if (!canCompare) {
    return (
      <div className="container mx-auto px-4 py-8" data-ocid="compare.page">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="compare.back_link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to colleges
          </Link>
        </div>
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Compare Colleges
          </h1>
          <p className="text-muted-foreground mt-1">Making the right choice</p>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
          <p className="text-sm text-foreground font-medium">
            {2 - selectedColleges.length} more college needed to start comparing
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Go to the college listing and check the compare boxes on more cards.
          </p>
          <Button
            size="sm"
            className="mt-3"
            onClick={() => navigate({ to: "/" })}
            data-ocid="compare.add_more_button"
          >
            Add More Colleges
          </Button>
        </div>

        {/* Preview the single selected college */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedColleges.map((college, idx) => (
            <div
              key={college.id}
              className="rounded-xl border border-border bg-card p-4 flex items-start justify-between gap-3"
              data-ocid={`compare.pending_card.${idx + 1}`}
            >
              <div>
                <p className="font-semibold text-foreground text-sm leading-tight">
                  {college.name}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <MapPin className="w-3 h-3" />
                  {college.location}
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeCollege(college.id)}
                className="p-1 rounded text-muted-foreground hover:text-destructive transition-smooth"
                aria-label={`Remove ${college.name}`}
                data-ocid={`compare.remove_pending_button.${idx + 1}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Full Comparison Table ────────────────────────────────────────────────

  const colleges = selectedColleges;
  const bestFees = getBestFees(colleges);
  const bestRating = getBestRating(colleges);
  const bestPlacement = getBestPlacement(colleges);

  return (
    <div className="container mx-auto px-4 py-8" data-ocid="compare.page">
      {/* Page header */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
          data-ocid="compare.back_link"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to colleges
        </Link>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Compare Colleges
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Making the right choice — side-by-side analysis
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={clearCompare}
            data-ocid="compare.clear_button"
            className="shrink-0"
          >
            <X className="w-4 h-4 mr-1.5" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Comparison table */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        data-ocid="compare.table_section"
      >
        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm">
            {/* Column headers: college names */}
            <thead>
              <tr className="border-b border-border">
                {/* Row label column header */}
                <th className="text-left px-5 py-5 w-44 min-w-[160px] bg-muted/30 border-r border-border/50">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Feature
                  </span>
                </th>
                {colleges.map((college, idx) => (
                  <CollegeHeader
                    key={college.id}
                    college={college}
                    isBestValue={college.fees === bestFees}
                    isTopRated={college.rating === bestRating}
                    onRemove={() => removeCollege(college.id)}
                    index={idx}
                  />
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Location row */}
              <tr
                className="border-b border-border/50 bg-background hover:bg-muted/10 transition-colors"
                data-ocid="compare.row.location"
              >
                <td className="px-5 py-4 bg-muted/20 border-r border-border/50">
                  <div className="flex items-center gap-2 text-muted-foreground font-medium text-xs uppercase tracking-wide">
                    <MapPin className="w-3.5 h-3.5" />
                    Location
                  </div>
                </td>
                {colleges.map((college, idx) => (
                  <td
                    key={college.id}
                    className="px-5 py-4 text-foreground text-sm"
                    data-ocid={`compare.location_cell.${idx + 1}`}
                  >
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
                      {college.location}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Fees row */}
              <tr
                className="border-b border-border/50 bg-muted/10 hover:bg-muted/20 transition-colors"
                data-ocid="compare.row.fees"
              >
                <td className="px-5 py-4 bg-muted/20 border-r border-border/50">
                  <div className="flex items-center gap-2 text-muted-foreground font-medium text-xs uppercase tracking-wide">
                    <Sparkles className="w-3.5 h-3.5" />
                    Annual Fees
                  </div>
                </td>
                <FeesRow colleges={colleges} bestFees={bestFees} />
              </tr>

              {/* Rating row */}
              <tr
                className="border-b border-border/50 bg-background hover:bg-muted/10 transition-colors"
                data-ocid="compare.row.rating"
              >
                <td className="px-5 py-4 bg-muted/20 border-r border-border/50">
                  <div className="flex items-center gap-2 text-muted-foreground font-medium text-xs uppercase tracking-wide">
                    <Award className="w-3.5 h-3.5" />
                    Rating
                  </div>
                </td>
                <RatingRow colleges={colleges} bestRating={bestRating} />
              </tr>

              {/* Placement row */}
              <tr
                className="border-b border-border/50 bg-muted/10 hover:bg-muted/20 transition-colors"
                data-ocid="compare.row.placement"
              >
                <td className="px-5 py-4 bg-muted/20 border-r border-border/50">
                  <div className="flex items-center gap-2 text-muted-foreground font-medium text-xs uppercase tracking-wide">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Placement %
                  </div>
                </td>
                <PlacementRow
                  colleges={colleges}
                  bestPlacement={bestPlacement}
                />
              </tr>

              {/* Established row */}
              <tr
                className="border-b border-border/50 bg-background hover:bg-muted/10 transition-colors"
                data-ocid="compare.row.established"
              >
                <td className="px-5 py-4 bg-muted/20 border-r border-border/50">
                  <div className="flex items-center gap-2 text-muted-foreground font-medium text-xs uppercase tracking-wide">
                    <CalendarDays className="w-3.5 h-3.5" />
                    Established
                  </div>
                </td>
                {colleges.map((college, idx) => (
                  <td
                    key={college.id}
                    className="px-5 py-4 text-foreground text-sm"
                    data-ocid={`compare.established_cell.${idx + 1}`}
                  >
                    {college.established}
                  </td>
                ))}
              </tr>

              {/* Type row */}
              <tr
                className="border-b border-border/50 bg-muted/10 hover:bg-muted/20 transition-colors"
                data-ocid="compare.row.type"
              >
                <td className="px-5 py-4 bg-muted/20 border-r border-border/50">
                  <div className="flex items-center gap-2 text-muted-foreground font-medium text-xs uppercase tracking-wide">
                    <Building2 className="w-3.5 h-3.5" />
                    Type
                  </div>
                </td>
                {colleges.map((college, idx) => (
                  <td
                    key={college.id}
                    className="px-5 py-4"
                    data-ocid={`compare.type_cell.${idx + 1}`}
                  >
                    <Badge variant="secondary" className="text-xs font-medium">
                      {college.type_}
                    </Badge>
                  </td>
                ))}
              </tr>

              {/* Courses row */}
              <tr
                className="bg-background hover:bg-muted/10 transition-colors"
                data-ocid="compare.row.courses"
              >
                <td className="px-5 py-4 bg-muted/20 border-r border-border/50">
                  <div className="flex items-center gap-2 text-muted-foreground font-medium text-xs uppercase tracking-wide">
                    <BookOpen className="w-3.5 h-3.5" />
                    Courses
                  </div>
                </td>
                {colleges.map((college, idx) => {
                  const courseList = college.courses.join(", ");
                  const MAX = 80;
                  const display =
                    courseList.length > MAX
                      ? `${courseList.slice(0, MAX)}…`
                      : courseList;
                  return (
                    <td
                      key={college.id}
                      className="px-5 py-4 text-foreground text-sm"
                      data-ocid={`compare.courses_cell.${idx + 1}`}
                    >
                      <span
                        className="text-muted-foreground"
                        title={courseList}
                      >
                        {display}
                      </span>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Decision helper */}
        <DecisionHelper colleges={colleges} />

        {/* Action row */}
        <div
          className="mt-6 flex flex-wrap items-center gap-3"
          data-ocid="compare.actions"
        >
          <Button
            variant="outline"
            onClick={clearCompare}
            data-ocid="compare.clear_all_button"
          >
            <X className="w-4 h-4 mr-1.5" />
            Clear All
          </Button>
          {colleges.map((college, idx) => (
            <Link
              key={college.id}
              to="/college/$id"
              params={{ id: String(college.id) }}
              data-ocid={`compare.detail_link.${idx + 1}`}
            >
              <Button variant="secondary" size="sm">
                View {college.name.split(" ").slice(0, 2).join(" ")}
              </Button>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
