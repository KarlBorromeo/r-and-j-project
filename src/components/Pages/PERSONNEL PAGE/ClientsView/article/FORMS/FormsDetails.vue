<template>
  <div class="form-container">
    <header class="header">
      <h3>Forms</h3>
    </header>
    <div class="folderCont" v-if="!openFormsComputed">
      <section class="section1">
        <h5>Submitted Forms</h5>
        
        <div class="flexCont">
          <!-- {{ listSubmittedForms }} -->
          <ul v-for="(item,index) in listSubmittedForms" :key="index">
            <li>
              <section>
                <a :href="item.url" :download="fileName(index)">
                  <form-thumbnail :imgThumbTitle="index" :title="index"></form-thumbnail>
                </a>  
              </section>
            </li>
          </ul>

        </div>
      </section>
<hr>
      <section class="section2">
        <h5>Uploaded Scanned Files</h5>

        <div class="loadingUI" v-if="isLoading">
         <progress-loading type="dot"></progress-loading>
        </div>
        
        <div v-else>
          <h6 v-if="islistUploadedScannedFilesEmpty">NOTHING UPLOADED YET</h6>    
          <ul v-else>
            <li v-for="(file,index) in listUploadedScannedFiles" :key="index" class="uploadedScannedFiles">
                <a :href="file.url" :download="file.filename">{{ file.filename }}</a>
                <font-awesome-icon icon="fa-solid fa-trash-can" class="eraseBtn" v-if="authorizationRoleAdmin" @click="deleteScannedFile(file._id)"/>
            </li>
          </ul>          
        </div>



        <form enctype="multipart/form-data" @submit.prevent="submitUpload">
          <label class="uploadContainer" for="upload">
            <font-awesome-icon class="icon" icon="fa-solid fa-plus" beat size="2x"/>
            <p class="fs-6">Upload File</p>
          </label>
          <div v-if="uploadedFile">
            {{uploadedFileNameComputed}}
          </div>
          <button>Upload</button>
          <input 
          id="upload" 
          type="file"
          accept=".pdf"
          style="display: none;"
          @change="setUploadedFile">
        </form>

      </section>


    </div>

    
  </div>
</template>

<script>
import { toast } from 'vue3-toastify'
// import ContractDetails from './FormComponents/ContractDetails.vue'
// import BirTin from './FormComponents/BirTin.vue'
// import BuyerDeclaration from './FormComponents/BuyerDeclaration.vue'
// import LetterIntent from './FormComponents/LetterIntent.vue'
import LetterOfIntentImage from '@/assets/form-thumbnails/letter-of-intent.jpg'
export default {
  // components: { LetterIntent, BuyerDeclaration,BirTin,ContractDetails},
  props: ['clientObj'],
    data(){
      return{

        isLoading: true,

        formVisible: null,
        openForms: false,

        uploadedFile : null,
        uploadedFileName: null,

        listWithUrl: [],
        emptyList: true,

        LetterOfIntentImage: LetterOfIntentImage,

      }
    },
    methods: {
      fileName(title){
        return title+'.pdf'
      },
      // toggleOpenForms(){
      //   console.log('clicked')
      //   this.openForms = !this.openForms
      //   this.formVisible = null 
      // },
      openForm(param){
        this.openForms = !this.openForms
        if(param === 'letterIntent'){
          this.formVisible = 'letterIntent'
        }else if(param === 'buyerDeclaration'){
          this.formVisible = 'buyerDeclaration'
        }else if (param === 'bir-tin'){
          this.formVisible = 'bir-tin'
        }else{
          this.formVisible = 'contractDetails'
        }
      },
      setUploadedFile(event){
        this.uploadedFile = event.target.files[0]
        this.uploadedFileName = this.uploadedFile.name
        console.log(this.uploadedFile)
      },
      setUpDonwloadable(file){
        const blob = new Blob([file],{type: 'application/pdf'})
        const url = URL.createObjectURL(blob)
        this.uploadedScannedFileURL = url
      },

      //submit uploads
      async submitUpload(){
        if(this.uploadedFile && this.uploadedFileName){
          this.isLoading = true
          const data = new FormData()
          data.append('file',this.uploadedFile)
          console.log(data)
          try{
            console.log(data)
            const response = await this.$store.dispatch('client/uploadScannedFile',{
                                id: this.clientObj.userId,
                                data: data
                              })
            toast.success(response)
          }catch(error){
            console.log(error)
            toast.success(error)
          }
          
          this.$store.dispatch('client/getListScannedFile', this.clientObj.userId)

          this.isLoading = false
        }else{
          console.log('no uploaded')
        }
      },

      async getListScannedFiles(){
        this.isLoading = true
        try{
          await this.$store.dispatch('client/listSubmittedForms',this.clientObj.userId)
          await this.$store.dispatch('client/getListScannedFile', this.clientObj.userId)
          await new Promise(resolve => setTimeout(resolve,500))
          this.isLoading = false
        }catch(error){
          console.log(error)
          toast.error(error)
        }
      },

      async deleteScannedFile(id){
        const confirmed = confirm('Are you sure to delete this file?')
        if(confirmed){
          this.isLoading = true
          try{
            const response = await this.$store.dispatch('client/deleteScannedFile',{userId: this.clientObj.userId, fileId: id})
            toast.success(response)
            await this.$store.dispatch('client/getListScannedFile', this.clientObj.userId)

          }catch(error){
            toast.error(error)
          }
          this.isLoading = false
        }
        
      }
    },



    computed:{
      openFormsComputed(){
          return this.openForms
      },
      uploadedFileNameComputed(){
        return this.uploadedFileName
      },
      islistUploadedScannedFilesEmpty(){
        const list = this.$store.getters['client/listCurrentClientScannedFilesGetter']
        if(list.length <= 0){
          return true
        }else{
          return false
        }
      },   
      listUploadedScannedFiles(){
        return this.$store.getters['client/listCurrentClientScannedFilesGetter']
      },
      listSubmittedForms(){
        return this.$store.getters['client/listSubmittedFormsGetter']
      },
      authorizationRoleAdmin(){
        return this.$store.getters['auth/authorizationRoleAdmin']
      },

    },

    mounted(){
      console.log(this.getListScannedFiles())
      console.log(this.clientObj)
    }
 
}
</script>

