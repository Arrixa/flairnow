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
import { Label } from '@/app/components/ui/label';
import { extractEmailDomain, isDomainInExcludedList } from '@/lib/extractDomain';
import { useEffect, useState } from 'react';

const FormSchema = z
  .object({
    firstName: z.string().min(2, 'First name is required with a minimum of 2 characters').max(100),
    lastName: z.string().min(2, 'Last name is required with a minimum of 2 characters').max(100),
    domain: z.string()
  })


const SignUpForm = () => {
  const [domain, setDomain] = useState<string>("" as string);
  const router = useRouter();
  const { data: session, update } = useSession();

  useEffect(() => {
    if (session?.user.email) {
      const domainExtract = extractEmailDomain(session.user.email);
      const isPublicDomain = isDomainInExcludedList(domainExtract);
      console.log(domainExtract, isPublicDomain)

      if (isPublicDomain === true) {
        setDomain("public");
      } else {
        setDomain(domainExtract);
      }
    }
  }, [session]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      domain: domain,
    },
  });

  useEffect(() => {
    form.setValue("domain", domain);
  }, [domain, form]);

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
          email: session?.user.email,
          domain: domain
        })
      })
      if (response.ok) {
        toast.success("The user registered successfully.");
        await update({ ...session?.user, firstName: data.firstName, lastName: data.lastName, domain: domain})
        // router.push('/auth/update-session')
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
    <div className="flex flex-col justify-center items-center mx-auto w-full px-4 ">
      <div className="flex flex-col mx-auto w-full my-2">
        <Label className='text-left ml-2 p-2'>Email</Label>
        <Input className='text-foreground' disabled placeholder={session?.user.email} />
    </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <div className='space-y-2 md:w-full'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='ml-3'>First name</FormLabel>
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
                  <FormLabel className='ml-3'>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your last name' {...field} />
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