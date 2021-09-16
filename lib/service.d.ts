import { TLeggoItemInfo, TLinkedInfo, TSchema, TSchemaType, TConfigs } from "./interface";
export declare class LeggoSchema implements TSchema {
    id: string;
    type: TSchemaType;
    configs: TConfigs;
    currentFormItemValue: any;
    linkingNames: Set<string>;
    needDefineGetterMap: Map<string, TLinkedInfo>;
    constructor(schemaType: TSchemaType, leggoItemInfo: TLeggoItemInfo);
    getName: () => string;
}
export declare const leggoItemStore: {
    total: {
        [x: string]: TLeggoItemInfo;
    };
    antd: {
        [key: string]: TLeggoItemInfo;
    };
};
