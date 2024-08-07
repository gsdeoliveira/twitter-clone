import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useEditModal } from '@/hooks/useEditModal'
import { useUser } from '@/hooks/useUser'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Modal } from '../modal'
import { Input } from '../input'
import { ImageUpload } from '../image-upload'

export const EditModal = () => {
  const { data: currentUser } = useCurrentUser()

  const { mutate: mutateFetchedUser } = useUser(currentUser?.id || '')
  const editModal = useEditModal()

  const [profileImage, setProfileImage] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')

  useEffect(() => {
    setProfileImage(currentUser?.profileImage ? currentUser?.profileImage : '')
    setCoverImage(currentUser?.coverImage ? currentUser?.coverImage : '')
    setName(currentUser?.name ? currentUser?.name : '')
    setUsername(currentUser?.username ? currentUser?.username : '')
    setBio(currentUser?.bio ? currentUser?.bio : '')
  }, [
    currentUser?.profileImage,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
  ])

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      await axios.patch('/api/edit', {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      })

      mutateFetchedUser()

      toast.success('Profile updated')

      editModal.onClose()
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }, [
    bio,
    coverImage,
    editModal,
    mutateFetchedUser,
    name,
    profileImage,
    username,
  ])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload Profile Image"
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload Cover Image"
      />
      <Input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        type="text"
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  )

  return (
    <Modal
      body={bodyContent}
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
    />
  )
}
