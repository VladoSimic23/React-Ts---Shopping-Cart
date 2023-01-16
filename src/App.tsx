import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page404 from "./components/404/Page404";
import Cart from "./components/Cart/Cart";
import Home from "./components/Products/Home";
import SingleProduct from "./components/Products/SingleProduct";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <div>
      <Router>
        <Nav />
        <div>
          <Cart />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
