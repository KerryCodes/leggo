import { cloneDeep } from "lodash"
import { TConfigs, TLeggoItemInfo, TLinkedInfo, TSchema, TSchemaType } from "../interface"


export class LeggoSchema implements TSchema{
  id: string
  type: TSchemaType
  configs: TConfigs
  currentItemValue: any
  needDefineGetterProps: { [namepath: string]: TLinkedInfo }
  constructor(schemaType: TSchemaType, leggoItemInfo: TLeggoItemInfo){
    this.id= Date.now().toString()
    this.type= schemaType
    this.configs= cloneDeep(leggoItemInfo).configs
    this.currentItemValue= null
    this.needDefineGetterProps= {}
    const name= this.configs.itemProps.name
    if(name !== undefined){
      this.configs.itemProps.name= name + Math.random().toString(36).substring(2, 5)
    }
  }
  public getStringedName= () => String(this.configs.itemProps.name)
}