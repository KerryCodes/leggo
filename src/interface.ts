import React from "react"
import { FormItemProps, FormProps } from "antd"
import { leggoItemStore } from "./service"


export type TSchemaType= keyof typeof leggoItemStore.total

export interface TItemStore{
  storeName: string,
  store: {
    [key: string]: TLeggoItemInfo,
  }
}

export interface TLeggoItemInfo{
  type: TSchemaType,
  configs: TConfigs,
  StandardItemFC: React.FC<TConfigs>,
}

export interface TSchema{
  id: string,
  type: TSchemaType,
  configs: TConfigs,
  currentItemValue: any,
  needDefineGetterProps: { [namepath: string]: TLinkedInfo },
  linkingNames?: Set<string>,
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
  CustomizedItemFC?: React.FC<React.PropsWithChildren<any>>,
}

export interface TExtra{
  wordsLimit: {
    max: number,
    min: number,
    message: string,
    rules: {
      zh: number, 
      others: number, 
      blank: boolean,
    }
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
  publicStateKey?: string,
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

export interface TSchemaModel{
  name: string,
  description: string,
  formProps: FormProps,
  schemaList: TSchema[],
}

export type TPostSchemaModel= (schemaModel: TSchemaModel) => void

export type TMiddleware= (value: TSchema, index: number, array: TSchema[]) => void