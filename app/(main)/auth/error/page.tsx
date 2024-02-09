'use client'
import renderLogo from "@/app/components/common/logos/LogoFull";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import Link from "next/link";
import { useSearchParams } from 'next/navigation'
// import { NextRequest } from "next/server";


const CustomError = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  // const searchParams = request.nextUrl?.searchParams;
  // console.log(searchParams)
  // const error = searchParams?.get('error') ?? 'Verification';
  // console.log(error);

  // Custom content based on the error code
  let errorMessage;
  let errorDescription;
  switch (error) {
      case 'Configuration':
        errorDescription = 'There is a problem with the server configuration.',
        errorMessage = 'Please check if your options are correct.';
        break;
      case 'AccessDenied':
        errorDescription = 'Access denied. ',
        errorMessage = 'You may not have access to this page. Check your sign in or redirect callback.';
        break;
      case 'Verification':
        errorDescription = 'Verification error. ',
        errorMessage = 'The token has expired or has already been used. Please sign in again.';
        break;
      default:
        errorDescription = 'An error occurred. ',
        errorMessage = 'Please sign in again.';
  }

  return (
    <Card className="p-5 my-10 flex flex-col bg-background w-2/3 lg:w-1/3 mx-auto">
      <CardHeader>
        <CardTitle className="text-4xl py-4 text-center">Error!</CardTitle>
          <div className="flex justify-center">
            <CardDescription className="text-lg align-text-top">{errorDescription}
            </CardDescription>
          </div>
      </CardHeader>
      <CardContent>
        <p className="text-md text-center font-medium">{errorMessage}</p>
      </CardContent>
      <CardContent className="mx-auto mt-4">
        <Link href="/auth/signin">
          <Button>Sign in</Button>         
        </Link>
      </CardContent>
      <CardFooter className="mx-auto">
        <Link href='/'>
          <span className="p-6">
            {renderLogo()}
          </span>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default CustomError;

