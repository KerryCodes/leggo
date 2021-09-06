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
import React, { useEffect, useState } from 'react';
import '../styles/LeggoMiddle.less';
import { Button, Form, InputNumber } from 'antd';
import { cloneDeep } from 'lodash';
import { DroppedFormItem } from './DroppedFormItem';
import { CreateSchemasModel } from './CreateSchemasModel';
import { leggoItemStore } from '../../public/leggoItemStore';
export function LeggoMiddle(props) {
    var activeSchema = props.activeSchema, setForceRender = props.setForceRender, onPostSchemaModel = props.onPostSchemaModel;
    var _a = useState([]), schemaList = _a[0], setSchemaList = _a[1];
    var _b = useState({
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    }), formProps = _b[0], setFormProps = _b[1];
    var form = Form.useForm()[0];
    var handleDragOver = function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    };
    var handleDrop = function (e) {
        e.preventDefault();
        var type = e.dataTransfer.getData('text/plain');
        if (!type) {
            return;
        }
        var formItemInfo = leggoItemStore[type];
        var newSchema = {
            type: type,
            id: Date.now().toString(),
            setting: cloneDeep(formItemInfo).setting,
        };
        setSchemaList(__spreadArray(__spreadArray([], schemaList, true), [newSchema], false));
    };
    var changeFormProps = function (propItem) {
        setFormProps(function (pre) { return (__assign(__assign({}, pre), propItem)); });
    };
    var clearAllSchemas = function () {
        activeSchema.current = null;
        setSchemaList([]);
        setForceRender(function (pre) { return pre + 1; });
    };
    useEffect(function () {
        form.validateFields();
    });
    return (React.createElement("div", { className: "leggo-setting-middle" },
        React.createElement("strong", null, "\u8868\u5355\u6A21\u677F"),
        React.createElement("div", { className: "top-actions" },
            React.createElement("div", null,
                React.createElement("span", null, "labelCol\uFF1A"),
                React.createElement(InputNumber, { min: 1, max: 24 - formProps.wrapperCol.span, value: formProps.labelCol.span, onChange: function (value) { return changeFormProps({ labelCol: { span: value } }); } })),
            React.createElement("div", null,
                React.createElement("span", null, "wrapperCol\uFF1A"),
                React.createElement(InputNumber, { min: 1, max: 24 - formProps.labelCol.span, value: formProps.wrapperCol.span, onChange: function (value) { return changeFormProps({ wrapperCol: { span: value } }); } })),
            React.createElement(CreateSchemasModel, { formProps: formProps, schemaList: schemaList, onPostSchemaModel: onPostSchemaModel }),
            React.createElement(Button, { onClick: clearAllSchemas }, "clear")),
        React.createElement(Form, __assign({ form: form }, formProps, { className: "leggo-setting-middle-form" }),
            React.createElement("div", { className: "drop-area", onDragOver: handleDragOver, onDrop: handleDrop }, schemaList.map(function (schema) {
                return React.createElement(DroppedFormItem, { key: schema.id, schema: schema, setSchemas: setSchemaList, activeSchema: activeSchema, setForceRender: setForceRender });
            })))));
}
//# sourceMappingURL=index.js.map