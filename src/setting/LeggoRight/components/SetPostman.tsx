import React, { Fragment } from 'react'
import { Button, Form, Input, Select, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { TSchema } from '../../../public/interface'

const layout= {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
}

const options= [
  {label: 'GET', value: 'get'},
  {label: 'POST', value: 'post'},
  {label: 'PUT', value: 'put'},
  {label: 'DELETE', value: 'delete'},
]


export function SetPostman(props: React.PropsWithoutRef<{
  setLink: any,
  activeSchema: React.MutableRefObject<TSchema>,
}>){
  const { setLink, activeSchema }= props

  const onValuesChange= (_, allValues) => {
    const { method, url, params }= allValues
    activeSchema.current.postman= { 
      propName: 'options',
      method, 
      url, 
      params: params?.filter(item => item),
    }
  }

  return (
    <Form {...layout} onValuesChange={onValuesChange} initialValues={activeSchema.current.postman}>
      <Form.Item label="method" name="method" required>
        <Select options={options} />
      </Form.Item>
      <Form.Item label="url" name="url" required>
        <Input />
      </Form.Item>
      <Form.Item label='params'>
        <Form.List name="params">
          {(fields, { add, remove }) => (
            <Fragment>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space key={key} align="baseline">
                  <Form.Item {...restField} name={[name, 'key']} fieldKey={[fieldKey, 'key']}
                    rules={[{ required: true, message: '请定义key' }]}
                    >
                    <Input placeholder="key" />
                  </Form.Item>
                  { setLink }
                  <Form.Item {...restField} name={[name, 'value']} fieldKey={[fieldKey, 'value']}
                    rules={[{ required: true, message: '请定义value' }]}
                    >
                    <Input placeholder="value" /> 
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>新增key</Button>
              </Form.Item>
            </Fragment>
          )}
        </Form.List>
      </Form.Item>
    </Form>
  )
}