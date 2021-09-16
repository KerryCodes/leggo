export function wordsLimitValidator(wordsLimit, rule, value) {
    var max = wordsLimit.max, min = wordsLimit.min, message = wordsLimit.message, rules = wordsLimit.rules;
    var length = countLength(value, rules);
    return (length < min || length > max) ? Promise.reject(message) : Promise.resolve();
}
function countLength(str, configs) {
    str = str || '';
    var zh = configs.zh, others = configs.others, blank = configs.blank;
    var zhNum = 0;
    var zhDotNum = 0;
    var othersNum = 0;
    var zhReg = /[\u4e00-\u9fa5]+/g;
    var zhDotRge = /【|】|、|；|‘|’|，|。|～|！|（|）|—|「|」|：|“|”|《|》|？+/g;
    var blankReg = /\s+/g;
    str = str.replace(/[\r\n]/g, '');
    str = str.replace(/&nbsp;/g, ' ');
    str = str.replace(zhReg, function (match) {
        zhNum = zhNum + match.length;
        return '';
    });
    str = str.replace(zhDotRge, function (match) {
        zhDotNum = zhDotNum + match.length;
        return '';
    });
    if (!blank) {
        str = str.replace(blankReg, '');
    }
    othersNum = str.length;
    return (zhNum + zhDotNum) * zh + othersNum * others;
}
