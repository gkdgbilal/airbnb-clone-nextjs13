'use client'

import React from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import axios from 'axios'
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import { useRegisterModal } from '@/app/hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import { signIn } from 'next-auth/react'
import { useLoginModal } from '@/app/hooks/useLoginModal'

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        // await axios.post('/api/register', data)
        //     .then((res) => {
        //         registerModal.onClose()
        //         console.log('res', res)
        //     })
        //     .catch((err) => {
        //         toast.error('Something went wrong')
        //     })
        //     .finally(() => {
        //         setIsLoading(false)
        //     })
        try {
            const res = await axios.post('/api/register', data)
            toast.success('Account created successfully')
            registerModal.onClose()
            loginModal.onOpen()
        } catch (err) {
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    const toggle = useCallback(() => {
        registerModal.onClose()
        loginModal.onOpen()
    }, [loginModal, registerModal])

    const bodyContent = (
        <div
            className='flex flex-col gap-4'
        >
            <Heading
                title='Welcome to Airbnb'
                subtitle='Create an account'
            />
            <Input
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='password'
                label='Password'
                type='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div
            className='flex flex-col gap-4 mt-3'
        >
            <hr />
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div
                className='text-neutral-500 text-center mt-4 font-light'
            >
                <div
                    className='flex flex-row items-center justify-center gap-2'
                >
                    <div>
                        Already have an account?
                    </div>
                    <div
                        className='text-neutral-800 cursor-pointer hover:underline'
                        onClick={toggle}
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onSubmit={handleSubmit(onSubmit)}
            onClose={registerModal.onClose}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal