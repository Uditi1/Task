import { useEffect } from "react";
import {LoadingOutlined} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { getAccountStatus } from "../actions/stripe";
import { updateUserInlocalStorage } from "../actions/auth";

const StripeCallback = ({navigate}) => {

    const {auth} = useSelector((state) => ({...state}));
    const dispatch = useDispatch();

    useEffect(() => {
        if(auth && auth.token) accountStatus()
    },[auth])

    const accountStatus = async () => {
        try{
            const res = await getAccountStatus(auth.token)
            //console.log('USER ACCOUNT STATUS ON STRIPE CALLBACK', res);
            // update user in local storage
            updateUserInlocalStorage(res.data, () => {
                // update user in redux
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: res.data,
                });
                // redireact user to dashboard
                window.location.href = "/dashboard/seller";
            });
        }catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="d-flex justify-content-center p-5">
            <LoadingOutlined className="h1 p-5 text-danger" />
        </div>
    )
}

export default StripeCallback;