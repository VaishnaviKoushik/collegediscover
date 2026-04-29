import Map "mo:core/Map";
import List "mo:core/List";
import CollegeTypes "../types/college";
import SavedLib "../lib/saved";

mixin (
  savedMap : Map.Map<Principal, List.List<Nat>>,
  collegeMap : Map.Map<Nat, CollegeTypes.College>,
) {
  public shared ({ caller }) func saveCollege(collegeId : Nat) : async { #ok; #err : Text } {
    SavedLib.save(savedMap, caller, collegeId)
  };

  public shared ({ caller }) func unsaveCollege(collegeId : Nat) : async { #ok; #err : Text } {
    SavedLib.unsave(savedMap, caller, collegeId)
  };

  public shared query ({ caller }) func getSavedColleges() : async [CollegeTypes.College] {
    SavedLib.getSaved(savedMap, collegeMap, caller)
  };
};
