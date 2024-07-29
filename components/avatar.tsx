import { useUser } from '@/hooks/useUser'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

interface AvatarProps {
  userId: string
  isLarge?: boolean
  hasBorder?: boolean
}

export const Avatar: React.FunctionComponent<AvatarProps> = ({
  userId,
  isLarge,
  hasBorder,
}) => {
  const { data: fetchedUser } = useUser(userId)
  const router = useRouter()
  const onClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation()

      const url = `/users/${userId}`

      router.push(url)
    },
    [router, userId],
  )

  return (
    <div
      className={`
    ${hasBorder ? 'border-4 border-black' : ''}
    ${isLarge ? 'w-32' : 'w-12'}
    ${isLarge ? 'h-32' : 'h-12'}
    rounded-full hover:opacity-90 transition cursor-pointer relative shrink-0
    `}
    >
      <Image
        fill
        style={{
          objectFit: 'cover',
          borderRadius: '100%',
        }}
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser?.profileImage || '/images/placeholder.png'}
      />
    </div>
  )
}
