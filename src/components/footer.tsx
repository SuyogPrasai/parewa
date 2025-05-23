import Link from "next/link";
import { Input } from "@/components/ui/input"; // Assuming these are still used elsewhere or for styling reference
import { Button } from "@/components/ui/button"; // Assuming these are still used elsewhere or for styling reference
import { Instagram, Facebook, X, Linkedin } from 'lucide-react';

// ---
// Helper Components
// ---

const SocialIcon = ({ Icon, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <Icon size={24} className="cursor-pointer text-gray-300 hover:text-white transition-colors duration-200" />
  </a>
);

const FooterLinkSection = ({ title, links }) => (
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
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col mx-auto max-w-screen-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Logo and Description */}
            <div className="md:col-span-1">
              <h2 className="text-xl font-bold mb-4 text-white">PAREWA</h2>
              <p className="text-sm text-gray-300 mb-6">
                A collection of 100+ responsive HTML templates for your startup business or side project.
              </p>
              <div className="flex gap-4">
                {socialIcons.map(({ Icon, href }, index) => (
                  <SocialIcon key={index} Icon={Icon} href={href} />
                ))}
              </div>
            </div>

            {/* Link Sections */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:col-span-2">
              <FooterLinkSection title="Company" links={companyLinks} />
              <FooterLinkSection title="Resources" links={companyLinks} />
              <FooterLinkSection title="Support" links={companyLinks} />
              <FooterLinkSection title="Legal" links={companyLinks} />
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-4 border-gray-700">
            <h3 className="text-base font-semibold mb-4 text-white">Newsletter</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <p className="text-sm text-gray-300 mb-2 sm:mb-0">Subscribe to our newsletter for updates.</p>
              <div className="flex w-full sm:max-w-xs">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow rounded-l-md rounded-r-none text-sm bg-gray-800 text-gray-100 border border-gray-700 focus:border-white transition-colors duration-200 py-2 px-3"
                />
                <button className="bg-primary-block text-white rounded-l-none rounded-r-md text-sm whitespace-nowrap hover:bg-light-dark transition-colors duration-200 px-4 py-2">
                  Subscribe
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-300 mt-2 sm:mt-0 ">
              By subscribing, you agree to our <a href="#" className="underline hover:text-white">Privacy Policy</a>
            </p>
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