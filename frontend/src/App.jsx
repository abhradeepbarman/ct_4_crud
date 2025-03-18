import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Form from "./pages/Form";
import EditForm from "./pages/EditForm";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
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
                            <Form />
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="/form/edit"
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
