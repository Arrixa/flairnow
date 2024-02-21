import '@/app/globals.css'
import {
   Body,
   Container,
   Head,
   Heading,
   Hr,
   Html,
   Img,
   Link,
   Preview,
   Tailwind,
   Text,
} from '@react-email/components'
import React from 'react';
import { TextParams } from '@/lib/interfaces';

export function MagicLinkEmail({ url, host }: TextParams) {
   const previewText = `Signin with your email.`

   return (
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
        <Tailwind>
          <Body className="font-sans">
            <Container className="border border-solid border-zinc-400 rounded-md bg-zinc-50 p-4 max-w-xl">
              <Img src="https://res.cloudinary.com/dsbvy1t2i/image/upload/f_auto,q_auto/iwg6nqtxumw3jmutws5l" alt="FlairNow" className="w-3/4 my-2" />
              <Heading className="text-2xl text-zinc-900 mb-4">Let&apos;s get you signed in</Heading>
              <Text className="text-zinc-900 mb-4">We use this easy sign-in link so you don&apos;t have to remember or type in yet another long password.</Text>
              <Container className="mb-4">
                <Link href={url} target="_blank" className="inline-block p-3 bg-zinc-900 hover:bg-zinc-800 text-white text-lg rounded-md no-underline">Click here to sign in</Link>
              </Container>
              <Text className="text-zinc-600 mb-4">If you didn&apos;t try to log in, you can safely ignore this email.</Text>
              <Text>Read our &nbsp;
                <Link href={`https://${host}/terms`} target="_blank" className="text-zinc-900 no-underline">terms</Link>&nbsp; & &nbsp;
                <Link href={`https://${host}/policy`} target="_blank" className="text-zinc-900 no-underline">privacy</Link>
              </Text>
              <Hr className="border border-solid border-zinc-500 my-4" />
              <Text className="text-xs text-zinc-500/75">© {new Date().getFullYear()} FlairNow. All Rights Reserved.</Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  }

//    return (
//       <Html>
//          <Head />
//          <Preview>{previewText}</Preview>
//          <Tailwind>
//             <Body className="font-sans flex items-center justify-center flex-col my-2 mx-auto w-full">
//                <Container className="border border-solid border-zinc-400 rounded-md bg-zinc-50 mx-auto flex items-center justify-center flex-col gap-y-4 w-full">
//                   <Heading className="mt-0 text-zinc-900 p-4 mx-auto text-center">
//                      Let&apos;s get you signed in
//                   </Heading>
//                   <Text className="text-justify text-zinc-950 p-8 text-lg">
//                      We use this easy sign-in link so you don&apos;t have to remember
//                      or type in yet another long password.
//                   </Text>
//                   <Container className='mx-auto w-full text-center'>
//                         <Link
//                            href={url}
//                            target='_blank'
//                            className='px-6 bg-zinc-900 hover:bg-zinc-800 text-zinc-50 rounded-md border p-4 text-lg text-center' 
//                         >
//                            Click here to sign in
//                         </Link>
//                   </Container>
//                   <Text className="text-justify text-zinc-950 p-4 text-lg">
//                      If you didn&apos;t try to log in, you can safely ignore this
//                      email.
//                   </Text>
//                   <Hr className="border border-solid border-zinc-500 my-4 mx-0 w-full" />
//                   <Img src="https://res.cloudinary.com/dsbvy1t2i/image/upload/f_auto,q_auto/iwg6nqtxumw3jmutws5l" alt="FlairNow" className='my-2 p-2'/>
//                   <Text className="text-xs text-zinc-500/75 p-4">
//                      © {new Date().getFullYear()} FlairNow. All Rights Reserved.
//                   </Text>
//                </Container>
//             </Body>
//          </Tailwind>
//       </Html>
//    )
// }
