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
exports.LeggoLeft = void 0;
const react_1 = __importStar(require("react"));
require("../styles/LeggoLeft.less");
const antd_1 = require("antd");
const leggoItemStore_1 = require("../../public/leggoItemStore");
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};
function LeggoLeft() {
    const leggoItems = (0, react_1.useMemo)(() => createLeggoItems(), []);
    return (react_1.default.createElement("div", { className: "leggo-left" },
        react_1.default.createElement("strong", null, "\u7EC4\u4EF6\u5E93"),
        react_1.default.createElement(antd_1.Form, { ...layout },
            react_1.default.createElement("div", { className: "leggo-left-form-content" }, leggoItems))));
}
exports.LeggoLeft = LeggoLeft;
function createLeggoItems() {
    const result = [];
    const handleDragStart = (e) => {
        const schema = e.target.dataset.schema;
        e.dataTransfer.setData('text/plain', schema);
    };
    for (const value of Object.values(leggoItemStore_1.leggoItemStore)) {
        const { type, FormItemComponent, setting } = value;
        const item = (react_1.default.createElement("div", { key: type, className: "item", draggable: true, onDragStart: handleDragStart, "data-schema": type },
            react_1.default.createElement("div", { className: "item-forbidden" },
                react_1.default.createElement(FormItemComponent, { setting: setting }))));
        result.push(item);
    }
    return result;
}
//# sourceMappingURL=index.js.map