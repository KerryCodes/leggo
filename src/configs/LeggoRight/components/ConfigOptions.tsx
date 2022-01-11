import React, { useContext, useState } from 'react'
import { Radio, RadioChangeEvent } from 'antd'
import { ConfigPostman } from './ConfigPostman'
import { OptionsSet } from './OptionsSet'
import { ConfigsContext } from '../..'


export function ConfigOptions(props: React.PropsWithChildren<{
  handleChangePropValue: (value: any) => void
}>){
  const { handleChangePropValue }= props
  const { activeSchema, schemaListOptions }= useContext(ConfigsContext)
  const postman= activeSchema.current.configs.postman
  const [dataType, setDataType]= useState(postman ? 'dynamic' : 'static')

  const handleChangeDataType= (e: RadioChangeEvent) => {
    const newType= e.target.value
    if(newType === 'static'){ 
      activeSchema.current.configs.postman= undefined 
    }else{
      activeSchema.current.configs.postman={
        propName: 'options',
        method: 'get', 
        url: 'https://www.', 
        params: [],
        data: [],
        responseNamepath: 'RESPONSE.',
      }
    }
    setDataType(newType)
  }

  return (
    <div>
      <strong>options：</strong>
      <Radio.Group size="small" value={dataType} buttonStyle="solid" onChange={handleChangeDataType}>
        <Radio.Button value="static">静态数据</Radio.Button>
        <Radio.Button value="dynamic">远程数据</Radio.Button>
      </Radio.Group>
      <div className="configs-area">
        {
          dataType === 'static' ? <OptionsSet handleChange={handleChangePropValue} /> : <ConfigPostman />
        }
      </div>
    </div>
  )
}