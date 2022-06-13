import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DiverrPage from './pages/DiverrPage';
import EditUserPage from './pages/EditUserPage';
import MyDiverrsPage from './pages/MyDiverrsPage';
import NewDiverrPage from './pages/NewDiverrPage';
import OrderMenu from './components/OrderMenu';
import { useState } from 'react';
import FilterMenu from './components/FilterMenu';
import { useEffect } from 'react';

function App() {
  const [hidden, setHidden] = useState(true);
  const location = useLocation();

  useEffect(() => {
    location.pathname === '/' ? setHidden(false) : setHidden(true);
  }, [location.pathname]);

  return (
    <main>
      <Header hideSearchBar={hidden} />
      <menu className="order-filter-menu">
        <FilterMenu hidden={hidden} />
        <OrderMenu hidden={hidden} />
      </menu>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create/" element={<NewDiverrPage />} />
        <Route path="/diverr/:id" element={<DiverrPage />} />
        <Route path="/user/:id/diverr" element={<MyDiverrsPage />} />
        <Route path="/user/:id" element={<EditUserPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
