import * as API from '@/APIs/PERSONNEL/InquiriesAPI.js'
import store from '@/store/store.js'
export default{

    namespaced: true,
    state(){
        return{
            listInquiries:[]
        }
    },

    mutations:{
        setInquiriesList(state,list){
            // console.log(list)
            state.listInquiries = list.slice().reverse()
        },
        markInquiry(state,id){
            const index = state.listInquiries.findIndex(item => item.inquiryId === id)
            state.listInquiries[index].mark= !state.listInquiries[index].mark
        },
    },

    actions: {
        async getInquiriesList(context){
            store.dispatch('auth/monitorTokenSpan')
            try{
                const response = await API.requestInquiriesList()
                context.commit('setInquiriesList',response.data[0].inquiries)
            }catch(error){
                console.error(error)
            }
        },
        async markInquiry(context,id){
            store.dispatch('auth/monitorTokenSpan')
            try{
                const response = await API.markInquiry(id)
                console.log(response)
                context.commit('markInquiry',id)
            }catch(error){
                console.error(error)
                throw error
            }
        },
        async approveUpdateRequest(_,payload){
            store.dispatch('auth/monitorTokenSpan')
            try{
                const response = await API.approveUpdateRequest(payload)
                console.log(response)
                return response.message
            }catch(error){
                console.error(error)
                throw error
            }
        }

    },

    getters: {
        listInquiriesGetter(state){
            return state.listInquiries
        }
    }
}