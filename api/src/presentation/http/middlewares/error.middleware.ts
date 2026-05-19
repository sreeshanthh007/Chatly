import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { CustomError } from "../../../shared/errors/custom.error";
import { logger } from "../../../shared/utils/logger";
import { STATUS_CODE } from "../../../shared/constants/statusCode";
import { ERROR_MESSAGE } from "../../../shared/constants/messages";

export type TValidationIssue = {
  message: string;
  path?: (string | number)[];
};

export class ErrorMiddleware {
  private readonly logger = logger;

  public handleError = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {

    if (res.headersSent) {
      return next(err);
    }

    let statusCode: number = STATUS_CODE.INTERNAL_SERVER_ERROR_500;
    let message: string = ERROR_MESSAGE.SERVER_ERROR;
    let errors: TValidationIssue[] | undefined;

    this.logger.error("An Error Occurred", {
      message: err.message,
      stack: err.stack,
      method: req.method,
      url: req.url,
      timestamp: new Date().toISOString(),
    });

    if (err instanceof ZodError) {
      statusCode = STATUS_CODE.BAD_REQUEST_400;
      message = ERROR_MESSAGE.VALIDATION_ERROR;
      errors = err.issues.map((e) => ({
        message: e.message,
        path: e.path as (string | number)[],
      }));
    } else if (err instanceof CustomError) {
      statusCode = err.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR_500;
      message = err.message;
    }

    res.status(statusCode).json({
      success: false,
      message,
      ...(errors && { errors }),
    });
  };
}
