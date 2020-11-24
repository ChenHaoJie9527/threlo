import { Controller, Get, Params, Version, Query, Post, Flow, Body, Delete, Header, Ctx } from 'koa-ts-controllers';
// 导入验证类，帮助我们验证处理前端携带的参数Query Body等数据
import { IsNumberString, IsPositive, IsNotEmpty } from 'class-validator';
import {Context} from "koa";
import Boom from "@hapi/boom";
// 声明一个需要验证数字的类
class getUsersQuery {
    // 验证装饰器验证是否是数字
    @IsNumberString({}, {
        message: "page必须是数字字符串"
    })
    page: number
}
class UsersTive {
    @IsNotEmpty({
        message: "用户名不能为空"
    })
    name: string
    @IsNotEmpty({
        message: "年龄不能为空"
    })
    age: string
}
class getRegrest{
    @IsNotEmpty({
        message: "用户名不能为空"
    })
    user: string
    @IsNotEmpty({
        message: "密码不能为空"
    })
    password: string
}
// 通过类来实现路由的的接口 http://localhost:8080/api/v1/test/hello
//参数装饰器只能用在方法中 @params @Version等
//类参数其通常用于将path和http中的url进行绑定
//请求装饰器 @Get @Post @pull @Head
@Controller("/test")
class TestController {
    // @Get是TS提供的控制器接口
    @Get("/")
    async myTest() {
        // GET /api/v1/test
        return "Beans and garri makes sense"
    }
    // @Get("/user/:id(\\d+)")
    // async getUserStr(@Params("id") id: number) {
    //     // GET /api/v1/test/user/abc
    //     return `当前params中的用户id是${id}`
    // }
    //动态获取参数 并且第二个参数可传可不传 
    @Get('/incidents/:region')
    async getFooById(
        @Params('region') region: string,
        @Query('from') fromTimestamp: number) {
        return {
            id: region,
            fromTimestamp
        }
    }
    @Post("/lead")
    async createFoo(
        @Body() body: {
            name: string,
            age: number
        },
        @Header() h: any
    ) {
        console.log("header", h)
        return { body };
    }
    @Get("/users")
    async getUsers(
        @Query() q: getUsersQuery
    ) {
        return {
            message: "成功",
            id: q.page
        }
    }
    @Post("/regrest")
    async getUserTive(
        @Body() q: getRegrest,
        @Ctx() ctx:Context
    ) {
        ctx.status = 201;
        return {
            id: 1,
            user: q.user,
            createTime: new Date()
        }
    }
    @Post("/postUser")
    async postUser(
        @Body() body: UsersTive
    ) {
        return {
            id: 1,
            name: body.name,
            createTime: new Date().getFullYear() + "-" + getMonth() + "-" + new Date().getDay()
        }
    }

}
function getMonth() {
    const month = new Date().getMonth() + 1;
    return month > 10 ? month :"0" + month;
}