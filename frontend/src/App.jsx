import { Route, Routes } from "react-router-dom";
import EditForm from "./pages/EditForm";
import Form from "./pages/Form";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";
import { useState } from "react";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route
                    path="/login"
                    element={<Login setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route
                    path="/register"
                    element={<Register setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route
                    path="/"
                    element={
                        <ProtectedRoutes>
                            <Home />
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="/form"
                    element={
                        <ProtectedRoutes>
                            <Form />{" "}
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="/form/:id/edit"
                    element={
                        <ProtectedRoutes>
                            <EditForm />
                        </ProtectedRoutes>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
