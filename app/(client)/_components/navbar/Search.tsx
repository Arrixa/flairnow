import React from 'react';
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Search } from 'lucide-react';

const SearchComp = () => {
  return (
    <>
      <Input type="search" placeholder="Search FlairNow..." />
      <Button type="submit"><Search /></Button>
    </>
  )
}

export default SearchComp
