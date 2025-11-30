import Link from 'next/link';
import Container from './Container';

const footerLinks = {
  work: [
    { href: '/work/articles', label: 'All Articles' },
    { href: '/work/forbes', label: 'Forbes' },
    { href: '/work/bbc', label: 'BBC' },
    { href: '/work/videos', label: 'Videos' },
  ],
  about: [
    { href: '/about', label: 'Biography' },
    { href: '/expertise', label: 'Expertise' },
    { href: '/speaking', label: 'Speaking' },
    { href: '/research', label: 'Research' },
  ],
  connect: [
    { href: '/contact', label: 'Contact' },
    { href: 'https://twitter.com/guneyyildiz', label: 'Twitter', external: true },
    { href: 'https://linkedin.com/in/guneyyildiz', label: 'LinkedIn', external: true },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-20">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="font-heading font-bold text-xl">
              Guney Yildiz
            </Link>
            <p className="mt-3 text-gray-300 text-sm font-ui">
              Journalist, Political Risk Consultant, and PhD Candidate at Cambridge University.
            </p>
          </div>

          {/* Work Links */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Work
            </h3>
            <ul className="space-y-2">
              {footerLinks.work.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-teal transition-colors text-sm font-ui"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              About
            </h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-teal transition-colors text-sm font-ui"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Connect
            </h3>
            <ul className="space-y-2">
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  {'external' in link ? (
                    <a 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-teal transition-colors text-sm font-ui inline-flex items-center"
                    >
                      {link.label}
                      <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-teal transition-colors text-sm font-ui"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm font-ui">
            © {new Date().getFullYear()} Guney Yildiz. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm font-ui mt-2 md:mt-0">
            Built with Next.js
          </p>
        </div>
      </Container>
    </footer>
  );
}
