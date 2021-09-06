import React, { useMemo } from 'react'
import { TSchema } from '../../public/interface'
import { Config } from './Config'
import { Divider } from 'antd'


export function LeggoRight(props: React.PropsWithoutRef<{
  activeSchema: React.MutableRefObject<TSchema>,
  setForceRender:  React.Dispatch<React.SetStateAction<number>>,
}>) {
  const { activeSchema, setForceRender }= props
  const { id, setting }= activeSchema.current || {}
  const itemPropsConfigs= useMemo(() => Object.keys(setting?.itemProps || {}), [activeSchema.current])
  const inputPropsConfigs= useMemo(() => Object.keys(setting?.inputProps || {}), [activeSchema.current])

  return (
    <div className="leggo-right">
      <strong>属性配置</strong>
      <div className="configs-setting-area">
        <Divider>itemProps</Divider>
        {
          itemPropsConfigs.map(propName => 
            <Config key={id + propName} 
              propName={propName}
              activeSchemaProp={setting.itemProps} 
              defaultValue={setting.itemProps[propName]}
              setForceRender={setForceRender}
            />
          )
        }
      </div>
      <div className="configs-setting-area">
        <Divider>inputProps</Divider>
        {
          inputPropsConfigs.map(propName => 
            <Config key={id + propName} 
              propName={propName}
              activeSchemaProp={setting.inputProps} 
              defaultValue={setting.inputProps[propName]}
              setForceRender={setForceRender}
            />
          )
        }
      </div>
    </div>
  )
}


