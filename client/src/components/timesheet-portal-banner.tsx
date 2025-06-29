import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Users, FileText } from 'lucide-react';

export function TimesheetPortalBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Clock className="h-8 w-8 text-orange-300" />
            <div>
              <h3 className="text-lg font-semibold">Employee Timesheet Portal</h3>
              <p className="text-blue-100 text-sm">Submit, track, and manage your timesheets online</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-blue-100">
              <Users className="h-4 w-4" />
              <span>Contractors • Supervisors • Admins</span>
            </div>
            <Button 
              variant="secondary" 
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => window.location.href = '/timesheets'}
            >
              <FileText className="h-4 w-4 mr-2" />
              Access Portal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}