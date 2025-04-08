
export enum UserRole {
  WORKER = "worker",
  EMPLOYER = "employer"
}

export type LocationType = {
  city: string;
  state: string;
  country: string;
  zip?: string;
};

export type WorkExperience = {
  id: string;
  title: string;
  company: string;
  location: LocationType;
  startDate: string;
  endDate?: string;
  description: string;
  skills: string[];
};

export type WorkerProfile = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location: LocationType;
  bio?: string;
  profilePicture?: string;
  skills: string[];
  experience: WorkExperience[];
  desiredSalary?: number;
  preferredJobTitles: string[];
  joinDate: string;
};

export type EmployerProfile = {
  id: string;
  companyName: string;
  email: string;
  phone?: string;
  location: LocationType;
  description?: string;
  companyLogo?: string;
  companySize?: string;
  industry: string;
  website?: string;
  joinDate: string;
};

export type JobPosting = {
  id: string;
  title: string;
  description: string;
  location: LocationType;
  salary?: {
    min?: number;
    max?: number;
    type: "hourly" | "weekly" | "monthly" | "yearly";
  };
  employerId: string;
  companyName: string;
  companyLogo?: string;
  requiredSkills: string[];
  experienceLevel: string;
  postDate: string;
  deadlineDate?: string;
  jobType: "full-time" | "part-time" | "contract" | "temporary";
};

export type User = {
  id: string;
  role: UserRole;
  email: string;
  name: string;
  joined: string;
};
