import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css';
import Favorites from './components/Favorite';

const Home = lazy(() => import("./components/Home"));

function App() {

  return (
    <div className="App">
      <Suspense fallback={<div>.</div>}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/favoritos" element={<Favorites />} /> 
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;


