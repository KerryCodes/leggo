import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, Modal, Space } from 'antd';
import { LeggoForm } from '../../src';
import { TConfigs, TSchemaModel } from '../../src/interface';


function middleware(configs: TConfigs) {
  const { itemProps }= configs
  // configs.Successor = (props: any) => <div>{props.children}<Button>同步</Button></div>
  // if(itemProps.label === '标题'){
  //   configs.SuperSuccessor = (props: React.PropsWithChildren<any>) => <Form.Item label="test" name="yy"><Input /></Form.Item>
  // }
}

export function RenderForm(props: React.PropsWithoutRef<{schemaModel: TSchemaModel}>){
  const { schemaModel }= props
  const { name, description }= schemaModel
  const [form]= Form.useForm()
  const leggo= LeggoForm.useLeggo(null, null, {
    test: true,
    func: () => false,
  })
  const [visibleJSON, setVisibleJSON]= useState(false)

  const changeOptions= () => {
    leggo.updateSchema('select', configs => {
      configs.Successor= (props: React.PropsWithChildren<any>) => <div>已填充选项：{props.children}</div>
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
    leggo.resetSchemaModel(schemaModel, middleware)
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