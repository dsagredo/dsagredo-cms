import { Routes, Route } from 'react-router-dom';

// Layouts
import Main from './layout/main';

// Pages
import Login from './pages/login';
import Home from './pages/home';
import New from './pages/new';
import Edit from './pages/edit';

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
