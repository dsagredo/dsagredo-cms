import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import Button from '../components/button';
import Input from '../components/input';

const Login: FC = (): JSX.Element => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Please enter both username and password');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        try {
            await new Promise((resolve: (value: unknown) => void): number =>
                setTimeout(resolve, 1000)
            );

            // For demo purposes, check for specific credentials
            if (username === 'admin' && password === 'admin') {
                // Store auth state
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('user', JSON.stringify({ username }));

                navigate('/home');
            } else {
                setError('Incorrect username or password');
            }
        } catch {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="bg-white/5 rounded-lg shadow-md overflow-hidden">
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Usuario"
                                type="text"
                                value={username}
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                ): void => setUsername(e.target.value)}
                                fullWidth
                                required
                                disabled={isLoading}
                            />

                            <Input
                                label="Contraseña"
                                type="password"
                                value={password}
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                ): void => setPassword(e.target.value)}
                                fullWidth
                                required
                                disabled={isLoading}
                                error={error}
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                fullWidth
                                isLoading={isLoading}
                                leftIcon={<LogIn size={16} />}
                            >
                                Sign In
                            </Button>

                            {error && (
                                <p className="text-center text-sm text-red-600 mt-2">
                                    {error}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
