import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Mail,
  Phone,
  ArrowUpRight,
  Shield,
} from 'lucide-react';
import Container from '../common/Container';
import { FOOTER_LINKS, CONTACT_INFO } from '../../constants/navigation';

export const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-20">
      <Container className="pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Company Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 group focus:outline-none"
              aria-label="NovaStack - Building the Future"
            >
              <img
                src="/logo.png"
                alt="NovaStack Logo"
                className="h-8 w-8 sm:h-9 sm:w-9 object-contain shrink-0"
              />
              <div className="flex flex-col justify-center leading-tight">
                <span className="font-extrabold tracking-tight text-slate-900 text-lg sm:text-xl font-display">
                  Nova<span className="text-indigo-600">Stack</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 tracking-normal">
                  Building the Future
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              NovaStack engineers modern, scalable digital products and web applications using the MERN Stack. Designed for performance, reliability, and business impact.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-600">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2 hover:text-indigo-600 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-indigo-600" />
                <span>{CONTACT_INFO.email}</span>
              </a>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-2 hover:text-indigo-600 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-indigo-600" />
                <span>{CONTACT_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Capabilities
            </h4>
            <ul className="space-y-2 text-xs">
              {FOOTER_NAV.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-slate-600 hover:text-indigo-600 transition-colors block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              {FOOTER_NAV.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-slate-600 hover:text-indigo-600 transition-colors block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              {FOOTER_NAV.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-slate-600 hover:text-indigo-600 transition-colors block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} NovaStack. All rights reserved. Built with MERN Stack.
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Enterprise Grade Security</span>
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
