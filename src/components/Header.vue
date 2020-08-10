<template>
    <nav class="header">
        <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="">Video-Aula</a></li>
            <li><a href="">Configurações</a></li>
        </ul>
    </nav>
</template>


<script>
export default {
  name: 'Header',
  props: {
    msg: String
  }
}
</script>

<style scoped>

.header {
    height: 100%;
    background-color: #f1f1f1;
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
    font-family: cursive;
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
</style>