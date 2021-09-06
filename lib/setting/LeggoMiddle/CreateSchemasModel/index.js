"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSchemasModel = void 0;
const antd_1 = require("antd");
const react_1 = __importStar(require("react"));
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};
function CreateSchemasModel(props) {
    const { formProps, schemaList, onPostSchemaModel } = props;
    const [form] = antd_1.Form.useForm();
    const [visible, setVisible] = (0, react_1.useState)(false);
    const handleSend = (values) => {
        onPostSchemaModel({
            ...values,
            formProps,
            schemaList,
        });
        setVisible(false);
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(antd_1.Button, { type: "primary", disabled: !schemaList.length, onClick: () => setVisible(true) }, "\u751F\u6210\u6A21\u677F"),
        react_1.default.createElement(antd_1.Modal, { title: "\u521B\u5EFA\u5E76\u53D1\u9001\u6A21\u677F", visible: visible, onOk: () => form.submit(), onCancel: () => setVisible(false), getContainer: false },
            react_1.default.createElement(antd_1.Form, { form: form, ...layout, onFinish: handleSend },
                react_1.default.createElement(antd_1.Form.Item, { label: "\u6A21\u677F\u540D\u79F0", name: "name", rules: [{ required: true, message: '请填写模板名称！' }] },
                    react_1.default.createElement(antd_1.Input, null)),
                react_1.default.createElement(antd_1.Form.Item, { label: "\u63CF\u8FF0", name: "description" },
                    react_1.default.createElement(antd_1.Input.TextArea, null))))));
}
exports.CreateSchemasModel = CreateSchemasModel;
//# sourceMappingURL=index.js.map