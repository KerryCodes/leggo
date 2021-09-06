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
exports.Config = void 0;
const react_1 = __importStar(require("react"));
const antd_1 = require("antd");
function Config(props) {
    const { propName, activeSchemaProp, defaultValue, setForceRender } = props;
    const [value, setValue] = (0, react_1.useState)(defaultValue);
    const handleChange = (value) => {
        activeSchemaProp[propName] = value;
        setValue(value);
        setForceRender(pre => pre + 1);
    };
    if (propName === 'rules') {
        const configs = Object.keys(defaultValue[0]);
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("strong", null, "rules\uFF1A"),
            react_1.default.createElement("div", { className: "configs-setting-area" }, configs.map(pName => react_1.default.createElement(Config, { key: pName, propName: pName, activeSchemaProp: defaultValue[0], defaultValue: defaultValue[0][pName], setForceRender: setForceRender })))));
    }
    switch (typeof defaultValue) {
        case 'boolean':
            return (react_1.default.createElement(antd_1.Space, null,
                react_1.default.createElement("strong", null,
                    propName,
                    "\uFF1A"),
                react_1.default.createElement(antd_1.Switch, { checked: value, onChange: handleChange })));
        case 'string':
            return (react_1.default.createElement(antd_1.Space, null,
                react_1.default.createElement("strong", null,
                    propName,
                    "\uFF1A"),
                react_1.default.createElement(antd_1.Input, { value: value, onChange: e => handleChange(e.target.value) })));
        case 'number':
            return (react_1.default.createElement(antd_1.Space, null,
                react_1.default.createElement("strong", null,
                    propName,
                    "\uFF1A"),
                react_1.default.createElement(antd_1.InputNumber, { value: value, onChange: handleChange })));
        default:
            return null;
    }
}
exports.Config = Config;
//# sourceMappingURL=index.js.map