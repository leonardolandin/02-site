<template> 
    <div class="containerActions">
        <div class="action" @click="likeAssignment(assignment)">
            <img class="heart" v-if="!this.like" src="@/assets/assignment/like.png" alt="Coração sem preenchimento">
            <img class="heart" v-else src="@/assets/assignment/liked.png" alt="Coração preenchido">
        </div>
        <div @click="favoriteAssignment(assignment)">
            <img class="favorite" v-if="!this.favorite" src="@/assets/assignment/favorite.png" alt="Estrela sem preenchimento">
            <img class="favorite" v-else src="@/assets/assignment/favorited.png" alt="Estrela preenchida">
        </div>
    </div> 
</template>

<script>
import AssignmentAPI from '@/services/Assignment.js';

export default {
    props: ['assignment', 'user'],
    data() {
        return {
            like: false,
            favorite: false
        }
    },
    methods: {
        likeAssignment: function(assignment) {
            if(assignment) {
                let objLike = {
                    assignment: assignment._id,
                    user: this.user._id,
                    like: !this.like
                }

                AssignmentAPI.likeAssignment(objLike).then(response => {
                    console.log(response);
                })
            }
        },
        favoriteAssignment: function(assignment) {
            console.log(assignment)
            this.favorite = !this.favorite
        }
    }
}
</script>

<style scoped>
    .containerActions {
        display: flex;
        flex-direction: row;
    }

    .heart {
        width: 30px;
    }

    .action {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
    }

    .favorite {
        width: 45px;
    }
</style>