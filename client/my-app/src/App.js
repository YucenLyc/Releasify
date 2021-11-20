import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';
import Registration from './Pages/Register';
import Login from './Pages/Login';
import userInfo from './Pages/UserInfo'
import Profile from './Pages/Profile';
import {ProtectedRoute} from './Pages/protected.route';
 
function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
            <NavLink activeClassName="active" to="/register">Register</NavLink>
            <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small>
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Registration} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/userInfo" component={userInfo} />
              <ProtectedRoute exact path="/profile" component={() => <Profile authorized={true} />} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
 
export default App;