import Common "common";

module {
  public type CollegeId = Common.CollegeId;

  public type College = {
    id : CollegeId;
    name : Text;
    location : Text;
    fees : Nat;
    rating : Float;
    placement_percentage : Float;
    courses : [Text];
    description : Text;
    established : Nat;
    type_ : Text;
  };

  public type CollegeFilter = {
    search : ?Text;
    location : ?Text;
    minFees : ?Nat;
    maxFees : ?Nat;
    page : Nat;
    pageSize : Nat;
  };

  public type PagedColleges = {
    colleges : [College];
    total : Nat;
    page : Nat;
    pageSize : Nat;
  };
};
