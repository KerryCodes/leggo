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
exports.LeggoForm = exports.useLeggo = void 0;
const antd_1 = require("antd");
const react_1 = __importStar(require("react"));
const leggoItemStore_1 = require("../public/leggoItemStore");
const leggoStores = new WeakMap();
class Leggo {
    forceRender;
    ref;
    schemaModel;
    constructor(keyRef, setForceRender, schemaModel) {
        this.ref = keyRef;
        this.forceRender = () => setForceRender(pre => pre + 1);
        this.schemaModel = schemaModel;
    }
    updateSchemaModel(newSchemaModel) {
        this.schemaModel = newSchemaModel;
        this.forceRender();
    }
    updateSchemaModelData(formItemName, changeDataFunc) {
        const pickedSchema = this.schemaModel?.schemaList.find(item => item.setting.itemProps.name === formItemName);
        if (!pickedSchema) {
            return;
        }
        const { setting, standardFormItem } = pickedSchema;
        changeDataFunc(setting, standardFormItem);
        pickedSchema.forceLeggoFormItemRender?.();
    }
    getForItem(type) {
        return leggoItemStore_1.leggoItemStore[type]?.FormItemComponent;
    }
}
function useLeggo(schemaModel) {
    const keyRef = (0, react_1.useRef)(null);
    const [, setForceRender] = (0, react_1.useState)(0);
    if (!leggoStores.has(keyRef)) {
        const leggo = new Leggo(keyRef, setForceRender, schemaModel);
        leggoStores.set(keyRef, leggo);
    }
    return leggoStores.get(keyRef);
}
exports.useLeggo = useLeggo;
function LeggoForm(props) {
    const { leggo, ...overlapFormProps } = props;
    const { formProps, schemaList } = leggoStores.get(leggo.ref)?.schemaModel || {};
    return (react_1.default.createElement(antd_1.Form, { ...formProps, ...overlapFormProps }, schemaList?.map(schema => react_1.default.createElement(LeggoFormItem, { key: schema.id, schema: schema }))));
}
exports.LeggoForm = LeggoForm;
function LeggoFormItem(props) {
    const { schema } = props;
    const { type, setting } = schema;
    const FormItemComponent = leggoItemStore_1.leggoItemStore[type].FormItemComponent;
    const [, setForceRender] = (0, react_1.useState)(0);
    schema.standardFormItem = react_1.default.createElement(FormItemComponent, { setting: setting });
    schema.forceLeggoFormItemRender = () => setForceRender(pre => pre + 1);
    return setting.customizedFormItem || schema.standardFormItem;
}
//# sourceMappingURL=index.js.map