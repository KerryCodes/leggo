import React, { useEffect, useState } from 'react'
import { Input, message, Space } from 'antd'


export function JsonInput(props: React.PropsWithChildren<{
  propOwner: any,
  propName: string,
  forceRender: () => void,
}>){
  const { propOwner, propName, forceRender }= props
  const [value, setValue]= useState('')

  const handleBlur= () => {
    try{
      propOwner[propName]= JSON.parse(value)
      forceRender()
    }catch(e){
      message.error(`${propName}值请输入正确JSON格式！`)
    }
  }
  
  useEffect(() => {
    setValue( JSON.stringify(propOwner[propName]) )
  }, [])

  return (
    <Space>
      <strong>{propName}：</strong>
      <Input value={value} onChange={e => setValue(e.target.value)} onBlur={handleBlur} placeholder="请输入JSON格式！" addonAfter="JSON" />
    </Space>
  )
}