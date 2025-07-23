import './App.css';
import Auth from './pages/authClient';
import NoteApp from './pages/notePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/notePage' element={<NoteApp />} />
      </Routes>
    </Router>
  );
}
export default App;
