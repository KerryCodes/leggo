import React from "react"
import { StandardFormItem } from "../components/StandardFormItem"
import { leggoItemStore } from "../itemStore"


export function createLeggoItems(storeKey: keyof typeof leggoItemStore){
  const result= []
  const selectedStore= leggoItemStore[storeKey]
  
  const handleDragStart= (e: React.DragEvent) => {
    //@ts-ignore
    const schemaType= e.target.dataset.type
    e.dataTransfer.setData('text/plain', schemaType)
  }

  for(const value of Object.values(selectedStore)){
    const { type, StandardInput, configs }= value
    const item= (
      <div key={type} className="item" draggable onDragStart={handleDragStart} data-type={type}>
        <div className="item-forbidden">
          <StandardFormItem StandardInput={StandardInput} configs={configs} />
        </div>
      </div>
    )
    result.push(item)
  }
  
  return result
}