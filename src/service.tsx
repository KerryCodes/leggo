import React from "react"
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Switch, Upload } from "antd"
import { UploadOutlined } from '@ant-design/icons'
import { TLeggoItemInfo, TLinkedInfo, TSchema, TSchemaType, TConfigs } from "./interface"
import { cloneDeep } from "lodash"
import { wordsLimitValidator } from "./utils"


export class LeggoSchema implements TSchema{
  id: string
  type: TSchemaType
  configs: TConfigs
  currentFormItemValue: any
  needDefineGetterProps: { [namepath: string]: TLinkedInfo }
  constructor(schemaType: TSchemaType, leggoItemInfo: TLeggoItemInfo){
    this.id= Date.now().toString()
    this.type= schemaType
    this.configs= cloneDeep(leggoItemInfo).configs
    this.currentFormItemValue= null
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
    StandardItemFC: ({ itemProps, inputProps, extra }: React.PropsWithoutRef<TConfigs>) => 
      <Form.Item {...itemProps} rules={[ ...itemProps.rules, {validator: wordsLimitValidator.bind(null, extra.wordsLimit)} ]}>
        <Input {...inputProps}  />
      </Form.Item>,
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
    StandardItemFC: ({ itemProps, inputProps, extra }: React.PropsWithoutRef<TConfigs>) => 
      <Form.Item {...itemProps} rules={[ ...itemProps.rules, {validator: wordsLimitValidator.bind(null, extra.wordsLimit)} ]}>
        <Input.TextArea {...inputProps}  />
      </Form.Item>,
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
    StandardItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<TConfigs>) => 
      <Form.Item {...itemProps}>
        <Input.Password {...inputProps} />
      </Form.Item>,
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
    StandardItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<TConfigs>) => 
      <Form.Item {...itemProps}>
        <InputNumber {...inputProps} />
      </Form.Item>,
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
    StandardItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<TConfigs>) => 
      <Form.Item {...itemProps}>
        <Select {...inputProps} />
      </Form.Item>,
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
    StandardItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<TConfigs>) => 
      <Form.Item {...itemProps}>
        <Checkbox.Group {...inputProps} />
      </Form.Item>,
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
    StandardItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<TConfigs>) => 
      <Form.Item {...itemProps}>
        <Radio.Group {...inputProps} />
      </Form.Item>,
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
    StandardItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<TConfigs>) => 
      <Form.Item {...itemProps}>
        <DatePicker {...inputProps} />
      </Form.Item>,
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
    StandardItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<TConfigs>) => 
      <Form.Item {...itemProps}>
        <DatePicker.RangePicker {...inputProps} />
      </Form.Item>,
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
    },
    StandardItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<TConfigs>) => 
      <Form.Item {...itemProps}>
        <Upload {...inputProps}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>,
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
    StandardItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<TConfigs>) => 
      <Form.Item {...itemProps}>
        <Switch {...inputProps} />
      </Form.Item>,
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
    StandardItemFC: ({ itemProps }: React.PropsWithoutRef<TConfigs>) => 
      <Form.Item {...itemProps}>
        <div>占位表单仅作为表单结构的一部分，表单实际渲染前将被中间件识别并替换！</div>
      </Form.Item>,
  },
  submit: {
    type: 'submit',
    configs: {
      itemProps: {
        name: 'submit',
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
    StandardItemFC: ({ itemProps, inputProps, extra }: React.PropsWithoutRef<TConfigs>) => 
      <Form.Item {...itemProps}>
        <Button {...inputProps}>{extra.buttonText}</Button>
      </Form.Item>,
  }
}


export const leggoItemStore= {
  total: {...antdItemStore},
  antd: antdItemStore,
}