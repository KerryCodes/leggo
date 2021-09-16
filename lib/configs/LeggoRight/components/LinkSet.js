import React, { Fragment, useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Popover, Radio, Select, Space } from 'antd';
import { DisconnectOutlined } from '@ant-design/icons';
export function LinkSet(props) {
    var namepath = props.namepath, activeSchema = props.activeSchema, schemaListOptions = props.schemaListOptions;
    var form = Form.useForm()[0];
    var _a = useState(false), visible = _a[0], setVisible = _a[1];
    var _b = useState(false), isLinked = _b[0], setIsLinked = _b[1];
    var _c = useState('string'), referenceType = _c[0], setReferenceType = _c[1];
    var _d = useState('value = '), resultText = _d[0], setResultText = _d[1];
    var _e = useState(true), disabled = _e[0], setDisabled = _e[1];
    var onValuesChange = function (_, allValues) {
        var observedName = allValues.observedName, rule = allValues.rule, reference = allValues.reference;
        var newText = 'value = ';
        if (observedName) {
            setDisabled(false);
            newText += observedName + ".value";
            if (rule && reference) {
                newText += " " + rule + " ";
                newText += referenceType === 'string' ? "\"" + reference + "\"" : reference;
            }
        }
        else {
            setDisabled(true);
        }
        setResultText(newText);
    };
    var onFinish = function () {
        form.validateFields()
            .then(function (values) {
            var observedName = values.observedName, rule = values.rule, reference = values.reference;
            var key = namepath.join();
            var getterInfo = { observedName: observedName, namepath: namepath, reference: reference, rule: rule };
            activeSchema.current.needDefineGetterMap.set(key, getterInfo);
            setVisible(false);
        });
    };
    var onCancel = function () {
        var key = namepath.join();
        activeSchema.current.needDefineGetterMap.delete(key);
        setVisible(false);
    };
    var onChangeType = function (e) {
        var type = e.target.value;
        form.setFields([{ name: 'reference', value: undefined }]);
        var allValues = form.getFieldsValue(true);
        onValuesChange(null, allValues);
        setReferenceType(type);
    };
    useEffect(function () {
        var key = namepath.join();
        var getterInfo = activeSchema.current.needDefineGetterMap.get(key);
        if (!visible) {
            setIsLinked(!!getterInfo);
        }
        else {
            getterInfo ? form.setFieldsValue(getterInfo) : form.resetFields();
        }
    }, [visible]);
    return (React.createElement(Fragment, null,
        React.createElement(Popover, { placement: "topLeft", trigger: "click", title: "\u8BBE\u7F6E\u5173\u8054\u503C", visible: visible, onVisibleChange: setVisible, content: React.createElement("div", null,
                React.createElement(Form, { form: form, onValuesChange: onValuesChange },
                    React.createElement(Form.Item, { label: "\u5173\u8054\u5BF9\u8C61", name: "observedName", required: true },
                        React.createElement(Select, { options: schemaListOptions })),
                    React.createElement(Form.Item, { label: "\u8BA1\u7B97\u89C4\u5219", name: "rule" },
                        React.createElement(Select, null,
                            React.createElement(Select.Option, { value: '<' }, "\u5173\u8054\u503C < \u53C2\u8003\u503C"),
                            React.createElement(Select.Option, { value: '<=' }, "\u5173\u8054\u503C \u2264 \u53C2\u8003\u503C"),
                            React.createElement(Select.Option, { value: '===' }, "\u5173\u8054\u503C === \u53C2\u8003\u503C"),
                            React.createElement(Select.Option, { value: '>=' }, "\u5173\u8054\u503C \u2265 \u53C2\u8003\u503C"),
                            React.createElement(Select.Option, { value: '>' }, "\u5173\u8054\u503C > \u53C2\u8003\u503C"))),
                    React.createElement(Form.Item, { label: "\u53C2\u8003\u503C\u7C7B\u578B\uFF1A" },
                        React.createElement(Radio.Group, { size: "small", defaultValue: "string", buttonStyle: "solid", onChange: onChangeType },
                            React.createElement(Radio.Button, { value: "string" }, "string\u7C7B\u578B"),
                            React.createElement(Radio.Button, { value: "number" }, "number\u7C7B\u578B"))),
                    React.createElement(Form.Item, { label: "\u53C2\u8003\u503C", name: "reference" }, referenceType === 'string' ? React.createElement(Input, { placeholder: "\u53C2\u8003\u503C" }) : React.createElement(InputNumber, { placeholder: "\u53C2\u8003\u503C", bordered: false })),
                    React.createElement(Form.Item, { label: "\u5173\u8054\u7ED3\u679C\uFF1A" },
                        React.createElement("div", null, resultText))),
                React.createElement(Space, null,
                    React.createElement(Button, { disabled: disabled, onClick: onFinish, type: "primary" }, "\u786E\u5B9A"),
                    React.createElement(Button, { disabled: disabled, onClick: onCancel, danger: true }, "\u5220\u9664\u5173\u8054"))) },
            React.createElement(Button, { type: isLinked ? "link" : "text", icon: React.createElement(DisconnectOutlined, null) }))));
}
