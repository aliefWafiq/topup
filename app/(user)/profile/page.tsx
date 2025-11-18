import React from 'react'
import Image from 'next/image'
import Link from 'next/link';   
import { auth } from "@/auth";
import FormEditProfile from '@/components/FormEditProfile';
import { getDataUser } from '@/lib/data';

const ProfilePage = async() => {
    const session = await auth()
    const dataUser = await getDataUser(session?.user.id || '')
    return (
        <div className="flex flex-col items-center gap-4 justify-center min-h-screen py-32 px-8">
            <div className='bg-white w-1/2 rounded-lg overflow-hidden'>
                <div className='relative h-32 w-full'>
                    <Image
                        src={dataUser?.banner_image || "/profile-banner.jpg"}
                        fill
                        alt='banner'
                        className='object-cover'
                    />
                </div>
                <Link href="/edit-photo" className='relative flex items-end cursor-default'>
                    <Image
                        src={dataUser?.profile_image || "/avatar.jpg"}
                        alt="avatar"
                        width={80}
                        height={80}
                        className="rounded-full border-4 mx-4 border-white -mt-12 relative z-10 hover:opacity-90 hover:cursor-pointer"
                    />
                </Link>
                <div className='px-5 pt-2 mb-8'>
                    <div className='flex justify-between'>
                        <p className='text-2xl font-semibold'>{session?.user.name}</p>
                        <p className='bg-gray-200 rounded-lg text-base px-3 flex items-center'>{session?.user.role}</p>
                    </div>
                    <p className='text-gray-500'>{session?.user.email}</p>
                </div>
            </div>
            <FormEditProfile id_user={session?.user.id || ""}/>
            <div className='bg-white w-1/2 rounded-lg p-5'>
                <Link href={'/history-transaksi'} className='border-b-2 py-2 flex justify-between mb-4 hover:text-slate-600'>
                    <p>Histori Transaksi</p>
                    <p>{'>'}</p>
                </Link>
                <Link href='/list-id-game' className='border-b-2 py-2 flex justify-between hover:text-slate-600'>
                    <p>Id Game</p>
                    <p>{'>'}</p>
                </Link>
            </div>
        </div>
    )
}

export default ProfilePage