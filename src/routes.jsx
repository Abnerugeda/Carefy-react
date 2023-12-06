import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Layout from "./globals/components/Layout";
import Tags from "./screens/Tags";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tags" element={<Tags/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
