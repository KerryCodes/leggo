import React, { useMemo, useRef, useState } from 'react';
import '../src/styles/configs.less'
import './App.less';
import './multiCover.less';
import 'antd/dist/antd.css';
import { Menu, Radio, RadioChangeEvent } from 'antd';
import { PlusOutlined, SettingOutlined, ProfileOutlined, SolutionOutlined } from '@ant-design/icons';
import { LeggoConfigs } from '../src';
import { TSchemaModel } from '../src/interface';
import { RenderForm } from './components/RenderForm';


export default function App() {
  const modelList= useRef<{[key:string]: TSchemaModel}>({})
  const [menuKey, setMenuKey]= useState(['configs'])
  const [selectedModel, setSelectedModel]= useState(null)
  const [count, setForceRender]= useState(0)
  const modelListEntries= useMemo(() => Object.entries(modelList.current), [count])

  const postSchemaModelData= (schemaModel: TSchemaModel) => {
    const modelName= schemaModel.name
    modelList.current[modelName]= JSON.parse(JSON.stringify(schemaModel)) //模拟网络转发过程
    setForceRender(pre => pre + 1)
    console.log('发送schema～～～～～～', schemaModel)
  }
  
  const content= useMemo(() => {
    switch(menuKey[0]){
      case 'configs':
        return <LeggoConfigs onGetSchemaModel={postSchemaModelData} />
      case 'readme':
        return <iframe style={{border: 'none'}} width="100%" height="100%" src="../README.html" />
      default:
        return <RenderForm schemaModel={selectedModel} />
      }
  }, [menuKey])
  
  useMemo(() => {
    LeggoConfigs.registerItemStore(testStore)
  }, [])

  return (
    <div className="App">
      <div className="header">
        <div className="slogan">leggo，拖拽式表单生成低代码工具！</div>
        <Menu onSelect={({key}) => setMenuKey([key])} defaultSelectedKeys={['configs']} mode="horizontal">
          <Menu.Item key="configs" icon={<SettingOutlined />}>配置模板</Menu.Item>
          <Menu.SubMenu key="list" title="模板列表" disabled={!modelListEntries.length} icon={<ProfileOutlined />}>
            {
              modelListEntries.map(([modelName, schemaModel]) => 
                <Menu.Item key={modelName} onClick={() => setSelectedModel(schemaModel)}>{modelName}</Menu.Item>
              )
            }
          </Menu.SubMenu>
          <Menu.Item key="readme" icon={<SolutionOutlined />}>项目介绍</Menu.Item>
        </Menu>
      </div>
      <div className="content-area">{content}</div>
    </div>
  )
}



const testStore= {
  storeName: 'other1',
  store: {
    multiCover: {
      type: 'multiCover',
      StandardInput: MultiCover,
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
    },
    carInfos: {
      type: 'carInfos',
      StandardInput: () => <div>定制化组件</div>,
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
    },
  }
}


function MultiCover(props: React.PropsWithoutRef<{disabled: boolean} & { 
  value?: any, 
  onChange?: (value: any) => void 
}>){
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



