import React, { Fragment, useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Popover, Radio, RadioChangeEvent, Select } from 'antd'
import { DisconnectOutlined } from '@ant-design/icons'
import { TOption, TSchema } from '../../../public/interface'


export function SetLink(props: React.PropsWithoutRef<{
  namepath: (string|number)[],
  activeSchema: React.MutableRefObject<TSchema>,
  schemaListOptions: TOption[],
}>){
  const { namepath, activeSchema, schemaListOptions }= props
  const propName= namepath.slice(-1)[0]
  const [form]= Form.useForm()
  const [visible, setVisible]= useState(false)
  const [isLinked, setIsLinked]= useState(false)
  const [referenceType, setReferenceType]= useState('string')
  const [resultText, setResultText]= useState(`${propName}.value =`)
  const [disabled, setDisabled]= useState(true)

  const onValuesChange= (_, allValues) => {
    const { observedName, rule, reference }= allValues
    let newText= `${propName}.value = `
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
      setVisible(false)
      const { observedName, rule, reference }= values
      const key= namepath.join()
      const getterInfo= { observedName, namepath, reference, rule }
      activeSchema.current.needDefineGetterMap.set(key, getterInfo)
    })
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
    const getterInfo= activeSchema.current.needDefineGetterMap.get(key)
    if(!visible){
      setIsLinked(!!getterInfo)
    }else{
      form.setFieldsValue(getterInfo)
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
            <div>
              <Button disabled={disabled} onClick={onFinish} type="primary">确定</Button>
            </div>
          </div>
        }>
        <Button type={isLinked ? "link" : "text"} icon={<DisconnectOutlined />}></Button>
      </Popover>
    </Fragment>
  )
}