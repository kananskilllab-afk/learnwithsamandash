import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import WhatIsIelts from "./pages/WhatIsIelts.jsx";
import Courses from "./pages/Courses.jsx";
import RecordedCourse from "./pages/RecordedCourse.jsx";
import LiveCourse from "./pages/LiveCourse.jsx";
import MockTests from "./pages/MockTests.jsx";
import StudentSuccess from "./pages/StudentSuccess.jsx";
import About from "./pages/About.jsx";
import StudyAbroad from "./pages/StudyAbroad.jsx";
import Faq from "./pages/Faq.jsx";
import Login from "./pages/Login.jsx";
import ThankYou from "./pages/ThankYou.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/what-is-ielts" element={<WhatIsIelts />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/recorded-ielts-course" element={<RecordedCourse />} />
        <Route path="/live-ielts-course" element={<LiveCourse />} />
        <Route path="/mock-tests" element={<MockTests />} />
        <Route path="/success-stories" element={<StudentSuccess />} />
        <Route path="/about" element={<About />} />
        <Route path="/study-abroad" element={<StudyAbroad />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/login" element={<Login />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
