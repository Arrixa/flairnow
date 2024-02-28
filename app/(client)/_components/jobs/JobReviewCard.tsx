import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Label } from '@/app/components/ui/label'
import { JobForm } from '@/lib/interfaces'
import React from 'react'

const JobReviewCard = ({ formData, setIsEditMode } : { formData?: JobForm, setIsEditMode: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const jobs = formData
  return (
    <section className="flex flex-col w-full">
    <Card>
      <CardHeader>
        <CardTitle>Review job post</CardTitle>
        {/* Add icons */}
        <CardDescription>{jobs?.title}</CardDescription>
        <CardDescription>{jobs?.company?.companyName}</CardDescription>
        <CardDescription>{jobs?.location}</CardDescription>
      </CardHeader>
    </Card>
    <Card className='py-2 mt-2'>
      <CardContent>
        <Label>Job title:</Label>
        <p>{jobs?.title}</p>
      </CardContent>
      <CardContent>
        <Label>Company name:</Label>
        <p>{jobs?.company?.companyName}</p>
      </CardContent>
      <CardContent>
        <Label>Company department:</Label>
        <p>{jobs?.department}</p>
      </CardContent>
      <CardContent>
        <Label>Job description:</Label>
        <p>{jobs?.description}</p>
      </CardContent>
      <CardContent>
        <Label>Employment type:</Label>
        <p>{jobs?.employmentType}</p>
      </CardContent>
      <CardContent>
        <Label>Work place:</Label>
        <p>{jobs?.workPlace}</p>
      </CardContent>
      <CardContent>
        <Label>Required qualifications:</Label>
        <p>{jobs?.qualifications}</p>
      </CardContent>
      <CardContent>
        <Label>Required skills:</Label>
        {/* Skill badges */}
      </CardContent>
      <CardContent>
        <Label>Salary range:</Label>
        <p>{jobs?.salary}</p>
      </CardContent>
    </Card>
  </section>
  )
}

export default JobReviewCard
