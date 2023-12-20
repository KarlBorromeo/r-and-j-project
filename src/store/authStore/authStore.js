
import * as Auth from '@/APIs/AUTH/AuthAPI.js'

export default {
    namespaced: true,
    
    state(){
        return{
            role: null,
            tokenID: null,
            userId: null,
            profilePic: null,
            fullname: null,

            openLoginForm: false,
        }
    },
    mutations:{
        toggleLoginForm(state,bool){
            state.openLoginForm = bool
        },
        addStoreState(state,responseData){
            state.role = responseData.roles
            state.tokenID = responseData.tokenID
            state.userId = responseData.userId
            state.profilePic = responseData.profilePic
            state.fullname = responseData.fullname
        },
        eraseStoreState(state){
            state.role = null;
            state.tokenID = null
            state.userId = null
            state.profilePic = null
            state.fullname = null
        },
        addLocalStorage(_,responseData){
            console.log(responseData)
            localStorage.setItem('user',responseData.roles)
            localStorage.setItem('token',responseData.tokenID)
            localStorage.setItem('userId',responseData.userId)
            localStorage.setItem('profilePic',responseData.profilePic)
            localStorage.setItem('fullname',responseData.fullname)
        },
        getLocalStorage(state){
            state.role = localStorage.getItem('user')
            state.tokenID = localStorage.getItem('token')
            state.userId = localStorage.getItem('userId')
            state.profilePic = localStorage.getItem('profilePic')
            state.fullname = localStorage.getItem('fullname')
        },
        eraseLocalStorage(){
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            localStorage.removeItem('profilePic')
            localStorage.removeItem('fullname')
        },

        updateProfilePictureLocal(state,file){
            const blob = new Blob([file],{ type: file.type })
            const url = URL.createObjectURL(blob)
            localStorage.setItem('profilePic',url)
            state.profilePic = url
        }

    },
    actions:{
        //LOGIN REQUEST
        async login(context, credentials){
            console.log('login clicked')
            try{
               const responseData = await Auth.login(credentials);

                const Data = {
                    tokenID: responseData.data.token,
                    roles: responseData.data.roles,
                    userId: responseData.data.userId,
                    profilePic: responseData.data.profilePicture.url,
                    fullname: responseData.data.fullname
                }

                context.commit('addLocalStorage',Data)
                context.commit('addStoreState',Data)

                return responseData;

            }catch(error){
                console.log(error)
                throw error
            }
  
        },

        //SIGNUP REQUEST
        async signup(context,credentials){
            console.log('signup clicked')
            console.log(credentials)
            try{
                //change this to HTTP REQUEST
                const responseData = await Auth.signUp(credentials);

                const Data = {
                    
                    tokenID: responseData.data.token,
                    roles: responseData.data.roles,
                    userId: responseData.data.userId
                }

                context.commit('addLocalStorage',Data)
                context.commit('addStoreState',Data)

                return responseData;

            }catch(error){
                console.log(error)
                throw error
            }
  
        }
    },
    getters: {
        openLoginFormGetter(state){
            return state.openLoginForm
        },
        authGetter(state){
            // console.log(state.role)
            if(state.role && state.tokenID){
                return true
            }else{
                return false
            }
        },
        getTokenID(state){
            return state.tokenID
        },
        authorizationRoleGuest(state){
            if(state.role && state.tokenID){
                if(state.role === 'customer' || state.role === 'realtor'){
                    return true
                }else{
                    return false
                }
            }else{
                return false
            }
        },
        authorizationRoleStaff(state){
            if(state.role && state.tokenID){
                if(state.role === 'staff'){
                    return true
                }else{
                    return false
                }
            }else{
                return false
            }
        },
        authorizationRoleAdmin(state){
            if(state.role && state.tokenID){
                if(state.role === 'management'){
                    return true
                }else{
                    return false
                }
            }else{
                return false
            }
        },
        authorizationPersonnel(state){
            if(state.role && state.tokenID){
                if(state.role !== 'customer' && state.role !== 'realtor'){
                    return true
                }else{
                    return false
                }
            }else{
                return false
            }
        },
        authorizationPersonnelTEXT(state){
            if(state.role && state.tokenID){
                if(state.role === 'staff'){
                    return 'staff'
                }else if(state.role === 'management'){
                    return 'admin'
                }
            }else{
                return 'SOMETHING UNKNONW'
            }
        },

        authorizationRealtor(state){
            if(state.role && state.tokenID){
                if(state.role === 'realtor'){
                    return true
                }else{
                    return false
                }
            }
        },

        getRoleType(state){
            if(state.role && state.tokenID){
                console.log(state.role)
                return state.role
            }else{
                return undefined
            }
        },

        getUserId(state){
            if(state.userId){
                return state.userId
            }else{
                return null
            }
        },

        profilePicGetter(state){
            if(state.profilePic){
                return state.profilePic
            }else{
                return 'hahahah'
            }
        },

        fullnameGetter(state){
            return state.fullname
        }
    }

}