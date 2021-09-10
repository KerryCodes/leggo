import React, { useMemo } from 'react'
import { Form } from 'antd'
import { leggoItemStore } from '../../service'

const layout= {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}


export function LeggoLeft() {  
  const leggoItems= useMemo(() => createLeggoItems(), [])

  return (
    <div className="leggo-configs-left">
      <strong>组件库</strong>
      <Form {...layout}>
        <div className="leggo-configs-left-form-content">{leggoItems}</div>
      </Form>
    </div>
  )
}


function createLeggoItems(){
  const result= []
  const handleDragStart= (e: React.DragEvent) => {
    //@ts-ignore
    const schemaType= e.target.dataset.type
    e.dataTransfer.setData('text/plain', schemaType)
  }

  for(const value of Object.values(leggoItemStore)){
    const { type, StandardFormItemFC, configs }= value
    const item= (
      <div key={type} className="item" draggable onDragStart={handleDragStart} data-type={type}>
        <div className="item-forbidden">
          <StandardFormItemFC itemProps={configs.itemProps} inputProps={configs.inputProps} />
        </div>
      </div>
    )
    result.push(item)
  }
  
  return result
}