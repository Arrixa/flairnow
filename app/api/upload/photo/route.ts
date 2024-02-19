import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/utils/authOptions";
import { CloudinaryResponse } from '@/lib/interfaces';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const cloudinaryUploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudinaryCloudName || !cloudinaryUploadPreset) {
    return NextResponse.json({ message: 'Cloudinary credentials not provided' }, { status: 401 });
  }

  const contentType = request.headers.get('content-type');
  if (!contentType || !contentType.startsWith('multipart/form-data')) {
    return NextResponse.json({ message: 'Invalid content type' }, { status: 415 });
  }

  const formData = await request.formData();
  const file = formData.get('image') as File;

  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ message: 'User ID not found in session. Please sign in again' }, { status: 401 });
  }

  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    return NextResponse.json(
      { message: 'User not found. Cannot update image URL.' },
      { status: 404 }
    );
  }
// Adjusted code based on suggestion from Cloudinary support
// https://community.cloudinary.com/discussion/432/image-upload-from-api-route-on-cloudinary-works-on-localhost-but-not-on-vercel-production
  try {
    const fileBuffer = await file.arrayBuffer();
    const mime = file.type;
    const encoding = 'base64';
    const base64Data = Buffer.from(fileBuffer).toString('base64');
    const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

    const uploadToCloudinary = () => {
      return new Promise<CloudinaryResponse>((resolve, reject) => {
        cloudinary.uploader.upload(fileUri, {
          tags: ['flairnow-profile-photo'],
          public_id: userId,
        })
          .then((result) => {
            console.log(result);
            resolve(result as CloudinaryResponse);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    };

    const cloudinaryResponse = await uploadToCloudinary();

    // Update user in Prisma with Cloudinary image URL
    await prisma.user.update({
      where: { id: userId },
      data: { image: cloudinaryResponse.secure_url },
    });

    const photoUrl = cloudinaryResponse.secure_url;

    // Handle successful upload
    return NextResponse.json({ photoUrl, message: 'Successfully uploaded', data: cloudinaryResponse }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: 'Image upload failed', error: error.message }, { status: 500 });
  }
}

//Original version, but not working in deployment
/*
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/utils/authOptions";
import { CloudinaryResponse } from '@/lib/interfaces';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const cloudinaryUploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudinaryCloudName || !cloudinaryUploadPreset) {
    return NextResponse.json({ message: 'Cloudinary credentials not provided' }, { status: 401 });
  }

  const contentType = request.headers.get('content-type');
  if (!contentType || !contentType.startsWith('multipart/form-data')) {
    return NextResponse.json({ message: 'Invalid content type' }, { status: 415 });
  }

  const formData = await request.formData();
  console.log(formData, 'formData value')
  // const file = formData.getAll('image');
  const file = formData.get('image') as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  console.log(session, userId, 'session and user id in upload photo route')

  if (!userId) {
    return NextResponse.json({ message: 'User ID not found in session. Please sign in again' }, { status: 401 });
  }

  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });
  
  if (!existingUser) {
    return NextResponse.json(
      { message: 'User not found. Cannot update image URL.' },
      { status: 404 }
    );
  }

  try {
    const cloudinaryResponse = await new Promise<CloudinaryResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream({
        tags: ['flairnow-profile-photo'],
        public_id: userId
      }, function (error, result) {
        if (error) {
          reject(error);
          return;
        }
        resolve(result as CloudinaryResponse);
      })
      .end(buffer);
    })
    console.log(cloudinaryResponse);

    // Update user in Prisma with Cloudinary image URL
    await prisma.user.update({
      where: { id: userId },
      data: { image: cloudinaryResponse.secure_url },
    });

    const photoUrl = cloudinaryResponse.secure_url;

    // Handle successful upload
    return NextResponse.json({ photoUrl, message: 'Successfully uploaded', data: cloudinaryResponse }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Image upload failed in catch' }, { status: 500 });
  }
}
*/ 