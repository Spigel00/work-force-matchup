
import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  UserRole, 
  JobPosting, 
  WorkerProfile, 
  EmployerProfile,
  User
} from "../types/models";
import { mockUsers, mockWorkers, mockEmployers, mockJobs } from "../data/mockData";
import { useToast } from "@/hooks/use-toast";

interface AppContextProps {
  currentUser: User | null;
  workers: WorkerProfile[];
  employers: EmployerProfile[];
  jobs: JobPosting[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  registerUser: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
  addJobPosting: (job: Omit<JobPosting, "id" | "postDate" | "companyName" | "employerId">) => void;
  getRecommendedJobs: (workerId: string) => JobPosting[];
  getRecommendedWorkers: (jobId: string) => WorkerProfile[];
  getUserRole: () => UserRole | null;
  getWorkerProfile: (id: string) => WorkerProfile | undefined;
  getEmployerProfile: (id: string) => EmployerProfile | undefined;
  getJobById: (id: string) => JobPosting | undefined;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [workers, setWorkers] = useState<WorkerProfile[]>([]);
  const [employers, setEmployers] = useState<EmployerProfile[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load mock data
    setWorkers(mockWorkers);
    setEmployers(mockEmployers);
    setJobs(mockJobs);

    // Check for saved user session
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call/authentication
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });
      return true;
    }
    
    toast({
      title: "Login Failed",
      description: "Invalid email or password",
      variant: "destructive",
    });
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const registerUser = async (
    email: string, 
    password: string, 
    name: string, 
    role: UserRole
  ): Promise<boolean> => {
    // Check if user already exists
    const userExists = mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (userExists) {
      toast({
        title: "Registration Failed",
        description: "A user with this email already exists.",
        variant: "destructive",
      });
      return false;
    }
    
    // Create a new user (in a real app, this would be an API call)
    const newUser: User = {
      id: `user${mockUsers.length + 1}`,
      email,
      name,
      role,
      joined: new Date().toISOString().split('T')[0],
    };
    
    // In a real app, we would save this user to a database
    // For now, we'll just update our local state
    setCurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    
    toast({
      title: "Registration Successful",
      description: "Your account has been created successfully.",
    });
    return true;
  };

  const addJobPosting = (
    jobData: Omit<JobPosting, "id" | "postDate" | "companyName" | "employerId">
  ) => {
    if (!currentUser || currentUser.role !== UserRole.EMPLOYER) {
      toast({
        title: "Permission Denied",
        description: "Only employers can post jobs.",
        variant: "destructive",
      });
      return;
    }

    const employer = employers.find(e => e.id === currentUser.id);
    if (!employer) {
      toast({
        title: "Error",
        description: "Employer profile not found.",
        variant: "destructive",
      });
      return;
    }

    const newJob: JobPosting = {
      ...jobData,
      id: `job${jobs.length + 1}`,
      employerId: currentUser.id,
      companyName: employer.companyName,
      companyLogo: employer.companyLogo,
      postDate: new Date().toISOString().split('T')[0],
    };

    setJobs(prevJobs => [...prevJobs, newJob]);
    
    toast({
      title: "Job Posted Successfully",
      description: "Your job listing has been published.",
    });
  };

  const getRecommendedJobs = (workerId: string): JobPosting[] => {
    const worker = workers.find(w => w.id === workerId);
    
    if (!worker) {
      return [];
    }

    // Simple recommendation algorithm: match by skills, job titles, and salary
    return jobs
      .filter(job => {
        // Match based on skill overlap
        const matchingSkills = job.requiredSkills.filter(
          skill => worker.skills.includes(skill)
        );
        
        // Match based on job title preferences
        const titleMatch = worker.preferredJobTitles.some(
          title => job.title.toLowerCase().includes(title.toLowerCase())
        );
        
        // Match based on salary range (if specified)
        const salaryMatch = !worker.desiredSalary || !job.salary 
          ? true 
          : job.salary.min === undefined 
            ? true 
            : worker.desiredSalary <= (job.salary.max || job.salary.min);
        
        // Job needs to have at least one matching skill or title
        return (matchingSkills.length > 0 || titleMatch) && salaryMatch;
      })
      .sort((a, b) => {
        // Sort by number of matching skills
        const aMatchCount = a.requiredSkills.filter(skill => worker.skills.includes(skill)).length;
        const bMatchCount = b.requiredSkills.filter(skill => worker.skills.includes(skill)).length;
        return bMatchCount - aMatchCount;
      });
  };

  const getRecommendedWorkers = (jobId: string): WorkerProfile[] => {
    const job = jobs.find(j => j.id === jobId);
    
    if (!job) {
      return [];
    }

    // Recommendation algorithm based on location, skills, and experience
    return workers
      .filter(worker => {
        // Match based on skill overlap
        const matchingSkills = worker.skills.filter(
          skill => job.requiredSkills.includes(skill)
        );
        
        // Match based on location (same city or state)
        const locationMatch = 
          worker.location.city === job.location.city || 
          worker.location.state === job.location.state;
        
        // Worker must have at least one matching skill AND be in the right location
        return matchingSkills.length > 0 && locationMatch;
      })
      .sort((a, b) => {
        // Sort by number of matching skills primarily
        const aMatchCount = a.skills.filter(skill => job.requiredSkills.includes(skill)).length;
        const bMatchCount = b.skills.filter(skill => job.requiredSkills.includes(skill)).length;
        
        // Secondary sort by exact location match
        if (bMatchCount === aMatchCount) {
          const aExactLocationMatch = a.location.city === job.location.city ? 1 : 0;
          const bExactLocationMatch = b.location.city === job.location.city ? 1 : 0;
          return bExactLocationMatch - aExactLocationMatch;
        }
        
        return bMatchCount - aMatchCount;
      });
  };

  const getUserRole = (): UserRole | null => {
    return currentUser ? currentUser.role : null;
  };

  const getWorkerProfile = (id: string): WorkerProfile | undefined => {
    return workers.find(worker => worker.id === id);
  };

  const getEmployerProfile = (id: string): EmployerProfile | undefined => {
    return employers.find(employer => employer.id === id);
  };

  const getJobById = (id: string): JobPosting | undefined => {
    return jobs.find(job => job.id === id);
  };

  const value = {
    currentUser,
    workers,
    employers,
    jobs,
    login,
    logout,
    registerUser,
    addJobPosting,
    getRecommendedJobs,
    getRecommendedWorkers,
    getUserRole,
    getWorkerProfile,
    getEmployerProfile,
    getJobById
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
