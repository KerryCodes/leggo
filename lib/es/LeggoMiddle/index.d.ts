import React from 'react';
import './index.less';
import { TPostSchemaModel, TSchemaInfo } from '../state';
export declare function LeggoMiddle(props: React.PropsWithoutRef<{
    activeSchema: React.MutableRefObject<TSchemaInfo>;
    setForceRender: React.Dispatch<React.SetStateAction<number>>;
    onPostSchemaModel: TPostSchemaModel;
}>): JSX.Element;
