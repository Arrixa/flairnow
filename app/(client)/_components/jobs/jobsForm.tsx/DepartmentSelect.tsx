import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
    
  interface DepartmentSelectProps {
    selectedDepartment: string;
    onChange: (department: string) => void;
  }

  const DepartmentSelect: React.FC<DepartmentSelectProps> = ({ selectedDepartment, onChange }) => {
  const departments = [
    'Information Technology',
    'Human Resources',
    'Finance and Accounting',
    'Marketing',
    'Sales',
    'Operations/Supply Chain',
    'Customer Service',
    'Research and Development',
    'Legal and Compliance',
    'Public Relations',
    'Administration',
    'Health and Safety',
    'Quality Assurance',
    'Engineering',
    'Management',
    'Environmental, Health and Safety',
  ];

  return (
    <Select onValueChange={(value) => onChange(value as string)} defaultValue={selectedDepartment}>
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Select department" />
    </SelectTrigger>
    <SelectContent>
      {departments.map((department) => (
        <SelectItem key={department} value={department.toLowerCase().replace(/\s+/g, '')}>
          {department}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
  );
};

export default DepartmentSelect;
