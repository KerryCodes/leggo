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
exports.LeggoMiddle = void 0;
const react_1 = __importStar(require("react"));
require("../styles/LeggoMiddle.less");
const antd_1 = require("antd");
const lodash_1 = require("lodash");
const DroppedFormItem_1 = require("./DroppedFormItem");
const CreateSchemasModel_1 = require("./CreateSchemasModel");
const leggoItemStore_1 = require("../../public/leggoItemStore");
function LeggoMiddle(props) {
    const { activeSchema, setForceRender, onPostSchemaModel } = props;
    const [schemaList, setSchemaList] = (0, react_1.useState)([]);
    const [formProps, setFormProps] = (0, react_1.useState)({
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    });
    const [form] = antd_1.Form.useForm();
    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    };
    const handleDrop = (e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData('text/plain');
        if (!type) {
            return;
        }
        const formItemInfo = leggoItemStore_1.leggoItemStore[type];
        const newSchema = {
            type,
            id: Date.now().toString(),
            setting: (0, lodash_1.cloneDeep)(formItemInfo).setting,
        };
        setSchemaList([...schemaList, newSchema]);
    };
    const changeFormProps = (propItem) => {
        setFormProps(pre => ({ ...pre, ...propItem }));
    };
    const clearAllSchemas = () => {
        activeSchema.current = null;
        setSchemaList([]);
        setForceRender(pre => pre + 1);
    };
    (0, react_1.useEffect)(() => {
        form.validateFields();
    });
    return (react_1.default.createElement("div", { className: "leggo-middle" },
        react_1.default.createElement("strong", null, "\u8868\u5355\u6A21\u677F"),
        react_1.default.createElement("div", { className: "top-actions" },
            react_1.default.createElement("div", null,
                react_1.default.createElement("span", null, "labelCol\uFF1A"),
                react_1.default.createElement(antd_1.InputNumber, { min: 1, max: 24 - formProps.wrapperCol.span, value: formProps.labelCol.span, onChange: value => changeFormProps({ labelCol: { span: value } }) })),
            react_1.default.createElement("div", null,
                react_1.default.createElement("span", null, "wrapperCol\uFF1A"),
                react_1.default.createElement(antd_1.InputNumber, { min: 1, max: 24 - formProps.labelCol.span, value: formProps.wrapperCol.span, onChange: value => changeFormProps({ wrapperCol: { span: value } }) })),
            react_1.default.createElement(CreateSchemasModel_1.CreateSchemasModel, { formProps: formProps, schemaList: schemaList, onPostSchemaModel: onPostSchemaModel }),
            react_1.default.createElement(antd_1.Button, { onClick: clearAllSchemas }, "clear")),
        react_1.default.createElement(antd_1.Form, { form: form, ...formProps, className: "leggo-middle-form" },
            react_1.default.createElement("div", { className: "drop-area", onDragOver: handleDragOver, onDrop: handleDrop }, schemaList.map(schema => react_1.default.createElement(DroppedFormItem_1.DroppedFormItem, { key: schema.id, schema: schema, setSchemas: setSchemaList, activeSchema: activeSchema, setForceRender: setForceRender }))))));
}
exports.LeggoMiddle = LeggoMiddle;
//# sourceMappingURL=index.js.map