"use client"
import Image from "next/image";
import { Button } from "../components/ui/button";
import { useSession } from "next-auth/react";
import AddFile from "../components/common/AddFile";
import { useEffect, useState } from "react";

interface File {
  id: string;
  filename: string;
  fileType: string;
  fileSize: number;
  downloadCount: number;
  filePath: string;
  createdAt: number;
}

export default function Home() {
  const { data: session, update } = useSession();
  // Only works if you add if(trigger === 'update'){ return {...token, ...session}} to the JWT callback in nextauth route
  async function updateSession() {
    await update({
      ...session?.user,
      username: "UPDATE SESSION"
    })
  }
  const [files, setFiles] = useState<File[]>([]);

  const fetchFiles = async () => {
    try {
      const response = await fetch("/api/files");
      const data = await response.json();
      console.log('data', data)
      setFiles(data);
      // Sort Files by createdAt in descending order
      // const sortedFiles: File[] = data.sort(
      //   (a: File, b: File) =>
      //   new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      //   );
      // setFiles(sortedFiles);
      // console.log('Trying to fetch', sortedFiles)
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);


  return (
    <main className="p-10">
      <div className='flex items-center justify-center'>
        <Image
          src="/FlairNow-Logo-Full.svg"
          alt="Image"
          // fill={true}
          width={300}
          height={100}
        />
        <AddFile fetchFiles={fetchFiles} />
        {/* How to update session on the client side */}
        {/* <div>
          <Button variant='flairnow' onClick={updateSession}>
            Update session
          </Button>
          <Button variant='flairnow' onClick={() => console.log({ session })}>
            Log session
          </Button>
        </div> */}
      </div>
    </main>
  )
}
