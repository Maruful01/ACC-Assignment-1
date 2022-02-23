import React from 'react'

const List = ({items, onClick} : {items: string[], onClick: (item: string) => void}) => {
  return (
    <div>
        {
            items.map ((item, index) => 
               <div>
                    <button style={{display: "inline-table", background: "none", border: "none"}} key={index} onClick={() => onClick(item)}> {item} </button>
               </div>
                )
        }
    </div>
  )
}

export default List