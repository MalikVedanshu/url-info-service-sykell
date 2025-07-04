import './App.css';
import {Routes, Route} from "react-router-dom";
import TestPage from './pages/test';

function App() {


  return (
    <Routes>

      <Route path="/test" element={<TestPage />} />
    </Routes>
  )
}

export default App;
