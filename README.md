# Insert Numbers Pro/插入数字序列

# Insert Numbers Pro
## 简介
插件市场已经有很多类似的小插件,可是我为什么又重新造了个轮子呢?在体验了类似的插件后我发现都不支持中文数字,想起我之前写了个npm就是用来支持数字与中文数字之间的转换的,心里突然就有了想法(用了那么多年别人的插件早就想体验一下插件开发了).这个插件除了,支持插入中文数序列字外,还使用了我另外一个npm包使用类似python格式化字符串方法进行数字或字符串经过格式化后插入.相当喜欢python的格式描述符,简单/易学/易用/功能强大.




## 特性:
1. 可输出自定义格式化后的有序字符序列
   >指定变量对齐方式<br>
   >指定输出进制转换(二进制,八进制,十六进制)<br>
   >指定进制类型符号大小写显示<br>
   >指定是否标注正负号<br>
   >指定0填充位<br>
   >指定变量输出宽度<br>
   >指定千分位分隔符<br>
   >指定小数点后位数<br>
   >指定科学计数法输出<br>
2. **支持中文数字序列**
3. 可输出中英文完整/缩写星期
4. python fstring格式化风格,简单好用

## 用法
### 参数配置
默认参数为:d:0:1如需自定义默认值按照vscode>文件>首选项>设置>打开设置(json)添加配置
```json
insertnumbers.formatStr: string = ":d",
insertnumbers.start = 0,
insertnumbers.step = 1,
insertnumbers.isChineseNumFormOne = false,
```
其中formatStr为默认格式描述符,start为起始数,step为步长,isChineseNumFormOne为针对中文,中英星期默认从1开始计数.
### 使用
使用鼠标中键或按住alt键加选多列或使用快捷键ctrl+d选择多列<br>
按下f1 键入insert numbers 或使用快捷键ctrl+alt+n调用本插件<br>
按照提示键入参数(默认为```:d:1:0```,即整数起始为1步长为1)<br>
按下回车插入序列<br>

### 动图演示

