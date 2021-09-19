import React, { useMemo, useState } from 'react'
import { Input, InputNumber, Select, Space, Switch } from 'antd'
import { ConfigOptions } from './ConfigOptions'
import { TOption, TSchema } from '../../../interface'
import { LinkSet } from './LinkSet'


export function ConfigInputProp(props: React.PropsWithoutRef<{
  propOwner: any,
  namepath: (string | number)[],
  propName: string,
  propDefaultValue: any,
  activeSchema: React.MutableRefObject<TSchema>,
  schemaListOptions: TOption[],
  forceRender: () => void,
}>){
  const { propOwner, namepath, propName, propDefaultValue, activeSchema, schemaListOptions, forceRender } = props
  const [propCurrentValue, setPropCurrentValue]= useState(propDefaultValue)
  //@ts-ignore
  const type= useMemo(() => inputPropsInfo[propName]?.type || typeof propDefaultValue, [])
  //@ts-ignore
  const options= inputPropsInfo[propName]?.options
  const optionsForSelect= useMemo(() => {
    return options?.map((item: string) => ({
      label: item,
      value: item,
    }))
  }, [])

  const handleChangePropValue= (newValue: any) => {
    propOwner[propName]= newValue
    setPropCurrentValue(newValue)
    forceRender()
  }

  switch (type) {
    case 'options':
      return (
        <ConfigOptions activeSchema={activeSchema} schemaListOptions={schemaListOptions} handleChangePropValue={handleChangePropValue} />
      )
    case 'boolean':
      return (
        <Space>
          <strong>{propName}：</strong>
          <Switch checked={propCurrentValue} onChange={handleChangePropValue} />
          <LinkSet activeSchema={activeSchema} targetType='boolean' namepath={namepath} schemaListOptions={schemaListOptions} />
        </Space>
      );
    case 'string':
      return (
        <Space>
          <strong>{propName}：</strong>
          {
            options ?
              <Select allowClear style={{minWidth: 150}} defaultValue={propCurrentValue} options={optionsForSelect} onChange={handleChangePropValue} />
              :
              <Input value={propCurrentValue} onChange={e => handleChangePropValue(e.target.value)} />
          }
        </Space>
      );
    case 'number':
      return (
        <Space>
          <strong>{propName}：</strong>
          <InputNumber value={propCurrentValue} onChange={handleChangePropValue} bordered={false} />
          <LinkSet activeSchema={activeSchema} targetType='number' namepath={namepath} schemaListOptions={schemaListOptions} />
        </Space>
      );
    default:
      return null;
  }
}


export const inputPropsInfo = {
  options: {
    type: 'options',
  },
  maxLength: {
    type: 'number',
  },
  max: {
    type: 'number',
  },
  min: {
    type: 'number',
  },
  decimalSeparator: {
    type: 'string',
  },
  maxTagCount: {
    type: 'number',
  },
  maxTagTextLength: {
    type: 'number',
  },
  mode: {
    type: 'string',
    options: ['multiple', 'tags'],
  },
  optionFilterProp: {
    type: 'string',
    options: ['label', 'value']
  },
  popupPlacement: {
    type: 'string',
    options: ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'],
  },
  expandTrigger: {
    type: 'string',
    options: ['click', 'hover'],
  },
  optionType: {
    type: 'string',
    options: ['default', 'button'],
  },
  buttonStyle: {
    type: 'string',
    options: ['outline', 'solid'],
  },
  picker: {
    type: 'string',
    options: ['time', 'date', 'week', 'month', 'quarter', 'year']
  },
  listType: {
    type: 'string',
    options: ["text", "picture", "picture-card"]
  },
  maxCount: {
    type: 'number',
  },
  type: {
    type: 'string',
    options: ['default', 'primary', 'link', 'text', 'ghost', 'dashed']
  },
  htmlType: {
    type: 'string',
    options: ["submit", "button", "reset"],
  },
  shape: {
    type: 'string',
    options: ['circle', 'round']
  },
  tooltipPlacement: {
    type: 'string',
    options: ['topLeft', 'top', 'topRight', 'leftTop', 'left', 'leftBottom', 'rightTop', 'right', 'rightBottom', 'bottomLeft', 'bottom', 'bottomRight'],
  }
}