import React from "react"
import { Form } from "antd"
import { Leggo } from "../engine"
import { TConfigs } from "../interface"


export function StandardFormItem(props: React.PropsWithoutRef<{
  StandardInput: any, 
  configs: TConfigs
}>){
  const { StandardInput, configs }= props
  const { itemProps, inputProps, extra }= configs

  return (
    <Form.Item {...itemProps} rules={Leggo.createRules(itemProps.rules, extra?.wordsLimit)}>
      <StandardInput {...inputProps}>{Leggo.createChildren(extra?.childrenNode)}</StandardInput>
    </Form.Item>
  )
}