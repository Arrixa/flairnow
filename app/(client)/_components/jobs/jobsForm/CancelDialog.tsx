import React from 'react'
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
import { Button } from "@/app/components/ui/button";
import Link from 'next/link'

const CancelDialog = ({ onCancelAndSaveDraft }: { onCancelAndSaveDraft: () => void }) => {
  return (
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
        <AlertDialogAction onClick={() => onCancelAndSaveDraft}>Cancel & Save Draft</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default CancelDialog
