
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { WorkerCard } from "@/components/WorkerCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { WorkerProfile } from "@/types/models";
import { useAppContext } from "@/contexts/AppContext";
import { Search } from "lucide-react";

const Workers = () => {
  const { workers } = useAppContext();
  const [filteredWorkers, setFilteredWorkers] = useState<WorkerProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");

  useEffect(() => {
    // Initial setup of filtered workers
    setFilteredWorkers(workers);
  }, [workers]);

  const handleSearch = () => {
    let result = [...workers];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(worker => 
        worker.name.toLowerCase().includes(query) || 
        worker.skills.some(skill => skill.toLowerCase().includes(query)) ||
        (worker.bio && worker.bio.toLowerCase().includes(query)) ||
        worker.experience.some(exp => 
          exp.title.toLowerCase().includes(query) || 
          exp.company.toLowerCase().includes(query)
        )
      );
    }

    // Filter by location
    if (locationFilter) {
      const locationQuery = locationFilter.toLowerCase();
      result = result.filter(worker => 
        worker.location.city.toLowerCase().includes(locationQuery) ||
        worker.location.state.toLowerCase().includes(locationQuery)
      );
    }

    // Filter by skill
    if (skillFilter) {
      result = result.filter(worker => 
        worker.skills.some(skill => skill.toLowerCase() === skillFilter.toLowerCase())
      );
    }

    setFilteredWorkers(result);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, locationFilter, skillFilter]);

  // Get unique skills from all workers for filter dropdown
  const allSkills = Array.from(
    new Set(
      workers.flatMap(worker => worker.skills)
    )
  ).sort();

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Available Workers</h1>

        {/* Search and Filters */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Input
                placeholder="Search workers, skills, companies..."
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
                <SelectItem value="Detroit">Detroit, MI</SelectItem>
                <SelectItem value="Columbus">Columbus, OH</SelectItem>
                <SelectItem value="Cincinnati">Cincinnati, OH</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={skillFilter} onValueChange={setSkillFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Skills</SelectItem>
                {allSkills.map((skill) => (
                  <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        {filteredWorkers.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No workers found</h3>
            <p className="text-gray-500">Try adjusting your search filters</p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-4">
              Showing {filteredWorkers.length} {filteredWorkers.length === 1 ? 'worker' : 'workers'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkers.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Workers;
