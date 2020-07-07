import * as axios from "axios";

const instance = axios.create({
    withCredentials:true,
    baseURL :'https://social-network.samuraijs.com/api/1.0/' ,
    headers: {
        "API-KEY":"42ae6a63-f78a-48c5-a407-bfb7d4346ffc"
    }
})

export const UsersApi = {
    getUsers(currentPage=1, pageSize=10)  {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    Flw(usid) {
        return instance.post(`follow/${usid}`)
            .then(response => {
                return response.data;
            });
    },
    UnFlw(usid) {
        return instance.delete(`follow/${usid}`)
            .then(response => {
                return response.data;
            });
    },
    getProfile(userId) {
    console.warn('Obsolete method,please use ProfileApi object')
        return ProfileApi.getProfile(userId)
    }

}

export const ProfileApi = {
    getProfile(userId) {

        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data;
            });
    },
    getStatus(userId){
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put('profile/status',{status});
    },
    savePhoto(photoFile) {
        let  formdata = new FormData();
        formdata.append("image",photoFile)
        return instance.put('profile/photo', formdata,{
            headers: {"Content-Type": "multipart/form-data"}
        })
    },
    saveProfile(profile) {
        return instance.put('profile', profile)
    }

}

export const Auth = {
    me() {
        return instance.get('auth/me')
    },
    getCaptcha() {
        return instance.get('security/get-captcha-url')
    },
    lohin(email,password,rememberMe=false,captcha=null) {
        return instance.post('auth/login',{email,password,rememberMe, captcha})
    },
    lohout() {
      return instance.delete('auth/login')
    }
}