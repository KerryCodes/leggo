import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Modal, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { LeggoForm } from '../../src';
import { TConfigs, TSchemaModel } from '../../src/interface';


function middleware(configs: TConfigs) {
  const { itemProps }= configs
  
  switch(itemProps.label){
    case '标题':
      configs.itemProps.label= '标题增加右侧同步按钮'
      configs.Successor= (props: React.PropsWithChildren<any>) => (
        <div style={{display: 'flex'}}>
          {props.children}
          <Button>同步</Button>
        </div>
      )
      break;
    case '占位表单':
      configs.SuperSuccessor= () => (
        <Form.Item label="封面图" name="covers">
          <Button icon={<PlusOutlined />} />
        </Form.Item>
      )
      break;
    case '选项': 
    case '多选':
      configs.itemProps.label= '选项已增加'
      configs.inputProps.options= [
        {label: 'A', value: 1}, 
        {label: 'B', value: 2},
        {label: 'C', value: 3},
        {label: 'D', value: 4},
        {label: 'E', value: 5},
      ]
  }
}

export function RenderForm(props: React.PropsWithoutRef<{schemaModel: TSchemaModel}>){
  const { schemaModel }= props
  const { name, description }= schemaModel
  const [form]= Form.useForm()
  const leggo= LeggoForm.useLeggo(schemaModel, null, {
    test: true,
    func: () => false,
  })
  const [visibleJSON, setVisibleJSON]= useState(false)

  const handleCopy= () => {
    const contentJSON= JSON.stringify(schemaModel, null, 4)
    navigator.clipboard.writeText(contentJSON)
    setVisibleJSON(false)
  }

  const changeForm= () => {
    leggo.resetSchemaModel(schemaModel, middleware)
  }

  useEffect(() => {
    // leggo.resetSchemaModel(schemaModel, middleware)
  }, [schemaModel])

  return (
    <div className="show-form">
      <div className="header">
        <div>模板名：{name}</div>
        <div>描述：{description}</div>
        <div>
          <span>操作：</span>
          <Space>
            <Button onClick={() => setVisibleJSON(true)}>查看schemaModel</Button>
            <Button onClick={changeForm}>改造表单</Button>
          </Space>
        </div>
      </div>
      <Divider></Divider>
      <LeggoForm leggo={leggo} form={form} onValuesChange={console.log} onFinish={console.log} />
      <Modal title="schemaModel" width='50vw'
        bodyStyle={{height: '70vh', overflow: 'auto'}} 
        visible={visibleJSON} 
        onOk={handleCopy} 
        okText="复制"
        onCancel={() => setVisibleJSON(false)}
        >
        <pre>{JSON.stringify(schemaModel, null, 4)}</pre>
      </Modal>
    </div>
  )
}