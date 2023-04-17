
"use strict";

function _typeof(e) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    })(e)
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            writable: !0,
            configurable: !0
        }
    }), Object.defineProperty(e, "prototype", {
        writable: !1
    }), t && _setPrototypeOf(e, t)
}

function _setPrototypeOf(e, t) {
    return (_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
        return e.__proto__ = t, e
    })(e, t)
}

function _createSuper(n) {
    var i = _isNativeReflectConstruct();
    return function () {
        var e, t = _getPrototypeOf(n);
        return _possibleConstructorReturn(this, i ? (e = _getPrototypeOf(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments))
    }
}

function _possibleConstructorReturn(e, t) {
    if (t && ("object" === _typeof(t) || "function" == typeof t)) return t;
    if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(e)
}

function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e
}

function _isNativeReflectConstruct() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () { })), !0
    } catch (e) {
        return !1
    }
}

function _getPrototypeOf(e) {
    return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e)
    })(e)
}

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _defineProperties(e, t) {
    for (var n = 0; n < t.length; n++) {
        var i = t[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, _toPropertyKey(i.key), i)
    }
}

function _createClass(e, t, n) {
    return t && _defineProperties(e.prototype, t), n && _defineProperties(e, n), Object.defineProperty(e, "prototype", {
        writable: !1
    }), e
}

function _toPropertyKey(e) {
    e = _toPrimitive(e, "string");
    return "symbol" === _typeof(e) ? e : String(e)
}

