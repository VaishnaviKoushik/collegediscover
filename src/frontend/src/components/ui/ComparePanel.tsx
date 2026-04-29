import { Link } from "@tanstack/react-router";
import { ArrowRight, GitCompare, X } from "lucide-react";
import { useCompare } from "../../contexts/compare";
import { Badge } from "./badge";
import { Button } from "./button";

export function ComparePanel() {
  const { selectedColleges, removeCollege, clearCompare, canCompare } =
    useCompare();

  if (selectedColleges.length === 0) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-lg"
      data-ocid="compare.panel"
    >
      <div className="bg-card border border-primary/30 rounded-2xl shadow-elevated p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              Compare
            </span>
            <Badge variant="default" className="text-xs">
              {selectedColleges.length}/3
            </Badge>
          </div>
          <button
            type="button"
            onClick={clearCompare}
            className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-muted/60 transition-smooth"
            aria-label="Clear compare selection"
            data-ocid="compare.panel.clear_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {selectedColleges.map((college) => (
            <div
              key={college.id}
              className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-2.5 py-1 text-xs font-medium text-primary"
            >
              <span className="max-w-[120px] truncate">{college.name}</span>
              <button
                type="button"
                onClick={() => removeCollege(college.id)}
                className="hover:text-destructive transition-smooth"
                aria-label={`Remove ${college.name}`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          {!canCompare && (
            <p className="text-xs text-muted-foreground flex-1 self-center">
              Select {2 - selectedColleges.length} more to compare
            </p>
          )}
          <Link to="/compare" className={canCompare ? "w-full" : "ml-auto"}>
            <Button
              disabled={!canCompare}
              className="w-full flex items-center gap-2"
              data-ocid="compare.panel.compare_button"
            >
              Compare Colleges
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
