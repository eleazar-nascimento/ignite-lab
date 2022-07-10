import { Module } from '@nestjs/common';
import { PurchaseController } from './controllers/purchases.controller';

// HTTP (MVC)

@Module({
  controllers: [PurchaseController],
})
export class MessagingModule {}
