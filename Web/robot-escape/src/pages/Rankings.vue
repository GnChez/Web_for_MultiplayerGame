<template>
    <div class="position-relative">
        <RankingComponent class="ranking-panel"/>
        
    </div>
        
    
</template>

<script>
import RankingComponent from '@/components/RankingComponent.vue';

export default {
    components: {
        RankingComponent 
  },
  
    data() {
        return {
            auth: false
        };
    },
    methods: {}
};
</script>

<style scoped>
.position-relative {
    position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


.ranking-panel {
    display: inline-block;
}
</style>