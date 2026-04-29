import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import { useBackendService } from "../services/backend";
import type { CollegeFilter } from "../types/college";

export function useColleges(filter: CollegeFilter) {
  const { actor, isFetching } = useActor(createActor);
  const { getColleges } = useBackendService();

  return useQuery({
    queryKey: ["colleges", filter],
    queryFn: () => getColleges(filter),
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useCollege(id: number) {
  const { actor, isFetching } = useActor(createActor);
  const { getCollege } = useBackendService();

  return useQuery({
    queryKey: ["college", id],
    queryFn: () => getCollege(id),
    enabled: !!actor && !isFetching && id > 0,
    staleTime: 60_000,
  });
}

export function useLocations() {
  const { actor, isFetching } = useActor(createActor);
  const { getLocations } = useBackendService();

  return useQuery({
    queryKey: ["locations"],
    queryFn: () => getLocations(),
    enabled: !!actor && !isFetching,
    staleTime: 120_000,
  });
}

export function useSavedColleges() {
  const { actor, isFetching } = useActor(createActor);
  const { getSavedColleges } = useBackendService();

  return useQuery({
    queryKey: ["savedColleges"],
    queryFn: () => getSavedColleges(),
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useSaveCollege() {
  const queryClient = useQueryClient();
  const { saveCollege, unsaveCollege } = useBackendService();

  const save = useMutation({
    mutationFn: (id: number) => saveCollege(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedColleges"] });
    },
  });

  const unsave = useMutation({
    mutationFn: (id: number) => unsaveCollege(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedColleges"] });
    },
  });

  return { save, unsave };
}
