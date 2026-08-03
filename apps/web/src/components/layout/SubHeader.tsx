'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { SidebarTrigger2 } from '../ui/sidebar'

function SubHeader({ title, contribute }: { title: string, contribute: { title: string, link: string } }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='sticky top-0 z-50 flex flex-col items-end'>
      <div className="flex h-30 w-full items-center gap-5 bg-secondary-foreground p-5 pr-10 z-10 xl:w-100">
        <SidebarTrigger2 className='text-primary-foreground hover:bg-transparent hover:text-primary-foreground cursor-pointer' />
        <div className="title w-full xl:w-20 text-primary-foreground text-4xl font-bold font-sans">
          <Link href="/">
            {title}
          </Link>
        </div>
      </div>
      <div
        className={`support hidden items-center justify-center bg-primary p-2 text-2xl font-heading text-primary-foreground transition-transform duration-300 ease-in-out xl:flex xl:h-15 xl:w-40 ${scrolled ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        <span>
          <Link href={contribute.link}>
            {contribute.title.toUpperCase()}
          </Link>
        </span>
      </div>
    </div>
  )
}

export default SubHeader