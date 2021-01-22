<template>
    <div class="containerList">
        <div class="container-image" v-for="assignment in assignments" :key="assignment._id">
            <img :src="assignment.imageUpload.path" :title="assignment.nameAssignment" @click="openAssignment(assignment._id)">
        </div>
    </div>
</template>

<script>
export default {
    props: ['assignments'],
    methods: {
        openAssignment: function(idAssignment) {
            this.$router.push(`/atividade/${idAssignment}`);
        }
    }
}
</script>

<style scoped>
    .container-image {
        padding: 10px;
    }

    .container-image > img {
        border: 0px solid;
        border-radius: 8px;
        max-width: 280px;
        max-height: 250px;
        transition: all 2s;
        cursor: pointer;
    }

    .containerList {
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        max-width: 100%;
        max-height: 100%;
    }

    @media only screen and (max-width: 414px) {
        .container-image > img {
            max-width: 260px;
        }
    }
</style>