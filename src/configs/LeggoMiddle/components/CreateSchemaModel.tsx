import { Button, Form, FormProps, Input, Modal } from 'antd'
import React, { useContext, useRef, useState } from 'react'
import { ConfigsContext } from '../..'

const layout= {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}


export function CreateSchemaModel(props: React.PropsWithoutRef<{
  formProps: FormProps, 
  schemaModelJSONCache: React.MutableRefObject<any>,
}>){
  const { formProps, schemaModelJSONCache }= props
  const { schemaList, onGetSchemaModel }= useContext(ConfigsContext)
  const [form]= Form.useForm()
  const schemaModelJSON= useRef('')
  const [visible, setVisible]= useState(false)
  const [visibleJSON, setVisibleJSON]= useState(false)

  const handleClick= () => {
    const { name, description}= schemaModelJSONCache.current
    form.setFieldsValue({name, description})
    setVisible(true)
  }

  const handleSend= (values: {name:string, description:string}) => {
    const schemaModel= { ...values, formProps, schemaList }
    onGetSchemaModel(schemaModel)
    schemaModelJSON.current= JSON.stringify(schemaModel, null, 4)
    schemaModelJSONCache.current= schemaModelJSON.current
    setVisible(false)
    setVisibleJSON(true)
  }

  const handleCopy= () => {
    navigator.clipboard.writeText(schemaModelJSON.current)
    setVisibleJSON(false)
  }
  
  return (
    <>
      <Button type="primary" disabled={!schemaList.length} onClick={handleClick}>生成模板</Button>
      <Modal title="生成并发送模板" visible={visible} onOk={() => form.submit()} onCancel={() => setVisible(false)} getContainer={false}>
        <Form form={form} {...layout} onFinish={handleSend}>
          <Form.Item label="模板名称" name="name" rules={[{ required: true, message: '请填写模板名称！' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="描述" name="description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="schemaModel" 
        width='50vw'
        bodyStyle={{height: '60vh', overflow: 'auto'}} 
        visible={visibleJSON} 
        onOk={handleCopy} 
        okText="复制"
        onCancel={() => setVisibleJSON(false)}
      >
        <pre>{schemaModelJSON.current}</pre>
      </Modal>
    </>
  )
}