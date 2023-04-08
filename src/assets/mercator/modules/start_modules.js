
mercator.set = function (...t) {
    return pushAll(new SvgElementSet, t)
}, Array.prototype.flatMap = function (t) {
    return Array.prototype.concat.apply([], this.map(t))
}, Array.prototype.findOne = function (t) {
    for (var e = 0; e < this.length; ++e)
        if (t(this[e])) return this[e]
}, Array.prototype.nonFalsies = function () {
    return this.filter(function (t) {
        return t
    })
}, Array.prototype.peek = function () {
    return this[this.length - 1]
}, Array.prototype.first = function () {
    return this[0]
}, Array.prototype.onlyElementOr = function (t, e) {
    return 1 === this.length ? e ? e(this[0]) : this[0] : t
}, Array.prototype.onlyElementIs = function (t) {
    return 1 === this.length && this[0] === t
}, Array.prototype.last = Array.prototype.peek, Array.prototype.beforeLast = function () {
    return this[this.length - 2]
}, Array.prototype.middle = function () {
    if (0 !== this.length) return this[Math.floor(this.length / 2)]
}, Array.prototype.remove = function (t) {
    var e = this.indexOf(t);
    return e >= 0 && this.splice(e, 1), this
}, Array.prototype.uniques = function () {
    return this.reduce((t, e) => (t.indexOf(e) < 0 && t.push(e), t), [])
}, Array.prototype.contains = function (t) {
    return -1 !== this.indexOf(t)
}, Array.prototype.toSet = function () {
    var t = mercator.set();
    return pushAll(t, this), t
}, jQuery.fn.selectText = function () {
    var t, e = document,
        n = this[0];
    if (e.body.createTextRange) (t = document.body.createTextRange()).moveToElementText(n), t.select();
    else if (window.getSelection) {
        var r = window.getSelection();
        (t = document.createRange()).selectNodeContents(n), r.removeAllRanges(), r.addRange(t)
    }
    return this
}, jQuery.fn.isFullInViewport = function () {
    var t = this.get(0),
        e = $(window).width(),
        n = $(window).height();
    if ("function" == typeof t.getBoundingClientRect) {
        var r = t.getBoundingClientRect(),
            o = r.top >= 0 && r.top < n,
            i = r.bottom >= 0 && r.bottom <= n,
            s = r.left >= 0 && r.left < e,
            a = r.right >= 0 && r.right <= e;
        return o && i && s && a
    }
    var u = $(window).scrollTop(),
        c = u + n,
        l = $(window).scrollLeft(),
        f = l + e,
        h = this.offset().top,
        p = h + this.height(),
        d = this.offset().left,
        y = d + this.width();
    return p <= c && h >= u && y <= f && d >= l
}, jQuery.fn.disable = function (t) {
    return this.each(function () {
        this.disabled = t
    })
}, mercator.randomUuid = function () {
    function t() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
    }
    return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
}, seatsUnicodeCache = {};
const roundTo = (t, e = 0) => {
    const n = Math.pow(10, e || 0);
    return Math.round(t * n) / n
},
    roundTo2Places = t => Math.round(100 * t) / 100,
    rad = t => t % 360 * Math.PI / 180,
    snapTo = (t, e) => {
        return e - e % t
    },
    angle = (t, e, n, r, o, i) => {
        if (null == o) {
            const o = t - n,
                i = e - r;
            return o || i ? (180 + 180 * Math.atan2(-i, -o) / Math.PI + 360) % 360 : 0
        }
        return angle(t, e, o, i) - angle(n, r, o, i)
    },
    orderPointsPerceptually = t => {
        const e = getEndPoints(t)[0];
        return e ? (e => t.concat().sort((t, n) => e.distanceToPoint(t) - e.distanceToPoint(n)))(e) : t
    },
    getEndPoints = t => {
        if (t.length < 3) return t;
        const e = e => {
            return (e => t.concat().sort((t, n) => e.distanceToPoint(t) - e.distanceToPoint(n)))(e).slice(1, 3)
        };
        return t.filter(t => {
            const n = e(t),
                [r, o] = n.map(e => t.distanceToPoint(e));
            return r / o < .65
        })
    };
mercator.isMac = window.navigator.platform.toUpperCase().indexOf("MAC") >= 0, mercator.isChrome = navigator.userAgent.indexOf("Chrome") >= 0, mercator.isSafari = navigator.userAgent.indexOf("Safari") >= 0 && !mercator.isChrome;
console.log(mercator);
mercator.SeatsioStorage = class {
    constructor(o, t) {
        this.data = {
            ...this.legacyData(),
            ...t
        }, this.designer = o
    }
    getItem(o, t) {
        let e = this.data[o];
        return void 0 === e ? t : e
    }
    setItem(o, t) {
        this.data[o] = t, this.designer.onLocalSettingChanged({
            key: o,
            value: t
        })
    }
    legacyData() {
        try {
            let o = {
                "v2.timesSeenToolPickerTooltips": this.fromLocalStorage("v2.timesSeenToolPickerTooltips"),
                clipboard: this.fromLocalStorage("clipboard"),
                "v2.firstTimeTutorialDone": this.fromLocalStorage("v2.firstTimeTutorialDone"),
                snapToGridEnabled: this.fromLocalStorage("snapToGridEnabled"),
                viewFromSeatsShown: this.fromLocalStorage("viewFromSeatsShown"),
                labelsShown: this.fromLocalStorage("labelsShown"),
                rowLabelsShown: this.fromLocalStorage("rowLabelsShown"),
                showSectionContents: this.fromLocalStorage("showSectionContents")
            };
            return _.pickBy(o, o => null !== o)
        } catch (o) {
            return {}
        }
    }
    fromLocalStorage(o) {
        return JSON.parse(localStorage.getItem(o))
    }
};

mercator.ChartDesigner = function (t, e, s, i, o, a, r, n, h, c, l, u, p, C, g, d, b, S, y, f, w, D) {
    this.chartLoaded = !1, this.containerId = t, this.chartKey = e, this.openDraftDrawing = s, this.openLatestDrawing = f, this.v2Client = new mercator.V2Client(r, a), this.publicApiUrl = n, this.dataCollectorUrl = h, this.secretKey = i, this.workspaceKey = a, this.onChartCreated = C, this.onChartUpdated = g, this.onChartPublished = d, this.onExitRequested = S, this.onLocalSettingChanged = y, this.onStatusChanged = b, this.featureConfig = new mercator.FeatureConfig(l), this.messages = new mercator.Messages(u).replacePlaceholders($("#chartForm")).exposeOnGlobalScope(), this.canvasColorScheme = D, this.mode = p, this.width = mercator.ChartDesigner.SIZE, this.height = mercator.ChartDesigner.SIZE, this.paper = Raphael(this.containerId, this.width, this.height), this.svg = SVG("#" + this.containerId + " svg"), this.drawer = new Drawer(this), this.shiftWasPressed = !1, this.ctrlWasPressed = !1, this.altWasPressed = !1, this.spacebarIsPressed = !1, this.enableCanvasGrabber = !1, this.rightMouseButton = !1, this.debug = !1, this.mouseDown = null, this.mustNextCanvasClickBeIgnored = null, this.canvasCenter = new mercator.Point(this.width / 2, this.height / 2), this.labelsShown = !1, this.rowLabelsShown = !0, this.loadingFromJson = !1, this.state = null, this.status = null, this.setupCanvasEventHandlers(), this.applyBaseColor(c), this.savedZoomAndPan = null, this.ignoredLabelEditingWarnings = new Set, this.hotkeyUsageLogger = null, this.shouldShowLegacySocialDistancingCheckbox = !1, this.storage = new mercator.SeatsioStorage(this, w), this.lastGroupTool = {
        row: "single",
        section: "polygon",
        ga: "rectangle",
        shape: "rectangle",
        table: "round"
    }, this.toolProperties = {
        "Booth.width": mercator.Booth.defaultWidth,
        "Booth.height": mercator.Booth.defaultHeight,
        "Icon.size": mercator.Icon.defaultIconSize,
        "Icon.icon": mercator.Icon.defaultIcon,
        "RectTable.width": mercator.RectTable.defaultWidth,
        "RectTable.height": mercator.RectTable.defaultHeight,
        "RectTable.chairs": Object.assign({}, mercator.RectTable.defaultDistribution),
        "RoundTable.chairs": mercator.RoundTable.defaultNumberOfChairs,
        "RowDrawing.rowBlockStyle": "normal"
    }, this.subChartStats = {}, this.globalStats = {}, this.selectedObjectsUuid = [], this.showAllTools = !1, this.designerAppState = {
        firstTimeTutorialDone: this.storage.getItem("v2.firstTimeTutorialDone")
    }, this.overlayMessages = {}, this.busyIndicators = [], this.abTest = Math.random() > .5, this.uiEvents = new mercator.UIEvents(this), this.imageUploader = new mercator.ImageUploader(this), this.keyboard = new mercator.Keyboard(this), this.clipboard = new mercator.Clipboard(this), mercator.designer = this, this.layers = new mercator.Layers(this).createLayer("backgroundFillLayer").createLayer("abstractFloorsLayer").createLayer("backgroundLayer").createLayer("shapesBackgroundLayer").createLayer("sectionsLayer").createLayer("overlayBackgroundLayer").createLayer("sectionContentsLayer").createLayer("objectsLayer").createLayer("textsLayer").createLayer("foregroundLayer").createLayer("shapesForegroundLayer").createLayer("aboveAllBackgroundLayer").createLayer("tempDrawingsLayer").createLayer("selectionRectanglesLayer").createLayer("transformationHandlesLayer").createLayer("nodesLayer").createLayer("overlayIconsLayer").createLayer("guides"), this.zoomer = new mercator.Zoomer(this.onZoom.bind(this)), this.panner = new mercator.Panner, this.chairMousePointer = new mercator.ChairMousePointer(this).init(), this.selector = new mercator.ObjectsSelector(this), this.itemSelector = new mercator.ItemSelector(this), this.brushSelector = new mercator.BrushSelector(this), this.helperLines = new mercator.HelperLines(this), this.categories = new mercator.Categories(this), this.tableMousePointer = new mercator.TableMousePointer(this), this.boothMousePointer = new mercator.BoothMousePointer(this), this.iconMousePointer = new mercator.IconMousePointer(this), this.version = mercator.version, this.subChartFloors = new mercator.SubChartFloors(this).init(), this.masterSubChart = this.subChartFloors.newSubChart(), this.sectionSubChart = null, this.venueTypeSwitcher = new mercator.VenueTypeSwitcher(this), this.venueType = "MIXED", this.designerKey = o, this.history = new mercator.History(this.onActiveStateChanged.bind(this)), this.statusChanger = new mercator.StatusChanger(this), this.saver = new mercator.Saver(this), this.stateChangeDetector = this.createStateChangeDetector(), this.textsBboxCache = new mercator.TextsBboxCache(this), this.alert = new mercator.Alert($("#alert")), this.features = new mercator.Features(this).withModifier(this.venueTypeSwitcher).withModifier(this.featureConfig), this.showPrefixes = !1, this.referenceChartVisible = !0, this.showReferenceChartAbove = !1, this.setDefaultState()
}, mercator.ChartDesigner.prototype.render = function () {
    return this.v2Client.init(this).then(this.waitForSeatsFontLoaded.bind(this)).then(this.retrieveChart.bind(this)).then(this.initHotkeyUsageLogger.bind(this))
}, mercator.ChartDesigner.prototype.waitForSeatsFontLoaded = function () {
    let t = new FontFaceObserver("seatsdesigner").load("").then(null, () => console.warn("Could not load font seatsdesigner"));
    return promiseToDeferred(t)
}, mercator.ChartDesigner.prototype.anonymous = function () {
    return !this.designerKey && !this.secretKey
}, mercator.ChartDesigner.prototype.retrieveChart = function () {
    var t = this;
    return this.chartKey ? this.anonymous() ? t.retrievePublishedDrawingByWorkspaceKey() : this.v2Client.retrieveChart(this.chartKey).then(function (e) {
        t.setStatus(e.status)
    }).then(function () {
        return t.retrieveDrawing()
    }) : (this.chartKey = mercator.randomUuid(), this.uiStateUpdate({
        modalDialog: "venueTypeSelector"
    }), $.when())
}, mercator.ChartDesigner.prototype.initHotkeyUsageLogger = function () {
    if (this.anonymous()) this.hotkeyUsageLogger = new DummyHotkeyUsageLogger;
    else {
        let t = this.v2Client.user.email ? this.v2Client.user.email : `Company ${this.v2Client.user.company.name}`;
        this.hotkeyUsageLogger = new HotkeyUsageLogger(this.dataCollectorUrl, t, this.chartKey)
    }
}, mercator.ChartDesigner.prototype.retrievePublishedDrawingByWorkspaceKey = function () {
    var t = this;
    return this.v2Client.retrievePublishedDrawingByWorkspaceKey(this.chartKey).then(function (e) {
        t.renderDrawing(e)
    })
}, mercator.ChartDesigner.prototype.retrieveDrawing = function () {
    var t = this;
    return this.openLatestDrawing ? this.retrieveLatestDrawing() : this.openDraftDrawing ? this.v2Client.retrieveDraftDrawing(this.chartKey).then(function (e) {
        t.renderDrawing(e)
    }) : this.v2Client.retrievePublishedDrawing(this.chartKey).then(function (e) {
        t.renderDrawing(e)
    })
}, mercator.ChartDesigner.prototype.retrieveLatestDrawing = function () {
    return ("PUBLISHED_WITH_DRAFT" === this.status ? this.v2Client.retrieveDraftDrawing(this.chartKey) : this.v2Client.retrievePublishedDrawing(this.chartKey)).then(t => this.renderDrawing(t))
}, mercator.ChartDesigner.prototype.renderDrawing = function (t) {
    this.renderUI(), setTimeout(() => {
        this.fromJson(t), mercator.initializeEventHandlers(this), this.chartLoaded = !0, this.renderUI(), this.showMasterSubChart();
        let e = this.serialize();
        this.history.changeState(e), this.stateChangeDetector.start(e)
    }, 30)
}, mercator.ChartDesigner.prototype.createStateChangeDetector = function () {
    var t = this;
    return new mercator.StateChangeDetector(this, [function (e) {
        t.history.changeState(e), t.renderUI()
    }, function (e) {
        return t.saver.save(e)
    }])
}, mercator.ChartDesigner.prototype.saveNowIfNeeded = function () {
    return this.stateChangeDetector.actOnStateChangeWhenPreviousCycleDone()
}, mercator.ChartDesigner.prototype.saveAndExit = function () {
    this.saveNowIfNeeded().then(this.onExitRequested)
}, mercator.ChartDesigner.prototype.setStatus = function (t) {
    this.status && this.status !== t && "PUBLISHED_WITH_DRAFT" === t && (this.openDraftDrawing = !0), this.status = t, this.onStatusChanged(t), this.renderUI()
}, mercator.ChartDesigner.prototype.isPublished = function () {
    return "PUBLISHED" === this.status || "PUBLISHED_WITH_DRAFT" === this.status
}, mercator.ChartDesigner.prototype.onZoom = function () {
    this.activeSubChart().allObjects().forEach(function (t) {
        t.applyZoom()
    }), this.subChartFloors.applyZoom(), this.getState().reenter()
}, mercator.ChartDesigner.prototype.zoomIn = function () {
    this.zoomer.zoomIn(this.pointInCanvasCenteredInViewport())
}, mercator.ChartDesigner.prototype.zoomOut = function () {
    this.zoomer.zoomOut(this.pointInCanvasCenteredInViewport())
}, mercator.ChartDesigner.prototype.isSafeMode = function () {
    return !this.isReadOnly() && this.mode === mercator.ConfigParser.Modes.SAFE
}, mercator.ChartDesigner.prototype.isReadOnly = function () {
    return this.anonymous() || this.mode === mercator.ConfigParser.Modes.READ_ONLY || !this.openDraftDrawing && !this.openLatestDrawing && "PUBLISHED_WITH_DRAFT" === this.status
}, mercator.ChartDesigner.prototype.atMasterSubChart = function () {
    return null === this.sectionSubChart
}, mercator.ChartDesigner.prototype.goToFloor = function (t) {
    this.subChartFloors.hasFloor(t) && (this.subChartFloors.setFloor(t), this.showMasterSubChart(this.subChartFloors.getCurrentMasterSubChart()))
}, mercator.ChartDesigner.prototype.createFloor = function (t = !1) {
    this.subChartFloors.newSubChart(), t && this.goToFloor(this.subChartFloors.length() - 1), this.renderUI()
}, mercator.ChartDesigner.prototype.deleteFloor = function (t) {
    this.subChartFloors.hasFloor(t) && (this.subChartFloors.deleteFloor(t), 0 === this.subChartFloors.length() ? (this.subChartFloors.currentFloor = -1, this.createFloor(!0)) : this.goToFloor(Math.max(0, t - 1)))
}, mercator.ChartDesigner.prototype.setupCanvasEventHandlers = function () {
    var t = this;
    const e = document.querySelector("body"),
        s = () => $('input:focus, *[contenteditable="true"]:focus').length > 0;
    this.canvas().bind("contextmenu", function () {
        return !1
    }), window.addEventListener("blur", () => {
        this.keyboard.releaseAllModifierKeys(), this.renderUI()
    }), window.addEventListener("wheel", () => {
        this.mouseHover ? e.style.overflow = "auto" : e.style.overflow = "hidden"
    }), window.addEventListener("mouseup", t => {
        this.debug && console.log(this.prependState("onWindowMouseUp")), this.leftMouseButton(t) && this.mouseDown ? (this.mouseDown = !1, this.state.onCanvasMouseUp(t, this)) : (this.rightMouseButtonPressed = !1, this.renderUI())
    }, {
        capture: !0
    }), this.canvas().mousedown(function (e) {
        t.debug && console.log(t.prependState("onCanvasMouseDown")), t.leftMouseButton(e) ? (t.mouseDown = !0, t.state.onCanvasMouseDown(e, t)) : (t.rightMouseButtonPressed = !0, t.state.onCanvasRightMouseButtonDown(e, t), t.renderUI())
    }), this.canvas().mousemove(function (e) {
        t.lastMouseMoveEvent = e, t.state.onCanvasMouseMove(e, t)
    }), this.canvas().mouseenter(function (e) {
        t.mouseHover = !0
    }), this.canvas().mouseleave(function (e) {
        t.debug && console.log(t.prependState("onCanvasMouseLeave")), t.mouseHover = !1, t.state.onCanvasMouseLeave(e, t)
    }), this.canvas().clickWhenNotDragged(function (e) {
        t.mustNextCanvasClickBeIgnored ? t.mustNextCanvasClickBeIgnored = !1 : (t.debug && console.log(t.prependState("onCanvasClick")), t.state.onCanvasClick(e, t))
    }), this.canvas().on("gesturestart", e => {
        t.keyboard.onGestureStart(e)
    }), this.canvas().on("gesturechange", e => {
        t.keyboard.onGestureChange(e)
    }), this.canvas().on("gestureend", e => {
        t.keyboard.onGestureEnd(e)
    }), this.canvas().on("wheel", e => {
        s() || t.keyboard.onWheel(e)
    }), window.addEventListener("keydown", e => {
        s() || t.keyboard.onKeyDown(e)
    }), window.addEventListener("keyup", e => {
        s() || t.keyboard.onKeyUp(e)
    })
}, mercator.ChartDesigner.prototype.container = function () {
    return $("#" + this.containerId)
}, mercator.ChartDesigner.prototype.viewport = function () {
    let t = new mercator.Point(mercator.PANEL_DIMENSIONS.leftPanelWidth, mercator.PANEL_DIMENSIONS.topPanelHeight),
        e = new mercator.Point(window.innerWidth - mercator.PANEL_DIMENSIONS.rightPanelWidth, window.innerHeight - mercator.PANEL_DIMENSIONS.bottomPanelHeight);
    return mercator.Bbox.fromTopLeftAndLowerRight(t, e)
}, mercator.ChartDesigner.prototype.drawRectangle = function (t, e, s, i) {
    var o = Math.min(t, s),
        a = Math.min(e, i),
        r = Math.abs(t - s),
        n = Math.abs(e - i);
    return this.drawer.rect(o, a, r, n).applyZoom(this)
}, mercator.ChartDesigner.prototype.getLinePath = function (t, e, s, i) {
    return "M" + t + "," + e + "L" + s + "," + i
}, mercator.ChartDesigner.prototype.drawLineBetweenPoints = function (t, e) {
    return this.drawer.path(this.getLinePath(t.x, t.y, e.x, e.y)).applyZoom(this)
}, mercator.ChartDesigner.prototype.drawLineFromPointToPoint = function (t) {
    let e = "M" + t.map(t => t.x + "," + t.y).join("L");
    return this.drawer.path(e).applyZoom(this)
}, mercator.ChartDesigner.prototype.drawLine = function (t, e, s, i, o, a) {
    return void 0 === o && (o = 1), void 0 === a && (a = .25), this.drawer.path(this.getLinePath(t, e, s, i), {
        "stroke-width": o,
        opacity: a
    }).applyZoom(this)
}, mercator.ChartDesigner.prototype.setCursor = function (t) {
    this.cursor !== t && (this.cursor = t, this.canvas().css("cursor", t).attr("class", "custom-cursor cursor-" + t))
}, mercator.ChartDesigner.prototype.setCursorToDefault = function () {
    this.getState().cursor ? this.setCursor(this.getState().cursor) : (this.canvas().css("cursor", null).attr("class", null), this.cursor = null)
}, mercator.ChartDesigner.prototype.applyBaseColor = function (t) {
    t && less.modifyVars({
        "@baseColor": t
    })
}, mercator.ChartDesigner.prototype.setCursorToNone = function () {
    this.canvas().css("cursor", "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAADUlEQVQYV2P4//8/IwAI/QL/+TZZdwAAAABJRU5ErkJggg=='), none")
}, mercator.ChartDesigner.prototype.showMasterSubChart = function (t = null) {
    this.changeViewProcedures(() => {
        null === this.sectionSubChart ? this.setDefaultState() : t || this.setState(new mercator.ObjectsSelectedState(this, [this.sectionSubChart.section])), this.activeSubChart().undraw(), this.atMasterSubChart() && t && this.saveZoomAndPan(), this.sectionSubChart = null, t && (this.masterSubChart = t), this.activeSubChart().draw(), this.viewFromSeatsShown && this.showViewFromSeats(), this.refreshBackgroundColor(), this.savedZoomAndPan ? this.restoreZoomAndPan() : this.centerCanvasAndFillScreen(), this.subChartFloors.redrawAbstractFloors()
    }), requestAnimationFrame(() => {
        this.updateStats(), this.labelsShown && this.showLabels()
    }), this.requestRenderUI()
}, mercator.ChartDesigner.prototype.getCanvasColorScheme = function () {
    return "auto" === this.canvasColorScheme ? this.colorScheme : this.canvasColorScheme
}, mercator.ChartDesigner.prototype.isDarkCanvas = function () {
    return "light" !== this.getCanvasColorScheme()
}, mercator.ChartDesigner.prototype.useLegacyAppearance = function () {
    return !this.v2Client.getWorkspaceSettings().useNewDesign
}, mercator.ChartDesigner.prototype.refreshBackgroundColor = function () {
    let t = this.isDarkCanvas() ? "black" : "white";
    this.atMasterSubChart() || (t = this.isDarkCanvas() ? "hsl(200, 1%, 15%)" : "hsl(200, 5%, 90%)"), this.canvas().css("background-color", t)
}, mercator.ChartDesigner.prototype.showSectionSubChart = function (t) {
    this.changeViewProcedures(() => {
        this.subChartFloors.removeAbstractFloors(), this.saveZoomAndPan(), this.exitState(), this.activeSubChart().undraw(), this.sectionSubChart = t.sectionSubChart, this.setDefaultState(), this.activeSubChart().refreshOutOfBounds(), this.activeSubChart().draw(), this.labelsShown && this.activeSubChart().showLabels(), this.refreshBackgroundColor(), this.centerCanvasAndFillScreen()
    }), this.requestRenderUI(), requestAnimationFrame(() => {
        this.updateStats()
    })
}, mercator.ChartDesigner.prototype.saveZoomAndPan = function () {
    this.savedZoomAndPan = {
        pan: this.panner.serialize(),
        zoom: this.zoomer.serialize()
    }
}, mercator.ChartDesigner.prototype.restoreZoomAndPan = function () {
    this.panner.deserialize(this.savedZoomAndPan.pan), this.zoomer.deserialize(this.savedZoomAndPan.zoom), this.savedZoomAndPan = null
}, mercator.ChartDesigner.prototype.setDefaultState = function () {
    this.setState(new mercator.SelectionModeState(this))
}, mercator.ChartDesigner.prototype.changeViewProcedures = function (t) {
    this.changingView = !0, t(), this.changingView = !1
}, mercator.ChartDesigner.prototype.centerCanvasAndFillScreen = function () {
    this.fitActiveSubChartToViewport(), this.centerCanvasInViewport()
}, mercator.ChartDesigner.prototype.centerCanvasInViewport = function () {
    let t = this.panLevelToCenterChartInViewport();
    this.panner.panTo(t.x, t.y)
}, mercator.ChartDesigner.prototype.pointInCanvasCenteredInViewport = function () {
    let t = this.panLevelToCenterCanvasInViewport().subtract(this.panner.panLevel());
    return this.canvasCenter.subtract(t)
}, mercator.ChartDesigner.prototype.panLevelToCenterCanvasInViewport = function () {
    return new mercator.Point(this.canvasCenter.x - this.viewport().center().x, this.canvasCenter.y - this.viewport().center().y)
}, mercator.ChartDesigner.prototype.panLevelToCenterChartInViewport = function () {
    let t = this.zoomedCanvasCenter();
    return new mercator.Point(t.x - this.viewport().center().x, t.y - this.viewport().center().y)
}, mercator.ChartDesigner.prototype.zoomedCanvasCenter = function () {
    return this.zoomer.applyToPoint(this.canvasCenter)
}, mercator.ChartDesigner.prototype.doesPointSnapToHelperLines = function (t) {
    const e = this.helperLines.snapTo(t);
    return e && t.distanceToPoint(e)
}, mercator.ChartDesigner.prototype.snapPointToHelperLines = function (t) {
    return this.doesPointSnapToHelperLines(t) ? this.helperLines.snapTo(t) : t
}, mercator.ChartDesigner.prototype.snapPointToGrid = function (t) {
    return t.snapToGrid()
}, mercator.ChartDesigner.prototype.snapPoint = function (t) {
    var e = this.helperLines.snapTo(t);
    return e && t.distanceToPoint(e) ? e : t.snapToGrid()
}, mercator.ChartDesigner.prototype.fitActiveSubChartToViewport = function () {
    let t = this.viewport().width / this.activeSubChart().autoSizedWidth,
        e = this.viewport().height / this.activeSubChart().autoSizedHeight,
        s = .9 * Math.min(e, t, 1);
    this.zoomer.resetAndZoom(this.canvasCenter, s)
}, mercator.ChartDesigner.prototype.prependState = function (t) {
    return this.state.name + "." + t
}, mercator.ChartDesigner.prototype.leftMouseButton = function (t) {
    return 1 === t.which
}, mercator.ChartDesigner.prototype.ignoreNextCanvasClick = function () {
    this.mustNextCanvasClickBeIgnored = !0
}, mercator.ChartDesigner.prototype.onDuplicate = function () {
    this.features.isDisabled(mercator.Features.Type.CONTEXT_ACTIONS) || (this.debug && console.log(this.prependState("onDuplicate")), this.state.onDuplicate())
}, mercator.ChartDesigner.prototype.onCut = function () {
    this.features.isDisabled(mercator.Features.Type.CONTEXT_ACTIONS) || (this.debug && console.log(this.prependState("onCut")), this.state.onCut())
}, mercator.ChartDesigner.prototype.onCopy = function () {
    this.features.isDisabled(mercator.Features.Type.CONTEXT_ACTIONS) || (this.debug && console.log(this.prependState("onCopy")), this.state.onCopy())
}, mercator.ChartDesigner.prototype.onPaste = function () {
    this.features.isDisabled(mercator.Features.Type.CONTEXT_ACTIONS) || (this.debug && console.log(this.prependState("onPaste")), this.clipboard.isEmpty() || this.clipboard.paste())
}, mercator.ChartDesigner.prototype.onDelete = function () {
    this.features.isDisabled(mercator.Features.Type.CONTEXT_ACTIONS) || (this.debug && console.log(this.prependState("onDelete")), this.state.onDelete())
}, mercator.ChartDesigner.prototype.serialize = function () {
    return JSON.stringify(this.toJson())
}, mercator.ChartDesigner.prototype.setSectionScaleFactor = function (t) {
    this.sectionScaleFactor !== t && (this.sectionScaleFactor = t, this.sectionSubChart.sectionScaleChanged(this.sectionScaleFactor), this.activeSubChart().refreshOutOfBounds(!0), this.updateObjectsOutOfBounds(), this.renderUI())
}, mercator.ChartDesigner.prototype.showSectionContentsEnabled = function () {
    return 100 === this.sectionScaleFactor
}, mercator.ChartDesigner.prototype.toJson = function () {
    var t = {};
    return t.name = this.documentTitle, t.tablesLabelCounter = mercator.Tables.labelCounter, t.uuidCounter = mercator.Object.uuidCounter, t.categories = this.categories.toJson(), t.rowSpacing = this.rowSpacing, t.rowChairSpacing = this.rowChairSpacing, t.colorScheme = this.colorScheme, t.version = this.version, t.venueType = this.venueType, t.sectionScaleFactor = this.sectionScaleFactor, t.referenceChartVisible = this.referenceChartVisible, this.subChartFloors.hasMultipleFloors() ? (t.subChartFloors = this.subChartFloors.toJson(), t.multiFloorView = this.multiFloorView) : t.subChart = this.masterSubChart.toJson(), t
}, mercator.ChartDesigner.prototype.fromJson = function (t) {
    this.loadingFromJson = !0, this.initCategories(t.categories), this.sectionScaleFactor = t.sectionScaleFactor ? t.sectionScaleFactor : 100, this.showLegacySectionScaling = 100 !== this.sectionScaleFactor;
    let e = this.subChartFloors.getCurrentFloorIndex();
    this.subChartFloors = t.subChartFloors ? mercator.SubChartFloors.fromJson(t.subChartFloors, this) : new mercator.SubChartFloors(this, [mercator.MasterSubChart.fromJson(t.subChart, this)]), this.subChartFloors.setFloor(e), this.subChartFloors.init(), this.masterSubChart = this.subChartFloors.getCurrentMasterSubChart(), this.venueType = t.venueType, mercator.ChartDesigner.showSectionContents = this.shouldShowSectionContents(), this.showPrefixes = this.shouldShowPrefixes(), mercator.Tables.labelCounter = t.tablesLabelCounter, mercator.Object.uuidCounter = t.uuidCounter, mercator.ChartDesigner.snapToGridEnabled = this.storage.getItem("snapToGridEnabled"), this.rowLabelsShown = this.storage.getItem("rowLabelsShown", !1), this.labelsShown = this.storage.getItem("labelsShown", !1), this.viewFromSeatsShown = this.storage.getItem("viewFromSeatsShown", !1), this.rowSpacing = void 0 === t.rowSpacing ? mercator.Row.DEFAULT_SPACING : t.rowSpacing, this.rowChairSpacing = t.rowChairSpacing || mercator.Row.DEFAULT_CHAIR_SPACING, this.colorScheme = t.colorScheme || "light", this.documentTitle = t.name, this.multiFloorView = t.multiFloorView || "stage", this.shouldShowLegacySocialDistancingCheckbox = this.masterSubChart.allSeats().some(t => t.disabledBySocialDistancingRules), this.referenceChartVisible = this.getPlanReferenceChartVisible(t), this.loadingFromJson = !1, this.renderUI()
}, mercator.ChartDesigner.prototype.initCategories = function (t) {
    this.categories.setCategories(t.list.map(function (t) {
        return new mercator.Category(t.label, t.color, t.accessible, t.key)
    }))
}, mercator.ChartDesigner.prototype.canvas = function () {
    return $(this.svg.node)
}, mercator.ChartDesigner.prototype.activeSubChart = function () {
    return this.sectionSubChart ? this.sectionSubChart : this.masterSubChart
}, mercator.ChartDesigner.prototype.setState = function (t) {
    this.debug && console.log("setState from " + this.state + " to " + t), this.state && this.state.exit(t);
    !this.state || (this.state.name, t.name);
    this.state = t, this.state.init(), this.setCursorToDefault(), this.renderUI()
}, mercator.ChartDesigner.prototype.exitState = function () {
    this.state && (this.state.exit(), this.state = null)
}, mercator.ChartDesigner.prototype.getState = function () {
    return this.state
}, mercator.ChartDesigner.prototype.toTextMode = function () {
    this.setState(new mercator.TextModeState(this))
}, mercator.ChartDesigner.prototype.drawHelperLines = function (t, e) {
    this.helperLines.draw(t, e)
}, mercator.ChartDesigner.prototype.undrawHelperLines = function () {
    this.helperLines.undraw()
}, mercator.ChartDesigner.prototype.onFlipHorizontal = function () {
    this.state.onFlip(!0)
}, mercator.ChartDesigner.prototype.onFlipVertical = function () {
    this.state.onFlip(!1)
}, mercator.ChartDesigner.prototype.onAlign = function () {
    this.state.onAlign()
}, mercator.ChartDesigner.prototype.onNormalizeRows = function () {
    this.state.onNormalizeRows()
}, mercator.ChartDesigner.prototype.onStraighten = function () {
    this.state.onStraighten()
}, mercator.ChartDesigner.prototype.onEvenlySpace = function () {
    this.state.onEvenlySpace()
}, mercator.ChartDesigner.prototype.drawLineThroughRay = function (t) {
    return this.drawLine(t.origin.x, t.origin.y, t.end.x, t.end.y)
}, mercator.ChartDesigner.prototype.doCurve = function (t) {
    this.state.doCurve(t)
}, mercator.ChartDesigner.prototype.reselect = function () {
    this.state.reselect()
}, mercator.ChartDesigner.prototype.setRowSpacing = function (t) {
    this.rowSpacing = t, this.state.onDrawingToolInspectorValuesChange(), this.renderUI()
}, mercator.ChartDesigner.prototype.setRowChairSpacing = function (t) {
    this.rowChairSpacing = t, this.state.onDrawingToolInspectorValuesChange(), this.renderUI()
}, mercator.ChartDesigner.prototype.setRowBlockStyle = function (t) {
    this.setToolProperty("RowDrawing.rowBlockStyle", t), this.state.onDrawingToolInspectorValuesChange(), this.renderUI()
}, mercator.ChartDesigner.prototype.setVerticalRowLabelDirection = function (t) {
    this.selectedObjects().setVerticalRowLabelDirection(t), this.renderUI()
}, mercator.ChartDesigner.prototype.showLabels = function () {
    this.labelsShown = !0, this.masterSubChart.showLabels(), this.renderUI()
}, mercator.ChartDesigner.prototype.hideLabels = function () {
    this.labelsShown = !1, this.masterSubChart.hideLabels(), this.renderUI()
}, mercator.ChartDesigner.prototype.showRowLabels = function () {
    this.rowLabelsShown = !0, this.masterSubChart.showRowLabels(), this.renderUI()
}, mercator.ChartDesigner.prototype.hideRowLabels = function () {
    this.rowLabelsShown = !1, this.masterSubChart.hideRowLabels(), this.renderUI()
}, mercator.ChartDesigner.prototype.refreshSectionSubChart = function () {
    if (this.atMasterSubChart()) return null;
    var t = this.sectionSubChart.section.uuid,
        e = this.masterSubChart.sections.findByUuid(t);
    return e ? e.sectionSubChart : null
}, mercator.ChartDesigner.prototype.loadDrawing = function (t) {
    this.getState().exit(), this.activeSubChart().undraw(), this.fromJson(t), this.sectionSubChart = this.refreshSectionSubChart(), this.activeSubChart().draw(), this.getState().reenter()
}, mercator.ChartDesigner.prototype.onUndoPressed = function (t) {
    t.preventDefault(), this.undo()
}, mercator.ChartDesigner.prototype.undo = function () {
    if (this.history.canGoBack()) {
        this.getState().exit(new mercator.DoNothingState), this.activeSubChart().undraw();
        var t = this.history.goBack();
        this.fromJson(JSON.parse(t)), this.sectionSubChart = this.refreshSectionSubChart(), this.updateStats(), this.activeSubChart().refreshOutOfBounds(), this.activeSubChart().draw(), this.setDefaultState()
    }
}, mercator.ChartDesigner.prototype.redo = function () {
    if (this.history.canGoForward()) {
        this.getState().exit(new mercator.DoNothingState), this.activeSubChart().undraw();
        var t = this.history.goForward();
        this.fromJson(JSON.parse(t)), this.sectionSubChart = this.refreshSectionSubChart(), this.updateStats(), this.activeSubChart().refreshOutOfBounds(), this.activeSubChart().draw(), this.setDefaultState()
    }
}, mercator.ChartDesigner.prototype.toggleSnapToGrid = function () {
    mercator.ChartDesigner.snapToGridEnabled = !mercator.ChartDesigner.snapToGridEnabled, this.renderUI(), this.storage.setItem("snapToGridEnabled", mercator.ChartDesigner.snapToGridEnabled)
}, mercator.ChartDesigner.prototype.toggleShowSectionContents = function () {
    mercator.ChartDesigner.showSectionContents = !mercator.ChartDesigner.showSectionContents, this.activeSubChart().sections.sections.forEach(t => t.redrawContents()), this.renderUI(), this.storage.setItem("showSectionContents", mercator.ChartDesigner.showSectionContents)
}, mercator.ChartDesigner.prototype.setReferenceChartVisible = function (t) {
    this.referenceChartVisible !== t && (this.referenceChartVisible = t, this.renderUI(), this.activeSubChart().getReferenceChart().redraw())
}, mercator.ChartDesigner.prototype.setReferenceChartShowAbove = function (t) {
    this.showReferenceChartAbove !== t && (this.showReferenceChartAbove = t, this.renderUI(), this.showReferenceChartAbove && this.labelsShown && (this.hideLabels(), this.onRestoreReferenceChartShowAbove = (() => this.showLabels())), this.activeSubChart().getReferenceChart().redraw(), !this.showReferenceChartAbove && this.onRestoreReferenceChartShowAbove && (this.onRestoreReferenceChartShowAbove(), this.onRestoreReferenceChartShowAbove = void 0))
}, mercator.ChartDesigner.prototype.toggleShowLabels = function () {
    this.labelsShown ? this.hideLabels() : this.showLabels(), this.storage.setItem("labelsShown", this.labelsShown)
}, mercator.ChartDesigner.prototype.toggleShowRowLabels = function () {
    this.rowLabelsShown ? this.hideRowLabels() : this.showRowLabels(), this.storage.setItem("rowLabelsShown", this.rowLabelsShown)
}, mercator.ChartDesigner.prototype.toggleColorScheme = function () {
    this.colorScheme = "dark" !== this.colorScheme ? "dark" : "light", this.refreshBackgroundColor(), this.activeSubChart().redraw(), this.getState().reenter(), this.renderUI(), this.subChartFloors.redrawAbstractFloors()
}, mercator.ChartDesigner.prototype.onActiveStateChanged = function (t) {
    this.uiStateUpdate({
        canUndo: t.canGoBack(),
        canRedo: t.canGoForward()
    })
}, mercator.ChartDesigner.prototype.showViewFromSeats = function () {
    this.viewFromSeatsShown = !0, this.activeSubChart().showVFS(), this.renderUI()
}, mercator.ChartDesigner.prototype.hideViewFromSeats = function () {
    this.viewFromSeatsShown = !1, this.activeSubChart().hideVFS(), this.renderUI()
}, mercator.ChartDesigner.prototype.toggleViewFromSeats = function () {
    this.viewFromSeatsShown ? this.hideViewFromSeats() : this.showViewFromSeats(), this.storage.setItem("viewFromSeatsShown", this.viewFromSeatsShown)
}, mercator.ChartDesigner.prototype.requestStatsUpdate = function () {
    this.requestStatsUpdateTimeout || (this.requestStatsUpdateTimeout = setTimeout(() => {
        delete this.requestStatsUpdateTimeout, this.updateStats()
    }, 150 + (this.stats().totalPeopleCapacity ? Math.round(this.stats().totalPeopleCapacity / 75) : 0)))
}, mercator.ChartDesigner.prototype.currentValidationScope = function () {
    return this.sectionSubChart ? [this.sectionSubChart] : this.subChartFloors.subCharts
}, mercator.ChartDesigner.prototype.availableStats = function (t = this.currentValidationScope()) {
    return 0 === t.length || t[0].isMasterSubChart() || 0 === Object.keys(this.subChartStats).length ? this.globalStats : this.subChartStats
}, mercator.ChartDesigner.prototype.stats = function (t = this.currentValidationScope()) {
    return 0 === t.length || t[0].isMasterSubChart() ? this.globalStats : this.subChartStats
}, mercator.ChartDesigner.prototype.updateStats = function (t = this.currentValidationScope()) {
    let e = new mercator.ChartStatsGenerator(this.subChartFloors, t, this.categories),
        s = this.stats(t);
    s.totalPeopleCapacity = e.getTotalPeopleCapacity(), s.totalBooths = e.getTotalBooths(), s.maxCapacityExceeded = s.totalPeopleCapacity + s.totalBooths > mercator.ChartDesigner.MAX_CAPACITY, s.unlabeledObjects = e.getUnlabeled(), s.capacityByObjectType = e.getCapacityByObjectType(), s.totalUnlabeledObjects = s.unlabeledObjects.count, s.fileSizeByImage = e.getFileSizeByImageWithBackground(), s.imagesTotalSize = e.getImagesTotalSize(), s.missingFocalPoint = !e.hasFocalPoint(), s.hasUnusedFloors = e.hasUnusedFloors(), s.hasNoObjects = e.hasNoObjects(), this.updateGlobalOnlyStats(), this.updateDuplicateObjectsStats(e, t), this.updateCategoriesStats(e, t), this.updateObjectsOutOfBounds(e, t)
}, mercator.ChartDesigner.prototype.updateGlobalOnlyStats = function () {
    let t = new mercator.ChartStatsGenerator(this.subChartFloors, [this.masterSubChart], this.categories);
    this.globalStats.objectTypesByCategory = t.getObjectTypesByCategory(), this.globalStats.totalCategoriesWithMultipleObjectTypes = Object.keys(this.globalStats.objectTypesByCategory).filter(t => this.globalStats.objectTypesByCategory[t].length > 1).length
}, mercator.ChartDesigner.prototype.hasValidationWarningsOrErrors = function (t = this.currentValidationScope()) {
    const e = this.getValidationStates(t),
        s = ["warning", "error"];
    return Object.keys(e).some(t => s.includes(e[t]))
}, mercator.ChartDesigner.prototype.hasValidationErrors = function (t = this.currentValidationScope()) {
    const e = this.getValidationStates(t);
    return Object.keys(e).some(t => "error" === e[t])
}, mercator.ChartDesigner.prototype.hasMajorValidationErrors = function (t = this.currentValidationScope()) {
    const e = this.getValidationStates(t);
    return Object.keys(e).filter(t => "hasNoObjects" !== t).some(t => "error" === e[t])
}, mercator.ChartDesigner.prototype.getValidationStates = function (t = this.currentValidationScope()) {
    const e = this.stats(t),
        s = this.v2Client.getWorkspaceSettings().chartValidation,
        i = {
            OFF: "notice",
            WARNING: "warning",
            ERROR: "error"
        };
    return {
        hasNoObjects: e.hasNoObjects ? i[s.VALIDATE_NO_OBJECTS] : "",
        duplicates: e.totalDuplicateObjects > 0 ? i[s.VALIDATE_DUPLICATE_LABELS] : "",
        uncategorized: e.totalUncategorized > 0 ? i[s.VALIDATE_OBJECTS_WITHOUT_CATEGORIES] : "",
        unlabeled: e.totalUnlabeledObjects > 0 ? i[s.VALIDATE_UNLABELED_OBJECTS] : "",
        missingFocalPoint: e.missingFocalPoint ? i[s.VALIDATE_FOCAL_POINT] : "",
        hasUnusedFloors: e.hasUnusedFloors ? i[s.VALIDATE_EMPTY_FLOOR] : "",
        typesPerCategory: e.totalCategoriesWithMultipleObjectTypes > 0 ? i[s.VALIDATE_OBJECT_TYPES_PER_CATEGORY] : "",
        hasMultipleFloors: this.subChartFloors.hasMultipleFloors(),
        maxCapacityExceeded: e.maxCapacityExceeded ? "error" : ""
    }
}, mercator.ChartDesigner.prototype.updateDuplicateObjectsStats = function (t, e = this.currentValidationScope()) {
    t || (t = new mercator.ChartStatsGenerator(this.subChartFloors, [this.activeSubChart()], this.categories));
    let s = this.stats(e),
        i = t.getDuplicateObjects();
    s.duplicateObjects = this.processDuplicateObjects(i), s.totalDuplicateObjects = _.keys(i).length, this.masterSubChart.duplicateObjectsDetected(i)
}, mercator.ChartDesigner.prototype.updateCategoriesStats = function (t, e = this.currentValidationScope()) {
    t || (t = new mercator.ChartStatsGenerator(this.subChartFloors, [this.activeSubChart()], this.categories));
    let s = this.stats(e);
    s.uncategorizedObjects = t.getUncategorized(), s.totalUncategorized = s.uncategorizedObjects.count, s.capacityByCategory = t.getCapacityByCategory(), s.boothsByCategory = t.getBoothsByCategory(), this.requestRenderUI()
}, mercator.ChartDesigner.prototype.updateObjectsOutOfBounds = function (t = null, e = this.currentValidationScope()) {
    t || (t = new mercator.ChartStatsGenerator(this.subChartFloors, [this.activeSubChart()], this.categories));
    let s = this.stats(e);
    s.hasObjectsOutOfBounds = t.hasObjectsOutOfBounds(), s.hasObjectsOutOfBounds ? this.addOverlayMessage("objects-out-of-section-bounds", "warning") : this.removeOverlayMessage("objects-out-of-section-bounds"), this.requestRenderUI()
}, mercator.ChartDesigner.prototype.setSelectedSubobjectsCount = function (t) {
    this.selectedSubobjectsCount = t, this.renderUI()
}, mercator.ChartDesigner.prototype.clearSelectedCount = function () {
    this.setSelectedSubobjectsCount(0), this.setSelectedObjectsCount(0), this.setSelectedObjectsUuid([]), this.selectedSubobjectsLongestCount = null
}, mercator.ChartDesigner.prototype.setSelectedObjectsCount = function (t) {
    this.selectedObjectsCount = t, this.renderUI()
}, mercator.ChartDesigner.prototype.setSelectedSeatsCount = function (t) {
    let e = t.filter(t => "function" == typeof t.getChairs);
    this.selectedObjectsCount = t.length, this.selectedSubobjectsCount = e.flatMap(t => t.getChairs()).length, this.selectedSubobjectsLongestCount = e.reduce((t, e) => Math.max(t, e.getChairs().length), 0), this.selectedObjectsUuid = e.map(t => t.uuid), this.renderUI()
}, mercator.ChartDesigner.prototype.selectedObjects = function () {
    return this.state.selectedObjectsObject
}, mercator.ChartDesigner.prototype.setSelectedObjectsUuid = function (t) {
    this.selectedObjectsUuid = t, this.renderUI()
}, mercator.ChartDesigner.defaultName = function () {
    return d("untitled-chart")
}, mercator.ChartDesigner.prototype.canCreateNewFloor = function () {
    return this.features.isEnabled(mercator.Features.Type.MULTIPLE_FLOORS) && this.subChartFloors.length() < mercator.SubChartFloors.MAX_FLOORS
}, mercator.ChartDesigner.prototype.setDocumentTitle = function (t) {
    this.documentTitle = t, this.renderUI()
}, mercator.ChartDesigner.prototype.setMultiFloorView = function (t) {
    this.multiFloorView = t, this.renderUI()
}, mercator.ChartDesigner.prototype.setToolProperty = function (t, e) {
    this.toolProperties[t] = e
}, mercator.ChartDesigner.prototype.getToolProperty = function (t) {
    return this.toolProperties[t]
}, mercator.ChartDesigner.prototype.requestRenderUI = function () {
    this.requestedRenderUI || (this.requestedRenderUI = !0, requestAnimationFrame(() => {
        this.requestedRenderUI = !1, this.renderUI()
    }))
}, mercator.ChartDesigner.prototype.renderUI = function () {
    this.changingView || (this.renderedUIonThisFrame ? this.requestRenderUI() : (ReactDOM.render(React.createElement(DesignerApp, this.getUIState()), document.getElementById("designerApp")), this.renderedUIonThisFrame = !0, requestAnimationFrame(() => {
        this.renderedUIonThisFrame = !1
    })))
}, mercator.ChartDesigner.prototype.addOverlayMessage = function (t, e, s = "info") {
    this.overlayMessages[t] = {
        type: s,
        params: e
    }
}, mercator.ChartDesigner.prototype.removeOverlayMessage = function (t) {
    delete this.overlayMessages[t]
}, mercator.ChartDesigner.prototype.flashOverlayMessage = function (t, e = "info", s, i = 5e3) {
    let o = this;
    o.addOverlayMessage(t, s, e), o.renderUI(), setTimeout(function () {
        o.removeOverlayMessage(t), o.renderUI()
    }, i)
}, mercator.ChartDesigner.prototype.uiStateUpdate = function (t) {
    let e = !1;
    Object.keys(t).forEach(s => {
        let i = t[s];
        this.designerAppState[s] !== i && (this.designerAppState[s] = i, e = !0)
    }), e && this.renderUI()
}, mercator.ChartDesigner.prototype.uiStateToggle = function (t, e) {
    return this.designerAppState[t] = this.designerAppState[t] === e ? null : e, this.renderUI(), this.designerAppState[t]
}, mercator.ChartDesigner.prototype.busyIndicatorOn = function (t) {
    this.busyIndicators.includes(t) || (this.busyIndicators.push(t), this.renderUI())
}, mercator.ChartDesigner.prototype.busyIndicatorOff = function (t) {
    this.busyIndicators.includes(t) && (this.busyIndicators.remove(t), this.renderUI())
}, mercator.ChartDesigner.prototype.processDuplicateObjects = function (t) {
    return Object.keys(t).map(e => {
        let s = t[e],
            i = s[0];
        return {
            total: s.length,
            fullLabel: e,
            floor: this.subChartFloors.hasMultipleFloors() ? i.floorIndex() : void 0,
            sectionLabel: i.getSectionLabel(),
            parentUuid: _.uniq(s.map(t => t.subChart.section && t.subChart.section.uuid)),
            parentLabel: i.parent && i.parent.getLabel(),
            parentType: i.parent && i.parent.type,
            objectLabel: i.getLabel()
        }
    })
}, mercator.ChartDesigner.prototype.getContextActions = function () {
    if (this.features.isDisabled(mercator.Features.Type.CONTEXT_ACTIONS)) return [];
    let t = this.selectedObjects() ? this.selectedObjects().getContextActions() : [];
    return this.clipboard.isEmpty() || t.push("paste"), t
}, mercator.ChartDesigner.prototype.getUIState = function () {
    return {
        abTest: Object.assign({}, this.abTest),
        uiState: Object.assign({}, this.designerAppState),
        busyIndicators: this.busyIndicators.slice(),
        overlayMessages: Object.assign({}, this.overlayMessages),
        designer: {
            chartHasEvents: this.chartHasEvents(),
            shouldShowLegacySocialDistancingCheckbox: this.shouldShowLegacySocialDistancingCheckbox,
            ignoredLabelEditingWarnings: Array.from(this.ignoredLabelEditingWarnings),
            loaded: this.chartLoaded,
            state: this.state.name,
            tool: this.state.toolName,
            toolHint: this.state.toolHint,
            disabledFeatures: this.features.getDisabled(),
            snapToGrid: mercator.ChartDesigner.snapToGridEnabled,
            showSectionContents: mercator.ChartDesigner.showSectionContents,
            showLabels: this.labelsShown,
            showRowLabels: this.rowLabelsShown,
            showAllTools: !0,
            viewFromSeatsShown: this.viewFromSeatsShown,
            atMasterSubChart: this.atMasterSubChart(),
            sectionName: this.atMasterSubChart() ? null : this.sectionSubChart.section.label,
            sectionUuid: this.atMasterSubChart() ? null : this.sectionSubChart.section.uuid,
            minZoomLevel: mercator.Zoomer.minZoomLevel,
            maxZoomLevel: mercator.Zoomer.maxZoomLevel,
            zoomLevel: this.zoomer.zoomLevel,
            altKey: this.altWasPressed,
            ctrlKey: this.ctrlWasPressed,
            shiftKey: this.shiftWasPressed,
            spacebarIsPressed: this.spacebarIsPressed,
            enableCanvasGrabber: this.enableCanvasGrabber,
            rightMouseButton: this.rightMouseButtonPressed,
            lastGroupTool: Object.assign({}, this.lastGroupTool),
            toolProperties: Object.assign({}, this.toolProperties),
            currentFloor: this.subChartFloors.getCurrentFloorIndex(),
            canCreateNewFloor: this.canCreateNewFloor(),
            canvasColorScheme: this.canvasColorScheme,
            showReferenceChartAbove: this.showReferenceChartAbove,
            legacyAppearance: this.useLegacyAppearance()
        },
        document: {
            status: this.status,
            title: this.documentTitle,
            readOnly: this.isReadOnly(),
            categories: this.categories.all().map(t => Object.assign({}, t)),
            subChartStats: this.subChartStats ? Object.assign({}, this.subChartStats) : {},
            globalStats: this.globalStats ? Object.assign({}, this.globalStats) : {},
            rowSpacing: this.rowSpacing,
            referenceChartScale: this.masterSubChart.referenceChart.backgroundImageScale,
            floors: this.subChartFloors.length(),
            chartKey: this.chartKey,
            workspaceKey: this.getWorkspaceKey(),
            chartJsonForPreview: this.toJson(),
            colorScheme: this.getCanvasColorScheme()
        },
        selection: {
            uuid: this.selectedObjectsUuid,
            count: this.selectedObjectsCount,
            subCount: this.selectedSubobjectsCount,
            longestSubCount: this.selectedSubobjectsLongestCount,
            sheets: this.getInspectorSheets(),
            contextActions: this.getContextActions(),
            data: {},
            info: {
                hasDuplicateObjects: this.selectedObjects() && this.selectedObjects().selectedObjectHasDuplicateObjects(),
                canBeCurved: this.selectedObjects() && this.selectedObjects().canBeCurved(),
                canChairSpacingBeEdited: this.selectedObjects() && this.selectedObjects().canChairSpacingBeEdited(),
                canBeSmoothened: this.selectedObjects() && this.selectedObjects().canBeSmoothened(),
                canSeatCountBeEdited: this.selectedObjects() && this.selectedObjects().canSeatCountBeEdited()
            },
            rowSpacing: this.selectedObjects() && this.selectedObjects().getRowSpacing()
        }
    }
}, mercator.ChartDesigner.prototype.getWorkspaceKey = function () {
    return this.v2Client.getWorkspaceKey()
}, mercator.ChartDesigner.prototype.getSelectedObjects = function () {
    return this.selectedObjects() && this.selectedObjects().hasSelectedObjects() ? this.selectedObjects().arrayOfObjects : this.state.hasSelectedObjects() ? this.state.getSelectedObjects() : []
}, mercator.ChartDesigner.prototype.getMultiFloorView = function () {
    return this.multiFloorView || "stage"
}, mercator.ChartDesigner.prototype.getInspectorSheets = function () {
    let t = this.getSelectedObjects();
    if (t.length > 0) {
        let e = this.getInspectorSheetsFromArray(t);
        return _.pickBy(e, (t, e) => this.isObjectSheetEnabled(e))
    }
    return this.state.getInspectorSheets() || (this.atMasterSubChart() ? {
        "ChartInfo.name": this.documentTitle,
        "ChartInfo.isEmpty": this.activeSubChart().isEmpty() && !this.subChartFloors.hasUsedFloors(),
        "ChartInfo.totalPeopleCapacity": this.stats().totalPeopleCapacity,
        "ChartInfo.maxCapacityExceeded": this.stats().maxCapacityExceeded,
        "ChartInfo.totalBooths": this.stats().totalBooths,
        "ChartInfo.totalUnlabeledObjects": this.stats().totalUnlabeledObjects,
        "ChartInfo.totalDuplicateObjects": this.stats().totalDuplicateObjects,
        "ChartInfo.totalUncategorized": this.stats().totalUncategorized,
        "ChartInfo.totalCategoriesWithMultipleObjectTypes": this.stats().totalCategoriesWithMultipleObjectTypes,
        "ChartInfo.missingFocalPoint": this.stats().missingFocalPoint,
        "ChartInfo.hasUnusedFloors": this.stats().hasUnusedFloors,
        "ChartInfo.hasNoObjects": this.stats().hasNoObjects,
        "ChartInfo.imagesTotalSize": this.stats().imagesTotalSize,
        "ChartInfo.totalCategories": this.categories.all().length,
        "ChartInfo.hasMultipleFloors": this.subChartFloors.hasMultipleFloors(),
        "ReferenceChart.url": this.masterSubChart.referenceChart.url(),
        "ReferenceChart.scale": this.masterSubChart.referenceChart.backgroundImageScale,
        "ReferenceChart.visible": this.referenceChartVisible,
        "ReferenceChart.showAbove": this.showReferenceChartAbove,
        "ChartBackground.url": this.activeSubChart().backgroundImage.url(),
        "ChartBackground.scale": this.activeSubChart().backgroundImage.backgroundImageScale,
        "ChartBackground.visibleToTicketBuyers": this.activeSubChart().backgroundImage.showOnRenderedCharts,
        "ChartBackground.fileSize": this.activeSubChart().backgroundImage.fileSize(),
        "MultiFloor.view": this.getMultiFloorView(),
        CategoriesMoved: !0
    } : {
        "SectionInfo.name": this.activeSubChart().section.label,
        "SectionInfo.isEmpty": this.activeSubChart().isEmpty(),
        "SectionInfo.totalPeopleCapacity": this.subChartStats.totalPeopleCapacity,
        "SectionInfo.totalBooths": this.subChartStats.totalBooths,
        "SectionInfo.totalUnlabeledObjects": this.subChartStats.totalUnlabeledObjects,
        "SectionInfo.totalDuplicateObjects": this.subChartStats.totalDuplicateObjects,
        "SectionInfo.totalUncategorized": this.subChartStats.totalUncategorized,
        "SectionInfo.sectionScale": this.sectionScaleFactor,
        "SectionInfo.imagesTotalSize": this.subChartStats.imagesTotalSize,
        "SectionInfo.hasObjectsOutOfBounds": this.subChartStats.hasObjectsOutOfBounds,
        "ReferenceChart.url": this.masterSubChart.referenceChart.url(),
        "ReferenceChart.scale": this.masterSubChart.referenceChart.backgroundImageScale,
        "ReferenceChart.visible": this.referenceChartVisible,
        "ReferenceChart.showAbove": this.showReferenceChartAbove
    })
}, mercator.ChartDesigner.prototype.isObjectSheetEnabled = function (t) {
    return t.startsWith("ObjectLabeling.") || t.startsWith("SeatLabeling.") || t.startsWith("Label.") ? this.features.isEnabled(mercator.Features.Type.LABELING) : !(!t.startsWith("Category.") && !t.startsWith("SubChart.")) || (!t.includes(".") || this.features.isEnabled(mercator.Features.Type.OBJECT_PROPERTIES))
}, mercator.ChartDesigner.prototype.getInspectorSheetsFromArray = function (t) {
    let e, s = t.map(t => t.getInspectorSheets());
    s.forEach(t => {
        e = e ? Object.keys(e).filter(e => Object.keys(t).includes(e)).reduce((t, e) => (t[e] = this.getInspectorSheetsValues(s, e), t), {}) : t
    });
    return e
}, mercator.ChartDesigner.prototype.getInspectorSheetsValues = function (t, e) {
    if (mercator.ChartDesigner.sumInspectorSheetValues.includes(e)) return t.reduce((t, s) => t + (s[e] || 0), 0); {
        let s = _.uniq(t.flatMap(t => t[e])).filter(t => void 0 !== t);
        return s.length > 1 ? s : s[0]
    }
}, mercator.ChartDesigner.prototype.getPlanReferenceChartVisible = function (t) {
    return void 0 === t.referenceChartVisible ? !t.subChart || !t.subChart.referenceChart || void 0 === t.subChart.referenceChart.visible || t.subChart.referenceChart.visible : t.referenceChartVisible
}, mercator.ChartDesigner.prototype.shouldShowPrefixes = function () {
    return this.masterSubChart.allBookableParentObjects().some(t => t.objectLabeling && t.objectLabeling.prefix && t.objectLabeling.prefix.length > 0)
}, mercator.ChartDesigner.prototype.getTranslatedRowDisplayTypeSuggestions = function () {
    return _.uniq(mercator.Row.DISPLAY_OBJECT_TYPES.map(t => d(t)).concat([TextInput.SUGGESTIONS_SEPARATOR]).concat(this.masterSubChart.allRows().map(t => t.displayObjectType).filter(t => !mercator.Row.DISPLAY_OBJECT_TYPES.includes(t)).sort()))
}, mercator.ChartDesigner.prototype.getTranslatedSeatDisplayTypeSuggestions = function () {
    return _.uniq(mercator.Chair.DISPLAY_OBJECT_TYPES.map(t => d(t)).concat([TextInput.SUGGESTIONS_SEPARATOR]).concat(this.masterSubChart.allObjectsWithSeats().flatMap(t => t.chairs).map(t => t.displayObjectType).filter(t => !mercator.Chair.DISPLAY_OBJECT_TYPES.includes(t)).sort()))
}, mercator.ChartDesigner.prototype.chartHasEvents = function () {
    return "NOT_USED" !== this.status
}, mercator.ChartDesigner.prototype.shouldShowLegacySocialDistancingCheckbox = function () {
    return this.shouldShowLegacySocialDistancingCheckbox
}, mercator.ChartDesigner.prototype.ignoreLabelEditingWarning = function (t) {
    this.ignoredLabelEditingWarnings.add(t), this.renderUI()
}, mercator.ChartDesigner.snapToAngle = 2, mercator.ChartDesigner.snapToGridEnabled = !0, mercator.ChartDesigner.showSectionContents = !1, mercator.ChartDesigner.sumInspectorSheetValues = ["SubChart.totalPeopleCapacity", "SubChart.totalBooths"], mercator.ChartDesigner.prototype.shouldShowSectionContents = function () {
    return !this.showLegacySectionScaling && !this.features.isDisabled(mercator.Features.Type.SECTIONS) && this.storage.getItem("showSectionContents", this.masterSubChart.allBookableParentObjects().length < 800)
}, mercator.ChartDesigner.SIZE = 2e4, mercator.ChartDesigner.MAX_CAPACITY = 2e5;

mercator.Obfuscator = {}, mercator.Obfuscator.deobfuscate = ((e, t) => {
    const o = mercator.Obfuscator.keyToNumberBetween0And63(t),
        s = new Uint8Array(e).map(e => e - o),
        a = pako.ungzip(s);
    return new TextDecoder("utf-8").decode(a)
}), mercator.Obfuscator.keyToNumberBetween0And63 = (e => 63 & mercator.Obfuscator.hashCode(e)), mercator.Obfuscator.hashCode = (e => {
    let t = 0;
    for (let o = 0; o < e.length; o++) t = (29 * t % 10007 + e.charCodeAt(o)) % 10007;
    return t
});

mercator.V2Client = function (e, t) {
    this.apiUrl = e, this.workspaceKey = t, this.user = void 0, this.workspaceSettings = void 0
}, mercator.V2Client.prototype.init = function (e) {
    var t = this;
    return t.determineUser(e).then(e => t.user = e).then(() => t.determineWorkspaceSettings(e)).then(e => t.workspaceSettings = e)
}, mercator.V2Client.prototype.determineUser = function (e) {
    return e.anonymous() ? $.when() : this.authenticatedAjax(e.secretKey || e.designerKey, {
        url: "/accounts/me"
    })
}, mercator.V2Client.prototype.determineWorkspaceSettings = function () {
    if (!this.user) return $.when();
    return this.authenticatedAjax(this.user.secretKey, {
        url: "/workspaces/" + this.getWorkspaceKey()
    }).then(function (e) {
        return e.settings
    })
}, mercator.V2Client.prototype.retrievePublishedDrawingByWorkspaceKey = function (e) {
    return $.ajax({
        url: this.apiUrl + "/assets/mercator/" + e
    })
}, mercator.V2Client.prototype.saveChart = function (e, t) {
    return this.authenticatedAjax(this.user.secretKey, {
        type: "POST",
        url: `/system/public/charts/${e}`,
        data: t,
        contentType: "application/json",
        headers: {
            "Content-encoding": "deflate"
        },
        processData: !1,
        timeout: 3e4
    })
}, mercator.V2Client.prototype.getWorkspaceKey = function () {
    return this.workspaceKey ? this.workspaceKey : this.user ? this.user.defaultWorkspace.key : null
}, mercator.V2Client.prototype.retrieveChart = function (e) {
    return this.authenticatedAjax(this.user.secretKey, {
        url: "/charts/" + e
    })
}, mercator.V2Client.prototype.retrievePublishedDrawing = function (e) {
    return this.fetchDrawingVersionAndDeobfuscate("published", e)
}, mercator.V2Client.prototype.retrieveDraftDrawing = function (e) {
    return this.fetchDrawingVersionAndDeobfuscate("draft", e)
}, mercator.V2Client.prototype.fetchDrawingVersionAndDeobfuscate = function (e, t) {
    let s = "/system/public/charts/" + t + "/version/" + e;
    return this.authenticatedFetch(this.user.secretKey, s).then(e => JSON.parse(mercator.Obfuscator.deobfuscate(e, t)))
}, mercator.V2Client.prototype.publishDraft = function (e) {
    return this.authenticatedAjax(this.user.secretKey, {
        method: "POST",
        url: "/charts/" + e + "/version/draft/actions/publish"
    })
}, mercator.V2Client.prototype.discardDraft = function (e) {
    return this.authenticatedAjax(this.user.secretKey, {
        method: "POST",
        url: "/charts/" + e + "/version/draft/actions/discard"
    })
}, mercator.V2Client.prototype.uploadImage = function (e, t, s, r, i, n = !0) {
    let o = new XMLHttpRequest,
        a = this.apiUrl + "/charts/" + t + "/images?resize=" + n;
    o.addEventListener("load", s, !1), o.addEventListener("error", r, !1), o.addEventListener("abort", i, !1), o.open("POST", a), o.setRequestHeader("Authorization", this.encodeSecret(this.user.secretKey)), o.send(e)
}, mercator.V2Client.prototype.uploadImageWithoutResizing = function (e, t, s, r, i) {
    this.uploadImage(e, t, s, r, i, !1)
}, mercator.V2Client.prototype.encodeSecret = function (e) {
    return "Basic " + btoa(e + ":")
}, mercator.V2Client.prototype.authenticatedFetch = function (e, t) {
    let s = this.apiUrl + t,
        r = {
            Authorization: this.encodeSecret(e),
            "X-Client-Tool": "Designer"
        };
    return this.getWorkspaceKey() && (r["X-Workspace-Key"] = this.getWorkspaceKey()), fetch(s, {
        method: "GET",
        headers: r
    }).then(e => {
        if (e.ok) return e.arrayBuffer();
        throw e
    })
}, mercator.V2Client.prototype.authenticatedAjax = function (e, t) {
    var s = this;
    return t.beforeSend = function (t) {
        t.setRequestHeader("Authorization", s.encodeSecret(e)), s.getWorkspaceKey() && t.setRequestHeader("X-Workspace-Key", s.getWorkspaceKey()), t.setRequestHeader("X-Client-Tool", "Designer")
    }, t.url = s.apiUrl + t.url, $.ajax(t)
}, mercator.V2Client.prototype.getWorkspaceSettings = function () {
    return this.workspaceSettings ? this.workspaceSettings : {
        chartValidation: {}
    }
};
//TRADUÇÃO
mercator.Language = {};
mercator.Language.pt = {
    "select-cursor": "Selecionar",
    "select-brush": "Escova de seleção",
    "select-seats": "Selecionar assentos",
    "select-sameType": "Selecione o mesmo tipo",
    node: "Nó",
    labeling: "Rotulagem",
    row: "Fila",
    "row-single": "Fila",
    "row-segmented": "Fila com segmentos",
    "row-multiple": "Várias filas",
    "row-intertwined": "Várias filas",
    seat: "Assento",
    chair: "Cadeira",
    bench: "Banco",
    stool: "Tamborete",
    table: "Mesa",
    section: "Seção",
    "section-polygon": "Seção",
    "section-rectangle": "Seção retangular",
    booth: "Booth",
    generalAdmission: "Área",
    "ga-rectangle": "Área Retangular",
    "ga-ellipse": "Área Elíptica",
    "ga-polygon": "Área Poligonal",
    "shape-rectangle": "Retângulo",
    "shape-ellipse": "Elipse",
    "shape-polygon": "Polígono",
    "table-rectangle": "Mesa Retangular",
    "table-round": "Mesa Redonda",
    rectangle: "Retângulo",
    circle: "Círculo",
    text: "Texto",
    image: "Imagem",
    focalpoint: "Ponto focal",
    hand: "Mão",
    "normalize-rows": "Endireitar e espaço uniformemente",
    "align-left": "Alinhar à esquerda",
    "align-center": "Alinhar ao centro",
    "align-right": "Alinhar à direita",
    "align-top": "Alinhar o topo",
    "align-middle": "Alinhar o meio",
    "align-bottom": "Alinhar o fundo",
    "space-horizontally": "Espaço horizontalmente",
    "space-vertically": "Espaço verticalmente",
    straighten: "Endireitar",
    "space-evenly": "Espaço uniformemente",
    "flip-horizontal": "Rodar na horizontal",
    "flip-vertical": "Rodar na vertical",
    duplicate: "Duplicar",
    delete: "Excluir",
    viewFromSeats: "Vista dos assentos",
    object: "Objeto",
    spacebar: "Espaço",
    tables: "Mesa |||| Mesas",
    rows: "Fila |||| Filas",
    seats: "Assento |||| Assentos",
    objects: "Objeto |||| Objetos",
    booths: "Booth |||| Booths",
    images: "Imagem |||| Imagens",
    "select-hint": "![Click & drag] seleciona múltiplos objetos",
    "selected-hint": "![Shift + Click] para adicionar ou remover objetos da seleção. ![%{meta}D] para desmarcar",
    move: "Mover",
    "move-hint": "![Shift] ajuste para um ângulo de 45º",
    rotate: "Girar",
    "rotate-hint": "![Shift] ajuste para um ângulo de 15º",
    "node-hint": "![Click] para selecionar um objeto e editar seus nós",
    "nodeEdit-hint": "![Click & drag] no nó para movê-lo ![Click] em um lado para criar um novo nó ![Right Click] no nó para excluí-lo ![Alt] para ocultar as alças laterais",
    "labeling-hint": "![Click & drag] seleciona múltiplos objetos e atribui rótulos automaticamente",
    "select-seats-hint": "![Click & drag] seleciona assentos individuais",
    "selected-seats-hint": "![Shift + Click] para adicionar ou remover assentos da seleção. ![%{meta}D] para desmarcar",
    "brush-selected-hint": "![Shift + Click] para adicionar objetos à seleção. ![%{meta}D] para desmarcar",
    "select-sameType-hint": "![Click] selecionar objetos do mesmo tipo",
    "selected-sameType-hint": "![Click] selecionar do mesmo tipo ![Shift + Click] adicionar ou remover tipos da seleção ![%{meta}D] para desmarcar",
    "row-hint": "![Click & drag] desenhe uma linha ![Shift] ajuste para um ângulo de 15º ![Alt] desativa o ajuste automático",
    "row-segmented-hint": "![Click] coloque um nó de linha ![Click] no último assento para terminar o sorteio ![Shift] ajuste para um ângulo de 15º ![Alt] desativa o ajuste automático",
    "row-multiple-hint": "![Click & drag] desenhe a primeira linha ![Shift] ajuste para um ângulo de 15º ![Alt] desativa o ajuste automático",
    "row-multiple-extending-hint": "Arraste para definir o número de linhas e ![Click] para finalizar o desenho ![Shift] alinhar para os lados",
    "clickToDraw-hint": "![Click] desenha um(a) %{object} ![Alt] desativa o ajuste automático",
    "clickDragToDraw-hint": "![Click & drag] desenha um(a) %{object} ![Shift] restringir proporções ![Alt] desativa o ajuste automático",
    "shape-hint": "![Click & drag] desenha uma forma ![Shift] mantém proporção largura/comprimento uniforme ![Alt] desativa o ajuste automático",
    "nodesWithModifiers-hint": "![Click] insere um nó ![Right Click] remove o último nó ![Shift] ajusta ao ângulo de 45º ![Alt] desativa o ajuste automático",
    "focalpoint-hint": 'O Ponto Focal é usado pelo recurso "melhores assentos disponíveis", em que os assentos mais próximos do ponto são considerados os melhores',
    "icon-hint": "![Click] inserir ícone",
    "hand-hint": "![Click & drag] para mover o documento. ![Spacebar] para usar em qualquer outra ferramenta",
    "image/png": "PNG",
    "image/gif": "GIF",
    "image/jpeg": "JPEG",
    "application/pdf": "PDF",
    "palette-light-day": "Melhor para fundos claros",
    "palette-light-night": "Melhor para fundos escuros",
    "palette-light-day-night": "Boa para todos os tipos de fundos",
    "publish-draft-question": "Publicar este rascunho?",
    "publish-draft-description": "Você está prestes a substituir o mapa atualmente publicado por esta versão para todos os eventos deste mapa.",
    "action-cannot-be-undone": "Não será possível desfazer esta ação.",
    "chart-has-unresolved-warnings": "Este mapa tem avisos não resolvidos",
    "chart-has-unresolved-errors": "Este gráfico contém erros não resolvidos que impedem sua publicação",
    "untitled-chart": "Mapa sem título",
    publishDraftError: "Ocorreu algum erro durante a publicação do seu rascunho!",
    cancel: "Cancelar",
    exit: "Sair",
    draft: "Rascunho",
    published: "Publicado",
    "new-category": "Nova categoria",
    "save-and-exit": "Salvar e sair",
    "exit-section": "Sair da seção",
    undo: "Desfazer",
    redo: "Refazer",
    "snap-to-grid": "Ajustar à grade",
    "show-section-contents": "Mostrar conteúdo da seção",
    "show-section-contents-disabled": "O conteúdo das seções só pode ser exibido se a escala da seção for 100%.",
    transform: "Transformar",
    smoothing: "Suavização",
    tension: "Tensão",
    "show-row-labels": "Mostrar rótulos da fila",
    "always-show-labels": "Sempre mostrar rótulos",
    "view-from-seats": "Vista dos assentos",
    "take-tour": "Faça o tour de 60 segundos",
    "get-started": "Começar",
    next: "Próximo",
    skip: "Pular",
    welcome: "Bem-vindo ao",
    "main-toolbar": "Barra de ferramentas principal",
    "main-toolbar-tutorial-1": "Saia do designer, edite o nome do documento ou verifique a última versão salva ou publicada.",
    "main-toolbar-tutorial-2": "Ações do nível de designer e alternânticas entre desfazer/refazer, ajustar à grade, mostrar todos os rótulos e mostrar vista a partir dos assentos.",
    "main-toolbar-tutorial-3": "Ações contextuais de objetos, como rodar, duplicar e excluir.",
    tools: "Ferramentas",
    "tools-tutorial-1": "Algumas ferramentas estão agrupadas, indicadas por um ícone %{icon}.",
    "tools-tutorial-2": "Clique numa ferramenta para trocar para ela a fim de selecionar, desenhar, modificar, rotular objetos ou definir um ponto focal.",
    "object-inspector": "Inspetor de Objetos",
    "inspector-tutorial-1": "Permite alterar propriedades, categorizar e rotular os objetos selecionados.",
    "inspector-tutorial-2": "Quando não houver nada selecionado, são mostradas as propriedades e estatísticas do mapa.",
    "status-and-hints": "Status e Dicas",
    "status-and-hints-tutorial": "Veja informações e dicas sobre a ferramenta atual para aprender truques de usuários avançados.",
    "numeric-input-scrubber-hint": "Clique e arraste para alterar o valor",
    close: "Fechar",
    "duplicate-objects": "Duplicar objetos",
    label: "Rótulo",
    "duplicate-objects-sections": "Duplicar objetos nas seções",
    "num-sections-duplicate-object": "%{numSections} seções rotuladas de <code>%{sectionLabel}</code> contêm um objeto rotulado de <code>%{objectLabel}</code>",
    "num-unlabeled-sections-duplicate-object": "%{numSections} seções não rotuladas contêm um objeto rotulado de <code>%{objectLabel}</code>",
    "chart-duplicate-objects": "Este mapa possui objetos duplicados.",
    "chart-duplicate-objects-description": "Objetos duplicados resultarão em reservas errôneas ou duplicadas de assentos.",
    "chart-no-duplicate-objects": "Não há objetos duplicados neste mapa.",
    "uncategorized-objects": "Objeto sem categoria |||| Objetos sem categoria",
    "unlabeled-objects": "Objeto sem rótulo |||| Objetos sem rótulo",
    "object-type": "Tipo de objeto",
    unlabeled: "Sem rótulo",
    "container-has-objects-count": "Este(a) %{container} tem %{count} %{object}.",
    "container-no-uncategorized-objects": "Não há objetos sem categoria neste(a) %{container}.",
    "uncategorized-objects-description": "Não é possível atribuir preço a objetos sem categoria.",
    chart: "Mapa",
    "unlabeled-objects-description": "Objetos sem rótulo resultarão em reservas errôneas ou duplicadas de assentos pelos compradores de ingressos.",
    "container-no-unlabeled-objects": "Não há objetos sem rótulo neste(a) %{container}.",
    "new-chart": "Novo mapa",
    "without-sections": "Sem seções",
    "without-sections-1": "Mais adequado para estabelecimentos que acomodam menos de 1000 pessoas.",
    "with-sections-and-floors": "Com seções e pisos",
    "with-sections-1": "Ideal para teatros, estádios, salas de concertos e outros estabelecimentos com setores.",
    key: "Legenda",
    edit: "Editar",
    accept: "Aceitar",
    "multiple-values": "Múltiplos valores",
    "colorblind-safe": "Adequado para daltônicos",
    "colorblind-safe-text": "Usuários com os tipos de daltonismo mais comuns podem diferenciar cores desta paleta com confiança suficiente.",
    "saving-failed": "Falha ao salvar",
    "read-only": "Somente leitura",
    saved: "Salvo",
    "last-saved": "Salvo pela última vez",
    "save-failed-warning": "Ocorreu um erro ao salvar automaticamente. Tentaremos novamente em alguns segundos",
    "read-only-warning": "Este mapa não pode ser modificado. Quaisquer mudanças realizadas nele serão perdidas",
    "published-warning": "Esta é a versão publicada do mapa. As alterações serão salvas em um rascunho, que você poderá publicar ou descartar",
    "published-with-draft-warning": "Existe uma versão publicada deste mapa, mas você está editando um rascunho, que poderá ser publicado ou descartado",
    "draft-warning": "O mapa é um rascunho salvo",
    "saved-warning": "O mapa está salvo",
    publish: "Publicar",
    preview: "Prévia",
    "upload-file-type-not-allowed": "Este tipo de arquivo não é aceito. Por favor, carregue %{filetypes}",
    "upload-max-file-size-exceeded": "Por favor, carregue uma imagem menor do que %{filesize}",
    "images-count": "%{count} imagens diferentes",
    "upload-message": "Solte uma imagem aqui ou clique para carregar",
    remove: "Remover",
    "filesize-smaller-than": "Menor do que %{filesize}",
    "zoom-out": "Afastar imagem",
    "zoom-in": "Ampliar imagem",
    "objects-selected-count": "%{smart_count} objeto selecionado |||| %{smart_count} objetos selecionados",
    tool: "Ferramenta",
    labels: "Rótulos",
    direction: "Direção",
    layout: "Layout",
    "seats-on-all-sides": "Assentos em todos os lados",
    "seats-on-both-sides": "Assentos em ambos os lados",
    "seats-on-one-side": "Assentos em um único lado",
    "automatic-radius": "Raio automático",
    up: "Topo",
    right: "Dereita",
    down: "Abaixo",
    left: "Esquerda",
    "stroke-color": "Cor do traço",
    "fill-color": "Cor de preenchimento",
    "text-color": "Cor do texto",
    "children-count": "%{smart_count} criança |||| %{smart_count} crianças",
    "no-objects": "Este mapa não tem objetos",
    "no-duplicate-objects": "Nenhum objeto duplicado",
    "all-objects-labeled": "Todos os objetos rotulados",
    "all-objects-categorized": "Todos os objetos estão categorizados",
    "sections-scaling": "Dimensionamento das seções",
    "edit-contents": "Editar conteúdos",
    capacity: "Capacidade",
    places: "lugar |||| lugares",
    "no-capacity": "Sem capacidade",
    entrance: "Entrada",
    category: "Categoria",
    categories: "Categorias",
    "n-categories": "categoria |||| categorias",
    "categories-info-description-1": "As categorias podem ter atribuição de preço quando o mapa é renderizado para um evento específico, definindo, assim, os preços referentes a objetos atribuídos a cada categoria.",
    "multiple-object-types-per-category": "categorias em vários tipos de objeto",
    "unique-object-types-per-category": "Uma categoria por tipo de objeto",
    "object-types-per-category": "Tipos de objeto por categoria",
    "object-types-per-category-invalid": "Algumas categorias foram aplicadas a mais de um tipo de objeto.",
    "object-types-per-category-valid": "Cada categoria foi aplicada a um único tipo de objeto.",
    unused: "Não utilizado",
    "chart-no-categories": "Este mapa não tem categorias",
    scale: "Escala",
    opacity: "Opacidade",
    order: "Ordenação",
    background: "Fundo",
    foreground: "Primeiro plano",
    "row-spacing": "Espaçamento entre filas",
    "seat-spacing": "Espaçamento do assento",
    "seat-count": "Número de assentos",
    "visible-to-ticket-buyers": "Visível para compradores de ingressos",
    "make-visible-to-ticket-buyers": "Tornar visível para compradores de ingressos",
    "make-visible-to-ticket-buyers-hint": "Não será possível desfazer esta ação. Para usar uma imagem de fundo a fim de desenhar sobre ela, use o mapa de Referência em vez disso.",
    "background-file-too-big": "O arquivo é grande demais e poderá afetar o tempo de carregamento",
    "from-images": "de imagens",
    "chart-images-description": "Este gráfico tem %{count} imagens, com um tamanho total de download de %{filesize} KB.",
    "chart-images-tip": "Mantenha o número total de imagens baixas e o tamanho total de download abaixo de %{filesize} KB para garantir tempos de carregamento curtos.",
    "chart-no-images": "Este gráfico não tem imagens.",
    caption: "Título",
    "displayed-label": "Rótulo exibido",
    "rowlabel-enabled": "Activado",
    "displayed-label-tooltip": "Você pode alterar o rótulo exibido que fica visível para os usuários. Internamente, as retenções e reservas ainda serão feitas com a Etiqueta original.",
    visible: "Visível",
    "font-size": "Tamanho da fonte",
    rotation: "Rotação",
    "position-x": "Posição X",
    "position-y": "Posição Y",
    style: "Estilo",
    bold: "Negrito",
    italic: "Itálico",
    "object-has-no-properties": "Este objeto não tem propriedades",
    "objects-have-no-properties-in-common": "Estes objetos não têm propriedades em comum para editar.",
    clear: "Apagar",
    prefix: "Prefixo",
    "start-at": "Iniciar em",
    "end-at": "Termine em",
    invert: "Inverter",
    chairs: "Cadeiras",
    "open-spaces": "Espaços livres",
    spaces: "Espaços",
    radius: "Raio",
    curve: "Curva",
    descending: "Descendente",
    ascending: "Ascendente",
    ga: "Admissão Geral",
    shape: "Forma",
    "corner-radius": "Raio do canto",
    "stroke-width": "Largura do traço",
    width: "Largura",
    height: "Altura",
    done: "Concluído",
    back: "Voltar",
    "chart-capacity": "Capacidade do mapa",
    "container-no-capacity": "Este %{container} não tem lugares.",
    "chart-booths-description": "Este mapa tem %{count} %{booths}.",
    "chart-no-booths": "Este mapa não tem booths.",
    "container-is-empty": "Este %{container} está vazio",
    "create-new-category": "Criar nova categoria",
    "capacity-by-type": "Capacidade por %{type}",
    uncategorized: "Sem categoria",
    "object-label": "Rótulo de %{object}",
    "object-labeling": "Rotulagem de %{object}",
    "tool-tool": "Ferramenta %{tool}",
    "chart-chart": "Mapa %{chart}",
    "section-section": "Seção %{section}",
    "unlabeled-object": "%{object} sem rótulo",
    "find-the-right-scale": "Ache a escala certa",
    "find-the-right-scale-description": "Mova, gire e dimensione para corresponder o espaçamento entre os assentos de uma fila no mapa de referência com a fila sobreposta.",
    "correct-spacing": "Espaçamento correto",
    "incorrect-spacing": "Espaçamento incorreto",
    "reference-chart": "Mapa de referência",
    "reference-chart-hint": "Use a imagem de uma planta existente para desenhar sobre ela.",
    "chart-background-hint": "Use uma imagem como fundo para fins estéticos, visível para os compradores de ingressos.",
    "adjust-row-spacing": "Ajuste o espaçamento entre filas",
    "adjust-row-spacing-description": "Corresponda o espaçamento entre filas movendo, girando e ajustando o espaçamento.",
    "trace-chart": "Trace por cima de outro mapa",
    "reference-chart-intro-title": "Calibração do mapa de referência",
    "reference-chart-intro-description": "Este assistente o ajudará a encontrar a escala correta para a imagem carregada, redimensionando e posicionando assentos falsos no topo da imagem de fundo.",
    "reference-chart-description-1": "Carregue uma imagem de um mapa existente para desenhar sobre ele.",
    "reference-chart-description-2": "Poupe tempo e minimize erros quando estiver desenhando.",
    "find-seats": "Encontre uma linha longa e aplique zoom para preencher a tela.",
    "find-seats-description": "Clique e arraste para reposicionar a planta dos assentos. Aumente o zoom usando os controles na parte inferior.",
    "click-on-seats": "Coloque os assentos em cima dos assentos do fundo.",
    "click-on-seats-description": "Clique para colocar os assentos. Clique e arraste para reposicioná-los. Clique com o botão direito para removê-los.",
    "adjust-seat-size": "Proceda para combinar o tamanho dos assentos.",
    "adjust-seat-size-description": "Ajuste o tamanho do assento até que as bordas dos assentos colocados e os assentos do fundo se sobreponham.",
    "seat-size-autoadjusted": "O tamanho do assento foi ajustado automaticamente.",
    "seat-size-autoadjusted-description": "Este é o tamanho recomendado para a melhor legibilidade do gráfico.",
    "confirm-seat-size": "Confirme o tamanho do assento.",
    "confirm-seat-size-description": "Se o tamanho sugerido não se adequar ao seu layout, você pode ajustá-lo manualmente.",
    "row-spacing-step": "Defina o espaçamento das linhas arrastando a linha destacada para a próxima linha paralela.",
    "row-spacing-step-description": "Clique e arraste a linha para reposicioná-la. Para confirmar, clique em Concluído.",
    "reference-chart-complete-1": "Plano de referência calibrado.",
    "reference-chart-complete-2": "Agora você pode começar a rastrear seu plano de referência.",
    "no-row-shape-detected": "Isso não parece uma linha. O tamanho do assento não será ajustado automaticamente.",
    "seat-size": "Tamanho do assento",
    "zoom-level": "Nível de zoom",
    "image-load-error": "A imagem não pôde ser carregada",
    "image-tool-info": "Faça o upload de uma imagem para inserir na planta baixa.",
    "close-designer-with-errors-question": "Fechar a planta com erros?",
    "close-designer-with-errors-description": "Este gráfico é salvo com erros. Tem certeza de que deseja sair sem corrigi-los?",
    "automatic-stroke": "Curso automático",
    type: "Tipo",
    variation: "Variação",
    stage: "Cena",
    stairs: "Escadas",
    restrooms: "Banheiros",
    "restrooms-unisex": "Banheiros",
    "restrooms-men": "Banheiros Masculinos",
    "restrooms-women": "Banheiros de Mulheres",
    unisex: "Unissex",
    men: "Homens",
    women: "Mulheres",
    emergencyExit: "Saída de emergência",
    foodCourt: "Praça de alimentação",
    bar: "Bar",
    cocktail: "Coquetel",
    beer: "Cerveja",
    cafe: "Café",
    misc: "Miscelânea",
    "bookable-as-a-whole": "Pode ser reservado como um todo",
    "bookable-as-a-whole-table-tooltip": "Quando ativado, os usuários selecionam toda a mesa com um clique. A mesa fica reservada, não os lugares.\n",
    "min-occupancy": "Ocupação mínima",
    "max-occupancy": "Ocupação máxima",
    type_generalAdmission: "Admissão Geral",
    type_fixedOccupancy: "Ocupação fixa",
    "fixedOccupancy-info": "Apenas um usuário pode selecionar todos os lugares com um único clique.",
    type_variableOccupancy: "Ocupação variável",
    "variableOccupancy-info": "Apenas um usuário pode selecionar vários locais, dentro dos limites.",
    "general-admission-area-info": "Vários usuários podem selecionar lugares em uma área de admissão geral.",
    "restricted-view": "Visão restrita",
    "label-position-invisible": "Invisível",
    "label-position-left": "Esquerda",
    "label-position-right": "Direita",
    "label-position-left-and-right": "Esquarda e direita",
    "label-skip": "Pular %{letter}",
    "objects-out-of-section-bounds": "Alguns objetos estão fora dos limites da seção.",
    "paste-failed-single": "Este conteúdo (%{unsupportedObjectType}) não pode ser colado %{where}.",
    "paste-failed": "Este conteúdo (%{unsupportedObjectTypes}) não pode ser colado %{where}.",
    insideSection: "dentro de uma seção",
    outsideSection: "fora de uma seção",
    onChartWithoutSections: "em tabelas sem seções",
    copy: "Copiar",
    paste: "Colar",
    "no-focal-point-set": "Sem ponto focal",
    "focal-point-set": "Ponto focal está definido",
    displayObjectType: "Tipo exibido",
    couch: "Sofá",
    accessible: "Acessível",
    "companion-seat": "Assento acompanhante",
    "disabled-by-social-distancing-rules": "Indisponível por regras de distanciamento social",
    "accessible-disabled-because-disabled-category": "Esta opção está desativada, porque sua seleção contém objetos que pertencem a uma categoria acessível",
    "companion-seat-disabled-because-disabled-category": "Esta opção está desativada, porque sua seleção contém objetos que pertencem a uma categoria acessível",
    "horizontal-orientation": "Orientação horizontal",
    "label-position-bottom": "Fundo",
    "label-position-top": "Topo",
    renderingFailed: "The seating chart designer could not be loaded.",
    "label-editing-warning-title": "Editar esse rótulo?",
    "label-editing-warning": "As reservas podem desaparecer, e os canais podem ter sua atribuição cancelada.",
    "edit-anyway": "Edite mesmo assim",
    "ga-bookable-as-a-whole-warning-title": "Livro como um todo?",
    "ga-bookable-as-a-whole-warning": "If the GA area has 1 or more bookings, ticket buyers won't be able to select it anymore.",
    "ga-bookable-as-a-whole-warning-confirm": "Livro como um todo",
    "more-info": "Mais informações",
    icon: "Icone",
    "bar-cocktail": "Coquetel",
    "bar-beer": "Cerveja",
    size: "Tamanho",
    valid: "Válido",
    warning: "Atençao",
    error: "Erro",
    notice: "Aviso",
    "floor-x": "Andar %{number}",
    "new-floor": "Novo andar",
    floor: "Andar",
    "create-new-floor": "Crie novo andar",
    "new-floor-dialog-multifloor-description": "Os compradores de ingressos terão uma visão de vários andares e controles para navegar pelos andares.",
    "new-floor-dialog-floor-spread-notice": "Os pisos se espalharão automaticamente se seus objetos forem visualmente obstruídos por pisos acima deles.",
    create: "Crio",
    "delete-floor": "Apagar o chão",
    "unused-floors": "Existem pisos não utilizados",
    "no-unused-floors": "Todos os pisos têm conteúdo",
    "category-key-already-exists": "A chave de categoria %{key} já existe.",
    "category-edit-warning-title": "Editar chave de categoria",
    "category-edit-warning-description": "As alterações da chave de categoria devem ser refletidas na configuração de preços. Caso contrário, alguns objetos se tornarão impossíveis de reserva ou terão um preço incorreto atribuído.",
    "play-tutorial": "Reproduzir tutorial",
    "keyboard-shortcuts": "Atalhos do teclado",
    actions: "Ações",
    cut: "Cortar",
    deselect: "Desmarcar",
    "toggle-reference-chart": "Mostrar mapa de referência",
    "go-to-floor": "Vá para o chão...",
    recalibrate: "Recalibrar",
    "max-capacity-exceeded": "Capacidade maior que %{maxCapacity}",
    "saving-failed-validation-error": "O salvamento falhou devido a um erro de validação",
    "save-failed-validation-error": "Ocorreu um erro durante o salvamento automático porque seu gráfico contém erros de validação",
    multifloor: "Vários andares",
    "multifloor-view": "Perspectiva de vários andares",
    "stage-view": "Vista de baixo",
    "stage-view-description": "Melhor para teatros que têm o palco desenhado na parte inferior.",
    "isometric-view": "Vista de cima",
    "isometric-view-description": "Visão menos obstruída para teatros, estádios ou outros locais desenhados de qualquer lado.",
    keys: "Chaves",
    manage: "Gerir",
    "no-category": "Nenhuma categoria atribuída",
    "categories-have-moved": "As categorias mudaram",
    "categories-have-moved-li-1": "Volte ao topo.",
    "categories-have-moved-li-2": "Clique no ícone [icon] próximo a Categorias.",
    "block-style": "Estilo de bloco",
    "published-labels-disabled": "As etiquetas publicadas não podem ser editadas. Você ainda pode editar o Rótulo Exibido.",
    "deleting-published-objects-disabled": "Objetos publicados não podem ser excluídos.",
    set: "Establecer",
    rainbow: "Arco-íris",
    "polar-sunset": "Pôr do sol polar",
    "frosty-autumn": "Outono gelado",
    "vibrant-nature": "Natureza vibrante",
    scenery: "Paisagem",
    whiteboard: "Quadro branco",
    blackboard: "Quadro negro",
    platinum: "Platina",
    ivory: "Marfim",
    "toggle-color-scheme": "Alternar esquema de cores",
    "show-above": "Mostrar acima"
};
mercator.Messages = function (t) {
    this.polyglot = new Polyglot({
        phrases: mercator.Language[t],
        allowMissing: !0
    })
}, mercator.Messages.prototype.replacePlaceholders = function (t) {
    return this.replacePlaceholdersInSpans(t), this.replacePlaceholdersInAttributes(t), this
}, mercator.Messages.prototype.replacePlaceholdersInSpans = function (t) {
    var s = this;
    t.find("span.translation-placeholder").each(function () {
        var t = $(this);
        t.text(s.d(t.data("placeholder")))
    })
}, mercator.Messages.prototype.replacePlaceholdersInAttributes = function (t) {
    var s = this;
    t.find("i, label, input").each(function () {
        var t = this;
        $.each(t.attributes, function () {
            if (_.startsWith(this.value, "translation.placeholder.")) {
                var e = this.value.substring("translation.placeholder.".length);
                $(t).attr(this.name, s.d(e))
            }
        })
    })
}, mercator.Messages.prototype.d = function (t, s) {
    return this.polyglot.t(t, this.extendWithSmartCount(s))
}, mercator.Messages.prototype.dl = function (t, s) {
    return _.lowerFirst(this.d(t, s))
}, mercator.Messages.prototype.du = function (t, s) {
    return _.upperFirst(this.d(t, s))
}, mercator.Messages.prototype.extendWithSmartCount = function (t = {}) {
    return void 0 !== t.smart_count ? t : _.assignIn({}, {
        smart_count: 0
    }, t)
}, mercator.Messages.prototype.exposeOnGlobalScope = function () {
    return window.d = mercator.Messages.prototype.d.bind(this), window.dl = mercator.Messages.prototype.dl.bind(this), window.du = mercator.Messages.prototype.du.bind(this), this
}; mercator.Messages.defaultLocale = "pt";

//BACKGROUND IMAGE
mercator.ImageUploader = class {
    constructor(e) {
        this.designer = e
    }
    uploadChartBackgroundImage(e) {
        this.designer.busyIndicatorOn("chartBackgroundUpload");
        var a = new FormData;
        a.append("fileToUpload", e), this.designer.v2Client.uploadImage(a, this.designer.chartKey, this.onChartBackgroundUploaded.bind(this, e.size), this.onUploadFailed.bind(this, "chartBackgroundUpload"), this.onUploadCanceled.bind(this, "chartBackgroundUpload"))
    }
    onChartBackgroundUploaded(e, a) {
        this.designer.masterSubChart.backgroundImage.setBackgroundImage(this._uploadImageResponse(a).key).setBackgroundFileSize(e), this.designer.requestStatsUpdate(), this.designer.busyIndicatorOff("chartBackgroundUpload")
    }
    _uploadImageResponse(e) {
        return JSON.parse(e.target.responseText)
    }
    uploadReferenceChartImage(e, a) {
        this.designer.busyIndicatorOn("referenceChartUpload");
        var t = new FormData;
        t.append("fileToUpload", e), this.designer.v2Client.uploadImageWithoutResizing(t, this.designer.chartKey, this.onReferenceChartUploaded.bind(this, e.size, a), this.onUploadFailed.bind(this, "referenceChartUpload"), this.onUploadCanceled.bind(this, "referenceChartUpload"))
    }
    onReferenceChartUploaded(e, a, t) {
        this.designer.masterSubChart.referenceChart.setBackgroundImage(this._uploadImageResponse(t).key).setBackgroundFileSize(e), this.designer.busyIndicatorOff("referenceChartUpload"), a && a()
    }
    uploadViewFromSeatImage(e, a) {
        this.designer.busyIndicatorOn("viewFromSeatsUpload");
        var t = new FormData;
        t.append("fileToUpload", e), this.designer.v2Client.uploadImage(t, this.designer.chartKey, this.onViewFromSeatUploaded.bind(this, a), this.onUploadFailed.bind(this, "viewFromSeatsUpload"), this.onUploadCanceled.bind(this, "viewFromSeatsUpload"))
    }
    onViewFromSeatUploaded(e, a) {
        e.setViewFromSeats(this._uploadImageResponse(a).key), this.designer.busyIndicatorOff("viewFromSeatsUpload")
    }
    uploadImageObject(e, a, t, i) {
        this.designer.busyIndicatorOn("imageObjectUpload");
        let d = new FormData;
        d.append("fileToUpload", e), this.designer.v2Client.uploadImage(d, this.designer.chartKey, this.onImageObjectUploaded.bind(this, e.size, a, t, i), this.onUploadFailed.bind(this, "imageObjectUpload"), this.onUploadCanceled.bind(this, "imageObjectUpload"))
    }
    onImageObjectUploaded(e, a, t, i, d) {
        let s = this._uploadImageResponse(d),
            n = new mercator.ImageObject(s.key, a, this.designer.activeSubChart());
        n.fileSize = s.compressedSizeInBytes, n.width = t, n.height = i, this.designer.activeSubChart().imageObjects.add(n), this.designer.setState(new mercator.ObjectsSelectedState(this.designer, [n])), this.designer.requestStatsUpdate(), n.onFirstDraw = (() => this.designer.state.reenter()), n.draw(), this.designer.busyIndicatorOff("imageObjectUpload")
    }
    onUploadFailed(e) {
        this.designer.busyIndicatorOff(e)
    }
    onUploadCanceled(e) {
        this.designer.busyIndicatorOff(e)
    }
};

//EVENTOS 
mercator.UIEvents = class {
    constructor(e) {
        this.designer = e
    }
    trigger(e, t) {
        if (e) return this[e](t)
    }
    uiStateUpdate(e) {
        this.designer.uiStateUpdate(e)
    }
    documentTitleChange(e) {
        this.designer.setDocumentTitle(e)
    }
    savingStart() {
        this.uiStateUpdate({
            save: "saving",
            saveErrorType: null
        })
    }
    saveSuccess(e) {
        this.uiStateUpdate({
            save: "saved",
            lastSavedMoment: e
        })
    }
    saveRejected(e) {
        this.uiStateUpdate({
            save: "rejected",
            lastSavedMoment: null,
            saveErrorType: e
        })
    }
    restartFirstTimeTutorial() {
        this.uiStateUpdate({
            firstTimeTutorialDone: !1
        })
    }
    completeFirstTimeTutorial() {
        this.designer.storage.setItem("v2.firstTimeTutorialDone", !0), this.uiStateUpdate({
            firstTimeTutorialDone: !0
        })
    }
    closeApp() {
        this.designer.saveAndExit()
    }
    undo() {
        this.designer.undo()
    }
    redo() {
        this.designer.redo()
    }
    requestPublishDraft() {
        this.designer.busyIndicatorOn("publish"), this.updateGlobalStats(), this.designer.hasValidationWarningsOrErrors(this.designer.subChartFloors.allMasterSubCharts()) ? (this.designer.busyIndicatorOff("publish"), this.uiStateUpdate({
            modalDialogProps: {},
            modalDialog: "publishDraft"
        })) : this.publishDraft()
    }
    requestCloseApp() {
        this.updateGlobalStats(), this.designer.hasMajorValidationErrors() ? this.uiStateUpdate({
            modalDialogProps: {},
            modalDialog: "exitWithErrors"
        }) : this.closeApp()
    }
    openReferenceChartStartupDialog() {
        this.uiStateUpdate({
            modalDialogProps: {},
            modalDialog: "referenceChartStartupDialog"
        })
    }
    openReferenceChartDialog() {
        this.uiStateUpdate({
            modalDialogProps: {
                imageUrl: this.designer.activeSubChart().getReferenceChart().url(),
                imageWidth: this.designer.activeSubChart().getReferenceChart().backgroundImageWidth,
                imageHeight: this.designer.activeSubChart().getReferenceChart().backgroundImageHeight
            },
            modalDialog: "referenceChartDialog"
        })
    }
    closeModalDialog() {
        this.uiStateUpdate({
            modalDialog: null
        })
    }
    showContextualMenu(e, t) {
        this.uiStateUpdate({
            contextualMenuOptions: e,
            contextualMenuSettings: t
        })
    }
    clearContextualMenu() {
        this.uiStateUpdate({
            contextualMenuOptions: null,
            contextualMenuSettings: null
        })
    }
    publishDraft() {
        this.designer.onExitRequested || (this.uiStateUpdate({
            save: "saving"
        }), this.closeModalDialog()), this.designer.statusChanger.publishDraft().then(() => {
            this.designer.onExitRequested ? (this.designer.busyIndicatorOff("publish"), this.designer.onExitRequested()) : (mercator.designer.setStatus("PUBLISHED"), this.uiStateUpdate({
                save: "saved"
            }), this.designer.busyIndicatorOff("publish"))
        }, () => {
            alert(d("publishDraftError")), this.uiStateUpdate({
                save: "rejected"
            })
        })
    }
    showKeyboardShortcuts() {
        this.uiStateUpdate({
            modalDialog: "keyboardShortcuts"
        })
    }
    showLabelEditingWarning(e) {
        this.uiStateUpdate({
            modalDialogProps: {
                objectType: e
            },
            modalDialog: "labelEditingWarning"
        })
    }
    showGABookableAsAWholeWarning(e) {
        this.uiStateUpdate({
            modalDialog: "GABookableAsAWholeWarning",
            modalDialogProps: {
                variableOccupancy: e
            }
        })
    }
    showCategoryKeyEditWarning() {
        this.uiStateUpdate({
            modalDialog: "categoryKeyEditWarning"
        })
    }
    ignoreLabelEditWarning(e) {
        this.designer.ignoreLabelEditingWarning(e)
    }
    toggleSnapToGrid() {
        this.designer.toggleSnapToGrid()
    }
    toggleShowSectionContents() {
        this.designer.toggleShowSectionContents()
    }
    toggleShowLabels() {
        this.softShownLabels = !1, this.designer.toggleShowLabels()
    }
    toggleShowRowLabels() {
        this.designer.toggleShowRowLabels()
    }
    softShowLabels() {
        this.designer.labelsShown || (this.softShownLabels = !0), this.designer.showLabels()
    }
    toggleViewFromSeats() {
        this.designer.toggleViewFromSeats()
    }
    selectObject(e) {
        e ? this.designer.setState(new mercator.ObjectsSelectedState(this.designer, [e])) : this.toolSelectCursor()
    }
    selectObjectByUuid(e) {
        if (!e) return this.selectObject(null);
        let t = this.designer.activeSubChart().findByUuid(e);
        this.selectObject(t)
    }
    selectObjectForLabelingByUuid(e) {
        if (e) {
            let t = this.designer.activeSubChart().findByUuid(e);
            this.designer.setState(new mercator.ObjectsSelectedState(this.designer, [t]))
        }
        this.softShowLabels()
    }
    showObjectInspectorSheet(e, t) {
        this.designer.setState(new mercator.ObjectsSelectedState(this.designer, [e])), this.uiStateUpdate({
            goToSheet: t
        })
    }
    updateGlobalStats() {
        this.designer.updateStats(this.designer.subChartFloors.allMasterSubCharts())
    }
    toolSelectCursor() {
        this.designer.getState().selectedObjects ? this.designer.setState(new mercator.ObjectsSelectedState(this.designer, this.designer.getState().selectedObjects)) : this.designer.setState(new mercator.SelectionModeState(this.designer))
    }
    toolSelectBrush() {
        this.designer.setState(new mercator.BrushSelectionModeState(this.designer))
    }
    toolSelectSeats() {
        this.designer.setState(new mercator.SeatSelectionModeState(this.designer))
    }
    toolSelectSameType() {
        this.designer.setState(new mercator.SameTypeSelectionModeState(this.designer))
    }
    toolNode() {
        this.designer.features.isDisabled(mercator.Features.Type.NODES) || (this.designer.getState().selectedObjects ? this.designer.setState(new mercator.PolygonSelectedState(this.designer, this.designer.getState().selectedObjects)) : this.designer.setState(new mercator.NodeState(this.designer)))
    }
    toolSection() {
        if (this.designer.features.isDisabled(mercator.Features.Type.SECTIONS)) return;
        switch (this._getTargetSubTool("section", ["polygon", "rectangle"])) {
            default:
            case "polygon":
                this.toolSectionPolygon();
                break;
            case "rectangle":
                this.toolSectionRectangle()
        }
    }
    toolSectionPolygon() {
        this.designer.features.isDisabled(mercator.Features.Type.SECTIONS) || (this.designer.lastGroupTool.section = "polygon", this.designer.setState(new mercator.SectionPolygonState(this.designer)))
    }
    toolSectionRectangle() {
        this.designer.features.isDisabled(mercator.Features.Type.SECTIONS) || (this.designer.lastGroupTool.section = "rectangle", this.designer.setState(new mercator.SectionRectangleState(this.designer)))
    }
    toolRow() {
        if (this.designer.features.isDisabled(mercator.Features.Type.ROWS)) return;
        switch (this._getTargetSubTool("row", ["single", "segmented", "multiple"])) {
            default:
            case "single":
                this.toolRowSingle();
                break;
            case "segmented":
                this.toolRowSegmented();
                break;
            case "multiple":
                this.toolRowMultiple()
        }
    }
    toolRowSingle() {
        this.designer.features.isDisabled(mercator.Features.Type.ROWS) || (this.designer.lastGroupTool.row = "single", this.designer.setState(new mercator.SingleRowModeState(this.designer)))
    }
    toolRowSegmented() {
        this.designer.features.isDisabled(mercator.Features.Type.ROWS) || (this.designer.lastGroupTool.row = "segmented", this.designer.setState(new mercator.SegmentedRowModeState(this.designer)))
    }
    toolRowMultiple() {
        this.designer.features.isDisabled(mercator.Features.Type.ROWS) || (this.designer.lastGroupTool.row = "multiple", this.designer.setState(new mercator.MultipleRowModeState(this.designer)))
    }
    toolText() {
        this.designer.features.isDisabled(mercator.Features.Type.TEXTS) || this.designer.toTextMode()
    }
    toolImageObject() {
        this.designer.features.isDisabled(mercator.Features.Type.IMAGES) || this.designer.setState(new mercator.ImageUploadState(this.designer))
    }
    toolGa() {
        switch (this._getTargetSubTool("ga", ["rectangle", "ellipse", "polygon"])) {
            default:
            case "rectangle":
                this.toolGaRectangle();
                break;
            case "ellipse":
                this.toolGaEllipse();
                break;
            case "polygon":
                this.toolGaPolygon()
        }
    }
    toolGaRectangle() {
        this.designer.features.isDisabled(mercator.Features.Type.AREAS) || (this.designer.lastGroupTool.ga = "rectangle", this.designer.setState(new mercator.GeneralAdmissionState(this.designer, mercator.ShapedObjects.Rectangle)))
    }
    toolGaEllipse() {
        this.designer.features.isDisabled(mercator.Features.Type.AREAS) || (this.designer.lastGroupTool.ga = "ellipse", this.designer.setState(new mercator.GeneralAdmissionState(this.designer, mercator.ShapedObjects.Circle)))
    }
    toolGaPolygon() {
        this.designer.features.isDisabled(mercator.Features.Type.AREAS) || (this.designer.lastGroupTool.ga = "polygon", this.designer.setState(new mercator.GeneralAdmissionPolygonState(this.designer)))
    }
    toolShape() {
        switch (this._getTargetSubTool("shape", ["rectangle", "ellipse", "polygon"])) {
            default:
            case "rectangle":
                this.toolShapeRectangle();
                break;
            case "ellipse":
                this.toolShapeEllipse();
                break;
            case "polygon":
                this.toolShapePolygon()
        }
    }
    toolShapeRectangle() {
        this.designer.features.isDisabled(mercator.Features.Type.SHAPES) || (this.designer.lastGroupTool.shape = "rectangle", this.designer.setState(new mercator.ShapeState(this.designer, mercator.ShapedObjects.Rectangle)))
    }
    toolShapeEllipse() {
        this.designer.features.isDisabled(mercator.Features.Type.SHAPES) || (this.designer.lastGroupTool.shape = "ellipse", this.designer.setState(new mercator.ShapeState(this.designer, mercator.ShapedObjects.Circle)))
    }
    toolShapePolygon() {
        this.designer.features.isDisabled(mercator.Features.Type.SHAPES) || (this.designer.lastGroupTool.shape = "polygon", this.designer.setState(new mercator.ShapePolygonState(this.designer)))
    }
    toolTable() {
        switch (this._getTargetSubTool("table", ["rectangle", "round"])) {
            default:
            case "rectangle":
                this.toolTableRectangle();
                break;
            case "round":
                this.toolTableRound()
        }
    }
    toolTableRound() {
        this.designer.features.isDisabled(mercator.Features.Type.TABLES) || (this.designer.lastGroupTool.table = "round", this.designer.setState(new mercator.RoundTableDrawingState(this.designer)))
    }
    toolTableRectangle() {
        this.designer.features.isDisabled(mercator.Features.Type.TABLES) || (this.designer.lastGroupTool.table = "rectangle", this.designer.setState(new mercator.RectTableDrawingState(this.designer)))
    }
    toolBooth() {
        this.designer.features.isDisabled(mercator.Features.Type.BOOTHS) || this.designer.setState(new mercator.BoothsDrawingState(this.designer))
    }
    toolFocalPoint() {
        this.designer.features.isDisabled(mercator.Features.Type.FOCAL_POINT) || this.designer.setState(new mercator.FocalPointState(this.designer))
    }
    toolIcon() {
        this.designer.features.isDisabled(mercator.Features.Type.ICONS) || this.designer.setState(new mercator.IconDrawingState(this.designer))
    }
    toolHand() {
        this.designer.features.isDisabled(mercator.Features.Type.HAND) || this.designer.setState(new mercator.HandState(this.designer))
    }
    _getTargetSubTool(e, t) {
        let [s, i] = this.designer.getState().toolName.split("-"), a = this.designer.lastGroupTool[e];
        if (s === e && t.includes(i)) {
            let e = t.indexOf(a) + (this.designer.shiftWasPressed ? -1 : 1);
            e >= t.length ? e = 0 : e < 0 && (e = t.length - 1), a = t[e]
        }
        return a
    }
    actionFlipHorizontal() {
        this.designer.onFlipHorizontal()
    }
    actionFlipVertical() {
        this.designer.onFlipVertical()
    }
    actionDelete() {
        this.designer.onDelete()
    }
    actionDuplicate() {
        this.designer.onDuplicate()
    }
    actionCopy() {
        this.designer.onCopy()
    }
    actionPaste() {
        this.designer.onPaste()
    }
    actionNormalizeRows() {
        this.designer.state.onNormalizeRows()
    }
    actionStraighten() {
        this.designer.state.onStraighten()
    }
    actionEvenlySpace() {
        this.designer.state.onEvenlySpace()
    }
    actionAlignObjectsLeft() {
        this.uiStateUpdate({
            lastUsedObjectAlign: "align-objects-left"
        }), this.designer.state.onAlignObjectsHorizontally(mercator.Aligner.ALIGN_START)
    }
    actionAlignObjectsHorizontalCenter() {
        this.uiStateUpdate({
            lastUsedObjectAlign: "align-objects-horizontal-center"
        }), this.designer.state.onAlignObjectsHorizontally(mercator.Aligner.ALIGN_CENTER)
    }
    actionAlignObjectsRight() {
        this.uiStateUpdate({
            lastUsedObjectAlign: "align-objects-right"
        }), this.designer.state.onAlignObjectsHorizontally(mercator.Aligner.ALIGN_END)
    }
    actionAlignObjectsTop() {
        this.uiStateUpdate({
            lastUsedObjectAlign: "align-objects-top"
        }), this.designer.state.onAlignObjectsVertically(mercator.Aligner.ALIGN_START)
    }
    actionAlignObjectsVerticalCenter() {
        this.uiStateUpdate({
            lastUsedObjectAlign: "align-objects-vertical-center"
        }), this.designer.state.onAlignObjectsVertically(mercator.Aligner.ALIGN_CENTER)
    }
    actionAlignObjectsBottom() {
        this.uiStateUpdate({
            lastUsedObjectAlign: "align-objects-bottom"
        }), this.designer.state.onAlignObjectsVertically(mercator.Aligner.ALIGN_END)
    }
    actionSpaceObjectsVertically() {
        this.uiStateUpdate({
            lastUsedObjectAlign: "space-objects-vertically"
        }), this.designer.state.onSpaceObjectsVertically()
    }
    actionSpaceObjectsHorizontally() {
        this.uiStateUpdate({
            lastUsedObjectAlign: "space-objects-horizontally"
        }), this.designer.state.onSpaceObjectsHorizontally()
    }
    actionAlignCenter() {
        this.designer.state.onAlignRowsCenter()
    }
    actionAlignLeft() {
        this.designer.state.onAlignRowsLeft()
    }
    actionAlignRight() {
        this.designer.state.onAlignRowsRight()
    }
    enterSectionByUuid(e) {
        let t = this.designer.subChartFloors.allMasterSubCharts().reduce((t, s) => t || s.sections.findByUuid(e), null);
        this.designer.goToFloor(t.subChart.floorIndex()), this.designer.showSectionSubChart(t)
    }
    actionExitSectionContents() {
        this.designer.showMasterSubChart()
    }
    actionInvertObjectLabeling() {
        this.designer.selectedObjects().invertObjectLabeling(), this.designer.updateStats(), this.softShowLabels()
    }
    setRowLabelDisabled(e) {
        this.designer.selectedObjects().setRowLabelDisabled(e), this.designer.updateStats()
    }
    actionClearObjectLabeling() {
        this.designer.selectedObjects().clearObjectLabeling(), this.designer.updateStats(), this.softShowLabels()
    }
    actionClearSeatLabeling() {
        this.designer.selectedObjects().clearSeatLabeling(), this.designer.updateStats(), this.softShowLabels()
    }
    deleteCategory(e) {
        this.designer.categories.removeCategoryByKey(e)
    }
    createCategory() {
        return this.designer.categories.createCategory().key
    }
    toggleCategoryAccessible(e) {
        this.designer.categories.toggleAccessibleByKey(e)
    }
    setCategoryColor(e, t) {
        this.designer.categories.setColorByKey(e, t)
    }
    setCategoryName(e, t) {
        this.designer.categories.setNameByKey(e, t)
    }
    reorderCategory(e, t) {
        this.designer.categories.reorderCategory(e, t)
    }
    changeCategoryKey(e, t) {
        return this.designer.categories.changeKey(e, t)
    }
    setChartBackgroundImage(e) {
        this.designer.imageUploader.uploadChartBackgroundImage(e)
    }
    removeChartBackgroundImage(e) {
        this.designer.masterSubChart.backgroundImage.removeBackgroundImage(e)
    }
    setChartBackgroundScale(e) {
        this.designer.masterSubChart.backgroundImage.setScale(e)
    }
    setChartBackgroundVisibleToTicketBuyers(e) {
        this.designer.masterSubChart.backgroundImage.setShowOnRenderedCharts(e)
    }
    setReferenceChartImage(e, t) {
        this.designer.imageUploader.uploadReferenceChartImage(e, t)
    }
    removeReferenceChartImage(e) {
        this.designer.masterSubChart.referenceChart.removeBackgroundImage(e)
    }
    setReferenceChartScale(e) {
        this.designer.masterSubChart.referenceChart.setScale(e)
    }
    setReferenceChartVisible(e) {
        this.designer.masterSubChart.getReferenceChart().isSet() && this.designer.setReferenceChartVisible(e)
    }
    toggleReferenceChartVisible() {
        this.designer.masterSubChart.getReferenceChart().isSet() && this.designer.setReferenceChartVisible(!this.designer.referenceChartVisible)
    }
    setReferenceChartShowAbove(e) {
        this.designer.masterSubChart.getReferenceChart().isSet() && this.designer.setReferenceChartShowAbove(e)
    }
    setViewFromSeatsImage(e) {
        this.designer.imageUploader.uploadViewFromSeatImage(e, this.designer.selectedObjects())
    }
    removeViewFromSeatsImage() {
        this.designer.selectedObjects().removeViewFromSeats()
    }
    uploadAndPlaceImage(e, t) {
        let s = new Image;
        s.onload = (() => {
            this.designer.imageUploader.uploadImageObject(e, t || this.designer.zoomedCanvasCenter(), s.width, s.height)
        }), s.src = window.URL.createObjectURL(e)
    }
    setRowSpacing(e) {
        this.designer.setRowSpacing(e)
    }
    setRowChairSpacing(e) {
        this.designer.setRowChairSpacing(e)
    }
    setRowBlockStyle(e) {
        this.designer.setRowBlockStyle(e)
    }
    setVerticalRowLabelDirection(e) {
        this.designer.setVerticalRowLabelDirection(e)
    }
    previewSelectionLabelCaption(e) {
        this.designer.selectedObjects().previewLabel(e)
    }
    setSelectionLabelCaption(e) {
        this.designer.selectedObjects().setLabel(e)
    }
    setSelectionDisplayLabel(e) {
        this.designer.selectedObjects().setDisplayLabel(e)
    }
    setSelectionLabelSize(e) {
        this.designer.selectedObjects().setLabelSize(e)
    }
    setSelectionLabelVisible(e) {
        this.designer.selectedObjects().setLabelShown(e)
    }
    setSelectionLabelRotation(e) {
        this.designer.selectedObjects().setLabelRotationAngle(e)
    }
    setSelectionLabelPositionX(e) {
        this.designer.selectedObjects().setLabelHorizontalOffsetPerc(e)
    }
    setSelectionLabelPositionY(e) {
        this.designer.selectedObjects().setLabelVerticalOffsetPerc(e)
    }
    setSelectionCapacity(e) {
        this.designer.selectedObjects().setGACapacity(e)
    }
    setSelectionVariableOccupancy(e) {
        this.designer.selectedObjects().setSelectionVariableOccupancy(e)
    }
    setSelectionMinOccupancy(e) {
        this.designer.selectedObjects().setMinOccupancy(e)
    }
    setSelectionEntrance(e) {
        this.designer.selectedObjects().setSectionEntrances(e)
    }
    setSelectionBookAsAWhole(e) {
        this.designer.selectedObjects().setBookAsAWhole(e)
    }
    setSelectionCornerRadius(e) {
        this.designer.selectedObjects().setCornerRadius(e)
    }
    setSelectionStrokeWidth(e) {
        this.designer.selectedObjects().setStrokeWidth(e)
    }
    setSelectionAutoStroke(e) {
        this.designer.selectedObjects().setAutoStroke(e)
    }
    setSelectionStrokeColor(e) {
        this.designer.selectedObjects().setStrokeColor(e)
    }
    setSelectionFillColor(e) {
        this.designer.selectedObjects().setFillColor(e)
    }
    setSelectionTextCaption(e) {
        this.designer.selectedObjects().setTextCaption(e)
    }
    setSelectionTextSize(e) {
        this.designer.selectedObjects().setFontSize(e)
    }
    setSelectionTextColor(e) {
        this.designer.selectedObjects().setTextColor(e)
    }
    setTextBold(e) {
        this.designer.selectedObjects().setTextBold(e)
    }
    setTextItalic(e) {
        this.designer.selectedObjects().setTextItalic(e)
    }
    previewSelectionRowCurve(e) {
        this.designer.selectedObjects().doCurve(e, !0)
    }
    setSelectionRowCurve(e) {
        this.designer.selectedObjects().doCurve(e, !1)
    }
    setSelectionSmooth(e) {
        this.designer.selectedObjects().setSmooth(e)
    }
    previewSelectionSmoothness(e) {
        this.designer.selectedObjects().setSmoothness(e, !0)
    }
    setSelectionSmoothness(e) {
        this.designer.selectedObjects().setSmoothness(e, !1)
    }
    setSelectionRowSpacing(e) {
        this.designer.selectedObjects().setRowSpacing(e), this.setRowSpacing(e)
    }
    setSelectionRowChairSpacing(e) {
        this.designer.selectedObjects().setRowChairSpacing(e), this.setRowChairSpacing(e)
    }
    setSelectionRowSeatCount(e) {
        this.designer.selectedObjects().setRowSeatCount(e)
    }
    setSelectionTableChairs(e, t) {
        this.designer.selectedObjects() && this.designer.selectedObjects().setNumberOfChairs(e, t), this.designer.state.setChairs && this.designer.state.setChairs(e, t)
    }
    setSelectionTableOpenSpaces(e) {
        this.designer.selectedObjects().setNumberOfOpenSpaces(e)
    }
    setSelectionTableAutoRadius(e) {
        this.designer.selectedObjects().setAutoRadius(e)
    }
    setSelectionTableRadius(e) {
        this.designer.selectedObjects().setRadius(e)
    }
    setSelectionSize(e) {
        this.designer.selectedObjects() && this.designer.selectedObjects().setSize(e), this.designer.state.setSize && this.designer.state.setSize(e)
    }
    setSelectionIcon(e) {
        this.designer.selectedObjects() && this.designer.selectedObjects().setIcon(e), this.designer.state.setIcon && this.designer.state.setIcon(e)
    }
    setSelectionIconFillColor(e) {
        this.designer.selectedObjects() && this.designer.selectedObjects().setIconFillColor(e), this.designer.state.setIconFillColor && this.designer.state.setIconFillColor(e)
    }
    setSelectionWidth(e) {
        this.designer.selectedObjects() && this.designer.selectedObjects().setWidth(e), this.designer.state.setWidth && this.designer.state.setWidth(e)
    }
    setSelectionHeight(e) {
        this.designer.selectedObjects() && this.designer.selectedObjects().setHeight(e), this.designer.state.setHeight && this.designer.state.setHeight(e)
    }
    setSelectionScale(e) {
        this.designer.selectedObjects().setScale(e)
    }
    setSelectionOpacity(e) {
        this.designer.selectedObjects().setOpacity(e)
    }
    setSelectionRotationPreview(e) {
        this.designer.selectedObjects().setRotationAngle(e)
    }
    setSelectionForeground(e) {
        this.designer.selectedObjects().setForeground(e)
    }
    setSelectionRotation(e) {
        this.designer.selectedObjects().setRotationAngle(e), this.designer.selectedObjects().reselect()
    }
    setSectionScale(e) {
        this.designer.setSectionScaleFactor(e)
    }
    previewPolygonScale(e) {
        this.designer.selectedObjects() ? this.designer.selectedObjects().previewPolygonScale(e / 100, !0) : this.designer.masterSubChart.sections.applyScale(e / 100, !0), this.designer.getState().onPreviewChanges()
    }
    endPreviewPolygonScale() {
        this.designer.getState().onPreviewChangesEnd()
    }
    applyPolygonScale(e) {
        this.designer.selectedObjects() ? this.designer.selectedObjects().applyPolygonScale(e / 100, !0) : this.designer.masterSubChart.sections.applyScale(e / 100, !1)
    }
    previewCutoffAngleRate(e) {
        this.designer.selectedObjects().previewCutoffAngle(e), this.designer.getState().onPreviewChanges()
    }
    setCutoffAngleRate(e) {
        this.designer.selectedObjects().setCutoffAngle(e), this.designer.getState().onPreviewChangesEnd()
    }
    setSelectionCategory(e) {
        this.designer.categories.applyCategoryToItemsByKey(this.designer.getSelectedObjects(), e)
    }
    removeSelectionCategory() {
        this.designer.categories.removeCategoryToItems(this.designer.getSelectedObjects())
    }
    setSelectionObjectLabel(e) {
        this.designer.selectedObjects().setLabel(e), this.softShowLabels()
    }
    setSelectionObjectDisplayLabel(e) {
        this.designer.selectedObjects().setDisplayLabel(e), this.softShowLabels()
    }
    setSelectionRowLabelPositionLeft(e) {
        this.designer.selectedObjects().setRowLabelPositionLeft(e)
    }
    setSelectionRowLabelPositionRight(e) {
        this.designer.selectedObjects().setRowLabelPositionRight(e)
    }
    setSelectionRowDisplayObjectType(e) {
        mercator.Row.DISPLAY_OBJECT_TYPES.forEach(t => {
            e === d(t) && (e = t)
        }), this.designer.selectedObjects().setDisplayObjectType(e)
    }
    setSelectionSeatDisplayObjectType(e) {
        mercator.Chair.DISPLAY_OBJECT_TYPES.forEach(t => {
            e === d(t) && (e = t)
        }), this.designer.selectedObjects().setSeatDisplayObjectType(e)
    }
    previewSelectionObjectLabel(e) {
        this.designer.selectedObjects().previewLabel(e)
    }
    previewSelectionObjectDisplayLabel(e) {
        this.designer.selectedObjects().previewDisplayLabel(e)
    }
    setSelectionObjectLabelingSequence(e) {
        this.designer.selectedObjects().applyObjectLabeling(mercator.AutoLabeler.getAlgorithm(e), null, null), this.designer.updateStats(), this.softShowLabels()
    }
    setSelectionObjectLabelingPrefix(e, t = !1) {
        this.designer.selectedObjects().applyObjectLabeling(null, e, null, t), this.softShowLabels()
    }
    setSelectionSeatLabelingEndAt(e) {
        this.designer.selectedObjects().setSeatLabelingEndAt(e), this.softShowLabels()
    }
    setSelectionObjectLabelingStart(e, t = !1) {
        this.designer.selectedObjects().applyObjectLabeling(null, null, e, t), this.softShowLabels(), t && this.designer.updateDuplicateObjectsStats()
    }
    setSelectionSectionLabel(e, t = !1) {
        this.designer.selectedObjects().setSectionLabel(e, t), this.softShowLabels()
    }
    setSelectionSectionDisplayedLabel(e, t = !1) {
        this.designer.selectedObjects().setSectionDisplayedLabel(e, t), this.softShowLabels()
    }
    setSelectionObjectLabelingSkipCharacter(e, t) {
        this.designer.selectedObjects().setObjectLabelingSkipCharacter(e, t), this.designer.selectedObjects().applyObjectLabeling(null, null, null), this.softShowLabels()
    }
    setSelectionSeatLabelingSequence(e) {
        this.designer.selectedObjects().applySeatLabeling(e, null, null), this.softShowLabels()
    }
    setSelectionSeatLabelingStart(e, t = !1) {
        this.designer.selectedObjects().applySeatLabeling(null, e, null, t), this.softShowLabels(), t && this.designer.updateDuplicateObjectsStats()
    }
    setSelectionSeatLabelingInverted(e) {
        this.designer.selectedObjects().setSelectionSeatLabelingInverted(e), this.softShowLabels()
    }
    setSelectionRestrictedView(e) {
        this.designer.getState().selectedObjectsObject.setRestrictedView(e)
    }
    setAccessible(e) {
        this.designer.getState().selectedObjectsObject.setAccessible(e)
    }
    setCompanionSeat(e) {
        this.designer.getState().selectedObjectsObject.setCompanionSeat(e)
    }
    setDisabledBySocialDistancingRules(e) {
        this.designer.getState().selectedObjectsObject.setDisabledBySocialDistancingRules(e)
    }
    setSelectionSmartType(e) {
        this.designer.selectedObjects().setSelectionSmartType(e)
    }
    setSelectionSmartTypeVariation(e) {
        this.designer.selectedObjects().setSelectionSmartTypeVariation(e)
    }
    goToFloor(e) {
        this.designer.subChartFloors.currentFloor !== e && this.designer.goToFloor(e)
    }
    requestCreateFloor() {
        1 === this.designer.subChartFloors.length() ? this.designer.uiStateUpdate({
            modalDialog: "newFloor"
        }) : this.designer.createFloor(!0)
    }
    createFloor() {
        this.designer.createFloor(!0)
    }
    deleteFloor(e) {
        this.designer.deleteFloor(e)
    }
    showTooltip(e, t, s = !1) {
        if (this.uiStateUpdate({
            globalTooltipContents: e,
            globalTooltipVisible: !0
        }), t) {
            let e = t.target.getBoundingClientRect();
            s ? this.uiStateUpdate({
                globalTooltipPosition: {
                    right: window.innerWidth - e.left,
                    top: e.bottom
                }
            }) : this.uiStateUpdate({
                globalTooltipPosition: {
                    left: e.right,
                    top: e.bottom
                }
            })
        }
    }
    hideTooltip() {
        this.uiStateUpdate({
            globalTooltipVisible: !1
        })
    }
    toggleCapacityDetailsDialog() {
        this.toggleFloatingDialog("CapacityDetails")
    }
    toggleBoothDetailsDialog() {
        this.toggleFloatingDialog("BoothDetails")
    }
    toggleDuplicateObjectsDialog() {
        this.toggleFloatingDialog("DuplicateObjects") ? this.softShowLabels() : this.softShownLabels && (this.toolSelectCursor(), this.designer.hideLabels())
    }
    toggleUnlabeledObjectsDialog() {
        this.toggleFloatingDialog("UnlabeledObjects") ? this.softShowLabels() : this.softShownLabels && (this.toolSelectCursor(), this.designer.hideLabels())
    }
    toggleUncategorizedObjectsDialog() {
        this.toggleFloatingDialog("UncategorizedObjects")
    }
    toggleTypesByCategoryDialog() {
        this.toggleFloatingDialog("TypesByCategory")
    }
    toggleCategoriesInfoDialog() {
        this.toggleFloatingDialog("CategoriesInfo")
    }
    toggleImageObjectsDialog() {
        this.toggleFloatingDialog("ImageObjects")
    }
    togglePreviewDialog() {
        this.toggleFloatingDialog("Preview")
    }
    toggleColorScheme() {
        this.designer.toggleColorScheme()
    }
    showPreviewDialog() {
        this.showFloatingDialog("Preview")
    }
    showFloatingDialog(e) {
        return this.designer.uiStateUpdate({
            floatingDialog: e
        })
    }
    toggleFloatingDialog(e) {
        return this.designer.uiStateToggle("floatingDialog", e)
    }
    toggleFloatingPicker(e, t) {
        return t && this.designer.uiStateUpdate({
            floatingPickerProps: t
        }), this.designer.uiStateToggle("floatingPicker", e)
    }
    updateFloatingPickerProps(e) {
        return this.designer.uiStateUpdate({
            floatingPickerProps: e
        })
    }
    closeFloatingPicker() {
        return this.designer.uiStateUpdate({
            floatingPicker: null
        })
    }
    closeFloatingDialog() {
        this.uiStateUpdate({
            floatingDialog: null
        }), this.softShownLabels && this.toolSelectCursor()
    }
    goToSection(e) {
        if (e) {
            let t = this.designer.subChartFloors.allMasterSubCharts().reduce((t, s) => t || s.sections.findByUuid(e), null);
            return this.designer.goToFloor(t.subChart.floorIndex()), this.designer.showSectionSubChart(t), !0
        }
        return this.designer.atMasterSubChart() || this.designer.showMasterSubChart(), !1
    }
    goToSectionAndEditLabels(e) {
        this.goToSection(e) && this.softShowLabels()
    }
    zoomIn() {
        this.designer.zoomIn()
    }
    zoomOut() {
        this.designer.zoomOut()
    }
    pan(e, t) {
        this.designer.panner.panBy(e, t)
    }
    panToCenter() {
        this.designer.centerCanvasInViewport()
    }
    panRight() {
        this.pan(40, 0)
    }
    panLeft() {
        this.pan(-40, 0)
    }
    panUp() {
        this.pan(0, -40)
    }
    panDown() {
        this.pan(0, 40)
    }
    setCursor(e) {
        this.uiStateUpdate({
            cursor: e
        })
    }
    clearCursor() {
        this.uiStateUpdate({
            cursor: null
        })
    }
    selectWithSectionsVenueType() {
        this.designer.venueTypeSwitcher.initBlank("ROWS_WITH_SECTIONS"), this.openReferenceChartStartupDialog()
    }
    selectWithoutSectionsVenueType() {
        this.designer.venueTypeSwitcher.initBlank("MIXED"), this.openReferenceChartStartupDialog()
    }
    setMultiFloorView(e) {
        this.designer.setMultiFloorView(e)
    }
};

//LABELS
mercator.ObjectLabel = function (t) {
    this.parent = t, this.subChart = this.parent.subChart, this.designer = this.subChart.designer, this.visible = !0
}, mercator.ObjectLabel.prototype.verticallyOriented = function () {
    return this.parent.verticallyOriented()
}, mercator.ObjectLabel.prototype.iconAndLabelXSpacing = function (t) {
    return .5 * this.getFontSize()
}, mercator.ObjectLabel.prototype.iconAndLabelYSpacing = function (t) {
    return .2 * this.getFontSize()
}, mercator.ObjectLabel.prototype.applyRotation = function (t) {
    return t.rotateAround(this.parent.center(), this.parentRotationAngle()).rotateAround(this.parent.labelPosition(), this.labelRotationAngle())
}, mercator.ObjectLabel.prototype.determineIconObjectPosition = function () {
    let t = this.parent.labelPosition();
    if (this.canDrawLabel())
        if (this.verticallyOriented()) t = t.addToY(-(this.getFontSize() + this.iconAndLabelYSpacing()) / 2);
        else {
            let e = mercator.Bbox.fromView(this.labelElement.rbox(), this.designer);
            t = e.center().addToX(-e.width / 2 - (this.getIconFontSize() + this.iconAndLabelXSpacing()) / 2)
        } return this.applyRotation(t)
}, mercator.ObjectLabel.prototype.determineTextObjectPosition = function () {
    let t = this.parent.labelPosition();
    return this.canDrawIcon() && (t = this.verticallyOriented() ? t.addToY((this.getIconFontSize() + this.iconAndLabelYSpacing()) / 2) : t.addToX((this.getIconFontSize() + this.iconAndLabelXSpacing()) / 2)), t
}, mercator.ObjectLabel.prototype.getIconFontSize = function () {
    return this.parent.labelSize * this.parent.iconSizeMultiplier()
}, mercator.ObjectLabel.prototype.getFontSize = function () {
    return this.parent.labelSize
}, mercator.ObjectLabel.prototype.parentRotationAngle = function () {
    return this.parent.getShape().rotationAngle || 0
}, mercator.ObjectLabel.prototype.labelRotationAngle = function () {
    return this.parent.labelRotationAngle || 0
}, mercator.ObjectLabel.prototype.combinedRotationAngle = function () {
    return this.parentRotationAngle() + this.labelRotationAngle()
}, mercator.ObjectLabel.prototype.isBackgroundDark = function () {
    return new mercator.Color(this.parent.determineNonHighlightedColor()).brehaut().getLuminance() < .7
}, mercator.ObjectLabel.prototype.determineTextColor = function () {
    return this.parent.determineLabelColor()
}, mercator.ObjectLabel.prototype.canDrawLabel = function () {
    return !1 !== this.parent.labelShown && this.parent.getLabelText() && this.parent.getLabelText().length > 0
}, mercator.ObjectLabel.prototype.canDrawIcon = function () {
    return null !== this.parent.getLabelIcon()
}, mercator.ObjectLabel.prototype.displayLabel = function () {
    return this.canDrawLabel()
}, mercator.ObjectLabel.prototype.displayIconLabel = function () {
    return this.canDrawIcon()
}, mercator.ObjectLabel.prototype.redraw = function () {
    return this.subChart.isActive() && (this.redrawLabel(), this.redrawIconLabel(), this.postLabelDraw(), this.visible || this.hide()), this
}, mercator.ObjectLabel.prototype.redrawLabel = function () {
    if (this.labelElement && this.labelElement.remove(), this.displayLabel()) {
        var t = this.determineTextObjectPosition();
        this.labelElement = this.designer.drawer.text(t.x, t.y, whitespaceToNonBreakingSpaces(this.parent.getLabelText()), {
            "font-size": this.getFontSize(),
            "font-family": mercator.TextInput.defaultFontFamily,
            "font-weight": "bold",
            fill: this.determineTextColor()
        }).toLayer(this.getLayer(), this.designer, this.parent.zIndex).applyZoom(this.designer), this.labelElement.node.setAttribute("pointer-events", "none")
    }
}, mercator.ObjectLabel.prototype.applyElementAttributes = function () {
    this.labelElement && this.labelElement.attr({
        fill: this.determineTextColor()
    }), this.iconLabel && this.iconLabel.attr({
        fill: this.determineTextColor()
    })
}, mercator.ObjectLabel.prototype.postLabelDraw = function () {
    if (this.labelElement) {
        let t = this.applyRotation(this.determineTextObjectPosition());
        this.labelElement.attr({
            x: t.x,
            y: t.y
        }), this.labelElement.zoomAndRotateAround(this.combinedRotationAngle(), new mercator.Point(t.x, t.y), this.designer)
    }
}, mercator.ObjectLabel.prototype.redrawIconLabel = function () {
    if (this.iconLabel && this.iconLabel.remove(), this.displayIconLabel()) {
        var t = this.determineIconObjectPosition();
        this.iconLabel = this.designer.drawer.text(t.x, t.y, this.parent.getLabelIcon(), {
            "font-size": this.getIconFontSize(),
            "font-family": "seatsdesigner",
            fill: this.determineTextColor()
        }).toLayer(this.getLayer(), this.designer, this.parent.zIndex).zoomAndRotateAround(this.combinedRotationAngle(), new mercator.Point(t.x, t.y), this.designer), this.iconLabel.node.setAttribute("pointer-events", "none")
    }
}, mercator.ObjectLabel.prototype.getLayer = function () {
    return this.parent.getLayer ? this.parent.getLayer() : "textsLayer"
}, mercator.ObjectLabel.prototype.undraw = function () {
    this.labelElement && this.labelElement.remove(), this.iconLabel && this.iconLabel.remove()
}, mercator.ObjectLabel.prototype.show = function () {
    this.labelElement && this.labelElement.show(), this.iconLabel && this.iconLabel.show(), this.visible = !0
}, mercator.ObjectLabel.prototype.hide = function () {
    this.labelElement && this.labelElement.hide(), this.iconLabel && this.iconLabel.hide(), this.visible = !1
}, mercator.ObjectLabel.prototype.visibleElementsSet = function () {
    return [this.labelElement, this.iconLabel]
}, mercator.ObjectLabel.MAX_LABEL_SIZE = 500;

mercator.ObjectLabelSupport = function () { }, mercator.ObjectLabelSupport.prototype.init = function () {
    this.labelSize = mercator.ObjectLabelSupport.DEFAULT_LABEL_SIZE, this.labelHorizontalOffset = 0, this.labelVerticalOffset = 0, this.icon = null, this.objectLabel = new mercator.ObjectLabel(this)
}, mercator.ObjectLabelSupport.prototype.refreshLabel = function () {
    this.redrawLabel()
}, mercator.ObjectLabelSupport.prototype.redrawLabel = function () {
    this.objectLabel.redraw()
}, mercator.ObjectLabelSupport.prototype.iconSizeMultiplier = function () {
    return 1
}, mercator.ObjectLabelSupport.prototype.changeLabel = function (t) {
    this.label !== t && (t && (t = t.trim()), this.label = t)
}, mercator.ObjectLabelSupport.prototype.setIcon = function (t) {
    this.icon !== t && (this.icon = t, this.objectLabel.redraw())
}, mercator.ObjectLabelSupport.prototype.changeDisplayLabel = function (t) {
    t !== this.label && t ? this.displayLabel = t : this.displayLabel = null, this.objectLabel.redraw()
}, mercator.ObjectLabelSupport.prototype.setLabelSize = function (t) {
    this.labelSize !== t && (this.labelSize = t, this.objectLabel.redraw())
}, mercator.ObjectLabelSupport.prototype.showLabel = function () {
    this.objectLabel.show()
}, mercator.ObjectLabelSupport.prototype.hideLabel = function () {
    this.objectLabel.hide()
}, mercator.ObjectLabelSupport.prototype.setLabelHorizontalOffset = function (t) {
    this.labelHorizontalOffset !== t && (this.labelHorizontalOffset = t, this.objectLabel.redraw())
}, mercator.ObjectLabelSupport.prototype.setLabelVerticalOffset = function (t) {
    this.labelVerticalOffset !== t && (this.labelVerticalOffset = t, this.objectLabel.redraw())
}, mercator.ObjectLabelSupport.prototype.setLabelHorizontalOffsetPerc = function (t) {
    let e = Math.round(t / 100 * this.bbox().width);
    this.labelHorizontalOffset !== e && (this.labelHorizontalOffset = e, this.objectLabel.redraw())
}, mercator.ObjectLabelSupport.prototype.setLabelVerticalOffsetPerc = function (t) {
    let e = Math.round(t / 100 * this.bbox().height);
    this.labelVerticalOffset !== e && (this.labelVerticalOffset = e, this.objectLabel.redraw())
}, mercator.ObjectLabelSupport.prototype.labelPosition = function () {
    return this.center().addToX(this.labelHorizontalOffset).addToY(this.labelVerticalOffset)
}, mercator.ObjectLabelSupport.prototype.getLabelIcon = function () {
    return this.icon ? seatsUnicode(this.icon) : this.isAccessible() ? seatsUnicode("wheelchair") : null
}, mercator.ObjectLabelSupport.prototype.applyElementAttributes = function () {
    mercator.Object.prototype.applyElementAttributes.call(this), this.objectLabel.applyElementAttributes()
}, mercator.ObjectLabelSupport.DEFAULT_LABEL_SIZE = 12;

//POLIGONOS
mercator.PolygonSupport = function () { }, mercator.PolygonSupport.getPoints = function () {
    return this.getShape().points
}, mercator.PolygonSupport.showNodes = function () {
    this.showingNodes || (this.showingNodes = !0, this.getShape().makePointsMovable(), this.showNodesSides())
}, mercator.PolygonSupport.hideNodes = function () {
    this.showingNodes && (this.showingNodes = !1, this.getShape().makePointsNotMovable(), this.hideNodesSides())
}, mercator.PolygonSupport.refreshNodes = function () {
    this.showingNodes && (this.hideNodes(), this.showNodes())
}, mercator.PolygonSupport.showNodePlaceholders = function () {
    this.showingNodePlaceholders = !0, this.getShape().showNodePlaceholders()
}, mercator.PolygonSupport.hideNodePlaceholders = function () {
    this.showingNodePlaceholders = !1, this.getShape().hideNodePlaceholders()
}, mercator.PolygonSupport.refreshNodePlaceholders = function () {
    this.showingNodePlaceholders && (this.hideNodePlaceholders(), this.showNodePlaceholders())
}, mercator.PolygonSupport.showNodesSides = function () {
    this.sides || (this.sides = this.getPoints().map((e, t) => {
        let o = this.getPoints()[t + 1] || this.getPoints()[0],
            s = new mercator.PolygonSide(this, e, o);
        return s.show(), s
    }))
}, mercator.PolygonSupport.hideNodesSides = function () {
    this.sides && (this.sides.forEach(e => e.hide()), this.sides = null)
}, mercator.PolygonSupport.refreshNodesSides = function () {
    this.sides && (this.hideNodesSides(), this.showNodesSides())
}, mercator.PolygonSupport.showStrokeSelector = function () {
    this.hideStrokeSelector(), this.strokeSelector = this.designer.drawer.path(this.pathString(), {
        stroke: "#0784fa",
        "stroke-width": this.designer.zoomer.unzoom(12),
        opacity: 0,
        cursor: "pointer"
    }).toLayer("transformationHandlesLayer", this.designer).applyZoom(this.designer), this.strokeSelectorOutline = this.designer.drawer.path(this.pathString(), {
        stroke: "#0784fa",
        "stroke-width": this.designer.zoomer.unzoom(2),
        opacity: 0
    }).toLayer("transformationHandlesLayer", this.designer).applyZoom(this.designer), this.strokeSelectorOutline.node.setAttribute("pointer-events", "none"), this.strokeSelector.node.onclick = (() => this.designer.setState(new mercator.PolygonSelectedState(this.designer, [this]))), this.strokeSelector.node.onmousedown = (e => {
        e.stopPropagation(), this.strokeSelectorOutline.attr({
            stroke: "#005cc5"
        })
    }), this.strokeSelector.node.onmouseup = (() => this.strokeSelectorOutline.attr({
        stroke: "#0784fa"
    })), this.strokeSelector.node.onmouseover = (() => {
        this.showStrokeSelectorTimeout = setTimeout(() => {
            this.strokeSelectorOutline && this.strokeSelectorOutline.attr({
                opacity: 1
            }), this.showNodePlaceholders(), this.showStrokeSelectorTimeout = null
        }, 50), this.showHUD()
    }), this.strokeSelector.node.onmouseout = (() => {
        this.strokeSelectorOutline && this.strokeSelectorOutline.attr({
            stroke: "#0784fa",
            opacity: 0
        }), this.hideNodePlaceholders(), this.showStrokeSelectorTimeout && clearTimeout(this.showStrokeSelectorTimeout)
    })
}, mercator.PolygonSupport.hideStrokeSelector = function () {
    this.strokeSelector && (this.strokeSelector.remove(), this.strokeSelector = null), this.strokeSelectorOutline && (this.strokeSelectorOutline.remove(), this.strokeSelectorOutline = null)
}, mercator.PolygonSupport.refreshStrokeSelector = function () {
    (this.strokeSelector || this.strokeSelectorOutline) && this.showStrokeSelector()
}, mercator.PolygonSupport.addPoint = function (e, t) {
    let o = this.getShape().addPoint(e, t);
    return this.redraw(), this.sides && this.refreshNodesSides(), o
}, mercator.PolygonSupport.removePoint = function (e) {
    this.getShape().removePoint(e) && (e.unhighlight(), this.redraw(), this.sides && this.refreshNodesSides())
}, mercator.PolygonSupport.pathString = function () {
    return this.getShape().pathString()
}, mercator.PolygonSupport.hideOverlays = function () {
    this.strokeSelector && this.strokeSelectorOutline && (this.overlaysHidden = !0, this.hideStrokeSelector())
}, mercator.PolygonSupport.restoreOverlays = function () {
    this.overlaysHidden && (this.showStrokeSelector(), this.overlaysHidden = !1)
};
mercator.PolygonSideDragHandle = class {
    constructor(e) {
        this.side = e, this.designer = this.side.designer, this.arrowSize = 11, this.interactionSize = 9, this.elements = [], this.hovered = !1
    }
    getCenter() {
        return this.side.asRay().middle()
    }
    getAngle() {
        return this.side.asRay().angle()
    }
    isCursorHovering(e) {
        return !this.designer.altWasPressed && this.getCenter().distanceToPoint(e) < this.designer.zoomer.unzoom(this.interactionSize)
    }
    hover() {
        this.hovered || (this.hovered = !0, this.redraw())
    }
    unhover() {
        this.hovered && (this.hovered = !1, this.redraw())
    }
    redraw() {
        this.hide(), this.show()
    }
    show() {
        if (this.elements.length > 0) return;
        const e = this.getArrowPath(this.arrowSize + (this.hovered ? 2 : 0));
        this.elements = [this.drawTriangle(e), this.drawTriangle(e, 180)]
    }
    getArrowPath(e) {
        return [new mercator.Point(-e / 2, 0), new mercator.Point(0, e / 2), new mercator.Point(e / 2, 0), new mercator.Point(-e / 2, 0)]
    }
    drawTriangle(e, t = 0) {
        const s = this.getCenter(),
            i = this.designer.zoomer.unzoom(this.hovered ? 5 : 3);
        e = e.map(e => s.add(e).addToY(i)).map(e => e.rotateAround(s, this.getAngle() + t));
        const o = this.designer.drawLineFromPointToPoint(e).applyZoomButKeepSize(this.designer).toLayer("nodesLayer", this.designer).attr({
            stroke: "white",
            fill: mercator.PolygonDrawingSnapper.snapColors.default,
            "stroke-width": 1
        });
        return o.node.setAttribute("pointer-events", "none"), o
    }
    hide() {
        this.elements.length > 0 && (this.elements.forEach(e => e.remove()), this.elements = [])
    }
}, mercator.PolygonSide = class {
    constructor(e, t, s) {
        this.parent = e, this.designer = e.designer, this.startCorner = t, this.endCorner = s, this.nodeSize = 5, this.hovered = !1, this.snapper = new mercator.PolygonDrawingSnapper(this.designer), this.dragHandle = new mercator.PolygonSideDragHandle(this), this.sideDragMove = this.sideDragMove.bind(this), this.sideDragEnd = this.sideDragEnd.bind(this)
    }
    refreshAltToggle() {
        this.hovered && (this.updateOnMouseMove(), this.designer.altWasPressed ? this.dragHandle.hide() : this.dragHandle.show())
    }
    draw() {
        this.shapeElement = this.designer.drawLineBetweenPoints(this.startCorner.point, this.endCorner.point).toLayer("transformationHandlesLayer", this.designer, this.parent.zIndex).attr({
            stroke: "black",
            "stroke-width": this.designer.zoomer.unzoom(12),
            opacity: 0
        }), this.shapeElement.node.onmousedown = (e => {
            if (0 !== e.button) return;
            if (this.dragHandle.isCursorHovering(this.getPointOnSegmentFromEvent(e))) return void this.sideDragStart(e);
            this.hidePlaceholderNode(), this.dragHandle.hide();
            let t = this.getPointOnSegmentFromEvent(e);
            this.parent.addPoint(t, this.parent.getPoints().indexOf(this.endCorner)).makeMovable()
        }), this.shapeElement.node.onmouseover = (e => {
            this.hovered = !0, this.dragging || (this.designer.altWasPressed || this.dragHandle.show(), this.designer.setCursor("node-on"), this.showPlaceholderNode(this.getPointOnSegmentFromEvent(e)))
        }), this.shapeElement.node.onmousemove = (e => {
            this.dragging || this.onMouseMove(this.getPointOnSegmentFromEvent(e))
        }), this.shapeElement.node.onmouseout = (e => {
            this.hovered = !1, this.dragging || (this.dragHandle.hide(), this.designer.setCursorToDefault(), this.hidePlaceholderNode())
        })
    }
    sideDragStart(e) {
        this.designer.setCursor("grabbing"), this.designer.getState().onPolygonSideDragStarted(this, mercator.Point.fromEvent(e, this.designer)), this.dragging = !0, this.sideDragStartPosition = this.getPointOnSegmentFromEvent(e), window.addEventListener("mousemove", this.sideDragMove), window.addEventListener("mouseup", this.sideDragEnd), this.dragHandle.hide()
    }
    sideDragMove(e) {
        const t = mercator.Point.fromEvent(e, this.designer);
        this.designer.getState().onPolygonSideDragged(this, t)
    }
    sideDragEnd() {
        this.designer.setCursor("node-off"), this.dragging = !1, window.removeEventListener("mousemove", this.sideDragMove), window.removeEventListener("mouseup", this.sideDragEnd), this.designer.getState().onPolygonSideDragEnded(this), this.designer.reselect()
    }
    moveTo(e) {
        const t = this.snapper.snap(null, e, []).snapPoint,
            s = this.asRay().enlargeOnBothSides(1e4).distanceToPoint(t),
            i = this.asRay().angle() + 90 * this.calculateDirection(t),
            o = this.startCorner.point,
            n = this.endCorner.point;
        this.startCorner.moveTo(this.calculateNewCornerPosition(this.startCorner, i, s)), this.endCorner.moveTo(this.calculateNewCornerPosition(this.endCorner, i, s)), this.parent.shape.isAreaLargeEnough() ? this.parent.redraw() : (this.startCorner.moveTo(o), this.endCorner.moveTo(n), this.parent.redraw())
    }
    calculateNewCornerPosition(e, t, s) {
        return new mercator.RayFromOriginAndAngle(e.point, t).pointAtDistanceFromPoint(s, e.point)
    }
    calculateDirection(e) {
        let t = new mercator.Angle(this.asRay().angleBetween(new mercator.Ray(this.startCorner.point, e)));
        return t.isQ1() || t.isQ2() ? -1 : 1
    }
    asRay() {
        return new mercator.Ray(this.startCorner.point, this.endCorner.point)
    }
    show() {
        this.shapeElement || this.draw()
    }
    hide() {
        this.hidePlaceholderNode(), this.shapeElement && (this.shapeElement.remove(), this.shapeElement = null), this.dragHandle.hide()
    }
    getPointOnSegmentFromEvent(e) {
        let t = mercator.Point.fromEvent(e, this.designer);
        return this.getPointOnSegment(t)
    }
    getPointOnSegment(e) {
        return mercator.Point.getClosestPointOnLines(e, [this.startCorner.point, this.endCorner.point])
    }
    showPlaceholderNode(e) {
        this.hidePlaceholderNode(), this.placeholderNode = this.designer.drawer.rect(e.x - this.nodeSize / 2, e.y - this.nodeSize / 2, 0, 0, 0, {
            width: this.nodeSize,
            height: this.nodeSize,
            fill: "white",
            stroke: mercator.PolygonDrawingSnapper.snapColors.default,
            "stroke-width": 1.25
        }).applyZoomButKeepSize(this.designer), this.placeholderNode.node.setAttribute("pointer-events", "none")
    }
    onMouseMove(e) {
        this.lastCursorPoint = e, this.updateOnMouseMove()
    }
    updateOnMouseMove() {
        this.lastCursorPoint && (this.dragHandle.isCursorHovering(this.lastCursorPoint) ? (this.designer.setCursor("grab"), this.dragHandle.hover(), this.hidePlaceholderNode()) : (this.designer.setCursor("node-on"), this.dragHandle.unhover(), this.placeholderNode ? this.updatePlaceholderNode(this.lastCursorPoint) : this.showPlaceholderNode(this.lastCursorPoint)))
    }
    updatePlaceholderNode(e) {
        this.placeholderNode.attr({
            x: e.x - this.nodeSize / 2,
            y: e.y - this.nodeSize / 2
        }).applyZoomButKeepSize(this.designer)
    }
    hidePlaceholderNode() {
        this.placeholderNode && (this.placeholderNode.remove(), this.placeholderNode = null)
    }
};
mercator.OverlayIcon = class {
    constructor(e) {
        this.parent = e, this.subChart = this.parent.subChart, this.designer = this.subChart.designer, this.label = null, this.icon = mercator.OverlayIcon.MISSING_ICON_PLACEHOLDER, this.preset = "normal", this.onClickCallback = null, this.isHUDShown = !1
    }
    setLabel(e) {
        this.label = e, this.setElement && this.applyProperties()
    }
    setIcon(e, t, i, s) {
        e = seatsUnicode(e) || mercator.OverlayIcon.MISSING_ICON_PLACEHOLDER, this.icon = e, this.preset = t, this.onClickCallback = i, void 0 !== s && (this.label = s), this.setElement ? this.applyStyling(!0) : this.draw()
    }
    showIcon(e, t, i, s) {
        this.setIcon(e, t, i, s), this.show()
    }
    onMouseDown(e) {
        e.stopPropagation(), new SVG.Runner(100).element(this.surfaceElement).attr({
            r: .95 * this.getStyle().surface.r
        }).ease(SVG.easing.bezier(.19, 1, .22, 1)).finish()
    }
    onMouseUp(e) {
        e.stopPropagation(), new SVG.Runner(300).element(this.surfaceElement).attr({
            r: this.getStyle().surface.r
        }).ease(SVG.easing.bezier(.44, 2.16, .47, .74)).finish()
    }
    onMouseOver(e) {
        this.isHUDShown || (this.isHUDShown = !0, new SVG.Runner(200).element(this.surfaceElement).attr({
            r: 1.08 * this.getStyle().surface.r
        }).ease(SVG.easing.bezier(.44, 2.16, .47, .74)).finish())
    }
    onMouseOut(e) {
        this.isHUDShown && (this.parent.selector && e.toElement !== this.parent.selector.selectionRectangle && this.designer.getState().onObjectMouseOut(this.parent, e), this.isHUDShown = !1, new SVG.Runner(300).element(this.surfaceElement).attr({
            r: this.getStyle().surface.r
        }).ease(SVG.easing.bezier(.44, 2.16, .47, .74)).finish())
    }
    onClick(e) {
        e.stopPropagation(), this.onClickCallback(e)
    }
    determineObjectPosition() {
        return this.parent.centroid(this.designer.zoomer.unzoom(20))
    }
    draw() {
        this.setElement || (this.setElement = mercator.set()), this.surfaceElement = this.designer.drawer.circle(0, 0, 0, {}).toLayer("overlayIconsLayer", this.designer, this.parent.zIndex).applyZoom(this.designer), this.iconElement = this.designer.drawer.text(0, 0, "", {}).toLayer("overlayIconsLayer", this.designer, this.parent.zIndex).applyZoom(this.designer), this.iconElement.node.setAttribute("pointer-events", "none"), this.labelElement = this.designer.drawer.text(0, 0, "", {}).toLayer("overlayIconsLayer", this.designer, this.parent.zIndex).applyZoom(this.designer), this.labelElement.node.setAttribute("pointer-events", "none"), this.forChair() ? this.setElement.push(this.surfaceElement, this.iconElement) : this.setElement.push(this.surfaceElement, this.iconElement, this.labelElement), this.surfaceElement.node.onmouseover = this.onMouseOver.bind(this), this.surfaceElement.node.onmouseout = this.onMouseOut.bind(this), this.surfaceElement.node.onmousedown = this.onMouseDown.bind(this), this.surfaceElement.node.onmouseup = this.onMouseUp.bind(this), this.surfaceElement.node.onclick = this.onClick.bind(this), this.applyStyling(!0), this.visible ? this.show() : this.hide()
    }
    applyProperties() {
        this.iconElement.node.textContent = this.getIconElementText(), this.labelElement.node.textContent = this.getLabelElementText()
    }
    getIconElementText() {
        return this.icon
    }
    getLabelElementText() {
        return this.label
    }
    applyStyling(e = !1) {
        let t = this.determineObjectPosition(),
            i = this.getStyle();
        this.surfaceElement.attr(Object.assign({
            cx: t.x,
            cy: this.forChair() ? t.y : t.y - this.applyScale(10),
            r: i.surface.r,
            "stroke-width": i.surface["stroke-width"],
            cursor: "pointer"
        }, i.surface)), this.iconElement.attr({
            x: t.x,
            y: this.forChair() ? t.y : t.y - this.applyScale(10),
            "font-size": i.icon["font-size"],
            cursor: "pointer",
            "font-family": "seatsdesigner",
            fill: i.icon.fill
        }), e && this.iconElement.node && (this.iconElement.node.textContent = this.getIconElementText()), this.forChair() || (this.labelElement.attr({
            x: t.x,
            y: t.y + this.applyScale(10),
            "font-size": i.label["font-size"],
            "font-family": mercator.TextInput.defaultFontFamily,
            fill: i.label.fill
        }), e && this.labelElement.node && (this.labelElement.node.textContent = this.getLabelElementText()))
    }
    forChair() {
        return "chair-highlight" === this.preset
    }
    undraw() {
        this.setElement && this.setElement.remove()
    }
    redraw() {
        this.setElement && this.setElement.clear(), this.draw()
    }
    applyScale(e) {
        return this.designer.zoomer.unzoom(e)
    }
    applyZoom() {
        this.applyStyling()
    }
    show() {
        this.visible = !0, this.setElement && this.setElement.show()
    }
    hide() {
        this.visible = !1, this.setElement && this.setElement.hide()
    }
    visibleElementsSet() {
        return [this.setElement]
    }
    getSurfaceNode() {
        return this.surfaceElement.node
    }
    isBackgroundLight() {
        return new mercator.Color(this.parent.determineNonHighlightedColor()).isLight()
    }
    getStyle() {
        switch (this.preset) {
            case "highlight":
                return {
                    surface: {
                        r: this.applyScale(11),
                        fill: "white",
                        "fill-opacity": 1,
                        stroke: "black",
                        "stroke-width": this.applyScale(.5),
                        "stroke-opacity": .2
                    }, icon: {
                        fill: "rgba(0, 0, 0, 1)",
                        "font-size": this.applyScale(12)
                    }, label: {
                        fill: this.isBackgroundLight() ? "rgba(0, 0, 0, .8)" : "rgba(255, 255, 255, .8)",
                        "font-size": this.applyScale(8)
                    }
                };
            case "blur":
                return {
                    surface: {
                        r: this.applyScale(11),
                        fill: "white",
                        "fill-opacity": .35,
                        stroke: "black",
                        "stroke-width": this.applyScale(.5),
                        "stroke-opacity": .1
                    }, icon: {
                        fill: "rgba(50, 50, 50, 0.4)",
                        "font-size": this.applyScale(12)
                    }, label: {
                        fill: this.isBackgroundLight() ? "rgba(0, 0, 0, .6)" : "rgba(255, 255, 255, .6)",
                        "font-size": this.applyScale(8)
                    }
                };
            case "chair-highlight":
                return {
                    surface: {
                        r: 8,
                        fill: "white",
                        "fill-opacity": 1,
                        stroke: "black",
                        "stroke-width": 1,
                        "stroke-opacity": 1
                    }, icon: {
                        fill: "rgba(0, 0, 0, 1)",
                        "font-size": 11
                    }
                };
            default:
                return {
                    surface: {
                        r: this.applyScale(11),
                        fill: "white",
                        "fill-opacity": 1,
                        stroke: "black",
                        "stroke-width": this.applyScale(.5),
                        "stroke-opacity": .2
                    }, icon: {
                        fill: "rgba(0, 0, 0, 1)",
                        "font-size": this.applyScale(12)
                    }, label: {
                        fill: this.isBackgroundLight() ? "rgba(0, 0, 0, .8)" : "rgba(255, 255, 255, .8)",
                        "font-size": this.applyScale(8)
                    }
                }
        }
    }
}, mercator.OverlayIcon.MISSING_ICON_PLACEHOLDER = "✻";
mercator.PositionGuidesSupport = function () { }, mercator.PositionGuidesSupport.prototype.drawPositionGuides = function (o) {
    return this.undrawPositionGuides(), this.positionGuides = mercator.PositionGuidesSupport.drawPositionGuides(this.designer, this.getPositionGuides(), o), this
}, mercator.PositionGuidesSupport.drawPositionGuidesFromBBox = function (o, i) {
    let t = mercator.PositionGuidesSupport.prototype.getPositionGuidesForRect(i, o);
    return mercator.PositionGuidesSupport.drawPositionGuides(o, t)
}, mercator.PositionGuidesSupport.drawRowPositionGuidesFromRay = function (o, i, t) {
    let e = mercator.PositionGuidesSupport.prototype.getPositionGuidesForRow(o, i, 0, t);
    return mercator.PositionGuidesSupport.drawPositionGuides(o, e)
}, mercator.PositionGuidesSupport.drawRowPositionGuidesFromMultiRay = function (o, i, t) {
    let e = mercator.PositionGuidesSupport.prototype.getPositionGuidesForSegmentedRow(o, i, t);
    return mercator.PositionGuidesSupport.drawPositionGuides(o, e)
}, mercator.PositionGuidesSupport.drawRowPositionGuidesFromPoint = function (o, i) {
    let t = mercator.PositionGuidesSupport.prototype.getPositionGuidesForPoint(o, i);
    return mercator.PositionGuidesSupport.drawPositionGuides(o, t)
}, mercator.PositionGuidesSupport.drawPositionGuides = function (o, i, t = !1) {
    let e = mercator.set();
    return i.forEach(i => {
        let s = i.ray,
            r = mercator.PositionGuidesSupport.GUIDE_COLORS[i.color] || mercator.PositionGuidesSupport.GUIDE_COLORS.blue,
            n = i.opacity || 1;
        if (i.circles) {
            if (t) return;
            let i = o.zoomer.unzoom(100),
                a = s.revert().enlarge(i),
                d = s.enlarge(i),
                u = {
                    stroke: r,
                    fill: "none",
                    opacity: n
                },
                p = mercator.Row.drawShapes(a.origin, a.end, o);
            p.forEach(o => o.attr(u));
            let l = mercator.Row.drawShapes(d.origin, d.end, o);
            l.forEach(o => o.attr(u)), e.push(p, l)
        } else {
            i.segment || (s = s.enlargeOnBothSides(o.zoomer.unzoom(1200)));
            let t = o.drawLine(s.origin.x, s.origin.y, s.end.x, s.end.y).attr({
                opacity: n,
                stroke: r,
                "stroke-dasharray": i.dasharray,
                "stroke-width": o.zoomer.unzoom(i.width || 1.5)
            });
            t.node.setAttribute("pointer-events", "none"), e.push(t)
        }
    }), e.toLayer("guides", o).applyZoom(o), e
}, mercator.PositionGuidesSupport.prototype.getPositionGuides = function () {
    return []
}, mercator.PositionGuidesSupport.prototype.undrawPositionGuides = function () {
    return this.positionGuides && (this.positionGuides.forEach(o => o.remove()), this.positionGuides.clear()), this
}, mercator.PositionGuidesSupport.prototype.positionGuideBBox = function () {
    return this.bbox()
}, mercator.PositionGuidesSupport.prototype.positionGuideRay = function () {
    return new mercator.Ray(this.center(), this.center())
}, mercator.PositionGuidesSupport.prototype.getPositionGuidesForRect = function (o, i) {
    void 0 === o && (o = this.positionGuideBBox());
    const t = "light" !== (i = i || this.designer).getCanvasColorScheme() ? .4 : .2;
    return [{
        ray: new mercator.Ray(o.topLeft(), o.topRight()),
        color: "blue",
        width: 1,
        opacity: t
    }, {
        ray: new mercator.Ray(o.bottomLeft(), o.bottomRight()),
        color: "blue",
        width: 1,
        opacity: t
    }, {
        ray: new mercator.Ray(o.topLeft(), o.bottomLeft()),
        color: "blue",
        width: 1,
        opacity: t
    }, {
        ray: new mercator.Ray(o.topRight(), o.bottomRight()),
        color: "blue",
        width: 1,
        opacity: t
    }, {
        ray: new mercator.Ray(o.middleLeft(), o.middleRight()),
        color: "magenta",
        width: 1,
        opacity: t
    }, {
        ray: new mercator.Ray(o.topMiddle(), o.bottomMiddle()),
        color: "magenta",
        width: 1,
        opacity: t
    }]
}, mercator.PositionGuidesSupport.prototype.getPositionGuidesForRow = function (o, i, t, e) {
    void 0 === i && (i = this.positionGuideRay()), void 0 !== t || this.curveGhostPointsSet() || (t = this.chairs.length);
    const s = "light" !== o.getCanvasColorScheme;
    let r = [{
        ray: i,
        color: "angle" === e ? "gold" : "axis" === e ? "green" : "magenta",
        width: 1,
        opacity: e ? 1 : s ? .6 : .3
    }, {
        ray: new mercator.Ray(i.origin, i.end.rotateAround(i.origin, 90)),
        color: "blue",
        width: 1,
        opacity: s ? .4 : .2
    }, {
        ray: new mercator.Ray(i.end, i.origin.rotateAround(i.end, 90)),
        color: "blue",
        width: 1,
        opacity: s ? .4 : .2
    }];
    return t && r.push({
        ray: i,
        color: "blue",
        circles: t,
        opacity: s ? .7 : .4
    }), r
}, mercator.PositionGuidesSupport.prototype.getPositionGuidesForSegmentedRow = function (o, i, t) {
    void 0 === i && (i = this.positionGuideRay());
    const e = "light" !== o.getCanvasColorScheme,
        s = "angle" === t,
        r = "axis" === t;
    return [{
        ray: i.first(),
        color: "magenta",
        width: 1,
        opacity: e ? .6 : .3
    }, {
        ray: i.last(),
        color: s ? "gold" : r ? "green" : "magenta",
        width: 1,
        opacity: t ? 1 : e ? .6 : .3
    }, {
        ray: new mercator.Ray(i.first().origin, i.first().end.rotateAround(i.first().origin, 90)),
        color: "blue",
        width: 1,
        opacity: e ? .4 : .2
    }, {
        ray: new mercator.Ray(i.last().end, i.last().origin.rotateAround(i.last().end, 90)),
        color: "blue",
        width: 1,
        opacity: e ? .4 : .2
    }]
}, mercator.PositionGuidesSupport.prototype.getPositionGuidesForPoint = function (o, i, t, e, s = null) {
    void 0 === o && (o = this.designer), void 0 === i && (i = this.point);
    let r = o.zoomer.unzoom(1200);
    if (["firstCorner", "closestCorner"].includes(t)) return [];
    let n = ["verticallyAligned", "rayAlignedAndVertical"].includes(t),
        a = ["horizontallyAligned", "rayAlignedAndHorizontal"].includes(t),
        d = [{
            ray: new mercator.Ray(i.addToY(-r), i.addToY(r)),
            color: n ? "green" : "blue",
            width: 1,
            opacity: n ? 1 : .5
        }, {
            ray: new mercator.Ray(i.addToX(-r), i.addToX(r)),
            color: a ? "green" : "blue",
            width: 1,
            opacity: a ? 1 : .5
        }];
    return e && d.push({
        ray: e,
        color: "magenta",
        width: 2,
        opacity: 1,
        segment: !0
    }, {
        ray: e,
        color: "magenta",
        width: 1,
        opacity: 1
    }), s && d.push({
        ray: s,
        color: "magenta",
        width: 2,
        opacity: 1,
        segment: !0
    }, {
        ray: s,
        color: "magenta",
        width: 1,
        opacity: 1
    }), d
}, mercator.PositionGuidesSupport.GUIDE_COLORS = {
    blue: "rgb(0, 136, 255)",
    magenta: "#FF0070",
    gold: "#FFA700",
    grey: "rgb(60, 60, 60)",
    green: "#9DE329"
};
mercator.PositionGuidesSet = class {
    constructor(e, t) {
        this.designer = e, this.guides = t, this.elementSet = mercator.set()
    }
    set() {
        return this.elementSet
    }
    getGuides() {
        return "function" == typeof this.guides ? this.guides() : this.guides || []
    }
    draw(e) {
        return void 0 !== this.simple && (this.simple = e), this.undraw(), this.elementSet = mercator.PositionGuidesSupport.drawPositionGuides(this.designer, this.getGuides(), this.simple), this
    }
    refresh(e) {
        return this.guides = e, this.draw(), this
    }
    undraw() {
        return this.elementSet.forEach(e => e.remove()), this.elementSet.clear(), this
    }
};
mercator.Features = function (e) {
    this.designer = e, this.modifiers = []
}, mercator.Features.prototype.withModifier = function (e) {
    return this.modifiers.push(e), this
}, mercator.Features.prototype.isEnabled = function (e) {
    var s = this.getStatus(e);
    return s === mercator.Features.Status.ENABLED || s === mercator.Features.Status.UNHIDDEN
}, mercator.Features.prototype.isDisabled = function (e) {
    var s = this.getStatus(e);
    return s === mercator.Features.Status.DISABLED || s === mercator.Features.Status.HIDDEN
}, mercator.Features.prototype.isReadOnly = function (e) {
    return this.getStatus(e) === mercator.Features.Status.READ_ONLY
}, mercator.Features.prototype.getStatus = function (e) {
    return this.modifiers.reduce(function (s, t) {
        var a = t.getFeatureStatus(e, s);
        return a || s
    }, mercator.Features.Status.ENABLED)
}, mercator.Features.prototype.getDisabled = function () {
    return Object.values(mercator.Features.Type).map(e => {
        if (this.isDisabled(e) || this.isReadOnly(e)) return e
    })
}, mercator.Features.Type = {}, mercator.Features.Type.CHART_NAME = "chartName", mercator.Features.Type.FOCAL_POINT = "focalPoint", mercator.Features.Type.BACKGROUND_IMAGE = "backgroundImage", mercator.Features.Type.REFERENCE_CHART = "referenceChart", mercator.Features.Type.SECTIONS = "sections", mercator.Features.Type.ROWS = "rows", mercator.Features.Type.TABLES = "tables", mercator.Features.Type.BOOTHS = "booths", mercator.Features.Type.TEXTS = "texts", mercator.Features.Type.IMAGES = "images", mercator.Features.Type.SHAPES = "shapes", mercator.Features.Type.AREAS = "areas", mercator.Features.Type.CATEGORY_LIST = "categoryList", mercator.Features.Type.VIEW_FROM_YOUR_SEAT = "viewFromYourSeat", mercator.Features.Type.FIRST_TIME_TUTORIAL = "firstTimeTutorial", mercator.Features.Type.LABELING = "labeling", mercator.Features.Type.NODES = "nodes", mercator.Features.Type.OBJECT_PROPERTIES = "objectProperties", mercator.Features.Type.CONTEXT_ACTIONS = "contextActions", mercator.Features.Type.PUBLISHED_SECTION_LABEL = "publishedSectionLabel", mercator.Features.Type.OBJECT_SECTION_LABELS = "objectSectionLabels", mercator.Features.Type.MULTIPLE_FLOORS = "multipleFloors", mercator.Features.Type.PUBLISHING = "publishing", mercator.Features.Type.ICONS = "icons", mercator.Features.Type.HAND = "hand", mercator.Features.Type.SELECT_SEATS = "selectSeats", mercator.Features.Type.TABLES_BOOK_AS_A_WHOLE = "tables.bookAsAWhole", mercator.Features.Status = {}, mercator.Features.Status.ENABLED = "enabled", mercator.Features.Status.READ_ONLY = "read-only", mercator.Features.Status.HIDDEN = "hidden", mercator.Features.Status.UNHIDDEN = "unhidden", mercator.Features.Status.DISABLED = "disabled";
mercator.FeatureConfig = function (i) {
    this.config = i
}, mercator.FeatureConfig.prototype.getFeatureStatus = function (i) {
    return this.isReadOnly(i) ? mercator.Features.Status.READ_ONLY : this.isDisabled(i) ? mercator.Features.Status.DISABLED : void 0
}, mercator.FeatureConfig.prototype.isReadOnly = function (i) {
    return Array.isArray(this.config.readOnly) && this.config.readOnly.contains(i)
}, mercator.FeatureConfig.prototype.readOnlyFeatures = function (i) {
    return this.config.readOnly || []
}, mercator.FeatureConfig.prototype.isDisabled = function (i) {
    return this.isImplicitlyDisabled(i) || this.isExplicitlyDisabled(i)
}, mercator.FeatureConfig.prototype.isImplicitlyDisabled = function (i) {
    return Array.isArray(this.config.enabled) && !this.config.enabled.contains(i)
}, mercator.FeatureConfig.prototype.isExplicitlyDisabled = function (i) {
    return Array.isArray(this.config.disabled) && this.config.disabled.contains(i)
};
mercator.ConfigParser = function () { }, mercator.ConfigParser.defaults = {
    language: mercator.Messages.defaultLocale,
    features: {},
    canvasColorScheme: "auto"
}, mercator.ConfigParser.prototype.parse = function (e) {
    return this.modernize(e), this.validateKeys(e), this.validateFeatures(e.features), this.validateLanguage(e.language), this.validateMode(e.mode), this.validateCanvasColorScheme(e.canvasColorScheme), _.assign({}, mercator.ConfigParser.defaults, e)
}, mercator.ConfigParser.prototype._replaceGeneralAdmissionAreasWithAreas = function (e) {
    return "generalAdmissionAreas" === e ? "areas" : e
}, mercator.ConfigParser.prototype.modernize = function (e) {
    return e.features && (e.features.disabled && (e.features.disabled = e.features.disabled.map(this._replaceGeneralAdmissionAreasWithAreas)), e.features.enabled && (e.features.enabled = e.features.enabled.map(this._replaceGeneralAdmissionAreasWithAreas))), e
}, mercator.ConfigParser.prototype.validateKeys = function (e) {
    this.validatePublicKeyAndWorkspaceKey(e.publicKey, e.workspaceKey), this.validateDesignerKeyAndSecretKey(e.designerKey, e.secretKey), this.validateChartKey(e.publicKey, e.workspaceKey, e.designerKey, e.secretKey, e.chartKey)
}, mercator.ConfigParser.prototype.validatePublicKeyAndWorkspaceKey = function (e, s) {
    if (e) {
        if (s) throw new Error("either pass in publicKey or workspaceKey, but not both");
        console.warn("publicKey is deprecated. Use workspaceKey instead.")
    }
}, mercator.ConfigParser.prototype.validateDesignerKeyAndSecretKey = function (e, s) {
    if (e) {
        if (s) throw new Error("either pass in designerKey or secretKey, but not both");
        console.warn("designerKey is deprecated. Use secretKey instead.")
    }
}, mercator.ConfigParser.prototype.validateChartKey = function (e, s, a, r, t) {
    let o = a || r;
    if (t) {
        if (!(e || s) && !o) throw new Error("secretKey or workspaceKey are required when a chartKey is passed in")
    } else if (!o) throw new Error("secretKey is required when no chartKey is passed in")
}, mercator.ConfigParser.prototype.validateFeatures = function (e) {
    if (e) {
        this.validateEnabledOrDisabledFeatures(e);
        var s = this;
        _.forOwn(e, function (e, a) {
            if ("readOnly" === a) s.validateReadOnlyFeatures(e);
            else {
                if ("enabled" !== a && "disabled" !== a) throw new Error("Unknown option '" + a + "'");
                s.validateFeaturesThatCanBeEnabledOrDisabled(e)
            }
        })
    }
}, mercator.ConfigParser.prototype.validateLanguage = function (e) {
    if (e && !mercator.ConfigParser.supportedLanguages.contains(e)) throw new Error("Unsupported language: " + e + ". Expected one of: " + mercator.ConfigParser.supportedLanguages)
}, mercator.ConfigParser.prototype.validateMode = function (e) {
    if (e && !mercator.ConfigParser.supportedModes.contains(e)) throw new Error("Unsupported mode: " + e + ". Expected one of: " + mercator.ConfigParser.supportedModes)
}, mercator.ConfigParser.prototype.validateCanvasColorScheme = function (e) {
    if (e && !mercator.ConfigParser.supportedCanvasColors.contains(e)) throw new Error("Unsupported canvas color: " + e + ". Expected one of: " + mercator.ConfigParser.supportedCanvasColors)
}, mercator.ConfigParser.prototype.validateEnabledOrDisabledFeatures = function (e) {
    if (e.enabled && e.disabled) throw new Error("Pass in either enabled or disabled features, but not both")
}, mercator.ConfigParser.prototype.validateReadOnlyFeatures = function (e) {
    var s = _.difference(e, mercator.ConfigParser.featuresThatCanBeMadeReadOnly);
    if (!_.isEmpty(s)) throw new Error("Invalid read only features: " + s)
}, mercator.ConfigParser.prototype.validateFeaturesThatCanBeEnabledOrDisabled = function (e) {
    var s = _.difference(e, mercator.ConfigParser.featuresThatCanBeEnabledOrDisabled);
    if (!_.isEmpty(s)) throw new Error("The following features cannot be enabled or disabled: " + s + ". Expected features from list: " + mercator.ConfigParser.featuresThatCanBeEnabledOrDisabled)
}, mercator.ConfigParser.featuresThatCanBeMadeReadOnly = [mercator.Features.Type.CHART_NAME, mercator.Features.Type.CATEGORY_LIST], mercator.ConfigParser.featuresThatCanBeEnabledOrDisabled = [mercator.Features.Type.FIRST_TIME_TUTORIAL, mercator.Features.Type.FOCAL_POINT, mercator.Features.Type.BACKGROUND_IMAGE, mercator.Features.Type.REFERENCE_CHART, mercator.Features.Type.ROWS, mercator.Features.Type.BOOTHS, mercator.Features.Type.TABLES, mercator.Features.Type.TABLES_BOOK_AS_A_WHOLE, mercator.Features.Type.TEXTS, mercator.Features.Type.IMAGES, mercator.Features.Type.LABELING, mercator.Features.Type.NODES, mercator.Features.Type.OBJECT_PROPERTIES, mercator.Features.Type.CONTEXT_ACTIONS, mercator.Features.Type.SHAPES, mercator.Features.Type.AREAS, mercator.Features.Type.SECTIONS, mercator.Features.Type.VIEW_FROM_YOUR_SEAT, mercator.Features.Type.MULTIPLE_FLOORS, mercator.Features.Type.PUBLISHED_SECTION_LABEL, mercator.Features.Type.PUBLISHING, mercator.Features.Type.ICONS].concat(mercator.ConfigParser.featuresThatCanBeMadeReadOnly), mercator.ConfigParser.supportedLanguages = ["en", "es", "fr", "pt", "de"], mercator.ConfigParser.Modes = {
    READ_ONLY: "readOnly",
    NORMAL: "normal",
    SAFE: "safe"
}, mercator.ConfigParser.supportedModes = [mercator.ConfigParser.Modes.READ_ONLY, mercator.ConfigParser.Modes.NORMAL, mercator.ConfigParser.Modes.SAFE], mercator.ConfigParser.supportedCanvasColors = ["auto", "light", "dark"];
mercator.Object = function () {
    this.selector = null, this.mover = null, this.labeler = null, this.designer = null, this.uuid = null, this.isBlurred = !1, this.isHighlighted = !1, this.isPressed = !1, this.inLabelingMode = !1
}, mercator.Object.prototype.init = function (t, e, i, s = !1) {
    this.selector = new mercator.ObjectSelector(this, t), this.mover = new mercator.ObjectMover(this), e || (this.labeler = new mercator.LabelingTextInput(this, t, i)), this.uuid = !1 === s && mercator.Object.uuid(), this.zIndex = ++mercator.Object.zIndexCtr, this.layer = "objectsLayer", this.designer = t, this.positionGuides = mercator.set()
}, mercator.Object.prototype.getInspectorSheets = function () {
    return {
        uuid: this.uuid,
        objectType: this.type
    }
}, mercator.Object.prototype.disabledEditingBySafeMode = function () {
    return this.designer.isSafeMode() && this.designer.isPublished() && this.published
}, mercator.Object.prototype.viewFromSeatsUrl = function () {
    return mercator.Object.viewFromSeatsUrl(this.designer, this.viewFromYourSeatImage)
}, mercator.Object.viewFromSeatsUrl = function (t, e) {
    return e ? t.publicApiUrl + "/system/public/charts/images/" + e : null
}, mercator.Object.prototype.totalPeopleCapacity = function () {
    return 0
}, mercator.Object.prototype.floorIndex = function () {
    return this.subChart.floorIndex()
}, mercator.Object.prototype.hasCategory = function (t) {
    return this.category === t || this.subChart.category === t
}, mercator.Object.prototype.showSelectionRect = function () {
    return !0
}, mercator.Object.prototype.getIsOutOfBounds = function () {
    if (100 !== this.designer.sectionScaleFactor || this.subChart.isMasterSubChart()) return !1;
    const t = this.subChart.section.getShape();
    return this.chairs ? this.chairs.reduce((e, i) => e || !this.subChart.section.correctSectionContentsPosition(i.center()).isInsidePolygon(t), !1) : !this.subChart.section.correctSectionContentsPosition(this.getCenter()).isInsidePolygon(t)
}, mercator.Object.prototype.getPerceptualCenter = function () {
    return this.getCenter()
}, mercator.Object.prototype.refreshOutOfBounds = function (t = !1) {
    let e = this.getIsOutOfBounds(),
        i = this.isOutOfBounds !== e;
    this.isOutOfBounds = e, this.chairs && this.chairs.forEach(t => t.isOutOfBounds = this.isOutOfBounds), i && t && this.applyElementAttributes()
}, mercator.Object.prototype.objectDrawn = function () {
    this.labeler && this.labeler.objectDrawn(), this.selector.objectDrawn()
}, mercator.Object.prototype.objectUndrawn = function () {
    this.labeler && this.labeler.objectUndrawn(), this.selector.objectUndrawn()
}, mercator.Object.prototype.setCursor = function (t) {
    this.allElementsSet().attr("cursor", t)
}, mercator.Object.prototype.showIconLabel = function () { }, mercator.Object.prototype.hideIconLabel = function () { }, mercator.Object.prototype.hideLabel = function () {
    return this.labeler && this.labeler.setNotShown().redraw(), this
}, mercator.Object.prototype.showLabel = function () {
    return this.labeler && this.labeler.setShown().refresh(), this
}, mercator.Object.prototype.applyZoom = function () {
    let t = this.designer;
    this.allElementsSet().applyZoom(t), this.children().forEach(function (e) {
        e.labeler && e.labeler.applyZoom(), e.allElementsSet && e.allElementsSet().applyZoom(t)
    }), this.labeler && this.labeler.applyZoom()
}, mercator.Object.prototype.showLabelAndChildLabels = function () {
    return this.children().forEach(function (t) {
        t.showLabel()
    }), this.showLabel(), this
}, mercator.Object.prototype.hideLabelAndChildLabels = function () {
    return this.hideLabel(), this.children().forEach(function (t) {
        t.hideLabel()
    }), this
}, mercator.Object.prototype.showAllIconLabels = function () {
    return this.children().forEach(function (t) {
        t.showIconLabel()
    }), this.showIconLabel(), this
}, mercator.Object.prototype.hideAllIconLabels = function () {
    return this.hideIconLabel(), this.children().forEach(function (t) {
        t.hideIconLabel()
    }), this
}, mercator.Object.prototype.children = function () {
    return []
}, mercator.Object.prototype.uncategorizedChildren = function () {
    return []
}, mercator.Object.prototype.polygonSupport = function () {
    return !1
}, mercator.Object.prototype.componentsWithBbox = function () {
    var t = this.children();
    return 0 === t.length ? [this] : t
}, mercator.Object.prototype.coreBbox = function () {
    return this.bbox()
}, mercator.Object.prototype.selectionArea = function () {
    return mercator.PolygonShape.fromBbox(this.bbox().enlarge(this.determineStrokeWidth()))
}, mercator.Object.prototype.drawPositionGuides = mercator.PositionGuidesSupport.prototype.drawPositionGuides, mercator.Object.prototype.getPositionGuides = mercator.PositionGuidesSupport.prototype.getPositionGuides, mercator.Object.prototype.undrawPositionGuides = mercator.PositionGuidesSupport.prototype.undrawPositionGuides, mercator.Object.prototype.positionGuideBBox = mercator.PositionGuidesSupport.prototype.positionGuideBBox, mercator.Object.prototype.allElementsSet = function () {
    return pushAll(this.selector.allElementsSet(), this.visibleElementsSet())
}, mercator.Object.prototype.canEnterInside = function () {
    return !1
}, mercator.Object.prototype.enter = function () { }, mercator.Object.prototype.cursor = function () {
    return null
}, mercator.Object.prototype.setCursor = function (t) {
    this.selector.changeCursorTo(t)
}, mercator.Object.prototype.unsetCursor = function () {
    this.selector.changeCursorToDefault()
}, mercator.Object.prototype.alignHorizontally = function (t, e) {
    let i = mercator.Aligner.getBboxHorizontalPosition(this.coreBbox(), e);
    this.moved(new mercator.Point(t - i, 0))
}, mercator.Object.prototype.alignVertically = function (t, e) {
    let i = mercator.Aligner.getBboxVerticalPosition(this.coreBbox(), e);
    this.moved(new mercator.Point(0, t - i))
}, mercator.Object.prototype.hasBookableCapabilities = function () {
    return !1
}, mercator.Object.prototype.isCategorisable = function () {
    return void 0 !== this.applyCategory
}, mercator.Object.prototype.determineDrawZIndex = function () {
    return this.zIndex
}, mercator.Object.prototype.createSelectionRectangle = function () {
    return mercator.Bbox.drawPathThroughPoints(this.bbox(), this.designer).attr({
        fill: "black",
        opacity: 0
    })
}, mercator.Object.prototype.hovered = function () { }, mercator.Object.prototype.unhovered = function () { }, mercator.Object.prototype.getHUDNodes = function () {
    return []
}, mercator.Object.prototype.enableObjectSelection = function () {
    this.selector.enable()
}, mercator.Object.prototype.disableSelection = function () {
    return this.selector.disable(), this
}, mercator.Object.prototype.enableSeatSelection = function () {
    this.selector.disable()
}, mercator.Object.prototype.numberOfLabeledSeats = function () {
    return this.chairs.reduce(function (t, e) {
        return e.hasLabel() ? ++t : t
    }, 0)
}, mercator.Object.prototype.animatedObject = function () {
    return null
}, mercator.Object.prototype.playFlash = function (t = 600) {
    if (this.children().forEach(t => t.playFlash()), !this.animatedObject()) return;
    const e = t / 4,
        i = t - e;
    this.animatedObject().attr(this.determineFlashStyle()), setTimeout(() => {
        this.animatedObject().animate(i).attr(this.determineStyle())
    }, e)
}, mercator.Object.prototype.determineFlashColor = function () {
    return mercator.Color.SELECTED.toCSS()
}, mercator.Object.prototype.determineFlashStyle = function () {
    const t = this.determineFlashColor();
    return {
        stroke: t,
        "stroke-width": this.determineStrokeWidth(),
        fill: this.determineFillColor(t),
        opacity: this.determineOpacity()
    }
}, mercator.Object.prototype.determineStyle = function () {
    return {
        stroke: this.determineStrokeColor(),
        "stroke-width": this.determineStrokeWidth(),
        fill: this.determineFillColor(),
        opacity: this.determineOpacity()
    }
}, mercator.Object.prototype.applyElementAttributes = function () {
    var t = this.visibleElementsSetWithoutChildren();
    0 !== t.length && (t.attr(this.determineStyle()), this.objectLabel && this.objectLabel.applyElementAttributes())
}, mercator.Object.prototype.visibleElementsSetWithoutChildren = function () {
    return this.visibleElementsSet()
}, mercator.Object.prototype.determineBaseColor = function () {
    let t = this.determineNonHighlightedColor();
    return this.isBlurred && (t = mercator.Color.create(t).desaturated().cssString), this.isPainted ? mercator.Color.create(t).selectedLight().cssString : this.isPressed ? mercator.Color.create(t).darkened().cssString : t
}, mercator.Object.prototype.isDarkCanvas = function () {
    return this.designer && this.designer.isDarkCanvas()
}, mercator.Object.prototype.determineFillColor = function (t) {
    return void 0 === t && (t = this.determineBaseColor()), this.designer.useLegacyAppearance() ? t : mercator.Color.create(t).softenedBy(62, this.isDarkCanvas()).toCSS()
}, mercator.Object.prototype.determineLabelColor = function () {
    return this.designer.useLegacyAppearance() ? this.determineCanvasColor() : this.isDarkCanvas() ? this.determineBaseColor() : mercator.Color.create(this.determineBaseColor()).intensifyBy(25, this.isDarkCanvas()).toCSS()
}, mercator.Object.prototype.determineNonHighlightedColor = function () {
    if (this.showLabelingError()) return mercator.Object.ERROR_COLOR;
    if (this.isCategorisable()) {
        if (this.category) return this.category.color;
        if (this.subChart.category) return this.subChart.category.color
    }
    return this.determineDefaultColor()
}, mercator.Object.prototype.determineCanvasColor = function () {
    return this.isDarkCanvas ? "white" : "black"
}, mercator.Object.prototype.determineDefaultColor = function () {
    return mercator.Object.NO_CATEGORY_COLOR[this.designer.getCanvasColorScheme()]
}, mercator.Object.prototype.determineStrokeColor = function () {
    return this.isPainted ? mercator.Color.create(this.determineBaseStrokeColor()).selected().cssString : this.determineBaseStrokeColor()
}, mercator.Object.prototype.determineBaseStrokeColor = function () {
    return this.showLabelingError() || this.isOutOfBounds ? mercator.Object.ERROR_COLOR : this.determineBaseColor()
}, mercator.Object.prototype.determineStrokeWidth = function () {
    return 2
}, mercator.Object.prototype.determineOpacity = function () {
    return this.showLabelingError() ? 1 : this.isBlurred ? this.isHighlighted ? .5 : .3 : 1
}, mercator.Object.prototype.highlight = function () {
    return this.isHighlighted = !0, this.applyElementAttributes(), this.children().forEach(function (t) {
        t.highlight()
    }), this
}, mercator.Object.prototype.unhighlight = function () {
    return this.isHighlighted = !1, this.applyElementAttributes(), this.children().forEach(function (t) {
        t.unhighlight()
    }), this
}, mercator.Object.prototype.hideOverlays = function () { }, mercator.Object.prototype.restoreOverlays = function () { }, mercator.Object.prototype.showHUD = function () { }, mercator.Object.prototype.hideHUD = function () { }, mercator.Object.prototype.flash = function () {
    let t = this;
    return this.pressed(), setTimeout(function () {
        t.unpressed()
    }, 100), this
}, mercator.Object.prototype.pressed = function () {
    return this.isPressed = !0, this.applyElementAttributes(), this.children().forEach(t => t.pressed()), this
}, mercator.Object.prototype.unpressed = function () {
    return this.isPressed = !1, this.applyElementAttributes(), this.children().forEach(t => t.unpressed()), this
}, mercator.Object.prototype.paintSelected = function () {
    return this.isPainted = !0, this.applyElementAttributes(), this.children().forEach(t => t.paintSelected()), this
}, mercator.Object.prototype.paintUnselected = function () {
    return this.isPainted = !1, this.applyElementAttributes(), this.children().forEach(t => t.paintUnselected()), this
}, mercator.Object.prototype.blur = function () {
    return this.isBlurred = !0, this.applyElementAttributes(), this.children().forEach(function (t) {
        t.blur()
    }), this
}, mercator.Object.prototype.unblur = function () {
    return this.isBlurred = !1, this.applyElementAttributes(), this.children().forEach(function (t) {
        t.unblur()
    }), this
}, mercator.Object.prototype.setViewFromSeats = function (t) {
    this.viewFromYourSeatImage = t
}, mercator.Object.prototype.removeViewFromSeats = function () {
    this.viewFromYourSeatImage = null
}, mercator.Object.prototype.hasLabel = function () {
    return !isBlank(this.label) && this.label !== mercator.LabelingTextInput.emptyLabel
}, mercator.Object.prototype.isUnlabeled = function () {
    return !this.hasLabel()
}, mercator.Object.prototype.refreshLabel = function () {
    this.labeler && this.labeler.refresh()
}, mercator.Object.prototype.changeLabel = function (t) {
    this.label = t ? t.trim() : mercator.LabelingTextInput.emptyLabel, this.refreshLabel()
}, mercator.Object.prototype.changeDisplayLabel = function (t) {
    this.displayLabel = t ? t.trim() : null, this.refreshLabel()
}, mercator.Object.prototype.changeSectionLabel = function (t = null) {
    this.sectionLabel = t ? t.trim() : null, this.redraw()
}, mercator.Object.prototype.changeSectionDisplayedLabel = function (t = null) {
    this.sectionDisplayedLabel = t ? t.trim() : null, this.redraw()
}, mercator.Object.prototype.getLabel = function () {
    return this.label
}, mercator.Object.prototype.getDisplayLabelOrLabel = function () {
    return this.displayLabel ? whitespaceToNonBreakingSpaces(this.displayLabel) : whitespaceToNonBreakingSpaces(this.label)
}, mercator.Object.prototype.getSectionLabel = function () {
    return this.subChart.section ? this.subChart.section.label : this.sectionLabel
}, mercator.Object.prototype.getFullLabel = function () {
    return (this.getSectionLabel() ? `${this.getSectionLabel()}-` : "") + this.getLabel()
}, mercator.Object.prototype.clearLabel = function () {
    this.changeLabel(null), this.objectLabeling = new mercator.ObjectLabeling
}, mercator.Object.prototype.applyScale = function (t) {
    return this.designer.zoomer.unzoom(t)
}, mercator.Object.prototype.setInLabelingMode = function () {
    return this.isInLabelingMode = !0, this
}, mercator.Object.prototype.setNotInLabelingMode = function () {
    return this.isInLabelingMode = !1, this
}, mercator.Object.prototype.markAsDuplicate = function () {
    this.isDuplicate || (this.isDuplicate = !0, this.labeler && this.labeler.redraw(), this.applyElementAttributes())
}, mercator.Object.prototype.markAsNotDuplicate = function () {
    this.isDuplicate && (this.isDuplicate = !1, this.labeler && this.labeler.redraw(), this.applyElementAttributes())
}, mercator.Object.prototype.showLabelingError = function () {
    return this.isDuplicate && this.isInLabelingMode
}, mercator.Object.prototype.isAccessible = function () {
    return this.isAccessibleByCategory()
}, mercator.Object.prototype.isAccessibleByCategory = function () {
    return mercator.Category.getAccessible(this.category || this.subChart.category)
}, mercator.Object.uuid = function () {
    return "uuid" + ++mercator.Object.uuidCounter
}, mercator.Object.uuidCounter = 0, mercator.Object.ERROR_COLOR = "#d44944", mercator.Object.zIndexCtr = 0, mercator.Object.NO_CATEGORY_COLOR = {
    light: "#444",
    dark: "#ddd"
};
mercator.Chair = function (e, t, i, s = !1) {
    this.centerPoint = e, this.parent = t, this.subChart = i, this.iconLabel = null, this.visibleIconLabel = !0, this.circle = null, this.designer = i.designer, this.label = mercator.LabelingTextInput.emptyLabel, this.displayLabel = null, this.labeler = new mercator.LabelingTextInput(this, this.designer), this.category = null, this.uuid = !1 === s && mercator.Object.uuid(), this.zIndex = ++mercator.Object.zIndexCtr, this.isDuplicate = !1, this.isBlurred = !1, this.restrictedView = !1, this.accessible = !1, this.companionSeat = !1, this.disabledBySocialDistancingRules = !1, this.viewFromYourSeatImage = null, this.overlayIcon = new mercator.OverlayIcon(this), this.published = !1
}, mercator.Chair.prototype.type = "chair", mercator.Chair.DEFAULT_DISPLAY_OBJECT_TYPE = "seat", mercator.Chair.prototype.getInspectorSheets = function () {
    const e = mercator.Object.prototype.getInspectorSheets.call(this),
        t = e.disabled || [];
    return this.disabledEditingBySafeMode() && t.push("SeatLabeling.label"), Object.assign(e, {
        "Category.category": this.category && this.category.key,
        "SeatLabeling.label": this.label,
        "SeatLabeling.displayLabel": this.displayLabel,
        "SeatLabeling.isNewObject": !this.published,
        "SeatLabeling.displayObjectType": this.displayObjectType,
        "Seat.restrictedView": this.restrictedView,
        "Seat.accessible": this.accessible,
        "Seat.companionSeat": this.companionSeat,
        "Seat.disabledBySocialDistancingRules": this.disabledBySocialDistancingRules,
        "Seat.accessibleByCategory": this.isAccessibleByCategory(),
        "ViewFromSeat.type": "chair",
        "ViewFromSeat.url": mercator.Object.viewFromSeatsUrl(this.designer, this.viewFromYourSeatImage),
        disabled: t
    })
}, mercator.Chair.prototype.totalPeopleCapacity = function () {
    return 1
}, mercator.Chair.prototype.determineIconName = function () {
    return this.isAccessible() ? "accessible-new" : this.isCompanionSeat() ? "companion-seat-new" : this.hasRestrictedView() ? "restricted-view-new" : this.isDisabledBySocialDistancing() ? "disabled-seat" : void 0
}, mercator.Chair.prototype.drawIconLabel = function () {
    if (!this.displayLabelIcon()) return;
    const e = seatsUnicode(this.determineIconName());
    this.iconLabel = this.designer.drawer.text(this.center().x, this.center().y, e, {
        "font-size": mercator.Chair.width - 2,
        "font-family": "seatsdesigner",
        fill: this.determineLabelColor()
    }).toLayer("objectsLayer", this.designer, this.zIndex).applyZoom(this.designer), this.iconLabel.node.setAttribute("pointer-events", "none")
}, mercator.Chair.prototype.drawShape = function () {
    this.circle = this.designer.drawer.circle(this.center().x, this.center().y, mercator.Chair.drawRadius(), this.determineStyle()).toLayer("objectsLayer", this.designer, this.zIndex).applyZoom(this.designer), this.circle.seatsioObjectType = "chair"
}, mercator.Chair.prototype.clone = function (e) {
    var t = new mercator.Chair(this.centerPoint, e, e.subChart);
    return t.label = this.label, t.category = this.category, t.accessible = this.accessible, t.companionSeat = this.companionSeat, t.restrictedView = this.restrictedView, t.displayObjectType = this.displayObjectType, t.disabledBySocialDistancingRules = this.disabledBySocialDistancingRules, t
}, mercator.Chair.prototype.transferPropertiesTo = function (e) {
    e.label = this.label, e.category = this.category, e.accessible = this.accessible, e.companionSeat = this.companionSeat, e.restrictedView = this.restrictedView, e.displayObjectType = this.displayObjectType, e.disabledBySocialDistancingRules = this.disabledBySocialDistancingRules, e.uuid = this.uuid, e.viewFromYourSeatImage = this.viewFromYourSeatImage, e.published = this.published
}, mercator.Chair.prototype.draw = function (e) {
    if (this.subChart.isActive() || e) {
        var t = this;
        return this.chairDrawn() || (this.labeler.objectDrawn(), this.drawShape(), this.drawIconLabel(), this.circle.node.onclick = function (e) {
            t.designer.getState().onObjectClicked(t), e.stopPropagation()
        }, this.circle.node.onmousedown = (e => {
            t.designer.getState().onObjectMouseDown(t, e)
        }), this.circle.node.onmouseup = (e => {
            t.designer.getState().onObjectMouseUp(t)
        }), this.circle.node.onmouseover = function () {
            t.designer.getState().onObjectMouseOver(t)
        }, this.circle.node.onmouseout = function () {
            t.designer.getState().onObjectMouseOut(t)
        }, this.isOutOfBounds && this.applyElementAttributes(), this.viewFromYourSeatImage && (this.setOverlayIcon(), this.overlayIcon.redraw(), this.toggleOverlayIcon(), this.hideSeatLabelWhenVFSIsShown())), this
    }
}, mercator.Chair.prototype.isAccessibleByCategory = mercator.Object.prototype.isAccessibleByCategory, mercator.Chair.prototype.isUnlabeled = mercator.Object.prototype.isUnlabeled, mercator.Chair.prototype.refreshLabel = mercator.Object.prototype.refreshLabel, mercator.Chair.prototype.getLabel = mercator.Object.prototype.getLabel, mercator.Chair.prototype.getDisplayLabelOrLabel = mercator.Object.prototype.getDisplayLabelOrLabel, mercator.Chair.prototype.hasLabel = mercator.Object.prototype.hasLabel, mercator.Chair.prototype.disabledEditingBySafeMode = mercator.Object.prototype.disabledEditingBySafeMode, mercator.Chair.prototype.isAccessible = function () {
    return this.isAccessibleByCategory() || this.accessible
}, mercator.Chair.prototype.isCompanionSeat = function () {
    return this.companionSeat
}, mercator.Chair.prototype.isDisabledBySocialDistancing = function () {
    return this.disabledBySocialDistancingRules
}, mercator.Chair.prototype.hasRestrictedView = function () {
    return this.restrictedView
}, mercator.Chair.prototype.hasVisibleIcon = function () {
    return this.designer.labelsShown || this.displayLabelIcon()
}, mercator.Chair.prototype.displayLabelIcon = function () {
    return (this.hasRestrictedView() || this.isAccessible() || this.isCompanionSeat() || this.isDisabledBySocialDistancing()) && !this.designer.labelsShown && this.subChart.isActive()
}, mercator.Chair.prototype.hideIconLabel = function () {
    this.visibleIconLabel = !1, this.iconLabel && this.iconLabel.hide()
}, mercator.Chair.prototype.showIconLabel = function () {
    this.visibleIconLabel = !0, this.iconLabel && this.iconLabel.show()
}, mercator.Chair.prototype.refreshIconLabelVisibility = function () {
    this.visibleIconLabel && this.displayLabelIcon() ? this.iconLabel ? this.iconLabel.show() : this.drawIconLabel() : this.iconLabel && this.iconLabel.hide()
}, mercator.Chair.prototype.hideLabel = function () {
    this.labeler.setNotShown().redraw(), this.refreshIconLabelVisibility()
}, mercator.Chair.prototype.showLabel = function () {
    this.designer.viewFromSeatsShown && this.viewFromYourSeatImage || !this.designer.labelsShown || (this.labeler.setShown().refresh(), this.refreshIconLabelVisibility())
}, mercator.Chair.prototype.getSectionLabel = function () {
    return this.parent.getSectionLabel()
}, mercator.Chair.prototype.getFullLabel = function () {
    return (this.getSectionLabel() ? `${this.getSectionLabel()}-` : "") + (this.parent.rowLabelDisabled ? "" : this.parent.getLabel() + "-") + this.getLabel()
}, mercator.Chair.prototype.bbox = function () {
    return new mercator.CircleShape(this.centerPoint, mercator.Chair.drawRadius()).bbox().enlarge(mercator.Chair.strokeWidth)
}, mercator.Chair.prototype.labelPosition = function () {
    return this.center()
}, mercator.Chair.prototype.animatedObject = function () {
    return this.circle
}, mercator.Chair.prototype.floorIndex = mercator.Object.prototype.floorIndex, mercator.Chair.prototype.paintSelected = mercator.Object.prototype.paintSelected, mercator.Chair.prototype.paintUnselected = mercator.Object.prototype.paintUnselected, mercator.Chair.prototype.highlight = mercator.Object.prototype.highlight, mercator.Chair.prototype.unhighlight = mercator.Object.prototype.unhighlight, mercator.Chair.prototype.showHUD = mercator.Object.prototype.showHUD, mercator.Chair.prototype.hideHUD = mercator.Object.prototype.hideHUD, mercator.Chair.prototype.pressed = mercator.Object.prototype.pressed, mercator.Chair.prototype.unpressed = mercator.Object.prototype.unpressed, mercator.Chair.prototype.blur = mercator.Object.prototype.blur, mercator.Chair.prototype.unblur = mercator.Object.prototype.unblur, mercator.Chair.prototype.determineDrawZIndex = mercator.Object.prototype.determineDrawZIndex, mercator.Chair.prototype.isDarkCanvas = mercator.Object.prototype.isDarkCanvas, mercator.Chair.prototype.determineCanvasColor = mercator.Object.prototype.determineCanvasColor, mercator.Chair.prototype.determineStyle = mercator.Object.prototype.determineStyle, mercator.Chair.prototype.determineFlashStyle = mercator.Object.prototype.determineFlashStyle, mercator.Chair.prototype.determineFlashColor = mercator.Object.prototype.determineFlashColor, mercator.Chair.prototype.determineDefaultColor = mercator.Object.prototype.determineDefaultColor, mercator.Chair.prototype.determineBaseColor = mercator.Object.prototype.determineBaseColor, mercator.Chair.prototype.determineLabelColor = mercator.Object.prototype.determineLabelColor, mercator.Chair.prototype.determineBaseStrokeColor = mercator.Object.prototype.determineBaseStrokeColor, mercator.Chair.prototype.determineNonHighlightedColor = mercator.Object.prototype.determineNonHighlightedColor, mercator.Chair.prototype.determineOpacity = mercator.Object.prototype.determineOpacity, mercator.Chair.prototype.applyElementAttributes = mercator.Object.prototype.applyElementAttributes, mercator.Chair.prototype.setInLabelingMode = mercator.Object.prototype.setInLabelingMode, mercator.Chair.prototype.setNotInLabelingMode = mercator.Object.prototype.setNotInLabelingMode, mercator.Chair.prototype.markAsDuplicate = mercator.Object.prototype.markAsDuplicate, mercator.Chair.prototype.markAsNotDuplicate = mercator.Object.prototype.markAsNotDuplicate, mercator.Chair.prototype.showLabelingError = mercator.Object.prototype.showLabelingError, mercator.Chair.prototype.changeLabel = mercator.Object.prototype.changeLabel, mercator.Chair.prototype.changeDisplayLabel = mercator.Object.prototype.changeDisplayLabel, mercator.Chair.prototype.children = mercator.Object.prototype.children, mercator.Chair.prototype.playFlash = mercator.Object.prototype.playFlash, mercator.Chair.prototype.determineStrokeWidth = function () {
    return this.parent.bookAsAWhole ? 3 : mercator.Chair.drawStrokeWidth
}, mercator.Chair.prototype.determineStrokeColor = function () {
    return this.parent.bookAsAWhole ? mercator.Color.create(this.determineBaseColor()).softenedBy(60, this.isDarkCanvas()).toCSS() : this.hasVisibleIcon() ? this.determineFillColor() : mercator.Object.prototype.determineStrokeColor.apply(this)
}, mercator.Chair.prototype.determineFillColor = function (e) {
    return void 0 === e && (e = this.determineBaseColor()), this.designer.useLegacyAppearance() ? e : this.parent.bookAsAWhole ? mercator.Color.create(e).softenedBy(this.hasVisibleIcon() ? 60 : 30, this.isDarkCanvas()).toCSS() : mercator.Color.create(e).softenedBy(50, this.isDarkCanvas()).toCSS()
}, mercator.Chair.prototype.getRotation = function () {
    return this.parent.getRotation()
}, mercator.Chair.prototype.undraw = function () {
    this.subChart.isActive() && (this.overlayIcon.undraw(), this.circle && (this.labeler && this.labeler.objectUndrawn(), this.circle.remove(), this.circle = null), this.iconLabel && (this.iconLabel.remove(), this.iconLabel = null))
}, mercator.Chair.prototype.hasBookableCapabilities = function () {
    return !0
}, mercator.Chair.prototype.isCategorisable = function () {
    return !0
}, mercator.Chair.prototype.setCursor = function (e) {
    this.circle.attr("cursor", e)
}, mercator.Chair.prototype.move = function (e) {
    this.centerPoint = e, this.redraw()
}, mercator.Chair.prototype.redraw = function () {
    this.undraw(), this.draw()
}, mercator.Chair.prototype.center = function () {
    return this.centerPoint
}, mercator.Chair.prototype.moved = function (e) {
    this.centerPoint = this.centerPoint.add(e), this.redraw()
}, mercator.Chair.prototype.rotated = function (e, t) {
    this.centerPoint = this.centerPoint.rotateAround(e, t), this.redraw()
}, mercator.Chair.prototype.setRestrictedView = function (e) {
    this.restrictedView = e
}, mercator.Chair.prototype.setAccessible = function (e) {
    this.accessible = e
}, mercator.Chair.prototype.setCompanionSeat = function (e) {
    this.companionSeat = e
}, mercator.Chair.prototype.setDisabledBySocialDistancingRules = function (e) {
    this.disabledBySocialDistancingRules = e
}, mercator.Chair.prototype.setViewFromSeats = function (e) {
    mercator.Object.prototype.setViewFromSeats.apply(this, [e]), this.setOverlayIcon(), this.toggleOverlayIcon(), this.hideSeatLabelWhenVFSIsShown()
}, mercator.Chair.prototype.removeViewFromSeats = function () {
    mercator.Object.prototype.removeViewFromSeats.apply(this), this.toggleOverlayIcon(), this.showSeatLabelWhenVFSIsNotShown()
}, mercator.Chair.prototype.showVFS = function () {
    this.toggleOverlayIcon(), this.hideSeatLabelWhenVFSIsShown()
}, mercator.Chair.prototype.hideVFS = function () {
    this.toggleOverlayIcon(), this.showSeatLabelWhenVFSIsNotShown()
}, mercator.Chair.prototype.toggleOverlayIcon = function () {
    this.subChart.isActive() && (this.designer.viewFromSeatsShown && this.viewFromYourSeatImage ? this.overlayIcon.show() : this.overlayIcon.hide())
}, mercator.Chair.prototype.hideSeatLabelWhenVFSIsShown = function () {
    this.designer.viewFromSeatsShown && this.viewFromYourSeatImage && this.hideLabel()
}, mercator.Chair.prototype.showSeatLabelWhenVFSIsNotShown = function () {
    this.designer.viewFromSeatsShown && this.viewFromYourSeatImage || !this.designer.labelsShown || this.showLabel()
}, mercator.Chair.prototype.setOverlayIcon = function () {
    this.overlayIcon.setIcon("view-from-seats", "chair-highlight", () => this.showObjectInspectorSheetForSeat(), "")
}, mercator.Chair.prototype.showObjectInspectorSheetForSeat = function () {
    this.designer.setState(new mercator.SeatsSelectedState([this], this.designer)), this.designer.uiStateUpdate({
        goToSheet: "ViewFromSeat"
    })
}, mercator.Chair.prototype.centroid = function () {
    return this.centerPoint
}, mercator.Chair.prototype.chairDrawn = function () {
    return null != this.circle
}, mercator.Chair.prototype.toJson = function () {
    let e = this.center().toJson(this.subChart);
    const t = {
        x: e.x,
        y: e.y,
        label: this.label.toString(),
        displayLabel: this.displayLabel,
        categoryLabel: mercator.Category.getLabel(this.category),
        categoryAccessible: mercator.Category.getAccessible(this.category),
        categoryKey: mercator.Category.getKey(this.category),
        restrictedView: this.restrictedView,
        viewFromYourSeatImage: this.viewFromYourSeatImage,
        accessible: this.accessible,
        companionSeat: this.companionSeat,
        disabledBySocialDistancingRules: this.disabledBySocialDistancingRules,
        uuid: this.uuid,
        published: this.published
    };
    return this.displayObjectType && this.displayObjectType !== mercator.Chair.DEFAULT_DISPLAY_OBJECT_TYPE && (t.displayObjectType = this.getDisplayObjectType()), t
}, mercator.Chair.prototype.clearLabel = function () {
    this.changeLabel(null)
}, mercator.Chair.prototype.allElementsSet = function () {
    return this.visibleElementsSet()
}, mercator.Chair.prototype.visibleElementsSet = function () {
    return pushAll(this.visibleElementsSetWithoutChildren(), [this.iconLabel, this.overlayIcon.visibleElementsSet()])
}, mercator.Chair.prototype.visibleElementsSetWithoutChildren = function () {
    return mercator.set(this.circle)
}, mercator.Chair.prototype.svgElement = function () {
    return this.circle
}, mercator.Chair.prototype.highlightRelativeToPoint = function (e, t, i) {
    var s = (i.distanceToPoint(this.center()) - e) / (t - e);
    this.circle.attr({
        opacity: Math.max(1 - s, .1)
    })
}, mercator.Chair.prototype.unhighlightRelativeToFocalPoint = function () {
    this.circle.attr(this.determineStyle())
}, mercator.Chair.prototype.applyCategory = function (e) {
    this.category = e || null
}, mercator.Chair.prototype.removeCategory = function () {
    this.category = null
}, mercator.Chair.prototype.getLabelRotation = function () {
    return this.parent.getLabelRotation()
}, mercator.Chair.prototype.remove = function () {
    this.parent.removeChair(this)
}, mercator.Chair.prototype.canBeRemoved = function () {
    return !this.disabledEditingBySafeMode() && this.parent instanceof mercator.Row
}, mercator.Chair.prototype.setSeatDisplayObjectType = function (e) {
    this.displayObjectType = e
}, mercator.Chair.prototype.getDisplayObjectType = function () {
    return this.displayObjectType ? this.displayObjectType : mercator.Chair.DEFAULT_DISPLAY_OBJECT_TYPE
}, mercator.Chair.fromJson = function (e, t, i) {
    let s = new mercator.Chair(mercator.Point.fromJson(e, i), t, i);
    return s.label = e.label, s.displayLabel = e.displayLabel, s.restrictedView = !!e.restrictedView, s.viewFromYourSeatImage = e.viewFromYourSeatImage, s.accessible = !!e.accessible, s.companionSeat = !!e.companionSeat, s.disabledBySocialDistancingRules = !!e.disabledBySocialDistancingRules, s.applyCategory(i.designer.categories.getCategory(e.categoryKey)), s.uuid = e.uuid, s.displayObjectType = e.displayObjectType || mercator.Chair.DEFAULT_DISPLAY_OBJECT_TYPE, s.published = void 0 !== e.published ? e.published : i.designer.isPublished(), s
}, mercator.Chair.drawShape = function (e, t) {
    const i = mercator.Color.SELECTED_LIGHT.toCSS();
    let s = t.drawer.circle(e.x, e.y, mercator.Chair.drawRadius(), {
        fill: mercator.Color.create(i).softenedBy(25, t.isDarkCanvas()).toCSS(),
        stroke: i,
        "stroke-width": 2
    }).toLayer("objectsLayer", t).applyZoom(t);
    return s.seatsioObjectType = "chair", s
}, mercator.Chair.width = 16, mercator.Chair.strokeWidth = 1, mercator.Chair.drawStrokeWidth = 1.6, mercator.Chair.widthPlusStroke = mercator.Chair.width + 2 * mercator.Chair.strokeWidth, mercator.Chair.drawRadius = (() => mercator.Chair.width / 2 - 1), mercator.Chair.radius = (() => mercator.Chair.width / 2), mercator.Chair.defaultColor = {
    light: "#fafafa",
    dark: "#bbb"
}, mercator.Chair.DISPLAY_OBJECT_TYPES = ["seat", "chair", "stool", "bench"], mercator.Chair.DEFAULT_DISPLAY_OBJECT_TYPE = "seat";
mercator.RowLabels = class {
    constructor(t, e) {
        this.row = t, this.designer = e, this.leftLabel = null, this.rightLabel = null
    }
    bbox() {
        return mercator.Bbox.merged([this.bboxAtStartOfRow(), this.bboxAtEndOfRow()])
    }
    bboxAtStartOfRow() {
        return this.row.isInQuadrants1Or4OrRotated360() ? this.bboxForPosition("left") : this.bboxForPosition("right")
    }
    bboxAtEndOfRow() {
        return this.row.isInQuadrants1Or4OrRotated360() ? this.bboxForPosition("right") : this.bboxForPosition("left")
    }
    bboxForPosition(t) {
        return this.rowLabelSetForPosition(t) ? this.createLabel(t).bbox() : null
    }
    asSet() {
        let t = mercator.set();
        return this.leftLabel && t.push(this.leftLabel.element), this.rightLabel && t.push(this.rightLabel.element), t
    }
    setShown() {
        return this.shouldShowRowLabel() && this.drawLeftLabel(), this
    }
    setNotShown() {
        return this.shouldHideRowLabel() && this.undrawLeftLabel(), this
    }
    shouldShowRowLabel() {
        return !this.row.rowLabelDisabled && !this.leftLabel && this.shouldShowLabelPlaceholder()
    }
    shouldHideRowLabel() {
        return !this.designer.labelsShown && !this.row.getLabelPositions().left
    }
    shouldShowLabelPlaceholder() {
        return this.designer.labelsShown && !this.row.getLabelPositions().left && this.row.subChart.isActive()
    }
    rowLabelSetForPosition(t) {
        return this.row.rowLabelPosition.includes(t)
    }
    getOpacity(t) {
        return this.shouldShowLabelPlaceholder() && "left" === t ? .4 : 1
    }
    draw() {
        mercator.RowLabelPosition.isInvisible(this.row.rowLabelPosition) && !this.shouldShowRowLabel() || ((mercator.RowLabelPosition.isLeft(this.row.rowLabelPosition) || this.shouldShowRowLabel()) && this.drawLeftLabel(), mercator.RowLabelPosition.isRight(this.row.rowLabelPosition) && this.drawRightLabel())
    }
    drawLeftLabel() {
        this.leftLabel = this.createLabel("left"), this.leftLabel.draw(this.row.layer)
    }
    drawRightLabel() {
        this.rightLabel = this.createLabel("right"), this.rightLabel.draw(this.row.layer)
    }
    undraw() {
        this.undrawLeftLabel(), this.undrawRightLabel()
    }
    undrawLeftLabel() {
        this.leftLabel && (this.leftLabel.undraw(), this.leftLabel = null)
    }
    undrawRightLabel() {
        this.rightLabel && (this.rightLabel.undraw(), this.rightLabel = null)
    }
    createLabel(t) {
        const e = this.getLabelRotation(t),
            o = this.getAnchor(t),
            s = this.getCoordinates(t),
            i = this.row.getDisplayLabelOrLabel(),
            a = mercator.RowLabels.TEXT_COLOR[this.designer.getCanvasColorScheme()];
        return new mercator.TextShape(i, s, mercator.RowLabels.TEXT_SIZE, e, o, this.designer, this.getOpacity(t), a, !0)
    }
    getLabelRotation(t) {
        return "right" === t ? this.rightLabelRotation() : this.leftLabelRotation()
    }
    rightLabelRotation() {
        return this.row.isVertical() && this.isBaselineLeft() ? this.angleIs270() ? this.row.createRayFromLastTwoChairs().angle() + 180 : this.row.createRayFromFirstTwoChairs().angle() + 180 : this.row.isInQuadrants1Or4OrRotated360() ? this.row.createRayFromLastTwoChairs().angle() : this.row.createRayFromFirstTwoChairs().angle()
    }
    leftLabelRotation() {
        return this.row.isVertical() && this.isBaselineLeft() ? this.angleIs270() ? this.row.createRayFromFirstTwoChairs().angle() : this.row.createRayFromLastTwoChairs().angle() : this.row.isInQuadrants1Or4OrRotated360() ? this.row.createRayFromFirstTwoChairs().angle() + 180 : this.row.createRayFromLastTwoChairs().angle() + 180
    }
    getAnchor(t) {
        return "left" === t ? this.getAnchorForLeft() : this.getAnchorForRight()
    }
    getAnchorForLeft() {
        return this.row.isVertical() && this.isBaselineLeft() ? "start" : "end"
    }
    getAnchorForRight() {
        return this.row.isVertical() && this.isBaselineLeft() ? "end" : "start"
    }
    getCoordinates(t) {
        return "left" === t ? this.getCoordinateForLeft() : this.getCoordinateForRight()
    }
    getCoordinateForRight() {
        return this.row.isInQuadrants1Or4OrRotated360() ? this.row.createRayFromLastTwoChairs().enlarge(mercator.RowLabels.SPACING).end : this.row.createRayFromFirstTwoChairs().enlarge(mercator.RowLabels.SPACING).end
    }
    getCoordinateForLeft() {
        return this.row.isInQuadrants1Or4OrRotated360() ? this.row.createRayFromFirstTwoChairs().enlarge(mercator.RowLabels.SPACING).end : this.row.createRayFromLastTwoChairs().enlarge(mercator.RowLabels.SPACING).end
    }
    isBaselineLeft() {
        return "BASELINE_LEFT" === this.row.getVerticalRowLabelDirection()
    }
    angleIs270() {
        return 270 === this.row.getRoundedRotation()
    }
}, mercator.RowLabels.prototype.redraw = (() => { }), mercator.RowLabels.prototype.applyZoom = (() => { }), mercator.RowLabels.prototype.refresh = (() => { }), mercator.RowLabels.prototype.objectDrawn = (() => { }), mercator.RowLabels.prototype.objectUndrawn = (() => { }), mercator.RowLabels.prototype.redraw = (() => { }), mercator.RowLabels.SPACING = mercator.Chair.width, mercator.RowLabels.TEXT_SIZE = 12, mercator.RowLabels.TEXT_COLOR = {
    light: "#888",
    dark: "#777"
}, mercator.RowLabelPosition = class {
    static isInvisible(t) {
        return t === mercator.RowLabelPosition.INVISIBLE
    }
    static isLeft(t) {
        return t === mercator.RowLabelPosition.LEFT_RIGHT || t === mercator.RowLabelPosition.LEFT
    }
    static isRight(t) {
        return t === mercator.RowLabelPosition.LEFT_RIGHT || t === mercator.RowLabelPosition.RIGHT
    }
}, mercator.RowLabelPosition.INVISIBLE = "label-position-invisible", mercator.RowLabelPosition.LEFT_RIGHT = "label-position-left-and-right", mercator.RowLabelPosition.LEFT = "label-position-left", mercator.RowLabelPosition.RIGHT = "label-position-right", mercator.RowLabelPosition.POSITIONS = [mercator.RowLabelPosition.INVISIBLE, mercator.RowLabelPosition.LEFT_RIGHT, mercator.RowLabelPosition.LEFT, mercator.RowLabelPosition.RIGHT];
mercator.TableLabel = class {
    constructor(e, t) {
        this.table = e, this.designer = t, this.labelElement = null, this.backgroundElement = null
    }
    asSet() {
        return mercator.set().push(this.labelElement, this.backgroundElement)
    }
    shouldHideLabel() {
        return !this.designer.labelsShown && !this.table.labelShown || !this.table.subChart.isActive()
    }
    draw() {
        if (this.shouldHideLabel()) return;
        let e = this.table.isUnlabeled() || this.table.isDuplicate,
            t = this._getLabel(),
            s = this.table.getCenter();
        return e && (this.backgroundElement = this.designer.drawer.circle(s.x, s.y, 12, {
            fill: this.table.dummy ? "transparent" : mercator.Object.ERROR_COLOR,
            stroke: "transparent"
        }).toLayer(this.table.layer, this.designer, this.table.zIndex).applyZoom(this.designer), this.backgroundElement.node.setAttribute("pointer-events", "none")), this.labelElement = this.designer.drawer.text(s.x, s.y, t, {
            "font-size": 14,
            "font-family": mercator.TextInput.defaultFontFamily,
            "font-weight": "bold",
            fill: e ? "white" : "black",
            opacity: this.table.labelShown || e ? 1 : .3
        }).toLayer(this.table.layer, this.designer, this.table.zIndex).applyZoom(this.designer), this.labelElement.node.setAttribute("pointer-events", "none"), this
    }
    _getLabel() {
        return this.table.dummy ? "" : this.table.displayLabel ? whitespaceToNonBreakingSpaces(this.table.displayLabel) : whitespaceToNonBreakingSpaces(this.table.label)
    }
    undraw() {
        return this.labelElement && this.labelElement.remove(), this.backgroundElement && this.backgroundElement.remove(), this
    }
    redraw() {
        this.undraw().draw()
    }
    objectDrawn() {
        this.redraw()
    }
    refresh() {
        this.redraw()
    }
    objectUndrawn() {
        this.undraw()
    }
    setShown() {
        return this
    }
    setNotShown() {
        return this
    }
}, mercator.TableLabel.prototype.applyZoom = (() => { }), mercator.TableLabel.defaultFontSize = 10;
mercator.Row = function (t) {
    this.subChart = t, this.chairs = [], this.curve = 0, this.label = mercator.LabelingTextInput.emptyLabel, this.displayLabel = null, this.rowLabelPosition = mercator.RowLabelPosition.INVISIBLE, this.seatLabeling = mercator.SeatLabeling.createDefaultSeatLabeling(), this.objectLabeling = mercator.ObjectLabeling.createDefaultRowLabeling(), this.uuid = mercator.Object.uuid(), this.init(t.designer, !0, !1), this.labeler = new mercator.RowLabels(this, t.designer), this.curveGhostPoint1 = null, this.curveGhostPoint2 = null, this.sectionLabel = null, this.sectionDisplayedLabel = null, this.chairSpacing = mercator.Row.DEFAULT_CHAIR_SPACING, this.displayObjectType = mercator.Row.prototype.type, this.verticalRowLabelDirection = mercator.Row.DEFAULT_VERTICAL_ROW_BASELINE, this.zIndex = void 0, this.points = null, this.smooth = !1, this.smoothness = mercator.Row.DEFAULT_SMOOTHNESS, this.rowLabelDisabled = !1, this.published = !1
}, mercator.Row.prototype = new mercator.Object, mercator.Row.prototype.type = "row", mercator.Row.prototype.getInspectorSheets = function () {
    let t = this.getLabelPositions(),
        e = {
            "Category.category": this.getChairsCategoryKeys()
        };
    this.isMultiSegmentRow() ? Object.assign(e, {
        "Row.smooth": this.smooth,
        "Row.smoothness": this.smoothness
    }) : Object.assign(e, {
        "Row.curve": this.curve,
        "Row.chairSpacing": this.chairSpacing
    });
    const i = e.disabled || [];
    return this.disabledEditingBySafeMode() && (i.push("ObjectLabeling.label"), i.push("SectionLabeling.sectionLabel"), i.push("SeatLabeling")), this.anyChairsDisabledEditingBySafeMode() && i.push("SeatLabeling.label"), Object.assign(e, {
        "Row.seatCount": this.numberOfChairs(),
        "Row.minSeatCount": this.minSeatCount(),
        "Row.maxSeatCount": this.maxSeatCount(),
        "SectionLabeling.sectionLabel": this.sectionLabel,
        "SectionLabeling.sectionDisplayedLabel": this.sectionDisplayedLabel,
        "SectionLabeling.isNewObject": !this.published,
        "ObjectLabeling.rowLabelDisabled": this.rowLabelDisabled,
        "ObjectLabeling.displayObjectType": this.displayObjectType,
        "ObjectLabeling.label": this.hasLabel() ? this.label : null,
        "ObjectLabeling.displayLabel": this.displayLabel,
        "ObjectLabeling.isNewObject": !this.published,
        "ObjectLabeling.rowLabelPositionLeft": t.left,
        "ObjectLabeling.rowLabelPositionRight": t.right,
        "ObjectLabeling.sequence": this.objectLabeling.algoName,
        "ObjectLabeling.prefix": this.objectLabeling.prefix,
        "ObjectLabeling.start": this.objectLabeling.startAtIndex + 1,
        "ObjectLabeling.skippableCharacters": !0,
        "ObjectLabeling.skipI": this.objectLabeling.skippedCharacters.has("I"),
        "ObjectLabeling.skipO": this.objectLabeling.skippedCharacters.has("O"),
        "ObjectLabeling.skipQ": this.objectLabeling.skippedCharacters.has("Q"),
        "ObjectLabeling.verticalRowLabelDirection": this.isVertical() ? this.getVerticalRowLabelDirection() : null,
        "SeatLabeling.label": _.uniq(this.children().map(t => t.hasLabel() ? t.label : null)),
        "SeatLabeling.isNewObject": !this.published,
        "SeatLabeling.displayObjectType": this.getSeatDisplayObjectTypes(),
        "SeatLabeling.sequence": this.seatLabeling.algoName,
        "SeatLabeling.inverted": !0 === this.seatLabeling.isInverted,
        "SeatLabeling.start": this.seatLabeling.startAtIndex + 1,
        "SeatLabeling.useEndAt": this.seatLabeling.useEndAt,
        disabled: i
    }), Object.assign(mercator.Object.prototype.getInspectorSheets.call(this), e)
}, mercator.Row.prototype.isMultiSegmentRow = function () {
    return this.points && this.points.length > 2
}, mercator.Row.prototype.isSingleSeatRow = function () {
    return 1 === this.chairs.length
}, mercator.Row.prototype.enter = function () {
    this.designer.setState(new mercator.SeatsSelectedState(this.chairs, this.designer))
}, mercator.Row.prototype.getChairsCategoryKeys = function () {
    return this.chairs.map(t => t.category ? t.category.key : null)
}, mercator.Row.prototype.hasCategory = function (t) {
    return this.getChairsCategoryKeys().some(e => e === t.key) || this.subChart.category === t
}, mercator.Row.prototype.getChairsCategories = function () {
    return _.uniq(this.chairs.map(t => t.category).filter(t => t))
}, mercator.Row.prototype.children = function () {
    return this.chairs
}, mercator.Row.prototype.hasLabel = function () {
    return !!this.rowLabelDisabled || mercator.Object.prototype.hasLabel.apply(this)
}, mercator.Row.prototype.uncategorizedChildren = function () {
    return this.chairs.filter(t => !t.category)
}, mercator.Row.prototype.applyCategory = function (t) {
    this.chairs.forEach(e => e.applyCategory(t))
}, mercator.Row.prototype.removeCategory = function () {
    this.chairs.forEach(t => t.removeCategory())
}, mercator.Row.prototype.duplicate = function (t) {
    return this.subChart.addRow(this.clone(t))
}, mercator.Row.prototype.copyWithoutSubchart = function () {
    return this.clone(null)
}, mercator.Row.prototype.clone = function (t) {
    let e = this.shallowClone(t);
    return e.chairs = this.chairs.map(function (t) {
        return t.clone(e)
    }), e
}, mercator.Row.prototype.shallowClone = function (t) {
    var e = new mercator.Row(t);
    return e.curveGhostPoint1 = this.curveGhostPoint1, e.curveGhostPoint2 = this.curveGhostPoint2, e.curve = this.curve, e.chairSpacing = this.chairSpacing, e.verticalRowLabelDirection = this.verticalRowLabelDirection, e.displayObjectType = this.displayObjectType, e.label = this.label, e.sectionLabel = this.sectionLabel, e.sectionDisplayedLabel = this.sectionDisplayedLabel, e.seatLabeling = this.seatLabeling.clone(), e.objectLabeling = this.objectLabeling.clone(), e.rowLabelPosition = this.rowLabelPosition, e.points = this.points, e.smooth = this.smooth, e.smoothness = this.smoothness, e.rowLabelDisabled = this.rowLabelDisabled, e.published = this.published, e
}, mercator.Row.prototype.canBeRemoved = function () {
    return !this.disabledEditingBySafeMode()
}, mercator.Row.prototype.addChair = function (t) {
    return this.chairs.push(t), t
}, mercator.Row.prototype.labelPosition = function () { }, mercator.Row.prototype.getCurveGhostPoint1 = function () {
    return this.curveGhostPointsSet() ? this.curveGhostPoint1 : this.firstChair().center()
}, mercator.Row.prototype.getCurveGhostPoint2 = function () {
    return this.curveGhostPointsSet() ? this.curveGhostPoint2 : this.lastChair().center()
}, mercator.Row.prototype.getLabelPositions = function () {
    return {
        left: this.rowLabelPosition.includes("left"),
        right: this.rowLabelPosition.includes("right")
    }
}, mercator.Row.prototype.buildLabelPosition = function (t = this.getLabelPositions()) {
    return t.left || t.right ? "label-position-" + [t.left && "left", t.right && "right"].filter(t => t).join("-and-") : mercator.RowLabelPosition.INVISIBLE
}, mercator.Row.prototype.setDisplayObjectType = function (t) {
    this.displayObjectType = t
}, mercator.Row.prototype.setSeatDisplayObjectType = function (t) {
    this.children().forEach(e => e.setSeatDisplayObjectType(t))
}, mercator.Row.prototype.getSeatDisplayObjectTypes = function () {
    const t = _.uniq(this.children().map(t => t.getDisplayObjectType()));
    return 1 === t.length ? t[0] : t
}, mercator.Row.prototype.setRowLabelPositionLeft = function (t) {
    let e = this.getLabelPositions();
    e.left = t, this.rowLabelPosition = this.buildLabelPosition(e), this.redraw()
}, mercator.Row.prototype.setRowLabelPositionRight = function (t) {
    let e = this.getLabelPositions();
    e.right = t, this.rowLabelPosition = this.buildLabelPosition(e), this.redraw()
}, mercator.Row.prototype.setRowLabelDisabled = function (t) {
    this.rowLabelDisabled = t, this.clearLabel()
}, mercator.Row.prototype.curvedCenter = function () {
    if (this.numberOfChairs() % 2 == 0) {
        var t = this.numberOfChairs() / 2,
            e = this.chairs[t],
            i = t - 1,
            s = this.chairs[i];
        return e.center().averageWith(s.center())
    }
    var o = Math.floor(this.numberOfChairs() / 2);
    return this.chairs[o].center()
}, mercator.Row.prototype.getRotation = function () {
    return this.createRayFromFirstChairToLast().angle()
}, mercator.Row.prototype.drawShapes = function () {
    this.chairs.forEach(function (t) {
        t.drawShape()
    })
}, mercator.Row.prototype.simpleDraw = function (t) {
    let e = mercator.Section.pathString(this.pointsInPathForSimpleDraw().map(t => this.subChart.section.correctSectionContentsPosition(t)));
    const i = this.designer.drawer.path(e, {
        "stroke-width": mercator.Chair.width,
        "stroke-linecap": "round",
        stroke: t
    });
    return i.rotationAngle = this.rotationAngle, i
}, mercator.Row.prototype.pointsInPathForSimpleDraw = function () {
    const t = t => t.enlarge(t.length() - mercator.RowLabels.SPACING - mercator.Chair.width / 2),
        e = this.chairs.map(t => t.center());
    if (this.labeler.bboxAtStartOfRow()) {
        const i = new mercator.Ray(this.firstChair().center(), this.labeler.bboxAtStartOfRow().center());
        e.unshift(t(i).end)
    }
    if (this.labeler.bboxAtEndOfRow()) {
        const i = new mercator.Ray(this.lastChair().center(), this.labeler.bboxAtEndOfRow().center());
        e.push(t(i).end)
    }
    return e
}, mercator.Row.prototype.getObjectTypeName = function () {
    return "row"
}, mercator.Row.prototype.draw = function () {
    if (this.subChart.isActive()) return this.chairs.forEach(function (t) {
        t.draw()
    }), this.labeler.draw(), this.objectDrawn(), this
}, mercator.Row.prototype.moved = function (t) {
    this.chairs.forEach(function (e) {
        e.moved(t)
    }), this.refreshOutOfBounds(), this.curveGhostPointsSet() && (this.curveGhostPoint1 = this.curveGhostPoint1.add(t), this.curveGhostPoint2 = this.curveGhostPoint2.add(t)), this.points && (this.points = this.points.map(e => e.add(t))), this.redraw()
}, mercator.Row.prototype.rotated = function (t, e) {
    var i = this.inFirstOrFourthQuadrant();
    this.chairs.forEach(function (i) {
        i.rotated(t, e)
    }), i && !this.inFirstOrFourthQuadrant() && (this.curve = -this.curve), this.curveGhostPointsSet() && (this.curveGhostPoint1 = this.curveGhostPoint1.rotateAround(t, e), this.curveGhostPoint2 = this.curveGhostPoint2.rotateAround(t, e)), this.points && (this.points = this.points.map(i => i.rotateAround(t, e))), this.redraw()
}, mercator.Row.prototype.inFirstOrFourthQuadrant = function () {
    var t = this.createRayFromFirstChairToLast();
    return t.isInFirstQuadrant() || t.isInFourthQuadrant()
}, mercator.Row.prototype.firstChair = function () {
    if (0 === this.chairs.length) throw new Error("Row does not contain any seats");
    return this.chairs[0]
}, mercator.Row.prototype.lastChair = function () {
    if (0 === this.chairs.length) throw new Error("Row does not contain any seats");
    return this.chairs[this.chairs.length - 1]
}, mercator.Row.prototype.numberOfChairs = function () {
    return this.chairs.length
}, mercator.Row.prototype.undraw = function () {
    if (this.subChart.isActive()) return this.undrawAllChairs(), this.labeler.undraw(), this.objectUndrawn(), this
}, mercator.Row.prototype.redraw = function () {
    this.undraw(), this.draw()
}, mercator.Row.prototype.positionGuideRay = function () {
    return new mercator.Ray(this.firstChair().center(), this.lastChair().center())
}, mercator.Row.prototype.getPositionGuides = function (t, e) {
    return this.isMultiSegmentRow() ? [] : mercator.PositionGuidesSupport.prototype.getPositionGuidesForRow.bind(this)(this.designer, t, e)
}, mercator.Row.prototype.drawHelperPath = function () {
    const t = this.designer.drawLineFromPointToPoint(this.centersOfChairsForLine()).attr({
        fill: "transparent",
        stroke: "black",
        "stroke-width": mercator.Chair.width,
        "stroke-linecap": this.hasOneOrTwoChairs() ? "butt" : "round",
        opacity: 0
    }).applyZoom(this.designer);
    return t.node.setAttribute("pointer-events", "visibleStroke"), t
}, mercator.Row.prototype.createSelectionRectangle = function () {
    return this.drawHelperPath()
}, mercator.Row.prototype.hasOneOrTwoChairs = function () {
    return this.numberOfChairs() > 0 && this.numberOfChairs() <= 2
}, mercator.Row.prototype.canBeCurved = function () {
    return !this.hasOneOrTwoChairs() && !this.isMultiSegmentRow()
}, mercator.Row.prototype.canBeSmoothened = function () {
    return !this.hasOneOrTwoChairs() && this.isMultiSegmentRow()
}, mercator.Row.prototype.applyCurving = function (t, e, i, s) {
    this.canBeCurved() && (this.curve = t, this.curveGhostPoint1 = e, this.curveGhostPoint2 = i, this.chairs.forEach((t, e) => {
        t.move(s[e])
    }), this.labeler.undraw(), this.labeler.draw(), this.objectDrawn(), this.refreshOutOfBounds(!0))
}, mercator.Row.prototype.applySmoothening = function (t, e, i, s) {
    if (this.canBeSmoothened()) {
        this.smooth = t, s || (this.smoothness = i);
        let o = new mercator.MultiRay(e).distributedPoints(this.chairs.length);
        this.chairs.forEach((t, e) => {
            t.move(o[e])
        }), this.labeler.undraw(), this.labeler.draw(), this.objectDrawn(), this.refreshOutOfBounds(!0)
    }
}, mercator.Row.prototype.smoothen = function (t, e, i) {
    this.applySmoothening(!0, t, e, i)
}, mercator.Row.prototype.unsmoothen = function () {
    this.applySmoothening(!1, this.points, this.smoothness, !1)
}, mercator.Row.prototype.transformToAroundFirst = function (t, e) {
    return this.transformTo(this.firstChair(), !1, t, e)
}, mercator.Row.prototype.transformToAroundLast = function (t, e) {
    return this.transformTo(this.lastChair(), !0, t, e)
}, mercator.Row.prototype.applyChairSpacing = function (t) {
    const e = new mercator.RayFromOriginAndAngle(this.firstChair().center(), this.createRayFromFirstChairToLast().angle());
    this.applyChairSpacingOverRay(t, e)
}, mercator.Row.prototype.applyChairSpacingOverRay = function (t, e) {
    this.chairSpacing = t;
    let i = e.distributedPoints ? e.distributedPoints(this.chairs.length) : e.pointsAtInterval(this.getSpacePerChair(), this.chairs.length);
    this.refreshChairPositions(i)
}, mercator.Row.prototype.calculateChairspacingForNumberOfSeats = function (t) {
    const e = t - 1;
    return (this.calculateLength() - e * mercator.Chair.width) / e
}, mercator.Row.prototype.calculateLength = function () {
    return this.createSeatsPathRay().length()
}, mercator.Row.prototype.anyChairsDisabledEditingBySafeMode = function () {
    return this.chairs.some(t => t.disabledEditingBySafeMode())
}, mercator.Row.prototype.minDrawableSeats = function () {
    return this.disabledEditingBySafeMode() ? this.chairs.reduce((t, e) => t + (e.published ? 1 : 0), 0) : 1
}, mercator.Row.prototype.minSeatCount = function () {
    const t = mercator.Row.MAX_CHAIR_SPACING + mercator.Chair.width,
        e = Math.ceil(this.calculateLength() / t) + 1;
    return Math.max(this.minDrawableSeats(), e)
}, mercator.Row.prototype.maxSeatCount = function () {
    const t = mercator.Row.MIN_CHAIR_SPACING + mercator.Chair.width;
    return Math.floor(this.calculateLength() / t) + 1
}, mercator.Row.prototype.createSeatsPathRay = function () {
    return this.isMultiSegmentRow() ? new mercator.MultiRay(this.points) : this.createRayFromFirstChairToLast()
}, mercator.Row.prototype.applySeatCount = function (t) {
    if (this.numberOfChairs() === t) return;
    const e = this.calculateChairspacingForNumberOfSeats(t);
    let i = this.createSeatsPathRay();
    if (this.undraw(), this.numberOfChairs() > t) this.chairs = this.chairs.splice(0, t);
    else {
        const e = t - this.numberOfChairs();
        for (let t = 0; t < e; t++) {
            const t = this.chairs.last().center(),
                e = new mercator.Chair(t, this, this.subChart);
            e.applyCategory(this.getChairsCategories()[0]), this.addChair(e)
        }
    }
    this.applyChairSpacingOverRay(e, i), this.applySeatLabeling(), this.redraw(), this.designer.requestStatsUpdate()
}, mercator.Row.prototype.refreshChairPositions = function (t) {
    const e = t.map((t, e) => this.reinstantiateChairAt(t, e));
    this.undraw(), this.chairs = e, this.curveGhostPoint1 = null, this.curveGhostPoint2 = null, this.curve = 0
}, mercator.Row.prototype.getSpacePerChair = function () {
    return mercator.Chair.width + this.chairSpacing
}, mercator.Row.prototype.transformTo = function (t, e, i, s) {
    const o = this.getSpacePerChair() * (this.minDrawableSeats() - 1) + this.chairSpacing;
    var a = new mercator.Ray(t.center(), i).enlarge(this.chairSpacing).ensureMin(o);
    s || (a = a.snapToAngle(mercator.ChartDesigner.snapToAngle));
    const r = a.pointsAtInterval(this.getSpacePerChair()),
        n = r.map((t, i) => {
            const s = e ? r.length - 1 - i : i;
            return this.reinstantiateChairAt(t, s)
        });
    return e && n.reverse(), this.undraw(), this.chairs = n, this.curveGhostPoint1 = null, this.curveGhostPoint2 = null, this.curve = 0, this
}, mercator.Row.prototype.reinstantiateChairAt = function (t, e) {
    const i = new mercator.Chair(t, this, this.subChart);
    return this.chairs[e] ? this.chairs[e].transferPropertiesTo(i) : i.applyCategory(this.getChairsCategories()[0]), i
}, mercator.Row.prototype.undrawAllChairs = function () {
    this.chairs.forEach(function (t) {
        t.undraw()
    })
}, mercator.Row.prototype.hide = function () {
    this.allElementsSet().hide()
}, mercator.Row.prototype.show = function () {
    this.allElementsSet().show()
}, mercator.Row.prototype.createRayFromFirstChairToLast = function () {
    if (1 === this.numberOfChairs()) return this.createRayFromFirstChairToOffsetFromX(-.1);
    let t = this.firstChair().center();
    return new mercator.Ray(t, this.lastChair().center())
}, mercator.Row.prototype.createRayFromFirstTwoChairs = function () {
    return this.numberOfChairs() >= 2 ? new mercator.Ray(this.chairs[1].center(), this.firstChair().center()) : this.createRayFromFirstChairToOffsetFromX(.1)
}, mercator.Row.prototype.createRayFromLastTwoChairs = function () {
    return this.numberOfChairs() >= 2 ? new mercator.Ray(this.chairs[this.numberOfChairs() - 2].center(), this.lastChair().center()) : this.createRayFromFirstChairToOffsetFromX(-.1)
}, mercator.Row.prototype.createRayFromFirstChairToOffsetFromX = function (t) {
    let e = this.firstChair().center();
    return new mercator.Ray(e, e.addToX(t))
}, mercator.Row.prototype.createRayFromFirstChairBorderToLast = function () {
    if (1 === this.numberOfChairs()) return new mercator.Ray(this.bbox().middleLeft(), this.bbox().middleRight()); {
        let t = this.createRayFromFirstChairToLast(),
            e = t.plusAngle(180).pointAtDistanceFromOrigin(mercator.Chair.radius()),
            i = t.revert().plusAngle(180).pointAtDistanceFromOrigin(mercator.Chair.radius());
        return new mercator.Ray(e, i)
    }
}, mercator.Row.prototype.bbox = function () {
    return mercator.Bbox.mergedFromObjects(this.chairs).mergeWith(this.labeler.bbox())
}, mercator.Row.prototype.selectionArea = function () {
    return this.hasOneOrTwoChairs() ? new mercator.LineShape(this.centersOfChairsForLine()) : this.isMultiSegmentRow() && !this.smooth ? new mercator.LineShape(this.points) : new mercator.LineShape(this.chairs.map(t => t.center()))
}, mercator.Row.prototype.getPerceptualCenter = function () {
    return this.curvedCenter()
}, mercator.Row.prototype.getChairs = function () {
    return this.chairs
}, mercator.Row.prototype._setOfChairElements = function () {
    return pushAll(mercator.set(), this.chairs.map(function (t) {
        return t.svgElement()
    }))
}, mercator.Row.prototype.applyElementAttributes = function () {
    mercator.Object.prototype.applyElementAttributes.apply(this), this.chairs.forEach(t => t.applyElementAttributes())
}, mercator.Row.prototype.visibleElementsSetWithoutChildren = function () {
    return mercator.set()
}, mercator.Row.prototype.visibleElementsSet = function () {
    return [this._setOfChairElements(), this.labeler.asSet(), this.positionGuides]
}, mercator.Row.prototype.allElementsSet = function () {
    let t = mercator.Object.prototype.allElementsSet.apply(this);
    return this.chairs.forEach(e => {
        pushAll(t, e.allElementsSet())
    }), t
}, mercator.Row.prototype.center = function () {
    return this.chairs.length > 0 ? this.firstChair().center().averageWith(this.lastChair().center()) : null
}, mercator.Row.prototype.getCenter = function () {
    return this.center()
}, mercator.Row.prototype._elements = function () {
    return this.allElementsSet()
}, mercator.Row.prototype.toJson = function () {
    const t = [];
    this.getChairs().forEach(function (e) {
        t.push(e.toJson())
    });
    const e = {
        label: this.label,
        displayLabel: this.displayLabel,
        sectionLabel: this.sectionLabel,
        sectionDisplayedLabel: this.sectionDisplayedLabel,
        rowLabelPosition: this.rowLabelPosition,
        seatLabeling: this.seatLabeling.toJson(),
        objectLabeling: this.objectLabeling.toJson(),
        seats: t,
        curve: this.curve,
        chairSpacing: this.chairSpacing,
        verticalRowLabelDirection: this.verticalRowLabelDirection,
        displayObjectType: this.displayObjectType,
        objectType: "row",
        uuid: this.uuid,
        points: this.points ? this.points.map(t => t.toJson(this.subChart)) : null,
        smooth: this.smooth,
        smoothness: this.smoothness,
        rowLabelDisabled: this.rowLabelDisabled,
        published: this.published
    };
    return this.curveGhostPointsSet() && (e.curveGhostPoint1 = this.curveGhostPoint1.toJson(this.subChart), e.curveGhostPoint2 = this.curveGhostPoint2.toJson(this.subChart)), e
}, mercator.Row.prototype.rotate = function (t) {
    this.rotated(this.center(), t)
}, mercator.Row.prototype.setRotation = function (t) {
    this.rotate(t - this.getRotation())
}, mercator.Row.prototype.remove = function () {
    this.subChart.deleteRow(this)
}, mercator.Row.prototype.removeChair = function (t) {
    1 === this.numberOfChairs() ? this.remove() : this.isChairAtEdge(t) ? this.removeChairAtEdge(t) : this.removeChairInside(t), this.designer.requestStatsUpdate()
}, mercator.Row.prototype.isChairAtEdge = function (t) {
    return t === this.firstChair() || t === this.lastChair()
}, mercator.Row.prototype.removeChairAtEdge = function (t) {
    this.undraw(), this.chairs.remove(t), this.draw()
}, mercator.Row.prototype.removeChairInside = function (t) {
    this.undraw();
    let e = this.chairs.indexOf(t),
        i = this.chairs.slice(0, e),
        s = this.chairs.slice(e + 1);
    this.chairs = i;
    let o = this.shallowClone(this.subChart);
    o.chairs = s, o.chairs.forEach(t => t.parent = o), this.subChart.addRow(o), o.redraw(), this.draw()
}, mercator.Row.prototype.centersOfChairs = function () {
    var t = [];
    return pushAll(t, this.chairs.map(function (t) {
        return t.center()
    })), t
}, mercator.Row.prototype.centersOfChairsForLine = function () {
    if (this.hasOneOrTwoChairs()) {
        let t = this.createRayFromFirstChairBorderToLast();
        return [t.origin, t.end]
    }
    return this.centersOfChairs()
}, mercator.Row.prototype.extendCentersOfChairsInParallel = function (t) {
    return ray = this.createRayFromFirstChairBorderToLast(), t.unshift(ray.plusAngle(180).pointAtDistanceFromOrigin(this.getSpacePerChair())), t.push(ray.revert().plusAngle(180).pointAtDistanceFromOrigin(this.getSpacePerChair())), t
}, mercator.Row.prototype.pointsToSnapTo = function () {
    const t = this.extendCentersOfChairsInParallel(this.centersOfChairs()),
        e = mercator.Point.midpoints(t);
    return pushAll(t, e)
}, mercator.Row.prototype.flip = function (t, e) {
    return this.chairs.forEach(function (e) {
        e.move(t.mirror(e.center()))
    }), this.curveGhostPointsSet() && (this.curveGhostPoint1 = t.mirror(this.curveGhostPoint1), this.curveGhostPoint2 = t.mirror(this.curveGhostPoint2)), this.points && (this.points = this.points.map(e => t.mirror(e))), e || (this.curve = -this.curve), this.redraw(), this
}, mercator.Row.prototype.curveGhostPointsSet = function () {
    return this.curveGhostPoint1 && this.curveGhostPoint2
}, mercator.Row.prototype.numberOfUnlabeledSeats = function () {
    return this.numberOfChairs() - this.numberOfLabeledSeats()
}, mercator.Row.prototype.totalPeopleCapacity = function () {
    return this.numberOfChairs()
}, mercator.Row.prototype.numberOfLabeledSeats = function () {
    return this.chairs.reduce(function (t, e) {
        return e.hasLabel() ? ++t : t
    }, 0)
}, mercator.Row.prototype.applySeatLabeling = function (t = null, e = null, i = null) {
    if (null !== t && (this.seatLabeling.algoName = t), null !== e && (this.seatLabeling.startAtIndex = e), null !== i && (this.seatLabeling.isInverted = i), mercator.AutoLabeler.startAtZeroAlgorithms.includes(this.seatLabeling.algoName) || (this.seatLabeling.startAtIndex = Math.max(0, this.seatLabeling.startAtIndex)), this.seatLabeling.algoName) {
        var s = this.children().length;
        this.children().forEach((t, e) => {
            let i = mercator.AutoLabeler.normalizeIndex(e, s, this.seatLabeling.getIsInverted());
            t.changeLabel(mercator.AutoLabeler.getAlgorithm(this.seatLabeling.algoName).calculateLabel(i, this.seatLabeling.startAtIndex, s, [], this.seatLabeling.useEndAt))
        })
    }
}, mercator.Row.prototype.setSeatLabelingEndAt = function (t = !0) {
    this.seatLabeling.useEndAt = t
}, mercator.Row.prototype.applyObjectLabeling = function (t, e, i, s, o) {
    null !== t && (this.objectLabeling.algoName = t.name), null !== e && (this.objectLabeling.prefix = e), null !== i && (this.objectLabeling.startAtIndex = i), this.objectLabeling.algoName && this.changeLabel(mercator.AutoLabeler.calculateObjectLabel(o, s, this.objectLabeling))
}, mercator.Row.prototype.addSkippedCharacter = function (t) {
    this.objectLabeling.skippedCharacters.add(t)
}, mercator.Row.prototype.removeSkippedCharacter = function (t) {
    this.objectLabeling.skippedCharacters.delete(t)
}, mercator.Row.prototype.changeLabel = function (t) {
    mercator.Object.prototype.changeLabel.call(this, t), this.redraw()
}, mercator.Row.prototype.changeDisplayLabel = function (t) {
    mercator.Object.prototype.changeDisplayLabel.call(this, t), this.redraw()
}, mercator.Row.prototype.clearSeatLabels = function () {
    this.children().forEach(function (t) {
        t.clearLabel()
    }), this.seatLabeling = new mercator.SeatLabeling
}, mercator.Row.prototype.inverseSeatLabels = function () {
    for (var t = this.chairs.map(function (t) {
        return t.label
    }), e = 0; e < this.chairs.length; e++) this.children()[e].changeLabel(t[this.chairs.length - 1 - e])
}, mercator.Row.prototype.isVertical = function () {
    return 90 === this.getRoundedRotation() || 270 === this.getRoundedRotation()
}, mercator.Row.prototype.getRoundedRotation = function () {
    return Math.round(this.getRotation())
}, mercator.Row.prototype.getLabelRotation = function () {
    return this.isVertical() && this.verticalRowLabelDirection ? "BASELINE_LEFT" === this.getVerticalRowLabelDirection() ? 90 : 270 : toSecondOrThirdQuadrant(this.getRotation())
}, mercator.Row.prototype.isInQuadrants1Or4OrRotated360 = function () {
    return this.createRayFromFirstChairToLast().isInFirstOrFourthQuadrant() || 360 === this.getRoundedRotation()
}, mercator.Row.prototype.setVerticalRowLabelDirection = function (t) {
    this.verticalRowLabelDirection = t
}, mercator.Row.prototype.getVerticalRowLabelDirection = function () {
    return this.verticalRowLabelDirection
}, mercator.Row.createFromModel = function (t, e) {
    var i = new mercator.Row(e);
    return t.seats.forEach(function (t) {
        i.addChair(mercator.Chair.fromJson(t, i, e))
    }), i.curve = t.curve, t.chairSpacing && (i.chairSpacing = t.chairSpacing), i.displayObjectType = t.displayObjectType || mercator.Row.prototype.type, i.label = t.label, i.displayLabel = t.displayLabel || null, i.sectionLabel = t.sectionLabel || null, i.sectionDisplayedLabel = t.sectionDisplayedLabel || null, i.rowLabelPosition = void 0 === t.rowLabelPosition ? i.rowLabelPosition : t.rowLabelPosition, i.seatLabeling = mercator.SeatLabeling.fromJson(t.seatLabeling), i.verticalRowLabelDirection = t.verticalRowLabelDirection || "BASELINE_LEFT", i.objectLabeling = mercator.ObjectLabeling.fromJson(t.objectLabeling), i.uuid = t.uuid, t.points && (i.points = t.points.map(t => mercator.Point.fromJson(t, e))), i.smooth = t.smooth, i.smoothness = t.smoothness, i.rowLabelDisabled = t.rowLabelDisabled || !1, i.published = void 0 !== t.published ? t.published : e.designer.isPublished(), t.curveGhostPoint1 && (i.curveGhostPoint1 = mercator.Point.fromJson(t.curveGhostPoint1, e), i.curveGhostPoint2 = mercator.Point.fromJson(t.curveGhostPoint2, e)), i
}, mercator.Row.drawShapes = function (t, e, i) {
    return new mercator.Ray(t, e).enlarge(mercator.Chair.widthPlusStroke / 2).pointsAtInterval(mercator.Chair.width + i.rowChairSpacing).map(function (t) {
        return mercator.Chair.drawShape(t, i)
    }).toSet(i)
}, mercator.Row.drawShapesAcrossAMultiLine = function (t, e) {
    if (0 !== t.length) return 1 === t.length ? [mercator.Chair.drawShape(t[0], e)].toSet(e) : new mercator.MultiRay(t).enlarge(mercator.Chair.widthPlusStroke / 2).pointsAtInterval(mercator.Chair.width + e.rowChairSpacing).map(t => mercator.Chair.drawShape(t, e)).toSet(e)
}, mercator.Row.createFromChairs = function (t, e) {
    var i = new mercator.Row(e.activeSubChart());
    return t.forEach(function (t) {
        t.parent = i, i.addChair(t)
    }), i
}, mercator.Row.curveDelta = 8, mercator.Row.height = function () {
    return mercator.Chair.width + mercator.Row.getSpacing()
}, mercator.Row.getSpacing = function () {
    return mercator.designer.rowSpacing
}, mercator.Row.DEFAULT_CHAIR_SPACING = 5, mercator.Row.DEFAULT_SPACING = 14, mercator.Row.DEFAULT_VERTICAL_ROW_BASELINE = "BASELINE_LEFT", mercator.Row.MIN_SPACING = 0, mercator.Row.MAX_SPACING = 60, mercator.Row.MIN_CHAIR_SPACING = 1, mercator.Row.MAX_CHAIR_SPACING = 2 * (mercator.Chair.width + mercator.Row.DEFAULT_CHAIR_SPACING), mercator.Row.DISPLAY_OBJECT_TYPES = ["row", "couch", "bar"], mercator.Row.DEFAULT_SMOOTHNESS = 50;
mercator.NumberOfRowsAndChairs = class {
    constructor(e) {
        this.designer = e, this.elements = mercator.set()
    }
    refresh(e, t, s) {
        let i = 1 === t ? s : `${t} × ${s}`;
        t <= 1 && s < 4 ? this.elements.length > 0 && this.undraw() : this.elements.length > 0 ? this.updateAttributes(e, i) : (this.undraw(), this.draw(e, i))
    }
    updateAttributes(e, t) {
        let s = this.elements.toArray()[0],
            i = this.elements.toArray()[1];
        s.attr({
            x: e.x,
            y: e.y
        }).applyZoom(this.designer), s.node.textContent = t;
        let r = s.bbox();
        i.attr({
            x: r.x - 7,
            y: r.y - 3,
            width: r.width + 14,
            height: r.height + 6
        }).applyZoom(this.designer)
    }
    draw(e, t) {
        var s = this.designer.drawer.text(e.x, e.y, t, {
            fill: "white",
            "font-size": mercator.NumberOfRowsAndChairs.defaultFontSize,
            "font-family": mercator.TextInput.defaultFontFamily,
            "font-weight": "bold"
        }).applyZoom(this.designer);
        s.node.setAttribute("pointer-events", "none");
        var i = s.bbox(),
            r = this.designer.drawer.rect(i.x - 7, i.y - 3, i.width + 14, i.height + 6, 3, {
                fill: "hsl(0%, 0, 0.2)",
                stroke: "white",
                "stroke-width": 1.5
            }).applyZoom(this.designer);
        s.front(), r.node.setAttribute("pointer-events", "none"), this.elements = mercator.set(s, r)
    }
    undraw() {
        this.elements.remove(), this.elements.clear()
    }
    isReadable() {
        return this.designer.zoomer.zoomed(mercator.NumberOfRowsAndChairs.defaultFontSize) > 6
    }
}, mercator.NumberOfRowsAndChairs.defaultFontSize = 15;
mercator.Rectangle = function (t, e, i) {
    this.point1 = t, this.point2 = e, this.width = Math.abs(this.point1.x - this.point2.x), this.height = Math.abs(this.point1.y - this.point2.y), this.designer = i, this.rectangle = null
}, mercator.Rectangle.prototype.enlarge = function (t) {
    return new mercator.Rectangle(this.point1.addToXAndY(-t), this.point2.addToXAndY(t), this.designer)
}, mercator.Rectangle.prototype.draw = function (t) {
    return this.rectangle = this.designer.drawRectangle(this.point1.x, this.point1.y, this.point2.x, this.point2.y).attr(t), this
}, mercator.Rectangle.prototype.undraw = function () {
    this.rectangle.remove(), this.rectangle = null
}, mercator.Rectangle.prototype.center = function () {
    return this.point1.averageWith(this.point2)
}, mercator.Rectangle.prototype.rotate = function (t) {
    this.point1 = this.point1.rotateAround(this.center(), t), this.point2 = this.point2.rotateAround(this.center(), t)
}, mercator.Rectangle.fromBBox = function (t, e) {
    return new mercator.Rectangle(new mercator.Point(t.x, t.y), new mercator.Point(t.x2, t.y2), e)
};
mercator.Drag = {
    _started: !1,
    start: function () {
        this._started = !0
    },
    stop: function () {
        this._started = !1
    },
    isStarted: function () {
        return this._started
    },
    autoStopDrag: function () {
        setTimeout(function () {
            mercator.Drag.stop()
        }, 100)
    }
}, jQuery.fn.clickWhenNotDragged = function (t) {
    return this.click(a => {
        a.stopPropagation(), $("input:focus").blur(), window.focus(), mercator.Drag.isStarted() ? mercator.Drag.stop() : t(a)
    }), this
}, mercator.onDrag = function (t, a, o, s, r, i) {
    var n, e, u = !1;
    let c = [];
    Array.isArray(a) ? c = a : c.push(a), c.forEach(a => {
        a.raphaelElement.drag(function (t, a, r, c, g) {
            (u || i || draggingReallyStartedAndNotJustClick(t, a)) && (u || (u = !0, mercator.Drag.start(), s && s(g)), n = t, e = a, o(t, a, g, r, c))
        }, function (t, a, o) {
            o.stopPropagation()
        }, function () {
            u && (mercator.Drag.autoStopDrag(), u = !1, r && r(mercator.Vector.fromView(n, e, t)))
        })
    })
};
var INFINITY = 99999999;
mercator.Point = function (t, o) {
    this.x = t, this.y = o
}, mercator.Point.prototype.type = "Point", mercator.Point.prototype.toJson = function (t) {
    var o, i = this;

    function n(t) {
        return {
            x: roundTo2Places(t.x),
            y: roundTo2Places(t.y)
        }
    }
    return n(t ? (o = t.getBBox()) ? new mercator.Point(i.x - o.origin.x, i.y - o.origin.y) : i : this)
}, mercator.Point.prototype.asTranslation = function () {
    return "t" + Math.round(this.x) + "," + Math.round(this.y)
}, mercator.Point.prototype.vectorTo = function (t, o) {
    return t.minus(this).asVector(o)
}, mercator.Point.prototype.minus = function (t) {
    return new mercator.Point(this.x - t.x, this.y - t.y)
}, mercator.Point.prototype.multiplyBy = function (t) {
    return new mercator.Point(this.x * t, this.y * t)
}, mercator.Point.prototype.divideBy = function (t) {
    return this.multiplyBy(1 / t)
}, mercator.Point.prototype.addToXAndY = function (t) {
    return new mercator.Point(this.x + t, this.y + t)
}, mercator.Point.prototype.addToX = function (t) {
    return new mercator.Point(this.x + t, this.y)
}, mercator.Point.prototype.addToY = function (t) {
    return new mercator.Point(this.x, this.y + t)
}, mercator.Point.prototype.averageWith = function (t) {
    return new mercator.Point(average(this.x, t.x), average(this.y, t.y))
}, mercator.Point.prototype.add = function (t) {
    return new mercator.Point(this.x + t.x, this.y + t.y)
}, mercator.Point.prototype.subtract = function (t) {
    return new mercator.Point(this.x - t.x, this.y - t.y)
}, mercator.Point.prototype.snapToGrid = function (t) {
    return mercator.Point.snapToGrid(this.x, this.y, t)
}, mercator.Point.prototype.snapToGridEvenIfNotEnabled = function () {
    function t(t) {
        return snapTo(mercator.Point.SNAP_PRECISION, t)
    }
    return new mercator.Point(t(this.x), t(this.y))
}, mercator.Point.prototype.verticalDistanceTo = function (t) {
    return Math.abs(t.x - this.x)
}, mercator.Point.prototype.closestVertically = function (t, o) {
    return this.verticalDistanceTo(t) < this.verticalDistanceTo(o) ? t : o
}, mercator.Point.prototype.horizontalDistanceTo = function (t) {
    return Math.abs(t.y - this.y)
}, mercator.Point.prototype.closestHorizontally = function (t, o) {
    return this.horizontalDistanceTo(t) < this.horizontalDistanceTo(o) ? t : o
}, mercator.Point.prototype.rotateAround = function (t, o) {
    var i = Math.cos(rad(o)),
        n = Math.sin(rad(o)),
        s = this.x - t.x,
        e = this.y - t.y,
        r = i * s - n * e + t.x,
        a = n * s + i * e + t.y;
    return new mercator.Point(r, a)
}, mercator.Point.prototype.asVector = function (t) {
    return new mercator.Vector(this.x, this.y, t)
}, mercator.Point.prototype.distanceToRow = function (t) {
    return this.distanceToRay(t.createRayFromFirstChairBorderToLast())
}, mercator.Point.prototype.distanceToRay = function (t) {
    return t.distanceToPoint(this)
}, mercator.Point.prototype.distanceToPoint = function (t) {
    var o = t.x - this.x,
        i = t.y - this.y;
    return Math.sqrt(o * o + i * i)
}, mercator.Point.prototype.length = function () {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
}, mercator.Point.prototype.withX = function (t) {
    return new mercator.Point(t, this.y)
}, mercator.Point.prototype.withY = function (t) {
    return new mercator.Point(this.x, t)
}, mercator.Point.prototype.findClosestTo = function (t) {
    var o = this;
    return t.reduce(function (t, i) {
        return o.distanceToPoint(i) < o.distanceToPoint(t) ? i : t
    })
}, mercator.Point.getClosestPointOnLines = function (t, o) {
    var i, n, s, e, r, a;
    if (o.length > 1) {
        for (var u = 1; u < o.length; u++) {
            if (o[u].x !== o[u - 1].x) {
                var h = (o[u].y - o[u - 1].y) / (o[u].x - o[u - 1].x),
                    y = o[u].y - h * o[u].x;
                a = Math.abs(h * t.x + y - t.y) / Math.sqrt(h * h + 1)
            } else a = Math.abs(t.x - o[u].x);
            var p = Math.pow(o[u].y - o[u - 1].y, 2) + Math.pow(o[u].x - o[u - 1].x, 2),
                P = Math.pow(o[u].y - t.y, 2) + Math.pow(o[u].x - t.x, 2),
                c = Math.pow(o[u - 1].y - t.y, 2) + Math.pow(o[u - 1].x - t.x, 2),
                x = Math.pow(a, 2),
                f = P - x + c - x;
            f > p && (a = Math.sqrt(Math.min(P, c))), (null == i || i > a) && (f > p ? c < P ? (n = 0, 1) : (0, n = 1) : (n = Math.sqrt(c - x) / Math.sqrt(p), Math.sqrt(P - x) / Math.sqrt(p)), i = a, r = u)
        }
        var l = o[r - 1].x - o[r].x,
            w = o[r - 1].y - o[r].y;
        s = o[r - 1].x - l * n, e = o[r - 1].y - w * n
    }
    return new mercator.Point(s, e)
}, mercator.Point.prototype.opposite = function () {
    return new mercator.Point(-this.x, -this.y)
}, mercator.Point.prototype.equals = function (t) {
    return this.x === t.x && this.y === t.y
}, mercator.Point.prototype.applyMatrix = function (t) {
    return new mercator.Point(t.x(this.x, this.y), t.y(this.x, this.y))
}, mercator.Point.prototype.isInsidePolygon = function (t) {
    let o;
    if (1 === (o = t.points[0].point ? t.points.map(t => t.point) : t.points).length) return o[0].equals(this);
    if (2 === o.length) return this.isOnLineSegment(o[0], o[1]);
    let i = !1;
    for (let t = 0, n = o.length - 1; t < o.length; n = t++) {
        let s = o[t].x,
            e = o[t].y,
            r = o[n].x,
            a = o[n].y;
        e > this.y != a > this.y && this.x < (r - s) * (this.y - e) / (a - e) + s && (i = !i)
    }
    return i
}, mercator.Point.prototype.isOnLineSegment = function (t, o) {
    function i(t, o, i) {
        return Math.abs((n = t.x, (i.y - o.y) / (i.x - o.x) * (n - o.x) + o.y - t.y)) < 1e-6 && t.x >= o.x && t.x <= i.x;
        var n
    }
    return i(this, t, o) || i(this, o, t)
}, mercator.Point.prototype.toView = function (t) {
    let o = new SVG.Point(this.x, this.y).transform(t.zoomer.transformationMatrix);
    return new mercator.Point(o.x, o.y)
}, mercator.Point.prototype.fromView = function (t) {
    return mercator.Point.fromView(this.x, this.y, t)
}, mercator.Point.prototype.floor = function () {
    return new mercator.Point(Math.floor(this.x), Math.floor(this.y))
}, mercator.Point.prototype.clone = function () {
    return new mercator.Point(this.x, this.y)
}, mercator.Point.snapToGrid = function (t, o, i) {
    function n(t) {
        return mercator.ChartDesigner.snapToGridEnabled ? snapTo(i || mercator.Point.SNAP_PRECISION, t) : t
    }
    return new mercator.Point(n(t), n(o))
}, mercator.Point.fromEventSnapped = function (t, o) {
    var i = mercator.Point.fromEvent(t, o);
    return t.altKey ? i : o.snapPoint(i)
}, mercator.Point.fromEvent = function (t, o) {
    return mercator.Point.fromView(t.pageX, t.pageY, o)
}, mercator.Point.fromDict = function (t) {
    return new mercator.Point(t.x, t.y)
}, mercator.Point.midpoints = function (t) {
    var o, i = [];
    return t.forEach(function (t) {
        o && i.push(t.averageWith(o)), o = t
    }), i
}, mercator.Point.centerOfBBox = function (t) {
    return new mercator.Point(t.x, t.y).averageWith(new mercator.Point(t.x2, t.y2))
}, mercator.Point.fromJson = function (t, o) {
    var i = new mercator.Point(t.x, t.y);
    return o.pointFromJson(i)
}, mercator.Point.fromX = function (t) {
    return new mercator.Point(t, 0)
}, mercator.Point.fromY = function (t) {
    return new mercator.Point(0, t)
}, mercator.Point.fromView = function (t, o, i) {
    let n = new SVG.Point(t, o).transform(i.zoomer.transformationMatrix.inverse());
    return new mercator.Point(n.x, n.y)
}, mercator.Point.x = function (t) {
    return t.x
}, mercator.Point.y = function (t) {
    return t.y
}, mercator.Point.translatePointWithRotation = function (t, o, i, n) {
    let s = t.x - o.x * Math.cos(n) + o.y * Math.sin(n),
        e = t.y - o.x * Math.sin(n) - o.y * Math.cos(n),
        r = (i.x - s) * Math.cos(n) + (i.y - e) * Math.sin(n),
        a = (i.y - e) * Math.cos(n) - (i.x - s) * Math.sin(n);
    return new mercator.Point(r, a)
}, mercator.Point.SNAP_PRECISION = 4;
mercator.Angle = class {
    constructor(i) {
        this.angle = i, this.normalize()
    }
    inDegrees() {
        return this.angle
    }
    inRadians() {
        return rad(this.angle)
    }
    round() {
        return this.angle = Math.round(this.angle), this
    }
    isQ1() {
        return this.angle >= 0 && this.angle < 90
    }
    isQ2() {
        return this.angle >= 90 && this.angle < 180
    }
    isQ3() {
        return this.angle >= 180 && this.angle < 270
    }
    isQ4() {
        return this.angle >= 270 && this.angle < 360
    }
    isInTheSameQ(i) {
        return this.isQ1() && i.isQ1() || this.isQ2() && i.isQ2() || this.isQ3() && i.isQ3() || this.isQ4() && i.isQ4()
    }
    isInTheHorizontalMirror(i) {
        return this.isQ1() && i.isQ4() || this.isQ4() && i.isQ1() || this.isQ2() && i.isQ3() || this.isQ3() && i.isQ2()
    }
    mirror(i) {
        if (0 === this.angle) return 180 - i;
        if (90 === this.angle) return -i;
        throw new Error("Can only mirror vertically or horizontally")
    }
    normalize() {
        let i = this.angle % 360;
        return this.angle = i < 0 ? i + 360 : i, this
    }
}, mercator.Angle.fromPoints = function (i, s) {
    return new mercator.Angle(angle(s.x, s.y, i.x, i.y))
};
mercator.Vector = function (e, o, t) {
    this.x = e, this.y = o, this.designer = t
}, mercator.Vector.prototype.snapToGrid = function () {
    return mercator.Point.snapToGrid(this.x, this.y).asVector(this.designer)
}, mercator.Vector.prototype.asTranslation = function () {
    return (new SVG.Matrix).translate(this.x * this.designer.zoomer.zoomLevel, this.y * this.designer.zoomer.zoomLevel)
}, mercator.Vector.fromView = function (e, o, t) {
    return new mercator.Vector(e / t.zoomer.zoomLevel, o / t.zoomer.zoomLevel, t)
};
mercator.AbstractRay = function () { }, mercator.AbstractRay.prototype.init = function (t) {
    this.origin = t
}, mercator.AbstractRay.prototype.angleInRadians = function () {
    return this.getAngleObject().inRadians()
}, mercator.AbstractRay.prototype.plusAngle = function (t) {
    return new mercator.RayFromOriginAndAngle(this.origin, this.angle() + t)
}, mercator.AbstractRay.prototype.pointAtDistanceFromPoint = function (t, i) {
    return new mercator.Point(t * Math.cos(this.angleInRadians()) + i.x, t * Math.sin(this.angleInRadians()) + i.y)
}, mercator.AbstractRay.prototype.pointAtDistanceFromOrigin = function (t) {
    return this.pointAtDistanceFromPoint(t, this.origin)
}, mercator.AbstractRay.prototype.snapLengthToMultipleOf = function (t) {
    var i = Math.ceil(this.length() / t) * t,
        n = this.pointAtDistanceFromOrigin(i);
    return new mercator.Ray(this.origin, n)
}, mercator.AbstractRay.prototype.oposingRayAtDistance = function (t) {
    return new mercator.Ray(this.pointAtDistanceFromOrigin(t), this.origin)
}, mercator.AbstractRay.prototype.angleBetween = function (t) {
    return this.angle() - t.angle()
}, mercator.AbstractRay.prototype.distanceToOrigin = function (t) {
    return t.distanceToPoint(this.origin)
}, mercator.AbstractRay.prototype.projectPoint = function (t) {
    var i = this.pointAtDistanceFromOrigin(50),
        n = i.x - this.origin.x,
        e = i.y - this.origin.y,
        o = n * n + e * e,
        s = ((t.x - this.origin.x) * n + (t.y - this.origin.y) * e) / o;
    return new mercator.Point(this.origin.x + s * n, this.origin.y + s * e)
}, mercator.AbstractRay.prototype.mirror = function (t) {
    var i = this.projectPoint(t),
        n = t.distanceToPoint(i);
    return new mercator.Ray(i, t).plusAngle(180).pointAtDistanceFromOrigin(n)
}, mercator.AbstractRay.prototype.mirrorAngle = function (t) {
    return this.getAngleObject().mirror(t)
}, mercator.AbstractRay.prototype.isInFirstQuadrant = function () {
    return this.getAngleObject().isQ1()
}, mercator.AbstractRay.prototype.isInFourthQuadrant = function () {
    return this.getAngleObject().isQ4()
}, mercator.AbstractRay.prototype.isInFirstOrFourthQuadrant = function () {
    let t = this.getAngleObject().round();
    return t.isQ1() || t.isQ4()
}, mercator.RayFromOriginAndAngle = function (t, i) {
    this.angleObj = new mercator.Angle(i), this.init(t)
}, mercator.RayFromOriginAndAngle.prototype = new mercator.AbstractRay, mercator.RayFromOriginAndAngle.prototype.angle = function () {
    return this.angleObj.normalize().inDegrees()
}, mercator.RayFromOriginAndAngle.prototype.getAngleObject = function () {
    return this.angleObj
}, mercator.RayFromOriginAndAngle.prototype.snapToAngle = function (t) {
    var i = Math.round(this.angle() / t) * t;
    return new mercator.RayFromOriginAndAngle(this.origin, i)
}, mercator.RayFromOriginAndAngle.prototype.toRayWithDistance = function (t) {
    return new mercator.Ray(this.origin, new mercator.Point(this.origin.x + Math.cos(this.angleInRadians()) * t, this.origin.y + Math.sin(this.angleInRadians()) * t))
}, mercator.RayFromOriginAndAngle.prototype.pointsAtInterval = function (t, i) {
    let n = [];
    for (let e = 0; e < i; e++) n.push(this.toRayWithDistance(t * e).end);
    return n
}, mercator.Ray = function (t, i) {
    this.init(t), this.end = i
}, mercator.Ray.prototype = new mercator.AbstractRay, mercator.Ray.prototype.angle = function () {
    return mercator.Angle.fromPoints(this.origin, this.end).normalize().inDegrees()
}, mercator.Ray.prototype.getAngleObject = function () {
    return new mercator.Angle(this.angle())
}, mercator.Ray.prototype.plusAngleFromEnd = function (t) {
    return new mercator.RayFromOriginAndAngle(this.end, this.angle() + t)
}, mercator.Ray.prototype.add = function (t) {
    return new mercator.Ray(this.origin.add(t), this.end.add(t))
}, mercator.Ray.prototype.subtract = function (t) {
    return new mercator.Ray(this.origin.subtract(t), this.end.subtract(t))
}, mercator.Ray.prototype.enlarge = function (t) {
    var i = this.pointAtDistanceFromOrigin(this.length() + t);
    return new mercator.Ray(this.origin, i)
}, mercator.Ray.prototype.ensureMin = function (t) {
    const i = this.pointAtDistanceFromOrigin(Math.max(this.length(), t));
    return new mercator.Ray(this.origin, i)
}, mercator.Ray.prototype.enlargeOnBothSides = function (t) {
    return this.enlarge(t).revert().enlarge(t)
}, mercator.Ray.prototype.shrinkOnBothSides = function (t) {
    return this.enlargeOnBothSides(-t)
}, mercator.Ray.prototype.enlargeByFactor = function (t) {
    return this.enlarge(this.length() * (t - 1))
}, mercator.Ray.prototype.snapToAngle = function (t, i = 0) {
    var n = i + Math.round((this.angle() - i) / t) * t,
        e = new mercator.RayFromOriginAndAngle(this.origin, n).pointAtDistanceFromOrigin(this.length());
    return new mercator.Ray(this.origin, e)
}, mercator.Ray.prototype.pointAtDistanceFromPoint = function (t, i) {
    return new mercator.Point(t * Math.cos(this.angleInRadians()) + i.x, t * Math.sin(this.angleInRadians()) + i.y)
}, mercator.Ray.prototype.pointAtDistanceFromEnd = function (t) {
    return this.pointAtDistanceFromPoint(t, this.end)
}, mercator.Ray.prototype.length = function () {
    return this.origin.distanceToPoint(this.end)
}, mercator.Ray.prototype.pointsAtInterval = function (t) {
    for (var i = [], n = 0; n <= this.length(); n += t) i.push(this.pointAtDistanceFromOrigin(n));
    return i
}, mercator.Ray.prototype.distributedPoints = function (t) {
    let i = this.length() / (t - 1),
        n = [];
    for (let e = 0; e < t; e++) n.push(this.pointAtDistanceFromOrigin(e * i));
    return n
}, mercator.Ray.prototype.revert = function () {
    return new mercator.Ray(this.end, this.origin)
}, mercator.Ray.prototype.intersectionWithRay = function (t, i = !1) {
    if (this.origin.x === this.end.x && this.origin.y === this.end.y || t.origin.x === t.end.x && t.origin.y === t.end.y) return !1;
    if (denominator = (t.end.y - t.origin.y) * (this.end.x - this.origin.x) - (t.end.x - t.origin.x) * (this.end.y - this.origin.y), 0 === denominator) return !1;
    let n = ((t.end.x - t.origin.x) * (this.origin.y - t.origin.y) - (t.end.y - t.origin.y) * (this.origin.x - t.origin.x)) / denominator,
        e = ((this.end.x - this.origin.x) * (this.origin.y - t.origin.y) - (this.end.y - this.origin.y) * (this.origin.x - t.origin.x)) / denominator;
    if (!i && (n < 0 || n > 1 || e < 0 || e > 1)) return !1;
    let o = this.origin.x + n * (this.end.x - this.origin.x),
        s = this.origin.y + n * (this.end.y - this.origin.y);
    return new mercator.Point(o, s)
}, mercator.Ray.prototype.intersectionPointWithRay = function (t, i = !1) {
    let n = this.intersectionWithRay(t, i);
    return n ? new mercator.Point(n.x, n.y) : null
}, mercator.Ray.prototype.middle = function () {
    return this.origin.averageWith(this.end)
}, mercator.Ray.prototype.distanceFromCenterToPoint = function (t) {
    return this.middle().distanceToPoint(t)
}, mercator.Ray.prototype.distanceToPoint = function (t) {
    if (0 === this.length()) return t.distanceToPoint(this.origin);
    var i = ((t.x - this.origin.x) * (this.end.x - this.origin.x) + (t.y - this.origin.y) * (this.end.y - this.origin.y)) / (this.length() * this.length());
    return i < 0 ? t.distanceToPoint(this.origin) : i > 1 ? t.distanceToPoint(this.end) : t.distanceToPoint(this.origin.add(new mercator.Point(i * (this.end.x - this.origin.x), i * (this.end.y - this.origin.y))))
}, mercator.Ray.prototype.drawLine = function (t) {
    return t.drawLineBetweenPoints(this.origin, this.end)
}, mercator.MultiRay = function (t) {
    this.points = t, this.segments = this.calculateSegments(), this.init(t[0])
}, mercator.MultiRay.prototype = new mercator.AbstractRay, mercator.MultiRay.prototype.first = function () {
    return this.segments.first()
}, mercator.MultiRay.prototype.last = function () {
    return this.segments.last()
}, mercator.MultiRay.prototype.calculateSegments = function () {
    if (this.points.length <= 1) return [];
    let t = [];
    for (var i = 0; i < this.points.length - 1; i++) t.push(new mercator.Ray(this.points[i], this.points[i + 1]));
    return t
}, mercator.MultiRay.prototype.lastSegment = function () {
    return this.segments[this.segments.length - 1]
}, mercator.MultiRay.prototype.enlarge = function (t) {
    const i = this.lastSegment().enlarge(t).end;
    let n = _.cloneDeep(this.points);
    return n.pop(), n.push(i), new mercator.MultiRay(n)
}, mercator.MultiRay.prototype.length = function () {
    let t = 0;
    const i = this.segments.map(t => t.length());
    for (let n = 0; n < i.length; n++) t += i[n];
    return t
}, mercator.MultiRay.prototype.pointsAtInterval = function (t) {
    let i = [];
    for (let n = 0; n <= this.length(); n += t) {
        const t = this.pointAtDistanceFromOriginAlongAllSegments(n, 0);
        i.push(t)
    }
    return i
}, mercator.MultiRay.prototype.distributedPoints = function (t) {
    let i = this.length() / (t - 1),
        n = [];
    for (let e = 0; e < t; e++) n.push(this.pointAtDistanceFromOriginAlongAllSegments(e * i, 0));
    return n
}, mercator.MultiRay.prototype.pointAtDistanceFromOriginAlongAllSegments = function (t, i) {
    let n = this.segments[i];
    return n ? n.length() < t ? this.pointAtDistanceFromOriginAlongAllSegments(t - n.length(), i + 1) : n.pointAtDistanceFromOrigin(t) : this.segments.last().end
};
mercator.ChairMousePointer = function (i) {
    this.designer = i, this.chairMousePointer = null
}, mercator.ChairMousePointer.prototype.init = function () {
    return this.chairMousePointer = this.designer.drawer.circle(0, 0, 0, {
        fill: "white",
        stroke: "#005cc5"
    }).toLayer("tempDrawingsLayer", this.designer).hide(), this
}, mercator.ChairMousePointer.prototype.hide = function () {
    this.chairMousePointer.hide()
}, mercator.ChairMousePointer.prototype.show = function (i) {
    this.chairMousePointer.attr("r", mercator.Chair.drawRadius()).show().applyZoom(this.designer), this.chairMousePointer.attr({
        cx: i.x,
        cy: i.y
    })
};
mercator.ObjectsSelector = function (e) {
    this.designer = e, this.selectionRectangle = null, this.selectedObjects = [], this.filter = null
}, mercator.ObjectsSelector.prototype.startSelection = function (e, t) {
    this.fromPosition = e, this.filter = t
}, mercator.ObjectsSelector.prototype.paintSelected = function (e) {
    e.forEach(e => {
        e.paintSelected(), this.designer.labelsShown && e.hideLabelAndChildLabels && e.hideLabelAndChildLabels()
    })
}, mercator.ObjectsSelector.prototype.paintUnselected = function (e) {
    e.forEach(e => {
        e.paintUnselected(), this.designer.labelsShown && e.hideLabelAndChildLabels && e.showLabelAndChildLabels()
    })
}, mercator.ObjectsSelector.inBbox = function (e, t) {
    return _.some(e.componentsWithBbox(), function (s) {
        var i = mercator.Bbox.toView(s.bbox(), e.designer);
        return isBBoxIntersect(t, i)
    })
}, mercator.ObjectsSelector.prototype.selectMultipleObjects = function (e) {
    if (this.selectionRectangle && this.selectionRectangle.remove(), !this.fromPosition.equals(e)) {
        this.selectionRectangle = this.designer.drawRectangle(this.fromPosition.x, this.fromPosition.y, e.x, e.y).applyZoom(this.designer), this.selectionRectangle.attr({
            fill: "rgba(50, 50, 50, 0.16)",
            stroke: "white",
            "stroke-width": this.designer.zoomer.unzoom(.75)
        });
        var t = this.selectionRectangle.rbox(),
            s = this.designer.activeSubChart().allSelectableObjects().filter(this.getFilter()).filter(function (e) {
                return mercator.ObjectsSelector.inBbox(e, t)
            });
        _.difference(s, this.selectedObjects).forEach(e => e.paintSelected());
        var i = _.difference(this.selectedObjects, s);
        this.paintUnselected(i), this.selectedObjects = s
    }
}, mercator.ObjectsSelector.prototype.getFilter = function () {
    return this.filter ? this.filter : function () {
        return !0
    }
}, mercator.ObjectsSelector.prototype.deselectObjects = function () {
    this.paintUnselected(this.selectedObjects), this.selectedObjects = []
}, mercator.ObjectsSelector.prototype.stopSelecting = function () {
    this.selectionRectangle && (this.selectionRectangle.remove(), this.selectionRectangle = null)
}, mercator.ObjectsSelector.prototype.objectsSelected = function () {
    return this.selectedObjects.length > 0
};
mercator.SelectedObjects = function (e, t, s = {}) {
    this.arrayOfObjects = e, this.designer = t, this.settings = s, this.selectionRectangle = null, this.rotationLine = null, this.rotationHandle = null, this.resizeRowAtEndHandles = [], this.resizeRowAtStartHandles = [], this.movingRectangle = null, this.rotating = !1, this.moving = !1, this.rotation = !0, this.movable = !0, this.resizeable = !0, this.moveEndListener = null, this.addObjectsModifierPressed = !1, this.defaultSettings = {
        showSelectionRectangle: !0,
        showMovingRectangle: !0,
        canFlip: !0,
        canDuplicate: !0,
        canDelete: !0,
        preSorted: !1
    }, this.objectSelectionRectangleSet = mercator.set(), this.lastCursorPoint = void 0
}, mercator.SelectedObjects.prototype.setting = function (e) {
    return e in this.settings ? this.settings[e] : this.defaultSettings[e]
}, mercator.SelectedObjects.prototype.bbox = function () {
    return mercator.Bbox.mergedFromObjectsSelectionArea(this.arrayOfObjects)
}, mercator.SelectedObjects.prototype.selectionBbox = function () {
    return this.bbox().enlarge(this.designer.zoomer.unzoom(.5))
}, mercator.SelectedObjects.prototype.coreBbox = function () {
    return mercator.Bbox.coreMergedFromObjects(this.arrayOfObjects)
}, mercator.SelectedObjects.prototype.noRotation = function () {
    return this.rotation = !1, this
}, mercator.SelectedObjects.prototype.notMovable = function () {
    return this.movable = !1, this
}, mercator.SelectedObjects.prototype.notResizeable = function () {
    return this.resizeable = !1, this
}, mercator.SelectedObjects.prototype.contains = function (e) {
    return -1 !== this.arrayOfObjects.indexOf(e)
}, mercator.SelectedObjects.prototype.singleObjectSelected = function () {
    return 1 === this.arrayOfObjects.length
}, mercator.SelectedObjects.prototype.hasSelectedObjects = function () {
    return this.arrayOfObjects.length > 0
}, mercator.SelectedObjects.prototype.duplicate = function () {
    var e = this,
        t = this.arrayOfObjects.map(function (t) {
            return t.duplicate(e.designer.activeSubChart()).draw().mover.doMove(new mercator.Point(mercator.Chair.width, mercator.Chair.width))
        });
    this.designer.setState(new mercator.ObjectsSelectedState(this.designer, t))
}, mercator.SelectedObjects.prototype.cut = function () {
    this.designer.clipboard.copy(this.arrayOfObjects), this.deleteSelectedObjects()
}, mercator.SelectedObjects.prototype.copy = function () {
    this.designer.clipboard.copy(this.arrayOfObjects)
}, mercator.SelectedObjects.prototype.noRows = function () {
    return this.arrayOfObjects.filter(this.no(mercator.Row))
}, mercator.SelectedObjects.prototype.focalPointSelected = function () {
    return this.arrayOfObjects.findOne(this.a(mercator.FocalPoint))
}, mercator.SelectedObjects.prototype.a = function (e) {
    return function (t) {
        return t instanceof e
    }
}, mercator.SelectedObjects.prototype.no = function (e) {
    return function (t) {
        return !(t instanceof e)
    }
}, mercator.SelectedObjects.prototype.noTables = function () {
    return this.arrayOfObjects.filter(function (e) {
        return !(e instanceof mercator.RoundTable || e instanceof mercator.RectTable)
    })
}, mercator.SelectedObjects.prototype.noBooths = function () {
    return this.arrayOfObjects.filter(function (e) {
        return !(e instanceof mercator.Booth)
    })
}, mercator.SelectedObjects.prototype.noTexts = function () {
    return this.arrayOfObjects.filter(function (e) {
        return !(e instanceof mercator.TextInput)
    })
}, mercator.SelectedObjects.prototype.noShapes = function () {
    return this.arrayOfObjects.filter(function (e) {
        return !(e instanceof mercator.ShapedObject) || e instanceof mercator.GeneralAdmissionArea
    })
}, mercator.SelectedObjects.prototype.noGeneralAdmissionAreas = function () {
    return this.arrayOfObjects.filter(function (e) {
        return !(e instanceof mercator.GeneralAdmissionArea)
    })
}, mercator.SelectedObjects.prototype.noSections = function () {
    return this.arrayOfObjects.filter(function (e) {
        return !(e instanceof mercator.Section)
    })
}, mercator.SelectedObjects.prototype.noSectionsAndNoGAs = function () {
    return this.arrayOfObjects.filter(function (e) {
        return !(e instanceof mercator.Section || e instanceof mercator.GeneralAdmissionArea)
    })
}, mercator.SelectedObjects.prototype.noRoundTables = function () {
    return this.arrayOfObjects.filter(function (e) {
        return !(e instanceof mercator.RoundTable)
    })
}, mercator.SelectedObjects.prototype.noRectTables = function () {
    return this.arrayOfObjects.filter(function (e) {
        return !(e instanceof mercator.RectTable)
    })
}, mercator.SelectedObjects.prototype.rectTables = function () {
    return this.arrayOfObjects.filter(function (e) {
        return e instanceof mercator.RectTable
    })
}, mercator.SelectedObjects.prototype.rows = function () {
    return this.arrayOfObjects.filter(function (e) {
        return e instanceof mercator.Row
    })
}, mercator.SelectedObjects.prototype.booths = function () {
    return this.arrayOfObjects.filter(function (e) {
        return e instanceof mercator.Booth
    })
}, mercator.SelectedObjects.prototype.tables = function () {
    return this.arrayOfObjects.filter(function (e) {
        return e instanceof mercator.RoundTable || e instanceof mercator.RectTable
    })
}, mercator.SelectedObjects.prototype.shapes = function () {
    return this.arrayOfObjects.filter(function (e) {
        return e instanceof mercator.ShapedObject
    })
}, mercator.SelectedObjects.prototype.rectangles = function () {
    return this.shapes().filter(function (e) {
        return e.shape instanceof mercator.ShapedObjects.Rectangle
    })
}, mercator.SelectedObjects.prototype.roundTables = function () {
    return this.arrayOfObjects.filter(function (e) {
        return e instanceof mercator.RoundTable
    })
}, mercator.SelectedObjects.prototype.onlyRowsSelected = function () {
    return 0 === this.noRows().length
}, mercator.SelectedObjects.prototype.onlyOneRowSelected = function () {
    return this.onlyRowsSelected() && 1 === this.rows().length
}, mercator.SelectedObjects.prototype.onlyOneObjectWithSeatsSelected = function () {
    return this.onlyObjectsWithSeatsSelected() && 1 === this.arrayOfObjects.length
}, mercator.SelectedObjects.prototype.onlyObjectsWithSeatsSelected = function () {
    return this.objectsWithSeats().length === this.arrayOfObjects.length
}, mercator.SelectedObjects.prototype.objectsWithSeats = function () {
    return this.selectedObjectsWithFunction("getChairs")
}, mercator.SelectedObjects.prototype.showSelectionRectangle = function () {
    return this.setting("showSelectionRectangle")
}, mercator.SelectedObjects.prototype.showMovingRectangle = function () {
    return this.setting("showMovingRectangle")
}, mercator.SelectedObjects.prototype.showResizeHandles = function () {
    return !!this.resizeable && this.onlyResizableRowsSelected()
}, mercator.SelectedObjects.prototype.onlyResizableRowsSelected = function () {
    return this.onlyRowsSelected() && !this.arrayOfObjects.findOne(this.multiSegmentRow)
}, mercator.SelectedObjects.prototype.multiSegmentRow = function (e) {
    return e.isMultiSegmentRow()
}, mercator.SelectedObjects.prototype.showSelectionRect = function () {
    return this.arrayOfObjects.some(e => e.showSelectionRect())
}, mercator.SelectedObjects.prototype.setNumberOfChairs = function (e, t) {
    this.tables().forEach(function (s) {
        s.setNumberOfChairs(e, t)
    }), this.reselect(), this.designer.renderUI(), this.designer.requestStatsUpdate()
}, mercator.SelectedObjects.prototype.setNumberOfOpenSpaces = function (e) {
    this.tables().forEach(function (t) {
        t.setNumberOfOpenSpaces(e)
    }), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setRadius = function (e) {
    this.roundTables().forEach(function (t) {
        t.setRadius(e)
    }), this.refreshSelectionRectangle(), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setAutoRadius = function (e) {
    this.roundTables().forEach(function (t) {
        t.setAutoRadius(e)
    }), this.refreshSelectionRectangle(), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setFontSize = function (e) {
    this.arrayOfObjects.forEach(function (t) {
        t.setFontSize(e)
    }), this.refreshSelectionRectangle(), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setLabelSize = function (e) {
    this.arrayOfObjects.forEach(function (t) {
        t.setLabelSize(e)
    }), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setDisplayLabel = function (e) {
    this.arrayOfObjects.forEach(function (t) {
        t.changeDisplayLabel(e)
    }), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setLabelShown = function (e) {
    this.arrayOfObjects.forEach(function (t) {
        t.setLabelShown(e)
    }), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setLabelHorizontalOffset = function (e) {
    this.arrayOfObjects.forEach(function (t) {
        t.setLabelHorizontalOffset(e)
    })
}, mercator.SelectedObjects.prototype.setLabelVerticalOffset = function (e) {
    this.arrayOfObjects.forEach(function (t) {
        t.setLabelVerticalOffset(e)
    })
}, mercator.SelectedObjects.prototype.setLabelHorizontalOffsetPerc = function (e) {
    this.arrayOfObjects.forEach(function (t) {
        t.setLabelHorizontalOffsetPerc(e)
    }), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setLabelVerticalOffsetPerc = function (e) {
    this.arrayOfObjects.forEach(function (t) {
        t.setLabelVerticalOffsetPerc(e)
    }), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setSectionEntrances = function (e) {
    this.arrayOfObjects.forEach(function (t) {
        t.setEntrance(e)
    }), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setGACapacity = function (e) {
    this.arrayOfObjects.forEach(function (t) {
        t.setCapacity(e)
    }), this.designer.requestStatsUpdate(), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setSelectionVariableOccupancy = function (e) {
    this.arrayOfObjects.forEach(function (t) {
        t.setSelectionVariableOccupancy(e)
    }), this.designer.requestStatsUpdate(), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setMinOccupancy = function (e) {
    this.arrayOfObjects.forEach(function (t) {
        t.setMinOccupancy(e)
    }), this.designer.requestStatsUpdate(), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setBookAsAWhole = function (e) {
    this.arrayOfObjects.forEach(function (t) {
        t.setBookAsAWhole(e)
    }), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setHeight = function (e) {
    this.selectedObjectsWithFunction("setHeight").forEach(t => t.setHeight(e)), this.refreshSelectionRectangle(), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setScale = function (e) {
    this.selectedObjectsWithFunction("setScale").forEach(t => t.setScale(e)), this.refreshSelectionRectangle(), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setOpacity = function (e) {
    this.selectedObjectsWithFunction("setOpacity").forEach(t => t.setOpacity(e)), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setForeground = function (e) {
    this.selectedObjectsWithFunction("setForeground").forEach(t => t.setForeground(e)), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setWidth = function (e) {
    this.selectedObjectsWithFunction("setWidth").forEach(t => t.setWidth(e)), this.refreshSelectionRectangle(), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setSize = function (e) {
    this.selectedObjectsWithFunction("setSize").forEach(t => t.setSize(e)), this.refreshSelectionRectangle(), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setIcon = function (e) {
    this.selectedObjectsWithFunction("setIcon").forEach(t => t.setIcon(e)), this.refreshSelectionRectangle(), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setIconFillColor = function (e) {
    this.selectedObjectsWithFunction("setFillColor").forEach(t => t.setFillColor(e)), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setRotationAngle = function (e) {
    this.rotatables().forEach(function (t) {
        t.setRotationAngle(e)
    }), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setTextCaption = function (e) {
    this.arrayOfObjects.forEach(function (t) {
        t.setTypedText(e)
    }), this.refreshSelectionRectangle(), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setLabelRotationAngle = function (e) {
    this.arrayOfObjects.forEach(function (t) {
        t.setLabelRotationAngle(e)
    }), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setStrokeWidth = function (e) {
    this.shapes().forEach(function (t) {
        t.setStrokeWidth(e)
    }), this.refreshSelectionRectangle(), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setCornerRadius = function (e) {
    this.rectangles().forEach(function (t) {
        t.setCornerRadius(e)
    }), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setAutoStroke = function (e) {
    this.shapes().forEach(t => t.setAutoStroke(e)), this.refreshSelectionRectangle(), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setStrokeColor = function (e) {
    this.shapes().forEach(function (t) {
        t.setStrokeColor(e)
    }), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setFillColor = function (e) {
    this.shapes().forEach(function (t) {
        t.setFillColor(e)
    }), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setTextColor = function (e) {
    this.arrayOfObjects.forEach(function (t) {
        t.setTextColor(e)
    }), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setTextBold = function (e) {
    this.arrayOfObjects.forEach(t => t.setBold(e)), this.refreshSelectionRectangle(), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setTextItalic = function (e) {
    this.arrayOfObjects.forEach(t => t.setItalic(e)), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setDisplayObjectType = function (e) {
    this.getArrayOfObjects().forEach(t => t.setDisplayObjectType(e)), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setSeatDisplayObjectType = function (e) {
    this.getArrayOfObjects().forEach(t => t.setSeatDisplayObjectType(e)), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.previewLabel = function (e) {
    this.getArrayOfObjects().forEach(t => t.changeLabel(e)), this.getArrayOfObjects().forEach(e => e.refreshLabel())
}, mercator.SelectedObjects.prototype.previewDisplayLabel = function (e) {
    this.getArrayOfObjects().forEach(t => t.changeDisplayLabel(e)), this.getArrayOfObjects().forEach(e => e.refreshLabel())
}, mercator.SelectedObjects.prototype.setLabel = function (e) {
    this.getArrayOfObjects().forEach(t => t.changeLabel(e)), this.designer.updateStats(), this.designer.renderUI(), this.getArrayOfObjects().forEach(e => e.refreshLabel())
}, mercator.SelectedObjects.prototype.setSectionLabel = function (e, t = !1) {
    this.getArrayOfObjects().forEach(t => t.changeSectionLabel(e)), t || (0 === e.length && this.setSectionDisplayedLabel(null, !1), this.designer.updateStats(), this.designer.renderUI()), this.getArrayOfObjects().forEach(e => e.refreshLabel())
}, mercator.SelectedObjects.prototype.setSectionDisplayedLabel = function (e, t = !1) {
    this.getArrayOfObjects().forEach(t => t.changeSectionDisplayedLabel(e)), t || (this.designer.updateStats(), this.designer.renderUI()), this.getArrayOfObjects().forEach(e => e.refreshLabel())
}, mercator.SelectedObjects.prototype.setRowLabelPositionLeft = function (e) {
    this.getArrayOfObjects().forEach(t => t.setRowLabelPositionLeft(e)), this.designer.renderUI(), this.reselect()
}, mercator.SelectedObjects.prototype.setRowLabelPositionRight = function (e) {
    this.getArrayOfObjects().forEach(t => t.setRowLabelPositionRight(e)), this.designer.renderUI(), this.reselect()
}, mercator.SelectedObjects.prototype.setViewFromSeats = function (e) {
    this.arrayOfObjects.forEach(function (t) {
        t.setViewFromSeats(e)
    }), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setSelectionSmartType = function (e) {
    this.arrayOfObjects.forEach(t => t.setSmartType(e)), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setSelectionSmartTypeVariation = function (e) {
    this.arrayOfObjects.forEach(t => t.setSmartTypeVariation(e)), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.removeViewFromSeats = function () {
    this.arrayOfObjects.forEach(function (e) {
        e.removeViewFromSeats()
    }), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.previewPolygonScale = function (e) {
    const t = this.bbox().center();
    this.arrayOfObjects.forEach(s => s.enlarge(e, t, !0))
}, mercator.SelectedObjects.prototype.applyPolygonScale = function (e) {
    const t = this.bbox().center();
    this.arrayOfObjects.forEach(s => s.enlarge(e, t, !1)), this.refreshSelectionRectangle()
}, mercator.SelectedObjects.prototype.previewCutoffAngle = function (e) {
    this.arrayOfObjects.forEach(t => t.previewCutoffAngle(e))
}, mercator.SelectedObjects.prototype.setCutoffAngle = function (e) {
    this.arrayOfObjects.forEach(t => t.setCutoffAngle(e)), this.refreshSelectionRectangle()
}, mercator.SelectedObjects.prototype.applyObjectLabeling = function (e = null, t = null, s = null, o = !1) {
    this.getArrayOfObjectsSorted().forEach((o, n) => o.applyObjectLabeling(e, t, s, n, o.length)), o || this.designer.updateStats(), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setObjectLabelingSkipCharacter = function (e, t) {
    this.getArrayOfObjectsSorted().forEach(s => {
        t ? s.addSkippedCharacter(e) : s.removeSkippedCharacter(e)
    })
}, mercator.SelectedObjects.prototype.applySeatLabeling = function (e = null, t = null, s = null, o = !1) {
    this.getArrayOfObjects().forEach(o => o.applySeatLabeling(e, t, s)), o || this.designer.updateStats(), e && this.setSeatLabelingEndAt(), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setSelectionSeatLabelingInverted = function (e) {
    this.getArrayOfObjects().forEach(t => {
        this.arrayOfObjects.length > 1 && "row" === t.type && !t.isInQuadrants1Or4OrRotated360() ? t.applySeatLabeling(null, null, !e) : t.applySeatLabeling(null, null, e)
    }), this.designer.updateStats(), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setSeatLabelingEndAt = function (e = null) {
    let t = null,
        s = this.getArrayOfObjects().first().seatLabeling.algoName,
        o = e ? "end-at" === e : this.getArrayOfObjects().first().seatLabeling.useEndAt;
    if (mercator.AutoLabeler.endAtLimiterAlgorithms.includes(s)) {
        let e = mercator.AutoLabeler.getAlgorithmMinValue(s, o, this.designer.selectedSubobjectsLongestCount) - 1;
        t = this.getArrayOfObjects().reduce((e, t) => Math.min(e, t.seatLabeling.startAtIndex), Number.POSITIVE_INFINITY) < e ? e : null
    }
    this.getArrayOfObjects().forEach(e => e.setSeatLabelingEndAt(o)), this.applySeatLabeling(null, t, null)
}, mercator.SelectedObjects.prototype.setRestrictedView = function (e) {
    this.getArrayOfObjects().map(t => (t.setRestrictedView(e), t.parent)).uniques().forEach(e => e.redraw()), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setAccessible = function (e) {
    this.getArrayOfObjects().map(t => (t.setAccessible(e), t.parent)).uniques().forEach(e => e.redraw()), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setCompanionSeat = function (e) {
    this.getArrayOfObjects().map(t => (t.setCompanionSeat(e), t.parent)).uniques().forEach(e => e.redraw()), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setDisabledBySocialDistancingRules = function (e) {
    this.getArrayOfObjects().map(t => (t.setDisabledBySocialDistancingRules(e), t.parent)).uniques().forEach(e => e.redraw()), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.invertObjectLabeling = function () {
    let e = this.getArrayOfObjectsSorted().map(e => e.label);
    this.getArrayOfObjectsSorted().reverse().forEach((t, s) => t.changeLabel(e[s])), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setRowLabelDisabled = function (e) {
    this.rows().forEach(t => t.setRowLabelDisabled(e)), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.clearObjectLabeling = function () {
    this.getArrayOfObjects().forEach(e => e.clearLabel()), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.clearSeatLabeling = function () {
    this.objectsWithSeats().forEach(e => e.clearSeatLabels()), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.noObjectLabels = function () {
    return this.getArrayOfObjects().map(function (e) {
        return e.label
    }).uniques().onlyElementIs(mercator.LabelingTextInput.emptyLabel)
}, mercator.SelectedObjects.prototype.getSelectedObject = function () {
    return this.arrayOfObjects[0]
}, mercator.SelectedObjects.prototype.selectedObjectHasDuplicateObjects = function () {
    return !!this.oneSectionSelected() && this.getSelectedObject().hasDuplicateObjects()
}, mercator.SelectedObjects.prototype.size = function () {
    return this.arrayOfObjects.length
}, mercator.SelectedObjects.prototype.count = function () {
    return this.countSeatsMode ? this.arrayOfObjects.flatMap(function (e) {
        return void 0 !== e.getChairs ? e.getChairs() : [{}]
    }).length : this.arrayOfObjects.length
}, mercator.SelectedObjects.prototype.isSingleText = function () {
    return this.oneObjectSelected() && this.getSelectedObject() instanceof mercator.TextInput
}, mercator.SelectedObjects.prototype.canBeDuplicated = function () {
    return this.setting("canDuplicate") && this.arrayOfObjects.every(e => "function" == typeof e.duplicate)
}, mercator.SelectedObjects.prototype.oneSectionSelected = function () {
    return this.oneObjectSelected() && this.getSelectedObject() instanceof mercator.Section
}, mercator.SelectedObjects.prototype.oneObjectSelected = function () {
    return 1 === this.arrayOfObjects.length
}, mercator.SelectedObjects.prototype.canBeDeleted = function () {
    return this.setting("canDelete") && this.arrayOfObjects.every(e => "function" == typeof e.remove) && this.arrayOfObjects.every(e => void 0 === e.canBeRemoved || e.canBeRemoved())
}, mercator.SelectedObjects.prototype.cannotDeleteReason = function () {
    return this.setting("canDelete") && this.arrayOfObjects.some(e => e.disabledEditingBySafeMode()) ? "deleting-published-objects-disabled" : null
}, mercator.SelectedObjects.prototype.canBeFlipped = function () {
    return this.setting("canFlip") && this.arrayOfObjects.every(e => "function" == typeof e.flip)
}, mercator.SelectedObjects.prototype.canBeNormalized = function () {
    return this.onlyRowsSelected() && this.arrayOfObjects.length > 1
}, mercator.SelectedObjects.prototype.canRowsBeEvenlySpaced = function () {
    return this.onlyRowsSelected() && this.arrayOfObjects.length > 2
}, mercator.SelectedObjects.prototype.canObjectsBeEvenlySpaced = function () {
    return !this.onlyRowsSelected() && this.arrayOfObjects.length > 2
}, mercator.SelectedObjects.prototype.canBeCurved = function () {
    return this.onlyRowsSelected() && this.allRowsCanBeCurved()
}, mercator.SelectedObjects.prototype.canBeSmoothened = function () {
    return this.onlyRowsSelected() && this.allRowsCanBeSmoothened()
}, mercator.SelectedObjects.prototype.canChairSpacingBeEdited = function () {
    return this.onlyRowsSelected() && this.noMultiSegmentRowsSelected()
}, mercator.SelectedObjects.prototype.canSeatCountBeEdited = function () {
    return this.onlyRowsSelected() && this.noSingleSeatRowsSelected()
}, mercator.SelectedObjects.prototype.allRowsCanBeCurved = function () {
    return !_.some(this.arrayOfObjects, e => !e.canBeCurved())
}, mercator.SelectedObjects.prototype.allRowsCanBeSmoothened = function () {
    return !_.some(this.arrayOfObjects, e => !e.canBeSmoothened())
}, mercator.SelectedObjects.prototype.noMultiSegmentRowsSelected = function () {
    return !_.some(this.arrayOfObjects, e => e.isMultiSegmentRow())
}, mercator.SelectedObjects.prototype.noSingleSeatRowsSelected = function () {
    return !_.some(this.arrayOfObjects, e => e.isSingleSeatRow())
}, mercator.SelectedObjects.prototype.onlyTablesSelected = function () {
    return 0 === this.noTables().length
}, mercator.SelectedObjects.prototype.multipleTablesSelected = function () {
    return this.onlyTablesSelected() && !this.singleObjectSelected()
}, mercator.SelectedObjects.prototype.onlyBoothsSelected = function () {
    return 0 === this.noBooths().length
}, mercator.SelectedObjects.prototype.noRowsWithOneChair = function () {
    return !this.arrayOfObjects.findOne(this.rowWithOneChair)
}, mercator.SelectedObjects.prototype.rowWithOneChair = function (e) {
    return 1 === e.numberOfChairs()
}, mercator.SelectedObjects.prototype.selectedObjectsWithoutFunction = function (e) {
    return this.arrayOfObjects.filter(function (t) {
        return "function" != typeof t[e]
    })
}, mercator.SelectedObjects.prototype.selectedObjectsWithFunction = function (e) {
    return this.arrayOfObjects.filter(function (t) {
        return "function" == typeof t[e]
    })
}, mercator.SelectedObjects.prototype.selectedObjectsWithProperty = function (e) {
    return this.arrayOfObjects.filter(function (t) {
        return t.hasOwnProperty(e)
    })
}, mercator.SelectedObjects.prototype.onlyRotatableObjectsSelected = function () {
    return 0 === this.selectedObjectsWithoutFunction("setRotationAngle").length
}, mercator.SelectedObjects.prototype.singleGeneralAdmissionAreaSelected = function () {
    return this.oneObjectSelected() && 0 === this.noGeneralAdmissionAreas().length
}, mercator.SelectedObjects.prototype.singleSectionOrGAAreaSelected = function () {
    return this.oneObjectSelected() && (0 === this.noSections().length || 0 === this.noGeneralAdmissionAreas().length)
}, mercator.SelectedObjects.prototype.rotatables = function () {
    return this.selectedObjectsWithFunction("setRotationAngle")
}, mercator.SelectedObjects.prototype.onlyShapesSelected = function () {
    return 0 === this.noShapes().length
}, mercator.SelectedObjects.prototype.onlyTextsSelected = function () {
    return 0 === this.noTexts().length
}, mercator.SelectedObjects.prototype.onlyRectangleShapesSelected = function () {
    return this.rectangles().length === this.arrayOfObjects.length
}, mercator.SelectedObjects.prototype.onlyRoundTablesSelected = function () {
    return 0 === this.noRoundTables().length
}, mercator.SelectedObjects.prototype.onlySectionsSelected = function () {
    return 0 === this.noSections().length
}, mercator.SelectedObjects.prototype.onlySectionsOrGAsSelected = function () {
    return 0 === this.noSectionsAndNoGAs().length
}, mercator.SelectedObjects.prototype.onlyGAsSelected = function () {
    return 0 === this.noGeneralAdmissionAreas().length
}, mercator.SelectedObjects.prototype.onlyRectTablesSelected = function () {
    return 0 === this.noRectTables().length
}, mercator.SelectedObjects.prototype.onlyObject = function () {
    return this.arrayOfObjects[0]
}, mercator.SelectedObjects.prototype.transformingSelection = function () {
    return this.moving || this.rotating
}, mercator.SelectedObjects.prototype.clearAllLabels = function () {
    this.arrayOfObjects.forEach(function (e) {
        e.clearLabel && e.clearLabel(), e.clearSeatLabels && e.clearSeatLabels()
    })
}, mercator.SelectedObjects.prototype.dblclick = function () {
    this.singleObjectSelected() ? this.onlyObject().enter() : this.deselect()
}, mercator.SelectedObjects.prototype.mousedown = function () {
    this.arrayOfObjects.forEach(e => e.pressed())
}, mercator.SelectedObjects.prototype.mouseup = function () {
    this.arrayOfObjects.forEach(e => e.unpressed())
}, mercator.SelectedObjects.prototype.mouseover = function (e) {
    this.singleObjectSelected() && this.designer.getState().onObjectMouseOver(this.arrayOfObjects[0], e)
}, mercator.SelectedObjects.prototype.mouseout = function (e) {
    this.singleObjectSelected() && !this.arrayOfObjects[0].getHUDNodes().includes(e.toElement) && this.designer.getState().onObjectMouseOut(this.arrayOfObjects[0], e)
}, mercator.SelectedObjects.prototype.rotationLineTopY = function (e) {
    return e.topMiddle().y - this.designer.zoomer.unzoom(15)
}, mercator.SelectedObjects.prototype.rotationLineX = function (e) {
    return e.topMiddle().x
}, mercator.SelectedObjects.prototype.getRowsInPerceptualOrder = function () {
    const e = mercator.RowCurver,
        t = mercator.RowsUtil.medianRotationAngle(this.arrayOfObjects),
        s = mercator.RowsUtil.center(this.arrayOfObjects);
    return this.arrayOfObjects.map(t => e.decompose(t)).map(o => e.rotateBy(o, -t, s)).map(t => e.rotateUntilHorizontal(t)).sort((e, t) => e.chairCenters[0].y - t.chairCenters[0].y).map(e => e.originalRow)
}, mercator.SelectedObjects.prototype.select = function () {
    var e = this;

    function t(t, s, o, n) {
        let i = e.singleObjectSelected() || e.onlyRowsSelected(),
            r = !e.singleObjectSelected() && e.onlyRowsSelected(),
            a = !e.singleObjectSelected();
        t.onDragTransform(e.designer, e.getAllElementsInSelection.bind(e), s, function () {
            let t, s;
            e.moving = !0, r && (t = e.getRowsInPerceptualOrder(), s = [t[0], t[t.length - 1]]), e.arrayOfObjects.forEach(function (t) {
                e.designer.labelsShown && t.hideLabelAndChildLabels(), t.hideOverlays(), t.hideAllIconLabels(), r ? s.includes(t) && t.drawPositionGuides(!0) : i && t.drawPositionGuides(a)
            }), o && o()
        }, function () {
            e.moving = !1, n && n(), e.reselect(), e.arrayOfObjects.forEach(function (t) {
                e.designer.labelsShown && t.showLabelAndChildLabels(), t.restoreOverlays(), t.showAllIconLabels(), i && t.undrawPositionGuides(), t.unpressed()
            })
        })
    }

    function s() {
        const t = e.designer.getState();
        e.rotating ? t.updateToolText("rotate", "rotate-hint") : e.moving ? t.updateToolText("move", "move-hint") : t.resetToolText()
    }
    e.arrayOfObjects.forEach(function (e) {
        e.selected && e.selected()
    });
    var o, n, i, r, a = e.selectionBbox();
    return e.showSelectionRectangle() && (e.selectionRectangle = function (t) {
        return mercator.Bbox.drawRectangle(t, e.designer).attr(e.showSelectionRect() ? {
            stroke: "rgba(0, 136, 255, 0.8)",
            "stroke-width": e.designer.zoomer.unzoom(.75)
        } : {
            "stroke-opacity": 0
        }).toLayer("selectionRectanglesLayer", e.designer).applyZoom(e.designer)
    }(a), e.drawObjectsSelectionRectangles()), e.showMovingRectangle() && (e.rotation && (e.rotationLine = function (t) {
        return e.designer.drawLine(e.rotationLineX(t), t.origin.y, t.topMiddle().x, e.rotationLineTopY(t), e.designer.zoomer.unzoom(1), 1).attr({
            stroke: "rgba(0, 136, 255, 0.8)"
        }).toLayer("transformationHandlesLayer", e.designer).applyZoom(e.designer)
    }(a), e.rotationHandle = function (t) {
        let s = e.designer.drawer.circle(e.rotationLineX(t), e.rotationLineTopY(t), e.designer.zoomer.unzoom(4), {
            fill: "#0087FF",
            stroke: "white",
            "stroke-width": e.designer.zoomer.unzoom(.75)
        }).toLayer("transformationHandlesLayer", e.designer).applyZoom(e.designer);
        return s.node.onmouseover = (() => {
            e.designer.setCursor("we-rotate"), e.rotationHandleHover = !0
        }), s.node.onmouseout = (() => {
            e.rotating || e.designer.setCursorToDefault(), e.rotationHandleHover = !1
        }), s.node.onmousedown = ((t, s) => {
            document.activeElement && document.activeElement.blur(), e.rotating = !0
        }), s.node.onmouseup = ((t, s) => {
            e.rotating = !1
        }), s
    }(a)), e.movingRectangle = function (t) {
        var s = e.movable ? "move" : "default";
        return mercator.Bbox.drawRectangle(t, e.designer).toLayer("selectionRectanglesLayer", e.designer).applyZoom(e.designer).attr({
            fill: "black",
            opacity: 0,
            cursor: s
        })
    }(a), e.movingRectangle.node.ondblclick = (t => e.dblclick(t)), e.movingRectangle.node.onmousedown = (t => e.mousedown(t)), e.movingRectangle.node.onmouseup = (t => e.mouseup(t)), e.movingRectangle.node.onmouseover = (t => e.mouseover(t)), e.movingRectangle.node.onmouseout = (t => e.mouseout(t)), e.rotation && t(e.rotationHandle, function (t, s, a) {
        const c = e.designer.shiftWasPressed ? 15 : mercator.ChartDesigner.snapToAngle;
        var l = new mercator.Point(o, n).add(new mercator.Point(t, s)),
            d = new mercator.Ray(r.toView(e.designer), l).snapToAngle(c),
            h = new mercator.Ray(r.toView(e.designer), new mercator.Point(o, n));
        return i = Math.round(d.angleBetween(h)), (new SVG.Matrix).rotate(i, r.toView(e.designer).x, r.toView(e.designer).y)
    }, function () {
        r = e.bbox().center();
        let t = e.rotationHandle.matrix(),
            i = new SVG.Point(e.rotationHandle.attr("cx"), e.rotationHandle.attr("cy")).transform(t);
        o = i.x, n = i.y, e.rotating = !0, s()
    }, function () {
        e.arrayOfObjects.forEach(function (e) {
            e.rotated(r, i)
        }), e.rotationHandleHover || e.designer.setCursorToDefault(), e.rotating = !1, s()
    }), e.movable && function () {
        let o, n = [];
        const i = e.bbox().center(),
            r = {
                stroke: mercator.PositionGuidesSupport.GUIDE_COLORS.gold,
                opacity: .5,
                "stroke-width": e.designer.zoomer.unzoom(2)
            },
            a = {
                fill: mercator.PositionGuidesSupport.GUIDE_COLORS.gold
            },
            c = () => {
                n.length > 0 && (n.forEach(e => e.remove()), n = [])
            },
            l = (t, s) => {
                const {
                    x: o,
                    y: n
                } = t, i = e.designer.zoomer.unzoom(3);
                return [e.designer.drawer.circle(o, n, i).toLayer("guides", e.designer).applyZoom(e.designer).attr(a), e.designer.drawLineBetweenPoints(t, s).toLayer("guides", e.designer).applyZoom(e.designer).attr(r)]
            };
        t(e.movingRectangle, function (t, s) {
            if (c(), o = mercator.Vector.fromView(t, s, e.designer).snapToGrid(), e.designer.shiftWasPressed) {
                let r = new mercator.Ray(i, new mercator.Point(i.x + t, i.y + s)).snapToAngle(45);
                mercator.ChartDesigner.snapToGridEnabled && (r = r.snapLengthToMultipleOf(mercator.Point.SNAP_PRECISION)), o = mercator.Vector.fromView(r.end.x - i.x, r.end.y - i.y, e.designer).snapToGrid();
                const a = new mercator.Point(i.x + o.x, i.y + o.y);
                n = l(i, a)
            }
            return o.asTranslation()
        }, () => {
            e.resizeRowAtEndHandles && e.resizeRowAtEndHandles.forEach(e => e.hide()), e.resizeRowAtStartHandles && e.resizeRowAtStartHandles.forEach(e => e.hide()), s()
        }, () => {
            e.arrayOfObjects.forEach(function (t) {
                t.moved(o), e.moveEndListener && e.moveEndListener()
            }), e.designer.updateObjectsOutOfBounds(), e.resizeRowAtEndHandles && e.resizeRowAtEndHandles.forEach(e => e.show()), e.resizeRowAtStartHandles && e.resizeRowAtStartHandles.forEach(e => e.show()), s(), c()
        })
    }()), e.showResizeHandles() && (e.drawResizeHandles(), function () {
        let t = null,
            s = {};

        function o(o, n, i, r) {
            s.e = r, s.dx = n, s.dy = i;
            let {
                rowsInQuadrants1Or4OrRotated360: a
            } = s;
            s.endHandlePulled = !o, e.rows().forEach((n, i) => {
                s.row = n, s.index = i, s.aroundFirstChair = o ? !a.includes(n) : a.includes(n),
                    function () {
                        let {
                            row: o,
                            index: n,
                            aroundFirstChair: i
                        } = s, r = function () {
                            let {
                                index: t,
                                e: o,
                                dx: n,
                                dy: i,
                                endHandlePulled: r
                            } = s, a = r ? e.resizeRowAtEndHandles[t] : e.resizeRowAtStartHandles[t];
                            a.show();
                            let c = a.bbox();
                            a.hide();
                            let l = new mercator.Point(c.x + c.width / 2, c.y + c.height / 2),
                                d = mercator.Point.fromEvent(o, e.designer),
                                h = d.addToX(-e.designer.zoomer.unzoom(n)).addToY(-e.designer.zoomer.unzoom(i));
                            return mercator.Point.translatePointWithRotation(h, l, d, function () {
                                let {
                                    angles: e,
                                    rowsInQuadrants1Or4OrRotated360: t,
                                    row: o,
                                    index: n,
                                    singleAngle: i
                                } = s;
                                return i ? 0 : t.includes(o) ? -e[n] * Math.PI / 180 : -(e[n] + 180) * Math.PI / 180
                            }())
                        }();
                        i ? o.transformToAroundFirst(o.createRayFromFirstChairBorderToLast().projectPoint(r), e.designer.helperLines.areClosestRowHelperLinesShown) : o.transformToAroundLast(o.createRayFromFirstChairBorderToLast().projectPoint(r), e.designer.helperLines.areClosestRowHelperLinesShown), o.applySeatLabeling(), o.draw(), !e.designer.labelsShown && t[n].isReadable() && t[n].refresh(o.center(), 1, o.numberOfChairs())
                    }()
            })
        }

        function n() {
            t = e.rows().map(() => new mercator.NumberOfRowsAndChairs(e.designer)), s.angles = e.rows().map(e => e.getRoundedRotation()), s.rowsInQuadrants1Or4OrRotated360 = e.rows().filter(e => e.isInQuadrants1Or4OrRotated360()), s.singleAngle = e.rows().every(e => e.getRoundedRotation() === s.angles[0] || e.getRoundedRotation() - 180 === s.angles[0] || e.getRoundedRotation() === s.angles[0] - 180), e.getSetOfSelectionElements().hide()
        }

        function i() {
            e.reselect(), t.forEach(e => e.undraw()), e.designer.requestStatsUpdate()
        }
        mercator.onDrag(e.designer, e.resizeRowAtEndHandles, function (e, t, s) {
            o(!1, e, t, s)
        }, n, i), mercator.onDrag(e.designer, e.resizeRowAtStartHandles, function (e, t, s) {
            o(!0, e, t, s)
        }, n, i)
    }()), e.refreshSelectionRectangleInteractability(), e.arrayOfObjects.forEach(function (e) {
        e.highlight()
    }), this
}, mercator.SelectedObjects.prototype.redrawResizeHandles = function () {
    this.showResizeHandles() && (mercator.set(this.resizeRowAtEndHandles, this.resizeRowAtStartHandles).remove(), this.drawResizeHandles())
}, mercator.SelectedObjects.prototype.drawResizeHandles = function () {
    let e = (e, t, s, o) => {
        let n = this.designer.drawer.rect(e, t, 8, 8, 0, {
            fill: "lightblue",
            stroke: "white",
            "stroke-width": 1,
            cursor: "col-resize"
        }).toLayer("transformationHandlesLayer", this.designer).applyZoomButKeepSize(this.designer);
        return n.node.onmouseover = (() => {
            o ? this.resizeRowAtStartHandles.forEach(e => e.attr({
                fill: mercator.PolygonDrawingSnapper.snapColors.default
            })) : this.resizeRowAtEndHandles.forEach(e => e.attr({
                fill: mercator.PolygonDrawingSnapper.snapColors.default
            }))
        }), n.node.onmouseout = (() => {
            o ? this.resizeRowAtStartHandles.forEach(e => e.attr({
                fill: "lightblue"
            })) : this.resizeRowAtEndHandles.forEach(e => e.attr({
                fill: "lightblue"
            }))
        }), n.rotate(s), n
    };
    this.resizeRowAtStartHandles = [], this.resizeRowAtEndHandles = [], this.rows().forEach(t => {
        let s = t.createRayFromFirstChairBorderToLast(),
            o = t.isInQuadrants1Or4OrRotated360() || 1 === t.chairs.length,
            n = o ? s.origin.x - 4 : s.end.x - 4,
            i = o ? s.origin.y - 4 : s.end.y - 4,
            r = o ? s.end.x - 4 : s.origin.x - 4,
            a = o ? s.end.y - 4 : s.origin.y - 4;
        this.resizeRowAtStartHandles.push(e(n, i, s.angle(), !0)), this.resizeRowAtEndHandles.push(e(r, a, s.angle(), !1))
    })
}, mercator.SelectedObjects.prototype.refreshSelectionRectangle = function () {
    let e = this.bbox();
    this.selectionRectangle && this.selectionRectangle.attr({
        x: e.origin.x,
        y: e.origin.y,
        width: e.width,
        height: e.height
    }), this.movingRectangle && this.movingRectangle.attr({
        x: e.origin.x,
        y: e.origin.y,
        width: e.width,
        height: e.height
    }), this.rotationLine && this.rotationLine.attr({
        d: this.designer.getLinePath(this.rotationLineX(e), e.origin.y, e.topMiddle().x, this.rotationLineTopY(e))
    }), this.rotationHandle && this.rotationHandle.attr({
        cx: this.rotationLineX(e),
        cy: this.rotationLineTopY(e)
    }), this.redrawResizeHandles(), this.refreshObjectsSelectionRectangles()
}, mercator.SelectedObjects.prototype.refreshSelectionRectangleInteractability = function () {
    this.selectionRectangle && this.selectionRectangle.node && this.selectionRectangle.node.setAttribute("pointer-events", this.addObjectsModifierPressed ? "none" : "auto"), this.movingRectangle && this.movingRectangle.node && this.movingRectangle.node.setAttribute("pointer-events", this.addObjectsModifierPressed ? "none" : "auto")
}, mercator.SelectedObjects.prototype.refreshObjectsSelectionRectangles = function () {
    this.removeObjectsSelectionRectangles(), this.drawObjectsSelectionRectangles()
}, mercator.SelectedObjects.prototype.removeObjectsSelectionRectangles = function () {
    this.objectSelectionRectangleSet.remove()
}, mercator.SelectedObjects.prototype.drawObjectsSelectionRectangles = function () {
    this.arrayOfObjects.forEach(e => {
        let t = e.selectionArea(),
            s = t.draw(this.designer).attr({
                stroke: "rgba(0, 136, 255, 0.8)",
                "stroke-width": this.designer.zoomer.unzoom(1)
            }).toLayer("selectionRectanglesLayer", this.designer).zoomAndRotate(t.rotationAngle || 0, this.designer);
        this.objectSelectionRectangleSet.push(s)
    })
}, mercator.SelectedObjects.prototype.withMoveEndListener = function (e) {
    return this.moveEndListener = e, this
}, mercator.SelectedObjects.prototype.hideSelectionElements = function () {
    this.getSetOfSelectionElements().remove(), this.removeObjectsSelectionRectangles()
}, mercator.SelectedObjects.prototype.deselect = function () {
    this.arrayOfObjects.forEach(e => {
        e.deselected && e.deselected(), e.unhighlight()
    }), this.hideSelectionElements()
}, mercator.SelectedObjects.prototype.getAllElementsInSelection = function () {
    var e = this.getSetOfSelectionElements();
    return this.arrayOfObjects.forEach(function (t) {
        pushAll(e, t.allElementsSet())
    }), e
}, mercator.SelectedObjects.prototype.getSetOfSelectionElements = function () {
    var e = mercator.set();
    this.showSelectionRectangle() && pushAll(e, this.selectionRectangle), this.showResizeHandles() && pushAll(e, mercator.set(this.resizeRowAtEndHandles, this.resizeRowAtStartHandles)), this.showMovingRectangle() && (this.rotation && (pushAll(e, this.rotationLine), pushAll(e, this.rotationHandle)), this.rowBlockGuides && pushAll(e, this.rowBlockGuides), pushAll(e, this.movingRectangle));
    var t = this.arrayOfObjects.flatMap(function (e) {
        return e.selectionElements ? e.selectionElements() : []
    });
    return pushAll(pushAll(e, t), this.objectSelectionRectangleSet), e
}, mercator.SelectedObjects.prototype.setOfSetsOfElements = function () {
    var e = mercator.set();
    return pushAll(e, this.arrayOfObjects.map(function (e) {
        return e.allElementsSet()
    })), e
}, mercator.SelectedObjects.prototype.getArrayOfObjects = function () {
    return this.arrayOfObjects
}, mercator.SelectedObjects.prototype.getArrayOfObjectsSorted = function () {
    if (this.setting("preSorted")) return this.arrayOfObjects;
    if (this.onlyRowsSelected()) return this.getArrayOfRowsSorted();
    var e = new mercator.Point(0, 0);
    return this.arrayOfObjects.sort(function (t, s) {
        return t.getCenter().distanceToPoint(e) - s.getCenter().distanceToPoint(e)
    })
}, mercator.SelectedObjects.prototype.getArrayOfRowsSorted = function () {
    return (new mercator.RowSorter).sort(this.arrayOfObjects)
}, mercator.SelectedObjects.prototype.setRowSpacing = function (e) {
    mercator.Aligner.evenlySpaceRows(this.arrayOfObjects, mercator.Chair.width + e), this.refreshSelectionRectangle(), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setRowChairSpacing = function (e) {
    this.arrayOfObjects.forEach(t => {
        t.applyChairSpacing(e), t.redraw()
    }), this.reselect(), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.setRowSeatCount = function (e) {
    this.arrayOfObjects.forEach(t => {
        t.applySeatCount(e), t.redraw()
    }), this.reselect(), this.designer.renderUI()
}, mercator.SelectedObjects.prototype.getRowSpacing = function () {
    if (this.onlyRowsSelected()) return mercator.RowsUtil.getRowSpacing(this.arrayOfObjects)
}, mercator.SelectedObjects.prototype.reselect = function () {
    this.deselect(), this.select(), this.designer.setSelectedSeatsCount(this.arrayOfObjects)
}, mercator.SelectedObjects.prototype.doCurve = function (e, t = !1) {
    new mercator.RowCurver(this.arrayOfObjects).doCurve(e), this.refreshSelectionRectangle(), this.designer.renderUI(), t || this.designer.updateObjectsOutOfBounds()
}, mercator.SelectedObjects.prototype.setSmooth = function (e) {
    e ? new mercator.RowSmoothener(this.arrayOfObjects, this.designer).smoothen() : new mercator.RowSmoothener(this.arrayOfObjects, this.designer).unsmoothen(), this.refreshSelectionRectangle(), this.designer.renderUI(), this.designer.updateObjectsOutOfBounds()
}, mercator.SelectedObjects.prototype.setSmoothness = function (e, t = !1) {
    new mercator.RowSmoothener(this.arrayOfObjects, this.designer).smoothen(e, t), this.refreshSelectionRectangle(), this.designer.renderUI(), t || this.designer.updateObjectsOutOfBounds()
}, mercator.SelectedObjects.prototype.deleteSelectedObjects = function () {
    this.arrayOfObjects.forEach(function (e) {
        e.remove()
    })
}, mercator.SelectedObjects.prototype.setVerticalRowLabelDirection = function (e) {
    this.arrayOfObjects.forEach(t => {
        t instanceof mercator.Row && t.isVertical() && (t.setVerticalRowLabelDirection(e), t.redraw())
    })
}, mercator.SelectedObjects.prototype.moveOneStepInDirection = function (e) {
    e.preventDefault();
    var t = this;

    function s() {
        return t.designer.shiftWasPressed ? 10 : 1
    }
    var o = "ArrowUp" === e.key ? mercator.Vector.fromView(0, -1 * s(), t.designer) : "ArrowDown" === e.key ? mercator.Vector.fromView(0, s(), t.designer) : "ArrowLeft" === e.key ? mercator.Vector.fromView(-1 * s(), 0, t.designer) : "ArrowRight" === e.key ? mercator.Vector.fromView(s(), 0, t.designer) : void 0;
    return t.arrayOfObjects.forEach(function (e) {
        e.moved(o), t.designer.updateObjectsOutOfBounds(), t.moveEndListener && t.moveEndListener()
    }), this.reselect()
}, mercator.SelectedObjects.prototype.addingObjectsStart = function () {
    this.addObjectsModifierPressed = !0, this.refreshSelectionRectangleInteractability()
}, mercator.SelectedObjects.prototype.addingObjectsEnd = function () {
    this.addObjectsModifierPressed = !1, this.refreshSelectionRectangleInteractability()
}, mercator.SelectedObjects.prototype.setCountSeatsMode = function (e) {
    this.countSeatsMode = e
}, mercator.SelectedObjects.prototype.getContextActions = function () {
    let e = [];
    return this.canBeDeleted() && e.push("delete"), this.canBeDuplicated() && e.push("duplicate"), this.canBeFlipped() && e.push("flip-horizontal", "flip-vertical"), this.canBeNormalized() && e.push("normalize-rows", "straighten", "align-center", "align-left", "align-right"), this.arrayOfObjects.length > 1 && (e.push("align-objects", "align-objects-left", "align-objects-horizontal-center", "align-objects-right", "align-objects-top", "align-objects-vertical-center", "align-objects-bottom"), this.arrayOfObjects.length), this.canRowsBeEvenlySpaced() && e.push("space-evenly"), this.canObjectsBeEvenlySpaced() && e.push("space-objects-horizontally", "space-objects-vertically"), e.push("copy"), e
};
mercator.TextInput = function (t, e) {
    this.origin = t, this.subChart = e, this.init(e.designer, !0), this.textElement = null, this.typedText = "Text", this.fontSize = mercator.TextInput.defaultFontSize, this.textColor = mercator.ColorPalettes.defaults.TEXT[this.designer.getCanvasColorScheme()], this.bold = !1, this.italic = !1, this.rotationAngle = 0, this.layer = "textsLayer"
}, mercator.TextInput.prototype = new mercator.Object, mercator.TextInput.prototype.type = "text", mercator.TextInput.prototype.getInspectorSheets = function () {
    return Object.assign(mercator.Object.prototype.getInspectorSheets.call(this), {
        "Text.caption": this.typedText,
        "Text.size": this.fontSize,
        "Text.color": this.textColor,
        "Text.bold": this.bold,
        "Text.italic": this.italic
    })
}, mercator.TextInput.prototype.duplicate = function (t) {
    return this.subChart.addTextInput(this.clone(t))
}, mercator.TextInput.prototype.clone = function (t) {
    var e = new mercator.TextInput(this.origin, t);
    return e.typedText = this.typedText, e.rotationAngle = this.rotationAngle, e.fontSize = this.fontSize, e.textColor = this.textColor, e.bold = this.bold, e.italic = this.italic, e
}, mercator.TextInput.prototype.center = function () {
    return this.origin
}, mercator.TextInput.prototype.getCenter = function () {
    return this.center()
}, mercator.TextInput.prototype.moved = function (t) {
    this.origin = this.origin.add(t), this.redraw()
}, mercator.TextInput.prototype.flip = function (t) {
    return this.origin = t.mirror(this.center()), this.rotationAngle = wrapRotationAround(t.mirrorAngle(this.rotationAngle)), this.redraw(), this
}, mercator.TextInput.prototype.setFontSize = function (t) {
    this.fontSize = t, this.redraw()
}, mercator.TextInput.prototype.setTextColor = function (t) {
    this.textColor = t, this.redraw()
}, mercator.TextInput.prototype.setBold = function (t) {
    this.bold = t, this.redraw()
}, mercator.TextInput.prototype.setItalic = function (t) {
    this.italic = t, this.redraw()
}, mercator.TextInput.prototype.setTypedText = function (t) {
    this.typedText = t, this.redraw()
}, mercator.TextInput.prototype.rotated = function (t, e) {
    this.origin = this.origin.rotateAround(t, e), this.rotationAngle = wrapRotationAround(this.rotationAngle + e), this.redraw()
}, mercator.TextInput.prototype.determineStyle = function () {
    return {
        "font-size": this.fontSize,
        fill: this.determineBaseColor(),
        "font-family": mercator.TextInput.defaultFontFamily,
        "font-weight": this.bold ? "bold" : "normal",
        "font-style": this.italic ? "italic" : "normal"
    }
}, mercator.TextInput.prototype.draw = function () {
    if (this.subChart.isActive()) return this.textElement = this.designer.drawer.text(this.origin.x, this.origin.y, whitespaceToNonBreakingSpaces(this.typedText), this.determineStyle()).toLayer(this.layer, this.designer, this.zIndex).zoomAndRotateAround(this.rotationAngle, this.center(), this.designer), this.objectDrawn(), this
}, mercator.TextInput.prototype.undraw = function () {
    if (this.subChart.isActive()) return this.objectUndrawn(), this.textElement && this.textElement.remove(), this
}, mercator.TextInput.prototype.redraw = function () {
    this.undraw(), this.draw()
}, mercator.TextInput.prototype.remove = function () {
    this.subChart.removeTextInput(this)
}, mercator.TextInput.prototype.deselected = function () {
    0 === this.typedText.length && this.remove()
}, mercator.TextInput.prototype.visibleElementsSet = function () {
    return mercator.set(this.textElement)
}, mercator.TextInput.prototype.determineNonHighlightedColor = function () {
    return this.textColor
}, mercator.TextInput.prototype.determineStrokeWidth = function () {
    return 0
}, mercator.TextInput.prototype.toJson = function () {
    var t = this.origin.toJson(this.subChart);
    return {
        text: this.typedText,
        centerX: t.x,
        centerY: t.y,
        rotationAngle: this.rotationAngle,
        fontSize: this.fontSize,
        textColor: this.textColor,
        bold: this.bold,
        italic: this.italic,
        objectType: "text"
    }
}, mercator.TextInput.prototype.bbox = function () {
    var t = this.designer.textsBboxCache.getBboxDimensions(this.typedText, this.fontSize, this.bold, this.rotationAngle);
    return new mercator.RectangleShape(this.center(), t.width, t.height).bbox()
}, mercator.TextInput.prototype.getObjectTypeName = function () {
    return "textInput"
}, mercator.TextInput.fromJson = function (t, e) {
    var i = void 0 === t.rotationAngle ? 0 : t.rotationAngle;
    return mercator.TextInput.fromOriginAndText(mercator.Point.fromJson({
        x: t.centerX,
        y: t.centerY
    }, e), t.text, t.fontSize, t.textColor, t.bold, t.italic, i, e)
}, mercator.TextInput.fromOriginAndText = function (t, e, i, o, n, s, r, a) {
    var p = new mercator.TextInput(t, a);
    return p.typedText = e, p.rotationAngle = r, p.fontSize = i || mercator.TextInput.defaultFontSize, p.textColor = o || mercator.ColorPalettes.defaults.TEXT[a.designer.getCanvasColorScheme()], p.bold = n || mercator.TextInput.defaultBold, p.italic = s || mercator.TextInput.defaultItalic, p
}, mercator.TextInput.defaultFontSize = 14, mercator.TextInput.defaultFontFamily = "Inter, Roboto, Helvetica, Arial, sans-serif", mercator.TextInput.defaultBold = !1, mercator.TextInput.defaultItalic = !1;
mercator.LabelingTextInput = function (t, e, i, n) {
    this.object = t, this.designer = e, this.withBackgroundColor = i, this.textElement = null, this.fontConfig = n || mercator.LabelingTextInput.FONT_CONFIG_NORMAL, this.characterHeight = this.fontConfig.characterHeight, this.rotation = 0, this.isShown = e.labelsShown, this.isToFront = !1
}, mercator.LabelingTextInput.prototype.draw = function () {
    return this.object.subChart.isActive() && this.isShown ? (this.textElement = document.createElement("span"), this.designer.canvas().parent()[0].appendChild(this.textElement), this.textElement.className = "editableText", this.textElement.innerText = this.object.getDisplayLabelOrLabel(), Object.assign(this.textElement.style, this.elementStyle()), this) : this
}, mercator.LabelingTextInput.prototype.elementStyle = function () {
    var t = this.designer.zoomer;
    let e = this.object.isUnlabeled() || this.object.isDuplicate,
        i = {
            padding: "0 0.35em",
            position: "absolute",
            fontFamily: this.fontConfig.fontFamily,
            fontWeight: this.fontConfig.fontWeight || "bold",
            color: this.determineLabelColor(),
            cursor: "pointer",
            fontSize: t.zoomed(this.characterHeight) + "px",
            whiteSpace: "pre",
            zIndex: this.isToFront ? 2 : 1,
            backgroundColor: e ? mercator.Object.ERROR_COLOR : "transparent",
            borderRadius: "1em",
            pointerEvents: "none"
        };
    return this.withBackgroundColor && Object.assign(i, {
        backgroundColor: "black",
        padding: "0px 3px",
        color: "white",
        borderRadius: "0.25em"
    }), Object.assign(i, this.positionTextElement()), Object.assign(i, this.rotateAndTranslateTextElement()), i
}, mercator.LabelingTextInput.prototype.useErrorAppearance = function () {
    return this.object.isUnlabeled() || this.object.isDuplicate
}, mercator.LabelingTextInput.prototype.determineLabelColor = function () {
    return this.useErrorAppearance() ? "white" : this.object.determineLabelColor()
}, mercator.LabelingTextInput.prototype.undraw = function () {
    return this.textElement && (this.textElement.parentNode.removeChild(this.textElement), this.textElement = null), this
}, mercator.LabelingTextInput.prototype.redraw = function () {
    return this.undraw().draw()
}, mercator.LabelingTextInput.prototype.refresh = function () {
    if (!this.textElement) return this.draw();
    let t = this.object.isUnlabeled() || this.object.isDuplicate;
    return Object.assign(this.textElement.style, {
        color: this.determineLabelColor(),
        backgroundColor: this.withBackgroundColor ? "black" : t ? mercator.Object.ERROR_COLOR : "transparent",
        padding: this.withBackgroundColor ? "0px 3px" : "0 0.35em",
        borderRadius: this.withBackgroundColor ? "0.25em" : "1em"
    }), this.textElement.innerText = this.object.getDisplayLabelOrLabel(), this
}, mercator.LabelingTextInput.prototype.setShown = function () {
    return this.isShown = !0, this
}, mercator.LabelingTextInput.prototype.setNotShown = function () {
    return this.isShown = !1, this
}, mercator.LabelingTextInput.prototype.applyZoom = function () {
    this.redraw()
}, mercator.LabelingTextInput.prototype.objectDrawn = function () {
    this.redraw()
}, mercator.LabelingTextInput.prototype.objectUndrawn = function () {
    this.undraw()
}, mercator.LabelingTextInput.prototype.rotateAndTranslateTextElement = function () {
    return {
        transform: "translate(-50%, -50%) rotate(" + this.object.getLabelRotation() + "deg)",
        transformOrigin: "center center"
    }
}, mercator.LabelingTextInput.prototype.positionTextElement = function () {
    var t = this.object.labelPosition().toView(this.designer);
    return {
        left: t.x + "px",
        top: t.y + "px"
    }
}, mercator.LabelingTextInput.prototype.toFront = function () {
    return this.isToFront = !0, this
}, mercator.LabelingTextInput.FONT_CONFIG_NORMAL = {
    characterHeight: 10,
    fontFamily: mercator.TextInput.defaultFontFamily,
    fontColor: "black"
}, mercator.LabelingTextInput.FONT_CONFIG_BIG = {
    characterHeight: 28,
    fontFamily: mercator.TextInput.defaultFontFamily
}, mercator.LabelingTextInput.emptyLabel = "?";
mercator.HelperLines = function (e) {
    this.designer = e, this.helperLines = [], this.areClosestRowHelperLinesShown = !1
}, mercator.HelperLines.SENSITIVITY = mercator.Chair.width / 1.5, mercator.HelperLines.prototype.draw = function (e, i) {
    this.undraw(), 0 !== this.designer.activeSubChart().rows.length && (this.closestRow = this.findRowThatIsCloseEnough(e), this.closestRow && (i || this.drawHelperLinePerpendicularToRow(this.closestRow, e), this.drawLineParallelToRow(this.closestRow, e), this.areClosestRowHelperLinesShown = !0))
}, mercator.HelperLines.prototype.undraw = function () {
    this.helperLines.forEach(function (e) {
        e.undraw()
    }), this.helperLines = [], this.areClosestRowHelperLinesShown = !1
}, mercator.HelperLines.prototype.getRayLength = function () {
    return this.designer.zoomer.unzoom(Math.max(window.innerWidth, window.innerHeight))
}, mercator.HelperLines.prototype.drawHelperLinePerpendicularToRow = function (e, i) {
    let t = e.createRayFromFirstChairToLast(),
        s = i.findClosestTo(e.pointsToSnapTo()),
        n = new mercator.RayFromOriginAndAngle(s, t.angle()).plusAngle(90),
        o = this.getRayLength(),
        r = new mercator.Ray(n.pointAtDistanceFromOrigin(-o), n.pointAtDistanceFromOrigin(o));
    this.helperLines.push(new mercator.HelperLine(r, this.designer).draw())
}, mercator.HelperLines.prototype.drawLineParallelToRow = function (e, i) {
    let t = e.createRayFromFirstChairToLast(),
        s = this.findOriginOfHelperRay(t, i),
        n = new mercator.RayFromOriginAndAngle(s, t.angle()),
        o = this.getRayLength(),
        r = new mercator.Ray(n.pointAtDistanceFromOrigin(-o), n.pointAtDistanceFromOrigin(o));
    this.helperLines.push(new mercator.HelperLine(r, this.designer).draw()), this.helperLines.push(new mercator.HelperLine(t, this.designer).draw())
}, mercator.HelperLines.prototype.findOriginOfHelperRay = function (e, i) {
    var t = e.plusAngle(90).pointAtDistanceFromOrigin(mercator.Chair.width + mercator.Row.getSpacing()),
        s = e.plusAngle(-90).pointAtDistanceFromOrigin(mercator.Chair.width + mercator.Row.getSpacing());
    return t.distanceToPoint(i) < s.distanceToPoint(i) ? t : s
}, mercator.HelperLines.prototype.findRowThatIsCloseEnough = function (e) {
    let i = this.findClosestRowByHelperLineTo(e);
    if (i) {
        var t = 2 * mercator.Chair.width + mercator.Row.getSpacing();
        return e.distanceToRow(i) < t ? i : void 0
    }
}, mercator.HelperLines.prototype.findClosestRowByHelperLineTo = function (e) {
    let i = this.designer.activeSubChart().rows.reduce((i, t) => {
        let s = t.createRayFromFirstChairToLast(),
            n = this.findClosestHelperRay(s, e);
        return !i || e.distanceToRay(n) < e.distanceToRay(i[1]) ? [t, n] : i
    }, null);
    return i ? i[0] : null
}, mercator.HelperLines.prototype.findClosestHelperRay = function (e, i) {
    var t = e.plusAngle(90).pointAtDistanceFromOrigin(mercator.Chair.width + mercator.Row.getSpacing()),
        s = e.plusAngle(-90).pointAtDistanceFromOrigin(mercator.Chair.width + mercator.Row.getSpacing());
    return t.distanceToPoint(i) < s.distanceToPoint(i) ? new mercator.Ray(t, e.plusAngleFromEnd(90).pointAtDistanceFromOrigin(mercator.Chair.width + mercator.Row.getSpacing())) : new mercator.Ray(s, e.plusAngleFromEnd(-90).pointAtDistanceFromOrigin(mercator.Chair.width + mercator.Row.getSpacing()))
}, mercator.HelperLines.prototype.snapTo = function (e) {
    var i = this.findPossiblePointToSnapTo(e);
    if (i && i.distanceToPoint(e) < mercator.HelperLines.SENSITIVITY) return i
}, mercator.HelperLines.prototype.findPossiblePointToSnapTo = function (e) {
    if (0 !== this.helperLines.length) return 1 === this.helperLines.length ? this.helperLines[0].projectPoint(e) : this.intersectionOrProjection(e)
}, mercator.HelperLines.prototype.intersectionOrProjection = function (e) {
    var i = this.helperLines[0].intersectionWith(this.helperLines[1]);
    return i || this.helperLines[0].projectPoint(e)
}, mercator.HelperLine = function (e, i) {
    this.ray = e, this.designer = i
}, mercator.HelperLine.prototype.draw = function () {
    return this.line = this.designer.drawLineThroughRay(this.ray).attr({
        "stroke-width": this.designer.zoomer.unzoom(1),
        stroke: mercator.PositionGuidesSupport.GUIDE_COLORS.magenta,
        opacity: 1
    }).applyZoom(this.designer).toLayer("selectionRectanglesLayer", this.designer), this.line.node.setAttribute("pointer-events", "none"), this
}, mercator.HelperLine.prototype.undraw = function () {
    this.line.remove()
}, mercator.HelperLine.prototype.projectPoint = function (e) {
    return this.ray.projectPoint(e)
}, mercator.HelperLine.prototype.intersectionWith = function (e) {
    return this.ray.intersectionWithRay(e.ray)
};
mercator.Aligner = class {
    static normalizeRows(t) {
        this.straightenRows(t), this.evenlySpaceRows(t)
    }
    static straightenRows(t) {
        if (t.length < 2) return;
        let e, {
            angle: i,
            count: o
        } = mercator.RowsUtil.mostCommonAngle(t);
        e = o > t.length / 3 ? i : mercator.RowsUtil.medianRotationAngle(t);
        let s = new mercator.Angle(e);
        t.forEach(t => {
            let i = new mercator.Angle(t.getRoundedRotation());
            i.isInTheSameQ(s) || i.isInTheHorizontalMirror(s) ? t.setRotation(e) : t.setRotation(Number(e) + 180)
        })
    }
    static evenlySpaceRows(t, e = null) {
        if (t.length < 2) return;
        const i = mercator.RowCurver,
            o = mercator.RowsUtil.medianRotationAngle(t),
            s = mercator.RowsUtil.center(t);
        let n = t.map(t => i.decompose(t)).map(t => i.rotateBy(t, -o, s)).map(t => i.rotateUntilHorizontal(t)).sort((t, e) => t.chairCenters[0].y - e.chairCenters[0].y);
        n.forEach(t => {
            t.distanceFromFirstRow = t.chairCenters[0].y - n[0].chairCenters[0].y
        });
        const a = n[n.length - 1].distanceFromFirstRow;
        n.forEach((t, i) => {
            let s = t.originalRow,
                r = new mercator.RayFromOriginAndAngle(n[0].originalRow.center(), o + 90),
                l = e ? e * i : a / (n.length - 1) * i,
                c = r.pointAtDistanceFromPoint(t.distanceFromFirstRow, r.origin),
                g = r.pointAtDistanceFromPoint(l, r.origin),
                h = new mercator.Point(0, 0).subtract(c.subtract(g));
            s.moved(h)
        })
    }
    static alignRowsCenter(t) {
        if (t.length < 2) return;
        const e = mercator.RowsUtil.medianRotationAngle(t),
            i = mercator.RowsUtil.center(t),
            o = new mercator.Ray(i, new mercator.RayFromOriginAndAngle(i, e + 90).pointAtDistanceFromPoint(1, i));
        t.forEach(t => {
            let e = t.createRayFromFirstChairToLast().intersectionPointWithRay(o, !0);
            t.moved(e.subtract(t.center()))
        })
    }
    static alignRowsLeft(t) {
        t.length < 2 || this.alignRowsToSide(t, !0)
    }
    static alignRowsRight(t) {
        t.length < 2 || this.alignRowsToSide(t, !1)
    }
    static alignRowsToSide(t, e = !0) {
        const i = mercator.RowsUtil.medianRotationAngle(t),
            o = e ? mercator.RowsUtil.leftPoint(t) : mercator.RowsUtil.rightPoint(t),
            s = new mercator.Ray(o, new mercator.RayFromOriginAndAngle(o, i + 90).pointAtDistanceFromPoint(1, o));
        t.forEach(t => {
            let i = t.createRayFromFirstChairToLast().intersectionPointWithRay(s, !0),
                o = t.firstChair().center().x <= t.lastChair().center().x,
                n = (e ^ !o ? t.firstChair() : t.lastChair()).center();
            t.moved(i.subtract(n))
        })
    }
    static alignHorizontally(t, e) {
        if (t.length < 2) return;
        let i = mercator.Bbox.coreMergedFromObjects(t),
            o = this.getBboxHorizontalPosition(i, e);
        t.forEach(t => t.alignHorizontally(o, e))
    }
    static getBboxHorizontalPosition(t, e) {
        return t[mercator.Aligner.HORIZONTAL_BBOX_POSITIONS[e]]().x
    }
    static alignVertically(t, e) {
        if (t.length < 2) return;
        let i = mercator.Bbox.coreMergedFromObjects(t),
            o = this.getBboxVerticalPosition(i, e);
        t.forEach(t => t.alignVertically(o, e))
    }
    static getBboxVerticalPosition(t, e) {
        return t[mercator.Aligner.VERTICAL_BBOX_POSITIONS[e]]().y
    }
    static spaceObjects(t, e) {
        if (e.length < 2) return;
        const i = "x" === t ? "width" : "height";
        let o = e.sort((e, i) => e.getCenter()[t] - i.getCenter()[t]),
            s = _.first(o).coreBbox().topLeft()[t],
            n = (_.last(o).coreBbox().bottomRight()[t] - s - o.reduce((t, e) => t + e.coreBbox()[i], 0)) / (e.length - 1),
            a = 0;
        o.forEach((e, o) => {
            let r = s + a,
                l = "x" === t ? new mercator.Point(r - e.getCenter().x + e.coreBbox().width / 2, 0) : new mercator.Point(0, r - e.getCenter().y + e.coreBbox().height / 2);
            e.moved(l), a += e.coreBbox()[i] + n
        })
    }
}, mercator.Aligner.ALIGN_START = 0, mercator.Aligner.ALIGN_CENTER = 1, mercator.Aligner.ALIGN_END = 2, mercator.Aligner.HORIZONTAL_BBOX_POSITIONS = ["topLeft", "topMiddle", "topRight"], mercator.Aligner.VERTICAL_BBOX_POSITIONS = ["topLeft", "middleLeft", "bottomLeft"], mercator.Aligner.AXIS_X = "x", mercator.Aligner.AXIS_Y = "y";
mercator.Flipper = function () { }, mercator.Flipper.prototype.flip = function (i, e, o) {
    let n = new mercator.RayFromOriginAndAngle(e, o ? 90 : 0);
    i.forEach(i => i.flip(n, o))
};
mercator.Color = class e {
    constructor(e) {
        this.cssString = e, this.muchBolderCached = null, this.darkenedCached = null, this.muchDarkenedCached = null, this.muchLightenedCached = null, this.darkerShadeCached = null, this.lighterShadeCached = null, this.desaturatedCached = null, this.selectedCached = null, this.softenedCached = null, this.softenedByCached = {}, this.selectedLightCached = null, this.cache = new Map
    }
    fromCache(e, t) {
        return this.cache.has(e) || this.cache.set(e, t()), this.cache.get(e)
    }
    brehaut() {
        return net.brehaut.Color(this.cssString)
    }
    muchBolder() {
        if (this.muchBolderCached) return this.muchBolderCached;
        const e = this.brehaut().getLuminance();
        return this.muchBolderCached = mercator.Color.create(this.brehaut().saturateByRatio(.4).darkenByRatio(.5).blend(mercator.Color.BLACK.brehaut(), .5 * e).toCSS()), this.muchBolderCached
    }
    darkened() {
        return this.darkenedCached ? this.darkenedCached : (this.darkenedCached = mercator.Color.create(this.brehaut().saturateByRatio(.2).blend(mercator.Color.BLACK.brehaut(), .13).toCSS()), this.darkenedCached)
    }
    muchDarkened() {
        return this.muchDarkenedCached ? this.muchDarkenedCached : (this.muchDarkenedCached = mercator.Color.create(this.brehaut().saturateByRatio(.2).blend(mercator.Color.BLACK.brehaut(), .17).toCSS()), this.muchDarkenedCached)
    }
    lighterShade() {
        return this.lighterShadeCached ? this.lighterShadeCached : (this.lighterShadeCached = mercator.Color.create(this.brehaut().saturateByRatio(.25).lightenByAmount(.06).blend(mercator.Color.WHITE.brehaut(), .08).toCSS()), this.lighterShadeCached)
    }
    desaturated() {
        return this.desaturatedCached ? this.desaturatedCached : (this.desaturatedCached = mercator.Color.create(this.brehaut().desaturateByRatio(.5).toCSS()), this.desaturatedCached)
    }
    softened(e = !1) {
        if (this.softenedCached) return this.softenedCached;
        const t = e ? mercator.Color.BLACK : mercator.Color.WHITE;
        return this.softenedCached = mercator.Color.create(this.brehaut().desaturateByRatio(.5).blend(t.brehaut(), .5).toCSS()), this.softenedCached
    }
    contrastingColor() {
        return this.isDark() ? mercator.Color.WHITE : mercator.Color.BLACK
    }
    selected() {
        return this.selectedCached ? this.selectedCached : (this.selectedCached = mercator.Color.create(this.brehaut().blend(mercator.Color.SELECTED.brehaut(), .95).toCSS()), this.selectedCached)
    }
    selectedLight() {
        return this.selectedLightCached ? this.selectedLightCached : (this.selectedLightCached = mercator.Color.create(this.brehaut().blend(mercator.Color.SELECTED_LIGHT.brehaut(), .85).toCSS()), this.selectedLightCached)
    }
    softenedBy(e, t = !1) {
        return this.fromCache(`${t}-${e}`, () => {
            const a = (t ? mercator.Color.BLACK : mercator.Color.WHITE).brehaut(),
                s = e / 100;
            return t ? mercator.Color.create(this.brehaut().desaturateByRatio(.4 * s).blend(a, s).toCSS()) : mercator.Color.create(this.brehaut().desaturateByRatio(.6 * s).blend(a, s).toCSS())
        })
    }
    intensifyBy(t, a = !1) {
        return this.fromCache(`intensifyBy-${t}`, () => {
            const s = t / 100;
            return a ? e.create(this.brehaut().saturateByRatio(.3 * s).lightenByRatio(s).toCSS()) : e.create(this.brehaut().saturateByRatio(.4 * s).darkenByRatio(s).toCSS())
        })
    }
    alpha(t, a = !1) {
        const s = () => e.create(this.brehaut().setAlpha(t).toCSS());
        return a ? this.fromCache(`alpha-${t}`, s) : s()
    }
    isLight() {
        return this.brehaut().getLuminance() > .5
    }
    isDark() {
        return !this.isLight()
    }
    toCSS() {
        return this.brehaut().toCSS()
    }
    static create(e) {
        var t = mercator.Color.cache[e];
        return t || (mercator.Color.cache[e] = new mercator.Color(e), mercator.Color.cache[e])
    }
}, mercator.Color.cache = {}, mercator.Color.WHITE = mercator.Color.create("white"), mercator.Color.BLACK = mercator.Color.create("black"), mercator.Color.SELECTED = mercator.Color.create("#047EF0"), mercator.Color.SELECTED_LIGHT = mercator.Color.create("#B9E3FD");
mercator.Alert = function (t) {
    this.container = t, this.hideTimeout = null, this.init()
}, mercator.Alert.prototype.init = function () {
    var t = this;
    this.container.hide(), this.container.on("click", function () {
        t.hide()
    })
}, mercator.Alert.prototype.show = function (t, i) {
    this.showWithClass(t, "notification", i)
}, mercator.Alert.prototype.showWarning = function (t) {
    this.showWithClass(t, "warning", !0)
}, mercator.Alert.prototype.showWithClass = function (t, i, s) {
    var e = this;
    this.container.removeClass().addClass(i), s ? this.container.addClass("keep-visible") : this.container.addClass("auto-hide"), this.container.find(".msg-content").html(t), this.container.slideDown(), clearTimeout(this.hideTimeout), s || (this.hideTimeout = setTimeout(function () {
        e.hide()
    }, 6e3))
}, mercator.Alert.prototype.hide = function () {
    this.container.slideUp()
};
mercator.InlineEditableTextControl = function (t, e) {
    this.id = t, this.parentElement = e, this.onValueChangedCallback = null, this.value = null, this.rootElement = null, this.defaultValue = null, this.isReadOnly = !0
}, mercator.InlineEditableTextControl.prototype.onValuechanged = function (t) {
    return this.onValueChangedCallback = t, this
}, mercator.InlineEditableTextControl.prototype.withDefaultValue = function (t) {
    return this.defaultValue = t, this
}, mercator.InlineEditableTextControl.prototype.setValue = function (t) {
    return this.value = t, this.render(), this
}, mercator.InlineEditableTextControl.prototype.getValue = function () {
    return isBlank(this.value) ? this.defaultValue : this.value
}, mercator.InlineEditableTextControl.prototype.valueChanged = function (t) {
    this.setValue(t), this.onValueChangedCallback && this.onValueChangedCallback(this.value)
}, mercator.InlineEditableTextControl.prototype.render = function () {
    this.unrender(), this.rootElement = $("<div>").attr("id", this.id).append(this.renderNameInput()).appendTo(this.parentElement)
}, mercator.InlineEditableTextControl.prototype.unrender = function () {
    this.rootElement && (this.rootElement.remove(), this.rootElement = null)
}, mercator.InlineEditableTextControl.prototype.renderNameInput = function () {
    var t = $('<input type="text">').attr("placeholder", this.defaultValue).attr("readonly", "readonly").val(this.getValue());
    return t.on("mouseenter", this.makeEditable.bind(this, t)).on("mouseleave", this.makeReadOnly.bind(this, t)).on("click", this.selectText.bind(this, t)).on("keypress", this.blurIfEnter.bind(this, t)).on("blur", this.blurred.bind(this, t)).on("focus", this.makeEditable.bind(this, t)), t
}, mercator.InlineEditableTextControl.prototype.makeEditable = function (t) {
    t.removeAttr("readonly")
}, mercator.InlineEditableTextControl.prototype.makeReadOnly = function (t) {
    t.is(":focus") || t.attr("readonly", "readonly")
}, mercator.InlineEditableTextControl.prototype.blurred = function (t) {
    this.makeReadOnly(t), this.valueChanged(t.val())
}, mercator.InlineEditableTextControl.prototype.selectText = function (t) {
    t.select()
}, mercator.InlineEditableTextControl.prototype.blurIfEnter = function (t, e) {
    13 === e.which && t.blur()
};
mercator.TextControl = function (t, e) {
    this.id = t, this.parentElement = e, this.rootElement = null, this.value = null
}, mercator.TextControl.prototype.setValue = function (t) {
    return this.value = t, this.render(), this
}, mercator.TextControl.prototype.getValue = function (t) {
    return this.value
}, mercator.TextControl.prototype.render = function () {
    this.unrender(), this.rootElement = $("<div>").attr("id", this.id).text(this.getValue()).appendTo(this.parentElement)
}, mercator.TextControl.prototype.unrender = function () {
    this.rootElement && (this.rootElement.remove(), this.rootElement = null)
};
mercator.AutoLabeler = {
    calculateObjectLabel: function (e, t, n) {
        const r = this.getAlgorithm(n.algoName);
        if (r) {
            let i = r.calculateLabel(t, n.startAtIndex, e, n.skippedCharacters);
            return n.prefix && (i = `${n.prefix}${i}`), i
        }
    },
    getFirstPossibilities: function (e, t) {
        var n = [];
        if (e) {
            if ("UpDownAscending" === e.name || "UpDownDescending" === e.name) return this.getFirstPossibilities(this.getAlgorithm("SimpleNumbersOdd"), t);
            for (var r = 0; r < t; r++) n[r] = e.calculateLabel(r, 0, t)
        }
        return n
    },
    pickFrom: function (e, t, n = 0, r = !1) {
        var i = e.split(""),
            a = r ? n - t : t + n,
            l = Math.floor(a / i.length) + 1,
            u = i[a % i.length];
        return _.repeat(u, l)
    },
    normalizeIndex: function (e, t, n) {
        return n ? t - e - 1 : e
    },
    calculateIndex: function (e, t, n, r) {
        if (null == t) return 0;
        if ("UpDownAscending" === e.name || "UpDownDescending" === e.name) return this.calculateIndex(this.getAlgorithm("SimpleNumbersOdd"), t);
        for (var i = -1; i < 1e5; ++i)
            if (equalCaseInsentive(e.calculateLabel(i, 0, n, r), t)) return i;
        return null
    },
    firstLabel: function (e) {
        return "UpDownAscending" === e.name || "UpDownDescending" === e.name ? "1" : e.calculateLabel(0, 0)
    },
    algorithms: [{
        name: "SimpleNumbers",
        text: "1, 2, 3, ...",
        inputNumeral: "decimal-sequence",
        calculateLabel: function (e, t, n, r = [], i = !1) {
            return (i ? t - e : e + t) + 1 + ""
        }
    }, {
        name: "SimpleNumbersOdd",
        text: "1, 3, 5, ...",
        inputNumeral: "odd",
        calculateLabel: function (e, t, n, r = [], i = !1) {
            return parseOdd((i ? t - 2 * e : 2 * e + t) + 1) + ""
        }
    }, {
        name: "SimpleNumbersEven",
        text: "2, 4, 6, ...",
        inputNumeral: "even",
        calculateLabel: function (e, t, n, r = [], i = !1) {
            return parseEven((i ? t - 2 * e : 2 * e + t) + 1) + ""
        }
    }, {
        name: "UpDownAscending",
        text: "1, 3, 5, ..., 6, 4, 2",
        inputNumeral: "decimal-sequence-up-down-ascending",
        calculateLabel: function (e, t, n) {
            return e < n / 2 ? 2 * (e + t) + 1 + "" : 2 * (n - e + t) + ""
        }
    }, {
        name: "UpDownDescending",
        text: "... , 5, 3, 1, 2, 4, 6, ...",
        inputNumeral: "decimal-sequence-up-down-descending",
        calculateLabel: function (e, t, n) {
            var r = Math.ceil(n / 2) - 1;
            return e <= r ? 2 * (r - e + t) + 1 + "" : 2 * (e - r + t) + ""
        }
    }, {
        name: "SimpleLettersUppercase",
        text: "A, B, C, ...",
        inputNumeral: "alphabetic-sequence",
        calculateLabel: function (e, t, n, r = [], i = !1) {
            let a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            return r.forEach(e => a = a.replace(e.toUpperCase(), "")), mercator.AutoLabeler.pickFrom(a, e, t, i)
        }
    }, {
        name: "SimpleLettersLowercase",
        text: "a, b, c, ...",
        inputNumeral: "alphabetic-sequence-lowercase",
        calculateLabel: function (e, t, n, r = [], i = !1) {
            let a = "abcdefghijklmnopqrstuvwxyz";
            return r.forEach(e => a = a.replace(e.toLowerCase(), "")), mercator.AutoLabeler.pickFrom(a, e, t, i)
        }
    }, {
        name: "Roman",
        text: "I, II, III, IV, ...",
        inputNumeral: "roman-sequence",
        calculateLabel: function (e, t, n, r = [], i = !1) {
            return romanize(i ? t - e : e + t + 1)
        }
    }],
    algorithmGroups: {
        object: ["SimpleLettersUppercase", "SimpleNumbers", "Roman"],
        seat: ["SimpleNumbers", "SimpleNumbersOdd", "SimpleNumbersEven", "UpDownAscending", "UpDownDescending", "SimpleLettersUppercase", "SimpleLettersLowercase"]
    },
    endAtLimiterAlgorithms: ["SimpleNumbers", "SimpleNumbersOdd", "SimpleNumbersEven", "SimpleLettersUppercase", "SimpleLettersLowercase"],
    startAtZeroAlgorithms: ["SimpleNumbers", "SimpleNumbersEven"],
    doubleLengthAlgorithms: ["SimpleNumbersOdd", "SimpleNumbersEven"],
    getAlgorithmMinValue: function (e, t, n) {
        return mercator.AutoLabeler.startAtZeroAlgorithms.includes(e) ? 0 : t && mercator.AutoLabeler.endAtLimiterAlgorithms.includes(e) ? (n - 1) * (mercator.AutoLabeler.doubleLengthAlgorithms.includes(e) ? 2 : 1) + 1 : 1
    },
    getAlgorithm: function (e) {
        return this.algorithms.findOne(function (t) {
            return t.name === e
        })
    },
    getAlgorithmGroup: function (e) {
        return this.algorithmGroups[e].map(e => this.getAlgorithm(e))
    }
};
mercator.SeatLabeling = function (t, e, n, s = !1) {
    this.algoName = void 0 === t ? null : t, this.startAtIndex = void 0 === e ? null : e, this.isInverted = void 0 === n ? null : n, this.useEndAt = s
}, mercator.SeatLabeling.prototype.toJson = function () {
    return {
        algoName: this.algoName,
        startAtIndex: this.startAtIndex,
        isInverted: this.isInverted,
        useEndAt: this.useEndAt
    }
}, mercator.SeatLabeling.prototype.getIsInverted = function () {
    return !!(this.isInverted ^ this.useEndAt)
}, mercator.SeatLabeling.prototype.clone = function () {
    return new mercator.SeatLabeling(this.algoName, this.startAtIndex, this.isInverted, this.useEndAt, this.displayObjectType)
}, mercator.SeatLabeling.fromJson = function (t) {
    return t ? new mercator.SeatLabeling(t.algoName, t.startAtIndex, t.isInverted, t.useEndAt) : mercator.SeatLabeling.createDefaultSeatLabeling()
}, mercator.SeatLabeling.createDefaultSeatLabeling = function () {
    return new mercator.SeatLabeling
};
mercator.ObjectLabeling = function (e, t, a, i = []) {
    this.algoName = void 0 === e ? null : e, this.prefix = void 0 === t ? null : t, this.startAtIndex = void 0 === a ? null : a, this.skippedCharacters = new Set(i)
}, mercator.ObjectLabeling.prototype.toJson = function () {
    return {
        algoName: this.algoName,
        prefix: this.prefix,
        startAtIndex: this.startAtIndex,
        skippedCharacters: Array.from(this.skippedCharacters)
    }
}, mercator.ObjectLabeling.prototype.clone = function () {
    return new mercator.ObjectLabeling(this.algoName, this.prefix, this.startAtIndex, Array.from(this.skippedCharacters))
}, mercator.ObjectLabeling.fromJson = function (e) {
    return e ? new mercator.ObjectLabeling(e.algoName, e.prefix, e.startAtIndex, e.skippedCharacters) : mercator.ObjectLabeling.createDefaultRowLabeling()
}, mercator.ObjectLabeling.createDefaultRowLabeling = function () {
    return new mercator.ObjectLabeling
}, mercator.ObjectLabeling.createDefaultTableLabeling = function () {
    return new mercator.ObjectLabeling("SimpleNumbers", "", 0)
}, mercator.ObjectLabeling.createDefaultBoothLabeling = function () {
    return new mercator.ObjectLabeling("SimpleNumbers", "", 0)
}, mercator.ObjectLabeling.createDefaultSectionLabeling = function () {
    return new mercator.ObjectLabeling("SimpleLettersUppercase", "", 0)
};
mercator.ColorPalettes = {
    palettes: {},
    sets: {},
    defaults: {},
    COLORS_PER_PALETTE: 8
}, mercator.ColorPalettes.palettes.rainbow = {
    name: "rainbow",
    colorblindSafe: !0,
    colors: {
        light: ["#992C4E", "#CD254A", "#E9803D", "#FCA700", "#58B44F", "#49A3BA", "#4176A5", "#4F558F"],
        dark: ["#C41F5A", "#D13431", "#E9803D", "#F2D151", "#98D45E", "#5AAFC7", "#6297DD", "#5E75E3"]
    }
}, mercator.ColorPalettes.palettes.polarSunset = {
    name: "polar-sunset",
    colorblindSafe: !0,
    colors: {
        light: ["#6799D1", "#6EB8E0", "#FBA700", "#F79100", "#F36B2E", "#F24F51", "#5B6DBA", "#517FBB"],
        dark: ["#7CA5D3", "#8FC4E2", "#FDB829", "#F39720", "#F4743D", "#E95658", "#6A7CC6", "#6D95C8"]
    }
}, mercator.ColorPalettes.palettes.frostyAutumn = {
    name: "frosty-autumn",
    colorblindSafe: !0,
    colors: {
        light: ["#6FADAF", "#5E96B2", "#6573A5", "#545384", "#DD2140", "#F53F3F", "#F17658", "#E99656"],
        dark: ["#7FCCBD", "#63BBCD", "#53A2D3", "#587FCB", "#CA2A52", "#E3504E", "#ED9065", "#E8AC71"]
    }
}, mercator.ColorPalettes.palettes.vibrantNature = {
    name: "vibrant-nature",
    colorblindSafe: !0,
    colors: {
        light: ["#0D67BF", "#C51C2F", "#F4560E", "#C06945", "#86B737", "#05A588", "#00A5D6", "#3190ED"],
        dark: ["#3A5DF1", "#E50031", "#F15429", "#B95737", "#8EC940", "#2FCD46", "#1B9FD2", "#2277D1"]
    }
}, mercator.ColorPalettes.palettes.scenery = {
    name: "scenery",
    colors: {
        light: ["#878E97", "#84CBE5", "#5EA9DE", "#B2E192", "#F1DEB1", "#D07C81", "#D3A38E", "#DFDBD6"],
        dark: ["#738599", "#2A6CAB", "#223C85", "#267153", "#A19071", "#84363A", "#85665A", "#394350"]
    }
}, mercator.ColorPalettes.palettes.whiteBlackBoard = {
    conditionalName: {
        light: "whiteboard",
        dark: "blackboard"
    },
    colors: {
        light: ["#151617", "#7497C0", "#4F558F", "#60A24F", "#E9803D", "#B12731", "#8A203B", "#996047"],
        dark: ["#F0F0F0", "#81B8D1", "#6185B2", "#60A24F", "#F2D151", "#E9803D", "#E03C43", "#9B6048"]
    }
}, mercator.ColorPalettes.palettes.platinum = {
    name: "platinum",
    colorblindSafe: !0,
    colors: {
        light: ["#E3E4E5", "#D0D1D2", "#A3A5A7", "#828588", "#54575B", "#323335", "#1D1F20", "#060607"],
        dark: ["#151617", "#323335", "#63676B", "#95979A", "#B3B5B6", "#D6D7D8", "#E9EBEE", "#F2F9FF"]
    }
}, mercator.ColorPalettes.palettes.ivory = {
    name: "ivory",
    colorblindSafe: !0,
    colors: {
        light: ["#EBE5DF", "#E2D7D2", "#BEB6B1", "#A09590", "#57504C", "#352F2C", "#211B17", "#1B0D05"],
        dark: ["#211B17", "#352F2C", "#57504C", "#A09590", "#BEB6B1", "#E2D7D2", "#EBE5DF", "#F8F8F7"]
    }
}, mercator.ColorPalettes.sets.category = [mercator.ColorPalettes.palettes.rainbow, mercator.ColorPalettes.palettes.polarSunset, mercator.ColorPalettes.palettes.frostyAutumn, mercator.ColorPalettes.palettes.vibrantNature], mercator.ColorPalettes.sets.text = [mercator.ColorPalettes.palettes.scenery, mercator.ColorPalettes.palettes.whiteBlackBoard, mercator.ColorPalettes.palettes.platinum, mercator.ColorPalettes.palettes.ivory], mercator.ColorPalettes.sets.shape = [mercator.ColorPalettes.palettes.scenery, mercator.ColorPalettes.palettes.platinum, mercator.ColorPalettes.palettes.ivory], mercator.ColorPalettes.defaults.SHAPE_FILL = {
    light: mercator.ColorPalettes.palettes.platinum.colors.light[1],
    dark: mercator.ColorPalettes.palettes.platinum.colors.dark[2]
}, mercator.ColorPalettes.defaults.ICON_FILL = {
    light: mercator.ColorPalettes.palettes.platinum.colors.light[5],
    dark: mercator.ColorPalettes.palettes.platinum.colors.dark[5]
}, mercator.ColorPalettes.defaults.TEXT = {
    light: mercator.ColorPalettes.palettes.platinum.colors.light[5],
    dark: mercator.ColorPalettes.palettes.platinum.colors.dark[5]
};
mercator.ChartStatsGenerator = class {
    constructor(e, t, a) {
        this.subChartFloors = e, this.subCharts = t, this.categories = a
    }
    getTotalPeopleCapacity() {
        return this.subCharts.reduce((e, t) => e + t.totalPeopleCapacity(), 0)
    }
    getTotalBooths() {
        return this.subCharts.reduce((e, t) => e + t.allBooths().length, 0)
    }
    getTotalNumberOfTables() {
        return this.subCharts.reduce((e, t) => e + t.allTables().length, 0)
    }
    getNumberOfUnlabeledSeats(e = this.subCharts) {
        return e.flatMap(e => e.objectsWithSeats()).reduce((e, t) => e + t.numberOfUnlabeledSeats(), 0)
    }
    getNumberOfUnlabeledTables(e = this.subCharts) {
        return e.flatMap(e => e.tables.tables).reduce((e, t) => t.hasLabel() ? e : e + 1, 0)
    }
    getTotalNumberOfRows() {
        return this.subCharts.flatMap(e => e.allRows()).length
    }
    getNumberOfUnlabeledRows(e = this.subCharts) {
        return e.flatMap(e => e.rows).reduce((e, t) => t.hasLabel() ? e : e + 1, 0)
    }
    getDuplicateObjects() {
        let e = this.subChartFloors.allBookableObjectsWithTables().filter(e => e.hasLabel()),
            t = _.groupBy(e, e => e.getFullLabel()),
            a = _.mapValues(t, this.onlyObjectsFromSubCharts(this.subCharts));
        return _.omitBy(a, e => e.length <= 1)
    }
    onlyObjectsFromSubCharts(e) {
        return this.masterSubChartScope(e) ? e => e : t => {
            return t.some(t => e.includes(t.subChart)) ? t : []
        }
    }
    getUncategorized(e = this.subCharts) {
        let t = e.flatMap(e => e.categorisableParentObjects()).map(e => {
            let t = 0;
            return t = "section" === e.type ? this.getUncategorized([e.sectionSubChart]).count : "table" === e.type || "row" === e.type ? e.subChart.category ? 0 : e.uncategorizedChildren().length : e.subChart.category || e.category ? 0 : 1, {
                uuid: e.uuid,
                floor: this.subChartFloors.hasMultipleFloors() ? e.floorIndex() : void 0,
                type: e.type,
                label: e.label,
                count: t
            }
        }).filter(e => e.count > 0);
        return {
            count: t.reduce((e, t) => e += t.count, 0),
            details: t
        }
    }
    getUnlabeled(e = this.subCharts) {
        let t = e.flatMap(e => e.bookableParentObjectsWithSections()).map(e => {
            let t = 0;
            if ("section" === e.type) t = this.getUnlabeled([e.sectionSubChart]).count;
            else if ("table" === e.type || "row" === e.type) t = e.numberOfUnlabeledSeats();
            else {
                if ("booth" !== e.type && "generalAdmission" !== e.type || e.hasLabel()) return {
                    count: 0
                };
                t = 0
            }
            return {
                uuid: e.uuid,
                floor: this.subChartFloors.hasMultipleFloors() ? e.floorIndex() : void 0,
                type: e.type,
                label: e.label,
                count: t,
                isUnlabeled: e.isUnlabeled()
            }
        }).filter(e => e.count > 0 || e.isUnlabeled);
        return {
            count: t.reduce((e, t) => e + t.count + (t.isUnlabeled ? 1 : 0), 0),
            details: t
        }
    }
    getCapacityByObjectType(e = this.subCharts) {
        return e.flatMap(e => e.allBookableParentObjects()).reduce((e, t) => {
            let a = t.totalPeopleCapacity();
            return a > 0 && (e[t.type] || (e[t.type] = 0), e[t.type] += a), e
        }, {})
    }
    getCapacityByCategory(e = this.subCharts) {
        return e.flatMap(e => e.allBookableObjects()).reduce((e, t) => {
            let a = t.totalPeopleCapacity();
            if (a > 0) {
                let r = t.category || t.subChart.category,
                    s = r ? r.key : -1;
                e[s] || (e[s] = 0), e[s] += a
            }
            return e
        }, {})
    }
    getBoothsByCategory(e = this.subCharts) {
        return e.flatMap(e => e.allBooths()).reduce((e, t) => {
            let a = t.category || t.subChart.category,
                r = a ? a.key : -1;
            return e[r] || (e[r] = 0), e[r] += 1, e
        }, {})
    }
    getObjectTypesByCategory() {
        let e = this.categories.all().reduce((e, t) => (e[t.key] = [], e), {});
        return this.subChartFloors.allBookableObjects().forEach(t => {
            let a = (t.category || t.subChart.category || {}).key;
            if (a && void 0 !== e[a]) {
                let r = "chair" === t.type ? t.parent.type : t.type;
                e[a].contains(r) || e[a].push(r)
            }
        }), e
    }
    getFileSizeByImageWithBackground(e) {
        let t = this.getFileSizeByImage(e);
        return this.subCharts.filter(e => e.isMasterSubChart() && e.backgroundImage.url() && e.backgroundImage.showOnRenderedCharts).forEach(e => t[e.backgroundImage.url()] = e.backgroundImage.fileSize()), t
    }
    getFileSizeByImage(e = this.subCharts) {
        return e.flatMap(e => e.allImageObjects()).reduce((e, t) => (e[t.url()] = t.fileSize, e), {})
    }
    getImagesTotalSize(e = this.subCharts) {
        return Object.values(this.getFileSizeByImage(e)).reduce((e, t) => e + t, 0) + e.filter(e => e.isMasterSubChart() && e.backgroundImage.showOnRenderedCharts).reduce((e, t) => e + t.backgroundImage.fileSize(), 0)
    }
    hasFocalPoint() {
        return this.subChartFloors.firstFloorSubChart().focalPoint.isSet()
    }
    hasUnusedFloors() {
        if (this.subChartFloors.hasMultipleFloors()) return this.subChartFloors.allMasterSubCharts().some(e => e.isUnused())
    }
    hasNoObjects() {
        return 0 === this.subChartFloors.allBookableObjects().length
    }
    hasObjectsOutOfBounds(e = this.subCharts[0]) {
        return !e.isMasterSubChart() && e.allSelectableObjectsExceptSections().some(e => e.getIsOutOfBounds())
    }
    masterSubChartScope(e) {
        return e.some(e => e.isMasterSubChart())
    }
};
mercator.Keyboard = class {
    constructor(e) {
        this.designer = e, this.ZOOM_SCALE_THRESHOLD = .1, this.EDITABLE_TEXT_QUERY = "#drawing > .editableText"
    }
    onGestureStart(e) {
        e.preventDefault();
        let s = this.designer.pointInCanvasCenteredInViewport(),
            t = s.x / this.designer.canvas().width(),
            i = s.y / this.designer.canvas().height();
        this.designer.canvas().css("transform-origin", `${100 * t}% ${100 * i}%`), $(this.EDITABLE_TEXT_QUERY).hide()
    }
    onGestureChange(e) {
        e.preventDefault();
        let s = this.clampZoomScale(e.originalEvent.scale);
        this.designer.canvas().css("transform", `scale(${s})`)
    }
    onGestureEnd(e) {
        e.preventDefault(), this.designer.zoomer.zoom(this.designer.pointInCanvasCenteredInViewport(), this.designer.zoomer.zoomLevel * e.originalEvent.scale), this.designer.canvas().css("transform", "none"), $(this.EDITABLE_TEXT_QUERY).show()
    }
    onWheel(e) {
        if (this.altPressed(e)) {
            e.preventDefault(), e.stopPropagation();
            let s = new mercator.Point(e.originalEvent.pageX, e.originalEvent.pageY);
            this.designer.canvas().css("transform-origin", `${s.x}px ${s.y}px`), this.setFinalZoomTimeout ? clearTimeout(this.setFinalZoomTimeout) : (this.wheelZoomScale = 1, $(this.EDITABLE_TEXT_QUERY).hide()), this.wheelZoomScale = this.clampZoomScale(this.wheelZoomScale + e.originalEvent.deltaY / 200), this.designer.canvas().css("transform", `scale(${this.wheelZoomScale})`), this.setFinalZoomTimeout = setTimeout(() => {
                this.designer.zoomer.zoom(s, this.designer.zoomer.zoomLevel * this.wheelZoomScale), this.setFinalZoomTimeout = null, this.designer.canvas().css("transform", "none"), $(this.EDITABLE_TEXT_QUERY).show()
            }, 300)
        }
    }
    clampZoomScale(e) {
        let s = mercator.Zoomer.minZoomLevel / this.designer.zoomer.zoomLevel,
            t = mercator.Zoomer.maxZoomLevel / this.designer.zoomer.zoomLevel;
        return Math.min(t, Math.max(s, e))
    }
    onKeyDown(e) {
        let s = this.modifierChanged(e);
        if (this.designer.ctrlWasPressed = this.ctrlPressed(e), this.designer.shiftWasPressed = this.shiftPressed(e), this.designer.altWasPressed = this.altPressed(e), this.isSpacebar(e) && (e.preventDefault(), e.stopPropagation(), this.designer.state.onSpacebarPressed()), this.deletePressed(e) ? (e.preventDefault(), this.designer.onDelete(), this.logHotkeyUsage(e, "delete")) : this.duplicatePressed(e) ? (this.designer.onDuplicate(), this.logHotkeyUsage(e, "duplicate")) : this.copyCombinationPressed(e) ? (e.preventDefault(), this.designer.onCopy(), this.logHotkeyUsage(e, "copy")) : this.cutCombinationPressed(e) ? (e.preventDefault(), this.designer.onCut(), this.logHotkeyUsage(e, "cut")) : this.pasteCombinationPressed(e) ? (e.preventDefault(), this.designer.onPaste(), this.logHotkeyUsage(e, "paste")) : this.exitSectionPressed(e) ? (e.preventDefault(), this.designer.activeSubChart() && this.designer.showMasterSubChart(), this.logHotkeyUsage(e, "exitSection")) : this.escapePressed(e) ? (e.preventDefault(), this.designer.state.onEscapePressed()) : this.undoCombinationPressed(e) ? (this.designer.onUndoPressed(e), this.logHotkeyUsage(e, "undo")) : this.redoCombinationPressed(e) ? (this.designer.redo(), this.logHotkeyUsage(e, "redo")) : this.arrowPressed(e) ? this.designer.state.onArrowPressed(e) : this.altPressed(e) ? this.designer.state.onAltPressed(e) : this.shiftPressed(e) ? this.designer.state.onShiftPressed(e) : this.ctrlPressed(e) && this.designer.state.onCtrlPressed(e), this.floorPressed(e)) e.preventDefault(), e.stopPropagation(), this.designer.goToFloor(e.keyCode - KEYS.NUM_1), this.logHotkeyUsage(e, "goToFloor");
        else if (this.deselectPressed(e)) e.preventDefault(), this.designer.state.deselect(), this.logHotkeyUsage(e, "deselect");
        else if (this.toggleReferenceChartPressed(e)) e.preventDefault(), this.designer.uiEvents.toggleReferenceChartVisible(), this.logHotkeyUsage(e, "referenceChart");
        else if (this.toggleReferenceChartShowAbovePressed(e)) e.preventDefault(), this.designer.uiEvents.setReferenceChartShowAbove(!0), this.logHotkeyUsage(e, "referenceChartShowAbove");
        else if (this.hotkeyPressed(e)) {
            e.preventDefault();
            let s = this.hotkeyPressed(e).uiEvent;
            s && (this.logHotkeyUsage(e, s), this.designer.uiEvents.trigger(s))
        }
        s && (this.designer.state.onModifierChange(e), this.designer.renderUI())
    }
    logHotkeyUsage(e, s) {
        this.designer.hotkeyUsageLogger.log(s, e.key, this.ctrlPressed(e), this.altPressed(e), this.shiftPressed(e))
    }
    onKeyUp(e) {
        let s = this.modifierChanged(e),
            t = this.designer.ctrlWasPressed,
            i = this.designer.shiftWasPressed,
            r = this.designer.altWasPressed;
        this.designer.ctrlWasPressed = this.ctrlPressed(e), this.designer.shiftWasPressed = this.shiftPressed(e), this.designer.altWasPressed = this.altPressed(e), this.isSpacebar(e) && (e.preventDefault(), e.stopPropagation(), this.designer.state.onSpacebarReleased()), r && !this.altPressed(e) && this.designer.state.onAltReleased(), i && !this.shiftPressed(e) && this.designer.state.onShiftReleased(), t && !this.ctrlPressed(e) && this.designer.state.onCtrlReleased(), this.toggleReferenceChartShowAbovePressed(e) && (e.preventDefault(), this.designer.uiEvents.setReferenceChartShowAbove(!1)), s && (this.designer.state.onModifierChange(e), this.designer.renderUI())
    }
    releaseAllModifierKeys() {
        this.designer.altWasPressed && (this.designer.altWasPressed = !1, this.designer.state.onAltReleased()), this.designer.ctrlWasPressed && (this.designer.ctrlWasPressed = !1, this.designer.state.onCtrlReleased()), this.designer.shiftWasPressed && (this.designer.shiftWasPressed = !1, this.designer.state.onShiftReleased())
    }
    hotkeyPressed(e) {
        return this.ctrlPressed(e) ? ACTIONS_HOTKEYS["META+" + e.key.toUpperCase()] : this.modifierPressed(e) ? void 0 : TOOLS_HOTKEYS[e.key.toLowerCase()]
    }
    enterPressed(e) {
        return e.keyCode === KEYS.ENTER
    }
    ctrlPressed(e) {
        return mercator.isMac && e.metaKey || !mercator.isMac && e.ctrlKey
    }
    shiftPressed(e) {
        return e.shiftKey
    }
    altPressed(e) {
        return e.altKey
    }
    isSpacebar(e) {
        return " " === e.key
    }
    modifierPressed(e) {
        return this.ctrlPressed(e) || this.shiftPressed(e) || this.altPressed(e)
    }
    arrowPressed(e) {
        return this.upPressed(e) || this.downPressed(e) || this.leftPressed(e) || this.rightPressed(e)
    }
    upPressed(e) {
        return e.keyCode === KEYS.UP
    }
    downPressed(e) {
        return e.keyCode === KEYS.DOWN
    }
    leftPressed(e) {
        return e.keyCode === KEYS.LEFT
    }
    rightPressed(e) {
        return e.keyCode === KEYS.RIGHT
    }
    duplicatePressed(e) {
        return this.ctrlPressed(e) && "j" === e.key.toLowerCase()
    }
    deletePressed(e) {
        return e.keyCode === KEYS.DEL || e.keyCode === KEYS.BACKSPACE
    }
    exitSectionPressed(e) {
        return this.ctrlPressed(e) && this.escapePressed(e)
    }
    deselectPressed(e) {
        return this.ctrlPressed(e) && "d" === e.key.toLowerCase()
    }
    toggleReferenceChartPressed(e) {
        return this.ctrlPressed(e) && "e" === e.key.toLowerCase()
    }
    toggleReferenceChartShowAbovePressed(e) {
        return !this.modifierPressed(e) && e.key && "w" === e.key.toLowerCase()
    }
    escapePressed(e) {
        return e.keyCode === KEYS.ESCAPE
    }
    floorPressed(e) {
        return this.ctrlPressed(e) && this.altPressed(e) && e.keyCode >= KEYS.NUM_1 && e.keyCode <= KEYS.NUM_9
    }
    undoCombinationPressed(e) {
        return this.ctrlPressed(e) && e.keyCode === KEYS.Z && !this.shiftPressed(e)
    }
    redoCombinationPressed(e) {
        return this.ctrlPressed(e) && e.keyCode === KEYS.Z && this.shiftPressed(e) || this.ctrlPressed(e) && e.keyCode === KEYS.Y
    }
    cutCombinationPressed(e) {
        return this.ctrlPressed(e) && e.keyCode === KEYS.X
    }
    copyCombinationPressed(e) {
        return this.ctrlPressed(e) && e.keyCode === KEYS.C
    }
    pasteCombinationPressed(e) {
        return this.ctrlPressed(e) && e.keyCode === KEYS.V
    }
    modifierChanged(e) {
        return this.designer.ctrlWasPressed !== this.ctrlPressed(e) || this.designer.shiftWasPressed !== this.shiftPressed(e) || this.designer.altWasPressed !== this.altPressed(e)
    }
};
const KEYS = {
    BACKSPACE: 8,
    DEL: 46,
    Z: 90,
    Y: 89,
    C: 67,
    V: 86,
    X: 88,
    SHIFT: 16,
    ENTER: 13,
    ESCAPE: 27,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    NUM_1: 49,
    NUM_9: 57
},
    TOOLS_HOTKEYS = {
        v: {
            toolName: "select-cursor",
            uiEvent: "toolSelectCursor"
        },
        c: {
            toolName: "select-brush",
            uiEvent: "toolSelectBrush"
        },
        x: {
            toolName: "select-seats",
            uiEvent: "toolSelectSeats"
        },
        z: {
            toolName: "select-sameType",
            uiEvent: "toolSelectSameType"
        },
        a: {
            toolName: "node",
            uiEvent: "toolNode"
        },
        f: {
            toolName: "focalpoint",
            uiEvent: "toolFocalPoint"
        },
        s: {
            toolName: "section",
            uiEvent: "toolSection"
        },
        r: {
            toolName: "row",
            uiEvent: "toolRow"
        },
        e: {
            toolName: "table",
            uiEvent: "toolTable"
        },
        b: {
            toolName: "booth",
            uiEvent: "toolBooth"
        },
        o: {
            toolName: "icon",
            uiEvent: "toolIcon"
        },
        g: {
            toolName: "ga",
            uiEvent: "toolGa"
        },
        h: {
            toolName: "shape",
            uiEvent: "toolShape"
        },
        t: {
            toolName: "text",
            uiEvent: "toolText"
        },
        i: {
            toolName: "image",
            uiEvent: "toolImageObject"
        },
        " ": {
            toolName: "hand"
        }
    },
    ALT_KEY = mercator.isMac ? "⌥" : "Alt",
    META_KEY = mercator.isMac ? "⌘" : "Ctrl",
    SHIFT_KEY = mercator.isMac ? "⇧" : "Shift",
    BACKSPACE_KEY = mercator.isMac ? "delete" : "Backspace",
    SHORTCUT_CONNECTOR = mercator.isMac ? "" : "+";

function buildShortcut(e) {
    return e.nonFalsies().join(SHORTCUT_CONNECTOR)
}
mercator.JsonWithType = class {
    constructor(e, t) {
        this.json = e, this.typeName = t
    }
}, mercator.Clipboard = class {
    constructor(e) {
        this.designer = e, this.deserializers = {
            section: mercator.Section.fromJson,
            ga: mercator.GeneralAdmissionArea.fromJson,
            row: mercator.Row.createFromModel,
            booth: mercator.Booth.fromJson,
            shapedObject: mercator.ShapedObject.fromJson,
            imageObject: mercator.ImageObject.fromJson,
            textInput: mercator.TextInput.fromJson,
            rectangularTable: mercator.RectTable.fromJson,
            roundTable: mercator.RoundTable.fromJson,
            icon: mercator.Icon.fromJson
        }
    }
    copy(e) {
        this.store(e.map(e => e.flash()).filter(e => "getObjectTypeName" in e).map(e => new mercator.JsonWithType(e.toJson(), e.getObjectTypeName()))), this.designer.renderUI()
    }
    paste() {
        let e = this.designer.activeSubChart(),
            t = this.retrieve().map(t => {
                return (0, this.deserializers[t.typeName])(t.json, e)
            }),
            s = e.listUnsupportedObjectTypes(t);
        if (0 === s.length) {
            let s = t.map(t => t.duplicate(e));
            this.drawInCenterOfViewport(s), this.designer.updateStats(), s.forEach(e => e.redraw()), this.designer.setState(new mercator.ObjectsSelectedState(this.designer, s))
        } else this.flashWarning(s)
    }
    flashWarning(e) {
        1 === e.length ? this.designer.flashOverlayMessage("paste-failed-single", "warning", {
            unsupportedObjectType: d(e[0]).toLowerCase(),
            where: d(this.where())
        }) : this.designer.flashOverlayMessage("paste-failed", "warning", {
            unsupportedObjectTypes: e.map(e => d(e).toLowerCase()).join(", "),
            where: d(this.where())
        })
    }
    where() {
        return "MIXED" === this.designer.venueType ? "onChartWithoutSections" : this.designer.activeSubChart().isMasterSubChart() ? "outsideSection" : "insideSection"
    }
    store(e) {
        this.designer.storage.setItem("clipboard", e)
    }
    retrieve() {
        return this.designer.storage.getItem("clipboard")
    }
    drawInCenterOfViewport(e) {
        let t = this.designer.pointInCanvasCenteredInViewport().fromView(this.designer).subtract(mercator.Bbox.mergedFromObjects(e).center());
        e.forEach(e => e.draw().moved(t))
    }
    isEmpty() {
        let e = this.retrieve();
        return !e || 0 === e.length
    }
};
class SortedArray extends Array {
    constructor(r) {
        super(), this.comparator = r
    }
    insert(r) {
        let t = 0,
            s = this.length;
        for (; ;) {
            if (t === s) return this.splice(t, 0, r), t;
            let e = Math.floor((s + t) / 2);
            this.comparator(r, this[e]) < 0 ? s = e : t = e + 1
        }
    }
}
class SvgElementSet {
    constructor(t) {
        t ? this._setItems(SvgElementSet.flatten(t)) : this._setItems([])
    }
    push(...t) {
        return this._setItems([...this.items, ...t.nonFalsies()]), this
    }
    forEach(t) {
        return this.items.forEach(t), this
    }
    attr(t, r) {
        return this.forEach(s => s.attr(t, r)), this
    }
    clear() {
        return this._setItems([]), this
    }
    startTransformation() {
        return this.forEach(function (t) {
            t.transformationAtStart = t.matrix()
        }), this
    }
    transform(t) {
        return this.forEach(function (r) {
            r.transform(t.multiply(r.transformationAtStart))
        }), this
    }
    endTransformation() {
        return this.forEach(function (t) {
            t.transformationAtStart = void 0
        }), this
    }
    toLayer(t, r) {
        return this.forEach(function (s) {
            s.toLayer(t, r)
        }), this
    }
    applyZoom(t) {
        return this.forEach(function (r) {
            r.applyZoom(t)
        }), this
    }
    hide() {
        return this.forEach(function (t) {
            t.hide()
        }), this
    }
    show() {
        return this.forEach(function (t) {
            t.show()
        }), this
    }
    remove() {
        return this.forEach(function (t) {
            t.remove()
        }), this.clear()
    }
    stop() {
        return this.forEach(function (t) {
            t.stop()
        }), this
    }
    translate(t, r) {
        return this.forEach(function (s) {
            let i = (new SVG.Matrix).translate(t, r).transform(s.matrix());
            s.transform(i)
        }), this
    }
    last() {
        return this.items[this.items.length - 1]
    }
    toArray() {
        return [...this.items]
    }
    _setItems(t) {
        this.items = t, this.length = t.length
    }
    static flatten(t) {
        return t.flatMap(t => t && t.forEach ? t : [t]).nonFalsies()
    }
}
mercator.ButtonGroup = function () {
    this.buttons = []
}, mercator.ButtonGroup.prototype.withOptionalButton = function (t) {
    return t && this.buttons.push(t), this
}, mercator.ButtonGroup.prototype.render = function () {
    return 0 === this.buttons.length ? null : 1 === this.buttons.length ? this.buttons[0].renderAsSingleButton() : this.renderButtonGroup(this.buttons)
}, mercator.ButtonGroup.prototype.renderButtonGroup = function (t) {
    return $('<div class="btn-group dropup">').append(t[0].renderAsSingleButton()).append(this.createCaret()).append(this.createDropdownMenu(t.slice(1)))
}, mercator.ButtonGroup.prototype.createDropdownMenu = function (t) {
    var n = $('<ul class="dropdown-menu pull-right">');
    return t.forEach(function (t) {
        var o = $('<a href="#">').html(t.iconWithText()).on("click", preventDefault(t.onClick));
        n.append($("<li>").append(o))
    }), n
}, mercator.ButtonGroup.prototype.createCaret = function () {
    return $('<button class="btn btn-lg btn-default dropdown-toggle" data-toggle="dropdown">').append('<span class="caret">')
}, mercator.ButtonGroupButton = function (t, n, o, e) {
    this.label = t, this.icon = n || "fa", this.onClick = o, this.redrawer = e, this.asyncClickInProgress = !1
}, mercator.ButtonGroupButton.prototype.renderAsSingleButton = function () {
    return this.asyncClickInProgress ? this.renderWithSpinner() : this.renderWithoutSpinner()
}, mercator.ButtonGroupButton.prototype.renderWithSpinner = function () {
    return $('<button type="button" class="btn btn-lg btn-default">').html($("<img>").attr("src", "ajax-loader.gif")).attr("disabled", "disabled")
}, mercator.ButtonGroupButton.prototype.iconWithText = function () {
    return $("<span>").append($("<i>").addClass(this.icon)).append("&nbsp;&nbsp;" + this.label)
}, mercator.ButtonGroupButton.prototype.renderWithoutSpinner = function () {
    var t = this;
    return $('<button type="button" class="btn btn-lg btn-default">').html(t.iconWithText()).on("click", function (n) {
        n.preventDefault();
        var o = t.onClick();
        o && (t.setAsyncClickInProgress(!0), o.always(function () {
            t.setAsyncClickInProgress(!1)
        }))
    })
}, mercator.ButtonGroupButton.prototype.setAsyncClickInProgress = function (t) {
    this.asyncClickInProgress = t, this.redrawer()
};
mercator.Bbox = function (t, o, i) {
    this.origin = t, this.width = o, this.height = i
}, mercator.Bbox.prototype.center = function () {
    return this.middleLeft().averageWith(this.middleRight())
}, mercator.Bbox.prototype.topLeft = function () {
    return this.origin
}, mercator.Bbox.prototype.topMiddle = function () {
    return this.origin.averageWith(this.topRight())
}, mercator.Bbox.prototype.topRight = function () {
    return this.origin.addToX(this.width)
}, mercator.Bbox.prototype.bottomLeft = function () {
    return this.origin.addToY(this.height)
}, mercator.Bbox.prototype.bottomMiddle = function () {
    return this.bottomLeft().averageWith(this.bottomRight())
}, mercator.Bbox.prototype.bottomRight = function () {
    return this.origin.addToX(this.width).addToY(this.height)
}, mercator.Bbox.prototype.middleLeft = function () {
    return this.origin.averageWith(this.bottomLeft())
}, mercator.Bbox.prototype.middleMiddle = function () {
    return this.center()
}, mercator.Bbox.prototype.middleRight = function () {
    return this.topRight().averageWith(this.bottomRight())
}, mercator.Bbox.prototype.mergeWith = function (t) {
    if (!t) return this;
    var o = new mercator.Point(Math.min(t.origin.x, this.origin.x), Math.min(t.origin.y, this.origin.y)),
        i = new mercator.Point(Math.max(t.bottomRight().x, this.bottomRight().x), Math.max(t.bottomRight().y, this.bottomRight().y));
    return mercator.Bbox.fromTopLeftAndLowerRight(o, i)
}, mercator.Bbox.prototype.round = function () {
    return new mercator.Bbox(this.origin.floor(), Math.ceil(this.width), Math.ceil(this.height))
}, mercator.Bbox.prototype.enlarge = function (t) {
    return mercator.Bbox.fromTopLeftAndLowerRight(this.topLeft().addToXAndY(-t), this.bottomRight().addToXAndY(t))
}, mercator.Bbox.prototype.toPoints = function () {
    return [this.topLeft(), this.topRight(), this.bottomRight(), this.bottomLeft()]
}, mercator.Bbox.prototype.toRays = function () {
    return [new mercator.Ray(this.topLeft(), this.topRight()), new mercator.Ray(this.topRight(), this.bottomRight()), new mercator.Ray(this.bottomRight(), this.bottomLeft()), new mercator.Ray(this.bottomLeft(), this.topLeft())]
}, mercator.Bbox.fromOriginAndDimensions = function (t, o, i) {
    return new mercator.Bbox(t, o, i)
}, mercator.Bbox.fromTopLeftAndLowerRight = function (t, o) {
    var i = o.x - t.x,
        e = o.y - t.y;
    return new mercator.Bbox(t, i, e)
}, mercator.Bbox.mergedFromObjects = function (t) {
    var o = t.map(function (t) {
        return t.bbox()
    });
    return mercator.Bbox.merged(o)
}, mercator.Bbox.mergedFromObjectsSelectionArea = function (t) {
    let o = t.flatMap(t => t.selectionArea && "row" !== t.type ? t.selectionArea().toPoints() : t.bbox().toPoints()),
        i = o.map(mercator.Point.x).reduce(mercator.PolygonShape.min),
        e = o.map(mercator.Point.y).reduce(mercator.PolygonShape.min),
        n = o.map(mercator.Point.x).reduce(mercator.PolygonShape.max),
        s = o.map(mercator.Point.y).reduce(mercator.PolygonShape.max);
    return new mercator.Bbox(new mercator.Point(i, e), n - i, s - e)
}, mercator.Bbox.coreMergedFromObjects = function (t) {
    var o = t.map(function (t) {
        return t.coreBbox()
    });
    return mercator.Bbox.merged(o)
}, mercator.Bbox.merged = function (t) {
    return t.reduce(function (t, o) {
        return null === o ? t : null === t ? o : t.mergeWith(o)
    }, null)
}, mercator.Bbox.fromView = function (t, o) {
    let i = new mercator.Point(t.x, t.y).fromView(o),
        e = o.zoomer.unzoom(t.width),
        n = o.zoomer.unzoom(t.height);
    return new mercator.Bbox(i, e, n)
}, mercator.Bbox.toView = function (t, o) {
    var i = t.origin.toView(o),
        e = o.zoomer.zoomed(t.width),
        n = o.zoomer.zoomed(t.height);
    return {
        x: i.x,
        y: i.y,
        x2: i.x + e,
        y2: i.y + n,
        width: e,
        height: n
    }
}, mercator.Bbox.drawPathThroughPoints = function (t, o) {
    var i = "M" + t.origin.x + "," + t.origin.y + "L" + t.topRight().x + "," + t.topRight().y + "," + t.bottomRight().x + "," + t.bottomRight().y + "," + t.bottomLeft().x + "," + t.bottomLeft().y + "," + t.origin.x + "," + t.origin.y;
    return o.drawer.path(i).applyZoom(o)
}, mercator.Bbox.drawRectangle = function (t, o) {
    return o.drawRectangle(t.origin.x, t.origin.y, t.bottomRight().x, t.bottomRight().y).applyZoom(o)
};
mercator.ItemSelector = function (e) {
    this.designer = e, this.selectionRectangle = null, this.selectedObjects = []
}, mercator.ItemSelector.prototype.startSelection = function (e, t) {
    this.startpoint = e, this.validator = t
}, mercator.ItemSelector.prototype.paintSelected = mercator.ObjectsSelector.prototype.paintSelected, mercator.ItemSelector.prototype.paintUnselected = mercator.ObjectsSelector.prototype.paintUnselected, mercator.ItemSelector.prototype.selectMultipleObjects = function (e) {
    this.selectionRectangle && this.selectionRectangle.remove(), this.selectionRectangle = this.designer.drawRectangle(this.startpoint.x, this.startpoint.y, e.x, e.y).applyZoom(this.designer).attr({
        fill: "rgba(50, 50, 50, 0.16)",
        stroke: "white",
        "stroke-width": this.designer.zoomer.unzoom(.75)
    }), this.selectedObjects = [], this.doSelection(this.designer.activeSubChart().categorisableObjects()), this.designer.setSelectedSubobjectsCount(this.selectedObjects.length)
}, mercator.ItemSelector.prototype.doSelection = function (e) {
    e.forEach(e => {
        !isBBoxIntersect(this.selectionRectangle.rbox(), mercator.Bbox.toView(e.bbox(), this.designer)) || this.validator && !this.validator(e) ? e.paintUnselected() : (this.selectedObjects.push(e), e.paintSelected())
    })
}, mercator.ItemSelector.prototype.hasSelectedObjects = function () {
    return this.selectedObjects.length > 0
}, mercator.ItemSelector.prototype.deselectObjects = function () {
    this.paintUnselected(this.selectedObjects), this.selectedObjects = []
}, mercator.ItemSelector.prototype.stopSelecting = function () {
    this.deselectObjects(), this.selectionRectangle && this.selectionRectangle.remove(), this.designer.clearSelectedCount()
};
mercator.BackgroundImage = function (e) {
    this.subChart = e, this.designer = e.designer, this.backgroundImage = null, this.opacity = 1, this.backgroundImageWidth = null, this.backgroundImageHeight = null, this.backgroundImageUrl = null, this.backgroundImageKey = null, this.backgroundFileSize = null, this.origin = null, this.backgroundImageScale = mercator.BackgroundImage.DEFAULT_SCALE, this.showOnRenderedCharts = !0
}, mercator.BackgroundImage.prototype.getBackgroundImage = function () {
    return this.backgroundImage
}, mercator.BackgroundImage.prototype.displaySectionOverlay = function () {
    return !1
}, mercator.BackgroundImage.prototype.hideLabels = function () { }, mercator.BackgroundImage.prototype.showLabels = function () { }, mercator.BackgroundImage.prototype.showLabelAndChildLabels = function () { }, mercator.BackgroundImage.prototype.hideLabelAndChildLabels = function () { }, mercator.BackgroundImage.prototype.determineBackgroundImageLayer = function () {
    return "backgroundFillLayer"
}, mercator.BackgroundImage.prototype.determineOpacity = function () {
    return this.opacity
}, mercator.BackgroundImage.prototype.determineBackgroundImageOpacity = function () {
    return this.determineOpacity() * (this.displaySectionOverlay() ? .8 : 1)
}, mercator.BackgroundImage.prototype.determineOverlayBackgroundImageOpacity = function () {
    return this.determineOpacity() * (this.displaySectionOverlay() ? .2 : 1)
}, mercator.BackgroundImage.prototype.draw = function () {
    this.url() && this.origin && (this.backgroundImage = this.designer.drawer.image(this.url(), this.backgroundImageWidth, this.backgroundImageHeight, {
        x: this.origin.x,
        y: this.origin.y,
        opacity: this.determineBackgroundImageOpacity()
    }).setExtraZoom(this.backgroundImageScale / 100).toLayer(this.determineBackgroundImageLayer(), this.designer).applyZoom(this.designer), this.displaySectionOverlay() && (this.overlayBackgroundImage = this.designer.drawer.image(this.url(), this.backgroundImageWidth, this.backgroundImageHeight, {
        x: this.origin.x,
        y: this.origin.y,
        opacity: this.determineOverlayBackgroundImageOpacity()
    }).setExtraZoom(this.backgroundImageScale / 100).toLayer("overlayBackgroundLayer", this.designer).applyZoom(this.designer)))
}, mercator.BackgroundImage.prototype.isSet = function () {
    return this.backgroundImageUrl || this.backgroundImageKey
}, mercator.BackgroundImage.prototype.url = function () {
    return this.backgroundImageUrl ? this.backgroundImageUrl : this.backgroundImageKey ? this.designer.publicApiUrl + "/system/public/charts/images/" + this.backgroundImageKey : null
}, mercator.BackgroundImage.prototype.undraw = function () {
    this.backgroundImage && (this.backgroundImage.remove(), this.backgroundImage = null), this.overlayBackgroundImage && (this.overlayBackgroundImage.remove(), this.overlayBackgroundImage = null)
}, mercator.BackgroundImage.prototype.blur = function () { }, mercator.BackgroundImage.prototype.unblur = function () { }, mercator.BackgroundImage.prototype.toJson = function () {
    return this.url() && this.origin ? {
        backgroundImageUrl: this.backgroundImageUrl,
        backgroundImageKey: this.backgroundImageKey,
        backgroundFileSize: this.fileSize(),
        backgroundImageZoom: this.backgroundImageScale,
        opacity: this.opacity,
        showOnRenderedCharts: this.showOnRenderedCharts,
        origin: this.origin.toJson(this.subChart)
    } : null
}, mercator.BackgroundImage.prototype.removeBackgroundImage = function () {
    this.backgroundImage && this.backgroundImage.remove(), this.backgroundImage = null, this.overlayBackgroundImage && this.overlayBackgroundImage.remove(), this.overlayBackgroundImage = null, this.origin = null, this.backgroundImageHeight = null, this.backgroundImageWidth = null, this.backgroundImageUrl = null, this.backgroundImageKey = null, this.backgroundFileSize = null, this.backgroundImageScale = mercator.BackgroundImage.DEFAULT_SCALE, this.showOnRenderedCharts = !0, this.designer.requestStatsUpdate(), this.designer.renderUI()
}, mercator.BackgroundImage.prototype.setBackgroundImage = function (e) {
    return e === this.backgroundImageKey ? this : (this.removeBackgroundImage(), e && (this.backgroundImageKey = e, this.loadBackgroundImage(() => this.designer.renderUI())), this)
}, mercator.BackgroundImage.prototype.setBackgroundFileSize = function (e) {
    return this.backgroundFileSize = e, this
}, mercator.BackgroundImage.prototype.fileSize = function () {
    return this.backgroundFileSize || 0
}, mercator.BackgroundImage.prototype.loadBackgroundImage = function (e) {
    this.designer.busyIndicatorOn("chartBackgroundImage", !0);
    var a = new Image;
    a.src = this.url(), a.onload = mercator.BackgroundImage.onLoad.bind(a, this, e, "chartBackgroundImage", this.subChart), a.onerror = mercator.BackgroundImage.onError.bind(a, this, "chartBackgroundImage")
}, mercator.BackgroundImage.onLoad = function (e, a, o, t) {
    e.backgroundImageWidth = this.width, e.backgroundImageHeight = this.height, e.origin || (e.origin = e.designer.canvasCenter.addToX(-1 * e.backgroundImageWidth / 2).addToY(-1 * e.backgroundImageHeight / 2)), t.isMasterSubChart() && e.designer.activeSubChart() === t ? e.redraw() : t.isSectionSubChart() && e.designer.activeSubChart() === t && (t.backgroundImageForSection.redraw(), t.referenceChart.redraw()), a && a(), e.designer.busyIndicatorOff(o)
}, mercator.BackgroundImage.onError = function (e, a) {
    alert(d("image-load-error")), e.designer.busyIndicatorOff(a)
}, mercator.BackgroundImage.prototype.setScale = function (e) {
    this.backgroundImageScale = e, this.redraw(), this.designer.renderUI()
}, mercator.BackgroundImage.prototype.applyZoom = function () {
    this.backgroundImage && this.backgroundImage.applyZoom(this.designer), this.overlayBackgroundImage && this.overlayBackgroundImage.applyZoom(this.designer)
}, mercator.BackgroundImage.prototype.redraw = function () {
    this.undraw(), this.draw()
}, mercator.BackgroundImage.prototype.setOpacity = function (e) {
    this.getBackgroundImage() && (this.opacity = e, this.backgroundImage.attr({
        opacity: this.determineBackgroundImageOpacity()
    }), this.overlayBackgroundImage && this.overlayBackgroundImage.attr({
        opacity: 1 * this.determineBackgroundImageOpacity() / 5
    }))
}, mercator.BackgroundImage.prototype.setShowOnRenderedCharts = function (e) {
    this.showOnRenderedCharts = e, e ? this.setOpacity(1) : this.setOpacity(mercator.BackgroundImage.OPACITY_WHEN_NOT_SHOWN_ON_RENDERED_CHART), this.designer.renderUI()
}, mercator.BackgroundImage.prototype.bbox = function () {
    if (!this.origin) return new mercator.RectangleShape(this.designer.canvasCenter, 0, 0).bbox();
    var e = this.backgroundImageScale / 100,
        a = this.backgroundImageWidth * e,
        o = this.backgroundImageHeight * e,
        t = this.origin.addToX(this.backgroundImageWidth / 2).addToY(this.backgroundImageHeight / 2);
    return new mercator.RectangleShape(t, a, o).bbox()
}, mercator.BackgroundImage.fromJson = function (e, a) {
    var o = new mercator.BackgroundImage(a);
    return e && (e.backgroundImageUrl || e.backgroundImageKey) && this.setFromJson(o, e, a), o
}, mercator.BackgroundImage.setFromJson = function (e, a, o) {
    e.backgroundImageScale = a.backgroundImageZoom, a.origin && (e.origin = mercator.Point.fromJson(a.origin, o)), e.backgroundImageUrl = a.backgroundImageUrl, e.backgroundImageKey = a.backgroundImageKey, e.backgroundFileSize = a.backgroundFileSize, e.opacity = a.opacity, e.showOnRenderedCharts = a.showOnRenderedCharts, e.loadBackgroundImage()
}, mercator.BackgroundImage.DEFAULT_SCALE = 100, mercator.BackgroundImage.OPACITY_WHEN_NOT_SHOWN_ON_RENDERED_CHART = .25;
mercator.ReferenceChart = class extends mercator.BackgroundImage {
    constructor(e) {
        super(e), this.visible = !0, this.opacity = mercator.ReferenceChart.OPACITY
    }
    displaySectionOverlay() {
        return !1
    }
    determineBackgroundImageLayer() {
        return this.designer.showReferenceChartAbove ? "aboveAllBackgroundLayer" : "backgroundLayer"
    }
    determineOpacity() {
        return this.designer.showReferenceChartAbove ? .9 : this.designer.referenceChartVisible ? mercator.ReferenceChart.OPACITY : 0
    }
    removeBackgroundImage() {
        return this.visible = !0, super.removeBackgroundImage()
    }
    setScale(e) {
        return super.setScale(e), this.designer.renderUI(), this
    }
    setBackgroundImage(e) {
        return e !== this.backgroundImageKey && (this.openDialogWhenDone = !0), super.setBackgroundImage(e)
    }
    loadBackgroundImage(e) {
        this.designer.busyIndicatorOn("referenceChartImage");
        var r = new Image;
        r.src = this.url(), r.onload = mercator.ReferenceChart.onLoad.bind(r, this, e, "referenceChartImage", this.subChart), r.onerror = mercator.BackgroundImage.onError.bind(r, this, "referenceChartImage")
    }
    static onLoad(e, r, a, n) {
        super.onLoad(e, r, a, n), e.openDialogWhenDone && (e.designer.uiEvents.openReferenceChartDialog(), e.openDialogWhenDone = !1)
    }
    static onError(e, r) {
        super.onError(e, r), e.openDialogWhenDone = !1
    }
    toJson() {
        return this.url() && this.origin ? {
            backgroundImageUrl: this.backgroundImageUrl,
            backgroundImageKey: this.backgroundImageKey,
            backgroundFileSize: this.fileSize(),
            backgroundImageZoom: this.backgroundImageScale,
            opacity: mercator.ReferenceChart.OPACITY,
            origin: this.origin.toJson(this.subChart)
        } : null
    }
    static fromJson(e, r) {
        var a = new mercator.ReferenceChart(r);
        return e && (e.backgroundImageUrl || e.backgroundImageKey) && this.setFromJson(a, e, r), a
    }
}, mercator.ReferenceChart.OPACITY = .8, mercator.ReferenceChart.MAX_UPLOAD_FILESIZE_MB = 15;
mercator.Saver = function (e) {
    this.chartDesigner = e, this.deflater = this.createDeflater(), this.deferred = null
}, mercator.Saver.prototype.createDeflater = function () {
    var e = this,
        t = new Worker("deflater/deflater.js");
    return t.onmessage = function (t) {
        e.chartDesigner.v2Client.saveChart(e.chartDesigner.chartKey, t.data).then(e.saveSuccess.bind(e), t => e.saveError(function (e) {
            let t = e.responseJSON;
            if (t) {
                let e = t.errors;
                if (e && e.length > 0 && "DRAWING_VALIDATION_FAILED" === e[0].code) return "SAVE_FAILED_VALIDATION_ERROR"
            }
            return "SAVE_FAILED_UNKNOWN_ERROR"
        }(t)))
    }, t.onerror = function (t) {
        e.saveError(t.message)
    }, t
}, mercator.Saver.prototype.save = function (e) {
    if (!this.chartDesigner.isReadOnly()) return this.showSavingFeedback(), this.deferred = $.Deferred(), this.deflater.postMessage(e), this.deferred;
    this.chartDesigner.uiEvents.saveRejected()
}, mercator.Saver.prototype.saveSuccess = function (e, t, s) {
    201 === s.status ? this.chartDesigner.onChartCreated(this.chartDesigner.chartKey) : this.chartDesigner.onChartUpdated();
    var r = s.responseJSON;
    this.chartDesigner.setStatus(r.status), this.showSaveSuccessfulFeedback(), this.deferred.resolve()
}, mercator.Saver.prototype.saveError = function (e) {
    // this.showSaveFailedFeedback(e), "SAVE_FAILED_VALIDATION_ERROR" === e ? this.deferred.resolve() : this.deferred.reject()
}, mercator.Saver.prototype.showSavingFeedback = function () {
    this.chartDesigner.uiEvents.savingStart()
}, mercator.Saver.prototype.showSaveSuccessfulFeedback = function () {
    this.chartDesigner.uiEvents.saveSuccess(moment())
}, mercator.Saver.prototype.showSaveFailedFeedback = function (e) {
    this.chartDesigner.uiEvents.saveRejected(e)
};
mercator.ObjectSelector = function (e, t) {
    this.object = e, this.designer = t, this.selectionRectangle = null, this.selected = !1
}, mercator.ObjectSelector.prototype.objectUndrawn = function () {
    this.undraw()
}, mercator.ObjectSelector.prototype.undraw = function () {
    this.selectionRectangle && this.selectionRectangle.remove()
}, mercator.ObjectSelector.prototype.enable = function () {
    this.selectionRectangle && this.selectionRectangle.show()
}, mercator.ObjectSelector.prototype.disable = function () {
    this.selectionRectangle && this.selectionRectangle.hide()
}, mercator.ObjectSelector.prototype.allElementsSet = function () {
    return mercator.set(this.selectionRectangle)
}, mercator.ObjectSelector.prototype.changeCursorTo = function (e) {
    this.selectionRectangle.attr({
        cursor: e
    })
}, mercator.ObjectSelector.prototype.changeCursorToDefault = function () {
    this.selectionRectangle.attr({
        cursor: null
    })
}, mercator.ObjectSelector.prototype.objectDrawn = function () {
    this.selectionRectangle && this.selectionRectangle.remove();
    var e = this;
    this.selectionRectangle = this.object.createSelectionRectangle().toLayer(this.object.layer, this.designer, this.object.determineDrawZIndex()), this.selectionRectangle.node.onmousedown = function (t) {
        e.designer.mouseDown = !0, e.designer.getState().onObjectMouseDown(e.object, t)
    }, this.selectionRectangle.node.onmouseup = function (t) {
        e.designer.mouseDown = !1, e.designer.getState().onObjectMouseUp(e.object, t)
    }, this.selectionRectangle.node.onmouseover = function (t) {
        e.designer.getState().onObjectMouseOver(e.object, t)
    }, this.selectionRectangle.node.onmouseout = function (t) {
        e.object.getHUDNodes().includes(t.toElement) || e.designer.getState().onObjectMouseOut(e.object, t)
    }, this.selectionRectangle.node.onclick = function (t) {
        t.stopPropagation(), e.designer.getState().onObjectClicked(e.object, t)
    }, this.selectionRectangle.node.ondblclick = (t => this.designer.getState().onObjectDoubleClicked(e.object, t)), this.selectionRectangle.onDrag(e.designer, function (t, o, n) {
        e.designer.getState().onObjectDragged(e.object, t, o, mercator.Point.fromEvent(n, e.designer))
    }, function (t) {
        e.designer.getState().onObjectDragStarted(e.object, mercator.Point.fromEvent(t, e.designer))
    }, function (t) {
        e.designer.getState().onObjectDragEnded(e.object, t)
    })
};
mercator.ObjectMover = function (t) {
    this.object = t
}, mercator.ObjectMover.prototype.start = function () {
    this.object.designer.labelsShown && this.object.hideLabelAndChildLabels(), this.object.hideOverlays(), this.object.hideAllIconLabels(), this.object.hideHUD(), this.object.drawPositionGuides(), this.object.allElementsSet().startTransformation()
}, mercator.ObjectMover.prototype.move = function (t, e) {
    return this.object.allElementsSet().transform(mercator.Vector.fromView(t, e, this.object.designer).snapToGrid().asTranslation()), this.object
}, mercator.ObjectMover.prototype.end = function (t) {
    this.object.designer.labelsShown && this.object.showLabelAndChildLabels(), this.object.showAllIconLabels(), this.object.moved(t.snapToGrid()), this.object.allElementsSet().endTransformation(), this.object.undrawPositionGuides(), this.object.restoreOverlays(), this.object.subChart.isMasterSubChart() || this.object.designer.updateObjectsOutOfBounds()
}, mercator.ObjectMover.prototype.doMove = function (t) {
    return this.start(), this.move(t.x, t.y), this.end(t), this.object
};
mercator.SubChart = function () { }, mercator.SubChart.prototype.init = function (t) {
    return this.designer = t, this.tables = new mercator.Tables(this), this.rows = [], this.textInputs = [], this.imageObjects = new mercator.ImageObjects(this), this.bbox = null, this.shapes = new mercator.ShapedObjects(this), this.booths = new mercator.Booths(this), this.icons = new mercator.Icons(this), this.sections = new mercator.Sections(this), this.generalAdmissionAreas = new mercator.GeneralAdmissionAreas(this), this
}, mercator.SubChart.prototype.isMasterSubChart = function () {
    return !1
}, mercator.SubChart.prototype.listUnsupportedObjectTypes = function (t) {
    return []
}, mercator.SubChart.prototype.getBBox = function () {
    return this.getContentsBBox()
}, mercator.SubChart.prototype.getContentsBBox = function () {
    return this.bbox || this.computeBbox(), this.bbox
}, mercator.SubChart.prototype.refreshOutOfBounds = function () { }, mercator.SubChart.prototype.getMinAndMaxDistance = function (t) {
    var s = null,
        o = null;
    return this.chairs().forEach(function (e) {
        var a = t.distanceToPoint(e.center());
        null === s ? (s = a, o = a) : a < s ? s = a : a > o && (o = a)
    }), {
        min: s,
        max: o
    }
}, mercator.SubChart.prototype.deleteRow = function (t) {
    this.rows.splice(this.rows.indexOf(t), 1), t.undraw(), this.designer.requestStatsUpdate()
}, mercator.SubChart.prototype.addRow = function (t) {
    return t.published = !1, this.loadRow(t)
}, mercator.SubChart.prototype.loadRow = function (t) {
    return this.rows.push(t), t.refreshOutOfBounds(), this.designer.requestStatsUpdate(), t
}, mercator.SubChart.prototype.addTextInput = function (t) {
    return this.textInputs.push(t), this.designer.requestStatsUpdate(), t
}, mercator.SubChart.prototype.removeTextInput = function (t) {
    t.undraw(), this.textInputs.remove(t), this.designer.requestStatsUpdate()
}, mercator.SubChart.prototype.isEmpty = function () {
    return 0 === this.allSelectableObjects().length
}, mercator.SubChart.prototype.allSelectableObjects = function () {
    return this.allSelectableObjectsExceptSections().concat(this.sections.sections)
}, mercator.SubChart.prototype.GAsAndSections = function () {
    return this.generalAdmissionAreas.areas.concat(this.sections.sections)
}, mercator.SubChart.prototype.allSelectableObjectsExceptSections = function () {
    return this.rows.concat(this.tables.tables).concat(this.booths.booths).concat(this.icons.icons).concat(this.textInputs).concat(this.imageObjects.images).concat(this.shapes.shapes).concat(this.generalAdmissionAreas.areas)
}, mercator.SubChart.prototype.categorisableParentObjects = function () {
    return this.rows.concat(this.tables.tables).concat(this.booths.booths).concat(this.generalAdmissionAreas.areas)
}, mercator.SubChart.prototype.categorisableObjects = function () {
    return this.chairs().concat(this.booths.booths).concat(this.generalAdmissionAreas.areas)
}, mercator.SubChart.prototype.bookableObjects = function () {
    return this.chairs().concat(this.booths.booths).concat(this.generalAdmissionAreas.areas)
}, mercator.SubChart.prototype.bookableParentObjects = function () {
    return this.rows.concat(this.tables.tables).concat(this.booths.booths).concat(this.generalAdmissionAreas.areas)
}, mercator.SubChart.prototype.bookableParentObjectsWithSections = function () {
    return this.bookableParentObjects().concat(this.sections.sections)
}, mercator.SubChart.prototype.nonBookableObjects = function () {
    return this.textInputs.concat(this.shapes.shapes).concat(this.sections.sections)
}, mercator.SubChart.prototype.findByUuid = function (t) {
    return this.allSelectableObjects().findOne(s => s.uuid === t)
}, mercator.SubChart.prototype.hideLabels = function () {
    this.allNonSeatLabelableObjects().forEach(function (t) {
        t.hideLabelAndChildLabels()
    }), this.allSeats().forEach(t => t.applyElementAttributes())
}, mercator.SubChart.prototype.showRowLabels = function () {
    this.allRows().forEach(function (t) {
        t.showLabel()
    })
}, mercator.SubChart.prototype.hideRowLabels = function () {
    this.allRows().forEach(function (t) {
        t.hideLabel()
    })
}, mercator.SubChart.prototype.showLabels = function () {
    this.allNonSeatLabelableObjects().forEach(function (t) {
        t.showLabelAndChildLabels()
    }), this.allSeats().forEach(t => t.applyElementAttributes())
}, mercator.SubChart.prototype.showVFS = function () {
    this.sections.sections.forEach(t => t.showVFS()), this.generalAdmissionAreas.areas.forEach(t => t.showVFS()), this.allSeats().forEach(t => t.showVFS())
}, mercator.SubChart.prototype.hideVFS = function () {
    this.sections.sections.forEach(t => t.hideVFS()), this.generalAdmissionAreas.areas.forEach(t => t.hideVFS()), this.allSeats().forEach(t => t.hideVFS())
}, mercator.SubChart.prototype.draw = function () {
    return this.allObjects().forEach(function (t) {
        t.draw()
    }), this
}, mercator.SubChart.prototype.undraw = function () {
    this.allObjects().forEach(function (t) {
        t.undraw()
    })
}, mercator.SubChart.prototype.redraw = function () {
    this.undraw(), this.draw()
}, mercator.SubChart.prototype.nonSeatLabelableObjects = function () {
    return this.tables.tables.concat(this.rows).concat(this.booths.booths)
}, mercator.SubChart.prototype.allObjectsWithSeats = function () {
    return this.objectsWithSeats()
}, mercator.SubChart.prototype.allSeats = function () {
    return this.allObjectsWithSeats().flatMap(t => t.chairs)
}, mercator.SubChart.prototype.objectsWithSeats = function () {
    return this.tables.tables.concat(this.rows)
}, mercator.SubChart.prototype.chairs = function () {
    var t = [];
    return this.objectsWithSeats().forEach(function (s) {
        t = t.concat(s.getChairs())
    }), t
}, mercator.SubChart.prototype.blur = function () {
    this.allObjects().forEach(function (t) {
        t.blur()
    })
}, mercator.SubChart.prototype.unblur = function () {
    this.allObjects().forEach(function (t) {
        t.unblur()
    })
}, mercator.SubChart.prototype.computeAutoSizedHeight = function () {
    return this.bbox ? (this.autoSizedHeight = roundTo2Places(this.getBBox().height), this.autoSizedHeight) : null
}, mercator.SubChart.prototype.computeAutoSizedWidth = function () {
    return this.bbox ? (this.autoSizedWidth = roundTo2Places(this.getBBox().width), this.autoSizedWidth) : null
}, mercator.SubChart.prototype.isActive = function () {
    return this.designer.activeSubChart() === this
}, mercator.SubChart.prototype.seatsCount = function () {
    return this.rows.reduce((t, s) => t + s.chairs.length, 0)
}, mercator.SubChart.prototype.totalPeopleCapacity = function () {
    return this.allBookableObjects().reduce((t, s) => t + s.totalPeopleCapacity(), 0)
}, mercator.SubChart.prototype._toJson = function (t) {
    this.computeBbox();
    var s = {
        height: this.computeAutoSizedHeight(),
        width: this.computeAutoSizedWidth(),
        tables: this.tables.tables.map(toJson),
        texts: this.textInputs.map(toJson),
        imageObjects: this.imageObjects.images.map(toJson),
        rows: this.rows.map(toJson),
        shapes: this.shapes.shapes.map(toJson),
        booths: this.booths.booths.map(toJson),
        icons: this.icons.icons.map(toJson),
        generalAdmissionAreas: this.generalAdmissionAreas.areas.map(toJson)
    };
    return t && t(s), s
}, mercator.SubChart._fromJson = function (t, s, o) {
    return s.autoSizedWidth = t.width, s.autoSizedHeight = t.height, s.rows = mercator.SubChart.rowsFromJson(t.rows, s), s.textInputs = mercator.SubChart.textsFromJson(t.texts, s), s.imageObjects = mercator.ImageObjects.fromJson(t.imageObjects, s), s.tables = mercator.Tables.fromJson(t.tables, s), s.booths = mercator.Booths.fromJson(t.booths, s), s.icons = mercator.Icons.fromJson(t.icons, s), s.shapes = mercator.ShapedObjects.fromJson(t.shapes, s), s.generalAdmissionAreas = mercator.GeneralAdmissionAreas.fromJson(t.generalAdmissionAreas, s), o && o(s), s
}, mercator.SubChart.rowsFromJson = function (t, s) {
    return t.map(function (t) {
        return s.loadRow(mercator.Row.createFromModel(t, s))
    })
}, mercator.SubChart.textsFromJson = function (t, s) {
    return t.map(function (t) {
        var o = mercator.TextInput.fromJson(t, s);
        return s.textInputs.push(o), o
    })
};
mercator.SectionSubChart = function (t, e) {
    this.init(e), this.section = t, this.category = t.category, this.backgroundSection = new mercator.BackgroundSection(t, e), this.backgroundImageForSection = new mercator.BackgroundImageForSection(t, this.backgroundSection, e), this.referenceChartForSection = new mercator.ReferenceChartForSection(t, t.subChart.referenceChart, e)
}, mercator.SectionSubChart.prototype = new mercator.SubChart, mercator.SectionSubChart.prototype.isMasterSubChart = function () {
    return !1
}, mercator.SectionSubChart.prototype.isSectionSubChart = function () {
    return !this.isMasterSubChart()
}, mercator.SectionSubChart.prototype.getReferenceChart = function () {
    return this.referenceChartForSection
}, mercator.SectionSubChart.prototype.floorIndex = function () {
    return this.designer.subChartFloors.indexOf(this.section.subChart)
}, mercator.SectionSubChart.prototype.listUnsupportedObjectTypes = function (t) {
    return t.some(t => "section" === t.type) ? ["section"] : []
}, mercator.SectionSubChart.prototype.toJson = function () {
    return this._toJson()
}, mercator.SectionSubChart.prototype.clone = function (t) {
    var e = new mercator.SectionSubChart(t, t.designer);
    return e.rows = this.rows.map(function (t) {
        return t.clone(e)
    }), e.tables = this.tables.clone(e), e.booths = this.booths.clone(e), e.textInputs = this.textInputs.map(function (t) {
        return t.clone(e)
    }), e.imageObjects = this.imageObjects.clone(e), e.shapes = this.shapes.clone(e), e.generalAdmissionAreas = this.generalAdmissionAreas.clone(e), e
}, mercator.SectionSubChart.prototype.allObjects = function () {
    return this.allSelectableObjects().concat(this.backgroundImageForSection).concat(this.referenceChartForSection).concat(this.backgroundSection)
}, mercator.SectionSubChart.prototype.allBookableObjects = function () {
    return this.bookableObjects()
}, mercator.SectionSubChart.prototype.allBooths = function () {
    return this.booths.booths
}, mercator.SectionSubChart.prototype.allImageObjects = function () {
    return this.imageObjects.images
}, mercator.SectionSubChart.prototype.allBookableParentObjects = function () {
    return this.bookableParentObjects()
}, mercator.SectionSubChart.prototype.allNonSeatLabelableObjects = function () {
    return this.nonSeatLabelableObjects()
}, mercator.SectionSubChart.prototype.allTables = function () {
    return this.tables.tables
}, mercator.SectionSubChart.prototype.allRows = function () {
    return this.rows
}, mercator.SectionSubChart.prototype.refreshOutOfBounds = function (t = !1) {
    this.allSelectableObjects().forEach(e => e.refreshOutOfBounds(t))
}, mercator.SectionSubChart.prototype.computeBbox = function () {
    this.bbox = this.backgroundSection.bbox().round()
}, mercator.SectionSubChart.prototype.sectionScaleChanged = function () {
    this.designer.loadingFromJson || this.redraw()
}, mercator.SectionSubChart.prototype.rotated = function (t) {
    this.allSelectableObjects().forEach(e => e.rotated(this.getBBox().center(), t));
    let e = this.section.bbox().center(),
        o = this.section.getShape().rotatedBbox(e, t).center(),
        n = new mercator.Ray(e, o).enlargeByFactor(this.designer.sectionScaleFactor / 100).end;
    this.allSelectableObjects().forEach(t => t.moved(e.minus(n)))
}, mercator.SectionSubChart.prototype.pointFromJson = function (t) {
    return this.getBBox().origin.add(t)
}, mercator.SectionSubChart.fromJson = function (t, e, o) {
    return mercator.SubChart._fromJson(e, new mercator.SectionSubChart(t, o))
}, mercator.SectionSubChart.prototype.flip = function (t) {
    (new mercator.Flipper).flip(this.allSelectableObjects(), this.bbox.center(), t)
}, mercator.SectionSubChart.prototype.applyToDimension = function (t) {
    return t * (this.designer.sectionScaleFactor / 100)
}, mercator.SectionSubChart.prototype.applyToPoint = function (t) {
    var e = this.designer.canvasCenter.subtract(this.section.bbox().center()),
        o = t.add(e);
    return new mercator.Ray(this.designer.canvasCenter, o).enlargeByFactor(this.designer.sectionScaleFactor / 100).end
};
mercator.MasterSubChart = function (t) {
    this.init(t), this.focalPoint = new mercator.FocalPoint(this), this.backgroundImage = new mercator.BackgroundImage(this), this.referenceChart = new mercator.ReferenceChart(this)
}, mercator.MasterSubChart.prototype = new mercator.SubChart, mercator.MasterSubChart.prototype.isMasterSubChart = function () {
    return !0
}, mercator.MasterSubChart.prototype.isSectionSubChart = function () {
    return !this.isMasterSubChart()
}, mercator.MasterSubChart.prototype.getReferenceChart = function () {
    return this.referenceChart
}, mercator.MasterSubChart.prototype.floorIndex = function () {
    return this.designer.subChartFloors.indexOf(this)
}, mercator.MasterSubChart.prototype.getBBox = function () {
    return this.designer.subChartFloors.mergedBbox()
}, mercator.MasterSubChart.prototype.isUnused = function () {
    return this.isEmpty() && !this.backgroundImage.isSet()
}, mercator.MasterSubChart.prototype.listUnsupportedObjectTypes = function (t) {
    return "ROWS_WITH_SECTIONS" === this.designer.venueType ? t.filter(t => !("section" === t.type || "generalAdmission" === t.type || t instanceof mercator.ShapedObject || t instanceof mercator.TextInput || t instanceof mercator.ImageObject || t instanceof mercator.Icon)).map(t => t.type).uniques() : t.some(t => "section" === t.type) ? ["section"] : []
}, mercator.MasterSubChart.prototype.allObjects = function () {
    return this.allSelectableObjects().concat(this.backgroundImage).concat(this.referenceChart)
}, mercator.MasterSubChart.prototype.allObjectsWithSeats = function () {
    return this.allSubCharts().flatMap(function (t) {
        return t.objectsWithSeats()
    })
}, mercator.MasterSubChart.prototype.allSubCharts = function () {
    return this.sectionSubCharts().concat([this])
}, mercator.MasterSubChart.prototype.sectionSubCharts = function () {
    return this.sections.sections.map(function (t) {
        return t.sectionSubChart
    })
}, mercator.MasterSubChart.prototype.allBookableObjects = function () {
    return this.allSubCharts().flatMap(function (t) {
        return t.bookableObjects()
    })
}, mercator.MasterSubChart.prototype.allBookableObjectsWithTables = function () {
    return this.allSubCharts().flatMap(t => t.bookableObjects().concat(t.tables.tables))
}, mercator.MasterSubChart.prototype.allBooths = function () {
    return this.allSubCharts().flatMap(function (t) {
        return t.booths.booths
    })
}, mercator.MasterSubChart.prototype.allImageObjects = function () {
    return this.allSubCharts().flatMap(t => t.imageObjects.images)
}, mercator.MasterSubChart.prototype.allBookableParentObjects = function () {
    return this.allSubCharts().flatMap(t => t.bookableParentObjects())
}, mercator.MasterSubChart.prototype.allNonSeatLabelableObjects = function () {
    return this.allSubCharts().flatMap(function (t) {
        return t.nonSeatLabelableObjects()
    })
}, mercator.MasterSubChart.prototype.allTables = function () {
    return this.allSubCharts().flatMap(function (t) {
        return t.tables.tables
    })
}, mercator.MasterSubChart.prototype.allRows = function () {
    return this.allSubCharts().flatMap(function (t) {
        return t.rows
    })
}, mercator.MasterSubChart.prototype.computeBbox = function () {
    let t = this.renderedObjects();
    0 === t.length ? this.bbox = new mercator.Bbox(this.designer.canvasCenter, 0, 0) : this.bbox = mercator.Bbox.mergedFromObjects(t)
}, mercator.MasterSubChart.prototype.renderedObjects = function () {
    var t = this.rows.concat(this.generalAdmissionAreas.areas).concat(this.shapes.shapes).concat(this.tables.tables).concat(this.booths.booths).concat(this.icons.icons).concat(this.textInputs).concat(this.imageObjects.images).concat(this.sections.sections);
    return this.backgroundImage.isSet() && this.backgroundImage.showOnRenderedCharts && t.push(this.backgroundImage), t
}, mercator.MasterSubChart.prototype.abstractDrawingObjects = function () {
    return this.shapes.shapes.concat(this.sections.sections)
}, mercator.MasterSubChart.prototype.abstractDraw = function (t) {
    return this.abstractDrawingObjects().map(e => e.simpleDraw(t))
}, mercator.MasterSubChart.prototype.toJson = function () {
    return this._toJson(function (t) {
        t.sections = this.sections.toJson(), t.focalPoint = this.focalPoint.toJson(), t.backgroundImage = this.backgroundImage.toJson(), t.referenceChart = this.referenceChart.toJson(), t.snapOffset = this.computeSnapOffset()
    }.bind(this))
}, mercator.MasterSubChart.prototype.computeSnapOffset = function () {
    if (!this.bbox) return {
        x: 0,
        y: 0
    };
    let t = this.bbox.origin.x % mercator.Point.SNAP_PRECISION,
        e = this.bbox.origin.y % mercator.Point.SNAP_PRECISION;
    return {
        x: roundTo2Places(t),
        y: roundTo2Places(e)
    }
}, mercator.MasterSubChart.prototype.pointFromJson = function (t) {
    return t.add(this.snapOffset).add(this.distanceToViewCenterSnapped())
}, mercator.MasterSubChart.prototype.distanceToViewCenterSnapped = function () {
    return new mercator.Point(0, 0).addToX(this.designer.width / 2 - this.autoSizedWidth / 2).addToY(this.designer.height / 2 - this.autoSizedHeight / 2).snapToGridEvenIfNotEnabled()
}, mercator.MasterSubChart.prototype.categorisableParentObjects = function () {
    return mercator.SubChart.prototype.categorisableParentObjects.apply(this).concat(this.sections.sections)
}, mercator.MasterSubChart.prototype.categorisableObjects = function () {
    return mercator.SubChart.prototype.categorisableObjects.apply(this).concat(this.sections.sections)
}, mercator.MasterSubChart.prototype.duplicateObjectsDetected = function (t) {
    this.allBookableObjectsWithTables().forEach(e => {
        t[e.getFullLabel()] ? e.markAsDuplicate() : e.markAsNotDuplicate()
    })
}, mercator.MasterSubChart.fromJson = function (t, e) {
    var s = new mercator.MasterSubChart(e);
    return s.snapOffset = new mercator.Point(t.snapOffset.x, t.snapOffset.y), mercator.SubChart._fromJson(t, s, function (e) {
        e.focalPoint = t.focalPoint ? mercator.FocalPoint.fromJson(t.focalPoint, e) : e.focalPoint, e.backgroundImage = mercator.BackgroundImage.fromJson(t.backgroundImage, e), e.referenceChart = mercator.ReferenceChart.fromJson(t.referenceChart, e), e.sections = mercator.Sections.fromJson(t.sections, e)
    })
};
mercator.SubChartFloors = class {
    constructor(t, s = []) {
        this.designer = t, this.subCharts = s, this.currentFloor = 0
    }
    init() {
        return this.abstractFloors = mercator.set(), this
    }
    newSubChart() {
        if (!(this.length() >= mercator.SubChartFloors.MAX_FLOORS)) return this.subCharts.push(mercator.MasterSubChart.fromJson(mercator.VenueTypeSwitcher.createMasterDataStructure(this.designer), this.designer)), _.last(this.subCharts)
    }
    push(t) {
        this.subCharts.push(t)
    }
    remove(t) {
        this.subCharts.remove(t)
    }
    deleteFloor(t) {
        this.subCharts.splice(t, 1)
    }
    getCurrentMasterSubChart() {
        return this.subCharts[this.currentFloor]
    }
    getCurrentFloorIndex() {
        return this.currentFloor
    }
    getLastMasterSubChart() {
        return this.subCharts[this.length() - 1]
    }
    getInactiveSubCharts() {
        let t = this.subCharts.slice();
        return t.splice(this.currentFloor, 1), t
    }
    subChartsBelowCurrent() {
        return this.subCharts.slice(0, this.currentFloor)
    }
    hasFloor(t) {
        return t < this.subCharts.length
    }
    setFloor(t) {
        this.currentFloor = t
    }
    length() {
        return this.subCharts.length
    }
    mergedBbox() {
        return mercator.Bbox.merged(this.subCharts.map(t => t.getContentsBBox()))
    }
    hasMultipleFloors() {
        return this.length() > 1
    }
    onFirstFloor() {
        return 0 === this.currentFloor
    }
    hasUsedFloors() {
        return this.subCharts.some(t => !t.isUnused())
    }
    getFloorColor(t) {
        const s = this.designer.isDarkCanvas() ? 26 : 90,
            r = this.designer.isDarkCanvas() ? -4 : 2;
        return `hsl(0, 0%, ${s + Math.min(3, this.currentFloor - t) * r}%)`
    }
    redrawAbstractFloors() {
        this.removeAbstractFloors(), this.drawAbstractFloors()
    }
    drawAbstractFloors() {
        this.subChartsBelowCurrent().forEach((t, s) => {
            this.postProcessAbstractDraw(t.abstractDraw(this.getFloorColor(s))).forEach(t => this.abstractFloors.push(t))
        })
    }
    postProcessAbstractDraw(t) {
        return t.map(t => (t.toLayer("abstractFloorsLayer", this.designer).applyZoom(this.designer), t.node.setAttribute("pointer-events", "none"), t))
    }
    removeAbstractFloors() {
        this.abstractFloors.forEach(t => t.remove()), this.abstractFloors.clear()
    }
    applyZoom() {
        this.abstractFloors.forEach(t => t.applyZoom(this.designer))
    }
    firstFloorSubChart() {
        return this.subCharts[0]
    }
    indexOf(t) {
        return this.subCharts.indexOf(t)
    }
    allMasterSubCharts() {
        return this.subCharts
    }
    allBookableObjects() {
        return this.allMasterSubCharts().flatMap(t => t.allBookableObjects())
    }
    allBookableObjectsWithTables() {
        return this.allMasterSubCharts().flatMap(t => t.allBookableObjectsWithTables())
    }
    toJson() {
        return this.subCharts.map(t => t.toJson())
    }
    static fromJson(t, s) {
        return new mercator.SubChartFloors(s, t.map(t => mercator.MasterSubChart.fromJson(t, s)))
    }
}, mercator.SubChartFloors.MAX_FLOORS = 9;
mercator.Zoomer = function (o) {
    this.zoomListener = o, this.reset()
}, mercator.Zoomer.prototype.reset = function () {
    this.zoomLevel = 1, this.transformationMatrix = this.previousTransformationMatrix = new SVG.Matrix
}, mercator.Zoomer.prototype.zoomIn = function (o) {
    this.zoom(o, this.zoomLevel * mercator.Zoomer.zoomStep)
}, mercator.Zoomer.prototype.zoomOut = function (o) {
    this.zoom(o, this.zoomLevel / mercator.Zoomer.zoomStep)
}, mercator.Zoomer.prototype.zoom = function (o, t) {
    this.zoomLevel = this.cap(t), this.transformationMatrix = mercator.Zoomer.transformationMatrixToZoomTo(this.zoomLevel, o, this.previousTransformationMatrix), this.previousTransformationMatrix = this.transformationMatrix, this.zoomListener()
}, mercator.Zoomer.prototype.resetAndZoom = function (o, t) {
    this.reset(), this.zoom(o, t)
}, mercator.Zoomer.prototype.cap = function (o) {
    return Math.max(mercator.Zoomer.minZoomLevel, Math.min(o, mercator.Zoomer.maxZoomLevel))
}, mercator.Zoomer.prototype.atInitialZoomLevel = function (o) {
    const t = this.zoomLevel,
        e = this.transformationMatrix,
        r = this.previousTransformationMatrix;
    this.zoomLevel = 1, this.transformationMatrix = this.previousTransformationMatrix = new SVG.Matrix;
    try {
        return o()
    } finally {
        this.zoomLevel = t, this.transformationMatrix = e, this.previousTransformationMatrix = r
    }
}, mercator.Zoomer.prototype.applyToElement = function (o, t = null, e = null) {
    let r = t ? mercator.Zoomer.transformationMatrixToZoomTo(t, e, this.transformationMatrix) : this.transformationMatrix;
    if (o.transform(r), t || (t = this.zoomLevel), o.keepSize && (o.extraZoom = 1 / t), o.extraZoom && o.scale(o.extraZoom), o.rotationAngle)
        if (o.rotationCenter) o.rotate(o.rotationAngle, o.rotationCenter.x, o.rotationCenter.y);
        else {
            let t = o.bbox();
            o.rotate(o.rotationAngle, t.cx, t.cy)
        }
}, mercator.Zoomer.prototype.applyToPoint = function (o) {
    let t = new SVG.Point(o.x, o.y).transform(this.transformationMatrix);
    return new mercator.Point(t.x, t.y)
}, mercator.Zoomer.prototype.zoomed = function (o) {
    return o * this.zoomLevel
}, mercator.Zoomer.prototype.unzoom = function (o) {
    return o / this.zoomLevel
}, mercator.Zoomer.prototype.serialize = function () {
    return {
        zoomLevel: this.zoomLevel,
        transformationMatrix: this.transformationMatrix,
        previousTransformationMatrix: this.previousTransformationMatrix
    }
}, mercator.Zoomer.prototype.deserialize = function (o) {
    this.zoomLevel = o.zoomLevel, this.transformationMatrix = o.transformationMatrix, this.previousTransformationMatrix = o.previousTransformationMatrix, this.zoomListener()
}, mercator.Zoomer.transformationMatrixToZoomTo = function (o, t, e) {
    let r = o / e.a,
        i = new SVG.Point(t.x, t.y).transform(e.inverse());
    return (new SVG.Matrix).scale(r, r, i.x, i.y).transform(e)
}, mercator.Zoomer.zoomStep = 1.25, mercator.Zoomer.maxZoomLevel = Math.pow(mercator.Zoomer.zoomStep, 7), mercator.Zoomer.minZoomLevel = Math.pow(mercator.Zoomer.zoomStep, -15);
mercator.Panner = class {
    panBy(e, l) {
        let o = $(window);
        this.panTo(o.scrollLeft() + e, o.scrollTop() + l)
    }
    panTo(e, l) {
        $(window).scrollLeft(e).scrollTop(l)
    }
    panLevel() {
        let e = $(window);
        return new mercator.Point(e.scrollLeft(), e.scrollTop())
    }
    serialize() {
        return this.panLevel()
    }
    deserialize(e) {
        this.panTo(e.x, e.y)
    }
};
mercator.FocalPoint = function (t) {
    this.init(t.designer, !0), this.subChart = t, this.pointer = new mercator.FocalPointPointer(this.designer), this.point = null, this.focalPointShapes = null
}, mercator.FocalPoint.prototype = new mercator.Object, mercator.FocalPoint.prototype.showSelectionRect = function () {
    return !1
}, mercator.FocalPoint.prototype.getInspectorSheets = function () {
    return Object.assign(mercator.Object.prototype.getInspectorSheets.call(this), {
        FocalPoint: null
    })
}, mercator.FocalPoint.prototype.bbox = function () {
    return this.selectionArea().bbox()
}, mercator.FocalPoint.prototype.selectionArea = function () {
    return new mercator.CircleShape(this.point, this.designer.zoomer.unzoom(20))
}, mercator.FocalPoint.prototype.draw = function () {
    if (this.subChart.isActive()) return this.point ? (this.undraw(), this.focalPointShapes = mercator.FocalPoint.createShapes(this.designer, this.point), this.pulseAnimation(), this.objectDrawn(), this) : this
}, mercator.FocalPoint.prototype.undraw = function () {
    if (this.subChart.isActive()) return this.focalPointShapes && this.focalPointShapes.remove(), this.objectUndrawn(), this
}, mercator.FocalPoint.prototype.pulseAnimation = function () {
    for (let t = this.focalPointShapes.length - 1; t >= 0; t--) this.shapePulseAnimation(this.focalPointShapes.toArray()[t], 50 + 150 * (this.focalPointShapes.length - t))
}, mercator.FocalPoint.prototype.shapePulseAnimation = function (t, o) {
    setTimeout(() => this.animateToHighlight(t), o)
}, mercator.FocalPoint.prototype.rotated = function (t, o) {
    this.point = this.point.rotateAround(t, o), this.draw()
}, mercator.FocalPoint.prototype.remove = function () {
    this.stopAnimation(), this.undraw(), this.point = null, this.designer.requestStatsUpdate()
}, mercator.FocalPoint.prototype.set = function (t) {
    this.moveTo(t), this.designer.requestStatsUpdate()
}, mercator.FocalPoint.prototype.moved = function (t) {
    this.point = this.point.add(t), this.draw()
}, mercator.FocalPoint.prototype.visibleElementsSet = function () {
    return this.focalPointShapes ? this.focalPointShapes : mercator.set()
}, mercator.FocalPoint.prototype.visibleElementsSetWithoutChildren = function () {
    return mercator.set()
}, mercator.FocalPoint.prototype.isSet = function () {
    return this.point
}, mercator.FocalPoint.prototype.toJson = function () {
    return this.isSet() ? this.point.toJson(this.subChart) : null
}, mercator.FocalPoint.prototype.moveTo = function (t) {
    return this.point = t, this.draw(), this
}, mercator.FocalPoint.prototype.allElementsSet = function () {
    return this.focalPointShapes
}, mercator.FocalPoint.prototype.animateToHighlight = function (t) {
    const o = t.initialStrokeColor,
        e = new SVG.Runner(200).element(t).attr({
            stroke: "#0778fa"
        }).ease("<>"),
        i = new SVG.Timeline;
    i.schedule(e), i.play(), setTimeout(() => {
        i.stop(), this.animateFromHighlight(t, o)
    }, 300)
}, mercator.FocalPoint.prototype.animateFromHighlight = function (t, o) {
    const e = new SVG.Runner(400).element(t).attr({
        stroke: o
    }).ease("<>"),
        i = new SVG.Timeline;
    i.schedule(e), i.play()
}, mercator.FocalPoint.prototype.stopAnimation = function () {
    this.focalPointShapes.stop()
}, mercator.FocalPoint.fromJson = function (t, o) {
    var e = new mercator.FocalPoint(o);
    return e.point = mercator.Point.fromJson(t, o), e
}, mercator.FocalPoint.prototype.getColors = function () {
    return mercator.FocalPoint.getColors(this.designer)
}, mercator.FocalPoint.getColors = function (t) {
    return "light" !== t.getCanvasColorScheme() ? {
        circleStroke: "#ffffff",
        circleFill: "black",
        glowCircleStroke: "#ffffff"
    } : {
        circleStroke: "#06111d",
        circleFill: "white",
        glowCircleStroke: "#111111"
    }
}, mercator.FocalPoint.createShapes = function (t, o) {
    const e = t.zoomer.unzoom(20),
        i = mercator.FocalPoint.getColors(t);
    let n = t.drawer.circle(o.x, o.y, 9 * e).attr({
        fill: "transparent",
        "stroke-width": .1 * e,
        stroke: i.glowCircleStroke,
        "stroke-opacity": .07
    });
    n.initialStrokeColor = i.glowCircleStroke, n.node.setAttribute("pointer-events", "none");
    let s = t.drawer.circle(o.x, o.y, 6 * e).attr({
        fill: "transparent",
        "stroke-width": .1 * e,
        stroke: i.glowCircleStroke,
        "stroke-opacity": .12
    });
    s.initialStrokeColor = i.glowCircleStroke, s.node.setAttribute("pointer-events", "none");
    let r = t.drawer.circle(o.x, o.y, 3 * e).attr({
        fill: "transparent",
        "stroke-width": .1 * e,
        stroke: i.glowCircleStroke,
        "stroke-opacity": .15
    });
    r.initialStrokeColor = i.glowCircleStroke, r.node.setAttribute("pointer-events", "none");
    let a = t.drawer.circle(o.x, o.y, 1 * e).attr({
        fill: i.circleFill,
        "stroke-width": .1 * e,
        stroke: i.circleStroke
    });
    a.initialStrokeColor = i.circleStroke, a.node.setAttribute("pointer-events", "none");
    let l = t.drawer.circle(o.x, o.y, .5 * e).attr({
        fill: i.circleFill,
        "stroke-width": .25 * e,
        stroke: i.circleStroke
    });
    return l.initialStrokeColor = i.circleStroke, l.node.setAttribute("pointer-events", "none"), mercator.set(n, s, r, a, l).toLayer("tempDrawingsLayer", t).applyZoom(t)
};
mercator.FocalPointPointer = function (t) {
    this.designer = t, this.shapes = null
}, mercator.FocalPointPointer.prototype.showAt = function (t) {
    return this.hide(), this.shapes = mercator.FocalPoint.createShapes(this.designer, t), this
}, mercator.FocalPointPointer.prototype.hide = function () {
    this.shapes && this.shapes.remove()
};
mercator.RowBlockDrawer = function (t, o, s, i) {
    this.blockStartPoint = t, this.firstRowEndPoint = o, this.intertwined = s, this.rows = [], this.numberOfRowsAndChairs = new mercator.NumberOfRowsAndChairs(i), this.designer = i
}, mercator.RowBlockDrawer.prototype.initDraw = function () {
    this.undraw(), this.drawRows(this.firstRowEndPoint || this.blockStartPoint)
}, mercator.RowBlockDrawer.prototype.redrawTo = function (t, o) {
    this.undraw(), this.intertwined = o, this.drawRows(t);
    let s = mercator.Point.centerOfBBox(_.last(this.rows).last().rbox()).fromView(this.designer);
    this.drawNumberOfRowsAndChairs(s)
}, mercator.RowBlockDrawer.prototype.drawNumberOfRowsAndChairs = function (t) {
    const o = t.averageWith(this.blockStartPoint);
    this.numberOfRowsAndChairs.refresh(o, this.rows.length, this.rows[0].length)
}, mercator.RowBlockDrawer.prototype.numberOfDrawnSeats = function () {
    return this.rows.length > 0 ? this.rows[0].length : 0
}, mercator.RowBlockDrawer.prototype.drawRows = function (t) {
    if (this.firstRowEndPoint) {
        this.getRowPointsAtIndex();
        const o = this.extendingRowSnapAngle(t),
            s = this.pullLength(t, o);
        for (let t = 0; t < this.numRows(s); ++t) {
            const i = s > 0 ? 1 : -1,
                [e, r] = this.getRowPointsAtIndex(t * i, o);
            this.rows.push(mercator.Row.drawShapes(e, r, this.designer))
        }
        this.rows.forEach((t, o) => {
            t.forEach(t => {
                0 === o || o === this.rows.length - 1 ? t.attr({
                    stroke: "#0784fa",
                    "stroke-width": 3
                }) : t.attr({
                    stroke: "#005cc5"
                })
            })
        })
    } else this.rows.push(mercator.Row.drawShapes(this.blockStartPoint, t, this.designer)), this.rows[0].forEach((t, o) => {
        0 === o || o === this.rows[0].length - 1 ? t.attr({
            stroke: "#0784fa",
            "stroke-width": 3
        }) : t.attr({
            stroke: "#005cc5"
        })
    })
}, mercator.RowBlockDrawer.prototype.getDrawnSeatCount = function () {
    return this.rows[0].length
}, mercator.RowBlockDrawer.prototype.getRowPointsAtIndex = function (t, o) {
    const s = new mercator.Ray(this.blockStartPoint, this.firstRowEndPoint),
        i = void 0 !== o ? o : s.angle() + 90;
    let e = new mercator.RayFromOriginAndAngle(this.blockStartPoint, i).pointAtDistanceFromOrigin(t * mercator.Row.height()),
        r = new mercator.RayFromOriginAndAngle(this.firstRowEndPoint, i).pointAtDistanceFromOrigin(t * mercator.Row.height());
    if (this.intertwined && t % 2 != 0) {
        const t = new mercator.Ray(e, r).shrinkOnBothSides((mercator.Chair.width + this.designer.rowChairSpacing) / 2);
        e = t.end, r = t.origin
    }
    return [e, r]
}, mercator.RowBlockDrawer.prototype.pullLength = function (t, o) {
    const s = new mercator.Ray(this.blockStartPoint, this.firstRowEndPoint),
        i = s.angle(),
        e = void 0 !== o ? o : i + 90,
        r = new mercator.RayFromOriginAndAngle(this.firstRowEndPoint, e).projectPoint(t);
    let n = 1;
    if (void 0 === o) {
        const t = new mercator.Ray(this.blockStartPoint, r),
            o = new mercator.Angle(s.angleBetween(t));
        n = o.isQ1() || o.isQ3() ? -1 : 1
    }
    return this.firstRowEndPoint.distanceToPoint(r) * n
}, mercator.RowBlockDrawer.prototype.extendingRowSnapAngle = function (t) {
    if (!this.designer.shiftWasPressed) return;
    const o = new mercator.Ray(this.firstRowEndPoint, t).angle() / 180 * Math.PI,
        s = Math.cos(o),
        i = Math.sin(o);
    return Math.abs(s) > Math.abs(i) ? s > 0 ? 0 : 180 : i > 0 ? 90 : 270
}, mercator.RowBlockDrawer.prototype.numRows = function (t) {
    return Math.max(1, Math.ceil((Math.abs(t) + mercator.Row.height() / 2) / mercator.Row.height()))
}, mercator.RowBlockDrawer.prototype.undraw = function () {
    this.rows.forEach(function (t) {
        t.remove()
    }), this.rows = [], this.numberOfRowsAndChairs.undraw()
}, mercator.RowBlockDrawer.prototype.createRowObjects = function () {
    const t = this;
    return this.rows.map(function (o) {
        return mercator.RowBlockDrawer.toRowObject(o, t.designer)
    })
}, mercator.RowBlockDrawer.toRowObject = function (t, o) {
    return mercator.Row.createFromChairs(t.toArray().map(function (t) {
        const s = new mercator.Point(t.attr("cx"), t.attr("cy"));
        return new mercator.Chair(s, null, o.activeSubChart())
    }), o)
};
mercator.VenueTypeSwitcher = function (e) {
    this.designer = e
}, mercator.VenueTypeSwitcher.createMasterDataStructure = function (e) {
    return {
        backgroundImage: null,
        booths: [],
        generalAdmissionAreas: [],
        rows: [],
        sections: [],
        shapes: [],
        tables: [],
        texts: [],
        snapOffset: {
            x: 0,
            y: 0
        },
        width: 128,
        height: 128
    }
}, mercator.VenueTypeSwitcher.prototype.initBlank = function (e) {
    let t = {
        name: mercator.ChartDesigner.defaultName(),
        categories: {
            list: [],
            maxCategoryKey: 0
        },
        sectionScaleFactor: 100,
        subChart: mercator.VenueTypeSwitcher.createMasterDataStructure(this.designer),
        venueType: e,
        version: mercator.version,
        tablesLabelCounter: 1,
        uuidCounter: 0
    };
    "ROWS_WITH_SECTIONS" === e && (t.multiFloorView = "isometric"), this.designer.saver.save(JSON.stringify(t)), this.designer.renderDrawing(t)
}, mercator.VenueTypeSwitcher.prototype.venueTypes = {
    ROWS_WITH_SECTIONS: {
        getFeatureStatus: function (e, t) {
            var s = mercator.Features.Type,
                r = mercator.Features.Status;
            if (t.activeSubChart().isMasterSubChart()) {
                if (e === s.ROWS || e === s.BOOTHS || e === s.TABLES || e === s.SELECT_SEATS) return r.DISABLED
            } else if (e === s.SECTIONS || e === s.BACKGROUND_IMAGE || e === s.REFERENCE_CHART || e === s.FOCAL_POINT) return r.DISABLED;
            return t.subChartFloors.hasMultipleFloors() && !t.subChartFloors.onFirstFloor() && e === s.FOCAL_POINT ? r.DISABLED : e === s.OBJECT_SECTION_LABELS ? r.DISABLED : void 0
        }
    },
    MIXED: {
        getFeatureStatus: function (e) {
            var t = mercator.Features.Type,
                s = mercator.Features.Status;
            return e === t.SECTIONS ? s.DISABLED : e === t.MULTIPLE_FLOORS ? s.DISABLED : void 0
        }
    }
}, mercator.VenueTypeSwitcher.prototype.getVenueData = function () {
    return this.venueTypes[this.designer.venueType] || this.venueTypes.MIXED
}, mercator.VenueTypeSwitcher.prototype.getFeatureStatus = function (e) {
    var t = mercator.Features.Type,
        s = mercator.Features.Status;
    return !this.designer.isReadOnly() || e !== t.BACKGROUND_IMAGE && e !== t.REFERENCE_CHART && e !== t.VIEW_FROM_YOUR_SEAT ? this.getVenueData().getFeatureStatus(e, this.designer) : s.DISABLED
};
mercator.ScaleSlider = function (e, i, t = 20, a = 500) {
    this.min = t, this.max = a, this.container = e, this.initialValue = i, this.editableValue = new mercator.EditableValue(e, i, "%", this.setValue.bind(this)), this.editableValue.setMin(this.min).setMax(this.max), this.init()
}, mercator.ScaleSlider.prototype.init = function () {
    var e = this.initialValue ? this.initialValue : 100;
    this.getSlider().slider({
        min: this.min,
        max: this.max,
        step: 5,
        value: e,
        tooltip: "hide",
        formater: function (e) {
            return e + "%"
        }
    }), this.updateEditableValue()
}, mercator.ScaleSlider.prototype.updateEditableValue = function () {
    this.editableValue.setValue(this.getSlider().slider("getValue"))
}, mercator.ScaleSlider.prototype.onValueChanged = function (e) {
    return this.getSlider().on("slide", function (i) {
        i.value instanceof Number ? e(i.value) : i.value instanceof Array && e(i.value[0]), this.updateEditableValue()
    }.bind(this)), this
}, mercator.ScaleSlider.prototype.setValue = function (e) {
    this.getSlider().slider("setValue", e), this.updateEditableValue()
}, mercator.ScaleSlider.prototype.getSlider = function () {
    return this.container.find(".sliderDiv")
}, mercator.ScaleSlider.prototype.show = function () {
    this.container.show()
}, mercator.ScaleSlider.prototype.hide = function () {
    this.container.hide()
};
mercator.EditableValue = function (e, t, i, a) {
    PIXELS_FOR_UNIT_STEP = 3, this.container = e, this.unit = i, this.setValue(t), this.parentSetValue = a, this.moveStartValue = t, this.moveStartX = null, this.min = null, this.max = null, this.isScrubbing = !1, this.isTextInputActive = !1, this.appendListeners(), this.refreshMode()
}, mercator.EditableValue.prototype.element = function () {
    return this.container.find(".editableValue")
}, mercator.EditableValue.prototype.updateValue = function (e) {
    this.value !== e && this.parentSetValue(e)
}, mercator.EditableValue.prototype.onMouseMove = function (e) {
    var t = e.screenX - this.moveStartX,
        i = Math.round(t / PIXELS_FOR_UNIT_STEP),
        a = this.moveStartValue + i;
    Math.abs(i) > 0 && (this.isScrubbing = !0), this.min && a <= this.min ? (a = this.min, $("#chartDesignerWrapper").addClass("scrubbing-minReached")) : $("#chartDesignerWrapper").removeClass("scrubbing-minReached"), this.max && a >= this.max ? (a = this.max, $("#chartDesignerWrapper").addClass("scrubbing-maxReached")) : $("#chartDesignerWrapper").removeClass("scrubbing-maxReached"), this.updateValue(a)
}, mercator.EditableValue.prototype.activateTextInput = function () {
    this.isTextInputActive = !0, this.refreshMode(), this.element().children(".valueInput").focus().select()
}, mercator.EditableValue.prototype.deactivateTextInput = function () {
    this.isTextInputActive = !1, this.refreshMode()
}, mercator.EditableValue.prototype.refreshMode = function () {
    this.isTextInputActive ? this.element().addClass("mode-valueInput").removeClass("mode-valueLabel") : this.element().removeClass("mode-valueInput").addClass("mode-valueLabel")
}, mercator.EditableValue.prototype.appendListeners = function () {
    var e = this,
        t = function () {
            $(window).off("mousemove", e.onMouseMove.bind(e))
        };
    e.element().on("mousedown", function (t) {
        e.isTextInputActive || (e.moveStartValue = e.value, e.moveStartX = t.screenX, e.isScrubbing = !1, $("#chartDesignerWrapper").addClass("scrubbingActive"), $(window).on("mousemove", e.onMouseMove.bind(e)))
    }).on("mouseup", function (t) {
        e.isScrubbing || e.isTextInputActive || e.activateTextInput()
    }), $(window).on("mouseup", function (e) {
        $("#chartDesignerWrapper").removeClass("scrubbingActive", "scrubbing-minReached", "scrubbing-maxReached"), $(window).off("mousemove"), $(window).off("mouseup", t)
    }), e.element().children(".valueInput").on("blur", function (t) {
        e.deactivateTextInput()
    }).on("keydown", function (t) {
        13 === t.keyCode && e.deactivateTextInput()
    }).on("change", function (t) {
        var i = parseInt(t.target.value);
        isNaN(i) ? e.refreshElementValue() : e.updateValue(i)
    })
}, mercator.EditableValue.prototype.setValue = function (e) {
    return this.value = e, this.refreshElementValue(), this
}, mercator.EditableValue.prototype.setMin = function (e) {
    return this.min = e, this.element().children(".valueInput").attr("min", this.min), this
}, mercator.EditableValue.prototype.setMax = function (e) {
    return this.max = e, this.element().children(".valueInput").attr("max", this.max), this
}, mercator.EditableValue.prototype.refreshElementValue = function () {
    this.element().children(".valueLabel").html(this.value + (this.unit ? this.unit : "")), this.element().children(".valueInput").val(this.value)
};
mercator.History = function (t) {
    this.states = [], this.activeStateIndex = -1, this.activeStateChangedCallback = t, this.stateLimit = 50
}, mercator.History.prototype.changeState = function (t) {
    return !this.isSameAsActiveState(t) && (this.states = this.states.slice(0, this.activeStateIndex + 1), this.states.push(t), this.states.length > this.stateLimit ? this.states.shift() : this.activeStateIndex++, this.activeStateChangedCallback(this), !0)
}, mercator.History.prototype.getActiveState = function () {
    return this.checkForActiveState(), this.states[this.activeStateIndex]
}, mercator.History.prototype.isSameAsActiveState = function (t) {
    return !this.noActiveState() && this.getActiveState() === t
}, mercator.History.prototype.noActiveState = function () {
    return -1 === this.activeStateIndex
}, mercator.History.prototype.checkForActiveState = function () {
    if (this.noActiveState()) throw new Error("no active state")
}, mercator.History.prototype.goBack = function () {
    if (this.checkForActiveState(), 0 === this.activeStateIndex) throw new Error("already at the start state");
    return --this.activeStateIndex, this.activeStateChangedCallback(this), this.states[this.activeStateIndex]
}, mercator.History.prototype.canGoBack = function () {
    return this.activeStateIndex > 0
}, mercator.History.prototype.goForward = function () {
    if (this.checkForActiveState(), this.activeStateIndex === this.states.length - 1) throw new Error("already at the end state");
    return ++this.activeStateIndex, this.activeStateChangedCallback(this), this.states[this.activeStateIndex]
}, mercator.History.prototype.canGoForward = function () {
    return this.activeStateIndex < this.states.length - 1
};
mercator.StatusChanger = function (t) {
    this.designer = t
}, mercator.StatusChanger.prototype.publishDraft = function () {
    return this.designer.v2Client.publishDraft(this.designer.chartKey).then(() => this.designer.onChartPublished())
}, mercator.StatusChanger.prototype.discardDraft = function () {
    return this.designer.v2Client.discardDraft(this.designer.chartKey)
};
mercator.StateChangeDetector = function (t, e) {
    this.serializableObject = t, this.listeners = e, this.previousState = null, this.resultOfPreviousCycle = $.when(), this.started = !1, this.paused = !1
}, mercator.StateChangeDetector.prototype.start = function (t) {
    this.previousState = t, this.scheduleStateChangeCheck(), this.started = !0
}, mercator.StateChangeDetector.prototype.pause = function () {
    this.paused = !0
}, mercator.StateChangeDetector.prototype.resume = function () {
    this.paused = !1
}, mercator.StateChangeDetector.prototype.scheduleStateChangeCheck = function (t) {
    t || (t = 1e3), setTimeout(() => {
        this.paused ? this.scheduleStateChangeCheck() : this.actOnStateChangeWhenPreviousCycleDone().then(() => this.scheduleStateChangeCheck(), () => this.scheduleStateChangeCheck(1e4))
    }, t)
}, mercator.StateChangeDetector.prototype.actOnStateChangeWhenPreviousCycleDone = function () {
    return this.resultOfPreviousCycle.then(this._actOnStateChangeAndStoreResult.bind(this), this._actOnStateChangeAndStoreResult.bind(this))
}, mercator.StateChangeDetector.prototype._actOnStateChangeAndStoreResult = function () {
    return this.resultOfPreviousCycle = this._actOnStateChange(), this.resultOfPreviousCycle
}, mercator.StateChangeDetector.prototype._actOnStateChange = function () {
    if (!this.started) return $.when();
    var t = this.serializableObject.serialize();
    if (this.previousState === t) return $.when();
    var e = this.listeners.map(function (e) {
        return e(t)
    }),
        s = this;
    return $.when.apply($, e).then(function () {
        s.previousState = t
    })
};
mercator.TextsBboxCache = function (e) {
    this.designer = e, this.cache = new LRUCache(5e3)
}, mercator.TextsBboxCache.prototype.getBboxDimensions = function (e, t, o, i) {
    var a = whitespaceToNonBreakingSpaces(e),
        s = this.cacheKey(a, t, o, i);
    if (!this.cache.get(s)) {
        var h = this.computeBbox(a, t, o, i);
        this.cache.put(s, {
            width: h.width,
            height: h.height
        })
    }
    return this.cache.get(s)
}, mercator.TextsBboxCache.prototype.cacheKey = function (e, t, o, i) {
    return t + "|" + (o ? "b" : "") + "|" + i + "|" + e
}, mercator.TextsBboxCache.prototype.computeBbox = function (e, t, o, i) {
    var a = this.designer.drawer.text(0, 0, e, {
        "font-size": t,
        "font-family": mercator.TextInput.defaultFontFamily,
        "font-weight": o ? "bold" : "normal"
    });
    a.rotate(i);
    var s = a.rbox();
    return a.remove(), s
};
mercator.RowsUtil = {}, mercator.RowsUtil.medianRotationAngle = function (t) {
    const e = t.map(t => new mercator.Ray(t.getCurveGhostPoint1(), t.getCurveGhostPoint2()).angle());
    return median(e)
}, mercator.RowsUtil.mostCommonAngle = function (t) {
    let e = {};
    t.forEach(t => {
        let n = t.getRotation();
        e[n] = (e[n] || 0) + 1
    });
    let n = Object.keys(e).reduce((t, n) => e[t] > e[n] ? t : n);
    return {
        angle: n,
        count: e[n]
    }
}, mercator.RowsUtil.center = function (t) {
    return mercator.Bbox.mergedFromObjects(t).center()
}, mercator.RowsUtil.leftPoint = function (t) {
    return t.reduce((t, e) => {
        let n = e.firstChair().center(),
            o = e.lastChair().center(),
            i = n.x < o.x ? n : o;
        return !t || i.x < t.x ? i : t
    }, null)
}, mercator.RowsUtil.rightPoint = function (t) {
    return t.reduce((t, e) => {
        let n = e.firstChair().center(),
            o = e.lastChair().center(),
            i = n.x > o.x ? n : o;
        return !t || i.x > t.x ? i : t
    }, null)
}, mercator.RowsUtil.getRowSpacing = function (t) {
    if (t.length < 2) return;
    const e = mercator.RowCurver,
        n = mercator.RowsUtil.medianRotationAngle(t),
        o = mercator.RowsUtil.center(t);
    let i = t.map(t => e.decompose(t)).map(t => e.rotateBy(t, -n, o)).map(t => e.rotateUntilHorizontal(t)).sort((t, e) => t.chairCenters[0].y - e.chairCenters[0].y),
        r = i[0];
    return (i[i.length - 1].chairCenters[0].y - r.chairCenters[0].y) / (t.length - 1) - mercator.Chair.width
};
mercator.RowCurver = function (t) {
    this.rows = t
}, mercator.RowCurver.prototype.doCurve = function (t) {
    const e = mercator.RowCurver,
        r = mercator.RowsUtil.medianRotationAngle(this.rows),
        o = mercator.RowsUtil.center(this.rows),
        n = this.rows.map(t => e.decompose(t)).map(t => e.rotateBy(t, -r, o)).map(t => e.rotateUntilHorizontal(t)),
        i = e.minChairX(n),
        s = e.maxChairX(n);
    n.map(t => e.updateCurveGhostPoints(t, i, s)).map(r => e.curve(r, t)).map(t => e.rotateBy(t, r, o)).forEach(r => e.applyCurving(r, t))
}, mercator.RowCurver.decompose = function (t) {
    return {
        curveGhostPoint1: t.getCurveGhostPoint1(),
        curveGhostPoint2: t.getCurveGhostPoint2(),
        chairCenters: t.getChairs().map(t => t.center()),
        originalRow: t
    }
}, mercator.RowCurver.rotateBy = function (t, e, r) {
    return t.curveGhostPoint1 = t.curveGhostPoint1.rotateAround(r, e), t.curveGhostPoint2 = t.curveGhostPoint2.rotateAround(r, e), t.chairCenters = t.chairCenters.map(t => t.rotateAround(r, e)), t
}, mercator.RowCurver.rotateUntilHorizontal = function (t) {
    const e = 360 - new mercator.Ray(t.curveGhostPoint1, t.curveGhostPoint2).angle(),
        r = t.curveGhostPoint1.averageWith(t.curveGhostPoint2);
    return mercator.RowCurver.rotateBy(t, e, r), t
}, mercator.RowCurver.minChairX = function (t) {
    return t.flatMap(t => t.chairCenters).map(t => t.x).reduce(function (t, e) {
        return e < t ? e : t
    }, 1 / 0)
}, mercator.RowCurver.maxChairX = function (t) {
    return t.flatMap(t => t.chairCenters).map(t => t.x).reduce(function (t, e) {
        return e > t ? e : t
    }, -1 / 0)
}, mercator.RowCurver.longestRowSeatCount = function (t) {
    const e = t.map(t => t.chairCenters.length);
    return Math.max(...e)
}, mercator.RowCurver.updateCurveGhostPoints = function (t, e, r) {
    return t.curveGhostPoint1 = t.curveGhostPoint1.withX(e), t.curveGhostPoint2 = t.curveGhostPoint2.withX(r), t
}, mercator.RowCurver.calculateCurveCenterPoint = function (t, e) {
    return {
        x: (t.curveGhostPoint1.x + t.curveGhostPoint2.x) / 2,
        y: t.curveGhostPoint1.y + 8 * -e
    }
}, mercator.RowCurver.curve = function (t, e) {
    const r = t.curveGhostPoint1,
        o = t.curveGhostPoint2,
        n = mercator.RowCurver.calculateCurveCenterPoint(t, e),
        i = t.chairCenters[0],
        s = t.chairCenters.slice(-1)[0],
        u = function (t) {
            return (t.x - r.x) / (o.x - r.x)
        },
        a = u(i),
        c = u(s),
        h = SVG().path("M" + r.x + "," + r.y + "Q" + n.x + "," + n.y + " " + o.x + ", " + o.y),
        v = new Bezier(r.x, r.y, n.x, n.y, o.x, o.y),
        C = v.split(a).left.length(),
        w = mercator.RowCurver.segmentLength(t, a, c, v);
    return t.chairCenters = t.chairCenters.map((t, e) => {
        const r = h.pointAt(C + w * e);
        return t.withX(r.x).withY(r.y)
    }), t
}, mercator.RowCurver.segmentLength = function (t, e, r, o) {
    if (1 === t.chairCenters.length) return 0;
    return o.split(e, r).length() / (t.chairCenters.length - 1)
}, mercator.RowCurver.applyCurving = function (t, e) {
    t.originalRow.applyCurving(e, t.curveGhostPoint1, t.curveGhostPoint2, t.chairCenters)
};
mercator.RowSmoothener = function (t, o) {
    this.rows = t, this.designer = o
}, mercator.RowSmoothener.prototype.smoothen = function (t, o = !1) {
    this.rows.forEach(e => {
        let n = this.flatten(e.points);
        null == t && (t = e.smoothness || mercator.Row.DEFAULT_SMOOTHNESS);
        let s = this.unflatten(this.calculateCurvePoints(n, t));
        e.smoothen(s, t, o)
    })
}, mercator.RowSmoothener.prototype.unsmoothen = function () {
    this.rows.forEach(t => {
        t.unsmoothen()
    })
}, mercator.RowSmoothener.prototype.flatten = function (t) {
    return t.flatMap(t => [t.x, t.y])
}, mercator.RowSmoothener.prototype.unflatten = function (t) {
    let o = [];
    for (let e = 0; e < t.length; e++) o.push(new mercator.Point(t[e], t[e + 1])), e++;
    return o
}, mercator.RowSmoothener.prototype.calculateCurvePoints = function (t, o) {
    const e = 12,
        n = o / 100;
    let s, r = 1,
        i = t.length,
        h = 0,
        l = new Float32Array((i - 2) * e + 2),
        a = new Float32Array(4 * (e + 2)),
        u = 4;
    for ((s = t.slice(0)).unshift(t[1]), s.unshift(t[0]), s.push(t[i - 2], t[i - 1]), a[0] = 1; r < e; r++) {
        let t = r / e,
            o = t * t,
            n = o * t,
            s = 2 * n,
            i = 3 * o;
        a[u++] = s - i + 1, a[u++] = i - s, a[u++] = n - 2 * o + t, a[u++] = n - o
    }
    return a[++u] = 1,
        function (t, o, s) {
            for (let r, i = 2; i < s; i += 2) {
                let s = t[i],
                    a = t[i + 1],
                    u = t[i + 2],
                    f = t[i + 3],
                    c = (u - t[i - 2]) * n,
                    p = (f - t[i - 1]) * n,
                    w = (t[i + 4] - s) * n,
                    m = (t[i + 5] - a) * n;
                for (r = 0; r < e; r++) {
                    let t = r << 2,
                        e = o[t],
                        n = o[t + 1],
                        i = o[t + 2],
                        S = o[t + 3];
                    l[h++] = e * s + n * u + i * c + S * w, l[h++] = e * a + n * f + i * p + S * m
                }
            }
        }(s, a, i), i = t.length - 2, l[h++] = t[i], l[h] = t[i + 1], l
};
mercator.RowSorter = function () { }, mercator.RowSorter.prototype.sort = function (e) {
    let o = mercator.RowsUtil.medianRotationAngle(e),
        t = mercator.RowsUtil.center(e),
        r = e.map(e => mercator.RowSorter.decompose(e)).map(e => mercator.RowSorter.rotateBy(e, -o, t)),
        n = _.sortBy(r, e => e.center.y).map(e => e.originalRow);
    return o >= 90 && o < 270 ? _.reverse(n) : n
}, mercator.RowSorter.decompose = function (e) {
    return {
        center: e.getCenter(),
        originalRow: e
    }
}, mercator.RowSorter.rotateBy = function (e, o, t) {
    return e.center = e.center.rotateAround(t, o), e
};
mercator.PolygonDrawingSnapper = function (n, t = []) {
    this.designer = n, this.flags = t
}, mercator.PolygonDrawingSnapper.prototype.snap = function (n, t, e) {
    if (e && this.closeToFirstPoint(t, e)) return this.snapped(e.first(), "firstCorner");
    if (this.flags.includes("closestCornerPoint")) {
        let n = this.closeEnoughCornerPoint(t);
        if (n && !this.designer.altWasPressed) return this.snapped(n, "closestCorner")
    }
    if (n && this.designer.shiftWasPressed) {
        let e = new mercator.Ray(n, t).snapToAngle(45, 0);
        return mercator.ChartDesigner.snapToGridEnabled && (e = e.snapLengthToMultipleOf(mercator.Point.SNAP_PRECISION)), this.snapped(e.end, "angle")
    }
    if (!this.designer.altWasPressed) {
        let [n, i, o] = this.alignedRayDoubleIntersectingPoint(t, this.getAllRaysGrouped(t));
        if (n) return this.snapped(n, "fullyAligned", i, o);
        let s = this.verticallyAlignedPoint(t, e),
            r = this.horizontallyAlignedPoint(t, e),
            [a, l] = this.alignedRayIntersectingPoint(t, this.getAllRays(t));
        if (a) return s ? this.snapped(s.withY(a.y), "rayAlignedAndVertical", l) : r ? this.snapped(r.withX(a.x), "rayAlignedAndHorizontal", l) : this.snapped(a, "rayAligned", l);
        if (e && e.length > 2) {
            let [n, i] = this.alignedSidesToStartingPoint(t, e);
            if (n) return this.snapped(n, "rayAligned", i)
        }
        if (s && r) return this.snapped(s.withY(r.y), "fullyAligned");
        if (s) return this.snapped(s.withY(t.y), "verticallyAligned");
        if (r) return this.snapped(r.withX(t.x), "horizontallyAligned")
    }
    return this.snapped(mercator.ChartDesigner.snapToGridEnabled ? t.snapToGrid() : t)
}, mercator.PolygonDrawingSnapper.prototype.getAllRays = function (n) {
    return this.designer.activeSubChart().sections.closestTo(n).flatMap(mercator.Section.toRays)
}, mercator.PolygonDrawingSnapper.prototype.getAllRaysGrouped = function (n) {
    return this.designer.activeSubChart().sections.closestTo(n).map(mercator.Section.toRays)
}, mercator.PolygonDrawingSnapper.prototype.snapThreshold = function () {
    return this.designer.zoomer.unzoom(7)
}, mercator.PolygonDrawingSnapper.prototype.closeEnoughCornerPoint = function (n) {
    var t = this.designer.activeSubChart().sections.cornerPointClosestTo(n, this.snapThreshold());
    if (t && t.point.distanceToPoint(n) < this.snapThreshold()) return t
}, mercator.PolygonDrawingSnapper.prototype.horizontallyAlignedPoint = function (n, t) {
    return this.alignedPoint(n, !1, t)
}, mercator.PolygonDrawingSnapper.prototype.verticallyAlignedPoint = function (n, t) {
    return this.alignedPoint(n, !0, t)
}, mercator.PolygonDrawingSnapper.prototype.alignedPoint = function (n, t = !1, e = []) {
    return this.findAlignedPoint(n, t, e, this.designer.zoomer.unzoom(500))
}, mercator.PolygonDrawingSnapper.prototype.findAlignedPoint = function (n, t, e, i) {
    return e.reduce((e, o) => {
        return (t ? o.verticalDistanceTo(n) : o.horizontalDistanceTo(n)) < this.snapThreshold() && o.distanceToPoint(n) < i ? o : e
    }, null)
}, mercator.PolygonDrawingSnapper.prototype.alignedRayDoubleIntersectingPoint = function (n, t) {
    const e = this.designer.zoomer.unzoom(6),
        i = this.designer.zoomer.unzoom(400);
    let o = (t = t.map(n => n.map(n => n.enlargeOnBothSides(i)))).flatMap(n => {
        let e = t.filter(t => t !== n).flatMap(n => n);
        return this.getIntersectingRaysAndPoint(n, e)
    });
    if (0 === o.length) return [null, null, null];
    o.forEach(t => {
        t.closestIntersection = t.intersections.reduce((t, e) => e.point.distanceToPoint(n) < t.point.distanceToPoint(n) ? e : t, t.intersections[0])
    });
    let s = o.reduce((t, e) => e.closestIntersection.point.distanceToPoint(n) < t.closestIntersection.point.distanceToPoint(n) ? e : t, o[0]),
        r = s.ray,
        a = s.closestIntersection.point;
    if (!r || n.distanceToPoint(a) > e) return [null, null, null];
    let l = s.closestIntersection.targetRay;
    return [a, r.enlargeOnBothSides(-i), l.enlargeOnBothSides(-i)]
}, mercator.PolygonDrawingSnapper.prototype.alignedRayIntersectingPoint = function (n, t) {
    const e = this.designer.zoomer.unzoom(6),
        i = this.designer.zoomer.unzoom(800);
    let o = [new mercator.Ray(n.addToX(-e), n.addToX(e)), new mercator.Ray(n.addToY(-e), n.addToY(e))],
        s = (t = t.map(n => n.enlargeOnBothSides(i))).filter(n => this.findIntersectingRayInRayArray(o, n)).sort((t, e) => t.distanceFromCenterToPoint(n) - e.distanceFromCenterToPoint(n))[0];
    return s ? [this.findIntersectionPointInRayArray(o, s), s.enlargeOnBothSides(-i)] : [null, null]
}, mercator.PolygonDrawingSnapper.prototype.alignedSidesToStartingPoint = function (n, t) {
    const e = this.designer.zoomer.unzoom(6),
        i = this.designer.zoomer.unzoom(400);
    let o = [new mercator.Ray(n.addToX(-e), n.addToX(e)), new mercator.Ray(n.addToY(-e), n.addToY(e))],
        s = t.map((n, e) => t[e + 1] ? new mercator.Ray(n, t[e + 1]) : null).nonFalsies().map(n => n.add(t[0].subtract(n.origin))).map(n => n.enlargeOnBothSides(i)).filter(n => this.findIntersectingRayInRayArray(o, n))[0];
    if (!s) return [null, null];
    let r = this.findIntersectionPointInRayArray(o, s);
    return n.distanceToPoint(r) > e ? [null, null] : [r, s.enlargeOnBothSides(-i)]
}, mercator.PolygonDrawingSnapper.prototype.findIntersectingRayInRayArray = function (n, t) {
    return n.find(n => n.intersectionWithRay(t))
}, mercator.PolygonDrawingSnapper.prototype.getIntersectingRaysAndPoint = function (n, t) {
    return n.map(n => ({
        ray: n,
        intersections: t.map(t => {
            let e = n.intersectionWithRay(t);
            return e ? {
                targetRay: t,
                point: e
            } : null
        }).filter(n => n)
    })).filter(n => n.intersections.length > 0)
}, mercator.PolygonDrawingSnapper.prototype.findIntersectionPointInRayArray = function (n, t) {
    return n.reduce((n, e) => n || e.intersectionWithRay(t), null)
}, mercator.PolygonDrawingSnapper.prototype.closeToFirstPoint = function (n, t) {
    return !(t.length < 3) && t.first().distanceToPoint(n) < this.snapThreshold()
}, mercator.PolygonDrawingSnapper.prototype.snapped = function (n, t, e, i) {
    return {
        snapCorner: "Point" !== n.type ? n : null,
        snapPoint: "Point" === n.type ? n : n.point,
        snapType: t,
        snapRay: e,
        snapSecondRay: i
    }
}, mercator.PolygonDrawingSnapper.snapColors = {
    firstCorner: "#FF0BA6",
    closestCorner: "#FF0BA6",
    rayAligned: mercator.PositionGuidesSupport.GUIDE_COLORS.magenta,
    rayAlignedAndVertical: mercator.PositionGuidesSupport.GUIDE_COLORS.magenta,
    rayAlignedAndHorizontal: mercator.PositionGuidesSupport.GUIDE_COLORS.magenta,
    verticallyAligned: mercator.PositionGuidesSupport.GUIDE_COLORS.green,
    horizontallyAligned: mercator.PositionGuidesSupport.GUIDE_COLORS.green,
    fullyAligned: mercator.PositionGuidesSupport.GUIDE_COLORS.magenta,
    angle: "#FFA700",
    default: "#0087FF"
};
class HotkeyUsageLogger {
    constructor(s, t, e) {
        this.dataCollectorUrl = s, this.user = t, this.chart = e, this.session = mercator.randomUuid()
    }
    log(s, t, e, o, r) {
        return fetch(`${this.dataCollectorUrl}/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this._toEvent(s, t, e, o, r))
        })
    }
    _toEvent(s, t, e, o, r) {
        return {
            eventType: "DESIGNER_HOTKEY_USED",
            metadata: {
                action: s,
                key: t,
                ctrlPressed: e,
                altPressed: o,
                shiftPressed: r,
                user: this.user,
                chart: this.chart,
                session: this.session
            }
        }
    }
}
class DummyHotkeyUsageLogger {
    log() { }
}
class Drawer {
    constructor(e) {
        this.designer = e
    }
    circle(e, t, r, n) {
        let l = this.designer.svg.circle(2 * r).attr({
            cx: e,
            cy: t,
            ...n
        });
        return l.raphaelElement = this.designer.paper.circleElement(l.node, e, t, r), l
    }
    image(e, t, r, n) {
        let l = this.designer.svg.image(e).size(t, r).attr(n || {});
        return l.raphaelElement = this.designer.paper.imageElement(l.node, e, n.x, n.y, t, r), l
    }
    text(e, t, r, n) {
        let l = this.designer.svg.plain(r).rebuild(!1).attr({
            x: e,
            y: t,
            "text-anchor": "middle",
            "dominant-baseline": "central",
            ...n
        });
        return l.raphaelElement = this.designer.paper.textElement(l.node, e, t, r), l
    }
    rect(e, t, r, n, l, i) {
        let s = this.designer.svg.rect(r, n).attr({
            rx: l,
            ry: l,
            r: l,
            fill: "none",
            stroke: "#000",
            x: e,
            y: t,
            ...i
        });
        return s.raphaelElement = this.designer.paper.pathElement(s.node, s), s
    }
    path(e, t) {
        let r = this.designer.svg.path(e).attr({
            fill: "none",
            stroke: "#000",
            ...t
        });
        return r.raphaelElement = this.designer.paper.pathElement(r.node, e), r
    }
    ellipse(e, t, r, n, l) {
        let i = this.designer.svg.ellipse(2 * r, 2 * n).attr({
            cx: e,
            cy: t,
            fill: "none",
            stroke: "#000",
            ...l
        });
        return i.raphaelElement = this.designer.paper.ellipseElement(i.node, e, t, r, r), i
    }
}
mercator.TableMousePointer = function (t) {
    this.designer = t, this.table = null, this.startPoint = null
}, mercator.TableMousePointer.prototype.showAt = function (t, e) {
    this.table ? this.table.transform(this.startPoint.vectorTo(t, this.designer).asTranslation()) : (this.startPoint = t, this.table = e(t, this.designer.activeSubChart()).draw().disableSelection().hideLabelAndChildLabels().drawPositionGuides().allElementsSet().startTransformation())
}, mercator.TableMousePointer.prototype.hide = function () {
    this.table && (this.table.remove(), this.table = null, this.startPoint = null)
};
mercator.Tables = function (e) {
    this.subChart = e, this.designer = e.designer, this.tables = []
}, mercator.Tables.prototype.add = function (e) {
    return this.tables.push(e), e.refreshOutOfBounds(!0), this.designer.requestStatsUpdate(), e
}, mercator.Tables.prototype.clone = function (e) {
    var t = new mercator.Tables(e);
    return t.tables = this.tables.map(function (t) {
        return t.clone(e)
    }), t
}, mercator.Tables.prototype.draw = function (e, t) {
    var s = t(e, this.subChart);
    return s.label = mercator.Tables.generateLabel(), s.draw(), s.playFlash(), this.add(s)
}, mercator.Tables.prototype.remove = function (e) {
    e.undraw(), this.tables.remove(e), this.designer.requestStatsUpdate()
}, mercator.Tables.prototype.allElementsSet = function () {
    return this.tables.map(function (e) {
        return e.allElementsSet()
    })
}, mercator.Tables.labelCounter = 1, mercator.Tables.generateLabel = function () {
    return (mercator.Tables.labelCounter++).toString()
}, mercator.Tables.chairWidth = 20, mercator.Tables.chairRadius = mercator.Tables.chairWidth / 2, mercator.Tables.awayFromTableOffset = .7 * mercator.Tables.chairRadius, mercator.Tables.fromJson = function (e, t) {
    var s = new mercator.Tables(t);
    return s.tables = e.map(function (e) {
        return "rectangular" === e.type ? mercator.RectTable.fromJson(e, t) : mercator.RoundTable.fromJson(e, t)
    }), s
}, mercator.Tables.createRoundTable = function (e, t) {
    const s = t.designer;
    let a = new mercator.RoundTable(e, void 0, t);
    return a.isOutOfBounds = !1, a.setNumberOfChairs(s.getToolProperty("RoundTable.chairs")), a.applySeatLabeling("SimpleNumbers", 0, !1), a
}, mercator.Tables.createRoundTableMousePointer = function (e, t) {
    let s = new mercator.RoundTable(e, void 0, t, !0);
    return s.setNumberOfChairs(t.designer.getToolProperty("RoundTable.chairs")), s
}, mercator.Tables.createRectTable = function (e, t) {
    const s = t.designer;
    let a = new mercator.RectTable(e, s.getToolProperty("RectTable.width"), s.getToolProperty("RectTable.height"), t);
    return a.isOutOfBounds = !1, a.setDistribution(Object.assign({}, s.getToolProperty("RectTable.chairs"))), a.applySeatLabeling("SimpleNumbers", 0, !1), a
}, mercator.Tables.createRectTableMousePointer = function (e, t) {
    const s = t.designer;
    let a = new mercator.RectTable(e, s.getToolProperty("RectTable.width"), s.getToolProperty("RectTable.height"), t, !0);
    return a.setDistribution(Object.assign({}, s.getToolProperty("RectTable.chairs"))), a
};
mercator.Table = function () {
    this.table = null, this.chairs = [], this.label = null, this.displayLabel = null, this.center = null, this.designer = null, this.subChart = null, this.rotationAngle = 0, this.seatLabeling = mercator.SeatLabeling.createDefaultSeatLabeling(), this.objectLabeling = mercator.ObjectLabeling.createDefaultTableLabeling(), this.sectionLabel = null, this.sectionDisplayedLabel = null, this.dummy = !1, this.labelShown = !1, this.bookAsAWhole = !1, this.published = !1
}, mercator.Table.prototype = new mercator.Object, mercator.Table.prototype.type = "table", mercator.Table.prototype.getInspectorSheets = function () {
    let e = mercator.Object.prototype.getInspectorSheets.call(this);
    const t = e.disabled || [];
    return this.disabledEditingBySafeMode() && (t.push("ObjectLabeling.label"), t.push("SectionLabeling.sectionLabel"), t.push("SeatLabeling")), this.anyChairsDisabledEditingBySafeMode() && t.push("SeatLabeling.label"), Object.assign(e, {
        "SectionLabeling.sectionLabel": this.sectionLabel,
        "SectionLabeling.sectionDisplayedLabel": this.sectionDisplayedLabel,
        "SectionLabeling.isNewObject": !this.published,
        "ObjectLabeling.label": this.hasLabel() ? this.label : null,
        "ObjectLabeling.displayLabel": this.displayLabel,
        "ObjectLabeling.visible": this.labelShown,
        "ObjectLabeling.isNewObject": !this.published,
        "ObjectLabeling.sequence": this.objectLabeling.algoName,
        "ObjectLabeling.prefix": this.objectLabeling.prefix,
        "ObjectLabeling.start": this.objectLabeling.startAtIndex + 1,
        "SeatLabeling.label": _.uniq(this.children().map(e => e.hasLabel() ? e.label : null)),
        "SeatLabeling.isNewObject": !this.published,
        "SeatLabeling.displayObjectType": this.getSeatDisplayObjectTypes(),
        "SeatLabeling.sequence": this.seatLabeling.algoName,
        "SeatLabeling.inverted": !0 === this.seatLabeling.isInverted,
        "SeatLabeling.start": this.seatLabeling.startAtIndex + 1,
        "SeatLabeling.useEndAt": this.seatLabeling.useEndAt,
        "Misc.bookAsAWhole": this.bookAsAWhole,
        disabled: t
    })
}, mercator.Table.prototype.initTable = function (e, t, i = !1) {
    this.designer = t.designer, this.subChart = t, this.center = e, this.dummy = i, this.labeler = new mercator.TableLabel(this, t.designer), this.init(t.designer, !0, void 0, i)
}, mercator.Table.prototype.getChairsCategoryKeys = mercator.Row.prototype.getChairsCategoryKeys, mercator.Table.prototype.getChairsCategories = mercator.Row.prototype.getChairsCategories, mercator.Table.prototype.applyCategory = mercator.Row.prototype.applyCategory, mercator.Table.prototype.removeCategory = mercator.Row.prototype.removeCategory, mercator.Table.prototype.applyElementAttributes = mercator.Row.prototype.applyElementAttributes, mercator.Table.prototype.anyChairsDisabledEditingBySafeMode = mercator.Row.prototype.anyChairsDisabledEditingBySafeMode, mercator.Table.prototype.setLabelShown = function (e) {
    this.labelShown !== e && (this.labelShown = e, this.labeler.redraw())
}, mercator.Table.prototype.getRotation = function () {
    return this.rotationAngle
}, mercator.Table.prototype.getLabelRotation = function () {
    return 0
}, mercator.Table.prototype.setRotationAngle = function (e) {
    var t = this;
    this.rotationAngle = wrapRotationAround(e), this.redrawIfNeeded(function () {
        t.repositionChairs()
    })
}, mercator.Table.prototype.setBookAsAWhole = function (e) {
    this.bookAsAWhole = e, this.redraw()
}, mercator.Table.prototype.getCenter = function () {
    return this.center
}, mercator.Table.prototype.animatedObject = function () {
    return this.table
}, mercator.Table.prototype.clearSeatLabels = function () {
    this.children().forEach(function (e) {
        e.clearLabel()
    })
}, mercator.Table.prototype.drawn = function () {
    return this.table
}, mercator.Table.prototype.determineDrawZIndex = function () {
    return this.bookAsAWhole ? this.chairs.reduce((e, t) => Math.max(e, t.zIndex + 1), this.zIndex) : this.zIndex
}, mercator.Table.prototype.draw = function () {
    if (this.subChart.isActive()) return this.chairs.forEach(e => e.draw()), this.table = this.drawTable(), this.isOutOfBounds && this.applyElementAttributes(), this.objectDrawn(), this
}, mercator.Table.prototype.undraw = function () {
    this.subChart.isActive() && (this.table && (this.table.remove(), this.table = null), this.chairs.forEach(function (e) {
        e.undraw()
    }), this.objectUndrawn())
}, mercator.Table.prototype.redraw = function () {
    this.undraw(), this.draw()
}, mercator.Table.prototype.redrawIfNeeded = function (e) {
    var t = this.drawn();
    t && this.undraw(), e(), t && this.draw()
}, mercator.Table.prototype.positionGuideBBox = function () {
    return mercator.Bbox.fromView(this.table.rbox(), this.designer)
}, mercator.Table.prototype.getPositionGuides = mercator.PositionGuidesSupport.prototype.getPositionGuidesForRect, mercator.Table.prototype.moved = function (e) {
    this.center = this.center.add(e), this.chairs.forEach(function (t) {
        t.moved(e)
    }), this.refreshOutOfBounds(), this.redraw()
}, mercator.Table.prototype.rotated = function (e, t) {
    this.center = this.center.rotateAround(e, t), this.chairs.forEach(function (i) {
        i.rotated(e, t)
    }), this.setRotationAngle(this.rotationAngle + t)
}, mercator.Table.prototype.labelPosition = function () {
    return this.center
}, mercator.Table.prototype.numberOfUnlabeledSeats = function () {
    return this.numberOfChairs() - this.numberOfLabeledSeats()
}, mercator.Table.prototype.numberOfLabeledSeats = function () {
    return this.chairs.reduce(function (e, t) {
        return t.hasLabel() ? ++e : e
    }, 0)
}, mercator.Table.prototype.setNumberOfChairs = function (e) {
    if (e > 0) {
        let t = this.getChairsCategories()[0];
        this.redrawIfNeeded(() => {
            for (this.chairs = this.chairs.splice(0, e); this.chairs.length < e;) {
                let e = new mercator.Chair(new mercator.Point(0, 0), this, this.subChart, this.dummy);
                e.applyCategory(t), e.isHighlighted = this.isHighlighted, this.chairs.push(e)
            }
            this.repositionChairs(), this.applySeatLabeling()
        })
    }
    return this
}, mercator.Table.prototype.visibleElementsSet = function () {
    return mercator.set(this.table, this.positionGuides, this.chairs.map(e => e.svgElement()), this.chairs.map(e => e.overlayIcon.visibleElementsSet()), this.labeler.asSet())
}, mercator.Table.prototype.visibleElementsSetWithoutChildren = function () {
    return mercator.set(this.table)
}, mercator.Table.prototype.remove = function () {
    this.subChart.tables.remove(this)
}, mercator.Table.prototype.canBeRemoved = function () {
    return !this.disabledEditingBySafeMode()
}, mercator.Table.prototype.removeChair = function (e) { }, mercator.Table.prototype.numberOfChairs = function () {
    return this.chairs.length
}, mercator.Table.prototype.totalPeopleCapacity = function () {
    return this.numberOfChairs()
}, mercator.Table.prototype.getChairs = function () {
    return this.chairs
}, mercator.Table.prototype.children = function () {
    return this.chairs
}, mercator.Table.prototype.uncategorizedChildren = function () {
    return this.chairs.filter(e => !e.category)
}, mercator.Table.prototype.chairsToJson = function () {
    return this.chairs.map(function (e) {
        return e.toJson()
    })
}, mercator.Table.prototype.determineFlashColor = function () {
    return mercator.Color.SELECTED_LIGHT.toCSS()
}, mercator.Table.prototype.determineDefaultColor = function () {
    const e = this.getChairs();
    if (!this.bookAsAWhole || 0 === e.length) return this.getNonSelectableColor(); {
        const t = e[0];
        if (t.category) return t.category.color
    }
    return mercator.Object.prototype.determineDefaultColor.apply(this)
}, mercator.Table.prototype.determineFillColor = function (e) {
    return void 0 === e && (e = this.determineBaseColor()), this.bookAsAWhole ? mercator.Object.prototype.determineFillColor.apply(this, [e]) : e
}, mercator.Table.prototype.determineStrokeColor = function () {
    return this.bookAsAWhole ? mercator.Object.prototype.determineStrokeColor.apply(this) : mercator.Color.create(this.determineBaseColor()).softenedBy(this.isDarkCanvas() ? 35 : 50, this.isDarkCanvas()).toCSS()
}, mercator.Table.prototype.determineStrokeWidth = function () {
    return this.bookAsAWhole ? mercator.Object.prototype.determineStrokeWidth.apply(this) : 4
}, mercator.Table.prototype.getNonSelectableColor = function () {
    return mercator.Table.NON_BOOKABLE_TABLE_COLOR[this.designer.getCanvasColorScheme()]
}, mercator.Table.prototype.determineNonHighlightedColor = function () {
    return this.determineDefaultColor()
}, mercator.Table.prototype.applySeatLabeling = mercator.Row.prototype.applySeatLabeling, mercator.Table.prototype.applyObjectLabeling = mercator.Row.prototype.applyObjectLabeling, mercator.Table.prototype.setSeatLabelingEndAt = mercator.Row.prototype.setSeatLabelingEndAt, mercator.Table.prototype.setSeatDisplayObjectType = mercator.Row.prototype.setSeatDisplayObjectType, mercator.Table.prototype.getSeatDisplayObjectTypes = mercator.Row.prototype.getSeatDisplayObjectTypes, mercator.Table.STROKE_WIDTH = 1, mercator.Table.NON_BOOKABLE_TABLE_COLOR = {
    light: "#e7e7e7",
    dark: "#393939"
};
mercator.RoundTable = function (e, t, s, i = !1) {
    this.center = e, this.radius = t, this.autoRadius = !t, this.openSpaces = 0, this.rotationAngle = 0, this.initTable(e, s, i)
}, mercator.RoundTable.prototype = new mercator.Table, mercator.RoundTable.prototype.shapeType = "round", mercator.RoundTable.prototype.getInspectorSheets = function () {
    return Object.assign({
        "Category.category": this.getChairsCategoryKeys(),
        "RoundTable.chairs": this.chairs.length,
        "RoundTable.minChairs": this.minSeatCount(),
        "RoundTable.openSpaces": this.openSpaces,
        "RoundTable.radius": Math.round(this.radius),
        "RoundTable.autoRadius": !this.radius || this.autoRadius,
        "Shape.rotation": this.rotationAngle
    }, mercator.Table.prototype.getInspectorSheets.call(this))
}, mercator.RoundTable.prototype.minSeatCount = function () {
    return this.disabledEditingBySafeMode() ? this.chairs.reduce((e, t) => e + (t.published ? 1 : 0), 0) : 1
}, mercator.RoundTable.prototype.flip = function (e) {
    return this.center = e.mirror(this.getCenter()), this.rotationAngle = wrapRotationAround(e.mirrorAngle(this.rotationAngle)), this.repositionChairs(), this.redraw(), this
}, mercator.RoundTable.prototype.duplicate = function (e) {
    return this.subChart.tables.add(this.clone(e))
}, mercator.RoundTable.prototype.clone = function (e) {
    var t = new mercator.RoundTable(this.center, this.radius, e);
    return t.chairs = this.chairs.map(function (e) {
        return e.clone(t)
    }), t.openSpaces = this.openSpaces, t.rotationAngle = this.rotationAngle, t.label = this.label, t.labelShown = this.labelShown, t.sectionLabel = this.sectionLabel, t.sectionDisplayedLabel = this.sectionDisplayedLabel, t.seatLabeling = this.seatLabeling.clone(), t.objectLabeling = this.objectLabeling.clone(), t.bookAsAWhole = this.bookAsAWhole, t
}, mercator.RoundTable.prototype.setNumberOfOpenSpaces = function (e) {
    return this.openSpaces = e, this.repositionChairs(), this
}, mercator.RoundTable.prototype.numberOfOpenSpaces = function () {
    return this.openSpaces
}, mercator.RoundTable.prototype.repositionChairs = function () {
    for (var e = 0; e < this.chairs.length; ++e) this.chairs[e].move(this.computeChairCenter(e))
}, mercator.RoundTable.prototype.simpleDraw = function (e) {
    let t = this.subChart.section.correctSectionContentsPosition(this.center),
        s = this.designer.drawer.circle(t.x, t.y, this.tableRadius(), {
            "stroke-width": 0,
            fill: e
        });
    return s.rotationAngle = this.rotationAngle, s
}, mercator.RoundTable.prototype.drawTable = function () {
    return this.designer.drawer.circle(this.center.x, this.center.y, this.tableRadius(), this.determineStyle()).toLayer("objectsLayer", this.designer, this.determineDrawZIndex()).applyZoom(this.designer)
}, mercator.RoundTable.prototype.tableRadius = function () {
    return this.autoRadius ? this.optimalTableRadius() : this.radius
}, mercator.RoundTable.prototype.optimalTableRadius = function () {
    var e = this.chairs.length * mercator.Tables.chairWidth * 1.25 / (2 * Math.PI);
    return Math.max(e, mercator.RoundTable.defaultRadius)
}, mercator.RoundTable.prototype.getRadius = mercator.RoundTable.prototype.tableRadius, mercator.RoundTable.prototype.setRadius = function (e) {
    var t = this;
    this.radius = e, this.redrawIfNeeded(function () {
        t.repositionChairs()
    })
}, mercator.RoundTable.prototype.setAutoRadius = function (e) {
    this.autoRadius = e, this.setRadius(this.autoRadius ? 0 : this.optimalTableRadius())
}, mercator.RoundTable.prototype.computeChairCenter = function (e) {
    var t = e / (this.chairs.length + this.openSpaces) * 360 + this.rotationAngle;
    return this.center.addToY(this.tableRadius() + mercator.Tables.awayFromTableOffset).rotateAround(this.center, t)
}, mercator.RoundTable.prototype.toJson = function () {
    return {
        center: this.center.toJson(this.subChart),
        radius: this.tableRadius(),
        autoRadius: this.autoRadius,
        seats: this.chairsToJson(),
        rotationAngle: this.rotationAngle,
        openSpaces: this.openSpaces,
        label: this.label,
        displayLabel: this.displayLabel,
        labelShown: this.labelShown,
        sectionLabel: this.sectionLabel,
        sectionDisplayedLabel: this.sectionDisplayedLabel,
        seatLabeling: this.seatLabeling.toJson(),
        objectLabeling: this.objectLabeling.toJson(),
        type: "round",
        objectType: "table",
        uuid: this.uuid,
        bookAsAWhole: this.bookAsAWhole,
        published: this.published
    }
}, mercator.RoundTable.prototype.coreBbox = function () {
    return new mercator.CircleShape(this.center, this.tableRadius()).bbox().enlarge(mercator.Table.STROKE_WIDTH)
}, mercator.RoundTable.prototype.bbox = function () {
    let e = this.coreBbox(),
        t = this.chairs.map(e => e.bbox());
    return mercator.Bbox.merged(t.concat([e]))
}, mercator.RoundTable.prototype.selectionArea = function () {
    const e = this.chairs.length > 0 ? mercator.Chair.width : 0;
    return new mercator.CircleShape(this.center, this.tableRadius() + e)
}, mercator.RoundTable.defaultNumberOfChairs = 6, mercator.RoundTable.defaultRadius = 15, mercator.RoundTable.prototype.getObjectTypeName = function () {
    return "roundTable"
}, mercator.RoundTable.fromJson = function (e, t) {
    var s = new mercator.RoundTable(mercator.Point.fromJson(e.center, t), e.radius, t);
    return s.chairs = e.seats.map(function (e) {
        return mercator.Chair.fromJson(e, s, t)
    }), s.openSpaces = e.openSpaces ? e.openSpaces : 0, s.autoRadius = e.autoRadius, s.rotationAngle = e.rotationAngle, s.label = e.label, s.displayLabel = e.displayLabel, s.labelShown = e.labelShown || !1, s.sectionLabel = e.sectionLabel || null, s.sectionDisplayedLabel = e.sectionDisplayedLabel || null, s.seatLabeling = mercator.SeatLabeling.fromJson(e.seatLabeling), s.objectLabeling = mercator.ObjectLabeling.fromJson(e.objectLabeling) || mercator.ObjectLabeling.createDefaultTableLabeling(), s.uuid = e.uuid, s.bookAsAWhole = e.bookAsAWhole || !1, s.published = void 0 !== e.published ? e.published : t.designer.isPublished(), s
};
mercator.RectTable = function (t, e, i, s, o = !1) {
    this.height = i, this.width = e, this.layout = null, this.chairs = [], this.distribution = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }, this.initTable(t, s, o)
}, mercator.RectTable.prototype = new mercator.Table, mercator.RectTable.prototype.shapeType = "rectangular", mercator.RectTable.prototype.getInspectorSheets = function () {
    return Object.assign({
        "Category.category": this.getChairsCategoryKeys(),
        "RectangularTable.chairsTop": this.distribution.top,
        "RectangularTable.chairsBottom": this.distribution.bottom,
        "RectangularTable.chairsLeft": this.distribution.left,
        "RectangularTable.chairsRight": this.distribution.right,
        "RectangularTable.minChairsTop": this.minSeatCount("top"),
        "RectangularTable.minChairsBottom": this.minSeatCount("bottom"),
        "RectangularTable.minChairsLeft": this.minSeatCount("left"),
        "RectangularTable.minChairsRight": this.minSeatCount("right"),
        "Shape.width": this.width,
        "Shape.height": this.height,
        "Shape.rotation": this.rotationAngle
    }, mercator.Table.prototype.getInspectorSheets.call(this))
}, mercator.RectTable.prototype.minSeatCount = function (t) {
    if (!this.disabledEditingBySafeMode()) return 0;
    const e = this.getChairsOnSide(t).length,
        i = this.chairs.length,
        s = this.chairs.reduce((t, e) => t + (e.published ? 1 : 0), 0);
    return i > s ? Math.max(0, e - (i - s)) : e
}, mercator.RectTable.prototype.setHeight = function (t) {
    var e = this;
    this.height = t, this.redrawIfNeeded(function () {
        e.repositionChairs()
    })
}, mercator.RectTable.prototype.setWidth = function (t) {
    var e = this;
    this.width = t, this.redrawIfNeeded(function () {
        e.repositionChairs()
    })
}, mercator.RectTable.prototype.simpleDraw = function (t) {
    let e = this.subChart.section.correctSectionContentsPosition(this.topLeft()),
        i = this.designer.drawer.rect(e.x, e.y, this.width, this.height, 0, {
            "stroke-width": 0,
            fill: t
        });
    return i.rotationAngle = this.rotationAngle, i
}, mercator.RectTable.prototype.drawTable = function () {
    const t = this.topLeft();
    return this.designer.drawer.rect(t.x, t.y, this.width, this.height, 6, this.determineStyle()).toLayer("objectsLayer", this.designer, this.determineDrawZIndex()).zoomAndRotateAround(this.rotationAngle, this.getCenter(), this.designer)
}, mercator.RectTable.prototype.flip = function (t) {
    return this.distribution = {
        top: this.distribution.top,
        right: this.distribution.left,
        bottom: this.distribution.bottom,
        left: this.distribution.right
    }, this.center = t.mirror(this.getCenter()), this.rotationAngle = wrapRotationAround(t.mirrorAngle(this.rotationAngle)), this.repositionChairs(), this.redraw(), this
}, mercator.RectTable.prototype.duplicate = function (t) {
    return this.subChart.tables.add(this.clone(t))
}, mercator.RectTable.prototype.clone = function (t) {
    var e = new mercator.RectTable(this.center, this.width, this.height, t);
    return e.distribution = Object.assign({}, this.distribution), e.chairs = this.chairs.map(function (t) {
        return t.clone(e)
    }), e.rotationAngle = this.rotationAngle, e.label = this.label, e.labelShown = this.labelShown, e.sectionLabel = this.sectionLabel, e.sectionDisplayedLabel = this.sectionDisplayedLabel, e.seatLabeling = this.seatLabeling.clone(), e.objectLabeling = this.objectLabeling.clone(), e.bookAsAWhole = this.bookAsAWhole, e
}, mercator.RectTable.prototype.calculateNewChairTotal = function (t, e) {
    return e ? this.getDistributionTotal() - this.distribution[e] + t : t
}, mercator.RectTable.prototype.setNumberOfChairs = function (t, e) {
    let i = this.calculateNewChairTotal(t, e);
    return i <= 0 && (t = 1, i = 1), e && (this.distribution[e] = t), mercator.Table.prototype.setNumberOfChairs.call(this, i)
}, mercator.RectTable.prototype.getDistributionTotal = function () {
    return Object.keys(this.distribution).reduce((t, e) => t + this.distribution[e], 0)
}, mercator.RectTable.prototype.setDistribution = function (t) {
    this.distribution = Object.assign({}, t), this.setNumberOfChairs(this.getDistributionTotal())
}, mercator.RectTable.prototype.upgradeLayout = function () {
    switch (this.layout) {
        case "oneSide":
            this.distribution = {
                top: 0,
                right: 0,
                bottom: this.chairs.length,
                left: 0
            };
            break;
        case "twoSides":
            this.distribution = {
                top: Math.ceil(this.chairs.length / 2),
                right: 0,
                bottom: Math.floor(this.chairs.length / 2),
                left: 0
            };
            break;
        case "bothHeads":
            this.distribution = {
                top: Math.ceil((this.chairs.length - 2) / 2),
                right: 1,
                bottom: Math.floor((this.chairs.length - 2) / 2),
                left: 1
            };
            break;
        default:
            return
    }
    this.layout = null
}, mercator.RectTable.prototype.repositionChairs = function () {
    this.chairs.forEach((t, e) => t.move(this.calculateLayoutPoint(e).rotateAround(this.center, this.rotationAngle)))
}, mercator.RectTable.prototype.topLeft = function () {
    return new mercator.Point(this.center.x - this.width / 2, this.center.y - this.height / 2)
}, mercator.RectTable.prototype.determineSeatSide = function (t) {
    const e = this.distribution,
        i = e.left,
        s = i + e.top,
        o = s + e.right,
        a = o + e.bottom;
    return t < i && e.left > 0 ? "left" : t < s && e.top > 0 ? "top" : t < o && e.right > 0 ? "right" : t < a && e.bottom > 0 ? "bottom" : null
}, mercator.RectTable.prototype.calculateLayoutPoint = function (t) {
    const e = this.topLeft(),
        i = this.width,
        s = this.height,
        o = this.distribution,
        a = o.left,
        n = a + o.top,
        r = n + o.right,
        h = this.determineSeatSide(t);
    let l;
    switch (h) {
        case "left":
            return l = s / o[h], e.addToX(-1 * mercator.Tables.awayFromTableOffset).addToY(s - l * t - l / 2);
        case "top":
            return l = i / o[h], e.addToY(-1 * mercator.Tables.awayFromTableOffset).addToX(l * (t - a) + l / 2);
        case "right":
            return l = s / o[h], e.addToX(i + mercator.Tables.awayFromTableOffset).addToY(l * (t - n) + l / 2);
        case "bottom":
            return l = i / o[h], e.addToY(s + mercator.Tables.awayFromTableOffset).addToX(i - l * (t - r) - l / 2);
        default:
            return e
    }
}, mercator.RectTable.prototype.getChairsOnSide = function (t) {
    return this.chairs.filter((e, i) => this.determineSeatSide(i) === t)
}, mercator.RectTable.prototype.toJson = function () {
    return {
        center: this.center.toJson(this.subChart),
        height: this.height,
        width: this.width,
        seats: this.chairsToJson(),
        rotationAngle: this.rotationAngle,
        label: this.label,
        displayLabel: this.displayLabel,
        labelShown: this.labelShown,
        sectionLabel: this.sectionLabel,
        sectionDisplayedLabel: this.sectionDisplayedLabel,
        seatLabeling: this.seatLabeling.toJson(),
        objectLabeling: this.objectLabeling.toJson(),
        type: "rectangular",
        objectType: "table",
        layout: this.layout,
        distribution: this.distribution,
        uuid: this.uuid,
        bookAsAWhole: this.bookAsAWhole,
        published: this.published
    }
}, mercator.RectTable.prototype.coreBbox = function () {
    return new mercator.RectangleShape(this.center, this.width, this.height, this.rotationAngle).bbox().enlarge(mercator.Table.STROKE_WIDTH)
}, mercator.RectTable.prototype.bbox = function () {
    let t = this.coreBbox(),
        e = this.chairs.map(t => t.bbox());
    return mercator.Bbox.merged(e.concat([t]))
}, mercator.RectTable.prototype.selectionArea = function () {
    const t = this.distribution.left > 0 || this.distribution.right > 0 ? 2 * mercator.Chair.width : 0,
        e = this.distribution.top > 0 || this.distribution.bottom > 0 ? 2 * mercator.Chair.width : 0;
    let i = this.width + t,
        s = this.height + e;
    return new mercator.RectangleShape(this.center, i, s, this.rotationAngle).toPolygon()
}, mercator.RectTable.defaultHeight = 36, mercator.RectTable.defaultWidth = 120, mercator.RectTable.defaultLayout = null, mercator.RectTable.defaultDistribution = {
    top: 4,
    right: 0,
    bottom: 4,
    left: 0
}, mercator.RectTable.prototype.getObjectTypeName = function () {
    return "rectangularTable"
}, mercator.RectTable.fromJson = function (t, e) {
    var i = new mercator.RectTable(mercator.Point.fromJson(t.center, e), t.width, t.height, e);
    return i.distribution = t.distribution, i.chairs = t.seats.map(t => mercator.Chair.fromJson(t, i, e)), i.layout = t.layout, i.upgradeLayout(), i.rotationAngle = t.rotationAngle, i.label = t.label, i.displayLabel = t.displayLabel, i.labelShown = t.labelShown || !1, i.sectionLabel = t.sectionLabel || null, i.sectionDisplayedLabel = t.sectionDisplayedLabel || null, i.seatLabeling = mercator.SeatLabeling.fromJson(t.seatLabeling), i.objectLabeling = mercator.ObjectLabeling.fromJson(t.objectLabeling) || mercator.ObjectLabeling.createDefaultTableLabeling(), i.uuid = t.uuid, i.bookAsAWhole = t.bookAsAWhole || !1, i.published = void 0 !== t.published ? t.published : e.designer.isPublished(), i
};
mercator.Booths = function (t) {
    this.subChart = t, this.designer = t.designer, this.booths = []
}, mercator.Booths.prototype.draw = function (t) {
    return t.label = mercator.Booths.generateLabel(), t.draw(), t.playFlash(), this.add(t)
}, mercator.Booths.prototype.add = function (t) {
    return t.published = !1, this.booths.push(t), t.refreshOutOfBounds(), this.designer.requestStatsUpdate(), t
}, mercator.Booths.prototype.clone = function (t) {
    var o = new mercator.Booths(t);
    return o.booths = this.booths.map(function (o) {
        return o.clone(t)
    }), o
}, mercator.Booths.prototype.remove = function (t) {
    t.undraw(), this.booths.remove(t), this.designer.requestStatsUpdate()
}, mercator.Booths.prototype.allElementsSet = function () {
    return this.booths.map(function (t) {
        return t.allElementsSet()
    })
}, mercator.Booths.prototype.toJson = function () {
    return this.booths.map(function (t) {
        return t.toJson()
    })
}, mercator.Booths.labelCounter = 1, mercator.Booths.generateLabel = function () {
    return (mercator.Booths.labelCounter++).toString()
}, mercator.Booths.fromJson = function (t, o) {
    var s = new mercator.Booths(o);
    return t && (s.booths = t.map(function (t) {
        return mercator.Booth.fromJson(t, o)
    })), s
};
mercator.BoothMousePointer = function (t) {
    this.designer = t, this.boothShapesSet = null, this.startPoint = null
}, mercator.BoothMousePointer.prototype.showAt = function (t, o, s) {
    if (this.booth) this.booth.transform(this.startPoint.vectorTo(t, this.designer).asTranslation());
    else {
        this.startPoint = t;
        let i = mercator.Booth.createDummyBoothForMousePointer(t, o, s, this.designer.activeSubChart());
        this.booth = i.draw().disableSelection().hideLabelAndChildLabels().drawPositionGuides().allElementsSet().startTransformation()
    }
}, mercator.BoothMousePointer.prototype.hide = function () {
    this.booth && (this.booth.remove(), this.booth = null, this.startPoint = null)
};
mercator.Booth = function (t, e, o, i, s = !1) {
    this.subChart = i, this.designer = i.designer, this.center = t, this.width = e, this.height = o, this.booth = null, this.line1 = null, this.line2 = null, this.rotationAngle = 0, this.category = null, this.label = mercator.LabelingTextInput.emptyLabel, this.displayLabel = null, this.objectLabeling = mercator.ObjectLabeling.createDefaultBoothLabeling(), this.sectionLabel = null, this.sectionDisplayedLabel = null, this.published = !1, this.init(this.designer, void 0, void 0, s)
}, mercator.Booth.prototype = new mercator.Object, mercator.Booth.prototype.type = "booth", mercator.Booth.prototype.getInspectorSheets = function () {
    const t = mercator.Object.prototype.getInspectorSheets.call(this),
        e = t.disabled || [];
    return this.disabledEditingBySafeMode() && (e.push("ObjectLabeling.label"), e.push("SectionLabeling.sectionLabel")), Object.assign(t, {
        "Category.category": this.category && this.category.key,
        "Shape.width": this.width,
        "Shape.height": this.height,
        "Shape.rotation": Math.round(this.rotationAngle),
        "SectionLabeling.sectionLabel": this.sectionLabel,
        "SectionLabeling.sectionDisplayedLabel": this.sectionDisplayedLabel,
        "SectionLabeling.isNewObject": !this.published,
        "ObjectLabeling.label": this.hasLabel() ? this.label : null,
        "ObjectLabeling.displayLabel": this.displayLabel,
        "ObjectLabeling.isNewObject": !this.published,
        "ObjectLabeling.sequence": this.objectLabeling.algoName,
        "ObjectLabeling.prefix": this.objectLabeling.prefix,
        "ObjectLabeling.start": this.objectLabeling.startAtIndex + 1,
        disabled: e
    })
}, mercator.Booth.prototype.getCenter = function () {
    return this.center
}, mercator.Booth.prototype.totalPeopleCapacity = function () {
    return 0
}, mercator.Booth.prototype.drawn = function () {
    return this.booth
}, mercator.Booth.prototype.svgElement = function () {
    return this.booth
}, mercator.Booth.prototype.applyCategory = function (t) {
    this.category = t
}, mercator.Booth.prototype.hasBookableCapabilities = function () {
    return !0
}, mercator.Booth.prototype.removeCategory = function () {
    this.category = null
}, mercator.Booth.prototype.simpleDraw = function (t) {
    let e = this.subChart.section.correctSectionContentsPosition(this.center.addToX(-this.width / 2).addToY(-this.height / 2)),
        o = this.designer.drawer.rect(e.x, e.y, this.width, this.height, 0, {
            opacity: 1,
            "stroke-width": 0,
            fill: t
        });
    return o.rotationAngle = this.rotationAngle, o.rotationCenter = this.getCenter(), o
}, mercator.Booth.prototype.draw = function () {
    if (this.subChart.isActive()) {
        var t = mercator.Booth.createShapes(this.center, this.width, this.height, this.determineBaseColor(), this.rotationAngle, this.zIndex, this.designer);
        return this.booth = t.booth, this.line1 = t.line1, this.line2 = t.line2, this.applyElementAttributes(), this.objectDrawn(), this
    }
}, mercator.Booth.prototype.determineDashesStrokeColor = function () {
    return this.designer.useLegacyAppearance() ? this.determineCanvasColor() : this.determineStrokeColor()
}, mercator.Booth.prototype.applyElementAttributes = function () {
    this.booth && this.booth.attr(this.determineStyle()), this.line1 && this.line2 && [this.line1, this.line2].forEach(t => t.attr({
        stroke: this.determineDashesStrokeColor()
    }))
}, mercator.Booth.prototype.flip = function (t) {
    return this.center = t.mirror(this.getCenter()), this.rotationAngle = wrapRotationAround(t.mirrorAngle(this.rotationAngle)), this.redraw(), this
}, mercator.Booth.prototype.duplicate = function (t) {
    return this.subChart.booths.add(this.clone(t))
}, mercator.Booth.prototype.clone = function (t) {
    var e = new mercator.Booth(this.center, this.width, this.height, t);
    return e.category = this.category, e.sectionLabel = this.sectionLabel, e.sectionDisplayedLabel = this.sectionDisplayedLabel, e.objectLabeling = this.objectLabeling.clone(), e.label = this.label, e.displayLabel = this.displayLabel, e.rotationAngle = this.rotationAngle, e
}, mercator.Booth.prototype.canBeRemoved = function () {
    return !this.disabledEditingBySafeMode()
}, mercator.Booth.prototype.moved = function (t) {
    this.center = this.center.add(t), this.refreshOutOfBounds(), this.redraw()
}, mercator.Booth.prototype.rotated = function (t, e) {
    this.center = this.center.rotateAround(t, e), this.rotationAngle = wrapRotationAround(this.rotationAngle + e), this.redraw()
}, mercator.Booth.prototype.setWidth = function (t) {
    this.width = t, this.redraw()
}, mercator.Booth.prototype.setHeight = function (t) {
    this.height = t, this.redraw()
}, mercator.Booth.prototype.setRotationAngle = function (t) {
    this.rotationAngle = wrapRotationAround(t), this.redraw()
}, mercator.Booth.prototype.undraw = function () {
    this.subChart.isActive() && (this.objectUndrawn(), this.selector.undraw(), this.booth && (this.booth.remove(), this.booth = null, this.line1.remove(), this.line1 = null, this.line2.remove(), this.line2 = null))
}, mercator.Booth.prototype.redraw = function () {
    this.drawn() && (this.undraw(), this.draw())
}, mercator.Booth.prototype.getPositionGuides = mercator.PositionGuidesSupport.prototype.getPositionGuidesForRect, mercator.Booth.prototype.animatedObject = function () {
    return this.booth
}, mercator.Booth.prototype.visibleElementsSet = function () {
    return mercator.set(this.booth, this.line1, this.line2, this.positionGuides)
}, mercator.Booth.prototype.remove = function () {
    this.subChart.booths.remove(this)
}, mercator.Booth.prototype.getRotation = function () {
    return 0
}, mercator.Booth.prototype.getLabelRotation = function () {
    return 0
}, mercator.Booth.prototype.labelPosition = function () {
    return this.center
}, mercator.Booth.prototype.applyObjectLabeling = mercator.Row.prototype.applyObjectLabeling, mercator.Booth.prototype.toJson = function () {
    return {
        label: this.label,
        displayLabel: this.displayLabel,
        sectionLabel: this.sectionLabel,
        sectionDisplayedLabel: this.sectionDisplayedLabel,
        objectLabeling: this.objectLabeling.toJson(),
        center: this.center.toJson(this.subChart),
        width: this.width,
        height: this.height,
        rotationAngle: this.rotationAngle,
        categoryLabel: mercator.Category.getLabel(this.category),
        categoryKey: mercator.Category.getKey(this.category),
        objectType: "booth",
        uuid: this.uuid,
        published: this.published
    }
}, mercator.Booth.prototype.bbox = function () {
    return new mercator.RectangleShape(this.center, this.width, this.height, this.rotationAngle).bbox().enlarge(mercator.Booth.STROKE_WIDTH)
}, mercator.Booth.prototype.selectionArea = function () {
    return new mercator.RectangleShape(this.center, this.width, this.height, this.rotationAngle).toPolygon().enlargeByAmount(mercator.Booth.STROKE_WIDTH)
}, mercator.Booth.defaultWidth = 50, mercator.Booth.defaultHeight = 50, mercator.Booth.STROKE_WIDTH = 1, mercator.Booth.prototype.getObjectTypeName = function () {
    return "booth"
}, mercator.Booth.fromJson = function (t, e) {
    var o = new mercator.Booth(mercator.Point.fromJson(t.center, e), t.width, t.height, e);
    return o.applyCategory(e.designer.categories.getCategory(t.categoryKey)), o.label = t.label, o.displayLabel = t.displayLabel, o.sectionLabel = t.sectionLabel || null, o.sectionDisplayedLabel = t.sectionDisplayedLabel || null, o.objectLabeling = mercator.ObjectLabeling.fromJson(t.objectLabeling) || mercator.ObjectLabeling.createDefaultBoothLabeling(), o.rotationAngle = t.rotationAngle, o.uuid = t.uuid, o.published = void 0 !== t.published ? t.published : e.designer.isPublished(), o
}, mercator.Booth.createBooth = function (t, e, o, i) {
    return new mercator.Booth(t, e, o, i)
}, mercator.Booth.createDummyBoothForMousePointer = function (t, e, o, i) {
    return new mercator.Booth(t, e, o, i, !0)
}, mercator.Booth.createShapes = function (t, e, o, i, s, n, a) {
    const h = {
        "stroke-width": 2,
        stroke: "#000",
        "stroke-dasharray": "4, 2",
        opacity: 1
    };
    var r = t.addToX(-e / 2).addToY(-o / 2);
    return {
        booth: a.drawer.rect(r.x, r.y, e, o, 4, {
            stroke: "black",
            fill: i
        }).toLayer("objectsLayer", a, n).zoomAndRotateAround(s, t, a),
        line1: a.drawLineThroughRay(new mercator.Ray(r.addToX(4).addToY(4), r.addToX(e - 4).addToY(o - 4))).attr(h).toLayer("objectsLayer", a, n).zoomAndRotateAround(s, t, a),
        line2: a.drawLineThroughRay(new mercator.Ray(r.addToX(e - 4).addToY(4), r.addToX(4).addToY(o - 4))).attr(h).toLayer("objectsLayer", a, n).zoomAndRotateAround(s, t, a)
    }
};
mercator.Icon = function (t, o, e, i, n = !1) {
    this.subChart = i, this.designer = i.designer, this.center = t, this.size = o || mercator.Icon.defaultIconSize, this.icon = null, this.rotationAngle = 0, this.opacity = 100, this.iconContent = e || mercator.Icon.defaultIcon, this.fillColor = mercator.ColorPalettes.defaults.ICON_FILL[this.designer.getCanvasColorScheme()], this.init(this.designer, !0, void 0, n)
}, mercator.Icon.prototype = new mercator.Object, mercator.Icon.prototype.type = "icon", mercator.Icon.CHOICES = ["restrooms-unisex", "restrooms-men", "restrooms-women", "stage", "entrance", "emergencyExit", "stairs", "foodCourt", "bar-cocktail", "bar-beer", "cafe", "warning"], mercator.Icon.defaultIconSize = 50, mercator.Icon.defaultIcon = "restrooms-unisex", mercator.Icon.prototype.getObjectTypeName = function () {
    return "icon"
}, mercator.Icon.prototype.getInspectorSheets = function () {
    return Object.assign(mercator.Object.prototype.getInspectorSheets.call(this), {
        "Icon.size": this.size,
        "Icon.icon": this.iconContent,
        "Icon.fillColor": this.fillColor,
        "Shape.rotation": Math.round(this.rotationAngle),
        "Shape.opacity": this.opacity
    })
}, mercator.Icon.prototype.toJson = function () {
    return {
        center: this.center.toJson(this.subChart),
        size: this.size,
        rotationAngle: this.rotationAngle,
        objectType: "icon",
        uuid: this.uuid,
        content: this.iconContent,
        opacity: this.opacity,
        fillColor: this.fillColor
    }
}, mercator.Icon.fromJson = function (t, o) {
    const e = new mercator.Icon(mercator.Point.fromJson(t.center, o), t.size, t.content, o);
    return e.rotationAngle = t.rotationAngle, e.uuid = t.uuid, e.opacity = t.opacity, e.fillColor = t.fillColor, e
}, mercator.Icon.prototype.getPositionGuides = mercator.PositionGuidesSupport.prototype.getPositionGuidesForRect, mercator.Icon.createDummyIconForMousePointer = function (t, o, e, i) {
    return new mercator.Icon(t, o, e, i, !0)
}, mercator.Icon.createIcon = function (t, o, e, i) {
    return new mercator.Icon(t, o, e, i)
}, mercator.Icon.prototype.draw = function () {
    if (this.subChart.isActive()) return this.icon = this.createShape(this.center, this.size, this.fillColor, this.rotationAngle, seatsUnicode(this.iconContent)), this.applyElementAttributes(), this.objectDrawn(), this
}, mercator.Icon.prototype.createShape = function (t, o, e, i, n) {
    return this.designer.drawer.text(t.x, t.y, n, {
        "font-size": o,
        "font-family": "seatsdesigner"
    }).toLayer("objectsLayer", this.designer, this.zIndex).zoomAndRotateAround(i, this.getCenter(), this.designer).applyZoom(this.designer)
}, mercator.Icon.prototype.bbox = function () {
    return new mercator.RectangleShape(this.center, this.size, this.size, this.rotationAngle).bbox()
}, mercator.Icon.prototype.visibleElementsSet = function () {
    return mercator.set(this.icon, this.positionGuides)
}, mercator.Icon.prototype.moved = function (t) {
    this.center = this.center.add(t), this.refreshOutOfBounds(), this.redraw()
}, mercator.Icon.prototype.redraw = function () {
    this.drawn() && (this.undraw(), this.draw())
}, mercator.Icon.prototype.drawn = function () {
    return this.icon
}, mercator.Icon.prototype.undraw = function () {
    this.subChart.isActive() && (this.objectUndrawn(), this.selector.undraw(), this.icon && (this.icon.remove(), this.icon = null))
}, mercator.Icon.prototype.determineStrokeWidth = function () {
    return 0
}, mercator.Icon.prototype.determineDefaultColor = function () {
    return this.fillColor
}, mercator.Icon.prototype.rotated = function (t, o) {
    this.center = this.center.rotateAround(t, o), this.rotationAngle = wrapRotationAround(this.rotationAngle + o), this.redraw()
}, mercator.Icon.prototype.flip = function (t) {
    return this.center = t.mirror(this.getCenter()), this.rotationAngle = wrapRotationAround(t.mirrorAngle(this.rotationAngle)), this.redraw(), this
}, mercator.Icon.prototype.setSize = function (t) {
    this.size = t, this.redraw()
}, mercator.Icon.prototype.setIcon = function (t) {
    this.iconContent = t, this.redraw()
}, mercator.Icon.prototype.setOpacity = function (t) {
    this.opacity = t, this.applyElementAttributes()
}, mercator.Icon.prototype.setRotationAngle = function (t) {
    this.rotationAngle = wrapRotationAround(t), this.redraw()
}, mercator.Icon.prototype.getCenter = function () {
    return this.center
}, mercator.Icon.prototype.getRotation = function () {
    return 0
}, mercator.Icon.prototype.remove = function () {
    this.subChart.icons.remove(this)
}, mercator.Icon.prototype.svgElement = function () {
    return this.icon
}, mercator.Icon.prototype.duplicate = function (t) {
    return this.subChart.icons.add(this.clone(t))
}, mercator.Icon.prototype.clone = function (t) {
    const o = new mercator.Icon(this.center, this.size, this.iconContent, t);
    return o.rotationAngle = this.rotationAngle, o.opacity = this.opacity, o.fillColor = this.fillColor, o
}, mercator.Icon.prototype.applyElementAttributes = function () {
    this.icon && this.icon.attr({
        fill: this.determineBaseColor(),
        "stroke-width": 1,
        opacity: this.determineOpacity()
    })
}, mercator.Icon.prototype.determineOpacity = function () {
    return this.opacity / 100
}, mercator.Icon.prototype.setSmartType = function (t) {
    this.iconContent = t, this.redraw()
}, mercator.Icon.prototype.setFillColor = function (t) {
    let o = new mercator.Color(this.fillColor),
        e = new mercator.Color(t);
    return this.fillColor = t, o.isDark() !== e.isDark() ? this.redraw() : this.applyElementAttributes(), this
};
mercator.Icons = function (t) {
    this.subChart = t, this.designer = t.designer, this.icons = []
}, mercator.Icons.prototype.draw = function (t) {
    return t.draw(), this.add(t)
}, mercator.Icons.prototype.add = function (t) {
    return this.icons.push(t), t.refreshOutOfBounds(), this.designer.requestStatsUpdate(), t
}, mercator.Icons.prototype.clone = function (t) {
    var n = new mercator.Icons(t);
    return n.icons = this.icons.map(function (n) {
        return n.clone(t)
    }), n
}, mercator.Icons.prototype.remove = function (t) {
    t.undraw(), this.icons.remove(t), this.designer.requestStatsUpdate()
}, mercator.Icons.prototype.allElementsSet = function () {
    return this.icons.map(function (t) {
        return t.allElementsSet()
    })
}, mercator.Icons.prototype.toJson = function () {
    return this.icons.map(function (t) {
        return t.toJson()
    })
}, mercator.Icons.fromJson = function (t, n) {
    var s = new mercator.Icons(n);
    return t && (s.icons = t.map(function (t) {
        return mercator.Icon.fromJson(t, n)
    })), s
};
mercator.IconMousePointer = function (t) {
    this.designer = t, this.startPoint = null, this.icon = null
}, mercator.IconMousePointer.prototype.showAt = function (t, i, o) {
    if (this.icon) this.icon.transform(this.startPoint.vectorTo(t, this.designer).asTranslation());
    else {
        this.startPoint = t;
        let s = mercator.Icon.createDummyIconForMousePointer(t, i, o, this.designer.activeSubChart());
        this.icon = s.draw().disableSelection().hideLabelAndChildLabels().drawPositionGuides().allElementsSet().startTransformation()
    }
}, mercator.IconMousePointer.prototype.hide = function () {
    this.icon && (this.icon.remove(), this.icon = null, this.startPoint = null)
};
mercator.Category = function (e, t, s, o) {
    this.label = e, this.color = t, this.accessible = s, this.key = o
}, mercator.Category.getLabel = function (e) {
    return e ? e.label : null
}, mercator.Category.prototype.setLabel = function (e) {
    this.label = e ? e.trim() : ""
}, mercator.Category.getKey = function (e) {
    return e ? e.key : null
}, mercator.Category.prototype.setKey = function (e) {
    this.key = e
}, mercator.Category.getAccessible = function (e) {
    return e ? e.accessible : null
};
mercator.Categories = function (e) {
    this.designer = e, this.categories = []
}, mercator.Categories.prototype.all = function () {
    return this.categories ? this.categories : []
}, mercator.Categories.prototype.setCategories = function (e) {
    this.categories = e
}, mercator.Categories.prototype.getCategory = function (e) {
    return this.categories.findOne(t => t.key == e) || null
}, mercator.Categories.prototype.removeCategory = function (e) {
    this.categories.splice(this.categories.indexOf(e), 1);
    var t = this.itemsWithCategory(e);
    t.forEach(function (e) {
        e.removeCategory()
    }), this.redrawParents(t), this.designer.renderUI()
}, mercator.Categories.prototype.reorderCategory = function (e, t) {
    let o = this.categories.splice(e, 1)[0];
    this.categories.splice(t, 0, o), this.designer.renderUI()
}, mercator.Categories.prototype.removeCategoryByKey = function (e) {
    this.removeCategory(this.getCategory(e))
}, mercator.Categories.prototype.changeKey = function (e, t) {
    return !this.getCategory(t) && (this.getCategory(e).setKey(t), this.designer.renderUI(), !0)
}, mercator.Categories.prototype.itemsWithCategory = function (e) {
    return this.designer.activeSubChart().categorisableObjects().filter(t => t.category === e || e && this.designer.activeSubChart().category === e && !t.category)
}, mercator.Categories.prototype.parentItemsWithCategory = function (e) {
    return this.designer.activeSubChart().categorisableParentObjects().filter(function (t) {
        return t.hasCategory(e)
    })
}, mercator.Categories.prototype.colorChanged = function (e) {
    this.parentItemsWithCategory(e).concat(this.itemsWithCategory(e)).forEach(e => {
        e.applyElementAttributes(), e.labeler && e.labeler.redraw()
    }), this.designer.renderUI()
}, mercator.Categories.prototype.accessibleChanged = function (e) {
    this.redrawParents(this.itemsWithCategory(e)), this.designer.renderUI()
}, mercator.Categories.prototype.toggleAccessibleByKey = function (e) {
    let t = this.getCategory(e);
    t.accessible = !t.accessible, this.accessibleChanged(t)
}, mercator.Categories.prototype.setColorByKey = function (e, t) {
    let o = this.getCategory(e);
    o.color = t, this.colorChanged(o)
}, mercator.Categories.prototype.setNameByKey = function (e, t) {
    let o = this.getCategory(e);
    o.setLabel(t), this.colorChanged(o)
}, mercator.Categories.prototype.applyCategoryToItems = function (e, t) {
    e.forEach(function (e) {
        e.applyCategory(t)
    }), this.redrawParents(e), this.designer.updateCategoriesStats(), this.designer.updateGlobalOnlyStats()
}, mercator.Categories.prototype.applyCategoryToItemsByKey = function (e, t) {
    this.applyCategoryToItems(e, this.getCategory(t))
}, mercator.Categories.prototype.removeCategoryToItems = function (e) {
    e.forEach(function (e) {
        e.removeCategory()
    }), this.redrawParents(e), this.designer.updateCategoriesStats(), this.designer.updateGlobalOnlyStats()
}, mercator.Categories.prototype.redrawParents = function (e) {
    this.parents(e).forEach(function (e) {
        e.redraw()
    })
}, mercator.Categories.prototype.refreshAttributesForParents = function (e) {
    this.parents(e).forEach(function (e) {
        e.applyElementAttributes()
    })
}, mercator.Categories.prototype.parents = function (e) {
    return e.map(function (e) {
        return e.parent ? e.parent : e
    }).uniques()
}, mercator.Categories.prototype.getNewPaletteColor = function () {
    const e = this.designer.getCanvasColorScheme(),
        t = mercator.ColorPalettes.sets.category,
        o = this.all().map(e => e.color.toUpperCase()),
        r = this.lastUsedPalette() || t[0];
    return [r].concat(t.filter(e => e.name !== r.name)).map(t => t.colors[e].filter(e => !o.includes(e))).flat()[0] || this.getRandomHexColor()
}, mercator.Categories.prototype.lastUsedPalette = function () {
    let e = mercator.ColorPalettes.sets.category,
        t = null;
    return this.all().map(e => e.color.toUpperCase()).reverse().forEach(o => {
        e.forEach(e => {
            !t && e.colors[this.designer.getCanvasColorScheme()].includes(o) && (t = e)
        })
    }), t
}, mercator.Categories.prototype.getRandomHexColor = function () {
    for (var e = "0123456789ABCDEF".split(""), t = "#", o = 0; o < 6; o++) t += e[Math.round(15 * Math.random())];
    return t
}, mercator.Categories.prototype.getMaxCategoryKey = function () {
    return this.categories.reduce((e, t) => isPositiveInteger(t.key) ? Math.max(e, t.key) : e, 0)
}, mercator.Categories.prototype.createCategory = function () {
    var e = new mercator.Category(d("new-category"), this.getNewPaletteColor(), !1, this.getMaxCategoryKey() + 1);
    return this.categories.push(e), this.designer.renderUI(), e
}, mercator.Categories.prototype.toJson = function () {
    return {
        list: this.categories,
        maxCategoryKey: this.getMaxCategoryKey()
    }
};
mercator.ShapedObject = class extends mercator.Object {
    constructor(e, t) {
        super(e, t), e && (this.doInit(e.designer, t, !0), this.subChart = e, mercator.ObjectLabelSupport.prototype.init.apply(this)), this.smartType = mercator.ShapedObject.SMART_TYPES[0], this.smartTypeVariation = null, this.label = "", this.fillColor = mercator.ColorPalettes.defaults.SHAPE_FILL[this.designer ? this.designer.getCanvasColorScheme() : "light"], this.autoStroke = !1, this.legacyRefreshStrokeColor = !1, this.strokeWidth = mercator.ShapedObject.DEFAULT_STROKE_WIDTH, this.refreshStrokeColor(), this.icon = this.smartType, this.labelSize = 16, this.type = "shape"
    }
    doInit(e, t, s) {
        this.shape = t, this.shapeType = t.type, this.shape.parent = this, this.init(e, s, !1)
    }
    iconSizeMultiplier() {
        return 1.8
    }
    getInspectorSheets() {
        let e = this.bbox(),
            t = Object.assign(mercator.Object.prototype.getInspectorSheets.call(this), {
                objectType: "shape",
                "Shape.cornerRadius": this.shape.cornerRadius,
                "Shape.fillColor": this.fillColor,
                "Shape.autoStroke": this.autoStroke,
                "Shape.strokeColor": this.strokeColor,
                "Shape.strokeWidth": this.strokeWidth,
                "Shape.rotation": this.shape.rotationAngle,
                "SmartLabel.smartType": this.smartType,
                "SmartLabel.smartTypeVariation": this.smartTypeVariation,
                "SmartLabel.caption": this.label,
                "SmartLabel.positionX": Math.round(this.labelHorizontalOffset / e.width * 100),
                "SmartLabel.positionY": Math.round(this.labelVerticalOffset / e.height * 100),
                "SmartLabel.size": this.labelSize
            });
        return t = void 0 !== this.shape.width || void 0 !== this.shape.radius1 ? Object.assign(t, {
            "Shape.width": this.shape.width || 2 * this.shape.radius1,
            "Shape.height": this.shape.height || 2 * this.shape.radius2
        }) : Object.assign({
            Transform: null,
            "Transform.cutoffAngle": this.shape.cutoffAngle
        }, t), void 0 !== this.shape.foreground && (t = Object.assign(t, {
            "Shape.foreground": this.shape.foreground
        })), t
    }
    refreshIcon() {
        this.setIcon(this.smartType.length > 0 ? this.smartTypeVariation ? [this.smartType, this.smartTypeVariation].join("-") : this.smartType : null)
    }
    setSmartType(e) {
        this.label === d(this.smartType) && this.changeLabel(d(e)), this.smartType = e;
        const t = mercator.ShapedObject.SMART_TYPES_VARIATIONS[this.smartType];
        this.smartTypeVariation = t ? t[0] : null, this.redraw(), this.refreshIcon()
    }
    setSmartTypeVariation(e) {
        this.smartTypeVariation = e, this.redraw(), this.refreshIcon()
    }
    setWidth(e) {
        this.shape.setWidth(e), this.redraw()
    }
    setHeight(e) {
        this.shape.setHeight(e), this.redraw()
    }
    setRotationAngle(e) {
        this.shape.setRotationAngle(e), this.redraw()
    }
    setAutoStroke(e) {
        this.autoStroke = e, this.autoStroke && this.refreshStrokeColor(), this.redraw()
    }
    setStrokeWidth(e) {
        return this.strokeWidth = e, this.applyElementAttributes(), this
    }
    setStrokeColor(e) {
        return this.strokeColor = e, this.applyElementAttributes(), this
    }
    setFillColor(e) {
        this.autoStroke && this.refreshStrokeColor(e);
        let t = new mercator.Color(this.fillColor),
            s = new mercator.Color(e);
        return this.fillColor = e, t.isDark() !== s.isDark() ? this.redraw() : this.applyElementAttributes(), this
    }
    setCornerRadius(e) {
        return this.shape.setCornerRadius && (this.shape.setCornerRadius(e), this.redraw()), this
    }
    refreshStrokeColor(e = this.fillColor) {
        const t = new mercator.Color(e),
            s = this.designer && "light" !== this.designer.getCanvasColorScheme();
        this.strokeColor = (this.legacyRefreshStrokeColor ? t.darkened() : t.softened(s)).cssString
    }
    duplicate() {
        return this.designer.activeSubChart().shapes.add(this.clone(this.subChart))
    }
    selectionElements() {
        return this.shape.selectionElements()
    }
    determineMinScaledStrokeWidth() {
        return 0
    }
    determineMaxScaledStrokeWidth() {
        return 100
    }
    determineStrokeWidthWithoutScaling() {
        return this.autoStroke ? 3 : this.strokeWidth
    }
    determineStrokeWidth() {
        const e = this.determineStrokeWidthWithoutScaling(),
            t = this.autoStroke ? this.applyScale(e) : e;
        return Math.max(this.determineMinScaledStrokeWidth(), Math.min(this.determineMaxScaledStrokeWidth(), t))
    }
    clone(e) {
        const t = new mercator.ShapedObject(e, this.shape.clone());
        return mercator.ShapedObject.properties.forEach(e => t[e] = this[e]), t
    }
    remove() {
        this.designer.activeSubChart().shapes.remove(this), this.undraw()
    }
    polygonSupport() {
        return "polygon" === this.shape.type
    }
    center() {
        return this.shape.getCenter()
    }
    getCenter() {
        return this.center()
    }
    centroid(e) {
        return this.shape.getCentroid(e)
    }
    verticallyOriented() {
        let e = this.getShape();
        if (e.rotationAngle) return e.width < e.height; {
            let e = this.bbox();
            return e.width < e.height
        }
    }
    moved(e) {
        this.shape.move(e), this.refreshOutOfBounds(), this.redraw(), this.refreshStrokeSelector(), this.refreshNodes(), this.refreshNodesSides()
    }
    rotated(e, t) {
        this.shape.rotated(e, t), this.redraw()
    }
    enlarge(e, t = this.bbox().center(), s = !1) {
        if (!this.getShape().points) return;
        s && !this.enlargePreviewPoints && (this.enlargePreviewPoints = this.pointsAsPoints());
        let o = this.bbox().center();
        if (this.getShape().points.forEach((s, o) => {
            let i = new mercator.Ray(t, this.enlargePreviewPoints ? this.enlargePreviewPoints[o] : s.point);
            s.point = i.enlargeByFactor(e).end
        }), this.getShape().calculateSmoothenedPoints(), s) {
            if (this.shape.undraw(), this.drawShape(), this.subChartContents) {
                let e = this.bbox().center().subtract(o);
                this.subChartContents.translate(e.x, e.y)
            }
        } else this.redraw(), this.refreshStrokeSelector(), this.refreshNodes(), this.refreshNodesSides(), this.enlargePreviewPoints = null
    }
    svgElement() {
        return this.shape.shapeElement
    }
    flip(e) {
        return this.getShape().flip(e), this.redraw(), this.refreshStrokeSelector(), this.refreshNodes(), this.refreshNodesSides(), this
    }
    applyZoom() {
        this.overlayIcon && this.overlayIcon.applyZoom(), this.getShape().shapeElement.attr("stroke-width", this.determineStrokeWidth()), mercator.Object.prototype.applyZoom.apply(this)
    }
    visibleElementsSet() {
        let e = pushAll(mercator.set(this.shape.visibleElementsSet(), this.positionGuides), this.objectLabel.visibleElementsSet());
        return this.overlayIcon && pushAll(e, this.overlayIcon.visibleElementsSet()), e
    }
    visibleElementsSetWithoutChildren() {
        return mercator.set(this.shape.visibleElementsSet())
    }
    redraw() {
        this.undraw(), this.draw()
    }
    draw() {
        if (this.subChart.isActive()) return this.drawShape(), this.objectLabel.redraw(), this.overlayIcon && (this.overlayIcon.redraw(), this.refreshOverlayIcon()), this.objectDrawn(), this
    }
    drawShape() {
        this.shape.draw(this.determineStyle(), this.getLayer(), this.zIndex)
    }
    determineFillColor() {
        return void 0 !== this.fillColor ? this.fillColor : super.determineFillColor()
    }
    getLayer() {
        return "section" !== this.type && "generalAdmission" !== this.type && (this.layer = this.shape.foreground ? "shapesForegroundLayer" : "shapesBackgroundLayer"), this.layer
    }
    setForeground(e) {
        this.shape.foreground = e, this.redraw()
    }
    undraw() {
        if (this.subChart.isActive()) return this.objectLabel.undraw(), this.shape.undraw(), this.overlayIcon && this.overlayIcon.undraw(), this.objectUndrawn(), this
    }
    getLabelText() {
        return this.displayLabel ? this.displayLabel : (this.sectionLabel ? `${this.sectionLabel}-` : "") + this.label
    }
    getShape() {
        return this.shape
    }
    createSelectionRectangle() {
        return this.shape.makeShape().attr({
            fill: "black",
            opacity: 0
        }).zoomAndRotateAround(this.shape.rotationAngle || 0, this.getCenter(), this.designer)
    }
    determineLabelColor() {
        if (this.isCategorisable()) return super.determineLabelColor();
        return new mercator.Color(this.determineNonHighlightedColor()).brehaut().getLuminance() < .7 ? "white" : mercator.Color.create(this.determineFillColor()).muchBolder().toCSS()
    }
    determineDefaultColor() {
        return this.fillColor || super.determineDefaultColor()
    }
    determineStrokeColor() {
        let e = mercator.Color.create(this.determineBaseStrokeColor());
        return this.isPressed ? e.muchDarkened().cssString : this.isPainted ? e.selected().cssString : e.cssString
    }
    determineBaseStrokeColor() {
        return this.isOutOfBounds ? mercator.Object.ERROR_COLOR : this.isCategorisable() ? this.determineNonHighlightedColor() : this.autoStroke ? mercator.Color.create(this.determineNonHighlightedColor()).darkened().cssString : this.strokeColor
    }
    bbox() {
        return this.shape.bbox().enlarge(this.determineStrokeWidthWithoutScaling() / 2)
    }
    selectionArea() {
        return this.shape.selectionArea()
    }
    pointsAsPoints() {
        return this.getPoints().map(mercator.PolygonCornerPoint.toPoint)
    }
    smoothenedPointsAsPoints() {
        return this.shape.cutoffAngle ? new mercator.PolygonSmoothener(this.pointsAsPoints()).smoothen(this.cutoffAngle, 3) : this.pointsAsPoints()
    }
    previewCutoffAngle(e) {
        this.shape.setCutoffAngle(e), this.undraw(), this.drawShape()
    }
    setCutoffAngle(e) {
        this.shape.setCutoffAngle(e), this.redraw()
    }
    simpleDraw(e, t = null) {
        return this.shape.simpleDraw(e, t)
    }
    changeLabel(e) {
        mercator.ObjectLabelSupport.prototype.changeLabel.apply(this, [e]), mercator.ObjectLabelSupport.prototype.refreshLabel.apply(this), this.overlayIcon && this.overlayIcon.setLabel(this.getDisplayLabelOrLabel())
    }
    changeDisplayLabel(e) {
        mercator.ObjectLabelSupport.prototype.changeDisplayLabel.apply(this, [e]), this.overlayIcon && this.overlayIcon.setLabel(this.getDisplayLabelOrLabel())
    }
    static toCornerPoints(e) {
        return e.getPoints()
    }
    static toPoints(e) {
        return e.pointsAsPoints()
    }
    toJson() {
        let e = {
            uuid: this.uuid,
            objectType: mercator.ShapedObject.type
        };
        return mercator.ShapedObject.properties.forEach(t => e[t] = this[t]), this.shape.extendJson(e), e
    }
    static fromJson(e, t) {
        let s = new mercator.ShapedObject(t, mercator.ShapeFromJson(e, t));
        return mercator.ShapedObject.properties.forEach(t => {
            void 0 !== e[t] && (s[t] = e[t])
        }), void 0 === e.autoStroke && (s.autoStroke = !1), s
    }
}, mercator.ShapedObject.prototype.getObjectTypeName = function () {
    return "shapedObject"
}, mercator.ShapedObject.prototype.showVFS = function () {
    this.refreshOverlayIcon()
}, mercator.ShapedObject.prototype.hideVFS = function () {
    this.refreshOverlayIcon()
}, mercator.ShapedObject.prototype.refreshOverlayIcon = function () {
    this.overlayIcon && (this.designer.viewFromSeatsShown ? (this.viewFromYourSeatImage ? this.overlayIcon.showIcon("view-from-seats", "highlight", () => this.designer.uiEvents.showObjectInspectorSheet(this, "ViewFromSeat"), this.getDisplayLabelOrLabel()) : this.overlayIcon.showIcon("view-from-seats", "blur", () => this.designer.uiEvents.showObjectInspectorSheet(this, "ViewFromSeat"), this.getDisplayLabelOrLabel()), this.objectLabel.hide()) : (this.overlayIcon.hide(), this.objectLabel.show()))
}, mercator.ShapeFromJson = function (e, t) {
    var s = e.type;
    if ("circle" === s) return mercator.ShapedObjects.Circle.fromJson(e, t);
    if ("rectangle" === s) return mercator.ShapedObjects.Rectangle.fromJson(e, t);
    if ("polygon" === s) return mercator.ShapedObjects.Polygon.fromJson(e, t);
    throw new Error("Unkown shape type: " + e.type)
}, mercator.ShapedObject.prototype.refreshLabel = mercator.ObjectLabelSupport.prototype.refreshLabel, mercator.ShapedObject.prototype.redrawLabel = mercator.ObjectLabelSupport.prototype.redrawLabel, mercator.ShapedObject.prototype.setIcon = mercator.ObjectLabelSupport.prototype.setIcon, mercator.ShapedObject.prototype.showLabel = mercator.ObjectLabelSupport.prototype.showLabel, mercator.ShapedObject.prototype.hideLabel = mercator.ObjectLabelSupport.prototype.hideLabel, mercator.ShapedObject.prototype.labelPosition = mercator.ObjectLabelSupport.prototype.labelPosition, mercator.ShapedObject.prototype.setLabelSize = mercator.ObjectLabelSupport.prototype.setLabelSize, mercator.ShapedObject.prototype.setLabelHorizontalOffset = mercator.ObjectLabelSupport.prototype.setLabelHorizontalOffset, mercator.ShapedObject.prototype.setLabelVerticalOffset = mercator.ObjectLabelSupport.prototype.setLabelVerticalOffset, mercator.ShapedObject.prototype.setLabelHorizontalOffsetPerc = mercator.ObjectLabelSupport.prototype.setLabelHorizontalOffsetPerc, mercator.ShapedObject.prototype.setLabelVerticalOffsetPerc = mercator.ObjectLabelSupport.prototype.setLabelVerticalOffsetPerc, mercator.ShapedObject.prototype.getLabelIcon = mercator.ObjectLabelSupport.prototype.getLabelIcon, mercator.ShapedObject.prototype.applyElementAttributes = mercator.ObjectLabelSupport.prototype.applyElementAttributes, mercator.ShapedObject.prototype.getPoints = mercator.PolygonSupport.getPoints, mercator.ShapedObject.prototype.addPoint = mercator.PolygonSupport.addPoint, mercator.ShapedObject.prototype.removePoint = mercator.PolygonSupport.removePoint, mercator.ShapedObject.prototype.showNodes = mercator.PolygonSupport.showNodes, mercator.ShapedObject.prototype.hideNodes = mercator.PolygonSupport.hideNodes, mercator.ShapedObject.prototype.refreshNodes = mercator.PolygonSupport.refreshNodes, mercator.ShapedObject.prototype.refreshNodesSides = mercator.PolygonSupport.refreshNodesSides, mercator.ShapedObject.prototype.showNodesSides = mercator.PolygonSupport.showNodesSides, mercator.ShapedObject.prototype.hideNodesSides = mercator.PolygonSupport.hideNodesSides, mercator.ShapedObject.prototype.showStrokeSelector = mercator.PolygonSupport.showStrokeSelector, mercator.ShapedObject.prototype.hideStrokeSelector = mercator.PolygonSupport.hideStrokeSelector, mercator.ShapedObject.prototype.refreshStrokeSelector = mercator.PolygonSupport.refreshStrokeSelector, mercator.ShapedObject.prototype.showNodePlaceholders = mercator.PolygonSupport.showNodePlaceholders, mercator.ShapedObject.prototype.hideNodePlaceholders = mercator.PolygonSupport.hideNodePlaceholders, mercator.ShapedObject.prototype.refreshNodePlaceholders = mercator.PolygonSupport.refreshNodePlaceholders, mercator.ShapedObject.prototype.pathString = mercator.PolygonSupport.pathString, mercator.ShapedObject.prototype.hideOverlays = mercator.PolygonSupport.hideOverlays, mercator.ShapedObject.prototype.restoreOverlays = mercator.PolygonSupport.restoreOverlays, mercator.ShapedObject.prototype.getPositionGuides = mercator.PositionGuidesSupport.prototype.getPositionGuidesForRect, mercator.ShapedObject.SMART_TYPES = ["", "stage", "entrance", "emergencyExit", "stairs", "restrooms", "foodCourt", "bar", "cafe"], mercator.ShapedObject.SMART_TYPES_VARIATIONS = {
    restrooms: ["unisex", "men", "women"],
    bar: ["cocktail", "beer"]
}, mercator.ShapedObject.DEFAULT_STROKE_WIDTH = 0, mercator.ShapedObject.type = "shape", mercator.ShapedObject.properties = ["uuid", "label", "smartType", "smartTypeVariation", "fillColor", "strokeColor", "strokeWidth", "autoStroke", "labelSize", "icon", "labelHorizontalOffset", "labelVerticalOffset"];
mercator.PolygonSmoothener = class {
    constructor(t, i = !0) {
        this.closePolygon = i, this.initializePoints(t)
    }
    initializePoints(t) {
        this.points = [];
        let i = t.length;
        for (let o = 0; o <= i - 1; o++) 0 === o && this.closePolygon ? this.points.push(new mercator.PolygonSmoothener.PointWithSiblings(t[o], t[i - 1], t[1])) : o === i - 1 && this.closePolygon ? this.points.push(new mercator.PolygonSmoothener.PointWithSiblings(t[o], t[i - 2], t[0])) : this.points.push(new mercator.PolygonSmoothener.PointWithSiblings(t[o], t[o - 1], t[o + 1]))
    }
    cutCorners(t) {
        let i = [];
        for (let o = 0; o <= this.points.length - 1; o++) this.points[o].angleInDegrees() >= t ? (i.push(this.points[o].pointAtDistanceFromPreviousPoint()), i.push(this.points[o].pointAtDistanceFromNextPoint())) : i.push(this.points[o].point);
        this.initializePoints(i)
    }
    hasSharpCorners(t) {
        for (let i = 0; i < this.points.length - 1; i++)
            if (this.points[i].angleInDegrees() >= t) return !0;
        return !1
    }
    smoothen(t, i = 5) {
        let o = 0;
        for (; this.hasSharpCorners(t) && o < i;) o++, this.cutCorners(t);
        return this.points.map(t => t.point)
    }
}, mercator.LineSmoothener = class extends mercator.PolygonSmoothener {
    constructor(t) {
        super(t, !1)
    }
}, mercator.PolygonSmoothener.DEFAULT_CUTOFF_ANGLE = 150, mercator.PolygonSmoothener.PointWithSiblings = class {
    constructor(t, i, o) {
        this.point = t, this.previousPoint = i, this.nextPoint = o
    }
    angleInDegrees() {
        let t = this.point;
        if (this.previousPoint && this.nextPoint) {
            const i = Math.sqrt(Math.pow(t.x - this.previousPoint.x, 2) + Math.pow(t.y - this.previousPoint.y, 2)),
                o = Math.sqrt(Math.pow(t.x - this.nextPoint.x, 2) + Math.pow(t.y - this.nextPoint.y, 2)),
                s = Math.sqrt(Math.pow(this.nextPoint.x - this.previousPoint.x, 2) + Math.pow(this.nextPoint.y - this.previousPoint.y, 2));
            return Math.acos((o * o + i * i - s * s) / (2 * o * i)) * (180 / Math.PI)
        }
    }
    pointAtDistanceFromPreviousPoint() {
        return new mercator.Point(.25 * this.previousPoint.x + .75 * this.point.x, .25 * this.previousPoint.y + .75 * this.point.y)
    }
    pointAtDistanceFromNextPoint() {
        return new mercator.Point(.75 * this.point.x + .25 * this.nextPoint.x, .75 * this.point.y + .25 * this.nextPoint.y)
    }
};
mercator.ShapedObjects = class {
    constructor(s) {
        this.subChart = s, this.designer = s.designer, this.shapes = []
    }
    add(s) {
        return this.shapes.push(s), s.refreshOutOfBounds(), this.designer.requestStatsUpdate(), s
    }
    remove(s) {
        this.shapes.splice(this.shapes.indexOf(s), 1), this.designer.requestStatsUpdate()
    }
    clone(s) {
        var e = new mercator.ShapedObjects(s);
        return e.shapes = this.shapes.map(e => e.clone(s)), e
    }
    toJson() {
        return this.shapes.map(s => s.toJson())
    }
    draw() {
        this.shapes.forEach(s => s.draw())
    }
    undraw() {
        this.shapes.forEach(s => s.undraw())
    }
    allElementsSet() {
        return this.shapes.map(s => s.allElementsSet())
    }
    static fromJson(s, e) {
        var t = new mercator.ShapedObjects(e);
        return s && s.forEach(s => t.add(mercator.ShapedObject.fromJson(s, e))), t
    }
};
mercator.ShapedObjects.AbstractShape = function () {
    this.shapeElement = null
}, mercator.ShapedObjects.AbstractShape.prototype.getInspectorSheets = function () {
    return {}
}, mercator.ShapedObjects.AbstractShape.prototype.draw = function (t, e, s) {
    this.shapeElement = this.makeShape().attr(t).toLayer(e, this.designer, s).zoomAndRotateAround(this.rotationAngle || 0, this.getCenter(), this.designer)
}, mercator.ShapedObjects.AbstractShape.prototype.undraw = function () {
    this.shapeElement && this.shapeElement.remove()
}, mercator.ShapedObjects.AbstractShape.prototype.getWidth = function () {
    return null
}, mercator.ShapedObjects.AbstractShape.prototype.getHeight = function () {
    return null
}, mercator.ShapedObjects.AbstractShape.prototype.makePointsMovable = function () { }, mercator.ShapedObjects.AbstractShape.prototype.makePointsNotMovable = function () { }, mercator.ShapedObjects.AbstractShape.prototype.selectionElements = function () {
    return []
}, mercator.ShapedObjects.AbstractShape.prototype.visibleElementsSet = function () {
    return [this.shapeElement]
};
mercator.ShapedObjects.Circle = function (t, e, i, s, r, o = !1) {
    this.subChart = t, this.designer = t.designer, this.radius1 = i, this.radius2 = s, this.center = e, this.rotationAngle = getWithDefault(r, 0), this.foreground = o
}, mercator.ShapedObjects.Circle.prototype = new mercator.ShapedObjects.AbstractShape, mercator.ShapedObjects.Circle.prototype.type = "ellipse", mercator.ShapedObjects.Circle.toolName = "ellipse", mercator.ShapedObjects.Circle.prototype.getInspectorSheets = function () {
    return Object.assign(mercator.Object.prototype.getInspectorSheets.call(this), {
        "Shape.strokeWidth": this.parent.strokeWidth,
        "Shape.strokeColor": this.parent.strokeColor,
        "Shape.fillColor": this.parent.fillColor,
        "Shape.width": this.getWidth(),
        "Shape.height": this.getHeight(),
        "Shape.rotation": this.rotationAngle
    })
}, mercator.ShapedObjects.Circle.prototype.makeShape = function () {
    return this.designer.drawer.ellipse(this.center.x, this.center.y, this.radius1, this.radius2, {
        fill: "white"
    })
}, mercator.ShapedObjects.Circle.prototype.setWidth = function (t) {
    return this.radius1 = t / 2, this
}, mercator.ShapedObjects.Circle.prototype.setHeight = function (t) {
    return this.radius2 = t / 2, this
}, mercator.ShapedObjects.Circle.prototype.getWidth = function () {
    return 2 * this.radius1
}, mercator.ShapedObjects.Circle.prototype.getHeight = function () {
    return 2 * this.radius2
}, mercator.ShapedObjects.Circle.prototype.setRotationAngle = function (t) {
    return this.rotationAngle = t, this
}, mercator.ShapedObjects.Circle.prototype.flip = function (t) {
    return this.moveTo(t.mirror(this.getCenter())), this.rotationAngle = wrapRotationAround(t.mirrorAngle(this.rotationAngle)), this
}, mercator.ShapedObjects.Circle.prototype.clone = function () {
    return new mercator.ShapedObjects.Circle(this.subChart, this.center, this.radius1, this.radius2, this.rotationAngle, this.foreground)
}, mercator.ShapedObjects.Circle.prototype.getCenter = function () {
    return this.center
}, mercator.ShapedObjects.Circle.prototype.getCentroid = function () {
    return this.getCenter()
}, mercator.ShapedObjects.Circle.prototype.rotated = function (t, e) {
    this.center = this.center.rotateAround(t, e), this.rotationAngle = wrapRotationAround(this.rotationAngle + e)
}, mercator.ShapedObjects.Circle.prototype.move = function (t) {
    this.center = this.center.add(t)
}, mercator.ShapedObjects.Circle.prototype.moveTo = function (t) {
    this.center = t
}, mercator.ShapedObjects.Circle.prototype.extendJson = function (t) {
    t.type = "circle", t.center = this.center.toJson(this.subChart), t.rotationAngle = this.rotationAngle, t.radius1 = this.radius1, t.radius2 = this.radius2, t.foreground = this.foreground
}, mercator.ShapedObjects.Circle.prototype.pathString = function () {
    var t = this.radius1,
        e = this.radius2,
        i = "M" + (this.center.x - t).toString() + "," + this.center.y.toString();
    return i += "a" + t.toString() + "," + e.toString() + " 0 1,0 " + (2 * t).toString() + ",0", i += "a" + t.toString() + "," + e.toString() + " 0 1,0 " + (-2 * t).toString() + ",0"
}, mercator.ShapedObjects.Circle.prototype.bbox = function () {
    return new mercator.EllipseShape(this.center, this.radius1, this.radius2, this.rotationAngle).bbox()
}, mercator.ShapedObjects.Circle.prototype.selectionArea = function () {
    return new mercator.EllipseShape(this.center, this.radius1, this.radius2, this.rotationAngle).enlargeByAmount(this.parent.determineStrokeWidth() / 2)
}, mercator.ShapedObjects.Circle.prototype.simpleDraw = function (t, e = null) {
    let i = e ? this.center.add(e) : this.center;
    return this.designer.drawer.ellipse(i.x, i.y, this.radius1, this.radius2, {
        "stroke-width": 0,
        fill: t
    })
}, mercator.ShapedObjects.Circle.createShape = function (t, e, i, s) {
    let r = i.x > s.x ? -1 : 1,
        o = i.y > s.y ? -1 : 1,
        n = Math.max(2, Math.abs(s.x - i.x)) / 2,
        a = e ? n : Math.max(2, Math.abs(s.y - i.y)) / 2,
        h = i.addToX(n * r).addToY(a * o);
    return new mercator.ShapedObjects.Circle(t, h, n, a)
}, mercator.ShapedObjects.Circle.drawShapes = function (t, e, i, s) {
    return mercator.ShapedObjects.Circle.createShape(t, e, i, s).makeShape()
}, mercator.ShapedObjects.Circle.fromJson = function (t, e) {
    return new mercator.ShapedObjects.Circle(e, mercator.Point.fromJson(t.center, e), t.radius1, t.radius2, t.rotationAngle, t.foreground)
};
mercator.ShapedObjects.Rectangle = function (t, e, i, s, o, n, h = !1) {
    this.subChart = t, this.designer = t.designer, this.width = i, this.height = s, this.cornerRadius = getWithDefault(o, 8), this.center = e, this.rotationAngle = getWithDefault(n, 0), this.foreground = h
}, mercator.ShapedObjects.Rectangle.prototype = new mercator.ShapedObjects.AbstractShape, mercator.ShapedObjects.Rectangle.prototype.type = "rectangle", mercator.ShapedObjects.Rectangle.toolName = "rectangle", mercator.ShapedObjects.Rectangle.prototype.getInspectorSheets = function () {
    return Object.assign(mercator.Object.prototype.getInspectorSheets.call(this), {
        "Shape.cornerRadius": this.cornerRadius,
        "Shape.strokeWidth": this.parent.strokeWidth,
        "Shape.strokeColor": this.parent.strokeColor,
        "Shape.fillColor": this.parent.fillColor,
        "Shape.width": this.getWidth(),
        "Shape.height": this.getHeight(),
        "Shape.rotation": this.rotationAngle
    })
}, mercator.ShapedObjects.Rectangle.prototype.makeShape = function () {
    let t = this.topLeft();
    return this.designer.drawer.rect(t.x, t.y, this.width, this.height, this.cornerRadius, {
        fill: "white"
    })
}, mercator.ShapedObjects.Rectangle.prototype.flip = function (t) {
    return this.moveTo(t.mirror(this.getCenter())), this.rotationAngle = wrapRotationAround(t.mirrorAngle(this.rotationAngle)), this
}, mercator.ShapedObjects.Rectangle.prototype.clone = function () {
    return new mercator.ShapedObjects.Rectangle(this.subChart, this.center, this.width, this.height, this.cornerRadius, this.rotationAngle, this.foreground)
}, mercator.ShapedObjects.Rectangle.prototype.getCenter = function () {
    return this.center
}, mercator.ShapedObjects.Rectangle.prototype.getCentroid = function () {
    return this.getCenter()
}, mercator.ShapedObjects.Rectangle.prototype.rotated = function (t, e) {
    this.center = this.center.rotateAround(t, e), this.rotationAngle = wrapRotationAround(this.rotationAngle + e)
}, mercator.ShapedObjects.Rectangle.prototype.move = function (t) {
    this.center = this.center.add(t)
}, mercator.ShapedObjects.Rectangle.prototype.moveTo = function (t) {
    this.center = t
}, mercator.ShapedObjects.Rectangle.prototype.setCornerRadius = function (t) {
    return this.cornerRadius = t, this
}, mercator.ShapedObjects.Rectangle.prototype.setWidth = function (t) {
    return this.width = t, this
}, mercator.ShapedObjects.Rectangle.prototype.setHeight = function (t) {
    return this.height = t, this
}, mercator.ShapedObjects.Rectangle.prototype.getWidth = function () {
    return this.width
}, mercator.ShapedObjects.Rectangle.prototype.getHeight = function () {
    return this.height
}, mercator.ShapedObjects.Rectangle.prototype.setRotationAngle = function (t) {
    return this.rotationAngle = t, this
}, mercator.ShapedObjects.Rectangle.prototype.extendJson = function (t) {
    t.type = "rectangle", t.center = this.center.toJson(this.subChart), t.rotationAngle = this.rotationAngle, t.width = this.width, t.height = this.height, t.cornerRadius = this.cornerRadius, t.foreground = this.foreground
}, mercator.ShapedObjects.Rectangle.prototype.topLeft = function () {
    return new mercator.Point(this.center.x - this.width / 2, this.center.y - this.height / 2)
}, mercator.ShapedObjects.Rectangle.prototype.topRight = function () {
    return new mercator.Point(this.center.x + this.width / 2, this.center.y - this.height / 2)
}, mercator.ShapedObjects.Rectangle.prototype.bottomRight = function () {
    return new mercator.Point(this.center.x + this.width / 2, this.center.y + this.height / 2)
}, mercator.ShapedObjects.Rectangle.prototype.bottomLeft = function () {
    return new mercator.Point(this.center.x - this.width / 2, this.center.y + this.height / 2)
}, mercator.ShapedObjects.Rectangle.prototype.pathString = function () {
    return "M" + [this.topLeft(), this.topRight(), this.bottomRight(), this.bottomLeft()].map(function (t) {
        return t.x + "," + t.y
    }).join(" L") + " Z"
}, mercator.ShapedObjects.Rectangle.prototype.bbox = function () {
    return new mercator.RectangleShape(this.center, this.width, this.height, this.rotationAngle).bbox()
}, mercator.ShapedObjects.Rectangle.prototype.selectionArea = function () {
    return new mercator.RectangleShape(this.center, this.width, this.height, this.rotationAngle).enlargeByAmount(this.parent.determineStrokeWidth() / 2).toPolygon()
}, mercator.ShapedObjects.Rectangle.prototype.simpleDraw = function (t, e = null) {
    let i = e ? this.topLeft().add(e) : this.topLeft(),
        s = this.designer.drawer.rect(i.x, i.y, this.width, this.height, this.cornerRadius, {
            "stroke-width": 0,
            fill: t
        });
    return s.rotationAngle = this.rotationAngle, s
}, mercator.ShapedObjects.Rectangle.createShape = function (t, e, i, s) {
    var o = Math.abs(s.x - i.x),
        n = e ? o : Math.abs(s.y - i.y),
        h = Math.min(i.x, i.x + o * (i.x < s.x ? 1 : -1)),
        a = Math.min(i.y, i.y + n * (i.y < s.y ? 1 : -1)),
        r = new mercator.Point(h + o / 2, a + n / 2);
    return new mercator.ShapedObjects.Rectangle(t, r, Math.max(1, o), Math.max(1, n))
}, mercator.ShapedObjects.Rectangle.drawShapes = function (t, e, i, s) {
    return mercator.ShapedObjects.Rectangle.createShape(t, e, i, s).makeShape()
}, mercator.ShapedObjects.Rectangle.fromJson = function (t, e) {
    return new mercator.ShapedObjects.Rectangle(e, mercator.Point.fromJson(t.center, e), t.width, t.height, t.cornerRadius, t.rotationAngle, t.foreground)
};
mercator.ShapedObjects.Polygon = function (t, o, e = 180, n = !1) {
    this.subChart = t, this.designer = t.designer, this.points = o.map(t => new mercator.PolygonCornerPoint(t, this)), this.cutoffAngle = e, this._smoothenedPoints = this.calculateSmoothenedPoints(), this._roughOutline = null, this.foreground = n, this.type = "polygon"
}, mercator.ShapedObjects.Polygon.prototype = new mercator.ShapedObjects.AbstractShape, mercator.ShapedObjects.Polygon.prototype.type = "polygon", mercator.ShapedObjects.Polygon.toolName = "polygon", mercator.ShapedObjects.Polygon.prototype.calculateSmoothenedPoints = function () {
    this.cutoffAngle ? this._smoothenedPoints = new mercator.PolygonSmoothener(this.points.map(t => t.point)).smoothen(this.cutoffAngle, 3) : this._smoothenedPoints = this.points.map(t => t.point)
}, mercator.ShapedObjects.Polygon.prototype.makeShape = function () {
    return this.designer.drawer.path(this.pathString()).attr({
        "stroke-linejoin": "round"
    })
}, mercator.ShapedObjects.Polygon.prototype.showNodePlaceholders = function () {
    this.points.forEach(t => t.showPlaceholder()), this.drawRoughOutline()
}, mercator.ShapedObjects.Polygon.prototype.hideNodePlaceholders = function () {
    this.points.forEach(t => t.hidePlaceholder()), this.undrawRoughOutline()
}, mercator.ShapedObjects.Polygon.prototype.makePointsMovable = function () {
    this.drawRoughOutline(), this.points.forEach(t => t.makeMovable())
}, mercator.ShapedObjects.Polygon.prototype.makePointsNotMovable = function () {
    this.points.forEach(t => t.makeNotMovable()), this.calculateSmoothenedPoints(), this.undrawRoughOutline()
}, mercator.ShapedObjects.Polygon.prototype.selectionElements = function () {
    return this.points.flatMap(t => t.anchor).nonFalsies()
}, mercator.ShapedObjects.Polygon.drawLine = function (t, o, e) {
    return e.drawLineBetweenPoints(t, o).attr({
        "stroke-width": e.zoomer.unzoom(1.5),
        stroke: "#005cc5"
    }).toLayer("tempDrawingsLayer", e).applyZoom(e)
}, mercator.ShapedObjects.Polygon.prototype.clone = function () {
    let t = new mercator.ShapedObjects.Polygon(this.subChart, this.points.map(t => t.point), this.cutoffAngle, this.foreground);
    return t.parent = this.parent, t
}, mercator.ShapedObjects.Polygon.prototype.getCenter = function () {
    return this.bbox().center()
}, mercator.ShapedObjects.Polygon.prototype.getCentroid = function (t) {
    let o = this.points.map(t => t.point);
    return new mercator.PolygonShape(o).getCentroid(t)
}, mercator.ShapedObjects.Polygon.prototype.isAreaLargeEnough = function () {
    return new mercator.PolygonShape(this.points.map(t => t.point)).isAreaLargeEnough()
}, mercator.ShapedObjects.Polygon.prototype.rotated = function (t, o) {
    this.points.forEach(function (e) {
        e.rotated(t, o)
    }), this.calculateSmoothenedPoints()
}, mercator.ShapedObjects.Polygon.prototype.rotatedBbox = function (t, o) {
    let e = this.points.map(t => t.point).map(e => e.rotateAround(t, o));
    return this.calculateSmoothenedPoints(), new mercator.PolygonShape(e).bbox()
}, mercator.ShapedObjects.Polygon.prototype.move = function (t) {
    this.points.forEach(o => o.moved(t)), this.calculateSmoothenedPoints()
}, mercator.ShapedObjects.Polygon.prototype.moveTo = function (t) {
    this.points.forEach(o => o.moveTo(t)), this.calculateSmoothenedPoints()
}, mercator.ShapedObjects.Polygon.prototype.flip = function (t) {
    return this.points.forEach(o => o.moveTo(t.mirror(o.point))), this.recalculateSmoothenedPointsAndRedrawRoughOutline(), this
}, mercator.ShapedObjects.Polygon.prototype.addPoint = function (t, o) {
    let e = new mercator.PolygonCornerPoint(t, this);
    return this.points.splice(o, 0, e), this.recalculateSmoothenedPointsAndRedrawRoughOutline(), e
}, mercator.ShapedObjects.Polygon.prototype.removePoint = function (t) {
    if (this.points.length <= 3) return !1;
    let o = this.points.indexOf(t);
    return !(o < 0) && (this.points.splice(o, 1), this.recalculateSmoothenedPointsAndRedrawRoughOutline(), !0)
}, mercator.ShapedObjects.Polygon.prototype.extendJson = function (t) {
    t.type = "polygon", t.center = this.getCenter().toJson(this.subChart), t.points = this.points.map(t => t.toJson()), t.foreground = this.foreground, t.cutoffAngle = this.cutoffAngle
}, mercator.ShapedObjects.Polygon.prototype.getSmoothenedPoints = function () {
    return this._smoothenedPoints || this.calculateSmoothenedPoints(), this._smoothenedPoints
}, mercator.ShapedObjects.Polygon.prototype.pathString = function () {
    const t = this.getSmoothenedPoints();
    let o = "M" + t[0].x + "," + t[0].y;
    for (var e = 1; e < t.length; ++e) o += "L" + t[e].x + "," + t[e].y;
    return o += "Z"
}, mercator.ShapedObjects.Polygon.prototype.bbox = function () {
    if (this.points && this.points.length > 0) return new mercator.PolygonShape(this.getSmoothenedPoints()).bbox()
}, mercator.ShapedObjects.Polygon.prototype.selectionArea = function () {
    return new mercator.PolygonShape(this.getSmoothenedPoints())
}, mercator.ShapedObjects.Polygon.prototype.recalculateSmoothenedPointsAndRedrawRoughOutline = function () {
    this.calculateSmoothenedPoints(), this.redrawRoughOutline()
}, mercator.ShapedObjects.Polygon.prototype.redrawRoughOutline = function () {
    this._roughOutline && (this.undrawRoughOutline(), this.drawRoughOutline())
}, mercator.ShapedObjects.Polygon.prototype.drawRoughOutline = function () {
    this._roughOutline || (this._roughOutline = this.designer.drawer.path(mercator.Section.pathStringCompleted(this.points.map(t => t.point)), {
        "stroke-width": 1 / this.designer.zoomer.zoomLevel,
        "stroke-dasharray": "- ",
        stroke: "#ccc"
    }).applyZoom(this.designer), this._roughOutline.node.style["pointer-events"] = "none")
}, mercator.ShapedObjects.Polygon.prototype.undrawRoughOutline = function () {
    this._roughOutline && this._roughOutline.remove(), this._roughOutline = null
}, mercator.ShapedObjects.Polygon.prototype.simpleDraw = function (t, o = null) {
    let e = this.getSmoothenedPoints().map(t => o ? t.add(o) : t);
    return this.designer.drawer.path(mercator.Section.pathString(e), {
        "stroke-width": 0,
        fill: t
    }).applyZoom(this.designer)
}, mercator.ShapedObjects.Polygon.prototype.previewCutoffAngle = function (t) {
    this.setCutoffAngle(t)
}, mercator.ShapedObjects.Polygon.prototype.setCutoffAngle = function (t) {
    this.cutoffAngle = t, this.calculateSmoothenedPoints()
}, mercator.ShapedObjects.Polygon.fromPoints = function (t, o, e = 180) {
    return new mercator.ShapedObjects.Polygon(t, o, e)
}, mercator.ShapedObjects.Polygon.fromJson = function (t, o) {
    return new mercator.ShapedObjects.Polygon(o, t.points.map(function (t) {
        return mercator.Point.fromJson(t, o)
    }), t.cutoffAngle, t.foreground)
};
mercator.CircleShape = class {
    constructor(t, s) {
        this.center = t, this.radius = s
    }
    getCenter() {
        return this.center
    }
    enlargeByAmount(t) {
        return new mercator.CircleShape(this.center, this.radius + t)
    }
    draw(t) {
        return t.drawer.ellipse(this.center.x, this.center.y, this.radius, this.radius)
    }
    toRays() {
        return this.toPolygon().toRays()
    }
    toPoints(t = 8) {
        let s = [];
        for (let e = 0; e < t; e++) {
            let i = 2 * Math.PI * e / t;
            s.push(new mercator.Point(this.center.x + Math.cos(i) * this.radius, this.center.y + Math.sin(i) * this.radius))
        }
        return s
    }
    toPolygon() {
        return new mercator.PolygonShape(this.toPoints())
    }
    bbox() {
        var t = new mercator.Point(this.center.x - this.radius, this.center.y - this.radius),
            s = 2 * this.radius,
            e = 2 * this.radius;
        return mercator.Bbox.fromOriginAndDimensions(t, s, e)
    }
};
mercator.PolygonShape = class {
    constructor(t) {
        this.points = t
    }
    getCenter() {
        return this.bbox().center()
    }
    rotate(t, e = this.getCenter()) {
        return this.points = this.points.map(i => i.rotateAround(e, t)), this
    }
    enlargeByAmount(t) {
        return this.points = this.points.map(e => new mercator.Ray(this.getCenter(), e).enlarge(t).end), this
    }
    enlargeByFactor(t) {
        return this.points = this.points.map(e => new mercator.Ray(this.getCenter(), e).enlargeByFactor(t).end), this
    }
    bbox() {
        let t = this.minX(),
            e = this.minY(),
            i = new mercator.Point(t, e),
            n = this.maxX() - t,
            s = this.maxY() - e;
        return mercator.Bbox.fromOriginAndDimensions(i, n, s)
    }
    toPoints() {
        return this.points
    }
    minX() {
        let t = null;
        for (let e = 0; e < this.points.length; e++) {
            let i = this.points[e].x;
            (null === t || i < t) && (t = i)
        }
        return t
    }
    maxX() {
        let t = null;
        for (let e = 0; e < this.points.length; e++) {
            let i = this.points[e].x;
            (null === t || i > t) && (t = i)
        }
        return t
    }
    minY() {
        let t = null;
        for (let e = 0; e < this.points.length; e++) {
            let i = this.points[e].y;
            (null === t || i < t) && (t = i)
        }
        return t
    }
    maxY() {
        let t = null;
        for (let e = 0; e < this.points.length; e++) {
            let i = this.points[e].y;
            (null === t || i > t) && (t = i)
        }
        return t
    }
    toRays() {
        return this.points.map((t, e) => {
            let i = e === this.points.length - 1 ? _.first(this.points) : this.points[e + 1];
            return new mercator.Ray(t, i)
        })
    }
    getCentroid(t) {
        if (this.points.length <= 2) return this.getCenter();
        let e = this.getMathematicalCentroid();
        return e.isInsidePolygon(this) && this.distanceFromEdge(e) > t ? e : this.centroidInsideShape()
    }
    distanceFromEdge(t) {
        return this.vertices().reduce((e, i) => {
            let n = i.distanceToPoint(t);
            return n < e ? n : e
        }, 1 / 0)
    }
    vertices() {
        let t = [];
        for (let e = 0; e < this.points.length - 1; ++e) t.push(new mercator.Ray(this.points[e], this.points[e + 1]));
        return t
    }
    centroidInsideShape() {
        let t = this.points.map(t => [t.x, t.y]),
            e = Polylabel([t]);
        return new mercator.Point(e[0], e[1])
    }
    area() {
        let t = 0;
        for (let e = 0, i = this.points.length; e < i; e++) {
            t += this.points[e].x * this.points[e === this.points.length - 1 ? 0 : e + 1].y * .5, t -= this.points[e === this.points.length - 1 ? 0 : e + 1].x * this.points[e].y * .5
        }
        return Math.abs(t)
    }
    isAreaLargeEnough() {
        return this.area() > mercator.PolygonShape.minimumInitialArea
    }
    getMathematicalCentroid() {
        let t = this.points;
        t[0].equals(t[t.length - 1]) || t.push(t[0]);
        let e = 0,
            i = 0,
            n = 0;
        for (let s = 0, o = t.length - 1; s < t.length; o = s++) {
            let r = t[s],
                h = t[o],
                a = r.x * h.y - h.x * r.y;
            e += a, i += (r.x + h.x) * a, n += (r.y + h.y) * a
        }
        let s = 3 * e;
        return new mercator.Point(i / s, n / s)
    }
    draw(t) {
        return t.drawer.path(mercator.Section.pathString(this.points.concat([this.points[0]])))
    }
    static fromBbox(t) {
        return new mercator.PolygonShape(t.toPoints())
    }
    static min(t, e) {
        return e < t ? e : t
    }
    static max(t, e) {
        return e > t ? e : t
    }
}, mercator.PolygonShape.minimumInitialArea = (2 * mercator.Chair.width) ** 2;
mercator.LineShape = class {
    constructor(t) {
        this.points = t
    }
    getCenter() {
        return this.bbox().center()
    }
    rotate(t) {
        this.points = this.points.map(o => o.rotateAround(this.getCenter(), t))
    }
    bbox() {
        let t = this.minX(),
            o = this.minY(),
            e = new mercator.Point(t, o),
            i = this.maxX() - t,
            s = this.maxY() - o;
        return mercator.Bbox.fromOriginAndDimensions(e, i, s)
    }
    toRays() {
        return _.compact(this.points.map((t, o) => {
            if (o === this.points.length - 1) return;
            let e = this.points[o + 1];
            return new mercator.Ray(t, e)
        }))
    }
    draw(t) {
        return t.drawLineFromPointToPoint(this.points)
    }
}, mercator.LineShape.prototype.minX = mercator.PolygonShape.prototype.minX, mercator.LineShape.prototype.minY = mercator.PolygonShape.prototype.minY, mercator.LineShape.prototype.maxX = mercator.PolygonShape.prototype.maxX, mercator.LineShape.prototype.maxY = mercator.PolygonShape.prototype.maxY;
mercator.EllipseShape = class {
    constructor(t, s, i, e) {
        this.center = t, this.radius1 = s, this.radius2 = i, this.rotationAngle = e
    }
    getCenter() {
        return this.center
    }
    enlargeByAmount(t) {
        return new mercator.EllipseShape(this.center, this.radius1 + t, this.radius2 + t, this.rotationAngle)
    }
    draw(t) {
        return t.drawer.ellipse(this.center.x, this.center.y, this.radius1, this.radius2)
    }
    toRays() {
        return this.toPolygon().toRays()
    }
    toPoints(t = 8) {
        let s = [];
        for (let i = 0; i < t; i++) {
            let e = 2 * Math.PI * i / t;
            s.push(new mercator.Point(this.center.x + Math.cos(e) * this.radius1, this.center.y + Math.sin(e) * this.radius2).rotateAround(this.center, this.rotationAngle))
        }
        return s
    }
    toPolygon() {
        return new mercator.PolygonShape(this.toPoints())
    }
    bbox() {
        var t = this.radius1 * Math.cos(rad(this.rotationAngle)),
            s = this.radius1 * Math.sin(rad(this.rotationAngle)),
            i = this.radius2 * Math.cos(rad(this.rotationAngle) + Math.PI / 2),
            e = this.radius2 * Math.sin(rad(this.rotationAngle) + Math.PI / 2),
            r = Math.sqrt(t * t + i * i),
            n = Math.sqrt(s * s + e * e),
            a = new mercator.Point(this.center.x - r, this.center.y - n);
        return mercator.Bbox.fromOriginAndDimensions(a, 2 * r, 2 * n)
    }
};
mercator.RectangleShape = class {
    constructor(t, e, o, i) {
        this.center = t, this.width = e, this.height = o, this.rotationAngle = 0 | i
    }
    getCenter() {
        return this.center()
    }
    enlargeByAmount(t) {
        return new mercator.RectangleShape(this.center, this.width + 2 * t, this.height + 2 * t, this.rotationAngle)
    }
    draw(t) {
        let e = this.bbox().topLeft();
        return t.drawer.rect(e.x, e.y, this.width, this.height, 0, {})
    }
    toPolygon() {
        let t = new mercator.PolygonShape(this.toPoints());
        return t.rotate(this.rotationAngle), t
    }
    toPoints() {
        var t = this.width / 2,
            e = this.height / 2;
        return [this.center.addToX(-t).addToY(-e), this.center.addToX(t).addToY(-e), this.center.addToX(t).addToY(e), this.center.addToX(-t).addToY(e)]
    }
    toRays() {
        return this.bbox().toRays()
    }
    bbox() {
        return this.toPolygon().bbox()
    }
};
mercator.TextShape = class {
    constructor(t, e, i, s, o, h, n = 1, a = "black", r = !1) {
        this.element = null, this.text = t, this.center = e, this.fontSize = i, this.rotationAngle = s, this.textAnchor = o, this.designer = h, this.opacity = n, this.color = a, this.bold = r
    }
    draw(t) {
        this.element || (this.element = this.doDraw(), t && this.element.toLayer(t, this.designer))
    }
    doDraw() {
        return this.designer.drawer.text(this.center.x, this.center.y, this.text, {
            "font-size": this.fontSize,
            "font-family": mercator.TextInput.defaultFontFamily,
            "font-weight": this.bold ? "bold" : "normal",
            "text-anchor": this.textAnchor,
            opacity: this.opacity,
            fill: this.color
        }).zoomAndRotateAround(this.rotationAngle, this.center, this.designer)
    }
    undraw() {
        this.element && (this.element.remove(), this.element = null)
    }
    bbox() {
        let t = this.bboxCacheKey(),
            e = mercator.TextShape.bboxCache.get(t);
        return e || (e = this.calculateBbox(), mercator.TextShape.bboxCache.set(t, e)), e
    }
    bboxCacheKey() {
        return [this.text, this.center.x, this.center.y, this.fontSize, this.rotationAngle, this.textAnchor].join("|")
    }
    calculateBbox() {
        const t = this.designer.zoomer.atInitialZoomLevel(() => this.doDraw());
        let e = t.rbox();
        return t.remove(), new mercator.Bbox(new mercator.Point(e.x, e.y), e.width, e.height)
    }
}, mercator.TextShape.bboxCache = new LRUCache(1e4);
mercator.Sections = function (t) {
    this.subChart = t, this.designer = t.designer, this.sections = [], this.sectionsNewInSession = []
}, mercator.Sections.prototype.allElementsSet = function () {
    return this.sections.map(function (t) {
        return t.allElementsSet()
    })
}, mercator.Sections.prototype.toJson = function () {
    return this.sections.map(function (t) {
        return t.toJson()
    })
}, mercator.Sections.prototype.add = function (t) {
    return this.sectionsNewInSession.push(t), this.sections.push(t), this.designer.requestStatsUpdate(), t
}, mercator.Sections.prototype.remove = function (t) {
    return this.sections.remove(t), this.sectionsNewInSession.remove(t), this.designer.requestStatsUpdate(), t
}, mercator.Sections.prototype.findByUuid = function (t) {
    return this.sections.findOne(function (e) {
        return e.uuid === t
    })
}, mercator.Sections.prototype.findByLabel = function (t) {
    return this.sections.findOne(function (e) {
        return e.label === t
    })
}, mercator.Sections.prototype.cornerPointClosestTo = function (t, e = 50) {
    return this.sections.flatMap(mercator.ShapedObject.toCornerPoints).reduce(function (s, n) {
        return null == s ? n : n.point.distanceToPoint(t) < e && n.point.distanceToPoint(t) < s.point.distanceToPoint(t) ? n : s
    }, null)
}, mercator.Sections.prototype.closestTo = function (t) {
    return _.sortBy(this.sections, e => e.distanceTo(t)).slice(0, 10)
}, mercator.Sections.prototype.applyScale = function (t, e = !1) {
    let s = mercator.Bbox.mergedFromObjects(this.sections).center();
    this.sections.forEach(n => n.enlarge(t, s, e))
}, mercator.Sections.fromJson = function (t, e) {
    var s = new mercator.Sections(e);
    return s.sections = t ? t.map(function (t) {
        return mercator.Section.fromJson(t, e, e)
    }) : [], s
};
mercator.Section = function (t, e, o = 180) {
    this.legacyRefreshStrokeColor = !0, this.refreshStrokeColor(), this.doInit(t.designer, e, !0), this.subChart = t, this.init(this.designer, !0, !1), this.label = mercator.LabelingTextInput.emptyLabel, this.layer = mercator.Section.LAYER, this.category = null, this.fillColor = void 0, this.autoStroke = !0, this.labelRotationAngle = 0, this.entrance = null, this.viewFromYourSeatImage = null, this.sectionSubChart = new mercator.SectionSubChart(this, this.designer), this.overlayIcon = new mercator.OverlayIcon(this), this.labelShown = !0, this.objectLabeling = mercator.ObjectLabeling.createDefaultSectionLabeling(), this.cutoffAngle = o, this.published = !1, mercator.ObjectLabelSupport.prototype.init.apply(this)
}, mercator.Section.prototype = new mercator.ShapedObject, mercator.Section.prototype.type = "section", mercator.Section.prototype.getInspectorSheets = function () {
    let t = this.bbox(),
        e = [];
    return this.designer.features.isDisabled(mercator.Features.Type.PUBLISHED_SECTION_LABEL) && "NOT_USED" !== this.designer.status && !this.designer.masterSubChart.sections.sectionsNewInSession.includes(this) && e.push("Label.caption"), this.disabledEditingBySafeMode() && e.push("Label.caption"), Object.assign(mercator.Object.prototype.getInspectorSheets.call(this), {
        "SubChart.uuid": this.uuid,
        "SubChart.totalPeopleCapacity": this.totalPeopleCapacity(),
        "SubChart.totalBooths": this.sectionSubChart.allBooths().length,
        "Category.category": this.category && this.category.key,
        Transform: null,
        "Transform.cutoffAngle": this.cutoffAngle,
        "ObjectLabeling.isNewObject": !this.published,
        "ObjectLabeling.sequence": this.objectLabeling.algoName,
        "ObjectLabeling.prefix": this.objectLabeling.prefix,
        "ObjectLabeling.start": this.objectLabeling.startAtIndex + 1,
        "Label.caption": this.label,
        "Label.isNewObject": !this.published,
        "Label.displayLabel": this.displayLabel,
        "Label.size": this.labelSize,
        "Label.rotation": this.labelRotationAngle,
        "Label.visible": this.labelShown,
        "Label.positionX": Math.round(this.labelHorizontalOffset / t.width * 100),
        "Label.positionY": Math.round(this.labelVerticalOffset / t.height * 100),
        "ViewFromSeat.url": this.viewFromSeatsUrl(),
        "Misc.entrance": this.entrance || "",
        disabled: e
    })
}, mercator.Section.prototype.setLabelShown = function (t) {
    this.labelShown !== t && (this.labelShown = t, this.objectLabel.redraw())
}, mercator.Section.prototype.iconSizeMultiplier = function () {
    return 1
}, mercator.Section.prototype.totalPeopleCapacity = function () {
    return this.sectionSubChart.totalPeopleCapacity()
}, mercator.Section.prototype.setLabelRotationAngle = function (t) {
    this.labelRotationAngle !== t && (this.labelRotationAngle = t, this.objectLabel.redraw())
}, mercator.Section.prototype.verticallyOriented = function () {
    let t = this.svgElement().rbox();
    return t.width < t.height
}, mercator.Section.prototype.applyCategory = function (t) {
    this.category = t, this.sectionSubChart.category = t
}, mercator.Section.prototype.removeCategory = function () {
    this.category = null, this.sectionSubChart.category = null
}, mercator.Section.prototype.getRotation = function () {
    return 0
}, mercator.Section.prototype.getLabelRotation = function () {
    return 0
}, mercator.Section.prototype.selectionElements = function () {
    this.shape.selectionElements()
}, mercator.Section.prototype.duplicate = function (t) {
    return this.subChart.sections.add(this.clone(t))
}, mercator.Section.prototype.rotated = function (t, e) {
    this.sectionSubChart.rotated(e), mercator.ShapedObject.prototype.rotated.apply(this, [t, e])
}, mercator.Section.prototype.flip = function (t, e) {
    return mercator.ShapedObject.prototype.flip.call(this, t), this.sectionSubChart.flip(e), this.redrawContents(), this
}, mercator.Section.prototype.canEnterInside = function () {
    return !0
}, mercator.Section.prototype.enter = function () {
    this.designer.showSectionSubChart(this)
}, mercator.Section.prototype.clone = function (t) {
    let e = new mercator.Section(t, this.shape.clone(), this.cutoffAngle);
    return e.category = this.category, e.label = this.label, e.displayLabel = this.displayLabel, e.labelSize = this.labelSize, e.labelShown = this.labelShown, e.labelHorizontalOffset = this.labelHorizontalOffset, e.labelVerticalOffset = this.labelVerticalOffset, e.labelRotationAngle = this.labelRotationAngle, e.entrance = this.entrance, e.viewFromYourSeatImage = this.viewFromYourSeatImage, e.sectionSubChart = this.sectionSubChart.clone(e), e.objectLabeling = this.objectLabeling.clone(), e
}, mercator.Section.prototype.previewCutoffAngle = function (t) {
    this.cutoffAngle !== t && (this.cutoffAngle = t, this.getShape().setCutoffAngle(t), this.undraw(), this.drawShape())
}, mercator.Section.prototype.setCutoffAngle = function (t) {
    this.cutoffAngle = t, this.getShape().setCutoffAngle(t), this.redraw()
}, mercator.Section.prototype.getFirstPoint = function () {
    return this.getPoints()[0]
}, mercator.Section.prototype.selected = function () {
    this.isSelected = !0, this.refreshOverlayIcon()
}, mercator.Section.prototype.deselected = function () {
    this.isSelected = !1, this.refreshOverlayIcon()
}, mercator.Section.prototype.polygonSupport = function () {
    return !0
}, mercator.Section.prototype.showStrokeSelector = function () {
    mercator.PolygonSupport.showStrokeSelector.apply(this), this.strokeSelector.mouseout(t => {
        t.toElement !== this.overlayIcon.getSurfaceNode() && this.hideHUD()
    })
}, mercator.Section.prototype.showHUD = function () {
    this.isHUDShown || this.isOverlayHovered || (mercator.Object.prototype.hovered.apply(this), this.isHUDShown = !0, this.refreshOverlayIcon(), this.highlight())
}, mercator.Section.prototype.hideHUD = function (t) {
    t && t.toElement === this.overlayIcon.getSurfaceNode() || this.isHUDShown && (this.isHUDShown = !1, mercator.Object.prototype.unhovered.apply(this), this.refreshOverlayIcon(), this.isSelected || this.unhighlight())
}, mercator.Section.prototype.undraw = function () {
    if (this.subChart.isActive()) return this.shape.undraw(), this.objectLabel.undraw(), this.overlayIcon.undraw(), this.undrawContents(), this.hideHUD(), this.objectUndrawn(), this
}, mercator.Section.prototype.draw = function () {
    if (this.subChart.isActive()) return this.hideHUD(), this.drawShape(), this.drawContents(), this.objectLabel.redraw(), this.overlayIcon.redraw(), this.refreshOverlayIcon(), this.objectDrawn(), this
}, mercator.Section.prototype.redrawContents = function () {
    this.undrawContents(), this.drawContents()
}, mercator.Section.prototype.undrawContents = function () {
    this.subChartContents && (this.subChartContents.remove(), this.subChartContents = null)
}, mercator.Section.prototype.drawContents = function () {
    if (!mercator.designer.showSectionContentsEnabled() || !mercator.ChartDesigner.showSectionContents) return;
    this.subChartContents = mercator.set();
    const t = this.getContentsColor();
    this.sectionSubChart.allObjects().filter(t => t.simpleDraw).forEach(e => {
        this.subChartContents.push(this.postProcessSimpleDraw(e.simpleDraw(t, this.sectionContentsPositionOffset())))
    })
}, mercator.Section.prototype.getContentsColor = function () {
    const t = this.designer.useLegacyAppearance() ? this.determineCanvasColor() : this.determineBaseColor();
    return mercator.Color.create(t).alpha(.3).toCSS()
}, mercator.Section.prototype.postProcessSimpleDraw = function (t) {
    return t.toLayer("sectionContentsLayer", this.designer, this.zIndex).zoomAndRotateTo(t.rotationAngle, this.designer, this.designer.zoomer.zoomLevel / (this.designer.sectionScaleFactor / 100), this.bbox().center()), t.node.setAttribute("pointer-events", "none"), t
}, mercator.Section.prototype.correctSectionContentsPosition = function (t) {
    return t.add(this.sectionContentsPositionOffset())
}, mercator.Section.prototype.sectionContentsPositionOffset = function () {
    const t = this.lockedBboxCenter || this.bbox().center(),
        e = this.sectionSubChart.getBBox().center();
    return t.subtract(e)
}, mercator.Section.prototype.lockBboxCenter = function () {
    this.lockedBboxCenter = this.bbox().center()
}, mercator.Section.prototype.releaseBboxCenter = function () {
    let t = this.lockedBboxCenter;
    this.lockedBboxCenter = null, this.centerChanged(t)
}, mercator.Section.prototype.setViewFromSeats = function (t) {
    mercator.Object.prototype.setViewFromSeats.apply(this, [t]), this.refreshOverlayIcon()
}, mercator.Section.prototype.removeViewFromSeats = function () {
    mercator.Object.prototype.removeViewFromSeats.apply(this), this.refreshOverlayIcon()
}, mercator.Section.prototype.createSelectionRectangle = function () {
    return this.designer.drawer.path(this.pathString(), {
        fill: "black",
        opacity: 0
    }).applyZoom(this.designer)
}, mercator.Section.prototype.remove = function () {
    this.subChart.sections.remove(this), this.hideNodePlaceholders(), this.undraw()
}, mercator.Section.prototype.applyElementAttributes = function () {
    mercator.Object.prototype.applyElementAttributes.apply(this), this.subChartContents && this.subChartContents.attr({
        stroke: this.getContentsColor()
    })
}, mercator.Section.prototype.visibleElementsSet = function () {
    let t = mercator.ShapedObject.prototype.visibleElementsSet.apply(this);
    return this.subChartContents ? pushAll(t, this.subChartContents) : t
}, mercator.Section.prototype.determineDefaultColor = function () {
    return "#dfdfdf"
}, mercator.Section.prototype.determineMinScaledStrokeWidth = function () {
    return 6
}, mercator.Section.prototype.determineStrokeWidthWithoutScaling = function () {
    return mercator.Section.STROKE_WIDTH
}, mercator.Section.prototype.setEntrance = function (t) {
    this.entrance = t
}, mercator.Section.prototype.applyObjectLabeling = mercator.Row.prototype.applyObjectLabeling, mercator.Section.prototype.toJson = function () {
    return {
        points: this.getPoints().map(toJson),
        label: this.label,
        displayLabel: this.displayLabel,
        labelSize: this.labelSize,
        labelShown: this.labelShown,
        labelHorizontalOffset: this.labelHorizontalOffset,
        labelVerticalOffset: this.labelVerticalOffset,
        labelRotationAngle: this.labelRotationAngle,
        uuid: this.uuid,
        categoryLabel: mercator.Category.getLabel(this.category),
        categoryKey: mercator.Category.getKey(this.category),
        topLeft: this.bbox().origin.toJson(this.subChart),
        entrance: this.entrance,
        viewFromYourSeatImage: this.viewFromYourSeatImage,
        objectLabeling: this.objectLabeling.toJson(),
        subChart: this.sectionSubChart.toJson(),
        cutoffAngle: this.cutoffAngle,
        published: this.published
    }
}, mercator.Section.prototype.bbox = function () {
    return this.getShape().bbox().enlarge(this.determineStrokeWidthWithoutScaling() / 2)
}, mercator.Section.prototype.center = function () {
    var t = this.getShape().points.map(mercator.PolygonCornerPoint.toPoint);
    return t.reduce(function (t, e) {
        return t.add(e)
    }).divideBy(t.length)
}, mercator.Section.prototype.getCenter = function () {
    return this.center()
}, mercator.Section.prototype.centerChanged = function (t) {
    let e = t.subtract(this.bbox().center());
    this.sectionSubChart.allObjects().forEach(t => t.moved && t.moved(e))
}, mercator.Section.prototype.hasDuplicateObjects = function () {
    return this.sectionSubChart.allBookableObjects().some(t => t.isDuplicate)
}, mercator.Section.prototype.getObjectTypeName = function () {
    return "section"
}, mercator.Section.prototype.distanceTo = function (t) {
    return this.center().distanceToPoint(t)
}, mercator.Section.prototype.canBeRemoved = function () {
    return !this.disabledEditingBySafeMode()
}, mercator.Section.fromJson = function (t, e) {
    var o = new mercator.Section(e, mercator.ShapedObjects.Polygon.fromJson(t, e), t.cutoffAngle);
    return o.applyCategory(e.designer.categories.getCategory(t.categoryKey)), o.label = t.label, o.displayLabel = t.displayLabel, o.labelSize = t.labelSize, o.labelShown = void 0 === t.labelShown || t.labelShown, o.labelHorizontalOffset = getWithDefault(t.labelHorizontalOffset, 0), o.labelVerticalOffset = getWithDefault(t.labelVerticalOffset, 0), o.labelRotationAngle = t.labelRotationAngle, o.uuid = t.uuid, o.entrance = t.entrance, o.viewFromYourSeatImage = t.viewFromYourSeatImage, o.objectLabeling = mercator.ObjectLabeling.fromJson(t.objectLabeling) || mercator.ObjectLabeling.createDefaultSectionLabeling(), o.published = void 0 !== t.published ? t.published : e.designer.isPublished(), t.subChart && (o.sectionSubChart = mercator.SectionSubChart.fromJson(o, t.subChart, e.designer)), o
}, mercator.Section.toRays = function (t) {
    return mercator.ShapedObject.toPoints(t).map((t, e, o) => {
        let i = o[e + 1] || o[0];
        return new mercator.Ray(t, i)
    })
}, mercator.Section.pathString = function (t) {
    let e = "M" + t[0].x + "," + t[0].y;
    for (let o = 1; o < t.length; ++o) e += "L" + t[o].x + "," + t[o].y;
    return e
}, mercator.Section.simpleDraw = function (t) {
    return this.shape.simpleDraw(t)
}, mercator.Section.pathStringCompleted = function (t) {
    return mercator.Section.pathString(t) + "Z"
}, mercator.Section.LAYER = "sectionsLayer", mercator.Section.CONTENTS_DARK_COLOR = "rgba(0, 0, 0, 0.15)", mercator.Section.CONTENTS_LIGHT_COLOR = "rgba(255, 255, 255, 0.3)", mercator.Section.STROKE_WIDTH = 2, mercator.Section.fromPoints = function (t, e, o) {
    const i = mercator.ShapedObjects.Polygon.fromPoints(o.activeSubChart(), t, e);
    return new mercator.Section(o.activeSubChart(), i, e)
};
mercator.PolygonCornerPoint = function (o, t) {
    this.point = o, this.polygonShapedObject = t, this.designer = t.designer, this.anchor = null, this.mover = new mercator.PolygonCornerPointMover(this), this.snapType = null, this.placeholder = !1
}, mercator.PolygonCornerPoint.prototype.moved = function (o) {
    this.point = this.point.add(o), this.polygonShapedObject.recalculateSmoothenedPointsAndRedrawRoughOutline()
}, mercator.PolygonCornerPoint.prototype.moveTo = function (o) {
    if (this.point = o, this.polygonShapedObject.recalculateSmoothenedPointsAndRedrawRoughOutline(), this.anchor) {
        let t = this.anchor.rbox().width / 2;
        this.anchor.attr({
            x: o.x - t,
            y: o.y - t
        }).applyZoomButKeepSize(this.designer)
    }
}, mercator.PolygonCornerPoint.prototype.rotated = function (o, t) {
    this.point = this.point.rotateAround(o, t), this.polygonShapedObject.recalculateSmoothenedPointsAndRedrawRoughOutline()
}, mercator.PolygonCornerPoint.prototype.clone = function (o) {
    return new mercator.PolygonCornerPoint(this.point, o)
}, mercator.PolygonCornerPoint.prototype.getSectionOrGA = function () {
    return this.polygonShapedObject.parent
}, mercator.PolygonCornerPoint.prototype.toJson = function () {
    return this.point.toJson(this.getSectionOrGA().subChart)
}, mercator.PolygonCornerPoint.prototype.pressingDelete = function (o) {
    return 2 === o.button || 0 === o.button && o.ctrlKey
}, mercator.PolygonCornerPoint.prototype.makeMovable = function () {
    this.placeholder && this.hidePlaceholder(), this.highlight(), this.anchor.toLayer("nodesLayer", this.designer).onDrag(this.designer, this.dragged(), this.dragStarted(), this.dragEnded()), this.anchor.node.onmouseover = (o => {
        this.pressingDelete(o) && this.attr({
            fill: mercator.Object.ERROR_COLOR
        }), this.designer.setCursor("node-on")
    }), this.anchor.node.onmouseout = (() => {
        this.dragging || (this.designer.setCursorToDefault(), this.attr({
            fill: mercator.PolygonDrawingSnapper.snapColors.default
        }))
    }), this.anchor.node.onmousedown = (o => {
        this.pressingDelete(o) && this.attr({
            fill: mercator.Object.ERROR_COLOR
        })
    }), this.anchor.node.onmouseup = (o => {
        this.attr({
            fill: mercator.PolygonDrawingSnapper.snapColors.default
        }), o.target !== this.anchor.node && this.designer.setCursorToDefault(), this.pressingDelete(o) && o.target === this.anchor.node && this.getSectionOrGA().removePoint(this)
    })
}, mercator.PolygonCornerPoint.prototype.attr = function (o) {
    this.anchor && this.anchor.attr(o)
}, mercator.PolygonCornerPoint.prototype.makeNotMovable = function () {
    this.unhighlight()
}, mercator.PolygonCornerPoint.prototype.showPlaceholder = function () {
    this.placeholder || (this.placeholder = !0, this.unhighlight().highlight(), this.anchor.node.setAttribute("pointer-events", "none"))
}, mercator.PolygonCornerPoint.prototype.hidePlaceholder = function () {
    this.placeholder && (this.unhighlight(), this.placeholder = !1)
}, mercator.PolygonCornerPoint.prototype.highlight = function () {
    return this.anchor || (this.anchor = mercator.PolygonCornerPoint.drawCorner(this.point, this.designer, this.snapType, this.placeholder)), this
}, mercator.PolygonCornerPoint.prototype.unhighlight = function () {
    return this.anchor && (this.anchor.remove(), this.anchor = null), this
}, mercator.PolygonCornerPoint.prototype.snap = function (o) {
    return o ? (this.snapType || (this.highlight(), this.snapType = o, this.applyElementAttributes()), this) : this.unsnap()
}, mercator.PolygonCornerPoint.prototype.unsnap = function () {
    return this.snapType && (this.unhighlight(), this.snapType = null, this.applyElementAttributes()), this
}, mercator.PolygonCornerPoint.prototype.dragged = function () {
    return (o, t, n, e, i) => {
        this.designer.getState().onPolygonCornerPointDragged(this, e, i, mercator.Point.fromEvent(n, this.designer))
    }
}, mercator.PolygonCornerPoint.prototype.dragStarted = function (o) {
    var t = this;
    return function (o) {
        t.designer.getState().onPolygonCornerPointDragStarted(t, mercator.Point.fromEvent(o, t.designer)), t.designer.setCursor("node-on"), t.dragging = !0
    }
}, mercator.PolygonCornerPoint.prototype.dragEnded = function (o) {
    var t = this;
    return function (o) {
        t.designer.getState().onPolygonCornerPointDragEnded(t, o), t.dragging = !1
    }
}, mercator.PolygonCornerPoint.prototype.applyElementAttributes = function () {
    this.anchor && mercator.PolygonCornerPoint.applyElementAttributes(this.anchor, this.point, this.snapType)
}, mercator.PolygonCornerPoint.drawCorner = function (o, t, n = null, e = !1) {
    let i = t.drawer.rect();
    return mercator.PolygonCornerPoint.applyElementAttributes(i, o, n, e).applyZoomButKeepSize(t)
}, mercator.PolygonCornerPoint.applyElementAttributes = function (o, t, n = null, e = !1) {
    let i = mercator.PolygonCornerPoint[e ? "PLACEHOLDER_SIZE" : n ? "SNAP_SIZE" : "NORMAL_SIZE"],
        r = e ? "white" : mercator.PolygonDrawingSnapper.snapColors[n] || mercator.PolygonDrawingSnapper.snapColors.default,
        s = e ? mercator.PolygonDrawingSnapper.snapColors.default : "white",
        h = e ? 1 : 1.25;
    return o.attr({
        x: t.x - i / 2,
        y: t.y - i / 2,
        width: i,
        height: i,
        fill: r,
        stroke: s,
        "stroke-width": h
    })
}, mercator.PolygonCornerPoint.toPoint = function (o) {
    return o.point
}, mercator.PolygonCornerPoint.PLACEHOLDER_SIZE = 3, mercator.PolygonCornerPoint.SNAP_SIZE = 9, mercator.PolygonCornerPoint.NORMAL_SIZE = 6;
mercator.PolygonCornerPointMover = function (o) {
    this.polygonCornerPoint = o, this.designer = o.designer, this.snapper = new mercator.PolygonDrawingSnapper(this.designer)
}, mercator.PolygonCornerPointMover.prototype.start = function () { }, mercator.PolygonCornerPointMover.prototype.move = function (o, n) {
    this.polygonCornerPoint.moveTo(this.snapper.snap(null, mercator.Point.fromView(o, n, this.designer), []).snapPoint), this.polygonCornerPoint.getSectionOrGA().redraw()
}, mercator.PolygonCornerPointMover.prototype.end = function () {
    this.designer.reselect()
};
mercator.BackgroundSection = function (e, t) {
    this.designer = t, this.section = e, this.elementSet = mercator.set()
}, mercator.BackgroundSection.prototype.draw = function () {
    const e = this.path(),
        t = this.determineColors(),
        o = this.designer.drawer.path(e, {
            fill: t.fill,
            "stroke-width": 0,
            "stroke-linejoin": "round"
        }).toLayer("backgroundFillLayer", this.designer).applyZoom(this.designer),
        n = this.designer.drawer.path(e, {
            stroke: t.innerStroke,
            "stroke-width": 40,
            "stroke-linejoin": "round"
        }).toLayer("backgroundFillLayer", this.designer).applyZoom(this.designer),
        i = this.designer.drawer.path(e, {
            fill: mercator.Color.create(t.fill).alpha(.3).toCSS(),
            stroke: t.outerStroke,
            "stroke-width": 4,
            "stroke-linejoin": "round"
        }).toLayer("sectionsLayer", this.designer).applyZoom(this.designer);
    o.node.setAttribute("pointer-events", "none"), i.node.setAttribute("pointer-events", "none"), n.node.setAttribute("pointer-events", "none"), this.elementSet.push(o, n, i)
}, mercator.BackgroundSection.prototype.determineColors = function () {
    return "light" !== this.designer.getCanvasColorScheme() ? {
        fill: "hsl(0, 0%, 13%)",
        outerStroke: "hsl(0, 0%, 22%)",
        innerStroke: "hsla(0, 0%, 15%, 0.9)"
    } : {
        fill: "hsl(0, 0%, 95.5%)",
        outerStroke: "hsl(0, 0%, 85%)",
        innerStroke: "hsla(0, 0%, 90%, 0.4)"
    }
}, mercator.BackgroundSection.prototype.path = function () {
    return mercator.Section.pathStringCompleted(this._pointsAppliedToSectionSubchart(), !0)
}, mercator.BackgroundSection.prototype._pointsAppliedToSectionSubchart = function () {
    return this.section.smoothenedPointsAsPoints().map(e => this.section.sectionSubChart.applyToPoint(e))
}, mercator.BackgroundSection.prototype.redraw = function () {
    this.undraw(), this.draw()
}, mercator.BackgroundSection.prototype.undraw = function () {
    this.elementSet.remove(), this.elementSet.clear()
}, mercator.BackgroundSection.prototype.allElementsSet = function () {
    return this.elementSet.remove()
}, mercator.BackgroundSection.prototype.applyZoom = function () {
    this.elementSet.forEach(e => e.applyZoom(this.designer))
}, mercator.BackgroundSection.prototype.bbox = function () {
    return mercator.BackgroundSection._bbox(this._pointsAppliedToSectionSubchart())
}, mercator.BackgroundSection._bbox = function (e) {
    return new mercator.PolygonShape(e).bbox().enlarge(mercator.Section.STROKE_WIDTH / 2)
}, mercator.BackgroundSection.prototype.blur = function () { }, mercator.BackgroundSection.prototype.unblur = function () { }, mercator.BackgroundSection.prototype.showLabelAndChildLabels = function () { }, mercator.BackgroundSection.prototype.hideLabelAndChildLabels = function () { };
mercator.BackgroundImageForSection = function (o, e, t) {
    this.section = o, this.designer = t, this.backgroundImage = null
}, mercator.BackgroundImageForSection.prototype.getBackgroundImage = function () {
    return this.designer.masterSubChart.backgroundImage
}, mercator.BackgroundImageForSection.prototype.draw = function () {
    var o = this.getBackgroundImage();
    o.url() && this.createBackground(o)
}, mercator.BackgroundImageForSection.prototype.determineBackgroundImageOpacity = function (o) {
    return o.showOnRenderedCharts ? 1 : mercator.BackgroundImage.OPACITY_WHEN_NOT_SHOWN_ON_RENDERED_CHART
}, mercator.BackgroundImageForSection.prototype.setOpacity = function (o) {
    this.backgroundImage.attr({
        opacity: o
    })
}, mercator.BackgroundImageForSection.prototype.determineBackgroundImageLayer = function () {
    return "backgroundLayer"
}, mercator.BackgroundImageForSection.prototype.createBackground = function (o) {
    let e = this.section.sectionSubChart.applyToPoint(o.origin),
        t = () => {
            let t = o.url(),
                a = this.section.sectionSubChart.applyToDimension(o.backgroundImageWidth),
                n = this.section.sectionSubChart.applyToDimension(o.backgroundImageHeight),
                r = this.determineBackgroundImageOpacity(o);
            this.backgroundImage = this.designer.drawer.image(t, a, n, {
                x: e.x,
                y: e.y,
                opacity: r
            }).setExtraZoom(o.backgroundImageScale / 100).toLayer(this.determineBackgroundImageLayer(), this.designer).applyZoom(this.designer)
        };
    o.backgroundImageWidth ? t() : o.loadBackgroundImage(t)
}, mercator.BackgroundImageForSection.prototype.undraw = function () {
    this.backgroundImage && (this.backgroundImage.remove(), this.backgroundImage = null)
}, mercator.BackgroundImageForSection.prototype.redraw = function () {
    this.undraw(), this.draw()
}, mercator.BackgroundImageForSection.prototype.allElementsSet = function () {
    return mercator.set(this.backgroundImage)
}, mercator.BackgroundImageForSection.prototype.applyZoom = function () {
    this.redraw()
}, mercator.BackgroundImageForSection.prototype.blur = function () { }, mercator.BackgroundImageForSection.prototype.unblur = function () { }, mercator.BackgroundImageForSection.prototype.showLabelAndChildLabels = function () { }, mercator.BackgroundImageForSection.prototype.hideLabelAndChildLabels = function () { };
mercator.ReferenceChartForSection = class extends mercator.BackgroundImageForSection {
    constructor(e, r, t) {
        super(e, r, t), this.visible = !0
    }
    getBackgroundImage() {
        return this.designer.masterSubChart.referenceChart
    }
    determineBackgroundImageOpacity() {
        return this.designer.showReferenceChartAbove ? .9 : this.designer.referenceChartVisible ? .9 : 0
    }
    fadedOpacity() {
        return this.opacity()
    }
    determineBackgroundImageLayer() {
        return this.designer.showReferenceChartAbove ? "aboveAllBackgroundLayer" : "backgroundLayer"
    }
};
mercator.PolygonDrawingLine = function (i) {
    this.designer = i, this.lines = [], this.corner = null, this.toPosition = null
}, mercator.PolygonDrawingLine.prototype.smoothLine = function (i, n, o, t) {
    let e = [],
        s = new mercator.LineSmoothener([i, n, o]).smoothen(t, 3);
    for (let i = 1; i <= s.length - 1; i++) e.push(mercator.ShapedObjects.Polygon.drawLine(s[i - 1], s[i], this.designer));
    return e
}, mercator.PolygonDrawingLine.prototype._straightLine = function (i, n, o) {
    let t = mercator.ShapedObjects.Polygon.drawLine(i, n, this.designer);
    return t.attr({
        stroke: mercator.PolygonDrawingSnapper.snapColors[o] || mercator.PolygonDrawingSnapper.snapColors.default
    }), t
}, mercator.PolygonDrawingLine.prototype.drawStraight = function (i, n, o) {
    this.undraw();
    let t = this._straightLine(i, n, o);
    this.toPosition = n, this.lines = [t], this.drawCorner(n)
}, mercator.PolygonDrawingLine.prototype.draw = function (i, n, o, t, e) {
    if (this.undraw(), i) this.lines = this.smoothLine(i, n, o, e);
    else {
        let i = this._straightLine(n, o, t);
        this.lines = [i]
    }
    this.toPosition = o, this.drawCorner(o)
}, mercator.PolygonDrawingLine.prototype.drawCorner = function (i) {
    this.corner = mercator.PolygonCornerPoint.drawCorner(i, this.designer)
}, mercator.PolygonDrawingLine.prototype.undraw = function () {
    this.corner && (this.corner.remove(), this.corner = null), this.lines && this.lines.length > 0 && (this.lines.forEach(i => i.remove()), this.lines = [])
};
mercator.GeneralAdmissionAreas = function (e) {
    this.subChart = e, this.designer = e.designer, this.areas = [], this.areasNewInSession = []
}, mercator.GeneralAdmissionAreas.prototype.add = function (e) {
    return this.areasNewInSession.push(e), this.areas.push(e), e.refreshOutOfBounds(), this.designer.updateCategoriesStats(), this.designer.requestStatsUpdate(), e
}, mercator.GeneralAdmissionAreas.prototype.remove = function (e) {
    this.areas.splice(this.areas.indexOf(e), 1), this.areas.remove(e), this.designer.requestStatsUpdate()
}, mercator.GeneralAdmissionAreas.prototype.clone = function (e) {
    var s = new mercator.GeneralAdmissionAreas(e);
    return s.areas = this.areas.map(function (s) {
        return s.clone(e)
    }), s
}, mercator.GeneralAdmissionAreas.prototype.toJson = function () {
    return this.areas.map(function (e) {
        return e.toJson()
    })
}, mercator.GeneralAdmissionAreas.prototype.draw = function () {
    this.areas.forEach(function (e) {
        e.draw()
    })
}, mercator.GeneralAdmissionAreas.prototype.undraw = function () {
    this.areas.forEach(function (e) {
        e.undraw()
    })
}, mercator.GeneralAdmissionAreas.prototype.allElementsSet = function () {
    return this.areas.map(function (e) {
        return e.allElementsSet()
    })
}, mercator.GeneralAdmissionAreas.fromJson = function (e, s) {
    var a = new mercator.GeneralAdmissionAreas(s);
    return e && (a.areas = e.map(e => mercator.GeneralAdmissionArea.fromJson(e, s))), a
};
mercator.GeneralAdmissionArea = function (e, t) {
    this.subChart = e, this.legacyRefreshStrokeColor = !0, this.refreshStrokeColor(), this.autoStroke = !0, this.fillColor = void 0, this.doInit(e.designer, t, !0), this.category = null, this.capacity = 100, this.minOccupancy = 0, this.label = mercator.LabelingTextInput.emptyLabel, this.icon = null, this.labelShown = !0, this.entrance = null, this.viewFromYourSeatImage = null, this.layer = "sectionsLayer", this.cutoffAngle = 180, this.bookAsAWhole = !1, this.minOccupancy = 1, this.variableOccupancy = !1, this.autoStroke = !0, this.overlayIcon = new mercator.OverlayIcon(this), this.objectLabeling = mercator.ObjectLabeling.createDefaultRowLabeling(), mercator.ObjectLabelSupport.prototype.init.apply(this), this.shapeType = t.type, this.published = !1
}, mercator.GeneralAdmissionArea.prototype = new mercator.ShapedObject, mercator.GeneralAdmissionArea.prototype.type = "generalAdmission", mercator.GeneralAdmissionArea.prototype.getInspectorSheets = function () {
    let e = this.bbox();
    const t = mercator.Object.prototype.getInspectorSheets.call(this),
        i = t.disabled || [];
    (this.designer.features.isDisabled(mercator.Features.Type.PUBLISHED_SECTION_LABEL) && "NOT_USED" !== this.designer.status && !this.designer.masterSubChart.generalAdmissionAreas.areasNewInSession.includes(this) || this.disabledEditingBySafeMode()) && i.push("ObjectLabeling.label");
    let a = Object.assign(t, {
        "ObjectLabeling.label": this.label,
        "ObjectLabeling.displayLabel": this.displayLabel,
        "ObjectLabeling.isNewObject": !this.published,
        "ObjectLabeling.sequence": this.objectLabeling.algoName,
        "ObjectLabeling.prefix": this.objectLabeling.prefix,
        "ObjectLabeling.start": this.objectLabeling.startAtIndex + 1,
        "ObjectLabeling.visible": this.labelShown,
        "ObjectLabeling.size": this.labelSize,
        "ObjectLabeling.positionX": Math.round(this.labelHorizontalOffset / e.width * 100),
        "ObjectLabeling.positionY": Math.round(this.labelVerticalOffset / e.height * 100),
        "Capacity.bookAsAWhole": this.bookAsAWhole,
        "Capacity.variableOccupancy": this.variableOccupancy,
        "Capacity.capacity": this.capacity,
        "Capacity.minOccupancy": this.minOccupancy,
        "Shape.cornerRadius": this.shape.cornerRadius,
        "Shape.rotation": this.shape.rotationAngle,
        "ViewFromSeat.url": this.viewFromSeatsUrl(),
        "Misc.entrance": this.entrance,
        disabled: i
    });
    return a = null !== this.shape.getWidth() ? Object.assign({
        "Shape.width": this.shape.getWidth(),
        "Shape.height": this.shape.getHeight()
    }, a) : Object.assign({
        Transform: null,
        "Transform.cutoffAngle": this.cutoffAngle
    }, a), Object.assign({
        "Category.category": this.category && this.category.key
    }, a)
}, mercator.GeneralAdmissionArea.prototype.iconSizeMultiplier = function () {
    return 1
}, mercator.GeneralAdmissionArea.prototype.hasBookableCapabilities = function () {
    return !0
}, mercator.GeneralAdmissionArea.prototype.totalPeopleCapacity = function () {
    return this.capacity
}, mercator.GeneralAdmissionArea.prototype.duplicate = function (e) {
    return this.designer.activeSubChart().generalAdmissionAreas.add(this.clone(e))
}, mercator.GeneralAdmissionArea.prototype.clone = function (e) {
    let t = new mercator.GeneralAdmissionArea(e, this.shape.clone());
    return t.label = this.label, t.displayLabel = this.displayLabel, t.labelSize = this.labelSize, t.labelShown = this.labelShown, t.labelHorizontalOffset = this.labelHorizontalOffset, t.labelVerticalOffset = this.labelVerticalOffset, t.objectLabeling = this.objectLabeling.clone(), t.category = this.category, t.entrance = this.entrance, t.cutoffAngle = this.cutoffAngle, t.bookAsAWhole = this.bookAsAWhole, t.capacity = this.capacity, t.variableOccupancy = this.variableOccupancy, t.minOccupancy = this.minOccupancy, t.viewFromYourSeatImage = this.viewFromYourSeatImage, t
}, mercator.GeneralAdmissionArea.prototype.canBeRemoved = function () {
    return !this.disabledEditingBySafeMode()
}, mercator.GeneralAdmissionArea.prototype.previewCutoffAngle = function (e) {
    this.cutoffAngle !== e && (this.cutoffAngle = e, this.getShape().setCutoffAngle(e), this.undraw(), this.drawShape())
}, mercator.GeneralAdmissionArea.prototype.setCutoffAngle = function (e) {
    this.cutoffAngle = e, this.getShape().setCutoffAngle(e), this.redraw()
}, mercator.GeneralAdmissionArea.prototype.determineMinScaledStrokeWidth = function () {
    return 2
}, mercator.GeneralAdmissionArea.prototype.determineMaxScaledStrokeWidth = function () {
    return 6
}, mercator.GeneralAdmissionArea.prototype.determineStrokeWidthWithoutScaling = function () {
    return 2
}, mercator.GeneralAdmissionArea.prototype.simpleDraw = function (e, t = null) {
    return this.shape.simpleDraw(e, t)
}, mercator.GeneralAdmissionArea.prototype.remove = function () {
    this.designer.activeSubChart().generalAdmissionAreas.remove(this), this.undraw()
}, mercator.GeneralAdmissionArea.prototype.applyCategory = function (e) {
    this.category = e
}, mercator.GeneralAdmissionArea.prototype.removeCategory = function () {
    this.category = null
}, mercator.GeneralAdmissionArea.prototype.setCapacity = function (e) {
    this.capacity = e
}, mercator.GeneralAdmissionArea.prototype.setSelectionVariableOccupancy = function (e) {
    this.variableOccupancy = e
}, mercator.GeneralAdmissionArea.prototype.setMinOccupancy = function (e) {
    this.minOccupancy = e
}, mercator.GeneralAdmissionArea.prototype.setEntrance = function (e) {
    this.entrance = e
}, mercator.GeneralAdmissionArea.prototype.setBookAsAWhole = function (e) {
    this.bookAsAWhole = e
}, mercator.GeneralAdmissionArea.prototype.setLabelShown = function (e) {
    this.labelShown !== e && (this.labelShown = e, this.objectLabel.redraw())
}, mercator.GeneralAdmissionArea.prototype.applyObjectLabeling = mercator.Row.prototype.applyObjectLabeling, mercator.GeneralAdmissionArea.prototype.toJson = function () {
    let e = {
        categoryLabel: mercator.Category.getLabel(this.category),
        categoryKey: mercator.Category.getKey(this.category),
        capacity: this.capacity,
        label: this.label,
        objectLabeling: this.objectLabeling.toJson(),
        displayLabel: this.displayLabel,
        labelSize: this.labelSize,
        labelShown: this.labelShown,
        labelHorizontalOffset: this.labelHorizontalOffset,
        labelVerticalOffset: this.labelVerticalOffset,
        objectType: "generalAdmission",
        uuid: this.uuid,
        entrance: this.entrance,
        viewFromYourSeatImage: this.viewFromYourSeatImage,
        cutoffAngle: this.cutoffAngle,
        bookAsAWhole: this.bookAsAWhole,
        variableOccupancy: this.variableOccupancy,
        minOccupancy: this.minOccupancy,
        published: this.published
    };
    return this.shape.extendJson(e), e
}, mercator.GeneralAdmissionArea.prototype.getObjectTypeName = function () {
    return "ga"
}, mercator.GeneralAdmissionArea.prototype.setViewFromSeats = function (e) {
    mercator.Object.prototype.setViewFromSeats.apply(this, [e]), this.refreshOverlayIcon()
}, mercator.GeneralAdmissionArea.prototype.removeViewFromSeats = function () {
    mercator.Object.prototype.removeViewFromSeats.apply(this), this.refreshOverlayIcon()
}, mercator.GeneralAdmissionArea.fromJson = function (e, t) {
    let i = new mercator.GeneralAdmissionArea(t, mercator.ShapeFromJson(e, t));
    return i.capacity = e.capacity, i.label = e.label, i.displayLabel = e.displayLabel, i.labelHorizontalOffset = e.labelHorizontalOffset, i.labelVerticalOffset = e.labelVerticalOffset, i.applyCategory(t.designer.categories.getCategory(e.categoryKey)), i.objectLabeling = mercator.ObjectLabeling.fromJson(e.objectLabeling), i.uuid = e.uuid, i.entrance = e.entrance, i.viewFromYourSeatImage = e.viewFromYourSeatImage, i.labelSize = e.labelSize, i.labelShown = e.labelShown, i.cutoffAngle = e.cutoffAngle, i.bookAsAWhole = e.bookAsAWhole || !1, i.variableOccupancy = e.variableOccupancy || !1, i.minOccupancy = e.minOccupancy || 1, i.published = void 0 !== e.published ? e.published : t.designer.isPublished(), i
};
mercator.ImageObjects = class {
    constructor(e) {
        this.subChart = e, this.designer = e.designer, this.images = []
    }
    add(e) {
        return this.images.push(e), e
    }
    clone(e) {
        var s = new mercator.ImageObjects(e);
        return s.images = this.images.map(s => s.clone(e)), s
    }
    remove(e) {
        e.undraw(), this.images.remove(e), this.designer.requestStatsUpdate()
    }
    allElementsSet() {
        return this.images.map(e => e.allElementsSet())
    }
    static fromJson(e, s) {
        var t = new mercator.ImageObjects(s);
        return e && (t.images = e.map(e => mercator.ImageObject.fromJson(e, s))), t
    }
};
mercator.ImageObject = class extends mercator.Object {
    constructor(t, e, i) {
        super(), this.subChart = i, this.designer = i.designer, this.center = e, this.width = 100, this.height = 100, this.fileSize = null, this.scale = 100, this.opacity = 100, this.imageKey = t, this.rotationAngle = 0, this.foreground = !0, this.loaded = !1, this.loadAttempted = !1, this.init(this.designer, !0), this.refreshLayer()
    }
    getInspectorSheets() {
        return Object.assign(mercator.Object.prototype.getInspectorSheets.call(this), {
            "Image.fileSize": this.fileSize,
            "Image.loaded": this.loaded,
            "Shape.scale": this.scale,
            "Shape.opacity": this.opacity,
            "Shape.rotation": Math.round(this.rotationAngle),
            "Shape.foreground": this.foreground
        })
    }
    determineStrokeWidth() {
        return 0
    }
    getCenter() {
        return this.center
    }
    drawn() {
        return this.element
    }
    svgElement() {
        return this.element
    }
    url() {
        return this.designer.publicApiUrl + "/system/public/charts/images/" + this.imageKey
    }
    loadImageOnce() {
        if (this.loadAttempted) return;
        this.loadAttempted = !0;
        const t = new Image;
        t.src = this.url(), t.addEventListener("load", () => {
            this.width = t.width, this.height = t.height, this.loaded = !0, this.redraw()
        })
    }
    refreshLayer() {
        this.layer = this.foreground ? "foregroundLayer" : "backgroundLayer"
    }
    static createShape(t, e, i, s, r, h, a, o) {
        return o.drawer.image(t, i, s, {
            x: e.x,
            y: e.y
        }).toLayer(h, o, a).zoomAndRotate(r, o)
    }
    flip(t) {
        return this.center = t.mirror(this.getCenter()), this.rotationAngle = wrapRotationAround(t.mirrorAngle(this.rotationAngle)), this.redraw(), this
    }
    duplicate(t) {
        return this.subChart.imageObjects.add(this.clone(t))
    }
    clone(t) {
        let e = new mercator.ImageObject(this.imageKey, this.center, t);
        return e.width = this.width, e.height = this.height, e.fileSize = this.fileSize, e.scale = this.scale, e.opacity = this.opacity, e.rotationAngle = this.rotationAngle, e.foreground = this.foreground, e.layer = this.layer, e
    }
    moved(t) {
        this.center = this.center.add(t), this.redraw()
    }
    rotated(t, e) {
        this.center = this.center.rotateAround(t, e), this.rotationAngle = wrapRotationAround(this.rotationAngle + e), this.redraw()
    }
    scaledWidth() {
        return Math.round(this.width * this.scale / 100)
    }
    scaledHeight() {
        return Math.round(this.height * this.scale / 100)
    }
    setWidth(t) {
        this.width = t, this.redraw()
    }
    setHeight(t) {
        this.height = t, this.redraw()
    }
    setScale(t) {
        this.scale = t, this.redraw()
    }
    setOpacity(t) {
        this.opacity = t, this.applyElementAttributes()
    }
    setRotationAngle(t) {
        this.rotationAngle = wrapRotationAround(t), this.redraw()
    }
    setForeground(t) {
        this.foreground = t, this.redraw()
    }
    undraw() {
        this.subChart.isActive() && (this.objectUndrawn(), this.selector.undraw(), this.element && (this.element.remove(), this.element = null))
    }
    redraw() {
        this.drawn() && (this.undraw(), this.draw())
    }
    simpleDraw(t, e = null) {
        this.refreshLayer();
        let i = e ? this.topLeft().add(e) : this.topLeft();
        return this.element = mercator.ImageObject.createPlaceholderShape(this.center, this.scaledWidth(), this.scaledHeight(), this.rotationAngle, this.layer, this.designer, i), this.element.attr({
            fill: t,
            "stroke-width": 0
        }), this.element.rotationAngle = this.rotationAngle, this.applyElementAttributes(), this.element
    }
    getPositionGuides() {
        return mercator.PositionGuidesSupport.prototype.getPositionGuidesForRect.call(this)
    }
    visibleElementsSet() {
        return mercator.set(this.element, this.positionGuides, this.placeholderElement)
    }
    remove() {
        this.subChart.imageObjects.remove(this)
    }
    getRotation() {
        return this.rotationAngle
    }
    getObjectTypeName() {
        return "imageObject"
    }
    toJson() {
        return {
            label: this.label,
            imageKey: this.imageKey,
            center: this.center.toJson(this.subChart),
            width: this.width,
            height: this.height,
            fileSize: this.fileSize,
            scale: this.scale,
            opacity: this.opacity,
            rotationAngle: this.rotationAngle,
            foreground: this.foreground,
            objectType: this.type
        }
    }
    bbox() {
        return new mercator.RectangleShape(this.getCenter(), this.scaledWidth(), this.scaledHeight(), this.rotationAngle).bbox()
    }
    topLeft() {
        return new mercator.RectangleShape(this.getCenter(), this.scaledWidth(), this.scaledHeight(), 0).bbox().topLeft()
    }
    determineOpacity() {
        return this.opacity / 100
    }
    applyElementAttributes() {
        var t = this.visibleElementsSetWithoutChildren();
        0 !== t.length && (t.attr({
            opacity: this.determineOpacity()
        }), this.paintSelection())
    }
    paintSelection() {
        this.placeholderElement && this.placeholderElement.remove(), this.isPainted && (this.placeholderElement = mercator.ImageObject.createPlaceholderShape(this.center, this.scaledWidth(), this.scaledHeight(), this.rotationAngle, this.layer, this.designer, null, !0), this.selector && this.selector.selectionRectangle.node && this.placeholderElement.insertBefore(this.selector.selectionRectangle))
    }
    static fromJson(t, e) {
        var i = new mercator.ImageObject(t.imageKey, mercator.Point.fromJson(t.center, e), e);
        return i.width = t.width, i.height = t.height, i.fileSize = t.fileSize, i.scale = t.scale, i.opacity = t.opacity, i.rotationAngle = t.rotationAngle, i.foreground = t.foreground, i
    }
    static createImage(t, e) {
        return new mercator.ImageObject("", t, e)
    }
    draw() {
        if (this.subChart.isActive()) return this.refreshLayer(), this.loaded ? (this.element = mercator.ImageObject.createShape(this.url(), this.topLeft(), this.scaledWidth(), this.scaledHeight(), this.rotationAngle, this.layer, this.zIndex, this.designer), this.applyElementAttributes(), this.onFirstDraw && (this.onFirstDraw(), this.onFirstDraw = null)) : (this.element = mercator.ImageObject.createPlaceholderShape(this.center, this.scaledWidth(), this.scaledHeight(), this.rotationAngle, this.layer, this.designer), this.loadImageOnce()), this.objectDrawn(), this
    }
    static createPlaceholderShape(t, e, i, s, r, h, a = null, o = null) {
        let n, l = {
            fill: o ? new mercator.Color("rgba(230, 230, 230, 0.6)").selectedLight().cssString : "rgba(230, 230, 230, 0.6)",
            stroke: o ? new mercator.Color("rgba(90, 90, 90, 0.4)").selected().cssString : "rgba(90, 90, 90, 0.4)",
            opacity: o ? .7 : 1
        };
        return (n = null !== a ? h.drawer.rect(a.x, a.y, e, i, 0, l) : h.drawer.rect(t.x - e / 2, t.y - i / 2, e, i, 0, l)).toLayer(r, h).zoomAndRotate(s, h)
    }
}, mercator.ImageObject.prototype.type = "image", mercator.ImageObject.MAX_FILESIZE_MB = 10, mercator.ImageObject.WARN_TOTAL_FILESIZE_BYTES = 2097152;
mercator.Layers = function (e) {
    this.designer = e, this.layers = []
}, mercator.Layers.prototype.createLayer = function (e) {
    var t = 0 === this.layers.length ? null : this.layers[this.layers.length - 1];
    return this.layers.push(new mercator.Layer(e, t)), this
}, mercator.Layers.prototype.get = function (e) {
    return this.layers.findOne(function (t) {
        return t.name === e
    })
}, mercator.Layers.prototype.add = function (e, t, s) {
    this.layers.filter(function (e) {
        return e.name !== t
    }).forEach(function (t) {
        t.remove(e)
    }), this.get(t).add(e, s)
};
mercator.Layer = function (e, t) {
    this.name = e, this.previousLayer = t, this.objects = new SortedArray(mercator.Layer.compareObjects)
}, mercator.Layer.compareObjects = ((e, t) => e.seatsioZIndex - t.seatsioZIndex), mercator.Layer.prototype.add = function (e, t = Number.POSITIVE_INFINITY) {
    e.seatsioLayer = this, e.seatsioZIndex = t;
    let s = this.objects.insert(e);
    var i = this.findObjectToInsertAfter(s);
    i ? e.insertAfter(i) : e.back()
}, mercator.Layer.prototype.findFirstObjectInPreviousLayer = function () {
    if (this.previousLayer) return 0 === this.previousLayer.objects.length ? this.previousLayer.findFirstObjectInPreviousLayer() : this.previousLayer.objects[this.previousLayer.objects.length - 1]
}, mercator.Layer.prototype.findObjectToInsertAfter = function (e) {
    return 0 === e ? this.findFirstObjectInPreviousLayer() : this.objects[e - 1]
}, mercator.Layer.prototype.remove = function (e) {
    this.objects.remove(e), e.seatsioLayer = void 0, e.seatsioZIndex = void 0
};
mercator.DoNothingState = function () { }, mercator.DoNothingState.prototype.name = "?????", mercator.DoNothingState.prototype.stateGroupName = "", mercator.DoNothingState.prototype.init = function () { }, mercator.DoNothingState.prototype.onCanvasMouseDown = function () { }, mercator.DoNothingState.prototype.onCanvasRightMouseButtonDown = function () { }, mercator.DoNothingState.prototype.onCanvasMouseUp = function () { }, mercator.DoNothingState.prototype.onCanvasMouseMove = function () { }, mercator.DoNothingState.prototype.onCanvasMouseLeave = function () { }, mercator.DoNothingState.prototype.onCanvasMouseUp = function () { }, mercator.DoNothingState.prototype.onCanvasClick = function () { }, mercator.DoNothingState.prototype.onDelete = function () { }, mercator.DoNothingState.prototype.exit = function (t) { }, mercator.DoNothingState.prototype.onDuplicate = function () { }, mercator.DoNothingState.prototype.onCut = function () { }, mercator.DoNothingState.prototype.onCopy = function () { }, mercator.DoNothingState.prototype.onNormalizeRows = function () { }, mercator.DoNothingState.prototype.onStraighten = function () { }, mercator.DoNothingState.prototype.onEvenlySpace = function () { }, mercator.DoNothingState.prototype.onAlignRowsCenter = function () { }, mercator.DoNothingState.prototype.onAlignRowsLeft = function () { }, mercator.DoNothingState.prototype.onAlignRowsRight = function () { }, mercator.DoNothingState.prototype.onFlip = function (t) { }, mercator.DoNothingState.prototype.doCurve = function () { }, mercator.DoNothingState.prototype.reselect = function () { }, mercator.DoNothingState.prototype.deselect = function () { }, mercator.DoNothingState.prototype.onEscapePressed = function () { }, mercator.DoNothingState.prototype.labelAlwaysShownCheckboxChanged = function () { }, mercator.DoNothingState.prototype.moveLabelUpClicked = function () { }, mercator.DoNothingState.prototype.moveLabelDownClicked = function () { }, mercator.DoNothingState.prototype.moveLabelLeftClicked = function () { }, mercator.DoNothingState.prototype.moveLabelRightClicked = function () { }, mercator.DoNothingState.prototype.onObjectMouseOver = function () { }, mercator.DoNothingState.prototype.onObjectClicked = function () { }, mercator.DoNothingState.prototype.onObjectDoubleClicked = function () { }, mercator.DoNothingState.prototype.onObjectMouseOut = function () { }, mercator.DoNothingState.prototype.onObjectMouseDown = function () { }, mercator.DoNothingState.prototype.onObjectMouseUp = function () { }, mercator.DoNothingState.prototype.onObjectDragged = function () { }, mercator.DoNothingState.prototype.onObjectDragStarted = function () { }, mercator.DoNothingState.prototype.onObjectDragEnded = function () { }, mercator.DoNothingState.prototype.onPolygonCornerPointDragged = function () { }, mercator.DoNothingState.prototype.onPolygonCornerPointDragStarted = function () { }, mercator.DoNothingState.prototype.onPolygonCornerPointDragEnded = function () { }, mercator.DoNothingState.prototype.onPolygonSideDragged = function () { }, mercator.DoNothingState.prototype.onPolygonSideDragStarted = function () { }, mercator.DoNothingState.prototype.onPolygonSideDragEnded = function () { }, mercator.DoNothingState.prototype.onShiftPressed = function () { }, mercator.DoNothingState.prototype.onShiftReleased = function () { }, mercator.DoNothingState.prototype.onCtrlPressed = function () { }, mercator.DoNothingState.prototype.onCtrlReleased = function () { }, mercator.DoNothingState.prototype.onAltPressed = function () { }, mercator.DoNothingState.prototype.onAltReleased = function () { }, mercator.DoNothingState.prototype.onSpacebarPressed = function () { }, mercator.DoNothingState.prototype.onSpacebarReleased = function () { }, mercator.DoNothingState.prototype.onModifierChange = function () { }, mercator.DoNothingState.prototype.onFocalPointClicked = function () { }, mercator.DoNothingState.prototype.onArrowPressed = function () { }, mercator.DoNothingState.prototype.onPreviewChanges = function () { }, mercator.DoNothingState.prototype.onPreviewChangesEnd = function () { }, mercator.DoNothingState.prototype.hasSelectedObjects = function () {
    return this.getSelectedObjects().length > 0
}, mercator.DoNothingState.prototype.getSelectedObjects = function () {
    return []
}, mercator.DoNothingState.prototype.getInspectorSheets = function () {
    return null
}, mercator.DoNothingState.prototype.onDrawingToolInspectorValuesChange = function () { }, mercator.DoNothingState.prototype.checkIfKeyUpEventShouldHaveFired = function () { }, mercator.DoNothingState.prototype.toString = function () {
    return this.name
};
mercator.ToolState = class extends mercator.DoNothingState {
    constructor(e) {
        super(), this.designer = e
    }
    updateToolText(e, s) {
        this.toolName = e, this.toolHint = s, this.designer.renderUI()
    }
    resetToolText() {
        this.defaultToolText && this.updateToolText(this.defaultToolText.toolName, this.defaultToolText.toolHint)
    }
    updateToolHint(e) {
        this.toolHint = e, this.designer.renderUI()
    }
    updateToolName(e) {
        this.toolName = e, this.designer.renderUI()
    }
    onSpacebarPressed() {
        this.designer.enableCanvasGrabber || (this.designer.spacebarIsPressed = !0, this.designer.enableCanvasGrabber = !0, this.designer.renderUI())
    }
    onSpacebarReleased() {
        this.designer.enableCanvasGrabber && (this.designer.spacebarIsPressed = !1, this.designer.enableCanvasGrabber = !1, this.designer.renderUI())
    }
};

mercator.FocalPointState = function (t) {
    this.designer = t, this.name = "FocalPointState", this.toolName = "focalpoint", this.toolHint = "focalpoint-hint"
}, mercator.FocalPointState.prototype = new mercator.ToolState, mercator.FocalPointState.prototype.init = function () {
    this.focalPoint().isSet() ? this.designer.setState(new mercator.FocalPointSelectedState(this.designer)) : this.designer.setState(new mercator.FocalPointNotSetState(this.designer))
}, mercator.FocalPointState.prototype.onObjectMouseOver = function (t) {
    t instanceof mercator.FocalPoint && t.hovered()
}, mercator.FocalPointState.prototype.onObjectDragStarted = function (t) {
    t instanceof mercator.FocalPoint && t.mover.start()
}, mercator.FocalPointState.prototype.onObjectDragged = function (t, o, e) {
    t instanceof mercator.FocalPoint && t.mover.move(o, e)
}, mercator.FocalPointState.prototype.onObjectDragEnded = function (t, o) {
    t instanceof mercator.FocalPoint && (t.mover.end(o), this.highlightRelativeToPoint(this.focalPoint().point))
}, mercator.FocalPointState.prototype.onObjectClicked = function (t) {
    t instanceof mercator.FocalPoint && this.designer.setState(new mercator.FocalPointSelectedState(this.designer))
}, mercator.FocalPointState.prototype.highlightRelativeToPoint = function (t) {
    var o = this.designer.activeSubChart().getMinAndMaxDistance(t);
    this.designer.activeSubChart().chairs().forEach(function (e) {
        e.highlightRelativeToPoint(o.min, o.max, t)
    })
}, mercator.FocalPointState.prototype.reenter = function () {
    this.designer.setState(this)
}, mercator.FocalPointState.prototype.onEscapePressed = function () {
    this.designer.uiEvents.toolSelectCursor()
}, mercator.FocalPointState.prototype.exit = function () {
    this.focalPoint().undraw(), this.designer.activeSubChart().chairs().forEach(function (t) {
        t.unhighlightRelativeToFocalPoint()
    })
}, mercator.FocalPointState.prototype.focalPoint = function () {
    return this.designer.activeSubChart().focalPoint
};

mercator.FocalPointNotSetState = function (t) {
    this.designer = t, this.focalPoint = this.designer.activeSubChart().focalPoint, this.name = "FocalPointNotSetState", this.toolName = "focalpoint", this.toolHint = "focalpoint-hint"
}, mercator.FocalPointNotSetState.prototype = new mercator.ToolState, mercator.FocalPointNotSetState.prototype.highlightRelativeToPoint = function (t) {
    var o = this.designer.activeSubChart().getMinAndMaxDistance(t);
    this.designer.activeSubChart().chairs().forEach(function (i) {
        i.highlightRelativeToPoint(o.min, o.max, t)
    })
}, mercator.FocalPointNotSetState.prototype.onCanvasMouseMove = function (t) {
    this.focalPoint.pointer.showAt(mercator.Point.fromEvent(t, this.designer))
}, mercator.FocalPointNotSetState.prototype.onObjectClick = function (t, o) {
    this.onCanvasClick(o)
}, mercator.FocalPointNotSetState.prototype.onCanvasClick = function (t) {
    this.setFocalPointTo(mercator.Point.fromEvent(t, this.designer))
}, mercator.FocalPointNotSetState.prototype.onObjectClicked = function (t, o) {
    this.setFocalPointTo(mercator.Point.fromEvent(o, this.designer))
}, mercator.FocalPointNotSetState.prototype.setFocalPointTo = function (t) {
    this.focalPoint.set(t), this.highlightRelativeToPoint(t), this.designer.setState(new mercator.FocalPointState(this.designer))
}, mercator.FocalPointNotSetState.prototype.reenter = function () {
    this.designer.setState(new mercator.FocalPointState(this.designer))
}, mercator.FocalPointNotSetState.prototype.onEscapePressed = function () {
    this.designer.uiEvents.toolSelectCursor()
}, mercator.FocalPointNotSetState.prototype.exit = function () {
    this.focalPoint.undraw(), this.designer.activeSubChart().chairs().forEach(function (t) {
        t.unhighlightRelativeToFocalPoint()
    }), this.focalPoint.pointer.hide()
};

mercator.FocalPointSelectedState = function (t) {
    this.designer = t, this.selectedObjectsObject = null, this.focalPoint = t.activeSubChart().focalPoint, this.toolName = "focalpoint", this.toolHint = "focalpoint-hint"
}, mercator.FocalPointSelectedState.prototype = new mercator.ToolState, mercator.FocalPointSelectedState.prototype.init = function () {
    this.focalPoint.draw();
    var t = this;
    this.highlightRelativeToPoint(this.focalPoint.point), this.selectedObjectsObject = new mercator.SelectedObjects([this.focalPoint], this.designer, {
        canFlip: !1,
        canDuplicate: !1
    }).noRotation().withMoveEndListener(function () {
        t.highlightRelativeToPoint(t.focalPoint.point)
    }).select()
}, mercator.FocalPointSelectedState.prototype.highlightRelativeToPoint = function (t) {
    var e = this.designer.activeSubChart().getMinAndMaxDistance(t);
    this.designer.activeSubChart().chairs().forEach(function (i) {
        i.highlightRelativeToPoint(e.min, e.max, t)
    })
}, mercator.FocalPointSelectedState.prototype.onDelete = function () {
    this.selectedObjectsObject.deleteSelectedObjects(), this.designer.setState(new mercator.FocalPointState(this.designer))
}, mercator.FocalPointSelectedState.prototype.reenter = function () {
    this.designer.setState(this)
}, mercator.FocalPointSelectedState.prototype.onEscapePressed = function () {
    this.designer.uiEvents.toolSelectCursor()
}, mercator.FocalPointSelectedState.prototype.exit = function () {
    this.focalPoint.undraw(), this.designer.activeSubChart().chairs().forEach(function (t) {
        t.unhighlightRelativeToFocalPoint()
    }), this.selectedObjectsObject.deselect(), this.designer.selector.deselectObjects()
}, mercator.FocalPointSelectedState.prototype.onArrowPressed = function (t) {
    this.selectedObjectsObject.moveOneStepInDirection(t)
};

mercator.RowModeState = class extends mercator.ToolState {
    constructor(e) {
        super(e), this.chairSpacingPreview = null
    }
    getInspectorSheets() {
        return {
            "RowDrawing.spacing": mercator.Row.getSpacing(),
            "RowDrawing.chairSpacing": this.designer.rowChairSpacing,
            "RowDrawing.chairSpacingPreview": this.chairSpacingPreview
        }
    }
    init() {
        this.refreshChairMousePointer(this.designer.lastMouseMoveEvent)
    }
    getClosestRow() {
        return this.designer.helperLines.closestRow
    }
    onCanvasMouseMove(e) {
        if (this.mouseDownPoint) {
            new mercator.Point(e.clientX, e.clientY).distanceToPoint(this.mouseDownPoint) > 4 && this.startDrawing()
        } else this.chairSpacingPreview = this.getClosestRow() ? this.getClosestRow().chairSpacing : null, this.refreshChairMousePointer(e), this.designer.renderUI()
    }
    onCanvasMouseDown(e) {
        this.mouseDownPoint = new mercator.Point(e.clientX, e.clientY)
    }
    refreshChairMousePointer(e) {
        const i = mercator.Point.fromEvent(e, this.designer);
        this.designer.drawHelperLines(i, !1), this.startingPoint = this.designer.snapPoint(i), this.designer.chairMousePointer.show(this.startingPoint)
    }
    onCanvasMouseLeave(e) {
        this.designer.chairMousePointer.hide(e), this.designer.undrawHelperLines()
    }
    onCanvasMouseUp() {
        this.startDrawing()
    }
    startDrawing() {
        this.chairSpacingPreview && this.designer.uiEvents.setRowChairSpacing(this.chairSpacingPreview)
    }
    reenter() {
        this.designer.setState(this)
    }
    exit() {
        this.designer.chairMousePointer.hide(), this.designer.undrawHelperLines()
    }
    onEscapePressed() {
        this.designer.uiEvents.toolSelectCursor()
    }
};

mercator.SingleRowModeState = class extends mercator.RowModeState {
    constructor(t) {
        super(t), this.name = "SingleRowModeState", this.toolName = "row-single", this.toolHint = "row-hint"
    }
    startDrawing() {
        super.startDrawing(), this.designer.setState(new mercator.RowDrawingState(this.startingPoint, this.designer))
    }
};

mercator.SegmentedRowModeState = class extends mercator.RowModeState {
    constructor(t) {
        super(t), this.name = "SegmentedRowModeState", this.toolName = "row-segmented", this.toolHint = "row-segmented-hint"
    }
    startDrawing() {
        super.startDrawing(), this.designer.setState(new mercator.SegmentedRowDrawingState(this.startingPoint, this.designer, !0))
    }
};

mercator.MultipleRowModeState = class extends mercator.RowModeState {
    constructor(t) {
        super(t), this.name = "MultipleRowModeState", this.toolName = "row-multiple", this.toolHint = "row-multiple-hint"
    }
    getInspectorSheets() {
        const t = mercator.RowModeState.prototype.getInspectorSheets.apply(this);
        return Object.assign(t, {
            "RowDrawing.rowBlockStyle": this.designer.getToolProperty("RowDrawing.rowBlockStyle")
        })
    }
    startDrawing() {
        super.startDrawing(), this.designer.setState(new mercator.MultipleRowDrawingState(this.startingPoint, this.designer))
    }
};

mercator.ObjectsSelectedState = function (e, t, s) {
    this.designer = e, this.selectedObjects = t, this.selectedObjectsSettings = s, this.selectedObjectsObject = null, this.hoveredObject = null, this.addObjectsModifierPressed = !1, this.selector = this.designer && this.designer.selector, this.name = "ObjectsSelectedState", this.toolName = "select-cursor", this.toolHint = "selected-hint", this.defaultToolText = {
        toolName: this.toolName,
        toolHint: this.toolHint
    }
}, mercator.ObjectsSelectedState.prototype = new mercator.ToolState, mercator.ObjectsSelectedState.prototype.init = function () {
    this.validSelection() ? (this.designer.chairMousePointer.hide(), this.selectedObjectsObject = new mercator.SelectedObjects(this.selectedObjects, this.designer, this.selectedObjectsSettings), this.designer.features.isDisabled(mercator.Features.Type.OBJECT_PROPERTIES) && this.selectedObjectsObject.notMovable().noRotation().notResizeable(), this.selectedObjectsObject.select(), this.selectedObjectsObject.singleObjectSelected() && this.selectedObjectsObject.onlyObject().polygonSupport() && this.designer.features.isEnabled(mercator.Features.Type.OBJECT_PROPERTIES) && this.selectedObjectsObject.onlyObject().showStrokeSelector(), this.designer.setSelectedSeatsCount(this.selectedObjects), (this.designer.shiftWasPressed || this.designer.ctrlWasPressed) && this.addingObjectsStart()) : this.deselect()
}, mercator.ObjectsSelectedState.prototype.validSelection = function () {
    return mercator.ObjectsSelectedState.validSelection(this.selectedObjects)
}, mercator.ObjectsSelectedState.validSelection = function (e) {
    return e.length > 0 && e.every(e => "chair" !== e.type)
}, mercator.ObjectsSelectedState.prototype.onPreviewChanges = function () {
    if (this.selectedObjects.length > 1) this.selectedObjects.forEach(e => e.hideLabel());
    else {
        let e = this.selectedObjectsObject.onlyObject();
        e.polygonSupport() && (e.hideNodePlaceholders(), e.hideOverlays())
    }
    this.selectedObjectsObject.refreshSelectionRectangle()
}, mercator.ObjectsSelectedState.prototype.onPreviewChangesEnd = function () {
    if (this.selectedObjects.length > 1) this.selectedObjects.forEach(e => e.showLabel());
    else {
        let e = this.selectedObjectsObject.onlyObject();
        e.polygonSupport() && e.restoreOverlays()
    }
}, mercator.ObjectsSelectedState.prototype.getSelectedAndSelectingObjects = function () {
    return _.xor(this.selectedObjects, this.selector.selectedObjects)
}, mercator.ObjectsSelectedState.prototype.onCanvasMouseDown = function (e) {
    this.checkIfKeyUpEventShouldHaveFired(e), this.addObjectsModifierPressed && this.startSelecting(e)
}, mercator.ObjectsSelectedState.prototype.checkIfKeyUpEventShouldHaveFired = function (e) {
    this.designer.keyboard.modifierPressed(e) || this.designer.keyboard.onKeyUp(e)
}, mercator.ObjectsSelectedState.prototype.onCanvasMouseUp = function () {
    this.isSelecting && this.endSelecting(), this.unpressObject()
}, mercator.ObjectsSelectedState.prototype.onCanvasMouseMove = function (e) {
    this.lastCursorMoveEvent = e, this.designer.mouseDown && !this.pressedObject && (this.addObjectsModifierPressed && (this.selector.selectMultipleObjects(mercator.Point.fromEvent(e, this.designer)), this.designer.setSelectedSeatsCount(this.getSelectedAndSelectingObjects()), this.refreshSelectedObjectsPaint()), this.selectedObjectsObject.transformingSelection() || this.addObjectsModifierPressed || this.deselect())
}, mercator.ObjectsSelectedState.prototype.startSelecting = function (e) {
    this.selectionStartPoint = mercator.Point.fromEvent(e, this.designer), this.selector.startSelection(this.selectionStartPoint), this.isSelecting = !0
}, mercator.ObjectsSelectedState.prototype.cancelSelecting = function () {
    this.selector.stopSelecting(), this.selector.deselectObjects(), this.isSelecting = !1
}, mercator.ObjectsSelectedState.prototype.endSelecting = function () {
    this.designer.setState(new mercator.ObjectsSelectedState(this.designer, this.getSelectedAndSelectingObjects())), this.cancelSelecting()
}, mercator.ObjectsSelectedState.prototype.onCanvasClick = function (e) {
    e.delegateTarget !== e.target || this.addObjectsModifierPressed || this.deselect()
}, mercator.ObjectsSelectedState.prototype.onObjectClicked = function (e) {
    e.paintUnselected(), this.designer.setState(new mercator.ObjectsSelectedState(this.designer, this.determineNewSelectedObjects(e))), this.designer.getState().onObjectMouseOver(e)
}, mercator.ObjectsSelectedState.prototype.determineNewSelectedObjects = function (e) {
    return this.addObjectsModifierPressed ? _.xor(this.selectedObjects, [e]) : [e]
}, mercator.ObjectsSelectedState.prototype.onObjectMouseDown = function (e, t) {
    this.addObjectsModifierPressed ? this.onCanvasMouseDown(t) : this.pressObject(e)
}, mercator.ObjectsSelectedState.prototype.onObjectMouseUp = function () {
    this.unpressObject()
}, mercator.ObjectsSelectedState.prototype.pressObject = function (e) {
    this.pressedObject = e, this.pressedObject.pressed()
}, mercator.ObjectsSelectedState.prototype.unpressObject = function () {
    this.pressedObject && (this.pressedObject.unpressed(), this.pressedObject = null)
}, mercator.ObjectsSelectedState.prototype.onObjectMouseOver = function (e) {
    this.hoveredObject = e, this.selectedObjectsObject.singleObjectSelected() && this.selectedObjectsObject.contains(e) && e.showHUD()
}, mercator.ObjectsSelectedState.prototype.onObjectMouseOut = function (e, t) {
    this.hoveredObject === e && (this.hoveredObject = null), this.selectedObjectsObject.singleObjectSelected() && this.selectedObjectsObject.contains(e) && e.hideHUD(t)
}, mercator.ObjectsSelectedState.prototype.onObjectDragStarted = function (e) {
    this.addObjectsModifierPressed || (this.isDraggingObject = !0, e.mover.start())
}, mercator.ObjectsSelectedState.prototype.onObjectDragged = function (e, t, s) {
    this.isDraggingObject && e.mover.move(t, s)
}, mercator.ObjectsSelectedState.prototype.onObjectDragEnded = function (e, t) {
    this.isDraggingObject && (e.mover.end(t), e.unpressed(), this.isDraggingObject = !1)
}, mercator.ObjectsSelectedState.prototype.onDelete = function () {
    if (this.selectedObjectsObject.canBeDeleted()) this.selectedObjectsObject.deleteSelectedObjects(), this.selectedObjects = [], this.deselect();
    else {
        const e = this.selectedObjectsObject.cannotDeleteReason();
        e && alert(d(e))
    }
}, mercator.ObjectsSelectedState.prototype.onDuplicate = function () {
    this.selectedObjectsObject.duplicate(), this.designer.requestStatsUpdate()
}, mercator.ObjectsSelectedState.prototype.onCut = function () {
    this.selectedObjectsObject.cut(), this.selectedObjects = [], this.deselect()
}, mercator.ObjectsSelectedState.prototype.onCopy = function () {
    this.selectedObjectsObject.copy()
}, mercator.ObjectsSelectedState.prototype.onAlignObjectsHorizontally = function (e) {
    mercator.Aligner.alignHorizontally(this.selectedObjects, e), this.reselect()
}, mercator.ObjectsSelectedState.prototype.onAlignObjectsVertically = function (e) {
    mercator.Aligner.alignVertically(this.selectedObjects, e), this.reselect()
}, mercator.ObjectsSelectedState.prototype.onSpaceObjectsHorizontally = function () {
    mercator.Aligner.spaceObjects(mercator.Aligner.AXIS_X, this.selectedObjects), this.reselect()
}, mercator.ObjectsSelectedState.prototype.onSpaceObjectsVertically = function () {
    mercator.Aligner.spaceObjects(mercator.Aligner.AXIS_Y, this.selectedObjects), this.reselect()
}, mercator.ObjectsSelectedState.prototype.onAlignRowsCenter = function () {
    mercator.Aligner.alignRowsCenter(this.selectedObjects), this.reselect()
}, mercator.ObjectsSelectedState.prototype.onAlignRowsLeft = function () {
    mercator.Aligner.alignRowsLeft(this.selectedObjects), this.reselect()
}, mercator.ObjectsSelectedState.prototype.onAlignRowsRight = function () {
    mercator.Aligner.alignRowsRight(this.selectedObjects), this.reselect()
}, mercator.ObjectsSelectedState.prototype.onFlip = function (e) {
    (new mercator.Flipper).flip(this.selectedObjectsObject.getArrayOfObjects(), this.selectedObjectsObject.coreBbox().center(), e), this.reselect()
}, mercator.ObjectsSelectedState.prototype.onNormalizeRows = function () {
    mercator.Aligner.normalizeRows(this.selectedObjects), this.reselect()
}, mercator.ObjectsSelectedState.prototype.onStraighten = function () {
    mercator.Aligner.straightenRows(this.selectedObjects), this.reselect()
}, mercator.ObjectsSelectedState.prototype.onEvenlySpace = function () {
    mercator.Aligner.evenlySpaceRows(this.selectedObjects), this.reselect()
}, mercator.ObjectsSelectedState.prototype.reselect = function () {
    this.selectedObjectsObject.reselect()
}, mercator.ObjectsSelectedState.prototype.doCurve = function (e) {
    this.selectedObjectsObject.doCurve(e)
}, mercator.ObjectsSelectedState.prototype.onPolygonCornerPointDragStarted = function (e) {
    e.mover.start()
}, mercator.ObjectsSelectedState.prototype.onPolygonCornerPointDragged = function (e, t, s) {
    e.mover.move(t, s)
}, mercator.ObjectsSelectedState.prototype.onPolygonCornerPointDragEnded = function (e, t) {
    e.mover.end(t)
}, mercator.ObjectsSelectedState.prototype.onArrowPressed = function (e) {
    this.selectedObjectsObject.moveOneStepInDirection(e)
}, mercator.ObjectsSelectedState.prototype.getSelectedObjects = function () {
    return this.selectedObjects
}, mercator.ObjectsSelectedState.prototype.onEscapePressed = function () {
    this.deselect()
}, mercator.ObjectsSelectedState.prototype.onCtrlPressed = function () {
    this.onShiftPressed()
}, mercator.ObjectsSelectedState.prototype.onCtrlReleased = function () {
    this.onShiftReleased()
}, mercator.ObjectsSelectedState.prototype.onShiftPressed = function () {
    this.selectedObjectsObject.transformingSelection() || this.addObjectsModifierPressed || this.addingObjectsStart()
}, mercator.ObjectsSelectedState.prototype.onShiftReleased = function () {
    if (!this.designer.shiftWasPressed && !this.designer.ctrlWasPressed) return this.isSelecting ? (this.cancelSelecting(), this.designer.setState(new mercator.SelectingState(this.selectionStartPoint, this.designer)), void this.designer.getState().onCanvasMouseMove(this.lastCursorMoveEvent)) : void (this.addObjectsModifierPressed && this.addingObjectsEnd())
}, mercator.ObjectsSelectedState.prototype.addingObjectsStart = function () {
    this.addObjectsModifierPressed = !0, this.selectedObjectsObject.addingObjectsStart(), this.designer.shiftWasPressed && this.applySelectedObjectsPaint()
}, mercator.ObjectsSelectedState.prototype.addingObjectsEnd = function () {
    this.addObjectsModifierPressed = !1, this.selectedObjectsObject.addingObjectsEnd(), this.removeSelectedObjectsPaint()
}, mercator.ObjectsSelectedState.prototype.applySelectedObjectsPaint = function () {
    this.selector.paintSelected(this.selectedObjects)
}, mercator.ObjectsSelectedState.prototype.refreshSelectedObjectsPaint = function () {
    this.selectedObjects.forEach(e => {
        this.getSelectedAndSelectingObjects().includes(e) ? e.paintSelected() : e.paintUnselected()
    })
}, mercator.ObjectsSelectedState.prototype.removeSelectedObjectsPaint = function () {
    this.selector.paintUnselected(this.selectedObjects)
}, mercator.ObjectsSelectedState.prototype.deselect = function () {
    this.designer.setState(new mercator.SelectionModeState(this.designer))
}, mercator.ObjectsSelectedState.prototype.reenterWithObjects = function (e) {
    this.designer.setState(new mercator.ObjectsSelectedState(this.designer, e, this.selectedObjectsSettings))
}, mercator.ObjectsSelectedState.prototype.reenter = function () {
    this.reenterWithObjects(this.selectedObjects)
}, mercator.ObjectsSelectedState.prototype.exit = function () {
    this.hoveredObject && this.hoveredObject.hideHUD(), this.selectedObjectsObject && (this.selectedObjectsObject.singleObjectSelected() && this.selectedObjectsObject.onlyObject().polygonSupport() && this.selectedObjectsObject.onlyObject().hideStrokeSelector(), this.selectedObjectsObject.deselect()), this.selectedObjects.forEach(e => e.unhighlight()), this.removeSelectedObjectsPaint(), this.selector.deselectObjects(), this.designer.clearSelectedCount()
};

mercator.SelectionModeState = function (e) {
    this.designer = e, this.name = "SelectionModeState", this.toolName = "select-cursor", this.toolHint = "select-hint", this.defaultToolText = {
        toolName: this.toolName,
        toolHint: this.toolHint
    }
}, mercator.SelectionModeState.prototype = new mercator.ToolState, mercator.SelectionModeState.prototype.onCanvasMouseMove = function (e) {
    var t = mercator.Point.fromEvent(e, this.designer);
    this.designer.mouseDown && !this.pressedObject && (mercator.Drag.start(), this.designer.setState(new mercator.SelectingState(t, this.designer)))
}, mercator.SelectionModeState.prototype.onObjectMouseDown = function (e) {
    this.pressedObject = e, this.pressedObject.pressed()
}, mercator.SelectionModeState.prototype.onObjectMouseUp = function () {
    this.onCanvasMouseUp()
}, mercator.SelectionModeState.prototype.onCanvasMouseUp = function () {
    this.pressedObject && (this.pressedObject.unpressed(), this.pressedObject = null)
}, mercator.SelectionModeState.prototype.onObjectClicked = function (e) {
    this.designer.setState(new mercator.ObjectsSelectedState(this.designer, [e])), this.designer.getState().onObjectMouseOver(e)
}, mercator.SelectionModeState.prototype.onObjectDragStarted = function (e) {
    e.mover.start(), this.designer.getState().updateToolText("move", "")
}, mercator.SelectionModeState.prototype.onObjectDragged = function (e, t, o) {
    e.mover.move(t, o)
}, mercator.SelectionModeState.prototype.onObjectDragEnded = function (e, t) {
    e.mover.end(t), e.unpressed(), this.resetToolText()
}, mercator.SelectionModeState.prototype.reenter = function () {
    this.designer.setState(this)
};

mercator.RowDrawingState = function (t, e) {
    this.centerOfFirstChair = t, this.designer = e, this.chairShapes = null, this.numberOfChairs = new mercator.NumberOfRowsAndChairs(e), this.name = "RowDrawingState", this.toolName = "row-single", this.toolHint = "row-hint", this.lastCursorPoint = void 0, this.snappedPoint = void 0, this.snapType = void 0
}, mercator.RowDrawingState.prototype = new mercator.ToolState, mercator.RowDrawingState.prototype.getInspectorSheets = mercator.SingleRowModeState.prototype.getInspectorSheets, mercator.RowDrawingState.prototype.init = function () {
    this.designer.drawHelperLines(this.centerOfFirstChair, !0), this.chairShapes = mercator.Row.drawShapes(this.centerOfFirstChair, this.centerOfFirstChair, this.designer), this.applyChairStyling()
}, mercator.RowDrawingState.prototype.snapPoint = function (t) {
    if (t = this.designer.snapPointToGrid(this.lastCursorPoint), this.snapType = void 0, this.designer.shiftWasPressed) {
        let e = new mercator.Ray(this.centerOfFirstChair, t).snapToAngle(15, 0);
        return mercator.ChartDesigner.snapToGridEnabled && (e = e.snapLengthToMultipleOf(mercator.Point.SNAP_PRECISION)), this.snapType = "angle", e.end
    }
    if (this.designer.doesPointSnapToHelperLines(t)) return this.designer.snapPointToHelperLines(t);
    if (!this.designer.altWasPressed) {
        const e = new mercator.Ray(this.centerOfFirstChair, t).angle() / 180 * Math.PI,
            i = 90 * Math.abs(Math.sin(e)),
            s = 90 * Math.abs(Math.cos(e));
        if (i < mercator.RowDrawingState.AXIS_SNAPPING_ANGLE) {
            let e = new mercator.Ray(this.centerOfFirstChair, t).snapToAngle(180, 0);
            return this.snapType = "axis", e.end
        }
        if (s < mercator.RowDrawingState.AXIS_SNAPPING_ANGLE) {
            let e = new mercator.Ray(this.centerOfFirstChair, t).snapToAngle(180, 90);
            return this.snapType = "axis", e.end
        }
    }
    return t
}, mercator.RowDrawingState.prototype.onCanvasMouseMove = function (t) {
    this.lastCursorPoint = mercator.Point.fromEvent(t, this.designer), this.redraw()
}, mercator.RowDrawingState.prototype.onAltPressed = function () {
    this.redraw()
}, mercator.RowDrawingState.prototype.onAltReleased = function () {
    this.redraw()
}, mercator.RowDrawingState.prototype.onShiftPressed = function () {
    this.redraw()
}, mercator.RowDrawingState.prototype.onShiftReleased = function () {
    this.redraw()
}, mercator.RowDrawingState.prototype.onDrawingToolInspectorValuesChange = function () {
    this.redraw()
}, mercator.RowDrawingState.prototype.redraw = function () {
    const t = this.snapPoint(this.lastCursorPoint);
    this.chairShapes.remove(), this.chairShapes = mercator.Row.drawShapes(this.centerOfFirstChair, t, this.designer), this.applyChairStyling();
    let e = mercator.Point.centerOfBBox(this.chairShapes.last().rbox()).fromView(this.designer);
    this.designer.altWasPressed ? this.designer.undrawHelperLines() : this.designer.drawHelperLines(this.centerOfFirstChair, !0), this.positionGuides && this.positionGuides.remove(), this.chairShapes.length > 1 && (this.positionGuides = mercator.PositionGuidesSupport.drawRowPositionGuidesFromRay(this.designer, new mercator.Ray(this.centerOfFirstChair, e), this.snapType)), this.numberOfChairs.refresh(this.centerOfFirstChair.averageWith(e), 1, this.chairShapes.length)
}, mercator.RowDrawingState.prototype.applyChairStyling = function () {
    this.chairShapes.forEach((t, e) => {
        t.toLayer("tempDrawingsLayer", this.designer), 0 === e || e === this.chairShapes.length - 1 ? t.attr({
            stroke: "#0784fa",
            "stroke-width": 3
        }) : t.attr({
            stroke: "#005cc5"
        })
    })
}, mercator.RowDrawingState.prototype.rowDrawingCompleted = function () {
    let t = mercator.RowDrawingState.toRowObject(this.chairShapes, this.designer);
    this.designer.activeSubChart().addRow(t.draw()), this.designer.setState(new mercator.SingleRowModeState(this.designer)), this.positionGuides && this.positionGuides.remove()
}, mercator.RowDrawingState.prototype.onCanvasMouseUp = function () {
    this.rowDrawingCompleted()
}, mercator.RowDrawingState.prototype.onCanvasRightMouseButtonDown = function () {
    this.goToNonDrawingState()
}, mercator.RowDrawingState.prototype.onEscapePressed = function () {
    this.goToNonDrawingState()
}, mercator.RowDrawingState.prototype.reenter = function () {
    this.goToNonDrawingState()
}, mercator.RowDrawingState.prototype.goToNonDrawingState = function () {
    this.designer.setState(new mercator.SingleRowModeState(this.designer))
}, mercator.RowDrawingState.prototype.exit = function () {
    this.chairShapes.remove(), this.positionGuides && this.positionGuides.remove(), this.numberOfChairs.undraw(), this.designer.undrawHelperLines()
}, mercator.RowDrawingState.toRowObject = function (t, e) {
    let i = mercator.Row.createFromChairs(t.toArray().map(function (t) {
        let i = new mercator.Point(t.attr("cx"), t.attr("cy"));
        return new mercator.Chair(i, null, e.activeSubChart())
    }), e);
    return i.chairSpacing = e.rowChairSpacing, i
}, mercator.RowDrawingState.AXIS_SNAPPING_ANGLE = 6;

mercator.SegmentedRowDrawingState = function (t, e) {
    this.designer = e, this.name = "SegmentedRowDrawingState", this.toolName = "row-segmented", this.toolHint = "row-segmented-hint", this.centerOfFirstChair = t, this.lastCommittedSegmentEnd = t, this.chairShapes = [], this.numberOfChairs = new mercator.NumberOfRowsAndChairs(e), this.numberOfCommittedSeats = [1], this.lastCursorPoint = this.centerOfFirstChair
}, mercator.SegmentedRowDrawingState.prototype = new mercator.ToolState, mercator.SegmentedRowDrawingState.prototype.getInspectorSheets = mercator.SegmentedRowModeState.prototype.getInspectorSheets, mercator.SegmentedRowDrawingState.prototype.init = function () {
    this.designer.drawHelperLines(this.centerOfFirstChair, !0), this.points = [this.centerOfFirstChair], this.redraw()
}, mercator.SegmentedRowDrawingState.prototype.snapPoint = function (t) {
    if (t = this.designer.snapPointToGrid(t), this.snapType = void 0, this.designer.shiftWasPressed) {
        let e = new mercator.Ray(this.lastCommittedSegmentEnd, t).snapToAngle(15, 0);
        mercator.ChartDesigner.snapToGridEnabled && (e = e.snapLengthToMultipleOf(mercator.Point.SNAP_PRECISION)), this.snapType = "angle", t = e.end
    }
    if (this.designer.doesPointSnapToHelperLines(t)) return this.designer.snapPointToHelperLines(t);
    if (!this.designer.altWasPressed) {
        const e = new mercator.Ray(this.lastCommittedSegmentEnd, t).angle() / 180 * Math.PI,
            i = 90 * Math.abs(Math.sin(e)),
            s = 90 * Math.abs(Math.cos(e));
        if (i < mercator.RowDrawingState.AXIS_SNAPPING_ANGLE) {
            let e = new mercator.Ray(this.lastCommittedSegmentEnd, t).snapToAngle(180, 0);
            return this.snapType = "axis", e.end
        }
        if (s < mercator.RowDrawingState.AXIS_SNAPPING_ANGLE) {
            let e = new mercator.Ray(this.lastCommittedSegmentEnd, t).snapToAngle(180, 90);
            return this.snapType = "axis", e.end
        }
    }
    return t
}, mercator.SegmentedRowDrawingState.prototype.onCanvasMouseMove = function (t) {
    this.lastCursorPoint = mercator.Point.fromEvent(t, this.designer), this.refreshLastPoint()
}, mercator.SegmentedRowDrawingState.prototype.onAltPressed = function () {
    this.refreshLastPoint()
}, mercator.SegmentedRowDrawingState.prototype.onAltReleased = function () {
    this.refreshLastPoint()
}, mercator.SegmentedRowDrawingState.prototype.onShiftPressed = function () {
    this.refreshLastPoint()
}, mercator.SegmentedRowDrawingState.prototype.onShiftReleased = function () {
    this.refreshLastPoint()
}, mercator.SegmentedRowDrawingState.prototype.refreshLastPoint = function () {
    this.points.length > 1 && this.points.pop(), this.addNewPoint(this.lastCursorPoint), this.designer.drawHelperLines(this.centerOfFirstChair, !0), this.positionGuides && this.positionGuides.remove(), this.chairShapes.length > 1 && (this.positionGuides = mercator.PositionGuidesSupport.drawRowPositionGuidesFromMultiRay(this.designer, new mercator.MultiRay(this.points), this.snapType))
}, mercator.SegmentedRowDrawingState.prototype.addNewPoint = function (t) {
    this.lastCommittedSegmentEnd = this.points.last(), this.points.push(this.snapPoint(t)), this.redraw(), this.replaceLastPointWithCenterOfLastChair()
}, mercator.SegmentedRowDrawingState.prototype.replaceLastPointWithCenterOfLastChair = function () {
    this.points.pop(), this.points.push(this.chairShapeToPoint(this.chairShapes.last()))
}, mercator.SegmentedRowDrawingState.prototype.removeLastPoint = function () {
    this.points.pop(), this.redraw()
}, mercator.SegmentedRowDrawingState.prototype.redraw = function () {
    this.chairShapes.remove(), this.chairShapes = mercator.Row.drawShapesAcrossAMultiLine(this.points, this.designer), this.applyChairStyling(this.snapPoint(this.lastCursorPoint));
    const t = this.chairShapes.toArray().middle();
    this.numberOfChairs.refresh(this.chairShapeToPoint(t), 1, this.chairShapes.length)
}, mercator.SegmentedRowDrawingState.prototype.onCanvasMouseUp = function (t) {
    this.pointIsCloseToLastCommittedSegmentEnd(mercator.Point.fromEvent(t, this.designer)) && !this.isGhostSegmentVisible() ? this.rowDrawingCompleted() : (this.lastCursorPoint = mercator.Point.fromEvent(t, this.designer), this.addNewPoint(this.lastCursorPoint), this.numberOfCommittedSeats.push(this.chairShapes.length))
}, mercator.SegmentedRowDrawingState.prototype.isGhostSegmentVisible = function () {
    return this.numberOfCommittedSeats.last() < this.chairShapes.length
}, mercator.SegmentedRowDrawingState.prototype.pointIsCloseToLastCommittedSegmentEnd = function (t) {
    return t && t.distanceToPoint(this.lastCommittedSegmentEnd) < mercator.Chair.width
}, mercator.SegmentedRowDrawingState.prototype.onCanvasRightMouseButtonDown = function (t) {
    this.points.length <= 2 ? this.reenter() : (this.numberOfCommittedSeats.pop(), this.points.pop(), this.redraw(), this.points.pop(), this.lastCursorPoint = mercator.Point.fromEvent(t, this.designer), this.addNewPoint(this.lastCursorPoint))
}, mercator.SegmentedRowDrawingState.prototype.onEscapePressed = function () {
    this.reenter()
}, mercator.SegmentedRowDrawingState.prototype.exit = function () {
    this.chairShapes.remove(), this.positionGuides && this.positionGuides.remove(), this.numberOfChairs.undraw(), this.designer.undrawHelperLines()
}, mercator.SegmentedRowDrawingState.prototype.applyChairStyling = function (t) {
    this.chairShapes.forEach((e, i) => {
        e.toLayer("tempDrawingsLayer", this.designer), this.pointIsCloseToLastCommittedSegmentEnd(this.chairShapeToPoint(e)) ? (t && this.pointIsCloseToLastCommittedSegmentEnd(t) && !this.isGhostSegmentVisible() && e.scale(1.2, 1.2), e.attr({
            fill: "#0784fa",
            stroke: "#005cc5",
            "stroke-width": 3
        })) : 0 === i || i === this.chairShapes.length - 1 ? e.attr({
            stroke: "#0784fa",
            "stroke-width": 3
        }) : e.attr({
            stroke: "#005cc5"
        })
    })
}, mercator.SegmentedRowDrawingState.prototype.rowDrawingCompleted = function () {
    this.points.length > 1 && this.removeLastPoint(), this.replaceLastPointWithCenterOfLastChair();
    const t = this.chairShapes.toArray().map(t => new mercator.Chair(this.chairShapeToPoint(t), null, this.designer.activeSubChart()));
    let e = mercator.SegmentedRowDrawingState.toRowObject(t, this.points, this.designer);
    this.designer.activeSubChart().addRow(e.draw()), this.reenter(), this.positionGuides && this.positionGuides.remove()
}, mercator.SegmentedRowDrawingState.prototype.onDrawingToolInspectorValuesChange = function () {
    this.redraw()
}, mercator.SegmentedRowDrawingState.prototype.reenter = function () {
    this.designer.setState(new mercator.SegmentedRowModeState(this.designer))
}, mercator.SegmentedRowDrawingState.toRowObject = function (t, e, i) {
    let s = mercator.Row.createFromChairs(t, i);
    return s.chairSpacing = i.rowChairSpacing, s.points = e, s
}, mercator.SegmentedRowDrawingState.prototype.chairShapeToPoint = function (t) {
    return new mercator.Point(t.attr("cx"), t.attr("cy"))
};

mercator.MultipleRowDrawingState = function (t, i) {
    this.designer = i, this.centerOfFirstChair = t, this.rowBlockDrawer = new mercator.RowBlockDrawer(t, void 0, this.isIntertwined(), i), this.name = "MultipleRowDrawingState", this.toolName = "row-multiple", this.toolHint = "row-multiple-hint", this.allowNextStage = !1, this.lastCursorPoint = void 0, this.positionGuides = void 0, this.snapType = void 0
}, mercator.MultipleRowDrawingState.prototype = new mercator.RowDrawingState, mercator.MultipleRowDrawingState.prototype.getInspectorSheets = mercator.MultipleRowModeState.prototype.getInspectorSheets, mercator.MultipleRowDrawingState.prototype.init = function () {
    this.lastCursorPoint ? this.redraw() : this.rowBlockDrawer.initDraw(), setTimeout(() => this.allowNextStage = !0, 250)
}, mercator.MultipleRowDrawingState.prototype.isIntertwined = function () {
    return !!this.designer && "intertwined" === this.designer.getToolProperty("RowDrawing.rowBlockStyle")
}, mercator.MultipleRowDrawingState.prototype.redraw = function () {
    const t = this.snapPoint(this.lastCursorPoint);
    this.rowBlockDrawer.redrawTo(t, this.isIntertwined()), this.designer.altWasPressed ? this.designer.undrawHelperLines() : this.designer.drawHelperLines(this.centerOfFirstChair, !0), this.positionGuides && this.positionGuides.remove(), this.rowBlockDrawer.numberOfDrawnSeats() > 1 && (this.positionGuides = mercator.PositionGuidesSupport.drawRowPositionGuidesFromRay(this.designer, new mercator.Ray(this.centerOfFirstChair, t), this.snapType))
}, mercator.MultipleRowDrawingState.prototype.onCanvasMouseUp = function (t) {
    !this.allowNextStage || this.rowBlockDrawer.getDrawnSeatCount() <= 1 || (this.lastCursorPoint = mercator.Point.fromEvent(t, this.designer), this.designer.ignoreNextCanvasClick(), this.designer.setState(new mercator.MultipleRowExtendingState(this.centerOfFirstChair, this.snapPoint(this.lastCursorPoint), this.designer)))
}, mercator.MultipleRowDrawingState.prototype.goToNonDrawingState = function () {
    this.designer.setState(new mercator.MultipleRowModeState(this.designer))
}, mercator.MultipleRowDrawingState.prototype.exit = function () {
    this.rowBlockDrawer.undraw(), this.designer.undrawHelperLines(), this.positionGuides && this.positionGuides.remove()
};

mercator.MultipleRowExtendingState = function (t, i, e) {
    this.designer = e, this.centerOfFirstChair = t, this.rowBlockDrawer = new mercator.RowBlockDrawer(t, i, this.isIntertwined(), e), this.name = "MultipleRowExtendingState", this.toolName = "row-multiple", this.toolHint = "row-multiple-extending-hint", this.lastCursorPoint = void 0
}, mercator.MultipleRowExtendingState.prototype = new mercator.MultipleRowDrawingState, mercator.MultipleRowExtendingState.prototype.init = function () {
    this.rowBlockDrawer.initDraw()
}, mercator.MultipleRowExtendingState.prototype.snapPointFromEvent = function (t) {
    return this.designer.snapPoint(mercator.Point.fromEvent(t, this.designer))
}, mercator.MultipleRowExtendingState.prototype.redraw = function () {
    this.rowBlockDrawer.redrawTo(this.lastCursorPoint, this.isIntertwined())
}, mercator.MultipleRowExtendingState.prototype.onCanvasRightMouseButtonDown = function () {
    this.designer.ignoreNextCanvasClick();
    const t = new mercator.MultipleRowDrawingState(this.centerOfFirstChair, this.designer);
    t.lastCursorPoint = this.lastCursorPoint, this.designer.setState(t)
}, mercator.MultipleRowExtendingState.prototype.onCanvasMouseUp = function (t) {
    this.lastCursorPoint = this.snapPointFromEvent(t);
    var i = this.rowBlockDrawer.createRowObjects();
    0 !== i.length && (i.forEach(t => {
        this.designer.activeSubChart().addRow(t.draw()), t.chairSpacing = this.designer.rowChairSpacing
    }), this.designer.ignoreNextCanvasClick(), this.reenter())
}, mercator.MultipleRowExtendingState.prototype.exit = function () {
    this.rowBlockDrawer.undraw()
};

mercator.SelectingState = function (e, t) {
    this.fromPosition = e, this.designer = t, this.name = "SelectingState", this.toolName = "select-cursor", this.toolHint = "select-hint"
}, mercator.SelectingState.prototype = new mercator.ToolState, mercator.SelectingState.prototype.init = function () {
    this.designer.chairMousePointer.hide(), this.designer.selector.startSelection(this.fromPosition)
}, mercator.SelectingState.prototype.onCanvasMouseUp = function () {
    this.designer.selector.objectsSelected() ? this.designer.setState(new mercator.ObjectsSelectedState(this.designer, this.designer.selector.selectedObjects)) : this.designer.setState(new mercator.SelectionModeState(this.designer))
}, mercator.SelectingState.prototype.onCanvasMouseMove = function (e) {
    this.designer.selector.selectMultipleObjects(mercator.Point.fromEvent(e, this.designer)), this.designer.setSelectedSeatsCount(this.designer.selector.selectedObjects)
}, mercator.SelectingState.prototype.reenter = function () {
    this.designer.setState(new mercator.SelectionModeState(this.designer))
}, mercator.SelectingState.prototype.exit = function () {
    mercator.Drag.autoStopDrag(), this.designer.selector.stopSelecting(), this.designer.selector.deselectObjects(), this.designer.clearSelectedCount()
};

mercator.TextModeState = function (t) {
    this.designer = t, this.name = "TextModeState", this.toolName = "text", this.toolHint = "clickToDraw-hint"
}, mercator.TextModeState.prototype = new mercator.ToolState, mercator.TextModeState.prototype.init = function () {
    this.designer.canvas().css("cursor", "text")
}, mercator.TextModeState.prototype.onObjectClick = function (t, e) {
    this.onCanvasClick(e)
}, mercator.TextModeState.prototype.onCanvasClick = function (t) {
    var e = new mercator.TextInput(mercator.Point.fromEvent(t, this.designer), this.designer.activeSubChart()).draw();
    this.designer.activeSubChart().addTextInput(e), this.designer.setState(new mercator.ObjectsSelectedState(this.designer, [e]))
}, mercator.TextModeState.prototype.onObjectClicked = function (t, e) {
    var s = new mercator.TextInput(mercator.Point.fromEvent(e, this.designer), this.designer.activeSubChart()).draw();
    this.designer.activeSubChart().addTextInput(s), this.designer.setState(new mercator.ObjectsSelectedState(this.designer, [s]))
}, mercator.TextModeState.prototype.reenter = function () {
    this.designer.setState(this)
}, mercator.TextModeState.prototype.exit = function () {
    this.designer.canvas().css("cursor", "default")
}, mercator.TextModeState.prototype.onEscapePressed = function () {
    this.designer.uiEvents.toolSelectCursor()
};

mercator.NodeState = function (e) {
    this.designer = e, this.name = "NodeState", this.toolName = "node", this.toolHint = "node-hint", this.cursor = "node-off"
}, mercator.NodeState.prototype = new mercator.ToolState, mercator.NodeState.prototype.onObjectMouseDown = function (e) {
    e.polygonSupport() && (this.clearPressedObject(), this.pressedObject = e, this.pressedObject.pressed())
}, mercator.NodeState.prototype.onCanvasMouseUp = function () {
    this.clearPressedObject()
}, mercator.NodeState.prototype.onObjectClicked = function (e) {
    e.polygonSupport() && this.designer.setState(new mercator.PolygonSelectedState(this.designer, [e]))
}, mercator.NodeState.prototype.reenter = function () {
    this.designer.setState(this)
}, mercator.NodeState.prototype.exit = function () {
    this.clearPressedObject()
}, mercator.NodeState.prototype.clearPressedObject = function () {
    this.pressedObject && (this.pressedObject.unpressed(), this.pressedObject = null)
};

mercator.PolygonSelectedState = function (e, t) {
    this.designer = e, this.selectedObjects = t, this.selectedObjectsObject = null, this.name = "PolygonSelectedState", this.toolName = "node", this.toolHint = "nodeEdit-hint", this.cursor = "node-off", this.dragging = !1
}, mercator.PolygonSelectedState.prototype = new mercator.ToolState, mercator.PolygonSelectedState.prototype.roughOutlineVisible = !0, mercator.PolygonSelectedState.prototype.init = function () {
    this.selectedObjects[0].polygonSupport() ? (this.snapper = new mercator.PolygonDrawingSnapper(this.designer), this.selectedObjects = [this.selectedObjects[0]], this.selectedObjectsObject = new mercator.SelectedObjects(this.selectedObjects, this.designer, {
        showSelectionRectangle: !1,
        showMovingRectangle: !1,
        canDuplicate: !1
    }), this.selectedObjectsObject.select(), this.selectedObjectsObject.onlyObject().showNodes(), this.designer.setSelectedSeatsCount(this.selectedObjects)) : this.designer.setState(new mercator.NodeState(this.designer))
}, mercator.PolygonSelectedState.prototype.onObjectMouseDown = function (e) {
    !this.selectedObjects.includes(e) && e.polygonSupport() && (this.clearPressedObject(), this.pressedObject = e, this.pressedObject.pressed())
}, mercator.PolygonSelectedState.prototype.onCanvasMouseDown = function (e) {
    e.target === this.designer.canvas()[0] && this.designer.setState(new mercator.NodeState(this.designer))
}, mercator.PolygonSelectedState.prototype.onCanvasMouseUp = mercator.NodeState.prototype.onCanvasMouseUp, mercator.PolygonSelectedState.prototype.onObjectClicked = mercator.NodeState.prototype.onObjectClicked, mercator.PolygonSelectedState.prototype.clearPressedObject = mercator.NodeState.prototype.clearPressedObject, mercator.PolygonSelectedState.prototype.onPreviewChanges = function () {
    this.selectedObjectsObject.onlyObject().hideNodes()
}, mercator.PolygonSelectedState.prototype.onPreviewChangesEnd = function () {
    this.selectedObjectsObject.onlyObject().showNodes()
}, mercator.PolygonSelectedState.prototype.onPolygonCornerPointDragStarted = function (e) {
    this.dragging = !0, this.selectedObjectsObject.onlyObject().hideNodesSides(), e.mover.start(), this.selectedObjects[0].lockBboxCenter && this.selectedObjects[0].lockBboxCenter(), this.prevObjectCenter = this.selectedObjects[0].bbox().center(), this.positionGuidesSet = new mercator.PositionGuidesSet(this.designer, mercator.PositionGuidesSupport.prototype.getPositionGuidesForPoint(this.designer, e.point)).draw()
}, mercator.PolygonSelectedState.prototype.onPolygonCornerPointDragged = function (e, t, s) {
    e.mover.move(t, s);
    let {
        snapPoint: o,
        snapType: i,
        snapRay: n,
        snapSecondRay: c
    } = this.snapper.snap(null, mercator.Point.fromView(t, s, this.designer), []);
    this.positionGuidesSet.refresh(mercator.PositionGuidesSupport.prototype.getPositionGuidesForPoint(this.designer, o, i, n, c))
}, mercator.PolygonSelectedState.prototype.onPolygonCornerPointDragEnded = function (e, t) {
    this.dragging = !1, e.mover.end(t), this.selectedObjectsObject.onlyObject().showNodesSides(), this.positionGuidesSet.undraw(), this.positionGuidesSet = null, this.selectedObjects[0].lockBboxCenter && this.selectedObjects[0].releaseBboxCenter()
}, mercator.PolygonSelectedState.prototype.onPolygonSideDragged = function (e, t) {
    e.moveTo(t)
}, mercator.PolygonSelectedState.prototype.onPolygonSideDragStarted = function () {
    this.dragging = !0, this.selectedObjectsObject.onlyObject().hideNodesSides()
}, mercator.PolygonSelectedState.prototype.onPolygonSideDragEnded = function () {
    this.dragging = !1, this.selectedObjectsObject.onlyObject().showNodesSides()
}, mercator.PolygonSelectedState.prototype.onFlip = mercator.ObjectsSelectedState.prototype.onFlip, mercator.PolygonSelectedState.prototype.onDelete = function () {
    if (this.selectedObjectsObject.canBeDeleted()) this.selectedObjectsObject.deleteSelectedObjects(), this.designer.setState(new mercator.NodeState(this.designer));
    else {
        const e = this.selectedObjectsObject.cannotDeleteReason();
        e && alert(d(e))
    }
}, mercator.PolygonSelectedState.prototype.onAltPressed = function () {
    this.dragging || this.selectedObjectsObject.onlyObject().sides.forEach(e => e.refreshAltToggle())
}, mercator.PolygonSelectedState.prototype.onAltReleased = function () {
    this.dragging || this.selectedObjectsObject.onlyObject().sides.forEach(e => e.refreshAltToggle())
}, mercator.PolygonSelectedState.prototype.reenter = function () {
    this.designer.setState(this)
}, mercator.PolygonSelectedState.prototype.exit = function () {
    this.selectedObjectsObject && (this.selectedObjectsObject.onlyObject().hideNodes(), this.selectedObjectsObject.deselect()), this.clearPressedObject(), this.designer.selector.deselectObjects(), this.designer.clearSelectedCount()
};

mercator.SameTypeSelectionModeState = function (e) {
    this.designer = e, this.selectedObjects = [], this.highlightedObjects = [], this.name = "SameTypeSelectionModeState", this.toolName = "select-sameType", this.toolHint = "select-sameType-hint"
}, mercator.SameTypeSelectionModeState.prototype = new mercator.ToolState, mercator.SameTypeSelectionModeState.prototype.validSelection = mercator.ObjectsSelectedState.prototype.validSelection, mercator.SameTypeSelectionModeState.prototype.onObjectMouseOver = function (e) {
    this.hoveredObject = e, this.highlightSameObjectsOf(e)
}, mercator.SameTypeSelectionModeState.prototype.onObjectMouseOut = function () {
    if (this.hoveredObject) {
        let e = mercator.SameTypeSelectionModeState.filterSameObjects(this.highlightedObjects, this.hoveredObject).filter(e => !this.selectedObjects.includes(e));
        this.unhighlightObjects(e), this.hoveredObject = null
    }
}, mercator.SameTypeSelectionModeState.prototype.onObjectClicked = function () {
    this.commitSelection()
}, mercator.SameTypeSelectionModeState.prototype.highlightSameObjectsOf = function (e) {
    if (!mercator.ObjectsSelectedState.validSelection([e])) {
        if (!mercator.ObjectsSelectedState.validSelection([e.parent])) return;
        e = e.parent
    }
    this.highlightedObjects.forEach(e => e.paintUnselected()), this.highlightedObjects = mercator.SameTypeSelectionModeState.filterSameObjects(this.designer.activeSubChart().allSelectableObjects(), e), this.highlightedObjects.forEach(e => e.paintSelected())
}, mercator.SameTypeSelectionModeState.prototype.unhighlightObjects = function (e = this.highlightedObjects) {
    e.forEach(e => e.paintUnselected()), this.highlightedObjects = this.highlightedObjects.filter(t => !e.includes(t))
}, mercator.SameTypeSelectionModeState.prototype.commitSelection = function () {
    0 !== this.highlightedObjects.length && this.designer.setState(new mercator.SameTypeSelectedState(this.designer, this.highlightedObjects))
}, mercator.SameTypeSelectionModeState.prototype.reenter = function () {
    this.designer.setState(this)
}, mercator.SameTypeSelectionModeState.prototype.exit = function () {
    this.unhighlightObjects()
}, mercator.SameTypeSelectionModeState.filterSameObjects = function (e, t) {
    return e.filter(e => e.type === t.type && e.shapeType === t.shapeType)
};

mercator.SameTypeSelectedState = function (e, t) {
    this.designer = e, this.selectedObjects = t, this.selectedObjectsObject = null, this.addObjectsModifierPressed = !1, this.highlightedObjects = [], this.name = "SameTypeSelectedState", this.toolName = "select-sameType", this.toolHint = "selected-sameType-hint"
}, mercator.SameTypeSelectedState.prototype = new mercator.ObjectsSelectedState, mercator.SameTypeSelectedState.prototype.init = mercator.ObjectsSelectedState.prototype.init, mercator.SameTypeSelectedState.prototype.onCtrlPressed = mercator.ObjectsSelectedState.prototype.onCtrlPressed, mercator.SameTypeSelectedState.prototype.onCtrlReleased = mercator.ObjectsSelectedState.prototype.onCtrlReleased, mercator.SameTypeSelectedState.prototype.onShiftPressed = function () {
    this.selectedObjectsObject.transformingSelection() || this.addObjectsModifierPressed || (this.addingObjectsStart(), this.hoveredObject && this.onObjectMouseOver(this.hoveredObject))
}, mercator.SameTypeSelectedState.prototype.onShiftReleased = function () {
    this.designer.shiftWasPressed || this.designer.ctrlWasPressed || (this.addObjectsModifierPressed && this.addingObjectsEnd(), this.hoveredObject && this.onObjectMouseOver(this.hoveredObject))
}, mercator.SameTypeSelectedState.prototype.onObjectMouseOver = function (e) {
    this.hoveredObject = e, this.highlightSameObjectsOf(e)
}, mercator.SameTypeSelectedState.prototype.onObjectMouseOut = function () {
    this.hoveredObject = null, this.unhighlightObjects(), this.refreshSelectedObjectsPaint()
}, mercator.SameTypeSelectedState.prototype.onObjectClicked = function () {
    this.commitSelection()
}, mercator.SameTypeSelectedState.prototype.highlightSameObjectsOf = function (e) {
    mercator.SameTypeSelectionModeState.prototype.highlightSameObjectsOf.call(this, e), this.refreshSelectedObjectsPaint()
}, mercator.SameTypeSelectedState.prototype.unhighlightObjects = function (e = this.highlightedObjects) {
    e.forEach(e => e.paintUnselected()), this.highlightedObjects = this.highlightedObjects.filter(t => !e.includes(t))
}, mercator.SameTypeSelectedState.prototype.addingObjectsStart = function () {
    this.addObjectsModifierPressed = !0, this.selectedObjectsObject.addingObjectsStart(), this.designer.shiftWasPressed && this.refreshSelectedObjectsPaint()
}, mercator.SameTypeSelectedState.prototype.addingObjectsEnd = mercator.ObjectsSelectedState.prototype.addingObjectsEnd, mercator.SameTypeSelectedState.prototype.getSelectedAndSelectingObjects = function () {
    return _.xor(this.selectedObjects, this.highlightedObjects)
}, mercator.SameTypeSelectedState.prototype.refreshSelectedObjectsPaint = function () {
    this.selectedObjects.forEach(e => {
        this.designer.shiftWasPressed && this.getSelectedAndSelectingObjects().includes(e) ? e.paintSelected() : e.paintUnselected()
    })
}, mercator.SameTypeSelectedState.prototype.applySelectedObjectsPaint = function () {
    this.selectedObjects.forEach(e => e.paintSelected())
}, mercator.SameTypeSelectedState.prototype.removeSelectedObjectsPaint = function () {
    this.selectedObjects.forEach(e => e.paintUnselected())
}, mercator.SameTypeSelectedState.prototype.deselect = function () {
    this.designer.setState(new mercator.SameTypeSelectionModeState(this.designer))
}, mercator.SameTypeSelectedState.prototype.onCanvasClick = function () {
    this.deselect()
}, mercator.SameTypeSelectedState.prototype.exit = function () {
    this.selectedObjectsObject && (this.selectedObjectsObject.singleObjectSelected() && this.selectedObjectsObject.onlyObject().polygonSupport() && this.selectedObjectsObject.onlyObject().hideStrokeSelector(), this.selectedObjectsObject.deselect()), this.selectedObjects.forEach(e => {
        e.paintUnselected(), e.unhighlight()
    }), this.removeSelectedObjectsPaint(), this.designer.clearSelectedCount()
}, mercator.SameTypeSelectedState.prototype.determineNewSelectedObjects = function (e) {
    return this.addObjectsModifierPressed ? _.xor(this.selectedObjects, e) : e
}, mercator.SameTypeSelectedState.prototype.commitSelection = function () {
    0 !== this.highlightedObjects.length && (this.addObjectsModifierPressed || this.highlightedObjects.forEach(e => e.paintUnselected()), this.designer.setState(new mercator.SameTypeSelectedState(this.designer, this.determineNewSelectedObjects(this.highlightedObjects))))
};

mercator.SeatSelectionModeState = function (e) {
    this.designer = e, this.hoveredObject = null, this.name = "SeatSelectionModeState", this.toolName = "select-seats", this.toolHint = "select-seats-hint", this.cursor = "seat-selection"
}, mercator.SeatSelectionModeState.prototype = new mercator.ToolState, mercator.SeatSelectionModeState.prototype.init = function () {
    this.designer.activeSubChart().objectsWithSeats().forEach(function (e) {
        e.enableSeatSelection()
    }), this.designer.activeSubChart().nonBookableObjects().forEach(e => e.blur())
}, mercator.SeatSelectionModeState.prototype.pressObject = mercator.ObjectsSelectedState.prototype.pressObject, mercator.SeatSelectionModeState.prototype.unpressObject = mercator.ObjectsSelectedState.prototype.unpressObject, mercator.SeatSelectionModeState.prototype.onObjectMouseDown = function (e, t) {
    ("chair" === e.type || e.canEnterInside()) && (this.pressObject(e), this.mouseDownPosition = mercator.Point.fromEvent(t, this.designer))
}, mercator.SeatSelectionModeState.prototype.onObjectMouseUp = function () {
    this.onCanvasMouseUp()
}, mercator.SeatSelectionModeState.prototype.onCanvasMouseDown = function (e) {
    this.mouseDownPosition = mercator.Point.fromEvent(e, this.designer)
}, mercator.SeatSelectionModeState.prototype.onCanvasMouseUp = function () {
    this.unpressObject()
}, mercator.SeatSelectionModeState.prototype.onCanvasMouseMove = function (e) {
    this.designer.mouseDown && (!this.mouseDownPosition || this.mouseDownPosition.distanceToPoint(mercator.Point.fromEvent(e, this.designer)) >= mercator.SeatSelectionModeState.SELECTION_MOUSE_MOVE_THRESHOLD_PX) && (this.unpressObject(), this.designer.setState(new mercator.SelectingSeatsState(mercator.Point.fromEvent(e, this.designer), this.designer)))
}, mercator.SeatSelectionModeState.prototype.onObjectClicked = function (e) {
    "chair" === e.type && this.designer.setState(new mercator.SeatsSelectedState([e], this.designer))
}, mercator.SeatSelectionModeState.prototype.onObjectDoubleClicked = function (e) {
    e.canEnterInside() && e.enter()
}, mercator.SeatSelectionModeState.prototype.onObjectMouseOver = function (e) {
    this.hoveredObject = e, e.showHUD(), "chair" === e.type && e.setCursor("hand")
}, mercator.SeatSelectionModeState.prototype.onObjectMouseOut = function (e) {
    this.hoveredObject === e && (this.hoveredObject = null), e.hideHUD(), "chair" === e.type && e.setCursor("default")
}, mercator.SeatSelectionModeState.prototype.reenter = function () {
    this.designer.setState(this)
}, mercator.SeatSelectionModeState.prototype.exit = function () {
    this.designer.activeSubChart().nonBookableObjects().forEach(e => e.unblur()), this.hoveredObject && this.hoveredObject.hideHUD(), this.designer.activeSubChart().objectsWithSeats().forEach(function (e) {
        e.enableObjectSelection()
    })
}, mercator.SeatSelectionModeState.SELECTION_MOUSE_MOVE_THRESHOLD_PX = 3;

mercator.SeatsSelectedState = function (e, t) {
    this.selectedObjects = e, this.selectedObjectsObject = new mercator.SelectedObjects(e, t, {
        canFlip: !1,
        canDuplicate: !1,
        canDelete: !1
    }), this.designer = t, this.selectionRectangle = null, this.hoveredObject = null, this.addObjectsModifierPressed = !1, this.selector = this.designer.itemSelector, this.name = "SeatsSelectedState", this.toolName = "select-seats", this.toolHint = "selected-seats-hint", this.cursor = "seat-selection"
},
    mercator.SeatsSelectedState.prototype = new mercator.ToolState, mercator.SeatsSelectedState.prototype.init = function () {
        this.designer.activeSubChart().nonBookableObjects().forEach(e => e.blur()), this.designer.activeSubChart().objectsWithSeats().forEach(e => {
            e.enableSeatSelection()
        }), this.selectedObjectsObject = new mercator.SelectedObjects(this.selectedObjects, this.designer), this.designer.setSelectedSubobjectsCount(this.selectedObjects.length), this.hasBooths = !1, this.selectedObjects.forEach(e => {
            e.highlight(), this.hasBooths = this.hasBooths || "booth" === e.type
        }), (this.designer.shiftWasPressed || this.designer.ctrlWasPressed) && this.addingObjectsStart(), this.drawRectangleAroundSelection()
    },
    mercator.SeatsSelectedState.prototype.onObjectMouseDown = mercator.SeatSelectionModeState.prototype.onObjectMouseDown, mercator.SeatsSelectedState.prototype.onObjectMouseUp = mercator.SeatSelectionModeState.prototype.onObjectMouseUp, mercator.SeatsSelectedState.prototype.drawRectangleAroundSelection = function () {
        this.selectionRectangle = mercator.Bbox.drawRectangle(this.selectedItemsBox(), this.designer), this.selectionRectangle.attr({
            r: this.hasBooths ? 0 : 10,
            stroke: "rgba(13, 77, 250, 0.6)",
            "stroke-width": Math.max(this.designer.zoomer.unzoom(2), 2)
        })
    }, mercator.SeatsSelectedState.prototype.selectedItemsBox = function () {
        return mercator.Bbox.mergedFromObjects(this.selectedObjects)
    }, mercator.SeatsSelectedState.prototype.onObjectClicked = function (e) {
        e.paintUnselected(), this.designer.setState(new mercator.SeatsSelectedState(this.determineNewSelectedObjects(e), this.designer))
    }, mercator.SeatsSelectedState.prototype.validObject = function (e) {
        return "chair" === e.type
    }, mercator.SeatsSelectedState.prototype.determineNewSelectedObjects = function (e) {
        return this.validObject(e) ? this.addObjectsModifierPressed ? _.xor(this.selectedObjects, [e]) : [e] : this.selectedObjects
    }, mercator.SeatsSelectedState.prototype.onObjectMouseOver = function (e) {
        this.hoveredObject = e, e.showHUD(), this.validObject(e) && this.notSelected(e) && e.setCursor("hand")
    }, mercator.SeatsSelectedState.prototype.onObjectMouseOut = function (e) {
        this.hoveredObject === e && (this.hoveredObject = null), e.hideHUD(), this.validObject(e) && this.notSelected(e) && e.setCursor("default")
    }, mercator.SeatsSelectedState.prototype.notSelected = function (e) {
        return -1 === this.selectedObjects.indexOf(e)
    }, mercator.SeatsSelectedState.prototype.hasSelectedObjects = function () {
        return this.selectedObjects && this.selectedObjects.length > 0
    }, mercator.SeatsSelectedState.prototype.getSelectedObjects = function () {
        return this.selectedObjects
    }, mercator.SeatsSelectedState.prototype.deselect = function () {
        this.designer.setState(new mercator.SeatSelectionModeState(this.designer))
    }, mercator.SeatsSelectedState.prototype.startSelecting = function (e) {
        this.selectionStartPoint = mercator.Point.fromEvent(e, this.designer), this.selector.startSelection(this.selectionStartPoint, e => "chair" === e.type), this.isSelecting = !0
    }, mercator.SeatsSelectedState.prototype.endSelecting = function () {
        this.designer.setState(new mercator.SeatsSelectedState(this.getSelectedAndSelectingObjects(), this.designer)), this.cancelSelecting()
    }, mercator.SeatsSelectedState.prototype.onShiftReleased = function () {
        if (this.isSelecting) return this.cancelSelecting(), this.designer.setState(new mercator.SelectingSeatsState(this.selectionStartPoint, this.designer)), void this.designer.getState().onCanvasMouseMove(this.lastCursorMoveEvent);
        this.addObjectsModifierPressed && this.addingObjectsEnd()
    }, mercator.SeatsSelectedState.prototype.cancelSelecting = mercator.ObjectsSelectedState.prototype.cancelSelecting, mercator.SeatsSelectedState.prototype.onCanvasMouseUp = mercator.ObjectsSelectedState.prototype.onCanvasMouseUp, mercator.SeatsSelectedState.prototype.onCanvasMouseDown = mercator.ObjectsSelectedState.prototype.onCanvasMouseDown, mercator.SeatsSelectedState.prototype.onCanvasClick = mercator.ObjectsSelectedState.prototype.onCanvasClick, mercator.SeatsSelectedState.prototype.onCanvasMouseMove = mercator.ObjectsSelectedState.prototype.onCanvasMouseMove, mercator.SeatsSelectedState.prototype.pressObject = mercator.ObjectsSelectedState.prototype.pressObject, mercator.SeatsSelectedState.prototype.unpressObject = mercator.ObjectsSelectedState.prototype.unpressObject, mercator.SeatsSelectedState.prototype.getSelectedAndSelectingObjects = mercator.ObjectsSelectedState.prototype.getSelectedAndSelectingObjects, mercator.SeatsSelectedState.prototype.onCtrlPressed = mercator.ObjectsSelectedState.prototype.onCtrlPressed, mercator.SeatsSelectedState.prototype.onCtrlReleased = mercator.ObjectsSelectedState.prototype.onCtrlReleased, mercator.SeatsSelectedState.prototype.onShiftPressed = mercator.ObjectsSelectedState.prototype.onShiftPressed, mercator.SeatsSelectedState.prototype.addingObjectsStart = mercator.ObjectsSelectedState.prototype.addingObjectsStart, mercator.SeatsSelectedState.prototype.addingObjectsEnd = mercator.ObjectsSelectedState.prototype.addingObjectsEnd, mercator.SeatsSelectedState.prototype.applySelectedObjectsPaint = mercator.ObjectsSelectedState.prototype.applySelectedObjectsPaint, mercator.SeatsSelectedState.prototype.refreshSelectedObjectsPaint = mercator.ObjectsSelectedState.prototype.refreshSelectedObjectsPaint, mercator.SeatsSelectedState.prototype.removeSelectedObjectsPaint = mercator.ObjectsSelectedState.prototype.removeSelectedObjectsPaint, mercator.SeatsSelectedState.prototype.reenter = mercator.ObjectsSelectedState.prototype.reenter, mercator.SeatsSelectedState.prototype.checkIfKeyUpEventShouldHaveFired = mercator.ObjectsSelectedState.prototype.checkIfKeyUpEventShouldHaveFired, mercator.SeatsSelectedState.prototype.onCanvasMouseMove = function (e) {
        this.designer.mouseDown && (this.addObjectsModifierPressed ? mercator.ObjectsSelectedState.prototype.onCanvasMouseMove.call(this, e) : (!this.mouseDownPosition || this.mouseDownPosition.distanceToPoint(mercator.Point.fromEvent(e, this.designer)) >= mercator.SeatSelectionModeState.SELECTION_MOUSE_MOVE_THRESHOLD_PX) && (this.unpressObject(), this.designer.setState(new mercator.SeatSelectionModeState(this.designer))))
    }, mercator.SeatsSelectedState.prototype.onEscapePressed = function () {
        this.deselect()
    }, mercator.SeatsSelectedState.prototype.reenterWithObjects = function (e) {
        this.designer.setState(new mercator.SeatsSelectedState(e, this.designer))
    }, mercator.SeatsSelectedState.prototype.onDelete = function () {
        if (this.selectedObjectsObject.canBeDeleted()) this.selectedObjectsObject.deleteSelectedObjects(), this.deselect();
        else {
            const e = this.selectedObjectsObject.cannotDeleteReason();
            e && alert(d(e))
        }
    }, mercator.SeatsSelectedState.prototype.exit = function () {
        this.designer.activeSubChart().nonBookableObjects().forEach(e => e.unblur()), this.hoveredObject && this.hoveredObject.hideHUD(), this.designer.activeSubChart().objectsWithSeats().forEach(function (e) {
            e.enableObjectSelection()
        }), this.designer.clearSelectedCount(), this.selectedObjects.forEach(e => {
            e.unhighlight(), e.paintUnselected()
        }), this.selector.deselectObjects(), this.selectionRectangle.remove()
    };
mercator.SelectingSeatsState = function (e, t) {
    this.startpoint = e, this.designer = t, this.name = "SelectingSeatsState", this.toolName = "select-seats", this.toolHint = "select-seats-hint", this.cursor = "seat-selection"
}, mercator.SelectingSeatsState.prototype = new mercator.ToolState, mercator.SelectingSeatsState.prototype.init = function () {
    this.designer.activeSubChart().nonBookableObjects().forEach(e => e.blur()), this.designer.itemSelector.startSelection(this.startpoint, e => "chair" === e.type), mercator.Drag.start()
}, mercator.SelectingSeatsState.prototype.onCanvasMouseMove = function (e) {
    this.designer.itemSelector.selectMultipleObjects(mercator.Point.fromEvent(e, this.designer))
}, mercator.SelectingSeatsState.prototype.onObjectMouseUp = function () {
    this.onCanvasMouseUp()
}, mercator.SelectingSeatsState.prototype.onCanvasMouseUp = function () {
    mercator.Drag.autoStopDrag(), this.designer.itemSelector.hasSelectedObjects() ? this.designer.setState(new mercator.SeatsSelectedState(this.designer.itemSelector.selectedObjects, this.designer)) : this.designer.setState(new mercator.SeatSelectionModeState(this.designer))
}, mercator.SelectingSeatsState.prototype.onCanvasMouseLeave = function () {
    this.designer.setState(new mercator.SeatSelectionModeState(this.designer))
}, mercator.SelectingSeatsState.prototype.reenter = function () {
    this.designer.setState(new mercator.SeatSelectionModeState(this.designer))
}, mercator.SelectingSeatsState.prototype.exit = function () {
    this.designer.activeSubChart().nonBookableObjects().forEach(e => e.unblur()), this.designer.itemSelector.stopSelecting()
};
mercator.RoundTableDrawingState = function (e) {
    this.designer = e, this.name = "RoundTableDrawingState", this.toolName = "table-round", this.toolHint = "clickToDraw-hint"
}, mercator.RoundTableDrawingState.prototype = new mercator.ToolState, mercator.RoundTableDrawingState.prototype.getInspectorSheets = function () {
    return {
        "RoundTable.chairs": this.getChairs()
    }
}, mercator.RoundTableDrawingState.prototype.setChairs = function (e) {
    this.designer.setToolProperty("RoundTable.chairs", e), this.designer.renderUI()
}, mercator.RoundTableDrawingState.prototype.getChairs = function () {
    return this.designer.getToolProperty("RoundTable.chairs")
}, mercator.RoundTableDrawingState.prototype.init = function () {
    this.onCanvasMouseMove(this.designer.lastMouseMoveEvent)
}, mercator.RoundTableDrawingState.prototype.onCanvasMouseMove = function (e) {
    this.designer.tableMousePointer.showAt(mercator.Point.fromEventSnapped(e, this.designer), mercator.Tables.createRoundTableMousePointer)
}, mercator.RoundTableDrawingState.prototype.onCanvasMouseLeave = function () {
    this.designer.tableMousePointer.hide()
}, mercator.RoundTableDrawingState.prototype.onObjectClicked = function (e, t) {
    this.onCanvasClick(t)
}, mercator.RoundTableDrawingState.prototype.onCanvasMouseDown = function (e) {
    this.designer.activeSubChart().tables.draw(mercator.Point.fromEventSnapped(e, this.designer), mercator.Tables.createRoundTable)
}, mercator.RoundTableDrawingState.prototype.onEscapePressed = function () {
    this.designer.uiEvents.toolSelectCursor()
}, mercator.RoundTableDrawingState.prototype.exit = function () {
    this.designer.tableMousePointer.hide()
}, mercator.RoundTableDrawingState.prototype.reenter = function () {
    this.designer.setState(this)
};
mercator.RectTableDrawingState = function (e) {
    this.designer = e, this.name = "RectTableDrawingState", this.toolName = "table-rectangle", this.toolHint = "clickToDraw-hint"
}, mercator.RectTableDrawingState.prototype = new mercator.ToolState, mercator.RectTableDrawingState.prototype.getInspectorSheets = function () {
    let e = this.getChairs();
    return {
        "RectangularTable.chairsTop": e.top,
        "RectangularTable.chairsBottom": e.bottom,
        "RectangularTable.chairsLeft": e.left,
        "RectangularTable.chairsRight": e.right,
        "Shape.width": this.getWidth(),
        "Shape.height": this.getHeight()
    }
}, mercator.RectTableDrawingState.prototype.setWidth = function (e) {
    this.designer.setToolProperty("RectTable.width", e), this.designer.renderUI()
}, mercator.RectTableDrawingState.prototype.setHeight = function (e) {
    this.designer.setToolProperty("RectTable.height", e), this.designer.renderUI()
}, mercator.RectTableDrawingState.prototype.setChairs = function (e, t) {
    let i = this.getChairs();
    i[t] = e, this.designer.setToolProperty("RectTable.chairs", i), this.designer.renderUI()
}, mercator.RectTableDrawingState.prototype.getChairs = function () {
    return this.designer.getToolProperty("RectTable.chairs")
}, mercator.RectTableDrawingState.prototype.getWidth = function () {
    return this.designer.getToolProperty("RectTable.width")
}, mercator.RectTableDrawingState.prototype.getHeight = function () {
    return this.designer.getToolProperty("RectTable.height")
}, mercator.RectTableDrawingState.prototype.init = function () {
    this.onCanvasMouseMove(this.designer.lastMouseMoveEvent)
}, mercator.RectTableDrawingState.prototype.onCanvasMouseMove = function (e) {
    this.designer.tableMousePointer.showAt(mercator.Point.fromEventSnapped(e, this.designer), mercator.Tables.createRectTableMousePointer)
}, mercator.RectTableDrawingState.prototype.onCanvasMouseLeave = function () {
    this.designer.tableMousePointer.hide()
}, mercator.RectTableDrawingState.prototype.onObjectClicked = function (e, t) {
    this.onCanvasClick(t)
}, mercator.RectTableDrawingState.prototype.onCanvasMouseDown = function (e) {
    this.designer.activeSubChart().tables.draw(mercator.Point.fromEventSnapped(e, this.designer), mercator.Tables.createRectTable)
}, mercator.RectTableDrawingState.prototype.onEscapePressed = function () {
    this.designer.uiEvents.toolSelectCursor()
}, mercator.RectTableDrawingState.prototype.reenter = function () {
    this.designer.setState(this)
}, mercator.RectTableDrawingState.prototype.exit = function () {
    this.designer.tableMousePointer.hide()
};
mercator.BrushSelectionModeState = function (t) {
    this.designer = t, this.name = "BrushSelectionModeState", this.toolName = "select-brush", this.toolHint = "select-hint", this.cursor = "brush"
}, mercator.BrushSelectionModeState.prototype = new mercator.ToolState, mercator.BrushSelectionModeState.prototype.onObjectMouseDown = function (t, e) {
    this.startSelecting(e, [t])
}, mercator.BrushSelectionModeState.prototype.onCanvasMouseDown = function (t) {
    this.startSelecting(t)
}, mercator.BrushSelectionModeState.prototype.startSelecting = function (t, e = []) {
    mercator.Drag.start(), this.designer.setState(new mercator.BrushSelectingState(mercator.Point.fromEvent(t, this.designer), this.designer, e))
}, mercator.BrushSelectionModeState.prototype.reenter = function () {
    this.designer.setState(this)
};
mercator.BrushSelectingState = function (e, t, s = []) {
    this.fromPosition = e, this.designer = t, this.initialSelectedObjects = s, this.name = "BrushSelectingState", this.toolName = "select-brush", this.toolHint = "select-hint", this.cursor = "brush"
}, mercator.BrushSelectingState.prototype = new mercator.ToolState, mercator.BrushSelectingState.prototype.init = function () {
    this.designer.chairMousePointer.hide(), this.designer.brushSelector.startSelection(this.fromPosition, null, this.initialSelectedObjects)
}, mercator.BrushSelectingState.prototype.onCanvasMouseUp = function () {
    this.designer.brushSelector.objectsSelected() ? this.designer.setState(new mercator.ObjectsBrushSelectedState(this.designer, this.designer.brushSelector.selectedObjects, {
        preSorted: !0
    })) : this.designer.setState(new mercator.BrushSelectionModeState(this.designer))
}, mercator.BrushSelectingState.prototype.onCanvasMouseMove = function (e) {
    this.designer.brushSelector.selectMultipleObjects(mercator.Point.fromEvent(e, this.designer)), this.designer.setSelectedSeatsCount(this.designer.brushSelector.selectedObjects)
}, mercator.BrushSelectingState.prototype.reenter = function () {
    this.designer.setState(new mercator.BrushSelectionModeState(this.designer))
}, mercator.BrushSelectingState.prototype.exit = function () {
    mercator.Drag.autoStopDrag(), this.designer.brushSelector.stopSelecting(), this.designer.brushSelector.deselectObjects(), this.designer.clearSelectedCount()
};
mercator.ObjectsBrushSelectedState = function (e, t, s) {
    this.designer = e, this.selectedObjects = t, this.selectedObjectsSettings = s, this.selectedObjectsObject = null, this.addObjectsModifierPressed = !1, this.selector = this.designer.brushSelector, this.name = "ObjectsBrushSelectedState", this.toolName = "select-brush", this.toolHint = "brush-selected-hint", this.cursor = "brush"
}, mercator.ObjectsBrushSelectedState.prototype = new mercator.ObjectsSelectedState, mercator.ObjectsBrushSelectedState.prototype.onObjectMouseDown = function (e, t) {
    this.mouseMovedWhileSelecting = !1, this.startSelecting(t, this.selectedObjects.includes(e) ? [] : [e])
}, mercator.ObjectsBrushSelectedState.prototype.onCanvasMouseDown = function (e) {
    this.checkIfKeyUpEventShouldHaveFired(e), this.mouseMovedWhileSelecting = !1, this.startSelecting(e)
}, mercator.ObjectsBrushSelectedState.prototype.startSelecting = function (e, t = []) {
    this.selectionStartPoint = mercator.Point.fromEvent(e, this.designer), this.addObjectsModifierPressed ? (this.designer.brushSelector.startSelection(this.selectionStartPoint, null, this.selectedObjects.concat(t)), this.designer.setSelectedSeatsCount(this.designer.brushSelector.selectedObjects), this.isSelecting = !0) : this.designer.setState(new mercator.BrushSelectingState(this.selectionStartPoint, this.designer, t))
}, mercator.ObjectsBrushSelectedState.prototype.onCanvasMouseMove = function (e) {
    this.isSelecting && this.selectionStartPoint.distanceToPoint(mercator.Point.fromEvent(e, this.designer)) > 3 && (this.mouseMovedWhileSelecting = !0), mercator.ObjectsSelectedState.prototype.onCanvasMouseMove.call(this, e)
}, mercator.ObjectsBrushSelectedState.prototype.onCanvasMouseUp = function () {
    this.addObjectsModifierPressed && this.mouseMovedWhileSelecting && (this.reenterWithObjects(this.selector.selectedObjects), this.selector.stopSelecting())
}, mercator.ObjectsBrushSelectedState.prototype.onShiftReleased = function () {
    if (this.isSelecting) return this.selector.freeze(), this.cancelSelecting(), this.designer.setState(new mercator.BrushSelectingState(this.selectionStartPoint, this.designer)), this.selector.unfreeze(), void this.selector.setSelectedObjects(this.selector.selectedObjects.filter(e => !this.selectedObjects.includes(e)));
    this.addObjectsModifierPressed && this.addingObjectsEnd()
}, mercator.ObjectsBrushSelectedState.prototype.onObjectClicked = function (e) {
    e.paintUnselected(), this.reenterWithObjects(this.determineNewSelectedObjects(e)), this.designer.getState().onObjectMouseOver(e)
}, mercator.ObjectsBrushSelectedState.prototype.onObjectDragStarted = function () { }, mercator.ObjectsBrushSelectedState.prototype.onObjectDragged = function () { }, mercator.ObjectsBrushSelectedState.prototype.onObjectDragEnded = function () { }, mercator.ObjectsBrushSelectedState.prototype.refreshSelectedObjectsPaint = function () { }, mercator.ObjectsBrushSelectedState.prototype.checkIfKeyUpEventShouldHaveFired = mercator.ObjectsSelectedState.prototype.checkIfKeyUpEventShouldHaveFired, mercator.ObjectsBrushSelectedState.prototype.endSelecting = function () {
    this.reenterWithObjects(this.getSelectedAndSelectingObjects()), this.cancelSelecting()
}, mercator.ObjectsBrushSelectedState.prototype.deselect = function () {
    this.designer.setState(new mercator.BrushSelectionModeState(this.designer))
}, mercator.ObjectsBrushSelectedState.prototype.reenterWithObjects = function (e) {
    this.designer.setState(new mercator.ObjectsBrushSelectedState(this.designer, e, this.selectedObjectsSettings))
};
mercator.BrushSelector = function (e) {
    this.designer = e, this.path = [], this.selectedObjects = [], this.indexPointer = 0, this.filter = null, this.frozen = !1, this.indicatorElements = mercator.set()
}, mercator.BrushSelector.prototype.startSelection = function (e, t = null, s = [], i = 0) {
    this.frozen || (this.selectedObjects = this.filterSelectableObjects(s), this.indexPointer = i, this.path = [e], this.filter = t, this.selectedObjects.length > 0 && this.paintSelected(this.selectedObjects))
}, mercator.BrushSelector.prototype.filterSelectableObjects = function (e) {
    const t = this.designer.activeSubChart().allSelectableObjects();
    return e.filter(e => t.includes(e)).filter(this.getFilter())
}, mercator.BrushSelector.prototype.selectMultipleObjects = function (e) {
    if (this.frozen || 0 === this.path.length) return;
    let t = _.last(this.path);
    _.last(this.path).distanceToPoint(e) > 6 / this.designer.zoomer.zoomLevel && (this.path.push(e), this.selectObjectsInLine(t, e), this.refreshTrail(this.path))
}, mercator.BrushSelector.prototype.deselectObjects = function () {
    this.frozen || (this.paintUnselected(this.selectedObjects), this.selectedObjects = [], this.clearTrail())
}, mercator.BrushSelector.prototype.stopSelecting = function () {
    this.frozen || (this.path = [])
}, mercator.BrushSelector.prototype.rayIntersectsWithRays = function (e, t) {
    return t.some(t => t.intersectionWithRay(e))
}, mercator.BrushSelector.prototype.freeze = function () {
    this.frozen = !0
}, mercator.BrushSelector.prototype.unfreeze = function () {
    this.frozen = !1
}, mercator.BrushSelector.prototype.setSelectedObjects = function (e) {
    this.paintUnselected(this.selectedObjects), this.selectedObjects = e, this.paintSelected(this.selectedObjects)
}, mercator.BrushSelector.prototype.selectObjectsInLine = function (e, t) {
    if (this.frozen) return;
    if (this.selectionRectangle && this.selectionRectangle.remove(), e.equals(t)) return;
    const s = new mercator.Ray(e, t);
    var i = this.designer.activeSubChart().allSelectableObjects().filter(this.getFilter()).filter(e => this.rayIntersectsWithRays(s, e.selectionArea().toRays())).filter(e => !this.selectedObjects.includes(e));
    i.sort((t, s) => t.getCenter().distanceToPoint(e) - s.getCenter().distanceToPoint(e));
    var r = _.difference(i, this.selectedObjects);
    this.selectedObjects = this.selectedObjects.concat(i), this.paintSelected(r, this.selectedObjects)
}, mercator.BrushSelector.prototype.paintSelected = function (e, t) {
    this.frozen || e.forEach((s, i) => {
        s.paintSelected(), this.designer.labelsShown && s.hideLabelAndChildLabels(), this.drawIndexIndicator((t || e).indexOf(s) + 1, s.getPerceptualCenter())
    })
}, mercator.BrushSelector.prototype.paintUnselected = function (e) {
    this.frozen || (e.forEach(e => {
        e.paintUnselected(), this.designer.labelsShown && e.showLabelAndChildLabels()
    }), this.indicatorElements.remove())
}, mercator.BrushSelector.prototype.drawIndexIndicator = function (e, t) {
    const s = Math.max(.75, 1 / this.designer.zoomer.zoomLevel);
    let i = this.designer.drawer.circle(t.x, t.y, 10 * s, {
        fill: "#0784fa",
        "stroke-width": 0
    }).toLayer("selectionRectanglesLayer", this.designer).applyZoom(this.designer),
        r = this.designer.drawer.text(t.x, t.y, e, {
            "font-size": 10 * s,
            fill: "white"
        }).toLayer("selectionRectanglesLayer", this.designer).applyZoom(this.designer);
    i.node.setAttribute("pointer-events", "none"), r.node.setAttribute("pointer-events", "none"), this.indicatorElements.push(i, r)
}, mercator.BrushSelector.prototype.clearTrail = function () {
    this.trailElement && this.trailElement.remove(), this.trailElement2 && this.trailElement.remove()
}, mercator.BrushSelector.prototype.refreshTrail = function (e) {
    this.clearTrail(), this.trailElement = this.designer.drawLineFromPointToPoint(e).attr({
        opacity: .4,
        stroke: "#0784fa",
        "stroke-width": 8 / this.designer.zoomer.zoomLevel,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
    }).toLayer("tempDrawingsLayer", this.designer)
}, mercator.BrushSelector.prototype.getFilter = function () {
    return this.filter ? this.filter : function () {
        return !0
    }
}, mercator.BrushSelector.prototype.objectsSelected = function () {
    return this.selectedObjects.length > 0
};
mercator.ShapeState = function (e, t) {
    this.designer = e, this.fromPosition = null, this.shapeCreator = t, this.name = "ShapeState", this.toolName = t ? "shape-" + t.toolName : null, this.toolHint = "clickDragToDraw-hint", this.shiftWasPressed = !1, this.cursor = "precision-drawing"
}, mercator.ShapeState.prototype = new mercator.ToolState, mercator.ShapeState.prototype.init = function () {
    this.shapeElement = null, this.positionGuides = mercator.set()
}, mercator.ShapeState.prototype.reenter = function () {
    this.designer.setState(new mercator.ShapeState(this.designer, this.shapeCreator))
}, mercator.ShapeState.prototype.exit = function () {
    this.shapeElement && this.shapeElement.remove(), this.positionGuides.remove()
}, mercator.ShapeState.prototype.onObjectMouseDown = function (e, t) {
    1 === t.which ? this.onCanvasMouseDown(t) : this.onCanvasRightMouseButtonDown(t)
}, mercator.ShapeState.prototype.onCanvasMouseDown = function (e) {
    this.fromPosition = mercator.Point.fromEventSnapped(e, this.designer)
}, mercator.ShapeState.prototype.onCanvasMouseUp = function (e) {
    if (this.shapeElement) {
        let e = this.shapeElement.rbox();
        e.width * e.height > this.designer.zoomer.unzoom(30) && this.onShapeCreated(), this.shapeElement.remove()
    }
    this.positionGuides.remove(), this.fromPosition = null
}, mercator.ShapeState.prototype.onShapeCreated = function () {
    var e = this.shapeCreator.createShape(this.designer.activeSubChart(), this.shiftWasPressed, this.fromPosition, this.toPosition);
    this.designer.activeSubChart().shapes.add(this.createShapedObject(e)).draw()
}, mercator.ShapeState.prototype.onEscapePressed = function () {
    this.designer.uiEvents.toolSelectCursor()
}, mercator.ShapeState.prototype.onCanvasRightMouseButtonDown = function () {
    this.reenter()
}, mercator.ShapeState.prototype.onShiftPressed = function () {
    this.shiftWasPressed = !0, this.drawShapeIfMouseDown()
}, mercator.ShapeState.prototype.onShiftReleased = function () {
    this.shiftWasPressed = !1, this.drawShapeIfMouseDown()
}, mercator.ShapeState.prototype.onCanvasMouseMove = function (e) {
    this.toPosition = mercator.Point.fromEventSnapped(e, this.designer), this.drawShapeIfMouseDown()
}, mercator.ShapeState.prototype.drawShapeIfMouseDown = function () {
    this.fromPosition && (this.shapeElement && this.shapeElement.remove(), this.shapeElement = this.shapeCreator.drawShapes(this.designer.activeSubChart(), this.shiftWasPressed, this.fromPosition, this.toPosition).attr(this.determineStyle()).toLayer("tempDrawingsLayer", this.designer).applyZoom(this.designer), this.positionGuides.remove(), this.positionGuides = mercator.PositionGuidesSupport.drawPositionGuidesFromBBox(this.designer, mercator.Bbox.fromView(this.shapeElement.rbox(), this.designer)))
}, mercator.ShapeState.prototype.determineStyle = function () {
    return {
        fill: mercator.ColorPalettes.defaults.SHAPE_FILL[this.designer.getCanvasColorScheme()],
        "stroke-width": 0
    }
}, mercator.ShapeState.prototype.createShapedObject = function (e) {
    return new mercator.ShapedObject(this.designer.activeSubChart(), e)
};
mercator.GeneralAdmissionState = function (e, t) {
    this.designer = e, this.shapeCreator = t, this.toolName = "ga-" + t.toolName, this.toolHint = "clickDragToDraw-hint"
}, mercator.GeneralAdmissionState.prototype = new mercator.ShapeState, mercator.GeneralAdmissionState.prototype.createShapedObject = function (e) {
    return new mercator.GeneralAdmissionArea(this.designer.activeSubChart(), e)
}, mercator.GeneralAdmissionState.prototype.onShapeCreated = function () {
    var e = this.shapeCreator.createShape(this.designer.activeSubChart(), this.shiftWasPressed, this.fromPosition, this.toPosition);
    this.designer.activeSubChart().generalAdmissionAreas.add(this.createShapedObject(e)).draw()
}, mercator.GeneralAdmissionState.prototype.determineStyle = function () {
    const e = mercator.Object.NO_CATEGORY_COLOR[this.designer.getCanvasColorScheme()];
    return {
        fill: mercator.Color.create(e).softenedBy(62, this.designer.isDarkCanvas()).toCSS(),
        stroke: e,
        "stroke-width": 2
    }
}, mercator.GeneralAdmissionState.prototype.reenter = function () {
    this.designer.setState(new mercator.GeneralAdmissionState(this.designer, this.shapeCreator))
};
mercator.IconDrawingState = function (t) {
    this.designer = t, this.name = "IconDrawingState", this.toolName = "icon", this.toolHint = "icon-hint", this.icon = this.getIcon()
}, mercator.IconDrawingState.prototype = new mercator.ToolState, mercator.IconDrawingState.prototype.getInspectorSheets = function () {
    return {
        "Icon.size": this.getSize(),
        "Icon.icon": this.getIcon(),
        "Icon.Selector": this.getIcon(),
        "Shape.rotation": this.getRotation()
    }
}, mercator.IconDrawingState.prototype.init = function () {
    this.onCanvasMouseMove(this.designer.lastMouseMoveEvent)
}, mercator.IconDrawingState.prototype.setSize = function (t) {
    this.designer.setToolProperty("Icon.size", t), this.designer.renderUI()
}, mercator.IconDrawingState.prototype.getSize = function () {
    return this.designer.getToolProperty("Icon.size")
}, mercator.IconDrawingState.prototype.getIcon = function () {
    return this.designer.getToolProperty("Icon.icon")
}, mercator.IconDrawingState.prototype.setIcon = function (t) {
    this.designer.setToolProperty("Icon.icon", t), this.designer.renderUI()
}, mercator.IconDrawingState.prototype.getRotation = function () {
    return this.designer.getToolProperty("Icon.rotation")
}, mercator.IconDrawingState.prototype.setRotation = function (t) {
    this.designer.setToolProperty("Icon.rotation", t), this.designer.renderUI()
}, mercator.IconDrawingState.prototype.reenter = function () {
    this.designer.setState(this)
}, mercator.IconDrawingState.prototype.onCanvasMouseMove = function (t) {
    this.designer.iconMousePointer.showAt(mercator.Point.fromEventSnapped(t, this.designer), this.getSize(), this.getIcon())
}, mercator.IconDrawingState.prototype.onCanvasMouseLeave = function () {
    this.designer.iconMousePointer.hide()
}, mercator.IconDrawingState.prototype.onObjectMouseDown = function (t, e) {
    this.onCanvasMouseDown(e)
}, mercator.IconDrawingState.prototype.onCanvasMouseDown = function (t) {
    const e = mercator.Icon.createIcon(mercator.Point.fromEventSnapped(t, this.designer), this.getSize(), this.getIcon(), this.designer.activeSubChart());
    this.designer.activeSubChart().icons.draw(e)
}, mercator.IconDrawingState.prototype.onEscapePressed = function () {
    this.designer.uiEvents.toolSelectCursor()
}, mercator.IconDrawingState.prototype.reenter = function () {
    this.designer.setState(this)
}, mercator.IconDrawingState.prototype.exit = function () {
    this.designer.iconMousePointer.hide()
};
mercator.HandState = class extends mercator.ToolState {
    constructor(e) {
        super(e), this.name = "HandState", this.toolName = "hand", this.toolHint = "hand-hint"
    }
    init() {
        this.designer.spacebarIsPressed = !1, this.designer.enableCanvasGrabber = !0
    }
    exit() {
        this.designer.enableCanvasGrabber = !1
    }
    onSpacebarPressed() { }
    onSpacebarReleased() { }
};
mercator.BoothsDrawingState = function (t) {
    this.designer = t, this.width = this.getWidth(), this.height = this.getHeight(), this.name = "BoothsDrawingState", this.toolName = "booth", this.toolHint = "clickToDraw-hint"
}, mercator.BoothsDrawingState.prototype = new mercator.ToolState, mercator.BoothsDrawingState.prototype.getInspectorSheets = function () {
    return {
        "Shape.width": this.getWidth(),
        "Shape.height": this.getHeight()
    }
}, mercator.BoothsDrawingState.prototype.init = function () {
    this.onCanvasMouseMove(this.designer.lastMouseMoveEvent)
}, mercator.BoothsDrawingState.prototype.setWidth = function (t) {
    this.designer.setToolProperty("Booth.width", t), this.designer.renderUI()
}, mercator.BoothsDrawingState.prototype.setHeight = function (t) {
    this.designer.setToolProperty("Booth.height", t), this.designer.renderUI()
}, mercator.BoothsDrawingState.prototype.getWidth = function () {
    return this.designer.getToolProperty("Booth.width")
}, mercator.BoothsDrawingState.prototype.getHeight = function () {
    return this.designer.getToolProperty("Booth.height")
}, mercator.BoothsDrawingState.prototype.onCanvasMouseMove = function (t) {
    this.designer.boothMousePointer.showAt(mercator.Point.fromEventSnapped(t, this.designer), this.getWidth(), this.getHeight())
}, mercator.BoothsDrawingState.prototype.onCanvasMouseLeave = function () {
    this.designer.boothMousePointer.hide()
}, mercator.BoothsDrawingState.prototype.onObjectMouseDown = function (t, e) {
    this.onCanvasMouseDown(e)
}, mercator.BoothsDrawingState.prototype.onCanvasMouseDown = function (t) {
    var e = mercator.Booth.createBooth(mercator.Point.fromEventSnapped(t, this.designer), this.getWidth(), this.getHeight(), this.designer.activeSubChart());
    this.designer.activeSubChart().booths.draw(e)
}, mercator.BoothsDrawingState.prototype.onEscapePressed = function () {
    this.designer.uiEvents.toolSelectCursor()
}, mercator.BoothsDrawingState.prototype.reenter = function () {
    this.designer.setState(this)
}, mercator.BoothsDrawingState.prototype.exit = function () {
    this.designer.boothMousePointer.hide()
};
mercator.ImageUploadState = class extends mercator.ToolState {
    constructor(e) {
        super(), this.designer = e, this.name = "imageUploadState", this.toolName = "image", this.toolHint = "clickToDraw-hint"
    }
    getInspectorSheets() {
        return {
            ImageUpload: null
        }
    }
    onEscapePressed() {
        this.designer.uiEvents.toolSelectCursor()
    }
    reenter() {
        this.designer.setState(this)
    }
};
mercator.SectionPolygonState = function (t) {
    this.designer = t, this.name = "sectionPolygonState", this.snapper = new mercator.PolygonDrawingSnapper(this.designer, ["closestCornerPoint"]), this.toolName = "section-polygon", this.toolHint = "nodesWithModifiers-hint", this.cursor = "precision-drawing"
}, mercator.SectionPolygonState.prototype = new mercator.ToolState, mercator.SectionPolygonState.prototype.init = function () {
    this.positionGuidesSet = new mercator.PositionGuidesSet(this.designer)
}, mercator.SectionPolygonState.prototype.onCanvasMouseMove = function (t) {
    let o = mercator.Point.fromEvent(t, this.designer),
        {
            snapCorner: n,
            snapPoint: e,
            snapType: s,
            snapRay: i,
            snapSecondRay: a
        } = this.snap(o);
    "closestCorner" === s ? this.snapCorner(n, s) : this.unsnapCorner(), e ? this.positionGuidesSet.refresh(mercator.PositionGuidesSupport.prototype.getPositionGuidesForPoint(this.designer, e, s, i, a)) : this.positionGuidesSet.undraw()
}, mercator.SectionPolygonState.prototype.onCanvasMouseDown = function (t) {
    this.toDrawingState(t)
}, mercator.SectionPolygonState.prototype.onObjectClicked = function (t, o) {
    this.onCanvasMouseDown(o)
}, mercator.SectionPolygonState.prototype.toDrawingState = function (t) {
    this.designer.setState(new mercator.SectionPolygonDrawingState(this.designer, this.snap(mercator.Point.fromEvent(t, this.designer)).snapPoint))
}, mercator.SectionPolygonState.prototype.onEscapePressed = function () {
    this.cancel()
}, mercator.SectionPolygonState.prototype.onCanvasRightMouseButtonDown = function () {
    this.reenter()
}, mercator.SectionPolygonState.prototype.snap = function (t) {
    return this.snapper.snap(null, t)
}, mercator.SectionPolygonState.prototype.cancel = function () {
    this.designer.uiEvents.toolSelectCursor()
}, mercator.SectionPolygonState.prototype.reenter = function () {
    this.designer.setState(new mercator.SectionPolygonState(this.designer))
}, mercator.SectionPolygonState.prototype.snapCorner = function (t, o) {
    this.lastSnapCorner !== t && (this.unsnapCorner(), this.lastSnapCorner = t, this.lastSnapCorner.snap(o))
}, mercator.SectionPolygonState.prototype.unsnapCorner = function () {
    this.lastSnapCorner && (this.lastSnapCorner.unsnap(), this.lastSnapCorner = null)
}, mercator.SectionPolygonState.prototype.exit = function () {
    this.unsnapCorner(), this.positionGuidesSet.undraw()
};
mercator.SectionPolygonDrawingState = function (t, o) {
    this.designer = t, this.name = "sectionPolygonDrawingState", this.line = new mercator.PolygonDrawingLine(t), this.points = [o], this.pointsAnchors = [], this.tempSectionShape = null, this.snapper = new mercator.PolygonDrawingSnapper(t, ["closestCornerPoint"]), this.toolName = "section-polygon", this.toolHint = "nodesWithModifiers-hint", this.cursor = "precision-drawing", this.cutoffAngle = mercator.PolygonSmoothener.DEFAULT_CUTOFF_ANGLE
}, mercator.SectionPolygonDrawingState.prototype = new mercator.ToolState, mercator.SectionPolygonDrawingState.prototype.init = function () {
    this.pointsAnchors.push(mercator.PolygonCornerPoint.drawCorner(this.points.last(), this.designer));
    const t = mercator.PositionGuidesSupport.prototype.getPositionGuidesForPoint(this.designer, this.points.last());
    this.positionGuidesSet = new mercator.PositionGuidesSet(this.designer, t).draw()
}, mercator.SectionPolygonDrawingState.prototype.refreshLinePosition = function () {
    let {
        snapPoint: t,
        snapType: o,
        snapRay: i,
        snapSecondRay: e
    } = this.snapper.snap(this.points.last(), this.lastMousePointerPosition, this.points);
    this.line.draw(this.points.beforeLast(), this.points.last(), t, o, this.cutoffAngle), mercator.PolygonCornerPoint.applyElementAttributes(this.line.corner, this.line.toPosition, o), this.positionGuidesSet.refresh(mercator.PositionGuidesSupport.prototype.getPositionGuidesForPoint(this.designer, t, o, i, e))
}, mercator.SectionPolygonDrawingState.prototype.onModifierChange = function () {
    this.refreshLinePosition()
}, mercator.SectionPolygonDrawingState.prototype.onCanvasMouseMove = function (t) {
    this.lastMousePointerPosition = mercator.Point.fromEvent(t, this.designer), this.refreshLinePosition()
}, mercator.SectionPolygonDrawingState.prototype.onCanvasMouseUp = function (t) {
    this.lastMousePointerPosition = mercator.Point.fromEvent(t, this.designer)
}, mercator.SectionPolygonDrawingState.prototype.onCanvasMouseDown = function (t) {
    this.addPoint(t)
}, mercator.SectionPolygonDrawingState.prototype.onObjectClicked = function (t, o) {
    this.onCanvasMouseDown(o)
}, mercator.SectionPolygonDrawingState.prototype.addPoint = function (t) {
    let {
        snapPoint: o
    } = this.snapper.snap(this.points.last(), mercator.Point.fromEvent(t, this.designer), this.points);
    this.points.first().equals(o) ? this.createPolygonShapedObjectAndAddToChart() : (this.points.push(o), this.pointsAnchors.push(mercator.PolygonCornerPoint.drawCorner(o, this.designer)), this.extendTempSectionShape(), this.refreshLinePosition())
}, mercator.SectionPolygonDrawingState.prototype.removePoint = function () {
    this.points.pop(), this.pointsAnchors.pop().remove(), this.extendTempSectionShape(), this.refreshLinePosition()
}, mercator.SectionPolygonDrawingState.prototype.createPolygonShapedObjectAndAddToChart = function () {
    if (!new mercator.PolygonShape(this.points).isAreaLargeEnough()) return;
    let t = mercator.Section.fromPoints(this.points, this.cutoffAngle, this.designer);
    this.designer.activeSubChart().sections.add(t), t.draw(), this.positionGuidesSet.undraw(), this.designer.setState(new mercator.SectionPolygonState(this.designer))
}, mercator.SectionPolygonDrawingState.prototype.extendTempSectionShape = function () {
    this.tempSectionShape && this.tempSectionShape.remove();
    const t = new mercator.LineSmoothener(this.points).smoothen(this.cutoffAngle, 3);
    this.tempSectionShape = this.designer.drawer.path(mercator.Section.pathString(t), {
        stroke: "#005cc5",
        "stroke-width": this.designer.zoomer.unzoom(1),
        "stroke-linejoin": "round"
    }).toLayer(mercator.Section.LAYER, this.designer).applyZoom(this.designer)
}, mercator.SectionPolygonDrawingState.prototype.onEscapePressed = function () {
    this.reenter()
}, mercator.SectionPolygonDrawingState.prototype.onCanvasRightMouseButtonDown = function () {
    this.points.length > 1 ? this.removePoint() : this.reenter()
}, mercator.SectionPolygonDrawingState.prototype.cancel = function () {
    this.designer.uiEvents.toolSelectCursor()
}, mercator.SectionPolygonDrawingState.prototype.reenter = function () {
    this.designer.setState(new mercator.SectionPolygonState(this.designer))
}, mercator.SectionPolygonDrawingState.prototype.exit = function () {
    this.tempSectionShape && this.tempSectionShape.remove(), this.positionGuidesSet && this.positionGuidesSet.undraw(), this.line.undraw(), this.pointsAnchors.forEach(t => t.remove())
};
mercator.SectionRectangleState = function (t) {
    this.designer = t, this.snapper = new mercator.PolygonDrawingSnapper(this.designer, ["closestCornerPoint"]), this.toolName = "section-rectangle", this.toolHint = "clickDragToDraw-hint", this.cursor = "precision-drawing"
}, mercator.SectionRectangleState.prototype = new mercator.SectionPolygonState, mercator.SectionRectangleState.prototype.toDrawingState = function (t) {
    this.designer.setState(new mercator.SectionRectangleDrawingState(this.designer, this.snap(mercator.Point.fromEvent(t, this.designer)).snapPoint))
}, mercator.SectionRectangleState.prototype.reenter = function () {
    this.designer.setState(new mercator.SectionRectangleState(this.designer))
};
mercator.SectionRectangleDrawingState = function (t, e) {
    this.designer = t, this.fromPosition = e, this.lines = this.createLines(t), this.points = this.createPoints(e), this.snapper = new mercator.PolygonDrawingSnapper(t, ["closestCornerPoint"]), this.toolName = "section-rectangle", this.toolHint = "clickDragToDraw-hint", this.cursor = "precision-drawing"
}, mercator.SectionRectangleDrawingState.prototype = new mercator.ToolState, mercator.SectionRectangleDrawingState.prototype.init = function () {
    this.positionGuidesSet = new mercator.PositionGuidesSet(this.designer, mercator.PositionGuidesSupport.prototype.getPositionGuidesForPoint(this.designer, this.fromPosition)).draw()
}, mercator.SectionRectangleDrawingState.prototype.createLines = function (t) {
    return [new mercator.PolygonDrawingLine(t), new mercator.PolygonDrawingLine(t), new mercator.PolygonDrawingLine(t), new mercator.PolygonDrawingLine(t)]
}, mercator.SectionRectangleDrawingState.prototype.createPoints = function (t) {
    return [t, t.addToX(1), t.addToXAndY(1, 1), t.addToY(1)]
}, mercator.SectionRectangleDrawingState.prototype.refreshPoints = function (t) {
    let [e, i, o, n] = this.points;
    i.x = t.x, o.x = t.x, o.y = t.y, n.y = t.y
}, mercator.SectionRectangleDrawingState.prototype.refreshRectangle = function () {
    let {
        snapPoint: t,
        snapType: e,
        snapRay: i,
        snapSecondRay: o
    } = this.snapper.snap(this.fromPosition, this.toPosition);
    this.refreshPoints(t);
    let [n, s, a, r] = this.points, [c, g, p, h] = this.lines;
    c.drawStraight(n, s), g.drawStraight(s, a, e), p.drawStraight(a, r), h.drawStraight(r, n), mercator.PolygonCornerPoint.applyElementAttributes(g.corner, g.toPosition, e), this.positionGuidesSet.refresh(mercator.PositionGuidesSupport.prototype.getPositionGuidesForPoint(this.designer, t, e, i, o))
}, mercator.SectionRectangleDrawingState.prototype.onModifierChange = function () {
    this.refreshRectangle()
}, mercator.SectionRectangleDrawingState.prototype.onCanvasMouseMove = function (t) {
    this.toPosition = mercator.Point.fromEvent(t, this.designer), this.refreshRectangle()
}, mercator.SectionRectangleDrawingState.prototype.onCanvasMouseUp = function (t) {
    new mercator.PolygonShape(this.points).area() >= mercator.PolygonShape.minimumInitialArea && this.createPolygonShapedObjectAndAddToChart(), this.designer.setState(new mercator.SectionRectangleState(this.designer))
}, mercator.SectionRectangleDrawingState.prototype.createPolygonShapedObjectAndAddToChart = function () {
    let t = mercator.Section.fromPoints(this.points, 180, this.designer);
    this.designer.activeSubChart().sections.add(t), t.draw()
}, mercator.SectionRectangleDrawingState.prototype.onEscapePressed = function () {
    this.reenter()
}, mercator.SectionRectangleDrawingState.prototype.onCanvasRightMouseButtonDown = function () {
    this.reenter()
}, mercator.SectionRectangleDrawingState.prototype.cancel = function () {
    this.designer.uiEvents.toolSelectCursor()
}, mercator.SectionRectangleDrawingState.prototype.reenter = function () {
    this.designer.setState(new mercator.SectionRectangleState(this.designer))
}, mercator.SectionRectangleDrawingState.prototype.exit = function () {
    this.positionGuidesSet && this.positionGuidesSet.undraw(), this.lines.forEach(t => t.undraw())
};
mercator.GeneralAdmissionPolygonDrawingState = function (e, t) {
    this.designer = e, this.fromPosition = t, this.line = new mercator.PolygonDrawingLine(e), this.points = [t], this.snapper = new mercator.PolygonDrawingSnapper(e, ["closestCornerPoint"]), this.toolName = "ga-polygon", this.toolHint = "nodesWithModifiers-hint", this.cursor = "precision-drawing", this.cutoffAngle = mercator.PolygonSmoothener.DEFAULT_CUTOFF_ANGLE
}, mercator.GeneralAdmissionPolygonDrawingState.prototype = new mercator.SectionPolygonDrawingState, mercator.GeneralAdmissionPolygonDrawingState.prototype.createPolygonShapedObjectAndAddToChart = function () {
    if (!new mercator.PolygonShape(this.points).isAreaLargeEnough()) return;
    const e = mercator.ShapedObjects.Polygon.fromPoints(this.designer.activeSubChart(), this.points, this.cutoffAngle);
    let t = new mercator.GeneralAdmissionArea(this.designer.activeSubChart(), e);
    this.designer.activeSubChart().generalAdmissionAreas.add(t), t.draw(), this.designer.setState(new mercator.GeneralAdmissionPolygonState(this.designer))
}, mercator.GeneralAdmissionPolygonDrawingState.prototype.reenter = function () {
    this.designer.setState(new mercator.GeneralAdmissionPolygonState(this.designer))
};
mercator.GeneralAdmissionPolygonState = function (e) {
    this.designer = e, this.snapper = new mercator.PolygonDrawingSnapper(this.designer, ["closestCornerPoint"]), this.toolName = "ga-polygon", this.toolHint = "nodesWithModifiers-hint", this.cursor = "precision-drawing"
}, mercator.GeneralAdmissionPolygonState.prototype = new mercator.SectionPolygonState, mercator.GeneralAdmissionPolygonState.prototype.toDrawingState = function (e) {
    this.designer.setState(new mercator.GeneralAdmissionPolygonDrawingState(this.designer, this.snap(mercator.Point.fromEvent(e, this.designer)).snapPoint))
}, mercator.GeneralAdmissionPolygonState.prototype.reenter = function () {
    this.designer.setState(new mercator.GeneralAdmissionPolygonState(this.designer))
};
mercator.ShapePolygonDrawingState = class extends mercator.SectionPolygonDrawingState {
    constructor(e, t) {
        super(), this.designer = e, this.fromPosition = t, this.line = new mercator.PolygonDrawingLine(e), this.points = [t], this.snapper = new mercator.PolygonDrawingSnapper(e, ["closestCornerPoint"]), this.toolName = "shape-polygon", this.toolHint = "nodesWithModifiers-hint", this.cursor = "precision-drawing", this.cutoffAngle = mercator.PolygonSmoothener.DEFAULT_CUTOFF_ANGLE
    }
    createPolygonShapedObjectAndAddToChart() {
        if (this.points.length < 3) return;
        const e = mercator.ShapedObjects.Polygon.fromPoints(this.designer.activeSubChart(), this.points, this.cutoffAngle);
        let t = new mercator.ShapedObject(this.designer.activeSubChart(), e);
        this.designer.activeSubChart().shapes.add(t), t.draw(), this.designer.setState(new mercator.ShapePolygonState(this.designer))
    }
    reenter() {
        this.designer.setState(new mercator.ShapePolygonState(this.designer))
    }
};
mercator.ShapePolygonState = class extends mercator.SectionPolygonState {
    constructor(e) {
        super(), this.designer = e, this.snapper = new mercator.PolygonDrawingSnapper(this.designer, ["closestCornerPoint"]), this.toolName = "shape-polygon", this.toolHint = "nodesWithModifiers-hint", this.cursor = "precision-drawing"
    }
    toDrawingState(e) {
        this.designer.setState(new mercator.ShapePolygonDrawingState(this.designer, this.snap(mercator.Point.fromEvent(e, this.designer)).snapPoint))
    }
    reenter() {
        this.designer.setState(new mercator.ShapePolygonState(this.designer))
    }
};
mercator.initializeEventHandlers = function (t) {
    $("#chartForm").submit(function (t) {
        t.preventDefault()
    })
};