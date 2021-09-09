import React, { useState } from 'react'
import { Input, InputNumber, Space, Switch } from 'antd'
import { Options } from './Options'
import { TSchema } from '../../../public/interface'
import { SetLink } from './SetLink'


export function Config(props: React.PropsWithoutRef<{
  namepath: (string|number)[],
  propName: string,
  activeSchemaProp: any,
  defaultValue: any,
  forceRender: () => void,
  schemaList: TSchema[],
  activeSchema: React.MutableRefObject<TSchema>,
}>){
  const { namepath, propName, activeSchemaProp, defaultValue, forceRender, schemaList, activeSchema }= props
  const [value, setValue]= useState(defaultValue)
  const schemaListOptions= schemaList.map(schema => ({
    label: `${schema.setting.itemProps.label} - ${schema.setting.itemProps.name}`,
    value: schema.setting.itemProps.name as string,
  }))

  const handleChange= (value: any) => {
    activeSchemaProp[propName]= value
    setValue(value)
    forceRender()
  }

  if(propName === 'rules'){
    const configs= Object.keys(defaultValue[0])
    return (
      <div>
        <strong>rules：</strong>
        <div className="configs-setting-area">
          {
            configs.map(pName => 
              <Config key={pName}
                namepath= {[...namepath, 0, pName]}
                propName={pName}
                activeSchemaProp={defaultValue[0]} 
                defaultValue={defaultValue[0][pName]}
                forceRender={forceRender}
                schemaList={schemaList}
                activeSchema={activeSchema}
              />
            )
          }
        </div>
      </div>
    )
  }

  if(propName === 'options'){
    return (
      <Options options={defaultValue} activeSchema={activeSchema} handleChange={handleChange}>
        <SetLink activeSchema={activeSchema} namepath={namepath} schemaList={schemaList} schemaListOptions={schemaListOptions} />
      </Options>
    )
  }

  switch(typeof defaultValue){
    case 'boolean':
      return (
        <Space>
          <strong>{propName}：</strong>
          <Switch checked={value} onChange={handleChange} />
          <SetLink activeSchema={activeSchema} namepath={namepath} schemaList={schemaList} schemaListOptions={schemaListOptions} />
        </Space>
      )
    case 'string':
      return (
        <Space>
          <strong>{propName}：</strong>
          <Input value={value} onChange={e => handleChange(e.target.value)} />
          {
            propName !== 'name' && <SetLink activeSchema={activeSchema} namepath={namepath} schemaList={schemaList} schemaListOptions={schemaListOptions} />
          }
        </Space>
      )
    case 'number':
      return (
        <Space>
          <strong>{propName}：</strong>
          <InputNumber value={value} onChange={handleChange} bordered={false} />
          <SetLink activeSchema={activeSchema} namepath={namepath} schemaList={schemaList} schemaListOptions={schemaListOptions} />
        </Space>
      )
    default:
      return null
  }
}

