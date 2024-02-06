import Image from "next/image";

export default function Home() {
  return (
    <main className="p-10">
      <div className='flex items-center justify-center'>
        <Image
          src="/FlairNow-Logo-Full.svg"
          alt="Image"
          width={300}
          height={100}
        />
      </div>
    </main>
  )
}
