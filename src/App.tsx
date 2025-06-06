
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Rankings from "./pages/Rankings";
import Wallet from "./pages/Wallet";
import ReferralProgram from "./pages/ReferralProgram";
import Signals from "./pages/Signals";
import Learn from "./pages/Learn";
import Community from "./pages/Community";
import CreateContent from "./pages/CreateContent";
import CreateGiveaway from "./pages/CreateGiveaway";
import ShareTrade from "./pages/ShareTrade";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import ContentModeration from "./pages/ContentModeration";
import SupportTickets from "./pages/SupportTickets";
import FeatureManagement from "./pages/FeatureManagement";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/auth" 
        element={user ? <Navigate to="/" replace /> : <Auth />} 
      />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/signals" 
        element={
          <ProtectedRoute>
            <Signals />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/learn" 
        element={
          <ProtectedRoute>
            <Learn />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/community" 
        element={
          <ProtectedRoute>
            <Community />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/rankings" 
        element={
          <ProtectedRoute>
            <Rankings />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/wallet" 
        element={
          <ProtectedRoute>
            <Wallet />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/referral" 
        element={
          <ProtectedRoute>
            <ReferralProgram />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/share-trade" 
        element={
          <ProtectedRoute>
            <ShareTrade />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/create-content" 
        element={
          <ProtectedRoute>
            <CreateContent />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/create-giveaway" 
        element={
          <ProtectedRoute>
            <CreateGiveaway />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/users" 
        element={
          <ProtectedRoute>
            <UserManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/content" 
        element={
          <ProtectedRoute>
            <ContentModeration />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/support" 
        element={
          <ProtectedRoute>
            <SupportTickets />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/features" 
        element={
          <ProtectedRoute>
            <FeatureManagement />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
