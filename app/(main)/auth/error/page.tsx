import renderLogo from "@/app/components/common/logos/LogoInline";
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
      <CardTitle className="text-4xl py-4 text-center">Error</CardTitle>
      <Link href='/'>
        <div className="flex justify-center">
          <CardDescription className="text-lg align-text-top">Go back to&nbsp;
          </CardDescription>
          <span className="inline-block p-1">
          {renderLogo()}
          </span>
          <CardDescription className="text-lg align-text-top">&nbsp;home page
          </CardDescription>
        </div>
      </Link>
    </CardHeader>
    <CardContent>
      <p className="text-md text-center font-medium">FlairNow</p>
    </CardContent>
    <CardFooter>
     
    </CardFooter>
  </Card>
  )
}

export default validatePage;
