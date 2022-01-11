export function wordsLimitValidator(wordsLimit: any, rule: any, value: any){
  const { max, min, message, rules }= wordsLimit
  const length = countLength(value, rules)
  return (length < min || length > max) ? Promise.reject(message) : Promise.resolve()
}


function countLength(str: string, configs: {
  zh: number, 
  others: number, 
  blank: boolean,
}) {
  str= str || ''
  const { zh, others, blank }= configs
  let zhNum = 0;
  let zhDotNum = 0;
  let othersNum = 0;
  const zhReg = /[\u4e00-\u9fa5]+/g;
  const zhDotRge = /【|】|、|；|‘|’|，|。|～|！|（|）|—|「|」|：|“|”|《|》|？+/g;
  const blankReg = /\s+/g;
  
  str = str.replace(/[\r\n]/g, '')
  str = str.replace(/&nbsp;/g, ' ')
  str = str.replace(zhReg, match => {
    zhNum = zhNum + match.length;
    return ''
  })
  str = str.replace(zhDotRge, match => {
    zhDotNum = zhDotNum + match.length;
    return ''
  })
  if(!blank){
    str = str.replace(blankReg, '')
  }
  othersNum= str.length

  return (zhNum+zhDotNum)*zh + othersNum*others;
}