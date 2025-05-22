import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, X, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    // Increased vertical padding (py-16 from py-12) for more overall space
    <footer className="bg-white dark:bg-gray-900 pt-16 pb-5 px-6 md:px-12 m-0">
      {/* Adjusted grid gaps: gap-y-10 for mobile stacking, md:gap-x-12 for desktop column separation */}

      <div className="max-w-6xl mx-auto flex flex-col justify-around">
        <div className="flex justify-left ">
          {/* Logo and Description */}
          <div className="w-[40%]">
            {/* Increased bottom margin for the title */}
            <h2 className="text-sm font-bold mb-4">PAREWA</h2>
            {/* Adjusted top margin for description */}
            <p className="text-sm text-gray-500 mt-2">
              A collection of 100+ responsive HTML templates for your startup business or side project.
            </p>
            {/* Increased gap between social icons and added more top margin */}
            <div className="flex gap-6 mt-6 mb-10">
              <Instagram size={18} className="cursor-pointer hover:text-gray-600" />
              <Facebook size={18} className="cursor-pointer hover:text-gray-600" />
              <X size={18} className="cursor-pointer hover:text-gray-600" />
              <Linkedin size={18} className="cursor-pointer hover:text-gray-600" />
            </div>
          </div>

          <div className="flex gap-20">

            {/* Company Links */}
            <div>
              {/* Increased bottom margin for the section title */}
              <h3 className="text-sm font-semibold mb-5">Company</h3>
              {/* Increased vertical space between list items */}
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link href="#">About</Link></li>
                <li><Link href="#">Team</Link></li>
                <li><Link href="#">Blog</Link></li>
                <li><Link href="#">Careers</Link></li>
                <li><Link href="#">Contact</Link></li>
              </ul>
            </div>
            {/* Company Links */}
            <div>
              {/* Increased bottom margin for the section title */}
              <h3 className="text-sm font-semibold mb-5">Company</h3>
              {/* Increased vertical space between list items */}
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link href="#">About</Link></li>
                <li><Link href="#">Team</Link></li>
                <li><Link href="#">Blog</Link></li>
                <li><Link href="#">Careers</Link></li>
                <li><Link href="#">Contact</Link></li>
              </ul>
            </div>
            {/* Company Links */}
            <div>
              {/* Increased bottom margin for the section title */}
              <h3 className="text-sm font-semibold mb-5">Company</h3>
              {/* Increased vertical space between list items */}
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link href="#">About</Link></li>
                <li><Link href="#">Team</Link></li>
                <li><Link href="#">Blog</Link></li>
                <li><Link href="#">Careers</Link></li>
                <li><Link href="#">Contact</Link></li>
              </ul>
            </div>
            {/* Company Links */}
            <div>
              {/* Increased bottom margin for the section title */}
              <h3 className="text-sm font-semibold mb-5">Company</h3>
              {/* Increased vertical space between list items */}
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link href="#">About</Link></li>
                <li><Link href="#">Team</Link></li>
                <li><Link href="#">Blog</Link></li>
                <li><Link href="#">Careers</Link></li>
                <li><Link href="#">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="w-[80%]">
          {/* Increased bottom margin for the section title */}
          <h3 className="text-sm font-semibold mb-5">Newsletter</h3>
          {/* Added bottom margin for the description */}
          <p className="text-sm text-gray-500 mb-3">Subscribe to our newsletter</p>
          {/* Ensured container takes full width, added top margin */}
          <div className="flex w-[50%] mt-4">
            {/* Added flex-grow to make the Input take all available space */}
            {/* Adjusted rounding for seamless look with the button */}
            <Input
              type="email"
              placeholder="Email"
              className="flex-grow rounded-l-md rounded-r-none text-sm"
            />
            {/* Adjusted rounding for seamless look with the input */}
            <Button className="bg-black text-white rounded-l-none rounded-r-md text-sm whitespace-nowrap">Subscribe</Button>
          </div>
          {/* Kept existing spacing for privacy policy text */}
          <p className="text-xs text-gray-500 mt-2">
            By submitting, you agree to our <Link href="#" className="underline">Privacy Policy</Link>
          </p>
        </div>


      </div>

      {/* Bottom Footer */}
      {/* Increased top margin and padding for more separation from the main content */}
      <div className="mt-10 border-t pt-6 text-center text-gray-500 text-xs">
        <p>PAREWA © All rights reserved</p>
        <p>6229 Suyog</p>
      </div>
    </footer>
  );
}