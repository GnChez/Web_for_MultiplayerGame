// Utilities
import { defineStore } from 'pinia'
import {login, getLogin, endSession, loginGoogle} from '@/communicationsManager';


export const useAppStore = defineStore('app', {
  state: () => ({
    auth: false,
    loginInfo: {
      id: '',
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      email: '',
      image: ''
    }
  }),
  getters: {
    isAuthenticated() {
      return this.auth;
    },
    getLoginInfo() {
      return this.loginInfo;
    }
  },
  actions: {
    setLoginInfo({firstname, lastname, username, password, email}) {
      this.loginInfo.firstname = firstname;
      this.loginInfo.lastname = lastname;
      this.loginInfo.username = username;
      this.loginInfo.password = password;
      this.loginInfo.email = email;
    },
    setEmail(emailLogin) {
      this.loginInfo.email = emailLogin;
    },
    setPassword(pwdLogin) {
      this.loginInfo.password = pwdLogin;
    },
    setAuth(auth) {
      this.auth = auth;
    },
    login() {
      return new Promise((resolve, reject) => {
        login(this.$state.loginInfo).then((response) => response.json())
                .then((data) => {
                  this.$state.loginInfo = data;
                  this.loading = false;
                  if (data.email != '') {
                    this.$state.auth = true;
                    resolve(true);
                  } else {
                    this.$state.auth = false;
                    resolve(false);
                  }
                }).catch((error) => {
                  this.$state.auth = false;
                  reject(error);
                });
      });
    },
    loginGoogle() {
      return new Promise((resolve, reject) => {
        loginGoogle(this.$state.loginInfo).then((response) => response.json())
          .then((data) => {
            this.$state.loginInfo = data;
            this.loading = false;
            if (data.email != '') {
              this.$state.auth = true;
              resolve(true);
            } else {
              this.$state.auth = false;
              resolve(false);
            }
          }).catch((error) => {
            this.$state.auth = false;
            reject(error);
          });
      });  
    },
    hasCookieId() {
      return new Promise((resolve, reject) => {
        getLogin().then((response) => response.json())
          .then((data) => {
            this.$state.loginInfo = data;
            this.loading = false;
            if (data.email != '') {
              this.$state.auth = true;
              resolve(true);
            } else {
              this.$state.auth = false;
              resolve(false);
            }
          }).catch((error) => {
            this.$state.auth = false;
            reject(error);
          });
      });
    },
    logout() {
      return new Promise((resolve, reject) => {
        endSession().then(() => {
          this.$state.loginInfo = {
            id: '',
            name: '',
            contrasena: '',
            surname: '',
            email: '',
            rank: '',
            lifetotal: '',
            experience: '',
            image: '',
            id_classroom:''
          };
          this.$state.auth = false;
          resolve(true)
        }
        ).catch((error) => {
          this.$state.auth = false;
          reject(error);
        })
      })
    },
}}
)
