<template>
    <div class="inquiries-cont" id="inquiries-cont">
      <div class="div1" id="listInquiryHeader">
        <h4>Inquiries</h4>
      </div>

      <div class="div2" id="listInquiryContainer">
        <progress-loading v-if="isLoading" type="spin"></progress-loading>
        <table v-else>
          <tbody v-for="(item,index) in listInquiries" :key="index" >
            <tr @click="showCard(item.inquiryId)" :class="{shade: item.mark || item.approvalStatus ==='approved' || item.approvalStatus ==='rejected'}">
              <td class="name">{{ numberIndex(index)}} {{ item.name }}</td>
              <td class="about">{{ item.subject }} {{ item.context }}</td>
              <td class="date">               
                <span class="dateText">
                  {{ item.date }}
                </span>
              </td>
            </tr>
            <tr >
              <td colspan="3" v-if="item.inquiryId === focusedID" style="padding: 1rem;" :class="classLiMaker(item.mark,index)">
                <inquiries-card             
                  :obj="item"
                  @close-card="closeCard"
                  :class-name="classLiMaker(item.mark,index)"
                />
              </td>
            </tr>
            
            
 
   
          </tbody>
        </table>
         
      </div>

     
      
    </div>
  </template>
  
  <script>
  import InquiriesCard from './InquiriesCard.vue';
  export default {
    components: {InquiriesCard},
    data(){
      return{
        isLoading: false,
        focusedID: null,
      }
    },
    methods: {
      closeCard(){
        this.focusedID = null
      },
      classLiMaker(mark,index){
        const className = mark+'_'+index
        // console.log(className)
        return className
      },
      showCard(id){
        this.focusedID = id
      },
      numberIndex(index){
        return index + 1 + '. '
      }
    },
    computed:{
      listInquiries(){
        return this.$store.getters['inquiries/listInquiriesGetter']
      },

    },

    async mounted(){
      const list = this.$store.getters['inquiries/listInquiriesGetter']

      console.log(list)
    }

  }
  </script>
  
  <style scoped>

.shade{
  font-weight: 400;
  background-color: transparent;
}

.inquiries-cont{
    width: 80vh;
    flex-grow: 1;
    min-height: 90vh;
    padding: 1rem;
    border-left: 2px solid rgba(0, 0, 0, 0.5);
    position: relative;
}
h4{
  padding: 0;
  margin: 0;
}
.inquiries-cont .div1{
    /* border: 1px solid black; */
    width:100%;
    /* height: 10px; */
    border-bottom: 1px solid black;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}
.inquiries-cont .div2{
    width:100%;
    min-height: 85vh;
    display: flex;
    justify-content: start;
    align-items: flex-start;
    position: relative;
}
.inquiries-cont .div2 table{
  width: 100%;
  table-layout: fixed;
  background-color: rgba(255, 255, 255, 0.562);
}
tr{
  border-bottom: 1px solid black;
  cursor: pointer;
  width: 100%;
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.1);
}
.trash-icon{
  visibility: hidden;
}
.trash-icon:hover{
  color: #b0bbcf;
}
.trash-icon:active{
  color: black;
}
tr:hover{
  box-shadow: inset 0 0 1px 1px rgba(0, 0, 0, 0.64);
}
tr:hover .trash-icon{
  visibility: visible;
}
.name{
  padding: .5rem;
  width: 20%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.about{
  padding: .5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 60%;
  padding: 0 2rem 0 1rem;
}
.date{
  padding: .5rem;
  width:15%;
  text-align: center;
}
  </style>