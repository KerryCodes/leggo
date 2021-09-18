import React, { Fragment, useMemo, useState } from 'react'
import { Form, Menu } from 'antd'
import { leggoItemStore, StandardFormItem } from '../../service'

const layout= {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}


export function LeggoLeft() {  
  const [storeKey, setStoreKey]= useState('antd')
  const leggoItems= useMemo(() => createLeggoItems(storeKey as keyof typeof leggoItemStore), [storeKey])
  const menuItems= useMemo(() => Object.keys(leggoItemStore).map(item => <Menu.Item key={item}>{item}</Menu.Item>), [])

  return (
    <Fragment>
      <div>
        <div className="top-area">
          <strong>组件库</strong>
        </div>
        <Menu defaultSelectedKeys={['antd']} mode="inline" onSelect={({key}) => setStoreKey(key)}>
          { menuItems }
        </Menu>
      </div>
      <div className="leggo-configs-left">
        <Form {...layout}>
          <div className="leggo-configs-left-form-content">{leggoItems}</div>
        </Form>
      </div>
    </Fragment>
  )
}


function createLeggoItems(storeKey: keyof typeof leggoItemStore){
  const result= []
  const selectedStore= leggoItemStore[storeKey]
  const handleDragStart= (e: React.DragEvent) => {
    //@ts-ignore
    const schemaType= e.target.dataset.type
    e.dataTransfer.setData('text/plain', schemaType)
  }

  for(const value of Object.values(selectedStore)){
    const { type, StandardInput, configs }= value
    const item= (
      <div key={type} className="item" draggable onDragStart={handleDragStart} data-type={type}>
        <div className="item-forbidden">
          <StandardFormItem StandardInput={StandardInput} configs={configs} />
        </div>
      </div>
    )
    result.push(item)
  }
  
  return result
}