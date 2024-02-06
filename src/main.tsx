import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import CompaniesPage from "./pages/companiesPage/CompananiesPage";
import JobOffersPage from "./pages/jobOffersPage/JobOffersPage.tsx";
import ContactsPage from "./pages/contactsPage/ContactsPage";
import App from "./pages/App";
import OneJobOfferPage from "./pages/jobOffersPage/OneJobOfferPage";
import OneCompanyPage from "./pages/companiesPage/OneCompanyPage";
import OneSeekerDataPage from "./pages/seekerPage/OneSeekerDataPage";
import CVPage from "./pages/cvsPage/CVPage";
import OneCVPage from "./pages/cvsPage/OneCVPage";
import RequestPage from "./pages/requestsPage/RequestPage";
import OneRequestPage from "./pages/requestsPage/OneRequestPage";
import NotificationsPage from "./pages/notificationsPage/NotificationsPage";
import SeekerEditFormPage from "./pages/formPage/SeekerEditFormPage";

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
            {
                path: "/company/:id",
                element: <OneCompanyPage />,
            },
            {
                path: "/seeker/data/:id",
                element: <OneSeekerDataPage />,
            },
            {
                path: "/cv",
                element: <CVPage />,
            },
            {
                path: "/cv/:id",
                element: <OneCVPage />,
            },
            {
                path: "/requests",
                element: <RequestPage />,
            },
            {
                path: "/request/:id",
                element: <OneRequestPage />,
            },
            {
                path: "/notification",
                element: <NotificationsPage />,
            },
            {
                path: "/seeker/data/edit/:id",
                element: <SeekerEditFormPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
