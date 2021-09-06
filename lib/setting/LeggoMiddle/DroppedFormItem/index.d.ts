import React from 'react';
import { TSchema } from '../../../public/interface';
export declare function DroppedFormItem(props: React.PropsWithoutRef<{
    schema: TSchema;
    setSchemas: React.Dispatch<React.SetStateAction<TSchema[]>>;
    activeSchema: React.MutableRefObject<TSchema>;
    setForceRender: React.Dispatch<React.SetStateAction<number>>;
}>): JSX.Element;
