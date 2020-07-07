
export const updateObjectInArray = (items,ids,objPropname, newobjprops) => {
    return items.map(u => {
        if (u[objPropname] === ids) {
            return {...u, ...newobjprops}
        }
        return u;
    })
}