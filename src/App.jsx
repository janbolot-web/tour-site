import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import Home from './pages/Home';
import Tours from './pages/Tours';
import Sights from './pages/Sights';
import AboutUsPage from './pages/AboutUs';
import Contact from './pages/Contact';
import TourDetail from './pages/TourDetail';
import Gallery from './pages/Gallery';
import GuideProfile from './pages/GuideProfile';
import TermsOfService from './pages/TermsOfService';

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Header onBookNow={() => setBookingOpen(true)} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours onBookNow={() => setBookingOpen(true)} />} />
            <Route path="/tours/:id" element={<TourDetail onBookNow={() => setBookingOpen(true)} />} />
            <Route path="/sights" element={<Sights />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/team/:id" element={<GuideProfile />} />
            <Route path="/terms-and-conditions" element={<TermsOfService />} />
          </Routes>
        </main>
        <Footer />
        <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
