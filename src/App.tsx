import { useEffect, useRef, useState } from "react";
import Cards from "./components/Cards";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import { ICard } from "./types";
import { detectDeviceType } from "./utils";
import NavbarMobile from "./components/NavbarMobile";

const App = () => {
  const [isDesktop, setIsDesktop] = useState(
    detectDeviceType() === "desktop" && window.innerWidth > 767
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubitems, setOpenSubitems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);
  const [filteredCards, setFilteredCards] = useState<ICard[]>([]);
  const cards = useRef<ICard[]>([]);



  const toggleMenu = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e && e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubitems = (key: string) => {
    setOpenSubitems((prevOpenSubitems) => ({
      ...prevOpenSubitems,
      [key]: !prevOpenSubitems[key],
    }));
  };

  const getData = async () => {
    const id = setTimeout(() => setIsLoading(true), 500);
    try {
      const res = await fetch(
        "https://cloud.codesupply.co/endpoint/react/data.json"
      );
      const data = await res.json();
      cards.current = data;
      setFilteredCards(data);
    } catch (e) {
      console.log(e);
    } finally {
      clearTimeout(id);
      setIsLoading(false);
    }
  };

  const closeNavbar = () => {
    setIsMenuOpen(false);
  };


  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(detectDeviceType() === "desktop" && window.innerWidth > 767);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      onClick={closeNavbar}
      className="flex flex-col pl-5 pr-5 md:pl-0 md:pr-0 mb-8"
    >
      {isLoading && <Loader />}
      <Header
        isDesktop={isDesktop}
        toggleMenu={toggleMenu}
        cards={cards.current}
        setCards={setFilteredCards}
      />
      {isDesktop ? (
        <Navbar />
      ) : (
        <NavbarMobile
          toggleMenu={toggleMenu}
          isMenuOpen={isMenuOpen}
          toggleSubitems={toggleSubitems}
          openSubitems={openSubitems}
        />
      )}
      <main className="container">
        <Cards
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
          cards={filteredCards}
        />
      </main>
    </div>
  );
};
export default App;
