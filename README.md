#1 开发效率
  1. mobx是mvvm架构，面向对象编程，数据是mutable，改变的是数据的引用。
  2. redux是flux架构，函数试编程，数据是immutable，每次返回一个全新的state。
  3. mobx只需要observable，observe，action就能绑定view，简单实用。
  4. redux是标准的flux架构，数据流动是view -> action -> reducer -> store的过程，
    如果为了更好处理复杂的或者异步流程，最好使用redux-saga中间件，
    数据流动是view -> action -> reducer (effects && -> saga proxy)-> store的过程，
    这样副作用在saga文件里面处理，state在reducer文件里面处理，保持view层绝对的纯净（很少出现与action相关if else ，then之类的代码），action的简洁。
 5.  mobx代码量至少少三分之一。

#2 性能优化
  1. mobx鼓励拆分组件，以最小粒度去observe组件,以最小的开销去渲染组件更新。
  2. redux可以使用connect去绑定只与自己相关的全局store的数据，最好不要通过父传子的属性传递方式，尽量少在节点比较高的组件上绑定数据,
    如果明确地知道渲染时机，可以通过componentShouldUpdate生命周期阻止（深比较是很消耗性能的，最好是精确到基本数据类型值的比较，不多不少，精准定位，
    但这是一件很难的事情）。
  3. 优化思路不一样，mobx是提倡以最小粒度observe数据，它自己便知道该update哪些组件，由于数据只有一份引用， 没有redux的reducer根据preState与action
    推导出nextState的能力，所以不能使用componentShouldUpdate优化（componentShouldUpdate是根据对比组件的nextProps与this.props来返回布尔值），
    mobx没有数据重组的性能消耗，如果使用mobx得当，甚至连组件componentShouldUpdate的性能消耗也没有了。

#3 组件通信
  不用多说，两者都不是问题。

#4 逻辑清晰程度
  1. redux比mobx更加清晰，也更加适合大型项目，特别是加上redux-saga中间件。
  2. mobx可以使用严格模式，使得只有加上@action装饰器才能改变数据。

#4 总结
  ##1 开发效率  mobx > redux
  ##2 性能优化  mobx(easy) , redux(difficult)
  ##3 组件通信  mobx ≈ redux
  ##4 逻辑清晰程度 mobx > redux