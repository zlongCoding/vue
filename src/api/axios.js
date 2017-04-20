import axios from 'axios'

axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
         if (error.response) {
            switch (error.response.status) {
                case 404:
                   console.log('aaaaaa')
                case 500:
                   console.log('pppppp')
                    // 401 清除token信息并跳转到登录页面
                    // store.commit(types.LOGOUT);
                    // router.replace({
                    //     path: 'login',
                    //     query: {redirect: router.currentRoute.fullPath}
                    // })
            }
        }
    return Promise.reject(error);
  });
export default axios;