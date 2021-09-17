import React, { Fragment, useEffect, useState } from 'react'
import { Button, Form, Input, Popover, Select, Space } from 'antd'
import { DisconnectOutlined } from '@ant-design/icons'
import { TOption, TSchema } from '../../../interface'


export function LinkSet(props: React.PropsWithoutRef<{
  namepath: (string|number)[],
  targetType: string,
  activeSchema: React.MutableRefObject<TSchema>,
  schemaListOptions: TOption[],
}>){
  const { namepath, targetType, activeSchema, schemaListOptions }= props
  const needDefineGetterProps= activeSchema.current.needDefineGetterProps
  const key= namepath.join()
  const getterInfo= needDefineGetterProps[key]
  const [form]= Form.useForm()
  const [visible, setVisible]= useState(false)
  const [isLinked, setIsLinked]= useState(false)
  const [resultText, setResultText]= useState('value = ')
  const [disabled, setDisabled]= useState(true)
  const [isFromPublicStates, setIsFromPublicStates]= useState(getterInfo?.observedName === 'publicStates')

  const setText= (getterInfo: any) => {
    const { observedName, publicStateKey, rule, reference }= getterInfo || {}
    let newText= 'value = '
    if(observedName){
      setDisabled(false)
      if(observedName === 'publicStates'){
        newText += `publicStates[${publicStateKey}]`
        setIsFromPublicStates(true)
      }else{
        switch(targetType){
          case 'boolean':
            newText += `Boolean(${observedName}.value)`
            break;
          case 'number':
            newText += `Number(${observedName}.value)`
            break;
          default:
            newText += `${observedName}.value?.toString()`
        }
        setIsFromPublicStates(false)
      }
      if(rule && reference){
        newText= `value = ${observedName}.value?.toString() ${rule} "${reference}"`
      }
    }else{
      setDisabled(true)
    }
    setResultText(newText)
  }

  const onFinish= () => {
    form.validateFields()
    .then(values => {
      const { observedName, publicStateKey, rule, reference }= values
      const getterInfo= { observedName, publicStateKey, namepath, reference, rule }
      needDefineGetterProps[key]= getterInfo
      setVisible(false)
    })
  }

  const onCancel= () => {
    delete needDefineGetterProps[key]
    setVisible(false)
  }

  useEffect(() => {
    if(!visible){
      setIsLinked(!!getterInfo)
    }else{
      getterInfo ? form.setFieldsValue(getterInfo) : form.resetFields()
      setText(getterInfo)
    }
  }, [visible])

  return (
    <Fragment>
      <Popover placement="topLeft" trigger="click" title="设置关联值"
        visible={visible}
        onVisibleChange={setVisible}
        content={
          <div>
            <Form form={form} onValuesChange={(_, allValues) => setText(allValues)}>
              <Form.Item label="关联对象" name="observedName" required>
                <Select options={schemaListOptions} />
              </Form.Item>
              { 
                isFromPublicStates && <Form.Item label="公共值key名" name="publicStateKey" required><Input /></Form.Item> 
              }
              <Form.Item label="计算规则" name="rule">
                <Select>
                  <Select.Option value='<'>关联值 &lt; 参考值</Select.Option>
                  <Select.Option value='<='>关联值 &le; 参考值</Select.Option>
                  <Select.Option value='==='>关联值 === 参考值</Select.Option>
                  <Select.Option value='>='>关联值 &ge; 参考值</Select.Option>
                  <Select.Option value='>'>关联值 &gt; 参考值</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="参考值" name="reference">
                <Input placeholder="参考值" />
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