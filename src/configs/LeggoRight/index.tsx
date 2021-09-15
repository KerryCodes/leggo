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
  const { itemProps, inputProps, extra }= configs || {}
  const itemPropsEntries= useMemo(() => Object.entries(itemProps || {}), [activeSchema.current])
  const inputPropsEntries= useMemo(() => Object.entries(inputProps || {}), [activeSchema.current])
  const extraEntries= useMemo(() => Object.entries(extra || {}), [activeSchema.current])

  return (
    <div className="leggo-configs-right">
      <div className="top-area">
        <strong>属性配置</strong>
      </div>
      <div className="scroll-container">
        <div className="configs-area">
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
        <div className="configs-area">
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
        <div className="configs-area">
          <Divider>Extra</Divider>
          {
            extraEntries.map(([propName, value]) => 
              <ConfigProp key={id + propName} 
                propOwner={extra} 
                namepath={['extra', propName]}
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
    </div>
  )
}


