<!--
 * @Descripttion: 静态页面，测试锚元素情况。
 * 情况
 * @version: 1.0
 * @Author: 谭义洋
 * @Date: 2021-12-24 14:16:02
 * @LastEditors: 谭义洋
 * @LastEditTime: 2021-12-24 16:28:24
-->
<template>
  <div class="container">
    <h2 id="创建一个 Vue 实例">
      <a
        href="#创建一个Vue实例"
        class="headerlink"
        title="创建一个 Vue 实例"
        data-scroll=""
      >创建一个 Vue 实例</a>
    </h2>
    <p>
      虽然没有完全遵循 MVVM 模型，但是 Vue 的设计也受到了它的启发。因此在文档中经常会使用 vm (ViewModel 的缩写) 这个变量名表示 Vue 实例。

      当创建一个 Vue 实例时，你可以传入一个选项对象。这篇教程主要描述的就是如何使用这些选项来创建你想要的行为。作为参考，你也可以在 API 文档中浏览完整的选项列表。

      一个 Vue 应用由一个通过 new Vue 创建的根 Vue 实例，以及可选的嵌套的、可复用的组件树组成。举个例子，一个 todo 应用的组件树可以是这样的：
    </p>
    <h2 id="数据与方法">
      <a
        href="#数据与方法"
        class="headerlink"
        title="数据与方法"
        data-scroll=""
      >数据与方法</a>
    </h2>
    <p>
      当一个 Vue 实例被创建时，它将 data 对象中的所有的 property 加入到 Vue 的响应式系统中。当这些 property 的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。

      // 我们的数据对象
      var data = { a: 1 }

      // 该对象被加入到一个 Vue 实例中
      var vm = new Vue({
      data: data
      })

      // 获得这个实例上的 property
      // 返回源数据中对应的字段
      vm.a == data.a // => true

      // 设置 property 也会影响到原始数据
      vm.a = 2
      data.a // => 2

      // ……反之亦然
      data.a = 3
      vm.a // => 3
      当这些数据改变时，视图会进行重渲染。值得注意的是只有当实例被创建时就已经存在于 data 中的 property 才是响应式的。也就是说如果你添加一个新的 property，比如：

      vm.b = 'hi'
      那么对 b 的改动将不会触发任何视图的更新。如果你知道你会在晚些时候需要一个 property，但是一开始它为空或不存在，那么你仅需要设置一些初始值。比如：

      data: {
      newTodoText: '',
      visitCount: 0,
      hideCompletedTodos: false,
      todos: [],
      error: null
      }
      这里唯一的例外是使用 Object.freeze()，这会阻止修改现有的 property，也意味着响应系统无法再追踪变化。

      var obj = {
      foo: 'bar'
      }

      Object.freeze(obj)

      new Vue({
      el: '#app',
      data: obj
      })
      除了数据 property，Vue 实例还暴露了一些有用的实例 property 与方法。它们都有前缀 $，以便与用户定义的 property 区分开来。例如：

      var data = { a: 1 }
      var vm = new Vue({
      el: '#example',
      data: data
      })

      vm.$data === data // => true
      vm.$el === document.getElementById('example') // => true

      // $watch 是一个实例方法
      vm.$watch('a', function (newValue, oldValue) {
      // 这个回调将在 `vm.a` 改变后调用
      })
      以后你可以在 API 参考中查阅到完整的实例 property 和方法的列表。
    </p>
  </div>
</template>

<script>
export default {
  name: 'StaticPage'
}
</script>
