import "./App.css";
import { Route, Switch } from "react-router-dom";
import Favourites from "./components/Favourites";
import Stats from "./components/Stats";
import SearchMUI from "./components/SearchMUI";
import DashboardMUI from "./components/DashboardMUI";

function App() {
  return (
    <div className="App">
      <DashboardMUI />
      <Switch>
        <Route component={SearchMUI} path="/" exact/>
        <Route component={SearchMUI} path="/search" exact/>
        <Route component={Favourites} path="/favourites" exact />
        <Route component={Stats} path="/stats" exact />
      </Switch>
    </div>
  );
}

export default App;
