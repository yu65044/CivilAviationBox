package com.xh.platform.utils;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
 
 @Target({ElementType.PARAMETER, ElementType.METHOD})  
 @Retention(RetentionPolicy.RUNTIME)  
 @Documented  
 public @interface Log {
 
     /** 要执行的具体操作比如：添加用户 **/  
     public String operationName() default "";
}