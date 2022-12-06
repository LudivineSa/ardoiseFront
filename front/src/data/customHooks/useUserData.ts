import { useEffect } from 'react';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';

import { IInputUser } from '../../utils';
import { createUser } from '../Services/userService';

interface IUserData {
    user: IInputUser;
    setUser: (user: IInputUser) => void;
    createUser: (user: IInputUser) => void;
    isSuccess: boolean | undefined;
    setIsSuccess: (isSuccess: boolean | undefined) => void;
    errorMessage?: string;
}

export const useUserDataStore = create<IUserData>()(
    persist(
      (set) => ({
        isSuccess: undefined,
        setIsSuccess: (isSuccess: boolean | undefined) => set({ isSuccess }),
        user: {
            name: '',
            lastname: '',
            email: '',
            password: '',
            confirmationPassword: '',
        },
        setUser: (user: IInputUser) => set({ user }),
        createUser: (user: IInputUser) => {
          createUser(user)
            .then(() => {
              set(() => ({
                isSuccess: true,
              }))})
            .catch((error) => {
              set(() => ({
                isSuccess: false,
                errorMessage: error.message,
              }))})
        }
      }),
    ))

export const useRegisterSuccess = () => {
    const { setIsSuccess, isSuccess, errorMessage } = useUserDataStore();

    useEffect(() => {
      setIsSuccess(undefined)
    }, []); 

    useEffect(() => {
        if (isSuccess) {
            toast.success("Vous avez bien été enregistré !");
        } else if(isSuccess !== undefined) {
            toast.error(errorMessage as string);
        }
    }, [isSuccess]);
}

