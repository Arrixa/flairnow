'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Textarea } from '@/app/components/ui/textarea';
import { useToast } from "@/app/components/ui/use-toast"
import { useState, useEffect } from "react";
import { Label } from '@/app/components/ui/label';
import { Card, CardHeader, CardTitle } from '@/app/components/ui/card';
import Tiptap from './Tiptap';
import SkillSelect from './SkillSelect';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"

const FormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description is required'),
  department: z.string().min(1, 'Name is required'),
  location: z.string().min(1, 'Location is required'),
  salary: z.string().optional(),
  qualifications: z.string().optional(),
  skills: z.array(z.string()).optional(),
  employmentType: z.string().optional(),
  workPlace: z.string().optional(),
  id: z.string().optional(),
});

const JobPostForm = () => {
  const { toast } = useToast()
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

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
      skills: [''],
      employmentType: '',
      workPlace: '',
      id: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log('Form submitted:', data);
    console.log("Save client function called");
    console.log("Selected :", selectedSkills);

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
          skills: selectedSkills,
          employmentType: data.employmentType,
          workPlace: data.workPlace,
        })
      })
        if (response.ok) {
          toast({
            description: "The client information saved successfully.",
          })
          const res = await response.json();
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        </Card>
        <div className="flex flex-col-reverse md:flex-row justify-between px-4">
          <Button className='my-4 text-md' type='submit'>
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
};

export default JobPostForm;
