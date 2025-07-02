import { ToastContainer } from "react-toastify";
import { Footer, Navbar } from "./components/layout";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProductList from "./pages/admin/products/ProductList";
import CreateProduct from "./pages/admin/products/CreateProduct";
import EditProduct from "./pages/admin/products/EditProduct";
import Login from "./pages/admin/Login";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <>
      <ToastContainer theme="colored" />
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/create" element={<CreateProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
