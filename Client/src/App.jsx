import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './Pages/About';
import Home from './Pages/Home';
import UsersPage from './Pages/UsersPage';
import CodeOfConduct from './Pages/CodeOfConduct';
import NoPage from './Pages/NoPage'
import EventsPage from './Pages/EventsPage';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home/>} />
            <Route path="/Home" element={<Home/>} />
            <Route path="/About" element={<About/>} />
            <Route path="/EventsPage" element={<EventsPage/>} />
            <Route path="/CodeOfConduct" element={<CodeOfConduct/>} />
            <Route path="/UsersPage" element={<UsersPage/>} />
            <Route path="*" element={<NoPage/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App

