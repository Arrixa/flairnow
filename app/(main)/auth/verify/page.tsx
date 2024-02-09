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

const validatePage = () => {
  return (
  <Card className="p-5 my-10 flex flex-col bg-background w-fit mx-auto">
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
          <span className="p-6">
            {renderLogo()}
          </span>
        </Link>
      </CardFooter>
  </Card>
  )
}

export default validatePage;
