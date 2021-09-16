import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.less';
import './multiCover.less';
import 'antd/dist/antd.css';
import { Button, Divider, Form, Menu, Modal, Radio, RadioChangeEvent, Space } from 'antd';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { cloneDeep } from 'lodash';
import { LeggoConfigs, LeggoForm } from '../src';
import { TConfigs, TSchemasModel } from '../src/interface';
import '../src/styles/configs.less'


export default function App() {
  const modelList= useRef<{[key:string]: TSchemasModel}>({})
  const [ menuKey, setMenuKey]= useState(['configs'])
  const [selectedModel, setSelectedModel]= useState(null)
  const [count, setForceRender]= useState(0)
  const modelListEntries= useMemo(() => Object.entries(modelList.current), [count])

  const postSchemaModelData= (schemaModel: TSchemasModel) => {
    const modelName= schemaModel.name
    modelList.current[modelName]= cloneDeep(schemaModel)
    console.log('发送schema～～～～～～', schemaModel)
    setForceRender(pre => pre + 1)
  }
  
  useMemo(() => {
    LeggoConfigs.registerItemStore(testStore)
  }, [])

  return (
    <div className="App">
      <div className="header">
        <div className="slogan">Leggo，拖拽式表单生成低代码平台！</div>
        <Menu onSelect={({key}) => setMenuKey([key])} defaultSelectedKeys={['configs']} mode="horizontal">
          <Menu.Item key="configs" icon={<SettingOutlined />}>配置模板</Menu.Item>
          <Menu.SubMenu key="list" title="模板列表" disabled={!modelListEntries.length} icon={<SettingOutlined />}>
            {
              modelListEntries.map(([modelName, schemaModel]) => 
                <Menu.Item key={modelName} onClick={() => setSelectedModel(schemaModel)}>{modelName}</Menu.Item>
              )
            }
          </Menu.SubMenu>
        </Menu>
      </div>
      <div className="content-area">
        {
          menuKey[0] === 'configs' ? 
            <LeggoConfigs onPostSchemaModel={postSchemaModelData} />
            :
            <ShowForm schemaModel={selectedModel} />
        }
      </div>
    </div>
  )
}


function ShowForm(props: React.PropsWithoutRef<{schemaModel: TSchemasModel}>){
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



const testStore= {
  storeName: 'other1',
  store: {
    multiCover: {
      type: 'multiCover',
      configs: {
        itemProps: {
          name: 'cover_type',
          label: ' 封面图',
          colon: true,
          rules: [{ required: true, message: '请上传封面图！' }],
        },
        inputProps: {
          disabled: false,
        },
      },
      StandardItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<TConfigs>) => 
        <Form.Item {...itemProps}>
          <MultiCover {...inputProps} />
        </Form.Item>,
    },
    carInfos: {
      type: 'carInfos',
      configs: {
        itemProps: {
          name: 'carInfos',
          label: '车系-车型',
          colon: true,
          rules: [{ required: false }],
        },
        inputProps: {
          disabled: false,
        },
      },
      StandardItemFC: ({ itemProps }: React.PropsWithoutRef<TConfigs>) => 
        <Form.Item {...itemProps}>
          <div>定制化组件</div>
        </Form.Item>,
    },
  }
}


const MultiCover: React.FC<{disabled: boolean} & { 
  value?: any, 
  onChange?: (value: any) => void 
}>= props => {
  const { disabled, value, onChange }= props
  const [dataList, setDataList]= useState(value?.slice(0, 1) || [''])

  const changePicCount = (e: RadioChangeEvent) => {
    const count= e.target.value
    const newDataList = [...value?.slice(0, count) || [], '', '', '']
    newDataList.length= count
    onChange(newDataList)
    setDataList(newDataList)
  }

  const pickPic= (index: number) => {
    // onChangeCover(index);
    console.log(index);
  }

  return (
    <div className='multi-cover' >
      <Radio.Group defaultValue={1} onChange={changePicCount} disabled={disabled}>
        <Radio value={1}>单图</Radio>
        <Radio value={3}>三图</Radio>
      </Radio.Group>
      <div className='multi-cover-list'>
        {
          disabled && <div className='multi-cover-list-mask'></div>
        }
        {
          dataList.map((src: string, index: number) => 
            <div key={src + index} className='multi-cover-list-item' onClick={() => pickPic(index)}>
              {
                src && <div className='multi-cover-list-item-mask'><span>替换</span></div>
              }
              {
                src ? <img src={src} alt='封面图' width="100%" /> : <PlusOutlined />
              }
            </div>
          )
        }
      </div>
    </div>
  )
}