import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Edit, Trash2, Download, FileText } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function TimesheetList({ onEdit }: { onEdit: (timesheet: any) => void }) {
  const { data: timesheets, isLoading } = useQuery({
    queryKey: ["/api/timesheets"],
  });
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: async (timesheetId: number) => {
      const response = await apiRequest("DELETE", `/api/timesheets/${timesheetId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/timesheets"] });
      toast({
        title: "Success",
        description: "Timesheet deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete timesheet",
        variant: "destructive",
      });
    },
  });

  const handleDownload = (timesheet: any) => {
    try {
      // Create clean, formatted content
      const content = `DAWAAM - MANPOWER SERVICES
TIMESHEET REPORT
==================================

EMPLOYEE INFORMATION:
Name: ${timesheet.firstName || 'N/A'} ${timesheet.lastName || 'N/A'}
Company: ${timesheet.companyName || 'Mela Ltd'}
Department: ${timesheet.department || 'N/A'}
Job Title: ${timesheet.jobTitle || 'N/A'}
Period: June 2025
Status: ${timesheet.status || 'draft'}

WORK SUMMARY:
Total ${timesheet.rateType === 'daily' ? 'Days' : 'Hours'}: ${timesheet.rateType === 'daily' ? (timesheet.totalDays || 0) : (timesheet.totalHours || 0)}
Rate Type: ${timesheet.rateType || 'hourly'}
Period Type: ${timesheet.periodType || 'weekly'}

WORK ENTRIES:
${(timesheet.entries || []).map((entry: any, index: number) => 
  `${index + 1}. Date: ${entry.date || 'N/A'}
   Time: ${entry.startTime || 'N/A'} - ${entry.endTime || 'N/A'}
   Hours Worked: ${entry.hoursWorked || 0}
   Location: ${entry.location || 'N/A'}
   Description: ${entry.workDescription || timesheet.workDescription || 'No description'}
`).join('\n')}

AUTHORIZATION:
Supervisor: ${timesheet.supervisorName || 'N/A'}
Supervisor Email: ${timesheet.supervisorEmail || 'N/A'}
Submitted: ${timesheet.submittedAt ? new Date(timesheet.submittedAt).toLocaleString() : 'Not submitted'}
${timesheet.approvedAt ? `Approved: ${new Date(timesheet.approvedAt).toLocaleString()}` : ''}
${timesheet.rejectionReason ? `Rejection Reason: ${timesheet.rejectionReason}` : ''}

Generated: ${new Date().toLocaleString()}
Document ID: ${timesheet.id}

==================================
End of Timesheet Report`;

      // Create and download file
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Timesheet_${timesheet.firstName || 'Employee'}_${timesheet.lastName || ''}_June2025_ID${timesheet.id}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Download Complete",
        description: "Timesheet file downloaded successfully",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "Unable to download timesheet file",
        variant: "destructive",
      });
    }
  };

  const handleView = (timesheet: any) => {
    try {
      // Create formatted HTML for viewing
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Timesheet - ${timesheet.firstName} ${timesheet.lastName}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.5; }
        .header { text-align: center; border-bottom: 3px solid #2c5282; padding-bottom: 20px; margin-bottom: 30px; }
        .company { font-size: 24px; font-weight: bold; color: #2c5282; margin-bottom: 10px; }
        .title { font-size: 20px; color: #2c5282; }
        .section { margin: 20px 0; }
        .label { font-weight: bold; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f8f9fa; font-weight: bold; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
        @media print { body { margin: 10px; } }
    </style>
</head>
<body>
    <div class="header">
        <div class="company">DAWAAM - MANPOWER SERVICES</div>
        <div class="title">TIMESHEET REPORT</div>
        <p>June 2025</p>
    </div>
    
    <div class="section">
        <h3>Employee Information</h3>
        <p><span class="label">Name:</span> ${timesheet.firstName || 'N/A'} ${timesheet.lastName || 'N/A'}</p>
        <p><span class="label">Company:</span> ${timesheet.companyName || 'Mela Ltd'}</p>
        <p><span class="label">Department:</span> ${timesheet.department || 'N/A'}</p>
        <p><span class="label">Job Title:</span> ${timesheet.jobTitle || 'N/A'}</p>
        <p><span class="label">Status:</span> ${timesheet.status || 'draft'}</p>
    </div>
    
    <div class="section">
        <h3>Work Summary</h3>
        <p><span class="label">Total:</span> ${timesheet.rateType === 'daily' ? (timesheet.totalDays || 0) + ' days' : (timesheet.totalHours || 0) + ' hours'}</p>
        <p><span class="label">Rate Type:</span> ${timesheet.rateType || 'hourly'}</p>
        <p><span class="label">Period Type:</span> ${timesheet.periodType || 'weekly'}</p>
    </div>
    
    <div class="section">
        <h3>Work Entries</h3>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Hours</th>
                    <th>Location</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                ${(timesheet.entries || []).map((entry: any) => `
                <tr>
                    <td>${entry.date || 'N/A'}</td>
                    <td>${entry.startTime || 'N/A'}</td>
                    <td>${entry.endTime || 'N/A'}</td>
                    <td>${entry.hoursWorked || 0}</td>
                    <td>${entry.location || 'N/A'}</td>
                    <td>${entry.workDescription || timesheet.workDescription || 'No description'}</td>
                </tr>
                `).join('')}
            </tbody>
        </table>
    </div>
    
    <div class="section">
        <h3>Authorization</h3>
        <p><span class="label">Supervisor:</span> ${timesheet.supervisorName || 'N/A'}</p>
        <p><span class="label">Supervisor Email:</span> ${timesheet.supervisorEmail || 'N/A'}</p>
        <p><span class="label">Submitted:</span> ${timesheet.submittedAt ? new Date(timesheet.submittedAt).toLocaleString() : 'Not submitted'}</p>
        ${timesheet.approvedAt ? `<p><span class="label">Approved:</span> ${new Date(timesheet.approvedAt).toLocaleString()}</p>` : ''}
        ${timesheet.rejectionReason ? `<p><span class="label">Rejection Reason:</span> ${timesheet.rejectionReason}</p>` : ''}
    </div>
    
    <div class="footer">
        <p>Generated: ${new Date().toLocaleString()}</p>
        <p>Document ID: ${timesheet.id}</p>
        <p>DAWAAM - Manpower Services | Professional HR Solutions</p>
    </div>
</body>
</html>`;

      // Open in new window
      const newWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
      if (newWindow) {
        newWindow.document.write(html);
        newWindow.document.close();
        newWindow.focus();
      } else {
        toast({
          title: "Popup Blocked",
          description: "Please allow popups to view the timesheet",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('View error:', error);
      toast({
        title: "View Failed",
        description: "Unable to open timesheet view",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading timesheets...</p>
        </CardContent>
      </Card>
    );
  }

  if (!timesheets || timesheets.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>No timesheets found. Create your first timesheet to get started.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Timesheets ({timesheets.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timesheets.map((timesheet: any) => {
            const periodLabel = timesheet.periodType === 'monthly' ? 'Month of' : 'Week of';
            const totalLabel = timesheet.rateType === 'daily' ? 'Total Days' : 'Total Hours';
            const totalValue = timesheet.rateType === 'daily' ? timesheet.totalDays : timesheet.totalHours;
            const isEditable = timesheet.status === 'draft' || timesheet.status === 'rejected';
            const isDeletable = timesheet.status === 'draft' || timesheet.status === 'rejected';
            
            const statusDisplay = {
              'draft': 'Draft',
              'submitted': 'Submitted',
              'approved': 'Approved',
              'rejected': 'Rejected'
            }[timesheet.status] || timesheet.status;

            return (
              <Card key={timesheet.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {periodLabel} June 2025
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        ID: {timesheet.id} | {timesheet.department} | {timesheet.jobTitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        timesheet.status === 'approved' ? 'default' : 
                        timesheet.status === 'rejected' ? 'destructive' : 
                        'secondary'
                      }>
                        {statusDisplay}
                      </Badge>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleView(timesheet)}
                          title="View timesheet"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(timesheet)}
                          title="Download timesheet file"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        {isEditable && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onEdit(timesheet)}
                            title="Edit timesheet"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {isDeletable && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this timesheet? This action cannot be undone.')) {
                                deleteMutation.mutate(timesheet.id);
                              }
                            }}
                            disabled={deleteMutation.isPending}
                            title="Delete timesheet"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm"><strong>{totalLabel}:</strong> {totalValue || 0}</p>
                      <p className="text-sm"><strong>Rate Type:</strong> {timesheet.rateType || 'hourly'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm"><strong>Supervisor:</strong> {timesheet.supervisorName || 'N/A'}</p>
                      <p className="text-sm"><strong>Submitted:</strong> {timesheet.submittedAt ? format(new Date(timesheet.submittedAt), 'MMM d, yyyy') : 'Not submitted'}</p>
                    </div>
                    <div className="space-y-1">
                      {timesheet.approvedAt && (
                        <p className="text-sm text-green-600"><strong>Approved:</strong> {format(new Date(timesheet.approvedAt), 'MMM d, yyyy')}</p>
                      )}
                      {timesheet.rejectedAt && (
                        <p className="text-sm text-red-600"><strong>Rejected:</strong> {format(new Date(timesheet.rejectedAt), 'MMM d, yyyy')}</p>
                      )}
                    </div>
                  </div>
                  {timesheet.rejectionReason && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                      <p className="text-red-800 text-sm"><strong>Rejection Reason:</strong> {timesheet.rejectionReason}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}