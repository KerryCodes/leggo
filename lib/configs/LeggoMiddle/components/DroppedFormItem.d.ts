import React from 'react';
import { TSchema } from '../../../interface';
export declare function DroppedFormItem(props: React.PropsWithoutRef<{
    activeSchema: React.MutableRefObject<TSchema>;
    schema: TSchema;
    setSchemaList: React.Dispatch<React.SetStateAction<TSchema[]>>;
    forceRender: () => void;
}>): JSX.Element;
