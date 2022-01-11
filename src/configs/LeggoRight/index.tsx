import React, { useContext, useMemo } from 'react'
import { ConfigProp } from './components/ConfigProp'
import { Divider } from 'antd'
import { ConfigInputProp } from './components/ConfigInputProps'
import { ConfigStyle } from './components/ConfigStyle'
import { ConfigsContext } from '..'


export default function LeggoRight() {
  const { activeSchema, schemaList, forceRender }= useContext(ConfigsContext)
  const { id, configs }= activeSchema.current || {}
  const { itemProps, inputProps, extra }= configs || {}
  const itemPropsEntries= useMemo(() => Object.entries(itemProps || {}), [activeSchema.current])
  const inputPropsEntries= useMemo(() => Object.entries(inputProps || {}), [activeSchema.current])
  const extraEntries = useMemo(() => Object.entries(extra || {}), [activeSchema.current])
  const schemaListOptions= [{label: '公共状态 - publicStates', value: 'publicStates'}].concat(schemaList.map(schema => {
    const { label, name }= schema.configs.itemProps
    return {
      label: `${label} - ${String(name)}`,
      value: String(name),
    }
  }))

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
                schemaListOptions={schemaListOptions}
                forceRender={forceRender}
              />
            )
          }
        </div>
        <div className="configs-area">
          <Divider>InputProps</Divider>
          {
            activeSchema.current && <ConfigStyle key={id} activeSchema={activeSchema} forceRender={forceRender} />
          }
          {
            inputPropsEntries.map(([propName, value]) => 
              <ConfigInputProp key={id + propName} 
                propOwner={inputProps} 
                namepath={['inputProps', propName]}
                propName={propName}
                propDefaultValue={value}
                activeSchema={activeSchema}
                schemaListOptions={schemaListOptions}
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
                schemaListOptions={schemaListOptions}
                forceRender={forceRender}
              />
            )
          }
        </div>
      </div>
    </div>
  )
}


