import { useLoginModal } from '@/hooks/useLoginModal'
import { useState, useCallback } from 'react'

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
  return (
    <div>
      <div></div>
    </div>
  )
}