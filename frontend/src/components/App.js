import React from "react";
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import tbonestockImg from "../images/T-bone-Stock.png";
import Header from "./header/Heder";
import IndexPage from "./index/IndexPage";
import DetailPage from "./detail/DetailPage";


function App() {
  return(
    <Router>
      <div>
        <Header />
        
        <Switch>
          <Route exact path="/">
            <IndexPage />
          </Route>
          <Route exact path="/detail">
            <DetailPage />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
