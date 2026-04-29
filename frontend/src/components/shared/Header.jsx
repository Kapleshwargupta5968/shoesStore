import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const { user } = useSelector((state) => state.auth);

    const navItems = {
        public: [
            { id: 1, name: "Home", path: "/" },
            { id: 2, name: "Register", path: "/signup" },
            { id: 3, name: "Login", path: "/signin" }
        ],
        private: [
            { id: 1, name: "Products", path: "/products" },
            { id: 2, name: "Cart", path: "/cart" },
            { id: 3, name: "Checkout", path: "/checkout" },
            { id: 4, name: "Profile", path: "/profile" },
            { id: 5, name: "Dashboard", path: "/dashboard" },
            { id: 6, name: "Logout", path: "/logout" }
        ]
    };

    return (
        <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl text-white">SS</div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        SS Store
                    </h1>
                </div>
                <nav>
                    <ul className="flex items-center gap-6">
                        {
                            user ? (
                                navItems.private.map((item) => (
                                    <li key={item.id}>
                                        <NavLink 
                                            to={item.path}
                                            className={({ isActive }) => 
                                                `text-sm font-medium transition-colors hover:text-blue-500 ${isActive ? 'text-blue-500' : 'text-slate-400'}`
                                            }
                                        >
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ))
                            ) : (
                                navItems.public.map((item) => (
                                    <li key={item.id}>
                                        <NavLink 
                                            to={item.path}
                                            className={({ isActive }) => 
                                                `text-sm font-medium transition-colors hover:text-blue-500 ${isActive ? 'text-blue-500' : 'text-slate-400'}`
                                            }
                                        >
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ))
                            )
                        }
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header