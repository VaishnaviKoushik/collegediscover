import { useNavigate } from "@tanstack/react-router";
import { Bookmark, Heart } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { CollegeCard } from "../components/ui/CollegeCard";
import { ComparePanel } from "../components/ui/ComparePanel";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorState } from "../components/ui/ErrorState";
import { CollegeGridSkeleton } from "../components/ui/LoadingSkeleton";
import { Badge } from "../components/ui/badge";
import { useAuth } from "../contexts/auth";
import { useSaveCollege, useSavedColleges } from "../hooks/useColleges";

export default function Saved() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const {
    data: savedColleges = [],
    isLoading,
    isError,
    refetch,
  } = useSavedColleges();

  const { unsave } = useSaveCollege();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isAuthenticated, authLoading, navigate]);

  if (!isAuthenticated && !authLoading) return null;

  const handleUnsave = async (id: number) => {
    const result = await unsave.mutateAsync(id);
    if (result.success) toast.success("Removed from saved");
    else toast.error(result.error ?? "Failed to remove");
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8" data-ocid="saved.page">
        {/* Page header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary fill-primary/20" />
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                My Saved Colleges
              </h1>
              {!isLoading && savedColleges.length > 0 && (
                <Badge
                  variant="secondary"
                  className="text-sm px-2.5 py-0.5"
                  data-ocid="saved.count.badge"
                >
                  {savedColleges.length}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground text-sm ml-12">
              Colleges you've saved for later review
            </p>
          </div>
        </div>

        {/* Content states */}
        {isLoading ? (
          <CollegeGridSkeleton count={6} />
        ) : isError ? (
          <ErrorState
            title="Couldn't load saved colleges"
            description="There was a problem fetching your saved colleges. Please try again."
            onRetry={() => refetch()}
          />
        ) : savedColleges.length === 0 ? (
          <div className="py-8" data-ocid="saved.empty_state">
            <EmptyState
              icon={<Bookmark className="w-8 h-8" />}
              title="No saved colleges yet"
              description="Start exploring and save colleges you're interested in. They'll appear here for easy comparison."
              action={{
                label: "Browse Colleges",
                onClick: () => navigate({ to: "/" }),
                ocid: "saved.browse.button",
              }}
            />
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="saved.college.list"
          >
            {savedColleges.map((college, i) => (
              <CollegeCard
                key={college.id}
                college={college}
                isSaved
                onUnsave={handleUnsave}
                index={i + 1}
              />
            ))}
          </div>
        )}
      </div>

      <ComparePanel />
    </>
  );
}
