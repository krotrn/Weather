import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ErrorBoundary className='flex bg-[#232B42] justify-center items-center min-h-screen'><App /></ErrorBoundary>,
    children: [
      {
        path: "/",
        element: <ErrorBoundary className='flex bg-[#232B42] justify-center items-center min-h-screen'><div>Home</div></ErrorBoundary>
      },
      {
        path: "/search",
        element: <ErrorBoundary className='flex bg-[#232B42] justify-center items-center min-h-screen'><div>Search</div></ErrorBoundary>
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);