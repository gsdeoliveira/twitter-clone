import { useLoginModal } from '@/hooks/useLoginModal'
import { useState, useCallback } from 'react'
import { Input } from '../input';
import { Modal } from '../modal';

export const LoginModal = () => {
  const loginModal = useLoginModal()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      // TODO: ADD LOG IN
      loginModal.onClose()
    } catch(error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [loginModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input type='email' placeholder='Email'onChange={(e) => setEmail(e.target.value)} value={email} disabled={isLoading} />
      <Input type='password' placeholder='Password'onChange={(e) => setPassword(e.target.value)} value={password} disabled={isLoading} />
    </div>
  )
  
  return (
    <Modal disabled={isLoading} isOpen={loginModal.isOpen} title='Login' actionLabel='Sign In' onClose={loginModal.onClose} onSubmit={onSubmit} body={bodyContent} />
  )
}