import React, { useRef, useState } from 'react';
import './styles/index.less';
import { LeggoLeft } from './LeggoLeft';
import { LeggoRight } from './LeggoRight';
import { LeggoMiddle } from './LeggoMiddle';
export function LeggoSetting(props) {
    var activeSchema = useRef(null);
    var _a = useState(0), setForceRender = _a[1];
    return (React.createElement("div", { className: "leggo-setting" },
        React.createElement(LeggoLeft, null),
        React.createElement(LeggoMiddle, { activeSchema: activeSchema, setForceRender: setForceRender, onPostSchemaModel: props.onPostSchemaModel }),
        React.createElement(LeggoRight, { activeSchema: activeSchema, setForceRender: setForceRender })));
}
//# sourceMappingURL=index.js.map