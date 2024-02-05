import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import Image from "next/image";

const validatePage = () => {
  return (
  <Card className="p-5 my-10 flex flex-col bg-background w-fit mx-auto">
    <CardHeader>
      <CardTitle className="text-4xl py-4">Check your email</CardTitle>
      <div className="flex">
        <CardDescription className="text-lg align-text-top">to sign in to&nbsp;
        </CardDescription>
        <span className="inline-block p-1">
          <Image
            src="/FlairNow-Logo-Full-Text.svg"
            alt="Text logo"
            width={90} 
            height={60} 
            className='pb-8'
          />
          </span>
      </div>
    </CardHeader>
    <CardContent>
      <p>A sign in link has been sent tp your email address</p>
    </CardContent>
    <CardFooter>
     
    </CardFooter>
  </Card>
  )
}

export default validatePage;
