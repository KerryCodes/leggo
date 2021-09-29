import React, { useEffect, useMemo, useRef, useState } from "react"
import { Form, FormProps, message } from "antd"
import { leggoItemStore } from "../service"
import { TSchemaModel, TSchema, TConfigs, TMiddleware } from "../interface"
import axios from 'axios'
import { wordsLimitValidator } from "../utils"


const leggoStores= new WeakMap<React.MutableRefObject<any>, Leggo>()

export class Leggo{
  static createRules(rules: any, wordsLimit: any){
    return wordsLimit ? [...rules, { validator: wordsLimitValidator.bind(null, wordsLimit) }] : rules
  }
  static createChildren(childrenNode: string | React.FC){
    if(!childrenNode){ return }
    const childrenType= typeof childrenNode
    if(childrenType === 'function'){
      const Node= childrenNode
      return <Node />
    }
    if(childrenType === 'string'){
      return childrenNode
    }
  }
  private readonly forceLeggoFormRender: () => void
  public readonly ref: React.MutableRefObject<any>
  public readonly publicStates: object
  public schemaModel: TSchemaModel
  public allDisabledIsLockedToTrue= false
  constructor(
    keyRef: React.MutableRefObject<any>, 
    setForceRender: React.Dispatch<React.SetStateAction<number>>,
    schemaModel0: TSchemaModel,
    middleware?: TMiddleware,
    publicStates?: object,
  ){
    const schemaModel= this.parseSchemaModel(schemaModel0, middleware)
    this.ref= keyRef
    this.publicStates= publicStates || {}
    this.schemaModel= schemaModel
    this.forceLeggoFormRender= () => setForceRender(pre => pre+1)
  }
  private parseSchemaModel(schemaModel0: TSchemaModel, middleware?: TMiddleware): TSchemaModel{
    try{
      schemaModel0?.schemaList.forEach((schema, index) => {
        schema.linkingStringedNames= new Set()
        schema.getStringedName= () => String(schema.configs.itemProps.name)
        middleware && middleware(schema.configs, index)
      })
    }catch(e){
      message.error('解析失败!')
      console.log(e);
    }finally{
      return schemaModel0
    }
  }
  public resetSchemaModel(newSchemaModel0: TSchemaModel, middleware?: TMiddleware){
    this.schemaModel= this.parseSchemaModel(newSchemaModel0, middleware)
    this.forceLeggoFormRender()
  }
  public updateSchema(formItemName: string, changeSchemaFunc: (configs: TConfigs) => void){
    const targetSchema= this.schemaModel?.schemaList.find(schema => schema.getStringedName() === String(formItemName))
    if (targetSchema) {
      const { configs }= targetSchema
      changeSchemaFunc(configs)
      targetSchema.forceLeggoFormItemRender?.()
    }
  }
  public lockAllDisabledToTrue(status: boolean = true){
    this.allDisabledIsLockedToTrue= status
    this.schemaModel.schemaList.forEach(schema => schema.configs.inputProps.disabled= status)
    this.forceLeggoFormRender()
  }
}


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
LeggoForm.useLeggo = (schemaModel0?: TSchemaModel, middleware?: TMiddleware, publicStates?: object): Leggo => {
  let leggo= null
  const keyRef= useRef(null)
  const [ , setForceRender]= useState(0)
  if (!leggoStores.has(keyRef)) {
    leggo= new Leggo(keyRef, setForceRender, schemaModel0, middleware, publicStates)
    leggoStores.set(keyRef, leggo) 
  }
  return leggo || leggoStores.get(keyRef)
}


function LeggoItem(props: React.PropsWithoutRef<{
  leggo: Leggo,
  schema: TSchema,
  schemaList: TSchema[],
}>){
  const { leggo, schema, schemaList }= props
  const { type, configs, needDefineGetterProps }= schema
  const { itemProps, inputProps, extra, postman, Successor, SuperSuccessor } = configs
  const postmanParamsValueList = postman?.params?.map(item => item.value) || []
  const postmanDataValueList= postman?.data?.map(item => item.value) || []
  const StandardInput = leggoItemStore.total[type]?.StandardInput || (() => <div />)
  const rules = Leggo.createRules(itemProps.rules, extra?.wordsLimit)
  const children= Leggo.createChildren(extra?.childrenNode)
  const [ , setForceRender] = useState(0)
  
  useMemo(() => {
    schema.forceLeggoFormItemRender= () => setForceRender(pre => pre+1)
    Object.values(needDefineGetterProps).forEach(getterInfo => {
      const { observedStringedName, namepath, publicStateKey, reference, rule } = getterInfo
      const isFromPublicStates= observedStringedName === 'publicStates'
      const linkedSchema= schemaList.find(schema => schema.getStringedName() === observedStringedName)
      //@ts-ignore
      const targetProp= namepath.slice(0, -1).reduce((pre, cur) => pre[cur], configs)
      const targetKey= namepath.slice(-1)[0]
      const targetType= typeof targetProp[targetKey]
      !isFromPublicStates && linkedSchema.linkingStringedNames.add(schema.getStringedName())
      Reflect.defineProperty(targetProp, targetKey, {
        set: () => null,
        get: () => {
          if(targetKey === 'disabled' && leggo.allDisabledIsLockedToTrue){ return true }
          let targetValue= linkedSchema?.currentItemValue
          if (isFromPublicStates) {
            // @ts-ignore
            const publicState = leggo.publicStates[publicStateKey]
            targetValue= (typeof publicState === 'function') ? publicState() : publicState
          }
          if(reference && rule){
            targetValue= targetValue?.toString()
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
              case '!==':
                targetValue= targetValue !== reference
                break;
              case '>=':
                targetValue= targetValue >= reference
                break;
              case '>':
                targetValue= targetValue > reference
            }
          }else{
            switch(targetType){
              case 'boolean':
                targetValue= Boolean(targetValue)
                break;
              case 'number':
                targetValue= Number(targetValue)
                break;
              case 'string':
                targetValue= targetValue?.toString()
            }
          }
          return rule === '!' ? !targetValue : targetValue
        }
      }) 
    })
  }, [])

  useEffect(() => {
    const { method, url, params, data, responseNamepath }= postman || {}
    if(method && url){
      const paramsParsed = params?.reduce((pre, cur) => {
        //@ts-ignore
        pre[cur.key]= cur.value === '' ? undefined : cur.value
        return pre
      }, {})
      const dataParsed= data?.reduce((pre, cur) => {
        //@ts-ignore
        pre[cur.key]= cur.value
        return pre
      }, {})
      axios({ method, url, params: paramsParsed, data: dataParsed })
      .then(res => {
        //@ts-ignore
        const targetValue= responseNamepath.split('.').slice(1).reduce((pre, cur) => pre?.[cur], res)
        configs.inputProps.options= targetValue
        setForceRender(pre => pre+1)
      })
    }
  }, [...postmanParamsValueList, ...postmanDataValueList])

  return (
    SuperSuccessor ? <SuperSuccessor /> :
      Successor ?
        <Form.Item label={itemProps.label} required={rules?.[0]?.required}>
          <Successor>
            <Form.Item {...itemProps} rules={rules} noStyle={true}>
              <StandardInput {...inputProps}>{children}</StandardInput>
            </Form.Item>
          </Successor>
        </Form.Item>
        :
        <Form.Item {...itemProps} rules={rules}>
          <StandardInput {...inputProps}>{children}</StandardInput>
        </Form.Item>
  )
}

