import { Role } from '@prisma/client';

export type dataUser = {
  name?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: Role;
};

export const selectedDataUser = {
  id: true,
  name: true,
  lastName: true,
  role: true,
  email: true,
  createAt: true,
  updateAt: true,
};
