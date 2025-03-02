import { Fragment, Suspense } from 'react';
import { routes } from '../../utils';
import { Route, Routes } from 'react-router';
import { CustomSpinner } from '../../components';

import notFound from "../../assets/images/404.jpg"

export const AppRoutes = () => {

  return (
    <Routes>
      {routes.map((it, index) => {
        const Component = it.component;
        return (
          <Route
            key={`privateRouteOf${index}`}
            path={it.route}
            element={
              <Suspense fallback={<CustomSpinner />}>
                <Component />
              </Suspense>
            }
          >
          </Route>
        );
      })}
      <Route
        path='*'
        element={
          <Suspense fallback={<CustomSpinner />}>
            <Fragment>
              <img src={notFound} alt='not found' />
            </Fragment>
          </Suspense>
        }
      />
    </Routes>
  );
};