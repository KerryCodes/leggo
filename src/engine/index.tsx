import { Form, FormProps } from "antd"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { leggoItemStore } from "../service"
import { TSchemasModel, TSchema, TConfigs } from "../interface"
import axios from 'axios'


const leggoStores= new WeakMap<React.MutableRefObject<any>, Leggo>()

class Leggo{
  private readonly forceLeggoFormRender: () => void
  public readonly ref: React.MutableRefObject<any>
  public schemaModel: TSchemasModel
  constructor(
    keyRef: React.MutableRefObject<any>, 
    setForceRender: React.Dispatch<React.SetStateAction<number>>,
    schemaModel?: TSchemasModel,
    middleware?: (value: TSchema, index: number, array: TSchema[]) => void,
  ){
    this.ref= keyRef
    this.forceLeggoFormRender= () => setForceRender(pre => pre+1)
    middleware && schemaModel.schemaList.forEach(middleware)
    this.schemaModel= schemaModel
  }
  public resetSchemaModel(newSchemaModel: TSchemasModel, middleware?: (value: TSchema, index: number, array: TSchema[]) => void){
    middleware && newSchemaModel.schemaList.forEach(middleware)
    this.schemaModel= newSchemaModel
    this.forceLeggoFormRender()
  }
  public updateSchema(formItemName: string, changeSchemaFunc: (configs: TConfigs) => void){
    const targetSchema= this.schemaModel?.schemaList.find(schema => schema.getName() === formItemName)
    if (targetSchema) {
      const { configs }= targetSchema
      changeSchemaFunc(configs)
      targetSchema.forceLeggoFormItemRender?.()
    }
  }
}


function LeggoForm(props: React.PropsWithoutRef<{leggo: Leggo} & FormProps>){
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
LeggoForm.useLeggo = (schemaModel?: TSchemasModel): Leggo => {
  let leggo= null
  const keyRef= useRef(null)
  const [ , setForceRender]= useState(0)
  if (!leggoStores.has(keyRef)) {
    leggo= new Leggo(keyRef, setForceRender, schemaModel)
    leggoStores.set(keyRef, leggo) 
  }
  return leggo || leggoStores.get(keyRef)
}


function LeggoItem(props: React.PropsWithoutRef<{
  schema: TSchema,
  schemaList: TSchema[],
}>){
  const { schema, schemaList }= props
  const { type, configs, needDefineGetterMap }= schema
  const { postman, CustomizedItemFC }= configs
  const postmanParamsValueList = postman?.params?.map(item => item.value) || []
  const postmanDataValueList= postman?.data?.map(item => item.value) || []
  const [ , setForceRender]= useState(0)
  const StandardFormItemFC= leggoItemStore.total[type]?.StandardItemFC
  const standardItem= StandardFormItemFC && <StandardFormItemFC {...configs} />
  
  useEffect(() => {
    schema.forceLeggoFormItemRender= () => setForceRender(pre => pre+1)
  }, [])

  useLayoutEffect(() => {
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
      const paramsParsed = params?.reduce((pre, cur) => {
        const value= cur.value
        //@ts-ignore
        pre[cur.key]= value === '' ? undefined : value
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
  }, [...postmanParamsValueList, ...postmanDataValueList])

  return CustomizedItemFC ? <CustomizedItemFC>{standardItem}</CustomizedItemFC> : standardItem
}




export { LeggoForm }