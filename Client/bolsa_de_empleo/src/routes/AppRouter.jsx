import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../modules/Home";
import { NotFound } from "../modules/NotFound";
import { Jobs } from "../modules/Jobs";
import { Navbar } from "../components/Navbar/Navbar";
import { Admin } from "../modules/Admin";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/vacantes" element={<Jobs />} />
        <Route path="/vacantes/:id" element={/*<JobDescription />*/ <></>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
