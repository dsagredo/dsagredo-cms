import { Routes, Route } from 'react-router-dom';

// Layouts
import Main from './layout/Main';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';

// Auth
import Auth from './auth';

const App = (): JSX.Element => (
    <Auth>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Main />}>
                <Route path="home" element={<Home />} />
                <Route path="portfolio/new" element={<New />} />
                <Route path="portfolio/:id/edit" element={<Edit />} />
            </Route>
        </Routes>
    </Auth>
);

export default App;
