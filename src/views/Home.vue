<template>
<div class="container-home">
  <div class="container-header">
    <Header :user="this.user" :userLoggedHeader="this.userLogged" @logoff="logoff"/>
  </div>
  <div class="container-assignment">
    <Assignments :assignments="this.assignments"/>
  </div>
  <WidgetAssignment v-if="userLogged"/>
</div>

</template>

<script>
import Header from '@/components/Header.vue';
import Assignments from '@/components/Assignments.vue';
import AssignmentService from '@/services/Assignment.js';
import WidgetAssignment from '@/components/WidgetAssignment.vue';
import UserAPI from '@/services/User';

export default {
  name: 'Home',
  components: { Header, Assignments, WidgetAssignment },
  data() {
    return {
      assignments: [],
      user: { type: Object },
      userLogged: false,
      token: localStorage.getItem('userToken') || null
    }
  },
  mounted() {
    AssignmentService.getAssignments().then(response => {
      if(response.data) {
        this.assignments = response.data
      }
    })

    UserAPI.getUserLogged(this.token).then(response => {
      if(response.data) {
        this.user = response.data;
        this.userLogged = true;
      }
    }).catch(() => {
        this.userLogged = false;
    })    
  },
  methods: {
    logoff: function() {
      this.userLogged = false;
      localStorage.removeItem('userToken');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-header {
  height: 110px;
}

.container-home {
  height: 100%;
  width: 100%;
  background-color: #e4e4e4;
}

.container-assignment {
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    max-height: 100%;
    padding: 50px;
}
</style>
