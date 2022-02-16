import React, { useContext, useRef, useState } from 'react'
import { Input, InputNumber, Space, Switch } from 'antd'
import { LinkSet } from './LinkSet'
import { ConfigWordsLimit } from './ConfigWordsLimit'
import { JsonInput } from './JsonInput'
import { ConfigsContext } from '../..'


export function ConfigProp(props: React.PropsWithoutRef<{
  propOwner: any,
  namepath: (string | number)[],
  propName: string,
  propDefaultValue: any,
}>){
  const { propOwner, namepath, propName, propDefaultValue }= props
  const { forceRender }= useContext(ConfigsContext)
  const typeofPropDefaultValue= useRef(typeof propDefaultValue)
  const [propCurrentValue, setPropCurrentValue]= useState(propDefaultValue)

  const handleChangePropValue= (newValue: any) => {
    propOwner[propName]= newValue
    setPropCurrentValue(newValue)
    forceRender()
  }

  switch(propName){
    case 'name':
      return <JsonInput propOwner={propOwner} propName='name' />
    case 'initialValue':
      return <JsonInput propOwner={propOwner} propName='initialValue' />
    case 'wordsLimit':
      return <ConfigWordsLimit extra ={propOwner} />
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
          <LinkSet targetType='boolean' namepath={namepath} />
        </Space>
      );
    case 'string':
      return (
        <Space>
          <strong>{propName}：</strong>
          <Input prefix='"' suffix='"' value={propCurrentValue} onChange={e => handleChangePropValue(e.target.value)} />
          <LinkSet targetType='string' namepath={namepath} />
        </Space>
      );
    case 'number':
      return (
        <Space>
          <strong>{propName}：</strong>
          <InputNumber value={propCurrentValue} onChange={handleChangePropValue} bordered={false} />
          <LinkSet targetType='number' namepath={namepath} />
        </Space>
      );
    default:
      return null;
  }
}

