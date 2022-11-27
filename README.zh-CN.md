# JS 单元测试工具 - `UnitTest`

如果你想要一款轻量级的 `JavaScript` 单元测试插件, 那就直接使用 `UnitTest` 来对自己的 `JavaSript` 代码进行单元测试吧。放心，`UnitTest` 核心仅仅只有 `3KB` 的大小，完全不用担心引入 `UnitTest` 对自己项目的性能造成影响。

该项目工程遵循 ESM 规范, UnitTest CMJ 工程可见: 
- GitHub: [UnitTest CMJ](https://github.com/KindllySatan/UnitTest_CMJ)
- Gitee: [UnitTest CMJ](https://gitee.com/KindllySatan/unit-test-cmj)

## 安装
```shell
npm install -d ks_unitTest_esm
```

## 文件目录介绍

- `main.js` - 项目入口文件


## 使用方法

### 1、导入

```javascript
import { unitTestSet } from 'ks_unitTest_esm'


unitTestSet(fun, tsetList, resultList, debug);
```

### 2、使用 `UnitTest`

要使用 `UnitTest` 来帮助自己实现单元测试，你需要提供一些东西：

- `testFun`：你要测试的函数
- `testList`：测试用例参数列表
- `resultList`：测试预期结果列表
- `debug`：是否开启未通过测试用例的详细错误堆栈信息，默认为 false

**给定数据**：

```javascript
// 这是测试函数
const add = function (a, b) {
    return a + b;
}

// 这是它的测试参数列表，它应该是一个二维数组的形式
//  [
//     [参数一, 参数二 ...],		// 测试用例一
//     [参数一, 参数二 ...],		// 测试用例二
//     [参数一, 参数二 ...]		// 测试用例三
//  ]
const testList = [
    [1, 2],
    [2, 3],
    [0, 1]
];

// 这是它的预测试计结果列表，它应该是一个一维数组的形式, 预计结果具体为何种类型取决于你自己的函数返回值格式
//  [
//     预计结果一,
//     预计结果二,
//     预计结果三
//  ]
const resultList = [
    3,
    5,
    2
];

const debug = false;

unitTestSet(add, testList, resultList, false);
```

**示例输出**：

![示例输出一](README/示例输出一.png)

### 3、获取未通过的单元测试用例信息

假设给定条件和 `2、使用 UnitTest` 中一致，只需要命名一个变量来承接 `unitTestSet` 函数的返回值即可。

```javascript
const failTestList = unitTestSet(add, testList, resultList, false);
console.log(failTestList);
```

**示例输出**：

![示例输出二](README/示例输出二.png)


### 4、自我测试

一个好的单元测试当然可以测试自己是否正常，当然，由于自我测试会导致无意义的回调，前 `selfTestList.length` 个测试结果才是真正自我测试的单元测试案例。

**给定数据**：

```javascript
const testList = [
    [1, 2],
    [2, 3],
    [0, 1]
];

const resultList = [
    3,
    5,
    2
];

const selfTestList = [
    [unitTest, testList, resultList, false]
]

const selfResultList = [
    undefined
]

console.log('\n开始自我测试：');
unitTestSet(unitTestSet, selfTestList, selfResultList, false);
```

**示例输出**：

![示例输出三](README/示例输出三.png)
