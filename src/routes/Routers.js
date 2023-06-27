import { BrowserRouter, Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import ViewPage from "../pages/ViewPage";
import AddMovie from "../pages/AddMovie";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

const Routers = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Index} exact />
        <Route path="/viewpage/:id" component={ViewPage} exact />
        <Route path="/add" component={AddMovie} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/profile" component={Profile} exact />
      </Switch>
    </BrowserRouter>
  );
};
export default Routers;
