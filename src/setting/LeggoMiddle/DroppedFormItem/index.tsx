import React from 'react'
import { Button } from 'antd'
import { TSchema } from '../../../public/interface'
import { leggoItemStore } from '../../../public/leggoItemStore'


export function DroppedFormItem(props: React.PropsWithoutRef<{
  schema: TSchema,
  setSchemaList: React.Dispatch<React.SetStateAction<TSchema[]>>,
  activeSchema: React.MutableRefObject<TSchema>,
  forceRender: () => void,
}>){
  const { schema, setSchemaList, activeSchema, forceRender }= props
  const { id, type, setting }= schema
  const FormItemComponent= leggoItemStore[type].FormItemComponent
  const active= activeSchema.current === schema

  const deleteSchema= (e: React.MouseEvent) => {
    e.stopPropagation()
    if(active){ activeSchema.current= null }
    setSchemaList(pre => pre.filter(it => it.id !== id))
    forceRender()
  }

  const activateSchema= (e: React.MouseEvent) => {
    e.stopPropagation()
    activeSchema.current= schema
    forceRender()
  }

  return (
    <div className={`dropped-item ${active ? 'active-item' : ''}`} onClick={activateSchema}>
      <Button type="text" className="delete-butt" onClick={deleteSchema}>X</Button>
      <FormItemComponent setting={setting} />
    </div>
  )
}
