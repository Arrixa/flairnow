'use client'
import React, { useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
import { Button } from '../../../components/ui/button';
import { toast } from "react-toastify";
import { signIn } from 'next-auth/react';

const EmailSignIn= () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  // const [email, setEmail] = useState('');

  const FormSchema = useMemo(() => (
    z.object({
      email: z.string().min(1, 'Email is required').email('Invalid email'),
    })
  ), []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (value: z.infer<typeof FormSchema>, event?: React.BaseSyntheticEvent): Promise<void> => {
    if (form.formState.isSubmitting) {
      return;  
    }
    if (event) {
      event.preventDefault();
    } 
    const email = value.email
    console.log("value", value.email);
    // setEmail(value.email);
    console.log(email, callbackUrl)
    signIn('email', { email: email });
  }
  

  return (
    <div className="flex flex-col justify-center items-center mx-auto w-full px-4 md:px-6 lg:px-8 xl:w-3/4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full lg:w-96'>
          <div className='space-y-2 md:w-full lg:w-96'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your email address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <div>
          <Button className='min-w-full w-full mt-6 text-md' type='submit'>
            Continue with email
          </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmailSignIn;

/*
  const onSubmit = async (value: z.infer<typeof FormSchema>, event?: React.BaseSyntheticEvent): Promise<void> => {
    if (form.formState.isSubmitting) {
      return;  // Exit early if the form is already being submitted
    }
    if (event) {
      event.preventDefault();
    } 
  
    console.log("value", value);
    setEmail(value.email);
    console.log("email after setEmail", email);
  
    try {
      const response = await fetch('/api/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: value.email })
      });
  
      let data;
  
      if (response.ok) {
        try {
          data = await response.json();
          console.log("Data from server:", data);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          // Log the response text in case of JSON parsing error
          console.error('Response text:', await response.text());
        }
      } else {
        console.error('Server returned an error:', response.status, response.statusText);
        // Log the response text in case of server error
        console.error('Response text:', await response.text());
      }
  
      if (data && data.isUnique !== undefined) {
        // Email is unique, set callbackUrl for signup
        const signupCallbackUrl = '/auth/signup';
        console.log("Signing in with unique email. Callback URL:", signupCallbackUrl);
        signIn('email', { email, callbackUrl: '/auth/signup' });
      } else {
        // Email is not unique, proceed with the regular email sign-in
        console.log("Signing in with non-unique email. Callback URL:", callbackUrl);
        signIn('email', { email, callbackUrl: "/" });
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } 
  };

  const onSubmit = async (value: z.infer<typeof FormSchema>, event?: React.BaseSyntheticEvent): Promise<void> => {
    if (form.formState.isSubmitting) {
      return;  // Exit early if the form is already being submitted
    }
  
    if (event) {
      event.preventDefault();
    }
  
    console.log("value", value);
    setEmail(value.email);
    console.log("email after setEmail", email);
  
    try {
      const response = await fetch('/api/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: value.email })
      });
  
      await handleResponse(response);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  
  const handleResponse = async (response: Response): Promise<void> => {
    let data;
  
    if (response.ok) {
      data = await parseJSONResponse(response);
      console.log("Data from server:", data);
    } else {
      consoleErrorServerResponse(response);
    }
  
    if (data && data.isUnique !== undefined) {
      handleUniqueEmail(data);
    } else {
      handleNonUniqueEmail();
    }
  };
  
  const parseJSONResponse = async (response: Response): Promise<any> => {
    try {
      return await response.json();
    } catch (error) {
      console.error('Error parsing JSON:', error);
      // Log the response text in case of JSON parsing error
      console.error('Response text:', await response.text());
      throw error;
    }
  };
  
  const consoleErrorServerResponse = async (response: Response): Promise<void> => {
    console.error('Server returned an error:', response.status, response.statusText);
    // Log the response text in case of server error
    console.error('Response text:', await response.text());
  };
  
  const handleUniqueEmail = (data: any): void => {
    const signupCallbackUrl = '/auth/signup';
    console.log("Signing in with unique email. Callback URL:", signupCallbackUrl);
    signIn('email', { email, callbackUrl: '/auth/signup' });
  };
  
  const handleNonUniqueEmail = (): void => {
    console.log("Signing in with non-unique email. Callback URL:", callbackUrl);
    signIn('email', { email, callbackUrl: '/' });
  };
*/
