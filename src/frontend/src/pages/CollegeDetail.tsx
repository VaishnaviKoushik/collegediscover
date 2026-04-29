import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  DollarSign,
  GitCompare,
  Heart,
  MapPin,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { ComparePanel } from "../components/ui/ComparePanel";
import { ErrorState } from "../components/ui/ErrorState";
import { CollegeDetailSkeleton } from "../components/ui/LoadingSkeleton";
import { StarRating } from "../components/ui/StarRating";
import { toast } from "../components/ui/Toast";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useAuth } from "../contexts/auth";
import { useCompare } from "../contexts/compare";
import {
  useCollege,
  useSaveCollege,
  useSavedColleges,
} from "../hooks/useColleges";
import type { College } from "../types/college";

// ── Static data helpers ───────────────────────────────────────────────────────

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
  "Accenture",
];

function getRecruiters(college: College): string[] {
  const seed = college.id + college.name.length;
  const shuffled = [...TOP_RECRUITERS].sort((a, b) => {
    const ha = (a.charCodeAt(0) + seed) % TOP_RECRUITERS.length;
    const hb = (b.charCodeAt(0) + seed) % TOP_RECRUITERS.length;
    return ha - hb;
  });
  return shuffled.slice(0, 6 + (seed % 3));
}

interface MockReview {
  initials: string;
  name: string;
  year: number;
  rating: number;
  text: string;
}

const REVIEW_TEMPLATES: ((name: string) => string)[] = [
  (n) =>
    `${n} gave me skills that actually matter in industry. The faculty is world-class and campus culture is vibrant and inclusive.`,
  (n) =>
    `The placements at ${n} exceeded all expectations. I landed my dream job at a top firm thanks to the stellar alumni network.`,
  (n) =>
    `${n} is a great place to grow both academically and professionally. Infrastructure, labs, and support services are all top-notch.`,
  (n) =>
    `The diverse curriculum at ${n} prepared me for real-world challenges. Highly recommend for anyone serious about their career.`,
];

const REVIEWER_DATA: [string, string][] = [
  ["Arjun Sharma", "AS"],
  ["Priya Kapoor", "PK"],
  ["Rohan Mehta", "RM"],
  ["Sneha Patel", "SP"],
];

function getMockReviews(college: College): MockReview[] {
  const seed = college.id;
  const shortName = college.name.split(" ")[0];
  return REVIEWER_DATA.map(([name, initials], i) => ({
    initials,
    name,
    year: 2020 + ((seed + i) % 4),
    rating: 3.8 + ((seed + i) % 12) * 0.1,
    text: REVIEW_TEMPLATES[i](shortName),
  }));
}

function formatFees(fees: number): string {
  if (fees >= 100_000) return `$${(fees / 1_000).toFixed(0)}K/yr`;
  return `$${fees.toLocaleString()}/yr`;
}

// ── Reusable sub-components ───────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-xl border p-4 ${
        highlight ? "bg-primary/5 border-primary/20" : "bg-card border-border"
      }`}
    >
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <span className={highlight ? "text-primary" : ""}>{icon}</span>
        <span className="text-xs font-medium uppercase tracking-wider truncate">
          {label}
        </span>
      </div>
      <span className="text-lg font-bold text-foreground leading-tight truncate">
        {value}
      </span>
    </div>
  );
}

function AnimatedProgressBar({ percentage }: { percentage: number }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-5xl font-bold text-primary leading-none">
          {percentage.toFixed(0)}%
        </span>
        <span className="text-sm text-muted-foreground pb-1">
          placement rate
        </span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: ready ? `${percentage}%` : 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Based on last graduating batch
      </p>
    </div>
  );
}

function ReviewCard({ review, index }: { review: MockReview; index: number }) {
  return (
    <motion.div
      data-ocid={`college.review.${index + 1}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
          {review.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm text-foreground truncate">
            {review.name}
          </p>
          <p className="text-xs text-muted-foreground">
            Class of {review.year}
          </p>
        </div>
        <div className="shrink-0">
          <StarRating rating={review.rating} size="sm" showValue={false} />
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
        &ldquo;{review.text}&rdquo;
      </p>
    </motion.div>
  );
}

