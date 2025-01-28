import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-3xl font-bold text-primary">Tech Discovery</h2>
            </div>
            <p className="text-sm">
              Discover cutting-edge tech products, share ideas, and connect with a thriving community of innovators.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact Us</h3>
            <p>
              <strong>Address:</strong> 123 Innovation Lane, Tech City, World
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:info@techdiscovery.com" className="text-primary hover:text-primary-focus">
                info@techdiscovery.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a href="tel:+1234567890" className="text-primary hover:text-primary-focus">
                +123-456-7890
              </a>
            </p>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Follow Us</h3>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-focus"
              >
                <FaFacebook className="h-7 w-7 transition-transform transform hover:scale-110" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-focus"
              >
                <FaTwitter className="h-7 w-7 transition-transform transform hover:scale-110" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-focus"
              >
                <FaLinkedin className="h-7 w-7 transition-transform transform hover:scale-110" />
              </a>
            </div>
          </div>
        </div>

        <div className="divider my-8"></div>

        {/* Footer Bottom */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Tech Discovery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
