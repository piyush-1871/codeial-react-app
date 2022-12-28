import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks';
import { Home, Login, Signup, Settings } from '../pages';
import { Loader, Navbar } from './';

function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={() => {
        if (auth.user) {
          return children;
        }

        return <Redirect to="/login" />;
      }}
    />
  );
}

const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/register">
            <Signup />
          </Route>

          <PrivateRoute exact path="/settings">
            <Settings />
          </PrivateRoute>

          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
