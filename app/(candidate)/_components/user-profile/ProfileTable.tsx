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

  useEffect(() => {
    console.log("Image URL updated:", imageUrl);
  }, [imageUrl]);

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
          <TableRow className="">
            <TableHead className="w-1/2 pl-10 align-bottom pb-3">Profile image</TableHead>
            <TableCell className="w-1/2 text-left">
              <div className="w-full flex flex-row items-center align-bottom">
                <div className=''>
                  <CldImage alt='profile image' src={imageUrl} width={80} height={80} className='rounded-full object-cover' />
                </div>
                <div className='mb-8 align-top'>
                  <AddPhoto setImgUrl={setImgUrl} />
                </div>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/2 pl-10">First name:</TableHead>
            <TableCell className="w-1/2 text-left">{user?.firstName}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/2 pl-10">Last name:</TableHead>
            <TableCell className="w-1/2 text-left">{user?.lastName}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/2 pl-10">Email:</TableHead>
            <TableCell className="w-1/2 text-left">{user?.email}</TableCell>
          </TableRow>
          <TableRow></TableRow>
        </TableBody>
      </Table>
    </>
  )
}

export default UserProfile;
