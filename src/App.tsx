import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Pages
import Login from './pages/Login';
import Portfolio from './pages/Portfolio';
import NewPortfolio from './pages/NewPortfolio';
import EditPortfolio from './pages/EditPortfolio';

// Auth
import AuthGuard from './components/auth/AuthGuard';

const App = (): JSX.Element => {
    return (
        <AuthGuard>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<MainLayout />}>
                    <Route
                        index
                        element={<Navigate to="/portfolio" replace />}
                    />
                    <Route path="portfolio" element={<Portfolio />} />
                    <Route path="portfolio/new" element={<NewPortfolio />} />
                    <Route
                        path="portfolio/:id/edit"
                        element={<EditPortfolio />}
                    />
                </Route>
            </Routes>
        </AuthGuard>
    );
};

export default App;
