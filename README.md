# 开发效率
  1. mobx是mvvm架构，面向对象编程，数据是mutable，改变的是数据的引用。
  2. redux是flux架构，函数试编程，数据是immutable，每次返回一个全新的state。
  3. mobx只需要observable，observe，action就能绑定view，简单实用。
  4. redux是标准的flux架构，数据流动是view -> action -> reducer -> store的过程，
    如果为了更好处理复杂的或者异步流程，最好使用redux-saga中间件，
    数据流动是view -> action (effects && -> saga proxy) -> reducer -> store的过程，
    这样副作用在saga文件里面处理，state在reducer文件里面处理，保持view层绝对的纯净（很少出现与action相关if else ，then之类的代码），action的简洁。
 5.  mobx代码量至少少三分之一。

# 性能优化
  1. mobx鼓励拆分组件，以最小粒度去observe组件,以最小的开销去渲染组件更新。
  2. redux可以使用connect去绑定只与自己相关的全局store的数据，最好不要通过父传子的属性传递方式，尽量少在节点比较高的组件上绑定数据,
    如果明确地知道渲染时机，可以通过componentShouldUpdate生命周期阻止（深比较是很消耗性能的，最好是精确到基本数据类型值的比较，不多不少，精准定位，
    但这是一件很难的事情）。
  3. 优化思路不一样，mobx是提倡以最小粒度observe数据，它自己便知道该update哪些组件，数据只有一份引用，
    mobx没有数据重组的性能消耗，如果使用mobx得当，甚至连组件componentShouldUpdate的性能消耗也没有了。

# 组件通信
  1. 不用多说，两者都不是问题。

# 逻辑清晰程度
  1. redux比mobx更加清晰，也更加适合大型项目，特别是加上redux-saga中间件。
  2. mobx可以使用严格模式，使得只有加上@action装饰器才能改变数据。

# 总结
  1. 开发效率  mobx > redux
  2. 性能优化  mobx(easy) , redux(difficult)
  3. 组件通信  mobx ≈ redux
  4. 逻辑清晰程度 mobx < redux

# RN常用的第三方组件
  0. link （http://www.jianshu.com/p/53ff78168acc）
  1. 导航 react-navigation (https://github.com/react-community/react-navigation)
  2. 基于react-navigation更适合redux的导航 react-native-router-flux (https://github.com/aksonov/react-native-router-flux)
  3. 字体图标库 react-native-vector-icons（https://github.com/oblador/react-native-vector-icons）
  4. 轮播 react-native-swiper（https://github.com/leecade/react-native-swiper）
  5. 加载动画 react-native-spinkit （https://github.com/maxs15/react-native-spinkit）
  6. 动画 react-native-animatable (https://github.com/oblador/react-native-animatable)
  7. 侧滑菜单 react-native-side-menu (https://github.com/react-native-community/react-native-side-menu)
  8. 抽屉效果 react-native-drawer （https://github.com/root-two/react-native-drawer）
  9. 侧滑按钮 react-native-swipe-list-view （https://github.com/jemise111/react-native-swipe-list-view）（https://github.com/dancormier/react-native-swipeout）
  10. 搜索框 react-native-search-bar（https://github.com/umhan35/react-native-search-bar）
  11. 选项卡 标签选择 （https://github.com/brentvatne/react-native-scrollable-tab-view）（https://github.com/react-native-community/react-native-tab-view）（https://github.com/vczero/react-native-tab-menu）
  12. 双平台兼容的ActionSheet（https://github.com/beefe/react-native-actionsheet）

# 值得注意的问题
  1.InteractionManager.runAfterInteractions(fn), 解决动画切换到卡顿问题，建议导航切换的时候（有切换动画），如果有数据请求，可以在点击切换按钮的时候发起请求，等动画结束后再初始化render
  ```
  import {InteractionManager} from 'react-native';

  const response = yeild call(api,params);
  InteractionManager.runAfterInteractions(function*(){
    yeild put({type:'***_SUCCESS',response})
  })
  ```
  2. 使用redux的connect函数时，对于比较大的组件，根据情况拆分为若干子组件，尽量少在父组件connect state，把state分解map给子组件（仅仅map需要的值），使用shouldComponentUpdate生命周期方法组阻止不必要的render。

  3. 使用PureComponent，这是官方的默认shouldComponentUpdate调用了shallowEqual的的组件
  ```
  import {PureComponent} from 'react'

  class CustomComponent extends PureComponent{

  }
  ```
  4. 使用箭头函数或者在constructor中提早bind this，没有特殊需求不要在jsx中 写 .bind(this) ,()=> fn() 的语句，这样每次render会传给组件新的属性引用，即使使用PureComponent一样会重新渲染

  5. 使用TouchableHighlight，TouchableOpcity这类标签时，onPress执行的回调函数可以使用requestAnimationFrame(fn)在下一帧执行（LayoutAnimation一次性动画）

  6. 首屏加载，ListView设置pageSize,FlatList

# redux-saga
  1. 官方文档 (http://leonshi.com/redux-saga-in-chinese/docs/api/index.html)
  2. saga文件结构
  ```
  // path: ./store/sagas.js
    import name1Sagas from '*/components/name1/sagas.js'
    import name2Sagas from '*/components/name2/sagas.js'

    export default function* root(){
      yield all[
        ...name1Sagas,
        ...name2Sagas
      ];
    }
  ```
  ```
  //path: */components/name1/sagas.js

  export function* name1Flow(action){
    //***
  }

  export function* name2Flow(action){
    //***
  }

  export function* watchName2Flow(){
    while(true){
      //***
    }
  }

  export default [
    takeLatest('actionType',name1Flow),
    watchName2Flow
  ]
  ```

  # 样式指南表
  link (https://github.com/doyoe/react-native-stylesheet-guide)
  # RN官方文档
  link (http://facebook.github.io/react-native/docs/animated.html)