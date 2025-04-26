import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SearchModels from '../pages/SearchModels';
import CreateModel from '../pages/CreateModel';


const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchModels />} />
      <Route path="/create" element={<CreateModel />} /> 
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;


