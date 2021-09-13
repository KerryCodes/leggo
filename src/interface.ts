import React from "react"
import { FormItemProps, FormProps } from "antd"
import { leggoItemStore } from "./service"


export type TSchemaType= keyof typeof leggoItemStore

export interface TLeggoItemInfo{
  type: TSchemaType,
  configs: TConfigs,
  StandardFormItemFC: React.FC<TConfigs>,
}

export interface TSchema{
  id: string,
  type: TSchemaType,
  configs: TConfigs,
  currentFormItemValue: any,
  linkingNames: Set<string>,
  needDefineGetterMap: Map<string, TLinkedInfo>,
  standardFormItem?: JSX.Element,
  getName: () => string,
  forceLeggoFormItemRender?: () => void,
}

export interface TConfigs{
  itemProps: FormItemProps<any>,
  inputProps: TInputProps,
  extra?: Partial<TExtra>,
  postman?: {
    propName: 'options',
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    params: TParam[],
    data: TParam[],
  },
  customizedFormItem?: JSX.Element,
}

export interface TExtra{
  wordsLimit: {
    max: 10,
    min: 0,
    message: '输入字符数需要在0～10之间！',
  },
  buttonText: string,
}

export interface TInputProps{
  disabled: boolean,
  placeholder?: any,
  rows?: number,
  max?: number,
  min?: number,
  bordered?: boolean,
  options?: { label: string, value: string | number }[],
  picker?: any,
  listType?: "text" | "picture" | "picture-card",
  action?: string,
  showUploadList?: boolean,
  type?: any,
  htmlType?: "submit" | "button" | "reset",
}

export interface TLinkedInfo{
  observedName: string,
  namepath: (string | number)[],
  reference: string | number,
  rule: '<' | '<=' | '===' | '>=' | '>',
}

export interface TParam{
  key: string,
  value: string,
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