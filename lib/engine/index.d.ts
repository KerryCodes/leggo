import { FormProps } from "antd";
import React from "react";
import { TSchemasModel, TSchema, TConfigs } from "../interface";
declare class Leggo {
    private readonly forceLeggoFormRender;
    readonly ref: React.MutableRefObject<any>;
    schemaModel: TSchemasModel;
    constructor(keyRef: React.MutableRefObject<any>, setForceRender: React.Dispatch<React.SetStateAction<number>>, schemaModel?: TSchemasModel, middleware?: (value: TSchema, index: number, array: TSchema[]) => void);
    resetSchemaModel(newSchemaModel: TSchemasModel, middleware?: (value: TSchema, index: number, array: TSchema[]) => void): void;
    updateSchema(formItemName: string, changeSchemaFunc: (configs: TConfigs) => void): void;
}
declare function LeggoForm(props: React.PropsWithoutRef<{
    leggo: Leggo;
} & FormProps>): JSX.Element;
declare namespace LeggoForm {
    var useLeggo: (schemaModel?: TSchemasModel) => Leggo;
}
export { LeggoForm };
