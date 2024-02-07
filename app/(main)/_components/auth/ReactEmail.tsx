interface TextParams {
  url: string;
  host: string;
}

import '@/app/globals.css'
import {
   Body,
   Button,
   Column,
   Container,
   Head,
   Heading,
   Hr,
   Html,
   Img,
   Link,
   Preview,
   Row,
   Section,
   Tailwind,
   Text,
} from '@react-email/components'
import React from 'react'

interface Props {
   name?: string
   code?: string
}

export function MagicLinkEmail({ url, host }: TextParams) {
   const previewText = `Signin with your email.`

   return (
      <Html>
         <Head />
         <Preview>{previewText}</Preview>
         <Tailwind>
            <Body className="my-auto mx-auto w-full max-w-lg bg-background">
               <Container className="border border-solid border-zinc-500 rounded-md mx-auto p-6">
                  {/* Add Cloudinary image link */}
                  {/* <Img src="./logos/FlairNow-Logo-Full.png" alt="FlairNow Logo" /> */}
                  <Heading className="mt-0 text-zinc-900 p-4" >Let&apos;s get you signed in</Heading>
                  <Text className="text-justify text-zinc-950 p-4">
                     We use this easy sign in link so you don&apos;t have to remember
                     or type in yet another long password.
                  </Text>
                  <Button className="ml-4">
                    <Link
                      href={url}
                      target='_blank'
                      className='px-6 bg-zinc-900 hover:bg-zinc-800 text-zinc-50 rounded-md border p-4 text-md text-center'
                    >
                      Click here to sign in
                    </Link>
                  </Button>
                  <Text className="text-justify text-zinc-950 p-4">
                     If you didn&apos;t try to login, you can safely ignore this
                     email.
                  </Text>
                  <Hr className="border border-solid border-zinc-500 my-4 mx-0 w-full" />
                  <Text className="text-xs text-zinc-500/75 p-4">
                     © {new Date().getFullYear()} FlairNow. All Rights Reserved.
                  </Text>
               </Container>
            </Body>
         </Tailwind>
      </Html>
   )
}
