/**
 * ------------------------------------
 * File: d:\My Documents\Documents\GitHub\FString\FString.ts
 * Project: d:\My Documents\Documents\GitHub\FString
 * Created Date: 2021-02-23  11:46:05
 * Author: LiuQixuan(liuqixuan@hotmail.com)
 * -----
 * Last Modified:  2021-03-02  4:03:55
 * Modified By: LiuQixuan
 * -----
 * Copyright 2020 - 2021 AIUSoft by LiuQixuan
 * ------------------------------------
 */

'use strict';

export class FString{
  private static toNonExponential(num: string) {
    let m = parseFloat(num).toExponential().toString().match(/\d(?:\.(\d*))?e([+-]\d+)/)
    let fractionDigits = 0
    if (m !== null) {
      if (m[1] === undefined) {
        m[1] = ''
      }
      let tmp = m[1].length - parseInt(m[2])
      if (tmp > 0) {
        fractionDigits = tmp
      }
    }
    return parseFloat(num).toFixed(fractionDigits);
  }
  private static divideBySign(num: string, sign: string): string {
    let reg = /\d{1,3}(?=(\d{3})+$)/g;
    let tmpArr = num.split('.')
    let after = ''
    if (tmpArr.length > 1) {
      after = '.' + tmpArr[1]
    }
    return tmpArr[0].replace(reg, '$&' + sign) + after;
  }

