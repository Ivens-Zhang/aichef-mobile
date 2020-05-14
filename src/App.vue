<template>
  <div id="app">
    <div class="registerDiv">
      <Register></Register>
    </div>
  </div>
</template>

<script>
import Register from "./components/Register";

export default {
  name: "App",
  components: {
    Register
  }
};
</script>

<style>
html {
  height: 100%;
}
body {
  height: 100%;
  background-image: url('./assets/backgroundPic.png');
}
#app {
  height: 100%;
  position: relative; 
  text-align: center;
}

.registerDiv {
  display: inline-block;
  position: relative;
  top: 40%;
  padding: 3%;
}
</style>
