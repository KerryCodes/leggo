import React, { useMemo } from 'react';
import { ConfigProp } from './components/ConfigProp';
import { Divider } from 'antd';
export function LeggoRight(props) {
    var activeSchema = props.activeSchema, schemaList = props.schemaList, forceRender = props.forceRender;
    var _a = activeSchema.current || {}, id = _a.id, configs = _a.configs;
    var _b = configs || {}, itemProps = _b.itemProps, inputProps = _b.inputProps, extra = _b.extra;
    var itemPropsEntries = useMemo(function () { return Object.entries(itemProps || {}); }, [activeSchema.current]);
    var inputPropsEntries = useMemo(function () { return Object.entries(inputProps || {}); }, [activeSchema.current]);
    var extraEntries = useMemo(function () { return Object.entries(extra || {}); }, [activeSchema.current]);
    return (React.createElement("div", { className: "leggo-configs-right" },
        React.createElement("div", { className: "top-area" },
            React.createElement("strong", null, "\u5C5E\u6027\u914D\u7F6E")),
        React.createElement("div", { className: "scroll-container" },
            React.createElement("div", { className: "configs-area" },
                React.createElement(Divider, null, "ItemProps"),
                itemPropsEntries.map(function (_a) {
                    var propName = _a[0], value = _a[1];
                    return React.createElement(ConfigProp, { key: id + propName, propOwner: itemProps, namepath: ['itemProps', propName], propName: propName, propDefaultValue: value, activeSchema: activeSchema, schemaList: schemaList, forceRender: forceRender });
                })),
            React.createElement("div", { className: "configs-area" },
                React.createElement(Divider, null, "InputProps"),
                inputPropsEntries.map(function (_a) {
                    var propName = _a[0], value = _a[1];
                    return React.createElement(ConfigProp, { key: id + propName, propOwner: inputProps, namepath: ['inputProps', propName], propName: propName, propDefaultValue: value, activeSchema: activeSchema, schemaList: schemaList, forceRender: forceRender });
                })),
            React.createElement("div", { className: "configs-area" },
                React.createElement(Divider, null, "Extra"),
                extraEntries.map(function (_a) {
                    var propName = _a[0], value = _a[1];
                    return React.createElement(ConfigProp, { key: id + propName, propOwner: extra, namepath: ['extra', propName], propName: propName, propDefaultValue: value, activeSchema: activeSchema, schemaList: schemaList, forceRender: forceRender });
                })))));
}
