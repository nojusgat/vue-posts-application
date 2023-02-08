<template>
  <section class="hero is-danger is-fullheight">
    <div class="hero-body">
      <div class="">
        <p class="title">
          404
        </p>
        <p class="subtitle">
          Page does not exist
        </p>
        <p>
          <button class="button" @click="goBack">Go back</button>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Error",
  methods: {
    goBack() {
      if (window.history.length > 2) {
        this.$router.go(-1);
      } else {
        this.$router.push("/");
      }
    }
  }
};
</script>
