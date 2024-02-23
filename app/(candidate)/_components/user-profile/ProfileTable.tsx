'use client'
import { Button } from '@/app/components/ui/button';
import { CldImage } from 'next-cloudinary';
import AddPhoto from '@/app/components/common/AddPhoto';
import { UserInfo } from '@/lib/interfaces';
import { useState, useEffect } from "react";
import {  Card,  CardContent,  CardDescription,  CardFooter,  CardHeader,  CardTitle,  } from "@/app/components/ui/card"
import { Label } from '@/app/components/ui/label';

const UserProfile: React.FC<UserInfo> = ({ user, setIsEditMode }) => {
  const image = user.image;
  const cloudinaryImageId = user.id; 
  const defaultImg = 'https://res.cloudinary.com/dsbvy1t2i/image/upload/v1707912829/DefaultProfileImg.png';
  const imageCloudUrl = `https://res.cloudinary.com/dsbvy1t2i/image/upload/v1707912829/${cloudinaryImageId}.png`;
  const [imageUrl, setImgUrl] = useState<string>(imageCloudUrl || defaultImg);


  useEffect(() => {
    if (image) {
      setImgUrl(imageCloudUrl);
    } else {
      setImgUrl(defaultImg);
    }
  }, [image, imageCloudUrl]);

  useEffect(() => {
    console.log("Image URL updated:", imageUrl);
  }, [imageUrl]);

  return (
    <article className='flex flex-col w-full'>
      {/* FTM-2 / FTM-19 2. Banner with image & name */}
      <Card className='my-2 p-2 pt-4'>
        <CardContent>
          <div className="w-full flex flex-row items-center align-bottom">
            <div className=''>
              <CldImage alt='FN' src={imageUrl} width={80} height={80} className='rounded-full object-cover bg-brand' />
            </div>
            <div className='mb-8 align-top'>
              <AddPhoto setImgUrl={setImgUrl} />
            </div>
          </div>
        </CardContent>
        <div className='flex flex-col md:flex-row justify-between'>
          <CardHeader>
            <CardTitle>{user?.firstName}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
          </CardHeader>
          <CardFooter className='flex-end'>
            <Button
              className='w-fit mt-2 text-md'
              onClick={() => setIsEditMode(true)}
            >
              Edit profile
            </Button>
          </CardFooter>
        </div>
      </Card>
      {/* FTM-2 / FTM-19 3. User information */}
      <Card className='my-2 p-2 pt-4'>
        <CardContent className=''>
          <Label className="" htmlFor="firstName">First name</Label>
          <p>{user?.firstName}</p>
        </CardContent>
        <CardContent>
          <Label className="" htmlFor="lastName">Last name</Label>
          <p>{user?.lastName}</p>
        </CardContent>
        <CardContent>
          <Label className="" htmlFor="email">Email</Label>
          <p>{user?.email}</p>
        </CardContent>
        
      </Card>
    </article>
  )
}

export default UserProfile;
