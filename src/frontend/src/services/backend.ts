import { useActor } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";
import type { College, CollegeFilter, PagedColleges } from "../types/college";
import type { College as BackendCollege } from "../backend.d.ts";

// Convert backend bigint-based College to frontend number-based College
function toFrontendCollege(c: BackendCollege): College {
  return {
    id: Number(c.id),
    name: c.name,
    location: c.location,
    fees: Number(c.fees),
    rating: c.rating,
    placement_percentage: c.placement_percentage,
    courses: c.courses,
    description: c.description,
    established: Number(c.established),
    type_: c.type,
  };
}

export function useBackendService() {
  const { actor, isFetching } = useActor(createActor);

  const getColleges = async (filter: CollegeFilter): Promise<PagedColleges> => {
    if (!actor) return { colleges: [], total: 0, page: filter.page, pageSize: filter.pageSize };
    const result = await actor.getColleges({
      page: BigInt(filter.page),
      pageSize: BigInt(filter.pageSize),
      search: filter.search,
      location: filter.location,
      minFees: filter.minFees !== undefined ? BigInt(filter.minFees) : undefined,
      maxFees: filter.maxFees !== undefined ? BigInt(filter.maxFees) : undefined,
    });
    return {
      colleges: result.colleges.map(toFrontendCollege),
      total: Number(result.total),
      page: Number(result.page),
      pageSize: Number(result.pageSize),
    };
  };

  const getCollege = async (id: number): Promise<College | null> => {
    if (!actor) return null;
    const result = await actor.getCollege(BigInt(id));
    return result ? toFrontendCollege(result) : null;
  };

  const getLocations = async (): Promise<string[]> => {
    if (!actor) return [];
    return actor.getLocations();
  };

  const saveCollege = async (collegeId: number): Promise<{ success: boolean; error?: string }> => {
    if (!actor) return { success: false, error: "Not connected" };
    const result = await actor.saveCollege(BigInt(collegeId));
    if (result.__kind__ === "ok") return { success: true };
    return { success: false, error: result.err };
  };

  const unsaveCollege = async (collegeId: number): Promise<{ success: boolean; error?: string }> => {
    if (!actor) return { success: false, error: "Not connected" };
    const result = await actor.unsaveCollege(BigInt(collegeId));
    if (result.__kind__ === "ok") return { success: true };
    return { success: false, error: result.err };
  };

  const getSavedColleges = async (): Promise<College[]> => {
    if (!actor) return [];
    const result = await actor.getSavedColleges();
    return result.map(toFrontendCollege);
  };

  return {
    actor,
    isFetching,
    getColleges,
    getCollege,
    getLocations,
    saveCollege,
    unsaveCollege,
    getSavedColleges,
  };
}