// ── 404 Not Found ─────────────────────────────────────────────────────────────

function NotFound() {
  return (
    <div
      data-ocid="college.not_found"
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-6">
        <Building2 className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">
        College Not Found
      </h2>
      <p className="text-muted-foreground mb-6 max-w-sm text-sm">
        The college you&apos;re looking for doesn&apos;t exist or may have been
        removed.
      </p>
      <Link to="/">
        <Button data-ocid="college.not_found.back_button">
          Browse All Colleges
        </Button>
      </Link>
    </div>
  );
}

// ── Login prompt ──────────────────────────────────────────────────────────────

function LoginPrompt({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-center space-y-2">
      <p className="text-sm font-medium text-foreground">
        Sign in to save this college
      </p>
      <p className="text-xs text-muted-foreground">
        Track your shortlist and compare later
      </p>
      <Button
        size="sm"
        onClick={onLogin}
        data-ocid="college.login_prompt.button"
        className="w-full"
      >
        Sign In
      </Button>
    </div>
  );
}

// ── Sidebar Actions ───────────────────────────────────────────────────────────

function SidebarActions({ college }: { college: College }) {
  const { isAuthenticated, login } = useAuth();
  const { save, unsave } = useSaveCollege();
  const { data: savedColleges = [] } = useSavedColleges();
  const { addCollege, removeCollege, isSelected, selectedColleges } =
    useCompare();

  const [showPrompt, setShowPrompt] = useState(false);

  const isSaved = useMemo(
    () => savedColleges.some((c) => c.id === college.id),
    [savedColleges, college.id],
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
        onSuccess: () => toast.success("Removed from saved colleges"),
        onError: () => toast.error("Failed to unsave. Try again."),
      });
    } else {
      save.mutate(college.id, {
        onSuccess: () => toast.success("College saved to your shortlist!"),
        onError: () => toast.error("Failed to save. Try again."),
      });
    }
  }

  function handleCompare() {
    if (inCompare) {
      removeCollege(college.id);
      toast.info(`${college.name} removed from compare`);
    } else if (!compareFull) {
      addCollege(college);
      toast.success(`Added to compare (${selectedColleges.length + 1}/3)`);
    }
  }

  function handleShare() {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy link"));
  }

  return (
    <div data-ocid="college.action_bar" className="flex flex-col gap-3">
      <AnimatePresence>
        {showPrompt && !isAuthenticated && (
          <motion.div
            key="login-prompt"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <LoginPrompt onLogin={login} />
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        data-ocid="college.save_button"
        variant={isSaved ? "default" : "outline"}
        className="w-full gap-2 transition-smooth"
        onClick={handleSave}
        disabled={save.isPending || unsave.isPending}
      >
        <Heart
          className={`w-4 h-4 ${isSaved ? "fill-primary-foreground" : ""}`}
        />
        {isSaved ? "Saved to Shortlist" : "Save College"}
      </Button>

      <Button
        data-ocid="college.compare_button"
        variant={inCompare ? "secondary" : "outline"}
        className="w-full gap-2 transition-smooth"
        onClick={handleCompare}
        disabled={compareFull}
        title={compareFull ? "Compare list is full (max 3)" : undefined}
      >
        <GitCompare className="w-4 h-4" />
        {inCompare
          ? "In Compare List"
          : compareFull
            ? "Compare Full (3/3)"
            : "Add to Compare"}
      </Button>

      {inCompare && (
        <Link to="/compare" className="block">
          <Button
            data-ocid="college.view_compare_button"
            className="w-full gap-2"
          >
            <GitCompare className="w-4 h-4" />
            View Comparison
          </Button>
        </Link>
      )}

      <Button
        data-ocid="college.share_button"
        variant="ghost"
        className="w-full gap-2 text-muted-foreground"
        onClick={handleShare}
      >
        <Share2 className="w-4 h-4" />
        Share
      </Button>
    </div>
  );
}

// ── Mobile bottom action bar ──────────────────────────────────────────────────

function MobileBar({ college }: { college: College }) {
  const { isAuthenticated, login } = useAuth();
  const { save, unsave } = useSaveCollege();
  const { data: savedColleges = [] } = useSavedColleges();
  const { addCollege, removeCollege, isSelected, selectedColleges } =
    useCompare();

  const isSaved = useMemo(
    () => savedColleges.some((c) => c.id === college.id),
    [savedColleges, college.id],
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
        onSuccess: () => toast.success("Removed from saved"),
      });
    } else {
      save.mutate(college.id, {
        onSuccess: () => toast.success("College saved!"),
      });
    }
  }

  function handleCompare() {
    if (inCompare) {
      removeCollege(college.id);
    } else if (!compareFull) {
      addCollege(college);
      toast.success(`Added to compare (${selectedColleges.length + 1}/3)`);
    }
  }

  function handleShare() {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => toast.success("Link copied!"));
  }

  return (
    <>
      <Button
        data-ocid="college.mobile.save_button"
        variant={isSaved ? "default" : "outline"}
        size="sm"
        onClick={handleSave}
        disabled={save.isPending || unsave.isPending}
        className="flex-1 gap-1.5"
      >
        <Heart
          className={`w-4 h-4 ${isSaved ? "fill-primary-foreground" : ""}`}
        />
        {isSaved ? "Saved" : "Save"}
      </Button>
      <Button
        data-ocid="college.mobile.compare_button"
        variant={inCompare ? "secondary" : "outline"}
        size="sm"
        onClick={handleCompare}
        disabled={compareFull}
        className="flex-1 gap-1.5"
      >
        <GitCompare className="w-4 h-4" />
        {inCompare ? "In Compare" : "Compare"}
      </Button>
      <Button
        data-ocid="college.mobile.share_button"
        variant="ghost"
        size="icon"
        onClick={handleShare}
        className="shrink-0"
        aria-label="Share"
      >
        <Share2 className="w-4 h-4" />
      </Button>
    </>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function CollegeDetail() {
  const { id } = useParams({ from: "/college/$id" });
  const numId = Number(id);

  const { data: college, isLoading, isError, refetch } = useCollege(numId);

  const recruiters = useMemo(
    () => (college ? getRecruiters(college) : []),
    [college],
  );
  const reviews = useMemo(
    () => (college ? getMockReviews(college) : []),
    [college],
  );

  useEffect(() => {
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
    return (
      <div className="container mx-auto px-4 py-8">
        <CollegeDetailSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState
          title="Failed to load college"
          description="We couldn't fetch this college's details. Please try again."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (!college) {
    return (
      <div className="container mx-auto px-4 py-8">
        <NotFound />
      </div>
    );
  }

  return (
    <>
      <div
        data-ocid="college.detail_page"
        className="min-h-screen bg-background"
      >
        {/* ── Hero header ─── */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-6 max-w-6xl">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              data-ocid="college.breadcrumb"
              className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4"
            >
              <Link
                to="/"
                data-ocid="college.breadcrumb.home_link"
                className="hover:text-primary transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground truncate max-w-[200px]">
                {college.name}
              </span>
            </nav>

            <div className="flex items-start gap-3">
              {/* Back button */}
              <Link to="/" aria-label="Back to listings">
                <Button
                  variant="ghost"
                  size="icon"
                  data-ocid="college.back_button"
                  className="rounded-xl mt-0.5 shrink-0"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>

              {/* Title area */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="secondary" data-ocid="college.type_badge">
                    {college.type_}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="gap-1 text-muted-foreground"
                  >
                    <CalendarDays className="w-3 h-3" />
                    Est. {college.established}
                  </Badge>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight break-words">
                  {college.name}
                </h1>
                <div className="flex items-center gap-1.5 mt-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="text-sm">{college.location}</span>
                </div>
              </div>
            </div>

            {/* Key stats */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6"
              data-ocid="college.stats_row"
            >
              <StatCard
                icon={<MapPin className="w-4 h-4" />}
                label="Location"
                value={college.location}
              />
              <StatCard
                icon={<DollarSign className="w-4 h-4" />}
                label="Annual Fees"
                value={formatFees(college.fees)}
                highlight
              />
              <StatCard
                icon={
                  <StarRating
                    rating={college.rating}
                    size="sm"
                    showValue={false}
                  />
                }
                label="Rating"
                value={`${college.rating.toFixed(1)} / 5.0`}
              />
              <StatCard
                icon={<TrendingUp className="w-4 h-4" />}
                label="Placement"
                value={`${college.placement_percentage.toFixed(0)}%`}
                highlight
              />
            </div>
          </div>
        </div>

        {/* ── Body ─── */}
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <motion.section
                data-ocid="college.description_section"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="bg-card rounded-2xl border border-border p-6"
              >
                <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  About the College
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {college.description}
                </p>
              </motion.section>

              {/* Courses */}
              <motion.section
                data-ocid="college.courses_section"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl border border-border p-6"
              >
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Available Courses
                  <span className="ml-auto text-xs font-normal text-muted-foreground">
                    {college.courses.length} programs
                  </span>
                </h2>
                {college.courses.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {college.courses.map((course, i) => (
                      <Badge
                        key={course}
                        variant="outline"
                        className="text-xs px-3 py-1.5 rounded-full border-primary/20 text-primary bg-primary/5 hover:bg-primary/10 transition-colors cursor-default"
                        data-ocid={`college.course.${i + 1}`}
                      >
                        {course}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Course information not available.
                  </p>
                )}
              </motion.section>

              {/* Placements */}
              <motion.section
                data-ocid="college.placements_section"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-card rounded-2xl border border-border p-6 space-y-6"
              >
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Placement Statistics
                </h2>

                <AnimatedProgressBar
                  percentage={college.placement_percentage}
                />

                <div>
                  <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Top Recruiting Companies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recruiters.map((company) => (
                      <span
                        key={company}
                        className="inline-flex items-center rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-foreground"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.section>

              {/* Reviews */}
              <motion.section
                data-ocid="college.reviews_section"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Student Reviews
                  </h2>
                  <span className="text-xs text-muted-foreground bg-muted rounded-full px-3 py-1">
                    Based on student reviews
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {reviews.map((review, i) => (
                    <ReviewCard key={review.name} review={review} index={i} />
                  ))}
                </div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-6 space-y-4">
                {/* Summary card */}
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  data-ocid="college.summary_card"
                  className="bg-card rounded-2xl border border-border p-5 space-y-4"
                >
                  <div className="text-center pb-3 border-b border-border">
                    <div className="flex justify-center mb-1">
                      <StarRating rating={college.rating} size="md" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Overall Rating
                    </p>
                  </div>

                  <div className="space-y-3 text-sm">
                    {[
                      { label: "Location", value: college.location },
                      {
                        label: "Annual Fees",
                        value: formatFees(college.fees),
                        accent: true,
                      },
                      { label: "Type", value: college.type_ },
                      {
                        label: "Established",
                        value: String(college.established),
                      },
                      {
                        label: "Placement",
                        value: `${college.placement_percentage.toFixed(0)}%`,
                        accent: true,
                      },
                    ].map(({ label, value, accent }) => (
                      <div
                        key={label}
                        className="flex justify-between items-center"
                      >
                        <span className="text-muted-foreground">{label}</span>
                        <span
                          className={`font-medium truncate ml-2 ${
                            accent
                              ? "text-primary font-bold"
                              : "text-foreground"
                          }`}
                        >
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="bg-card rounded-2xl border border-border p-5"
                >
                  <SidebarActions college={college} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile sticky bottom bar */}
        <div
          data-ocid="college.mobile_action_bar"
          className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 flex gap-2 z-40 safe-area-bottom"
        >
          <MobileBar college={college} />
        </div>
        {/* Spacer for mobile bar */}
        <div className="lg:hidden h-20" />
      </div>

      <ComparePanel />
    </>
  );
}
