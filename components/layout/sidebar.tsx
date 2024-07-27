import { BsBellFill, BsHouseFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'

import { SidebarLogo } from './sidebar-logo'
import { SidebarItem } from './sidebar-item'
import { BiLogOut } from 'react-icons/bi'
import { SidebarTweetButton } from './sidebar-tweet-button'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'

export const Sidebar = () => {
  const { data: currentUser } = useCurrentUser()
  const itens = [
    {
      label: 'Home',
      href: '/',
      icon: BsHouseFill,
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: BsBellFill,
      auth: true,
    },
    {
      label: 'Profile',
      href: '/users/123',
      icon: FaUser,
    },
  ]
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {itens.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}

          {currentUser && (
            <SidebarItem
              onClick={() => signOut()}
              icon={BiLogOut}
              label="Logout"
              href=""
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  )
}
