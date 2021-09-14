import React, { Fragment } from 'react'
import { Button, Form, Input, Select, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { TOption, TParam, TSchema } from '../../../interface'
import { LinkSet } from './LinkSet'

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

const selectBeforeOptions= [
  {label: 'http://', value: 'http://'},
  {label: 'https://', value: 'https://'},
]


export function ConfigPostman(props: React.PropsWithoutRef<{
  activeSchema: React.MutableRefObject<TSchema>,
  schemaListOptions: TOption[]
}>){
  const { activeSchema, schemaListOptions } = props

  const onValuesChange= (_: any, allValues: any) => {
    const { method, url, params, data }= allValues
    activeSchema.current.configs.postman= { 
      propName: 'options',
      method, 
      url, 
      params: params?.filter((item: TParam) => item),
      data: data?.filter((item: TParam) => item),
    }
  }

  return (
    <Form {...layout} onValuesChange={onValuesChange} initialValues={activeSchema.current.configs.postman}>
      <Form.Item label="method" name="method" required>
        <Select options={options} allowClear />
      </Form.Item>
      <Form.Item label="url" name="url" required initialValue='www.'>
        <Input addonBefore={<Select options={selectBeforeOptions} defaultValue="http://" />} />
      </Form.Item>
      <Form.Item label='params'>
        <Form.List name="params">
          {(fields, { add, remove }) => (
            <Fragment>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <Space key={key} align="baseline">
                  <Form.Item {...restField} name={[name, 'key']} fieldKey={[fieldKey, 'key']}
                    rules={[{ required: true, message: '请定义key' }]}
                    >
                    <Input placeholder="key" />
                  </Form.Item>
                  <LinkSet activeSchema={activeSchema} namepath={['postman', 'params', index, 'value']} schemaListOptions={schemaListOptions} />
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
      <Form.Item label='data'>
        <Form.List name="data">
          {(fields, { add, remove }) => (
            <Fragment>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <Space key={key} align="baseline">
                  <Form.Item {...restField} name={[name, 'key']} fieldKey={[fieldKey, 'key']}
                    rules={[{ required: true, message: '请定义key' }]}
                    >
                    <Input placeholder="key" />
                  </Form.Item>
                  <LinkSet activeSchema={activeSchema} namepath={['postman', 'data', index, 'value']} schemaListOptions={schemaListOptions} />
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