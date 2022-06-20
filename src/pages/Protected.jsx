import { Navigate } from "react-router-dom";

export default function Protected({ children, user }) {
    if (!user) {
        return <Navigate to='/login' />;
    }
    return children;
}