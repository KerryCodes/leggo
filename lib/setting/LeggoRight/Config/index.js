import React, { useState } from 'react';
import { Input, InputNumber, Space, Switch } from 'antd';
export function Config(props) {
    var propName = props.propName, activeSchemaProp = props.activeSchemaProp, defaultValue = props.defaultValue, setForceRender = props.setForceRender;
    var _a = useState(defaultValue), value = _a[0], setValue = _a[1];
    var handleChange = function (value) {
        activeSchemaProp[propName] = value;
        setValue(value);
        setForceRender(function (pre) { return pre + 1; });
    };
    if (propName === 'rules') {
        var configs = Object.keys(defaultValue[0]);
        return (React.createElement("div", null,
            React.createElement("strong", null, "rules\uFF1A"),
            React.createElement("div", { className: "configs-setting-area" }, configs.map(function (pName) {
                return React.createElement(Config, { key: pName, propName: pName, activeSchemaProp: defaultValue[0], defaultValue: defaultValue[0][pName], setForceRender: setForceRender });
            }))));
    }
    switch (typeof defaultValue) {
        case 'boolean':
            return (React.createElement(Space, null,
                React.createElement("strong", null,
                    propName,
                    "\uFF1A"),
                React.createElement(Switch, { checked: value, onChange: handleChange })));
        case 'string':
            return (React.createElement(Space, null,
                React.createElement("strong", null,
                    propName,
                    "\uFF1A"),
                React.createElement(Input, { value: value, onChange: function (e) { return handleChange(e.target.value); } })));
        case 'number':
            return (React.createElement(Space, null,
                React.createElement("strong", null,
                    propName,
                    "\uFF1A"),
                React.createElement(InputNumber, { value: value, onChange: handleChange })));
        default:
            return null;
    }
}
//# sourceMappingURL=index.js.map