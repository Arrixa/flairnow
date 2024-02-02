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
            <Body className="my-auto mx-auto w-full max-w-lg">
               <Container className="border border-solid border-neutral-500/25 rounded mx-auto p-6">
                  <Heading className="mt-0">Let&apos;s get you signed in</Heading>
                  <Text className="text-justify">
                     We use this easy signin link so you don&apos;t have to remember
                     or type in yet another long password.
                  </Text>
                  <Button className="w-auto rounded-lg px-6">
                    <Link
                      href={url}
                      target='_blank'
                      className=''
                    >
                      Click here to sign in with this magic link
                    </Link>
                  </Button>
                  <Text className="text-justify">
                     If you didn&apos;t try to login, you can safely ignore this
                     email.
                  </Text>
                  <Hr className="border border-solid border-neutral-500/10 my-4 mx-0 w-full" />
                  <Text className="text-xs text-neutral-500/75">
                     © {new Date().getFullYear()} FlairNow. All Rights Reserved.
                  </Text>
               </Container>
            </Body>
         </Tailwind>
      </Html>
   )
}
