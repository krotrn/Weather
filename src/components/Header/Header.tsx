// import { Link } from "react-router-dom";
import Container from "../Container/Container";
import Logo from "../../assets/Logo";

// import { useNavigate } from 'react-router-dom';
export default function Header(): JSX.Element {
  // const navigate = useNavigate();

  interface NavItem {
    label: string;
    slug: string;
  }

  const navItems: NavItem[] = [
    { label: "Home", slug: "/" },
    { label: "Search", slug: "/search" }
  ];
  return (
    <>
      <header className='py-3 font-medium shadow sticky bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 
'>
        <Container>
          <nav className='flex'>
            <div>
              <Logo width='50' />
            </div>
            <ul className='flex ml-auto'>
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
          </nav>
        </Container>
      </header>
    </>
  )
}
