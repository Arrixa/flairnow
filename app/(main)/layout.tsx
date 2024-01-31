import React from 'react'
import NavBar from './_components/nav/NavBar';

const mainLayout = ({ 
  children,
  }: {
    children: React.ReactNode
  }) => {

  // const session = await getServerSession(authOptions);
  
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
