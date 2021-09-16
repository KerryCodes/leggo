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
import React from 'react';
import { Button } from 'antd';
import { leggoItemStore } from '../../../service';
export function DroppedFormItem(props) {
    var activeSchema = props.activeSchema, schema = props.schema, setSchemaList = props.setSchemaList, forceRender = props.forceRender;
    var id = schema.id, type = schema.type, configs = schema.configs;
    var StandardItemFC = leggoItemStore.total[type].StandardItemFC;
    var active = activeSchema.current === schema;
    var deleteSchema = function (e) {
        e.stopPropagation();
        if (active) {
            activeSchema.current = null;
        }
        setSchemaList(function (pre) { return pre.filter(function (it) { return it.id !== id; }); });
        forceRender();
    };
    var activateSchema = function (e) {
        e.stopPropagation();
        activeSchema.current = schema;
        forceRender();
    };
    return (React.createElement("div", { className: "dropped-item " + (active ? 'active-item' : ''), onClick: activateSchema },
        React.createElement(Button, { type: "text", className: "delete-butt", onClick: deleteSchema }, "X"),
        React.createElement(StandardItemFC, __assign({}, configs))));
}
