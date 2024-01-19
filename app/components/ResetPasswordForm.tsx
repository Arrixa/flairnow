"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { passwordStrength } from "check-password-strength";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import PasswordStrength from "./PasswordStrength";
import { resetPassword } from "../api/user/route";
import { toast } from "react-toastify";

interface Props {
  jwtUserId: string;
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

const FormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match!",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

const ResetPasswordForm = ({ jwtUserId }: Props) => {
  const [visiblePass, setVisiblePass] = useState(false);
  const [passStrength, setPassStrength] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });
  useEffect(() => {
    setPassStrength(passwordStrength(watch().password).id);
  }, [watch().password]);

  const resetPass: SubmitHandler<InputType> = async (data) => {
    try {
      const result = await resetPassword(jwtUserId, data.password);
      if (result === "success")
        toast.success("Your password has been reset successfully!");
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(resetPass)}
      className="flex flex-col gap-2 p-2 m-2 border rounded-md shadow"
    >
      <div className="text-center p-2">Reset your password</div>
      <Input
        type={visiblePass ? "text" : "password"}
        label="Password"
        {...register("password")}
        errorMessage={errors.password?.message}
        endContent={
          <button type="button" onClick={() => setVisiblePass((prev) => !prev)}>
            {visiblePass ? (
              <EyeSlashIcon className="w-4" />
            ) : (
              <EyeIcon className="w-4" />
            )}
          </button>
        }
      />
      <PasswordStrength passStrength={passStrength} />
      <Input
        type={visiblePass ? "text" : "password"}
        label="Confirm password"
        {...register("confirmPassword")}
        errorMessage={errors.confirmPassword?.message}
      />
      <div className="flex justify-center">
        <Button
          isLoading={isSubmitting}
          type="submit"
          disabled={isSubmitting}
          color="primary"
        >
          {isSubmitting ? "Please wait..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;