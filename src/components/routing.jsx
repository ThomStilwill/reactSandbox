import React from 'react';
import { useRoutes } from 'react-router-dom';
import App from './app'
import Log from './log';
import Home from './home';
import About from './about';
import AboutLog from './about-log';
import Vehicles from './vehicles';
import NotFound from './not-found';
  
  function Routing() {
    // We removed the <BrowserRouter> element from App because the
    // useRoutes hook needs to be in the context of a <BrowserRouter>
    // element. This is a common pattern with React Router apps that
    // are rendered in different environments. To render an <App>,
    // you'll need to wrap it in your own <BrowserRouter> element.
    let element = useRoutes([
      // A route object has the same properties as a <Route>
      // element. The `children` is just an array of child routes.
      {
        path: '/',
        element: <App />,
        children: [
          { path: 'Home', element: <Home /> },
          { path: 'About', element: <About /> },
          { path: 'Log', 
            element: <Log /> ,
            children: [
              { path: 'About', element: <AboutLog /> },
              { path: 'Vehicles', element: <Vehicles /> },
            ]
          },
          {
            path: '*',
            element: <NotFound />,
          }
        ]
      }
    ]);
  
    return element;
  }

  export default Routing;

  