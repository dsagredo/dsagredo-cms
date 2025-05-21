import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';

const Login: FC = (): JSX.Element => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Please enter both username and password');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        try {
            await new Promise((resolve): number => setTimeout(resolve, 1000));

            // For demo purposes, check for specific credentials
            if (username === 'admin' && password === 'admin') {
                // Store auth state
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('user', JSON.stringify({ username }));

                navigate('/portfolio');
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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Blog CMS
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Sign in to your account
                    </p>
                </div>

                <Card>
                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                fullWidth
                                required
                                disabled={isLoading}
                            />

                            <Input
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
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
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Login;
