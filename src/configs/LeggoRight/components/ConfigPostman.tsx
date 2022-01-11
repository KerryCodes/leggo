import React, { Fragment, useContext } from 'react'
import { Button, Form, Input, Select, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { TParam } from '../../../interface'
import { LinkSet } from './LinkSet'
import { ConfigsContext } from '../..'

const layout= {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const options= [
  {label: 'GET', value: 'get'},
  {label: 'POST', value: 'post'},
  {label: 'PUT', value: 'put'},
  {label: 'DELETE', value: 'delete'},
]


export function ConfigPostman(){
  const { activeSchema }= useContext(ConfigsContext)

  const onValuesChange= (_: any, allValues: any) => {
    const { method, url, params, data, responseNamepath }= allValues
    activeSchema.current.configs.postman= { 
      propName: 'options',
      method, 
      url, 
      responseNamepath,
      params: params?.filter((item: TParam) => item) || [],
      data: data?.filter((item: TParam) => item) || [],
    }
  }

  return (
    <Form {...layout} onValuesChange={onValuesChange} initialValues={activeSchema.current.configs.postman}>
      <Form.Item label="method" name="method" required>
        <Select options={options} />
      </Form.Item>
      <Form.Item label="url" required>
        <div style={{ display: 'flex'}}>
          <Form.Item name="url" noStyle>
            <Input prefix='"' suffix='"' />
          </Form.Item>
          <LinkSet targetType='string' namepath={['postman', 'url']} />
        </div>
      </Form.Item>
      <Form.Item label="目标值路径" name="responseNamepath" required>
        <Input prefix='"' suffix='"' />
      </Form.Item>
      <Form.Item label='params'>
        <Form.List name="params">
          {(fields, { add, remove }) => (
            <Fragment>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <Space key={key} align="baseline">
                  <Form.Item {...restField} name={[name, 'key']} fieldKey={[fieldKey, 'key']} rules={[{ required: true, message: '请定义key' }]}>
                    <Input prefix='"' suffix='"' placeholder="key" />
                  </Form.Item>
                  <span>:</span>
                  <LinkSet targetType='string' namepath={['postman', 'params', index, 'value']} />
                  <Form.Item {...restField} name={[name, 'value']} fieldKey={[fieldKey, 'value']} rules={[{ required: true, message: '请定义value' }]}>
                    <Input prefix='"' suffix='"' placeholder="value" /> 
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
      <Form.Item label='data'>
        <Form.List name="data">
          {(fields, { add, remove }) => (
            <Fragment>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <Space key={key} align="baseline">
                  <Form.Item {...restField} name={[name, 'key']} fieldKey={[fieldKey, 'key']} rules={[{ required: true, message: '请定义key' }]}>
                    <Input prefix='"' suffix='"' placeholder="key" />
                  </Form.Item>
                  <span>:</span>
                  <LinkSet targetType='string' namepath={['postman', 'data', index, 'value']} />
                  <Form.Item {...restField} name={[name, 'value']} fieldKey={[fieldKey, 'value']} rules={[{ required: true, message: '请定义value' }]}>
                    <Input prefix='"' suffix='"' placeholder="value" /> 
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