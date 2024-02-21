"use client";
import { Separator } from "@/app/components/ui/separator";
import { CldImage } from "next-cloudinary";
import { UserCardProps } from "@/lib/interfaces";
import { capitaliseFirstLetter } from '@/lib/capitiliseFirstLetter';

const UserCard: React.FC<UserCardProps> = ({ session, isMenuOpen }) => {
  const user = session?.user;

  const cloudinaryBaseURL = 'https://res.cloudinary.com/dsbvy1t2i/image/upload/';
  const cloudinaryImageId = session?.user.id; 
  const imageUrl = `${cloudinaryBaseURL}v1707912829/${cloudinaryImageId}.png`;
  const defaultImg = 'DefaultProfileImg';

  return (
    <div className="bg-muted h-[100px] pt-2">
      {isMenuOpen ? (
        <div className="flex flex-row space-x-2 p-2 ml-4">
          <div className="">
            <h4 className="text-lg font-sm text-foreground min-w-fit">{`${user?.firstName} ${user?.lastName}`}</h4>
            <Separator className="text-foreground" />
            <p className="text-foreground">{`${user?.userDomain ? capitaliseFirstLetter(user?.userDomain) : ''}`}</p>
          </div>
          <div className="flex items-center justify-center">
            <CldImage alt='profile image' src={imageUrl ? imageUrl : defaultImg} width={50} height={50} className='rounded-full' />
          </div>
        </div>
      ):(
        <div className="ml-2 mt-5">
          <CldImage alt='profile image' src={imageUrl ? imageUrl : defaultImg} width={50} height={50} className='rounded-full' />
        </div>
      )}
    </div>
  )
}
export default UserCard