import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";



const PrivateRoute = ({...rest}) => {
    const {auth} = useSelector((state) => ({...state}));

    return auth && auth.token ? <Route {...rest} /> : <Navigate to="/login" />
};

export default PrivateRoute;