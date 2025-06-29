import React, { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { LogIn, Clock, Shield, Users, FileText, CheckCircle, Plus, User, Building, Mail, MapPin, Phone, Search, Filter, Download, Edit, Trash2, Eye, Upload, UserPlus } from "lucide-react";
import TimesheetForm from "@/components/timesheet-form";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function TimesheetsNew() {
  useScrollToTop();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTimesheet, setEditingTimesheet] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedTimesheet, setSelectedTimesheet] = useState<any>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [timesheetToDelete, setTimesheetToDelete] = useState<any>(null);

  // Authentication
  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await apiRequest("POST", "/api/timesheet/login", credentials);
      return await response.json();
    },
    onSuccess: (data) => {
      setIsLoggedIn(true);
      setCurrentUser(data.user);
      toast({
        title: "Login Successful",
        description: `Welcome ${data.user.firstName}!`,
      });
    },
    onError: () => {
      toast({
        title: "Login Failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    },
  });

  // Fetch timesheets based on role
  const { data: timesheets = [], refetch } = useQuery({
    queryKey: ["/api/timesheets", currentUser?.role],
    enabled: isLoggedIn,
  });

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setLoginForm({ email: "", password: "" });
  };

  // Filter timesheets
  const filteredTimesheets = timesheets.filter((timesheet: any) => {
    const matchesSearch = 
      timesheet.id.toString().includes(searchTerm) ||
      (timesheet.contractorName && timesheet.contractorName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (timesheet.period && timesheet.period.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || timesheet.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Status badge styling
  const getStatusBadge = (status: string) => {
    const variants = {
      draft: { variant: "secondary" as const, color: "bg-gray-500" },
      submitted: { variant: "default" as const, color: "bg-blue-500" },
      approved: { variant: "default" as const, color: "bg-green-500" },
      rejected: { variant: "destructive" as const, color: "bg-red-500" }
    };
    return variants[status as keyof typeof variants] || variants.draft;
  };

  // Action handlers
  const handleDownload = async (timesheetId: number) => {
    try {
      const response = await fetch(`/api/timesheets/${timesheetId}/download`, {
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `timesheet-${timesheetId}.pdf`;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Success",
        description: "Timesheet downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Could not download timesheet",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (timesheetId: number) => {
    try {
      const response = await fetch(`/api/timesheets/${timesheetId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (response.ok) {
        toast({
          title: "Deleted",
          description: "Timesheet deleted successfully",
        });
        refetch();
        setShowDeleteDialog(false);
        setTimesheetToDelete(null);
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Could not delete timesheet",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (timesheet: any) => {
    try {
      // Fetch complete timesheet data including entries
      const response = await fetch(`/api/timesheets/${timesheet.id}`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const fullTimesheet = await response.json();
        setEditingTimesheet(fullTimesheet);
        setShowCreateForm(true);
      } else {
        toast({
          title: "Error",
          description: "Could not load timesheet data for editing",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load timesheet data",
        variant: "destructive",
      });
    }
  };

  const handleFormSave = async () => {
    setShowCreateForm(false);
    setEditingTimesheet(null);
    // Force immediate refresh
    await refetch();
    toast({
      title: "Saved",
      description: "Timesheet saved successfully",
    });
  };

  const handleFormSubmit = async () => {
    setShowCreateForm(false);
    setEditingTimesheet(null);
    // Force immediate refresh
    await refetch();
    toast({
      title: "Submitted",
      description: "Timesheet submitted for approval",
    });
  };

  const handleApprove = async (timesheetId: number) => {
    try {
      const response = await fetch(`/api/timesheets/${timesheetId}/approve`, {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        toast({
          title: "Approved",
          description: "Timesheet approved successfully",
        });
        // Force immediate refresh
        await refetch();
      } else {
        throw new Error('Approval failed');
      }
    } catch (error) {
      toast({
        title: "Approval Failed",
        description: "Could not approve timesheet",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (timesheetId: number, reason: string) => {
    try {
      const response = await fetch(`/api/timesheets/${timesheetId}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
        credentials: 'include'
      });
      
      if (response.ok) {
        toast({
          title: "Rejected",
          description: "Timesheet rejected successfully",
        });
        // Force immediate refresh
        await refetch();
        setRejectionReason("");
        setSelectedTimesheet(null);
      } else {
        throw new Error('Rejection failed');
      }
    } catch (error) {
      toast({
        title: "Rejection Failed",
        description: "Could not reject timesheet",
        variant: "destructive",
      });
    }
  };

  // Render action buttons based on role and status
  const renderActionButtons = (timesheet: any) => {
    const { status, id } = timesheet;
    const isContractor = currentUser?.role === 'contractor';
    const isSupervisor = currentUser?.role === 'supervisor';
    const isAdmin = currentUser?.role === 'admin';

    return (
      <div className="flex gap-2 flex-wrap">
        {/* Download button - available for all roles and statuses */}
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => handleDownload(id)}
          title="Download PDF"
        >
          <Download className="w-4 h-4 mr-1" />
          Download
        </Button>

        {/* Contractor-specific buttons */}
        {isContractor && (
          <>
            {(status === 'draft' || status === 'submitted') && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleEdit(timesheet)}
                title="Edit timesheet"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            )}
            {(status === 'draft' || status === 'submitted') && (
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => {
                  setTimesheetToDelete(timesheet);
                  setShowDeleteDialog(true);
                }}
                title="Delete timesheet"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            )}
            {status === 'rejected' && (
              <Button 
                size="sm" 
                variant="default"
                onClick={() => handleEdit(timesheet)}
                title="Resubmit timesheet"
              >
                <Upload className="w-4 h-4 mr-1" />
                Resubmit
              </Button>
            )}
          </>
        )}

        {/* Supervisor-specific buttons */}
        {isSupervisor && status === 'submitted' && (
          <>
            <Button 
              size="sm" 
              variant="default"
              onClick={() => handleApprove(id)}
              title="Approve timesheet"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Approve
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => setSelectedTimesheet(timesheet)}
                  title="Reject timesheet"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Reject
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reject Timesheet</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Label>Reason for rejection:</Label>
                  <Textarea 
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Please provide a reason for rejection..."
                  />
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleReject(id, rejectionReason)}
                      variant="destructive"
                    >
                      Confirm Rejection
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setRejectionReason("");
                        setSelectedTimesheet(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}

        {/* Admin-specific buttons */}
        {isAdmin && (
          <>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleEdit(timesheet)}
              title="Edit timesheet"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => {
                setTimesheetToDelete(timesheet);
                setShowDeleteDialog(true);
              }}
              title="Delete timesheet"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </>
        )}
      </div>
    );
  };

  // Login form
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="max-w-md mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <Clock className="w-8 h-8 text-blue-600" />
                  Timesheet Portal
                </CardTitle>
                <p className="text-gray-600">Login to access your dashboard</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter your password"
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => loginMutation.mutate(loginForm)}
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Logging in..." : "Login"}
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        <Footer />
        <BackToTop />
      </div>
    );
  }

  // Main dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {currentUser?.role === 'contractor' && 'Contractor Dashboard'}
                {currentUser?.role === 'supervisor' && 'Supervisor Dashboard'}
                {currentUser?.role === 'admin' && 'Admin Dashboard'}
              </h1>
              <p className="text-gray-600">Welcome, {currentUser?.firstName} {currentUser?.lastName}</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <User className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search by ID, contractor name, or period..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="submitted">Submitted</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  {currentUser?.role === 'contractor' && (
                    <Button onClick={() => {
                      setEditingTimesheet(null);
                      setShowCreateForm(true);
                    }}>
                      <Plus className="w-4 h-4 mr-2" />
                      New Timesheet
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timesheets Table */}
          <Card>
            <CardHeader>
              <CardTitle>
                {currentUser?.role === 'contractor' && 'My Timesheets'}
                {currentUser?.role === 'supervisor' && 'Timesheets Awaiting Review'}
                {currentUser?.role === 'admin' && 'All Timesheets'}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({filteredTimesheets.length})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredTimesheets.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No timesheets found</p>
                  {currentUser?.role === 'contractor' && (
                    <Button onClick={() => {
                      setEditingTimesheet(null);
                      setShowCreateForm(true);
                    }}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Timesheet
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTimesheets.map((timesheet: any) => (
                    <Card key={timesheet.id} className="border-l-4" style={{
                      borderLeftColor: 
                        timesheet.status === 'draft' ? '#6b7280' :
                        timesheet.status === 'submitted' ? '#3b82f6' :
                        timesheet.status === 'approved' ? '#10b981' : '#ef4444'
                    }}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-4">
                              <h3 className="font-semibold text-lg">
                                Timesheet #{timesheet.id}
                              </h3>
                              <Badge {...getStatusBadge(timesheet.status)}>
                                {timesheet.status.charAt(0).toUpperCase() + timesheet.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                              {currentUser?.role !== 'contractor' && (
                                <div>
                                  <strong>Contractor:</strong> {timesheet.contractorName || 'N/A'}
                                </div>
                              )}
                              <div>
                                <strong>Period:</strong> {timesheet.period || 'June 2025'}
                              </div>
                              <div>
                                <strong>Total:</strong> {timesheet.totalDays || timesheet.totalHours || 0} {timesheet.rateType === 'daily' ? 'days' : 'hours'}
                              </div>
                              {timesheet.department && (
                                <div>
                                  <strong>Department:</strong> {timesheet.department}
                                </div>
                              )}
                              {timesheet.supervisorName && (
                                <div>
                                  <strong>Supervisor:</strong> {timesheet.supervisorName}
                                </div>
                              )}
                              {timesheet.submittedAt && (
                                <div>
                                  <strong>Submitted:</strong> {new Date(timesheet.submittedAt).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                            {timesheet.rejectionReason && (
                              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                                <p className="text-red-800 text-sm">
                                  <strong>Rejection Reason:</strong> {timesheet.rejectionReason}
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            {renderActionButtons(timesheet)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Create/Edit Timesheet Dialog */}
      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingTimesheet ? 'Edit Timesheet' : 'Create New Timesheet'}
            </DialogTitle>
          </DialogHeader>
          <TimesheetForm 
            editingData={editingTimesheet}
            onSave={handleFormSave}
            onSubmit={handleFormSubmit}
          />
        </DialogContent>
      </Dialog>

      {/* Custom Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Timesheet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete this timesheet? This action cannot be undone.
            </p>
            {timesheetToDelete && (
              <div className="p-4 bg-gray-50 rounded border">
                <p className="font-medium">Timesheet #{timesheetToDelete.id}</p>
                <p className="text-sm text-gray-600">
                  Period: {timesheetToDelete.period || 'June 2025'}
                </p>
                <p className="text-sm text-gray-600">
                  Status: {timesheetToDelete.status}
                </p>
              </div>
            )}
            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline"
                onClick={() => {
                  setShowDeleteDialog(false);
                  setTimesheetToDelete(null);
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={() => timesheetToDelete && handleDelete(timesheetToDelete.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
      <BackToTop />
    </div>
  );
}