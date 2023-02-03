import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid'

const Dropzone = ({ className }) => {
  const [files, setFiles] = useState([])

  const onDrop = useCallback(acceptedFiles => {
    setFiles(previousFiles => [
      ...previousFiles,
      ...acceptedFiles.map(file =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    ])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name))
  }

  const removeAll = () => setFiles([])

  return (
    <>
      <div
        {...getRootProps({
          className: className
        })}
      >
        <input {...getInputProps()} />
        <div className='flex flex-col items-center justify-center gap-4'>
          <ArrowUpTrayIcon className='w-5 h-5 fill-current' />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>
      <section className='mt-10'>
        <div className='flex gap-4'>
          <h2 className='title text-2xl font-semibold'>Preview</h2>
          <button
            onClick={removeAll}
            className='mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors'
          >
            Remove all files
          </button>
        </div>
        <ul className='mt-10 grid grid-cols-3 md:grid-cols-6 xl:grid-cols-12 gap-10'>
          {files.map(file => (
            <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
              <Image
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview)
                }}
                className='h-full w-full object-cover rounded-md'
              />
              <button
                className='w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors'
                onClick={() => removeFile(file.name)}
              >
                <XMarkIcon className='w-5 h-5 fill-white hover:fill-secondary-400 transition-colors' />
              </button>
              <p className='mt-2 text-neutral-500 text-[12px] font-medium'>
                {file.name}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default Dropzone
