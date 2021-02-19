<template>
    <div v-if="isLogged == true" class="userLogged" @click="showOrHideUserOptions">
        <img src="@/assets/header/user.png">
        <span>{{user.name}}</span>
        <div v-if="!isMobile" class="userOptions" v-bind:class="{ active: this.isActive }">
            <a href="/perfil">Meu Perfil</a>
            <a href="/minhas-atividades">Minhas Atividades</a>
            <a class="last" @click="logoff">Sair</a>
        </div>
    </div>
    <a v-else @click="login">
        <div class="userNotLogged">
            <img src="@/assets/header/user.png">
            <span>Entrar</span>
        </div>
    </a>

</template>



<script>
export default {
    props: ['isLogged', 'user', 'isMobile'],
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        showOrHideUserOptions() {
            this.isActive = !this.isActive;
        },
        logoff() {
            this.$emit('logoff');
        },
        login() {
            window.localStorage.setItem('checkpoint', this.$router.history.current.path)

            this.$router.push('/entrar');
        } 
    }
}
</script>


<style scoped>
    .userLogged {
        display: flex;
        align-items: center;
        height: 100%;
        width: 20%;
        cursor: pointer;
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

    .userOptions {
        position: absolute;
        height: 15%;
        width: 10%;
        background-color: #f1f1f1;
        top: -40px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        z-index: -1;
        transition: all 0.2s;
    }

    a {
        font-size: 18px;
        text-decoration: none;
        height: 33%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.5s all;
        color: black;
        cursor: pointer;
    }

    a:hover {
        color: white;
        background-color: #5d7df3;
        border: 0.9px solid;
        border-radius: 3px;
    }

    .last:hover {
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    .active {
        top: 110px;
        z-index: 1;
    }

    @media only screen and (max-width: 414px) {
        .userOptions {
            width: 34%;
        }

        a {
            text-align: center;
        }
    }
</style>