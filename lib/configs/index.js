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
import React, { useRef, useState } from 'react';
import { LeggoLeft } from './LeggoLeft';
import { LeggoRight } from './LeggoRight';
import { LeggoMiddle } from './LeggoMiddle';
import { leggoItemStore } from '../service';
export function LeggoConfigs(props) {
    var activeSchema = useRef(null);
    var _a = useState([]), schemaList = _a[0], setSchemaList = _a[1];
    var _b = useState(0), setForceRender = _b[1];
    var forceRender = function () { return setForceRender(function (pre) { return pre + 1; }); };
    return (React.createElement("div", { className: "leggo-configs" },
        React.createElement(LeggoLeft, null),
        React.createElement(LeggoMiddle, { schemaList: schemaList, setSchemaList: setSchemaList, activeSchema: activeSchema, forceRender: forceRender, onPostSchemaModel: props.onPostSchemaModel }),
        React.createElement(LeggoRight, { schemaList: schemaList, activeSchema: activeSchema, forceRender: forceRender })));
}
LeggoConfigs.registerItemStore = function (itemStore) {
    var storeName = itemStore.storeName, store = itemStore.store;
    if (!leggoItemStore[storeName]) {
        leggoItemStore[storeName] = store;
        leggoItemStore.total = __assign(__assign({}, store), leggoItemStore.total);
    }
};
