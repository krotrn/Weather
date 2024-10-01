import { useCallback, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate(); 

  const navItems: NavItem[] = useMemo(
    () => [
      { label: "Home", slug: "/" },
      { label: "Search", slug: "/search" },
    ],
    []
  );

  const toggleMobile = useCallback(() => {
    setMobile((prevMobile) => !prevMobile);
  }, []);

  return (
    <>
      <header
        className="py-3 font-medium shadow sticky top-0 z-50 bg-blue-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60"
        role="banner"
      >
        <Container>
          <nav className="flex items-center justify-between" role="navigation" aria-label="Main navigation">
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
                className="w-8 h-8"
              />
            </button>

            {/* Desktop menu */}
            <ul className="hidden sm:flex ml-auto space-x-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    className="inline-block px-4 py-2 text-white hover:bg-blue-700 hover:text-white duration-200 rounded-md"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile drop-down menu */}
            {mobile && (
              <ul
                className={classnames(
                  "absolute top-full right-0 mt-2 py-2 w-48 text-[#988dcc] bg-[#0e062e] rounded-lg shadow-xl z-50 transition-all duration-300 ease-in-out",
                  {
                    "opacity-100 translate-y-0": mobile,
                    "opacity-0 -translate-y-2": !mobile,
                  }
                )}
              >
                {navItems.map((item) => (
                  <li key={item.label}>
                    <button
                      className="inline-block px-6 py-2 text-[#3e8aed] hover:bg-blue-700 hover:text-white duration-200 rounded-md w-full text-left"
                      onClick={() => {
                        navigate(item.slug);
                        setMobile(false); 
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

export default memo(Header);