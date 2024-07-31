import 'react-toastify/dist/ReactToastify.css';
import {  ToastContainer } from 'react-toastify'


const AuthNotification = () => {
    return <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
        transition:Bounce
    />

}

export default AuthNotification