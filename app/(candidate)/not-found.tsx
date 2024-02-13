import Link from "next/link";
import { Button } from "../components/ui/button";
import { Card, CardDescription, CardFooter, CardTitle } from "../components/ui/card";
import renderLogo from '../components/common/logos/LogoFull'

const NotFoundPage: React.FC = () => {
  return (
    <Card className="p-6 my-20 flex items-center justify-center flex-col bg-background w-2/3 lg:w-1/3 mx-auto">
      <CardTitle className="text-4xl py-6 text-center">Page not found</CardTitle>
      <CardDescription className="text-lg text-center">Sorry, the page you are looking for does not exist.</CardDescription>
      <Button className='mb-6 mt-8'>        
        <Link className='text-lg text-center flex items-center' href='/'>
          Return to home
        </Link>
      </Button>
      <CardFooter className="mx-auto">
        <Link href='/'>
          <span className="p-6">
            {renderLogo()}
          </span>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NotFoundPage;