import React, { useEffect, useRef, useState } from 'react'
import './App.less'
import { Button, Divider, Drawer, Form } from 'antd'
import 'antd/dist/antd.css';
import { LeggoConfigs, LeggoForm } from '../src'
import { cloneDeep } from 'lodash'
import { TSchemasModel } from '../src/public/interface';


export default function App() {
  const modelList= useRef<{[key:string]: TSchemasModel}>({})
  const [visible, setVisible]= useState(false)
  const [ , setForceRender]= useState(0)

  const postSchemaModelData= (schemaModel: TSchemasModel) => {
    const modelName= schemaModel.name
    modelList.current[modelName]= cloneDeep(schemaModel)
    console.log('发送schema～～～～～～', schemaModel);
    setForceRender(pre => pre+1)
  }

  return (
    <div className="App">
      <Button type="primary" onClick={() => setVisible(true)}>创建表单模板</Button>
      <Drawer title="拖拽生成表单" placement="top" height='100%' visible={visible} onClose={() => setVisible(false)}>
        <LeggoConfigs onPostSchemaModel={postSchemaModelData} />
      </Drawer>
      <div className="show-area">
        {
          Object.entries(modelList.current).map(([modelName, schemaModel]) => 
            <ShowForm key={modelName} schemaModel={schemaModel} />
          )
        }
      </div>
    </div>
  )
}


function ShowForm(props: React.PropsWithoutRef<{schemaModel: TSchemasModel}>){
  const { schemaModel }= props
  const { name, description }= schemaModel
  const [form] =Form.useForm()
  const leggo= LeggoForm.useLeggo()
    
  const changeOptions= () => {
    leggo.updateSchema('select', (configs, StandardFormItem) => {
      configs.customizedFormItem= <div>已填充选项：{StandardFormItem}</div>
      configs.inputProps.options= [
        {label: 'A', value: 1}, 
        {label: 'B', value: 2},
        {label: 'C', value: 3},
        {label: 'D', value: 4},
        {label: 'E', value: 5},
      ]
    })
  }

  useEffect(() => {
    leggo.resetSchemaModel(schemaModel)
  }, [schemaModel])

  return (
    <div className="show-form">
      <div className="header">
        <div>模板名：{name}</div>
        <div>描述：{description}</div>
        <div>
          操作：
          <Button onClick={changeOptions}>填充选项</Button>
        </div>
      </div>
      <Divider></Divider>
      <LeggoForm leggo={leggo} form={form} onValuesChange={console.log} onFinish={console.log} />
    </div>
  )
}