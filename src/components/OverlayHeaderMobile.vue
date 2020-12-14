<template>
    <div>
        <div :class="show ? 'menu' : 'menu hidden'">
            <div class="closeMenuMobile">
                <i @click="closeMenuMobile()">&times;</i>
            </div>
            <div class="containerClear"><div class="clearLine"/></div>
            <div class="containerButtonLogin" v-if="!isLogged">
                <span>Possui um cadastro ?</span>
                <a href="/entrar"><button type="button">Realizar login</button></a>
            </div>
            <div v-else class="container">
                <div class="containerLogged">
                    <img src="@/assets/header/user.png" alt="Usuário">
                    <span>{{user.name}}</span>
                </div>
                <div class="containerExit">
                    <nav>
                        <ul>
                            <li>
                                <a @click="logoff">
                                    <img src="@/assets/header/mobile/icon-door.png" alt="Porta">
                                    <span>Sair</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div class="containerClear"><div class="clearLine"/></div>
            <div>
                <nav class="containerListItens">
                    <ul>
                        <li>
                            <a href="/">
                                <img src="@/assets/header/mobile/icon-home.png" alt="Casa">
                                <span>Inicio</span>
                            </a>
                        </li>
                        <li v-if="isLogged">
                            <a href="">
                                <img src="@/assets/header/mobile/icon-user.png" alt="Video">
                                <span>Meu Perfil</span>
                            </a>
                        </li>
                        <li v-if="isLogged">
                            <a href="">
                                <img src="@/assets/header/mobile/icon-assignment.png" alt="Video">
                                <span>Minhas atividades</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="@/assets/header/mobile/icon-video.png" alt="Video">
                                <span>Video-Aulas</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="@/assets/header/mobile/icon-gear.png" alt="Engrenagem">
                                <span>Configurações</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <div :class="show ? 'overlay': 'overlay hiddenOverlay'"/>
    </div>
</template>

<script>

export default {
    props: ['show', 'isLogged', 'user'],
    methods: {
        closeMenuMobile: function() {
            this.$emit('close');
        },
        logoff: function() {
            this.isLogged = false;
            localStorage.removeItem('userToken');
        }
    }
}
</script>

<style scoped>
    .menu {
        background: #fff none repeat scroll 0 0;
        width: 320px;
        position: absolute;
        box-shadow: 1px 2px 3px #ddd;
        left: -1px;
        transition: left .5s ease 0s;
        margin-right: 1px;
        z-index: 31;
        min-height: 102vh;
        overflow-y: scroll;
        height: 100vh;
    }

    .hidden {
        left: -320px !important;
    }

    .closeMenuMobile {
        font-size: 75px;
        display: flex;
        justify-content: flex-end;
    }

    .closeMenuMobile > i {
        margin-right: 40px;
    }

    .containerButtonLogin {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }

    .containerButtonLogin > span {
        font-weight: bold;
    }

    .containerButtonLogin > a > button {
        background-color: #5d7df3;
        height: 45px;
        border: #5d7df3 solid;
        outline: none;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        margin-top: 10px;
    }

    .clearLine {
        border: 1px solid #e4e4e4;
        border-block-end: none;
        width: 200px;
    }

    .containerClear {
        display: flex;
        justify-content: center;
    }

    .overlay {
        background-color: #000;
        position: fixed;
        margin-right: -100%;
        width: 101%;
        height: 103vh;
        opacity: .8;
        z-index: 30;
        transition: transform .2s;
    }

    .hiddenOverlay {
        display: none;
        transition: transform .5s;
    }

    .containerListItens > ul {
        list-style: none;
        line-height: 70px;
        padding: 0;
        background-color: #f3f3f3;
    }

    .containerListItens > ul > li {
        list-style-type: none;
        margin: 0 16px;
        font-weight: 600;
    }

    .containerListItens > ul > li > a {
        color: black;
        text-decoration: none;
        font-size: 24px;
        display: flex;
        align-items: center;
    }

    .containerListItens > ul > li > a > img {
        height: 24px;
        margin-right: 10px;
    }

    .containerLogged {
        margin: 0 20px;
        display: flex;
        align-items: center;
    }

    .containerLogged > img {
        height: 40px;
        margin: 0 10px;
    }

    .containerExit > nav > ul {
        list-style: none;
        line-height: 40px;
        padding: 0;
    }

    .containerExit > nav > ul > li {
        list-style-type: none;
        margin: 0 16px;
        font-weight: 600;
    }

    .containerExit > nav > ul > li > a {
        color: black;
        text-decoration: none;
        font-size: 24px;
        display: flex;
        align-items: center;
    }

    .containerExit > nav > ul > li > a > img {
        height: 24px;
        margin-right: 10px;
    }

    .container {
        margin: 20px 0 20px 0;
    }
</style>