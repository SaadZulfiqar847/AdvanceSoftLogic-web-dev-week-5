import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Cities from './pages/Cities';
import CityDetail from './pages/CityDetail';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';

function App() {
  const location = useLocation();

  return (
    <>
      <NavBar />
      {/* key={location.pathname} forces this div to remount on every
          route change (including different :cityName values), which
          restarts the CSS animation defined on .page-transition */}
      <div className="page-transition" key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/cities/:cityName" element={<CityDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;