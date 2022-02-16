import React, { useContext } from 'react'
import { Button } from 'antd'
import { TSchema } from '../../../interface'
import { leggoItemStore } from '../../../itemStore'
import StandardFormItem from '../../../components/StandardFormItem'
import { ConfigsContext } from '../..'


export function DroppedItem(props: React.PropsWithoutRef<{
  index: number,
  targetIndex: React.MutableRefObject<number>,
  schema: TSchema,
}>){
  const { index, targetIndex, schema }= props
  const { setSchemaList, activeSchema, forceRender }= useContext(ConfigsContext)
  const { id, type, configs }= schema
  const StandardInput= leggoItemStore.total[type].StandardInput
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
  
  const handleDragEnter= () => {
    targetIndex.current= index
  }

  const handleDragEnd= () => {
    setSchemaList(schemaList => {
      const temp= schemaList[targetIndex.current]
      schemaList[targetIndex.current]= schemaList[index]
      schemaList[index]= temp
      return schemaList
    })
    forceRender()
  }

  return (
    <div draggable 
      className={`dropped-item ${active ? 'active-item' : ''}`} 
      onClick={activateSchema} 
      onDragEnd={handleDragEnd}
      onDragEnter={handleDragEnter}
    >
      <Button type="text" className="delete-butt" onClick={deleteSchema}>X</Button>
      <StandardFormItem StandardInput={StandardInput} configs={configs} />
    </div>
  )
}
