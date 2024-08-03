import Image from 'next/image'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface ImageUploadProps {
  onChange: (image: string) => void
  value?: string
  disabled?: boolean
  label: string
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  disabled,
  label,
}) => {
  const [image, setImage] = useState(value)

  const handleChange = useCallback(
    (image: string) => {
      onChange(image)
    },
    [onChange],
  )

  const handleDrop = useCallback(
    (files: Array<Blob>) => {
      console.log(typeof files)
      const file = files[0]
      const reader = new FileReader()

      reader.onload = (e) => {
        setImage(e.target?.result as string)
        handleChange(e.target?.result as string)
      }

      reader.readAsDataURL(file)
    },
    [handleChange],
  )

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  })

  return (
    <div
      {...getRootProps({
        className:
          'w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700',
      })}
    >
      <input {...getInputProps()} />
      {image ? (
        <div className="flex items-center justify-center">
          <Image src={image} height={100} width={100} alt="Uploaded Image" />
        </div>
      ) : (
        <p className="text-white cursor-pointer">{label}</p>
      )}
    </div>
  )
}
