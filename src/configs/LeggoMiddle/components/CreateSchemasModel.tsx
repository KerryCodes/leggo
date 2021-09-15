import { Button, Form, FormProps, Input, Modal } from 'antd'
import React, { Fragment, useRef, useState } from 'react'
import { TPostSchemaModel, TSchema } from '../../../interface'

const layout= {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}


export function CreateSchemasModel(props: React.PropsWithoutRef<{
  formProps: FormProps, 
  schemaList: TSchema[],
  onPostSchemaModel: TPostSchemaModel,
}>){
  const { formProps, schemaList, onPostSchemaModel }= props
  const [form]= Form.useForm()
  const schemaModel= useRef(null)
  const [visible, setVisible]= useState(false)
  const [visibleJSON, setVisibleJSON]= useState(false)

  const handleSend= (values: {name:string, description:string}) => {
    schemaModel.current= { ...values, formProps, schemaList }
    onPostSchemaModel(schemaModel.current)
    setVisible(false)
    setVisibleJSON(true)
  }

  const handleCopy= () => {
    const contentJSON= JSON.stringify(schemaModel.current, null, 4)
    navigator.clipboard.writeText(contentJSON)
    setVisibleJSON(false)
  }
  
  return (
    <Fragment>
      <Button type="primary" disabled={!schemaList.length} onClick={() => setVisible(true)}>生成模板</Button>
      <Modal title="创建并发送模板" visible={visible} onOk={() => form.submit()} onCancel={() => setVisible(false)} getContainer={false}>
        <Form form={form} {...layout} onFinish={handleSend}>
          <Form.Item label="模板名称" name="name" rules={[{ required: true, message: '请填写模板名称！' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="描述" name="description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="schemaModel" width='50vw'
        bodyStyle={{height: '70vh', overflow: 'auto'}} 
        visible={visibleJSON} 
        onOk={handleCopy} 
        okText="复制JSON"
        onCancel={() => setVisibleJSON(false)}
        >
        <pre>{JSON.stringify(schemaModel.current, null, 4)}</pre>
      </Modal>
    </Fragment>
  )
}