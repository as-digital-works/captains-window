import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { PilotTrainingPage } from "./pages/services/PilotTrainingPage";
import { AviationCoursePage } from "./pages/services/AviationCoursePage";
import { ConsultancyPage } from "./pages/services/ConsultancyPage";
import { DestinationsPage } from "./pages/DestinationsPage";
import { GalleryPage } from "./pages/GalleryPage";
import { TestimonialsPage } from "./pages/TestimonialsPage";
import { ContactPage } from "./pages/ContactPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/pilot-training" element={<PilotTrainingPage />} />
          <Route path="/services/aviation-course" element={<AviationCoursePage />} />
          <Route path="/services/aviation-education-consultancy" element={<ConsultancyPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
