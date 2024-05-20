import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Board = lazy(() => import('@/pages/board'));
const Admin = lazy(() => import('@/pages/admin'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Board />
      </Suspense>
    )
  },
  {
    path: '/admin',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Admin />
      </Suspense>
    )
  }
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