function _toPrimitive(e, t) {
    if ("object" !== _typeof(e) || null === e) return e;
    var n = e[Symbol.toPrimitive];
    if (void 0 === n) return ("string" === t ? String : Number)(e);
    n = n.call(e, t || "default");
    if ("object" !== _typeof(n)) return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
}
"undefined" == typeof mercator && !
    function () {
        var  s = this,
            r = { environment: "PROD" },
            o = "http://localhost:4200",
            a = "http://localhost:4200";

        function l(e, t) {
            window.addEventListener ? window.addEventListener(e, t) : window.attachEvent("on" + e, t)
        }
        
        r.onLoad = function (e) {
            e()
        }, r.charts = [], r.apiUrl = "http://localhost:4200", r.CDNUrl = o, r.publicApiUrl = "http://localhost:4200", r.CDNStaticFilesUrl = "http://localhost:4200", r.dataCollectorUrl = a, r.ablySubscribeKey = "hnsCTA.N9m7fg:y3JI9JQ1krTED-b9", r.version = "v33", r.isRendererDesignSwitchEnabled = false, r.SeatingChartDesignerConfigValidator = function () { }, r.SeatingChartDesignerConfigValidator.prototype.validate = function (e) {
            void 0 === e.divId || document.getElementById(e.divId) instanceof Element || r.SeatingChartConfigValidator.error("divId should be the id of an existing Element: https://developer.mozilla.org/en-US/docs/Web/API/Element")
        }, r.SeatingChartDesignerConfigValidator.error = function (e) {
            throw new Error("Invalid mercator designer config: " + e)
        }, r.getChart = function (e) {
            for (var t = 0; t < this.charts.length; ++t) {
                var n = this.charts[t].iframe;
                if (n && n.contentWindow === e) return this.charts[t]
            }
        }, r.destroyCharts = function () {
            r.charts.slice().forEach(function (e) {
                e.destroy()
            })
        }, r.DOMElementListener = function () {
            this.elementFetcher = null, this.widthChangedListener = null, this.dimensionsChangedListener = null, this.elementMadeVisibleListener = null, this.elementMadeInvisibleListener = null, this.positionInViewportChangedListener = null, this.maxSize = null, this.maxSizeExceededListener = null, this.lastDimensions = null, this.lastPositionInViewport = null, this.stopRequested = !1, this.elementIsVisible = null
        }, r.DOMElementListener.prototype.withElementFetcher = function (e) {
            return this.elementFetcher = e, this
        }, r.DOMElementListener.prototype.onInitialDimensionsDetermined = function (e) {
            return this.initialDimensionsDeterminedListener = e, this
        }, r.DOMElementListener.prototype.onWidthChanged = function (e) {
            return this.widthChangedListener = e, this
        }, r.DOMElementListener.prototype.onMaxSizeExceeded = function (e, t) {
            return this.maxSize = e, this.maxSizeExceededListener = t, this
        }, r.DOMElementListener.prototype.onDimensionsChanged = function (e) {
            return this.dimensionsChangedListener = e, this
        }, r.DOMElementListener.prototype.onElementMadeInvisible = function (e) {
            return this.elementMadeInvisibleListener = e, this
        }, r.DOMElementListener.prototype.onElementMadeVisible = function (e) {
            return this.elementMadeVisibleListener = e, this
        }, r.DOMElementListener.prototype.onPositionInViewportChanged = function (e) {
            return this.positionInViewportChangedListener = e, this
        }, r.DOMElementListener.prototype.start = function () {
            return this.listenForChanges(), this
        }, r.DOMElementListener.prototype.stop = function () {
            return this.stopRequested = !0, this
        }, r.DOMElementListener.prototype.listenForChanges = function () {
            this.shouldStop() || (this.invokeElementVisibilityChangedListenersIfNeeded(), null === this.lastDimensions ? this.lastDimensions = this.determineInitialDimensions() : this.invokeDimensionsChangedListenerIfNeeded(), this.invokePositionInViewportChangedListenerIfNeeded()), this.relistenForChanges()
        }, r.DOMElementListener.prototype.relistenForChanges = function () {
            requestAnimationFrame(this.listenForChanges.bind(this))
        }, r.DOMElementListener.prototype.determineInitialDimensions = function () {
            var e = this.elementDimensions();
            return 0 === e.width && 0 === e.height ? null : (this.initialDimensionsDeterminedListener && this.initialDimensionsDeterminedListener(e.width, e.height), e)
        }, r.DOMElementListener.prototype.shouldStop = function () {
            return !this.elementFetcher() || this.stopRequested
        }, r.DOMElementListener.prototype.invokeDimensionsChangedListenerIfNeeded = function () {
            var e = this.elementDimensions();
            this.checkForWidthChanges(e), this.checkForDimensionChanges(e), this.lastDimensions = e
        }, r.DOMElementListener.prototype.invokePositionInViewportChangedListenerIfNeeded = function () {
            var e = new r.Element(this.elementFetcher()).getPositionInViewport(),
                t = !this.positionsInViewportAreEqual(this.lastPositionInViewport, e),
                n = !this.viewportSizesAreEqual(this.lastViewportWidth, this.lastViewportHeight, window.innerWidth, window.innerHeight);
            (t || n) && (this.lastPositionInViewport = e, this.lastViewportWidth = window.innerWidth, this.lastViewportHeight = window.innerHeight, this.invokePositionInViewportChangedListener(this.lastPositionInViewport, this.lastViewportWidth, this.lastViewportHeight))
        }, r.DOMElementListener.prototype.invokeElementVisibilityChangedListenersIfNeeded = function () {
            var e = this.elementIsVisible,
                t = new r.Element(this.elementFetcher()).isVisible();
            this.invokeElementMadeVisibleListenerIfNeeded(this.elementMadeVisibleListener, e, t), this.invokeElementMadeInvisibleListenerIfNeeded(this.elementMadeInvisibleListener, e, t)
        }, r.DOMElementListener.prototype.invokeElementMadeVisibleListenerIfNeeded = function (e, t, n) {
            e && (!t && n) && (this.elementIsVisible = !0, e())
        }, r.DOMElementListener.prototype.invokeElementMadeInvisibleListenerIfNeeded = function (e, t, n) {
            e && (t && !n) && (this.elementIsVisible = !1, e())
        }, r.DOMElementListener.prototype.invokePositionInViewportChangedListener = function (e, t, n) {
            this.positionInViewportChangedListener && this.positionInViewportChangedListener(e, t, n)
        }, r.DOMElementListener.prototype.triggerDimensionChange = function () {
            this.lastDimensions = {
                width: null,
                height: null
            }
        }, r.DOMElementListener.prototype.checkForWidthChanges = function (e) {
            e.width !== this.lastDimensions.width && this.widthChangedListener && this.widthChangedListener(e.width)
        }, r.DOMElementListener.prototype.checkForDimensionChanges = function (e) {
            e.width === this.lastDimensions.width && e.height === this.lastDimensions.height || this.dimensionsChangedListener && this.dimensionsChangedListener(e.width, e.height)
        }, r.DOMElementListener.prototype.elementDimensions = function () {
            var e = new r.Element(this.elementFetcher()),
                t = e.getContentWidth(),
                e = e.getContentHeight();
            return this.maxSize ? this.elementDimensionsCapped(t, e) : {
                width: t,
                height: e
            }
        }, r.DOMElementListener.prototype.elementDimensionsCapped = function (e, t) {
            var n = Math.min(e, this.maxSize),
                i = Math.min(t, this.maxSize);
            return (n < e || i < t) && this.maxSizeExceededListener && this.maxSizeExceededListener(e, t, n, i), {
                width: n,
                height: i
            }
        }, r.DOMElementListener.prototype.positionsInViewportAreEqual = function (e, t) {
            return e && t && e.top === t.top && e.right === t.right && e.bottom === t.bottom && e.left === t.left
        }, r.DOMElementListener.prototype.viewportSizesAreEqual = function (e, t, n, i) {
            return e === n && t === i
        }, r.Element = function (e) {
            this.element = e
        }, r.Element.prototype.getPositionInViewport = function () {
            var e = this.element.getBoundingClientRect();
            return {
                top: e.top,
                bottom: e.bottom,
                right: e.right,
                left: e.left
            }
        }, r.Element.prototype.getContentHeight = function () {
            var e = getComputedStyle(this.element),
                t = r.Element.pixelsToNumber(e.height);
            return "border-box" === e["box-sizing"] ? t - r.Element.verticalPaddingAndBorder(e) : t
        }, r.Element.prototype.getContentWidth = function () {
            var e = getComputedStyle(this.element),
                t = r.Element.pixelsToNumber(e.width);
            return "border-box" === e["box-sizing"] ? t - r.Element.horizontalPaddingAndBorder(e) : t
        }, r.Element.prototype.isVisible = function () {
            return 0 < this.element.offsetHeight
        }, r.Element.pixelsToNumber = function (e) {
            return "auto" === e ? 0 : parseFloat(e)
        }, r.Element.horizontalPaddingAndBorder = function (e) {
            return r.Element.pixelsToNumber(e["border-left-width"]) + r.Element.pixelsToNumber(e["border-right-width"]) + r.Element.pixelsToNumber(e["padding-left"]) + r.Element.pixelsToNumber(e["padding-right"])
        }, r.Element.verticalPaddingAndBorder = function (e) {
            return r.Element.pixelsToNumber(e["border-top-width"]) + r.Element.pixelsToNumber(e["border-bottom-width"]) + r.Element.pixelsToNumber(e["padding-top"]) + r.Element.pixelsToNumber(e["padding-bottom"])
        }, r.Embeddable = function () { }, r.Embeddable.prototype.init = function (e, t) {
            (e = e || {}).configKeys = Object.entries(e).filter(function (e) {
                return void 0 !== e[1]
            }).map(function (e) {
                return e[0]
            }), e.divId || e.container || (e.divId = "mercatorMap"), e.embedType = t || "Renderer", this.config = e, this.iframe = null
        }, r.Embeddable.prototype.container = function () {
            return this.config.divId ? document.getElementById(this.config.divId) : this.config.container
        }, r.Embeddable.prototype.createIframe = function (e) {
            this.iframe = document.createElement("iframe"), this.iframe.style.border = "none", this.iframe.scrolling = "no", this.iframe.frameBorder = 0, this.iframe.src = e, this.iframe.style.width = "100%", this.iframe.style.height = "100%", this.iframe.style.display = "block", this.forceEqualColorSchemeOnIframeElementAndIframeContents(), this.overrideObjectFitForWebkit(), this.container().appendChild(this.iframe)
        }, r.Embeddable.prototype.forceEqualColorSchemeOnIframeElementAndIframeContents = function () {
            this.iframe.style["color-scheme"] = "light"
        }, r.Embeddable.prototype.overrideObjectFitForWebkit = function () {
            this.iframe.style.setProperty("object-fit", "fill", "important")
        }, r.Embeddable.prototype.removeIframe = function () {
            this.iframe && (this.removeContainerChild(this.iframe), this.iframe = null)
        }, r.Embeddable.prototype.getColorScheme = function () {
            return "dark" === this.config.colorScheme ? "dark" : "light"
        }, r.Embeddable.prototype.createLoadingScreen = function () {
            var e;
            this.loadingScreen ? this.loadingScreen.classList.remove("hide") : (e = this.container().getBoundingClientRect(), this.loadingScreen = document.createElement("div"), this.createSpinnerStylesheet(this.loadingScreen), this.loadingScreen.style.position = "absolute", this.loadingScreen.style.width = "".concat(e.width, "px"), this.loadingScreen.style.height = "".concat(e.height, "px"), this.loadingScreen.classList.add("mercator-loading-screen"), this.loadingScreen.classList.add("".concat(this.getColorScheme(), "-bg")), this.container().insertBefore(this.loadingScreen, this.iframe), this.loadingScreen.appendChild(this.createLoadingIndicator()))
        }, r.Embeddable.prototype.createSpinnerStylesheet = function (e) {
            var t = document.createElement("link");
            t.href = r.CDNStaticFilesUrl + "/assets/mercator/chart-js/loading.css", t.type = "text/css", t.rel = "stylesheet", e.appendChild(t)
        }, r.Embeddable.prototype.createLoadingIndicator = function () {
            return document.createElement("div")
        }, r.Embeddable.prototype.hideLoadingScreen = function () {
            this.loadingScreen.classList.add("hide")
        }, r.Embeddable.prototype.removeLoadingScreen = function () {
            this.loadingScreen && (this.removeContainerChild(this.loadingScreen), this.loadingScreen = null)
        }, r.Embeddable.prototype.removeContainerChild = function (e) {
            var t = this.container();
            t && t.removeChild(e)
        }, r.Embeddable.prototype.sendMsgToIframe = function (e) {
            var t = this.getIframe();
            return !!t && (t.contentWindow.postMessage(JSON.stringify(e), "*"), !0)
        }, r.Embeddable.prototype.getIframe = function () {
            if (this.iframe && this.iframe.contentWindow) return this.iframe
        };
        var c = 16;
        r.Embeddable.prototype.handleKey = function (e) {
            e.keyCode === c && this.sendMsgToIframe({
                type: e.type,
                keyCode: e.keyCode
            })
        }, r.Embeddable.removeUnserializableFieldsFromConfig = function (e) {
            e = Object.assign({}, e);
            return delete e.container, e
        }, r.EmbeddableConfigValidator = function () { }, r.EmbeddableConfigValidator.prototype.validate = function (e) {
            void 0 !== e.divId && void 0 !== e.container && r.SeatingChartConfigValidator.error("Either pass in 'divId' or 'container', but not both."), void 0 === e.container || e.container instanceof Element || r.SeatingChartConfigValidator.error("container should be an Element: https://developer.mozilla.org/en-US/docs/Web/API/Element")
        }, r.EmbeddableConfigValidator.error = function (e) {
            throw new Error("Invalid mercator config: " + e)
        }, r.FullScreenManager = function () {
            function t(e) {
                _classCallCheck(this, t), this.chart = e
            }
            return _createClass(t, [{
                key: "open",
                value: function (e) {
                    this.chart.isFullScreen || (this.chart.settingsBeforeFullScreen = {}, this.chart.isFullScreen = !0, this._preventHostPageScrolling(), this._saveHostPageScrollPosition(), this._makeChartContainerFullScreen(e), this._hideIframeUntilChartRerendered(), this._invokeFullScreenOpenedCallback())
                }
            }, {
                key: "close",
                value: function () {
                    this.chart.isFullScreen && (this.chart.isFullScreen = !1, this._allowHostPageScrolling(), this._restoreHostPageScrollPosition(), this._makeChartContainerNotFullScreen(), this._hideIframeUntilChartRerendered(), this._invokeFullScreenClosedCallback())
                }
            }, {
                key: "_saveHostPageScrollPosition",
                value: function () {
                    this.chart.settingsBeforeFullScreen.oldScrollY = window.scrollY
                }
            }, {
                key: "_restoreHostPageScrollPosition",
                value: function () {
                    var e = this;
                    this._onChartRerendered(function () {
                        window.scrollTo(window.scrollX, e.chart.settingsBeforeFullScreen.oldScrollY)
                    })
                }
            }, {
                key: "_makeChartContainerFullScreen",
                value: function (e) {
                    var t = this.chart.container();
                    this.chart.settingsBeforeFullScreen.chartContainerCssText = t.style.cssText, t.style.setProperty("position", "fixed", "important"), t.style.setProperty("top", "0", "important"), t.style.setProperty("left", "0", "important"), t.style.setProperty("width", "100vw", "important"), t.style.setProperty("max-width", "none", "important"), t.style.setProperty("min-width", "none", "important"), t.style.setProperty("height", window.innerHeight + "px", "important"), t.style.setProperty("max-height", "none", "important"), t.style.setProperty("min-height", "none", "important"), t.style.setProperty("margin", "0", "important"), t.style.setProperty("margin-top", "0", "important"), t.style.setProperty("margin-bottom", "0", "important"), t.style.setProperty("margin-left", "0", "important"), t.style.setProperty("margin-right", "0", "important"), t.style.setProperty("padding", "0", "important"), t.style.setProperty("padding-top", "0", "important"), t.style.setProperty("padding-bottom", "0", "important"), t.style.setProperty("padding-left", "0", "important"), t.style.setProperty("padding-right", "0", "important"), t.style.setProperty("border", "none", "important"), t.style.setProperty("background-color", e ? "#212121" : "white", "important"), t.style.setProperty("z-index", r.MAX_Z_INDEX, "important"), this._adaptToWindowInnerHeightBecauseLocationBarChangesInnerHeightOniOS(), this.chart.domElementListener.triggerDimensionChange()
                }
            }, {
                key: "_adaptToWindowInnerHeightBecauseLocationBarChangesInnerHeightOniOS",
                value: function () {
                    var e = this;
                    requestAnimationFrame(function () {
                        e.chart.isFullScreen && (e.chart.container().style.setProperty("height", window.innerHeight + "px", "important"), e._adaptToWindowInnerHeightBecauseLocationBarChangesInnerHeightOniOS())
                    })
                }
            }, {
                key: "_makeChartContainerNotFullScreen",
                value: function () {
                    this.chart.container().style.cssText = this.chart.settingsBeforeFullScreen.chartContainerCssText, this.chart.domElementListener.triggerDimensionChange()
                }
            }, {
                key: "_preventHostPageScrolling",
                value: function () {
                    this.chart.settingsBeforeFullScreen.documentOverflow = document.documentElement.style.overflow, document.documentElement.style.setProperty("overflow", "hidden", "important")
                }
            }, {
                key: "_allowHostPageScrolling",
                value: function () {
                    document.documentElement.style.overflow = this.chart.settingsBeforeFullScreen.documentOverflow
                }
            }, {
                key: "_invokeFullScreenOpenedCallback",
                value: function () {
                    this.chart.config.onFullScreenOpened && this.chart.config.onFullScreenOpened()
                }
            }, {
                key: "_invokeFullScreenClosedCallback",
                value: function () {
                    this.chart.config.onFullScreenClosed && this.chart.config.onFullScreenClosed()
                }
            }, {
                key: "_hideIframeUntilChartRerendered",
                value: function () {
                    var e = this;
                    this.chart.iframe.style.setProperty("opacity", "0"), this.chart.iframe.style.setProperty("transition", "none"), this._onChartRerendered(function () {
                        e.chart.iframe.style.setProperty("transition", "opacity 1.5s cubic-bezier(0.15, 0.8, 0.2, 1)"), e.chart.iframe.style.setProperty("opacity", "1")
                    })
                }
            }, {
                key: "_onChartRerendered",
                value: function (e) {
                    this._onChartRerenderedFns || (this._onChartRerenderedFns = [], r.FullScreenManager._invokeFnsOnChartRendered(this._onChartRerenderedFns, this.chart)), this._onChartRerenderedFns.push(e)
                }
            }], [{
                key: "_invokeFnsOnChartRendered",
                value: function (e, t) {
                    var n = t.config.onChartRerendered;
                    t.config.onChartRerendered = function () {
                        e.forEach(function (e) {
                            return e()
                        }), n && n.call(t.config, t), t.config.onChartRerendered = n
                    }
                }
            }]), t
        }(), r.SeatingChart = function (e, t) {
            r.charts.push(this), r.isFirstChartOnPage = void 0 === r.isFirstChartOnPage, this.init(e, t), (new r.SeatingChartConfigValidator).validate(e), this.selectedObjectsInput = null, this.storage = r.MercatorStorage.create(function () {
                return sessionStorage
            }, "mercator", "Session storage not supported; stored data (e.g. hold token) will be lost after page refresh"), this.config.maxSelectedObjects = u(this.config.maxSelectedSeats).orElse(this.config.maxSelectedObjects), this.config.objectColor = u(this.config.seatColor).orElse(this.config.objectColor), this.config.objectLabel = u(this.config.seatLabel).orElse(this.config.objectLabel), this.config.objectIcon = u(this.config.seatIcon).orElse(this.config.objectIcon), this.config.selectedObjectsInputName = u(this.config.selectedSeatsInputName).orElse(this.config.selectedObjectsInputName), this.config.selectedObjects = u(this.config.selectedSeats).orElse(this.config.selectedObjects), this.config.onObjectSelected = u(this.config.onSeatSelected).orElse(this.config.onObjectSelected), this.config.onObjectDeselected = u(this.config.onSeatDeselected).orElse(this.config.onObjectDeselected), this.config.onObjectMouseOver = u(this.config.onSeatMouseOver).orElse(this.config.onObjectMouseOver), this.config.onObjectMouseOut = u(this.config.onSeatMouseOut).orElse(this.config.onObjectMouseOut), this.config.onSelectedObjectBooked = u(this.config.onSelectedSeatBooked).orElse(this.config.onSelectedObjectBooked), this.config.onBestAvailableSelected = u(this.config.onBestAvailableSeatsSelected).orElse(this.config.onBestAvailableSelected), this.config.onBestAvailableSelectionFailed = u(this.config.onBestAvailableSeatsSelectionFailed).orElse(this.config.onBestAvailableSelectionFailed), this.config.holdOnSelect = u(this.config.reserveOnSelect).orElse(this.config.holdOnSelect), this.config.regenerateHoldToken = u(this.config.regenerateReservationToken).orElse(this.config.regenerateHoldToken), this.config.holdToken = null !== (t = u(this.config.reservationToken).orElse(this.config.holdToken)) ? t : void 0, this.config.holdTokenInputName = u(this.config.reservationTokenInputName).orElse(this.config.holdTokenInputName), this.config.onHoldSucceeded = u(this.config.onReservationSucceeded).orElse(this.config.onHoldSucceeded), this.config.onHoldFailed = u(this.config.onReservationFailed).orElse(this.config.onHoldFailed), this.config.onReleaseHoldSucceeded = u(this.config.onUnreservationSucceeded).orElse(this.config.onReleaseHoldSucceeded), this.config.onReleaseHoldFailed = u(this.config.onUnreservationFailed).orElse(this.config.onReleaseHoldFailed), this.config.apiUrl = r.apiUrl, this.config.publicApiUrl = r.publicApiUrl, this.config.dataCollectorUrl = r.dataCollectorUrl, this.config.ablySubscribeKey = r.ablySubscribeKey, this.config.isRendererDesignSwitchEnabled = r.isRendererDesignSwitchEnabled, this.selectedObjects = this.selectedSeats = [], this.holdToken = null, this.reservationToken = null, this.requestIdCtr = 0, this.requestCallbacks = {}, this.requestErrorCallbacks = {}, this.state = "INITIAL", this.initialContainerDimensions = null, this.domElementListener = null, this.iframeElementListener = null, this.errorSentToDataCollector = !1, this.sentWarnings = [], this.mercatorLoadedDeferred = new g, this.containerVisible = new g
        }, r.SeatingChart.prototype = new r.Embeddable, r.SeatingChart.prototype.debounce = function (i, o) {
            var r;
            return function () {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                clearTimeout(r), r = setTimeout(function () {
                    i.apply(s, t)
                }, o)
            }
        }, r.SeatingChart.prototype.render = function () {
            var o = this;
            if ("DESTROYED" === this.state) throw new Error("Cannot render a chart that has been destroyed");
            (new r.EmbeddableConfigValidator).validate(this.config);
            var n = this,
                i = this.debounce(function (e, t) {
                    return n.renderChart(e, t)
                }, 100);
            return this.state = "RENDERING", this.domElementListener = (new r.DOMElementListener).withElementFetcher(function () {
                return n.container()
            }).onMaxSizeExceeded(r.SeatingChart.MAX_SIZE, function (e, t, n, i) {
                o.warnOnce("MAX_SIZE_EXCEEDED", "Chart container div is ".concat(e, "x").concat(t, ", but we're limiting the size to ").concat(n, "x").concat(i))
            }).onInitialDimensionsDetermined(function (e, t) {
                n.renderChartInitially(e, t)
            }).onWidthChanged(function (e) {
                n.fitsToWidth() && i(e)
            }).onDimensionsChanged(function (e, t) {
                n.fitsToWidthAndHeight() && i(e, t)
            }).onElementMadeVisible(function () {
                n.containerVisible.resolve()
            }).onElementMadeInvisible(function () {
                n.containerVisible = new g
            }).start(), this
        }, r.SeatingChart.prototype.getEventKey = function () {
            return this.config.event || this.config.events && this.config.events[0]
        }, r.SeatingChart.prototype.createLoadingIndicator = function () {
            var e = document.createElement("div");
            return e.classList.add("loading-indicator"), e.innerHTML = this.config.loading ? '<div class="custom-indicator">'.concat(this.config.loading, "</div>") : '\n            <div class="bouncy ball-1 alt"></div>\n            <div class="bouncy ball-2 alt"></div>\n            <div class="bouncy ball-1"></div>\n            <div class="bouncy ball-2"></div>\n        ', e
        }, r.SeatingChart.prototype.isAllowedToRender = function () {
            return p ? this.containerVisible.promise : Promise.resolve()
        }, r.SeatingChart.prototype.destroy = function () {
            if ("DESTROYED" === this.state) throw new Error("Cannot destroy a chart that has already been destroyed");
            this.unrender(), this.state = "DESTROYED", r.removeFromArray(this, r.charts)
        }, r.SeatingChart.prototype.unrender = function () {
            this.domElementListener && this.domElementListener.stop(), this.iframeElementListener && this.iframeElementListener.stop(), this.isFullScreen = !1, this.removeIframe(), this.removeLoadingScreen(), this.removeSelectedObjectsInput(), this.removeHoldTokenInput(), this.state = "INITIAL", this.selectedObjects = this.selectedSeats = []
        }, r.SeatingChart.prototype.renderChartInitially = function (e, t) {
            this.renderingStart = new Date, this.initialContainerDimensions = {
                width: e,
                height: t
            }, this.createLoadingScreen(), 0 <= navigator.userAgent.indexOf("Chrome") && (this.container().style.transformStyle = "preserve-3d"), this.createIframe(r.CDNStaticFilesUrl + "/chart-renderer/chartRendererIframe.html?environment=" + r.environment + "&version=" + r.version), this.createIframeElementListener(), this.createSelectedObjectsInput(), this.createHoldTokenInput()
        }, r.SeatingChart.prototype.createIframeElementListener = function () {
            var i = this;
            this.iframeElementListener = (new r.DOMElementListener).withElementFetcher(function () {
                return i.getIframe()
            }).onPositionInViewportChanged(function (e, t, n) {
                i.sendMsgToIframe({
                    type: "onPositionInViewportChanged",
                    positionInViewport: e,
                    viewportSize: {
                        width: t,
                        height: n
                    }
                })
            })
        }, r.SeatingChart.prototype.renderChart = function (e, t) {
            var n = this;
            this.isAllowedToRender().then(function () {
                n.fitsToWidth() && e ? n.sendMsgToIframe({
                    type: "render",
                    dimensions: {
                        width: e
                    }
                }) : n.fitsToWidthAndHeight() && e && t && n.sendMsgToIframe({
                    type: "render",
                    dimensions: {
                        width: e,
                        height: t
                    }
                })
            })
        }, r.SeatingChart.prototype.fitsToWidth = function () {
            return "width" === this.determineFitTo()
        }, r.SeatingChart.prototype.fitsToWidthAndHeight = function () {
            return "widthAndHeight" === this.determineFitTo()
        }, r.SeatingChart.prototype.determineFitTo = function () {
            return this.isFullScreen ? "widthAndHeight" : this.config.fitTo || (this.containerDivHasIllegalVisibleChildren() ? (this.warnOnce("ILLEGAL_ELEMENTS_IN_CONTAINER_DIV", "The chart container div contains illegal elements (which were not added by mercator). Chart will only respect the container div width, not the height."), "width") : this.initialContainerDimensions.width && this.initialContainerDimensions.height ? "widthAndHeight" : "width")
        }, r.SeatingChart.prototype.warnOnce = function (e, t) {
            this.sentWarnings.includes(e) || (this.sentWarnings.push(e), r.warn("[".concat(e, "] ").concat(t)))
        }, r.SeatingChart.prototype.configured = function () {
            this.renderChart(this.domElementListener.lastDimensions.width, this.domElementListener.lastDimensions.height)
        }, r.SeatingChart.prototype.rendered = function (e, t) {
            this.state = "RENDERED", this.resized(e, t), this.hideLoadingScreen(), this.iframeElementListener.start(), this.config.onChartRendered && this.config.onChartRendered(this), "function" == typeof window.callPhantom && window.callPhantom("chartRendered")
        }, r.SeatingChart.prototype.rerendered = function (e, t) {
            this.resized(e, t), this.config.onChartRerendered && this.config.onChartRerendered(this)
        }, r.SeatingChart.prototype.resized = function (e, t) {
            this.iframe.style.width = e + "px", this.iframe.style.height = t + "px"
        }, r.SeatingChart.prototype.createSelectedObjectsInput = function () {
            this.config.selectedObjectsInputName && (this.selectedObjectsInput = document.createElement("input"), this.selectedObjectsInput.type = "hidden", this.selectedObjectsInput.name = this.config.selectedObjectsInputName, this.container().appendChild(this.selectedObjectsInput))
        }, r.SeatingChart.prototype.removeSelectedObjectsInput = function () {
            this.selectedObjectsInput && (this.removeContainerChild(this.selectedObjectsInput), this.selectedObjectsInput = null)
        }, r.SeatingChart.prototype.createHoldTokenInput = function () {
            var e;
            this.config.holdTokenInputName && ((e = document.createElement("input")).type = "hidden", e.name = this.config.holdTokenInputName, this.container().appendChild(e), this.holdTokenInput = e)
        }, r.SeatingChart.prototype.removeHoldTokenInput = function () {
            this.holdTokenInput && (this.removeContainerChild(this.holdTokenInput), this.holdTokenInput = null)
        }, r.SeatingChart.prototype.updateSelectedObjectsInputValue = function () {
            this.selectedObjectsInput && (this.selectedObjectsInput.value = this.selectedObjects)
        }, r.SeatingChart.prototype.objectSelected = function (e) {
            this.selectedObjects.push(this.uuidOrLabel(e)), this.updateSelectedObjectsInputValue()
        }, r.SeatingChart.prototype.objectDeselected = function (e) {
            for (var t = 0; t < this.selectedObjects.length; ++t)
                if (this.uuidOrLabel(e) === this.selectedObjects[t]) {
                    this.selectedObjects.splice(t, 1);
                    break
                } this.updateSelectedObjectsInputValue()
        }, r.SeatingChart.prototype.setHoldToken = function (e) {
            var t = e.token;
            this.reservationToken = t, this.holdToken = t, this.storage.store("holdToken", t), this.config.onSessionInitialized && this.config.onSessionInitialized(e), this.holdTokenInput && (this.holdTokenInput.value = t)
        }, r.SeatingChart.prototype.fetchStoredHoldToken = function () {
            return this.storage.fetch("holdToken")
        }, r.SeatingChart.prototype.formatPrices = function (e) {
            var t = this,
                n = e.map(function (e) {
                    return Promise.resolve(t.config.priceFormatter(e))
                });
            return Promise.all(n).then(function (n) {
                var i = {};
                return e.forEach(function (e, t) {
                    i[e] = n[t]
                }), i
            })
        }, r.SeatingChart.prototype.uuidOrLabel = function (e) {
            return this.config.useObjectUuidsInsteadOfLabels ? e.uuid : e.label
        }, r.SeatingChart.prototype.onError = function (e, t, n, i) {
            i && this.sendErrorToDataCollector(e, t), n && this.onRenderingFailed(e)
        }, r.SeatingChart.prototype.sendErrorToDataCollector = function (e, t) {
            var n;
            this.errorSentToDataCollector || ((n = new XMLHttpRequest).open("POST", this.config.dataCollectorUrl + "/events"), n.setRequestHeader("Content-type", "application/json"), e = {
                eventType: "CHART_RENDERING_ERROR",
                publicKey: this.config.publicKey,
                metadata: {
                    events: this.config.events,
                    error: e,
                    browser: t
                },
                url: window.location.href
            }, n.send(JSON.stringify(e)), this.errorSentToDataCollector = !0)
        }, r.SeatingChart.prototype.onRenderingFailed = function (e) {
            this.state = "RENDERING_FAILED", this.hideLoadingScreen(), this.config.onChartRenderingFailed && this.config.onChartRenderingFailed(this, e)
        }, r.SeatingChart.prototype.clickConfirmationButton = function (e) {
            return this.asyncRequestAfterMercatorLoaded({
                type: "clickConfirmationButton"
            }, e)
        }, r.SeatingChart.prototype.selectBestAvailable = function (e) {
            return this.sendMsgToIframeWhenAvailable({
                type: "selectBestAvailable",
                bestAvailableConfig: e
            })
        }, r.SeatingChart.prototype.setUnavailableCategories = function (e) {
            return this.sendMsgToIframeWhenAvailable({
                type: "setUnavailableCategories",
                unavailableCategories: e
            })
        }, r.SeatingChart.prototype.setAvailableCategories = function (e) {
            return this.sendMsgToIframeWhenAvailable({
                type: "setAvailableCategories",
                ids: e
            })
        }, r.SeatingChart.prototype.setFilteredCategories = function (e) {
            return this.sendMsgToIframeWhenAvailable({
                type: "setFilteredCategories",
                ids: e
            })
        }, r.SeatingChart.prototype.zoomToFilteredCategories = function () {
            return this.sendMsgToIframeWhenAvailable({
                type: "zoomToFilteredCategories"
            })
        }, r.SeatingChart.prototype.changeConfig = function (e) {
            return this.sendMsgToIframeWhenAvailable({
                type: "changeConfig",
                config: r.SeatingChart.serializeConfig(e)
            })
        }, r.SeatingChart.prototype.clearSelection = function (e, t) {
            return this.asyncRequestAfterMercatorLoaded({
                type: "clearSelection"
            }, e, t)
        }, r.SeatingChart.prototype.resetView = function (e, t) {
            return this.asyncRequestAfterMercatorLoaded({
                type: "resetView"
            }, e, t)
        }, r.SeatingChart.prototype.startNewSession = function (e, t) {
            return this.asyncRequestAfterMercatorLoaded({
                type: "startNewSession"
            }, e, t)
        }, r.SeatingChart.prototype.findObject = function (e, t, n) {
            var i = this;
            return this.asyncRequestAfterMercatorLoaded({
                type: "findObject",
                objectUuidOrLabel: e
            }, t, n, function (e) {
                return i.objectFromJson(e)
            })
        }, r.SeatingChart.prototype.listCategories = function (e) {
            return this.asyncRequestAfterMercatorLoaded({
                type: "listCategories"
            }, e)
        }, r.SeatingChart.prototype.selectObjects = r.SeatingChart.prototype.selectSeats = function (e, t, n) {
            return this.asyncRequestAfterMercatorLoaded({
                type: "selectObjects",
                objectUuidsOrLabels: e
            }, t, n)
        }, r.SeatingChart.prototype.deselectObjects = r.SeatingChart.prototype.deselectSeats = function (e, t, n) {
            return this.asyncRequestAfterMercatorLoaded({
                type: "deselectObjects",
                objectUuidsOrLabels: e
            }, t, n)
        }, r.SeatingChart.prototype.selectCategories = function (e, t, n) {
            return this.asyncRequestAfterMercatorLoaded({
                type: "selectCategories",
                ids: e
            }, t, n)
        }, r.SeatingChart.prototype.deselectCategories = function (e, t, n) {
            return this.asyncRequestAfterMercatorLoaded({
                type: "deselectCategories",
                ids: e
            }, t, n)
        }, r.SeatingChart.prototype.highlightObjects = function (e) {
            return this.sendMsgToIframeWhenAvailable({
                type: "highlightObjects",
                objectUuidsOrLabels: e
            })
        }, r.SeatingChart.prototype.unhighlightObjects = function (e) {
            return this.sendMsgToIframeWhenAvailable({
                type: "unhighlightObjects",
                objectUuidsOrLabels: e
            })
        }, r.SeatingChart.prototype.pulse = function (e) {
            return this.sendMsgToIframeWhenAvailable({
                type: "pulseObjects",
                objectUuidsOrLabels: e
            })
        }, r.SeatingChart.prototype.unpulse = function (e) {
            return this.sendMsgToIframeWhenAvailable({
                type: "unpulseObjects",
                objectUuidsOrLabels: e
            })
        }, r.SeatingChart.prototype.zoomToSelectedObjects = function () {
            return this.sendMsgToIframeWhenAvailable({
                type: "zoomToSelectedObjects"
            })
        }, r.SeatingChart.prototype.zoomToSection = function (e) {
            return this.sendMsgToIframeWhenAvailable({
                type: "zoomToSection",
                label: e
            })
        }, r.SeatingChart.prototype.setFilteredSection = function (e) {
            return this.sendMsgToIframeWhenAvailable({
                type: "setFilteredSection",
                label: e
            })
        }, r.SeatingChart.prototype.clearFilteredSection = function () {
            return this.sendMsgToIframeWhenAvailable({
                type: "clearFilteredSection"
            })
        }, r.SeatingChart.prototype.listSelectedObjects = function (e) {
            var t = this;
            return this.asyncRequestAfterMercatorLoaded({
                type: "listSelectedObjects"
            }, e, void 0, function (e) {
                return e.map(function (e) {
                    return t.objectFromJson(e)
                })
            })
        }, r.SeatingChart.prototype.getReportBySelectability = function (e) {
            return this.asyncRequestAfterMercatorLoaded({
                type: "getReportBySelectability"
            }, e, void 0)
        }, r.SeatingChart.prototype._simulateUIEvent = function (e, t) {
            return this.asyncRequestAfterMercatorLoaded({
                type: "simulateUIEvent",
                eventType: e,
                parameters: t
            })
        }, r.SeatingChart.prototype.isometricView = function (e) {
            return this.asyncRequestAfterMercatorLoaded({
                type: "isometricView"
            }, e, void 0)
        }, r.SeatingChart.prototype.stageView = function (e) {
            return this.asyncRequestAfterMercatorLoaded({
                type: "stageView"
            }, e, void 0)
        }, r.SeatingChart.prototype.sendMsgToIframeWhenAvailable = function (e) {
            var t = this;
            return this.mercatorLoadedDeferred.then(function () {
                return t.isAllowedToRender()
            }).then(function () {
                return t.asyncRequest(e)
            })
        }, r.SeatingChart.prototype.asyncRequestAfterMercatorLoaded = function (e, t, n, i) {
            var o = this;
            return this.mercatorLoadedDeferred.then(function () {
                return o.asyncRequest(e, t, n, i)
            })
        }, r.SeatingChart.prototype.asyncRequest = function (e, i, o, r) {
            var s = this;
            return new Promise(function (t, n) {
                e.requestId = ++s.requestIdCtr, s.sendMsgToIframe(e) ? (s.requestCallbacks[s.requestIdCtr] = function (e) {
                    r && (e = r(e)), t(e), i && i(e)
                }, s.requestErrorCallbacks[s.requestIdCtr] = function (e) {
                    n(e), o && o(e)
                }) : n()
            })
        }, r.SeatingChart.prototype.asyncCallSuccess = function (e, t) {
            this.requestCallbacks[e] && (this.requestCallbacks[e](t), this.requestCallbacks[e] = void 0)
        }, r.SeatingChart.prototype.asyncCallError = function (e, t) {
            this.requestErrorCallbacks[e] && (this.requestErrorCallbacks[e](t), this.requestErrorCallbacks[e] = void 0)
        }, r.SeatingChart.serializeConfig = function (e) {
            return e.tooltipText && (e.customTooltipText = !0), e.tooltipInfo && (e.customTooltipInfo = !0), e.onBestAvailableSelected && (e.onBestAvailableSelectedCallbackImplemented = !0), e.onBestAvailableSelectionFailed && (e.onBestAvailableSelectionFailedCallbackImplemented = !0), e.onFloorChanged && (e.onFloorChangedCallbackImplemented = !0), e.objectColor && (e.objectColor = e.objectColor.toString()), e.sectionColor && (e.sectionColor = e.sectionColor.toString()), e.objectLabel && (e.objectLabel = e.objectLabel.toString()), e.objectIcon && (e.objectIcon = e.objectIcon.toString()), e.priceFormatter && (e.priceFormatterUsed = !0), e.isObjectSelectable && (e.isObjectSelectable = e.isObjectSelectable.toString()), e.canGASelectionBeIncreased && (e.canGASelectionBeIncreased = e.canGASelectionBeIncreased.toString()), e.isObjectVisible && (e.isObjectVisible = e.isObjectVisible.toString()), e.objectCategory && (e.objectCategory = e.objectCategory.toString()), e.onObjectStatusChanged && (e.onObjectStatusChangedCallbackImplemented = !0), e.tooltipContents && (e.customTooltipContents = !0), r.Embeddable.removeUnserializableFieldsFromConfig(e)
        }, r.SeatingChart.prototype.objectFromJson = function (t) {
            var n = this;
            return "section" !== t.objectType && (t.select = function (e) {
                return n.selectObjects([{
                    label: n.uuidOrLabel(t),
                    ticketType: e
                }])
            }, t.deselect = function (e) {
                return n.deselectObjects([{
                    label: n.uuidOrLabel(t),
                    ticketType: e
                }])
            }, t.highlight = function () {
                return n.highlightObjects([n.uuidOrLabel(t)])
            }, t.unhighlight = function () {
                return n.unhighlightObjects([n.uuidOrLabel(t)])
            }, t.pulse = function () {
                return n.pulse([n.uuidOrLabel(t)])
            }, t.unpulse = function () {
                return n.unpulse([n.uuidOrLabel(t)])
            }, t.isInChannel = function (e) {
                return t.hashedChannelKey ? r.sha1(e) === t.hashedChannelKey : "NO_CHANNEL" === e
            }, t.seatId = t.id), t.chart = this, t
        }, r.SeatingChart.prototype.objectsFromJson = function (e) {
            var t = this;
            return e.map(function (e) {
                return t.objectFromJson(e)
            })
        }, r.SeatingChart.prototype.rerender = function () {
            this.config.onChartRerenderingStarted && this.config.onChartRerenderingStarted(this), this.unrender(), this.render()
        }, r.SeatingChart.prototype.openFullScreen = function (e) {
            new r.FullScreenManager(this).open(e)
        }, r.SeatingChart.prototype.closeFullScreen = function () {
            new r.FullScreenManager(this).close()
        }, r.SeatingChart.prototype.containerDivHasIllegalVisibleChildren = function () {
            var t = this;
            return 0 < Array.prototype.slice.call(this.container().children).filter(function (e) {
                return e !== t.iframe
            }).filter(function (e) {
                return e !== t.loadingScreen
            }).filter(function (e) {
                return 0 < e.offsetHeight
            }).length
        }, r.SeatingChart.prototype.messageHandlers = {
            mercatorCharge: function (e, t, n) {
                t.mercatorLoadedDeferred.resolve();
                var i = r.SeatingChart.serializeConfig(t.config),
                    o = {
                        renderingStartMillis: t.renderingStart.getTime(),
                        hostPageUrl: window.location.href,
                        hostPageDomain: window.location.hostname,
                        isInsideIframe: window !== window.parent,
                        storedHoldToken: t.fetchStoredHoldToken(),
                        isFirstChartOnPage: r.isFirstChartOnPage,
                        useNewMercatorDesign: r.SeatingChart.shouldUseNewDesign()
                    };
                t.sendMsgToIframe({
                    type: "configure",
                    configuration: i,
                    renderingInfo: o
                })
            },
            onError: function (e, t, n) {
                t.onError(n.message, n.browser, n.renderingFailed, n.logError)
            },
            configured: function (e, t, n) {
                t.configured()
            },
            onChartRendered: function (e, t, n) {
                t.rendered(n.width, n.height)
            },
            onChartRerendered: function (e, t, n) {
                t.rerendered(n.width, n.height)
            },
            onOrphanSeatsChanged: function (e, t, n) {
                t.config.onOrphanSeatsChanged && t.config.onOrphanSeatsChanged(n.orphans, n.action)
            },
            onSelectionValid: function (e, t, n) {
                t.config.onSelectionValid && t.config.onSelectionValid()
            },
            onSelectionInvalid: function (e, t, n) {
                t.config.onSelectionInvalid && t.config.onSelectionInvalid(n.violations)
            },
            bookableObjectEvent: function (e, t, n) {
                var i = t.objectFromJson(n.object);
                "onObjectSelected" === n.subtype ? t.objectSelected(i, n.priceLevel) : "onObjectDeselected" === n.subtype && t.objectDeselected(i, n.priceLevel), t.config[n.subtype] && t.config[n.subtype](i, n.priceLevel)
            },
            holdTokenChanged: function (e, t, n) {
                t.setHoldToken(n.token)
            },
            tooltipTextRequested: function (e, t, n) {
                Promise.resolve(t.config.tooltipText(t.objectFromJson(n.object))).then(function (e) {
                    return t.sendMsgToIframe({
                        type: "tooltipTextGenerated",
                        text: e
                    })
                })
            },
            tooltipInfoRequested: function (e, t, n) {
                Promise.resolve(t.config.tooltipInfo(t.objectFromJson(n.object))).then(function (e) {
                    return t.sendMsgToIframe({
                        type: "tooltipInfoGenerated",
                        text: e
                    })
                })
            },
            tooltipContentsForEventManagerRequested: function (e, t, n) {
                Promise.resolve(t.config.tooltipContents(t.objectFromJson(n.object))).then(function (e) {
                    return t.sendMsgToIframe({
                        type: "tooltipContentsForEventManagerGenerated",
                        text: e
                    })
                })
            },
            tooltipInfoForEventManagerRequested: function (e, t, n) {
                Promise.resolve(t.config.tooltipInfo(t.objectFromJson(n.object))).then(function (e) {
                    return t.sendMsgToIframe({
                        type: "tooltipInfoForEventManagerGenerated",
                        text: e
                    })
                })
            },
            onBestAvailableSelected: function (e, t, n) {
                t.config.onBestAvailableSelected && t.config.onBestAvailableSelected(t.objectsFromJson(n.result.objects), n.result.nextToEachOther)
            },
            onBestAvailableSelectionFailed: function (e, t, n) {
                t.config.onBestAvailableSelectionFailed && t.config.onBestAvailableSelectionFailed()
            },
            onFloorChanged: function (e, t, n) {
                t.config.onFloorChanged && t.config.onFloorChanged(n.floor)
            },
            onHoldTokenExpired: function (e, t, n) {
                t.config.onHoldTokenExpired && t.config.onHoldTokenExpired()
            },
            onHoldSucceeded: function (e, t, n) {
                t.config.onHoldSucceeded && t.config.onHoldSucceeded(t.objectsFromJson(n.objects), n.priceLevels)
            },
            onHoldFailed: function (e, t, n) {
                t.config.onHoldFailed && t.config.onHoldFailed(t.objectsFromJson(n.objects), n.priceLevels)
            },
            onReleaseHoldSucceeded: function (e, t, n) {
                t.config.onReleaseHoldSucceeded && t.config.onReleaseHoldSucceeded(t.objectsFromJson(n.objects), n.priceLevels)
            },
            onReleaseHoldFailed: function (e, t, n) {
                t.config.onReleaseHoldFailed && t.config.onReleaseHoldFailed(t.objectsFromJson(n.objects), n.priceLevels)
            },
            onFilteredCategoriesChanged: function (e, t, n) {
                t.config.onFilteredCategoriesChanged && t.config.onFilteredCategoriesChanged(n.filteredCategories)
            },
            priceFormattingRequested: function (e, t, n) {
                t.formatPrices(n.prices).then(function (e) {
                    return t.sendMsgToIframe({
                        type: "pricesFormatted",
                        formattedPrices: e
                    })
                })
            },
            openFullScreen: function (e, t, n) {
                t.openFullScreen(n.darkColorScheme)
            },
            closeFullScreen: function (e, t) {
                t.closeFullScreen()
            },
            asyncCallSuccess: function (e, t, n) {
                t.asyncCallSuccess(n.requestId, n.data)
            },
            asyncCallError: function (e, t, n) {
                t.asyncCallError(n.requestId, n.msg)
            },
            onSubmitSucceeded: function (e, t) {
                t.config.onSubmitSucceeded && t.config.onSubmitSucceeded()
            },
            onSubmitFailed: function (e, t) {
                t.config.onSubmitFailed && t.config.onSubmitFailed()
            },
            onFilteredSectionChange: function (e, t, n) {
                t.config.onFilteredSectionChange && t.config.onFilteredSectionChange(n.sections)
            },
            rerender: function (e, t) {
                t.rerender()
            }
        }, r.EventManager = function () {
            _inherits(o, r.SeatingChart);
            var i = _createSuper(o);

            function o(e) {
                _classCallCheck(this, o);
                var t, n = ["static", "manageForSaleConfig", "manageObjectStatuses", "manageTableBooking", "manageChannels", "manageCategories", "filterSections", "select"];
                if (n.includes(e.mode)) return (t = i.call(this, e, "EventManager")).enableHighlight = ["select", "static"].includes(e.mode), t;
                throw new Error("Please pass in one of the allowed modes: ".concat(n.join(", ")))
            }
            return _createClass(o, [{
                key: "setHighlightedObjects",
                value: function (e) {
                    if (this.enableHighlight) return this.sendMsgToIframeWhenAvailable({
                        type: "setHighlightedObjects",
                        objectUuidsOrLabels: e
                    })
                }
            }, {
                key: "clearHighlightedObjects",
                value: function () {
                    if (this.enableHighlight) return this.sendMsgToIframeWhenAvailable({
                        type: "clearHighlightedObjects"
                    })
                }
            }]), o
        }(), r.ChartManager = function () {
            _inherits(i, r.SeatingChart);
            var n = _createSuper(i);

            function i(e) {
                _classCallCheck(this, i);
                var t = ["manageRulesets"];
                if (t.includes(e.mode)) return n.call(this, e, "ChartManager");
                throw new Error("Please pass in one of the allowed modes: ".concat(t.join(", ")))
            }
            return _createClass(i)
        }(), r.SeatingChart.shouldUseNewDesign = function () {
            return "true" === new URLSearchParams(window.location.search).get("useNewMercatorDesign")
        }, r.SeatingChart.MAX_SIZE = 4096, r.SeatingChartConfigValidator = function () { }, r.SeatingChartConfigValidator.prototype.validate = function (e) {
            e.fitTo && "width" !== e.fitTo && "widthAndHeight" !== e.fitTo && r.SeatingChartConfigValidator.error("fitTo should be either width or widthAndHeight")
        }, r.SeatingChartConfigValidator.error = function (e) {
            throw new Error("Invalid mercator config: " + e)
        }, r.DrawMercator = function (e) {
            r.charts.push(this), e.loading = '<div id="designerLoader"></div>', this.init(e), this.isRendered = !1, this.isDestroyed = !1, this.storage = r.MercatorStorage.create(function () {
                return localStorage
            }, "mercator-designer", "Local storage not supported; settings (e.g. whether to show the designer tutorial) will be lost after page refresh")
        }, r.DrawMercator.prototype = new r.Embeddable, r.DrawMercator.prototype.render = function (e) {
            if (this.isDestroyed) throw new Error("Cannot render a chart that has been destroyed");
            return this.validateElementExists(), this.renderedCallback = e, this.createLoadingScreen(), this.createIframe(this.iframeUrl()), this.iframe.scrolling = "yes", this
        }, r.DrawMercator.prototype.validateElementExists = function () {
            (new r.SeatingChartDesignerConfigValidator).validate(this.config), (new r.EmbeddableConfigValidator).validate(this.config)
        }, r.DrawMercator.prototype.createLoadingIndicator = function () {
            var e = document.createElement("div");
            return e.id = "designerLoader", e
        }, r.DrawMercator.prototype.iframeUrl = function () {
            return r.CDNStaticFilesUrl + "/assets/mercator/frame.html"
        }, r.DrawMercator.prototype.rerender = function () {
            this.isRendered = !1, this.iframe.remove(), this.render()
        }, r.DrawMercator.prototype.serializeConfig = function () {
            var e = r.Embeddable.removeUnserializableFieldsFromConfig(this.config),
                e = JSON.parse(JSON.stringify(e));
            return this.config.onExitRequested && (e.showExitButton = !0), e
        }, r.DrawMercator.prototype.messageHandlers = {
            mercatorCharge: function (e, t) {
                t.sendMsgToIframe({
                    type: "render",
                    configuration: t.serializeConfig(),
                    apiUrl: r.apiUrl,
                    publicApiUrl: r.publicApiUrl,
                    dataCollectorUrl: r.dataCollectorUrl,
                    localSettings: t.storage.getStore()
                })
            },
            mercatorRendered: function (e, t) {
                t.container().removeChild(t.loadingScreen), t.renderedCallback && t.renderedCallback(), t.config.onDesignerRendered && t.config.onDesignerRendered(this), t.isRendered = !0
            },
            designerRenderingFailed: function (e, t) {
                t.container().removeChild(t.loadingScreen), t.config.onDesignerRenderingFailed && t.config.onDesignerRenderingFailed(t)
            },
            chartCreated: function (e, t, n) {
                t.config.chartKey = n.data, t.config.onChartCreated && t.config.onChartCreated(n.data)
            },
            chartUpdated: function (e, t) {
                t.config.onChartUpdated && t.config.onChartUpdated(t.config.chartKey)
            },
            chartPublished: function (e, t) {
                t.config.onChartPublished && t.config.onChartPublished(t.config.chartKey)
            },
            statusChanged: function (e, t, n) {
                t.config.onStatusChanged && (n = n.data, t.config.onStatusChanged(n, t.config.chartKey))
            },
            exitRequested: function (e, t) {
                t.config.onExitRequested()
            },
            localSettingChanged: function (e, t, n) {
                t.storage.store(n.data.key, n.data.value)
            }
        }, r.DrawMercator.prototype.destroy = function () {
            if (this.isDestroyed) throw new Error("Cannot destroy a chart that has already been destroyed");
            this.removeIframe(), r.removeFromArray(this, r.charts), this.isRendered = !1, this.isDestroyed = !0
        }, r.MercatorDummyStorage = function () {
            function e() {
                _classCallCheck(this, e)
            }
            return _createClass(e, [{
                key: "fetch",
                value: function (e) { }
            }, {
                key: "store",
                value: function (e, t) { }
            }]), e
        }(), r.MercatorStorage = function () {
            function n(e, t) {
                _classCallCheck(this, n), this.storageProvider = e, this.key = t
            }
            return _createClass(n, [{
                key: "fetch",
                value: function (e) {
                    return this.getStore()[e]
                }
            }, {
                key: "store",
                value: function (e, t) {
                    var n;
                    (n = this.getStore())[e] = t, this.setStore(n)
                }
            }, {
                key: "getStore",
                value: function () {
                    var e = this.storageProvider().getItem(this.key);
                    return e ? JSON.parse(e) : {}
                }
            }, {
                key: "setStore",
                value: function (e) {
                    this.storageProvider().setItem(this.key, JSON.stringify(e))
                }
            }], [{
                key: "isSupported",
                value: function (e) {
                    try {
                        return e().setItem("mercatorStorageSupportedTest", "x"), e().removeItem("mercatorStorageSupportedTest"), !0
                    } catch (e) {
                        return !1
                    }
                }
            }, {
                key: "create",
                value: function (e, t, n) {
                    return r.MercatorStorage.isSupported(e) ? new r.MercatorStorage(e, t) : (r.warn(n), new r.MercatorDummyStorage)
                }
            }]), n
        }();

        function h(e, t) {
            var s, a, n = document.getElementsByTagName("script");
            return s = e, a = n, t.some(function (e) {
                for (var t = s, n = e, i = a, o = 0; o < i.length; ++o) {
                    var r = i[o].src;
                    if (r && (-1 !== r.toLowerCase().indexOf(n) && -1 !== r.indexOf(t))) return !0
                }
                return !1
            })
        }

        function d(e) {
            this.val = e
        }

        function u(e) {
            return new d(e)
        }

        function f(e) {
            for (var t = 0; t < r.charts.length; ++t) r.charts[t].handleKey(e)
        }

        function g() {
            var n = this;
            this.promise = new Promise(function (e, t) {
                n.reject = t, n.resolve = e
            })
        }
        r.sha1 = function () {
            function e(t) {
                return function (e) {
                    return new o(!0).update(e)[t]()
                }
            }
            var r = "0123456789abcdef".split(""),
                n = [-2147483648, 8388608, 32768, 128],
                a = [24, 16, 8, 0],
                t = ["hex"],
                i = [];

            function o(e) {
                e ? (i[0] = i[16] = i[1] = i[2] = i[3] = i[4] = i[5] = i[6] = i[7] = i[8] = i[9] = i[10] = i[11] = i[12] = i[13] = i[14] = i[15] = 0, this.blocks = i) : this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.h0 = 1732584193, this.h1 = 4023233417, this.h2 = 2562383102, this.h3 = 271733878, this.h4 = 3285377520, this.block = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1, this.first = !0
            }
            o.prototype.update = function (e) {
                if (!this.finalized) {
                    for (var t, n, i = "string" != typeof e, o = 0, r = (e = i && e.constructor === window.ArrayBuffer ? new Uint8Array(e) : e).length || 0, s = this.blocks; o < r;) {
                        if (this.hashed && (this.hashed = !1, s[0] = this.block, s[16] = s[1] = s[2] = s[3] = s[4] = s[5] = s[6] = s[7] = s[8] = s[9] = s[10] = s[11] = s[12] = s[13] = s[14] = s[15] = 0), i)
                            for (n = this.start; o < r && n < 64; ++o) s[n >> 2] |= e[o] << a[3 & n++];
                        else
                            for (n = this.start; o < r && n < 64; ++o)(t = e.charCodeAt(o)) < 128 ? s[n >> 2] |= t << a[3 & n++] : (t < 2048 ? s[n >> 2] |= (192 | t >> 6) << a[3 & n++] : (t < 55296 || 57344 <= t ? s[n >> 2] |= (224 | t >> 12) << a[3 & n++] : (t = 65536 + ((1023 & t) << 10 | 1023 & e.charCodeAt(++o)), s[n >> 2] |= (240 | t >> 18) << a[3 & n++], s[n >> 2] |= (128 | t >> 12 & 63) << a[3 & n++]), s[n >> 2] |= (128 | t >> 6 & 63) << a[3 & n++]), s[n >> 2] |= (128 | 63 & t) << a[3 & n++]);
                        this.lastByteIndex = n, this.bytes += n - this.start, 64 <= n ? (this.block = s[16], this.start = n - 64, this.hash(), this.hashed = !0) : this.start = n
                    }
                    return 4294967295 < this.bytes && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes = this.bytes % 4294967296), this
                }
            }, o.prototype.finalize = function () {
                var e, t;
                this.finalized || (this.finalized = !0, e = this.blocks, t = this.lastByteIndex, e[16] = this.block, e[t >> 2] |= n[3 & t], this.block = e[16], 56 <= t && (this.hashed || this.hash(), e[0] = this.block, e[16] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = 0), e[14] = this.hBytes << 3 | this.bytes >>> 29, e[15] = this.bytes << 3, this.hash())
            }, o.prototype.hash = function () {
                for (var e, t = this.h0, n = this.h1, i = this.h2, o = this.h3, r = this.h4, s = this.blocks, a = 16; a < 80; ++a) e = s[a - 3] ^ s[a - 8] ^ s[a - 14] ^ s[a - 16], s[a] = e << 1 | e >>> 31;
                for (a = 0; a < 20; a += 5) t = (e = (n = (e = (i = (e = (o = (e = (r = (e = t << 5 | t >>> 27) + (n & i | ~n & o) + r + 1518500249 + s[a] << 0) << 5 | r >>> 27) + (t & (n = n << 30 | n >>> 2) | ~t & i) + o + 1518500249 + s[a + 1] << 0) << 5 | o >>> 27) + (r & (t = t << 30 | t >>> 2) | ~r & n) + i + 1518500249 + s[a + 2] << 0) << 5 | i >>> 27) + (o & (r = r << 30 | r >>> 2) | ~o & t) + n + 1518500249 + s[a + 3] << 0) << 5 | n >>> 27) + (i & (o = o << 30 | o >>> 2) | ~i & r) + t + 1518500249 + s[a + 4] << 0, i = i << 30 | i >>> 2;
                for (; a < 40; a += 5) t = (e = (n = (e = (i = (e = (o = (e = (r = (e = t << 5 | t >>> 27) + (n ^ i ^ o) + r + 1859775393 + s[a] << 0) << 5 | r >>> 27) + (t ^ (n = n << 30 | n >>> 2) ^ i) + o + 1859775393 + s[a + 1] << 0) << 5 | o >>> 27) + (r ^ (t = t << 30 | t >>> 2) ^ n) + i + 1859775393 + s[a + 2] << 0) << 5 | i >>> 27) + (o ^ (r = r << 30 | r >>> 2) ^ t) + n + 1859775393 + s[a + 3] << 0) << 5 | n >>> 27) + (i ^ (o = o << 30 | o >>> 2) ^ r) + t + 1859775393 + s[a + 4] << 0, i = i << 30 | i >>> 2;
                for (; a < 60; a += 5) t = (e = (n = (e = (i = (e = (o = (e = (r = (e = t << 5 | t >>> 27) + (n & i | n & o | i & o) + r - 1894007588 + s[a] << 0) << 5 | r >>> 27) + (t & (n = n << 30 | n >>> 2) | t & i | n & i) + o - 1894007588 + s[a + 1] << 0) << 5 | o >>> 27) + (r & (t = t << 30 | t >>> 2) | r & n | t & n) + i - 1894007588 + s[a + 2] << 0) << 5 | i >>> 27) + (o & (r = r << 30 | r >>> 2) | o & t | r & t) + n - 1894007588 + s[a + 3] << 0) << 5 | n >>> 27) + (i & (o = o << 30 | o >>> 2) | i & r | o & r) + t - 1894007588 + s[a + 4] << 0, i = i << 30 | i >>> 2;
                for (; a < 80; a += 5) t = (e = (n = (e = (i = (e = (o = (e = (r = (e = t << 5 | t >>> 27) + (n ^ i ^ o) + r - 899497514 + s[a] << 0) << 5 | r >>> 27) + (t ^ (n = n << 30 | n >>> 2) ^ i) + o - 899497514 + s[a + 1] << 0) << 5 | o >>> 27) + (r ^ (t = t << 30 | t >>> 2) ^ n) + i - 899497514 + s[a + 2] << 0) << 5 | i >>> 27) + (o ^ (r = r << 30 | r >>> 2) ^ t) + n - 899497514 + s[a + 3] << 0) << 5 | n >>> 27) + (i ^ (o = o << 30 | o >>> 2) ^ r) + t - 899497514 + s[a + 4] << 0, i = i << 30 | i >>> 2;
                this.h0 = this.h0 + t << 0, this.h1 = this.h1 + n << 0, this.h2 = this.h2 + i << 0, this.h3 = this.h3 + o << 0, this.h4 = this.h4 + r << 0
            }, o.prototype.toString = o.prototype.hex = function () {
                this.finalize();
                var e = this.h0,
                    t = this.h1,
                    n = this.h2,
                    i = this.h3,
                    o = this.h4;
                return r[e >> 28 & 15] + r[e >> 24 & 15] + r[e >> 20 & 15] + r[e >> 16 & 15] + r[e >> 12 & 15] + r[e >> 8 & 15] + r[e >> 4 & 15] + r[15 & e] + r[t >> 28 & 15] + r[t >> 24 & 15] + r[t >> 20 & 15] + r[t >> 16 & 15] + r[t >> 12 & 15] + r[t >> 8 & 15] + r[t >> 4 & 15] + r[15 & t] + r[n >> 28 & 15] + r[n >> 24 & 15] + r[n >> 20 & 15] + r[n >> 16 & 15] + r[n >> 12 & 15] + r[n >> 8 & 15] + r[n >> 4 & 15] + r[15 & n] + r[i >> 28 & 15] + r[i >> 24 & 15] + r[i >> 20 & 15] + r[i >> 16 & 15] + r[i >> 12 & 15] + r[i >> 8 & 15] + r[i >> 4 & 15] + r[15 & i] + r[o >> 28 & 15] + r[o >> 24 & 15] + r[o >> 20 & 15] + r[o >> 16 & 15] + r[o >> 12 & 15] + r[o >> 8 & 15] + r[o >> 4 & 15] + r[15 & o]
            };
            var s = e("hex");
            s.create = function () {
                return new o
            }, s.update = function (e) {
                return s.create().update(e)
            };
            for (var l = 0; l < t.length; ++l) {
                var c = t[l];
                s[c] = e(c)
            }
            return s
        }(), r.removeFromArray = function (e, t) {
            e = t.indexOf(e); - 1 < e && t.splice(e, 1)
        }, d.prototype.orElse = function (e) {
            return void 0 === this.val || null == this.val ? e : this.val
        }, r.warn = function (e) {
            "undefined" != typeof console && console.warn(e)
        }, r.error = function (e) {
            "undefined" != typeof console && console.error(e)
        }, r.MAX_Z_INDEX = 2147483647, g.prototype.then = function (e) {
            return this.promise.then(e)
        };
        var p = 0 <= navigator.userAgent.indexOf("Firefox");
        l("message", function (e) {
            var t, n = r.getChart(e.source);
            n && (t = JSON.parse(e.data), n.messageHandlers[t.type] && n.messageHandlers[t.type](e, n, t))
        }), l("keydown", f), l("keyup", f), "function" == typeof define && "object" === _typeof(define.amd) && define.amd ? define([], function () {
            return r
        }) : window.mercator = r
    }();