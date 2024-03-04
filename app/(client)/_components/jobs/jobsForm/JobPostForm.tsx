'use client'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from "@/app/components/ui/use-toast"
import { useState } from "react";
import { Label } from '@/app/components/ui/label';
import { Card, CardTitle } from '@/app/components/ui/card';
import Tiptap from './Tiptap';
import SkillSelect from './SkillSelect';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"

import { JobForm } from '@/lib/interfaces';
import DepartmentSelect from './DepartmentSelect';
import CancelDialog from './CancelDialog';
import { DateSelect } from './DateSelect';

const FormSchemaDraft = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  location: z.string().optional(),
  department: z.string().optional(),
  salary: z.string().optional(),
  skills: z.array(z.string()).optional(),
  employmentType: z.string().optional(),
  workPlace: z.string().optional(),
  positionsNumber: z.string().optional(),
  experience: z.string().optional(),
  jobLevel: z.string().optional(),
  id: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  closingDate: z.string().optional(),
  dueDate: z.string().optional(),
});

// const FormSchema = z.object({
//   title: z.string().min(1, 'Title is required'),
//   description: z.string().min(10, 'Description is required'),
//   location: z.string().min(1, 'Location is required'),
//   department: z.string().min(1, 'Department is required'),
//   salary: z.string().optional(),
//   qualifications: z.string().optional(),
//   skills: z.array(z.string()).optional(),
//   employmentType: z.string().optional(),
//   workPlace: z.string().optional(),
//   id: z.string().optional(),
// })

