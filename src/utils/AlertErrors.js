import { toast } from 'react-toastify'

export default function alertErrors(error) {
    switch (error) {
        case "auth/wrong-password":
            toast.warning("contrasena invalida")
            break;
        case "auth/email-already-in-use":
            toast.warning("Email en uso")
            break;
        default:
            toast.warning("Error de servidor, intentelo mas tarde")
            break;
    }
}