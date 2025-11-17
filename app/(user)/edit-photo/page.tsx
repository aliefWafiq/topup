"use client"
import React, { ChangeEvent, useEffect } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SubmitButton } from '@/components/button'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { updateUserPhoto } from '@/lib/action'
import { useRouter } from 'next/navigation'
import { getDataUser } from '@/lib/data'

interface InputFileProps {}

const EditPhoto = (props: InputFileProps) => {
    const {data: session, status, update} = useSession()
    const [selectedFoto, setSelectedFoto] = useState<string|ArrayBuffer|null>(null)
    const [selectedBanner, setSelectedBanner] = useState<string|ArrayBuffer|null>(null)
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchDatauser = async() => {
            if(session?.user.id) {
                try {
                    const user = await getDataUser(session.user.id)

                    if(user) {
                        setSelectedFoto(user.profile_image || "/avatar.jpg")
                        setSelectedBanner(user.banner_image || "/profile-banner.jpg")
                    }
                } catch (error) {
                    console.error("error fetching data:", error)
                }
            }
        }
        fetchDatauser()
    }, [session?.user.id])

    const handleFileChangeFoto = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if(file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setSelectedFoto(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleFileChangeBanner = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if(file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setSelectedBanner(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async(formData: FormData) => {
        setIsLoading(true)

        try {
            const res = await updateUserPhoto(formData)

            if(res.success) {
                await update()

                setSelectedFoto(null)
                setSelectedBanner(null)

                const bannerInput = document.getElementById('banner') as HTMLInputElement
                const photoInput = document.getElementById('photo-profile') as HTMLInputElement
                if (bannerInput) bannerInput.value = ''
                if (photoInput) photoInput.value = ''

                if (session?.user?.id) {
                    const user = await getDataUser(session.user.id)
                    if (user) {
                        setSelectedFoto(user.profile_image || "/avatar.jpg")
                        setSelectedBanner(user.banner_image || "/profile-banner.jpg")
                    }
                }
                alert(res.message)
                router.refresh()
            }else {
                alert(res.message)
            }
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center gap-4 justify-center min-h-screen py-32 px-8">
            <div className='bg-white w-1/2 rounded-lg overflow-hidden'>
                <div className='relative h-32 w-full'>
                    <Image
                        src={selectedBanner as string || "/profile-banner.jpg"}
                        fill
                        alt='banner'
                        className='object-cover'
                    />
                </div>
                <div className='relative flex items-end'>
                    <div className="rounded-full border-4 mx-4 border-white -mt-12 relative z-10 w-20 h-20 overflow-hidden">
                        <Image
                            src={selectedFoto as string || "/avatar.jpg"}
                            alt="avatar"
                            fill
                        />
                    </div>
                </div>
                <form action={handleSubmit} className='p-5'>
                    <Input type='hidden' defaultValue={session?.user.id} name='userId' />

                    <Label htmlFor='banner' className='mb-2'>Banner:</Label>
                    <Input id='banner' name='banner' type='file' accept='image/jpeg,image/jpg,image/png,image/webp,image' className='mb-4' onChange={handleFileChangeBanner} disabled={isLoading}/>

                    <Label htmlFor='photo' className='mb-2'>Foto Profile:</Label>
                    <Input id='photo' name='photo' type='file' accept='image/jpeg,image/jpg,image/png,image/webp,image' className='mb-8' onChange={handleFileChangeFoto} disabled={isLoading}/>

                    <SubmitButton label='update'/>
                </form>
            </div>
        </div>
    )
}

export default EditPhoto