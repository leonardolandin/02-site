<template>
    <div>
        <div :class="show ? 'menu' : 'menu hidden'">
            <div class="closeMenuMobile">
                <i @click="closeMenuMobile()">&times;</i>
            </div>
            <div class="containerButtonLogin">
                <span>Possui um cadastro ?</span>
                <a href="/entrar"><button type="button">Realizar login</button></a>
            </div>
            <div class="containerClear"><div class="clearLine"/></div>
            <div>
                <nav>
                    <ul>
                        <li>Inicio</li>
                        <li>Video-Aulas</li>
                        <li>Configurações</li>
                    </ul>
                </nav>
            </div>
        </div>
        <div :class="show ? 'overlay': 'overlay hiddenOverlay'"/>
    </div>
</template>

<script>

export default {
    props: ['show', 'isMobile'],
    methods: {
        closeMenuMobile: function() {
            this.$emit('close');
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
</style>