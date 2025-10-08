import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FileText, LogOut, X } from 'lucide-react';

interface SidebarProps {
    onClose?: () => void;
}

interface SidebarLinkProps {
    to: string;
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
    to,
    icon,
    label,
    onClick,
}): JSX.Element => {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }): string =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors
        ${
            isActive
                ? 'text-blue-900'
                : 'text-white hover:bg-gray-100 hover:text-gray-900'
        }`
            }
        >
            <span className="mr-3 h-5 w-5">{icon}</span>
            {label}
        </NavLink>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ onClose }): JSX.Element => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-r border-gray-200 flex flex-col">
            <div className="px-6 py-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">
                        Blog CMS
                    </h1>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                <SidebarLink
                    to="/portfolio"
                    icon={<FileText size={20} />}
                    label="Portafolio"
                    onClick={onClose}
                />
            </nav>

            <div className="px-3 py-4 border-t border-gray-200">
                <button
                    onClick={handleSignOut}
                    className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-md w-full hover:bg-gray-100"
                >
                    <LogOut size={20} className="mr-3" />
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