<style scoped>
.uploadContainer{
  display: flex;
  flex-direction: column;
 
}
p{
  font-size: clamp(.6rem, 1vw, 1.5rem);
}
.form-container{
  /* overflow-y: auto; */
  padding: .5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
.header{
  margin-bottom: 1rem;
}
.folderCont{
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.folderCont .section1{
  flex-grow: 1;
}
.folderCont .section1 .flexCont{
  /* display: flex;
  gap: 1rem; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}
ul{
  list-style: none;
  padding: 0;
}
.flexCont section{
  text-align: center;
  /* border: 1px solid black; */
  /* width: 25%; */
  /* padding: .2rem .5rem .5rem; */
  cursor: pointer;
}
@media screen and (max-width: 850px) {
  .folderCont .section1 .flexCont{

  grid-template-columns: 1fr 1fr;

  }
}
.flexCont section:hover{
  background-color: rgba(0, 0, 0, 0.1);
}
.flexCont section:active{
  background-color: #C2E7FF;
}
.flexCont img{
  width: 100%;
  border: 1px solid black;
}
.section2{
  margin-bottom: 2rem;
}
.section2 form{
  margin-top: .5rem;
}
.section2 form label{
  padding: .5rem 1rem;
  /* border: 1px solid black; */
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  gap: .5rem;
  align-items: center;
}
.section2 form label:hover{
  background-color: #C2E7FF;
}
.section2 form label:hover .icon{
  color:black;
}
.icon{
  color: rgba(0, 0, 0, 0.2);
}
.section2 form button{
  width: 100%;
  border: none;
  color: white;
  background-color:#31A72A; 
  padding: .5rem 0 ;
  font-weight: 700;
  border-top: none;
  transition: all .3s ease-in-out;
}
.section2 form button:hover{
  background-color: #30a72a8e;
  color: black;
}
.section2 form button:active{
  color: black;
}
.section2 form div{
 text-align:center; 
 font-style: oblique; 
 border: 1px solid black;
 border-top: none;
 border-bottom: none;
}
.loadingUI{
  display: flex;
  justify-content: center;
  position: relative;
  padding: 1rem;
}
.uploadedScannedFiles{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .2rem 2rem;
  cursor: default;
  transition: all .3s ease-in-out;
  border-radius: 3px;
}
.uploadedScannedFiles:hover{
  background-color: rgba(0, 0, 0, 0.1);
}
.eraseBtn{
    color: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: all .3s ease-in-out
}
.eraseBtn:hover{
    color: rgba(0, 0, 0, 0.8);
}
</style>