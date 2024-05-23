import { INavbarItem } from "../types";

const NavbarItem: React.FC<{ item: INavbarItem }> = ({ item }) => {
  return (
    <li className="parent relative group/parent">
      <button type="button" className="p-4 text-black hover:text-[#969696] flex items-center gap-1 roboto-medium leading-none">
        {item.label}
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
      <ul className="absolute hidden group-hover/parent:block bg-white border">
        {item.items.map((subitem, index) => (
          <li key={index} className="child relative group flex">
            <button type="button" className={`flex w-40 justify-between whitespace-nowrap items-center mx-4 py-4 text-black hover:text-[#969696] border-b ${index === item.items.length - 1 ? 'border-b-0' : ''}`}>
              <span className="hover:translate-x-3 text-[0.8125rem] leading-none">{subitem.label}</span>
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
              <ul className="absolute hidden group-hover:block left-full top-0 bg-white border">
                {subitem.subitems.map((grandSubitem, subIndex) => (
                  <li key={subIndex}>
                    <a
                      href="#"
                      className={`block whitespace-nowrap mx-4 py-4 text-black text-[0.8125rem] leading-none hover:text-[#969696] border-b ${subIndex === subitem.subitems.length - 1 ? 'border-b-0' : ''}`}
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
export default NavbarItem;
