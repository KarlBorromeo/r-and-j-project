<template>
  <div class="c-cont property-details">
            <header>PROPERTY DETAILS</header>
            <article>
                <section class="section1" :class="{empty:ispropertyEmpty}">
                    <div>
                        <span>
                            <input type="radio" id="propertyradio1" value="Northtown" v-model="property" disabled>
                            <label for="propertyradio1">Northtown</label>
                        </span>
                        <span>
                            <input type="radio" id="propertyradio2" value="Northcrest" v-model="property" disabled>
                            <label for="propertyradio2">Northcrest</label>
                        </span>
                        <span>
                            <input type="radio" id="propertyradio3" value="Woodlane Residence" v-model="property" disabled>
                            <label for="propertyradio3">Woodlane Residence</label>
                        </span>
                        <span>
                            <input type="radio" id="propertyradio4" value="Fernwood" v-model="property" disabled >
                            <label for="propertyradio4">Fernwood</label>
                        </span>
                        <span>
                            <input type="radio" id="propertyradio5" value="Eden Ridge" v-model="property" disabled >
                            <label for="propertyradio5">Eden Ridge</label>
                        </span>
                        <span>
                            <input type="radio" id="propertyradio6" :value="propertyOther" v-model="property" disabled>
                            <label for="propertyradio6">Others</label>
                            <input style="border: none; border-bottom: 1px solid black;" v-model="propertyOthers" @input="updatePropertyOther" readonly>
                            
                        </span>                       
                    </div>  
                </section>

                <section class="section2" :class="{empty:istypeBuyerEmpty}">
                    <p>Type of Buyer</p>
                    <div><input type="radio" id="typeBuyer1" value="individual" v-model="typeBuyer" disabled><label for="typeBuyer1">Individual</label></div>
                    <div><input type="radio" id="typeBuyer2" value="corporate" v-model="typeBuyer" disabled><label for="typeBuyer2">Corporate</label></div>
                </section>
            </article>
        </div>
</template>

<script>
export default {
    props: ['clientObj'],
    data(){
        return{
            propertyOthers: null,
            typeBuyer: this.clientObj.typeBuyer
        }
    },
    mounted(){
        const property = this.clientObj.property
        if(property === 'v1' || property === 'v2' || property === 'v3' || property === 'v4' || property === 'v5'){
            this.property = property
        }else{
            this.propertyOthers = property
        }
    }
}
</script>

<style scoped>
*{
    font-size: clamp(.6rem, 1.2vw, 2rem);
}
.empty{
    outline: 1px solid red;
    background-color: rgba(255, 0, 0, 0.222);
    box-shadow: 0 0 1px 1px red;
}
input{
    text-align: center;
}
.c-cont header{
    padding: .2rem 0;
    text-align: center;
    border-top: 1px solid black;
    border-right: 1px solid black;
    border-left: 1px solid black;
    background-color: #CFD7EC;
    color: #3D73A9;
    font-weight: 700;

}

.property-details article{
    display: flex;
    border: 1px solid black;
    border-bottom: none;

}
.property-details article .section1 {
    border-right: 1px solid black;
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}
.property-details article .section2 {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: start;
    align-items: center;
    padding: 1rem;
    gap: .5rem;
}
.property-details article .section1 div{
    padding-left: 1rem;
    gap: 1rem;
    display: flex;
    flex-wrap: wrap;
}
.property-details article .section2  div{
    gap: 3px;
    display: flex;
    align-items: center;
}
.property-details article .section1 div span{
    display: flex;
    align-items: center;
    gap: 3px;
}
@media screen and (max-width: 415px) {
    .property-details article {
        flex-direction: column;
    }
    .property-details article .section1{
        border-right: none;
        border-bottom: 1px dashed black;
    }
    .property-details article .section2{
        padding-left: 2rem;
    }
    .property-details article .section2 p{
       font-weight: 700;
    }
    .property-details article .section1,
    .property-details article .section2{
        width: 100%;
    }
    .property-details article .section2{
        align-items: start;
    }
}


</style>