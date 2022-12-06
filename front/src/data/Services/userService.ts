import { IInputUser } from '../../utils';
import { gql } from "@apollo/client"
import { apolloClient } from '../../index';

export const createUser = async (
    user: IInputUser,
  ) => {
    const registerUser = await apolloClient.mutate({
        variables: { name: user.name, email: user.email, password: user.password, lastname: user.lastname },
        mutation: gql`
        mutation CreateUser($name: String!, $lastname: String!, $email: String!, $password: String!) {
            createUser(name: $name, lastname: $lastname, email: $email, password: $password) {
              success
              email
            }
          }
        `,
    })
    
    if (registerUser.data.createUser) {
        return registerUser.data.createUser;
    } else {
        return { email: '', success: false }
    }
  };
  