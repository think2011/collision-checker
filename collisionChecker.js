;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory)
    } else if (typeof exports === 'object') {
        // Node, CommonJS
        module.exports = factory()
    } else {
        // Window
        root.collisionChecker = factory()
    }
}(this, function () {
    /**
     * 检测矩形碰撞 💥
     * @param elem 拖动元素
     * @param targetElem 被碰撞元素
     * @returns {object}
     */
    function func(elem, targetElem) {
        var elemPosition       = func.getPosition(elem)
        var targetElemPosition = func.getPosition(targetElem)

        var isCollision = !(elemPosition.bottom < targetElemPosition.top
        || elemPosition.left > targetElemPosition.right
        || elemPosition.top > targetElemPosition.bottom
        || elemPosition.right < targetElemPosition.left)

        return {
            isCollision: isCollision,
            isTop      : isCollision && elemPosition.top <= targetElemPosition.top,
            isRight    : isCollision && elemPosition.right >= targetElemPosition.right,
            isBottom   : isCollision && elemPosition.top >= targetElemPosition.top,
            isLeft     : isCollision && elemPosition.left <= targetElemPosition.left
        }
    }

    func.getEventInfo = function (e) {
        return func.isTouch() ? e.targetTouches[0] : e
    }

    func.getPosition = function (elem) {
        if (!(elem instanceof window.HTMLElement)) {
            throw new Error('params must be a HTMLElement')
        }

        return {
            top   : elem.offsetTop,
            right : elem.offsetLeft + elem.offsetWidth,
            bottom: elem.offsetTop + elem.offsetHeight,
            left  : elem.offsetLeft
        }
    }

    func.isTouch = function (e) {
        return 'ontouchstart' in window ||
            window.DocumentTouch && document instanceof window.DocumentTouch ||
            navigator.maxTouchPoints > 0 ||
            window.navigator.msMaxTouchPoints > 0
    }

    return func
}))