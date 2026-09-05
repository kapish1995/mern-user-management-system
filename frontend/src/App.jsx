import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar.jsx";
import ThemeDrawer from "./components/ThemeDrawer.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UserListing from "./pages/UserListing.jsx";

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar onOpenTheme={() => setDrawerOpen(true)} />

      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UserListing />} />
        </Routes>
      </main>

      {drawerOpen && <ThemeDrawer onClose={() => setDrawerOpen(false)} />}
    </div>
  );
}
