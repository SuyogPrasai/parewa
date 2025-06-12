'use client';
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
      className={`hidden lgplus:block fixed top-[225px] left-[247px] transition-translate transform duration-500 z-40 ${show ? 'translate-y-[-100px]' : '-translate-y-[200px] pointer-events-none'
        }`}
    >
      <div className="p-4 bg-blue-600 text-white shadow-xl font-oswald text-2xl">
        CONTACT US
      </div>
    </div>

  );
}
