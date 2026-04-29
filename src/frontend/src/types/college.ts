// Frontend-facing types (numbers, not bigints)
export interface College {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placement_percentage: number;
  courses: string[];
  description: string;
  established: number;
  type_: string;
}

export interface CollegeFilter {
  search?: string;
  location?: string;
  minFees?: number;
  maxFees?: number;
  page: number;
  pageSize: number;
}

export interface PagedColleges {
  colleges: College[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CompareState {
  selectedColleges: College[];
  addCollege: (college: College) => void;
  removeCollege: (id: number) => void;
  clearCompare: () => void;
  canCompare: boolean;
  isSelected: (id: number) => boolean;
}
