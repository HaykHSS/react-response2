export interface INavbarItem {
  label: string;
  items: { label: string; subitems: string[] }[];
}

export interface ICard {
  title: string;
  text: string;
  tags: string;
  autor: string;
  img: string;
  img_2x: string;
  date: string;
  views: string;
}
