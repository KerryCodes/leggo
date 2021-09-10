import React, { useMemo } from 'react'
import { TSchema } from '../../public/interface'
import { Config } from './components/Config'
import { Divider } from 'antd'


export function LeggoRight(props: React.PropsWithoutRef<{
  schemaList: TSchema[],
  activeSchema: React.MutableRefObject<TSchema>,
  forceRender: () => void,
}>) {
  const { schemaList, activeSchema, forceRender }= props
  const { id, setting }= activeSchema.current || {}
  const itemPropsConfigs= useMemo(() => Object.keys(setting?.itemProps || {}), [activeSchema.current])
  const inputPropsConfigs= useMemo(() => Object.keys(setting?.inputProps || {}), [activeSchema.current])

  return (
    <div className="leggo-setting-right">
      <strong>属性配置</strong>
      <div className="configs-setting-area">
        <Divider>itemProps</Divider>
        {
          itemPropsConfigs.map(propName => 
            <Config key={id + propName} 
              namepath={['setting', 'itemProps', propName]}
              propName={propName}
              activeSchemaProp={setting.itemProps} 
              defaultValue={setting.itemProps[propName]}
              forceRender={forceRender}
              schemaList={schemaList} 
              activeSchema={activeSchema}
            />
          )
        }
      </div>
      <div className="configs-setting-area">
        <Divider>inputProps</Divider>
        {
          inputPropsConfigs.map(propName => 
            <Config key={id + propName} 
              namepath={['setting', 'inputProps', propName]}
              propName={propName}
              activeSchemaProp={setting.inputProps} 
              defaultValue={setting.inputProps[propName]}
              forceRender={forceRender}
              schemaList={schemaList} 
              activeSchema={activeSchema}
            />
          )
        }
      </div>
    </div>
  )
}


