import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, FileText, Clock, CheckCircle, XCircle, Plus } from 'lucide-react';
import { TimesheetForm } from '@/components/timesheet-form';
import { TimesheetList } from '@/components/timesheet-list';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'contractor' | 'supervisor' | 'admin';
  companyName?: string;
  department?: string;
}

export function TimesheetDashboard() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showTimesheetForm, setShowTimesheetForm] = useState(false);
  const [editingTimesheet, setEditingTimesheet] = useState<any>(null);

  // Get current user session
  const { data: userSession } = useQuery({
    queryKey: ['/api/timesheet/session'],
    retry: false,
  });

  // Get timesheet stats for dashboard
  const { data: dashboardStats } = useQuery({
    queryKey: ['/api/timesheets/stats'],
    enabled: !!currentUser,
  });

  // Get timesheets based on user role
  const { data: timesheets } = useQuery({
    queryKey: ['/api/timesheets', currentUser?.role],
    enabled: !!currentUser,
  });

  useEffect(() => {
    if (userSession?.user) {
      setCurrentUser(userSession.user);
    }
  }, [userSession]);

  const handleCreateTimesheet = () => {
    setEditingTimesheet(null);
    setShowTimesheetForm(true);
  };

  const handleEditTimesheet = (timesheet: any) => {
    setEditingTimesheet(timesheet);
    setShowTimesheetForm(true);
  };

  const handleCloseForm = () => {
    setShowTimesheetForm(false);
    setEditingTimesheet(null);
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-96">
          <CardContent className="p-6">
            <p className="text-center">Loading dashboard...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderContractorDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Timesheets</p>
                <p className="text-2xl font-bold">{dashboardStats?.total || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{dashboardStats?.pending || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold">{dashboardStats?.approved || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold">{dashboardStats?.rejected || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Timesheets</h2>
        <Button onClick={handleCreateTimesheet} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Timesheet
        </Button>
      </div>

      {/* Timesheet List */}
      <TimesheetList onEdit={handleEditTimesheet} />
    </div>
  );

  const renderSupervisorDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold">{dashboardStats?.pendingReview || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Approved Today</p>
                <p className="text-2xl font-bold">{dashboardStats?.approvedToday || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Active Contractors</p>
                <p className="text-2xl font-bold">{dashboardStats?.activeContractors || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="all">All Timesheets</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <TimesheetList onEdit={handleEditTimesheet} filter="pending" />
        </TabsContent>
        <TabsContent value="approved">
          <TimesheetList onEdit={handleEditTimesheet} filter="approved" />
        </TabsContent>
        <TabsContent value="all">
          <TimesheetList onEdit={handleEditTimesheet} />
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Timesheets</p>
                <p className="text-2xl font-bold">{dashboardStats?.totalAll || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold">{dashboardStats?.activeUsers || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Pending System-wide</p>
                <p className="text-2xl font-bold">{dashboardStats?.pendingAll || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold">{dashboardStats?.thisWeek || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Timesheets</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <TimesheetList onEdit={handleEditTimesheet} showAll={true} />
        </TabsContent>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>User management interface coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>System Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Reporting dashboard coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Timesheet Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Welcome, {currentUser.firstName} {currentUser.lastName}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="capitalize">
                {currentUser.role}
              </Badge>
              <Button variant="outline" onClick={() => window.location.href = '/api/timesheet/logout'}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showTimesheetForm ? (
          <TimesheetForm 
            editingTimesheet={editingTimesheet}
            onClose={handleCloseForm}
          />
        ) : (
          <>
            {currentUser.role === 'contractor' && renderContractorDashboard()}
            {currentUser.role === 'supervisor' && renderSupervisorDashboard()}
            {currentUser.role === 'admin' && renderAdminDashboard()}
          </>
        )}
      </div>
    </div>
  );
}