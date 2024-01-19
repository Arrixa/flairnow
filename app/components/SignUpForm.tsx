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
import { useRouter } from 'next/navigation';
import NextAuthProviders from './NextAuthProviders';
import { toast } from "react-toastify";
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
          name: data.username,
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
                  <FormLabel className='mx-2'>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Your fullname' {...field} />
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
                  <FormLabel className='mx-2'>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='example@mail.com' {...field} />
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
                  <FormLabel className='mx-2'>Password</FormLabel>
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
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='mx-2'>Re-enter your password</FormLabel>
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
          <div>

          <Button className='min-w-full w-full mt-6 text-md ' type='submit'>
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

// "use client";
// import {
//   EnvelopeIcon,
//   EyeIcon,
//   EyeSlashIcon,
//   KeyIcon,
//   UserIcon,
// } from "@heroicons/react/20/solid";
// // import { Button } from "./ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "./ui/form"
// import { Input } from "./ui/input"
// import { Label } from "./ui/label"
// import Link from "next/link";
// // import { Button, Checkbox, Input, Link, Radio } from "@nextui-org/react";
// import { useEffect, useState } from "react";
// import { z } from "zod";
// import { Controller, SubmitHandler, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { passwordStrength } from "check-password-strength";
// import PasswordStrength from "./PasswordStrength";
// import { registerUser } from "@/lib/actions/authActions";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import { Checkbox } from "./ui/checkbox";
// import { Button } from "./ui/button";

// interface Props {
//   callbackUrl?: string;
// }

// const passwordSchema = z.string().refine((password) => {
//   // At least one digit
//   const hasDigit = /\d/.test(password);
//   // At least one lowercase letter
//   const hasLowercase = /[a-z]/.test(password);
//   // At least one uppercase letter
//   const hasUppercase = /[A-Z]/.test(password);
//   // At least one special character
//   const hasSpecialChar = /[*.!@$%^&(){}[\]:;<>,.?/~_+-=|\\]/.test(password);
//   // Overall length between 6 and 30 characters
//   const isLengthValid = password.length >= 6 && password.length <= 30;
//   return hasDigit && hasLowercase && hasUppercase && hasSpecialChar && isLengthValid;
// }, {
//   message: 'Invalid password. Password must have at least one digit, one lowercase letter, one uppercase letter, one special character, and be between 6 and 30 characters long.',
// });

// // Zod schema validation
// const FormSchema = z
//   .object({
//     name: z
//       .string()
//       .min(2, "Name must be atleast 2 characters")
//       .max(45, "Name must be less than 45 characters")
//       .regex(new RegExp("^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$"), "No special characters allowed"),
//     email: z.string().email("Please enter a valid email address"),
//     password: passwordSchema,
//     confirmPassword: z
//       .string()
//       .min(6, "Password must be at least 6 characters ")
//       .max(30, "Password must be less than 30 characters"),
//     accepted: z.literal(true, {
//       errorMap: () => ({
//         message: "Please accept all terms",
//       }),
//     }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match!",
//     path: ["confirmPassword"],
//   });

// type InputType = z.infer<typeof FormSchema>;

// const SignUpForm = (props: Props) => {
//   const router = useRouter();

//   // useForm from react-hook-form
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       name: '',
//       email: '',
//       password: '',
//       confirmPassword: ''
//     },
//   });
//   // const {
//   //   register,
//   //   handleSubmit,
//   //   reset,
//   //   control,
//   //   watch,
//   //   formState: { errors },
//   // } = useForm<InputType>({
//   //   resolver: zodResolver(FormSchema),
//   // });


//   // Password strength and password visible
//   // const [passStrength, setPassStrength] = useState(0);
//   // const [isVisiblePass, setIsVisiblePass] = useState(false);

//   // useEffect(() => {
//   //   setPassStrength(passwordStrength(form.watch().password).id);
//   // }, [form.watch().password]);
  
//   // const toggleVisblePass = () => setIsVisiblePass((prev) => !prev);

//   // const saveUser: SubmitHandler<InputType> = async (data) => {
//   //   console.log(data, 'submit form data')
//   //   const { accepted, confirmPassword, ...user } = data;
//   //   try {
//   //     const result = await registerUser(user);
//   //     toast.success("The user registered successfully.");
//   //     router.push(props.callbackUrl ? props.callbackUrl : "/profile");
//   //   } catch (error) {
//   //     toast.error("Something went wrong!");
//   //     console.error(error);
//   //   }
//   // };

