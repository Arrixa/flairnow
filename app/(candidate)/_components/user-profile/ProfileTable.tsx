'use client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { CldImage } from 'next-cloudinary';
import AddPhoto from '@/app/components/common/AddPhoto';
import { UserInfo } from '@/lib/interfaces';
import { useState, useEffect } from "react";

const UserProfile = ({ user }: UserInfo) => {
  const image = user.image;
  const cloudinaryImageId = user.id; 
  const defaultImg = 'https://res.cloudinary.com/dsbvy1t2i/image/upload/v1707912829/DefaultProfileImg.png';
  const imageCloudUrl = `https://res.cloudinary.com/dsbvy1t2i/image/upload/v1707912829/${cloudinaryImageId}.png`;
  const [imageUrl, setImgUrl] = useState<string>(defaultImg);


  useEffect(() => {
    if (image && image !== null) {
      setImgUrl(imageCloudUrl);
    } else {
      setImgUrl(defaultImg);
    }
  }, [image, imageCloudUrl]);

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
                  <CldImage alt='profile image' src={imageUrl} width={100} height={100} className='rounded-full' />
                </div>
                <div className='w-3/4 mt-6 text-md ml-4'>
                  <AddPhoto setImgUrl={setImgUrl} />
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

export default UserProfile;
