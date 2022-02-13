import "./App.scss";
import { Routes, Route,Link } from "react-router-dom";
import { ReactComponent as Logo } from "./logo.svg";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <div className="App" data-test-id="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:category" element={<CategoryPage />} />
        <Route path="/:category/:id" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
