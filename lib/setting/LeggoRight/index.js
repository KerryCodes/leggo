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
exports.LeggoRight = void 0;
const react_1 = __importStar(require("react"));
const Config_1 = require("./Config");
const antd_1 = require("antd");
function LeggoRight(props) {
    const { activeSchema, setForceRender } = props;
    const { id, setting } = activeSchema.current || {};
    const itemPropsConfigs = (0, react_1.useMemo)(() => Object.keys(setting?.itemProps || {}), [activeSchema.current]);
    const inputPropsConfigs = (0, react_1.useMemo)(() => Object.keys(setting?.inputProps || {}), [activeSchema.current]);
    return (react_1.default.createElement("div", { className: "leggo-right" },
        react_1.default.createElement("strong", null, "\u5C5E\u6027\u914D\u7F6E"),
        react_1.default.createElement("div", { className: "configs-setting-area" },
            react_1.default.createElement(antd_1.Divider, null, "itemProps"),
            itemPropsConfigs.map(propName => react_1.default.createElement(Config_1.Config, { key: id + propName, propName: propName, activeSchemaProp: setting.itemProps, defaultValue: setting.itemProps[propName], setForceRender: setForceRender }))),
        react_1.default.createElement("div", { className: "configs-setting-area" },
            react_1.default.createElement(antd_1.Divider, null, "inputProps"),
            inputPropsConfigs.map(propName => react_1.default.createElement(Config_1.Config, { key: id + propName, propName: propName, activeSchemaProp: setting.inputProps, defaultValue: setting.inputProps[propName], setForceRender: setForceRender })))));
}
exports.LeggoRight = LeggoRight;
//# sourceMappingURL=index.js.map