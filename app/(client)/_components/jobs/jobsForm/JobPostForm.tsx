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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { JobForm } from '@/lib/interfaces';
import DepartmentSelect from './DepartmentSelect';
import Link from 'next/link';

const FormSchemaDraft = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  location: z.string().optional(),
  department: z.string().optional(),
  salary: z.string().optional(),
  qualifications: z.string().optional(),
  skills: z.array(z.string()).optional(),
  employmentType: z.string().optional(),
  workPlace: z.string().optional(),
  id: z.string().optional(),
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
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchemaDraft),
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


  const openCancelDialog = () => {
    setIsCancelDialogOpen(true);
  };

  const closeCancelDialog = () => {
    setIsCancelDialogOpen(false);
  };

  const onCancel = () => {
    // Handle cancel logic here
    closeCancelDialog();
  };

    const onCancelAndSaveDraft = async () => {
      await onSubmit(form.getValues()); // Submit the form data
      closeCancelDialog();
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
        <div className="flex flex-col md:flex-row-reverse justify-between px-4">

          <Button className='my-4 text-md' type='submit'>
            Save draft
          </Button>

          {/* Cancel Dialog */}
          <AlertDialog>
            <AlertDialogTrigger><Button className='my-4 text-md' variant='flairnowOutline'>
            Cancel
          </Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                Do you want to cancel and discard or cancel and save the draft?
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction><Link href='/dashboard/recruitment'>Cancel & Discard</Link></AlertDialogAction>
                <AlertDialogAction onClick={onCancelAndSaveDraft}>Cancel & Save Draft</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </form>
    </Form>
  )
};

export default JobPostForm;
