import bcrypt from 'bcrypt';
import { prisma } from '../../src/prismaclient';

export default prisma.$use(async (params: any, next: any) => {
  if (params.model === 'User') {
    if ((params.action === 'create' || params.action === 'update') && params.args.data.password) {
      params.args.data.password = await bcrypt.hash(params.args.data.password, 10);
    }
  }
  return next(params);
});
