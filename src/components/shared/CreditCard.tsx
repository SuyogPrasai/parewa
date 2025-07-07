'use client';

import Image from 'next/image';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

type CreditsCardProps = {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  tags: string[];
  socialLinks: {
    github?: string;
    instagram?: string;
    linkedin?: string;
  };
  photoPosition?: 'left' | 'right';
};

export function CreditsCard({
  name,
  role,
  bio,
  imageUrl,
  tags,
  socialLinks,
  photoPosition = 'left',
}: CreditsCardProps) {
  const isPhotoLeft = photoPosition === 'left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-3xl p-8 max-w-[700px] w-full border
        flex flex-col md:flex-row ${isPhotoLeft ? 'md:flex-row' : 'md:flex-row-reverse'}
        items-center gap-8 backdrop-blur-lg z-10 group`}
    >
      {/* Profile Photo with animation */}
      <motion.div
        whileHover={{
          scale: 1.05,
          rotate: 1.5,
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
        }}
        transition={{ duration: 0.3 }}
        className="w-32 h-32 relative rounded-full overflow-hidden shadow-lg shrink-0 border-4 border-gray-300"
      >
        <Image
          src={imageUrl}
          alt={`${name}'s photo`}
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Text Section */}
      <div className="flex-1 text-center md:text-left space-y-2 z-10">
        {/* Name with underline */}
        <div className="group inline-block">
          <motion.h2
            className="text-3xl font-extrabold  bg-clip-text tracking-wide"
            whileHover={{ scale: 1.02 }}
          >
            {name}
          </motion.h2>
          <div className="h-[2px] bg-gradient-to-r from-black to-purple-500 mt-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </div>

        <p className="text-sm text-gray-600">{role}</p>
        <p className="text-gray-700 text-base">{bio}</p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-700 border border-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full mb-1"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Social Icons */}
        <div className="mt-4 flex justify-center md:justify-start gap-5 text-gray-600">
          {socialLinks.github && (
            <motion.a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              whileHover={{
                scale: 1.3,
                color: '#1e8494',
                filter: 'drop-shadow(0 0 5px #1e8494)',
              }}
              transition={{ duration: 0.3 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
          )}
          {socialLinks.instagram && (
            <motion.a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              whileHover={{
                scale: 1.3,
                color: '#6e5494',
                filter: 'drop-shadow(0 0 5px #6e5494)',
              }}
              transition={{ duration: 0.3 }}
            >
              <Instagram className="w-5 h-5" />
            </motion.a>
          )}
          {socialLinks.linkedin && (
            <motion.a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              whileHover={{
                scale: 1.3,
                color: '#0077B5',
                filter: 'drop-shadow(0 0 5px #0077B5)',
              }}
              transition={{ duration: 0.3 }}
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
