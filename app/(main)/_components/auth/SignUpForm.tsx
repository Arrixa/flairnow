'use client';

import { Controller, useForm } from 'react-hook-form';
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
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import { Checkbox } from '../../../components/ui/checkbox';
import { useSession } from 'next-auth/react';
// import NextAuthProviders from './NextAuthProviders';
// import GoogleSignInButton from '../GoogleSignInButton';

const FormSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    accepted: z.boolean().refine(value => value === true, {
      message: 'You must accept the terms and privacy policy',
    }),
  })


const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      accepted: false,
    },
  });

  const { data: session, update } = useSession();

  async function updateSession() {
    // if(session) session.user.username = "UPDATE"
    
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          // password: data.password
        })
      })
      if (response.ok) {
        toast.success("The user registered successfully.");
        await update({...session?.user, username: data.username })
        router.push('/auth/validate-auth')
        // router.refresh
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
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full lg:w-96'>
          <div className='space-y-2 md:w-full lg:w-96'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your full name' {...field} />
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
                    <Input placeholder='Confirm your email address' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           </div>
          <div className="gap-2 mt-6">
           <Controller
             control={form.control}
             name="accepted"
             render={({ field }) => (
               <Checkbox
                 onChange={field.onChange}
                 onBlur={field.onBlur}
                 className="col-span-2"
               >
               </Checkbox>
             )}
           />  
           <Label className="mx-4">By signing up, I agree with the FlairNow <Link href="/terms" className='hover:underline'>Terms </Link>and <Link href="/policy" className='hover:underline'>Privacy Policy </Link></Label>      
         </div>
          <div>
          <Button className='min-w-full w-full mt-6 text-md' type='submit'>
            Sign up
          </Button>
          </div>
        </form>
        {/* <NextAuthProviders /> */}
      </Form>
    </div>
  );
};

export default SignUpForm;
