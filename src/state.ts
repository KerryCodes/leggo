import React from "react"
import { FormItemProps, FormProps } from "antd"
import { formItemsLib } from "./formItemsLib"


export type TSchemaType= keyof typeof formItemsLib

export interface TSetting{
  itemProps: FormItemProps<any>,
  inputProps: any,
  customizedFormItem?: JSX.Element,
}

export interface TFormItems{
  type: TSchemaType,
  setting: TSetting,
  FormItemComponent: React.FC<any>,
}

export interface TSchemaInfo{
  id: string,
  type: TSchemaType,
  setting: TSetting,
  forceLeggoFormItemRender?: () => void,
  standardFormItem?: JSX.Element,
}


export interface TFormLayout{
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}


export interface TSchemasModel{
  name: string,
  description: string,
  formProps: FormProps,
  schemas: TSchemaInfo[],
}


export type TPostSchemaModel= (schemasModel: TSchemasModel) => void