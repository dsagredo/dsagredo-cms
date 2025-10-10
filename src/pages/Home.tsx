import { FC, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Plus } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { Post } from '../types';
import { MESSAGES } from '../constants/messages';
import { getProjects, PortfolioProject, deleteProject } from '../api/portfolioApi';

const Home: FC = (): JSX.Element => {
    const [projects, setProjects] = useState<PortfolioProject[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleDeletePost = async (id: string): Promise<void> => {
        if (window.confirm(MESSAGES.DELETE_CONFIRMATION)) {
            try {
                await deleteProject(id);
                setProjects(projects.filter(p => p._id !== id));
            } catch (error) {
                console.error('Error deleting post:', error);
                alert(MESSAGES.DELETE_ERROR);
            }
        }
    };

    const handleSignOut = (): void => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="animate-slide-up">
                    <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                        Portafolio
                    </h1>
                    <p className="text-slate-400 text-sm">
                        Gestiona tu contenido creativo
                    </p>
                </div>
                <div className="flex">
                    <Link to="/portfolio/new" className="animate-slide-up">
                        <Button
                            title="Nueva"
                            variant="primary"
                            leftIcon={<Plus size={16} />}
                        />
                    </Link>
                    <button
                        onClick={handleSignOut}
                        className="text-sm font-medium text-white w-full"
                    >
                        <LogOut size={20} className="mr-3" />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-12 text-center animate-scale-in">
                    <p className="text-slate-400">Cargando proyectos...</p>
                </div>
            ) : projects.length === 0 ? (
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-12 text-center animate-scale-in">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                        <Plus size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                        {MESSAGES.NO_POSTS_FOUND}
                    </h3>
                    <p className="text-slate-400 mb-6">
                        {MESSAGES.CREATE_FIRST_POST}
                    </p>
                    <Link to="/portfolio/new">
                        <Button variant="primary" leftIcon={<Plus size={16} />}>
                            {MESSAGES.CREATE_FIRST_PORTFOLIO}
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(
                        (project: PortfolioProject, index: number): JSX.Element => (
                            <div
                                key={project._id}
                                className="animate-slide-up"
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                }}
                            >
                                <Card data={project} onClick={handleDeletePost} />
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
