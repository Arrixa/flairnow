'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import { useSession } from 'next-auth/react';

const FormSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required').max(100),
    lastName: z.string().min(1, 'Last name is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
  })


const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const { data: session, update } = useSession();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log('onSubmit clicked', data)
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        })
      })
      if (response.ok) {
        toast.success("The user registered successfully.");
        await update({ ...session?.user, firstName: data.firstName, lastName: data.lastName})
        router.push('/auth/validate-auth')
        // router.push('/auth/signin')
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center mx-auto w-full px-4 md:px-6 lg:px-8 xl:w-3/4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <div className='space-y-2 md:w-full'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your first name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your last name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled placeholder={session?.user.email} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           </div>
          <div>
          <Button className='min-w-full w-full mt-6 text-md' type='submit'>
            Save
          </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;