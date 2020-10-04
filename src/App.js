import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route 
} from 'react-router-dom';

import Loading from './components/loading';
import CreateAccount from './components/createaccount';
import PageNotFound from './components/pagenotfound';

import './App.scss';


const App = () => {
    const [isLoading, setLoading] = React.useState(true);
    React.useEffect(() => setLoading(false), []);

    // Display loading page till the App component is mounted
    if(isLoading) return (<Loading />)
    else
    return (
        <Router>
            <div className="app">
              <Switch>
                <Route exact={true} path="/">
                  <CreateAccount />
                </Route>
                <Route exact={true} path="/sign-up">
                   <CreateAccount />
                </Route>
                <Route exact={true} path="*">
                  <PageNotFound />
                </Route>
              </Switch>
            </div>
        </Router>
    );
}

export default App;