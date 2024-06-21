
import React, { useState, useEffect } from 'react'

import { images } from '../utils/images'
import CurrencyField from './CurrencyField'
import CurrencyRow from './CurrencyRow'
import { addCommas } from '../utils/convertNum'


const FormExchange = () => {
    const [tokens, setTokens] = useState([])
    const [sendToken, setSendToken] = useState('USDC')
    const [sendAmount, setSendAmount] = useState('')
    const [receiveToken, setReceiveToken] = useState('LUNA')
    const [confirm, setConfirm] = useState(false)
    const [error, setError] = useState(0)

    const [exchangeRate, setExchangeRate] = useState('')

    useEffect(() => {
        fetch('https://interview.switcheo.com/prices.json')
            .then(res => res.json()
                .then(resData => {
                    for (let token of resData) {
                        token['img'] = images[token.currency]
                    }
                    setTokens(resData)
                }))

    }, [])


    const handleSwap = () => {
        if (!sendAmount) return setError(1)
        if (sendToken === receiveToken) return setError(2)
        const sendPrice = tokens.find(token => token.currency === sendToken).price
        const receivePrice = tokens.find(token => token.currency === receiveToken).price
        setExchangeRate((sendPrice / receivePrice))
        setConfirm(true)
    }

    return (
        <div className='bg-white w-1/5 p-4 z-10 min-w-96 rounded-lg'>
            {
                confirm ? (
                    <div>
                        <h2 className='font-bold text-[1.5rem]'>You'll receive</h2>
                        <div className='flex w-full mt-4 justify-between px-4 py-2.5 bg-slate-200 font-bold rounded'>
                            <span className='flex'><img src={images[receiveToken]} className='mr-2' alt="receive-token" />{receiveToken}</span>
                            <span>{addCommas((parseFloat(sendAmount.replace(",", "")) * exchangeRate).toFixed(2))}</span>
                        </div>
                        <div className='w-full'>
                            <CurrencyRow title={'Pay with'} bottomDivider rightRender={<div className='flex'>
                                <span className='flex'><img src={images[sendToken]} className='mr-2' alt="receive-token" />{sendAmount}</span>
                                <span className='ml-2'>{sendToken}</span>
                            </div>} />
                            <CurrencyRow title={'Exchange Rate'} bottomDivider rightRender={<div className='flex'>
                                <p>1 {receiveToken}</p>
                                <p className='mx-2'>&#8646;</p>
                                <p>{parseFloat(exchangeRate).toFixed(6)} {sendToken}</p>
                            </div>} />
                            <CurrencyRow title={'Processing Time'} rightRender={<p>
                                Instant
                            </p>} />
                        </div>
                        <div className='w-full flex justify-around mt-4'>
                            <button onClick={() => setConfirm(false)} className='hover:bg-slate-200 border-2 border-solid border-slate-700 px-10 py-2 rounded-lg'>
                                Cancel
                            </button>
                            <button onClick={() => {
                                alert('Transaction Success')
                                setConfirm(false)
                            }} className='hover:bg-slate-500 px-10 py-2 bg-slate-700 text-white rounded-lg'>
                                Confirm
                            </button>
                        </div>
                    </div>
                )
                    : (
                        <div >
                            <CurrencyField title={'From'}
                                tokens={tokens}
                                token={sendToken}
                                setToken={setSendToken}
                                inputVal={sendAmount}
                                handleInput={(value) => {
                                    setSendAmount(value)
                                    if (error) setError(0)
                                }}
                                error={error}
                                setError={setError} />
                            <hr className='border border-solid border-slate-200 swap-icon' />
                            <CurrencyField title={'To'}
                                tokens={tokens}
                                token={receiveToken}
                                setToken={setReceiveToken}
                                disabled />
                            <p className='m-0 text-sm italic'>(Ref: USD)</p>
                            <button onClick={handleSwap} className='w-full bg-slate-800 text-white rounded py-3.5 hover:bg-slate-700'>
                                Swap
                            </button>

                        </div>
                    )
            }


        </div >

    )
}

export default FormExchange