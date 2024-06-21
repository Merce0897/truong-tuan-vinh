import React from 'react'

const CurrencyRow = (props) => {
    const { title, rightRender, bottomDivider } = props
    return (
        <div className={`w-full py-2 flex justify-between my-2 ${bottomDivider && 'border-b-2 border-solid border-slate-200'}`}>
            <p className='font-bold'>{title}</p>
            {rightRender}
        </div>
    )
}

export default CurrencyRow