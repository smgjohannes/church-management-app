import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/header';
import Admin from './pages/admin';
import MemberForm from './pages/memberForm';
import Payments from './components/finance/finance';
function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/member-form" element={<MemberForm />} />{' '}
        <Route path="/finance" element={<Payments />} />
      </Routes>
    </Router>
  );
}

export default App;
