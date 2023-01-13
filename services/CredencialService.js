import axios from "axios";

const API = process.env.NEXT_PUBLIC_RUTA_API + '/credencial'

export const CredencialServiceObjet = {
    getDatatopbar:()=>{
        return axios.get(`${API}/data-top-bar`)
    }
}

class CredencialService {

    login(data){
        return axios.post(`${API}/login`,data)
    }

    getDatatopbar(){
        return axios.get(`${API}/data-top-bar`)
    }

    changePass(data){
        return axios.post(`${API}/chage-pass`,data)
    }

    sendEmailRestorePass(data){
        return axios.post(`${API}/send-email-restore-pass`, data)
    }

    restorePass(id){
        return axios.post(`${API}/restore-pass`,{idUsuario:id})
    }

}

export default CredencialService
