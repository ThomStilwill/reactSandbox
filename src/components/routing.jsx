import React from 'react';
import { useRoutes } from 'react-router-dom';
import App from './app'
import Home from './home';
import Basics from './reactcourse/basics';
import Cards from './reactcourse/cards';
import Stars from './reactcourse/stars';
import Form from './reactcourse/form';
import About from './about';
import NotFound from './not-found';

import Log from './log/log';
import AboutLog from './log/about-log';
import Vehicles from './log/vehicles';
import VehicleEdit from './log/vehicle-edit';
  
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
          { path: 'Stars', element: <Stars /> },
          { path: 'Cards', element: <Cards /> },
          { path: 'Basics', element: <Basics /> },
          { path: 'Form', element: <Form /> },
          { path: 'About', element: <About /> },
          { path: 'Log', 
            element: <Log /> ,
            children: [
              { path: 'About', element: <AboutLog /> },
              { path: 'Vehicles', element: <Vehicles /> },
              { path: 'Vehicles/:vehicleId', element: <VehicleEdit /> },
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

  