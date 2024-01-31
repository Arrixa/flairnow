"use client";
import { forgotPassword } from "@/app/api/user/route";
import { Button } from "@/app/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email!"),
});

type InputType = z.infer<typeof FormSchema>;

const ForgotPasswordPage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        email: '',
      },
    });

  const submitRequest = async (values: z.infer<typeof FormSchema>) => {
    try {
      const result = await forgotPassword(values.email);
      console.log(values, result)
      if (result) toast.success("Reset password link was sent to your email.");
      form.reset();
    } catch (e) {
      console.error("Error during password reset:", e);
      toast.error("Something went wrong. Please try again.");
    }
  };
  
  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      <Form {...form}>
        <form
          className="w-full"
          onSubmit={form.handleSubmit(submitRequest)}
        >
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
          </div>
          <Button
            className="w-full mt-6"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordPage;