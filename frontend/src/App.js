import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./app.css";

import { Context } from "./context/Context";

import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import About from "./pages/about/About";
import Admin from "./pages/admin/Admin";
import Favorites from "./pages/favorites/Favorites";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Contact from "./pages/contact/Contact";
import PasswordReset from "./pages/passwordReset/PasswordReset";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import SinglePost from "./pages/singlePost/SinglePost";
import UserVerification from "./pages/userVerification/UserVerification";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Categories from "./pages/categories/Categories";

function App() {
  const { user } = useContext(Context);
  return (
    <>
      <Router>
        {user && <Header />}

        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Login />}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/forgotPassword">
            <ForgotPassword />
          </Route>
          <Route path="/users/activate/:id">
            <UserVerification />
          </Route>
          <Route path="/about">{user ? <About /> : <Login />}</Route>
          <Route path="/contact">{user ? <Contact /> : <Login />}</Route>
          <Route path="/:userId/favorites">
            {user ? <Favorites /> : <Login />}
          </Route>
          <Route path="/passwordReset">
            {user ? <PasswordReset /> : <Login />}
          </Route>
          <Route path="/post/:postId">
            {user ? <SinglePost /> : <Login />}
          </Route>
          <Route path="/categories/:id">
            {user ? <Categories /> : <Login />}
          </Route>
          <Route path="/settings">{user ? <Settings /> : <Login />}</Route>
          <Route exact path="/admin">
            {user?.isAdmin ? <Admin /> : <Login />}
          </Route>
        </Switch>

        <Footer />
      </Router>
    </>
  );
}

export default App;
