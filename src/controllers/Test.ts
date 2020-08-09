import { Controller, Get, Params, Version, Query, Post, Flow, Body, Delete, Header } from 'koa-ts-controllers';
// 导入验证类，帮助我们验证处理前端携带的参数Query Body等数据
import { IsNumberString } from 'class-validator';
import Boom from "@hapi/boom";
// 声明一个需要验证数字的类
class getUsersQuery {
    // 验证装饰器
    @IsNumberString(undefined, {
        message: "page必须是数字字符串"
    })
    page: number
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
    @Get("/hello")
    // 该接口提供的方法 hello
    //GET /api/v1/test/hello
    async hello(a: any) {
        console.log(a.b)
        return {
            status: 200,
            message: "查询成功"
        }
    }
    // number string 可共用
    @Get("/user/:id(\\d+)")
    async getUserStr(@Params("id") id: number) {
        // GET /api/v1/test/user/abc
        return `当前params中的用户id是${id}`
    }
    //动态获取参数 并且第二个参数可传可不传 
    @Get('/incidents/:region')
    async getFooById(
        @Params('region') region: string,
        @Query('from') fromTimestamp: number) {
        // GET /api/v.../incidents/austintx?from=123456
        // region === 'austintx' && fromTimestamp === 123456
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
        // POST /api/v.../lead
        // leadData injected with all POST data
        console.log(123123123123123213, body)
        console.log("header", h)
        return { body };
    }
    @Get("/users")
    async getUsers(
        @Query() q: getUsersQuery
    ) {
        // 当通关前面的验证，然后进行相关逻辑处理，如果出错，可以借助Boom抛出错误
        if (true) {
            throw Boom.notFound("验证失败", "验证字符不正确")
        }
        return "传过来的page是" + q.page
    }

    // @Post('/specific')
    // async createFooSpecific(@Body('test') fooParam: string) {
    //     // POST /api/v.../foo/specific
    //     // fooParam argument injected with particular field body.foo
    //     return fooParam;
    // }
    // @Post('/specific2')
    // async createFooSpecific2(@Body() fooParam: string) {
    //     // POST /api/v.../foo/specific2
    //     // Same as before. fooParam argument injected with particular field body.foo
    //     return fooParam;
    // }
    // @Post('/orDie')
    // async createFooRequired(@Body({ required: true }) body: any) {
    //     // POST /api/v.../foo/orDie
    //     // body will throw 422 error if no body input given
    //     return body;
    // }
    // @Post('/orDie2')
    // async createFooRequired2(@Body({ required: true }) body: InputDeviceInfo) {
    //     // POST /api/v.../foo/orDie2
    //     // providing a class as an type to an object-level argument
    //     // (i.e not a primitive) means you want
    //     // that object to be validated by that class-validator class.
    //     // See definition of FooCreateInput validation class below.
    //     return body;
    // }
    // @Delete("/:id")
    // async deleteFooUser(@Params("id") id: any) {
    //     return `删除ID为${id}的商品`
    // }
    // @Delete('/specific/:id')
    // async deleteFooSpecific(@Params('id') id: any) {
    //     // DELETE /api/v.../foo/specific/123
    //     // id will be 123
    //     return `删除ID为${id}的商品`
    // }
}