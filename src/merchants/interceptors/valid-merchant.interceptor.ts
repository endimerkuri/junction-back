import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MerchantsService } from '../merchants.service';

@Injectable()
export class ValidMerchantInterceptor implements NestInterceptor {
  constructor(private readonly merchantService: MerchantsService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { params, user } = request;
    const { id } = params;

    if (!user?.user) {
      throw new UnauthorizedException('Unauthorized access');
    }

    const merchant = await this.merchantService.findById(id);

    if (!merchant || merchant.ownerId !== user.user.id) {
      throw new NotFoundException('Merchant not found');
    }
    request.merchant = merchant;

    return next.handle();
  }
}
