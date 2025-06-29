import React, { useState, useEffect } from 'react';
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import DigitalSignature from "@/components/digital-signature";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Download, 
  Mail, 
  User, 
  Calendar,
  MapPin,
  FileText
} from "lucide-react";
import { generateTimesheetPDF } from "@/utils/pdf-generator";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface TimesheetForApproval {
  id: number;
  contractorName: string;
  contractorEmail: string;
  companyName: string;
  periodType: string;
  rateType: string;
  weekStarting: string;
  totalHours: number;
  totalDays: number;
  workDescription: string;
  workLocation: string;
  contractorSignature: string;
  contractorSignedAt: string;
  status: string;
  submittedAt: string;
  entries: Array<{
    date: string;
    hoursWorked: number;
  }>;
}

export default function SupervisorApproval() {
  useScrollToTop();
  const { toast } = useToast();
  const [selectedTimesheet, setSelectedTimesheet] = useState<TimesheetForApproval | null>(null);
  const [supervisorSignature, setSupervisorSignature] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Get supervisor user info (would come from auth context)
  const supervisorInfo = {
    name: "Sarah Johnson",
    email: "supervisor@company.com",
    role: "Project Manager"
  };

  // Fetch pending timesheets
  const { data: pendingTimesheets, isLoading } = useQuery({
    queryKey: ['/api/timesheets/pending-approval'],
    retry: false,
  });

  // Approve timesheet mutation
  const approveMutation = useMutation({
    mutationFn: async (data: { timesheetId: number; signature: string }) => {
      const response = await apiRequest("POST", `/api/timesheets/${data.timesheetId}/approve`, {
        supervisorSignature: data.signature,
        approvedBy: supervisorInfo.name
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Timesheet Approved",
        description: "The timesheet has been approved and notifications sent.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/timesheets/pending-approval'] });
      setSelectedTimesheet(null);
      setSupervisorSignature(null);
    },
    onError: (error: any) => {
      toast({
        title: "Approval Failed",
        description: error.message || "Failed to approve timesheet",
        variant: "destructive",
      });
    },
  });

  // Reject timesheet mutation
  const rejectMutation = useMutation({
    mutationFn: async (data: { timesheetId: number; reason: string }) => {
      const response = await apiRequest("POST", `/api/timesheets/${data.timesheetId}/reject`, {
        rejectionReason: data.reason,
        rejectedBy: supervisorInfo.name
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Timesheet Rejected",
        description: "The timesheet has been rejected and the contractor notified.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/timesheets/pending-approval'] });
      setSelectedTimesheet(null);
      setRejectionReason('');
    },
    onError: (error: any) => {
      toast({
        title: "Rejection Failed",
        description: error.message || "Failed to reject timesheet",
        variant: "destructive",
      });
    },
  });

  const handleApprove = () => {
    if (!selectedTimesheet || !supervisorSignature) {
      toast({
        title: "Signature Required",
        description: "Please sign the timesheet before approving.",
        variant: "destructive",
      });
      return;
    }

    approveMutation.mutate({
      timesheetId: selectedTimesheet.id,
      signature: supervisorSignature
    });
  };

  const handleReject = () => {
    if (!selectedTimesheet || !rejectionReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      });
      return;
    }

    rejectMutation.mutate({
      timesheetId: selectedTimesheet.id,
      reason: rejectionReason
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pending Review</Badge>;
      case 'approved':
        return <Badge variant="outline" className="text-green-600 border-green-600">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-600">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Timesheet Approval Portal</h1>
              <p className="text-gray-600">Review and approve contractor timesheets</p>
            </div>

            {!selectedTimesheet ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Pending Timesheets ({pendingTimesheets?.length || 0})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="text-gray-500 mt-2">Loading timesheets...</p>
                    </div>
                  ) : pendingTimesheets?.length > 0 ? (
                    <div className="space-y-4">
                      {pendingTimesheets.map((timesheet: TimesheetForApproval) => (
                        <Card key={timesheet.id} className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                  <h3 className="font-medium text-lg">{timesheet.contractorName}</h3>
                                  {getStatusBadge(timesheet.status)}
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                  <div className="flex items-center gap-1">
                                    <User className="h-4 w-4" />
                                    {timesheet.companyName}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {timesheet.periodType} - {new Date(timesheet.weekStarting).toLocaleDateString()}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {timesheet.totalHours}h / {timesheet.totalDays}d
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {timesheet.workLocation}
                                  </div>
                                </div>
                              </div>
                              <Button 
                                onClick={() => setSelectedTimesheet(timesheet)}
                                className="ml-4"
                              >
                                Review
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                      <p className="text-gray-500">No pending timesheets to review.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <Button variant="outline" onClick={() => setSelectedTimesheet(null)}>
                    ← Back to List
                  </Button>
                  <h2 className="text-2xl font-bold">Review Timesheet - {selectedTimesheet.contractorName}</h2>
                </div>

                <Tabs defaultValue="review" className="space-y-6">
                  <TabsList>
                    <TabsTrigger value="review">Review Details</TabsTrigger>
                    <TabsTrigger value="signature">Approve/Reject</TabsTrigger>
                  </TabsList>

                  <TabsContent value="review" className="space-y-6">
                    {/* Contractor Info */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Contractor Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">Name</label>
                            <p className="font-medium">{selectedTimesheet.contractorName}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Email</label>
                            <p className="font-medium">{selectedTimesheet.contractorEmail}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Company</label>
                            <p className="font-medium">{selectedTimesheet.companyName}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Timesheet Summary */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Timesheet Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{selectedTimesheet.totalDays}</div>
                            <div className="text-sm text-gray-600">Days Worked</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{selectedTimesheet.totalHours}</div>
                            <div className="text-sm text-gray-600">Total Hours</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{selectedTimesheet.periodType}</div>
                            <div className="text-sm text-gray-600">Period Type</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{selectedTimesheet.rateType}</div>
                            <div className="text-sm text-gray-600">Rate Type</div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">Work Location</label>
                            <p className="font-medium">{selectedTimesheet.workLocation}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Work Description</label>
                            <p className="font-medium">{selectedTimesheet.workDescription}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Daily Breakdown */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Daily Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {selectedTimesheet.entries.map((entry, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                              <span className="font-medium">{new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                              <span className="text-blue-600 font-medium">{entry.hoursWorked} hours</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Contractor Signature */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Contractor Signature</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <img src={selectedTimesheet.contractorSignature} alt="Contractor Signature" className="max-w-sm border rounded" />
                          <p className="text-sm text-gray-600 mt-2">
                            Signed on {new Date(selectedTimesheet.contractorSignedAt).toLocaleString()}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="signature" className="space-y-6">
                    <DigitalSignature
                      onSignatureChange={setSupervisorSignature}
                      existingSignature={supervisorSignature}
                      signerName={supervisorInfo.name}
                      title="Supervisor Approval Signature"
                    />

                    <Card>
                      <CardHeader>
                        <CardTitle>Approval Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex gap-4">
                          <Button 
                            onClick={handleApprove}
                            disabled={!supervisorSignature || approveMutation.isPending}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve Timesheet
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              if (selectedTimesheet) {
                                const pdfData = {
                                  contractorName: selectedTimesheet.contractorName,
                                  companyName: selectedTimesheet.companyName,
                                  periodType: selectedTimesheet.periodType,
                                  periodText: `${selectedTimesheet.periodType} - ${new Date(selectedTimesheet.weekStarting).toLocaleDateString()}`,
                                  rateType: selectedTimesheet.rateType,
                                  totalDays: selectedTimesheet.totalDays,
                                  totalHours: selectedTimesheet.totalHours,
                                  workLocation: selectedTimesheet.workLocation,
                                  workDescription: selectedTimesheet.workDescription,
                                  supervisorName: supervisorInfo.name,
                                  supervisorEmail: supervisorInfo.email,
                                  workDays: selectedTimesheet.entries.map(entry => ({
                                    date: entry.date,
                                    dayName: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }),
                                    hours: entry.hoursWorked,
                                    isWorked: true
                                  })),
                                  contractorSignature: selectedTimesheet.contractorSignature,
                                  supervisorSignature: supervisorSignature
                                };
                                generateTimesheetPDF(pdfData);
                              }
                            }}
                            className="flex items-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            Download PDF
                          </Button>
                        </div>

                        <div className="border-t pt-4">
                          <h4 className="font-medium mb-2">Reject Timesheet</h4>
                          <textarea
                            className="w-full p-3 border rounded-lg resize-none"
                            rows={3}
                            placeholder="Please provide a reason for rejection..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                          />
                          <Button 
                            variant="destructive"
                            onClick={handleReject}
                            disabled={!rejectionReason.trim() || rejectMutation.isPending}
                            className="mt-2"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject Timesheet
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}