import React, { Fragment } from 'react'
import { Button, Form, Input, Select, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const layout= {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const options= [
  {label: 'GET', value: 'get'},
  {label: 'POST', value: 'post'},
  {label: 'PUT', value: 'put'},
  {label: 'DELETE', value: 'delete'},
]


export function SetPostman(props: React.PropsWithoutRef<{setLink: any}>){
  const { setLink }= props

  return (
    <div>
      <Form>
        <Form.Item label="method">
          <Select options={options} />
        </Form.Item>
        <Form.Item label="url">
          <Input />
        </Form.Item>
        <div>params：</div>
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
      </Form>
    </div>
  )
}