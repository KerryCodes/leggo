import React, { Fragment, useMemo, useRef } from 'react'
import { Button, Form, Input, Space, message } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { TOption, TSchema } from '../../../interface'


export function OptionsSet(props: React.PropsWithChildren<{
  activeSchema: React.MutableRefObject<TSchema>,
  handleChange: (value: any) => void
}>){
  const { activeSchema, handleChange }= props
  const timeId= useRef(null)
  const optionsStringified= useMemo(() => {
    const options= activeSchema.current.configs.inputProps.options
    return options.map((item:any) => ({
      label: item.label,
      value: JSON.stringify(item.value),
    }))
  }, [])

  const onValuesChange= (_: any, allValues: any) => {
    timeId.current && clearTimeout(timeId.current)
    timeId.current= setTimeout(() => {
      const newOptions= allValues.options.filter((item: TOption) => item?.label !== undefined && item?.value !== undefined)
      try{
        const newOptionsParsed= newOptions.map((item:any) => ({
          label: item.label,
          value: JSON.parse(item.value),
        }))
        newOptionsParsed.length && handleChange(newOptionsParsed)
      }catch(e){
        message.error('value值请正确输入JSON格式！')
      }finally{
        timeId.current= null
      }
    }, 1000)
  }

  return (
    <Fragment>
      <div>
        <strong>*注意value值需要输入JSON格式！</strong>
      </div>
      <Form onValuesChange={onValuesChange}>
        <Form.List name="options" initialValue={optionsStringified}>
          {(fields, { add, remove }) => (
            <Fragment>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <Space key={key+index} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item {...restField} name={[name, 'label']} fieldKey={[fieldKey, index, 'label']}
                    rules={[{ required: true, message: '请定义label' }]}
                    >
                    <Input placeholder="label" prefix='"' suffix='"' />
                  </Form.Item>
                  <span>:</span>
                  <Form.Item {...restField} name={[name, 'value']} fieldKey={[fieldKey, index, 'value']}
                    rules={[{ required: true, message: '请定义value' }]}
                    >
                    <Input placeholder="value" />
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