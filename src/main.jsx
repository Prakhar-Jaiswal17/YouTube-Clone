import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import VideoPage from './components/VideoPage.jsx'

const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path:"",
                    element: <Home />
                },
                {
                    path:"watch/:videoId",
                    element: <VideoPage />
                }
            ]
        },
    ])

createRoot(document.getElementById('root')).render(
    <>
        <RouterProvider router={router} />  
    </>
)