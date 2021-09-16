var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useReducer } from 'react';
import { Button, Divider, Input, InputNumber, Popover, Radio, Space } from 'antd';
var reducer = function (state, action) {
    var _a;
    return (__assign(__assign({}, state), (_a = {}, _a[action.type] = action.payload, _a)));
};
export function ConfigWordsLimit(props) {
    var wordsLimit = props.wordsLimit, forceRender = props.forceRender;
    var max = wordsLimit.max, min = wordsLimit.min, message = wordsLimit.message, rules = wordsLimit.rules;
    var _a = useReducer(reducer, rules), CurrentRules = _a[0], dispatch = _a[1];
    var handleChangeRules = function (type, payload) {
        rules[type] = payload;
        dispatch({ type: type, payload: payload });
        forceRender();
    };
    var handleChangePropValue = function (propName, newValue) {
        wordsLimit[propName] = newValue;
        forceRender();
    };
    return (React.createElement("div", null,
        React.createElement("strong", null, "wordsLimit\uFF1A"),
        React.createElement(Popover, { trigger: "click", content: React.createElement("div", { className: "words-count-configs-content" },
                React.createElement("div", null,
                    React.createElement("span", { className: "title" }, "\u6C49\u5B57\uFF1A"),
                    React.createElement(Radio.Group, { onChange: function (e) { return handleChangeRules('zh', e.target.value); }, value: CurrentRules.zh },
                        React.createElement(Radio, { value: 1 }, "1\u4E2A"),
                        React.createElement(Radio, { value: 2 }, "2\u4E2A"))),
                React.createElement(Divider, null),
                React.createElement("div", null,
                    React.createElement("span", { className: "title" }, "\u5176\u5B83\u5B57\u7B26\uFF1A"),
                    React.createElement(Radio.Group, { onChange: function (e) { return handleChangeRules('others', e.target.value); }, value: CurrentRules.others },
                        React.createElement(Radio, { value: 0.5 }, "0.5\u4E2A"),
                        React.createElement(Radio, { value: 1 }, "1\u4E2A"))),
                React.createElement(Divider, null),
                React.createElement("div", null,
                    React.createElement("span", { className: "title" }, "\u7A7A\u683C\uFF1A"),
                    React.createElement(Radio.Group, { onChange: function (e) { return handleChangeRules('blank', e.target.value); }, value: CurrentRules.blank },
                        React.createElement(Radio, { value: true }, "\u5305\u542B"),
                        React.createElement(Radio, { value: false }, "\u4E0D\u5305\u542B")))) },
            React.createElement(Button, { type: "link", size: "small" }, "\u5B57\u7B26\u6570\u7EDF\u8BA1\u89C4\u5219")),
        React.createElement("div", { className: "configs-area" },
            React.createElement(Space, null,
                React.createElement("strong", null, "max\uFF1A"),
                React.createElement(InputNumber, { min: 1, defaultValue: max, onChange: function (value) { return handleChangePropValue('max', value); }, bordered: false })),
            React.createElement(Space, null,
                React.createElement("strong", null, "min\uFF1A"),
                React.createElement(InputNumber, { min: 0, defaultValue: min, onChange: function (value) { return handleChangePropValue('min', value); }, bordered: false })),
            React.createElement(Space, null,
                React.createElement("strong", null, "message\uFF1A"),
                React.createElement(Input, { defaultValue: message, onChange: function (e) { return handleChangePropValue('message', e.target.value); } })))));
}
