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
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import { useAuth } from "./context/AuthContext";

function PrivateRoute({ component: Component, ...rest }: any) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    window.location.href = "/login";
    return null;
  }
  return <Component {...rest} />;
}

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
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route
            path="/profile"
            component={() => <PrivateRoute component={ProfilePage} />}
          />
          <Route
            path="/orders"
            component={() => <PrivateRoute component={OrdersPage} />}
          />
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
