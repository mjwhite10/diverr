import './App.css';
import { Routes, Route } from 'react-router-dom';
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
import OrderByMenu from './components/OrderByMenu';
import { useState } from 'react';

function App() {
  const [hidden, setHidden] = useState(true);
  return (
    <main>
      <Header hideSearchBar={hidden} />
      <OrderByMenu hidden={hidden} />
      <Routes>
        <Route path="/" element={<HomePage hideItems={setHidden} />} />
        <Route path="/login" element={<LoginPage hideItems={setHidden} />} />
        <Route
          path="/register"
          element={<RegisterPage hideItems={setHidden} />}
        />
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
