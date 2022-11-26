/**
 * unitTest - 单元测试结果捕获函数
 *
 * @const
 * @function
 * @param { String } desc - 传入的参数列表的字符串描述
 * @param { Function } fun - 包含传入测试函数的代理函数
 * @return { Boolean } 单元测试个例是否通过测试
 * */
const unitTest = function (desc, fun) {
    try {
        fun();  // 执行代理函数
    } catch (err) {
        console.error(`传入参数列表为：${ desc } 的测试 -> 失败`, err);
        return false;
    }

    console.log(`传入参数列表为：${ desc } 的测试 -> 通过`);
    return true;
}

/**
 * expect - 单元测试函数代理器
 *
 * @const
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
         * @throws { Error } 错误测试用例相关信息
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
 * @export
 * @const
 * @function
 * @param { Function } testFun - 被测试函数
 * @param { Array<Array<any>> } testList - 测试参数列表
 * @param { Array<any> } resultList - 测试预期结果列表
 * @param { Boolean } [debug=false] - 是否输出详细的错误堆栈信息
 * @return { Array } 单元测试未通过案例列表
 * */
export const unitTestSet = function (testFun, testList, resultList, debug=false) {
    const testListLen = testList.length;
    const failTestIndexList = [];

    for (let num = 0; num < testListLen; num++) {
        const testResult = unitTest(`${ testList[num] }`, () => {
            expect(testFun(...testList[num]), debug).toBe(resultList[num]);
        });

        // 若测试未通过则记录错误信息
        if (!testResult) {
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

export default {
    unitTestSet
}
