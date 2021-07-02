const str = `（一）自然灾害。指由自然因素引发的与地壳运动、天体运动、气候变化相关的灾害。主要包括洪汛灾害、破坏性地震灾害、气象灾害、地质灾害和海洋灾害等。
（二）事故灾难。指在生产、生活中意外发生的故障、事故带来的灾害。主要包括各类生产安全事故（如坍塌、高处坠落、火灾、危险品爆炸以及船机设备等各类事故）、交通运输事故、公共设施和设备事故、环境污染和生态破坏事件等。
（三）公共卫生事件。指突然发生的，造成或者可能造成健康严重损害的突发公共事件。主要包括突发急性职业危害事件、重大传染病疫情事件、重大食物中毒事件和群体性不明原因疾病，以及严重影响公众健康和生命安全的事件。
（四）社会安全事件。指危及社会安全、社会发展的重大事件。主要包括群体性突发事件、公共文化场所和文化活动突发事件，恐怖袭击突发事件、民族、宗教冲突事件、涉外突发事件、合同纠纷突发事件，财产纠纷突发事件、金融纠纷突发事件、新闻媒体突发事件和网络与信息安全突发事件等。`


window.onload = function(){
  const bodyNode = document.getElementsByTagName('body')[0]
  
  var newEle=document.createElement("p");
  // newEle.innerHTML=str;  //innerText也可用
  newEle.innerText=str;  //innerText也可用

  // const newEle = document.createTextNode(str)
  // p.appendChild(newEle)

  bodyNode.appendChild(newEle)
}