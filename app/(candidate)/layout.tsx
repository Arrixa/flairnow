import { Navbar } from "flowbite-react"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {

return (
  <div className="flex">
    <main className="flex">
      <Navbar />
      {children}
    </main>
  </div>
)
}