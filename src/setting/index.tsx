import React, { useRef, useState } from 'react'
import './styles/index.less'
import { TPostSchemaModel, TSchema } from '../public/interface'
import { LeggoLeft } from './LeggoLeft';
import { LeggoRight } from './LeggoRight'
import { LeggoMiddle } from './LeggoMiddle'


export function LeggoSetting(props: React.PropsWithChildren<{ onPostSchemaModel: TPostSchemaModel }>) {
  const activeSchema= useRef<TSchema>(null)
  const [ , setForceRender]= useState(0)

  return (
    <div className="leggo-setting">
      <LeggoLeft />
      <LeggoMiddle activeSchema={activeSchema} setForceRender={setForceRender} onPostSchemaModel={props.onPostSchemaModel} />
      <LeggoRight activeSchema={activeSchema} setForceRender={setForceRender} />
    </div>
  )
}


