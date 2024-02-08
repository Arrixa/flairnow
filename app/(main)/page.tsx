import renderLogo from "../components/common/logos/LogoFull";

export default function Home() {
  return (
    <main className="p-10">
      <div className='flex items-center justify-center'>
        {renderLogo()}
      </div>
    </main>
  )
}