> **默认插入**
![默认插入](https://github.com/LiuQixuan/vscode-InsertNumbersPro/blob/master/asset/png/usage1.gif?raw=true)
**格式化插入数字序列**
![格式化插入数字序列](https://github.com/LiuQixuan/vscode-InsertNumbersPro/blob/master/asset/png/usage2.gif?raw=true)
**插入中文数字**
![插入中文数字](https://github.com/LiuQixuan/vscode-InsertNumbersPro/blob/master/asset/png/usage3.gif?raw=true)
**插入星期**
![插入星期](https://github.com/LiuQixuan/vscode-InsertNumbersPro/blob/master/asset/png/usage4.gif?raw=true)

## 参数

默认参数:```(default) :d:0:1```<br>
参数说明:```:format or :format:start:step```<br>
:format python fstring格式描述符<br>
:start 数列起始位置<br>
:step 累加步长<br>

### **格式描述符**
*format* ```[[fill]align][sign][#][0][width][tsep][dsep precision][type]```[^1]

fstring 格式描述符图解[^2]

![fstring 格式描述符图解](https://github.com/LiuQixuan/FString/blob/main/public/Python%20f-string.png?raw=true)

### **f-string 语法**[^3]
f-string采用 {content:format} 设置字符串格式，其中 content 是替换并填入字符串的内容，可以是变量、表达式或函数等，format是格式描述符。采用默认格式时不必指定 {:format}，如上面例子所示只写 {content} 即可。

关于格式描述符的详细语法及含义可查阅[Python官方文档](https://docs.python.org/3/library/string.html#format-string-syntax)，这里按使用时的先后顺序简要介绍常用格式描述符的含义与作用：

**对齐相关格式描述符**

|格式描述符	|含义与作用|
|:----:|:----:|
|<	|左对齐（字符串默认对齐方|式）|
|>	|右对齐（数值默认对齐方式）|
|^	|居中|

**数字符号相关格式描述符**

|格式描述符|	含义与作用|
|:----:|:----:|
|  +	|负数前加负号（-），正数前加正号（+）|
|  -	|负数前加负号（-），正数前不加任何符号（默认）|
|（空格）|	负数前加负号（-），正数前加一个空格|
>注：仅适用于数值类型。

**数字显示方式相关格式描述符**

|格式描述符|	含义与作用|
|:----:|:----:|
|#|切换数字显示方式|
>注1：仅适用于数值类型.

>注2：# 对不同数值类型的作用效果不同，详见下表：

|数值类型	|不加#（默认）|	加#|:区别|
|:----:|:----:|:----:|:----:|
|二进制整数	|'1111011'|	'0b1111011'	|开头是否显示 0b|
|八进制整数	|'173'|	'0o173'	|开头是否显示 0o|
|十进制整数	|'123'|	'123'	|无区别|
|十六进制整数（小写字母）	|'7b'|	'0x7b'|	开头是否显示 0x|
|十六进制整数（大写字母）	|'7B'	|'0X7B'|	开头是否显示 0X|

**宽度与精度相关格式描述符**

|格式描述符|	含义与作用|
|:----:|:----:|
|width|	整数 width 指定宽度|
|0width|	整数 width 指定宽度，开头的 0 指定高位用 0 补足宽度|
|width|.precision	整数 width 指定宽度，整数 precision 指定显示精度|
>注1：0width 不可用于复数类型和非数值类型，width.precision 不可用于整数类型。

>注2：width.precision 用于不同格式类型的浮点数、复数时的含义也不同：用于 f、F、e、E 和 % 时 precision 指定的是小数点后的位数，用于 g 和 G 时 precision 指定的是有效数字位数（小数点前位数+小数点后位数）。

>注3：width.precision 除浮点数、复数外还可用于字符串，此时 precision 含义是只使用字符串中前 precision 位字符。

**千位分隔符相关格式描述符**

|格式描述符	|含义与作用|
|:----:|:----:|
|,	|使用,作为千位分隔符|
|_	|使用_作为千位分隔符|

>注1：若不指定 , 或 _，则f-string不使用任何千位分隔符，此为默认设置。 

>注2：, 仅适用于浮点数、复数与十进制整数：对于浮点数和复数，, 只分隔小数点前的数位。 

>注3：_ 适用于浮点数、复数与二、八、十、十六进制整数：对于浮点数和复数，_ 只分隔小数点前的数位；对于二、八、十六进制整数，固定从低位到高位每隔四位插入一个 _（十进制整数是每隔三位插入一个 _）。

**格式类型相关格式描述符**

|格式描述符|	含义与作用|	适用变量类型|
|:----:|:----:|:----:|
|s|	普通字符串格式|	字符串|
|b|	二进制整数格式|	整数|
|c|	字符格式，按unicode编码将整数转换为对应字符|	整数|
|d|	十进制整数格式|	整数|
|o|	八进制整数格式|	整数|
|x|	十六进制整数格式（小写字母）|	整数|
|X|	十六进制整数格式（大写字母）|	整数|
|e|	科学计数格式，以 e 表示 ×10^	|浮点数、复数、整数（自动转换为浮点数）|
|E|	与 e 等价，但以 E 表示 ×10^	|浮点数、复数、整数（自动转换为浮点数）|
|f|	定点数格式，默认精度（precision）是6|	浮点数、复数、整数（自动转换为浮点数）|
|F|	与 f 等价，但将 nan 和 inf 换成 NAN 和 INF|	浮点数、复数、整数（自动转换为浮点数）|
|g|	通用格式，小数用 f，大数用 e|	浮点数、复数、整数（自动转换为浮点数）|
|G|	与 G 等价，但小数用 F，大数用 E|	浮点数、复数、整数（自动转换为浮点数）|
|%|	百分比格式，数字自动乘上100后按 f 格式排版，并加 % 后缀|	浮点数、整数（自动转换为浮点数）|


## 注意
1. 填写格式描述符时一定严格按照顺序,要求不多写不错写不乱写
2. 数列默认从0开始,步长为1,如需修改在vscode>文件>首选项>设置>打开设置(json)添加配置
3. 


## Advance
支持中文数字序列<br>
使用Python的fstring格式化参数,易学易用.掌握Python的fstring语法的同学几乎0成本上手.<br>
格式化效果齐全广泛应用于日常开发,满足一般需求.<br>
## Version
-  ✅v0.0.1 发布Insert Numbers Pro,实现基本功能,测试无明显bug,优化异常抛出提示.
-  🟩v0.0.X 添加更多语法,增强鲁棒性,修复潜在BUG


