import { TItemStore } from "../interface"
import { leggoItemStore } from "../itemStore"


export function registerItemStore(itemStore: TItemStore){
  const { storeName, store }= itemStore
  //@ts-ignore
  if(!leggoItemStore[storeName]){
    //@ts-ignore
    leggoItemStore[storeName]= store
    leggoItemStore.total= {...store, ...leggoItemStore.total}
  }
}