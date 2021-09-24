# leggo
拖拽式前端表单生成低代码工具～

> - 演示地址：https://kerrycodes.github.io/
> - Github：https://github.com/KerryCodes/leggo
> - 安装：`npm i leggo`

## story

因为老员工的离职，我接手了一个完全由表单组成的发布模块，之前我并没有看过业务源码。后续因为接入新的需求而冲进去维护这坨代码。注意我用了“坨”这个量词，你应该明白我在说什么。因为整个模块缺少顶层设计，导致维护成本极高，频频报bug。于是开始思考为什么不能通过拖拽直接生成和维护这些表单呢？于是leggo就此诞生，名字来源于乐高Lego，寓意像搭积木一样完成表单的设计。

## leggo哲学

- 虽然利用了“拖拽”这一最直观简单的交互方式。但**leggo并非面向非前端人员，Leggo是一个为专业前端开发者提升效率的工具**

- **leggo从一开始就没有想要做成一个大而全的表单配置解决方案。** 第一版甚至只是花了一个下午便告完成。所以leggo并不会为了能够实现复杂逻辑的表单组件而放弃易用性。leggo真正要做的是帮助前端开发快速搭建和维护表单结构，轻松完成那些无脑重复搬砖的表单组件。这使得前端开发能够更专注于开发拥有特定复杂逻辑交互的表单组件。

- **leggo保持了几乎完全开放的自由拓展空间。** 不但可拖拽的表单组件库能够被自由注册。所有通过leggo模板渲染的组件也可以轻松的被整体覆盖、组装或重写属性。你甚至可以暴露各种公共状态和函数给leggo消费。所以leggo并非只能应用于简单的表单设计场景，这完全取决于开发者的大胆拓展。

- **上手成本极低。** 如果你熟悉React和Antd，则你只需要学习1-2个leggo的Api就可以开始在项目中部署。Antd库中`Form`、`Form.Item`以及相关input组件的所有属性和事件仍旧可以正常定义和使用。

## 基础应用
假设你已经通过[leggo表单设计器](https://kerrycodes.github.io/)生成了一个表单模板（获得一个JSON对象，即下列代码中`schemaModel`），则仅通过以下2行代码你就得到了实际需要的表单：
```typeScript
export const schemaModel= {
  //JSON
}
```

```typeScript
export { LeggoForm } from 'leggo'
export { schemaModel } form './schemaModel'


function MyForm(){
  const leggo= LeggoForm.useLeggo(schemaModel)
  
  return <LeggoForm leggo={leggo} />
}
```

我们从`leggo`导出了`LeggoForm`，而`schemaModel`是通过Leggo表单设计器生成的JSON，`LeggoForm`这个高阶组件会将模版JSON解析并渲染成实际的表单组件。

从使用的角度来说`LeggoForm`和Antd中的`Form`几乎没有任何差别（除了必须要挂载`leggo`这个属性）。你可以在`LeggoForm`上定义任何`Form`组件允许的属性并正常运行，比如像以下这样：

```typeScript
function MyForm(){
  const leggo= LeggoForm.useLeggo(schemaModel)
  const [form]= Form.useForm()

  return (
    <LeggoForm leggo={leggo} 
      form={form} 
      labelCol={ span: 6 }
      wrapperCol={ span: 14 }
      onValuesChange={handleValuesChange} 
      onFinish={hanldeFinish} 
      .
      .
      .
    />
  )
}
```
考虑到你的表单模板`schemaModel`可能不是存在本地，而需要从服务器异步远程拉取，则你可以这样部署：

```typeScript
function MyForm(){
  const leggo= LeggoForm.useLeggo()
  const [form]= Form.useForm()
  
  useEffect(() => {
    leggo.resetSchemaModel(schemaModel)
  }, [schemaModel])

  return (
    <LeggoForm leggo={leggo} 
      form={form} 
      labelCol={ span: 6 }
      wrapperCol={ span: 14 }
      onValuesChange={handleValuesChange} 
      onFinish={hanldeFinish} 
      .
      .
      .
    />
  )
}
```
简单的表单通过以上代码已经足够部署应用了。下面我们逐步引入更复杂的场景。以下是我们需要的一个表单组件，可以注意到在组件到右侧有一个“同步”按钮。这种个性化的组件并没有办法通过拖拽完成全部设计。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d67b3b3c16754116afb9a96528ddb61a~tplv-k3u1fbpfcp-watermark.image?)

不要着急，我们先通过拖拽完成左侧经典表单组件部分的设计。右侧的按钮我们只需要在渲染表单前通过中间件函数注入即可，中间件函数在leggo中是作为表单渲染前灵活拓展的手段之一。代码如下：

```typeScript
import { TConfigs } from 'leggo/lib/interface';


function MyForm(){
  const leggo= LeggoForm.useLeggo(schemaModel, middleware)
  const [form]= Form.useForm()
  
  //  异步的情况
  //  useEffect(() => {
  //    leggo.resetSchemaModel(schemaModel, middleware)
  //  }, [schemaModel])

  return (
    <LeggoForm leggo={leggo} />
  )
}


// 定义一个中间件函数
function middleware(configs: TConfigs) {
  configs.Successor= (props: React.PropsWithChildren<any>) => (
    <div style={{display: 'flex'}}>
      { props.children }
      <Button>同步</Button>
    </div>
  )
}
```
> 值得注意的是，中间件函数只会在整个`schemaModel`注入时执行。无论表单后续如何更新和渲染，中间函数都不会运行（除非你又通过`leggo.resetSchemaModel`重新注入一个新的`schemaModel`）。所以你不需要担心由中间件函数可能导致的性能问题。

