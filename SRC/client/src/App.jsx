import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./Pages/Core/Navbar/Navbar";
import Footer from "./Pages/Core/Footer/Footer";
import Login from "./Pages/Login/Login";
import Owner from "./Pages/Owner/Owner";
import Technician from "./Pages/Technician/Technician";
import NotFound from "./Pages/Notfound/Notfound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Outlet />
                <Footer />
              </>
            }
          >
            <Route path="/" element={<Login />} />
            <Route path="owner" element={<Owner />} />
            <Route path="technician" element={<Technician />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
