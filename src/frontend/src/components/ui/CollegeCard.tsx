import { Link } from "@tanstack/react-router";
import { Heart, MapPin, TrendingUp } from "lucide-react";
import { useAuth } from "../../contexts/auth";
import { useCompare } from "../../contexts/compare";
import type { College } from "../../types/college";
import { StarRating } from "./StarRating";
import { Badge } from "./badge";
import { Button } from "./button";
import { Checkbox } from "./checkbox";

interface CollegeCardProps {
  college: College;
  isSaved?: boolean;
  onSave?: (id: number) => void;
  onUnsave?: (id: number) => void;
  index?: number;
}

function formatFees(fees: number): string {
  if (fees >= 100000) return `$${(fees / 1000).toFixed(0)}K`;
  return `$${fees.toLocaleString()}`;
}

export function CollegeCard({
  college,
  isSaved,
  onSave,
  onUnsave,
  index = 1,
}: CollegeCardProps) {
  const { isAuthenticated } = useAuth();
  const { addCollege, removeCollege, isSelected } = useCompare();
  const selected = isSelected(college.id);

  const handleCompareToggle = (checked: boolean) => {
    if (checked) addCollege(college);
    else removeCollege(college.id);
  };

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) onUnsave?.(college.id);
    else onSave?.(college.id);
  };

  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden card-hover group flex flex-col"
      data-ocid={`college.item.${index}`}
    >
      {/* College type badge + save */}
      <div className="px-4 pt-4 flex items-start justify-between gap-2">
        <Badge variant="secondary" className="text-xs shrink-0">
          {college.type_}
        </Badge>
        {isAuthenticated && (
          <button
            type="button"
            onClick={handleSaveToggle}
            className={`p-1.5 rounded-full transition-smooth ${
              isSaved
                ? "text-red-500 bg-red-50 hover:bg-red-100"
                : "text-muted-foreground hover:text-red-500 hover:bg-red-50"
            }`}
            aria-label={isSaved ? "Remove from saved" : "Save college"}
            data-ocid={`college.save_button.${index}`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
          </button>
        )}
      </div>

      {/* Main content */}
      <Link
        to="/college/$id"
        params={{ id: String(college.id) }}
        className="flex-1 px-4 pt-2 pb-4 flex flex-col gap-3"
        data-ocid={`college.detail.link.${index}`}
      >
        <div>
          <h3 className="font-display font-semibold text-foreground text-base leading-tight line-clamp-2 group-hover:text-primary transition-smooth">
            {college.name}
          </h3>
          <div className="flex items-center gap-1 mt-1.5 text-muted-foreground text-sm">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{college.location}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-muted/40 rounded-lg p-2.5">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
              Fees / yr
            </p>
            <p className="text-base font-bold text-primary mt-0.5">
              {formatFees(college.fees)}
            </p>
          </div>
          <div className="bg-muted/40 rounded-lg p-2.5">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
              Placement
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <p className="text-base font-bold text-emerald-600">
                {college.placement_percentage}%
              </p>
            </div>
          </div>
        </div>

        {/* Rating */}
        <StarRating rating={college.rating} size="sm" />

        {/* Courses */}
        <div className="flex flex-wrap gap-1 mt-auto">
          {college.courses.slice(0, 3).map((course) => (
            <span
              key={course}
              className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/15 font-medium"
            >
              {course}
            </span>
          ))}
          {college.courses.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
              +{college.courses.length - 3}
            </span>
          )}
        </div>
      </Link>

      {/* Compare footer */}
      <div className="px-4 pb-3 pt-1 border-t border-border/50 flex items-center gap-2">
        <Checkbox
          id={`compare-${college.id}`}
          checked={selected}
          onCheckedChange={handleCompareToggle}
          className="w-3.5 h-3.5"
          data-ocid={`college.compare_checkbox.${index}`}
        />
        <label
          htmlFor={`compare-${college.id}`}
          className="text-xs text-muted-foreground cursor-pointer select-none"
        >
          Compare
        </label>
      </div>
    </div>
  );
}
