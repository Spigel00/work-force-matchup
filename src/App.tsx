
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { useState } from "react";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import Workers from "./pages/Workers";
import JobDetail from "./pages/JobDetail";
import WorkerDashboard from "./pages/WorkerDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import PostJob from "./pages/PostJob";
import WorkerProfile from "./pages/WorkerProfile";
import EmployerProfile from "./pages/EmployerProfile";
import EditWorkerProfile from "./pages/EditWorkerProfile";
import EditEmployerProfile from "./pages/EditEmployerProfile";
import Settings from "./pages/Settings";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const App = () => {
  // Move the QueryClient instantiation inside the component function
  // to ensure it's created in the React component lifecycle
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/workers" element={<Workers />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/worker-dashboard" element={<WorkerDashboard />} />
              <Route path="/employer-dashboard" element={<EmployerDashboard />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/workers/:id" element={<WorkerProfile />} />
              <Route path="/employers/:id" element={<EmployerProfile />} />
              <Route path="/edit-worker-profile" element={<EditWorkerProfile />} />
              <Route path="/edit-employer-profile" element={<EditEmployerProfile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
              {/* Redirect Index to Home */}
              <Route path="/index" element={<Navigate to="/" replace />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
