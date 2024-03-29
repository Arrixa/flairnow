'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { useToast } from '@/app/components/ui/use-toast';
import { getCsrfToken, signIn } from 'next-auth/react';

// FTM-2 3. Sign in for recruiter & candidate users
// FTM-2 / FTM-17 4. Email sign in

const EmailSignIn= () => {
  const { toast } = useToast();
  const [csrfToken, setCsrfToken] = useState<string | undefined>(undefined);

  // FTM-2 / FTM-17 5. Fetch CSRF token & send in signIn request
  const fetchCsrfToken = useCallback(async () => {
    const token = await getCsrfToken();
    setCsrfToken(token);
  }, []);

  useEffect(() => {
    if (csrfToken === undefined) {
      fetchCsrfToken();
    }
  }, [csrfToken, fetchCsrfToken]);

  console.log(csrfToken, 'csrf token in email sign in');

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
    console.log(value, 'value in email sign in after submit');
    if (form.formState.isSubmitting) {
      return;
    }
    if (event) {
      event.preventDefault();
    }
    const email = value.email
    signIn('email', { email: email, csrf:csrfToken, callbackUrl: '/auth/validate-auth' });
    toast({
      description: "Sending email magic link.",
    })
  }

  return (
    <div className="flex flex-col justify-center items-center mx-auto w-full px-4 md:px-6 lg:px-8 xl:w-3/4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full lg:w-96 space-y-4'>
          <div className='space-y-2 md:w-full lg:w-96'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='ml-3 text-md'>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your email address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <div>
            <Button className="bg-brand text-black py-2 px-4 rounded hover:bg-teal-700 hover:text-white transition duration-300 w-full" type='submit'>
              Continue with email
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmailSignIn;
