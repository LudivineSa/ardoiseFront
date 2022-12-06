import { prismaMock } from './../../singleton'
import { resolvers } from './user.resolver';

test('should create new user ', async () => {

    const randomNumber = Math.floor(Math.random() * 100000);
    const user = {
      id: 1,
      name: 'Rich',
      lastname: 'Rich',
      email: `${randomNumber}hello@prisma.io`,
      password: 'Test1234*'
    }
  
    prismaMock.user.create.mockResolvedValue(user)
  
    await expect(resolvers.Mutation.createUser('', user)).resolves.toEqual({
      name: 'Rich',
      lastname: 'Rich',
      email: `${randomNumber}hello@prisma.io`,
      success: true
    })
})

test('should throw error if user already exists', async () => {
    const user = {
      id: 1,
      name: 'Rich',
      lastname: 'Rich',
      email: 'hello@prisma.io', 
      password: 'Test1234*'
    }

    prismaMock.user.findUnique.mockResolvedValue(user)

    await expect(resolvers.Mutation.createUser('', user)).rejects.toThrowError('This mail is already used')
})

test('should throw error if user data is invalid', async () => {
    const user = {
      id: 1,
      name: 'Rich',
      lastname: 'Rich',
      email: 'invalide',
      password: 'Test1234*'
    }

    prismaMock.user.findUnique.mockResolvedValue(user)
    await expect(resolvers.Mutation.createUser('', user)).rejects.toThrowError('[\"Email is not valid\"]')
})

test('should show password hash', async () => {
    const user = {
      id: 1,
      name: 'Rich',
      lastname: 'Rich',
      email: 'hello@prisma.io',
      password: 'Test1234*'
    }

    prismaMock.user.findUnique.mockResolvedValue(user)
    const userData = (resolvers.Query.getSingleUser('', user))
    expect(userData).not.toEqual('Test1234*')
})