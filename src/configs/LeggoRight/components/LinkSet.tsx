import React, { Fragment, useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Popover, Radio, RadioChangeEvent, Select, Space } from 'antd'
import { DisconnectOutlined } from '@ant-design/icons'
import { TOption, TSchema } from '../../../interface'


export function LinkSet(props: React.PropsWithoutRef<{
  namepath: (string|number)[],
  activeSchema: React.MutableRefObject<TSchema>,
  schemaListOptions: TOption[],
}>){
  const { namepath, activeSchema, schemaListOptions }= props
  const [form]= Form.useForm()
  const [visible, setVisible]= useState(false)
  const [isLinked, setIsLinked]= useState(false)
  const [referenceType, setReferenceType]= useState('string')
  const [resultText, setResultText]= useState('value = ')
  const [disabled, setDisabled]= useState(true)

  const onValuesChange= (_: any, allValues: any) => {
    const { observedName, rule, reference }= allValues
    let newText= 'value = '
    if(observedName){
      setDisabled(false)
      newText += `${observedName}.value`
      if(rule && reference){
        newText += ` ${rule} `
        newText += referenceType === 'string' ? `"${reference}"` : reference
      }
    }else{
      setDisabled(true)
    }
    setResultText(newText)
  }
  
  const onFinish= () => {
    form.validateFields()
    .then(values => {
      const { observedName, rule, reference }= values
      const key= namepath.join()
      const getterInfo= { observedName, namepath, reference, rule }
      activeSchema.current.needDefineGetterProps[key]= getterInfo
      setVisible(false)
    })
  }

  const onCancel= () => {
    const key= namepath.join()
    delete activeSchema.current.needDefineGetterProps[key]
    setVisible(false)
  }

  const onChangeType= (e: RadioChangeEvent) => {
    const type= e.target.value
    form.setFields([{ name: 'reference', value: undefined }])
    const allValues= form.getFieldsValue(true)
    onValuesChange(null, allValues)
    setReferenceType(type)
  }

  useEffect(() => {
    const key= namepath.join()
    let needDefineGetterProps= activeSchema.current.needDefineGetterProps
    if(!needDefineGetterProps){
      needDefineGetterProps= {}
      activeSchema.current.needDefineGetterProps= needDefineGetterProps
    }
    const getterInfo= needDefineGetterProps[key]
    if(!visible){
      setIsLinked(!!getterInfo)
    }else{
      getterInfo ? form.setFieldsValue(getterInfo) : form.resetFields()
    }
  }, [visible])

  return (
    <Fragment>
      <Popover placement="topLeft" trigger="click" title="设置关联值"
        visible={visible}
        onVisibleChange={setVisible}
        content={
          <div>
            <Form form={form} onValuesChange={onValuesChange}>
              <Form.Item label="关联对象" name="observedName" required>
                <Select options={schemaListOptions} />
              </Form.Item>
              <Form.Item label="计算规则" name="rule">
                <Select>
                  <Select.Option value='<'>关联值 &lt; 参考值</Select.Option>
                  <Select.Option value='<='>关联值 &le; 参考值</Select.Option>
                  <Select.Option value='==='>关联值 === 参考值</Select.Option>
                  <Select.Option value='>='>关联值 &ge; 参考值</Select.Option>
                  <Select.Option value='>'>关联值 &gt; 参考值</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="参考值类型：">
                <Radio.Group size="small" defaultValue="string" buttonStyle="solid" onChange={onChangeType}>
                  <Radio.Button value="string">string类型</Radio.Button>
                  <Radio.Button value="number">number类型</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="参考值" name="reference">
                {
                  referenceType === 'string' ? <Input placeholder="参考值" /> : <InputNumber placeholder="参考值" bordered={false} />
                }
              </Form.Item>
              <Form.Item label="关联结果：">
               <div>{resultText}</div>
              </Form.Item>
            </Form>
            <Space>
              <Button disabled={disabled} onClick={onFinish} type="primary">确定</Button>
              <Button disabled={disabled} onClick={onCancel} danger>删除关联</Button>
            </Space>
          </div>
        }>
        <Button type={isLinked ? "link" : "text"} icon={<DisconnectOutlined />}></Button>
      </Popover>
    </Fragment>
  )
}