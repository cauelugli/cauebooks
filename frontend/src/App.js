import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import About from "./pages/about/About";



import Header from "./components/header/Header";
import SinglePost from "./components/singlePost/SinglePost";

function App() {
  const { user } = useContext(Context);
  return (
    <>
    <Router>
    <Header />

      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Register />}</Route>
        <Route path="/about">{user ? <About /> : <About />}</Route>
        <Route path="/post/:postId" ><SinglePost /> </Route>
      </Switch>
     
    </Router>
    </>
  );
}

export default App;
