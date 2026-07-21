import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { nav, contact, brand } from "../data/content";

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
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-navy-950/95 backdrop-blur-md py-3 shadow-lg shadow-black/20" : "bg-navy-950/40 backdrop-blur-sm py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Captains' Window" className="h-10 md:h-12 w-auto" />
          <span className="hidden md:inline text-xs font-display font-extrabold tracking-wide text-white">
            {brand.tagline}
          </span>
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
                    `flex items-center gap-1 text-sm tracking-wide whitespace-nowrap transition-colors ${
                      isActive ? "text-red-500" : "text-white/80 hover:text-red-500"
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
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-64"
                    >
                      <div className="rounded-2xl card-light overflow-hidden py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-5 py-2.5 text-sm text-navy-900 hover:bg-blue-50 hover:text-red-600 transition-colors"
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
                  `text-sm tracking-wide whitespace-nowrap transition-colors ${
                    isActive ? "text-red-500" : "text-white/80 hover:text-red-500"
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
            className="flex items-center gap-2 rounded-full border border-red-500/50 px-4 py-2 text-xs font-semibold tracking-wide text-white hover:bg-red-600 hover:border-red-600 transition-colors whitespace-nowrap"
          >
            <Phone size={14} /> Call Now
          </a>
        </div>

        <button
          className="xl:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="xl:hidden overflow-hidden bg-navy-950/98 backdrop-blur-md mt-4"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {nav.map((item) =>
                item.children ? (
                  <div key={item.path}>
                    <button
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      className="w-full flex items-center justify-between py-2.5 text-sm tracking-wide text-white/85"
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
                              className="py-2 text-sm text-white/60 hover:text-red-500"
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
                      `py-2.5 text-sm tracking-wide ${isActive ? "text-red-500" : "text-white/80 hover:text-red-500"}`
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
