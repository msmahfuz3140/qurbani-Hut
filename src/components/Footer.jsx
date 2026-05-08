import {
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoYoutube,
} from "react-icons/io5";

const FooterLogo = () => (
  <span className="font-serif font-black tracking-tight text-3xl">
    <span className="gradient-text">Qurbani</span>
    <span className="text-orange-500">Hut</span>
  </span>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.4%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%227%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <FooterLogo />
            </div>
            <p className="text-neutral-300 leading-relaxed text-lg">
              QurbaniHut connects you with verified cattle and goat listings for
              Eid al-Adha — clear details, responsible sourcing, and support from
              inquiry to handover.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-neutral-400 hover:text-white transition-colors group">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <IoMailOutline className="text-xl text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-500">Email</p>
                  <p className="text-white font-medium">hello@qurbanihut.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-neutral-400 hover:text-white transition-colors group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <IoCallOutline className="text-xl text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-500">Phone</p>
                  <p className="text-white font-medium">+880 1XXX-XXXXXX</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-neutral-400 hover:text-white transition-colors group">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <IoLocationOutline className="text-xl text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-500">Address</p>
                  <p className="text-white font-medium">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-white">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                {["Home", "Products", "About Us", "Contact"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block text-neutral-300 hover:text-orange-500 transition-all duration-300 font-medium hover:translate-x-1"
                  >
                    {link}
                  </a>
                ))}
              </div>
              <div className="space-y-4">
                {["Listings", "My Account", "Booking", "FAQ"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block text-neutral-300 hover:text-orange-500 transition-all duration-300 font-medium hover:translate-x-1"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-white">
              Stay Connected
            </h4>
            <p className="text-neutral-300 text-lg leading-relaxed">
              Get Qurbani season updates, animal care tips, and new listings
              from trusted regions.
            </p>

            <div className="flex items-center gap-4">
              {[
                { icon: IoLogoFacebook, label: "Facebook" },
                { icon: IoLogoTwitter, label: "Twitter" },
                { icon: IoLogoInstagram, label: "Instagram" },
                { icon: IoLogoYoutube, label: "Youtube" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="group w-14 h-14 rounded-2xl bg-gradient-to-br from-neutral-700 to-neutral-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:from-blue-500 hover:to-purple-600"
                >
                  <social.icon className="text-2xl text-neutral-300 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>

            <div className="space-y-4">
              <h5 className="text-lg font-bold text-white uppercase tracking-wider">
                Newsletter
              </h5>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-5 py-4 bg-neutral-800/50 border border-neutral-600 rounded-2xl text-white placeholder:text-neutral-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                />
                <button className="btn-primary px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-xl">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-neutral-700">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <p className="text-base text-neutral-400 text-center lg:text-left">
              © {currentYear} QurbaniHut. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-base text-neutral-400 hover:text-orange-500 transition-colors font-medium"
                  >
                    {item}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </footer >
  );
}