  public static format(param: string, raw_s: string|number) {
    let paramsIsFormat: boolean = false
    let result: string = ''
    let formatString: string = param
    let formatStringBackup: string = '' //Used to track error point.
    // let raw: string = raw_s;
    let raw: string = raw_s.toString();
    // if (/^:.*[bdoxfgse%]{1}$/i.test(param)) {
    //   paramsIsFormat = true
    // }
    // // @ts-ignore
    // if (!paramsIsFormat && !/^:.*[bdoxfgse%]{1}$/i.test(this)) {
    //   throw new SyntaxError('Bad format input:least one of this string and parameter is a format style string.')
    // }
    // if (paramsIsFormat) {
    //   formatString = param
    //   //@ts-ignore
    //   raw = this
    // } else {
    //   //@ts-ignore
    //   formatString = this
    //   raw = param
    // }
    // if (!/[s]{1}$/.test(formatString) && parseInt(raw) === NaN) {
    //   result = ''
    //   return result
    // }
    formatStringBackup = formatString
    formatString = formatString.split(':')[1]
    // console.log(formatString, raw)
    let textAlign: string = ''
    let fillChar: string = ''
    var tmp: RegExpExecArray | null = /[\^<>]{1}/.exec(formatString);
    if (tmp !== null) {
      var tmp_str_arr = formatString.split(/[\^<>]{1}/);
      fillChar = tmp_str_arr[0];
      formatString = tmp_str_arr[1]
      if (fillChar.length != 1) {
        let erroInfo = `Error point at:\n[${formatStringBackup}]\n${' '.repeat(formatStringBackup.search(formatString) - 1)}^`
        throw new SyntaxError('Bad format input:fillChar must one char of string.\n' + erroInfo);
      }
  
      switch (tmp[0]) {
        case '^':
          textAlign = 'center'
          break
        case '<':
          textAlign = 'left'
          break
        case '>':
          textAlign = 'right'
          break
        default:
          textAlign = ''
      }
    }
    let sign: string = ''
    tmp = /^[\+\- ]{1}/.exec(formatString)
    if (tmp !== null) {
      switch (tmp[0]) {
        case '+':
          sign = '+'
          break
        case '-':
          sign = ''
          break
        case ' ':
          sign = ' '
          break
        default:
          sign = ''
      }
      formatString = formatString.slice(1)
      if (formatString.search(/[\+\- ]{1}/) !== -1) {
        let erroInfo = `Error point at:\n[${formatStringBackup}]\n${' '.repeat(formatStringBackup.search(formatString) + 1)}^`
        throw new SyntaxError('Bad format input:Multiple sign.\n' + erroInfo)
      }
    }
    let isHash: boolean = false
    if (/^#{1}/.test(formatString)) {
      isHash = true
      formatString = formatString.slice(1)
      if (formatString.search('#') !== -1) {
        let erroInfo = `Error point at:\n[${formatStringBackup}]\n${' '.repeat(formatStringBackup.search(formatString) + 1)}^`
        throw new SyntaxError('Bad format input:Multiple hash.\n' + erroInfo)
      }
    }
    let isFillZero: boolean = false
    if (/^0{1}/.test(formatString)) {
      isFillZero = true
      formatString = formatString.slice(1)
      if (formatString.search(/^0+/) !== -1) {
        let erroInfo = `Error point at:\n[${formatStringBackup}]\n${' '.repeat(formatStringBackup.search(formatString) + 1)}^`
        throw new SyntaxError('Bad format input:Multiple before fill zero.\n' + erroInfo)
      }
    }
    let width: number = 0
    tmp = /^(\d*)/.exec(formatString)
    if (tmp !== null) {
      width = parseInt(tmp[0])
  
    }
    formatString = formatString.replace(/^(\d*)/, '')
  
    let separation = ''
    tmp = /^[,_]{1}/.exec(formatString)
    if (tmp !== null) {
      switch (tmp[0]) {
        case ',':
          separation = ','
          break
        case '_':
          separation = '_'
      }
      formatString = formatString.slice(1)
      if (formatString.search(/[,_]{1}/) !== -1) {
        let erroInfo = `Error point at:\n[${formatStringBackup}]\n${' '.repeat(formatStringBackup.search(formatString) + 1)}^`
        throw new SyntaxError('Bad format input:Multiple separation sign.\n' + erroInfo)
      }
    }
    let decimalWidth: number = 6
    tmp = /(?<=^\.)(\d+)/.exec(formatString)
    if (tmp !== null) {
      decimalWidth = parseInt(tmp[0])
      formatString = formatString.replace(/^\.+\d+/, '')
      if (formatString.search(/^\.{1}/) !== -1) {
        let erroInfo = `Error point at:\n[${formatStringBackup}]\n${' '.repeat(formatStringBackup.search(formatString) + 1)}^`
        throw new SyntaxError('Bad format input:Multiple decimal point.\n' + erroInfo)
      }
    }
    let format: string = 's'
    if (/^[bdoxfegs%]{1}$/i.exec(formatString) !== null) {
      format = formatString
    } else {
      let erroInfo = `Error point at:\n[${formatStringBackup}]\n${' '.repeat(formatStringBackup.search(formatString) + 1)}^`
      throw new SyntaxError('Bad format input:Formatting flag is not in [[bdoxfgs%]].\n' + erroInfo)
    }
    // console.log('textAlign:', textAlign, '\t', 'fillChar:', fillChar, '\t', 'sign:', sign, '\t', 'isHash:', isHash, '\t', 'isFillZero:', isFillZero, '\n', 'width:', width, '\t', 'separation:', separation, '\t', 'decimalWidth:', decimalWidth, '\t', 'format:', format)
  
    if (textAlign === '') {
      if (/[sS]/.test(format)) {
        textAlign = 'left'
      } else if (/[bdoxfg%]/i.test(format)) (
        textAlign = 'right'
      )
    }
    let offset = 0
    let fillset = 0
    decimalWidth = decimalWidth > width ? width : decimalWidth
  
    if (/[sS]/.test(format)) {
      raw = raw.slice(0, decimalWidth)
    } else if (/[fg%]/i.test(format)) {
      raw = raw.replace(/[^\+\-\.0-9eEoObBdDxXn]/g, '')
      if(/e{1}/i.test(raw)){
        raw = this.toNonExponential(raw)
      }
      if (format === 'g' || format === 'G') {
        raw = parseFloat(raw).toPrecision(decimalWidth).toString()
      } else if (format === 'f' || format === 'F') {
        raw = parseFloat(raw).toFixed(decimalWidth).toString()
      } else if (format === '%') {
        raw = (parseFloat(raw) * 100).toFixed(decimalWidth).toString() + '%'
      }
      if (format !== '%') {
        raw = this.divideBySign(raw, separation)
      }
      if (!/^[-]{1}/.test(raw)) {
        raw = sign + raw
      }
      if (isFillZero && fillChar === "") {
        raw = raw.replace(/^[\-\+ ]?/, '$&' + '0'.repeat(width - raw.length))
      }
    } else if (/[eE]/i.test(format)) {
      raw = parseFloat(raw).toExponential(decimalWidth).toString()
      raw = sign + raw
      if (isFillZero && fillChar === "") {
        raw = raw.replace(/^[\-\+ ]?/, '$&' + '0'.repeat(width - raw.length))
      }
    } else if (/[bdox]/i.test(format)) {
      let radix = 10
      let symbol: string = ''
      switch (format.toLowerCase()) {
        case 'b':
          radix = 2
          symbol = '0b'
          break
        case 'o':
          radix = 8
          symbol = '0o'
          break
        case 'x':
          radix = 16
          symbol = '0x'
          break
        case 'd':
          radix = 10
          break
        default:
          radix = 10
      }
      decimalWidth = 0
      raw = parseInt(raw).toString(radix)
      if (isHash) {
        if (/[OXB]{1}/.test(format)) {
          symbol = symbol.toUpperCase()
        }
        raw = raw.replace(/^[\-\+]?/, '$&' + symbol)
      }
      if (!/^[-]{1}/.test(raw)) {
        raw = sign + raw
      }
      if (isFillZero && fillChar === "") {
        raw = raw.replace(/^[\-\+]?(?:0[oxb]{1})?/i, '$&' + '0'.repeat(width - raw.length))
      }
    }
  
    if (width > raw.length) {
      switch (textAlign) {
        case 'left':
          offset = 0
          fillset = width - raw.length
          break
        case 'right':
          offset = width - raw.length
          fillset = 0
          break
        case 'center':
          offset = Math.trunc((width - raw.length) / 2)
          fillset = width - raw.length - offset
      }
    }
    if (fillChar === '') {
      fillChar = ' '
    }
    result = fillChar.repeat(offset) + raw + fillChar.repeat(fillset)
    return result
  }
}