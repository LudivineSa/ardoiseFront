const jwt = require('jsonwebtoken');

export const decodedToken = (req : any) => {
  const header =  req.headers.authorization;
    
  if (header){
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.TOKEN);
    return decoded;
  }

  return null
}
