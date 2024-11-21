import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./Pages/Core/Navbar/Navbar";
import Footer from "./Pages/Core/Footer/Footer";
import Home from "./Pages/Home/Home";
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
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
