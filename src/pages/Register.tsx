
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/contexts/AppContext";
import { UserRole } from "@/types/models";
import { Briefcase } from "lucide-react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.WORKER);
  const [isLoading, setIsLoading] = useState(false);
  const { registerUser } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await registerUser(email, password, name, role);
      if (success) {
        navigate(role === UserRole.WORKER ? "/worker-dashboard" : "/employer-dashboard");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="flex min-h-[calc(100vh-64px-180px)] flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Briefcase className="h-12 w-12 text-blue-collar-700" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-collar-600 hover:text-blue-collar-500">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {role === UserRole.WORKER ? "Full Name" : "Company Name"}
                </label>
                <div className="mt-1">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I am a
                </label>
                <RadioGroup defaultValue={role} onValueChange={(value) => setRole(value as UserRole)} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={UserRole.WORKER} id="worker" />
                    <Label htmlFor="worker">Worker looking for jobs</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={UserRole.EMPLOYER} id="employer" />
                    <Label htmlFor="employer">Employer looking to hire</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center">
                <div className="text-sm">
                  By signing up, you agree to our{" "}
                  <Link to="/terms" className="font-medium text-blue-collar-600 hover:text-blue-collar-500">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="font-medium text-blue-collar-600 hover:text-blue-collar-500">
                    Privacy Policy
                  </Link>
                  .
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Register;
