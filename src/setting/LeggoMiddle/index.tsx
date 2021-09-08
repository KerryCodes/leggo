import React, { useEffect, useState } from 'react'
import { Button, Form, InputNumber } from 'antd'
import { TPostSchemaModel, TSchema } from '../../public/interface'
import { DroppedFormItem } from './DroppedFormItem'
import { CreateSchemasModel } from './CreateSchemasModel'
import { leggoItemStore, LeggoSchema } from '../../public/leggoItemStore'


export function LeggoMiddle(props: React.PropsWithoutRef<{
  schemaList: TSchema[],
  setSchemaList: React.Dispatch<React.SetStateAction<TSchema[]>>,
  activeSchema: React.MutableRefObject<TSchema>,
  forceRender: () => void,
  onPostSchemaModel: TPostSchemaModel,
}>){
  const { schemaList, setSchemaList, activeSchema, forceRender, onPostSchemaModel }= props
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
    const formItemInfo= leggoItemStore[type]
    const newSchema= new LeggoSchema(type, formItemInfo)
    setSchemaList([...schemaList, newSchema])
  }

  const changeFormProps= (propItem: any) => {
    setFormProps(pre => ({ ...pre, ...propItem }))
  }

  const clearAllSchemas= () => {
    activeSchema.current= null
    setSchemaList([])
    forceRender()
  }

  useEffect(() => {
    form.validateFields()
  })

  return (
    <div className="leggo-setting-middle">
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
        <CreateSchemasModel formProps={formProps} schemaList={schemaList} onPostSchemaModel={onPostSchemaModel} />
        <Button onClick={clearAllSchemas}>clear</Button>
      </div>
      <Form form={form} {...formProps} className="leggo-setting-middle-form">
        <div className="drop-area" onDragOver={handleDragOver} onDrop={handleDrop}>
          {
            schemaList.map(schema => 
              <DroppedFormItem key={schema.id} 
                schema={schema} 
                setSchemaList={setSchemaList} 
                activeSchema={activeSchema}
                forceRender={forceRender}
              />
            )
          }
        </div>
      </Form>
    </div>
  )
}


