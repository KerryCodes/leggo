import { Form, FormProps } from "antd"
import React, { useEffect, useRef, useState } from "react"
import { leggoItemStore } from "../service"
import { TSchemasModel, TSchema, TConfigs } from "../interface"
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
  public resetSchemaModel(newSchemaModel: TSchemasModel){
    this.schemaModel= newSchemaModel
    this.forceRender()
  }
  public updateSchema(formItemName: string, changeDataFunc: (configs: TConfigs, standardFormItem: JSX.Element) => void){
    const pickedSchema= this.schemaModel?.schemaList.find(item => item.configs.itemProps.name === formItemName)
    if(!pickedSchema){ return }
    const { configs, standardFormItem }= pickedSchema
    changeDataFunc(configs, standardFormItem)
    pickedSchema.forceLeggoFormItemRender?.()
  }
  public getForItem(type: string){
    return leggoItemStore[type]?.StandardFormItemFC
  }
}


export function LeggoForm(props: React.PropsWithoutRef<{leggo: Leggo} & FormProps>){
  const { leggo, onValuesChange, ...overlapFormProps }= props
  const { formProps, schemaList }= leggoStores.get(leggo.ref)?.schemaModel || {}

  const handleValuesChange= (changedValues: any, allValues: any) => {
    for(const [name, value] of Object.entries(changedValues)){
      const changedSchema= schemaList.find(schema => schema.getName() === name)
      changedSchema.currentFormItemValue= Array.isArray(value) ? value.join() : value
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
        schemaList?.map(schema => <LeggoItem key={schema.id} schema={schema} schemaList={schemaList} />)
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


function LeggoItem(props: React.PropsWithoutRef<{
  schema: TSchema,
  schemaList: TSchema[],
}>){
  const { schema, schemaList }= props
  const { type, configs, needDefineGetterMap }= schema
  const { itemProps, inputProps, postman }= configs
  const StandardFormItemFC= leggoItemStore[type].StandardFormItemFC
  const postmanDependencies= postman?.params.map(item => item.value) || []
  const [ , setForceRender]= useState(0)
  schema.standardFormItem= <StandardFormItemFC itemProps={itemProps} inputProps={inputProps} />
  
  useEffect(() => {
    schema.forceLeggoFormItemRender= () => setForceRender(pre => pre+1)
  }, [])

  useEffect(() => {
    needDefineGetterMap.forEach(getterInfo => {
      const { observedName, namepath, reference, rule } = getterInfo
      const selfName= schema.getName()
      const linkedSchema= schemaList.find(schema => schema.getName() === observedName)
      const targetKey= namepath.slice(-1)[0]
      //@ts-ignore
      const targetProp= namepath.slice(0, -1).reduce((pre, cur) => pre[cur], configs)
      linkedSchema.linkingNames.add(selfName)
      Reflect.defineProperty(targetProp, targetKey, {
        get: () => {
          let targetValue= linkedSchema.currentFormItemValue
          if(reference && rule){
            switch(rule){
              case '<':
                return targetValue < reference
              case '<=':
                return targetValue <= reference
              case '===':
                return targetValue === reference
              case '>=':
                return targetValue >= reference
              case '>':
                return targetValue > reference
            }
          }
          return targetValue
        }
      }) 
    })
  }, [])

  useEffect(() => {
    const { method, url, params, data }= postman || {}
    if(method && url){
      const paramsParsed= params?.reduce((pre, cur) => {
        //@ts-ignore
        pre[cur.key]= cur.value || undefined
        return pre
      }, {})
      const dataParsed= data?.reduce((pre, cur) => {
        //@ts-ignore
        pre[cur.key]= cur.value
        return pre
      }, {})
      axios({ method, url, params: paramsParsed, data: dataParsed })
      .then(res => {
        configs.inputProps.options= res.data.data
        setForceRender(pre => pre+1)
      })
    }
  }, postmanDependencies)

  return configs.customizedFormItem || schema.standardFormItem
}


