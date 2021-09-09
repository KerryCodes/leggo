import React from "react"
import { FormItemProps, FormProps } from "antd"
import { leggoItemStore } from "./leggoItemStore"


export type TSchemaType= keyof typeof leggoItemStore


export interface TLeggoItem{
  type: TSchemaType,
  setting: TSetting,
  linking: {
    itemProps: any,
    inputProps: any,
  },
  FormItemComponent: React.FC<any>,
}


export interface TSchema{
  id: string,
  type: TSchemaType,
  currentValue: any,
  setting: TSetting,
  getName: () => string,
  needDefineGetterMap: Map<string, TLinkedValue>,
  linkingNames: Set<string>,
  postman?: {
    propName: 'options',
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    params: TParam[],
  },
  forceLeggoFormItemRender?: () => void,
  standardFormItem?: JSX.Element,
}


export interface TParam{
  key: string,
  value: string,
  linking: TLinkedValue,
}


export interface TSetting{
  itemProps: FormItemProps<any>,
  inputProps: any,
  customizedFormItem?: JSX.Element,
}


export type TFormItemComponentProps= React.PropsWithoutRef<{setting: TSetting}>


export interface TLinkedValue{
  linkedName: string,
  selfName: string,
  namepath: (string|number)[],
  reference: any,
  rule: '<' | '<=' | '===' | '>=' | '>',
}


export interface TFormLayout{
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

export interface TOption{
  label:any, 
  value:any,
}


export interface TSchemasModel{
  name: string,
  description: string,
  formProps: FormProps,
  schemaList: TSchema[],
}


export type TPostSchemaModel= (schemasModel: TSchemasModel) => void