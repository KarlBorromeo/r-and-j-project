<template>
    <h5>PROPERTY DETAILS</h5>
    <div class="">
        <div class="">
          <div class="form-floating mb-1">
            <input type="text" class="form-control" id="floatingInput" placeholder="project name" v-model="projectName">
            <label for="floatingInput"><span>*</span> Project Name:</label>
          </div>
        </div>

        <div class="">
          <div class="form-floating mb-1">
            <input type="text" class="form-control" id="floatingInput" placeholder="lot no/unit no" v-model="lotUnit">
            <label for="floatingInput"><span>*</span> Lot(s) No/Unit No:</label>
          </div>
        </div>
    </div> 
    
    <div class="mb-3"> 
        <p>Purpose of Purchase:</p>
        <div class="form-check" @click="resetOther">
            <input class="form-check-input" type="radio" name="purposePurchase" id="primary" value="primary residence" v-model="purposePurchase">
            <label class="form-check-label" for="primary">
            Primary Residence
            </label>
        </div>
        <div class="form-check" @click="resetOther">
            <input class="form-check-input" type="radio" name="purposePurchase" id="secondary" value="secondary residence" v-model="purposePurchase">
            <label class="form-check-label" for="secondary">
            Secondary Residence
            </label>
        </div>      
        <div class="form-check" @click="resetOther">
            <input class="form-check-input" type="radio" name="purposePurchase" id="tertiary" value="tertiary residence" v-model="purposePurchase">
            <label class="form-check-label" for="tertiary">
            Tertiary Residence
            </label>
        </div>      
        <div class="form-check" @click="resetOther">
            <input class="form-check-input" type="radio" name="purposePurchase" id="investment" value="investment" v-model="purposePurchase">
            <label class="form-check-label" for="investment">
            Investment
            </label>
        </div>    
        <div class="form-check">
            <label for="exampleFormControlInput1" class="form-label">Others, specify</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="specify here..." v-model="purposePurchaseOther" @input="setPurposePurchase">
        </div>  
        </div>

        <div class="mb-5"> 
        <p>THE BUYERS DESIRE THE PURCHASE TO BE REGISTERED AS:</p>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="registeredAs" id="sole" value="sole" v-model="buyerDesirePurchase">
            <label class="form-check-label" for="sole">
            Sole
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="registeredAs" id="married" value="married" v-model="buyerDesirePurchase">
            <label class="form-check-label" for="married">
            Married
            </label>
        </div>      
        <div class="form-check">
            <input class="form-check-input" type="radio" name="registeredAs" id="partnership" value="partnership" v-model="buyerDesirePurchase">
            <label class="form-check-label" for="partnership">
            Partnership
            </label>
        </div>      
        <div class="form-check">
            <input class="form-check-input" type="radio" name="registeredAs" id="corporation" value="corporation" v-model="buyerDesirePurchase">
            <label class="form-check-label" for="corporation">
            Corporation
            </label>
        </div>    
    </div>
</template>

<script>
export default{
    data(){
        return {
            purposePurchaseOther: null,

            //use these
            projectName : null,
            lotUnit : null,
            purposePurchase : null,
            buyerDesirePurchase : null,
        }
    },
    methods:{
        resetOther(){
            this.purposePurchaseOther = ''
        },
        setPurposePurchase(){
            this.purposePurchase = this.purposePurchaseOther
        },
        passData(){
            this.$emit('passData',
                {
                    projectName: this.projectName,
                    lotUnit: this.lotUnit,
                    purposePurchase: this.purposePurchase,
                    buyerDesirePurchase: this.buyerDesirePurchase
                }
            )
        }
    },
    watch:{
        projectName(){
            this.passData()
        },
        lotUnit (){
            this.passData()
        },
        purposePurchase(){
            this.passData()
        },
        buyerDesirePurchase(){
            this.passData()
        },
    },
    created(){
        const lotDetails = this.$store.getters['subdivision/lotNumberSelectedGetter']
        this.projectName = lotDetails.projectName
        this.lotUnit = lotDetails.lotNumberSelected
    }

}
</script>


<style scoped>
h5{
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.4);
    text-align: center;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.1);
}
</style>

