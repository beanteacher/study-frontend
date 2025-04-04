import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
    return (
    <BrowserRouter>
        <Switch>
            <Route path="/:coinId">
                <Coin/>
            </Route>
            <Route path="/">
                <Coins/>
            </Route>
            {/*<Route path="/:coinId/price">
                <Coins/>
            </Route>
            <Route path="/:coinId/chart">
                <Coins/>
            </Route>*/}
        </Switch>
    </BrowserRouter>
    )
}

export default Router;