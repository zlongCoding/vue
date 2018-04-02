

### 数据的预取 

数据渲染页面的时候直接渲染出来，那么怎么做呢？

```
在服务器端渲染(SSR)期间，我们本质上是在渲染我们应用程序的"快照"，所以如果应用程序依赖于一些异步数据，那么在开始渲染过程之前，需要先预取和解析好这些数据。

另一个需要关注的问题是在客户端，在挂载(mount)到客户端应用程序之前，需要获取到与服务器端应用程序完全相同的数据 - 否则，客户端应用程序会因为使用与服务器端应用程序不同的状态，然后导致混合失败。

为了解决这个问题，获取的数据需要位于视图组件之外，即放置在专门的数据预取存储容器(data store)或"状态容器(state container)）"中。首先，在服务器端，我们可以在渲染之前预取数据，并将数据填充到 store 中。此外，我们将在 HTML 中序列化(serialize)和内联预置(inline)状态。这样，在挂载(mount)到客户端应用程序之前，可以直接从 store 获取到内联预置(inline)状态。

为此，我们将使用官方状态管理库 Vuex。
```

我们写把vuex简单写一下
```
/* store.js */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      blogList: []
    },
    actions: {
      getList ({ commit }) {
		// 注意这里一定要返回一个promise，下面会看到原因
        return axios.get('http://localhost:8000/api/getList').then((res) => {
            commit('setList', res.data.list)
        })
      }
    },
    mutations: {
      setList (state, list) {
        state.blogList = list
      }
    }
  })
}
```
vuex的状态改变只能通过mutations操作，并且只能是同步的，异步的行文要放在action中。上面是一个简单的获取博客列表的逻辑。

那么组件是在哪里dispatch呢，可以在路由组件上暴露一个自定义静态函数asyncData，需要将 store 和路由信息作为参数传递进去：
```
<template>
  <ul>
    <li v-for="blog in blogList" :key="blog.title">
      <h2>{{blog.title}}</h2>
    </li>
  </ul>
</template>

<script>
export default {
  asyncData( { store, router }) {
    return store.dispatch('getList')
  },

  computed: {
    blogList() {
      return this.$store.state.blogList
    }
  }
}
</script>
```
我们的下一步工作就是在服务端渲染时检查匹配到的路由组件，看他是否有asyncData方法，如果有就将store和router传入调用

```
import { createApp } from './app'

export default context => {
	
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    router.push(context.url)

    const matchedComponents = router.getMatchedComponents()
    if (!matchedComponents.length) {
		return reject({code: 404})
	}
		
    Promise.all(matchedComponents.map(Component => {
		// 这个地方就是上面dispatch一定要返回一个promise的原因
        if (Component.asyncData) {
			return Component.asyncData({
              store,
			  router
            })
        }
    })).then(() => {
        context.state = store.state
        resolve(app)          
    }).catch(reject)
  })
  
}
```
我们看到执行完dispatch的逻辑之后，有这么一行代码
```
context.state = store.state
```
这是干什么呢，我们再回头看看最初文档里面提到的几句话
```
我们将在 HTML 中序列化(serialize)和内联预置(inline)状态。这样，在挂载(mount)到客户端应用程序之前，可以直接从 store 获取到内联预置(inline)状态。
```
其实就是将store的状态同步到客户端
```
// 在返回的内容中插入一个标签，把store的状态挂载到window对象上，客户端自然可以取到
<script>window.__INITIAL_STATE__ = ${JSON.stringify(context.state)}</script>
```
```
import { createApp } from './app'

const { app, store } = createApp()

// 同步store
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

app.$mount('#app')
```
最后一项工作是解决客户端如何获取数据，我们可以在mount之前检查组件是否有asyncData方法，有的话执行就可以了
```
  beforeMount () {
    const { asyncData } = this.$options
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = asyncData({
        store: this.$store
      })
    }
  }
```
可以通过mixin为全局的组件添加
```
Vue.mixin({
  beforeMount () {
    const { asyncData } = this.$options
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = asyncData({
        store: this.$store
      })
    }
  }
})
```
可以看到，数据已经被取到并且渲染出来了。 





