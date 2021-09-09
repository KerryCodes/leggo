import { Form } from "antd"
import React, { useEffect, useRef, useState } from "react"
import { leggoItemStore } from "../public/leggoItemStore"
import { TSchemasModel, TSchema, TSetting } from "../public/interface"
import axios from 'axios'


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
    const pickedSchema= this.schemaModel?.schemaList.find(item => item.setting.itemProps.name === formItemName)
    if(!pickedSchema){ return }
    const { setting, standardFormItem }= pickedSchema
    changeDataFunc(setting, standardFormItem)
    pickedSchema.forceLeggoFormItemRender?.()
  }
  public getForItem(type: string){
    return leggoItemStore[type]?.FormItemComponent
  }
}


export function LeggoForm(props: React.PropsWithoutRef<any>){
  const { leggo, onValuesChange, ...overlapFormProps }= props
  const { formProps, schemaList }= leggoStores.get(leggo.ref)?.schemaModel || {}

  const updateLinkedValue= (value, {namepath, selfName, rule, reference}) => {
    if(namepath.length < 1){ return }
    leggo.updateSchemaModelData(selfName, setting => {
      let targetValue= value
      let temp= setting
      const targetKey= namepath.slice(-1)[0]
      namepath.slice(0, -1).forEach(key => { temp= temp[key] })
      if(reference && rule){
        switch(rule){
          case '<':
            targetValue= value < reference
            break;
          case '<=':
            targetValue= value <= reference
            break;
          case '===':
            targetValue= value === reference
            break;
          case '>=':
            targetValue= value >= reference
            break;
          case '>':
            targetValue= value > reference
            break;
        }
      }
      temp[targetKey]= targetValue
    })
  }

  const handleValuesChange= (changedValues, allValues) => {
    for(const [name, value] of Object.entries(changedValues)){
      const targetSchema= schemaList.find(schema => schema.setting.itemProps.name === name)
      targetSchema.linkedValueList.forEach(updateLinkedValue.bind(null, value))
    }
    onValuesChange(changedValues, allValues)
  }

  return (
    <Form {...formProps} {...overlapFormProps} onValuesChange={handleValuesChange}>
      {
        schemaList?.map(schema => <LeggoFormItem key={schema.id} schema={schema} />)
      }
    </Form>
  )
}
LeggoForm.useLeggo= (schemaModel?: TSchemasModel) => {
  const keyRef= useRef(null)
  const [ , setForceRender]= useState(0)
  if(!leggoStores.has(keyRef)){
    leggoStores.set(keyRef, new Leggo(keyRef, setForceRender, schemaModel))
  }
  return leggoStores.get(keyRef)
}


function LeggoFormItem(props: React.PropsWithoutRef<{
  schema: TSchema,
}>){
  const { schema }= props
  const { type, setting, postman }= schema
  const FormItemComponent= leggoItemStore[type].FormItemComponent
  const [ , setForceRender]= useState(0)
  schema.standardFormItem= <FormItemComponent setting={setting} />
  schema.forceLeggoFormItemRender= () => setForceRender(pre => pre+1)

  useEffect(() => {
    if(postman?.method && postman?.url){
      const { method, url, params }= postman
      axios({ method, url, data: params })
      .then(res => {
        setting.inputProps.options= res.data.data
        // setForceRender(pre => pre+1)
      })
    }
  }, [])

  return setting.customizedFormItem || schema.standardFormItem
}


