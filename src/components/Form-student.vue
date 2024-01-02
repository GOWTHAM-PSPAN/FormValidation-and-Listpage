<template>
<div class="bkgcolor">
  <form @submit.prevent="formValidation">
    <h1>Login Form</h1>
    <label>Name</label>
    <input v-model="studentDetails.names" id="names" @keydown="resetErrorMessage('namemsg')" @input="resetErrorMessage('namemsg')">
    <p id="print">{{ namemsg }}</p>
    <br>
    <label>Email</label>
    <input v-model="studentDetails.email" id="email" type="email" @keydown="resetErrorMessage('emailmsg')">
    <p id="print1">{{ emailmsg }}</p>
    <br>
    <label>Password</label>
    <input v-model="studentDetails.password" id="password" type="password" @keydown="resetErrorMessage('passwordmsg')"> 
    <p id="print2">{{ passwordmsg }}</p>
    <br>
    <label>Description</label>
    <input v-model="studentDetails.description" id="description" type="text" @keydown="resetErrorMessage('descriptionmsg')">
    <p id="print3">{{ descriptionmsg }}</p>
    <br>
    <label>Choose a Department:</label>
    <select v-model="studentDetails.department" id="department" @input="resetErrorMessage('departmentmsg')">
      <option value="">....choose a department....</option>
      <option value="IT">IT</option>
      <option value="CSC">CSC</option>
      <option value="ECE">ECE</option>
      <option value="EEE">EEE</option>
      <option value="AUTOMOBILE">AUTOMOBILE</option>
      <option value="MECHANICAL">MECHANICAL</option>
    </select>
    <p id="print4">{{ departmentmsg }}</p>
    <br>
    <label class="gender-label">Choose a gender:</label>
    <label class="gender-move">Male</label>
    <input class="selectgender" v-model="studentDetails.gender" id="gender-move" value="male" name="gender" type="radio" @input="resetErrorMessage('gendermsg')">
    <label class="gender-moves">Female</label>
    <input class="selectgender" v-model="studentDetails.gender" id="gender-moves" value="female" name="gender" type="radio" @input="resetErrorMessage('gendermsg')">
    <br>
    <p id="print5">{{ gendermsg }}</p>
    <button v-if="buttonchange" class="submit" type="submit">submit</button>
    <button v-else type="submit" class="update" @click="updateData()"> Update </button>
    <input class="reset" type="reset">
  </form>
</div>

</template>

<script>
export default{
  data() {
    const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
    return {
      studentDetails:{
      names: '',
      email: '',
      password: '',
      description: '',
      department: '',
      gender: '',
      myDate: formattedDate,
    },
    buttonchange: true,
    namemsg: '',
    emailmsg:'',
    passwordmsg:'',
    descriptionmsg:'',
    departmentmsg:'',
    gendermsg:'',
    userid1:'',
    };
  },
created() {
    var userid1 = this.$route.query.userid
    this.buttonchange = userid1===undefined? true : false
    this.$axios.get(`http://localhost:3000/posts/${userid1}`)
    .then((res) => {
      this.studentDetails = res.data;
      })
      .catch((error) => {
        console.log('Error:', error);
      })
    },
  methods: {
    resetErrorMessage(msgKey) {
      this[msgKey] = '';
    },
    validateKey(event) {
      if (!/[a-z  A-Z]/i.test(event.key)) { 
        event.preventDefault();
      }
    },
    formValidation() {
      if (this.studentDetails.names==='') {
        this.namemsg = 'Please fill the name';
      }
      if(!this.studentDetails.email){
          this.emailmsg = 'please fill the email';
      }
      if (!this.studentDetails.password) {
        this.passwordmsg = 'Please fill the password';
      }
      if (!this.studentDetails.description) {
        this.descriptionmsg = 'Please fill the description';
      }
      if (!this.studentDetails.gender) {
        this.gendermsg = 'Please fill the gender';
      }
      if (!this.studentDetails.department) {
        this.departmentmsg = 'Please fill the department';
      }
        if (this.namemsg === '' && this.emailmsg === '' && this.passwordmsg === '' && this.descriptionmsg === '' && this.gendermsg === '' && this.departmentmsg === '')
        {
          this.$axios.post(`http://localhost:3000/posts`,this.studentDetails)
          .then((res) => {
            console.log(res.data);
            this.$router.push('Listpage');
          })
          .catch((error) => {
            console.log('Error creating new entry:', error);
          });
      } 
      },
      updateData(){ if (this.studentDetails.names==='') {
        this.namemsg = 'Please fill the name';
      }  
      if(!this.studentDetails.email)
      {
          this.emailmsg = 'please fill the email';
      }
        else if((!/^[^@]+@\w+(\.\w+)+\w$/.test(this.studentDetails.email))){
        this.emailmsg = 'please fill the valid email';
      }
      if (!this.studentDetails.password) {
        this.passwordmsg = 'Please fill the password';
      }
      if (!this.studentDetails.description) {
        this.descriptionmsg = 'Please fill the description';
      }
      if (!this.studentDetails.gender) {
        this.gendermsg = 'Please fill the gender';
      }
      if (!this.studentDetails.department) {
        this.departmentmsg = 'Please fill the department';
      }
        if (this.namemsg === '' && this.emailmsg === '' && this.passwordmsg === '' && this.descriptionmsg === '' && this.gendermsg === '' && this.departmentmsg === '')
        {
          this.$axios.put(`http://localhost:3000/posts/${this.studentDetails.id}`,
          this.studentDetails)
          .then((res)=>{
          if(res !=null){
         this.$router.push('Listpage');
          }
        }).catch(error=>{ 
          console.log('hello',error);
        })
      }
    }
      },     
  }
</script>

<style scoped>
template {
    background-color: rgb(206, 134, 19);
    background-size: cover;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    margin: 0;
    padding: 0;
}
</style>
