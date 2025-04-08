
import { 
  UserRole, 
  JobPosting, 
  WorkerProfile, 
  EmployerProfile,
  User
} from "../types/models";

export const mockUsers: User[] = [
  {
    id: "worker1",
    role: UserRole.WORKER,
    email: "john.doe@example.com",
    name: "John Doe",
    joined: "2024-01-05",
  },
  {
    id: "worker2",
    role: UserRole.WORKER,
    email: "sarah.smith@example.com",
    name: "Sarah Smith",
    joined: "2024-02-12",
  },
  {
    id: "worker3",
    role: UserRole.WORKER,
    email: "mike.jones@example.com",
    name: "Mike Jones",
    joined: "2024-01-22",
  },
  {
    id: "employer1",
    role: UserRole.EMPLOYER,
    email: "hr@constructioncorp.com",
    name: "Construction Corp",
    joined: "2023-11-15",
  },
  {
    id: "employer2",
    role: UserRole.EMPLOYER,
    email: "jobs@plumbingpros.com",
    name: "Plumbing Pros",
    joined: "2023-12-10",
  }
];

export const mockWorkers: WorkerProfile[] = [
  {
    id: "worker1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    location: {
      city: "Chicago",
      state: "IL",
      country: "USA",
      zip: "60601"
    },
    bio: "Experienced construction worker with over 10 years in residential and commercial projects.",
    skills: ["Carpentry", "Framing", "Blueprint Reading", "Power Tools", "Construction Safety"],
    experience: [
      {
        id: "exp1",
        title: "Senior Carpenter",
        company: "Building Excellence Inc.",
        location: {
          city: "Chicago",
          state: "IL",
          country: "USA"
        },
        startDate: "2018-06-01",
        description: "Led a team of 5 carpenters on commercial building projects.",
        skills: ["Carpentry", "Team Leadership", "Commercial Construction"]
      },
      {
        id: "exp2",
        title: "Carpenter",
        company: "Homes & More Construction",
        location: {
          city: "Milwaukee",
          state: "WI",
          country: "USA"
        },
        startDate: "2012-03-15",
        endDate: "2018-05-30",
        description: "Worked on residential home construction and renovation projects.",
        skills: ["Residential Construction", "Renovation", "Carpentry"]
      }
    ],
    desiredSalary: 65000,
    preferredJobTitles: ["Senior Carpenter", "Construction Foreman", "Construction Manager"],
    joinDate: "2024-01-05"
  },
  {
    id: "worker2",
    name: "Sarah Smith",
    email: "sarah.smith@example.com",
    phone: "555-987-6543",
    location: {
      city: "Detroit",
      state: "MI",
      country: "USA",
      zip: "48201"
    },
    bio: "Certified electrician with expertise in both residential and industrial electrical systems.",
    skills: ["Electrical Wiring", "Circuit Installation", "Troubleshooting", "Electrical Code Compliance", "Safety Protocols"],
    experience: [
      {
        id: "exp3",
        title: "Journeyman Electrician",
        company: "PowerUp Electric",
        location: {
          city: "Detroit",
          state: "MI",
          country: "USA"
        },
        startDate: "2019-04-01",
        description: "Handle complex electrical installations and troubleshooting for commercial clients.",
        skills: ["Commercial Electrical", "Troubleshooting", "Installation"]
      },
      {
        id: "exp4",
        title: "Apprentice Electrician",
        company: "Bright Spark Electrical",
        location: {
          city: "Ann Arbor",
          state: "MI",
          country: "USA"
        },
        startDate: "2016-09-10",
        endDate: "2019-03-28",
        description: "Assisted senior electricians with installations and repairs.",
        skills: ["Residential Electrical", "Repairs", "Apprentice Work"]
      }
    ],
    desiredSalary: 72000,
    preferredJobTitles: ["Senior Electrician", "Electrical Supervisor", "Project Electrician"],
    joinDate: "2024-02-12"
  },
  {
    id: "worker3",
    name: "Mike Jones",
    email: "mike.jones@example.com",
    phone: "555-456-7890",
    location: {
      city: "Columbus",
      state: "OH",
      country: "USA",
      zip: "43215"
    },
    bio: "Skilled plumber specialized in commercial plumbing systems and project management.",
    skills: ["Plumbing Installation", "Pipe Fitting", "Drainage Systems", "Plumbing Codes", "Water Heaters"],
    experience: [
      {
        id: "exp5",
        title: "Master Plumber",
        company: "Flow Solutions Plumbing",
        location: {
          city: "Columbus",
          state: "OH",
          country: "USA"
        },
        startDate: "2020-01-15",
        description: "Lead plumber for major commercial projects including office buildings and restaurants.",
        skills: ["Commercial Plumbing", "Project Leadership", "Code Compliance"]
      },
      {
        id: "exp6",
        title: "Plumber",
        company: "City Plumbing Services",
        location: {
          city: "Cincinnati",
          state: "OH",
          country: "USA"
        },
        startDate: "2015-06-22",
        endDate: "2019-12-20",
        description: "Handled residential and small commercial plumbing installation and repairs.",
        skills: ["Residential Plumbing", "Repairs", "Customer Service"]
      }
    ],
    desiredSalary: 68000,
    preferredJobTitles: ["Master Plumber", "Plumbing Contractor", "Plumbing Supervisor"],
    joinDate: "2024-01-22"
  }
];

