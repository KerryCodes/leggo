

export function wordsLimitValidator(wordsLimit: any, rule: any, value: any){
  const { max, min, message }= wordsLimit
  const length = titleLength(value)
  return (length < min || length > max) ? Promise.reject(message) : Promise.resolve()
}

export function titleLength(str: string) {
  str = str || '';
  let blankNum = 0;
  let zhDotNum = 0;
  let enDotNum = 0;
  let zhNum = 0;
  let enNum = 0;
  const blankReg = /\s+/g;
  const zhReg = /[\u4e00-\u9fa5]+/g;
  const enReg = /[a-z0-9]+/ig;
  const zhDotRge = /【|】|、|；|‘|’|，|。|～|！|（|）|—|「|」|：|“|”|《|》|？+/g;
  const enDotReg = /`|·|!|\?|@|#|&|\*|¥|…|\$|%|-|=|\[|\]|\\|;|'|,|\.|\/|~|\(|\)|_|\+|\{|\}|\||:|"|<|>+/g;
  
  str = str.replace(blankReg, match => {
    blankNum = blankNum + match.length;
    return ''
  })
  str = str.replace(zhDotRge, match => {
    zhDotNum = zhDotNum + match.length;
    return ''
  })
  str = str.replace(enDotReg, match => {
    enDotNum = enDotNum + match.length;
    return ''
  })
  str = str.replace(enReg, match => {
    enNum = enNum + match.length;
    return ''
  })
  str = str.replace(zhReg, match => {
    zhNum = zhNum + match.length;
    return ''
  })
  let codeNumber = (blankNum + enNum + enDotNum) * 0.5 + (zhDotNum + zhNum) * 1;
  codeNumber = Math.ceil(codeNumber);
  return codeNumber;
}