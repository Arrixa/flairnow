import React from 'react'
import NavBar from '@/app/components/nav/NavBar';

const mainLayout = async ({ 
  children,
  }: {
    children: React.ReactNode
  }) => {

 
  
  return (
    <div className="flex">
      <main className="flex-grow">
        <NavBar />
        {children}
        </main>
    </div>
  );
};

export default mainLayout
