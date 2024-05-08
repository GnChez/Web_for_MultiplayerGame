<template>
  <div class="container">
      <ProfileComponent/>
  </div>
      
  
</template>

<script>
import ProfileComponent from '@/components/ProfileComponent.vue';
export default {
  components: {
    ProfileComponent // This registers the LoginForm component locally
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
  justify-content: center;/* Adjust the height as needed */
}
</style>