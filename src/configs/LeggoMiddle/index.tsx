import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, FormProps } from 'antd'
import { TOnGetSchemaModel, TSchema } from '../../interface'
import { DroppedItem } from './components/DroppedItem'
import { CreateSchemaModel } from './components/CreateSchemaModel'
import { leggoItemStore, LeggoSchema } from '../../service'
import { InjectSchemaModel } from './components/InjectSchemaModel'
import { FormPropsSettingModal } from './components/FormPropsSettingModal'


export function LeggoMiddle(props: React.PropsWithoutRef<{
  activeSchema: React.MutableRefObject<TSchema>,
  schemaList: TSchema[],
  setSchemaList: React.Dispatch<React.SetStateAction<TSchema[]>>,
  forceRender: () => void,
  onGetSchemaModel: TOnGetSchemaModel,
}>){
  const { activeSchema, schemaList, setSchemaList, forceRender, onGetSchemaModel }= props
  const [form] = Form.useForm()
  const schemaModelJSONCache= useRef({})
  const formProps = useRef<FormProps>({
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
  })
  const targetIndex= useRef<number>(null)
  const [visible, setVisible] = useState(false)
  
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
          <InjectSchemaModel setSchemaList={setSchemaList} schemaModelJSONCache={schemaModelJSONCache} />
          <CreateSchemaModel formProps={formProps.current} schemaList={schemaList} schemaModelJSONCache={schemaModelJSONCache} onGetSchemaModel={onGetSchemaModel} />
          <Button onClick={clearAllSchemas}>clear</Button>
        </div>
      </div>
      <Form form={form} {...formProps.current} className="leggo-configs-middle-form">
        <div className="drop-area" onDragOver={handleDragOver} onDrop={handleDrop}>
          {
            schemaList.map((schema, index) => 
              <DroppedItem key={schema.id} 
                index={index}
                targetIndex={targetIndex}
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