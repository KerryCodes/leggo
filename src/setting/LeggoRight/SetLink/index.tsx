import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Button, Form, Input, Popover, Select } from 'antd'
import { DisconnectOutlined } from '@ant-design/icons'
import { TOption, TSchema } from '../../../public/interface'


export function SetLink(props: React.PropsWithoutRef<{
  namepath: (string|number)[],
  activeSchema: React.MutableRefObject<TSchema>,
  schemaListOptions: TOption[],
  schemaList: TSchema[],
}>){
  const { namepath, activeSchema, schemaList, schemaListOptions }= props
  const [form]= Form.useForm()
  const [visible, setVisible]= useState(false)
  const linkedValue= useRef(null)
  const [isLinked, setIsLinked]= useState(linkedValue.current?.linkedName)
  
  const onFinish= () => {
    form.validateFields()
    .then(values => {
      setVisible(false)
      const { linkedName, rule, reference }= values
      const injectNewData= () => {
        linkedValue.current.namepath= namepath
        linkedValue.current.linkedName= linkedName
        linkedValue.current.rule= rule
        linkedValue.current.reference= reference
      }
      if(linkedValue.current.linkedName === linkedName){ 
        injectNewData()
        return 
      }
      if(linkedValue.current.linkedName && linkedValue.current.linkedName !== linkedName){
        const linkedSchemaOld= schemaList.find(schema => schema.setting.itemProps.name === linkedValue.current.linkedName)
        linkedSchemaOld.linkedValueList= linkedSchemaOld.linkedValueList.filter(item => item !== linkedValue.current)
      }
      const linkedSchemaNew= schemaList.find(schema => schema.setting.itemProps.name === linkedName)
      injectNewData()
      linkedSchemaNew.linkedValueList.push(linkedValue.current)
    })
  }
  
  useEffect(() => {
    let temp= activeSchema.current.linking
    if(temp){
      namepath.forEach(key => temp= temp[key])
      linkedValue.current= temp
      linkedValue.current.selfName= activeSchema.current.setting.itemProps.name
    }
  }, [])

  useEffect(() => {
    !visible && setIsLinked(linkedValue.current?.linkedName)
  }, [visible])

  return (
    <Fragment>
      <Popover placement="topLeft" trigger="click" title="设置关联值"
        visible={visible}
        onVisibleChange={setVisible}
        content={
          <div>
            <Form form={form}>
              <Form.Item label="关联对象" name="linkedName" rules={[{required: true, message: '必须选择关联对象！'}]}>
                <Select options={schemaListOptions} />
              </Form.Item>
              <Form.Item label="计算规则" name="rule">
                <Select>
                  <Select.Option value='<'>&lt; 参考值</Select.Option>
                  <Select.Option value='<='>&le; 参考值</Select.Option>
                  <Select.Option value='==='>=== 参考值</Select.Option>
                  <Select.Option value='>='>&ge; 参考值</Select.Option>
                  <Select.Option value='>'>&gt; 参考值</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="参考值" name="reference">
                <Input placeholder="参考值" />
              </Form.Item>
            </Form>
            <div>关联结果：</div>
            <div>
              <Button onClick={onFinish} type="primary">确定</Button>
            </div>
          </div>
        }>
        <Button type={isLinked ? "link" : "text"} icon={<DisconnectOutlined />}></Button>
      </Popover>
    </Fragment>
  )
}