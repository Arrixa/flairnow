import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryResponse {
  public_id: string;
  secure_url: string;
}

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
  const userId = session?.user.id || null;

  if (!userId) {
    return NextResponse.json({ message: 'User ID not found in session. Please sign in again' }, { status: 401 });
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

    // Update user in Prisma with Cloudinary image URL
    await prisma.user.update({
      where: { id: userId },
      data: { image: cloudinaryResponse.secure_url },
    });

    // Handle successful upload
    return NextResponse.json({ message: 'Successfully uploaded', data: cloudinaryResponse }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Image upload failed in catch' }, { status: 500 });
  }
}

      // // Check if user email exists
      // const existingUserByEmail = await prisma.user.findUnique({
      //   where: {
      //     email: user.email
      //   }
      // })
      // if (!existingUserByEmail) {
      //   return NextResponse.json({ user: null, message: "Please signin with a email link before creating an account"})
      // }
      // const updateUser = await prisma.user.update({
      //     where: {
      //       id: existingUserByEmail.id,
      //     },
      //     data: {
      //       ...user,
      //     },
      //   });


  // const cloudinaryUploadUrl = `https://api-eu.cloudinary.com/v1_1/${cloudinaryCloudName}/upload`;

  // const formData = new FormData();

  // // Create a Blob from the provided fileBuffer
  // const blob = new Blob([fileBuffer], { type: 'image/png' });

  // // Append the file to the FormData with the key 'file'
  // formData.append('file', blob, 'file');
  // formData.append('upload_preset', cloudinaryUploadPreset);

      // // Perform the Cloudinary upload using fetch
    // const cloudinaryResponse = await cloudinary.uploader.upload(formData.get('file') as string, {
    //   upload_preset: cloudinaryUploadPreset,
    // });




// import { v2 as cloudinary } from 'cloudinary';

// export async function POST(fileBuffer: Buffer, response: NextResponse) {
//   const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
//   const cloudinaryUploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

//   if (!cloudinaryCloudName || !cloudinaryUploadPreset) {
//     return NextResponse.json({ message: 'Cloudinary credentials not provided' }, { status: 401 });
//   }

//   const cloudinaryUploadUrl = `https://api-eu.cloudinary.com/v1_1/${cloudinaryCloudName}/upload`;

//   const formData = new FormData();
  
//   const blob = new Blob([fileBuffer], { type: 'image/png' });

//   formData.append('file', blob, 'file'); 
//   formData.append('upload_preset', cloudinaryUploadPreset);

//   try {
//     const response = await fetch(cloudinaryUploadUrl, {
//       method: 'POST',
//       body: formData,
//       headers: {
//         // Specify the Content-Type header
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     if (!response.ok) {
//       return NextResponse.json({ message: 'Image upload failed' }, { status: 500 });
//     }

//     return NextResponse.json({message: 'Successfully uploaded'}, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ message: 'Image upload failed' }, { status: 500 });
//   }
// }


/*
export const config = {
  api: {
    bodyParser: false,
  },
};

async function getFileData(request: NextRequest) {

  const contentType = request.headers.get('content-type');
  if (contentType && contentType.startsWith('multipart/form-data')) {
    const formData = await request.formData();
    console.log(formData, 'formData value')
    const files = formData.getAll('uploadedFile');
    console.log(files, 'files')
    return { fields: {}, files: { uploadedFile: files } };
  } else {
    throw new Error('Invalid content type');
  }
}

export async function POST(request: NextRequest) {
  if (request.method !== 'POST') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  try {
    const { fields, files } = await getFileData(request);
    console.log('request', request.body, fields, files)

    const myFiles = files.uploadedFile as any; 
    console.log(myFiles, 'myFiles')

    let file;
    if (myFiles && myFiles.length > 0) {
      file = myFiles[0]; 
      console.log(file, 'file from myFiles[0]')

      // const fileBuffer = await fs.readFile(file.path);
      const fileBuffer = await file.arrayBuffer();
      console.log(fileBuffer, 'fileBuffer')
      const uploadedImage = await uploadToCloudinary(fileBuffer);

      if (!uploadedImage) {
        return NextResponse.json({ message: 'Image upload failed' }, { status: 500 });
      }
    } else {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const file_uploaded = await prisma.file.create({
      data: {
        filename: file.name,
        fileType: file.type,
        fileSize: file.size,
      },
    });

    if (!file_uploaded) {
      return NextResponse.json({ message: 'File upload failed' }, { status: 500 });
    } else {
      return NextResponse.json(file_uploaded, { status: 201 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}



async function uploadToCloudinary(fileBuffer: Buffer) {
  const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dsbvy1t2i/image/upload';
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudinaryUrl || !uploadPreset) {
    throw new Error('Cloudinary credentials are missing');
  }

  const cloudinaryResponse = await fetch(cloudinaryUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      file: fileBuffer.toString('base64'),
      upload_preset: uploadPreset,
    }),
  });

  const cloudinaryData = await cloudinaryResponse.json();

  if (cloudinaryData.error) {
    throw new Error(`Cloudinary upload failed: ${cloudinaryData.error.message}`);
  }

  return cloudinaryData;
}

*/