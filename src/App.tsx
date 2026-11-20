import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { NEWS_BASE } from "./data/news";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { PilotTrainingPage } from "./pages/services/PilotTrainingPage";
import { ConsultancyPage } from "./pages/services/ConsultancyPage";
import { DestinationsPage } from "./pages/DestinationsPage";
import { GalleryPage } from "./pages/GalleryPage";
import { TestimonialsPage } from "./pages/TestimonialsPage";
import { ContactPage } from "./pages/ContactPage";
import { CareersPage } from "./pages/CareersPage";
import { NewsPage } from "./pages/NewsPage";
import { NewsDetailPage } from "./pages/NewsDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/pilot-training" element={<PilotTrainingPage />} />
          <Route path="/services/aviation-education-consultancy" element={<ConsultancyPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path={NEWS_BASE} element={<NewsPage />} />
          <Route path={`${NEWS_BASE}/:slug`} element={<NewsDetailPage />} />
          {/* Old /news links (shared in the first client preview) redirect to Aviator's Corner. */}
          <Route path="/news" element={<Navigate to={NEWS_BASE} replace />} />
          <Route path="/news/*" element={<Navigate to={NEWS_BASE} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
