'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/app/components/ui/textarea';
import { useToast } from "@/app/components/ui/use-toast"
import { useState, useEffect } from "react";
import { Label } from '@/app/components/ui/label';
import { Card, CardHeader, CardTitle } from '@/app/components/ui/card';
import Tiptap from './Tiptap';
import { FancyMultiSelect } from '@/app/components/common/MultiSelect';
import WorkplaceSelect from './WorkplaceSelect';
import EmploymentSelect from './EmploymentSelect';
import SkillSelect from './SkillSelect';

const FormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description is required'),
  department: z.string().min(1, 'Name is required'),
  location: z.string().min(1, 'Location is required'),
  salary: z.string().optional(),
  qualifications: z.string().optional(),
  skills: z.string().min(1, 'Skills are required'),
  employmentType: z.string().min(1, 'Employment type is required'),
  workPlace: z.string().min(1, 'Work place is required'),
});

const JobPostForm = () => {
  const { toast } = useToast()
  const [selectedWorkplace, setSelectedWorkplace] = useState('');

  const form = useForm({
    resolver: zodResolver(FormSchema),
    mode: 'all', // 'onChange' | 'onBlur' | 'onSubmit' | 'onChange' | 'onTouched' | 'all'
    defaultValues: {
      title: '',
      description: '',
      department: '',
      location: '',
      salary: '',
      qualifications: '',
      skills: '',
      employmentType: '',
      workPlace: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log('Form submitted:', data);
    console.log("Save client function called");

    // Add this log to check the form state before submitting
    // console.log('Form state before submit:', form.formState);

    try {
      const response = await fetch('/api/recruitment/job-posting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,   
          department: data.department,
          location: data.location,
          salary: data.salary,
          qualifications: data.qualifications,
          skills: data.skills,
          employmentType: data.employmentType,
          workPlace: data.workPlace,
        })
      })
        if (response.ok) {
          toast({
            description: "The client information saved successfully.",
          })
          // setIsEditMode(false)
          const mappedData = {
            title: data.title,
            description: data.description,   
            department: data.department,
            location: data.location,
            salary: data.salary,
            qualifications: data.qualifications,
            skills: data.skills,
            employmentType: data.employmentType,
            workPlace: data.workPlace,
            };
          form.reset(mappedData)
          window.location.reload();
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
      <form  onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='my-2 p-2 pt-4 md:p-3 lg:p-5'>
        <CardTitle className='m-4'>Create job posting</CardTitle>
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
                    <FormControl className="mb-1 text-sm">
                      <Input placeholder='Enter company department'                        
                      {...field} />
                    </FormControl>
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
                <FormControl className='w-full'>
                  <EmploymentSelect {...field} value={selectedWorkplace} onChange={(value) => setSelectedWorkplace(value)} />
                </FormControl>
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
                <FormControl>
                  <WorkplaceSelect {...field} value={selectedWorkplace} onChange={(value) => setSelectedWorkplace(value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='qualifications'
            render={({ field }) => (
              <FormItem className="flex flex-col items-left mt-4">
                <Label className="w-1/2 mx-4">Qualifications</Label>
                <FormControl>
                <Input placeholder='Enter job qualifications'
                  {...field} />
                </FormControl>
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
                  <SkillSelect />
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
        </Card>
        <div className="flex flex-col-reverse md:flex-row justify-between">
          <Button className='my-4 text-md' type='submit'>
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default JobPostForm
