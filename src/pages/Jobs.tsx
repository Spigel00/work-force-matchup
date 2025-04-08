
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { JobCard } from "@/components/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { JobPosting } from "@/types/models";
import { useAppContext } from "@/contexts/AppContext";
import { Search } from "lucide-react";

const Jobs = () => {
  const { jobs, currentUser, getRecommendedJobs } = useAppContext();
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [showRecommended, setShowRecommended] = useState(true);

  useEffect(() => {
    // Initial setup of filtered jobs
    if (currentUser && showRecommended) {
      setFilteredJobs(getRecommendedJobs(currentUser.id));
    } else {
      setFilteredJobs(jobs);
    }
  }, [currentUser, jobs, getRecommendedJobs, showRecommended]);

  const handleSearch = () => {
    let result = showRecommended && currentUser ? getRecommendedJobs(currentUser.id) : [...jobs];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(query) || 
        job.description.toLowerCase().includes(query) ||
        job.companyName.toLowerCase().includes(query) ||
        job.requiredSkills.some(skill => skill.toLowerCase().includes(query))
      );
    }

    // Filter by location
    if (locationFilter) {
      const locationQuery = locationFilter.toLowerCase();
      result = result.filter(job => 
        job.location.city.toLowerCase().includes(locationQuery) ||
        job.location.state.toLowerCase().includes(locationQuery)
      );
    }

    // Filter by job type
    if (typeFilter) {
      result = result.filter(job => job.jobType === typeFilter);
    }

    setFilteredJobs(result);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, locationFilter, typeFilter, showRecommended]);

  const toggleRecommendedFilter = () => {
    setShowRecommended(!showRecommended);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Jobs</h1>
          
          {currentUser && (
            <Button 
              variant={showRecommended ? "default" : "outline"}
              onClick={toggleRecommendedFilter}
            >
              {showRecommended ? "Showing Recommended" : "Show Recommended"}
            </Button>
          )}
        </div>

        {/* Search and Filters */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Input
                placeholder="Search jobs, skills, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                <SelectItem value="Chicago">Chicago, IL</SelectItem>
                <SelectItem value="Columbus">Columbus, OH</SelectItem>
                <SelectItem value="Cincinnati">Cincinnati, OH</SelectItem>
                <SelectItem value="Detroit">Detroit, MI</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="temporary">Temporary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your search filters</p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-4">
              Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
              {showRecommended && currentUser ? ' recommended for you' : ''}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Jobs;
