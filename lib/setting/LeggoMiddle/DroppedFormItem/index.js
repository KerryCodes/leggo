"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DroppedFormItem = void 0;
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const leggoItemStore_1 = require("../../../public/leggoItemStore");
function DroppedFormItem(props) {
    const { schema, setSchemas, activeSchema, setForceRender } = props;
    const { id, type, setting } = schema;
    const FormItemComponent = leggoItemStore_1.leggoItemStore[type].FormItemComponent;
    const active = activeSchema.current === schema;
    const deleteSchema = (e) => {
        e.stopPropagation();
        if (active) {
            activeSchema.current = null;
        }
        setSchemas(pre => pre.filter(it => it.id !== id));
        setForceRender(pre => pre + 1);
    };
    const activateSchema = (e) => {
        e.stopPropagation();
        activeSchema.current = schema;
        setForceRender(pre => pre + 1);
    };
    return (react_1.default.createElement("div", { className: `dropped-item ${active ? 'active-item' : ''}`, onClick: activateSchema },
        react_1.default.createElement(antd_1.Button, { type: "text", className: "delete-butt", onClick: deleteSchema }, "X"),
        react_1.default.createElement(FormItemComponent, { setting: setting })));
}
exports.DroppedFormItem = DroppedFormItem;
//# sourceMappingURL=index.js.map