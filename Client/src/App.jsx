import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './Pages/About';
import Home from './Pages/Home';
import UserPage from './Pages/UserPage';
import CodeOfConduct from './Pages/CodeOfConduct';
import NoPage from './Pages/NoPage';
import EventsPage from './Pages/EventsPage';
import NavBar from './Components/NavBar';
import { UserIdProvider } from './Components/UserEvents/UserIdContext';

function App() {
  return (
    <UserIdProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/EventsPage" element={<EventsPage />} />
          <Route path="/CodeOfConduct" element={<CodeOfConduct />} />
          <Route path="/UserPage" element={<UserPage/>} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </UserIdProvider>
  );
}

export default App;

