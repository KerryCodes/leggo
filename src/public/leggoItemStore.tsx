import React, { useState } from "react"
import '../styles/public.less'
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Radio, RadioChangeEvent, Select, Switch, Upload } from "antd"
import { UploadOutlined, PlusOutlined } from '@ant-design/icons'
import { TFormItemComponentProps, TLeggoItem } from "./interface"


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
    FormItemComponent: ({ setting }: TFormItemComponentProps) => 
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
    FormItemComponent: ({ setting }: TFormItemComponentProps) => 
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
    FormItemComponent: ({ setting }: TFormItemComponentProps) => 
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
    FormItemComponent: ({ setting }: TFormItemComponentProps) => 
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
        options: [{label: 'A', value: 1}, {label: 'B', value: 2}],
      },
    },
    FormItemComponent: ({ setting }: TFormItemComponentProps) => 
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
        options: [{label: 'A', value: 1}, {label: 'B', value: 2}],
      },
    },
    FormItemComponent: ({ setting }: TFormItemComponentProps) => 
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
        options: [{label: 'A', value: 1}, {label: 'B', value: 2}],
      },
    },
    FormItemComponent: ({ setting }: TFormItemComponentProps) => 
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
    FormItemComponent: ({ setting }: TFormItemComponentProps) => 
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
    FormItemComponent: ({ setting }: TFormItemComponentProps) => 
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
    FormItemComponent: ({ setting }: TFormItemComponentProps) => 
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
    FormItemComponent: ({ setting }: TFormItemComponentProps) => 
      <Form.Item {...setting.itemProps}>
        <Switch {...setting.inputProps} />
      </Form.Item>,
  },
  multiCover: {
    type: 'multiCover',
    setting: {
      itemProps: {
        label: ' 封面图',
        name: 'cover_type',
        colon: true,
        rules: [{ required: true, message: '请上传封面图！' }],
      },
      inputProps: {
        disabled: false,
      },
    },
    FormItemComponent: ({ setting }: TFormItemComponentProps) => 
      <Form.Item {...setting.itemProps}>
        <MultiCover {...setting.inputProps} />
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
    FormItemComponent: ({ setting }: TFormItemComponentProps) => 
      <Form.Item {...setting.itemProps}>
        <Button {...setting.inputProps}>Submit</Button>
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
          dataList.map((src, index) => 
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