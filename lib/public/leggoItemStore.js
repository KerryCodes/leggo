"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leggoItemStore = void 0;
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
exports.leggoItemStore = {
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
        FormItemComponent: ({ setting }) => react_1.default.createElement(antd_1.Form.Item, { ...setting.itemProps },
            react_1.default.createElement(antd_1.Input, { ...setting.inputProps })),
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
        FormItemComponent: ({ setting }) => react_1.default.createElement(antd_1.Form.Item, { ...setting.itemProps },
            react_1.default.createElement(antd_1.Input.TextArea, { ...setting.inputProps })),
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
        FormItemComponent: ({ setting }) => react_1.default.createElement(antd_1.Form.Item, { ...setting.itemProps },
            react_1.default.createElement(antd_1.Input.Password, { ...setting.inputProps })),
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
        FormItemComponent: ({ setting }) => react_1.default.createElement(antd_1.Form.Item, { ...setting.itemProps },
            react_1.default.createElement(antd_1.InputNumber, { ...setting.inputProps })),
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
        FormItemComponent: ({ setting }) => react_1.default.createElement(antd_1.Form.Item, { ...setting.itemProps },
            react_1.default.createElement(antd_1.Select, { ...setting.inputProps })),
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
        FormItemComponent: ({ setting }) => react_1.default.createElement(antd_1.Form.Item, { ...setting.itemProps },
            react_1.default.createElement(antd_1.Checkbox.Group, { ...setting.inputProps })),
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
        FormItemComponent: ({ setting }) => react_1.default.createElement(antd_1.Form.Item, { ...setting.itemProps },
            react_1.default.createElement(antd_1.Radio.Group, { ...setting.inputProps })),
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
        FormItemComponent: ({ setting }) => react_1.default.createElement(antd_1.Form.Item, { ...setting.itemProps },
            react_1.default.createElement(antd_1.DatePicker, { ...setting.inputProps })),
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
        FormItemComponent: ({ setting }) => react_1.default.createElement(antd_1.Form.Item, { ...setting.itemProps },
            react_1.default.createElement(antd_1.DatePicker.RangePicker, { ...setting.inputProps })),
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
        FormItemComponent: ({ setting }) => react_1.default.createElement(antd_1.Form.Item, { ...setting.itemProps },
            react_1.default.createElement(antd_1.Upload, { ...setting.inputProps },
                react_1.default.createElement(antd_1.Button, { icon: react_1.default.createElement(icons_1.UploadOutlined, null) }, "Click to Upload"))),
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
        FormItemComponent: ({ setting }) => react_1.default.createElement(antd_1.Form.Item, { ...setting.itemProps },
            react_1.default.createElement(antd_1.Switch, { ...setting.inputProps })),
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
        FormItemComponent: ({ setting }) => react_1.default.createElement(antd_1.Form.Item, { ...setting.itemProps },
            react_1.default.createElement(antd_1.Button, { ...setting.inputProps }, "Submit")),
    }
};
//# sourceMappingURL=leggoItemStore.js.map