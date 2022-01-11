import React, { useContext, useMemo, useState } from 'react'
import { Input, InputNumber, Select, Space, Switch } from 'antd'
import { ConfigOptions } from './ConfigOptions'
import { LinkSet } from './LinkSet'
import { ConfigsContext } from '../..'


export function ConfigInputProp(props: React.PropsWithoutRef<{
  propOwner: any,
  namepath: (string | number)[],
  propName: string,
  propDefaultValue: any,
}>){
  const { propOwner, namepath, propName, propDefaultValue } = props
  const { forceRender }= useContext(ConfigsContext)
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
        <ConfigOptions handleChangePropValue={handleChangePropValue} />
      )
    case 'boolean':
      return (
        <Space>
          <strong>{propName}：</strong>
          <Switch checked={propCurrentValue} onChange={handleChangePropValue} />
          <LinkSet targetType='boolean' namepath={namepath} />
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
              <Input prefix='"' suffix='"' value={propCurrentValue} onChange={e => handleChangePropValue(e.target.value)} />
          }
        </Space>
      );
    case 'number':
      return (
        <Space>
          <strong>{propName}：</strong>
          <InputNumber value={propCurrentValue} onChange={handleChangePropValue} bordered={false} />
          <LinkSet targetType='number' namepath={namepath} />
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