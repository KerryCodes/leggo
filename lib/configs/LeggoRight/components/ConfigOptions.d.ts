import React from 'react';
import { TOption, TSchema } from '../../../interface';
export declare function ConfigOptions(props: React.PropsWithChildren<{
    activeSchema: React.MutableRefObject<TSchema>;
    schemaListOptions: TOption[];
    handleChangePropValue: (value: any) => void;
}>): JSX.Element;
