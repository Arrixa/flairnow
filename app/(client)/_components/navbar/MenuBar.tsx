'use client'
import { useState } from 'react';
import { Search } from 'lucide-react';
import NotificationDrawer from './NotificationDrawer';
import HelpDrawer from './HelpDrawer';
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"

const MenuBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle search submission logic here
  };

  return (
    <nav className="fixed top-0 right-0 p-2">
      {isSearchOpen ? (
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
          <Input type="search" placeholder="Search FlairNow..." onBlur={closeSearch} autoFocus />
          <Button variant='flairnowOutline' type="submit"><Search /></Button>
        </form>
      ) : (
        <div className="flex items-center space-x-2">
          <Button variant='flairnowOutline' onClick={openSearch}><Search /></Button>
          <Button variant='flairnowOutline'><NotificationDrawer /></Button>
          <Button variant='flairnowOutline'><HelpDrawer /></Button>
        </div>
      )}
    </nav>
  );
};

export default MenuBar;
