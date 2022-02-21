import bannerImg from "../promo/images/banner.jpg";

const headerNav = [
  { id: 1, path: "about", name: "About Us" },
  { id: 2, path: "women", name: "Women" },
  { id: 3, path: "men", name: "Men" },
  { id: 4, path: "beauty", name: "Beauty" },
  { id: 5, path: "accessories", name: "Accessories" },
  { id: 6, path: "blog", name: "Blog" },
  { id: 7, path: "contact", name: "Contact" },
];
const footerNavCategories = [
  { id: 1, path: "men", name: "Men" },
  { id: 2, path: "women", name: "Women" },
  { id: 3, path: "accessories", name: "Accessories" },
  { id: 4, path: "beauty", name: "Beauty" },
];
const footerNavInfo = [
  { id: 1, path: "about", name: "About Us" },
  { id: 2, path: "contact", name: "Contact Us" },
  { id: 3, path: "blog", name: "Blog" },
  { id: 4, path: "faqs", name: "FAQs" },
];

const footerNavUseful = [
  { id: 1, path: "terms", name: "Terms & Conditions" },
  { id: 2, path: "returns", name: "Returns & Exchanges" },
  { id: 3, path: "delivery", name: "Shipping & Delivery" },
  { id: 4, path: "privacy", name: "Privacy Policy" },
];

const womenCl = [
  {
    id: 1,
    title: "Women's tracksuit Q109",
    price: 30.0,
    rate: 4,
    oldPrice: null,
    img: "./tmp/w1.jpg",
    discount: null,
  },
  {
    id: 2,
    title: "Women's tracksuit Q109",
    price: 30.0,
    rate: 4,
    oldPrice: 60.0,
    img: "./tmp/w2.jpg",
    discount: 50,
  },
  {
    id: 3,
    title: "Women's tracksuit Q109",
    price: 30.0,
    rate: 4,
    oldPrice: null,
    img: "./tmp/w3.jpg",
    discount: null,
  },
  {
    id: 4,
    title: "Women's tracksuit Q109",
    price: 30.0,
    rate: 4,
    oldPrice: null,
    img: "./tmp/w4.jpg",
    discount: null,
  },
  {
    id: 5,
    title: "Women's tracksuit Q109",
    price: 30.0,
    rate: 4,
    oldPrice: null,
    img: "./tmp/w5.jpg",
    discount: null,
  },
  {
    id: 6,
    title: "Women's tracksuit Q109",
    price: 30.0,
    rate: 4,
    oldPrice: null,
    img: "./tmp/w6.jpg",
    discount: null,
  },
  {
    id: 7,
    title: "Women's tracksuit Q109",
    price: 30.0,
    rate: 4,
    oldPrice: null,
    img: "./tmp/w7.jpg",
    discount: null,
  },
  {
    id: 8,
    title: "Women's tracksuit Q109",
    price: 30.0,
    rate: 4,
    oldPrice: null,
    img: "./tmp/w8.jpg",
    discount: null,
  },
];

const menCl = [
  {
    id: 1,
    title: "Women's tracksuit Q109",
    price: 30.0,
    rate: 4,
    oldPrice: null,
    img: "./tmp/m1.jpg",
    discount: null,
  },
  {
    id: 2,
    title: "Women's tracksuit Q109",
    price: 30.0,
    rate: 4,
    oldPrice: null,
    img: "./tmp/m2.jpg",
    discount: null,
  },
  {
    id: 3,
    title: "Women's tracksuit Q109",
    price: 30.0,
    rate: 4,
    oldPrice: null,
    img: "./tmp/m3.jpg",
    discount: null,
  },
  {
    id: 4,
    title: "Women's tracksuit Q109",
    price: 30.0,
    rate: 4,
    oldPrice: null,
    img: "./tmp/m4.jpg",
    discount: null,
  },
  {
    id: 5,
    title: "Women's tracksuit Q109",
    price: 30.0,
    rate: 4,
    oldPrice: null,
    img: "./tmp/m5.jpg",
    discount: null,
  },
  {
    id: 6,
    title: "Women's tracksuit Q109",
    price: 30.0,
    rate: 4,
    oldPrice: null,
    img: "./tmp/m6.jpg",
    discount: null,
  },
  {
    id: 7,
    title: "Women's tracksuit Q109",
    price: 30.0,
    rate: 4,
    oldPrice: null,
    img: "./tmp/m7.jpg",
    discount: null,
  },
  {
    id: 8,
    title: "Women's tracksuit Q109",
    price: 30.0,
    rate: 4,
    oldPrice: null,
    img: "./tmp/m8.jpg",
    discount: null,
  },
];

const sliderPromo = [
  {
    id: 1,
    img: bannerImg,
    banner: { header: "BANNER", text: "your Title text" },
  },
  { id: 2, img: bannerImg, banner: { header: "recruiters", text: "I'm waiting for..." } },
  { id: 3, img: bannerImg, banner: { header: "recruiters", text: "a job offer" } },
];
const sliderProduct = [
  { id: 1, img: `${process.env.PUBLIC_URL}/./tmp/w1.jpg` },
  { id: 2, img: `${process.env.PUBLIC_URL}/./tmp/w1.jpg` },
  { id: 3, img: `${process.env.PUBLIC_URL}/./tmp/w1.jpg` },
  { id: 4, img: `${process.env.PUBLIC_URL}/./tmp/w1.jpg` },
];

const data = (productType) => {
  switch (productType) {
    case "women":
      return womenCl;
    case "men":
      return menCl;
    default:
      return [];
  }
};

export {
  headerNav,
  footerNavCategories,
  footerNavInfo,
  footerNavUseful,
  womenCl,
  menCl,
  sliderPromo,
  sliderProduct,
  data,
};
