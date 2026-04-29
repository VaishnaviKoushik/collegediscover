import type { backendInterface } from "../backend.d";

const sampleColleges = [
  {
    id: BigInt(1),
    name: "Indian Institute of Technology Bombay",
    location: "Mumbai, Maharashtra",
    fees: BigInt(250000),
    rating: 4.8,
    placement_percentage: 95,
    courses: ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Data Science"],
    description: "IIT Bombay is one of India's premier engineering institutions, consistently ranked among the top universities in the country and Asia.",
    established: BigInt(1958),
    type: "Public",
  },
  {
    id: BigInt(2),
    name: "Delhi Technological University",
    location: "New Delhi, Delhi",
    fees: BigInt(180000),
    rating: 4.5,
    placement_percentage: 88,
    courses: ["Computer Engineering", "Electronics", "Civil Engineering", "Biotechnology"],
    description: "DTU is a leading technical university in Delhi offering diverse engineering and technology programs with excellent placement records.",
    established: BigInt(1941),
    type: "Public",
  },
  {
    id: BigInt(3),
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    fees: BigInt(450000),
    rating: 4.7,
    placement_percentage: 92,
    courses: ["Computer Science", "Mathematics", "Physics", "Chemical Engineering"],
    description: "BITS Pilani is a top private university known for its rigorous academics and excellent industry connections.",
    established: BigInt(1964),
    type: "Private",
  },
  {
    id: BigInt(4),
    name: "National Institute of Technology Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    fees: BigInt(140000),
    rating: 4.4,
    placement_percentage: 85,
    courses: ["Mechanical Engineering", "Civil Engineering", "Information Technology", "Production Engineering"],
    description: "NIT Trichy is among the top NITs in India, known for strong technical programs and industry-ready graduates.",
    established: BigInt(1964),
    type: "Public",
  },
  {
    id: BigInt(5),
    name: "Vellore Institute of Technology",
    location: "Vellore, Tamil Nadu",
    fees: BigInt(350000),
    rating: 4.2,
    placement_percentage: 80,
    courses: ["Computer Science", "Electronics and Communication", "Information Technology", "Mechanical Engineering"],
    description: "VIT is a prominent private university with a sprawling campus and focus on research and innovation.",
    established: BigInt(1984),
    type: "Private",
  },
  {
    id: BigInt(6),
    name: "Jadavpur University",
    location: "Kolkata, West Bengal",
    fees: BigInt(120000),
    rating: 4.3,
    placement_percentage: 82,
    courses: ["Electrical Engineering", "Computer Science", "Architecture", "Pharmacy"],
    description: "Jadavpur University is a prestigious institution in West Bengal with a rich history of academic excellence.",
    established: BigInt(1955),
    type: "Public",
  },
];

export const mockBackend: backendInterface = {
  getColleges: async (filter) => {
    let filtered = [...sampleColleges];

    if (filter.search) {
      const q = filter.search.toLowerCase();
      filtered = filtered.filter(
        (c) => c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q)
      );
    }
    if (filter.location) {
      filtered = filtered.filter((c) =>
        c.location.toLowerCase().includes(filter.location!.toLowerCase())
      );
    }
    if (filter.minFees !== undefined) {
      filtered = filtered.filter((c) => c.fees >= filter.minFees!);
    }
    if (filter.maxFees !== undefined) {
      filtered = filtered.filter((c) => c.fees <= filter.maxFees!);
    }

    const page = Number(filter.page);
    const pageSize = Number(filter.pageSize);
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);

    return {
      colleges: paged,
      total: BigInt(filtered.length),
      page: filter.page,
      pageSize: filter.pageSize,
    };
  },

  getCollege: async (id) => {
    const college = sampleColleges.find((c) => c.id === id);
    return college ?? null;
  },

  getLocations: async () => {
    return [
      "Mumbai, Maharashtra",
      "New Delhi, Delhi",
      "Pilani, Rajasthan",
      "Tiruchirappalli, Tamil Nadu",
      "Vellore, Tamil Nadu",
      "Kolkata, West Bengal",
    ];
  },

  getSavedColleges: async () => {
    return [sampleColleges[0], sampleColleges[2]];
  },

  saveCollege: async (_collegeId) => {
    return { __kind__: "ok", ok: null };
  },

  unsaveCollege: async (_collegeId) => {
    return { __kind__: "ok", ok: null };
  },
};
