import { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
import Main from "./pages/Main";
import SWContext from "./store/sw-context";
import Favorites from "./pages/Favorites";
import ItemsList from "./pages/ItemsList";

function App() {
    const swContext = useContext(SWContext);
    return <Layout>
        <Switch>
            {/* Main */}
            <Route path="/" exact={true}>
                <Main/>
            </Route>
            {/* Films, People, etc. */}
            {swContext.navs.map(navItem => (
                <Route path={'/' + navItem.type + '/:page?'} key={navItem.type}>
                    <ItemsList type={navItem.type} title={navItem.title} />
                </Route>
            ))}
            {/* Favorites */}
            <Route path={"/favorites/:page?"}>
                <Favorites/>
            </Route>
        </Switch>
    </Layout>;
}

export default App;