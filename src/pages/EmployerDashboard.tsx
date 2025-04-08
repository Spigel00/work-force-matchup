
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { JobPosting, WorkerProfile } from "@/types/models";
import { WorkerCard } from "@/components/WorkerCard";

const EmployerDashboard = () => {
  const { currentUser, jobs, getRecommendedWorkers } = useAppContext();
  const [employerJobs, setEmployerJobs] = useState<JobPosting[]>([]);
  const [recommendedWorkers, setRecommendedWorkers] = useState<WorkerProfile[]>([]);

  useEffect(() => {
    if (currentUser) {
      // Filter jobs posted by this employer
      const filteredJobs = jobs.filter(job => job.employerId === currentUser.id);
      setEmployerJobs(filteredJobs);
      
      // Get recommended workers for the most recent job
      if (filteredJobs.length > 0) {
        const latestJob = filteredJobs.sort((a, b) => 
          new Date(b.postDate).getTime() - new Date(a.postDate).getTime()
        )[0];
        
        const workers = getRecommendedWorkers(latestJob.id);
        setRecommendedWorkers(workers);
      }
    }
  }, [currentUser, jobs, getRecommendedWorkers]);

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Employer Dashboard</h1>
          <div className="flex space-x-4">
            <Link to="/post-job">
              <Button>Post a New Job</Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline">Company Profile</Button>
            </Link>
          </div>
        </div>

        {currentUser && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Active Job Postings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{employerJobs.length}</div>
                <p className="text-sm text-gray-500">Currently accepting applications</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
                <p className="text-sm text-gray-500">From all your job postings</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Profile Completeness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">80%</div>
                <p className="text-sm text-gray-500">Complete your profile to attract more applicants</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Job Postings</h2>
            <Link to="/post-job">
              <Button variant="outline" size="sm">Post New Job</Button>
            </Link>
          </div>

          {employerJobs.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-blue-collar-100 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-blue-collar-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">No job postings yet</h3>
                <p className="text-gray-500 mb-4">
                  Create your first job posting to start finding qualified workers.
                </p>
                <Link to="/post-job">
                  <Button>Post a Job</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {employerJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <Link to={`/jobs/${job.id}`} className="hover:text-blue-collar-700 transition-colors">
                          <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                        </Link>
                        <div className="flex items-center text-gray-500 text-sm mb-2">
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Posted on {new Date(job.postDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location.city}, {job.location.state}
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-start md:items-center gap-2">
                        <div className="bg-blue-collar-50 text-blue-collar-800 px-3 py-1 rounded-full text-sm">
                          0 Applicants
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/jobs/${job.id}`}>
                            <Button variant="outline" size="sm">View</Button>
                          </Link>
                          <Link to={`/jobs/${job.id}/edit`}>
                            <Button variant="outline" size="sm">Edit</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recommended Workers</h2>
            <Link to="/workers">
              <Button variant="outline" size="sm">View All Workers</Button>
            </Link>
          </div>

          {recommendedWorkers.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-blue-collar-100 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-blue-collar-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">No recommended workers yet</h3>
                <p className="text-gray-500 mb-4">
                  Post a job to get recommendations of qualified workers in your area.
                </p>
                <Link to="/post-job">
                  <Button>Post a Job</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedWorkers.slice(0, 6).map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default EmployerDashboard;
