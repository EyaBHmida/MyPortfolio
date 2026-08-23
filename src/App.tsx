import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage.tsx';
import { SecondPage } from './pages/SecondPage.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SecondPage />} />
        <Route path="/second" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
