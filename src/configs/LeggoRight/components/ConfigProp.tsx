import React, { useRef, useState } from 'react'
import { Input, InputNumber, Space, Switch } from 'antd'
import { TSchema } from '../../../interface'
import { LinkSet } from './LinkSet'
import { ConfigWordsLimit } from './ConfigWordsLimit'


export function ConfigProp(props: React.PropsWithoutRef<{
  propOwner: any,
  namepath: (string | number)[],
  propName: string,
  propDefaultValue: any,
  activeSchema: React.MutableRefObject<TSchema>,
  schemaListOptions: {label: string, value: string}[],
  forceRender: () => void,
}>){
  const { propOwner, namepath, propName, propDefaultValue, activeSchema, schemaListOptions, forceRender }= props
  const typeofPropDefaultValue= useRef(typeof propDefaultValue)
  const [propCurrentValue, setPropCurrentValue]= useState(propDefaultValue)

  const handleChangePropValue= (newValue: any) => {
    propOwner[propName]= newValue
    setPropCurrentValue(newValue)
    forceRender()
  }

  switch(propName){
    case 'wordsLimit':
      return (
        <ConfigWordsLimit wordsLimit ={propDefaultValue} forceRender={forceRender} />
      )
  }

  switch(typeofPropDefaultValue.current){
    case 'object':
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
                  schemaListOptions={schemaListOptions}
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

