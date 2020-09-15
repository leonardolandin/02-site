<template>
    <nav class="header">
        <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="">Video-Aula</a></li>
            <li><a href="">Configurações</a></li>
        </ul>
        <div class="container-profile">
            <MiniProfile v-bind:isLogged="this.userLogged" :user="this.user"></MiniProfile>
        </div>
    </nav>
</template>


<script>
import MiniProfile from '@/components/MiniProfile.vue';
import UserAPI from '@/services/User';

export default {
  name: 'Header',
  components: { MiniProfile },
  data() {
      return {
          token: localStorage.getItem('userToken') || null,
          userLogged: { type: Boolean, required: true },
          user: { type: Object }
      }
  },
  mounted() {
      localStorage.setItem('userToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibGVvbGFuZGluMTIzQGdtYWlsLmNvbSIsInBhc3MiOiJsZW8wMjg0MjAxMCIsInJlY2FwdGNoYSI6IjAzQUdkQnEyNmQ1V0ZYWllwazhqNjlmMkNfb0VNRWdwLWplb3RvR1IxYkpFQ3ZTTGxnRG5Xd1daMVVmaVhHUkhpV0lZWmlrbExzY3FMNHJuSzZLV1ZHSk1LWVdDYW5vTTN4VEh0ejVQT2s1dTE3SEJ2Q0YtWG9xV3lWZkw5T1NtdF93MjZQX19wUEdZMFhVT2F5a2pnSE5GRjFfcmNqUlA4MnFyanF6M05NbFpDZVlFRFZtbzdDeTRZMmVqVTRzWG9iQXBzMV9NcmNKWm52Y0xXRWlYVEtNRjFIUDJKci1SaVMtQ3dLNGlWdFZHTHpoM0hnVXJjcUxxd0pscHlxSzh5QmI1ZWNaT2hkdFBsb2lnbXRiRzBUNjREa1Q2cmptTmdUNUttbXZtaGdwTUZydjZ5VXBTdzZOLVV4dFRIS0p4dW9wa3NtSmg1eXpCcTdJZ19pRE5vNk9RdF9uLWNNNV9nblNoVThPT1E3QlVFUzFTQ3dBYnRFeGVCajVqUGtERVZuMXJKVGVoX1VNb2ZXR1IwdkFwbklJLXVGeWk2RGxmSXZpNmRxLVRLXzh6dk8yTTljamU4VGVfQWQxc2x3bHZsNkJfaVo1SFE5MGZZaVJ4STN2QjZoVmV4VnV0OWdzNU9ueHJXM2dHZmp5dVJxVGFCczVPamVoOE0iLCJpYXQiOjE1OTk4NjYyMjZ9.BG-20iP98BJbb4SLE1u_u_RJVmNDsrAX2HTFcVymSUo')
      UserAPI.getUserLogged(this.token).then(response => {
          if(response.data) {
            this.user = response.data;
            this.userLogged = true;
          }
      }).catch(() => {
          this.userLogged = false;
      })
  }
}
</script>

<style scoped>

.header {
    height: 100%;
    background-color: #f1f1f1;
    display: flex;
}

ul {
    margin: 0;
    padding: 0;
    display: flex;
    width: 50%;
    justify-content: center;
    height: 100%;
}

li {
    list-style-type: none;
    width: 180px;
    justify-content: center;
    display: flex;
    align-items: center;
}

a {
    font-size: x-large;
    text-decoration: none;
    height: 100%;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.5s all;
    color: black;
}

a:hover {
    color: white;
    background-color: #5d7df3;
    border: 0.9px solid;
    border-radius: 3px;
}

.container-profile {
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>