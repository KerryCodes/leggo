import { Button, Form, FormProps, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { TPostSchemaModel, TSchemaInfo } from '../../state'

const layout= {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}


export function CreateSchemasModel(props: React.PropsWithoutRef<{
  formProps: FormProps, 
  schemas: TSchemaInfo[],
  onPostSchemaModel: TPostSchemaModel,
}>){
  const { formProps, schemas, onPostSchemaModel }= props
  const [form]= Form.useForm()
  const [visible, setVisible]= useState(false)

  const handleSend= (values: {name:string, description:string}) => {
    onPostSchemaModel({
      ...values, 
      formProps,
      schemas,
    })
    setVisible(false)
  }
  
  return (
    <div>
      <Button type="primary" disabled={!schemas.length} onClick={() => setVisible(true)}>生成模板</Button>
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
    </div>
  )
}