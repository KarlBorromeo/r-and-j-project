<template>
  <form @submit.prevent="submit">
    <section class="form-controls-icon">
        <font-awesome-icon class="icon" icon="fa-solid fa-x" @click="close"/>
    </section>
    <section class="form-controls">
        <label for="date">Date</label>
        <input type="date" v-model="date">
    </section>
    <section class="form-controls">
        <label for="amount">Amount</label>
        <input type="number" v-model="amount">
    </section>
    <section class="form-controls">
        <label for="purpose">Purpose</label>
        <select id="purpose" v-model="purpose">
            <option value="spot-cash">Spot Cash</option>
            <option value="downpayment">Downpayment</option>
            <option value="reservation">Reservation</option>
            <option value="monthly-payment">Monthly Payment</option>
        </select>   
    </section>
    <section class="form-controls">
        <label for="attacement">Attachements</label>
        <input id="attachment" type="file" accept=".pdf" @change="setAttachment">
    </section>
    <section class="c-btn">
      <button>Submit</button>  
    </section>
    
  </form>
</template>

<script>
import { toast } from 'vue3-toastify'
export default {
    emits: ['exit-btn','refresh'],
    props: ['id'],
    data(){
        return{
            date: null,
            amount: null,
            purpose: 'monthly-payment',
            attachment: null,

            // url:'',
        }
    },
    methods:{

        setAttachment(event){
            this.attachment = event.target.files[0]
            console.log(this.attachment)
        },
        close(){    
            // this.$emit('refresh',this.id)
            this.$emit('exit-btn')
        },
        checkAllowedSubmit(){
            if( this.date !== null &&
                this.amount > 0 &&
                this.attachment !== null){
                
                    return true
                }else{
                    return false
                }
        },
        async submit(){
            const isGood = this.checkAllowedSubmit()
            if(isGood){
                //for server update
                // const obj = new FormData()
                // obj.append('date',this.date)
                // obj.append('amount',this.amount)
                // obj.append('purpose',this.purpose)
                // obj.append('file',this.attachment)

                const object = {
                    date: this.date,
                    amount: this.amount,
                    purpose: this.purpose,
                    file: this.attachment
                }

                //for frontend update
                // const amountPaid = this.amount

                console.log(this.attachment)
                this.$emit('upload-transaction',object)
                this.close()                
            }else{
                toast.error('not allowed to add empty fields')
            }
        
        }
    }

}
</script>

<style scoped>
input,select{
    padding: .5rem;
    border-radius: 5px;
    border: none;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);
}
button{
  padding: 5px 10px;
  background-color: #31A72A;
  color: white;
  border: none;
  border-radius: 3px;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.2);
}
button:hover{
  background-color: #30a72a8e;
  color: black;
}
button:active{
  opacity: 0.5;
}
div{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2)
}
form{
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    width: 95%;
    max-width: 700px;
    border-radius: 5px;
    padding: 1rem;
}
.form-controls{
    margin-left: 1rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
}
.c-btn{
    margin-top: 1rem;
    display: flex;
    justify-content: center;
}

.form-controls-icon{
    display: flex;
    justify-content: end;
}
.form-controls-icon .icon{
    /* border: 1px solid rgba(0, 0, 0, 0.486); */
    padding: .5rem;
    border-radius: 100%;
    cursor: pointer;
    
}
.form-controls-icon .icon:hover{
    scale: 1.1;
    outline: 1px solid black;
}
.form-controls-icon .icon:active{
    /* box-shadow: none; */
    box-shadow: 0 0 2px 1px black;
    /* outline: 1px solid black; */
}
</style>