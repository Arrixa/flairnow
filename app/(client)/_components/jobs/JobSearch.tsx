import { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Search } from 'lucide-react';

const JobSearch = ({ jobsData }) => {
  // const [jobsData, setJobsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search input change
  const handleSearchInputChange = (event:React.UIEvent<HTMLFormElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchQuery(event.target.value)
    // Handle search submission logic here
  };

  // Function to filter jobs data based on search query
  //const filteredJobsData = jobsData?.filter((job) =>
  //  job.title.toLowerCase().includes(searchQuery.toLowerCase())
  //);

  return (
    <form onSubmit={handleSearchSubmit} className='flex flex-row items-center p-2'>
        <input 
            type="search" 
            placeholder="Search job postings..." autoFocus
            value={searchQuery} 
            onChange={handleSearchInputChange} 
        />
        <Button variant='link' type="submit"><Search size={24} /> &nbsp;</Button>
    </form>
  );
};

export default JobSearch;

/*
    <Input
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Search job titles..."
    />
    <form onSubmit={handleSearchSubmit} className='flex flex-row items-center p-2'>
            <Input type="search" placeholder="Search job postings..." autoFocus />
            <Button variant='link' type="submit"><Search size={24} /> &nbsp;</Button>
          </form>

            
*/