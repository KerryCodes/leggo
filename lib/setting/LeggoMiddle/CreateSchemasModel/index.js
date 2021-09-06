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
import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
var layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};
export function CreateSchemasModel(props) {
    var formProps = props.formProps, schemaList = props.schemaList, onPostSchemaModel = props.onPostSchemaModel;
    var form = Form.useForm()[0];
    var _a = useState(false), visible = _a[0], setVisible = _a[1];
    var handleSend = function (values) {
        onPostSchemaModel(__assign(__assign({}, values), { formProps: formProps, schemaList: schemaList }));
        setVisible(false);
    };
    return (React.createElement("div", null,
        React.createElement(Button, { type: "primary", disabled: !schemaList.length, onClick: function () { return setVisible(true); } }, "\u751F\u6210\u6A21\u677F"),
        React.createElement(Modal, { title: "\u521B\u5EFA\u5E76\u53D1\u9001\u6A21\u677F", visible: visible, onOk: function () { return form.submit(); }, onCancel: function () { return setVisible(false); }, getContainer: false },
            React.createElement(Form, __assign({ form: form }, layout, { onFinish: handleSend }),
                React.createElement(Form.Item, { label: "\u6A21\u677F\u540D\u79F0", name: "name", rules: [{ required: true, message: '请填写模板名称！' }] },
                    React.createElement(Input, null)),
                React.createElement(Form.Item, { label: "\u63CF\u8FF0", name: "description" },
                    React.createElement(Input.TextArea, null))))));
}
//# sourceMappingURL=index.js.map