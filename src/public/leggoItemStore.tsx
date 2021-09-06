import React from "react"
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Switch, Upload } from "antd"
import { UploadOutlined } from '@ant-design/icons'
import { TLeggoItem, TSetting } from "./interface"


export const leggoItemStore:{[key: string]: TLeggoItem}= {
  input: {
    type: 'input',
    setting: {
      itemProps: {
        label: '标题',
        name: 'input',
        colon: true,
        rules: [{ required: true, message: '请输入长标题！' }],
      },
      inputProps: {
        disabled: false,
        placeholder: '请输入',
      },
    },
    FormItemComponent: ({ setting }: React.PropsWithoutRef<{setting: TSetting}>) => 
      <Form.Item {...setting.itemProps}>
        <Input {...setting.inputProps} />
      </Form.Item>,
  },
  inputTexArea: {
    type: 'inputTexArea',
    setting: {
      itemProps: {
        label: '多行文本',
        name: 'inputTexArea',
        colon: true,
        rules: [{ required: true, message: '请输入文本！' }],
      },
      inputProps: {
        disabled: false,
        placeholder: '请输入',
        rows: 4,
      },
    },
    FormItemComponent: ({ setting }: React.PropsWithoutRef<{setting: TSetting}>) => 
      <Form.Item {...setting.itemProps}>
        <Input.TextArea {...setting.inputProps} />
      </Form.Item>,
  },
  inputPassword: {
    type: 'inputPassword',
    setting: {
      itemProps: {
        label: '密码',
        name: 'inputPassword',
        colon: true,
        rules: [{ required: true, message: '请输入密码！' }],
      },
      inputProps: {
        disabled: false,
        placeholder: '',
      },
    },
    FormItemComponent: ({ setting }: React.PropsWithoutRef<{setting: TSetting}>) => 
      <Form.Item {...setting.itemProps}>
        <Input.Password {...setting.inputProps} />
      </Form.Item>,
  },
  inputNumber: {
    type: 'inputNumber',
    setting: {
      itemProps: {
        label: '数字',
        name: 'inputNumber',
        colon: true,
        rules: [{ required: true, message: '请输入数字！' }],
      },
      inputProps: {
        disabled: false,
        placeholder: '请输入',
        max: 10,
        min: 0,
      },
    },
    FormItemComponent: ({ setting }: React.PropsWithoutRef<{setting: TSetting}>) => 
      <Form.Item {...setting.itemProps}>
        <InputNumber {...setting.inputProps} />
      </Form.Item>,
  },
  select: {
    type: 'select',
    setting: {
      itemProps: {
        label: '选项',
        name: 'select',
        colon: true,
        rules: [{ required: true, message: '请选择！' }],
      },
      inputProps: {
        disabled: false,
        placeholder: '请选择',
      },
    },
    FormItemComponent: ({ setting }: React.PropsWithoutRef<{setting: TSetting}>) => 
      <Form.Item {...setting.itemProps}>
        <Select {...setting.inputProps} />
      </Form.Item>,
  },
  checkboxGroup: {
    type: 'checkboxGroup',
    setting: {
      itemProps: {
        label: '多选',
        name: 'checkboxGroup',
        colon: true,
        rules: [{ required: true, message: '请选择！' }],
      },
      inputProps: {
        disabled: false,
        placeholder: '请选择',
        options: [''],
      },
    },
    FormItemComponent: ({ setting }: React.PropsWithoutRef<{setting: TSetting}>) => 
      <Form.Item {...setting.itemProps}>
        <Checkbox.Group {...setting.inputProps} />
      </Form.Item>,
  },
  radioGroup: {
    type: 'radioGroup',
    setting: {
      itemProps: {
        label: '单选',
        name: 'radioGroup',
        colon: true,
        rules: [{ required: true, message: '请选择！' }],
      },
      inputProps: {
        disabled: false,
        placeholder: '请选择',
        options: [''],
      },
    },
    FormItemComponent: ({ setting }: React.PropsWithoutRef<{setting: TSetting}>) => 
      <Form.Item {...setting.itemProps}>
        <Radio.Group {...setting.inputProps} />
      </Form.Item>,
  },
  datePicker: {
    type: 'datePicker',
    setting: {
      itemProps: {
        label: '日期',
        name: 'datePicker',
        colon: true,
        rules: [{ required: true, message: '请选择日期！' }],
      },
      inputProps: {
        disabled: false,
        placeholder: '请选择',
        picker: 'month',
      },
    },
    FormItemComponent: ({ setting }: React.PropsWithoutRef<{setting: TSetting}>) => 
      <Form.Item {...setting.itemProps}>
        <DatePicker {...setting.inputProps} />
      </Form.Item>,
  },
  rangePicker: {
    type: 'rangePicker',
    setting: {
      itemProps: {
        label: '日期',
        name: 'rangePicker',
        colon: true,
        rules: [{ required: true, message: '请选择日期！' }],
      },
      inputProps: {
        disabled: false,
        picker: 'day',
      },
    },
    FormItemComponent: ({ setting }: React.PropsWithoutRef<{setting: TSetting}>) => 
      <Form.Item {...setting.itemProps}>
        <DatePicker.RangePicker {...setting.inputProps} />
      </Form.Item>,
  },
  upload: {
    type: 'upload',
    setting: {
      itemProps: {
        label: '上传',
        name: 'upload',
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
    FormItemComponent: ({ setting }: React.PropsWithoutRef<{setting: TSetting}>) => 
      <Form.Item {...setting.itemProps}>
        <Upload {...setting.inputProps}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>,
  },
  switch: {
    type: 'switch',
    setting: {
      itemProps: {
        label: '开关',
        name: 'switch',
        valuePropName: 'checked',
        colon: true,
        rules: [{ required: false, message: '' }],
      },
      inputProps: {
        disabled: false,
      },
    },
    FormItemComponent: ({ setting }: React.PropsWithoutRef<{setting: TSetting}>) => 
      <Form.Item {...setting.itemProps}>
        <Switch {...setting.inputProps} />
      </Form.Item>,
  },
  submit: {
    type: 'submit',
    setting: {
      itemProps: {
        name: 'submit',
        wrapperCol: { offset: 8, span: 16 },
      },
      inputProps: {
        disabled: false,
        type: "primary",
        htmlType: "submit",
      },
    },
    FormItemComponent: ({ setting }: React.PropsWithoutRef<{setting: TSetting}>) => 
      <Form.Item {...setting.itemProps}>
        <Button {...setting.inputProps}>Submit</Button>
      </Form.Item>,
  }
}