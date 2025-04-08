
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { JobPosting } from "@/types/models";
import { Briefcase } from "lucide-react";

const WorkerDashboard = () => {
  const { currentUser, getRecommendedJobs } = useAppContext();
  const [recommendedJobs, setRecommendedJobs] = useState<JobPosting[]>([]);

  useEffect(() => {
    if (currentUser) {
      // Get recommended jobs for the current worker
      const jobs = getRecommendedJobs(currentUser.id);
      setRecommendedJobs(jobs);
    }
  }, [currentUser, getRecommendedJobs]);

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Worker Dashboard</h1>
          <div className="flex space-x-4">
            <Link to="/profile">
              <Button variant="outline">Edit Profile</Button>
            </Link>
          </div>
        </div>

        {currentUser && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recommended Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{recommendedJobs.length}</div>
                <p className="text-sm text-gray-500">Based on your skills and preferences</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Applied Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
                <p className="text-sm text-gray-500">Track your applications</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Profile Completeness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">75%</div>
                <p className="text-sm text-gray-500">Complete your profile to improve matches</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recommended Jobs</h2>
            <Link to="/jobs">
              <Button variant="outline" size="sm">View All Jobs</Button>
            </Link>
          </div>

          {recommendedJobs.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-blue-collar-100 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-blue-collar-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">No recommended jobs yet</h3>
                <p className="text-gray-500 mb-4">
                  Update your profile with more skills and experience to get personalized job recommendations.
                </p>
                <Link to="/profile">
                  <Button>Update Profile</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedJobs.slice(0, 6).map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Complete Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-3 h-6 w-6 rounded-full bg-blue-collar-100 flex items-center justify-center">
                    <svg className="h-4 w-4 text-blue-collar-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Add your work experience</h4>
                    <p className="text-sm text-gray-500">Highlight your past roles and responsibilities</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="h-4 w-4 text-gray-400">?</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Upload your certifications</h4>
                    <p className="text-sm text-gray-500">Add any relevant licenses or training certificates</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="h-4 w-4 text-gray-400">?</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Set job preferences</h4>
                    <p className="text-sm text-gray-500">Let employers know what you're looking for</p>
                  </div>
                </li>
              </ul>
              <div className="mt-6">
                <Link to="/profile">
                  <Button variant="outline" className="w-full">Update Profile</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Job Search Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Keep your skills updated</h4>
                <p className="text-sm text-gray-600">Regularly update your skills to ensure you get matched with the most relevant jobs.</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Be specific about your experience</h4>
                <p className="text-sm text-gray-600">Detail your responsibilities and achievements in previous roles.</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Set realistic salary expectations</h4>
                <p className="text-sm text-gray-600">Research industry standards for your role and location.</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Apply early to new job postings</h4>
                <p className="text-sm text-gray-600">Employers often review applications as they arrive.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default WorkerDashboard;
