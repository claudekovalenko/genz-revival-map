import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import StatePage from "./pages/StatePage";
import EventPage from "./pages/EventPage";
import Insights from "./pages/Insights";
import Findings from "./pages/Findings";
import About from "./pages/About";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="state/:code" element={<StatePage />} />
          <Route path="event/:id" element={<EventPage />} />
          <Route path="insights" element={<Insights />} />
          <Route path="findings" element={<Findings />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
