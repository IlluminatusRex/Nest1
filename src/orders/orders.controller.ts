import { Body, Controller, Get, NotFoundException, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  getAll(): any {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.ordersService.getById(id);
  }

  deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.ordersService.getById(id))
        throw new NotFoundException('Product not found');
    this.ordersService.deleteById(id);
    return { success: true };
  }
  
  @Post('/')
  create(@Body() orderData) {
      return this.ordersService.createOrder(orderData);
  }

  @Put('/:id')
    update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() productData,
    ) {
        if (!this.ordersService.getById(id))
        throw new NotFoundException('Product not found');

        this.ordersService.updateOrderById(id, productData);
        return { success: true };
    }

}