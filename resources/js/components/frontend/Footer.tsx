import { Link } from '@inertiajs/react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
export function Footer() {
  return (
    <footer className="w-full rounded-lg shadow-lg bg-red-400 text-white  py-12 px-6">
      <div className="container  grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Quick Links */}
        <div>
          <h4 className="text-blue-500 font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/products" className="hover:underline">Shop</Link></li>
            <li><Link href="/" className="hover:underline">About Us</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-blue-500 font-semibold mb-4">Newsletter</h4>
          <p className="mb-4">Get the latest updates and offers.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 border rounded-l-lg outline-white text-white"
            />
            <button  className="px-4 text-white bg-red-700 rounded-r-lg cursor-pointer hover:bg-red-500 active:bg-red-400 active:scale-105">
              Subscribe
            </button>
          </form>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-blue-500 font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <FaFacebookF size={20} className="text-blue-600 hover:text-white cursor-pointer" />
            <FaInstagram size={20} className="text-purple-600 hover:text-white cursor-pointer" />
            <FaTwitter size={20} className="text-blue-600 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-sm">
        &copy; {new Date().getFullYear()} FashionStore. All rights reserved.
      </div>
    </footer>
  );
}
