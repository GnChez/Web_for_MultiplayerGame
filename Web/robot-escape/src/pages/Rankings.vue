<template>
    <div class="container">
        <RankingComponent/>
    </div>
        
    
</template>

<script>
import RankingComponent from '@/components/RankingComponent.vue';
export default {
    components: {
        RankingComponent // This registers the LoginForm component locally
  },
    data() {
        return {
        };
    },
    methods: {}
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;/* Adjust the height as needed */
}
</style>