<template>
  <div class="container">
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from "@/components/RegisterForm.vue";
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Adjust the height as needed */
}
</style>
