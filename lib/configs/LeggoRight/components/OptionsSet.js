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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { Fragment, useState } from 'react';
import { Button, Form, Input, Radio, Space, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
export function OptionsSet(props) {
    var activeSchema = props.activeSchema, handleChange = props.handleChange;
    var options = activeSchema.current.configs.inputProps.options;
    var _a = useState('number'), valueType = _a[0], setValueType = _a[1];
    var onValuesChange = function (_, allValues) {
        var newOptions = allValues.options.filter(function (item) { return (item === null || item === void 0 ? void 0 : item.label) !== undefined && (item === null || item === void 0 ? void 0 : item.value) !== undefined; });
        newOptions.length && handleChange(newOptions);
    };
    var onChangeType = function (e) {
        var type = e.target.value;
        options.forEach(function (option) {
            var optionValue = option.value;
            option.value = type === 'string' ? String(optionValue) : (Number(optionValue) || optionValue.charCodeAt());
        });
        handleChange(options);
        setValueType(type);
    };
    return (React.createElement(Fragment, null,
        React.createElement("div", null,
            React.createElement("span", null, "value\u7C7B\u578B\uFF1A"),
            React.createElement(Radio.Group, { size: "small", defaultValue: "number", buttonStyle: "solid", onChange: onChangeType },
                React.createElement(Radio, { value: "string" }, "string"),
                React.createElement(Radio, { value: "number" }, "number"))),
        React.createElement(Form, { onValuesChange: onValuesChange },
            React.createElement(Form.List, { name: "options", initialValue: options }, function (fields, _a) {
                var add = _a.add, remove = _a.remove;
                return (React.createElement(Fragment, null,
                    fields.map(function (_a) {
                        var key = _a.key, name = _a.name, fieldKey = _a.fieldKey, restField = __rest(_a, ["key", "name", "fieldKey"]);
                        return (React.createElement(Space, { key: key, style: { display: 'flex', marginBottom: 8 }, align: "baseline" },
                            React.createElement(Form.Item, __assign({}, restField, { name: [name, 'label'], fieldKey: [fieldKey, 'label'], rules: [{ required: true, message: '请定义label' }] }),
                                React.createElement(Input, { placeholder: "label" })),
                            React.createElement(Form.Item, __assign({}, restField, { name: [name, 'value'], fieldKey: [fieldKey, 'value'], rules: [{ required: true, message: '请定义value' }] }), valueType === 'string' ? React.createElement(Input, { placeholder: "value" }) : React.createElement(InputNumber, { placeholder: "value", bordered: false })),
                            React.createElement(MinusCircleOutlined, { onClick: function () { return remove(name); } })));
                    }),
                    React.createElement(Form.Item, null,
                        React.createElement(Button, { type: "dashed", onClick: function () { return add(); }, block: true, icon: React.createElement(PlusOutlined, null) }, "\u65B0\u589E\u9009\u9879"))));
            }))));
}
