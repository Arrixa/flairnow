import renderLogoInline from "@/app/components/common/logos/LogoInline";
import renderLogo from "@/app/components/common/logos/LogoFull";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import Link from "next/link";

// FTM-2 FTM-21 11. Follow magic link in email

const validatePage = () => {
  return (
  <Card className="lg:p-6 my-20 flex items-center justify-center flex-col bg-background w-2/3 lg:w-1/3 mx-auto">
    <CardHeader>
      <CardTitle className="text-4xl py-4 text-center">Check your email</CardTitle>
      <div className="flex justify-center">
        <CardDescription className="text-lg align-text-top pt-4">to sign in to&nbsp;
        </CardDescription>
        <span className="inline-block p-1 pb-4">
         {renderLogoInline()}
        </span>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-md text-center font-medium">A sign in link has been sent to your email address</p>
    </CardContent>
    <CardFooter className="mx-auto">
        <Link href='/'>
          <span className="lg:p-6 w-1/4 h-auto">
            {renderLogo()}
          </span>
        </Link>
      </CardFooter>
  </Card>
  )
}

export default validatePage;
