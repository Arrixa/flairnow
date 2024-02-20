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
  const fileBuffer = await file.arrayBuffer();

  const session = await getServerSession(authOptions);
  const clientId = session?.clientUser?.clientId;
  const domain = session?.user?.userDomain;

  if (!clientId) {
    return NextResponse.json({ message: 'Client ID not found in session. Please sign in again' }, { status: 401 });
  }

  var mime = file.type; 
  var encoding = 'base64'; 
  var base64Data = Buffer.from(fileBuffer).toString('base64');
  var fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

  try {
    const uploadToCloudinary = () => {
      return new Promise<CloudinaryResponse>((resolve, reject) => {
        cloudinary.uploader.upload(fileUri, {
          tags: ['flairnow-profile-photo'],
          public_id: domain,
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
    await prisma.client.update({
      where: { id: clientId },
      data: { logo: cloudinaryResponse.secure_url },
    });

    const logoUrl = cloudinaryResponse.secure_url;

    return NextResponse.json({ logoUrl, message: 'Successfully uploaded', data: cloudinaryResponse }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Image upload failed' }, { status: 500 });
  }
}