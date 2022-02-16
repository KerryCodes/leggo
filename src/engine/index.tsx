import React, { useRef, useState } from "react"
import { Form, FormProps } from "antd"
import { TSchemaModel, TMiddleware } from "../interface"
import LeggoItem from "../components/LeggoItem"
import { Leggo } from "../utils/Leggo"

const leggoStores= new WeakMap<React.MutableRefObject<any>, Leggo>()


export function LeggoForm(props: React.PropsWithoutRef<{leggo: Leggo} & FormProps>){
  const { leggo, onFieldsChange, ...overlapFormProps }= props
  const { formProps, schemaList }= leggoStores.get(leggo.ref)?.schemaModel || {}

  const handleFieldsChange= (changedFields: any[], allFields: any[]) => {
    changedFields.forEach(({name, value}) => {
      const changedSchema= schemaList.find(schema => schema.getStringedName() === String(name))
      if(changedSchema){ 
        changedSchema.currentItemValue= value
        changedSchema.linkingStringedNames.forEach(linkingName => {
          const targetSchema= schemaList.find(schema => schema.getStringedName() === linkingName)
          targetSchema.forceLeggoFormItemRender()
        })
       }
    })
    onFieldsChange?.(changedFields, allFields)
  }

  return (
    <Form {...formProps} {...overlapFormProps} onFieldsChange={handleFieldsChange}>
      {
        schemaList?.map(schema => <LeggoItem key={schema.id} leggo={leggo} schema={schema} schemaList={schemaList} />)
      }
    </Form>
  )
}

LeggoForm.useLeggo= (schemaModel0?: TSchemaModel, middleware?: TMiddleware, publicStates?: object): Leggo => {
  const keyRef= useRef(null)
  const setForceRender= useState(0)[1]
  let leggo= null
  if (!leggoStores.has(keyRef)) {
    leggo= new Leggo(keyRef, setForceRender, schemaModel0, middleware, publicStates)
    leggoStores.set(keyRef, leggo) 
  }

  return leggo || leggoStores.get(keyRef)
}