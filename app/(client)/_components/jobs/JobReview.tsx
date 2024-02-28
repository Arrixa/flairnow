'use client'
import { useState, useEffect } from "react";
import JobReviewCard from "./JobCard";
import JobPostForm from "./jobsForm.tsx/JobPostForm";
import { JobForm } from "@/lib/interfaces";

const JobReview = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<JobForm>({} as JobForm);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API endpoint
        const response = await fetch('/api/recruitment/job-posting');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Set form data with fetched values
        setFormData(data)
        console.log(data, 'Set form data with fetched values');
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };
    // Call fetchData when the component mounts
    fetchData();
  }, [setFormData]);

  // 
  return (
    <section className="flex flex-col w-full">
      {/* {isEditMode ? (
      <div className='flex flex-col mx-auto w-full'>
        <JobPostForm setFormData={setFormData} formData={formData} setIsEditMode={setIsEditMode} />
      </div>
      ) : (  */}
      <div className='w-full'>
        <div className="flex flex-row mx-auto w-full">
          <JobReviewCard formData={formData} setIsEditMode={setIsEditMode} />
        </div>
      </div>
      {/* )} */}
    </section>
  )
}


export default JobReview

/*
          const mappedData = {
            id: res.id,
            title: res.title,
            description: res.description,   
            department: res.department,
            location: res.location,
            salary: res.salary,
            qualifications: res.qualifications,
            skills: selectedSkills,
            employmentType: res.employmentType,
            workPlace: res.workPlace,
            };
          form.reset(mappedData)
          window.location.reload();
          */