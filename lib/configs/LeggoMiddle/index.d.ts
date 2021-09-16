import React from 'react';
import { TPostSchemaModel, TSchema } from '../../interface';
export declare function LeggoMiddle(props: React.PropsWithoutRef<{
    activeSchema: React.MutableRefObject<TSchema>;
    schemaList: TSchema[];
    setSchemaList: React.Dispatch<React.SetStateAction<TSchema[]>>;
    forceRender: () => void;
    onPostSchemaModel: TPostSchemaModel;
}>): JSX.Element;
