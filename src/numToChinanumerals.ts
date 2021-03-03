/**
 * ------------------------------------
 * File: c:\Users\LiuQixuan\Desktop\Untitled-1.js
 * Project: c:\Users\LiuQixuan\Desktop
 * Created Date: 2021-02-09  13:59:05
 * Author: LiuQixuan(Atliuqixuan@hotmail.com)
 * -----
 * Last Modified:  2021-03-03  10:16:19
 * Modified By: LiuQixuan
 * -----
 * Copyright 2020 - 2021 AIUSoft by LiuQixuan
 * ------------------------------------
 */

let cn: Array<string> = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '亿']
let CN: Array<string> = ['零', '壹', '貳', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾', '佰', '仟', '萬', '億']
function numToArray(value: string): Array<number> {
  let r_arr: Array<number>
  for (let ii = 0; ii < value.length; ++ii) {
    if (value[ii] !== '0') {
      value = value.slice(ii)
      break
    }
  }
  r_arr = Array.from(value).reverse().map(function (v) { return parseInt(v); })

  var tmp: Array<Array<number>> = []
  while (r_arr.length > 4) {
    tmp.push(r_arr.slice(0, 4))
    r_arr = r_arr.slice(4)
  }
  tmp.push(r_arr)
  let rank: number = tmp.length - 1
  let result: Array<number> = []
  for (let i: number = rank; i > -1; --i) {
    let buff: Array<number> = []
    tmp[i].reverse()
    for (var j: number = 0; j < tmp[i].length; ++j) {
      let m = tmp[i].length - 1
      if (tmp[i][j] !== 0) {
        buff.push(tmp[i][j])
      }
      if (tmp[i][j] !== 0 && m - j != 0) {
        if (tmp[i][j] === 1 && m - j === 1 && (i === 1 || tmp[i].length === 2 && rank * 4 + 2 === value.toString().length)) {
          buff.pop()
        }
        buff.push(9 + m - j)
      }
    }
    result = result.concat(buff)
    if (i != 0 && buff.length !== 0) {
      result.push(i + 0xc)
    }

  }
  let index = []
  for (let i = 0; i < result.length - 1; ++i) {
    if (result[i] > 10) {
      let flag = false
      for (let j = i + 1; j < result.length; ++j) {
        if (result[i] < result[j]) {
          if (i === j - 1) {
            flag = true
          }
          break
        }
        if (result[i] < 14 && result[i] === result[j] + 1 && i === j - 2) {
          flag = true
        }
      }
      if (flag === false) {
        index.push(i)
      }
    }
  }
  let indexOffset = 1
  index.forEach((v, i, arr) => { arr[i] += indexOffset++ })
  index.forEach(v => { result.splice(v, 0, 0) })
  return result
}

// 
function numToChinanumerals(format: string, v_arg: number | string | bigint): string {
  let value: string = ''
  let value2: string = ''
  let str: string = ''
  let res: Array<number> = []
  let res2: Array<number> = []
  if (typeof v_arg === "number" || typeof v_arg === "bigint") {
    value = v_arg.toString()
  } else if (typeof v_arg === "string") {
    value = v_arg
  } else {
    throw new Error("Just only handle string or number or bigint types.")
  }
  if (value.length > 12) {
    value2 = value.slice(0, -12)
    value = value.slice(-12)
    if (value2.length > 12) {
      throw new Error("Just only handle normal numbers.")
    }
  }
  res = numToArray(value)
  if (value2.length !== 0) {
    res2 = numToArray(value2)
    res2.push(13)//cn[14]==='亿' cn[13]==='万' cn[12] ==='千'
    if (res.indexOf(14) !== -1) { //大数后半段含'亿'
      if (res.indexOf(12) > res.indexOf(14)) {
        res2.push(0)
      }
    }
    else if (res.indexOf(14) === -1) {
      res2.push(14)
      if (res.length !== 0) {
        res2.push(0)
      }
    }
  }
  let arr: Array<string>
  if (/cn/.test(format)) {
    arr = cn
  }
  else if (/CN/.test(format)) {
    arr = CN
  }
  else {
    throw new SyntaxError("[Error] failed to parse format argument");
  }
  if (res.length === 0 && res2.length === 0) {
    str = arr[0]
  } else {
    if (res2.length !== 0) {
      for (let v of res2) {
        str += arr[v]
      }
    }
    for (let v of res) {
      str += arr[v]
    }
  }
  return str
}

export { numToChinanumerals }

// console.log(numToChinanumerals('cn', '12000152460001524600')) //test