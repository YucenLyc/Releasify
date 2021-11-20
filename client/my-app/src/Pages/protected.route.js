import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import auth from './Auth';
import Home from './Home';

//TODO: not finished setting up 
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest}
      render={(props) => {
        if (auth.isAuthenticated()) {
          return <Component {...props} />
        }
        else {
          return <Redirect to={Home} />
      }
      }}
    />
  )
};