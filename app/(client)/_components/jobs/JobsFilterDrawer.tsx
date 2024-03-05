import React from 'react';
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
import { Button } from "@/app/components/ui/button"
import { Filter } from 'lucide-react';

// FTM-15 / FTM-23 Filter jobs

const JobFilterDrawer = () => {
  // FTM-15 / FTM-23 1. Drawer with filter options
  return (
    <Drawer>
      <DrawerTrigger>
        <Filter size={24} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filter job posts</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default JobFilterDrawer;