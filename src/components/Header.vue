<template>
    <nav class="header">
        <OverlayHeaderMobile :show="show" :isLogged="this.userLoggedHeader" :user="this.user" @logoff="logoff" @close="openOverlay"/>
        <ul>
            <li class="burger-icon-container"><img src="@/assets/header/mobile/icon-burger.png" @click="openOverlay" alt="Hamburguer" class="burger-icon"></li>
            <li v-if="!isMobile || isTablet"><a href="/" class="home">Inicio</a></li>
            <li v-if="!isMobile || isTablet"><a href="/videos" class="video">Video-Aula</a></li>
            <li v-if="!isMobile || isTablet"><a href="/configuracoes" class="configuration">Configurações</a></li>
        </ul>
        <div class="container-profile">
            <MiniProfile :isLogged="this.userLoggedHeader" :user="this.user" :isMobile="isMobile" @logoff="logoff"/>
        </div>
    </nav>
</template>


<script>
import MiniProfile from '@/components/MiniProfile.vue';
import OverlayHeaderMobile from '@/components/OverlayHeaderMobile.vue';
import { isMobile, isTablet } from 'mobile-device-detect';

export default {
  name: 'Header',
  components: { MiniProfile, OverlayHeaderMobile },
  props: ['user', 'userLoggedHeader'],
  data() {
      return {
          isMobile: isMobile,
          isTablet: isTablet,
          show: false
      }
  },
  methods: {
      openOverlay: function() {
          this.show = !this.show;

          isMobile ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "visible");
      },
      logoff: function() {
          this.$emit('logoff');
      }
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

.burger-icon-container {
    justify-content: end;
    display: none;
}


@media only screen and (max-width: 414px) {
    .home ,.configuration, .video {
        display: none;
    }

    .burger-icon {
        display: block;
        height: 40%;
        margin-left: 10px;
    }

    .burger-icon-container {
        display: flex;
    }

    .userLogged {
        width: auto;
        margin-right: 10px;
    }
}

</style>