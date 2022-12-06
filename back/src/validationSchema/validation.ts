import * as yup from 'yup';

export const schemaUser = yup.object().shape({
  email: yup.string().email('Email is not valid').required('Email is required'),
  password: yup.string().min(8, 'Must contains at least 8 characters').required('password is required'),
  name: yup.string().required('Name is required'),
  lastname: yup.string().required('Lastname is required'),
})

export const schemaMail = yup.object().shape({
  email: yup.string().email('Email is not valid').required('Email is required'),
})