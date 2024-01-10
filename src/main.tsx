import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import CompaniesPage from "./pages/companiesPage/CompananiesPage";
import JobOffersPage from "./pages/jobOffersPage/JobOffersPage.tsx";
import ContactsPage from "./pages/contactsPage/ContactsPage";
import App from "./pages/App";
import OneJobOfferPage from "./pages/jobOffersPage/OneJobOfferPage";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <JobOffersPage />,
            },
            {
                path: "/companies",
                element: <CompaniesPage />,
            },
            {
                path: "/contacts",
                element: <ContactsPage />,
            },
            {
                path: "/job-offer/:id",
                element: <OneJobOfferPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
