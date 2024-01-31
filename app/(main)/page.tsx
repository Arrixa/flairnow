import Image from "next/image";
import NavBar from "./_components/nav/NavBar";

export default function Home() {
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
      </div>
    </main>
  )
}
