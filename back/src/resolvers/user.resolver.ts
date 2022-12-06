import { prisma } from '../prismaclient'
import '../../prisma/middleware/user.middleware'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { schemaUser, schemaMail } from '../validationSchema/validation';

const isAuthorized = (password: string, hash: string, email:string) => {

  return new Promise((resolve, reject) => {
    let res = {
      email: email,
      success: false,
      token: ''
    }

    bcrypt.compare(password, hash, function(err, result) {

      if(result) {
        const token = jwt.sign({ email }, process.env.TOKEN as string, { expiresIn: '1h' });
        res.token = token;
        res.success = true
        resolve(res)
      } else {
        reject(res);
      }
    });
  });
};

export const resolvers = {
  Query: {
    authentificate: async (_: any, args: any, context: any) => {
      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      if (!user) {
        throw new Error('No user with that email');
      }
      const hash = user?.password || '';

      const success = await isAuthorized(args.password, hash, args.email)
      return success

    },
    allUsers: () => {
      return prisma.user.findMany();
    },
    getSingleUser: (__: any, args: any) => {
      return prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
    },
  },
  Mutation: {
    createUser: async(__: any, args: any) => {
      const oldUser = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      if (oldUser) {
        throw new Error('This mail is already used');
      }

      const isValid = await schemaUser.isValid({
        email: args.email,
        password: args.password,
        name: args.name,
        lastname: args.lastname,
      }).catch((e) => console.log(JSON.stringify(e)))

      try { 
        await schemaUser.validate({
          email: args.email,
          password: args.password,
          name: args.name,
          lastname: args.lastname,
        })
      } catch(e : any) {
        throw new Error(JSON.stringify(e.errors))
      }

      let newUser; 

      if(isValid) {
      newUser = await prisma.user.create({
        data: {
          name: args.name,
          lastname: args.lastname,
          email: args.email,
          password: args.password,
        },
      });
      } else {
      throw new Error('Invalid data');
      }
      return {
        name: args.name,
        lastname: args.lastname,
        email: args.email,
        success: true
      }
      
    },
    changePassword: async (_: any, args: any, context: any) => {
      const user = await prisma.user.findUnique({
        where: {
          email: context.user.email,
        },
      });
      if (!user) {
        throw new Error('No user with that email');
      }

      const isValid = await schemaUser.isValid({
        email: context.user.email,
        password: context.user.password,
        name: context.user.name,
        lastname: context.user.lastname,
      })

      const hash = user?.password || ''

      const result: any  = await isAuthorized(args.password, hash, args.email)

      if(result.success && isValid) {
        await prisma.user.update({
          where: {
            email: args.email,
          },
          data: {
            password: args.newPassword,
          },
        });
        return 'Password changed';
      } else {
        return 'Wrong password';
      }
    },
    updateUserName: async (__: any, args: any, context: any) => {
      return await prisma.user.update({
        where: {
          id: context.user.id,
        },
        data: {
          name: args.name,
          lastname: args.lastname,   
        },
      });
    },
    updateUserMail: async (__: any, args: any, context: any) => {
      const isMailAlreadyUsed = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      if (isMailAlreadyUsed) {
        throw new Error('This mail is already used');
      }
      
      const result: any  = await isAuthorized(args.password, context.user.password, args.email)
      const mailIsValid: any =  await schemaUser.isValid({
        email: context.user.email,
      })

      if(result.success && mailIsValid) {
        await prisma.user.update({
          where: {
          id: context.user.id,
          },
          data: {
            email: args.email,
          },
        });
        return result
      } else {
        throw new Error('An error occured, please verify your informations.');
      }
    },
    deleteUser: (__: any, context: any) => {
      return prisma.user.delete({
        where: {
          email: context.user.email,
        },
      });
    },
  },
};

export default resolvers;
