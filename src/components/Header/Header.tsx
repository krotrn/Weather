import { useCallback, useState, useMemo } from "react";
import {  Link, useNavigate } from "react-router-dom"; // React-Router for navigation
import Container from "../Container/Container";

import { memo } from "react";
import classnames from "classnames";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Icon from "../Body/Home/Card/Icon";
import Logo from '../../assets/icons/Logo.svg';


export interface NavItem {
  label: string;
  slug: string;
}

function Header(): JSX.Element {
  const [mobile, setMobile] = useState(false);
  const navigate = useNavigate(); // useNavigate from react-router-dom for navigation

  // Memoize nav items to avoid re-creating on every render
  const navItems: NavItem[] = useMemo(
    () => [
      { label: "Home", slug: "/" },
      { label: "Search", slug: "/search" },
    ],
    []
  );

  // Memoized toggle function to avoid unnecessary re-renders
  const toggleMobile = useCallback(() => {
    setMobile((prevMobile) => !prevMobile);
  }, []);

  return (
    <>
      <header
        className="py-3 font-medium shadow sticky bg-blue-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60"
        role="banner"
      >
        <Container>
          <nav className="flex" role="navigation" aria-label="Main navigation">
            {/* Lazy-loaded Logo */}
              <Link to={"/"}>
              <ErrorBoundary>
                <Icon src={Logo} alt="Logo" className="bg-cover w-12" />
                </ErrorBoundary>
              </Link>
            {/* Mobile menu button */}
            <button
              aria-label="Toggle mobile menu"
              className="sm:hidden flex ml-auto"
              onClick={toggleMobile}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png"
                alt="Menu"
                className="bg-cover w-[3rem]"
              />
            </button>

            {/* Desktop menu */}
            <ul className="hidden sm:flex ml-auto">
              {navItems.map((item) => (
                <li key={item.label} className="px-2">
                  <button
                    className="inline-block px-6 py-2 text-[#205eaf] hover:bg-[rgb(3,139,217)] hover:text-white duration-200 rounded-md"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile dropdown menu */}
            {mobile && (
              <ul
                className={classnames(
                  "absolute z-30 right-0 mt-2 py-2 w-48 text-[#988dcc] bg-[#0e062e] rounded-lg shadow-xl transition-opacity duration-300 ease-in-out",
                  {
                    "opacity-100 translate-y-0": mobile,
                    "opacity-0 -translate-y-2": !mobile,
                  }
                )}
              >
                {navItems.map((item) => (
                  <li key={item.label}>
                    <button
                      className="inline-block px-6 py-2 text-[#3e8aed] hover:bg-[rgb(3,139,217)] hover:text-white duration-200 rounded-md"
                      onClick={() => {
                        navigate(item.slug);
                        setMobile(false); // Close mobile menu on navigation
                      }}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </nav>
        </Container>
      </header>
    </>
  );
}

export default memo(Header); // Memoize Header component for performance
