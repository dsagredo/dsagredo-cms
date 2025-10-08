import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const MainLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-20 lg:hidden animate-fade-in"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <button
                className="lg:hidden fixed top-4 left-4 z-30 p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" />
            </button>

            <div
                className={`
        fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
            >
                <Sidebar onClose={() => setIsSidebarOpen(false)} />
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
