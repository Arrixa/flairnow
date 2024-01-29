'use client';

import { useForm } from 'react-hook-form';
import { getSession } from 'next-auth/react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Link from 'next/link';
import NextAuthProviders from "./NextAuthProviders";
import { toast } from "react-toastify";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Checkbox } from './ui/checkbox';

interface Props {
  callbackUrl?: string;
}

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
});

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (!result?.ok) {
        toast.error(result?.error);
        return;
      }

      await getSession();
      const session = await getSession(); 
      const role = session?.clientUser.role;
      const userData = session?.user;
      console.log('session data in sign in', userData)
  
      if (role && role.length > 0) {
        router.push("/dashboard");
      } else {
        router.push("/profile");
      }
      toast.success("Welcome to FlairNow");
    } catch (error) {
        console.error('Authentication error:', error);
    }
  };
    

  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Enter your password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex justify-between items-center mt-4'>
            <span className='flex items-center'><Checkbox className="col-span-2 mr-2"></Checkbox><p>Remember me</p></span>    
            <Link href={"/auth/forgotPassword"} className="hover:underline text-accent flex justify-end">Forgot password</Link>
          </div>
          <Button className='w-full mt-6' type='submit'>
            Sign in
          </Button>
        </form>
        {/* <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
          or
        </div>
        <NextAuthProviders /> */}
      </Form>
    </div>
  );
};

export default SignInForm;
