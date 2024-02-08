import renderLogo from "../components/common/logos/Logo-Full";

export default function Home() {
  return (
    <main className="p-10">
      <div className='flex items-center justify-center'>
        {renderLogo()}
      </div>
    </main>
  )
}
