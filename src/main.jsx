import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/globals.css'
import Layout from './Layout'
import Home from './Pages/Home'
import Stories from './Pages/Stories'
import Reflections from './Pages/Reflections'
import About from './Pages/About'
import EntryDetail from './EntryDetail/EntryDetail'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'stories', element: <Stories /> },
      { path: 'stories/:id', element: <EntryDetail /> },
      { path: 'reflections', element: <Reflections /> },
      { path: 'about', element: <About /> },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
