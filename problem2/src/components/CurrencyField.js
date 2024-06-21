import React, { useEffect, useState } from 'react'
import CurrencyInput from './CurrencyInput'
import { Input } from '@headlessui/react'
import { removeNonNumeric, addCommas } from '../utils/convertNum'

const CurrencyField = (props) => {
    const { title, tokens, token, setToken, inputVal, handleInput, disabled, error } = props
    const [price, setPrice] = useState('')

    useEffect(() => {
        setPrice(tokens.find(tokenItem => tokenItem.currency === token)?.price)
        console.log(token);
    }, [token, tokens])




    return (
        <div className='mb-4'>
            <h2 className='font-bold'>{title}</h2>
            <div className='flex mt-4 mb-4 gap-2'>
                <CurrencyInput tokens={tokens} token={token} setToken={setToken} />
                {!disabled && <div>
                    <Input value={inputVal}
                        onChange={(e) => {
                            const cleanedValue = removeNonNumeric(e.target.value);
                            handleInput(addCommas(cleanedValue));
                        }}
                        className={`flex-1 h-10 font-bold focus:outline-none border-solid border-2 ${error !== 0 ? 'border-red-500' : 'border-slate-800'} px-2 rounded`} name="send" type="text" />
                    {error !== 0 && <p className='text-red-500 mt-1 italic'>{error === 1 ? 'Please fill the send amount' : 'Please ensure not to choose the same coin'}</p>}
                </div>}
            </div>
            <p className='font-bold'>{price}</p>
        </div>
    )
}

export default CurrencyField