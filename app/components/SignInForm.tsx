'use client';

import { useForm } from 'react-hook-form';
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
    const result = await signIn("credentials", {
      redirect: false,
      username: values.email,
      password: values.password,
    });
    if (!result?.ok) {
      toast.error(result?.error);
      return;
    }
    toast.success("Welcome to FlairNow");
    router.push("/profile");
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
                    <Input placeholder='mail@example.com' {...field} />
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
          <Button className='w-full mt-6' type='submit'>
            Sign in
          </Button>
        </form>
        <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
          or
        </div>
        <NextAuthProviders />
      </Form>
    </div>
  );
};

export default SignInForm;


// "use client";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button, Input } from "@nextui-org/react";
// import { signIn } from "next-auth/react";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { z } from "zod";
// import NextAuthProviders from "./NextAuthProviders";

// interface Props {
//   callbackUrl?: string;
// }

// const FormSchema = z.object({
//   email: z.string().email("Please enter a valid email address"),
//   password: z.string({
//     required_error: "Please enter your password",
//   }),
// });

// type InputType = z.infer<typeof FormSchema>;

// const SignInForm = (props: Props) => {
//   const router = useRouter();
//   const [visiblePass, setVisiblePass] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<InputType>({
//     resolver: zodResolver(FormSchema),
//   });

//   const onSubmit: SubmitHandler<InputType> = async (data) => {
//     const result = await signIn("credentials", {
//       redirect: false,
//       username: data.email,
//       password: data.password,
//     });
//     if (!result?.ok) {
//       toast.error(result?.error);
//       return;
//     }
//     toast.success("Welcome to FlairNow");
//     router.push(props.callbackUrl ? props.callbackUrl : "/profile");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="flex flex-col gap-2 border rounded-md shadow overflow-hidden"
//     >
//       <div className="bg-gradient-to-b from-white to-slate-200 dark:from-slate-700 dark:to-slate-900 p-2 text-center text-xl font-extrabold w-6/12">
//         Sign in to your account
//       </div>
//       <div className="p-2 flex flex-col gap-2">
//         <Input label="Email" {...register("email")} errorMessage={errors.email?.message} />
//         <Input
//           label="Password"
//           {...register("password")}
//           type={visiblePass ? "text" : "password"}
//           errorMessage={errors.password?.message}
//           endContent={
//             <button type="button" onClick={() => setVisiblePass((prev) => !prev)}>
//               {visiblePass ? <EyeSlashIcon className="w-4" /> : <EyeIcon className="w-4" />}
//             </button>
//           }
//         />
//         <div className="flex items-center justify-center gap-2">
//           <Button color="primary" type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
//             {isSubmitting ? "Signing in..." : "Sign in"}
//           </Button>
//           <Button as={Link} href="/auth/signup">
//             Sign up
//           </Button>
//         </div>
//       </div>
//       <NextAuthProviders />
//     </form>
//   );
// };

// export default SignInForm;