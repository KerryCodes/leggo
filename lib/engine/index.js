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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Form } from "antd";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { leggoItemStore } from "../service";
import axios from 'axios';
var leggoStores = new WeakMap();
var Leggo = (function () {
    function Leggo(keyRef, setForceRender, schemaModel, middleware) {
        this.ref = keyRef;
        this.forceLeggoFormRender = function () { return setForceRender(function (pre) { return pre + 1; }); };
        middleware && schemaModel.schemaList.forEach(middleware);
        this.schemaModel = schemaModel;
    }
    Leggo.prototype.resetSchemaModel = function (newSchemaModel, middleware) {
        middleware && newSchemaModel.schemaList.forEach(middleware);
        this.schemaModel = newSchemaModel;
        this.forceLeggoFormRender();
    };
    Leggo.prototype.updateSchema = function (formItemName, changeSchemaFunc) {
        var _a, _b;
        var targetSchema = (_a = this.schemaModel) === null || _a === void 0 ? void 0 : _a.schemaList.find(function (schema) { return schema.getName() === formItemName; });
        if (targetSchema) {
            var configs = targetSchema.configs;
            changeSchemaFunc(configs);
            (_b = targetSchema.forceLeggoFormItemRender) === null || _b === void 0 ? void 0 : _b.call(targetSchema);
        }
    };
    return Leggo;
}());
function LeggoForm(props) {
    var _a;
    var leggo = props.leggo, onValuesChange = props.onValuesChange, overlapFormProps = __rest(props, ["leggo", "onValuesChange"]);
    var _b = ((_a = leggoStores.get(leggo.ref)) === null || _a === void 0 ? void 0 : _a.schemaModel) || {}, formProps = _b.formProps, schemaList = _b.schemaList;
    var handleValuesChange = function (changedValues, allValues) {
        var _loop_1 = function (name_1, value) {
            var changedSchema = schemaList.find(function (schema) { return schema.getName() === name_1; });
            changedSchema.currentFormItemValue = Array.isArray(value) ? value.join() : value;
            changedSchema.linkingNames.forEach(function (linkingName) {
                var targetSchema = schemaList.find(function (schema) { return schema.getName() === linkingName; });
                targetSchema.forceLeggoFormItemRender();
            });
        };
        for (var _i = 0, _a = Object.entries(changedValues); _i < _a.length; _i++) {
            var _b = _a[_i], name_1 = _b[0], value = _b[1];
            _loop_1(name_1, value);
        }
        onValuesChange(changedValues, allValues);
    };
    return (React.createElement(Form, __assign({}, formProps, overlapFormProps, { onValuesChange: handleValuesChange }), schemaList === null || schemaList === void 0 ? void 0 : schemaList.map(function (schema) { return React.createElement(LeggoItem, { key: schema.id, schema: schema, schemaList: schemaList }); })));
}
LeggoForm.useLeggo = function (schemaModel) {
    var leggo = null;
    var keyRef = useRef(null);
    var _a = useState(0), setForceRender = _a[1];
    if (!leggoStores.has(keyRef)) {
        leggo = new Leggo(keyRef, setForceRender, schemaModel);
        leggoStores.set(keyRef, leggo);
    }
    return leggo || leggoStores.get(keyRef);
};
function LeggoItem(props) {
    var _a, _b, _c;
    var schema = props.schema, schemaList = props.schemaList;
    var type = schema.type, configs = schema.configs, needDefineGetterMap = schema.needDefineGetterMap;
    var postman = configs.postman, CustomizedItemFC = configs.CustomizedItemFC;
    var postmanParamsValueList = ((_a = postman === null || postman === void 0 ? void 0 : postman.params) === null || _a === void 0 ? void 0 : _a.map(function (item) { return item.value; })) || [];
    var postmanDataValueList = ((_b = postman === null || postman === void 0 ? void 0 : postman.data) === null || _b === void 0 ? void 0 : _b.map(function (item) { return item.value; })) || [];
    var _d = useState(0), setForceRender = _d[1];
    var StandardFormItemFC = (_c = leggoItemStore.total[type]) === null || _c === void 0 ? void 0 : _c.StandardItemFC;
    var standardItem = StandardFormItemFC && React.createElement(StandardFormItemFC, __assign({}, configs));
    useEffect(function () {
        schema.forceLeggoFormItemRender = function () { return setForceRender(function (pre) { return pre + 1; }); };
    }, []);
    useLayoutEffect(function () {
        needDefineGetterMap.forEach(function (getterInfo) {
            var observedName = getterInfo.observedName, namepath = getterInfo.namepath, reference = getterInfo.reference, rule = getterInfo.rule;
            var selfName = schema.getName();
            var linkedSchema = schemaList.find(function (schema) { return schema.getName() === observedName; });
            var targetKey = namepath.slice(-1)[0];
            var targetProp = namepath.slice(0, -1).reduce(function (pre, cur) { return pre[cur]; }, configs);
            linkedSchema.linkingNames.add(selfName);
            Reflect.defineProperty(targetProp, targetKey, {
                get: function () {
                    var targetValue = linkedSchema.currentFormItemValue;
                    if (reference && rule) {
                        switch (rule) {
                            case '<':
                                return targetValue < reference;
                            case '<=':
                                return targetValue <= reference;
                            case '===':
                                return targetValue === reference;
                            case '>=':
                                return targetValue >= reference;
                            case '>':
                                return targetValue > reference;
                        }
                    }
                    return targetValue;
                }
            });
        });
    }, []);
    useEffect(function () {
        var _a = postman || {}, method = _a.method, url = _a.url, params = _a.params, data = _a.data;
        if (method && url) {
            var paramsParsed = params === null || params === void 0 ? void 0 : params.reduce(function (pre, cur) {
                var value = cur.value;
                pre[cur.key] = value === '' ? undefined : value;
                return pre;
            }, {});
            var dataParsed = data === null || data === void 0 ? void 0 : data.reduce(function (pre, cur) {
                pre[cur.key] = cur.value;
                return pre;
            }, {});
            axios({ method: method, url: url, params: paramsParsed, data: dataParsed })
                .then(function (res) {
                configs.inputProps.options = res.data.data;
                setForceRender(function (pre) { return pre + 1; });
            });
        }
    }, __spreadArray(__spreadArray([], postmanParamsValueList, true), postmanDataValueList, true));
    return CustomizedItemFC ? React.createElement(CustomizedItemFC, null, standardItem) : standardItem;
}
export { LeggoForm };
