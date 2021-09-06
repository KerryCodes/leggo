import React, { useEffect, useRef, useState } from 'react'
import './App.less'
import { Button, Divider, Drawer, Form } from 'antd'
import 'antd/dist/antd.css';
import { LeggoSetting, LeggoForm, useLeggo } from '../lib'
import { cloneDeep } from 'lodash'
import { TSchema, TSchemasModel } from '../lib/public/interface';


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
        <LeggoSetting onPostSchemaModel={postSchemaModelData} />
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
  const { name, description, schemaList }= schemaModel
  const [form] =Form.useForm()
  const leggo= useLeggo()
    
  const changeOptions= () => {
    leggo.updateSchemaModelData('select', (setting, StandardFormItem) => {
      setting.customizedFormItem= <div>已填充选项：{StandardFormItem}</div>
      setting.inputProps.options= [
        {label: 'A', value: 1}, 
        {label: 'B', value: 2},
        {label: 'C', value: 3},
        {label: 'D', value: 4},
        {label: 'E', value: 5},
      ]
    })
  }

  useEffect(() => {
    schemaList.forEach(middleware)
    leggo.updateSchemaModel(schemaModel)
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


function middleware(schema: TSchema, index: number){
  const { type, setting }= schema
  if(type === 'input'){
    setting.inputProps.placeholder= 'placeholder已被middleware更改!'
  }
}