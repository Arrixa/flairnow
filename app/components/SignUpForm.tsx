"use client";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import Link from "next/link";
// import { Button, Checkbox, Input, Link, Radio } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordStrength } from "check-password-strength";
import PasswordStrength from "./PasswordStrength";
import { registerUser } from "@/lib/actions/authActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Checkbox } from "./ui/checkbox";

interface Props {
  callbackUrl?: string;
}

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
  message: 'Invalid password. Password must have at least one digit, one lowercase letter, one uppercase letter, one special character, and be between 6 and 30 characters long.',
});

// Zod schema validation
const FormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be atleast 2 characters")
      .max(45, "Name must be less than 45 characters")
      .regex(new RegExp("^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$"), "No special characters allowed"),
    email: z.string().email("Please enter a valid email address"),
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters ")
      .max(30, "Password must be less than 30 characters"),
    accepted: z.literal(true, {
      errorMap: () => ({
        message: "Please accept all terms",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

const SignUpForm = (props: Props) => {
  const router = useRouter();

  // useForm from react-hook-form
  const form = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
  });
  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   control,
  //   watch,
  //   formState: { errors },
  // } = useForm<InputType>({
  //   resolver: zodResolver(FormSchema),
  // });


  // Password strength and password visible
  const [passStrength, setPassStrength] = useState(0);
  const [isVisiblePass, setIsVisiblePass] = useState(false);

  useEffect(() => {
    setPassStrength(passwordStrength(form.watch().password).id);
  }, [form.watch().password]);
  
  const toggleVisblePass = () => setIsVisiblePass((prev) => !prev);

  const saveUser: SubmitHandler<InputType> = async (data) => {
    console.log(data, 'submit form data')
    const { accepted, confirmPassword, ...user } = data;
    try {
      const result = await registerUser(user);
      toast.success("The user registered successfully.");
      router.push(props.callbackUrl ? props.callbackUrl : "/profile");
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(saveUser)}
        className="flex flex-col justify-center gap-2 shadow overflow-hidden "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="mx-4">Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Name"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="mx-4">Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="example@email.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage  />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <div className="flex flex-row gap-2">
                  <FormLabel className="mx-4">Password</FormLabel>
                  {
                      isVisiblePass ? (
                        <EyeSlashIcon
                          className="w-4 cursor-pointer"
                          onClick={toggleVisblePass}
                        />
                      ) : (
                        <EyeIcon
                          className="w-4 cursor-pointer"
                          onClick={toggleVisblePass}
                        />
                      )
                    }
                  </div>
                  <FormControl>
                    <Input 
                      placeholder="Password"
                      type={isVisiblePass ? "text" : "password"}
                      {...field}
                    />
                    
                  </FormControl>
                 
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <PasswordStrength passStrength={passStrength} />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="mx-4">Confirm password</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Password"
                    type={isVisiblePass ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="gap-2">
          <Label className="mx-4">I accept the <Link href="/terms">terms</Link></Label>
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
        </div>
        <div className="flex justify-center col-span-2">
          <Button className="w-48" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;

        {/* <Input
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name}
          {...register("name")}
          label="Name"
          startContent={<UserIcon className="w-4" />}
        />
        <Input
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email}
          {...register("email")}
          className="col-span-2"
          label="Email"
          startContent={<EnvelopeIcon className="w-4" />}
        />{" "}
        <Input
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
          {...register("password")}
          className="col-span-2"
          label="Password"
          type={isVisiblePass ? "text" : "password"}
          startContent={<KeyIcon className="w-4" />}
          endContent={
            isVisiblePass ? (
              <EyeSlashIcon
                className="w-4 cursor-pointer"
                onClick={toggleVisblePass}
              />
            ) : (
              <EyeIcon
                className="w-4 cursor-pointer"
                onClick={toggleVisblePass}
              />
            )
          }
        />
        {/* <PasswordStrength passStrength={passStrength} />
        <Input
          errorMessage={errors.confirmPassword?.message}
          isInvalid={!!errors.confirmPassword}
          {...register("confirmPassword")}
          className="col-span-2"
          label="Confirm Password"
          type={isVisiblePass ? "text" : "password"}
          startContent={<KeyIcon className="w-4" />}
        />
        <Controller
          control={control}
          name="accepted"
          render={({ field }) => (
            <Checkbox
              onChange={field.onChange}
              onBlur={field.onBlur}
              className="col-span-2"
            >
              I accept the <Link href="/terms">terms</Link>
            </Checkbox>
          )}
        />
        {!!errors.accepted && (
          <p className="text-red-500">{errors.accepted.message}</p>
        )} */} 