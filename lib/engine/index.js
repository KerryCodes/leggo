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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Form } from "antd";
import React, { useRef, useState } from "react";
import { leggoItemStore } from "../public/leggoItemStore";
var leggoStores = new WeakMap();
var Leggo = (function () {
    function Leggo(keyRef, setForceRender, schemaModel) {
        this.ref = keyRef;
        this.forceRender = function () { return setForceRender(function (pre) { return pre + 1; }); };
        this.schemaModel = schemaModel;
    }
    Leggo.prototype.updateSchemaModel = function (newSchemaModel) {
        this.schemaModel = newSchemaModel;
        this.forceRender();
    };
    Leggo.prototype.updateSchemaModelData = function (formItemName, changeDataFunc) {
        var _a, _b;
        var pickedSchema = (_a = this.schemaModel) === null || _a === void 0 ? void 0 : _a.schemaList.find(function (item) { return item.setting.itemProps.name === formItemName; });
        if (!pickedSchema) {
            return;
        }
        var setting = pickedSchema.setting, standardFormItem = pickedSchema.standardFormItem;
        changeDataFunc(setting, standardFormItem);
        (_b = pickedSchema.forceLeggoFormItemRender) === null || _b === void 0 ? void 0 : _b.call(pickedSchema);
    };
    Leggo.prototype.getForItem = function (type) {
        var _a;
        return (_a = leggoItemStore[type]) === null || _a === void 0 ? void 0 : _a.FormItemComponent;
    };
    return Leggo;
}());
export function useLeggo(schemaModel) {
    var keyRef = useRef(null);
    var _a = useState(0), setForceRender = _a[1];
    if (!leggoStores.has(keyRef)) {
        var leggo = new Leggo(keyRef, setForceRender, schemaModel);
        leggoStores.set(keyRef, leggo);
    }
    return leggoStores.get(keyRef);
}
export function LeggoForm(props) {
    var _a;
    var leggo = props.leggo, overlapFormProps = __rest(props, ["leggo"]);
    var _b = ((_a = leggoStores.get(leggo.ref)) === null || _a === void 0 ? void 0 : _a.schemaModel) || {}, formProps = _b.formProps, schemaList = _b.schemaList;
    return (React.createElement(Form, __assign({}, formProps, overlapFormProps), schemaList === null || schemaList === void 0 ? void 0 : schemaList.map(function (schema) { return React.createElement(LeggoFormItem, { key: schema.id, schema: schema }); })));
}
function LeggoFormItem(props) {
    var schema = props.schema;
    var type = schema.type, setting = schema.setting;
    var FormItemComponent = leggoItemStore[type].FormItemComponent;
    var _a = useState(0), setForceRender = _a[1];
    schema.standardFormItem = React.createElement(FormItemComponent, { setting: setting });
    schema.forceLeggoFormItemRender = function () { return setForceRender(function (pre) { return pre + 1; }); };
    return setting.customizedFormItem || schema.standardFormItem;
}
//# sourceMappingURL=index.js.map