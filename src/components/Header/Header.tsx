// import { Link } from "react-router-dom";
import Container from "../Container/Container";
import Logo from "../../assets/Logo";
import React, { useCallback } from "react";

// import { useNavigate } from 'react-router-dom';
export default function Header(): JSX.Element {
  // const navigate = useNavigate();
  const [mobile, setMobile] = React.useState(false);

  interface NavItem {
    label: string;
    slug: string;
  }

  const navItems: NavItem[] = [
    { label: "Home", slug: "/" },
    { label: "Search", slug: "/search" }
  ];

  const toggleMobile = useCallback(() => {
    setMobile((prevMobile) => !prevMobile);
  }, []);

  return (
    <>
      <header className='py-3 font-medium shadow sticky bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 
'>
        <Container>
          <nav className='flex'>
            <div>
              <Logo width='50' />
            </div>
            <button
            className={`sm:hidden flex ml-auto`}
            onClick={toggleMobile}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png" alt="Menu" className='bg-cover w-[3rem]' />
          </button>
            <ul className='hidden sm:flex ml-auto'>
              {navItems.map((item) => (
                <li key={item.label} className="px-2">
                  <button
                    className='inline-block px-6 py-2  text-[#3e8aed] hover:bg-[rgb(3,139,217)] hover:text-white duration-200 rounded-md'
                  // onClick={()=> navigate(item.slug)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            {mobile && (
              <ul className={`absolute z-30 right-0 mt-2 py-2 w-48 text-[#988dcc] bg-[#0e062e] rounded-lg shadow-xl transition-opacity duration-300 ease-in-out transform ${mobile ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`} >
                {navItems.map((item) => (
                  <li key={item.label}>
                    <button
                      className='inline-block px-6 py-2 text-[#3e8aed] hover:bg-[rgb(3,139,217)] hover:text-white duration-200 rounded-md'
                      onClick={() => {
                        // navigate(item.slug);
                        setMobile(false);
                    } }
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
  )
}
