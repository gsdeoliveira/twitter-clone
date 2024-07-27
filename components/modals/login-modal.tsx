import { useLoginModal } from '@/hooks/useLoginModal'
import { useState, useCallback } from 'react'
import { Input } from '../input'
import { Modal } from '../modal'
import { useRegisterModal } from '@/hooks/useRegisterModal'
import { signIn } from 'next-auth/react'

export const LoginModal = () => {
  const RegisterModal = useRegisterModal()
  const loginModal = useLoginModal()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      await signIn('credentials', { email, password })

      loginModal.onClose()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [loginModal, email, password])

  const onToggle = useCallback(() => {
    if (isLoading) return

    loginModal.onClose()
    RegisterModal.onOpen()
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
        First time using Twitter?
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          {' '}
          Create an account
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign In"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
