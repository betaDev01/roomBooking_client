import { Suspense } from 'react';
import { routes } from '../../utils';
import { Route, Routes } from 'react-router';
import { CustomSpinner } from '../../components';


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
            <>
              <span className='error-stat error-stat-green'>4</span>
              <span className='error-stat'>0</span>
              <span className='error-stat error-stat-green'>4</span>
            </>
          </Suspense>
        }
      />
    </Routes>
  );
};