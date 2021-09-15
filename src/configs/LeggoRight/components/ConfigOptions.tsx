import React, { useState } from 'react'
import { Radio, RadioChangeEvent } from 'antd'
import { TOption, TSchema } from '../../../interface'
import { ConfigPostman } from './ConfigPostman'
import { OptionsSet } from './OptionsSet'


export function ConfigOptions(props: React.PropsWithChildren<{
  activeSchema: React.MutableRefObject<TSchema>,
  schemaListOptions: TOption[],
  handleChangePropValue: (value: any) => void
}>){
  const { activeSchema, schemaListOptions, handleChangePropValue }= props
  const postman= activeSchema.current.configs.postman
  const [dataType, setDataType]= useState(postman ? 'dynamic' : 'static')

  const handleChangeDataType= (e: RadioChangeEvent) => {
    const newType= e.target.value
    if(newType === 'static'){ activeSchema.current.configs.postman= null }
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
          dataType === 'static' ? 
            <OptionsSet activeSchema={activeSchema} handleChange={handleChangePropValue} />
            :
            <ConfigPostman activeSchema={activeSchema} schemaListOptions={schemaListOptions} />
        }
      </div>
    </div>
  )
}