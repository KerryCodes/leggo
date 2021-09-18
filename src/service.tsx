import React from "react"
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Switch, Upload } from "antd"
import { UploadOutlined } from '@ant-design/icons'
import { TLeggoItemInfo, TLinkedInfo, TSchema, TSchemaType, TConfigs } from "./interface"
import { cloneDeep } from "lodash"
import { Leggo } from "./engine"


export class LeggoSchema implements TSchema{
  id: string
  type: TSchemaType
  configs: TConfigs
  currentItemValue: any
  needDefineGetterProps: { [namepath: string]: TLinkedInfo }
  constructor(schemaType: TSchemaType, leggoItemInfo: TLeggoItemInfo){
    this.id= Date.now().toString()
    this.type= schemaType
    this.configs= cloneDeep(leggoItemInfo).configs
    this.currentItemValue= null
    this.needDefineGetterProps= {}
  }
  public getName= () => this.configs.itemProps.name as string
}


export function StandardFormItem(props:React.PropsWithoutRef<{StandardInput: any, configs: TConfigs}>){
  const { StandardInput, configs }= props
  const { itemProps, inputProps, extra }= configs
  return (
    <Form.Item {...itemProps} rules={Leggo.createRules(itemProps.rules, extra?.wordsLimit)}>
      <StandardInput {...inputProps}>{Leggo.createChildren(extra?.childrenNode)}</StandardInput>
    </Form.Item>
  )
}


const antdItemStore:{[key: string]: TLeggoItemInfo}= {
  input: {
    type: 'input',
    configs: {
      itemProps: {
        name: 'input',
        label: '标题',
        colon: true,
        rules: [{ required: true, message: '请输入标题！' }],
      },
      inputProps: {
        disabled: false,
        placeholder: '请输入',
      },
      extra: {
        wordsLimit: {
          max: 10,
          min: 0,
          message: '输入字符数需要在0～10之间！',
          rules: {
            zh: 1, 
            others: 1, 
            blank: true,
          }
        }
      }
    },
    StandardInput: Input,
  },
  inputTexArea: {
    type: 'inputTexArea',
    configs: {
      itemProps: {
        name: 'inputTexArea',
        label: '多行文本',
        colon: true,
        rules: [{ required: true, message: '请输入文本！' }],
      },
      inputProps: {
        disabled: false,
        placeholder: '请输入',
        rows: 4,
      },
      extra: {
        wordsLimit: {
          max: 10,
          min: 0,
          message: '输入字符数需要在0～10之间！',
          rules: {
            zh: 1, 
            others: 1, 
            blank: true,
          }
        }
      }
    },
    StandardInput: Input.TextArea,
  },
  inputPassword: {
    type: 'inputPassword',
    configs: {
      itemProps: {
        name: 'inputPassword',
        label: '密码',
        colon: true,
        rules: [{ required: true, message: '请输入密码！' }],
      },
      inputProps: {
        disabled: false,
        placeholder: '请输入',
      },
    },
    StandardInput: Input.Password,
  },
  inputNumber: {
    type: 'inputNumber',
    configs: {
      itemProps: {
        name: 'inputNumber',
        label: '数字',
        colon: true,
        rules: [{ required: true, message: '请输入数字！' }],
      },
      inputProps: {
        disabled: false,
        placeholder: '请输入',
        max: 10,
        min: 0,
        bordered: true,
      },
    },
    StandardInput: InputNumber,
  },
  select: {
    type: 'select',
    configs: {
      itemProps: {
        name: 'select',
        label: '选项',
        colon: true,
        rules: [{ required: true, message: '请选择！' }],
      },
      inputProps: {
        disabled: false,
        placeholder: '请选择',
        options: [{label: 'A', value: 1}, {label: 'B', value: 2}],
      },
    },
    StandardInput: Select,
  },
  checkboxGroup: {
    type: 'checkboxGroup',
    configs: {
      itemProps: {
        name: 'checkboxGroup',
        label: '多选',
        colon: true,
        rules: [{ required: true, message: '请选择！' }],
      },
      inputProps: {
        disabled: false,
        options: [{label: 'A', value: 1}, {label: 'B', value: 2}],
      },
    },
    StandardInput: Checkbox.Group,
  },
  radioGroup: {
    type: 'radioGroup',
    configs: {
      itemProps: {
        name: 'radioGroup',
        label: '单选',
        colon: true,
        rules: [{ required: true, message: '请选择！' }],
      },
      inputProps: {
        disabled: false,
        options: [{label: 'A', value: 1}, {label: 'B', value: 2}],
      },
    },
    StandardInput: Radio.Group,
  },
  datePicker: {
    type: 'datePicker',
    configs: {
      itemProps: {
        name: 'datePicker',
        label: '日期',
        colon: true,
        rules: [{ required: true, message: '请选择日期！' }],
      },
      inputProps: {
        disabled: false,
        placeholder: '请选择',
        picker: 'date',
      },
    },
    StandardInput: DatePicker,
  },
  rangePicker: {
    type: 'rangePicker',
    configs: {
      itemProps: {
        name: 'rangePicker',
        label: '日期',
        colon: true,
        rules: [{ required: true, message: '请选择日期！' }],
      },
      inputProps: {
        disabled: false,
        picker: 'day',
      },
    },
    StandardInput: DatePicker.RangePicker,
  },
  upload: {
    type: 'upload',
    configs: {
      itemProps: {
        name: 'upload',
        label: '上传',
        valuePropName: 'fileList',
        colon: true,
        rules: [{ required: true, message: '请上传！' }],
      },
      inputProps: {
        disabled: false,
        listType: "picture",
        action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
        showUploadList: false,
      },
      extra:{
        childrenNode: () => <Button icon={<UploadOutlined />}>Click to Upload</Button>
      }
    },
    StandardInput: Upload,
  },
  switch: {
    type: 'switch',
    configs: {
      itemProps: {
        name: 'switch',
        label: '开关',
        valuePropName: 'checked',
        colon: true,
        rules: [{ required: false, message: '' }],
      },
      inputProps: {
        disabled: false,
      },
    },
    StandardInput: Switch,
  },
  empty: {
    type: 'empty',
    configs: {
      itemProps: {
        name: 'empty',
        label: '占位表单',
        colon: true,
        rules: [{ required: true }],
      },
      inputProps: {
        disabled: false,
      },
    },
    StandardInput: () => <div>占位表单仅作为表单结构的一部分，表单实际渲染前将被中间件识别并替换！</div>,
  },
  submit: {
    type: 'submit',
    configs: {
      itemProps: {
        wrapperCol: { offset: 8, span: 16 },
      },
      inputProps: {
        disabled: false,
        type: "primary",
        htmlType: "submit",
      },
      extra: {
        childrenNode: 'Submit'
      }
    },
    StandardInput: Button,
  }
}


export const leggoItemStore= {
  total: {...antdItemStore},
  antd: antdItemStore,
}