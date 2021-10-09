import React from "react"
import { Button, Cascader, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Slider, Switch, TreeSelect, Upload } from "antd"
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
    const name= this.configs.itemProps.name
    if(name !== undefined){
      this.configs.itemProps.name= name + Math.random().toString(36).substring(2, 5)
    }
  }
  public getStringedName= () => String(this.configs.itemProps.name)
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
    StandardInput: Input,
    configs: {
      itemProps: {
        name: 'input',
        label: '标题',
        initialValue: undefined,
        rules: [{ required: true, message: '请输入标题！' }],
        noStyle: false,
        trigger: 'onChange',
        hidden: false,
      },
      inputProps: {
        disabled: false,
        placeholder: '请输入',
        allowClear: false,
        maxLength: undefined,
        bordered: true,
        id: '',
      },
      extra: {
        wordsLimit: null,
      }
    },
  },
  inputTexArea: {
    type: 'inputTexArea',
    StandardInput: Input.TextArea,
    configs: {
      itemProps: {
        name: 'inputTexArea',
        label: '多行文本',
        initialValue: undefined,
        rules: [{ required: true, message: '请输入文本！' }],
        noStyle: false,
        trigger: 'onChange',
        hidden: false,
      },
      inputProps: {
        disabled: false,
        placeholder: '请输入',
        rows: 4,
        autoSize: false,
        allowClear: false,
        maxLength: undefined,
        showCount: false,
        bordered: true,
      },
      extra: {
        wordsLimit: null,
      }
    },
  },
  inputPassword: {
    type: 'inputPassword',
    StandardInput: Input.Password,
    configs: {
      itemProps: {
        name: 'inputPassword',
        label: '密码',
        initialValue: undefined,
        rules: [{ required: true, message: '请输入密码！' }],
        noStyle: false,
        trigger: 'onChange',
        hidden: false,
      },
      inputProps: {
        disabled: false,
        placeholder: '请输入',
        visibilityToggle: true,
      },
    },
  },
  inputNumber: {
    type: 'inputNumber',
    StandardInput: InputNumber,
    configs: {
      itemProps: {
        name: 'inputNumber',
        label: '数字',
        initialValue: undefined,
        rules: [{ required: true, message: '请输入数字！' }],
        noStyle: false,
        trigger: 'onChange',
        hidden: false,
      },
      inputProps: {
        disabled: false,
        placeholder: '请输入',
        max: undefined,
        min: undefined,
        bordered: true,
        step: '1',
        controls: true,
        decimalSeparator: undefined,
        precision: 0,
        readOnly: false,
        keyboard: true,
        autoFocus: false,
      },
    },
  },
  select: {
    type: 'select',
    StandardInput: Select,
    configs: {
      itemProps: {
        name: 'select',
        label: '选项',
        initialValue: undefined,
        rules: [{ required: true, message: '请选择！' }],
        noStyle: false,
        trigger: 'onChange',
        hidden: false,
      },
      inputProps: {
        disabled: false,
        placeholder: '请选择',
        options: [{ label: 'A', value: 1 }, { label: 'B', value: 2 }],
        bordered: true,
        allowClear: false,
        showArrow: true,
        showSearch: false,
        autoClearSearchValue: true,
        mode: undefined,
        optionFilterProp: 'value',
        filterOption: true,
        defaultActiveFirstOption: true,
        dropdownMatchSelectWidth: true,
        listHeight: 256,
        maxTagCount: undefined,
        maxTagTextLength: undefined,
        defaultOpen: false,
        virtual: true,
        autoFocus: false,
      },
    },
  },
  cascader: {
    type: 'cascader',
    StandardInput: Cascader,
    configs: {
      itemProps: {
        name: 'cascader',
        label: '联级选择',
        initialValue: [],
        rules: [{ required: true, message: '请选择！' }],
        noStyle: false,
        trigger: 'onChange',
        hidden: false,
      },
      inputProps: {
        disabled: false,
        placeholder: '请选择',
        options: [
          {
            label: 'A',
            value: 1,
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    label: 'Zhong Hua Men',
                    value: 'zhonghuamen',
                  },
                ],
              },
            ],
          },
          {
            label: 'B',
            value: 2,
            children: [
              {
                label: 'West Lake',
                value: 'xihu',
              },
            ],
          }],
        allowClear: true,
        showSearch: false,
        bordered: true,
        notFoundContent: '无数据',
        popupPlacement: 'bottomLeft',
        className: '',
        popupClassName: '',
        changeOnSelect: false,
        expandTrigger: 'click',
        autoFocus: false,
      },
    },
  },
  treeSelect: {
    type: 'treeSelect',
    StandardInput: TreeSelect,
    configs: {
      itemProps: {
        name: 'treeSelect',
        label: '树选择',
        initialValue: undefined,
        rules: [{ required: true, message: '请选择！' }],
        noStyle: false,
        trigger: 'onChange',
        hidden: false,
      },
      inputProps: {
        disabled: false,
        placeholder: '请选择',
        treeData: [
          {
            title: 'A',
            value: 1,
            children: [
              {
                title: 'Nanjing',
                value: 'nanjing',
                children: [
                  {
                    title: 'Zhong Hua Men',
                    value: 'zhonghuamen',
                  },
                ],
              },
            ],
          },
          {
            title: 'B',
            value: 2,
            children: [
              {
                title: 'West Lake',
                value: 'xihu',
              },
            ],
          }],
        allowClear: false,
        autoClearSearchValue: true,
        showArrow: true,
        showSearch: false,
        bordered: true,
        multiple: false,
        treeCheckable: false,
        treeCheckStrictly: false,
        treeDefaultExpandAll: false,
        dropdownClassName: '',
        dropdownMatchSelectWidth: true,
        listHeight: 256,
        virtual: true,
      },
    },
  },
  checkboxGroup: {
    type: 'checkboxGroup',
    StandardInput: Checkbox.Group,
    configs: {
      itemProps: {
        name: 'checkboxGroup',
        label: '多选',
        initialValue: [],
        rules: [{ required: true, message: '请选择！' }],
        noStyle: false,
        trigger: 'onChange',
        hidden: false,
      },
      inputProps: {
        disabled: false,
        options: [{ label: 'A', value: 1 }, { label: 'B', value: 2 }],
      },
    },
  },
  checkbox: {
    type: 'checkbox',
    StandardInput: Checkbox,
    configs: {
      itemProps: {
        name: 'checkbox',
        label: '勾选开关',
        valuePropName: 'checked',
        initialValue: false,
        rules: [{ required: true, message: '请选择！' }],
        noStyle: false,
        trigger: 'onChange',
        hidden: false,
      },
      inputProps: {
        disabled: false,
        indeterminate: false,
        autoFocus: false,
      },
    },
  },
  radioGroup: {
    type: 'radioGroup',
    StandardInput: Radio.Group,
    configs: {
      itemProps: {
        name: 'radioGroup',
        label: '单选',
        initialValue: undefined,
        rules: [{ required: true, message: '请选择！' }],
        noStyle: false,
        trigger: 'onChange',
        hidden: false,
      },
      inputProps: {
        disabled: false,
        options: [{ label: 'A', value: 1 }, { label: 'B', value: 2 }],
        autoFocus: false,
        optionType: 'default',
        buttonStyle: 'outline',
      },
    },
  },
  datePicker: {
    type: 'datePicker',
    StandardInput: DatePicker,
    configs: {
      itemProps: {
        name: 'datePicker',
        label: '日期',
        rules: [{ required: true, message: '请选择日期！' }],
        noStyle: false,
        trigger: 'onChange',
        hidden: false,
      },
      inputProps: {
        disabled: false,
        placeholder: '请选择',
        picker: 'date',
        allowClear: true,
        bordered: true,
        showNow: true,
        showTime: false,
        showToday: true,
        className: '',
        dropdownClassName: '',
        inputReadOnly: false,
        autoFocus: false,
      },
    },
  },
  rangePicker: {
    type: 'rangePicker',
    StandardInput: DatePicker.RangePicker,
    configs: {
      itemProps: {
        name: 'rangePicker',
        label: '日期',
        rules: [{ required: true, message: '请选择日期！' }],
        noStyle: false,
        trigger: 'onChange',
        hidden: false,
      },
      inputProps: {
        disabled: false,
        picker: 'day',
        format: ''
      },
    },
  },
  upload: {
    type: 'upload',
    StandardInput: Upload,
    configs: {
      itemProps: {
        name: 'upload',
        label: '上传',
        valuePropName: 'fileList',
        rules: [{ required: true, message: '请上传！' }],
        noStyle: false,
        trigger: 'onChange',
        hidden: false,
      },
      inputProps: {
        disabled: false,
        method: 'post',
        action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
        accept: '',
        listType: "picture",
        showUploadList: true,
        directory: false,
        maxCount: undefined,
        multiple: false,
        name: 'file',
        withCredentials: false,
        openFileDialogOnClick: true,
      },
      extra:{
        childrenNode: () => <Button icon={<UploadOutlined />}>Click to Upload</Button>
      }
    },
  },
  switch: {
    type: 'switch',
    StandardInput: Switch,
    configs: {
      itemProps: {
        name: 'switch',
        label: '开关',
        valuePropName: 'checked',
        initialValue: false,
        rules: [{ required: false, message: '' }],
        noStyle: false,
        trigger: 'onChange',
        hidden: false,
      },
      inputProps: {
        disabled: false,
        className: '',
        autoFocus: false,
      },
    },
  },
  empty: {
    type: 'empty',
    StandardInput: () => <div>占位表单仅作为表单结构的一部分，表单实际渲染前将被中间件识别并替换！</div>,
    configs: {
      itemProps: {
        name: 'empty',
        label: '占位表单',
        initialValue: undefined,
        rules: [{ required: true, message: '' }],
        noStyle: false,
        trigger: 'onChange',
        hidden: false,
      },
      inputProps: {
        disabled: false,
      },
      extra: {
        mark: '',
      }
    },
  },
  submit: {
    type: 'submit',
    StandardInput: Button,
    configs: {
      itemProps: {
        label: '',
        wrapperCol: { offset: 8 },
        noStyle: false,
        hidden: false,
      },
      inputProps: {
        disabled: false,
        type: "primary",
        htmlType: "submit",
        block: false,
        danger: false,
        ghost: false,
        shape: undefined,
      },
      extra: {
        childrenNode: 'Submit'
      }
    },
  },
  slider: {
    type: 'slider',
    StandardInput: Slider,
    configs: {
      itemProps: {
        name: 'slider',
        label: '滑动输入',
        initialValue: undefined,
        rules: [{ required: true, message: '请输入！' }],
        noStyle: false,
        trigger: 'onChange',
        hidden: false,
      },
      inputProps: {
        disabled: false,
        allowClear: false,
        max: 100,
        min: 0,
        dots: false,
        included: true,
        reverse: false,
        step: 1,
        tooltipPlacement: undefined,
        tooltipVisible: false,
        vertical: false,
      },
    },
  }
}


export const leggoItemStore= {
  total: {...antdItemStore},
  antd: antdItemStore,
}