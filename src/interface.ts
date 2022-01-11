import React from "react"
import { FormItemProps, FormProps } from "antd"
import { leggoItemStore } from "./itemStore"


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
  linkingStringedNames?: Set<string>,
  getStringedName: () => string,
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

export interface TConfigsContextValue{
  activeSchema: React.MutableRefObject<TSchema>,
  schemaList: TSchema[],
  schemaListOptions: TOption[],
  setSchemaList: React.Dispatch<React.SetStateAction<TSchema[]>>,
  onGetSchemaModel: TOnGetSchemaModel,
  forceRender: () => void,
}

export interface TExtra{
  childrenNode: any,
  mark: string,
  wordsLimit: TWordsLimit,
}

export interface TWordsLimit {
  max: number,
  min: number,
  message: string,
  rules: {
    zh: number, 
    others: number, 
    blank: boolean,
  }
}

export interface TLinkedInfo{
  observedStringedName: string,
  publicStateKey?: string,
  namepath: (string | number)[],
  reference: string | number,
  rule: '!' | '<' | '<=' | '===' | '!==' | '>=' | '>',
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

export type TOnGetSchemaModel= (schemaModel: TSchemaModel) => void

export type TMiddleware= (value: TConfigs, index: number) => void