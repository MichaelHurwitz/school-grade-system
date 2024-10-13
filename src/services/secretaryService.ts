import { Secretary } from '../models/secretary';

export const createSecretary = async (secretaryData: any) => {
  const newSecretary = new Secretary(secretaryData);
  return await newSecretary.save();
};

export const updateSecretary = async (id: string, updateData: any) => {
  return await Secretary.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteSecretary = async (id: string) => {
  return await Secretary.findByIdAndDelete(id);
};
