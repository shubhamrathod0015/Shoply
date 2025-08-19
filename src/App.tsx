import { Route, Switch } from "wouter";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import ProductPage from "./pages/Product";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4">
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/product/:id" component={ProductPage}/>
            <Route path="/category/:category" component={HomePage} />
            <Route>404 - Page not found</Route>
          </Switch>
        </div>
           <Toaster />
      </div>
    </>
  );
}

export default App;
