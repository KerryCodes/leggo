import React, { useMemo, useRef, useState } from 'react';
import './App.less';
import './multiCover.less';
import 'antd/dist/antd.css';
import { Form, Menu, Radio, RadioChangeEvent } from 'antd';
import { PlusOutlined, SettingOutlined, ProfileOutlined } from '@ant-design/icons';
import { LeggoConfigs } from '../src';
import { TConfigs, TSchemaModel } from '../src/interface';
import '../src/styles/configs.less'
import { RenderForm } from './components/RenderForm';


export default function App() {
  const modelList= useRef<{[key:string]: TSchemaModel}>({})
  const [ menuKey, setMenuKey]= useState(['configs'])
  const [selectedModel, setSelectedModel]= useState(null)
  const [count, setForceRender]= useState(0)
  const modelListEntries= useMemo(() => Object.entries(modelList.current), [count])

  const postSchemaModelData= (schemaModel: TSchemaModel) => {
    const modelName= schemaModel.name
    modelList.current[modelName]= JSON.parse(JSON.stringify(schemaModel)) //模拟网络转发过程
    setForceRender(pre => pre + 1)
    console.log('发送schema～～～～～～', schemaModel)
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
          <Menu.SubMenu key="list" title="模板列表" disabled={!modelListEntries.length} icon={<ProfileOutlined />}>
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
            <RenderForm schemaModel={selectedModel} />
        }
      </div>
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
      StandardInput: ({ itemProps, inputProps }: React.PropsWithoutRef<TConfigs>) => 
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
      StandardInput: ({ itemProps }: React.PropsWithoutRef<TConfigs>) => 
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