const JobPostForm = () => {
  const { toast } = useToast()
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [closingDate, setClosingDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const form = useForm({
    resolver: zodResolver(FormSchemaDraft),
    mode: 'all', // 'onChange' | 'onBlur' | 'onSubmit' | 'onChange' | 'onTouched' | 'all'
    defaultValues: {
      title: '',
      description: '',
      department: '',
      location: '',
      salary: '',
      skills: [''],
      employmentType: '',
      workPlace: '',
      positionsNumber: '',
      experience: '',
      jobLevel: '',
      id: '',
      startDate: '',
      endDate: '',
      closingDate: '',
      dueDate: '', 
    },
  });

    const onCancelAndSaveDraft = async () => {
      await onSubmit(form.getValues()); // Submit the form data
    };

  const onSubmit = async (data: z.infer<typeof FormSchemaDraft>) => {
    console.log('Form submitted:', data);
    console.log("Save client function called");
    console.log("Selected :", selectedSkills);

    try {
      const response = await fetch('/api/recruitment/job-posting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,   
          department: selectedDepartment,
          location: data.location,
          salary: data.salary,
          positionsNumber: data.positionsNumber,
          skills: selectedSkills,
          employmentType: data.employmentType,
          workPlace: data.workPlace,
          experience: data.experience,
          jobLevel: data.jobLevel,
          startDate: startDate,
          endDate: endDate,
          closingDate: closingDate,
          dueDate: dueDate,
        })
      })
        if (response.ok) {
          toast({
            description: "The client information saved successfully.",
          })
          const res = await response.json();
          // setFormData(res);
          console.log(res, 'response data from form save');
        } else {
          toast({
            variant: "destructive",
            title: "The client information save failed.",
            description: "Please try again.",
          })
          console.error("Save failed");
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "The client information save failed.",
          description: "Please try again.",
        })
        console.error("Save failed:", error);
      }
  };
  return (
    <Form {...form}>
      <form  onSubmit={form.handleSubmit(onSubmit)} className='p-2'>
        <h2 className='text-2xl font-bold m-4 px-3'>Create job posting</h2>
        <Card className='my-2 p-2 pt-4 md:p-3 lg:p-5'>
          <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className="flex flex-col items-left mt-4">
                  <Label className="w-1/2 mx-4">Job title</Label>
                  <FormControl>
                    <Input placeholder='Enter job title'
                    {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className="flex flex-col items-left mt-4">
                <Label className="w-1/2 mx-4">Description</Label>
                <FormControl>
                  <Tiptap description={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> 
          <FormField
              control={form.control}
              name='department'
              render={({ field }) => (
                <FormItem className="flex flex-col items-left mt-4">
                  <Label className="w-1/2 mx-4">Department</Label>
                  <DepartmentSelect
                  // selectedDepartment={selectedDepartment}
                  selectedDepartment={form.getValues('department')}
                  onChange={(department) => setSelectedDepartment(department)}
                />
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem className="flex flex-col items-left mt-4">
                <Label className="w-1/2 mx-4">Location</Label>
                <FormControl>
                <Input placeholder='Enter job location'
                  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='employmentType'
            render={({ field }) => (
              <FormItem className="flex flex-col items-left mt-4">
                <Label className="w-1/2 mx-4">Employment type</Label>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedEmploymentType(value);
                  }}
                  defaultValue={field.value}>
                  <FormControl className='w-full'>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select work place" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="fulltime">Full-time</SelectItem>
                    <SelectItem value="parttime">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="fixedterm">Fixed-term</SelectItem>
                    <SelectItem value="hourly">Hourly-based</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='workPlace'
            render={({ field }) => (
              <FormItem className="flex flex-col items-left mt-4">
                <Label className="w-1/2 mx-4">Work place</Label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select work place" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent >
                    <SelectItem value="office">In office</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='positionsNumber'
            render={({ field }) => (
              <FormItem className="flex flex-col items-left mt-4">
                <Label className="w-1/2 mx-4">Number of positions</Label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select number of positions" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent >
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='experience'
            render={({ field }) => (
              <FormItem className="flex flex-col items-left mt-4">
                <Label className="w-1/2 mx-4">Years of experience</Label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select years of experience" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent >
                    <SelectItem value="0–3">0–3</SelectItem>
                    <SelectItem value="3–5">3–5</SelectItem>
                    <SelectItem value="5–8">5–8</SelectItem>
                    <SelectItem value="8">8+</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='jobLevel'
            render={({ field }) => (
              <FormItem className="flex flex-col items-left mt-4">
                <Label className="w-1/2 mx-4">Position level</Label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select position level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent >
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="associate">Associate</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name='skills'
            render={({ field }) => (
              <FormItem className="flex flex-col items-left mt-4">
                <Label className="w-1/2 mx-4">Skills</Label>
                <FormControl>
                  <SkillSelect
                    selectedSkills={selectedSkills}
                    onChange={(skills) => {
                      setSelectedSkills(skills);
                      field.onChange(skills);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='salary'
            render={({ field }) => (
              <FormItem className="flex flex-col items-left mt-4">
                <Label className="w-1/2 mx-4">Salary</Label>
                <FormControl>
                <Input placeholder='Enter job salary'
                  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
          control={form.control}
          name='startDate'
          render={({ field }) => (
            <FormItem className="flex flex-col items-left mt-4">
              <Label className="w-1/2 mx-4">Select start date</Label>
              <FormControl>
              <DateSelect
                label="Pick a start date"
                selectedDate={startDate}
                onSelectDate={(date) => setStartDate(date)} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          {selectedEmploymentType === 'contract' || selectedEmploymentType === 'fixedterm' ? (
            <FormField
              control={form.control}
              name='endDate'
              render={({ field }) => (
                <FormItem className="flex flex-col items-left mt-4">
                  <Label className="w-1/2 mx-4">End date of contract</Label>
                  <FormControl>
                  <DateSelect
                    label="Pick an end date"
                    selectedDate={endDate}
                    onSelectDate={(date) => setEndDate(date)} 
                  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
            
        </Card>
        <Card className='my-2 p-2 pt-4 md:p-3 lg:p-5'>
          <FormField
            control={form.control}
            name='closingDate'
            render={({ field }) => (
              <FormItem className="flex flex-col items-left mt-4">
                <Label className="w-1/2 mx-4">Select an aplication closing date</Label>
                <FormControl>
                <DateSelect
                  label="Pick a closing date"
                  selectedDate={closingDate}
                  onSelectDate={(date) => setClosingDate(date)} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='dueDate'
            render={({ field }) => (
              <FormItem className="flex flex-col items-left mt-4">
                <Label className="w-1/2 mx-4">Select a recruitment due date</Label>
                <FormControl>
                <DateSelect
                  label="Pick a due date"
                  selectedDate={dueDate}
                  onSelectDate={(date) => setDueDate(date)} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>
        <div className="flex flex-col md:flex-row-reverse justify-between px-4">

          <Button className='my-4 text-md' type='submit'>
            Save draft
          </Button>
          <CancelDialog onCancelAndSaveDraft={onCancelAndSaveDraft}/>         
        </div>
      </form>
    </Form>
  )
};

export default JobPostForm;
