import Map "mo:core/Map";
import List "mo:core/List";
import CollegeTypes "types/college";
import CollegeLib "lib/college";
import CollegeMixin "mixins/college-api";
import SavedMixin "mixins/saved-api";

actor {
  // College storage: list for iteration, map for O(1) id lookup
  let colleges : List.List<CollegeTypes.College> = List.fromArray(CollegeLib.seedData());
  let collegeMap : Map.Map<Nat, CollegeTypes.College> = CollegeLib.buildMap(colleges);

  // Per-user saved colleges: principal → list of college ids
  let savedMap : Map.Map<Principal, List.List<Nat>> = Map.empty<Principal, List.List<Nat>>();

  include CollegeMixin(colleges, collegeMap);
  include SavedMixin(savedMap, collegeMap);
};
