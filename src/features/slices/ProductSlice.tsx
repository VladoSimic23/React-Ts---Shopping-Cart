import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ProductsI, ProductsStateI } from "../../interface/interface";

const initialState: ProductsStateI = {
  currentCategory: "",
  products: [],
  cart: [],
  isCartOpen: true,
  total: 0,
  totalItems: 0,
  allCategories: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductsI[]>) => {
      state.products = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      localStorage.setItem("category", JSON.stringify(action.payload));
      state.currentCategory = action.payload;
    },
    setAllCategories: (state, action: PayloadAction<string[]>) => {
      // localStorage.setItem("category", JSON.stringify(action.payload));

      state.allCategories = action.payload;
    },
    getCategoryStorage: (state, action) => {
      const getStorage = localStorage.getItem("category");

      if (getStorage) {
        const parseStorage = JSON.parse(localStorage.getItem("category") || "");
        state.currentCategory = parseStorage;
      } else {
        state.currentCategory = "all";
      }
    },
    addToCart: (
      state,
      { payload }: { payload: { id: number; title: string; price: number } }
    ) => {
      const { id, title, price } = payload;
      const findDuplicate = state.cart.find((item) => item.id === id);

      if (findDuplicate) {
        return;
      }
      if (!findDuplicate) {
        const cartItem = { id: id, title: title, price: price, amount: 1 };
        state.cart = [...state.cart, { ...cartItem }];
      }
    },
    openCart: (state, action) => {
      state.isCartOpen = false;
    },
    closeCart: (state, action) => {
      state.isCartOpen = true;
    },
    increaseAmount: (state, action: PayloadAction<number>) => {
      let findItem = state.cart.map((item) => {
        if (item.id === action.payload) {
          item = { ...item, amount: item.amount + 1 };
        }
        return item;
      });

      state.cart = findItem;
    },
    decreaseAmount: (state, action: PayloadAction<number>) => {
      let findItem = state.cart
        .map((item) => {
          if (item.id === action.payload) {
            item = { ...item, amount: item.amount - 1 };
          }
          return item;
        })
        .filter((cartItem) => cartItem.amount !== 0);

      state.cart = findItem;
    },
    getTotal: (state, action) => {
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;

          const itemTotal = price * amount;

          cartTotal.total += itemTotal;
          cartTotal.amount += amount;

          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      total = parseFloat(total.toFixed(2));

      state.totalItems = amount;
      state.total = total;
    },
    removeItemFromCart: (state, action: PayloadAction<Number>) => {
      const filterCart = state.cart.filter(
        (item) => item.id !== action.payload
      );

      state.cart = filterCart;
    },
    emptyCart: (state, action) => {
      state.cart = [];
    },
  },
});

export const {
  setProducts,
  setCategory,
  addToCart,
  openCart,
  closeCart,
  increaseAmount,
  decreaseAmount,
  getTotal,
  removeItemFromCart,
  emptyCart,
  getCategoryStorage,
  setAllCategories,
} = productsSlice.actions;
export const selectProducts = (state: RootState) => state;
export default productsSlice.reducer;
