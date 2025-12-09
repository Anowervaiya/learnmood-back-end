import bcryptjs from 'bcryptjs';
import httpStatus from 'http-status-codes';
import AppError from '../../errorHelpers/appError';
import { User } from '../user/user.model';
import { envVars } from '../../config/env';
import { type IAuthProvider } from '../user/user.interfaces';
import { AUTHPROVIDER } from '../user/user.constant';

const setPassword = async (userId: string, plainPassword: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  if (
    user.password &&
    user.auths?.some(providerObject => providerObject.provider === 'google')
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You have already set you password. Now you can change the password from your profile password update'
    );
  }

  const hashedPassword = await bcryptjs.hash(
    plainPassword,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const credentialProvider: IAuthProvider = {
    provider: AUTHPROVIDER.credentials,
    providerId: user.email,
  };

  const auths: IAuthProvider[] = [...user.auths!, credentialProvider];

  user.password = hashedPassword;

  user.auths = auths;

  await user.save();
};
export const AuthServices = {
  setPassword
}