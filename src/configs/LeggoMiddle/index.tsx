import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Form, FormProps } from 'antd'
import { DroppedItem } from './components/DroppedItem'
import { CreateSchemaModel } from './components/CreateSchemaModel'
import { leggoItemStore } from '../../itemStore'
import { InjectSchemaModel } from './components/InjectSchemaModel'
import { FormPropsSettingModal } from './components/FormPropsSettingModal'
import { LeggoSchema } from '../../utils/LeggoSchema'
import { ConfigsContext } from '..'

const defaultFormProps: FormProps= {
  name: undefined,
  labelCol: { span: 6, offset: 0 },
  wrapperCol: { span: 16, offset: 0 },
  colon: true,
  labelAlign: 'right',
  layout: 'horizontal',
  scrollToFirstError: false,
  size: undefined,
  validateTrigger: 'onChange',
  preserve: true,
  requiredMark: true,
}


export default function LeggoMiddle(){
  const { schemaList, setSchemaList, activeSchema }= useContext(ConfigsContext)
  const [form]= Form.useForm()
  const [visible, setVisible] = useState(false)
  const schemaModelJSONCache= useRef({})
  const formProps= useRef<FormProps>(defaultFormProps)
  const targetIndex= useRef<number>(null)
  
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
          <FormPropsSettingModal formProps={formProps} visible={visible} setVisible={setVisible} />
          <InjectSchemaModel schemaModelJSONCache={schemaModelJSONCache} />
          <CreateSchemaModel formProps={formProps.current} schemaModelJSONCache={schemaModelJSONCache} />
          <Button onClick={clearAllSchemas}>clear</Button>
        </div>
      </div>
      <Form form={form} {...formProps.current} className="leggo-configs-middle-form">
        <div className="drop-area" onDragOver={handleDragOver} onDrop={handleDrop}>
          {
            schemaList.map((schema, index) => <DroppedItem key={schema.id} index={index} targetIndex={targetIndex} schema={schema} />)
          }
        </div>
      </Form>
    </div>
  )
}