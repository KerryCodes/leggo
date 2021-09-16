import React from 'react';
import { TItemStore, TPostSchemaModel } from '../interface';
export declare function LeggoConfigs(props: React.PropsWithChildren<{
    onPostSchemaModel: TPostSchemaModel;
}>): JSX.Element;
export declare namespace LeggoConfigs {
    var registerItemStore: (itemStore: TItemStore) => void;
}
