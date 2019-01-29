    (function ($) {
        jQuery.fn.CheckResizeAds = function (user_options) {
            var options = {
                debug: false,
                frameParentElem: window,
                notEmptyCallBack: function () {},
                EmptyCallBack: function () {}
            };

            $.extend(options, user_options);

            var resizeFrame = function (frame, w, h) {
                var iw = $(options.frameParentElem).width();
                var xRatio = iw / w;
                if (w > iw) {
                    frame.width(iw).attr('width', iw);
                    frame.height(xRatio * h).attr('height', xRatio * h);
                    logToConsole('Iframe has been resized');
                }
            };
            var logToConsole = function (log) {
                if (options.debug && typeof console.log !== "undefined")
                    console.log(`CheckResizeAds: ${log}`);
            };

            var listenerMutation = function (el) {
                try {
                    var obs = new MutationObserver(function (mutations, observer) {
                        $.each(mutations, function (i, mutation) {
                            var filteredFrame = $(mutation.addedNodes).find('iframe');
                            var filteredLink = $(mutation.addedNodes).find('a');
                            var adstype = "undefined";

                            if (filteredFrame.length > 0) {
                                adstype = "iframe";
                                filteredFrame.each(function () {
                                    resizeFrame($(this), $(this).attr('width'), $(this).attr('height'));
                                    if(typeof options.notEmptyCallBack == 'function')
                                        options.notEmptyCallBack.call(this, el, adstype);
                                    logToConsole('Found html ads');
                                });
                            } else if (filteredLink.length > 0 ) {
                                adstype = "img";
                                if(typeof options.notEmptyCallBack == 'function')
                                    options.notEmptyCallBack.call(this, el, adstype);
                                logToConsole('Found image ads');
                            } else {
                                if(typeof options.EmptyCallBack == 'function')
                                    options.EmptyCallBack.call(this, el, adstype);
                                logToConsole('Not found ads');
                            }
                        });
                    });
                    obs.observe(el, {childList: true});
                } catch (e) {
                    console.error(e.toString());
                }
            };

            return $(this).each(function (i,elem) {
                logToConsole('ins with zoneid ' + $(this).find('ins').data('revive-zoneid'));
                listenerMutation(elem);
            });
        };
    })(jQuery);
    $(function () {
        $('.jarnama-block').CheckResizeAds({
                debug: true,
                notEmptyCallBack: function ( ele, adstype) {
                    console.log(adstype);
                },
                EmptyCallBack: function ( ele, adstype) {
                    console.log(adstype);
                }
        });
    })
