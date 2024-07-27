import { useRegisterModal } from '@/hooks/useRegisterModal'
import { useState, useCallback } from 'react'
import { Input } from '../input'
import { Modal } from '../modal'
import { useLoginModal } from '@/hooks/useLoginModal'
import axios from 'axios'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'

export const RegisterModal = () => {
  const RegisterModal = useRegisterModal()
  const loginModal = useLoginModal()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      await axios.post('/api/register', {
        email,
        password,
        name,
        username: userName,
      })

      toast.success('Account created successfully')

      signIn('credentials', { email, password })

      RegisterModal.onClose()
    } catch (error) {
      console.error(error)
      toast.error('Failed to create account')
    } finally {
      setIsLoading(false)
    }
  }, [RegisterModal, email, password, name, userName])

  const onToggle = useCallback(() => {
    if (isLoading) return

    RegisterModal.onClose()
    loginModal.onOpen()
  }, [isLoading, RegisterModal, loginModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
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
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
        disabled={isLoading}
      />
      <Input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          {' '}
          Sign in
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={RegisterModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={RegisterModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
