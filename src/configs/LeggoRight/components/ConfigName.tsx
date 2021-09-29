import { Input, message, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { TSchema } from '../../../interface';


export function ConfigName(props: React.PropsWithChildren<{
  activeSchema: React.MutableRefObject<TSchema>,
  forceRender: () => void,
}>){
  const { activeSchema, forceRender }= props
  const itemProps= activeSchema.current.configs.itemProps
  const [value, setValue]= useState('')

  const handleBlur= () => {
    try{
      itemProps.name= JSON.parse(value)
      forceRender()
    }catch(e){
      message.error('name值请输入正确JSON格式！')
    }
  }
  
  useEffect(() => {
    setValue( JSON.stringify(itemProps.name) )
  }, [])

  return (
    <Space>
      <strong>name：</strong>
      <Input value={value} onChange={e => setValue(e.target.value)} onBlur={handleBlur} placeholder="请输入JSON格式！" addonAfter="JSON" />
    </Space>
  )
}