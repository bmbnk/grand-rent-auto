import React, {useState, useEffect} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import {Routes} from "../routes";

// pages
import DashboardOverview from "./dashboard/DashboardOverview";
import Cars from "./Cars";
import Employees from "./Employees";
import Customers from "./Customers";
import Login from "./Login";
import NotFoundPage from "./NotFound";

//hooks
import useJwt from "./useJwt";

// components
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

const RouteWithLoader = ({component: Component, ...rest}) => {
    const [loaded, setLoaded] = useState(false);
    const { jwt, setJwt } = useJwt();

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    if(!jwt) {
        return <Login setJwt={setJwt} />
    }

    return (
        <Route {...rest} render={props => (<> <Preloader show={loaded ? false : true}/> <Component {...props} /> </>)}/>
    );
};

const RouteWithSidebar = ({component: Component, ...rest}) => {
    const [loaded, setLoaded] = useState(false);
    const { jwt, setJwt } = useJwt();

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    const localStorageIsSettingsVisible = () => {
        return localStorage.getItem('settingsVisible') === 'false' ? false : true
    }

    const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
        localStorage.setItem('settingsVisible', !showSettings);
    }

    if(!jwt) {
        return <Login setJwt={setJwt} />
    }

    return (
        <Route {...rest} render={props => (
            <>
                <Preloader show={loaded ? false : true}/>
                <Sidebar/>

                <main className="content">
                    <Component {...props} />
                    <Footer toggleSettings={toggleSettings} showSettings={showSettings}/>
                </main>
            </>
        )}
        />
    );
};

export default () => (
    <Switch>
        <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage}/>
        <RouteWithLoader exact path={Routes.Login.path} component={Login}/>

        {/* pages */}
        <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview}/>
        <RouteWithSidebar exact path={Routes.Cars.path} component={Cars}/>
        <RouteWithSidebar exact path={Routes.Customers.path} component={Customers}/>
        <RouteWithSidebar exact path={Routes.Employees.path} component={Employees}/>

        <Redirect to={Routes.NotFound.path}/>
    </Switch>
);