你会注意到leggo引擎在运行中间件函数时为其注入一个参数`configs`。这个对象非常重要，它来自`schemaModel`，你通过表单设计器拖拽和设置的几乎所有参数都存在这个对象中。实际上，我们正是通过中间件函数在改造由表单设计器生成的`schemaModel`。`configs`中有2个关键的属性`itemProps`和`inputProps`。
> **itemProps**
>
> itemProps包含的参数有name、label、rules等。没错，这个对象会被直接注入进Form.Item组件：
>
>`<Form.Item {...itemProps} ></Form.Item>`

> **inputProps**
>
> inputProps包含的参数有disabled、style、placeholder、htmlType等。这个对象会被直接注入进input相关组件：
>
>`<Input {...inputProps} />`
>
>`<Checkbox.Group {...inputProps} />`
>
>`<DatePicker {...inputProps} />`

然后你发现在表单渲染前，通过中间件函数你有足够的机会去拓展整个表单的设计，比如：

```typeScript
function middleware(configs: TConfigs) {
  const { itemProps, inputprops }= configs
  
  if(itemProps.name !== 'test'){ return } //筛选我们需要改造的表单
  
  itemProps.label= 'test2' //我们更换了label
  
  itemProps.options= [ //我们更换了选项类组件所需要的options数据
    {label: '浙江', value: 'zj'},
    {label: '福建', value: 'fj'},
  ]
  
  configs.Successor= (props: React.PropsWithChildren<any>) => (
    <div style={{display: 'flex'}}>
      { props.children }
      <Button>同步</Button> 
    </div>
  ) //我们在表单右侧增加了一个按钮
  
  configs.SuperSuccessor= () => (
    <Form.Item label="newOne" name="newOne">
      <Input />
    </Form.Item>
  ) //我们甚至用一个全新的表单组件完全覆盖和丢弃了原有的表单组件
}
```
> **Successor 和 SuperSuccessor**
>
> 对于复杂的表单来说，`Successor` 和 `SuperSuccessor`非常有用，它是开发者利用leggo专注于复杂逻辑表单组件的关键。leggo表单设计器中所谓的**占位表单**组件即是为`Successor` 和 `SuperSuccessor`的替换操作预留了结构空间。
>
> 区别在于，`Successor`只是对原有的表单组件进行改造（原有的表单组件通过children的方式传给它，`itemProps`和`inputprops`仍旧会注入）。而`SuperSuccessor`则非常激进的覆盖和丢弃了原有的表单组件（`itemProps`和`inputprops`也被丢弃）。
>

```js
<Form.Item {...itemProps}>
  <Successor>
    <Input {...inputprops} />
  </Successor>
</Form.Item> 
```

```js
<SuperSuccessor />
```

以上是通过中间件函数一次性的改造`schemaModel`。而如果你需要随时改变表单的渲染方式，比如`disabled`属性，则你可以在任意时机通过调用`leggo.updateSchema`来实现。每个表单组件是单独重渲染的，所以你也不需要考虑性能的问题。如下：

```typeScript
// 可以随时调用
leggo.updateSchema('select', configs => {
  const { inputprops }= configs
  inputprops.disabled= true
})


// 中间件函数实现方式（注意这个函数只会运行一次！）：
function middleware(configs: TConfigs) {
  const { itemProps, inputprops }= configs
  if(itemProps.name === 'select'){ 
    inputprops.disabled= true
  }
}
```

## 高级应用
好的，让我们进一步引入更复杂的设计场景。假设我们需要设计一个允许数据联动的表单，日期组件是否必选由“单选”这个组件的值决定。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13ce9a7bd22946e2aff84be87c3909a6~tplv-k3u1fbpfcp-watermark.image?)

则我们只需要通过leggo表单设计器设置数据关联和简单的逻辑运算操作即可。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0de7822943314e43bc5f5176aa546b5d~tplv-k3u1fbpfcp-watermark.image?)

> `[{label: '必选日期', value: 1}, {label: '非必选日期', value: 2}]`

如果我们的关联值是在程序运行时才能拿到的，则我们可以通过在表单实际渲染前传入一个公共状态即可。公共状态既可以是值，也可以是函数，leggo引擎会自动识别。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a0f5be3652b45a3971430050853e04f~tplv-k3u1fbpfcp-watermark.image?)

还有一种常见的场景就是关于Select或Radio等组件需要远程拉取options数据，通过leggo也同样可以很方便实现这样的需求。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c317085f28c74c0da31306ce0f0adb04~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eeeb114a75d84fec990b4d3d63792e00~tplv-k3u1fbpfcp-watermark.image?)

>  带有关联按钮的数据都可以设置关联数据

## leggo表单设计器
> 演示地址：https://kerrycodes.github.io/

如果你需要在项目中直接部署这个表单设计器，则可以引入`LeggoConfigs`组件，`onGetSchemaModel`属性会在schemaModel生成后自动注入和执行。如下：

```typeScript
<LeggoConfigs onGetSchemaModel={postSchemaModelData} />

function postSchemaModelData= (schemaModel: TSchemaModel) => {
  console.log('发送schema～～～～～～', schemaModel)
}
```

> **重要！**
>
> 项目地址：https://github.com/KerryCodes/leggo
>
> 入行快一年了，编乎上没发过回答都攒了20个粉丝了，Github的star仍旧挂0！！！各位大佬能不能动动金手指，让我体验一下star的快感～
