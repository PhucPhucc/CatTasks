import { BrowserRouter, Routes, Route } from "react-router";
import Index from "./pages/Index";
import LoginPage from "./pages/Login";
import { Toaster } from "sonner";
import RegisterPage from "./pages/Register";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import store, { login } from "../src/store/authStore.js";
import { useDispatch, Provider } from "react-redux";

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userData = currentUser
          ? {
              uid: currentUser.uid,
              email: currentUser.email,
            }
          : null;
        dispatch(login(userData));
      } 
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<h1>404 not found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
