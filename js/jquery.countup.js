/*!
* jquery.countup.js 1.0.3
*
* Copyright 2016, Adrián Guerra Marrero http://agmstudio.io @AGMStudio_io
* Released under the MIT License
*
* Date: Oct 27, 2016
*/
(function( $ ){
  "use strict";//严格模式

  //拓展方法
  $.fn.countUp = function( options ) {

    // Defaults
    //添加静态方法(为JQ类添加类方法)
    var settings = $.extend({
        'time': 2000,
        'delay': 10
    }, options);

    return this.each(function(){

        // Store the object
        var $this = $(this);//将DOM对象转变为JQUERY对象
        var $settings = settings;
        
        //动画作帧START
        //数据判断器
        var counterUpper = function() {
            if(!$this.data('counterupTo')) {
                $this.data('counterupTo',$this.text());
            }
            var time = parseInt($this.data("counter-time")) > 0 ? parseInt($this.data("counter-time")) : $settings.time;//分析时间，解析一个字符串，并返回一个整数
            var delay = parseInt($this.data("counter-delay")) > 0 ? parseInt($this.data("counter-delay")) : $settings.delay;
            var divisions = time / delay;//divisions = 200，帧数
            var num = $this.data('counterupTo');
            var nums = [num];
            var isComma = /[0-9]+,[0-9]+/.test(num);//判断逗号
            num = num.replace(/,/g, '');//替换逗号为空
            var isInt = /^[0-9]+$/.test(num);//判断整数
            var isFloat = /^[0-9]+\.[0-9]+$/.test(num);//判断小数
            var decimalPlaces = isFloat ? (num.split('.')[1] || []).length : 0;//判断小数点位数
        //数据判断器
        
            
            //分帧
            for (var i = divisions; i >= 1; i--) {

                // 保留整数
                var newNum = parseInt(Math.round(num / divisions * i));

                // 保留小数
                if (isFloat) {
                    newNum = parseFloat(num / divisions * i).toFixed(decimalPlaces);//四舍五入
                }

                // 保留逗号计数
                if (isComma) {
                    while (/(\d+)(\d{3})/.test(newNum.toString())) {
                        newNum = newNum.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
                    }
                }

                nums.unshift(newNum);//向数组开头添加新元素
            }

            $this.data('counterup-nums', nums);//添加动画帧到"counterup-nums"数组
            $this.text('0');
            //动画作帧END
            

            // Updates the number until we're done
            //递归循环
            var f = function() {
                $this.text($this.data('counterup-nums').shift());//数组的第一个元素从其中删除，并返回第一个元素的值
                if ($this.data('counterup-nums').length) {
                    setTimeout($this.data('counterup-func'),delay);
                } else {
                    delete $this.data('counterup-nums');//清空数组，释放内存
                    $this.data('counterup-nums', null);
                    $this.data('counterup-func', null);
                }
            };
            $this.data('counterup-func', f);

            // Start the count up
            setTimeout($this.data('counterup-func'),delay);
        };

        // Perform counts when the element gets into view
        $this.waypoint(counterUpper, { offset: '100%', triggerOnce: true });
    });

  };

})( jQuery );
