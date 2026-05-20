import { useMutation } from "@tanstack/react-query"
import { logoutService } from "../../services/auth/auth.service"
import { useCustomToast } from "../ui/UseCustomToast"
import { useDispatch } from "react-redux"
import { logout } from "../../store/userSlice"

export const useLogout = () =>{
    const {showSuccess , showError} = useCustomToast()
    const dispatch = useDispatch()
    
    return useMutation({
        mutationFn : () => logoutService(),
        onSuccess : (data) => {
            dispatch(logout())
            showSuccess(data.message)
        },
        onError : (error : any) => {
            showError(error.response?.data.message || "Something went wrong")
        }
    })
}