import { IGoogleAuthService } from "@domain/interfaces/services/googleAuth.service.interface";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import { injectable } from "tsyringe";
import { CustomError } from "@shared/errors/custom.error";
import { STATUS_CODE } from "@shared/constants/statusCode";
import { ERROR_MESSAGE } from "@shared/constants/messages";
import { logger } from "@shared/utils/logger";
import { CONFIG } from "@shared/config";

@injectable()
export class GoogleAuthService implements IGoogleAuthService {
    private client: OAuth2Client;

    constructor() {
        this.client = new OAuth2Client(CONFIG.GOOGLE_CLIENT_ID);
    }

    async verifyIdToken(idToken: string): Promise<TokenPayload> {
        try {
            const ticket = await this.client.verifyIdToken({
                idToken,
                audience: CONFIG.GOOGLE_CLIENT_ID,
            });
            
            const payload = ticket.getPayload();
            if (!payload || !payload.email) {
                throw new CustomError(ERROR_MESSAGE.INVALID_GOOGLE_TOKEN, STATUS_CODE.BAD_REQUEST_400);
            }
            
            return payload;
        } catch (error) {
            logger.error("Google Auth Service Error:", error);
            if (error instanceof CustomError) throw error;
            throw new CustomError(ERROR_MESSAGE.GOOGLE_AUTH_FAILED, STATUS_CODE.UNAUTHORIZED_401);
        }
    }
}
