import React, { useRef, useState } from 'react'
import { Input, InputNumber, Select, Space, Switch } from 'antd'
import { ConfigOptions } from './ConfigOptions'
import { TSchema } from '../../../interface'
import { LinkSet } from './LinkSet'
import { ConfigWordsLimit } from './ConfigWordsLimit'


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
  const typeofPropDefaultValue= useRef(typeof propDefaultValue)
  const [propCurrentValue, setPropCurrentValue]= useState(propDefaultValue)
  const schemaListOptions= [{label: '公共值 - publicStates', value: 'publicStates'}].concat(schemaList.map(schema => {
    const { label, name }= schema.configs.itemProps
    return {
      label: `${label} - ${name}`,
      value: name as string,
    }
  }))

  const handleChangePropValue= (newValue: any) => {
    propOwner[propName]= newValue
    setPropCurrentValue(newValue)
    forceRender()
  }

  switch(propName){
    case 'options':
      return (
        <ConfigOptions activeSchema={activeSchema} schemaListOptions={schemaListOptions} handleChangePropValue={handleChangePropValue} />
      )
    case 'wordsLimit':
      return (
        <ConfigWordsLimit wordsLimit ={propDefaultValue} forceRender={forceRender} />
      )
    case 'picker':
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
          <LinkSet activeSchema={activeSchema} targetType='string' namepath={namepath} schemaListOptions={schemaListOptions} />
        </Space>
      )
  }

  switch(typeofPropDefaultValue.current){
    case 'object':
      if(!propDefaultValue){ return null}
      const propOwner= propDefaultValue
      const propOwnerEntries= Object.entries(propOwner)
      return (
        <div>
          <strong>{propName}：</strong>
          <div className="configs-area">
            {
              propOwnerEntries.map(([pName, value]) => 
                <ConfigProp key={pName}
                  propOwner={propOwner} 
                  namepath= {[...namepath, pName]}
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
      );
    case 'boolean':
      return (
        <Space>
          <strong>{propName}：</strong>
          <Switch checked={propCurrentValue} onChange={handleChangePropValue} />
          <LinkSet activeSchema={activeSchema} targetType='boolean' namepath={namepath} schemaListOptions={schemaListOptions} />
        </Space>
      );
    case 'string':
      return (
        <Space>
          <strong>{propName}：</strong>
          <Input value={propCurrentValue} onChange={e => handleChangePropValue(e.target.value)} />
          {
            propName !== 'name' && <LinkSet activeSchema={activeSchema} targetType='string' namepath={namepath} schemaListOptions={schemaListOptions} />
          }
        </Space>
      );
    case 'number':
      return (
        <Space>
          <strong>{propName}：</strong>
          <InputNumber value={propCurrentValue} onChange={handleChangePropValue} bordered={false} />
          <LinkSet activeSchema={activeSchema} targetType='number' namepath={namepath} schemaListOptions={schemaListOptions} />
        </Space>
      );
    default:
      return null;
  }
}

