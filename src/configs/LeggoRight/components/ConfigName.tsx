import { Input, message, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { TSchema } from '../../../interface';


export function ConfigName(props: React.PropsWithChildren<{
  activeSchema: React.MutableRefObject<TSchema>,
}>){
  const itemProps= props.activeSchema.current.configs.itemProps
  const [value, setValue]= useState('')
  const timeId= useRef(null)
  
  const changeName= (e: any) => {
    const newValue= e.target.value
    setValue(newValue)
    timeId.current && clearTimeout(timeId.current)
    timeId.current= setTimeout(() => {
      try{
        const newValueStringified= JSON.parse(newValue)
        itemProps.name= newValueStringified
      }catch(e){
        message.error('name值请输入正确JSON格式！')
      }finally{
        timeId.current= null
      }
    }, 1000)
  }
  
  useEffect(() => {
    const valueStringified= JSON.stringify(itemProps.name)
    setValue(valueStringified)
  }, [])

  return (
    <Space>
      <strong>name：</strong>
      <Input value={value} onChange={changeName} />
      <strong>请输入JSON格式！</strong>
    </Space>
  )
}