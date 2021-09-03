import React, { Fragment, useRef, useState } from 'react'
import './index.less'
import 'antd/dist/antd.css';
import { Drawer } from 'antd'
import { TPostSchemaModel, TSchemaInfo } from './state'
import { LeggoLeft } from './LeggoLeft';
import { LeggoRight } from './LeggoRight'
import { LeggoMiddle } from './LeggoMiddle'


export function CreateLeggoModel(props: React.PropsWithChildren<{ onPostSchemaModel: TPostSchemaModel }>){
  const [visible, setVisible]= useState(false)
  
  return (
    <Fragment>
      <span onClick={() => setVisible(true)}>{ props.children }</span>
      <Drawer title="拖拽生成表单" placement="top" height='100%' visible={visible} onClose={() => setVisible(false)}>
        <Leggo onPostSchemaModel={props.onPostSchemaModel} />
      </Drawer>
    </Fragment>
  )
}


export function EditLeggoModel(props: React.PropsWithChildren<{ onPostSchemaModel: TPostSchemaModel }>){
  const [visible, setVisible]= useState(false)
  
  return (
    <Fragment>
      <span onClick={() => setVisible(true)}>{ props.children }</span>
      <Drawer title="拖拽生成表单" placement="top" height='100%' visible={visible} onClose={() => setVisible(false)}>
        <Leggo onPostSchemaModel={props.onPostSchemaModel} />
      </Drawer>
    </Fragment>
  )
}


export function Leggo(props: React.PropsWithChildren<{ onPostSchemaModel: TPostSchemaModel }>) {
  const activeSchema= useRef<TSchemaInfo>(null)
  const [ , setForceRender]= useState(0)

  return (
    <div className="leggo">
      <LeggoLeft />
      <LeggoMiddle activeSchema={activeSchema} setForceRender={setForceRender} onPostSchemaModel={props.onPostSchemaModel} />
      <LeggoRight activeSchema={activeSchema} setForceRender={setForceRender} />
    </div>
  )
}


