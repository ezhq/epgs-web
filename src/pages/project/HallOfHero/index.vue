<template>
  <div>
   <span>Hall of Hero</span>
    <div class="seegear">

      <div class="slide" data-imgsnum="3" data-imgactiveindex="0">

        <!-- imgs -->
        <a href="https://playoverwatch.com/en-us/" target="_blank">
          <img id="id-slideimg-0" class="slide-img slide-img-active" src="https://res.cloudinary.com/imgcave/image/upload/v1591580483/Img/Wallpaper/NIBJCC28091_kortyx.png" alt=""></a>
        <a href="https://playhearthstone.com/en-us/" target="_blank">
          <img id="id-slideimg-1" class="slide-img" src="https://res.cloudinary.com/imgcave/image/upload/v1591580479/Img/Wallpaper/NIBJXS26281_ogb221.png" alt=""></a>
        <a href="https://play.na.leagueoflegends.com/en_US" target="_blank">
          <img id="id-slideimg-2" class="slide-img" src="https://res.cloudinary.com/imgcave/image/upload/v1591580568/Img/Wallpaper/BJCC42067_dag9yl.png" alt=""></a>


        <button class="slide-button slide-button-left vertical-center" data-offset="-1">&lt;</button>
        <button class="slide-button slide-button-right vertical-center" data-offset="1">&gt;</button>

        <div class="slide-dots">
          <div id="id-slidedot-0" data-dotindex="0" class="slide-dot slide-dot-active"></div>
          <div id="id-slidedot-1" data-dotindex="1" class="slide-dot"></div>
          <div id="id-slidedot-2" data-dotindex="2" class="slide-dot"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "index"
}



/* ================ Run Ready ================ */
// log
const log = console.log.bind(console)

// e
const e = function (selector) {
  let element = document.querySelector(selector)
  if (element === null) {
    let s = `selector ${selector} not found`
    log(s)
    // alert(s)
    //
    return null
  } else {
    return element
  }
}

// es 返回一个数组，包含所有被选中的元素
const es = function (selector) {
  let elements = document.querySelectorAll(selector)
  if (elements.length === 0) {
    let s = `selector ${selector} not found`
    log(s)
    // alert(s)
    //
    return []
  } else {
    return elements
  }
}

// appendHtml
const appendHtml = function (inElement, inHtml) {
  let element = inElement
  let html = inHtml

  element.insertAdjacentHTML('beforeend', html)
}

// bindEvenet
const bindEvent = function (inElement, inEventName, inCallback) {
  let element = inElement
  let eventName = inEventName
  let callback = inCallback

  element.addEventListener(eventName, callback)
}

// removeClassAll
const removeClassAll = function (inClassName) {
  let className = inClassName
  let selector = '.' + className
  let elements = es(selector)

  for (let i = 0; i < elements.length; i++) {
    let e = elements[i]
    // log('--->removeClassAll: className and element = ', className, e)
    e.classList.remove(className)
  }

}

// bindAll 给所有的元素绑定事件
const bindAll = function (inSelector, inEventName, inCallback) {
  let selector = inSelector
  let eventName = inEventName
  let callback = inCallback

  let elements = es(selector)
  for (let i = 0; i < elements.length; i++) {
    let e = elements[i]

    bindEvent(e, eventName, callback)
  }
}

// find 查找 element 的所有子元素
const find = function (inElement, inSelector) {
  let element = inElement
  let selector = inSelector

  let e = element.querySelector(selector)
  if (e === null) {
    let tipsInfo = `Tips：选择器 ${selector} 没有找到元素或 JS 没有放到 <body> 中。`
    alert(tipsInfo)

    return null
  } else {
    return e
  }
}

// closestClass()
const closestClass = function (inElement, inClassName = '') {
  let element = inElement
  let className = inClassName
  let parent = element.parentElement

  for (let i = 0; i < 100; i++) {

    if (parent === null) {
      return null
    }

    let parentClassList = parent.classList

    if ((String(parentClassList) === String(className))) {
      return parent
    } else {
      parent = parent.parentElement
    }
  }
}

