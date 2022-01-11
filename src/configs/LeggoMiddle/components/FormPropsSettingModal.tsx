import React from 'react';
import { Button, Form, FormProps, Input, InputNumber, Modal, Radio, Select, Space, Switch } from 'antd';

const layout= {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
}


export function FormPropsSettingModal(props: React.PropsWithoutRef<{
  formProps: React.MutableRefObject<FormProps<any>>,
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
}>) {
  const { formProps, visible, setVisible }= props
  const [form] = Form.useForm()
  
  const handleChangeFormProps= () => {
    const values = form.getFieldsValue()
    if (!values.name) {
      values.name = undefined
    }
    formProps.current = values
    setVisible(false)
  }

  const handleCancel= () => {
    form.setFieldsValue(formProps.current)
    setVisible(false)
  }

  return (
    <>
      <Button type="link" onClick={() => setVisible(true)}>FormProps</Button>
      <Modal title="设置Form的属性"
        visible={visible}
        bodyStyle={{ height: '60vh', overflow: 'auto' }}
        onOk={handleChangeFormProps}
        onCancel={handleCancel}
      >
        <Form form={form} {...layout} initialValues={formProps.current}>
          <Form.Item label="name" name="name">
            <Input prefix='"' suffix='"' />
          </Form.Item>
          <Form.Item label='labelCol' required>
            <Space>
              <Form.Item label='span' name={['labelCol', 'span']} colon={false}>
                <InputNumber min={0} max={24} />
              </Form.Item>
              <Form.Item label='offset' name={['labelCol', 'offset']} colon={false}>
                <InputNumber min={0} max={24} />
              </Form.Item>
            </Space>
          </Form.Item>
          <Form.Item label='wrapperCol' required>
            <Space>
              <Form.Item label='span' name={['wrapperCol', 'span']} colon={false}>
                <InputNumber min={0} max={24} />
              </Form.Item>
              <Form.Item label='offset' name={['wrapperCol', 'offset']} colon={false}>
                <InputNumber min={0} max={24} />
              </Form.Item>
            </Space>
          </Form.Item>
          <Form.Item label="colon" name="colon" required valuePropName='checked'>
            <Switch />
          </Form.Item>
          <Form.Item label="labelAlign" name="labelAlign" required>
            <Radio.Group>
              <Radio value='left'>left</Radio>
              <Radio value='right'>right</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="layout" name="layout" required>
            <Radio.Group>
              <Radio value='horizontal'>horizontal</Radio>
              <Radio value='vertical'>vertical</Radio>
              <Radio value='inline'>inline</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="scrollToFirstError" name="scrollToFirstError" required valuePropName='checked'>
            <Switch />
          </Form.Item>
          <Form.Item label="size" name="size">
            <Select allowClear>
              <Select.Option value='small'>small</Select.Option>
              <Select.Option value='middle'>middle</Select.Option>
              <Select.Option value='large'>large</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="validateTrigger" name="validateTrigger" required>
            <Input prefix='"' suffix='"' />
          </Form.Item>
          <Form.Item label="preserve" name="preserve" required valuePropName='checked'>
            <Switch />
          </Form.Item>
          <Form.Item label="requiredMark" name="requiredMark" required valuePropName='checked'>
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}