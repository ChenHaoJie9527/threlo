import { Post, Body, Controller } from "koa-ts-controllers";

import { RegisterBody } from "../validator/User";
@Controller("/user")
class UserConstrller {

    @Post("/register")
    async register(
        @Body() query: RegisterBody
    ) {
        console.log(123123,query)
    }

} 
