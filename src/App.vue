<template>
  <div id="app">
    <!-- <div class="registerDiv">
      <Register></Register>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
// import Register from "./components/Register";

export default {
  name: "App",
  components: {
    // Register
  }
};
</script>

<style>
body {
  background-image: url('./assets/backgroundPic.png');
}
</style>
