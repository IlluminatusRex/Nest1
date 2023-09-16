import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UpdateOrderDTO } from './dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/')
  getAll(): any {return this.ordersService.getAll();}

  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = this.ordersService.getById(id);
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
  }

  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.ordersService.getById(id)))
      throw new NotFoundException('Order not found');
    await this.ordersService.deleteById(id);
    return { success: true };
  }
  
  @Post('/')
  create(@Body() orderData) {
      return this.ordersService.createOrder(orderData);
  }

  @Put('/:id')
    update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() OrderData: UpdateOrderDTO,
    ) {
        if (!this.ordersService.getById(id))
            throw new NotFoundException('Order not found');
    
        this.ordersService.updateOrderById(id, OrderData);
        return { success: true };
    }

}