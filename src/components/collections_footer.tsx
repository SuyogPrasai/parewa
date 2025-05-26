import Link from "next/link";
import { Instagram, Facebook, X, Linkedin } from 'lucide-react';

// ---
// Helper Components
// ---

type SocialIconProps = {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
};

const SocialIcon = ({ Icon, href }: SocialIconProps) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <Icon size={24} className="cursor-pointer text-gray-300 hover:text-white transition-colors duration-200" />
  </a>
);

type FooterLinkSectionProps = {
  title: string;
  links: { href: string; text: string }[];
};

const FooterLinkSection = ({ title, links }: FooterLinkSectionProps) => (
  <div>
    <h3 className="text-base font-semibold mb-4 text-white">{title}</h3>
    <ul className="space-y-2 text-sm text-gray-300">
      {links.map((link, index) => (
        <li key={index}>
          <Link href={link.href} className="hover:text-white transition-colors duration-200">{link.text}</Link>
        </li>
      ))}
    </ul>
  </div>
);

// ---
// Data for Links and Social Media
// ---

const companyLinks = [
  { href: "#", text: "About" },
  { href: "#", text: "Team" },
  { href: "#", text: "Blog" },
  { href: "#", text: "Careers" },
  { href: "#", text: "Contact" },
];

const socialIcons = [
  { Icon: Instagram, href: "https://instagram.com" },
  { Icon: Facebook, href: "https://facebook.com" },
  { Icon: X, href: "https://x.com" },
  { Icon: Linkedin, href: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <footer className="relative bg-secondary-background text-gray-300 py-16 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col mx-auto max-w-screen-lg"> {/* Removed justify-center here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Logo and Description - occupies 1 column on small screens, 1 on medium+ */}
            <div className="md:col-span-1">
              <h2 className="text-4xl font-bold mb-4 font-oswald text-white">PAREWA</h2>
              <p className="text-sm text-gray-300 mb-6 font-roboto ">
                A collection of 100+ responsive HTML templates for your startup business or side project.
              </p>
              <div className="flex gap-4 ">
                {socialIcons.map(({ Icon, href }, index) => (
                  <SocialIcon key={index} Icon={Icon} href={href} />
                ))}
              </div>
            </div>

            {/* Link Sections - occupies 2 columns on medium+ screens, side by side */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:ml-20  font-roboto text-center"> {/* Changed to grid for better control */}
              <FooterLinkSection title="Company" links={companyLinks} />
              <FooterLinkSection title="Resources" links={companyLinks} />
            </div>
          </div>

          
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400 text-xs">
          <p>PAREWA © {new Date().getFullYear()} All rights reserved</p>
          <p>6229 Suyog</p>
        </div>
      </div>
    </footer>
  );
}