'use client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { CldImage } from 'next-cloudinary';
import AddPhoto from '@/app/components/common/AddPhoto';
import { UserInfo } from '@/lib/interfaces';

const UserProfile = ({ user }: UserInfo) => {
  const cloudinaryBaseURL = 'https://res.cloudinary.com/dsbvy1t2i/image/upload/';
  const cloudinaryImageId = user.id; 
  const imageUrl = `${cloudinaryBaseURL}v1707912829/${cloudinaryImageId}.png`;
  const defaultImg = '/default/Avatar.png';
  return (
    <>
      <Table className="w-full space-x-10">
        <TableCaption>
        </TableCaption>
        <TableHeader>
          <TableRow>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableHead className="w-1/2 pl-10">Profile image</TableHead>
            <TableCell className="w-1/2 text-left pl-10">
              <div className="w-full flex flex-row items-center justify-between align-middle">
                <div className=''>
                  <CldImage alt='profile image' src={imageUrl ? imageUrl : defaultImg} width={100} height={100} className='rounded-full' />
                </div>
                <div className='w-3/4 mt-6 text-md ml-4'>
                  <AddPhoto  />
                </div>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/2 pl-10">First name:</TableHead>
            <TableCell className="w-1/2 text-left pl-10">{user?.firstName}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/2 pl-10">Last name:</TableHead>
            <TableCell className="w-1/2 text-left pl-10">{user?.lastName}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/2 pl-10">Email:</TableHead>
            <TableCell className="w-1/2 text-left pl-10">{user?.email}</TableCell>
          </TableRow>
          <TableRow></TableRow>
        </TableBody>
      </Table>
    </>
  )
}

export default UserProfile

{/* <TableRow>
<TableHead className="w-1/3">Profile image:</TableHead>
  <TableCell className="lg:w-1/2 w-full text-left px-12 flex justify-between items-center align-bottom">
  <CldImage alt='profile image' src={imageUrl} width={100} height={100} className='rounded-full' />

  {user.id ? (
    <div className='ml-2'>
      <CldImage alt='profile image' src={imageUrl} width={50} height={50} className='rounded-full' />
    </div>
     ) : (
      <div className='ml-2'>
      <Image alt='profile image' src='/default/Avatar.png' width={50} height={50}  className='rounded-full'/>
    </div>
    )} 
    <div className='mt-6 text-md w-1/3'>
      <AddPhoto  />
    </div>
  </TableCell>
</TableRow> 

                <Avatar>
                  <AvatarImage src={imageUrl} className='w-[50px] h-[50px] object-fill' />
                  <AvatarFallback>FN</AvatarFallback>
                </Avatar>*/}