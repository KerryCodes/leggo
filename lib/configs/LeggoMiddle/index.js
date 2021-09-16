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
import { Button, Form, InputNumber } from 'antd';
import { DroppedFormItem } from './components/DroppedFormItem';
import { CreateSchemasModel } from './components/CreateSchemasModel';
import { leggoItemStore, LeggoSchema } from '../../service';
export function LeggoMiddle(props) {
    var activeSchema = props.activeSchema, schemaList = props.schemaList, setSchemaList = props.setSchemaList, forceRender = props.forceRender, onPostSchemaModel = props.onPostSchemaModel;
    var form = Form.useForm()[0];
    var _a = useState({
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    }), formProps = _a[0], setFormProps = _a[1];
    var handleDragOver = function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    };
    var handleDrop = function (e) {
        e.preventDefault();
        var schemaType = e.dataTransfer.getData('text/plain');
        if (!schemaType) {
            return;
        }
        var leggoItemInfo = leggoItemStore.total[schemaType];
        var newSchema = new LeggoSchema(schemaType, leggoItemInfo);
        setSchemaList(__spreadArray(__spreadArray([], schemaList, true), [newSchema], false));
    };
    var changeFormProps = function (propItem) {
        setFormProps(function (pre) { return (__assign(__assign({}, pre), propItem)); });
    };
    var clearAllSchemas = function () {
        activeSchema.current = null;
        setSchemaList([]);
        forceRender();
    };
    useEffect(function () {
        form.validateFields();
    });
    return (React.createElement("div", { className: "leggo-configs-middle" },
        React.createElement("div", { className: "top-area" },
            React.createElement("strong", null, "\u8868\u5355\u6A21\u677F"),
            React.createElement("div", { className: "top-actions" },
                React.createElement("div", null,
                    React.createElement("strong", null, "labelCol\uFF1A"),
                    React.createElement(InputNumber, { min: 0, max: 24 - formProps.wrapperCol.span, value: formProps.labelCol.span, onChange: function (value) { return changeFormProps({ labelCol: { span: value } }); } })),
                React.createElement("div", null,
                    React.createElement("strong", null, "wrapperCol\uFF1A"),
                    React.createElement(InputNumber, { min: 0, max: 24 - formProps.labelCol.span, value: formProps.wrapperCol.span, onChange: function (value) { return changeFormProps({ wrapperCol: { span: value } }); } })),
                React.createElement(CreateSchemasModel, { formProps: formProps, schemaList: schemaList, onPostSchemaModel: onPostSchemaModel }),
                React.createElement(Button, { onClick: clearAllSchemas }, "clear"))),
        React.createElement(Form, __assign({ form: form }, formProps, { className: "leggo-configs-middle-form" }),
            React.createElement("div", { className: "drop-area", onDragOver: handleDragOver, onDrop: handleDrop }, schemaList.map(function (schema) {
                return React.createElement(DroppedFormItem, { key: schema.id, activeSchema: activeSchema, schema: schema, setSchemaList: setSchemaList, forceRender: forceRender });
            })))));
}
