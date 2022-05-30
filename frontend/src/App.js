import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './app.css'

import { Context } from "./context/Context";

import Admin from "./pages/admin/Admin";
import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import About from "./pages/about/About";
import SinglePost from "./pages/singlePost/SinglePost";
import UserVerification from "./pages/userVerification/UserVerification";
import PasswordReset from "./pages/passwordReset/PasswordReset";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  const { user } = useContext(Context);
  return (
    <>
    <Router>
    {user && <Header />}

      <Switch>
        <Route exact path="/">{user ? <Home /> : <Login />}</Route>
        <Route path="/login"><Login /></Route>
        <Route path="/register"><Register /></Route>
        <Route path="/user/verify/:userId/:uniqueString" ><UserVerification /></Route>
        <Route path="/settings">{user ? <Settings /> : <Login />}</Route>
        <Route path="/passwordReset">{user ? <PasswordReset /> : <Login />}</Route>
        <Route path="/about">{user ? <About /> : <Login />}</Route>
        <Route path="/post/:postId" >{user ? <SinglePost /> : <Login />} </Route>
        {user?.isAdmin && <Route exact path="/admin"><Admin /></Route>}
      </Switch>
     
     <Footer />
    </Router>
    </>
  );
}

export default App;
