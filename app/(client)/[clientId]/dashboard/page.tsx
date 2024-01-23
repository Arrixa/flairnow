import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

const page = async () => {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <div>
      Admin only page
    </div>
  )
}

export default page
