import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedPage from "./components/ProtectedPage";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import { ConfigProvider } from "antd";
import Admin from "./pages/Admin";
import ProductInfo from "./pages/ProductInfo";
import NonprotectedRoute from "./components/NonProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  const { loading } = useSelector((state) => state.loaders);

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#40513B",
            colorPrimaryHover: "#40513B",
            borderRadius: "2px",
            boxShadow: "none",
          },
        },
        token: {
          borderRadius: "2px",
          colorPrimary: "#40513B",
        },
      }}
    >
      <div>
        {loading && <Spinner />}
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProtectedPage>
                  <Home />
                </ProtectedPage>
              }
            />

            <Route
              path="/product/:id"
              element={
                <ProtectedPage>
                  <ProductInfo />
                </ProtectedPage>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedPage>
                  <Profile />
                </ProtectedPage>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedPage>
                  <Admin />
                </ProtectedPage>
              }
            />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ConfigProvider>
  );
}

export default App;