// closestId()
const closestId = function (inElement, inId = '') {
  let element = inElement
  let keyId = inId
  let parent = element.parentElement

  for (let i = 0; i < 100; i++) {

    if (parent === null) {
      return null
    }

    let parentId = parent.id

    if ((String(parentId) === String(keyId))) {
      return parent
    } else {
      parent = parent.parentElement
    }
  }
}

// closesstTag()
const closestTag = function (inElement, inTag = '') {
  let element = inElement
  let keyTag = inTag
  keyTag = keyTag.toUpperCase()
  let parent = element.parentElement

  for (let i = 0; i < 100; i++) {

    if (parent === null) {
      return null
    }

    let parentTag = parent.tagName

    if (parentTag === keyTag) {
      return parent
    } else {
      parent = parent.parentElement
    }
  }
}

// closest(inElement, inKeySelector): 循环查找 element 的直系父元素
// 如果父元素符合选择器, 则返回这个父元素, 若没有，则返回 null
const closest = function (inElement, inKeySelector = '') {
  let element = inElement
  let keySelector = inKeySelector
  let keySelectorHead = keySelector[0]

  let keyClass = ''
  let keyId = ''
  let keyTag = ''

  if (keySelectorHead === '.') {
    keyClass = keySelector.slice(1)

    return closestClass(element, keyClass)
  } else if (keySelectorHead === '#') {
    keyId = keySelector.slice(1)

    return closestId(element, keyId)
  } else {
    keyTag = keySelector.slice(0)
    keyTag = keyTag.toUpperCase()

    return closestTag(element, keyTag)
  }
}

/* ================ Basic Model ================ */

// nextImgIndex
const nextImgIndex = function (inSlide, inOffset) {
  let slide = inSlide
  let offset = inOffset

  // 1. 得到 slide 包含图片总数及当前图片下标
  let imgsNum = parseInt(slide.dataset.imgsnum, 10)
  let imgActiveIndex = Number(slide.dataset.imgactiveindex)


  // 2. 得出下一张图片的 index 并返回
  let nextImgIndex = (imgActiveIndex + offset + imgsNum) % imgsNum

  return nextImgIndex
}

// showImgByIndex
const showImgByIndex = function (inSlide, inIndex) {
  let slide = inSlide
  let index = inIndex

  // 1. 更新 slide 的活动图片标记
  slide.dataset.imgactiveindex = index

  // 2. 清除当前图片活动标记， 并为要显示的图片添加活动标记
  let imgActiveClass = 'slide-img-active'
  removeClassAll(imgActiveClass)

  let selector = `#id-slideimg-${String(index)}`
  let img = e(selector)
  img.classList.add(imgActiveClass)
}

// showDotByIndex
const showDotByIndex = function (inSlide, inIndex) {
  let slide = inSlide
  let index = inIndex

  // 1. 清除当前 dot 活动标记，并为要显示的 dot 添加活动标记
  let dotActiveClass = 'slide-dot-active'
  removeClassAll(dotActiveClass)

  let dotSelector = `#id-slidedot-${String(index)}`
  let dot = e(dotSelector)
  dot.classList.add(dotActiveClass)
}




/* ================ Main Function ================ */
// bindEventSlide
const bindEventSlide = function () {
  let selector = '.slide-button'

  bindAll(selector, 'click', function (event) {
    // 1. 确定动作按钮
    let button = event.target

    // 2. 找到上层 slide  div
    // let slide = button.parentElement
    let slide = closest(button, '.slide')

    // 3. 得到偏移量 并算出下张图片的下标
    let offset = Number(button.dataset.offset)
    let nextIndex = nextImgIndex(slide, offset)
    log('--->offset:', offset)
    log('--->nextIndex:', nextIndex)

    // 4. 显示下一张图片 和 dot
    showImgByIndex(slide, nextIndex)
    showDotByIndex(slide, nextIndex)
  })
}

