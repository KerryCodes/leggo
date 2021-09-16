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
import React, { Fragment } from 'react';
import { Button, Form, Input, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { LinkSet } from './LinkSet';
var layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
var options = [
    { label: 'GET', value: 'get' },
    { label: 'POST', value: 'post' },
    { label: 'PUT', value: 'put' },
    { label: 'DELETE', value: 'delete' },
];
var selectBeforeOptions = [
    { label: 'http://', value: 'http://' },
    { label: 'https://', value: 'https://' },
];
export function ConfigPostman(props) {
    var activeSchema = props.activeSchema, schemaListOptions = props.schemaListOptions;
    var onValuesChange = function (_, allValues) {
        var method = allValues.method, url = allValues.url, params = allValues.params, data = allValues.data;
        activeSchema.current.configs.postman = {
            propName: 'options',
            method: method,
            url: url,
            params: params === null || params === void 0 ? void 0 : params.filter(function (item) { return item; }),
            data: data === null || data === void 0 ? void 0 : data.filter(function (item) { return item; }),
        };
    };
    return (React.createElement(Form, __assign({}, layout, { onValuesChange: onValuesChange, initialValues: activeSchema.current.configs.postman }),
        React.createElement(Form.Item, { label: "method", name: "method", required: true },
            React.createElement(Select, { options: options, allowClear: true })),
        React.createElement(Form.Item, { label: "url", name: "url", required: true, initialValue: 'www.' },
            React.createElement(Input, { addonBefore: React.createElement(Select, { options: selectBeforeOptions, defaultValue: "http://" }) })),
        React.createElement(Form.Item, { label: 'params' },
            React.createElement(Form.List, { name: "params" }, function (fields, _a) {
                var add = _a.add, remove = _a.remove;
                return (React.createElement(Fragment, null,
                    fields.map(function (_a, index) {
                        var key = _a.key, name = _a.name, fieldKey = _a.fieldKey, restField = __rest(_a, ["key", "name", "fieldKey"]);
                        return (React.createElement(Space, { key: key, align: "baseline" },
                            React.createElement(Form.Item, __assign({}, restField, { name: [name, 'key'], fieldKey: [fieldKey, 'key'], rules: [{ required: true, message: '请定义key' }] }),
                                React.createElement(Input, { placeholder: "key" })),
                            React.createElement(LinkSet, { activeSchema: activeSchema, namepath: ['postman', 'params', index, 'value'], schemaListOptions: schemaListOptions }),
                            React.createElement(Form.Item, __assign({}, restField, { name: [name, 'value'], fieldKey: [fieldKey, 'value'], rules: [{ required: true, message: '请定义value' }] }),
                                React.createElement(Input, { placeholder: "value" })),
                            React.createElement(MinusCircleOutlined, { onClick: function () { return remove(name); } })));
                    }),
                    React.createElement(Form.Item, null,
                        React.createElement(Button, { type: "dashed", onClick: function () { return add(); }, block: true, icon: React.createElement(PlusOutlined, null) }, "\u65B0\u589Ekey"))));
            })),
        React.createElement(Form.Item, { label: 'data' },
            React.createElement(Form.List, { name: "data" }, function (fields, _a) {
                var add = _a.add, remove = _a.remove;
                return (React.createElement(Fragment, null,
                    fields.map(function (_a, index) {
                        var key = _a.key, name = _a.name, fieldKey = _a.fieldKey, restField = __rest(_a, ["key", "name", "fieldKey"]);
                        return (React.createElement(Space, { key: key, align: "baseline" },
                            React.createElement(Form.Item, __assign({}, restField, { name: [name, 'key'], fieldKey: [fieldKey, 'key'], rules: [{ required: true, message: '请定义key' }] }),
                                React.createElement(Input, { placeholder: "key" })),
                            React.createElement(LinkSet, { activeSchema: activeSchema, namepath: ['postman', 'data', index, 'value'], schemaListOptions: schemaListOptions }),
                            React.createElement(Form.Item, __assign({}, restField, { name: [name, 'value'], fieldKey: [fieldKey, 'value'], rules: [{ required: true, message: '请定义value' }] }),
                                React.createElement(Input, { placeholder: "value" })),
                            React.createElement(MinusCircleOutlined, { onClick: function () { return remove(name); } })));
                    }),
                    React.createElement(Form.Item, null,
                        React.createElement(Button, { type: "dashed", onClick: function () { return add(); }, block: true, icon: React.createElement(PlusOutlined, null) }, "\u65B0\u589Ekey"))));
            }))));
}
