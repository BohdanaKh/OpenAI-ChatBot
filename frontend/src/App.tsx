import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header.tsx";
import { useAuth } from "./components/context/AuthContext.tsx";
import { Signup } from "./pages/Signup.tsx";
import { Chat } from "./pages/Chat.tsx";
import { NotFound } from "./pages/NotFound.tsx";
import { Home } from "./pages/Home.tsx";
import { Login } from "./pages/Login.tsx";

function App() {
  const auth = useAuth();

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {auth?.isLoggedIn && auth.user && (
          <Route path="/chat" element={<Chat />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
