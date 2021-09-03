import React, { useMemo } from 'react'
import './index.less'
import { Form } from 'antd'
import { formItemsLib } from '../formItemsLib'

const layout= {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}


export function LeggoLeft() {  
  const formItemStore= useMemo(() => createFormItemStore(), [])

  return (
    <div className="leggo-left">
      <strong>组件库</strong>
      <Form {...layout}>
        <div className="leggo-left-form-content">{formItemStore}</div>
      </Form>
    </div>
  )
}



function createFormItemStore(){
  const result= []
  const handleDragStart= (e: React.DragEvent) => {
    //@ts-ignore
    const schema= e.target.dataset.schema
    e.dataTransfer.setData('text/plain', schema)
  }

  for(const value of Object.values(formItemsLib)){
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