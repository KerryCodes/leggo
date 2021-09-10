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
  public updateSchema(formItemName: string, changeDataFunc: (setting: TSetting, standardFormItem: JSX.Element) => void){
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

  const handleValuesChange= (changedValues, allValues) => {
    for(const [name, value] of Object.entries(changedValues)){
      const changedSchema= schemaList.find(schema => schema.getName() === name)
      changedSchema.currentValue= Array.isArray(value) ? value.join() : value
      changedSchema.linkingNames.forEach(linkingName => {
        const targetSchema= schemaList.find(schema => schema.getName() === linkingName)
        targetSchema.forceLeggoFormItemRender()
      })
    }
    onValuesChange(changedValues, allValues)
  }

  return (
    <Form {...formProps} {...overlapFormProps} onValuesChange={handleValuesChange}>
      {
        schemaList?.map(schema => <LeggoFormItem key={schema.id} schema={schema} schemaList={schemaList} />)
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
  schemaList: TSchema[],
}>){
  const { schema, schemaList }= props
  const { type, setting, needDefineGetterMap, postman }= schema
  const FormItemComponent= leggoItemStore[type].FormItemComponent
  const postmanDependencies= postman?.params.map(item => item.value) || []
  const [ , setForceRender]= useState(0)
  schema.standardFormItem= <FormItemComponent setting={setting} />
  schema.forceLeggoFormItemRender= () => setForceRender(pre => pre+1)

  useEffect(() => {
    needDefineGetterMap.forEach(getterInfo => {
      const { observedName, namepath, reference, rule } = getterInfo
      const selfName= schema.getName()
      const linkedSchema= schemaList.find(schema => schema.getName() === observedName)
      const targetKey= namepath.slice(-1)[0]
      let targetProp= schema
      namepath.slice(0, -1).forEach(key => { targetProp = targetProp[key] })
      linkedSchema.linkingNames.add(selfName)
      Reflect.defineProperty(targetProp, targetKey, {
        get: () => {
          let targetValue= linkedSchema.currentValue
          if(reference && rule){
            switch(rule){
              case '<':
                targetValue= targetValue < reference
                break;
              case '<=':
                targetValue= targetValue <= reference
                break;
              case '===':
                targetValue= targetValue === reference
                break;
              case '>=':
                targetValue= targetValue >= reference
                break;
              case '>':
                targetValue= targetValue > reference
                break;
            }
          }
          return targetValue
        }
      }) 
    })
  }, [])

  useEffect(() => {
    if(postman?.method && postman?.url){
      const { method, url, params, data }= postman
      const paramsParsed= params?.reduce((pre, cur) => {
        pre[cur.key]= cur.value
        return pre
      }, {})
      const dataParsed= data?.reduce((pre, cur) => {
        pre[cur.key]= cur.value
        return pre
      }, {})
      axios({ method, url, params: paramsParsed, data: dataParsed })
      .then(res => {
        setting.inputProps.options= res.data.data
        setForceRender(pre => pre+1)
      })
    }
  }, postmanDependencies)

  return setting.customizedFormItem || schema.standardFormItem
}


