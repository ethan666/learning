

export function padLeft(nr, n, str){
    return Array(n-String(nr).length+1).join(str||'0')+nr;
}

export function renderSize(limit){
    let size = "";
    if(limit < 0.1 * 1024){                            //小于0.1KB，则转化成B
        size = limit.toFixed(2) + "B"
    }else if(limit < 0.1 * 1024 * 1024){            //小于0.1MB，则转化成KB
        size = (limit/1024).toFixed(2) + "KB"
    }else if(limit < 0.1 * 1024 * 1024 * 1024){        //小于0.1GB，则转化成MB
        size = (limit/(1024 * 1024)).toFixed(2) + "MB"
    }else{                                            //其他转化成GB
        size = (limit/(1024 * 1024 * 1024)).toFixed(2) + "GB"
    }

    const sizeStr = size + "";                        //转成字符串
    const index = sizeStr.indexOf(".");                    //获取小数点处的索引
    const dou = sizeStr.substr(index + 1 ,2)            //获取小数点后两位的值
    if(dou == "00"){                                //判断后两位是否为00，如果是则删除00
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    }
    return size;
}

export function formatThousand(value){
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 阿拉伯数字转汉字
 * @param {number}} section 
 */
export function sectionToChinese(section){
    var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
    var chnUnitChar = ["","十","百","千","万","亿","万亿","亿亿"];
    var strIns = '', chnStr = '';
    var unitPos = 0;
    var zero = true;
    while(section > 0){
        var v = section % 10;
        if(v === 0){
             if(!zero){
                  zero = true;
                  chnStr = chnNumChar[v] + chnStr;
             }
        }else{
              zero = false;
              strIns = chnNumChar[v];
              strIns += chnUnitChar[unitPos];
              chnStr = strIns + chnStr;
        }
        unitPos++;
        section = Math.floor(section / 10);
     }
     return chnStr
}
