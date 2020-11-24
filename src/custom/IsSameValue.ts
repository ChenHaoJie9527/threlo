import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import { Promise } from "sequelize/types";
// 导出一个装饰器包装函数，通过@调用该函数，会根据返回的验证器进行相关验证
// 第一个参数是需要验证的类属性名，第二个参数是一个ValidationOptions选项
export function IsSameValue(property: string, validationOptions?: ValidationOptions) {
    //返回一个真正的装饰器，该装饰器将会被调用
    //第一个参数是装饰目标
    // 第二个参数是装饰属性名称
    return function (target: object, propertyName: string) {
        registerDecorator({
            name: "IsSameValue", //验证的装饰器名称
            target: target.constructor, //调用装饰目标的构造函数进行装饰
            propertyName: propertyName, //需要验证的属性名
            options: validationOptions, // 需要验证的option选项
            constraints: [property], //需要验证的参数
            validator: { //验证器，进行相关验证业务
                validate(value: any, ValidationArguments: ValidationArguments): Promise<boolean> | Boolean {
                    // 根据上面的属性名称获取对应的值
                    // ValidationArguments.object的属性其实是需要验证的类的名称，既RegisterBody类，property是传递进来的password
                    const releteValue = (ValidationArguments.object as any)[property];
                    // 比较当前装饰器装饰属性值与传入的第一个参数的值是否相同
                    return releteValue === value;
                }
            }
        })
    }
}