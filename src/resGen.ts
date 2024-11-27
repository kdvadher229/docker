import { Response } from 'express';

 interface IResponse<T> {
    statusCode: number;
    message: string;
    data?: T;
    error?: string;
  }
  
export const successResponse = <T>(
  res: Response,
  status: number,
  message: string,
  data?: T,
): Response<IResponse<T>> => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

export const errorResponse = <T>(
  res: Response,
  status: number,
  message: string,
  error?: string,
): Response<IResponse<T>> => {
  return res.status(status).json({
    status,
    message,
    error,
  });
};
