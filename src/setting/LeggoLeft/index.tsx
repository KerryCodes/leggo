import React, { useMemo } from 'react'
import { Form } from 'antd'
import { leggoItemStore } from '../../public/leggoItemStore'

const layout= {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}


export function LeggoLeft() {  
  const leggoItems= useMemo(() => createLeggoItems(), [])

  return (
    <div className="leggo-setting-left">
      <strong>组件库</strong>
      <Form {...layout}>
        <div className="leggo-setting-left-form-content">{leggoItems}</div>
      </Form>
    </div>
  )
}


function createLeggoItems(){
  const result= []
  const handleDragStart= (e: React.DragEvent) => {
    //@ts-ignore
    const schema= e.target.dataset.schema
    e.dataTransfer.setData('text/plain', schema)
  }

  for(const value of Object.values(leggoItemStore)){
    const { type, FormItemComponent, setting }= value
    const item= (
      <div key={type} className="item" draggable onDragStart={handleDragStart} data-schema={type}>
        <div className="item-forbidden">
          <FormItemComponent setting={setting} />
        </div>
      </div>
    )
    result.push(item)
  }
  
  return result
}