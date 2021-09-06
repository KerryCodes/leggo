import React from 'react';
import { TPostSchemaModel, TSchema } from '../../public/interface';
export declare function LeggoMiddle(props: React.PropsWithoutRef<{
    activeSchema: React.MutableRefObject<TSchema>;
    setForceRender: React.Dispatch<React.SetStateAction<number>>;
    onPostSchemaModel: TPostSchemaModel;
}>): JSX.Element;
