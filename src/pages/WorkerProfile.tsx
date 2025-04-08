
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { WorkerProfile as WorkerProfileType } from "@/types/models";
import { MapPin, Calendar, User, ArrowUp, Briefcase } from "lucide-react";

const WorkerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { getWorkerProfile } = useAppContext();
  const [worker, setWorker] = useState<WorkerProfileType | null>(null);

  useEffect(() => {
    if (id) {
      const workerData = getWorkerProfile(id);
      if (workerData) {
        setWorker(workerData);
      }
    }
  }, [id, getWorkerProfile]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!worker) {
    return (
      <AppLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold">Worker not found</h2>
          <p className="mt-4">The worker profile you're looking for doesn't exist or has been removed.</p>
          <Link to="/workers" className="mt-6 inline-block">
            <Button>Browse all workers</Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/workers" className="text-blue-collar-600 hover:text-blue-collar-700 flex items-center">
            <ArrowUp className="h-4 w-4 mr-1 rotate-90" />
            Back to Workers
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    {worker.profilePicture ? (
                      <img
                        src={worker.profilePicture}
                        alt={worker.name}
                        className="h-32 w-32 rounded-full object-cover mb-4"
                      />
                    ) : (
                      <div className="h-32 w-32 rounded-full bg-blue-collar-100 flex items-center justify-center mb-4">
                        <User className="h-16 w-16 text-blue-collar-600" />
                      </div>
                    )}
                    
                    <h1 className="text-2xl font-bold">{worker.name}</h1>
                    <p className="text-gray-600 mt-1">
                      {worker.experience.length > 0 ? worker.experience[0].title : "Professional"}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Location</h3>
                        <p className="text-gray-600">
                          {worker.location.city}, {worker.location.state}, {worker.location.country}
                          {worker.location.zip && ` ${worker.location.zip}`}
                        </p>
                      </div>
                    </div>
                    
                    {worker.phone && (
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-gray-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <div>
                          <h3 className="font-medium">Phone</h3>
                          <p className="text-gray-600">{worker.phone}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-gray-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-gray-600">{worker.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Member Since</h3>
                        <p className="text-gray-600">{formatDate(worker.joinDate)}</p>
                      </div>
                    </div>

                    {worker.desiredSalary && (
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-gray-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <h3 className="font-medium">Desired Salary</h3>
                          <p className="text-gray-600">${worker.desiredSalary.toLocaleString()}/year</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full">Contact Worker</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                {worker.bio ? (
                  <p className="text-gray-700">{worker.bio}</p>
                ) : (
                  <p className="text-gray-500 italic">No bio provided</p>
                )}
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold mb-6">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {worker.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-collar-50 text-blue-collar-800 py-1.5 px-3">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold mb-6">Work Experience</h2>
                {worker.experience.length === 0 ? (
                  <p className="text-gray-500 italic">No work experience listed</p>
                ) : (
                  <div className="space-y-8">
                    {worker.experience.map((exp) => (
                      <div key={exp.id} className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-blue-collar-100">
                        <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-blue-collar-500 -translate-x-1.5"></div>
                        
                        <div className="mb-1">
                          <h3 className="text-lg font-semibold">{exp.title}</h3>
                          <p className="text-blue-collar-700">{exp.company}</p>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{exp.location.city}, {exp.location.state}</span>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{exp.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-100">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold mb-6">Preferred Job Titles</h2>
                {worker.preferredJobTitles.length === 0 ? (
                  <p className="text-gray-500 italic">No preferred job titles listed</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {worker.preferredJobTitles.map((title, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-collar-50 text-blue-collar-800">
                        <Briefcase className="h-3 w-3 mr-1" />
                        {title}
                      </Badge>
                    ))}
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

export default WorkerProfile;
