<template>
  <ConfirmationModal
      v-if="showDeleteConfirmation"
      :message="'Are you sure you want to delete this user?'"
      :showModal="showDeleteConfirmation"
      @Confirm="deleteuserdata"
      @Cancel="cancelDelete"
    />
    <ConfirmationModal
      v-if="showEditConfirmation"
      :message="'Are you sure you want to edit this user?'"
      :showModal="showEditConfirmation"
      @Confirm="edituserdata"
      @Cancel="cancelEdit"
    />
    <h1 class="pagetitle" style="text-align: left;">User Details</h1>
    <Icon class="adduser" @click="changepage()" icon="mdi:account-multiple-plus" width="50"/>
  <div>
    <div class="filterdiv">
      <div >
      <input ref="emailfield" class="emailfield" type="email" placeholder="Email">
      <select ref="department" class="departmentfield" id="department">
      <option value="">....choose a department....</option>
      <option value="IT">IT</option>
      <option value="CSC">CSC</option>
      <option value="ECE">ECE</option>
      <option value="EEE">EEE</option>
      <option value="AUTOMOBILE">AUTOMOBILE</option>
      <option value="MECHANICAL">MECHANICAL</option>
    </select>
    <label class="datefieldlabel">From:</label>
    <input v-model="startdate" type="date" class="fromdatefield">
    <label class="datefieldlabels">To:</label>
    <input v-model="enddate" type="date" class="todatefield">
    <button @click="filterdata()" class="gobtn">Go</button>
  </div>
    <br>
  </div>
  <div>
      <table   id="customers">
        <thead>
          <th>S.NO</th>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th >Department</th>
          <th>Description</th>
          <th>Created On</th>
          <th>Actions</th>
        </thead>
        <tbody v-for="user in filteredUsers" :key="user.id">
          <tr>
            <td>{{ user.id }}</td>
            <td>{{ user.names }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.department }}</td>
            <td>{{ user.description }}</td>
            <td>{{ user.myDate }}</td>
            <td class="change">  
              <Icon @click="confirmedit(user.id)" icon="mdi:account-edit" width="30"/>
              <Icon  @click="confirmDelete(user.id)" icon="mdi:delete"  width="30"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import { Icon } from '@iconify/vue';
export default {
  name: 'ListPage',
  components: {
    ConfirmationModal,
    Icon,  
  },
  data() {
    return {
      myDate: new Date(),
      startdate:null,
      enddate:null,
      users: [],
      userToDelete: null,
      userToedit: null,
      showDeleteConfirmation: false,
      showEditConfirmation: false,
      startDateString:'',
      endDateString:'',
      filteredUsers:[],
    };
  },
  methods: {
    filterdata() {
  const filterCriteria = {
    email: this.$refs.emailfield.value,
    department: this.$refs.department.value,
    startDate: this.startdate,
    endDate: this.enddate,
  };
  this.filteredUsers = this.users.filter((user) => {
    const emailMatch = !filterCriteria.email || user.email.includes(filterCriteria.email);
    const departmentMatch = !filterCriteria.department || user.department === filterCriteria.department;

    const userDate = new Date(user.myDate).setHours(0, 0, 0, 0);
    const startDate = filterCriteria.startDate ? new Date(filterCriteria.startDate).setHours(0, 0, 0, 0) : null;
    const endDate = filterCriteria.endDate ? new Date(filterCriteria.endDate).setHours(0, 0, 0, 0) : null;

    const dateMatch =
      (!startDate || userDate >= startDate) &&
      (!endDate || userDate <= endDate);

    return emailMatch && departmentMatch && dateMatch;
  });
},
    getData() {
      this.$axios.get(`http://localhost:3000/posts`).then((res) => {
        this.users = res.data;
        this.filteredUsers = this.users;
        console.log(res);
      });
    },
    changepage() {
      this.$router.push('/');
    },
    edituserdata() {
      if(this.userToedit){
      this.$router.push('/' + '?userid=' + this.userToedit);
      }
    },
    confirmDelete(userid) {
      this.userToDelete = userid;
      this.showDeleteConfirmation = true;
    },
    confirmedit(userid) {
      this.userToedit = userid;
      this.showEditConfirmation = true;
    },
    cancelEdit() {
      this.userToedit = null;
      this.showEditConfirmation = false;
    },
    cancelDelete() {
      this.userToDelete = null;
      this.showDeleteConfirmation = false;
    },
    deleteuserdata() {
      if (this.userToDelete) {
        this.$axios.delete(`http://localhost:3000/posts/${this.userToDelete}`).then((res) => {
          this.getData();
          this.showDeleteConfirmation = false;
          console.log(res.data);
        });
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style scoped>
.pagetitle{
  position: relative;
  bottom: 30px;
}
.filterdiv{
  margin-bottom:px;
  position: relative;
  bottom:90px;
  left:150px;
}
.emailfield{
  margin-right:20px;
}
.gobtn{
  width:100px;
  height: 30px;
  position: relative;
  right:20px;
}
img{
  width: 20px;
}
template {
  background-color: #f2f2f2;
}
.adduser {
  margin-left: 1400px;
  position: relative;
  bottom:50px;
}
.adduser:hover{
  background-color: rgba(0, 0, 255, 0.495);
}
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
 position: relative;
bottom: 90px; 
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}
.change {
  cursor: pointer;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #04aa6d;
  color: white;
}
.datefieldlabel{
  position: relative;
  right:30px;
}
.fromdatefield{
  position: relative;
  right: 45px;
}
.datefieldlabels{
  position: relative;
  right:30px;
  
}
.todatefield{
  position: relative;
  right:50px;
}
.searchbox{
  margin-right: 1250px;
  position: relative;
  bottom: 70px;
}
</style>