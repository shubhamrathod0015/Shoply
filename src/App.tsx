
import { Switch, Route } from "wouter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/products" component={ProductsPage} />
          <Route path="/product/:id" component={ProductDetailPage} />
          <Route path="/category/:name" component={CategoryPage} />
          <Route path="/cart" component={CartPage} />
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default App;
