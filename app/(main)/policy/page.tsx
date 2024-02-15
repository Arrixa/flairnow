import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/app/components/ui/card'

const Policy = () => {
  return (
    <Card className="p-6 my-20 flex items-center justify-center flex-col bg-background w-2/3 lg:w-1/3 mx-auto">
      <CardTitle className="text-4xl py-6 text-center">FlairNow user usage policy</CardTitle>
      <CardDescription className="text-lg text-center">By using our website you agree to our usage policy</CardDescription>
      <CardContent>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, ratione saepe, fugit, ex nisi amet eius magnam itaque quam unde eos quisquam error distinctio laboriosam culpa. Hic veritatis mollitia deleniti optio! Dicta, recusandae? Enim, fugit a quam similique cum vitae, unde illo, eos laborum aliquid impedit saepe! Sint, numquam, obcaecati ducimus aspernatur ab a dolore sunt illo perferendis, totam similique voluptatibus? Ex, quas! Molestiae ipsum sapiente aliquam quas vero veniam culpa impedit necessitatibus officiis ut natus maxime, earum et magni veritatis suscipit illum repudiandae alias beatae tempore ratione. Omnis, vitae unde quod aut accusantium nisi tenetur veniam. Nemo, excepturi aperiam.
        </p>
      </CardContent>
    </Card>
  )
}

export default Policy
