import { HttpException, HttpStatus, ForbiddenException } from '@nestjs/common';

export function UnauthorizedError(message = 'Request is not authorized.') {
  const err = new HttpException(
    { success: false, code: 'Unauthorized', message },
    HttpStatus.UNAUTHORIZED,
  );
  return err;
}

export function BadRequestError(
  message = 'Request payload is in invalid format.',
) {
  const err = new HttpException(
    { success: false, code: 'BadRequest', message },
    HttpStatus.BAD_REQUEST,
  );
  return err;
}

export function ForbiddenRequestError(message = 'This request is forbidden') {
  const err = new HttpException(
    { success: false, code: 'ForbiddenRequest', message },
    HttpStatus.FORBIDDEN,
  );
  return err;
}

export function ConflictRequestError(
  message = 'The same resource already exists.',
) {
  const err = new HttpException(
    { success: false, code: 'Conflict', message },
    HttpStatus.CONFLICT,
  );
  return err;
}

export function NotFoundError(message = 'Resource is not found.') {
  const err = new HttpException(
    { success: false, code: 'NotFound', message },
    HttpStatus.NOT_FOUND,
  );
  return err;
}

export function InternalServerError(
  message = 'There was an error. Please try again later.',
) {
  const err = new HttpException(
    { success: false, code: 'InternalError', message },
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
  return err;
}
