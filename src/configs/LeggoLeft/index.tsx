import React, { useMemo, useState } from 'react'
import { Form, Menu } from 'antd'
import { leggoItemStore } from '../../itemStore'
import { createLeggoItems } from '../../utils/createLeggoItems'

const layout= {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}


function LeggoLeft() {  
  const [storeKey, setStoreKey]= useState('antd')
  const leggoItems= useMemo(() => createLeggoItems(storeKey as keyof typeof leggoItemStore), [storeKey])
  const menuItems= useMemo(() => Object.keys(leggoItemStore).map(item => <Menu.Item key={item}>{item}</Menu.Item>), [])

  return (
    <>
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
    </>
  )
}


export default React.memo(LeggoLeft)