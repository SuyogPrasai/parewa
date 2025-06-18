'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ScrollFadeIn() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const triggerPoint = window.innerHeight; // 100vh

      if (scrollY >= triggerPoint) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`hidden lgplus:block fixed top-[125px] left-[245px] transition-transform duration-500 z-40 ${
        show ? 'translate-y-0' : 'translate-y-[-100px] pointer-events-none'
      }`}
    >
      <div className="p-4 bg-blue-600 text-white shadow-xl font-oswald text-2xl">
        <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfLRjyOZRpObKfaGyJuZRkW8ixfzW0DuHS6Bvvt8J02z2SCLw/viewform">
          CONTRIBUTE
        </Link>
      </div>
    </div>
  );
}