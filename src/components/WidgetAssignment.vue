<template>
    <div class="widgetContainer" @click="uploadAssignment">
        <button class="buttonContainer"><img src="@/assets/home/upload-icon.png"></button>
    </div>
</template>

<script>
export default {
    methods: {
        uploadAssignment: function() {
            this.$router.push('nova-atividade')
        }
    }
}
</script>

<style scoped>
    .widgetContainer {
        position: fixed;
        bottom: 70px;
        right: 70px;
    }

    .buttonContainer {
        cursor: pointer;
        width: 68px;
        height: 68px;
        border-radius: 30px;
        background-color: #5858c1;
        border: none;
        box-shadow: 0 1px 5px rgba(0, 0, 0, .4);
        font-size: 24px;
        color: white;
        transition: .2s ease-out;
        -webkit-transition: .2s ease-out;
        -moz-transition: .2s ease-out;
        outline: none;
    }

    .buttonContainer img {
        width: 30px;
        height: 30px;
    }

    @media only screen and (max-width: 414px) {
        .widgetContainer {
            right: 40px;
            bottom: 40px;
        }
    }
</style>