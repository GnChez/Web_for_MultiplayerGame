<template>
  <div class="container">
    <ContactForm />
  </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
export default {
  components: {
    ContactForm 
  },
  data() {
    return {};
  },
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
