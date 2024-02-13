import './App.css';
import '@fontsource/inter';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import AppLogin from './pages/login';
import Layout from './layouts/Layout';
import { ToastContainer } from 'react-toastify';
import Home from './pages/home';
import { AuthContextProvider } from './context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import TeamExample from './pages/landing';
import Album from './components/Album';
import Pricing from './components/Pricing';
import Settings from './pages/settings';
// import Login from './pages/login';
import Singin from './pages/Singin';
import Register from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <Router>
        <AuthContextProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<TeamExample />} />
          {/* <Route path="/event" element={<Album />} /> */}
          {/* <Route path="/pricing" element={<Pricing />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/login" element={<Singin />} />
          <Route path="/register" element={<Register/>} />

          {/* <Route path="" element={} /> */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/passes/:id" element={<Home />} />
            {/* <Route path="/settings" element={<Settings/>} /> */}
          </Route>
        </Routes>
        </AuthContextProvider>
      </Router>
  );
}

export default App;
