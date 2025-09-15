import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { TeamPage } from './pages/TeamPage';
import { AdminPage } from './pages/AdminPage';
import { JudgePage } from './pages/JudgePage';
import { ResultsPage } from './pages/ResultsPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/team/:teamId" element={<TeamPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/judge" element={<JudgePage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;