<template>
  <div class="success">
    <Title class="title"></Title>
    <div class="suggest">
      <span>恭喜您注册成功</span>
      <br>
      <span>请检查您的邮箱，并在 pc 端使用。</span>
    </div>
  </div>
</template>

<script>
import Title from '../components/Title';
export default {
  name: 'success',
  components: {
    Title
  }
}
</script>

<style scoped>
.success {
  margin-top: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  width: 350px;
}
.suggest {
  width: 350px;
  height: 200px;
  justify-content: center;
  background: rgba(255, 255, 255, .7);
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, .5);
  color: rgb(42,73,135);
  font-size: 30px;
}
</style>