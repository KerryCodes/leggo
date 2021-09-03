import React, { useEffect, useRef, useState } from 'react'
import './App.less'
import { Button, Divider, Form } from 'antd'
import { CreateLeggoModel, LeggoForm, TSchemaInfo, TSchemasModel, useLeggo } from '../src'
import { cloneDeep } from 'lodash'


export default function App() {
  const modelList= useRef<{[key:string]:TSchemasModel}>({})
  const [ , setForceRender]= useState(0)

  const postSchemaModelData= (schemaModel: TSchemasModel) => {
    const modelName= schemaModel.name
    modelList.current[modelName]= cloneDeep(schemaModel)
    console.log('发送schema～～～～～～', schemaModel);
    setForceRender(pre => pre+1)
  }

  return (
    <div className="App">
      <CreateLeggoModel onPostSchemaModel={postSchemaModelData}>
        <Button type="primary">创建表单模板</Button>
      </CreateLeggoModel>
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
  const { name, description, schemas }= schemaModel
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
    schemas.forEach(middleware)
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


function middleware(schema: TSchemaInfo, index: number){
  const { type, setting }= schema
  if(type === 'input'){
    setting.inputProps.placeholder= 'placeholder已被middleware更改!'
  }
}