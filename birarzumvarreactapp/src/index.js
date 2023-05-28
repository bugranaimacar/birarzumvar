import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes.js';
import reportWebVitals from './reportWebVitals';
import SwitchTheme from './Components/SwitchTheme';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import AdminLogin from './Pages/AdminLogin';


const root = createRoot(document.getElementById('root'));

const App = () => {
  const isAdmin = useSelector(state => state.userSettings.isAdmin);

  return (
    <React.StrictMode>
      <Router>
        <Routes>
          {routes.map(({ path, component: Comp, admin, exact }, key) => {
            if (admin && !isAdmin) {
              return(
              <Route
              key={key}
              exact={true}
              path={'/admin/messages'}
              element={<AdminLogin />}
            />
          )}

            return (
              <Route
                key={key}
                exact={exact}
                path={path}
                element={<Comp />}
              />
            );
          })}
        </Routes>
      </Router>
      <SwitchTheme />
    </React.StrictMode>
  );
};

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
