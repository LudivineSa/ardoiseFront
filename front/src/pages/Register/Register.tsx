import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useForm, FormProvider } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextInput } from '../../UI/TextInput';
import { useUserDataStore, useRegisterSuccess } from '../../data/customHooks/useUserData';

export const Register = () => {

    const { createUser } = useUserDataStore();

    useRegisterSuccess(); 

    let schema = yup.object().shape({
        name: yup.string().required('Ce champs est obligatoire'),
        lastname: yup.string().required('Ce champs est obligatoire'),
        email: yup.string().email().required('Ce champs est obligatoire'),
        password: yup.string().required('Ce champs est obligatoire').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
          ),
        passwordConfirmation: yup.string().required('Ce champs est obligatoire').oneOf([yup.ref('password'), null], 'Les mots de passe saisis ne correspondent pas')
    });

    
    const methods = useForm({ resolver: yupResolver(schema)});
    
    const onSubmit = data => createUser(data);

    return (
        <Box>
            <Typography variant="h1">
                Inscription
            </Typography>
            <Box>
            <FormProvider {...methods} > 
                <form>
                    <Box display="flex" flexDirection="column" gap="1rem" width="30%" marginRight="auto" marginLeft="auto" marginTop="3rem">
                        <TextInput label="Prénom" aria-label="name" name="name" />       
                        <TextInput label="Nom" aria-label="lastname" name="lastname" />
                        <TextInput label="Email" aria-label="email" name="email" />
                        <TextInput label="Mot de passe" aria-label="password" name="password" type="password" />
                        <TextInput label="Confirmez le mot de passe" aria-label="password confirmation" name="passwordConfirmation" type="password" />
                        <Button onClick={methods.handleSubmit(onSubmit)} sx={{color: "#000"}}>
                            S'inscrire
                        </Button>
                    </Box>
                </form>
            </FormProvider>
            </Box>
        </Box>
    );
};