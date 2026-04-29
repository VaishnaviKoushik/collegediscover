import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  MapPin,
  School,
  SlidersHorizontal,
  X,
} from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import { CollegeCard } from "../components/ui/CollegeCard";
import { ComparePanel } from "../components/ui/ComparePanel";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorState } from "../components/ui/ErrorState";
import { FilterPanel } from "../components/ui/FilterPanel";
import {
  CollegeGridSkeleton,
  FilterPanelSkeleton,
} from "../components/ui/LoadingSkeleton";
import { Button } from "../components/ui/button";
import { useCompare } from "../contexts/compare";
import {
  useColleges,
  useLocations,
  useSaveCollege,
  useSavedColleges,
} from "../hooks/useColleges";
import type { CollegeFilter } from "../types/college";

const PAGE_SIZE = 12;

function parsePositiveInt(val: unknown): number | undefined {
  const n = Number(val);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : undefined;
}

function buildFilter(params: Record<string, string>): CollegeFilter {
  return {
    search: params.search || undefined,
    location: params.location || undefined,
    minFees: parsePositiveInt(params.minFees),
    maxFees: parsePositiveInt(params.maxFees),
    page: Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1),
    pageSize: PAGE_SIZE,
  };
}

// ── Stat card ────────────────────────────────────────────────────────────────
function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-card/80 border border-border/60 rounded-xl px-5 py-3.5">
      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xl font-bold text-foreground leading-none">
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
      </div>
    </div>
  );
}

