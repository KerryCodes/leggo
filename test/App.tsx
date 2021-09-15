import React, { useEffect, useRef, useState } from 'react';
import './App.less';
import './multiCover.less';
import 'antd/dist/antd.css';
import { Button, Divider, Drawer, Form, Radio, RadioChangeEvent } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { LeggoConfigs, LeggoForm } from '../src';
import { cloneDeep } from 'lodash';
import { TConfigs, TSchemasModel } from '../src/interface';


export default function App() {
  const modelList= useRef<{[key:string]: TSchemasModel}>({})
  const [visible, setVisible]= useState(false)

  const postSchemaModelData= (schemaModel: TSchemasModel) => {
    const modelName= schemaModel.name
    modelList.current[modelName]= cloneDeep(schemaModel)
    console.log('发送schema～～～～～～', schemaModel);
  }

  useEffect(() => {
    LeggoConfigs.registerItemStore(testStore)
  }, [])

  return (
    <div className="App">
      <Button type="primary" onClick={() => setVisible(true)}>创建表单模板</Button>
      <Drawer title="拖拽生成表单" placement="top" height='100%' visible={visible} onClose={() => setVisible(false)}>
        <LeggoConfigs onPostSchemaModel={postSchemaModelData} />
      </Drawer>
      <div className="show-area">
        {
          Object.entries(modelList.current).map(([modelName, schemaModel]) => 
            <ShowForm key={modelName} schemaModel={schemaModel} />
          )
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

  useEffect(() => {
    leggo.resetSchemaModel(schemaModel)
  }, [schemaModel])

  return (
    <div className="show-form">
      <div className="header">
        <div>模板名：{name}</div>
        <div>描述：{description}</div>
        <div>
          操作：
          <Button onClick={changeOptions}>填充选项</Button>
        </div>
      </div>
      <Divider></Divider>
      <LeggoForm leggo={leggo} form={form} onValuesChange={console.log} onFinish={console.log} />
    </div>
  )
}



const testStore= {
  storeName: 'test',
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