import React from "react"
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Switch, Upload } from "antd"
import { UploadOutlined } from '@ant-design/icons'
import { TLeggoItemInfo, TLinkedInfo, TSchema, TSchemaType, TConfigs, TStandardInputProps } from "./interface"
import { cloneDeep } from "lodash"


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
    StandardItemFC: ({ value, onChange, inputProps }: TStandardInputProps) =>
      <Input value={value} onChange={onChange} {...inputProps} />
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
    StandardItemFC: ({ value, onChange, inputProps }: TStandardInputProps) =>
      <Input.TextArea value={value} onChange={onChange} {...inputProps} />
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
    StandardItemFC: ({ value, onChange, inputProps }: TStandardInputProps) =>
      <Input.Password value={value} onChange={onChange} {...inputProps} />
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
    StandardItemFC: ({ value, onChange, inputProps }: TStandardInputProps) => 
      <InputNumber value={value} onChange={onChange} {...inputProps} />
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
    StandardItemFC: ({ value, onChange, inputProps }: TStandardInputProps) => 
      <Select value={value} onChange={onChange} {...inputProps} />
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
    StandardItemFC: ({ value, onChange, inputProps }: TStandardInputProps) => 
      <Checkbox.Group value={value} onChange={onChange} {...inputProps} />
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
    StandardItemFC: ({ value, onChange, inputProps }: TStandardInputProps) => 
      <Radio.Group value={value} onChange={onChange}{...inputProps} />
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
    StandardItemFC: ({ value, onChange, inputProps }: TStandardInputProps) => 
      <DatePicker value={value} onChange={onChange} {...inputProps} />
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
    StandardItemFC: ({ value, onChange, inputProps }: TStandardInputProps) => 
      <DatePicker.RangePicker value={value} onChange={onChange} {...inputProps} />
  },
  // upload: {
  //   type: 'upload',
  //   configs: {
  //     itemProps: {
  //       name: 'upload',
  //       label: '上传',
  //       valuePropName: 'fileList',
  //       colon: true,
  //       rules: [{ required: true, message: '请上传！' }],
  //     },
  //     inputProps: {
  //       disabled: false,
  //       listType: "picture",
  //       action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  //       showUploadList: false,
  //     },
  //   },
  //   StandardItemFC: ({ value, onChange, inputProps }: TStandardInputProps) => 
  //     <Upload value={value} onChange={onChange} {...inputProps}>
  //       <Button icon={<UploadOutlined />}>Click to Upload</Button>
  //     </Upload>
  // },
  // switch: {
  //   type: 'switch',
  //   configs: {
  //     itemProps: {
  //       name: 'switch',
  //       label: '开关',
  //       valuePropName: 'checked',
  //       colon: true,
  //       rules: [{ required: false, message: '' }],
  //     },
  //     inputProps: {
  //       disabled: false,
  //     },
  //   },
  //   StandardItemFC: ({ value, onChange, inputProps }: TStandardInputProps) => 
  //     <Switch value={value} onChange={onChange} {...inputProps} />
  // },
  // empty: {
  //   type: 'empty',
  //   configs: {
  //     itemProps: {
  //       name: 'empty',
  //       label: '占位表单',
  //       colon: true,
  //       rules: [{ required: true }],
  //     },
  //     inputProps: {
  //       disabled: false,
  //     },
  //   },
  //   StandardItemFC: ({ itemProps }: React.PropsWithoutRef<TConfigs>) => 
  //     <div>占位表单仅作为表单结构的一部分，表单实际渲染前将被中间件识别并替换！</div>
  // },
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
        buttonText: 'Submit'
      }
    },
    StandardItemFC: ({ inputProps, extra }: TStandardInputProps) =>
      <Button {...inputProps}>{extra.buttonText}</Button>
  }
}


export const leggoItemStore= {
  total: {...antdItemStore},
  antd: antdItemStore,
}