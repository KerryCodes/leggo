import React from "react"
import { FormItemProps, FormProps } from "antd"
import { leggoItemStore } from "./service"


export type TSchemaType= keyof typeof leggoItemStore.total

export interface TItemStore{
  storeName: string,
  store: Record<string, TLeggoItemInfo>,
}

export interface TLeggoItemInfo{
  type: TSchemaType,
  configs: TConfigs,
  StandardInput: any,
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
  inputProps: any,
  extra?: Partial<TExtra>,
  postman?: {
    propName: 'options',
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    params: TParam[],
    data: TParam[],
    responseNamepath: string,
  },
  Successor?: React.FC<React.PropsWithChildren<any>>,
  SuperSuccessor?: React.FC<React.PropsWithoutRef<any>>,
}

export interface TExtra{
  childrenNode: any,
  mark: string,
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

export type TMiddleware= (value: TConfigs, index: number) => void