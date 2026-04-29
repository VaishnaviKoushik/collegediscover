import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { CollegeFilter } from "../../types/college";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface FilterPanelProps {
  filter: CollegeFilter;
  locations: string[];
  onFilterChange: (filter: CollegeFilter) => void;
}

const ALL_LOCATIONS = "__all__";

export function FilterPanel({
  filter,
  locations,
  onFilterChange,
}: FilterPanelProps) {
  const [search, setSearch] = useState(filter.search ?? "");
  const [location, setLocation] = useState(filter.location ?? ALL_LOCATIONS);
  const [minFees, setMinFees] = useState(filter.minFees?.toString() ?? "");
  const [maxFees, setMaxFees] = useState(filter.maxFees?.toString() ?? "");

  // Sync when filter prop changes externally
  useEffect(() => {
    setSearch(filter.search ?? "");
    setLocation(filter.location ?? ALL_LOCATIONS);
    setMinFees(filter.minFees?.toString() ?? "");
    setMaxFees(filter.maxFees?.toString() ?? "");
  }, [filter]);

  const handleApply = () => {
    onFilterChange({
      ...filter,
      page: 1,
      search: search.trim() || undefined,
      location: location === ALL_LOCATIONS ? undefined : location,
      minFees: minFees ? Number(minFees) : undefined,
      maxFees: maxFees ? Number(maxFees) : undefined,
    });
  };

  const handleReset = () => {
    setSearch("");
    setLocation(ALL_LOCATIONS);
    setMinFees("");
    setMaxFees("");
    onFilterChange({
      ...filter,
      page: 1,
      search: undefined,
      location: undefined,
      minFees: undefined,
      maxFees: undefined,
    });
  };

  const hasActiveFilters =
    !!filter.search ||
    !!filter.location ||
    filter.minFees !== undefined ||
    filter.maxFees !== undefined;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleApply();
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-4">
      {/* Search */}
      <div className="space-y-1.5">
        <Label
          htmlFor="filter-search"
          className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
        >
          Search
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="filter-search"
            placeholder="Search colleges..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-9"
            data-ocid="filter.search_input"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Location
        </Label>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger data-ocid="filter.location.select">
            <SelectValue placeholder="All locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_LOCATIONS}>All Locations</SelectItem>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Fees range */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Annual Fees Range
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min ($)"
            value={minFees}
            onChange={(e) => setMinFees(e.target.value)}
            min={0}
            data-ocid="filter.min_fees.input"
          />
          <Input
            type="number"
            placeholder="Max ($)"
            value={maxFees}
            onChange={(e) => setMaxFees(e.target.value)}
            min={0}
            data-ocid="filter.max_fees.input"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <Button
          onClick={handleApply}
          className="flex-1"
          data-ocid="filter.apply.button"
        >
          Apply Filters
        </Button>
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={handleReset}
            size="icon"
            aria-label="Reset filters"
            data-ocid="filter.reset.button"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