// bindEventDot
const bindEventDot = function () {
  // clearInterval(slideAutoTimeId)

  let selector = '.slide-dot'
  bindAll(selector, 'click', function (event) {
    // 1. 确定动作 dot
    let dot = event.target

    // 2. 找到最近的上层 slide div
    let slide = closest(dot, '.slide')

    // 3. 得到下张图片的下标
    let nextIndex = Number(dot.dataset.dotindex)

    // 4. 显示下一张图片和 dot
    showImgByIndex(slide, nextIndex)
    showDotByIndex(slide, nextIndex)

    // clearInterval(imgAuto)
  })

  // imgAuto()

  // bindAll(selector, 'mouseup', function(event) {
  //     imgAuto()
  // })
}


// bindEvents
const bindEvents = function () {
  bindEventSlide()
  bindEventDot()
}



// playNextImg
const playNextImg = function (inSteplength = 1) {
  let stepLength = inSteplength

  // 1. 定位 slide
  let slide = e('.slide')

  // 2. 得到下张图片的下标
  let nextIndex = nextImgIndex(slide, stepLength)

  // 3. 显示下一张图片和 dot
  showImgByIndex(slide, nextIndex)
  showDotByIndex(slide, nextIndex)
}

// slideAutoPlay
const slideAutoPlay = function (inInterval, inSteplength = 1) {
  let interval = inInterval
  let stepLength = inSteplength

  // slideAutoTimeId =

  var imgAuto = setInterval(function () {
    playNextImg(stepLength)
  }, interval);
  // imgAuto
}

/* ================ Test Function ================ */

/* ================ Run ================ */
const __main = function () {
  // var slideAutoTimeId;

  bindEvents()

  slideAutoPlay(2000, 1)
}

__main()

</script>

<style scoped>
/* basic */
.seegear {
  /* background-color: #32CD79; */
  width: 50%;
  height: auto;
  border-radius: 20px;
  margin: 0 auto;
}

/* slide */
.slide {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;

  transition: box-shadow 0.2s ease-in-out;
  /* background-color: rgb(110, 110, 110); */
  box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.1), 0 2px 4px 0px rgba(0, 0, 0, 0.1);

}

.slide:hover {
  transition: box-shadow 0.2s ease-in-out;
  box-shadow: 0 2px 4px 0px rgba(0, 0, 0, 0.1), 0 4px 8px 0px rgba(0, 0, 0, 0.1), 0 8px 16px 0px rgba(0, 0, 0, 0.1), 0 16px 32px 0px rgba(0, 0, 0, 0.1);
}

/* slide img */
.slide-img {
  width: 100%;
  height: 100%;

  display: none;
  border-radius: 20px;

  bottom: 0px;
}
.slide-img-active {
  display: inline-block;
}

/* slide button */
.slide-button {
  width: 30px;
  height: 50px;

  border: none;
  border-radius: 5px;
  outline: none;

  color: white;
  background: black;
  opacity: 0.5;

}
.slide-button:hover {
  cursor: pointer;

  color: black;
  background: #FEEDE5;
  opacity: 0.6;
}
.slide-button.slide-button-left {
  left: 0;
}
.slide-button.slide-button-right {
  right: 0;
}
.vertical-center {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

/* slide dots */
.slide-dots {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 5%;
  text-align: center;
}
.slide-dot {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 5px;
  background: white;
  opacity: 0.6;
  box-shadow: 0px 0px 4px 2px grey;
  /* box-shadow: 10px 10px 5px 0px red; */
}
.slide-dot-active {
  background: #32CD79;
  opacity: 0.8;
  box-shadow: 0px 0px 4px 2px white;
}
.slide-dot:hover {
  cursor: pointer;
  opacity: 1;
}
</style>
