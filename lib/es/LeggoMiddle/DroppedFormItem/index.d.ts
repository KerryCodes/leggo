import React from 'react';
import './index.less';
import { TSchemaInfo } from '../../state';
export declare function DroppedFormItem(props: React.PropsWithoutRef<{
    schemaInfo: TSchemaInfo;
    setSchemas: React.Dispatch<React.SetStateAction<TSchemaInfo[]>>;
    activeSchema: React.MutableRefObject<TSchemaInfo>;
    setForceRender: React.Dispatch<React.SetStateAction<number>>;
}>): JSX.Element;
