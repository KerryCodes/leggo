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
import React, { Fragment, useMemo, useState } from 'react';
import { Form, Menu } from 'antd';
import { leggoItemStore } from '../../service';
var layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};
export function LeggoLeft() {
    var _a = useState('antd'), storeKey = _a[0], setStoreKey = _a[1];
    var leggoItems = useMemo(function () { return createLeggoItems(storeKey); }, [storeKey]);
    var menuItems = useMemo(function () { return Object.keys(leggoItemStore).map(function (item) { return React.createElement(Menu.Item, { key: item }, item); }); }, []);
    return (React.createElement(Fragment, null,
        React.createElement("div", null,
            React.createElement("div", { className: "top-area" },
                React.createElement("strong", null, "\u7EC4\u4EF6\u5E93")),
            React.createElement(Menu, { defaultSelectedKeys: ['antd'], mode: "inline", onSelect: function (_a) {
                    var key = _a.key;
                    return setStoreKey(key);
                } }, menuItems)),
        React.createElement("div", { className: "leggo-configs-left" },
            React.createElement(Form, __assign({}, layout),
                React.createElement("div", { className: "leggo-configs-left-form-content" }, leggoItems)))));
}
function createLeggoItems(storeKey) {
    var result = [];
    var selectedStore = leggoItemStore[storeKey];
    var handleDragStart = function (e) {
        var schemaType = e.target.dataset.type;
        e.dataTransfer.setData('text/plain', schemaType);
    };
    for (var _i = 0, _a = Object.values(selectedStore); _i < _a.length; _i++) {
        var value = _a[_i];
        var type = value.type, StandardItemFC = value.StandardItemFC, configs = value.configs;
        var item = (React.createElement("div", { key: type, className: "item", draggable: true, onDragStart: handleDragStart, "data-type": type },
            React.createElement("div", { className: "item-forbidden" },
                React.createElement(StandardItemFC, __assign({}, configs)))));
        result.push(item);
    }
    return result;
}
