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

function App() {
  return (
    <main>
      <Header />
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
