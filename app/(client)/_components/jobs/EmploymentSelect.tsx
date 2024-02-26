'use client'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"


const EmploymentSelect = ({ onChange, value }: { onChange: (value: string) => void; value: string }) => {
  const [selectedEmployment, setSelectedEmployment] = useState(value);

  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select work place" />
      </SelectTrigger>
      <SelectContent onChange={() => setSelectedEmployment(value)}>
        <SelectItem value="fulltime">Full-time</SelectItem>
        <SelectItem value="parttime">Part-time</SelectItem>
        <SelectItem value="contract">Contract</SelectItem>
        <SelectItem value="fixedterm">Fixed-term</SelectItem>
        <SelectItem value="hourly">Hourly-based</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default EmploymentSelect

