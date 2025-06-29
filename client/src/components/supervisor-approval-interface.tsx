import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, FileText, Clock, User } from 'lucide-react';
import { DigitalSignature } from './digital-signature';
import { toast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface SupervisorApprovalProps {
  timesheet: any;
  onApproval?: () => void;
  onRejection?: () => void;
}

export function SupervisorApprovalInterface({ timesheet, onApproval, onRejection }: SupervisorApprovalProps) {
  const [approvalMode, setApprovalMode] = useState<'pending' | 'approving' | 'rejecting'>('pending');
  const [supervisorSignature, setSupervisorSignature] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApprove = async () => {
    if (!supervisorSignature) {
      toast({
        title: "Signature Required",
        description: "Please provide your digital signature to approve this timesheet.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiRequest('POST', `/api/supervisor/approval/${timesheet.approvalToken}/approve`, {
        supervisorSignature,
        comments,
      });

      if (response.ok) {
        toast({
          title: "Timesheet Approved",
          description: "The timesheet has been successfully approved and the contractor has been notified.",
        });
        onApproval?.();
      } else {
        throw new Error('Approval failed');
      }
    } catch (error) {
      console.error('Approval error:', error);
      toast({
        title: "Approval Failed",
        description: "Failed to approve timesheet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Rejection Reason Required",
        description: "Please provide a reason for rejecting this timesheet.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiRequest('POST', `/api/supervisor/approval/${timesheet.approvalToken}/reject`, {
        rejectionReason,
        comments,
      });

      if (response.ok) {
        toast({
          title: "Timesheet Rejected",
          description: "The timesheet has been rejected and the contractor has been notified.",
        });
        onRejection?.();
      } else {
        throw new Error('Rejection failed');
      }
    } catch (error) {
      console.error('Rejection error:', error);
      toast({
        title: "Rejection Failed",
        description: "Failed to reject timesheet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (timesheet.status !== 'submitted') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Timesheet Already Processed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <Badge variant={timesheet.status === 'approved' ? 'default' : 'destructive'} className="text-lg px-4 py-2">
              {timesheet.status.charAt(0).toUpperCase() + timesheet.status.slice(1)}
            </Badge>
            <p className="text-gray-600">
              This timesheet has already been {timesheet.status}.
            </p>
            {timesheet.status === 'approved' && timesheet.approvedAt && (
              <p className="text-sm text-gray-500">
                Approved on {new Date(timesheet.approvedAt).toLocaleDateString()}
              </p>
            )}
            {timesheet.status === 'rejected' && timesheet.rejectedAt && (
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  Rejected on {new Date(timesheet.rejectedAt).toLocaleDateString()}
                </p>
                {timesheet.rejectionReason && (
                  <div className="bg-red-50 border border-red-200 rounded p-3">
                    <p className="text-sm text-red-800">
                      <strong>Rejection Reason:</strong> {timesheet.rejectionReason}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-yellow-600" />
            Timesheet Approval Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Contractor</p>
                <p className="text-sm text-gray-600">
                  {timesheet.firstName} {timesheet.lastName}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Period</p>
              <p className="text-sm text-gray-600">June 2025</p>
            </div>
            <div>
              <p className="text-sm font-medium">Total</p>
              <p className="text-sm text-gray-600">
                {timesheet.rateType === 'daily' 
                  ? `${timesheet.totalDays || 0} days` 
                  : `${timesheet.totalHours || 0} hours`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timesheet Details */}
      <Card>
        <CardHeader>
          <CardTitle>Work Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Department</Label>
                <p className="text-sm text-gray-600">{timesheet.department || 'N/A'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Job Title</Label>
                <p className="text-sm text-gray-600">{timesheet.jobTitle || 'N/A'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Location</Label>
                <p className="text-sm text-gray-600">{timesheet.location || 'N/A'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Submitted</Label>
                <p className="text-sm text-gray-600">
                  {timesheet.submittedAt ? new Date(timesheet.submittedAt).toLocaleString() : 'N/A'}
                </p>
              </div>
            </div>

            {timesheet.workDescription && (
              <div>
                <Label className="text-sm font-medium">Work Description</Label>
                <p className="text-sm text-gray-600 mt-1">{timesheet.workDescription}</p>
              </div>
            )}

            {/* Work Entries Table */}
            {timesheet.entries && timesheet.entries.length > 0 && (
              <div>
                <Label className="text-sm font-medium">Work Entries</Label>
                <div className="mt-2 border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left">Date</th>
                        <th className="px-3 py-2 text-left">Start</th>
                        <th className="px-3 py-2 text-left">End</th>
                        <th className="px-3 py-2 text-left">Hours</th>
                        <th className="px-3 py-2 text-left">Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timesheet.entries.map((entry: any, index: number) => (
                        <tr key={index} className="border-t">
                          <td className="px-3 py-2">{entry.date}</td>
                          <td className="px-3 py-2">{entry.startTime}</td>
                          <td className="px-3 py-2">{entry.endTime}</td>
                          <td className="px-3 py-2">{entry.hoursWorked}</td>
                          <td className="px-3 py-2">{entry.location || timesheet.location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Contractor Signature */}
            {timesheet.contractorSignature && (
              <div>
                <Label className="text-sm font-medium">Contractor Signature</Label>
                <div className="mt-2 border rounded p-3 bg-gray-50">
                  <img 
                    src={timesheet.contractorSignature} 
                    alt="Contractor Signature" 
                    className="max-h-16 border"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Approval Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Supervisor Action Required</CardTitle>
        </CardHeader>
        <CardContent>
          {approvalMode === 'pending' && (
            <div className="flex gap-4">
              <Button 
                onClick={() => setApprovalMode('approving')}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Timesheet
              </Button>
              <Button 
                onClick={() => setApprovalMode('rejecting')}
                variant="destructive"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject Timesheet
              </Button>
            </div>
          )}

          {approvalMode === 'approving' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="supervisor-signature">Digital Signature *</Label>
                <DigitalSignature
                  onSignatureChange={setSupervisorSignature}
                  width={400}
                  height={150}
                />
              </div>
              <div>
                <Label htmlFor="approval-comments">Comments (Optional)</Label>
                <Textarea
                  id="approval-comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Add any comments or notes about this approval..."
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleApprove}
                  disabled={isSubmitting || !supervisorSignature}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? 'Approving...' : 'Confirm Approval'}
                </Button>
                <Button 
                  onClick={() => setApprovalMode('pending')}
                  variant="outline"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {approvalMode === 'rejecting' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="rejection-reason">Rejection Reason *</Label>
                <Textarea
                  id="rejection-reason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Explain why this timesheet is being rejected..."
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="rejection-comments">Additional Comments (Optional)</Label>
                <Textarea
                  id="rejection-comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Add any additional feedback or instructions..."
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleReject}
                  disabled={isSubmitting || !rejectionReason.trim()}
                  variant="destructive"
                >
                  {isSubmitting ? 'Rejecting...' : 'Confirm Rejection'}
                </Button>
                <Button 
                  onClick={() => setApprovalMode('pending')}
                  variant="outline"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}