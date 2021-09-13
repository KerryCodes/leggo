import React, { useState } from 'react'
import { Input, InputNumber, Select, Space, Switch } from 'antd'
import { ConfigOptions } from './ConfigOptions'
import { TSchema } from '../../../interface'
import { LinkSet } from './LinkSet'


export function ConfigProp(props: React.PropsWithoutRef<{
  propOwner: any,
  namepath: (string | number)[],
  propName: string,
  propDefaultValue: any,
  activeSchema: React.MutableRefObject<TSchema>,
  schemaList: TSchema[],
  forceRender: () => void,
}>){
  const { propOwner, namepath, propName, propDefaultValue, activeSchema, schemaList, forceRender }= props
  const [propCurrentValue, setPropCurrentValue]= useState(propDefaultValue)
  const schemaListOptions= schemaList.map(schema => {
    const { label, name }= schema.configs.itemProps
    return {
      label: `${label} - ${name}`,
      value: name,
    }
  })

  const handleChangePropValue= (newValue: any) => {
    propOwner[propName]= newValue
    setPropCurrentValue(newValue)
    forceRender()
  }

  if(propName === 'rules'){
    const rule0= propDefaultValue[0]
    const ruleEntries= Object.entries(rule0)
    return (
      <div>
        <strong>rules：</strong>
        <div className="configs-configs-area">
          {
            ruleEntries.map(([pName, value]) => 
              <ConfigProp key={pName}
                propOwner={rule0} 
                namepath= {[...namepath, 0, pName]}
                propName={pName}
                propDefaultValue={value}
                activeSchema={activeSchema}
                schemaList={schemaList}
                forceRender={forceRender}
              />
            )
          }
        </div>
      </div>
    )
  }

  if(propName === 'options'){
    return (
      <ConfigOptions activeSchema={activeSchema} schemaListOptions={schemaListOptions} handleChangePropValue={handleChangePropValue} />
    )
  }

  if(propName === 'picker'){
    const options= [
      {label: 'time', value: 'time'},
      {label: 'date', value: 'date'},
      {label: 'week', value: 'week'},
      {label: 'month', value: 'month'},
      {label: 'quarter', value: 'quarter'},
      {label: 'year', value: 'year'},
    ]
    return (
      <Space>
        <strong>{propName}：</strong>
        <Select options={options} defaultValue={propCurrentValue} onChange={handleChangePropValue} />
        <LinkSet activeSchema={activeSchema} namepath={namepath} schemaListOptions={schemaListOptions} />
      </Space>
    )
  }

  switch(typeof propDefaultValue){
    case 'boolean':
      return (
        <Space>
          <strong>{propName}：</strong>
          <Switch checked={propCurrentValue} onChange={handleChangePropValue} />
          <LinkSet activeSchema={activeSchema} namepath={namepath} schemaListOptions={schemaListOptions} />
        </Space>
      )
    case 'string':
      return (
        <Space>
          <strong>{propName}：</strong>
          <Input value={propCurrentValue} onChange={e => handleChangePropValue(e.target.value)} />
          {
            propName !== 'name' && <LinkSet activeSchema={activeSchema} namepath={namepath} schemaListOptions={schemaListOptions} />
          }
        </Space>
      )
    case 'number':
      return (
        <Space>
          <strong>{propName}：</strong>
          <InputNumber value={propCurrentValue} onChange={handleChangePropValue} bordered={false} />
          <LinkSet activeSchema={activeSchema} namepath={namepath} schemaListOptions={schemaListOptions} />
        </Space>
      )
    default:
      return null
  }
}

