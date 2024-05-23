import { INavbarItem } from "../types";

interface INavbarItemMobile {
  item: INavbarItem;
  itemIndex: number;
  toggleSubitems: (key: string) => void;
  openSubitems: { [key: string]: boolean };
  navItems: INavbarItem[];
}

const NavbarItemMobile: React.FC<INavbarItemMobile> = ({ item, itemIndex, toggleSubitems, openSubitems, navItems }) => {
  return (
    <li key={itemIndex} className="relative group">
      <button
        className={`flex gap-1 items-center p-4 text-black w-full text-left border-b ${
          itemIndex === navItems.length - 1 ? "border-b-0" : ""
        }`}
        onClick={() => toggleSubitems(`item-${itemIndex}`)}
      >
        <span className="roboto-medium leading-none">{item.label}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L5 5L9 1" stroke="black" strokeLinecap="square" />
        </svg>
      </button>
      <ul
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
          openSubitems[`item-${itemIndex}`] ? "max-h-screen" : "max-h-0"
        } pl-4`}
      >
        {item.items.map((subitem, subIndex) => (
          <li key={subIndex} className="relative group">
            <button
              className={`flex gap-1 items-center mx-4 py-4 text-black w-full text-left border-b ${
                itemIndex === item.items.length - 1 ? "border-b-0" : ""
              }`}
              onClick={() =>
                toggleSubitems(`item-${itemIndex}-subitem-${subIndex}`)
              }
            >
              <span className="text-[0.8125rem] leading-none">{subitem.label}</span>
              <svg
                width="6"
                height="9"
                viewBox="0 0 6 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.33334 7.7L4.66668 4.5L1.33334 1.3"
                  stroke="black"
                  strokeLinecap="square"
                />
              </svg>
            </button>
            {subitem.subitems && subitem.subitems.length > 0 && (
              <ul
                className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                  openSubitems[`item-${itemIndex}-subitem-${subIndex}`]
                    ? "max-h-screen"
                    : "max-h-0"
                } pl-4`}
              >
                {subitem.subitems.map((grandSubitem, grandSubIndex) => (
                  <li key={grandSubIndex}>
                    <a
                      href="#"
                      className="flex gap-1 mx-4 py-4 text-[0.8125rem] leading-none text-black border-b"
                    >
                      {grandSubitem}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </li>
  );
};
export default NavbarItemMobile;
