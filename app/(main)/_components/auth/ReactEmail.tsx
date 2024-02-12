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
            <Body className="flex items-center justify-center flex-col my-2 mx-auto w-full max-w-lg">
               <Container className="border border-solid border-zinc-400 rounded-md bg-zinc-50 mx-auto p-6 flex items-center justify-center flex-col gap-4">
                  <Heading className="mt-0 text-zinc-900 p-4 mx-auto text-center">
                     <Img src="https://res.cloudinary.com/dsbvy1t2i/image/upload/f_auto,q_auto/iwg6nqtxumw3jmutws5l" alt="FlairNow" />
                     Let&apos;s get you signed in
                  </Heading>
                  <Text className="text-justify text-zinc-950 p-4 text-lg">
                     We use this easy sign-in link so you don&apos;t have to remember
                     or type in yet another long password.
                  </Text>
                  <Container className='mx-auto w-full text-center'>
                        <Link
                           href={url}
                           target='_blank'
                           className='px-6 bg-zinc-900 hover:bg-zinc-800 text-zinc-50 rounded-md border p-4 text-lg text-center' // Removed text-left class
                        >
                           Click here to sign in
                        </Link>
                  </Container>
                  <Text className="text-justify text-zinc-950 p-4 text-lg">
                     If you didn&apos;t try to log in, you can safely ignore this
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
