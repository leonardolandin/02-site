<template>
    <div class="bodyViewAssignment">
        <div class="container-header">
            <Header :user="this.user" :userLoggedHeader="this.userLogged" @logoff="logoff"/>
        </div>
        <div class="containerDisplay">
            <div class="containerAssignment" v-if="this.assignment._id">
                <div>
                    <img class="image" :src="this.assignment.imageUpload.path" :alt="this.assignment.imageUpload.name">
                    <div class="containerImageDownload">
                        <button class="downloadImage" @click="downloadImage">Realizar download</button>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import UserAPI from '@/services/User';
import AssignmentAPI from '@/services/Assignment';

export default {
    components: { Header },
    data() {
        return {
            user: { type: Object },
            userLogged: false,
            token: localStorage.getItem('userToken') || null,
            assignment: { type: Object }
        }
    },
    mounted() {
        UserAPI.getUserLogged(this.token).then(response => {
        if(response.data) {
            this.user = response.data;
            this.userLogged = true;
        }
        }).catch(() => {
            this.userLogged = false;
        })

        AssignmentAPI.getAssignmentById(this.$route.params.id).then(response => {
            this.assignment = response.data;
        })

    },
    methods: {
        logoff: function() {
            this.userLogged = false;
            localStorage.removeItem('userToken');
        },
        downloadImage: function() {
            AssignmentAPI.downloadImage(this.assignment.imageUpload.path).then(response => {
                let url =  window.URL.createObjectURL(new Blob([response.data], { type:'application/*' } ))
                let link = document.createElement('a')

                link.href = url
                link.download = this.assignment.imageUpload.name

                link.click();
            })
        }
    }
}
</script>

<style scoped>
    .container-header {
        height: 110px;
    }

    .bodyViewAssignment {
        height: 100%;
        width: 100%;
        background-color: #e4e4e4;
    }

    .containerDisplay {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .containerAssignment {
        background-color: white;
        width: 1400px;
        height: 760px;
        border-radius: 15px;
        display: flex;
    }

    .image {
        max-width: 570px;
        padding: 40px;
    }

    .containerImageDownload {
        display: flex;
        justify-content: center;
    }

    .downloadImage {
        outline: none;
        background: #4285F4;
        width: 70%;
        border: 0;
        border-radius: 4px;
        padding: 12px 20px;
        color: #FFFFFF;
        font-family: inherit;
        font-size: inherit;
        font-weight: 500;
        line-height: inherit;
        text-transform: uppercase;
        cursor: pointer;
    }
</style>>