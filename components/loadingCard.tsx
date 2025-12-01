import React from 'react'
import Skeleton from '@/components/skeleton'

const LoadingCard = () => {
    return (
        <div className="space-y-6 flex space-x-4 justify-center">
            <div className="space-y-2">
                <Skeleton className="w-[26ch] h-[30ch]"/>
                <Skeleton className="w-[20ch] h-[1rem]"/>
            </div>
            <div className="space-y-2">
                <Skeleton className="w-[26ch] h-[30ch]"/>
                <Skeleton className="w-[20ch] h-[1rem]"/>
            </div>
            <div className="space-y-2">
                <Skeleton className="w-[26ch] h-[30ch]"/>
                <Skeleton className="w-[20ch] h-[1rem]"/>
            </div>
            <div className="space-y-2">
                <Skeleton className="w-[26ch] h-[30ch]"/>
                <Skeleton className="w-[20ch] h-[1rem]"/>
            </div>
        </div>
    )
}

export default LoadingCard