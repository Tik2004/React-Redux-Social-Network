import React, {useState} from "react";
import s from "./Paginator.module.css";
import cn from 'classnames';

let Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount/10);
    let [portionNumber, setportionNumber] = useState(1);
    let leftportionpagenumber = (portionNumber - 1 ) * 10 + 1;
    let rightportionpagenumber=(portionNumber * 10);

    return (
            <div>
                <div>{portionNumber > 2 && <button onClick={() =>{setportionNumber(1);props.onPageChanged(1)}} >First</button>}
                    {portionNumber < portionCount-1 &&
                    <button onClick={() =>{setportionNumber(portionCount);props.onPageChanged(pagesCount-1)}} >Last</button>}
                </div>

                {portionNumber > 1 && <button onClick={() =>{setportionNumber(portionNumber - 1); props.onPageChanged(leftportionpagenumber-10) }} >Previous</button>}
                {pages.
                    filter(p => p >= leftportionpagenumber && p<=rightportionpagenumber)
                    .map(p => {
                    return <button onClick={() => {
                        props.onPageChanged(p)
                    }} className={p === props.currentPage ? s.selectedbitch : s.notselected}> {p} </button>
                })}
                {portionCount > portionNumber && <button onClick={() => {setportionNumber(portionNumber + 1); props.onPageChanged(leftportionpagenumber+10)}}>Next</button>}

            </div>
    )
}
export default Paginator;