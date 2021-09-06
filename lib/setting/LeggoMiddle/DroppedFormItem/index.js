import React from 'react';
import { Button } from 'antd';
import { leggoItemStore } from '../../../public/leggoItemStore';
export function DroppedFormItem(props) {
    var schema = props.schema, setSchemas = props.setSchemas, activeSchema = props.activeSchema, setForceRender = props.setForceRender;
    var id = schema.id, type = schema.type, setting = schema.setting;
    var FormItemComponent = leggoItemStore[type].FormItemComponent;
    var active = activeSchema.current === schema;
    var deleteSchema = function (e) {
        e.stopPropagation();
        if (active) {
            activeSchema.current = null;
        }
        setSchemas(function (pre) { return pre.filter(function (it) { return it.id !== id; }); });
        setForceRender(function (pre) { return pre + 1; });
    };
    var activateSchema = function (e) {
        e.stopPropagation();
        activeSchema.current = schema;
        setForceRender(function (pre) { return pre + 1; });
    };
    return (React.createElement("div", { className: "dropped-item " + (active ? 'active-item' : ''), onClick: activateSchema },
        React.createElement(Button, { type: "text", className: "delete-butt", onClick: deleteSchema }, "X"),
        React.createElement(FormItemComponent, { setting: setting })));
}
//# sourceMappingURL=index.js.map