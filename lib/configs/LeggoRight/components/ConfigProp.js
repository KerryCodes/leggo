var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useRef, useState } from 'react';
import { Input, InputNumber, Select, Space, Switch } from 'antd';
import { ConfigOptions } from './ConfigOptions';
import { LinkSet } from './LinkSet';
import { ConfigWordsLimit } from './ConfigWordsLimit';
export function ConfigProp(props) {
    var propOwner = props.propOwner, namepath = props.namepath, propName = props.propName, propDefaultValue = props.propDefaultValue, activeSchema = props.activeSchema, schemaList = props.schemaList, forceRender = props.forceRender;
    var typeofPropDefaultValue = useRef(typeof propDefaultValue);
    var _a = useState(propDefaultValue), propCurrentValue = _a[0], setPropCurrentValue = _a[1];
    var schemaListOptions = schemaList.map(function (schema) {
        var _a = schema.configs.itemProps, label = _a.label, name = _a.name;
        return {
            label: label + " - " + name,
            value: name,
        };
    });
    var handleChangePropValue = function (newValue) {
        propOwner[propName] = newValue;
        setPropCurrentValue(newValue);
        forceRender();
    };
    switch (propName) {
        case 'options':
            return (React.createElement(ConfigOptions, { activeSchema: activeSchema, schemaListOptions: schemaListOptions, handleChangePropValue: handleChangePropValue }));
        case 'wordsLimit':
            return (React.createElement(ConfigWordsLimit, { wordsLimit: propDefaultValue, forceRender: forceRender }));
        case 'picker':
            var options = [
                { label: 'time', value: 'time' },
                { label: 'date', value: 'date' },
                { label: 'week', value: 'week' },
                { label: 'month', value: 'month' },
                { label: 'quarter', value: 'quarter' },
                { label: 'year', value: 'year' },
            ];
            return (React.createElement(Space, null,
                React.createElement("strong", null,
                    propName,
                    "\uFF1A"),
                React.createElement(Select, { options: options, defaultValue: propCurrentValue, onChange: handleChangePropValue }),
                React.createElement(LinkSet, { activeSchema: activeSchema, namepath: namepath, schemaListOptions: schemaListOptions })));
    }
    switch (typeofPropDefaultValue.current) {
        case 'object':
            if (!propDefaultValue) {
                return null;
            }
            var propOwner_1 = propDefaultValue;
            var propOwnerEntries = Object.entries(propOwner_1);
            return (React.createElement("div", null,
                React.createElement("strong", null,
                    propName,
                    "\uFF1A"),
                React.createElement("div", { className: "configs-area" }, propOwnerEntries.map(function (_a) {
                    var pName = _a[0], value = _a[1];
                    return React.createElement(ConfigProp, { key: pName, propOwner: propOwner_1, namepath: __spreadArray(__spreadArray([], namepath, true), [pName], false), propName: pName, propDefaultValue: value, activeSchema: activeSchema, schemaList: schemaList, forceRender: forceRender });
                }))));
        case 'boolean':
            return (React.createElement(Space, null,
                React.createElement("strong", null,
                    propName,
                    "\uFF1A"),
                React.createElement(Switch, { checked: propCurrentValue, onChange: handleChangePropValue }),
                React.createElement(LinkSet, { activeSchema: activeSchema, namepath: namepath, schemaListOptions: schemaListOptions })));
        case 'string':
            return (React.createElement(Space, null,
                React.createElement("strong", null,
                    propName,
                    "\uFF1A"),
                React.createElement(Input, { value: propCurrentValue, onChange: function (e) { return handleChangePropValue(e.target.value); } }),
                propName !== 'name' && React.createElement(LinkSet, { activeSchema: activeSchema, namepath: namepath, schemaListOptions: schemaListOptions })));
        case 'number':
            return (React.createElement(Space, null,
                React.createElement("strong", null,
                    propName,
                    "\uFF1A"),
                React.createElement(InputNumber, { value: propCurrentValue, onChange: handleChangePropValue, bordered: false }),
                React.createElement(LinkSet, { activeSchema: activeSchema, namepath: namepath, schemaListOptions: schemaListOptions })));
        default:
            return null;
    }
}
