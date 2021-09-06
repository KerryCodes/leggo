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
exports.LeggoSetting = void 0;
const react_1 = __importStar(require("react"));
require("./styles/index.less");
const LeggoLeft_1 = require("./LeggoLeft");
const LeggoRight_1 = require("./LeggoRight");
const LeggoMiddle_1 = require("./LeggoMiddle");
function LeggoSetting(props) {
    const activeSchema = (0, react_1.useRef)(null);
    const [, setForceRender] = (0, react_1.useState)(0);
    return (react_1.default.createElement("div", { className: "leggo-setting" },
        react_1.default.createElement(LeggoLeft_1.LeggoLeft, null),
        react_1.default.createElement(LeggoMiddle_1.LeggoMiddle, { activeSchema: activeSchema, setForceRender: setForceRender, onPostSchemaModel: props.onPostSchemaModel }),
        react_1.default.createElement(LeggoRight_1.LeggoRight, { activeSchema: activeSchema, setForceRender: setForceRender })));
}
exports.LeggoSetting = LeggoSetting;
//# sourceMappingURL=index.js.map