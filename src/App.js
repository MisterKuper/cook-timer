import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Pages/Home/Home.js';
import Timer from './Pages/Timer/Timer.js';
import { useEffect, useState } from 'react';
import Preloader from './components/Preloader/Preloader.js';

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
      <div className="App">
        {loading && <Preloader />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/timer/:name/:time' element={<Timer />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
