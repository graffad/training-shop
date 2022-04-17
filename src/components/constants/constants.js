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

const PROMO_FILTERS = [
  { particularName: "isNewArrivals", name: "NEW ARRIVALS" },
  { particularName: "isSpecial", name: "SPECIALS" },
  { particularName: "isBestseller", name: "BESTSELLERS" },
  { particularName: "isMostViewed", name: "MOST VIEWED" },
  { particularName: "isFeatured", name: "FEATURED PRODUCTS" },
];

const sliderPromo = [
  {
    id: 1,
    img: bannerImg,
    banner: { header: "BANNER", text: "your Title text" },
  },
  {
    id: 2,
    img: bannerImg,
    banner: { header: "recruiters", text: "I'm waiting for..." },
  },
  {
    id: 3,
    img: bannerImg,
    banner: { header: "recruiters", text: "a job offer" },
  },
];

const cartDefaultValues = {
  deliveryMethod: "pickup from post offices",
  country: "",
  storeAddress: "",
  paymentMethod: "visa",
  phone: "",
  totalPrice: "",
  isConfirmed: false,
  postcode: "",
  cardDate: "",
  card: "",
  cardCVV: "",
};
const cartConstTypes = {
  // delivery types ↓
  POST_OFFICES: "pickup from post offices",
  EXPRESS_DELIVERY: "express delivery",
  STORE_PICKUP: "store pickup",
  // condition types ↓
  COUNTRIES: "countries",
  CITIES: "cities",
  // payment types ↓
  VISA: "visa",
  MASTER_CARD: "masterCard",
  CASH: "cash",
  PAYPAL: "paypal",
};

const modalReviewDefaultValues = {
  rating: 1,
  id: "",
  name: "",
  text: "",
};

export {
  headerNav,
  footerNavCategories,
  footerNavInfo,
  footerNavUseful,
  sliderPromo,
  PROMO_FILTERS,
  cartDefaultValues,
  cartConstTypes,
  modalReviewDefaultValues,
};
