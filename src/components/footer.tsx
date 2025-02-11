import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <h2 className="text-xl font-bold">Shadcnblocks</h2>
          <p className="text-gray-500 mt-2">
            A collection of 100+ responsive HTML templates for your startup business or side project.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <FaInstagram className="text-xl cursor-pointer hover:text-gray-600" />
            <FaFacebook className="text-xl cursor-pointer hover:text-gray-600" />
            <FaTwitter className="text-xl cursor-pointer hover:text-gray-600" />
            <FaLinkedin className="text-xl cursor-pointer hover:text-gray-600" />
          </div>
        </div>

        {/* Product Links */}
        <div>
          <h3 className="font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-gray-500">
            <li><Link href="#">Overview</Link></li>
            <li><Link href="#">Pricing</Link></li>
            <li><Link href="#">Marketplace</Link></li>
            <li><Link href="#">Features</Link></li>
            <li><Link href="#">Integrations</Link></li>
            <li><Link href="#">Marketing</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-500">
            <li><Link href="#">About</Link></li>
            <li><Link href="#">Team</Link></li>
            <li><Link href="#">Blog</Link></li>
            <li><Link href="#">Careers</Link></li>
            <li><Link href="#">Contact</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-4">Newsletter</h3>
          <p className="text-gray-500">Subscribe to our newsletter</p>
          <div className="flex mt-4">
            <Input type="email" placeholder="Email" className="rounded-l-md" />
            <Button className="bg-black text-white rounded-r-md">Subscribe</Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            By submitting, you agree to our <Link href="#" className="underline">Privacy Policy</Link>
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-8 border-t pt-4 text-center text-gray-500 text-sm">
        <p>Shadcnblocks © All rights reserved</p>
        <p>Made with ❤️ by Shadcnblocks</p>
      </div>
    </footer>
  );
}
