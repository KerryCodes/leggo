import React from 'react';
import { TSchema } from '../../../interface';
export declare function ConfigProp(props: React.PropsWithoutRef<{
    propOwner: any;
    namepath: (string | number)[];
    propName: string;
    propDefaultValue: any;
    activeSchema: React.MutableRefObject<TSchema>;
    schemaList: TSchema[];
    forceRender: () => void;
}>): JSX.Element;
