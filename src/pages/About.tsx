
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Users, Briefcase, Building } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      title: "Find the right job",
      description: "Our platform matches blue collar workers with jobs that match their skills and experience.",
      icon: Briefcase,
    },
    {
      title: "Hire qualified workers",
      description: "Employers can post jobs and find workers with the right skills in their location.",
      icon: Users,
    },
    {
      title: "Smart recommendations",
      description: "Our system automatically recommends the best matches for both workers and employers.",
      icon: Check,
    },
    {
      title: "Company profiles",
      description: "Employers can showcase their company and attract the right talent.",
      icon: Building,
    },
  ];

  return (
    <AppLayout>
      <div className="px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Connecting Skilled Workers with Quality Jobs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our platform is designed specifically for blue collar professionals, helping them
            find jobs that match their skills, experience, and salary expectations while
            enabling employers to find qualified workers in their area.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/jobs">Browse Jobs</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-500">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-blue-50 py-16 mb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Connecting Workers with Opportunities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-blue-600 mb-2">500+</p>
                <p className="text-gray-600">Available Jobs</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600 mb-2">1,200+</p>
                <p className="text-gray-600">Skilled Workers</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600 mb-2">300+</p>
                <p className="text-gray-600">Employers</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600 mb-2">2,500+</p>
                <p className="text-gray-600">Job Placements</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Whether you're looking for work or looking to hire, our platform makes
            it easy to find the perfect match.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/register">Create an Account</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/jobs">Browse Jobs</Link>
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default About;
