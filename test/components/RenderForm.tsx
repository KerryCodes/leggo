import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Modal, Space } from 'antd';
import { LeggoForm } from '../../src';
import { TSchemaModel } from '../../src/interface';


export function RenderForm(props: React.PropsWithoutRef<{schemaModel: TSchemaModel}>){
  const { schemaModel }= props
  const { name, description }= schemaModel
  const [form] =Form.useForm()
  const leggo= LeggoForm.useLeggo()
  const [visibleJSON, setVisibleJSON]= useState(false)

  const changeOptions= () => {
    leggo.updateSchema('select', configs => {
      configs.CustomizedItemFC= (props: React.PropsWithChildren<any>) => <div>已填充选项：{props.children}</div>
      configs.inputProps.options= [
        {label: 'A', value: 1}, 
        {label: 'B', value: 2},
        {label: 'C', value: 3},
        {label: 'D', value: 4},
        {label: 'E', value: 5},
      ]
    })
  }

  const handleCopy= () => {
    const contentJSON= JSON.stringify(schemaModel, null, 4)
    navigator.clipboard.writeText(contentJSON)
    setVisibleJSON(false)
  }

  useEffect(() => {
    leggo.resetSchemaModel(schemaModel)
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
            <Button onClick={changeOptions}>填充选项</Button>
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