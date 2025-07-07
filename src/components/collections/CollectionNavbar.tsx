'use client';

import { useState, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

interface NavLink {
  name: string;
  href: string;
}

interface NavbarProps {
  navLinks: NavLink[];
  type: string;
  wordpress_ip: string;
}

export function Navbar({ navLinks, type, wordpress_ip }: NavbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeLink, setActiveLink] = useState('General'); // State to track active link

  const handleLinkClick = useCallback(
    (linkName: string) => {
      setActiveLink(linkName);
      if (type === "article") {
        router.push(`/articles?category=${encodeURIComponent(linkName)}`);
      } else if (type === "notice") {
        router.push(`/notices?category=${encodeURIComponent(linkName)}`);
      }
    },
    [router, searchParams]
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="hidden bg-white mr-auto w-full max-w-[1000px] lg:relative lgplus:block shadow-sm">
        <div className="container relative">
          <nav className="flex lg:flex-row items-center justify-between">
            {/* Desktop Navigation */}
            <div className="flex justify-center">
              <NavigationMenu className="lg:flex">
                <NavigationMenuList className="flex md:flex-row md:mt-0 mt-5 flex-col space-x-0">
                  {navLinks.map((link: NavLink) => (
                    <NavigationMenuItem key={link.name}>
                      <NavigationMenuLink
                        className="py-2 px-6 flex items-center justify-center text-black text-lg font-bold hover:cursor-pointer"
                        style={{
                          backgroundColor: activeLink === link.name ? '' : 'white',
                          color: activeLink === link.name ? '' : 'black',
                          minWidth: '100px',
                          height: '60px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          letterSpacing: '0.05em',
                          fontFamily: 'oswald, sans-serif',
                        }}
                        onClick={() => handleLinkClick(link.name)}
                      >
                        {link.name.toUpperCase()}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* About and Contact Buttons */}
            <div className="hidden lgplus:flex space-x-0 h-[60px] items-center ml-10">
              <div
                className="py-2 px-6 flex items-center justify-center hover:cursor-pointer text-black text-lg font-bold"
                style={{
                  backgroundColor: 'hsl(var(--primary-low-bright))',
                  color: 'black',
                  minWidth: '100px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  letterSpacing: '0.05em',
                  fontFamily: 'oswald, sans-serif',
                }}
                onClick={() => router.push('/credits')}
              >
                CREDITS
              </div>

              <div
                className="py-2 px-6 flex items-center justify-center hover:cursor-pointer text-white text-lg font-bold"
                style={{
                  backgroundColor: 'hsl(var(--primary-high-bright))',
                  color: 'white',
                  minWidth: '100px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  letterSpacing: '0.05em',
                  fontFamily: 'oswald, sans-serif',
                }}
                onClick={() => router.push(wordpress_ip)}
              >
                SUBMIT
              </div>
              

            </div>
          </nav>
        </div>
      </div>
    </Suspense>
  );
}