//   // const onSubmit = async (data: z.infer<typeof FormSchema>) => {
//   //   console.log("Save user function called");
//   //   // event?.preventDefault();
//   //   const { accepted, confirmPassword, ...user } = data;
//   //   try {
//   //     const result = await registerUser(user);
//   //     console.log(result)
//   //     const response = await fetch('/api/user', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json'
//   //       },
//   //       body: JSON.stringify({
//   //         name: data.name,
//   //         email: data.email,
//   //         password: data.password
//   //       })
//   //     })
//   //     if (response.ok) {
//   //       toast.success("The user registered successfully.");
//   //       router.push('/auth/signin')
//   //     } else {
//   //       const errorData = await response.json();
//   //       console.error("Registration failed:", errorData);
//   //     }
//   //   } catch (error) {
//   //       console.error("Registration failed:", error);
//   //   }
//   // }

//   const onSubmit = (values: z.infer<typeof FormSchema>) => {
//     console.log(values);
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="flex flex-col justify-center gap-2 shadow overflow-hidden "
//       >
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="mx-4">Name</FormLabel>
//               <FormControl>
//                 <Input 
//                   placeholder="Name"
//                   type="text"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//             )}
//         />
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="mx-4">Email</FormLabel>
//                 <FormControl>
//                   <Input 
//                     placeholder="example@mail.com"
//                     type="email"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage  />
//               </FormItem>
//             )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//               <FormItem>
//                 <div className="flex flex-row gap-2">
//                   <FormLabel className="mx-4">Password</FormLabel>
//                   {/* {
//                       isVisiblePass ? (
//                         <EyeSlashIcon
//                           className="w-4 cursor-pointer"
//                           onClick={toggleVisblePass}
//                         />
//                       ) : (
//                         <EyeIcon
//                           className="w-4 cursor-pointer"
//                           onClick={toggleVisblePass}
//                         />
//                       )
//                     } */}
//                   </div>
//                   <FormControl>
//                     <Input 
//                       placeholder="Password"
//                       // type={isVisiblePass ? "text" : "password"}
//                       {...field}
//                     />
                    
//                   </FormControl>
                 
//                 <FormMessage />
//               </FormItem>
//             )}
//         />
//         {/* <PasswordStrength passStrength={passStrength} /> */}
//         <FormField
//           control={form.control}
//           name="confirmPassword"
//           render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="mx-4">Confirm password</FormLabel>
//                 <FormControl>
//                   <Input 
//                     placeholder="Password"
//                     // type={isVisiblePass ? "text" : "password"}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//         />
//         <div className="gap-2">
//           <Label className="mx-4">I accept the <Link href="/terms">terms</Link></Label>
//           <Controller
//             control={form.control}
//             name="accepted"
//             render={({ field }) => (
//               <Checkbox
//                 onChange={field.onChange}
//                 onBlur={field.onBlur}
//                 className="col-span-2"
//               >
//               </Checkbox>
//             )}
//           />        
//         </div>
//         <Button type="submit">Submit</Button>
//         {/* <div className="flex justify-center col-span-2">
//         </div> */}
//       </form>
//     </Form>
//   );
// };

// export default SignUpForm;

//         {/* <Input
//           errorMessage={errors.name?.message}
//           isInvalid={!!errors.name}
//           {...register("name")}
//           label="Name"
//           startContent={<UserIcon className="w-4" />}
//         />
//         <Input
//           errorMessage={errors.email?.message}
//           isInvalid={!!errors.email}
//           {...register("email")}
//           className="col-span-2"
//           label="Email"
//           startContent={<EnvelopeIcon className="w-4" />}
//         />{" "}
//         <Input
//           errorMessage={errors.password?.message}
//           isInvalid={!!errors.password}
//           {...register("password")}
//           className="col-span-2"
//           label="Password"
//           type={isVisiblePass ? "text" : "password"}
//           startContent={<KeyIcon className="w-4" />}
//           endContent={
//             isVisiblePass ? (
//               <EyeSlashIcon
//                 className="w-4 cursor-pointer"
//                 onClick={toggleVisblePass}
//               />
//             ) : (
//               <EyeIcon
//                 className="w-4 cursor-pointer"
//                 onClick={toggleVisblePass}
//               />
//             )
//           }
//         />
//         {/* <PasswordStrength passStrength={passStrength} />
//         <Input
//           errorMessage={errors.confirmPassword?.message}
//           isInvalid={!!errors.confirmPassword}
//           {...register("confirmPassword")}
//           className="col-span-2"
//           label="Confirm Password"
//           type={isVisiblePass ? "text" : "password"}
//           startContent={<KeyIcon className="w-4" />}
//         />
//         <Controller
//           control={control}
//           name="accepted"
//           render={({ field }) => (
//             <Checkbox
//               onChange={field.onChange}
//               onBlur={field.onBlur}
//               className="col-span-2"
//             >
//               I accept the <Link href="/terms">terms</Link>
//             </Checkbox>
//           )}
//         />
//         {!!errors.accepted && (
//           <p className="text-red-500">{errors.accepted.message}</p>
//         )} */} 