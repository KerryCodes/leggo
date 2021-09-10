import React, { Fragment, useState } from 'react'
import { Button, Form, Input, Radio, Space, InputNumber, RadioChangeEvent } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { TOption, TSchema } from '../../../interface'


export function OptionsSet(props: React.PropsWithChildren<{
  activeSchema: React.MutableRefObject<TSchema>,
  handleChange: (value: any) => void
}>){
  const { activeSchema, handleChange }= props
  const options= activeSchema.current.configs.inputProps.options
  const [valueType, setValueType]= useState('number')

  const onValuesChange= (_: any, allValues: any) => {
    const newOptions= allValues.options.filter((item: TOption) => item?.label !== undefined && item?.value !== undefined)
    newOptions.length && handleChange(newOptions)
  }

  const onChangeType= (e: RadioChangeEvent) => {
    const type= e.target.value
    options.forEach(option => {
      const optionValue= option.value
      // @ts-ignore
      option.value= type === 'string' ? String(optionValue) : (Number(optionValue) || optionValue.charCodeAt())
    })
    handleChange(options)
    setValueType(type)
  }

  return (
    <Fragment>
      <div>
        <span>value类型：</span>
        <Radio.Group size="small" defaultValue="number" buttonStyle="solid" onChange={onChangeType}>
          <Radio value="string">string</Radio>
          <Radio value="number">number</Radio>
        </Radio.Group>
      </div>
      <Form onValuesChange={onValuesChange}>
        <Form.List name="options" initialValue={options}>
          {(fields, { add, remove }) => (
            <Fragment>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item {...restField} name={[name, 'label']} fieldKey={[fieldKey, 'label']}
                    rules={[{ required: true, message: '请定义label' }]}
                    >
                    <Input placeholder="label" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, 'value']} fieldKey={[fieldKey, 'value']}
                    rules={[{ required: true, message: '请定义value' }]}
                    >
                    {
                      valueType === 'string' ? <Input placeholder="value" /> : <InputNumber placeholder="value" bordered={false} />
                    }
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>新增选项</Button>
              </Form.Item>
            </Fragment>
          )}
        </Form.List>
      </Form>
    </Fragment>
  )
}