import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Input, Popover, Select, Space } from 'antd'
import { DisconnectOutlined } from '@ant-design/icons'
import { ConfigsContext } from '../..'


export function LinkSet(props: React.PropsWithoutRef<{
  namepath: (string | number)[],
  targetType: string,
}>){
  const { namepath, targetType }= props
  const { activeSchema, schemaListOptions }= useContext(ConfigsContext)
  const needDefineGetterProps= activeSchema.current.needDefineGetterProps
  const key= namepath.join()
  const getterInfo= needDefineGetterProps[key]
  const [form]= Form.useForm()
  const [visible, setVisible]= useState(false)
  const [isLinked, setIsLinked]= useState(false)
  const [resultText, setResultText]= useState('')
  const [disabled, setDisabled]= useState(true)
  const [isFromPublicStates, setIsFromPublicStates]= useState(getterInfo?.observedStringedName === 'publicStates')

  const setText= (getterInfo: any) => {
    const { observedStringedName, publicStateKey, rule, reference }= getterInfo || {}
    if(!observedStringedName){
      setResultText('')
      setDisabled(true)
      return;
    }
    let newText= ''
    if(observedStringedName === 'publicStates'){
      newText= `publicStates[${publicStateKey}] 或 publicStates[${publicStateKey}]()`
    }else{
      switch(targetType){
        case 'boolean':
          newText= `Boolean(${observedStringedName}.value)`
          break;
        case 'number':
          newText= `Number(${observedStringedName}.value)`
          break;
        default:
          newText= `${observedStringedName}.value?.toString()`
      }
    }
    if(rule && reference){ newText= `${observedStringedName}.value?.toString() ${rule} "${reference}"` }
    if(rule === '!'){ newText= `!(${newText})` }
    setIsFromPublicStates(observedStringedName === 'publicStates')
    setResultText(newText)
    setDisabled(false)
  }

  const onFinish= () => {
    form.validateFields()
    .then(values => {
      const { observedStringedName, publicStateKey, rule, reference }= values
      const getterInfo= { observedStringedName, publicStateKey, namepath, reference, rule }
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
    <Popover placement="topLeft" trigger="click" title="设置关联值"
      visible={visible}
      onVisibleChange={setVisible}
      content={
        <div>
          <Form form={form} onValuesChange={(_, allValues) => setText(allValues)}>
            <Form.Item label="关联对象" name="observedStringedName" required>
              <Select options={schemaListOptions} />
            </Form.Item>
            { 
              isFromPublicStates && <Form.Item label="公共状态key名" name="publicStateKey" required><Input /></Form.Item> 
            }
            <Form.Item label="计算规则" name="rule">
              <Select>
                <Select.Option value='!'>!关联值取反</Select.Option>
                <Select.Option value='<'>关联值 &lt; 参考值</Select.Option>
                <Select.Option value='<='>关联值 &le; 参考值</Select.Option>
                <Select.Option value='==='>关联值 === 参考值</Select.Option>
                <Select.Option value='!=='>关联值 !== 参考值</Select.Option>
                <Select.Option value='>='>关联值 &ge; 参考值</Select.Option>
                <Select.Option value='>'>关联值 &gt; 参考值</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="参考值" name="reference">
              <Input prefix='"' suffix='"' placeholder="参考值" />
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
  )
}