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
// import NextAuthProviders from './NextAuthProviders';
// import GoogleSignInButton from '../GoogleSignInButton';

const passwordSchema = z.string().refine((password) => {
  // At least one digit
  const hasDigit = /\d/.test(password);
  // At least one lowercase letter
  const hasLowercase = /[a-z]/.test(password);
  // At least one uppercase letter
  const hasUppercase = /[A-Z]/.test(password);
  // At least one special character
  const hasSpecialChar = /[*.!@$%^&(){}[\]:;<>,.?/~_+-=|\\]/.test(password);
  // Overall length between 6 and 30 characters
  const isLengthValid = password.length >= 6 && password.length <= 30;
  return hasDigit && hasLowercase && hasUppercase && hasSpecialChar && isLengthValid;
}, {
  message: 'Invalid password. Password must be 6-30 characters and have at least one digit, lowercase letter, uppercase letter and special character.',
});

const FormSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("Save user function called");
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password
        })
      })
      if (response.ok) {
        toast.success("The user registered successfully.");
        router.push('/auth/signin')
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
                    <Input placeholder='Enter your email address' {...field} />
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
                      placeholder='Enter a unique password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Re-enter your password'
                      type='password'
                      {...field}
                    />
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