// ── Active filter badge ───────────────────────────────────────────────────────
function ActiveFilterBadge({
  label,
  onRemove,
  ocid,
}: {
  label: string;
  onRemove: () => void;
  ocid: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary text-xs font-medium rounded-full px-3 py-1"
      data-ocid={ocid}
    >
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="hover:text-destructive transition-smooth"
        aria-label={`Remove ${label} filter`}
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

// ── Pagination ─────────────────────────────────────────────────────────────
function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  return (
    <div
      className="flex items-center justify-center gap-3 mt-8"
      data-ocid="home.pagination"
    >
      <Button
        variant="outline"
        size="icon"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
        data-ocid="home.pagination_prev"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <span className="text-sm font-medium text-foreground min-w-[90px] text-center">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="icon"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
        data-ocid="home.pagination_next"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function HomePage() {
  const rawSearch = useSearch({ strict: false }) as Record<string, string>;
  const navigate = useNavigate();

  const filter = useMemo(() => buildFilter(rawSearch), [rawSearch]);

  const {
    data: pagedColleges,
    isLoading,
    isError,
    refetch,
  } = useColleges(filter);
  const { data: locations = [], isLoading: locationsLoading } = useLocations();
  const { data: savedColleges = [] } = useSavedColleges();
  const { save, unsave } = useSaveCollege();
  const { selectedColleges } = useCompare();

  const savedIds = useMemo(
    () => new Set(savedColleges.map((c) => c.id)),
    [savedColleges],
  );

  const colleges = pagedColleges?.colleges ?? [];
  const total = pagedColleges?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const showPagination = total > PAGE_SIZE;

  function updateParams(updates: Record<string, string | undefined>) {
    const next: Record<string, string> = { ...rawSearch };
    for (const [k, v] of Object.entries(updates)) {
      if (v === undefined || v === "") {
        delete next[k];
      } else {
        next[k] = v;
      }
    }
    navigate({ to: "/", search: next });
  }

  function handleFilterChange(newFilter: CollegeFilter) {
    updateParams({
      search: newFilter.search,
      location: newFilter.location,
      minFees: newFilter.minFees?.toString(),
      maxFees: newFilter.maxFees?.toString(),
      page: "1",
    });
  }

  function handlePageChange(p: number) {
    updateParams({ page: String(p) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function clearAllFilters() {
    navigate({ to: "/", search: {} });
  }

  // Active filter badges
  const activeFilters: { label: string; key: string; ocid: string }[] = [];
  if (filter.search)
    activeFilters.push({
      label: `"${filter.search}"`,
      key: "search",
      ocid: "home.filter_badge.search",
    });
  if (filter.location)
    activeFilters.push({
      label: filter.location,
      key: "location",
      ocid: "home.filter_badge.location",
    });
  if (filter.minFees !== undefined)
    activeFilters.push({
      label: `Min $${filter.minFees.toLocaleString()}`,
      key: "minFees",
      ocid: "home.filter_badge.min_fees",
    });
  if (filter.maxFees !== undefined)
    activeFilters.push({
      label: `Max $${filter.maxFees.toLocaleString()}`,
      key: "maxFees",
      ocid: "home.filter_badge.max_fees",
    });

  return (
    <div className="min-h-screen" data-ocid="home.page">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="bg-card border-b border-border"
        data-ocid="home.hero.section"
      >
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-2xl">
            <span className="badge-stat inline-flex mb-4">
              <GraduationCap className="w-3.5 h-3.5 mr-1.5" />
              College Discovery Platform
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
              Find Your <span className="text-primary">Perfect College</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Discover, compare, and shortlist from colleges across the country.
              Make your most important decision with confidence.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/compare" data-ocid="home.hero.compare_link">
                <Button className="flex items-center gap-2" size="lg">
                  Compare Colleges
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="#colleges">
                <Button
                  variant="outline"
                  size="lg"
                  data-ocid="home.hero.browse_button"
                >
                  Browse All
                </Button>
              </a>
            </div>
          </div>

          {/* Stats bar */}
          <div
            className="flex flex-wrap gap-3 mt-10"
            data-ocid="home.stats.section"
          >
            <StatCard
              icon={<School className="w-4 h-4" />}
              value="50+"
              label="Colleges"
            />
            <StatCard
              icon={<MapPin className="w-4 h-4" />}
              value="10+"
              label="States"
            />
            <StatCard
              icon={<BookOpen className="w-4 h-4" />}
              value="Free"
              label="to Use"
            />
          </div>
        </div>
      </section>

      {/* ── Body: sidebar + grid ────────────────────────────────────── */}
      <section
        id="colleges"
        className="bg-background py-10"
        data-ocid="home.colleges.section"
      >
        <div className="container mx-auto px-4">
          <div className="flex gap-8 items-start">
            {/* Sidebar filter (desktop) */}
            <aside className="hidden lg:block w-64 shrink-0 sticky top-24">
              <div className="flex items-center gap-2 mb-3">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  Filters
                </span>
              </div>
              {locationsLoading ? (
                <FilterPanelSkeleton />
              ) : (
                <FilterPanel
                  filter={filter}
                  locations={locations}
                  onFilterChange={handleFilterChange}
                />
              )}
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Mobile inline filter */}
              <div className="lg:hidden mb-5" data-ocid="home.filter.panel">
                {locationsLoading ? (
                  <FilterPanelSkeleton />
                ) : (
                  <FilterPanel
                    filter={filter}
                    locations={locations}
                    onFilterChange={handleFilterChange}
                  />
                )}
              </div>

              {/* Result count + active badges */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
                <div>
                  {isLoading ? (
                    <p className="text-sm text-muted-foreground">Loading...</p>
                  ) : (
                    <p
                      className="text-sm font-medium text-muted-foreground"
                      data-ocid="home.results.count"
                    >
                      Showing{" "}
                      <span className="text-foreground font-semibold">
                        {colleges.length}
                      </span>{" "}
                      of{" "}
                      <span className="text-foreground font-semibold">
                        {total}
                      </span>{" "}
                      colleges
                    </p>
                  )}

                  {activeFilters.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      {activeFilters.map((f) => (
                        <ActiveFilterBadge
                          key={f.key}
                          label={f.label}
                          onRemove={() =>
                            updateParams({ [f.key]: undefined, page: "1" })
                          }
                          ocid={f.ocid}
                        />
                      ))}
                      <button
                        type="button"
                        onClick={clearAllFilters}
                        className="text-xs text-muted-foreground underline hover:text-foreground transition-smooth"
                        data-ocid="home.clear_all_filters.button"
                      >
                        Clear all
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Grid / states */}
              {isLoading ? (
                <CollegeGridSkeleton count={PAGE_SIZE} />
              ) : isError ? (
                <ErrorState
                  title="Failed to load colleges"
                  description="We couldn't fetch the college list. Please check your connection and try again."
                  onRetry={() => refetch()}
                />
              ) : colleges.length === 0 ? (
                <EmptyState
                  icon={<School className="w-8 h-8" />}
                  title="No colleges found"
                  description="No colleges matching your search. Try adjusting your filters."
                  action={{
                    label: "Clear Filters",
                    onClick: clearAllFilters,
                    ocid: "home.empty_state.clear_button",
                  }}
                />
              ) : (
                <>
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                    data-ocid="home.colleges.list"
                  >
                    {colleges.map((college, idx) => (
                      <CollegeCard
                        key={college.id}
                        college={college}
                        isSaved={savedIds.has(college.id)}
                        onSave={(id) => save.mutate(id)}
                        onUnsave={(id) => unsave.mutate(id)}
                        index={idx + 1}
                      />
                    ))}
                  </div>

                  {showPagination && (
                    <Pagination
                      page={filter.page}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Floating compare panel ──────────────────────────────────── */}
      {selectedColleges.length > 0 && <ComparePanel />}
    </div>
  );
}
