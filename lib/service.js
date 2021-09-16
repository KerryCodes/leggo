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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React from "react";
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Switch, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { cloneDeep } from "lodash";
import { wordsLimitValidator } from "./utils";
var LeggoSchema = (function () {
    function LeggoSchema(schemaType, leggoItemInfo) {
        var _this = this;
        this.getName = function () { return _this.configs.itemProps.name; };
        this.id = Date.now().toString();
        this.type = schemaType;
        this.configs = cloneDeep(leggoItemInfo).configs;
        this.currentFormItemValue = null;
        this.linkingNames = new Set();
        this.needDefineGetterMap = new Map();
    }
    return LeggoSchema;
}());
export { LeggoSchema };
var antdItemStore = {
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
        StandardItemFC: function (_a) {
            var itemProps = _a.itemProps, inputProps = _a.inputProps, extra = _a.extra;
            return React.createElement(Form.Item, __assign({}, itemProps, { rules: __spreadArray(__spreadArray([], itemProps.rules, true), [{ validator: wordsLimitValidator.bind(null, extra.wordsLimit) }], false) }),
                React.createElement(Input, __assign({}, inputProps)));
        },
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
        StandardItemFC: function (_a) {
            var itemProps = _a.itemProps, inputProps = _a.inputProps, extra = _a.extra;
            return React.createElement(Form.Item, __assign({}, itemProps, { rules: __spreadArray(__spreadArray([], itemProps.rules, true), [{ validator: wordsLimitValidator.bind(null, extra.wordsLimit) }], false) }),
                React.createElement(Input.TextArea, __assign({}, inputProps)));
        },
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
        StandardItemFC: function (_a) {
            var itemProps = _a.itemProps, inputProps = _a.inputProps;
            return React.createElement(Form.Item, __assign({}, itemProps),
                React.createElement(Input.Password, __assign({}, inputProps)));
        },
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
        StandardItemFC: function (_a) {
            var itemProps = _a.itemProps, inputProps = _a.inputProps;
            return React.createElement(Form.Item, __assign({}, itemProps),
                React.createElement(InputNumber, __assign({}, inputProps)));
        },
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
                options: [{ label: 'A', value: 1 }, { label: 'B', value: 2 }],
            },
        },
        StandardItemFC: function (_a) {
            var itemProps = _a.itemProps, inputProps = _a.inputProps;
            return React.createElement(Form.Item, __assign({}, itemProps),
                React.createElement(Select, __assign({}, inputProps)));
        },
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
                options: [{ label: 'A', value: 1 }, { label: 'B', value: 2 }],
            },
        },
        StandardItemFC: function (_a) {
            var itemProps = _a.itemProps, inputProps = _a.inputProps;
            return React.createElement(Form.Item, __assign({}, itemProps),
                React.createElement(Checkbox.Group, __assign({}, inputProps)));
        },
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
                options: [{ label: 'A', value: 1 }, { label: 'B', value: 2 }],
            },
        },
        StandardItemFC: function (_a) {
            var itemProps = _a.itemProps, inputProps = _a.inputProps;
            return React.createElement(Form.Item, __assign({}, itemProps),
                React.createElement(Radio.Group, __assign({}, inputProps)));
        },
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
        StandardItemFC: function (_a) {
            var itemProps = _a.itemProps, inputProps = _a.inputProps;
            return React.createElement(Form.Item, __assign({}, itemProps),
                React.createElement(DatePicker, __assign({}, inputProps)));
        },
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
        StandardItemFC: function (_a) {
            var itemProps = _a.itemProps, inputProps = _a.inputProps;
            return React.createElement(Form.Item, __assign({}, itemProps),
                React.createElement(DatePicker.RangePicker, __assign({}, inputProps)));
        },
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
        StandardItemFC: function (_a) {
            var itemProps = _a.itemProps, inputProps = _a.inputProps;
            return React.createElement(Form.Item, __assign({}, itemProps),
                React.createElement(Upload, __assign({}, inputProps),
                    React.createElement(Button, { icon: React.createElement(UploadOutlined, null) }, "Click to Upload")));
        },
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
        StandardItemFC: function (_a) {
            var itemProps = _a.itemProps, inputProps = _a.inputProps;
            return React.createElement(Form.Item, __assign({}, itemProps),
                React.createElement(Switch, __assign({}, inputProps)));
        },
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
        StandardItemFC: function (_a) {
            var itemProps = _a.itemProps;
            return React.createElement(Form.Item, __assign({}, itemProps),
                React.createElement("div", null, "\u5360\u4F4D\u8868\u5355\u4EC5\u4F5C\u4E3A\u8868\u5355\u7ED3\u6784\u7684\u4E00\u90E8\u5206\uFF0C\u8868\u5355\u5B9E\u9645\u6E32\u67D3\u524D\u5C06\u88AB\u4E2D\u95F4\u4EF6\u8BC6\u522B\u5E76\u66FF\u6362\uFF01"));
        },
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
        StandardItemFC: function (_a) {
            var itemProps = _a.itemProps, inputProps = _a.inputProps, extra = _a.extra;
            return React.createElement(Form.Item, __assign({}, itemProps),
                React.createElement(Button, __assign({}, inputProps), extra.buttonText));
        },
    }
};
export var leggoItemStore = {
    total: __assign({}, antdItemStore),
    antd: antdItemStore,
};
