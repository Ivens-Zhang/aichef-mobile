<template>
  <div class="formClass">
    <Title class="title"></Title>
    <div class="userInfoClass">
      <mt-field
        label="用户名"
        class="userNameClass"
        placeholder="以字母开头,可包含1-9/a-z/A-Z及+-_"
        v-model.trim="userInfo.userName"
        :state="userNameState"
      ></mt-field>
      <mt-field
        label="邮箱"
        class="emailClass"
        placeholder="请输入邮箱"
        type="email"
        :state="emailState"
        v-model.trim="userInfo.email"
      ></mt-field>
    </div>
    <mt-button class="btn" type="primary" size="large" @click="register">注 册</mt-button>
  </div>
</template>

<script>
import { Indicator, Toast } from "mint-ui";
import Title from '../components/Title';
export default {
  name: "Register",
  components: {
    Title
  },
  data() {
    return {
      title: 'AI 新课堂',
      emailState: "",
      userNameState: "",
      userInfo: {
        userName: "",
        email: ""
      },
      adminInfo: {
        username: "admin",
        password: "admin123"
      },
      token: "",
      classID: '74777f13-4f11-4151-9c85-16ee3d888096',  // 这里写要指定加入的班级
    };
  },
  watch: {
    "userInfo.email": {
      handler(newValue) {
        // 邮箱正则
        var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g;
        // 验证
        var res = reg.test(newValue);
        // 如果正则返回 true 状态为 success, 反之 warning
        if (res) {
          this.emailState = "success";
        } else if (newValue === "") {
          this.emailState = "";
        } else {
          this.emailState = "warning";
        }
      }
    },
    "userInfo.userName": {
      handler(newValue) {
        var userNameLength = newValue.length;
        var reg = /^[a-zA-Z][a-zA-Z0-9+-_ ]{5,}$/
        if (reg.test(newValue)) {
          // 如果用户名输入超过 6 位, 触发校验
          this.axios.get(`users/check/${this.userInfo.userName}/`).then(res => {
            if (res.data.username) {
              this.userNameState = "error";
              Toast({
                message: '用户名已被注册',
                position: 'top',
                duration: 1000
              });
            } else {
              this.userNameState = "success";
            }
          }).catch(err => {
            console.log(err);
          })
        } else if (!reg.test(newValue) && userNameLength !== 0) {
          this.userNameState = "warning";
        } else {
          this.userNameState = "";
        }
      }
    }
  },
  methods: {
    register() {
      if (this.emailState === "success" && this.userNameState === "success") {
        this.axios({
          method: "POST",
          url: `users/${this.userInfo.userName}/`,
          data: {
            emailInfo: {
              email: this.userInfo.email
            }
          },
          headers: {
            Accept: "*/*",
            Authentication: this.token
          }
        })
          .then(res => {
            Indicator.open({
              text: "注册中...",
              spinnerType: "fading-circle"
            });
            this.axios({
              method: "PUT",
              url: `users/add-role/${res.data.username}/STUDENT/`,
              headers: {
                Accept: "*/*",
                Authentication: this.token
              }
            });
          })
          .then(() => {
            this.axios({
              method: "PUT",
              url: `claszes/${this.classID}/add-member/${this.userInfo.userName}/`,
              headers: {
                Accept: "*/*",
                Authentication: this.token
              }
            });
            // 让加载栏延迟 1s 消失, 避免响应过快看不到加载动画
            this.timer = setTimeout(() => {
              Indicator.close();  // 关闭加载栏
              // 加载完成后底部弹出 toast
              Toast({
                message: '注册成功',
                position: 'top',
                duration: 1000
              });
              this.$router.push('/success')
              this.timer = void 0;
            }, 1000);
          }).then(() => {
            this.userInfo.userName = '',
            this.userInfo.email = ''
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.emailState === 'warning' && this.userNameState === "success") {
        Toast({
          message: '请输入正确的邮箱格式',
          position: 'top',
          duration: 2000
        });
      } else if (this.emailState === 'success' && this.userNameState === "error") {
        Toast({
          message: '请输入正确的用户名格式',
          position: 'top',
          duration: 2000
        });
      } else if (this.userNameState === "warning") {
        Toast({
          message: '请输入格式正确的用户名',
          position: 'top',
          duration: 2000
        });
      } else if (this.emailState === '' || this.userNameState === "") {
        Toast({
          message: '用户信息不可为空',
          position: 'top',
          duration: 2000
        });
      } else {
        Toast({
          message: '用户信息填写不正确',
          position: 'top',
          duration: 2000
        });
      }
    }
  },
  created() {
    this.axios.post("login", this.adminInfo).then(res => {
      this.token = res.data.token;
    });
  }
};
</script>

<style scoped>
.formClass {
  padding: 5%;
  margin-top: 30%;
  background: rgba(255, 255, 255, .3);
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, .3);
}

.title {
  margin-bottom: 10%;
}

.userInfoClass {
  background: rgba(255, 255, 255, .3);
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, .3);
}

.userNameClass {
  margin-bottom: 4px;
}

.btn {
  margin-top: 40%;
  font-weight: bold;
}

</style>