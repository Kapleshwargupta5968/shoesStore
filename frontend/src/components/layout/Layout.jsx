import { Outlet } from "react-router-dom"
import Header from "../shared/Header"
import Footer from "../shared/Footer"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "../../services/api/authServices"
import { authSuccess, authFailure, setLoading } from "../../features/auth/authSlice"

const Layout = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchUser = async () => {
            const hasSession = localStorage.getItem("hasSession") === "true";
            if (hasSession && !user) {
                try {
                    const response = await getCurrentUser();
                    dispatch(authSuccess(response.user));
                } catch (error) {
                    localStorage.removeItem("hasSession");
                    dispatch(authFailure(error?.response?.data?.message || "Session expired"));
                }
            } else {
                dispatch(setLoading(false));
            }
        };

        fetchUser();
    }, [dispatch, user]);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout