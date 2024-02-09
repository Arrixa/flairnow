import renderLogoInline from "@/app/components/common/logos/LogoInline";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { signIn } from "next-auth/react";
import Link from "next/link";

const validationError = () => {
  return (
    <Card className="p-5 my-10 flex flex-col bg-background w-fit mx-auto">
    <CardHeader>
      <CardTitle className="text-4xl py-4 text-center">Unable to sign in</CardTitle>
      <Link href='/'>
        <div className="flex justify-center">
          <CardDescription className="text-lg align-text-top">The sign in link is no longer valid.
          </CardDescription>
         
          <CardDescription className="text-lg align-text-top">&nbsp;home page
          </CardDescription>
        </div>
      </Link>
    </CardHeader>
    <CardContent>
      <p className="text-md text-center font-medium">It may have been used already or it may have expired.</p>
      <Button onClick={() => signIn()}>Sign in</Button>
    </CardContent>
    <CardFooter>
      <span className="inline-block p-1">
        {renderLogoInline()}
      </span>
    </CardFooter>
  </Card>
  )
}

export default validationError
