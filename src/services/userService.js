import axios from "axios";

class UserService {
  constructor() {
    this.cart = () => JSON.parse(localStorage.getItem("cart"));
  }

  addToCart(data) {
    const product = {
      id: data.id,
      name: data.name,
      price: data.price,
      image: data.image,
      color: data.color,
      size: data.size,
      quantity: 1,
      myId: data.myId,
    };
    let cart = [];
    if (this.cart() === null) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
    if (this.cart().length > 0) {
      cart = [...this.cart()];
      for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].myId === data.myId) {
          cart[i].quantity += 1;
          return localStorage.setItem("cart", JSON.stringify(cart));
        }
      }
    }

    return localStorage.setItem(
      "cart",
      JSON.stringify([...this.cart(), product])
    );
  }

  removeFromCart(data) {
    const filtered = this.cart().filter((item) => item.myId !== data.myId);
    return localStorage.setItem("cart", JSON.stringify(filtered));
  }

  cartProductMinus(data) {
    const cart = [...this.cart()];
    for (let i = 0; i < cart.length; i += 1) {
      if (cart[i].myId === data.myId) {
        if (cart[i].quantity > 1) {
          cart[i].quantity -= 1;
        }
      }
    }
    return localStorage.setItem("cart", JSON.stringify(cart));
  }

  cartProductPlus(data) {
    const cart = [...this.cart()];
    for (let i = 0; i < cart.length; i += 1) {
      if (cart[i].myId === data.myId) {
        cart[i].quantity += 1;
      }
    }
    return localStorage.setItem("cart", JSON.stringify(cart));
  }

  async getProductsAll() {
    const res = await axios.get("https://training.cleverland.by/shop/products");
    return res;
  }

  async getProductsDiff(data) {
    const res = await axios.post(
      "https://training.cleverland.by/shop/products/search",
      {
        category: data,
        // brands: ["Winzor", "Mango"],
        // sizes: ["S INT", "XS INT", "L INT"]
        // prices: ["middle"]
        // colors: ["Multicolor"]
      }
    );
    return res;
  }

  async getProduct(id) {
    const res = await axios.get(
      `https://training.cleverland.by/shop/product/${id}`
    );
    return res;
  }

  async createSubscribe(mailObj) {
    const res = await axios.post("https://training.cleverland.by/shop/email", {
      mailObj,
    });
    return res;
  }

  async createReview(obj) {
    const res = await axios.post(
      "https://training.cleverland.by/shop/product/review",
      { ...obj }
    );
    return res;
  }

  async getCountries() {
    const res = await axios.get(
      "https://training.cleverland.by/shop/countries"
    );
    return res;
  }

  async getCities(city, country) {
    const res = await axios.post(
      "https://training.cleverland.by/shop/search/cities",
      { city, country }
    );
    return res;
  }

  sendOrder(data) {
    const newData = {
      ...data,
      phone: data.phone.replace(/(\(|\))/g, ""),
      paymentMethod: data.paymentMethod.replace(/(visa|masterCard)/g, "card"),
    };
    delete newData.isConfirmed
    return axios.post("https://training.cleverland.by/shop/cart",{...newData})}
}

export default new UserService();
