import { Form } from "antd"
import axios from "axios"
import React, { useEffect, useMemo, useState } from "react"
import { TSchema } from "../interface"
import { leggoItemStore } from "../itemStore"
import { Leggo } from "../utils/Leggo"


export default function LeggoItem(props: React.PropsWithoutRef<{
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
            return (typeof publicState === 'function') ? publicState() : publicState
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
  }, [leggo.forceRenderMark])

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