import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Types "../types/college";

module {
  public type College = Types.College;
  public type CollegeFilter = Types.CollegeFilter;
  public type PagedColleges = Types.PagedColleges;

  // Returns all seed colleges for initial population
  public func seedData() : [College] {
    [
      { id = 1; name = "Massachusetts Institute of Technology"; location = "Cambridge, MA"; fees = 55878; rating = 4.9; placement_percentage = 98.0; courses = ["Computer Science", "Engineering", "Physics", "Mathematics", "Architecture"]; description = "World-renowned research university known for science and technology."; established = 1861; type_ = "Private" },
      { id = 2; name = "Stanford University"; location = "Stanford, CA"; fees = 56169; rating = 4.8; placement_percentage = 97.5; courses = ["Computer Science", "Business", "Medicine", "Law", "Engineering"]; description = "Leading research university in Silicon Valley."; established = 1885; type_ = "Private" },
      { id = 3; name = "Harvard University"; location = "Cambridge, MA"; fees = 54002; rating = 4.8; placement_percentage = 96.0; courses = ["Law", "Medicine", "Business", "Arts", "Sciences"]; description = "The oldest university in the United States."; established = 1636; type_ = "Private" },
      { id = 4; name = "California Institute of Technology"; location = "Pasadena, CA"; fees = 58680; rating = 4.7; placement_percentage = 97.0; courses = ["Physics", "Chemistry", "Biology", "Engineering", "Computer Science"]; description = "Premier science and engineering college."; established = 1891; type_ = "Private" },
      { id = 5; name = "University of Chicago"; location = "Chicago, IL"; fees = 61179; rating = 4.6; placement_percentage = 94.0; courses = ["Economics", "Social Sciences", "Humanities", "Law", "Medicine"]; description = "Research university known for economics and social sciences."; established = 1890; type_ = "Private" },
      { id = 6; name = "Princeton University"; location = "Princeton, NJ"; fees = 53890; rating = 4.7; placement_percentage = 95.5; courses = ["Engineering", "Public Policy", "Arts", "Sciences", "Mathematics"]; description = "Ivy League university with strong research programs."; established = 1746; type_ = "Private" },
      { id = 7; name = "Yale University"; location = "New Haven, CT"; fees = 59950; rating = 4.6; placement_percentage = 94.5; courses = ["Law", "Drama", "Medicine", "Arts", "Architecture"]; description = "Ivy League institution known for law and arts."; established = 1701; type_ = "Private" },
      { id = 8; name = "Columbia University"; location = "New York, NY"; fees = 63530; rating = 4.5; placement_percentage = 93.5; courses = ["Journalism", "Business", "Law", "Engineering", "Arts"]; description = "Ivy League university in New York City."; established = 1754; type_ = "Private" },
      { id = 9; name = "University of Pennsylvania"; location = "Philadelphia, PA"; fees = 60042; rating = 4.5; placement_percentage = 93.0; courses = ["Business", "Medicine", "Engineering", "Law", "Nursing"]; description = "Ivy League school known for Wharton Business School."; established = 1740; type_ = "Private" },
      { id = 10; name = "Duke University"; location = "Durham, NC"; fees = 60488; rating = 4.5; placement_percentage = 92.5; courses = ["Medicine", "Law", "Environment", "Business", "Engineering"]; description = "Top research university known for basketball and medicine."; established = 1838; type_ = "Private" },
      { id = 11; name = "Johns Hopkins University"; location = "Baltimore, MD"; fees = 57010; rating = 4.6; placement_percentage = 95.0; courses = ["Medicine", "Public Health", "Engineering", "Arts", "Nursing"]; description = "Pioneer in research medicine and public health."; established = 1876; type_ = "Private" },
      { id = 12; name = "Northwestern University"; location = "Evanston, IL"; fees = 60768; rating = 4.4; placement_percentage = 91.5; courses = ["Journalism", "Business", "Law", "Engineering", "Music"]; description = "Private research university on Lake Michigan."; established = 1851; type_ = "Private" },
      { id = 13; name = "University of California, Berkeley"; location = "Berkeley, CA"; fees = 44066; rating = 4.5; placement_percentage = 92.0; courses = ["Computer Science", "Engineering", "Business", "Law", "Sciences"]; description = "Top public university with strong STEM programs."; established = 1868; type_ = "Public" },
      { id = 14; name = "University of California, Los Angeles"; location = "Los Angeles, CA"; fees = 43003; rating = 4.4; placement_percentage = 90.5; courses = ["Film", "Business", "Medicine", "Engineering", "Arts"]; description = "Public research university in Los Angeles."; established = 1919; type_ = "Public" },
      { id = 15; name = "University of Michigan"; location = "Ann Arbor, MI"; fees = 52266; rating = 4.4; placement_percentage = 91.0; courses = ["Engineering", "Business", "Medicine", "Law", "Architecture"]; description = "Flagship public university of Michigan."; established = 1817; type_ = "Public" },
      { id = 16; name = "New York University"; location = "New York, NY"; fees = 58168; rating = 4.2; placement_percentage = 88.0; courses = ["Business", "Arts", "Law", "Medicine", "Engineering"]; description = "Large private urban university in NYC."; established = 1831; type_ = "Private" },
      { id = 17; name = "Carnegie Mellon University"; location = "Pittsburgh, PA"; fees = 58924; rating = 4.6; placement_percentage = 96.5; courses = ["Computer Science", "Engineering", "Design", "Business", "Arts"]; description = "Top university for computer science and engineering."; established = 1900; type_ = "Private" },
      { id = 18; name = "University of Texas at Austin"; location = "Austin, TX"; fees = 39000; rating = 4.2; placement_percentage = 87.5; courses = ["Engineering", "Business", "Law", "Sciences", "Liberal Arts"]; description = "Flagship public university of Texas."; established = 1883; type_ = "Public" },
      { id = 19; name = "Georgia Institute of Technology"; location = "Atlanta, GA"; fees = 32396; rating = 4.4; placement_percentage = 93.5; courses = ["Computer Science", "Engineering", "Business", "Architecture", "Sciences"]; description = "Leading public engineering and technology university."; established = 1885; type_ = "Public" },
      { id = 20; name = "University of Washington"; location = "Seattle, WA"; fees = 39114; rating = 4.3; placement_percentage = 89.5; courses = ["Computer Science", "Medicine", "Engineering", "Business", "Environment"]; description = "Public research university in the Pacific Northwest."; established = 1861; type_ = "Public" },
      { id = 21; name = "Boston University"; location = "Boston, MA"; fees = 58072; rating = 4.1; placement_percentage = 86.5; courses = ["Communications", "Engineering", "Business", "Medicine", "Arts"]; description = "Large private research university in Boston."; established = 1839; type_ = "Private" },
      { id = 22; name = "University of Wisconsin-Madison"; location = "Madison, WI"; fees = 38600; rating = 4.2; placement_percentage = 88.0; courses = ["Engineering", "Business", "Sciences", "Agriculture", "Arts"]; description = "Top public research university in the Midwest."; established = 1848; type_ = "Public" },
      { id = 23; name = "University of Illinois Urbana-Champaign"; location = "Champaign, IL"; fees = 33932; rating = 4.3; placement_percentage = 90.5; courses = ["Engineering", "Computer Science", "Business", "Agriculture", "Sciences"]; description = "Leading public research university in engineering."; established = 1867; type_ = "Public" },
      { id = 24; name = "Purdue University"; location = "West Lafayette, IN"; fees = 28794; rating = 4.2; placement_percentage = 89.5; courses = ["Engineering", "Agriculture", "Sciences", "Technology", "Business"]; description = "Top engineering and agriculture university."; established = 1869; type_ = "Public" },
      { id = 25; name = "Ohio State University"; location = "Columbus, OH"; fees = 32061; rating = 4.1; placement_percentage = 87.5; courses = ["Engineering", "Business", "Medicine", "Arts", "Agriculture"]; description = "Large flagship public university in Ohio."; established = 1870; type_ = "Public" },
      { id = 26; name = "Penn State University"; location = "University Park, PA"; fees = 35514; rating = 4.1; placement_percentage = 86.0; courses = ["Engineering", "Business", "Sciences", "Agriculture", "Liberal Arts"]; description = "Pennsylvania's flagship land-grant university."; established = 1855; type_ = "Public" },
      { id = 27; name = "University of Minnesota"; location = "Minneapolis, MN"; fees = 32000; rating = 4.0; placement_percentage = 85.5; courses = ["Engineering", "Medicine", "Business", "Sciences", "Liberal Arts"]; description = "Public research university in Minneapolis."; established = 1851; type_ = "Public" },
      { id = 28; name = "University of Colorado Boulder"; location = "Boulder, CO"; fees = 36802; rating = 4.0; placement_percentage = 84.5; courses = ["Engineering", "Sciences", "Business", "Arts", "Environment"]; description = "Research university in the Rocky Mountains."; established = 1876; type_ = "Public" },
      { id = 29; name = "Arizona State University"; location = "Tempe, AZ"; fees = 29428; rating = 3.9; placement_percentage = 82.5; courses = ["Engineering", "Business", "Journalism", "Sciences", "Arts"]; description = "Largest public university in the US."; established = 1885; type_ = "Public" },
      { id = 30; name = "Indiana University Bloomington"; location = "Bloomington, IN"; fees = 25956; rating = 3.9; placement_percentage = 82.0; courses = ["Business", "Music", "Law", "Sciences", "Arts"]; description = "Flagship campus of Indiana University."; established = 1820; type_ = "Public" },
      { id = 31; name = "University of Florida"; location = "Gainesville, FL"; fees = 28658; rating = 4.1; placement_percentage = 86.5; courses = ["Engineering", "Business", "Medicine", "Agriculture", "Sciences"]; description = "Florida's flagship land-grant research university."; established = 1853; type_ = "Public" },
      { id = 32; name = "University of North Carolina at Chapel Hill"; location = "Chapel Hill, NC"; fees = 36159; rating = 4.2; placement_percentage = 88.5; courses = ["Medicine", "Journalism", "Business", "Law", "Sciences"]; description = "Top public university in the South."; established = 1789; type_ = "Public" },
      { id = 33; name = "Vanderbilt University"; location = "Nashville, TN"; fees = 56826; rating = 4.4; placement_percentage = 91.5; courses = ["Medicine", "Education", "Business", "Engineering", "Arts"]; description = "Private research university in Nashville."; established = 1873; type_ = "Private" },
      { id = 34; name = "Emory University"; location = "Atlanta, GA"; fees = 57472; rating = 4.3; placement_percentage = 90.0; courses = ["Medicine", "Business", "Law", "Sciences", "Arts"]; description = "Private research university in Atlanta."; established = 1836; type_ = "Private" },
      { id = 35; name = "Georgetown University"; location = "Washington, DC"; fees = 58782; rating = 4.3; placement_percentage = 90.5; courses = ["Law", "Medicine", "Foreign Service", "Business", "Nursing"]; description = "Jesuit research university in Washington DC."; established = 1789; type_ = "Private" },
      { id = 36; name = "University of Notre Dame"; location = "Notre Dame, IN"; fees = 57699; rating = 4.4; placement_percentage = 91.0; courses = ["Business", "Engineering", "Law", "Sciences", "Arts"]; description = "Private Catholic research university known for football."; established = 1842; type_ = "Private" },
      { id = 37; name = "Tufts University"; location = "Medford, MA"; fees = 60816; rating = 4.2; placement_percentage = 88.5; courses = ["International Relations", "Engineering", "Medicine", "Arts", "Sciences"]; description = "Private research university near Boston."; established = 1852; type_ = "Private" },
      { id = 38; name = "Wake Forest University"; location = "Winston-Salem, NC"; fees = 58984; rating = 4.1; placement_percentage = 87.0; courses = ["Business", "Law", "Medicine", "Arts", "Sciences"]; description = "Private liberal arts research university."; established = 1834; type_ = "Private" },
      { id = 39; name = "Lehigh University"; location = "Bethlehem, PA"; fees = 57450; rating = 4.0; placement_percentage = 85.5; courses = ["Engineering", "Business", "Arts", "Sciences", "Education"]; description = "Private research university focused on engineering."; established = 1865; type_ = "Private" },
      { id = 40; name = "Brandeis University"; location = "Waltham, MA"; fees = 59304; rating = 4.0; placement_percentage = 84.5; courses = ["Sciences", "Business", "Arts", "Social Sciences", "Graduate Studies"]; description = "Private liberal arts research university."; established = 1948; type_ = "Private" },
      { id = 41; name = "University of Virginia"; location = "Charlottesville, VA"; fees = 52218; rating = 4.3; placement_percentage = 89.5; courses = ["Law", "Medicine", "Business", "Engineering", "Architecture"]; description = "Public Ivy founded by Thomas Jefferson."; established = 1819; type_ = "Public" },
      { id = 42; name = "William and Mary"; location = "Williamsburg, VA"; fees = 47246; rating = 4.0; placement_percentage = 84.0; courses = ["Law", "Business", "Arts", "Sciences", "Education"]; description = "Second oldest university in the US."; established = 1693; type_ = "Public" },
      { id = 43; name = "University of Georgia"; location = "Athens, GA"; fees = 30392; rating = 3.9; placement_percentage = 83.5; courses = ["Business", "Agriculture", "Sciences", "Arts", "Education"]; description = "Flagship public university of Georgia."; established = 1785; type_ = "Public" },
      { id = 44; name = "University of Maryland"; location = "College Park, MD"; fees = 35216; rating = 4.1; placement_percentage = 87.0; courses = ["Engineering", "Business", "Computer Science", "Sciences", "Arts"]; description = "Flagship public university of Maryland."; established = 1856; type_ = "Public" },
      { id = 45; name = "Rutgers University"; location = "New Brunswick, NJ"; fees = 32655; rating = 4.0; placement_percentage = 85.0; courses = ["Engineering", "Business", "Medicine", "Sciences", "Liberal Arts"]; description = "Public research university and state university of NJ."; established = 1766; type_ = "Public" },
      { id = 46; name = "University of Pittsburgh"; location = "Pittsburgh, PA"; fees = 34186; rating = 4.0; placement_percentage = 85.5; courses = ["Medicine", "Engineering", "Business", "Sciences", "Arts"]; description = "Major research university in Pittsburgh."; established = 1787; type_ = "Public" },
      { id = 47; name = "Michigan State University"; location = "East Lansing, MI"; fees = 26678; rating = 3.9; placement_percentage = 83.0; courses = ["Agriculture", "Engineering", "Business", "Medicine", "Sciences"]; description = "Major public research university in Michigan."; established = 1855; type_ = "Public" },
      { id = 48; name = "Iowa State University"; location = "Ames, IA"; fees = 24508; rating = 3.8; placement_percentage = 81.5; courses = ["Agriculture", "Engineering", "Sciences", "Business", "Architecture"]; description = "Land-grant public research university in Iowa."; established = 1858; type_ = "Public" },
      { id = 49; name = "University of Iowa"; location = "Iowa City, IA"; fees = 30394; rating = 3.8; placement_percentage = 80.5; courses = ["Medicine", "Law", "Business", "Sciences", "Arts"]; description = "Flagship public university of Iowa."; established = 1847; type_ = "Public" },
      { id = 50; name = "University of Missouri"; location = "Columbia, MO"; fees = 27762; rating = 3.8; placement_percentage = 81.0; courses = ["Journalism", "Business", "Medicine", "Engineering", "Sciences"]; description = "First public university west of the Mississippi."; established = 1839; type_ = "Public" },
      { id = 51; name = "Kansas State University"; location = "Manhattan, KS"; fees = 26290; rating = 3.7; placement_percentage = 80.0; courses = ["Agriculture", "Engineering", "Sciences", "Business", "Architecture"]; description = "Land-grant public research university in Kansas."; established = 1863; type_ = "Public" },
      { id = 52; name = "University of Kansas"; location = "Lawrence, KS"; fees = 27004; rating = 3.8; placement_percentage = 80.5; courses = ["Medicine", "Engineering", "Business", "Sciences", "Arts"]; description = "Flagship public university of Kansas."; established = 1865; type_ = "Public" },
      { id = 53; name = "Oklahoma State University"; location = "Stillwater, OK"; fees = 25988; rating = 3.7; placement_percentage = 79.5; courses = ["Agriculture", "Engineering", "Business", "Sciences", "Arts"]; description = "Land-grant public research university in Oklahoma."; established = 1890; type_ = "Public" },
      { id = 54; name = "University of Oklahoma"; location = "Norman, OK"; fees = 27192; rating = 3.8; placement_percentage = 81.0; courses = ["Engineering", "Business", "Medicine", "Sciences", "Arts"]; description = "Flagship public research university of Oklahoma."; established = 1890; type_ = "Public" },
      { id = 55; name = "Texas A&M University"; location = "College Station, TX"; fees = 27206; rating = 4.0; placement_percentage = 85.5; courses = ["Engineering", "Agriculture", "Business", "Sciences", "Architecture"]; description = "Major public research and land-grant university."; established = 1871; type_ = "Public" },
      { id = 56; name = "Rice University"; location = "Houston, TX"; fees = 52960; rating = 4.5; placement_percentage = 93.0; courses = ["Engineering", "Music", "Architecture", "Sciences", "Business"]; description = "Small private research university in Houston."; established = 1912; type_ = "Private" },
      { id = 57; name = "Tulane University"; location = "New Orleans, LA"; fees = 60264; rating = 4.1; placement_percentage = 86.5; courses = ["Medicine", "Law", "Business", "Sciences", "Arts"]; description = "Private research university in New Orleans."; established = 1834; type_ = "Private" },
      { id = 58; name = "Case Western Reserve University"; location = "Cleveland, OH"; fees = 54118; rating = 4.1; placement_percentage = 87.5; courses = ["Engineering", "Medicine", "Law", "Business", "Sciences"]; description = "Private research university in Cleveland."; established = 1826; type_ = "Private" },
      { id = 59; name = "University of Rochester"; location = "Rochester, NY"; fees = 60550; rating = 4.1; placement_percentage = 87.0; courses = ["Music", "Engineering", "Medicine", "Sciences", "Arts"]; description = "Research university known for music and optics."; established = 1850; type_ = "Private" },
      { id = 60; name = "Worcester Polytechnic Institute"; location = "Worcester, MA"; fees = 55688; rating = 4.2; placement_percentage = 89.5; courses = ["Engineering", "Computer Science", "Sciences", "Business", "Mathematics"]; description = "Science and technology university in Massachusetts."; established = 1865; type_ = "Private" },
      { id = 61; name = "University of Arizona"; location = "Tucson, AZ"; fees = 37396; rating = 3.9; placement_percentage = 83.0; courses = ["Sciences", "Engineering", "Business", "Medicine", "Arts"]; description = "Public research university in Tucson."; established = 1885; type_ = "Public" },
      { id = 62; name = "Colorado State University"; location = "Fort Collins, CO"; fees = 28700; rating = 3.8; placement_percentage = 82.5; courses = ["Agriculture", "Engineering", "Sciences", "Business", "Arts"]; description = "Land-grant public research university in Colorado."; established = 1870; type_ = "Public" },
    ]
  };

  // Filter and paginate colleges from the given list
  public func filterColleges(colleges : List.List<College>, filter : CollegeFilter) : PagedColleges {
    let filtered = colleges.filter(func(c : College) : Bool {
      let matchesSearch = switch (filter.search) {
        case (null) true;
        case (?s) {
          let lowerSearch = s.toLower();
          c.name.toLower().contains(#text lowerSearch) or c.location.toLower().contains(#text lowerSearch)
        };
      };
      let matchesLocation = switch (filter.location) {
        case (null) true;
        case (?loc) c.location.toLower().contains(#text (loc.toLower()));
      };
      let matchesMinFees = switch (filter.minFees) {
        case (null) true;
        case (?min) c.fees >= min;
      };
      let matchesMaxFees = switch (filter.maxFees) {
        case (null) true;
        case (?max) c.fees <= max;
      };
      matchesSearch and matchesLocation and matchesMinFees and matchesMaxFees
    });

    let total = filtered.size();
    let page = filter.page;
    let pageSize = filter.pageSize;
    let start = (page - 1) * pageSize;
    let end_ = start + pageSize;
    let safeEnd = if (end_ > total) total else end_;

    let pageArr = if (start >= total) {
      []
    } else {
      filtered.sliceToArray(start, safeEnd)
    };

    {
      colleges = pageArr;
      total;
      page;
      pageSize;
    }
  };

  // Retrieve a single college by id from the map
  public func getById(collegeMap : Map.Map<Nat, College>, id : Nat) : ?College {
    collegeMap.get(id)
  };

  // Get all unique locations from colleges
  public func getUniqueLocations(colleges : List.List<College>) : [Text] {
    let seen = Set.empty<Text>();
    let locs = List.empty<Text>();
    colleges.forEach(func(c : College) {
      if (not seen.contains(c.location)) {
        seen.add(c.location);
        locs.add(c.location);
      };
    });
    locs.toArray()
  };

  // Build a Map from a list of colleges for O(1) lookup
  public func buildMap(colleges : List.List<College>) : Map.Map<Nat, College> {
    let m = Map.empty<Nat, College>();
    colleges.forEach(func(c : College) {
      m.add(c.id, c);
    });
    m
  };
};
