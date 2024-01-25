import Image from "next/image";

export default function Home() {
  return (
    <main className="p-10">
      <div className='flex items-center justify-center h-20 p-5'>
        <Image
          src="/FlairNow-Logo-Full.svg"
          alt="Image"
          width={300} 
          height={50}
        />
      </div>
    </main>
  )
}
