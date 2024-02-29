import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { Plus, LayoutList, LayoutGrid } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/app/components/ui/toggle-group'

async function getData() {
  try {
    // Fetch data from your API endpoint
    const response = await fetch('http://localhost:3000/api/recruitment/job-posting');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } 
    // Read the response body as text
    const responseBody = await response.text();

    // Check if the body is empty
    if (!responseBody) {
      throw new Error('Empty response received');
    }

    // Parse the response body as JSON
    const data = JSON.parse(responseBody);

    // Continue processing the data
    return data;
  } catch (error) {
    console.error('Error fetching job data:', error);
  }
};
 
const Page = async () => {
  const data = await getData();
  console.log(data, 'Jobs fetched values');

  return (
    <main className='flex flex-col items-left w-full lg:p-10 md:p-6 p-4'>
      <h1 className="text-3xl text-left font-semibold my-4 pt-8">Recruitment dashboard</h1>
      {/* Example: Link to create a new job */}
      <Card className='w-fit'>
        <Link href="/dashboard/recruitment/jobs/create">
          <CardContent className='flex p-2 '>
            Create a new job posting &nbsp;<Plus /> 
          </CardContent>
        </Link>
      </Card>
      <Card className='flex items-center justify-between mt-2'>
        <CardHeader>
          <CardTitle>Job postings</CardTitle>
          <CardDescription>Manage your job postings</CardDescription>
        </CardHeader>
        <CardContent className=''>
          <ToggleGroup type="single">
            <ToggleGroupItem value="bold" aria-label="Toggle list view">
              List view &nbsp;<LayoutList />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle grid view">
              Grid view &nbsp;<LayoutGrid />
            </ToggleGroupItem>
          </ToggleGroup>
        </CardContent>
      </Card>
      <Card className='mt-2'>
      {/* Example: Link to view job details by ID */}
        <Link href={`/dashboard/recruitment/jobs/${data.id}`}>
          <CardContent>Click me</CardContent>
        </Link>
      </Card>

    </main>
  )
};

export default Page;
