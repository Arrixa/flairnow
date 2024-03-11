'use client'
import React, { useState} from 'react';
import { useToast } from "@/app/components/ui/use-toast";
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Card } from '@/app/components/ui/card';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer"
import { DateTimeSelect } from '@/app/components/common/date-time/DateTimeSelect';

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
          publishedAt: publishDate?.toISOString(),
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


  return (
      <Drawer>
        <DrawerTrigger>
          <Button variant='flairnowOutline' className='my-4 text-md'>Publish later</Button>
         </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle className='text-2xl font-bold m-4 px-3'>
            Publish job posting
          </DrawerTitle>
          <Card className='m-2 p-2 pt-4 md:p-3 lg:p-5 flex flex-col'>
            <h3 className='m-4'>Schedule date for publishing</h3>
            <Label className="w-1/2 mx-4 mb-2">Select publish date and time</Label>
            <DateTimeSelect selectedDate={publishDate}
              onSelectDate={(date) => setPublishDate(date)} />
            {/*   */}
          </Card>
          <div className="flex flex-col md:flex-row justify-around">
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <Button className='my-4 text-md' type='button' onClick={onSave}>
              Save
            </Button>        
          </div>
          </DrawerContent>

      </Drawer>
  )
}

export default PublishJob;
