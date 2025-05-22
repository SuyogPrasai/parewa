import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, X, Linkedin } from 'lucide-react';

// ---
// Helper Components
// ---

const SocialIcon = ({ Icon }) => (
  <Icon size={18} className="cursor-pointer hover:text-gray-600" />
);

const FooterLinkSection = ({ title, links }) => (
  <div>
    <h3 className="text-sm font-semibold mb-5">{title}</h3>
    <ul className="space-y-3 text-sm text-gray-500">
      {links.map((link, index) => (
        <li key={index}>
          <Link href={link.href}>{link.text}</Link>
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
  { href: "#", "text": "Blog" },
  { href: "#", text: "Careers" },
  { href: "#", text: "Contact" },
];

const socialIcons = [
  Instagram,
  Facebook,
  X,
  Linkedin,
];

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 pt-16 pb-5 px-6 md:px-12 m-0">
      <div className="max-w-6xl mx-auto flex flex-col justify-around">
        <div className="flex justify-left ">
          {/* Logo and Description */}
          <div className="w-[40%]">
            <h2 className="text-sm font-bold mb-4">PAREWA</h2>
            <p className="text-sm text-gray-500 mt-2">
              A collection of 100+ responsive HTML templates for your startup business or side project.
            </p>
            <div className="flex gap-6 mt-6 mb-10">
              {socialIcons.map((Icon, index) => (
                <SocialIcon key={index} Icon={Icon} />
              ))}
            </div>
          </div>

          <div className="flex gap-20">
            {/* Reusing FooterLinkSection for each company link column */}
            <FooterLinkSection title="Company" links={companyLinks} />
            <FooterLinkSection title="Company" links={companyLinks} />
            <FooterLinkSection title="Company" links={companyLinks} />
            <FooterLinkSection title="Company" links={companyLinks} />
          </div>
        </div>

        {/* Newsletter */}
        <div className="w-[80%]">
          <h3 className="text-sm font-semibold mb-5">Newsletter</h3>
          <p className="text-sm text-gray-500 mb-3">Subscribe to our newsletter</p>
          <div className="flex w-[50%] mt-4">
            <Input
              type="email"
              placeholder="Email"
              className="flex-grow rounded-l-md rounded-r-none text-sm"
            />
            <Button className="bg-black text-white rounded-l-none rounded-r-md text-sm whitespace-nowrap">Subscribe</Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            By submitting, you agree to our <Link href="#" className="underline">Privacy Policy</Link>
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t pt-6 text-center text-gray-500 text-xs">
        <p>PAREWA © All rights reserved</p>
        <p>6229 Suyog</p>
      </div>
    </footer>
  );
}