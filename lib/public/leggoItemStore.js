var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from "react";
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Switch, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
export var leggoItemStore = {
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
        FormItemComponent: function (_a) {
            var setting = _a.setting;
            return React.createElement(Form.Item, __assign({}, setting.itemProps),
                React.createElement(Input, __assign({}, setting.inputProps)));
        },
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
        FormItemComponent: function (_a) {
            var setting = _a.setting;
            return React.createElement(Form.Item, __assign({}, setting.itemProps),
                React.createElement(Input.TextArea, __assign({}, setting.inputProps)));
        },
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
        FormItemComponent: function (_a) {
            var setting = _a.setting;
            return React.createElement(Form.Item, __assign({}, setting.itemProps),
                React.createElement(Input.Password, __assign({}, setting.inputProps)));
        },
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
        FormItemComponent: function (_a) {
            var setting = _a.setting;
            return React.createElement(Form.Item, __assign({}, setting.itemProps),
                React.createElement(InputNumber, __assign({}, setting.inputProps)));
        },
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
        FormItemComponent: function (_a) {
            var setting = _a.setting;
            return React.createElement(Form.Item, __assign({}, setting.itemProps),
                React.createElement(Select, __assign({}, setting.inputProps)));
        },
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
        FormItemComponent: function (_a) {
            var setting = _a.setting;
            return React.createElement(Form.Item, __assign({}, setting.itemProps),
                React.createElement(Checkbox.Group, __assign({}, setting.inputProps)));
        },
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
        FormItemComponent: function (_a) {
            var setting = _a.setting;
            return React.createElement(Form.Item, __assign({}, setting.itemProps),
                React.createElement(Radio.Group, __assign({}, setting.inputProps)));
        },
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
        FormItemComponent: function (_a) {
            var setting = _a.setting;
            return React.createElement(Form.Item, __assign({}, setting.itemProps),
                React.createElement(DatePicker, __assign({}, setting.inputProps)));
        },
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
        FormItemComponent: function (_a) {
            var setting = _a.setting;
            return React.createElement(Form.Item, __assign({}, setting.itemProps),
                React.createElement(DatePicker.RangePicker, __assign({}, setting.inputProps)));
        },
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
        FormItemComponent: function (_a) {
            var setting = _a.setting;
            return React.createElement(Form.Item, __assign({}, setting.itemProps),
                React.createElement(Upload, __assign({}, setting.inputProps),
                    React.createElement(Button, { icon: React.createElement(UploadOutlined, null) }, "Click to Upload")));
        },
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
        FormItemComponent: function (_a) {
            var setting = _a.setting;
            return React.createElement(Form.Item, __assign({}, setting.itemProps),
                React.createElement(Switch, __assign({}, setting.inputProps)));
        },
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
        FormItemComponent: function (_a) {
            var setting = _a.setting;
            return React.createElement(Form.Item, __assign({}, setting.itemProps),
                React.createElement(Button, __assign({}, setting.inputProps), "Submit"));
        },
    }
};
//# sourceMappingURL=leggoItemStore.js.map