import { Form } from "antd"
import React, { useRef, useState } from "react"
import { formItemsLib } from "./formItemsLib"
import { TSchemasModel, TSchemaInfo, TSetting } from "./state"


const leggoStores= new WeakMap<React.MutableRefObject<any>, Leggo>()

class Leggo{
  private readonly forceRender: () => void
  public readonly ref: React.MutableRefObject<any>
  public schemaModel: TSchemasModel
  constructor(
    keyRef: React.MutableRefObject<any>, 
    setForceRender: React.Dispatch<React.SetStateAction<number>>,
    schemaModel?: TSchemasModel,
  ){
    this.ref= keyRef
    this.forceRender= () => setForceRender(pre => pre+1)
    this.schemaModel= schemaModel
  }
  public updateSchemaModel(newSchemaModel: TSchemasModel){
    this.schemaModel= newSchemaModel
    this.forceRender()
  }
  public updateSchemaModelData(formItemName: string, changeDataFunc: (setting: TSetting, standardFormItem: JSX.Element) => void){
    const pickedSchema= this.schemaModel?.schemas.find(item => item.setting.itemProps.name === formItemName)
    if(!pickedSchema){ return }
    const { setting, standardFormItem }= pickedSchema
    changeDataFunc(setting, standardFormItem)
    pickedSchema.forceLeggoFormItemRender?.()
  }
  public getForItem(type: string){
    return formItemsLib[type]?.FormItemComponent
  }
}


export function useLeggo(schemaModel?: TSchemasModel){
  const keyRef= useRef(null)
  const [ , setForceRender]= useState(0)
  if(!leggoStores.has(keyRef)){
    const leggo= new Leggo(keyRef, setForceRender, schemaModel)
    leggoStores.set(keyRef, leggo)
  }
  return leggoStores.get(keyRef)
}


export function LeggoForm(props: React.PropsWithoutRef<any>){
  const { leggo, ...overlapFormProps }= props
  const { formProps, schemas }= leggoStores.get(leggo.ref)?.schemaModel || {}
  return (
    <Form {...formProps} {...overlapFormProps}>
      {
        schemas?.map(schema => <LeggoFormItem key={schema.id} schema={schema} />)
      }
    </Form>
  )
}


function LeggoFormItem(props: React.PropsWithoutRef<{schema: TSchemaInfo}>){
  const { schema }= props
  const { type, setting }= schema
  const FormItemComponent= formItemsLib[type].FormItemComponent
  const [ , setForceRender]= useState(0)
  schema.standardFormItem= <FormItemComponent setting={setting} />
  schema.forceLeggoFormItemRender= () => setForceRender(pre => pre+1)
  return setting.customizedFormItem || schema.standardFormItem
}


