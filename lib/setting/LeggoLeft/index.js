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
import React, { useMemo } from 'react';
import { Form } from 'antd';
import { leggoItemStore } from '../../public/leggoItemStore';
var layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};
export function LeggoLeft() {
    var leggoItems = useMemo(function () { return createLeggoItems(); }, []);
    return (React.createElement("div", { className: "leggo-setting-left" },
        React.createElement("strong", null, "\u7EC4\u4EF6\u5E93"),
        React.createElement(Form, __assign({}, layout),
            React.createElement("div", { className: "leggo-setting-left-form-content" }, leggoItems))));
}
function createLeggoItems() {
    var result = [];
    var handleDragStart = function (e) {
        var schema = e.target.dataset.schema;
        e.dataTransfer.setData('text/plain', schema);
    };
    for (var _i = 0, _a = Object.values(leggoItemStore); _i < _a.length; _i++) {
        var value = _a[_i];
        var type = value.type, FormItemComponent = value.FormItemComponent, setting = value.setting;
        var item = (React.createElement("div", { key: type, className: "item", draggable: true, onDragStart: handleDragStart, "data-schema": type },
            React.createElement("div", { className: "item-forbidden" },
                React.createElement(FormItemComponent, { setting: setting }))));
        result.push(item);
    }
    return result;
}
//# sourceMappingURL=index.js.map