import Map "mo:core/Map";
import List "mo:core/List";
import CollegeTypes "../types/college";
import CollegeLib "../lib/college";

mixin (
  colleges : List.List<CollegeTypes.College>,
  collegeMap : Map.Map<Nat, CollegeTypes.College>,
) {
  public query func getColleges(filter : CollegeTypes.CollegeFilter) : async CollegeTypes.PagedColleges {
    CollegeLib.filterColleges(colleges, filter)
  };

  public query func getCollege(id : Nat) : async ?CollegeTypes.College {
    CollegeLib.getById(collegeMap, id)
  };

  public query func getLocations() : async [Text] {
    CollegeLib.getUniqueLocations(colleges)
  };
};
