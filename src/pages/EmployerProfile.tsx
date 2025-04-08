
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { EmployerProfile as EmployerProfileType, JobPosting } from "@/types/models";
import { MapPin, Calendar, Building, ArrowUp, Globe, Phone, Mail, Edit } from "lucide-react";
import { JobCard } from "@/components/JobCard";

const EmployerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { getEmployerProfile, currentUser, jobs } = useAppContext();
  const [employer, setEmployer] = useState<EmployerProfileType | null>(null);
  const [employerJobs, setEmployerJobs] = useState<JobPosting[]>([]);

  useEffect(() => {
    if (id) {
      const employerData = getEmployerProfile(id);
      if (employerData) {
        setEmployer(employerData);
        // Get all jobs posted by this employer
        setEmployerJobs(jobs.filter(job => job.employerId === id));
      }
    }
  }, [id, getEmployerProfile, jobs]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isOwnProfile = currentUser && currentUser.id === id;

  if (!employer) {
    return (
      <AppLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold">Employer not found</h2>
          <p className="mt-4">The employer profile you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="mt-6 inline-block">
            <Button>Go to Home</Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <Link to="/" className="text-blue-collar-600 hover:text-blue-collar-700 flex items-center">
            <ArrowUp className="h-4 w-4 mr-1 rotate-90" />
            Back to Home
          </Link>
          
          {isOwnProfile && (
            <Link to="/edit-employer-profile">
              <Button variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    {employer.companyLogo ? (
                      <img
                        src={employer.companyLogo}
                        alt={employer.companyName}
                        className="h-32 w-32 object-contain mb-4"
                      />
                    ) : (
                      <div className="h-32 w-32 rounded-lg bg-blue-collar-100 flex items-center justify-center mb-4">
                        <Building className="h-16 w-16 text-blue-collar-600" />
                      </div>
                    )}
                    
                    <h1 className="text-2xl font-bold">{employer.companyName}</h1>
                    <p className="text-gray-600 mt-1">{employer.industry}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Location</h3>
                        <p className="text-gray-600">
                          {employer.location.city}, {employer.location.state}, {employer.location.country}
                          {employer.location.zip && ` ${employer.location.zip}`}
                        </p>
                      </div>
                    </div>
                    
                    {employer.phone && (
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Phone</h3>
                          <p className="text-gray-600">{employer.phone}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-gray-600">{employer.email}</p>
                      </div>
                    </div>
                    
                    {employer.website && (
                      <div className="flex items-start">
                        <Globe className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Website</h3>
                          <p className="text-gray-600">
                            <a 
                              href={employer.website.startsWith('http') ? employer.website : `https://${employer.website}`} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-blue-collar-600 hover:underline"
                            >
                              {employer.website}
                            </a>
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Member Since</h3>
                        <p className="text-gray-600">{formatDate(employer.joinDate)}</p>
                      </div>
                    </div>

                    {employer.companySize && (
                      <div className="flex items-start">
                        <Building className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Company Size</h3>
                          <p className="text-gray-600">{employer.companySize} employees</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold mb-4">About {employer.companyName}</h2>
                {employer.description ? (
                  <p className="text-gray-700">{employer.description}</p>
                ) : (
                  <p className="text-gray-500 italic">No company description provided</p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold mb-6">Current Job Openings</h2>
                {employerJobs.length === 0 ? (
                  <p className="text-gray-500 italic">No active job postings at the moment</p>
                ) : (
                  <div className="grid gap-4">
                    {employerJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                )}
                
                {isOwnProfile && (
                  <div className="mt-6">
                    <Link to="/post-job">
                      <Button>Post a New Job</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default EmployerProfile;
