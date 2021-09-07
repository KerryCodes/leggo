import React, { useState } from 'react'
import { Input, InputNumber, Space, Switch } from 'antd'
import { Options } from '../Options'


export function Config(props: React.PropsWithoutRef<{
  propName: string,
  activeSchemaProp: any,
  defaultValue: any,
  forceRender: () => void,
}>){
  const { propName, activeSchemaProp, defaultValue, forceRender }= props
  const [value, setValue]= useState(defaultValue)

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
                propName={pName}
                activeSchemaProp={defaultValue[0]} 
                defaultValue={defaultValue[0][pName]}
                forceRender={forceRender}
              />
            )
          }
        </div>
      </div>
    )
  }

  if(propName === 'options'){
    return <Options options={defaultValue} handleChange={handleChange} />
  }

  switch(typeof defaultValue){
    case 'boolean':
      return (
        <Space>
          <strong>{propName}：</strong>
          <Switch checked={value} onChange={handleChange} />
        </Space>
      )
    case 'string':
      return (
        <Space>
          <strong>{propName}：</strong>
          <Input value={value} onChange={e => handleChange(e.target.value)} />
        </Space>
      )
    case 'number':
      return (
        <Space>
          <strong>{propName}：</strong>
          <InputNumber value={value} onChange={handleChange} />
        </Space>
      )
    default:
      return null
  }
}

