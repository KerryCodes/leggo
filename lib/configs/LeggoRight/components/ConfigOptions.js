import React, { useState } from 'react';
import { Radio } from 'antd';
import { ConfigPostman } from './ConfigPostman';
import { OptionsSet } from './OptionsSet';
export function ConfigOptions(props) {
    var activeSchema = props.activeSchema, schemaListOptions = props.schemaListOptions, handleChangePropValue = props.handleChangePropValue;
    var postman = activeSchema.current.configs.postman;
    var _a = useState(postman ? 'dynamic' : 'static'), dataType = _a[0], setDataType = _a[1];
    var handleChangeDataType = function (e) {
        var newType = e.target.value;
        if (newType === 'static') {
            activeSchema.current.configs.postman = null;
        }
        setDataType(newType);
    };
    return (React.createElement("div", null,
        React.createElement("strong", null, "options\uFF1A"),
        React.createElement(Radio.Group, { size: "small", value: dataType, buttonStyle: "solid", onChange: handleChangeDataType },
            React.createElement(Radio.Button, { value: "static" }, "\u9759\u6001\u6570\u636E"),
            React.createElement(Radio.Button, { value: "dynamic" }, "\u8FDC\u7A0B\u6570\u636E")),
        React.createElement("div", { className: "configs-area" }, dataType === 'static' ?
            React.createElement(OptionsSet, { activeSchema: activeSchema, handleChange: handleChangePropValue })
            :
                React.createElement(ConfigPostman, { activeSchema: activeSchema, schemaListOptions: schemaListOptions }))));
}
