<template>
    <div v-if="isLogged == true" class="userLogged">
        <img src="@/assets/header/user.png">
        <span>palhaço</span>
    </div>
    <a v-else href="/entrar">
        <div class="userNotLogged">
            <img src="@/assets/header/user.png">
            <span>Entrar</span>
        </div>
    </a>

</template>



<script>
export default {
    props: {
        isLogged: {type: Boolean, required: true}
    }
}
</script>


<style scoped>
    .userLogged {
        display: flex;
        align-items: center;
        margin-right: 40px;
    }

    .userNotLogged {
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 20px;
    }

    .userLogged > img {
        height: 30px;
        margin-right: 10px;
    }

    .userNotLogged > a {
        text-decoration: none;
        color: black;
    }

    .userNotLogged > img {
        height: 30px;
        margin-right: 10px;
    }
</style>