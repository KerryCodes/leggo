import React from 'react'
import './index.less'
import { Button } from 'antd'
import { TSchemaInfo } from '../../state'
import { formItemsLib } from '../../formItemsLib'


export function DroppedFormItem(props: React.PropsWithoutRef<{
  schemaInfo: TSchemaInfo,
  setSchemas: React.Dispatch<React.SetStateAction<TSchemaInfo[]>>,
  activeSchema: React.MutableRefObject<TSchemaInfo>,
  setForceRender: React.Dispatch<React.SetStateAction<number>>,
}>){
  const { schemaInfo, setSchemas, activeSchema, setForceRender }= props
  const { id, type, setting }= schemaInfo
  const FormItemComponent= formItemsLib[type].FormItemComponent
  const active= activeSchema.current === schemaInfo

  const deleteSchema= (e: React.MouseEvent) => {
    e.stopPropagation()
    if(active){ activeSchema.current= null }
    setSchemas(pre => pre.filter(it => it.id !== id))
    setForceRender(pre => pre+1)
  }

  const activateSchema= (e: React.MouseEvent) => {
    e.stopPropagation()
    activeSchema.current= schemaInfo
    setForceRender(pre => pre+1)
  }

  return (
    <div className={`dropped-item ${active ? 'active-item' : ''}`} onClick={activateSchema}>
      <Button type="text" className="delete-butt" onClick={deleteSchema}>X</Button>
      <FormItemComponent setting={setting} />
    </div>
  )
}
