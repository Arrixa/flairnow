
"use client"
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { FileInfo } from '@/lib/interfaces'


const UploadFile = () => {
  const [files, setFiles] = useState<FileInfo[]>([])

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <>
    <div className='p-16 mt-10 border border-input'>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag & drop some files here, or click to select files</p>
      }
    </div>

    </>
  )
}

export default UploadFile;


// const UploadFile = () => {
//   const [files, setFiles] = useState([])
//   const [rejected, setRejected] = useState([])

//   const onDrop = useCallback(
//     (
//       acceptedFiles, rejectedFiles
//     ) => {
//     if (acceptedFiles?.length) {
//       setFiles(previousFiles => [
//         ...previousFiles,
//         ...acceptedFiles.map(file =>
//           Object.assign(file, { preview: URL.createObjectURL(file) })
//         )
//       ])
//     }

//     if (rejectedFiles?.length) {
//       setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
//     }
//   }, [])

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: {
//       'image/*': []
//     },
//     maxSize: 1024 * 1000,
//     onDrop
//   })

//   // useEffect(() => {
//   //   // Revoke the data uris to avoid memory leaks
//   //   return () => files.forEach(file => URL.revokeObjectURL(file.preview))
//   // }, [files])

//   // const removeFile = name => {
//   //   setFiles(files => files.filter(file => file.name !== name))
//   // }

//   // const removeAll = () => {
//   //   setFiles([])
//   //   setRejected([])
//   // }

//   const handleSubmit = async e => {
//   //   e.preventDefault()

//   //   if (!files?.length) return

//   //   const formData = new FormData()
//   //   files.forEach(file => formData.append('file', file))
//   //   formData.append('upload_preset', 'friendsbook')

//   //   const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL
//   //   const data = await fetch(url, {
//   //     method: 'POST',
//   //     body: formData
//   //   }).then(res => res.json())

//     console.log(e)
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className='p-16 mt-10 border border-input'>
//         <input {...getInputProps()} />
//         <div className='flex flex-col items-center justify-center gap-4'>
//           <FileUp className='w-5 h-5 fill-foreground' />
//           {isDragActive ? (
//             <p>Drop the files here ...</p>
//           ) : (
//             <p>Drag & drop files here, or click to select files</p>
//           )}
//         </div>
//       </div>

//       {/* Preview */}
//       <section className='mt-10'>
//         <div className='flex gap-4'>
//           <h2 className='title text-3xl font-semibold'>Preview</h2>
//           <button
//             type='button'
//             onClick={removeAll}
//             className='mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors'
//           >
//             Remove all files
//           </button>
//           <button
//             type='submit'
//             className='ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-purple-400 rounded-md px-3 hover:bg-purple-400 hover:text-white transition-colors'
//           >
//             Upload to Cloudinary
//           </button>
//         </div>
//         <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
//           {files.map(file => (
//             <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
//               <Image
//                 src={file.preview}
//                 alt={file.name}
//                 width={100}
//                 height={100}
//                 onLoad={() => {
//                   URL.revokeObjectURL(file.preview)
//                 }}
//                 className='h-full w-full object-contain rounded-md'
//               />
//               <button
//                 type='button'
//                 className='w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors'
//                 onClick={() => removeFile(file.name)}
//               >
//                 <XCircle className='w-5 h-5 fill-white hover:fill-secondary-400 transition-colors' />
//               </button>
//               <p className='mt-2 text-neutral-500 text-[12px] font-medium'>
//                 {file.name}
//               </p>
//             </li>
//           ))}
//         </ul>

        
//       </section>
//     </form>
//   )
// }
// export default UploadFile;
