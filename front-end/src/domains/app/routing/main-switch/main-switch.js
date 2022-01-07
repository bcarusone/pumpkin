import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from "../../view/home-page/home-page";
import Utilization from '../../view/utilization/utilization';

function MainSwitch() {
    return (
        <Switch>
            <Route exact path={'/'}>
                <HomePage />
            </Route>
            <Route path={'/utilization'}>
                <Utilization />
            </Route>

            <Redirect to="/" />
        </Switch>
    );
}

export default MainSwitch;
