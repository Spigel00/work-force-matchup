
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
import { UserRole, EmployerProfile } from "@/types/models";
import { Save } from "lucide-react";

const EditEmployerProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser, getEmployerProfile } = useAppContext();
  const [employer, setEmployer] = useState<EmployerProfile | null>(null);
  
  // Form state
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [description, setDescription] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    if (!currentUser || currentUser.role !== UserRole.EMPLOYER) {
      toast({
        title: "Access Denied",
        description: "You must be logged in as an employer to edit your profile.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    const employerProfile = getEmployerProfile(currentUser.id);
    if (employerProfile) {
      setEmployer(employerProfile);
      setCompanyName(employerProfile.companyName);
      setEmail(employerProfile.email);
      setPhone(employerProfile.phone || "");
      setCity(employerProfile.location.city);
      setState(employerProfile.location.state);
      setCountry(employerProfile.location.country);
      setZip(employerProfile.location.zip || "");
      setDescription(employerProfile.description || "");
      setCompanySize(employerProfile.companySize || "");
      setIndustry(employerProfile.industry);
      setWebsite(employerProfile.website || "");
    } else {
      toast({
        title: "Profile Error",
        description: "Could not load your company profile information.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [currentUser, getEmployerProfile, navigate, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!companyName || !email || !city || !state || !country || !industry) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Save changes
    const updatedEmployer: EmployerProfile = {
      ...employer!,
      companyName,
      email,
      phone: phone || undefined,
      location: {
        city,
        state,
        country,
        zip: zip || undefined
      },
      description: description || undefined,
      companySize: companySize || undefined,
      industry,
      website: website || undefined
    };

    // In a real app, we would call an API here
    // For now, we'll just show a success toast
    toast({
      title: "Profile Updated",
      description: "Your company profile has been updated successfully.",
    });

    navigate("/employer-dashboard");
  };

  if (!employer) {
    return (
      <AppLayout>
        <div className="container py-8">Loading profile...</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Edit Company Profile</h1>
        
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input 
                    id="companyName" 
                    value={companyName} 
                    onChange={(e) => setCompanyName(e.target.value)} 
                    placeholder="Your company name"
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
                    placeholder="Company email address"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="Company phone number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website" 
                    value={website} 
                    onChange={(e) => setWebsite(e.target.value)} 
                    placeholder="Company website"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Input 
                    id="industry" 
                    value={industry} 
                    onChange={(e) => setIndustry(e.target.value)} 
                    placeholder="Company industry"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Input 
                    id="companySize" 
                    value={companySize} 
                    onChange={(e) => setCompanySize(e.target.value)} 
                    placeholder="e.g. 1-10, 11-50, 51-200"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea 
                  id="description" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Tell us about your company, culture, and mission"
                  className="min-h-[150px]"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>Where is your company based?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input 
                    id="city" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="Company city"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province *</Label>
                  <Input 
                    id="state" 
                    value={state} 
                    onChange={(e) => setState(e.target.value)} 
                    placeholder="Company state or province"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input 
                    id="country" 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)} 
                    placeholder="Company country"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zip">Zip/Postal Code</Label>
                  <Input 
                    id="zip" 
                    value={zip} 
                    onChange={(e) => setZip(e.target.value)} 
                    placeholder="Company zip or postal code"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/employer-dashboard")}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default EditEmployerProfile;
