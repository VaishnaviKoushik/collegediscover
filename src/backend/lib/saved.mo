import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Types "../types/college";

module {
  public type College = Types.College;

  // Save a college for a user; returns error text on duplicate
  public func save(
    savedMap : Map.Map<Principal, List.List<Nat>>,
    caller : Principal,
    collegeId : Nat,
  ) : { #ok; #err : Text } {
    switch (savedMap.get(caller)) {
      case (?ids) {
        if (ids.contains(collegeId)) {
          #err("College already saved")
        } else {
          ids.add(collegeId);
          #ok
        }
      };
      case (null) {
        let ids = List.empty<Nat>();
        ids.add(collegeId);
        savedMap.add(caller, ids);
        #ok
      };
    }
  };

  // Remove a saved college for a user; returns error text if not found
  public func unsave(
    savedMap : Map.Map<Principal, List.List<Nat>>,
    caller : Principal,
    collegeId : Nat,
  ) : { #ok; #err : Text } {
    switch (savedMap.get(caller)) {
      case (?ids) {
        let idx = ids.findIndex(func(id : Nat) : Bool { id == collegeId });
        switch (idx) {
          case (?_i) {
            // Remove by building a new filtered list in place
            let filtered = ids.filter(func(id : Nat) : Bool { id != collegeId });
            ids.clear();
            ids.append(filtered);
            #ok
          };
          case (null) {
            #err("College not in saved list")
          };
        }
      };
      case (null) {
        #err("No saved colleges for user")
      };
    }
  };

  // Retrieve saved college records for a user
  public func getSaved(
    savedMap : Map.Map<Principal, List.List<Nat>>,
    collegeMap : Map.Map<Nat, College>,
    caller : Principal,
  ) : [College] {
    switch (savedMap.get(caller)) {
      case (?ids) {
        let result = List.empty<College>();
        ids.forEach(func(id : Nat) {
          switch (collegeMap.get(id)) {
            case (?c) { result.add(c) };
            case (null) {};
          };
        });
        result.toArray()
      };
      case (null) { [] };
    }
  };
};
