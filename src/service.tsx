import React, { useState } from "react"
import './styles/public.less'
import { Button, Checkbox, DatePicker, Form, FormItemProps, Input, InputNumber, Radio, RadioChangeEvent, Select, Switch, Upload } from "antd"
import { UploadOutlined, PlusOutlined } from '@ant-design/icons'
import { TLeggoItemInfo, TLinkedInfo, TSchema, TSchemaType, TConfigs, TInputProps } from "./interface"
import { cloneDeep } from "lodash"


export class LeggoSchema implements TSchema{
  id: string
  type: TSchemaType
  configs: TConfigs
  currentFormItemValue: any
  linkingNames: Set<string>
  needDefineGetterMap: Map<string, TLinkedInfo>
  constructor(schemaType: TSchemaType, leggoItemInfo: TLeggoItemInfo){
    this.id= Date.now().toString()
    this.type= schemaType
    this.configs= cloneDeep(leggoItemInfo).configs
    this.currentFormItemValue= null
    this.linkingNames= new Set()
    this.needDefineGetterMap= new Map()
  }
  public getName= () => this.configs.itemProps.name as string
}


export const leggoItemStore:{[key: string]: TLeggoItemInfo}= {
  input: {
    type: 'input',
    configs: {
      itemProps: {
        name: 'input',
        label: '标题',
        colon: true,
        rules: [{ required: true, message: '请输入长标题！' }],
      },
      inputProps: {
        disabled: false,
        placeholder: '请输入',
      },
    },
    StandardFormItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<{itemProps: FormItemProps, inputProps: TInputProps}>) => 
      <Form.Item {...itemProps}>
        <Input {...inputProps} />
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
    },
    StandardFormItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<{itemProps: FormItemProps, inputProps: TInputProps}>) => 
      <Form.Item {...itemProps}>
        <Input.TextArea {...inputProps} />
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
    StandardFormItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<{itemProps: FormItemProps, inputProps: TInputProps}>) => 
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
    StandardFormItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<{itemProps: FormItemProps, inputProps: TInputProps}>) => 
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
    StandardFormItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<{itemProps: FormItemProps, inputProps: TInputProps}>) => 
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
    StandardFormItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<{itemProps: FormItemProps, inputProps: TInputProps}>) => 
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
    StandardFormItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<{itemProps: FormItemProps, inputProps: TInputProps}>) => 
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
        picker: 'month',
      },
    },
    StandardFormItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<{itemProps: FormItemProps, inputProps: TInputProps}>) => 
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
    StandardFormItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<{itemProps: FormItemProps, inputProps: TInputProps}>) => 
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
    StandardFormItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<{itemProps: FormItemProps, inputProps: TInputProps}>) => 
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
    StandardFormItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<{itemProps: FormItemProps, inputProps: TInputProps}>) => 
      <Form.Item {...itemProps}>
        <Switch {...inputProps} />
      </Form.Item>,
  },
  multiCover: {
    type: 'multiCover',
    configs: {
      itemProps: {
        name: 'cover_type',
        label: ' 封面图',
        colon: true,
        rules: [{ required: true, message: '请上传封面图！' }],
      },
      inputProps: {
        disabled: false,
      },
    },
    StandardFormItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<{itemProps: FormItemProps, inputProps: TInputProps}>) => 
      <Form.Item {...itemProps}>
        <MultiCover {...inputProps} />
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
    },
    StandardFormItemFC: ({ itemProps, inputProps }: React.PropsWithoutRef<{itemProps: FormItemProps, inputProps: TInputProps}>) => 
      <Form.Item {...itemProps}>
        <Button {...inputProps}>Submit</Button>
      </Form.Item>,
  }
}



export const MultiCover: React.FC<{disabled: boolean} & { 
  value?: any, 
  onChange?: (value: any) => void 
}>= props => {
  const { disabled, value, onChange }= props
  const [dataList, setDataList]= useState(value?.slice(0, 1) || [''])

  const changePicCount = (e: RadioChangeEvent) => {
    const count= e.target.value
    const newDataList = [...value?.slice(0, count) || [], '', '', '']
    newDataList.length= count
    onChange(newDataList)
    setDataList(newDataList)
  }

  const pickPic= (index: number) => {
    // onChangeCover(index);
    console.log(index);
  }

  return (
    <div className='multi-cover' >
      <Radio.Group defaultValue={1} onChange={changePicCount} disabled={disabled}>
        <Radio value={1}>单图</Radio>
        <Radio value={3}>三图</Radio>
      </Radio.Group>
      <div className='multi-cover-list'>
        {
          disabled && <div className='multi-cover-list-mask'></div>
        }
        {
          dataList.map((src: string, index: number) => 
            <div key={src + index} className='multi-cover-list-item' onClick={() => pickPic(index)}>
              {
                src && <div className='multi-cover-list-item-mask'><span>替换</span></div>
              }
              {
                src ? <img src={src} alt='封面图' width="100%" /> : <PlusOutlined />
              }
            </div>
          )
        }
      </div>
    </div>
  )
}