export const mockEmployers: EmployerProfile[] = [
  {
    id: "employer1",
    companyName: "Construction Corp",
    email: "hr@constructioncorp.com",
    phone: "555-222-3333",
    location: {
      city: "Chicago",
      state: "IL",
      country: "USA",
      zip: "60602"
    },
    description: "Leading commercial construction company with projects across the Midwest.",
    industry: "Construction",
    companySize: "51-200 employees",
    website: "https://www.constructioncorp-example.com",
    joinDate: "2023-11-15"
  },
  {
    id: "employer2",
    companyName: "Plumbing Pros",
    email: "jobs@plumbingpros.com",
    phone: "555-444-5555",
    location: {
      city: "Columbus",
      state: "OH",
      country: "USA",
      zip: "43220"
    },
    description: "Full-service plumbing company specializing in residential and commercial projects.",
    industry: "Plumbing",
    companySize: "11-50 employees",
    website: "https://www.plumbingpros-example.com",
    joinDate: "2023-12-10"
  }
];

export const mockJobs: JobPosting[] = [
  {
    id: "job1",
    title: "Senior Carpenter",
    description: "We're seeking an experienced carpenter to join our team for commercial building projects. Must have 5+ years of experience in commercial construction, with strong knowledge of building codes and safety protocols.",
    location: {
      city: "Chicago",
      state: "IL",
      country: "USA"
    },
    salary: {
      min: 60000,
      max: 75000,
      type: "yearly"
    },
    employerId: "employer1",
    companyName: "Construction Corp",
    requiredSkills: ["Carpentry", "Commercial Construction", "Blueprint Reading", "Team Leadership"],
    experienceLevel: "Senior (5+ years)",
    postDate: "2024-03-20",
    deadlineDate: "2024-05-20",
    jobType: "full-time"
  },
  {
    id: "job2",
    title: "Journeyman Plumber",
    description: "Seeking a licensed journeyman plumber for residential and commercial service work. Must have knowledge of local plumbing codes, troubleshooting skills, and excellent customer service.",
    location: {
      city: "Columbus",
      state: "OH",
      country: "USA"
    },
    salary: {
      min: 52000,
      max: 68000,
      type: "yearly"
    },
    employerId: "employer2",
    companyName: "Plumbing Pros",
    requiredSkills: ["Plumbing Installation", "Troubleshooting", "Customer Service", "Code Knowledge"],
    experienceLevel: "Journeyman (3+ years)",
    postDate: "2024-03-25",
    jobType: "full-time"
  },
  {
    id: "job3",
    title: "Construction Helper",
    description: "Entry-level position assisting carpenters and other tradespeople on commercial construction sites. No experience necessary, but must have reliable transportation and be willing to learn.",
    location: {
      city: "Chicago",
      state: "IL",
      country: "USA"
    },
    salary: {
      min: 18,
      max: 22,
      type: "hourly"
    },
    employerId: "employer1",
    companyName: "Construction Corp",
    requiredSkills: ["Physical Strength", "Dependability", "Basic Tool Knowledge"],
    experienceLevel: "Entry Level",
    postDate: "2024-04-01",
    deadlineDate: "2024-04-30",
    jobType: "full-time"
  },
  {
    id: "job4",
    title: "Maintenance Plumber",
    description: "Part-time plumber needed for regular maintenance of plumbing systems in commercial buildings. Flexible hours, perfect for experienced plumbers looking for additional work.",
    location: {
      city: "Cincinnati",
      state: "OH",
      country: "USA"
    },
    salary: {
      min: 25,
      max: 35,
      type: "hourly"
    },
    employerId: "employer2",
    companyName: "Plumbing Pros",
    requiredSkills: ["Plumbing Maintenance", "Commercial Systems", "Troubleshooting"],
    experienceLevel: "Mid-level (2+ years)",
    postDate: "2024-03-28",
    jobType: "part-time"
  }
];
