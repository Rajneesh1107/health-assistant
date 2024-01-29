import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { SignUp } from "../pages/SignUp";
import { ContactPage } from "../pages/contactUs";
import { AboutPage } from "../pages/AboutUs";
import { Faq } from "../pages/faq";
import { HomePage } from "../pages/Home";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
