
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Briefcase, Search, User, MapPin } from "lucide-react";
import { UserRole } from "@/types/models";
import { useAppContext } from "@/contexts/AppContext";

const Home = () => {
  const { currentUser } = useAppContext();

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="hero-section py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:text-left lg:w-2/3">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              Connect Blue-Collar Talent with the Right Opportunities
            </h1>
            <p className="text-xl mb-8 text-blue-collar-100">
              Our platform matches skilled workers with employers looking for their exact expertise. Whether you're a carpenter, plumber, electrician, or other skilled professional.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              {!currentUser && (
                <>
                  <Link to="/register">
                    <Button size="lg" className="w-full sm:w-auto bg-white text-blue-collar-800 hover:bg-blue-collar-50">
                      <User className="mr-2 h-5 w-5" />
                      I'm a Worker
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-blue-collar-700">
                      <Briefcase className="mr-2 h-5 w-5" />
                      I'm an Employer
                    </Button>
                  </Link>
                </>
              )}
              {currentUser && currentUser.role === UserRole.WORKER && (
                <Link to="/jobs">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-blue-collar-800 hover:bg-blue-collar-50">
                    <Search className="mr-2 h-5 w-5" />
                    Find Jobs
                  </Button>
                </Link>
              )}
              {currentUser && currentUser.role === UserRole.EMPLOYER && (
                <Link to="/post-job">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-blue-collar-800 hover:bg-blue-collar-50">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Post a Job
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A simple, effective process to connect blue-collar professionals with the right job opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg">
              <div className="bg-blue-collar-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-blue-collar-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up and build your professional profile with your skills, experience, and job preferences.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg">
              <div className="bg-blue-collar-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-collar-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Matched</h3>
              <p className="text-gray-600">
                Our system automatically recommends jobs that match your skills, experience, and preferences.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg">
              <div className="bg-blue-collar-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-blue-collar-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Apply & Connect</h3>
              <p className="text-gray-600">
                Apply to jobs easily and connect directly with employers looking for professionals like you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Workers Section */}
      <section className="bg-blue-collar-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">For Blue-Collar Workers</h2>
              <p className="text-gray-700 mb-6">
                Finding the right job shouldn't be a full-time job itself. Let us match you with opportunities that fit your skills, experience, and preferences.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-collar-200 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-4 w-4 text-blue-collar-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Personalized job recommendations based on your skills</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-collar-200 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-4 w-4 text-blue-collar-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Filter jobs by location, salary, and job type</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-collar-200 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-4 w-4 text-blue-collar-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Showcase your skills and experience to potential employers</span>
                </li>
              </ul>
              <Link to={currentUser ? "/jobs" : "/register"}>
                <Button size="lg">
                  {currentUser ? "Find Jobs" : "Join as a Worker"}
                </Button>
              </Link>
            </div>
            <div className="mt-8 md:mt-0 md:w-5/12">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-collar-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-collar-700" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold">Mike Peterson</h3>
                    <p className="text-sm text-gray-500">Electrician</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "I found my dream job within a week of signing up. The platform matched me with opportunities that actually fit my skills and experience. I'm now making 20% more than my previous position."
                </p>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">Columbus, OH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Employers Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-5/12 order-2 md:order-1">
              <div className="bg-blue-collar-50 p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-collar-100 flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-blue-collar-700" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold">Construction Corp</h3>
                    <p className="text-sm text-gray-500">Chicago, IL</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "Finding qualified workers used to be our biggest challenge. This platform has transformed our hiring process. We can now easily find skilled workers in our area who match our specific project needs."
                </p>
                <div className="text-sm text-gray-500">
                  Hired 12 workers through the platform
                </div>
              </div>
            </div>
            <div className="mb-8 md:mb-0 md:w-1/2 order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-4">For Employers</h2>
              <p className="text-gray-700 mb-6">
                Connect with qualified blue-collar professionals who have the exact skills and experience you need. Save time and resources in your hiring process.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-collar-200 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-4 w-4 text-blue-collar-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Post jobs and receive applications from qualified workers</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-collar-200 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-4 w-4 text-blue-collar-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Get matched with workers based on location and experience</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-collar-200 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-4 w-4 text-blue-collar-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Build your employer brand and attract top talent</span>
                </li>
              </ul>
              <Link to={currentUser ? "/post-job" : "/register"}>
                <Button size="lg">
                  {currentUser ? "Post a Job" : "Join as an Employer"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-collar-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-collar-100 max-w-2xl mx-auto">
            Join thousands of workers and employers already using our platform to make their perfect match.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto bg-white text-blue-collar-800 hover:bg-blue-collar-50">
                Create Your Account
              </Button>
            </Link>
            <Link to="/jobs">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-blue-collar-700">
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Home;
