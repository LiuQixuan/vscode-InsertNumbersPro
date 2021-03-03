/**
 * ------------------------------------
 * File: d:\My Documents\Documents\GitHub\vscode-InsertNumbers-master\src\constString.ts
 * Project: d:\My Documents\Documents\GitHub\vscode-InsertNumbers-master
 * Created Date: 2021-02-08  11:40:21
 * Author: LiuQixuan(Atliuqixuan@hotmail.com)
 * -----
 * Last Modified:  2021-03-01  4:58:24
 * Modified By: LiuQixuan
 * -----
 * Copyright 2020 - 2021 AIUSoft by LiuQixuan
 * ------------------------------------
 */

/**
 * 常量字符串表
 * @Array Of Property
 * @trans ['日','一','二','三','四','五','六','七','八','九','十']
 * @return Cn Array<string>
 */
'use strict'

let ss: string = 'sdas'
let wkEn: Array<string> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
let wkEN: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let wkCN: Array<string> = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
let wkCn: Array<string> = ['日', '一', '二', '三', '四', '五', '六']
let cn: Array<string> = ['零','一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '亿']
let CN: Array<string> = ['零','壹', '貳', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾', '佰', '仟', '萬', '億']

export {numToChinanumerals} from './numToChinanumerals'
export default { wkEn, wkEN, wkCN, wkCn}