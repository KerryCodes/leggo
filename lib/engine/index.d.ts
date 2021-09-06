import React from "react";
import { TSchemasModel, TSetting } from "../public/interface";
declare class Leggo {
    private readonly forceRender;
    readonly ref: React.MutableRefObject<any>;
    schemaModel: TSchemasModel;
    constructor(keyRef: React.MutableRefObject<any>, setForceRender: React.Dispatch<React.SetStateAction<number>>, schemaModel?: TSchemasModel);
    updateSchemaModel(newSchemaModel: TSchemasModel): void;
    updateSchemaModelData(formItemName: string, changeDataFunc: (setting: TSetting, standardFormItem: JSX.Element) => void): void;
    getForItem(type: string): React.FC<any>;
}
export declare function useLeggo(schemaModel?: TSchemasModel): Leggo;
export declare function LeggoForm(props: React.PropsWithoutRef<any>): JSX.Element;
export {};
