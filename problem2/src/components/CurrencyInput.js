import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import {
    ChevronDownIcon,
} from '@heroicons/react/16/solid'
import React from 'react'
import { images } from '../utils/images'

const CurrencyInput = (props) => {
    const { tokens, token, setToken } = props
    return (
        <div >
            <Menu>
                <MenuButton className="inline-flex w-[7rem] h-10 justify-between items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                    <span className='flex'>
                        <img src={images[token]} className='mr-2' alt="token" width={20} height={20} />
                        {token}
                    </span>
                    <ChevronDownIcon className="size-4 fill-white/60" />
                </MenuButton>
                <Transition
                    enter="transition ease-out duration-75"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <MenuItems
                        anchor="bottom end"
                        className=" w-60 h-96 px-2 py-1 origin-top-right mt-1 z-20 rounded-xl border border-white/5 bg-slate-700 p-1 text-sm/6 text-slate-100 [--anchor-gap:var(--spacing-1)] focus:outline-none"
                    >
                        {
                            tokens.map((token, index) => (
                                <MenuItem key={index}>
                                    <button onClick={() => setToken(token.currency)} className="group flex w-full items-center gap-2 px-2 py-4 rounded-lg data-[focus]:bg-slate-600">
                                        <img src={token.img} alt="token-logo" width={24} height={24} />
                                        {token.currency}
                                    </button>
                                </MenuItem>
                            ))
                        }

                    </MenuItems>
                </Transition>
            </Menu>
        </div>
    )
}

export default CurrencyInput