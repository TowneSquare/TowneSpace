import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from './components/header';
import Home from './pages/home';
import Studio from './pages/studio';
import Collections from './pages/collections';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/collections" element={<Collections />} />
      </Routes>
    </div>
  );
}

export default App;