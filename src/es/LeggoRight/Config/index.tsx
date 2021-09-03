import React, { useState } from 'react'
import './index.less'
import { Input, InputNumber, Space, Switch } from 'antd'


export function Config(props: React.PropsWithoutRef<{
  propName: string,
  activeSchemaProp: any,
  defaultValue: any,
  setForceRender: React.Dispatch<React.SetStateAction<number>>,
}>){
  const { propName, activeSchemaProp, defaultValue, setForceRender }= props
  const [value, setValue]= useState(defaultValue)

  const handleChange= (value: any) => {
    activeSchemaProp[propName]= value
    setValue(value)
    setForceRender(pre => pre + 1)
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
                setForceRender={setForceRender}
              />
            )
          }
        </div>
      </div>
    )
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

