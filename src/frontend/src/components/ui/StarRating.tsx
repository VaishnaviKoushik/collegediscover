import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export function StarRating({
  rating,
  max = 5,
  size = "sm",
  showValue = true,
}: StarRatingProps) {
  const sizes = { sm: "w-3 h-3", md: "w-4 h-4", lg: "w-5 h-5" };
  const textSizes = { sm: "text-xs", md: "text-sm", lg: "text-base" };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const partial = !filled && i < rating;
          const starKey = `star-${i}`;
          return (
            <span key={starKey} className="relative inline-block">
              <Star
                className={`${sizes[size]} ${filled ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30 fill-muted-foreground/10"}`}
              />
              {partial && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${(rating % 1) * 100}%` }}
                >
                  <Star
                    className={`${sizes[size]} text-amber-400 fill-amber-400`}
                  />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className={`${textSizes[size]} font-medium text-foreground`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
