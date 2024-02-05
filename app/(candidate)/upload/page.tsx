import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import { Button } from '@/app/components/ui/button';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

interface CloudinaryResource {
  context?: {
    alt?: string;
    caption?: string;
  };
  public_id: string;
  secure_url: string;
}

const fileUpload = async () => {

  async function create(formData: FormData) {
    'use server'
    const file = formData.get('image') as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({
        tags: ['nextjs-server-actions-upload-sneakers']
      }, function (error, result) {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      })
      .end(buffer);
    });
    revalidatePath('/')
  }

  return (
    <div>
       <h2 className="text-xl font-bold mb-4">Add a profile photo</h2>
      <form action={create} className="bg-white border border-slate-200 dark:border-slate-500 rounded p-6 mb-6">
        <p className="mb-6">
          <label htmlFor="image" className="block font-semibold text-sm mb-2">
            Select an image to upload
          </label>
          <input
            id="image"
            className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="file"
            name="image"
            required
          />
        </p>
        <Button>Submit</Button>
      </form>
    </div>
  )
}

export default fileUpload
