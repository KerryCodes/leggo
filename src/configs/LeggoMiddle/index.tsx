import React, { useEffect, useState } from 'react'
import { Button, Form, InputNumber } from 'antd'
import { TPostSchemaModel, TSchema } from '../../interface'
import { DroppedItem } from './components/DroppedItem'
import { CreateSchemaModel } from './components/CreateSchemaModel'
import { leggoItemStore, LeggoSchema } from '../../service'
import { InjectSchemaModel } from './components/InjectSchemaModel'


export function LeggoMiddle(props: React.PropsWithoutRef<{
  activeSchema: React.MutableRefObject<TSchema>,
  schemaList: TSchema[],
  setSchemaList: React.Dispatch<React.SetStateAction<TSchema[]>>,
  forceRender: () => void,
  onPostSchemaModel: TPostSchemaModel,
}>){
  const { activeSchema, schemaList, setSchemaList, forceRender, onPostSchemaModel }= props
  const [form]= Form.useForm()
  const [formProps, setFormProps]= useState({
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  })
  
  const handleDragOver= (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect= 'copy'
  }

  const handleDrop= (e: React.DragEvent) => {
    e.preventDefault()
    const schemaType= e.dataTransfer.getData('text/plain')
    if(!schemaType){ return }
    const leggoItemInfo= leggoItemStore.total[schemaType]
    const newSchema= new LeggoSchema(schemaType, leggoItemInfo)
    setSchemaList([...schemaList, newSchema])
  }

  const changeFormProps= (propItem: any) => {
    setFormProps(pre => ({ ...pre, ...propItem }))
  }

  const clearAllSchemas= () => {
    activeSchema.current= null
    setSchemaList([])
  }

  useEffect(() => {
    form.validateFields()
  })

  return (
    <div className="leggo-configs-middle">
      <div className="top-area">
        <strong>表单模板</strong>
        <div className="top-actions">
          <div>
            <strong>labelCol：</strong>
            <InputNumber min={0} max={24-formProps.wrapperCol.span} value={formProps.labelCol.span} onChange={value => changeFormProps({labelCol:{span:value}})} />
          </div>
          <div>
            <strong>wrapperCol：</strong>
            <InputNumber min={0} max={24-formProps.labelCol.span} value={formProps.wrapperCol.span} onChange={value => changeFormProps({wrapperCol:{span:value}})} />
          </div>
          <InjectSchemaModel setSchemaList={setSchemaList} />
          <CreateSchemaModel formProps={formProps} schemaList={schemaList} onPostSchemaModel={onPostSchemaModel} />
          <Button onClick={clearAllSchemas}>clear</Button>
        </div>
      </div>
      <Form form={form} {...formProps} className="leggo-configs-middle-form">
        <div className="drop-area" onDragOver={handleDragOver} onDrop={handleDrop}>
          {
            schemaList.map(schema => 
              <DroppedItem key={schema.id} 
                activeSchema={activeSchema}
                schema={schema} 
                setSchemaList={setSchemaList} 
                forceRender={forceRender}
              />
            )
          }
        </div>
      </Form>
    </div>
  )
}


