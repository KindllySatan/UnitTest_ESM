/**
 * unitTest - 单元测试结果捕获函数
 *
 * @version 1.0.0
 * @author KindllySatan <kindllysatan@foxmail.com>
 * @function
 * @param { String } desc - 传入的参数列表的字符串描述
 * @param { Function } fun - 包含传入测试函数的代理函数
 * @return { Boolean } 单元测试个例是否通过测试
 * */
const unitTest = function (desc, fun) {
    try {
        fun();  // 执行代理函数
    } catch (err) {
        // 设置 Node.js 命令行输出样式, \033[30;31m 为设置输出背景为黑色输出字体为红色, \033[0m 为恢复默认样式
        console.log('\033[30;31m' + `传入参数列表为：${ desc } 的测试 -> 失败 ${ err }` + '\033[0m');
        return false;
    }

    console.log(`传入参数列表为：${ desc } 的测试 -> 通过`);
    return true;
}

/**
 * expect - 单元测试函数代理器
 *
 * @version 1.0.0
 * @author KindllySatan <kindllysatan@foxmail.com>
 * @function
 * @namespace
 * @param res - 实际函数返回结果
 * @param { Boolean } debug - 是否输出详细的错误堆栈信息
 * @returns { Object } 方法集合
 * */
const expect = function (res, debug) {
    return {
        /**
         * toBe - 单元测试期望判定函数
         *
         * @param expectRes - 期望函数返回结果
         * @memberOf expect
         * */
        toBe: function (expectRes) {
            if (res !== expectRes) {
                if (debug) {
                    throw new Error(`期望值为：${ expectRes }, 实际返回值为：${ res }`);
                } else {
                    throw new Error(`期望值为：${ expectRes }, 实际返回值为：${ res }`).message;
                }
            }
        }
    }
}

/**
 * unitTestSet - 单元测试集函数
 *
 * @version 1.0.0
 * @author KindllySatan <kindllysatan@foxmail.com>
 * @function
 * @param { Function } testFun - 被测试函数
 * @param { Array } testList - 测试参数列表
 * @param { Array } resultList - 测试预期结果列表
 * @param { Boolean } [debug=false] - 是否输出详细的错误堆栈信息
 * @return { Array } 单元测试未通过案例列表
 * */
const unitTestSet = function (testFun, testList, resultList, debug=false) {
    const testListLen = testList.length;
    const failTestIndexList = [];

    for (let num = 0; num < testListLen; num++) {
        const re = unitTest(`${ testList[num] }`, () => {
            expect(testFun(...testList[num]), debug).toBe(resultList[num]);
        });

        // 若测试未通过则记录错误信息
        if (!re) {
            failTestIndexList.push({
                testIndex: num,
                testParameter: testList[num],
                testResult: resultList[num],
                testExpectRes: testFun(...testList[num])
            });
        }
    }

    console.log(`单元测试结果：${ testListLen - failTestIndexList.length } 通过 | ${ testListLen } 总数`);

    return failTestIndexList;
}

module.exports = {
    unitTestSet
}
