
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/contexts/AppContext";
import { Separator } from "@/components/ui/separator";
import { UserRole, WorkerProfile, WorkExperience } from "@/types/models";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Save, Trash2 } from "lucide-react";

const EditWorkerProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser, workers, getWorkerProfile } = useAppContext();
  const [worker, setWorker] = useState<WorkerProfile | null>(null);
  
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [preferredJobTitles, setPreferredJobTitles] = useState<string[]>([]);
  const [newJobTitle, setNewJobTitle] = useState("");
  const [desiredSalary, setDesiredSalary] = useState("");
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser || currentUser.role !== UserRole.WORKER) {
      toast({
        title: "Access Denied",
        description: "You must be logged in as a worker to edit your profile.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    const workerProfile = getWorkerProfile(currentUser.id);
    if (workerProfile) {
      setWorker(workerProfile);
      setName(workerProfile.name);
      setEmail(workerProfile.email);
      setPhone(workerProfile.phone || "");
      setCity(workerProfile.location.city);
      setState(workerProfile.location.state);
      setCountry(workerProfile.location.country);
      setZip(workerProfile.location.zip || "");
      setBio(workerProfile.bio || "");
      setSkills([...workerProfile.skills]);
      setPreferredJobTitles([...workerProfile.preferredJobTitles]);
      setDesiredSalary(workerProfile.desiredSalary?.toString() || "");
      setExperiences([...workerProfile.experience]);
    } else {
      toast({
        title: "Profile Error",
        description: "Could not load your profile information.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [currentUser, getWorkerProfile, navigate, toast]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleAddJobTitle = () => {
    if (newJobTitle.trim() && !preferredJobTitles.includes(newJobTitle.trim())) {
      setPreferredJobTitles([...preferredJobTitles, newJobTitle.trim()]);
      setNewJobTitle("");
    }
  };

  const handleRemoveJobTitle = (titleToRemove: string) => {
    setPreferredJobTitles(preferredJobTitles.filter(title => title !== titleToRemove));
  };

  const handleAddExperience = () => {
    const newExperience: WorkExperience = {
      id: `exp-${Date.now()}`,
      title: "",
      company: "",
      location: { city: "", state: "", country: "" },
      startDate: new Date().toISOString().split('T')[0],
      description: "",
      skills: []
    };
    
    setExperiences([...experiences, newExperience]);
  };

  const updateExperience = (id: string, field: string, value: string | string[]) => {
    setExperiences(experiences.map(exp => {
      if (exp.id === id) {
        if (field === 'city' || field === 'state' || field === 'country') {
          return {
            ...exp,
            location: {
              ...exp.location,
              [field]: value
            }
          };
        }
        return { ...exp, [field]: value };
      }
      return exp;
    }));
  };

  const handleDeleteExperience = (id: string) => {
    setExperienceToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteExperience = () => {
    if (experienceToDelete) {
      setExperiences(experiences.filter(exp => exp.id !== experienceToDelete));
      setDeleteDialogOpen(false);
      setExperienceToDelete(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!name || !email || !city || !state || !country) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Save changes
    const updatedWorker: WorkerProfile = {
      ...worker!,
      name,
      email,
      phone: phone || undefined,
      location: {
        city,
        state,
        country,
        zip: zip || undefined
      },
      bio: bio || undefined,
      skills,
      preferredJobTitles,
      desiredSalary: desiredSalary ? parseFloat(desiredSalary) : undefined,
      experience: experiences
    };

    // In a real app, we would call an API here
    // For now, we'll just show a success toast
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });

    navigate(`/workers/${currentUser?.id}`);
  };

  if (!worker) {
    return (
      <AppLayout>
        <div className="container py-8">Loading profile...</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Edit Your Profile</h1>
        
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Your email address"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="Your phone number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="desired-salary">Desired Annual Salary ($)</Label>
                  <Input 
                    id="desired-salary" 
                    type="number" 
                    value={desiredSalary} 
                    onChange={(e) => setDesiredSalary(e.target.value)} 
                    placeholder="Your desired salary"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)} 
                  placeholder="Tell us about yourself and your professional background"
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>Where are you based?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input 
                    id="city" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="Your city"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province *</Label>
                  <Input 
                    id="state" 
                    value={state} 
                    onChange={(e) => setState(e.target.value)} 
                    placeholder="Your state or province"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input 
                    id="country" 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)} 
                    placeholder="Your country"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zip">Zip/Postal Code</Label>
                  <Input 
                    id="zip" 
                    value={zip} 
                    onChange={(e) => setZip(e.target.value)} 
                    placeholder="Your zip or postal code"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>What are your professional skills?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="py-1.5 px-3">
                    {skill}
                    <button 
                      type="button" 
                      className="ml-2 text-gray-500 hover:text-red-500"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input 
                  value={newSkill} 
                  onChange={(e) => setNewSkill(e.target.value)} 
                  placeholder="Add a skill"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                />
                <Button type="button" onClick={handleAddSkill} size="sm">
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Preferred Job Titles</CardTitle>
              <CardDescription>What kinds of jobs are you looking for?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {preferredJobTitles.map((title, index) => (
                  <Badge key={index} variant="outline" className="py-1.5 px-3">
                    {title}
                    <button 
                      type="button" 
                      className="ml-2 text-gray-500 hover:text-red-500"
                      onClick={() => handleRemoveJobTitle(title)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input 
                  value={newJobTitle} 
                  onChange={(e) => setNewJobTitle(e.target.value)} 
                  placeholder="Add a job title"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddJobTitle())}
                />
                <Button type="button" onClick={handleAddJobTitle} size="sm">
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>Add your work history</CardDescription>
              </div>
              <Button 
                type="button" 
                onClick={handleAddExperience} 
                size="sm"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Experience
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {experiences.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No work experience added yet. Click "Add Experience" to get started.
                </p>
              ) : (
                experiences.map((exp, index) => (
                  <div key={exp.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Experience {index + 1}</h3>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteExperience(exp.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Job Title</Label>
                        <Input 
                          value={exp.title} 
                          onChange={(e) => updateExperience(exp.id, 'title', e.target.value)} 
                          placeholder="Your job title"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Company</Label>
                        <Input 
                          value={exp.company} 
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} 
                          placeholder="Company name"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input 
                          type="date" 
                          value={exp.startDate} 
                          onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>End Date (leave empty if current)</Label>
                        <Input 
                          type="date" 
                          value={exp.endDate || ''} 
                          onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} 
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>City</Label>
                        <Input 
                          value={exp.location.city} 
                          onChange={(e) => updateExperience(exp.id, 'city', e.target.value)} 
                          placeholder="City"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>State</Label>
                        <Input 
                          value={exp.location.state} 
                          onChange={(e) => updateExperience(exp.id, 'state', e.target.value)} 
                          placeholder="State"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Country</Label>
                        <Input 
                          value={exp.location.country} 
                          onChange={(e) => updateExperience(exp.id, 'country', e.target.value)} 
                          placeholder="Country"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea 
                        value={exp.description} 
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} 
                        placeholder="Describe your roles and responsibilities"
                      />
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate(`/workers/${currentUser?.id}`)}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Work Experience</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this work experience? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteExperience}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
};

export default EditWorkerProfile;
