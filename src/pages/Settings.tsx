
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/contexts/AppContext";
import { Download, LogOut, UserCog, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { UserRole } from "@/types/models";

const Settings = () => {
  const { currentUser, logout, exportData } = useAppContext();

  const handleExportData = () => {
    exportData();
  };

  const getProfileEditLink = () => {
    if (!currentUser) return null;
    
    if (currentUser.role === UserRole.WORKER) {
      return "/edit-worker-profile";
    } else if (currentUser.role === UserRole.EMPLOYER) {
      return "/edit-employer-profile";
    }
    
    return null;
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        <div className="grid gap-6">
          {currentUser && (
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Your account information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 items-center">
                    <span className="font-medium">Name:</span>
                    <span className="md:col-span-2">{currentUser.name}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 items-center">
                    <span className="font-medium">Email:</span>
                    <span className="md:col-span-2">{currentUser.email}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 items-center">
                    <span className="font-medium">Account type:</span>
                    <span className="md:col-span-2 capitalize">{currentUser.role}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 items-center">
                    <span className="font-medium">Joined:</span>
                    <span className="md:col-span-2">
                      {new Date(currentUser.joined).toLocaleDateString(undefined, {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-4">
                {getProfileEditLink() && (
                  currentUser.role === UserRole.WORKER ? (
                    <Button variant="outline" asChild>
                      <Link to={getProfileEditLink()!}>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Create/Edit Profile
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="outline" asChild>
                      <Link to={getProfileEditLink()!}>
                        <UserCog className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Link>
                    </Button>
                  )
                )}
                <Button variant="destructive" onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </Button>
              </CardFooter>
            </Card>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Export or manage your application data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Export all application data including jobs, workers and employers as a JSON file.
                This can be used for backup or data analysis purposes.
              </p>
              <Button onClick={handleExportData}>
                <Download className="w-4 h-4 mr-2" />
                Export Data as JSON
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
