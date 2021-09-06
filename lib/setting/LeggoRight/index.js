import React, { useMemo } from 'react';
import { Config } from './Config';
import { Divider } from 'antd';
export function LeggoRight(props) {
    var activeSchema = props.activeSchema, setForceRender = props.setForceRender;
    var _a = activeSchema.current || {}, id = _a.id, setting = _a.setting;
    var itemPropsConfigs = useMemo(function () { return Object.keys((setting === null || setting === void 0 ? void 0 : setting.itemProps) || {}); }, [activeSchema.current]);
    var inputPropsConfigs = useMemo(function () { return Object.keys((setting === null || setting === void 0 ? void 0 : setting.inputProps) || {}); }, [activeSchema.current]);
    return (React.createElement("div", { className: "leggo-setting-right" },
        React.createElement("strong", null, "\u5C5E\u6027\u914D\u7F6E"),
        React.createElement("div", { className: "configs-setting-area" },
            React.createElement(Divider, null, "itemProps"),
            itemPropsConfigs.map(function (propName) {
                return React.createElement(Config, { key: id + propName, propName: propName, activeSchemaProp: setting.itemProps, defaultValue: setting.itemProps[propName], setForceRender: setForceRender });
            })),
        React.createElement("div", { className: "configs-setting-area" },
            React.createElement(Divider, null, "inputProps"),
            inputPropsConfigs.map(function (propName) {
                return React.createElement(Config, { key: id + propName, propName: propName, activeSchemaProp: setting.inputProps, defaultValue: setting.inputProps[propName], setForceRender: setForceRender });
            }))));
}
//# sourceMappingURL=index.js.map