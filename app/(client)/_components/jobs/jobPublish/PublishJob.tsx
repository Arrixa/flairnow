'use client'
import React, { useState} from 'react';
import { DateSelect } from '@/app/components/common/DateSelect';
import { useToast } from "@/app/components/ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/components/ui/form';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/app/components/ui/card';
import { useForm } from 'react-hook-form';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer"

const FormSchema = z.object({
    publishedAt: z.string().optional(),
    id: z.string().optional(),
  })

const PublishJob = ({ jobId }: { jobId: string | string[] }) => {
  const { toast } = useToast()
  const [publishDate, setPublishDate] = useState<Date | undefined>(undefined);

  const onSave = async () => {
    console.log("Save function called");

    try {
      const response = await fetch(`/api/recruitment/job/${jobId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          publishedAt: publishDate,
          id: jobId
        })
      });

      if (response.ok) {
        toast({
          description: "The job post saved successfully.",
        });
        const res = await response.json();
        console.log(res, 'response data from form save');
        // onClose();
      } else {
        toast({
          variant: "destructive",
          title: "The job post save failed.",
          description: "Please try again.",
        });
        console.error("Save failed");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "The job post save failed.",
        description: "Please try again.",
      });
      console.error("Save failed:", error);
    }
  };

  const onPublishNow = async () => {
    console.log("Publish now function called");

    try {
      const response = await fetch(`/api/recruitment/job/${jobId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          publishedAt: new Date(),
          status: 'PUBLISHED',
          id: jobId
        })
      });

      if (response.ok) {
        toast({
          description: "The job post published successfully.",
        });
        const res = await response.json();
        console.log(res, 'response data from publish now');
      } else {
        toast({
          variant: "destructive",
          title: "Publishing the job post failed.",
          description: "Please try again.",
        });
        console.error("Publishing failed");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Publishing the job post failed.",
        description: "Please try again.",
      });
      console.error("Publishing failed:", error);
    }
  };


  return (
      <Drawer>
        <DrawerTrigger>
          <Button variant='flairnowOutline' className='my-4 text-md'>Publish</Button>
         </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle className='text-2xl font-bold m-4 px-3'>
            Publish job posting
          </DrawerTitle>
          <Card className='m-2 p-2 pt-4 md:p-3 lg:p-5'>
            <h3 className='m-4'>Schedule date for publishing</h3>
            <Label className="w-1/2 mx-4">Select publish date</Label>
            <DateSelect
              label="Pick a publish date"
              selectedDate={publishDate}
              onSelectDate={(date) => setPublishDate(date)} 
            />
          </Card>
          <div className="flex flex-col md:flex-row justify-around">
            <Button className='my-4 text-md' type='button' onClick={onSave}>
              Save
            </Button>
            <Button className='my-4 text-md' type='button' onClick={onPublishNow}>
              Publish now
            </Button>
          </div>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerContent>

      </Drawer>
  )
}

export default PublishJob;
