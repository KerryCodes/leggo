import React, { useContext, useMemo, useRef } from 'react'
import { Button, Form, Input, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { ConfigsContext } from '../..'


export function ConfigStyle(){
  const { activeSchema, forceRender }= useContext(ConfigsContext)
  const { inputProps } = activeSchema.current.configs
  const timeId= useRef(null)
  
  const defaultStyle = useMemo(() => {
    const { style }= inputProps
    const styleList = []
    if (style) {
      for (const [CSSPropertyName, value] of Object.entries(style)) {
        styleList.push({CSSPropertyName, value})
      }
    }
    return { styleList }
  }, [])
  
  const onValuesChange = (_: any, allValues: any) => {
    timeId.current && clearTimeout(timeId.current)
    timeId.current = setTimeout(() => {
      const newStyle = allValues.styleList?.reduce((pre: any, cur: any) => {
        const { CSSPropertyName, value } = cur || {}
        if (CSSPropertyName && value) {
          pre[CSSPropertyName] = value
        }
        return pre
      }, {})
      inputProps.style = newStyle
      timeId.current = null
      forceRender()
    }, 500)
  }

  return (
    <div>
      <strong>style：</strong>
        <Form onValuesChange={onValuesChange} initialValues={defaultStyle}>
          <Form.List name="styleList" >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item {...restField} name={[name, 'CSSPropertyName']} fieldKey={[fieldKey, 'CSSPropertyName']} rules={[{ required: true, message: '请定义CSSPropertyName' }]}>
                      <Input prefix='"' suffix='"' placeholder="CSSPropertyName" />
                    </Form.Item>
                    <span>:</span>
                    <Form.Item {...restField} name={[name, 'value']} fieldKey={[fieldKey, 'value']} rules={[{ required: true, message: '请定义value' }]}>
                      <Input prefix='"' suffix='"' placeholder="value" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>新增style属性</Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
    </div>
  )
}