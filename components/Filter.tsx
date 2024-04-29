'use client'
import { useState } from 'react';
import CustomSelect from './CustomSelect';
import { vehicleBrands, vehicleType } from '@/constants';
import { useRouter } from 'next/navigation';
import { updateSearchParams } from '@/utils';

const Filter = () => {
    const router = useRouter();

    const handleFuelTypeChange = (value: string) => {
        updateSearchParamsAndPush('model',value.toLowerCase());
    }
    const handleModelChange = (value: string) => {
        updateSearchParamsAndPush('typeOfclass',value);
    }

    const updateSearchParamsAndPush = (type: string, value: string) => {
        const pathname = updateSearchParams(`${type}`, value);
        router.push(pathname);
    }

    return (
        <div className='flex items-center space-x-2 w-full md:w-fit'>
            <CustomSelect label='Choose Type' onChange={handleModelChange} options={vehicleType} containerStyle='z-40 border bg-white dark:bg-slate-800 dark:border-slate-700 rounded-md' name='model'/>
            <CustomSelect label='Choose Model' onChange={handleFuelTypeChange} options={vehicleBrands} containerStyle='border bg-white  dark:bg-slate-800 dark:border-slate-700 rounded-md' name='fueltype'/>
        </div>
    )
}

export default Filter;