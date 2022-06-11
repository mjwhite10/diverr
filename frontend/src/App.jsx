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
import OrderMenu from './components/OrderMenu';
import { useState } from 'react';

function App() {
  const [hidden, setHidden] = useState(true);
  return (
    <main>
      <Header hideSearchBar={hidden} />
      <OrderMenu hidden={hidden} />
      <Routes>
        <Route path="/" element={<HomePage hideItems={setHidden} />} />
        <Route path="/login" element={<LoginPage hideItems={setHidden} />} />
        <Route
          path="/register"
          element={<RegisterPage hideItems={setHidden} />}
        />
        <Route
          path="/create/"
          element={<NewDiverrPage hideItems={setHidden} />}
        />
        <Route
          path="/diverr/:id"
          element={<DiverrPage hideItems={setHidden} />}
        />
        <Route
          path="/user/:id/diverr"
          element={<MyDiverrsPage hideItems={setHidden} />}
        />
        <Route
          path="/user/:id"
          element={<EditUserPage hideItems={setHidden} />}
        />

        <Route path="*" element={<NotFoundPage hideItems={setHidden} />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
