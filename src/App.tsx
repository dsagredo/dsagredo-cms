import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
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
                    <Route path="home" element={<Home />} />
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
