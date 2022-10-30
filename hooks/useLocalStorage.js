import React from "react"

function useLocalStorage(itemName, defaultValue){
	const [item, setItem] = React.useState(defaultValue)
	React.useEffect(() => {
        const localStorageItem= localStorage.getItem(itemName)
        let parsedItem = defaultValue
        if(localStorageItem){
            parsedItem = JSON.parse(localStorageItem) 
        }else{
            localStorage.setItem(itemName, JSON.stringify(defaultValue))
        }
        setItem(parsedItem)
	}, [defaultValue, itemName])

	const saveItem = (newItem) => {
        const itemSerialized = JSON.stringify(newItem)
        localStorage.setItem(itemName, itemSerialized)
        setItem(newItem)
	}

	
	return [item, saveItem]
}

export {useLocalStorage}