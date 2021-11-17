import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {

    async use(req: any, res: any, next: () => void) {
        req.user = {
            mobile: "9629794726",
            sub: ""
        };
        next();
    }
}