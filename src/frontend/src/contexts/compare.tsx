import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import type { College } from "../types/college";

const MAX_COMPARE = 3;

interface CompareContextValue {
  selectedColleges: College[];
  addCollege: (college: College) => void;
  removeCollege: (id: number) => void;
  clearCompare: () => void;
  canCompare: boolean;
  isSelected: (id: number) => boolean;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);

  const addCollege = useCallback((college: College) => {
    setSelectedColleges((prev) => {
      if (prev.find((c) => c.id === college.id)) return prev;
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, college];
    });
  }, []);

  const removeCollege = useCallback((id: number) => {
    setSelectedColleges((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const clearCompare = useCallback(() => setSelectedColleges([]), []);

  const isSelected = useCallback(
    (id: number) => selectedColleges.some((c) => c.id === id),
    [selectedColleges],
  );

  return (
    <CompareContext.Provider
      value={{
        selectedColleges,
        addCollege,
        removeCollege,
        clearCompare,
        canCompare: selectedColleges.length >= 2,
        isSelected,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare(): CompareContextValue {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
