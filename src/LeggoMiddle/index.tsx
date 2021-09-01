import React, { useEffect, useState } from 'react'
import './index.less'
import { Button, Form, InputNumber } from 'antd'
import { TPostSchemaModel, TSchemaInfo } from '../state'
import { cloneDeep } from 'lodash'
import { DroppedFormItem } from './DroppedFormItem'
import { CreateSchemasModel } from './CreateSchemasModel'
import { formItemsLib } from '../formItemsLib'


export function LeggoMiddle(props: React.PropsWithoutRef<{
  activeSchema: React.MutableRefObject<TSchemaInfo>,
  setForceRender: React.Dispatch<React.SetStateAction<number>>,
  onPostSchemaModel: TPostSchemaModel,
}>){
  const { activeSchema, setForceRender, onPostSchemaModel }= props
  const [schemas, setSchemas]= useState<TSchemaInfo[]>([])
  const [formProps, setFormProps]= useState({
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  })
  const [form]= Form.useForm()
  
  const handleDragOver= (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect= 'copy'
  }

  const handleDrop= (e: React.DragEvent) => {
    e.preventDefault();
    const type= e.dataTransfer.getData('text/plain')
    if(!type){ return }
    const formItemInfo= formItemsLib[type]
    const newSchema= {
      type,
      id: Date.now().toString(),
      setting: cloneDeep(formItemInfo).setting,
    }
    setSchemas([...schemas, newSchema])
  }

  const changeFormProps= (propItem: any) => {
    setFormProps(pre => ({ ...pre, ...propItem }))
  }

  const clearAllSchemas= () => {
    activeSchema.current= null
    setSchemas([])
    setForceRender(pre => pre+1)
  }

  useEffect(() => {
    form.validateFields()
  })

  return (
    <div className="leggo-middle">
      <strong>表单模板</strong>
      <div className="top-actions">
        <div>
          <span>labelCol：</span>
          <InputNumber min={1} max={24-formProps.wrapperCol.span} value={formProps.labelCol.span} onChange={value => changeFormProps({labelCol:{span:value}})} />
        </div>
        <div>
          <span>wrapperCol：</span>
          <InputNumber min={1} max={24-formProps.labelCol.span} value={formProps.wrapperCol.span} onChange={value => changeFormProps({wrapperCol:{span:value}})} />
        </div>
        <CreateSchemasModel formProps={formProps} schemas={schemas} onPostSchemaModel={onPostSchemaModel} />
        <Button onClick={clearAllSchemas}>clear</Button>
      </div>
      <Form form={form} {...formProps} className="leggo-middle-form">
        <div className="drop-area" onDragOver={handleDragOver} onDrop={handleDrop}>
          {
            schemas.map(schemaInfo => 
              <DroppedFormItem key={schemaInfo.id} 
                schemaInfo={schemaInfo} 
                setSchemas={setSchemas} 
                activeSchema={activeSchema}
                setForceRender={setForceRender}
              />
            )
          }
        </div>
      </Form>
    </div>
  )
}


