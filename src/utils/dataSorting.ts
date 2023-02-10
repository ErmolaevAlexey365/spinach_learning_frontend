export const convertFilterObjToQueryUrl = (filter: any) => {
    const filterUrl = Object.keys(filter).reduce((acc, key) => {
        const isArray = Array.isArray(filter[key]);
        let value: string;
        if (isArray) {
            const filteredValues = filter[key].filter((el: any) => !!el);
            value = filteredValues.reduce((accum: any, el: any) => accum + el + ',', '');
            if (filteredValues.length === 0)
                return acc;
        } else {
            value = filter[key] ? filter[key] : '';
            if (!value)
                return acc;
        }
        return acc + `${key}=${value}&`;
    }, '');
    return filterUrl;
}


export const sortDataInputsAndWorkerCheckbox=(data:any)=>{
    let objectInputs:any={
    }

    for (let key in data){
        if(key==='title' || key==='description'|| key==='timer'|| key==='account'|| key==='sorting' || key==='enableScoring'){
            objectInputs[key]=data[key]
            delete data[key]

        }





    }

    return [objectInputs,convertFilterObjToQueryUrl(data)];
}