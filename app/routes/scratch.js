import {
  Controller,
  Get,
  Post
} from '../decorators/router';

@Controller('/watermelon/api/v1.0')
class Scratch {
  constructor() {

  }
  @Get('/operationRecord')
  operationRecord(ctx, next) {
    return ctx.render('index', {
      title: 'ejs'
    })
  }

}

