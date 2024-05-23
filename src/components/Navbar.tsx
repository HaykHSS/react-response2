import { useEffect, useState } from "react";
import { navItems } from "../constants";
import NavbarItem from "./NavbarItem";

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (scrollTop > 200) {
        if (scrollTop > lastScrollTop) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      } else {
        setIsHidden(false);
      }

      lastScrollTop = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <nav
      className={`mb-8 xl:mb-12 border-t border-b sticky top-0 z-50 sticky-menu bg-white ${
        isHidden ? "hidden-menu" : ""
      }`}
    >
      <ul className="flex justify-center gap-4">
        {navItems.map((item, index) => (
          <NavbarItem key={index} item={item} />
        ))}
      </ul>
    </nav>
  );
};
export default Navbar;
