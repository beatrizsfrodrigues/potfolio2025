import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "@radix-ui/themes/styles.css";
import { Theme, Button } from "@radix-ui/themes";

import Home from "./components/Home";
import Projects from "./components/Projects";

function App() {
  const location = useLocation();
  const state = location.state || {};

  return (
    <div>
      <nav>
        <Link to="/" className="navLink">
          Home
        </Link>
        <div>
          <Link to="/projects" className="navLink">
            Projects
          </Link>
          <Button radius="full" variant="solid" size="4">
            Get my CV!
          </Button>
        </div>
      </nav>

      <Routes location={state.backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>

      {/* {state.backgroundLocation && (
        <Routes>
          <Route path="/villager/:name" element={<VillagerInfo />} />
        </Routes>
      )} */}
      <div className="line"></div>
      <footer>
        <p>© 2025 Beatriz Rodrigues</p>
      </footer>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Theme
      appearance="dark"
      accentColor="violet"
      data-theme="dark"
      className="app"
    >
      <Router>
        <App />
      </Router>
    </Theme>
  );
}
