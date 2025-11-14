"use client";
import { SubmitButton } from "@/components/button";
import { getDataUser } from "@/lib/data";
import React, { use } from "react";
import { useActionState, useEffect, useState } from "react";
import { User } from "@/types/user";
import { State } from "@/types/state";
import { UpdateProfile } from "@/lib/action";
import { useSession } from "next-auth/react";

const FormEditProfile = ({id_user}:{id_user: string}) => {
    const initialState: State = { message: null, error: null }
    const [state, formAction] = useActionState(UpdateProfile, initialState)
    const [datas, setDatas] = useState<User | null>(null)
    const {update: updateSession, data: session} = useSession()

    useEffect(() => {
        const get_user_data = async() => {
            if(!id_user) return
            try{
                const user_data = await getDataUser(id_user)
                setDatas(user_data ?? null)
            }catch(error){
                console.log(error)
            }
        }
        get_user_data()
    }, [id_user])

    useEffect(() => {
        if(state.message?.includes('Berhasil')){
            if(session && session.user){
                updateSession({
                    name: datas?.name ?? "",
                    email: datas?.email ?? "",
                    role: session?.user.role ?? "user"
                })
            }
        }
    }, [state.message, datas, updateSession, session])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setDatas((prev) => prev ? { ...prev, [name]: value } : null)
    }

    return (
        <form action={formAction} className="space-y-6 bg-white p-5 rounded-lg w-1/2">
        {state?.message && (
            <div
                className={`p-4 mb-4 text-sm rounded-lg ${state.message.includes('Berhasil') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                role="alert"
            >
                <span className="font-medium">{state?.message}</span>
            </div>
        )}
        <div>
            <input type="hidden" name="id" value={id_user} />
            <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                Name
            </label>
            <input
                type="text"
                name="name"
                placeholder="Slim shady"
                value={datas?.name ?? ""}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
            />
            <div aria-live="polite" aria-atomic="true">
                <span className="text-sm text-red-500 mt-2">
                    {state?.error?.name}
                </span>
            </div>
        </div>
        <div>
            <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                Email
            </label>
            <input
                type="email"
                name="email"
                placeholder="slimshady@gmail.com"
                value={datas?.email ?? ""}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
            />
            <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
                {state?.error?.email}
            </span>
            </div>
        </div>
        <SubmitButton label="Edit" />
    </form>
    );
};

export default FormEditProfile;
