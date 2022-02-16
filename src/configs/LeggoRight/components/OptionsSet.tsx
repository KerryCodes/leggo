import React, { useContext, useMemo } from 'react'
import { Button, Form, Input, Space, message } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { TOption } from '../../../interface'
import { ConfigsContext } from '../..'


export function OptionsSet(props: React.PropsWithChildren<{
  handleChange: (value: any) => void
}>){
  const { handleChange }= props
  const { activeSchema }= useContext(ConfigsContext)
  const [form]= Form.useForm()
  const optionsStringified= useMemo(() => {
    const options= activeSchema.current.configs.inputProps.options
    return options.map((item:any) => ({
      label: item.label,
      value: JSON.stringify(item.value),
    }))
  }, [])

  const handleBlur= () => {
    const allValues= form.getFieldsValue(true)
    const newOptions= allValues.options.filter((item: TOption) => item?.label !== undefined && item?.value !== undefined)
    try{
      const newOptionsParsed= newOptions.map((item:any) => ({
        label: item.label,
        value: JSON.parse(item.value),
      }))
      newOptionsParsed.length && handleChange(newOptionsParsed)
    }catch(e){
      message.error('value值请正确输入JSON格式！')
    }
  }

  return (
    <>
      <div>
        <strong>*注意value值需要输入JSON格式！</strong>
      </div>
      <Form form={form}>
        <Form.List name="options" initialValue={optionsStringified}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space key={key} style={{ display: 'flex' }} align="start">
                  <Form.Item {...restField} name={[name, 'label']} fieldKey={[fieldKey, 'label']} rules={[{ required: true, message: '请定义label' }]}>
                    <Input placeholder="label" prefix='"' suffix='"' />
                  </Form.Item>
                  <span>:</span>
                  <Form.Item {...restField} name={[name, 'value']} fieldKey={[fieldKey, 'value']} rules={[{ required: true, message: '请定义value' }]}>
                    <Input onBlur={handleBlur} placeholder="value" addonAfter="JSON" />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => {
                      remove(name)
                      handleBlur()
                    }} 
                  />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>新增选项</Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </>
  )
}