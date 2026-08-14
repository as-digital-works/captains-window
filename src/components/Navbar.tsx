import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { nav, contact } from "../data/content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-4 sm:top-6 inset-x-3 sm:inset-x-6 lg:inset-x-10 z-50">
      <div
        className={`mx-auto max-w-6xl rounded-full bg-white ring-1 ring-navy-900/10 transition-all duration-300 ${
          scrolled ? "shadow-xl shadow-black/10 py-1.5" : "shadow-lg shadow-black/10 py-2"
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-3 sm:px-4">
          <Link to="/" className="flex items-center shrink-0">
            <img src="/logo.png" alt="Captains' Window" className="h-12 sm:h-14 w-auto" />
          </Link>

          <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
            {nav.map((item) =>
              item.children ? (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => setDesktopServicesOpen(true)}
                  onMouseLeave={() => setDesktopServicesOpen(false)}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-1 text-sm font-medium tracking-wide whitespace-nowrap transition-colors ${
                        isActive ? "text-red-500" : "text-navy-900/70 hover:text-red-500"
                      }`
                    }
                  >
                    {item.label} <ChevronDown size={14} />
                  </NavLink>
                  <AnimatePresence>
                    {desktopServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-64"
                      >
                        <div className="rounded-2xl bg-white shadow-xl shadow-black/10 ring-1 ring-navy-900/10 overflow-hidden py-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className="block px-5 py-2.5 text-sm text-navy-900/80 hover:bg-blue-50 hover:text-red-500 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `text-sm font-medium tracking-wide whitespace-nowrap transition-colors ${
                      isActive ? "text-red-500" : "text-navy-900/70 hover:text-red-500"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="hidden xl:flex items-center gap-3">
            <a
              href={`tel:${contact.phones[0].replace(/\s/g, "")}`}
              className="flex items-center gap-2 rounded-full border-2 border-red-500 px-5 py-2 text-sm font-semibold tracking-wide text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors whitespace-nowrap"
            >
              <Phone size={14} /> Call Now
            </a>
          </div>

          <button
            className="xl:hidden ml-auto text-navy-900"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="xl:hidden overflow-hidden mx-auto max-w-6xl mt-3 rounded-3xl bg-white shadow-xl shadow-black/10 ring-1 ring-navy-900/10"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {nav.map((item) =>
                item.children ? (
                  <div key={item.path}>
                    <button
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      className="w-full flex items-center justify-between py-2.5 text-sm font-medium tracking-wide text-navy-900/85"
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4 flex flex-col"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              onClick={() => setOpen(false)}
                              className="py-2 text-sm text-navy-900/60 hover:text-red-500"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `py-2.5 text-sm font-medium tracking-wide ${
                        isActive ? "text-red-500" : "text-navy-900/70 hover:text-red-500"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              )}
              <a
                href={`tel:${contact.phones[0].replace(/\s/g, "")}`}
                className="mt-3 flex items-center justify-center gap-2 rounded-full border-2 border-red-500 px-5 py-2.5 text-sm font-semibold tracking-wide text-red-500"
              >
                <Phone size={14} /> Call Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
