import React, { useMemo } from 'react'
import { TSchema } from '../../interface'
import { ConfigProp } from './components/ConfigProp'
import { Divider } from 'antd'


export function LeggoRight(props: React.PropsWithoutRef<{
  activeSchema: React.MutableRefObject<TSchema>,
  schemaList: TSchema[],
  forceRender: () => void,
}>) {
  const { activeSchema, schemaList, forceRender }= props
  const { id, configs }= activeSchema.current || {}
  const { itemProps, inputProps }= configs || {}
  const itemPropsEntries= useMemo(() => Object.entries(itemProps || {}), [activeSchema.current])
  const inputPropsEntries= useMemo(() => Object.entries(inputProps || {}), [activeSchema.current])

  return (
    <div className="leggo-configs-right">
      <strong>属性配置</strong>
      <div className="configs-configs-area">
        <Divider>ItemProps</Divider>
        {
          itemPropsEntries.map(([propName, value]) => 
            <ConfigProp key={id + propName} 
              propOwner={itemProps} 
              namepath={['itemProps', propName]}
              propName={propName}
              propDefaultValue={value}
              activeSchema={activeSchema}
              schemaList={schemaList} 
              forceRender={forceRender}
            />
          )
        }
      </div>
      <div className="configs-configs-area">
        <Divider>InputProps</Divider>
        {
          inputPropsEntries.map(([propName, value]) => 
            <ConfigProp key={id + propName} 
              propOwner={inputProps} 
              namepath={['inputProps', propName]}
              propName={propName}
              propDefaultValue={value}
              activeSchema={activeSchema}
              schemaList={schemaList} 
              forceRender={forceRender}
            />
          )
        }
      </div>
    </div>
  )
}


