<template>
  <div class="login">
    <Header />
    <!--<img src="@/assets/img/productivity-bg-2.webp" alt="" class="floating-image">-->

    <div class="login-content">
      <!-- 登录页面背景 -->
      <div class="login-inner">
        <img src="@/assets/svg/login.svg" alt="" />
      </div>
      <!-- 登录区域 -->
      <div class="login-area">
        <div class="title">AIT</div>
        <div class="form-container">
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            class="demo-ruleForm"
            label-position="top"
            @keyup.enter.native="submitLoginForm"
          >
            <div class="form-input-box">
              <el-form-item label="账号" prop="userName">
                <el-input
                  v-model="loginForm.userName"
                  :validate-event="isRigger"
                  autocomplete="off"
                  type="text"
                  placeholder="请输入账号"
                >
                  <template #prefix>
                    <el-icon class="el-input__icon"><user /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="密码" prop="passWord">
                <el-input
                  v-model="loginForm.passWord"
                  :validate-event="isRigger"
                  autocomplete="off"
                  type="password"
                  placeholder="请输入密码"
                >
                  <template #prefix>
                    <el-icon class="el-input__icon"><key /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item v-if="isRegister" label="确认密码" prop="verifyPw">
                <el-input
                  v-model="loginForm.verifyPw"
                  :validate-event="isRigger"
                  autocomplete="off"
                  type="password"
                  placeholder="请再次输入密码"
                >
                  <template #prefix>
                    <el-icon class="el-input__icon"><key /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
            </div>
            <el-button class="sub-btn" type="primary" @click="submitLoginForm">
              {{ isRegister ? '注册' : '登录' }}
            </el-button>
            <div class="text-sm flex justify-between items-center my-2">
              <el-checkbox v-model="rememberMe">记住我</el-checkbox>
              <span v-if="!isRegister">忘记密码?</span>
            </div>

            <div v-if="!isRegister" class="login-form-footer">
              <span>还没有账号?</span>
              <span class="footer-register" @click="isRegister = !isRegister">立即注册</span>
            </div>
            <div v-else class="login-form-footer">
              <span>已有账号?</span>
              <span class="footer-register" @click="isRegister = !isRegister">立即登录</span>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Header from '@/layout/components/header/header.vue';
import { computed, reactive, ref } from 'vue';
import router from '@/router/index.js';
// import { postUsersLogin } from '@/api/common/login.js';
import { ElNotification } from 'element-plus';
import { User, Key } from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';

const loginForm = reactive({
  userName: '',
  passWord: '',
  verifyPw: ''
});

const isRegister = ref(false);

const rememberMe = ref(false);

const loginFormRef = ref();
// // 初始化是否触发表单校验
const isRigger = ref(false);

// 校验登录表单
function validateForm() {
  // 判空
  const exitNullValue = isRegister.value
      ? Object.values(loginForm).some(value => value === '')
      : Object.entries(loginForm).some(([key, value]) => key !== 'verifyPw' && value === '');

  if (exitNullValue) {
    ElNotification({
      title: 'Error',
      message: '请填写完整信息',
      type: 'error',
      duration: 2000 // 显示时长
    });
    return false;
  }

  // 密码二次输入不一
  const verifyPwValue = loginForm.passWord !== loginForm.verifyPw;
  if (verifyPwValue && isRegister.value) {
    ElNotification({
      title: 'Error',
      message: '两次密码输入不一致',
      type: 'error',
      duration: 2000 // 显示时长
    });
    return false;
  }

  return true;
}

function submitLoginForm() {
  if (!validateForm()) return;
  console.log(rememberMe.value)

  loginFormRef.value.resetFields();
}

// 校验登录表单
// function validateFrom() {
//   return new Promise((resolve, reject) => {
//     loginFormRef.value.validate(async valid => {
//       if (valid) {
//         const { userName, passWord } = loginForm;
//         if (!userName) {
//           ElNotification({
//             title: 'Error',
//             message: '账号或密码错误',
//             type: 'error',
//             duration: 3000 // 显示时长
//           });
//           reject(new Error('表单项校验失败'));
//         } else {
//           resolve();
//         }
//       } else {
//         reject(new Error('表单项校验失败'));
//       }
//     });
//   });
// }
//
// // 提交登录表单
// async function submitLoginForm() {
//   isRigger.value = true;
//   const { userName, passWord } = loginForm;
//   try {
//     await validateFrom();
//     try {
//       // await postUsersLogin({ username: userName, password: passWord });
//       ElNotification({
//         title: 'Success',
//         message: '登录成功',
//         type: 'success',
//         duration: 2000 // 显示时长
//       });
//       // 登录成功跳转首页
//       await router.push('/home');
//     } catch (error) {
//       ElNotification({
//         title: 'Error',
//         message: '账号或密码错误',
//         type: 'error',
//         duration: 3000 // 显示时长
//       });
//       loginFormRef.value.resetFields(); // 清空表单
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  position: relative; // 添加相对定位

  .floating-image {
    position: absolute;
    left: 0;
    bottom: 0%;
    width: 300px; // 设置图片宽度
    height: 140px; // 设置图片高度
    animation: float 6s ease-in-out infinite;
    z-index: -1; // 确保图片在 content 下面
  }

  @keyframes float {
    0% {
      transform: translate(-5%, -10%);
    }
    50% {
      transform: translate(-5%, -30%);
    }
    100% {
      transform: translate(-5%, -10%);
    }
  }

  .login-content {
    display: flex;
    align-items: center;
    width: 90%;
    height: 90%;
    margin: auto;
    overflow: hidden;

    // 文字不能选中
    -webkit-user-select: none; /* Chrome, Safari, Opera */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;

    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    backdrop-filter: blur(5px); /* 添加高斯模糊 */
    //background-color: rgba(255, 255, 255, 0.5); /* 添加半透明背景 */
    z-index: 2; // 确保 content 在图片上面

    .login-inner {
      display: flex;
      align-items: center;
      //position: absolute;
      width: 50%;
      height: 100%;
      z-index: -1;

      .login-inner-bg {
        position: absolute;
        width: 50%;
        height: 100%;
        object-fit: cover;
      }

      //@keyframes breath {
      //  0% {
      //    filter: hue-rotate(0deg);
      //  }
      //  100% {
      //    filter: hue-rotate(360deg);
      //  }
      //}
    }

    .login-area {
      width: 50%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      margin: 0 auto;
      border-radius: 10px;

      .title {
        font-size: 25px;
      }

      .form-container {
        width: 50%;

        .demo-ruleForm {
          overflow: hidden;
          .form-input-box {
            margin: 36px auto;
          }

          &:deep(.el-input__wrapper) {
            height: 40px;
          }
        }

        .sub-btn {
          position: relative;
          width: 100%;
          height: 44px;
          border: none;
          background-color: #683dc9;
        }

        .sub-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%; /* 初始位置在按钮左侧 */
          width: 100%;
          height: 100%;
          background-color: #ffffff;
          opacity: 0;
          transform: skewX(-30deg); /* 添加倾斜效果 */
          transition:
            left 0.5s ease,
            opacity 0.5s ease; /* 添加过渡效果 */
        }

        .sub-btn:hover::before {
          left: 120%; /* 鼠标移入时，将闪光元素移动到按钮右侧 */
          opacity: 1;
        }

        .login-form-footer {
          font-size: 13px;
          margin-top: 50px;
          text-align: center;

          .footer-register {
            color: #4e1fcf;
            border-bottom: 1px solid #4e1fcf;
            margin-left: 6px;
          }
        }
      }
    }
  }
}
</style>
