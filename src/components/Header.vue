<template>
    <nav class="header">
        <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="">Video-Aula</a></li>
            <li><a href="">Configurações</a></li>
        </ul>
        <div class="container-profile">
            <MiniProfile :isLogged="true"></MiniProfile>
        </div>
    </nav>
</template>


<script>
import MiniProfile from '@/components/MiniProfile.vue';

export default {
  name: 'Header',
  components: { MiniProfile },
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