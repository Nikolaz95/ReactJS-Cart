import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { Provider } from 'react-redux'


import './index.css'
import Root from './Root.jsx';
import HomePage from './components/pages/HomePage/HomePage.jsx';
import ErrorPage from './components/pages/ErrorPage/ErrorPage.jsx';

import { store } from "./store/store.js"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: "*",
        element: <ErrorPage />
      },

    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
