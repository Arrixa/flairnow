'use client'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"


const WorkplaceSelect = ({ onChange, value }: { onChange: (value: string) => void; value: string }) => {
  const [selectedWorkplace, setSelectedWorkplace] = useState(value);

  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select work place" />
      </SelectTrigger>
      <SelectContent onChange={() => setSelectedWorkplace(value)}>
        <SelectItem value="office">In office</SelectItem>
        <SelectItem value="hybrid">Hybrid</SelectItem>
        <SelectItem value="remote">Remote</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default WorkplaceSelect

