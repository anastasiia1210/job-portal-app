import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
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
import SeekerAddFormPage from "./pages/formPage/SeekerAddFormPage";
import AdminPage from "./pages/admin/AdminPage";
import EmployerAddFormPage from "./pages/formPage/EmployerAddFormPage";
import OneEmployerDataPage from "./pages/employerPage/OneEmployerDataPage";
import EmployerEditFormPage from "./pages/formPage/EmployerEditFormPage";
import JobOfferAddFormPage from "./pages/formPage/JobOfferAddFormPage";
import JobOfferEditFormPage from "./pages/formPage/JobOfferEditFormPage";

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
                path: "/job-offers",
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
                path: "/job-offer/add",
                element: <JobOfferAddFormPage />,
            },
            {
                path: "/job-offer/edit/:id",
                element: <JobOfferEditFormPage />,
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
                path: "/requests/:id",
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
            {
                path: "/seeker/add",
                element: <SeekerAddFormPage />,
            },
            {
                path: "/employer/add",
                element: <EmployerAddFormPage />,
            },
            {
                path: "/employer/data/:id",
                element: <OneEmployerDataPage />,
            },
            {
                path: "/employer/data/edit/:id",
                element: <EmployerEditFormPage />,
            },
            {
                path: "/admin/*",
                element:  localStorage.getItem("role") === "admin" && (<AdminPage/>),
            },
        ],
    },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
