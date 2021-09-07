import React, { useRef, useState } from 'react'
import '../styles/setting.less'
import { TPostSchemaModel, TSchema } from '../public/interface'
import { LeggoLeft } from './LeggoLeft';
import { LeggoRight } from './LeggoRight'
import { LeggoMiddle } from './LeggoMiddle'


export function LeggoSetting(props: React.PropsWithChildren<{ onPostSchemaModel: TPostSchemaModel }>) {
  const activeSchema= useRef<TSchema>(null)
  const [ , setForceRender]= useState(0)
  const forceRender= () => setForceRender(pre => pre+1)

  return (
    <div className="leggo-setting">
      <LeggoLeft />
      <LeggoMiddle activeSchema={activeSchema} forceRender={forceRender} onPostSchemaModel={props.onPostSchemaModel} />
      <LeggoRight activeSchema={activeSchema} forceRender={forceRender} />
    </div>
  )
}


