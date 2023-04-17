
var _slicedToArray = function () {
    return function (e, t) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return function (e, t) {
            var o = [],
                a = !0,
                n = !1,
                s = void 0;
            try {
                for (var i, r = e[Symbol.iterator](); !(a = (i = r.next()).done) && (o.push(i.value), !t || o.length !== t); a = !0);
            } catch (e) {
                n = !0, s = e
            } finally {
                try {
                    !a && r.return && r.return()
                } finally {
                    if (n) throw s
                }
            }
            return o
        }(e, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }
}()
    ,
    _createClass = function () {
        function e(e, t) {
            for (var o = 0; o < t.length; o++) {
                var a = t[o];
                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
            }
        }
        return function (t, o, a) {
            return o && e(t.prototype, o), a && e(t, a), t
        }
    }();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _extends = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (e[a] = o[a])
    }
    return e
},
    mercatorStl = function (e) {
        function t(e) {
            _classCallCheck(this, t);
            var o = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
            return o.state = {
                helpMenuOpened: !1
            }, o.helpMenuRef = React.createRef(), o
        }
        return _inherits(t, React.Component), _createClass(t, [{
            key: "componentDidMount",
            value: function () {
                window.focus();
                console.log('======= INCIANDO DOCUMENTO ======')
            }
        }, {
            key: "getNavigatorAgent",
            value: function () {
                return navigator.userAgent.indexOf("Chrome") >= 0 ? "chrome" : navigator.userAgent.indexOf("Safari") >= 0 ? "safari" : navigator.userAgent.indexOf("Firefox") >= 0 ? "firefox" : "unknown"
            }
        }, {
            key: "showHelpMenuActions",
            //PODEMOS UTILIZAR COMO DROPDOWN
            value: function () {
                var e = this,
                    t = ReactDOM.findDOMNode(this.helpMenuRef.current).getBoundingClientRect(),
                    o = [{
                        type: "arrow-right",
                        caption: d("play-tutorial"),
                        uiEvent: "showTutorial"
                    }, {
                        type: "keyboard-shortcuts",
                        caption: d("keyboard-shortcuts"),
                        uiEvent: "showKeyboardShortcuts"
                    }];
                this.setState({
                    helpMenuOpened: !0
                }), mercator.designer.uiEvents.showContextualMenu(o, {
                    position: {
                        top: t.bottom + 3,
                        right: window.innerWidth - t.right
                    },
                    onSelect: this.onHelpMenuEvent.bind(this),
                    onClose: function () {
                        return e.setState({
                            helpMenuOpened: !1
                        })
                    }
                })
            }
        }, {
            key: "onHelpMenuEvent",
            value: function (e) {
                switch (this.setState({
                    helpMenuOpened: !1
                }), e) {
                    case "showTutorial":
                        alert('VAMOS TENTAR OUTRA COISA LEGAL AQUI')
                        // mercator.designer.uiEvents.restartFirstTimeTutorial();
                        break;
                    case "showKeyboardShortcuts":
                        alert('VAMOS TENTAR OUTRA COISA LEGAL AQUI');
                    // mercator.designer.uiEvents.showKeyboardShortcuts()
                }
            }
        }, {
            key: "render",
            value: function () {
                var e = this,
                    t = mercator.designer.uiEvents;
                if (this.props.uiState.floatingDialog) {
                    var o = this.props.uiState.floatingDialog.split("-"),
                        a = _slicedToArray(o, 2),
                        n = a[0],
                        s = a[1];
                    this.lastFloatingDialog = Dialogs.FloatingDialogs[n], this.lastDialogType = s
                }
                var i = this.lastFloatingDialog;
                if (this.props.uiState.floatingPicker) {
                    var r = this.props.uiState.floatingPicker;
                    this.lastFloatingPicker = Dialogs.FloatingPickers[r]
                }
                var l = this.lastFloatingPicker,
                    c = this.getNavigatorAgent(),
                    p = {
                        classNames: "scale-long",
                        timeout: {
                            enter: 800,
                            exit: 600
                        },
                        unmountOnExit: !0
                    },
                    u = {
                        classNames: "spring",
                        timeout: 500,
                        unmountOnExit: !0
                    },
                    h = {
                        classNames: "zoom-target",
                        timeout: 350,
                        unmountOnExit: !0
                    },
                    g = {
                        classNames: "fade",
                        timeout: 800,
                        unmountOnExit: !0
                    },
                    m = !this.props.designer.disabledFeatures.includes(mercator.Features.Type.FIRST_TIME_TUTORIAL) && !this.props.uiState.firstTimeTutorialDone && this.props.designer.loaded && !this.props.uiState.modalDialog,
                    S = this.props.uiState.modalDialog,
                    E = this.props.designer.loaded,
                    R = !!mercator.designer.onExitRequested,
                    f = mercator.designer.showSectionContentsEnabled();
                return React.createElement("div", {
                    className: "mercatorStl " + (this.props.uiState.cursor && "custom-cursor") + " agent-" + c + " canvas-" + this.props.document.colorScheme,
                    style: {
                        cursor: this.props.uiState.cursor
                    }
                }, React.createElement(ReactTransitionGroup.CSSTransition, _extends({}, p, {
                    in: !(!m && !E)
                }),
                    React.createElement("div", {
                        className: "panels-container"
                    },
                        React.createElement("div", {
                            className: "panel-row"
                        },
                            React.createElement(Panel, {
                                snap: "top"
                            },
                                React.createElement("div", {
                                    className: "group main"
                                },
                                    React.createElement("div", {
                                        className: "group document"
                                    }, R && React.createElement(ReactTransitionGroup.CSSTransition, _extends({}, u, {
                                        in: !!this.props.designer.atMasterSubChart,
                                        leave: !1
                                    }),
                                        React.createElement(Button, {
                                            preset: "icon",
                                            type: "close",
                                            size: 20,
                                            caption: d("save-and-exit"),
                                            onClick: function () {
                                                console.log('SALVAR')
                                                // t.requestCloseApp()
                                            }
                                        })),
                                        React.createElement(ReactTransitionGroup.CSSTransition, _extends({}, u, {
                                            in: !this.props.designer.atMasterSubChart,
                                            leave: !1
                                        }),
                                            React.createElement(Button, {
                                                preset: "icon-caption-small",
                                                type: "return",
                                                size: 20,
                                                caption: d("exit-section"),
                                                keyHint: buildShortcut([META_KEY, "Esc"]),
                                                onClick: function () {
                                                    t.actionExitSectionContents()
                                                }
                                            })),
                                        React.createElement(DocumentState, {
                                            document: this.props.document,
                                            designer: this.props.designer,
                                            saveState: this.props.uiState.save,
                                            lastSavedMoment: this.props.uiState.lastSavedMoment,
                                            saveErrorType: this.props.uiState.saveErrorType,
                                            hideDocumentName: !this.props.designer.atMasterSubChart,
                                            busyIndicators: this.props.busyIndicators
                                        }),

                                        // React.createElement(Button, {
                                        //     preset: "toolbar-icon",
                                        //     type: "view",
                                        //     caption: "" + d("preview"),
                                        //     selected: "Preview" === this.props.uiState.floatingDialog,
                                        //     onClick: function () {
                                        //         return t.togglePreviewDialog()
                                        //     }
                                        // }),
                                        //  "auto" === this.props.designer.canvasColorScheme && React.createElement(Button, {
                                        //     preset: "toolbar-icon",
                                        //     type: "dark" !== this.props.document.colorScheme ? "day" : "night",
                                        //     caption: "" + d("toggle-color-scheme"),
                                        //     selected: "dark" === this.props.document.colorScheme,
                                        //     onClick: function () {
                                        //         return t.toggleColorScheme()
                                        //     }
                                        // })
                                        React.createElement(ToolPicker, {
                                            designer: this.props.designer,
                                            disableTooltips: m
                                        })
                                    ),
                                    React.createElement("div", {
                                        className: "group designer"
                                    },
                                        React.createElement(Button, {
                                            preset: "toolbar-icon",
                                            type: "mail-reply",
                                            caption: d("undo") + " (" + buildShortcut([META_KEY, "Z"]) + ")",
                                            disabled: !this.props.uiState.canUndo,
                                            onClick: function () {
                                                return t.undo()
                                            }
                                        }),
                                        React.createElement(Button, {
                                            preset: "toolbar-icon",
                                            type: "mail-forward",
                                            caption: d("redo") + " (" + buildShortcut([META_KEY, SHIFT_KEY, "Z"]) + ")",
                                            disabled: !this.props.uiState.canRedo,
                                            onClick: function () {
                                                return t.redo()
                                            }
                                        })
                                    )),
                                // React.createElement("div", {
                                //     className: "separator"
                                // }),
                                React.createElement("div", {
                                    className: "group context-actions"
                                },
                                    React.createElement(ContextActions, {
                                        selection: this.props.selection,
                                        uiState: this.props.uiState
                                    })),
                                // React.createElement("div", {
                                //     className: "separator"
                                // }),
                                // React.createElement("div", {
                                //     className: "group"
                                // }, React.createElement(Button, {
                                //     preset: "toolbar-icon-dropdown-only",
                                //     type: "help",
                                //     caption: d("help"),
                                //     onMouseDown: function () {
                                //         return e.showHelpMenuActions()
                                //     },
                                //     dropdownSelected: this.state.helpMenuOpened,
                                //     ref: this.helpMenuRef
                                // }))
                            )),
                        React.createElement("div", {
                            className: "panel-row grow"
                        },
                            React.createElement(Panel, {
                                snap: "left"
                            },
                                //  React.createElement(ToolPicker, {
                                //     designer: this.props.designer,
                                //     disableTooltips: m
                                // })
                            ), React.createElement(CanvasGrabber, {
                                enabled: this.props.designer.enableCanvasGrabber,
                                spacebarIsPressed: this.props.designer.spacebarIsPressed
                            }), React.createElement(NavigationHUD, {
                                align: "left",
                                zoomLevel: this.props.designer.zoomLevel,
                                maxZoomLevel: this.props.designer.maxZoomLevel,
                                minZoomLevel: this.props.designer.minZoomLevel
                            }),
                            (!this.props.designer.disabledFeatures.includes(mercator.Features.Type.MULTIPLE_FLOORS) || this.props.document.floors > 1) && React.createElement(FloorPickerHUD, {
                                currentFloor: this.props.designer.currentFloor,
                                floors: this.props.document.floors,
                                canCreateNewFloor: this.props.designer.canCreateNewFloor,
                                canDeleteFloors: !this.props.designer.disabledFeatures.includes(mercator.Features.Type.MULTIPLE_FLOORS)
                            }),
                            // React.createElement(StatusBar, {
                            //     designer: this.props.designer,
                            //     selection: this.props.selection
                            // }),
                            // React.createElement(ChartOverlayMessages, {
                            //     messages: this.props.overlayMessages
                            // }),
                            React.createElement(Panel, {
                                snap: "right"
                            },
                                React.createElement(InspectorPanel, this.props))))), (!E || "chrome" !== c) && React.createElement(ReactTransitionGroup.CSSTransition, _extends({}, p, {
                                    in: !m && "venueTypeSelector" === S
                                }),
                                    React.createElement(Dialogs.ModalDialogs.VenueTypeSelectorDialog, null)), React.createElement(ReactTransitionGroup.CSSTransition, _extends({}, p, {
                                        in: !m && "referenceChartStartupDialog" === S
                                    }), React.createElement(Dialogs.ModalDialogs.ReferenceChartStartupDialog, {
                                        busyIndicators: this.props.busyIndicators
                                    })),
                    React.createElement(ReactTransitionGroup.CSSTransition, _extends({}, h, {
                        in: !m && "publishDraft" === S
                    }), React.createElement(Dialogs.ModalDialogs.PublishDialog, {
                        globalStats: this.props.document.globalStats,
                        hasMultipleFloors: this.props.document.floors > 1
                    })),
                    React.createElement(ReactTransitionGroup.CSSTransition, _extends({}, h, {
                        in: !m && "newFloor" === S
                    }),
                        React.createElement(Dialogs.ModalDialogs.NewFloorDialog, null)), React.createElement(ReactTransitionGroup.CSSTransition, _extends({}, h, {
                            in: !m && "labelEditingWarning" === S
                        }),
                            React.createElement(Dialogs.ModalDialogs.LabelEditingWarning, this.props)), React.createElement(ReactTransitionGroup.CSSTransition, _extends({}, h, {
                                in: !m && "GABookableAsAWholeWarning" === S
                            }),
                                React.createElement(Dialogs.ModalDialogs.GABookableAsAWholeWarning, this.props)), React.createElement(ReactTransitionGroup.CSSTransition, _extends({}, h, {
                                    in: !m && "categoryKeyEditWarning" === S
                                }),
                                    React.createElement(Dialogs.ModalDialogs.CategoryKeyEditWarning, this.props)), React.createElement(ReactTransitionGroup.CSSTransition, _extends({}, h, {
                                        in: !m && "exitWithErrors" === S
                                    }), React.createElement(Dialogs.ModalDialogs.ExitDialog, {
                                        globalStats: this.props.document.globalStats,
                                        hasMultipleFloors: this.props.document.floors > 1
                                    })),
                    React.createElement(ReactTransitionGroup.CSSTransition, _extends({}, g, {
                        in: !m && "referenceChartDialog" === S
                    }), React.createElement("div", {
                        className: "designer-modal-shade"
                    })),
                    React.createElement(ReactTransitionGroup.CSSTransition, _extends({}, {
                        classNames: "slide-in-up",
                        timeout: 700,
                        unmountOnExit: !0
                    }, {
                        in: !m && "referenceChartDialog" === S
                    }), React.createElement(Dialogs.ModalDialogs.ReferenceChartDialog, _extends({}, this.props, {
                        referenceChartScale: this.props.document.referenceChartScale
                    }))),
                    React.createElement(ReactTransitionGroup.CSSTransition, _extends({}, h, {
                        in: !m && "keyboardShortcuts" === S
                    }), React.createElement(Dialogs.ModalDialogs.KeyboardShortcuts, null)), React.createElement(ReactTransitionGroup.CSSTransition, _extends({}, p, {
                        in: !m && !E && !S
                    }), React.createElement("div", {
                        className: "loading"
                    }, "chrome" === c ? React.createElement("img", {
                        className: "loading-image",
                        src: "loading.png"
                    }) : React.createElement("div", {
                        className: "icon-saving"
                    }))), i && React.createElement(ReactTransitionGroup.CSSTransition, _extends({}, {
                        classNames: "scale",
                        timeout: 350,
                        unmountOnExit: !0
                    }, {
                        in: !!this.props.uiState.floatingDialog
                    }), React.createElement(i, {
                        type: this.lastDialogType,
                        designer: this.props.designer,
                        document: this.props.document,
                        selection: this.props.selection
                    })), l && React.createElement(ReactTransitionGroup.CSSTransition, _extends({}, {
                        classNames: "zoom",
                        timeout: 350,
                        unmountOnExit: !0
                    }, {
                        in: !!this.props.uiState.floatingPicker
                    }), React.createElement(l, this.props.uiState.floatingPickerProps)), React.createElement(ReactTransitionGroup.CSSTransition, _extends({}, g, {
                        in: !!m
                    }), React.createElement(FirstTimeTutorial, null)
                    ),
                    React.createElement(ReactTransitionGroup.CSSTransition, _extends({}, g, {
                        in: !!this.props.uiState.globalTooltipVisible
                    }), React.createElement(GlobalTooltip, {
                        position: this.props.uiState.globalTooltipPosition
                    }, this.props.uiState.globalTooltipContents)),
                    React.createElement(ContextualMenu, {
                        options: this.props.uiState.contextualMenuOptions,
                        settings: this.props.uiState.contextualMenuSettings
                    }))
            }
        }]), t
    }();

mercator.PANEL_DIMENSIONS = {
    leftPanelWidth: 43,
    topPanelHeight: 45,
    rightPanelWidth: 321,
    bottomPanelHeight: 26
},
    Dialogs = {
        FloatingDialogs: {},
        ModalDialogs: {},
        FloatingPickers: {}
    },
    Inspector = {
        Sheets: {},
        GUI: {}
    };
var _createClass = function () {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var n = t[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    return function (t, a, n) {
        return a && e(t.prototype, a), n && e(t, n), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _extends = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n])
    }
    return e
},
    FirstTimeTutorial = function (e) {
        function t(e) {
            _classCallCheck(this, t);
            var a = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
            return a.state = {
                stage: 0,
                stageVisible: 0,//MOSTRAR PRIMEIRO TUTORIAL
            },
                a.maxStages = 4,
                a.tutorialSlideEnter = 2400,
                a.tutorialSlideExit = 1500,
                a.onKeyDown = a.onKeyDown.bind(a),
                a
        }
        return _inherits(t, React.Component), _createClass(t, [{
            key: "componentDidMount",
            value: function () {
                document.addEventListener("keydown", this.onKeyDown)
            }
        }, {
            key: "componentWillUnmount",
            value: function () {
                document.removeEventListener("keydown", this.onKeyDown)
            }
        }, {
            key: "onKeyDown",
            value: function (e) {
                "Escape" === e.key && this.completeTutorial()
            }
        }, {
            key: "nextStage",
            value: function () {
                var e = this;
                this.state.stage < this.maxStages ? (
                    this.setState({
                        stage: this.state.stage + 1,
                        showBackdrop: !0
                    }),
                    setTimeout(function () {
                        return e.setState({
                            showBackdrop: !1
                        })
                    }, this.tutorialSlideExit)) : this.completeTutorial()
            }
        }, {
            key: "completeTutorial",
            value: function () {
                mercator.designer.uiEvents.completeFirstTimeTutorial()
            }
        }, {
            key: "getStage",
            value: function (e) {
                var t, a, n = this,
                    c = void 0,
                    r = void 0;
                switch (t = React.createElement("div", {
                    className: "main-action"
                }, React.createElement(Button, {
                    preset: "caption-icon",
                    type: "arrow-light-right",
                    caption: d(0 === e ? "take-tour" : e === this.maxStages ? "get-started" : "next"),
                    onClick: this.nextStage.bind(this)
                })), a = React.createElement("div", {
                    className: "secondary-action"
                }, React.createElement(Button, {
                    preset: "caption-icon",
                    type: "arrow-light-right-halt",
                    caption: d("skip"),
                    onClick: function () {
                        return n.completeTutorial()
                    }
                })), e) {
                    case 0:
                        c = "welcome", r = React.createElement("div", {
                            className: "contents"
                        }, React.createElement("div", {
                            className: "display-title"
                        }, React.createElement("div", {
                            className: "small"
                        }, d("welcome")), React.createElement("div", {
                            className: "large"
                        }, "Chart Designer")), t, a);
                        break;
                    case 1:
                        c = "main-toolbar", r = React.createElement("div", {
                            className: "contents"
                        }, React.createElement("div", {
                            className: "paragraphs"
                        }, React.createElement("div", null, React.createElement("h1", null, d("main-toolbar")), React.createElement("p", null, d("main-toolbar-tutorial-1"))), React.createElement("div", {
                            className: "group",
                            style: {
                                paddingRight: "48px"
                            }
                        }, React.createElement("div", {
                            className: "column"
                        }, React.createElement("p", null, d("main-toolbar-tutorial-2"))), React.createElement("div", {
                            className: "column"
                        }, React.createElement("p", null, d("main-toolbar-tutorial-3")), t))));
                        break;
                    case 2:
                        c = "tools";
                        var o = d("tools-tutorial-1", {
                            icon: '<span class="icon icon-tool-group-indicator"></span>'
                        });
                        r = React.createElement("div", {
                            className: "contents"
                        }, React.createElement("h1", null, d("tools")), React.createElement("p", null, d("tools-tutorial-2")), React.createElement("p", {
                            dangerouslySetInnerHTML: {
                                __html: o
                            }
                        }), t);
                        break;
                    case 3:
                        c = "inspector", r = React.createElement("div", {
                            className: "contents"
                        }, React.createElement("h1", null, d("object-inspector")), React.createElement("p", null, d("inspector-tutorial-1")), React.createElement("p", null, d("inspector-tutorial-2")), t);
                        break;
                    case 4:
                        c = "status", r = React.createElement("div", {
                            className: "contents"
                        }, React.createElement("h1", null, d("status-and-hints")), React.createElement("p", null, d("status-and-hints-tutorial")), t)
                }
                return React.createElement("div", {
                    className: "stage " + c
                }, React.createElement("div", {
                    className: "mask m1"
                }), React.createElement("div", {
                    className: "mask m2"
                }), React.createElement("div", {
                    className: "mask m3"
                }), React.createElement("div", {
                    className: "mask-glow"
                }), r)
            }
        }, {
            key: "render",
            value: function () {
                for (var e = {
                    classNames: "tutorial-slide",
                    timeout: {
                        enter: this.tutorialSlideEnter,
                        exit: this.tutorialSlideExit
                    },
                    unmountOnExit: !0
                }, t = [], a = 0; a <= this.maxStages; a++) t.push(React.createElement(ReactTransitionGroup.CSSTransition, _extends({}, e, {
                    in: this.state.stage === a && this.state.stageVisible,
                    key: "stage-" + a
                }), this.getStage(a)));
                return React.createElement("div", {
                    className: "FirstTimeTutorial"
                }, React.createElement("div", {
                    className: "backdrop " + (this.state.showBackdrop && "visible")
                }), t)
            }
        }]), t
    }();
var _createClass = function () {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }
    return function (e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e
    }
}();

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e
}

function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
}
Dialogs.FloatingDialog = function (t) {
    function e(t) {
        _classCallCheck(this, e);
        var n = _possibleConstructorReturn(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
        return n.state = {
            x: 0,
            y: 0,
            stretchX: 0,
            stretchY: 0,
            focus: !0
        }, n.positionDefaultSpacing = 20, n.handleWindowResize = n.handleWindowResize.bind(n), n.handleFocus = n.handleFocus.bind(n), n.draggingThreshold = 0, n.onMouseMoveBind = n.onMouseMove.bind(n), n.onMouseUpBind = n.onMouseUp.bind(n), n.handleDocumentMouseOut = n.handleDocumentMouseOut.bind(n), n
    }
    return _inherits(e, React.Component), _createClass(e, [{
        key: "componentDidMount",
        value: function () {
            window.addEventListener("resize", this.handleWindowResize), document.addEventListener("focusin", this.handleFocus), document.addEventListener("mousedown", this.handleFocus), document.addEventListener("mouseout", this.handleDocumentMouseOut), this.setState({
                focus: !0
            })
        }
    }, {
        key: "componentWillUnmount",
        value: function () {
            window.removeEventListener("resize", this.handleWindowResize), document.removeEventListener("focusin", this.handleFocus), document.removeEventListener("mousedown", this.handleFocus), document.removeEventListener("mouseout", this.handleDocumentMouseOut)
        }
    }, {
        key: "componentDidUpdate",
        value: function () {
            this.state.dragging || this.handleWindowResize()
        }
    }, {
        key: "setWrapperRef",
        value: function (t) {
            if (t && !this.wrapperRef) {
                this.wrapperRef = t;
                var e = document.getElementById("panel-top").clientHeight,
                    n = document.getElementById("panel-right").clientWidth;
                this.setState({
                    x: Math.max(this.positionDefaultSpacing, this.maxX() - n),
                    y: e + this.positionDefaultSpacing
                })
            }
        }
    }, {
        key: "handleWindowResize",
        value: function () {
            this.state.dragging || (this.state.x > this.maxX() && this.setState({
                x: Math.max(this.positionDefaultSpacing, this.maxX())
            }), this.state.y > this.maxY() && this.maxY() > this.positionDefaultSpacing && this.setState({
                y: Math.max(this.positionDefaultSpacing, this.maxY())
            }))
        }
    }, {
        key: "maxX",
        value: function () {
            return window.innerWidth - this.wrapperRef.clientWidth - this.positionDefaultSpacing
        }
    }, {
        key: "maxY",
        value: function () {
            return window.innerHeight - this.wrapperRef.clientHeight - this.positionDefaultSpacing
        }
    }, {
        key: "handleFocus",
        value: function (t) {
            this.wrapperRef && this.setState({
                focus: this.wrapperRef.contains(t.target)
            })
        }
    }, {
        key: "enterDraggingMode",
        value: function () {
            this.setState({
                dragging: !0
            }), mercator.designer.uiEvents.setCursor("grabbing")
        }
    }, {
        key: "refreshPosition",
        value: function () {
            if (this.currentAlpha) {
                var t = this.dragInitialDialogPosition.x - this.currentAlpha.x,
                    e = this.dragInitialDialogPosition.y - this.currentAlpha.y;
                this.setState({
                    x: Math.max(this.positionDefaultSpacing, Math.min(this.maxX(), t)),
                    y: Math.max(this.positionDefaultSpacing, Math.min(this.maxY(), e)),
                    stretchX: this.pow(t > this.maxX() ? t - this.maxX() : t < this.positionDefaultSpacing ? t - this.positionDefaultSpacing : 0, .8),
                    stretchY: this.pow(e > this.maxY() ? e - this.maxY() : e < this.positionDefaultSpacing ? e - this.positionDefaultSpacing : 0, .8)
                })
            }
        }
    }, {
        key: "pow",
        value: function (t, e) {
            return t >= 0 ? t ** e : -1 * Math.abs(t) ** e
        }
    }, {
        key: "leaveDraggingMode",
        value: function () {
            this.setState({
                dragging: !1,
                stretchX: 0,
                stretchY: 0
            }), this.currentAlpha = !1, this.refreshPosition(), mercator.designer.uiEvents.setCursor(null)
        }
    }, {
        key: "positionAbsAlpha",
        value: function (t, e) {
            return {
                x: Math.abs(t.x - e.clientX),
                y: Math.abs(t.y - e.clientY)
            }
        }
    }, {
        key: "positionAlpha",
        value: function (t, e) {
            return {
                x: t.x - e.clientX,
                y: t.y - e.clientY
            }
        }
    }, {
        key: "onMouseDown",
        value: function (t) {
            0 === t.button && (this.dragInitialDialogPosition = {
                x: this.state.x,
                y: this.state.y
            }, this.dragStartPosition = {
                x: t.clientX,
                y: t.clientY
            }, this.currentAlpha = {
                x: 0,
                y: 0
            }, this.enterDraggingMode(), window.addEventListener("mousemove", this.onMouseMoveBind), window.addEventListener("mouseup", this.onMouseUpBind), t.preventDefault(), t.stopPropagation())
        }
    }, {
        key: "onMouseMove",
        value: function (t) {
            this.state.dragging && (this.currentAlpha = this.positionAlpha(this.dragStartPosition, t), this.refreshPosition()), t.preventDefault(), t.stopPropagation()
        }
    }, {
        key: "onMouseUp",
        value: function (t) {
            if (window.removeEventListener("mousemove", this.onMouseMoveBind), window.removeEventListener("mouseup", this.onMouseUpBind), this.state.dragging) this.leaveDraggingMode();
            else {
                var e = this.positionAbsAlpha(this.dragStartPosition, t);
                e.x < this.draggingThreshold && e.y < this.draggingThreshold && mercator.designer.uiEvents.panToCenter()
            }
            t.preventDefault(), t.stopPropagation()
        }
    }, {
        key: "handleDocumentMouseOut",
        value: function (t) {
            var e = t.relatedTarget;
            e && "HTML" !== e.nodeName || this.leaveDraggingMode()
        }
    }, {
        key: "style",
        value: function () {
            return {}
        }
    }, {
        key: "onClose",
        value: function () {
            mercator.designer.uiEvents.closeFloatingDialog(), this.setState({
                focus: !1
            })
        }
    }, {
        key: "title",
        value: function () {
            return d("dialog")
        }
    }, {
        key: "contents",
        value: function () {
            return null
        }
    }, {
        key: "className",
        value: function () {
            return null
        }
    }, {
        key: "render",
        value: function () {
            var t = Object.assign({
                left: this.state.x + "px",
                top: this.state.y + "px"
            }, this.style());
            return this.state.dragging && (t.transform = "translate3d(" + this.state.stretchX + "px, " + this.state.stretchY + "px, 0)"), React.createElement("div", {
                className: "FloatingDialog " + (this.state.focus ? "focus" : "blur") + " " + (this.state.dragging && "dragging") + " " + this.className(),
                style: t,
                ref: this.setWrapperRef.bind(this)
            }, React.createElement("span", {
                className: "close-button"
            }, React.createElement(Button, {
                preset: "icon",
                type: "close",
                caption: d("close"),
                onClick: this.onClose.bind(this)
            })), React.createElement("div", {
                className: "title dragHandle",
                onMouseDown: this.onMouseDown.bind(this)
            }, this.title()), React.createElement("div", {
                className: "contents"
            }, this.contents()))
        }
    }]), e
}();
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }
    return function (t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Dialogs.ModalDialog = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "renderDialogContents",
        value: function () {
            return null
        }
    }, {
        key: "renderDialogActions",
        value: function (e) {
            return React.createElement("div", {
                className: "action select",
                onClick: function () {
                    return e.closeModalDialog()
                }
            }, d("close"))
        }
    }, {
        key: "className",
        value: function () {
            return ""
        }
    }, {
        key: "render",
        value: function () {
            var e = mercator.designer.uiEvents;
            return React.createElement("div", {
                className: "modal-container"
            }, React.createElement("div", {
                className: "backdrop",
                onClick: function () {
                    return e.closeModalDialog()
                }
            }), React.createElement("div", {
                className: this.className() + " modal-dialog zoom-target"
            }, this.renderDialogContents(e), React.createElement("div", {
                className: "dialog-actions"
            }, this.renderDialogActions(e))))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, o) {
        for (var t = 0; t < o.length; t++) {
            var s = o[t];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
        }
    }
    return function (o, t, s) {
        return t && e(o.prototype, t), s && e(o, s), o
    }
}();

function _classCallCheck(e, o) {
    if (!(e instanceof o)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, o) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !o || "object" != typeof o && "function" != typeof o ? e : o
}

function _inherits(e, o) {
    if ("function" != typeof o && null !== o) throw new TypeError("Super expression must either be null or a function, not " + typeof o);
    e.prototype = Object.create(o && o.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(e, o) : e.__proto__ = o)
}
var Button = function (e) {
    function o(e) {
        _classCallCheck(this, o);
        var t = _possibleConstructorReturn(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, e));
        return t.state = {
            pressed: !1
        }, t.onMouseUp = t.onMouseUp.bind(t), t.onHoldTriggered = !1, t
    }
    return _inherits(o, React.Component), _createClass(o, [{
        key: "onMouseDown",
        value: function (e) {
            var o = this;
            this.props.disabled || this.onHoldTriggered || (this.props.onMouseDown && this.props.onMouseDown(e), this.setState({
                pressed: !0
            }), this.dragStartPosition = {
                x: e.clientX,
                y: e.clientY
            }, this.props.onHold && (this.onHoldTimeout = setTimeout(function () {
                o.props.onHold(), o.onHoldTriggered = !0
            }, this.props.onHoldThreshold || 220)), window.addEventListener("mouseup", this.onMouseUp))
        }
    }, {
        key: "onMouseUp",
        value: function () {
            var e = this;
            this.props.disabled || (!this.onHoldTriggered && this.props.onMouseUp && this.props.onMouseUp(), this.setState({
                pressed: !1
            }), this.onHoldTimeout && clearTimeout(this.onHoldTimeout), window.removeEventListener("mouseup", this.onMouseUp), requestAnimationFrame(function () {
                return e.onHoldTriggered = !1
            }))
        }
    }, {
        key: "onMouseMove",
        value: function (e) {
            if (this.state.pressed && this.props.onDrag) {
                var o = this.dragStartPosition.x - e.clientX,
                    t = this.dragStartPosition.y - e.clientY;
                Math.sqrt(o * o + t * t) > (this.dragThreshold || 2) && this.props.onDrag()
            }
        }
    }, {
        key: "onClick",
        value: function (e) {
            var o = this;
            this.props.disabled || this.onHoldTriggered || (this.doubleClickTimeout ? this.props.onDoubleClick(e) : (this.props.onClick && this.props.onClick(e), this.props.onDoubleClick && (this.doubleClickTimeout = setTimeout(function () {
                o.doubleClickTimeout = null
            }, 300))))
        }
    }, {
        key: "triggerOnHold",
        value: function () {
            this.props.disabled || (this.onHoldTriggered = !0, this.setState({
                pressed: !1
            }), this.onHoldTimeout && clearTimeout(this.onHoldTimeout), window.removeEventListener("mouseup", this.onMouseUp), this.props.onHold && this.props.onHold())
        }
    }, {
        key: "compositeTooltip",
        value: function () {
            return (void 0 !== this.props.tooltip ? this.props.tooltip : this.props.caption || "") + (this.props.keyHint ? " (" + this.props.keyHint + ")" : "")
        }
    }, {
        key: "componentWillUnmount",
        value: function () {
            window.removeEventListener("mouseup", this.onMouseUp)
        }
    }, {
        key: "render",
        value: function () {
            if (this.props.invisible) return null;
            var e = void 0,
                o = void 0,
                t = void 0;

            switch (this.props.preset) {
                case "svg-icon":
                    o = this.compositeTooltip(), e = React.createElement("img", {
                        key: "image",
                        src: "buttonIcons/" + this.props.type + ".svg"
                    });
                    break;
                case "icon-caption":
                case "contextual-menu-item":
                case "caption-icon":
                case "icon-caption-link":
                case "caption-icon-link":
                case "icon-caption-small":
                    t = this.props.caption;
                case "icon":
                case "icon-circle":
                case "icon-soft":
                    o = t && !this.props.keyHint ? null : this.compositeTooltip(), e = React.createElement("div", {
                        key: "wrapper",
                        className: "wrapper"
                    }, React.createElement("div", {
                        key: "icon",
                        className: "icon fa fa-" + this.props.type //ALTERACAO ICONE BTN
                    }), t && React.createElement("div", {
                        key: "caption",
                        className: "caption"
                    }, this.props.caption));
                    break;
                case "hud-icon":
                    var icon = this.props.type;
                    switch (this.props.type) {
                        case "row-single":
                            icon = 'ellipsis-h';
                            break;
                        case "table-round":
                            icon = "circle-o";
                            break;
                        case "ga-rectangle":
                            icon = "square-o";
                            break;
                        case "shape-rectangle":
                            icon = "square";
                            break;
                        case "text":
                            icon = "text-width";
                            break;
                        case "delete":
                            icon = "trash-o";
                            break;
                        case "restrooms-unisex":
                            icon = "child";
                            break;
                    }
                    e = [React.createElement("div", {
                        key: "icon",
                        className: `icon fa fa-${icon}`
                    }),
                    React.createElement("div", {
                        key: "caption",
                        className: "caption"
                    }, this.props.caption)];
                    break;
                case "tool":
                case "icon-actions":
                    var icon = this.props.type;
                    switch (this.props.type) {
                        case "row-single":
                            icon = 'ellipsis-h';
                            break;
                        case "table-round":
                            icon = "circle-o";
                            break;
                        case "ga-rectangle":
                            icon = "square-o";
                            break;
                        case "shape-rectangle":
                            icon = "square";
                            break;
                        case "text":
                            icon = "text-width";
                            break;
                        case "delete":
                            icon = "trash-o";
                            break;
                        case "restrooms-unisex":
                            icon = "child";
                            break;
                    }
                    e = [React.createElement("div", {
                        key: "icon",
                        className: `icon fa fa-${icon}`
                    }),
                    React.createElement("div", {
                        key: "tooltip",
                        className: "tooltip"
                    },
                        this.props.caption, " ", this.props.keyHint && React.createElement("div", {
                            className: "key-hint"
                        },
                            this.props.keyHint))];
                    break;
                case "hud-icon":
                case "hud-icon-circle":
                case "inspector-icon":
                case "toolbar-icon":
                case "switcher":
                    var icon = this.props.type;
                    switch (this.props.type) {
                        case "row-single":
                            icon = 'ellipsis-h';
                            break;
                        case "table-round":
                            icon = "circle-o";
                            break;
                        case "ga-rectangle":
                            icon = "square-o";
                            break;
                        case "shape-rectangle":
                            icon = "square";
                            break;
                        case "text":
                            icon = "text-width";
                            break;
                        case "delete":
                            icon = "trash-o";
                            break;
                        case "restrooms-unisex":
                            icon = "child";
                            break;
                    }
                    o = this.compositeTooltip(), e = React.createElement("div", {
                        key: "icon",
                        className: `icon fa fa-${icon}`
                    });
                    break;
                case "hud-caption":
                case "switcher-caption":
                    o = this.compositeTooltip(), e = React.createElement("div", {
                        key: "caption",
                        className: "caption"
                    }, this.props.caption);
                    break;
                case "toolbar-icon-dropdown":
                case "toolbar-icon-dropdown-only":
                    o = this.compositeTooltip(), e = [React.createElement("div", {
                        key: "icon",
                        className: "icon fa fa-" + this.props.type
                    }), React.createElement("div", {
                        key: "icon-arrow",
                        className: "dropdown icon-arrow-medium-down",
                        onMouseDown: this.triggerOnHold.bind(this)
                    })];
                    break;
                default:
                    e = this.props.caption
            }
            var s = this.props.size ? {
                fontSize: this.props.size + "px"
            } : {};
            return React.createElement("button", {
                className: "Button preset-" + this.props.preset + " color-" + this.props.color + " " + (this.props.selected && "selected") + " " + (this.props.dropdownSelected && "dropdown-selected") + " " + (t && "with-caption") + " " + (this.props.showTooltip && "show-tooltip") + " " + (this.props.softTooltip && "soft-tooltip") + " " + this.props.className,
                style: this.props.style ? s.merge(this.props.style) : s,
                onMouseOver: this.props.onMouseOver,
                onMouseOut: this.props.onMouseOut,
                onMouseMove: this.onMouseMove.bind(this),
                onMouseDown: this.onMouseDown.bind(this),
                onMouseUp: this.onMouseUp.bind(this),
                onClick: this.onClick.bind(this),
                disabled: this.props.disabled,
                title: o || "",
                tabIndex: this.props.tabIndex,
                ref: this.props.childRef
            }, e)
        }
    }]), o
}();

var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }
    return function (t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}

var CanvasGrabber = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return n.state = {
            dragging: !1
        }, n.draggingThreshold = 1, n.onMouseMove = n.onMouseMove.bind(n), n.onMouseUp = n.onMouseUp.bind(n), n
    }
    return _inherits(t, React.PureComponent), _createClass(t, [{
        key: "componentDidMount",
        value: function () {
            window.addEventListener("mousemove", this.onMouseMove)
        }
    }, {
        key: "componentWillUnmount",
        value: function () {
            window.removeEventListener("mousemove", this.onMouseMove)
        }
    }, {
        key: "componentDidUpdate",
        value: function (e) {
            e.enabled === this.props.enabled || this.state.dragging || mercator.designer.uiEvents.setCursor(this.props.enabled ? "grab" : null)
        }
    }, {
        key: "enterDraggingMode",
        value: function () {
            this.setState({
                dragging: !0
            }), mercator.designer.uiEvents.setCursor("grabbing")
        }
    }, {
        key: "leaveDraggingMode",
        value: function () {
            this.setState({
                dragging: !1
            }), mercator.designer.uiEvents.setCursor(null)
        }
    }, {
        key: "commitCanvasPan",
        value: function (e) {
            var t = this.positionAlpha(this.dragLastPosition, e);
            0 === t.x && 0 === t.y || (mercator.designer.uiEvents.pan(t.x, t.y), this.dragLastPosition = {
                x: e.clientX,
                y: e.clientY
            })
        }
    }, {
        key: "positionAbsAlpha",
        value: function (e, t) {
            return {
                x: Math.abs(e.x - t.clientX),
                y: Math.abs(e.y - t.clientY)
            }
        }
    }, {
        key: "positionAlpha",
        value: function (e, t) {
            return {
                x: e.x - t.clientX,
                y: e.y - t.clientY
            }
        }
    }, {
        key: "onMouseDown",
        value: function (e) {
            window.addEventListener("mouseup", this.onMouseUp), this.dragLastPosition = {
                x: e.clientX,
                y: e.clientY
            }, this.enterDraggingMode(), e.preventDefault(), e.stopPropagation()
        }
    }, {
        key: "onMouseMove",
        value: function (e) {
            this.isVisible() && (this.state.dragging ? (mercator.designer.uiEvents.setCursor("grabbing"), this.commitCanvasPan(e)) : mercator.designer.uiEvents.setCursor(null), e.preventDefault(), e.stopPropagation())
        }
    }, {
        key: "onMouseUp",
        value: function (e) {
            window.removeEventListener("mouseup", this.onMouseUp), this.state.dragging && this.leaveDraggingMode(), e.preventDefault(), e.stopPropagation()
        }
    }, {
        key: "isVisible",
        value: function () {
            return this.props.enabled || this.state.dragging
        }
    }, {
        key: "render",
        value: function () {
            return React.createElement("div", {
                className: "CanvasGrabber " + (this.isVisible() && "visible") + " " + (this.isVisible() && !this.props.spacebarIsPressed && "as-current-state"),
                onMouseDown: this.onMouseDown.bind(this)
            })
        }
    }]), t
}();

var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }
    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var CategoryInput = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return n.state = {
            editing: !1,
            pickerType: null
        }, n.handleClickOutside = n.handleClickOutside.bind(n), n.scrollContainerRef = React.createRef(), n
    }
    return _inherits(t, React.PureComponent), _createClass(t, [{
        key: "componentDidMount",
        value: function () {
            document.addEventListener("mousedown", this.handleClickOutside), this.boundingClientRect = this.getBoundingClientRect()
        }
    }, {
        key: "componentWillUnmount",
        value: function () {
            document.removeEventListener("mousedown", this.handleClickOutside)
        }
    }, {
        key: "componentDidUpdate",
        value: function () {
            this.boundingClientRect = this.getBoundingClientRect()
        }
    }, {
        key: "handleClickOutside",
        value: function (e) {
            this.wrapperRef && !this.wrapperRef.contains(e.target) && this.leaveEditMode()
        }
    }, {
        key: "enterEditMode",
        value: function () {
            this.setState({
                editing: !0
            }), this.props.onEditStart && this.props.onEditStart()
        }
    }, {
        key: "leaveEditMode",
        value: function () {
            this.setState({
                editing: !1
            }), this.props.onEditEnd && this.props.onEditEnd()
        }
    }, {
        key: "toggleEditMode",
        value: function () {
            this.state.editing ? this.leaveEditMode() : this.enterEditMode()
        }
    }, {
        key: "getUniqueValuesArray",
        value: function () {
            return Array.isArray(this.props.value) ? _.uniq(this.props.value) : [this.props.value]
        }
    }, {
        key: "onSelect",
        value: function (e) {
            var t = this.getUniqueValuesArray();
            t.length > 1 || !t.includes(e) ? mercator.designer.uiEvents.setSelectionCategory(e) : mercator.designer.uiEvents.removeSelectionCategory(), this.leaveEditMode()
        }
    }, {
        key: "getBoundingClientRect",
        value: function () {
            return this.wrapperRef ? ReactDOM.findDOMNode(this.wrapperRef).getBoundingClientRect() : {}
        }
    }, {
        key: "verticalPosition",
        value: function () {
            return this.boundingClientRect && this.boundingClientRect.y < document.documentElement.clientHeight / 2 ? "below" : "above"
        }
    }, {
        key: "arrowDirection",
        value: function () {
            return this.state.editing ? "right" : "left"
        }
    }, {
        key: "allPalettes",
        value: function () {
            return mercator.ColorPalettes.sets[this.props.paletteSet] || []
        }
    }, {
        key: "allPaletteColors",
        value: function () {
            return this.allPalettes().flatMap(function (e) {
                return e.colors
            })
        }
    }, {
        key: "isAPaletteColor",
        value: function (e) {
            return this.allPaletteColors().includes(e.toCSSHex())
        }
    }, {
        key: "scrollToPosition",
        value: function (e) {
            ReactDOM.findDOMNode(this.scrollContainerRef.current).scroll(0, e - 27)
        }
    }, {
        key: "render",
        value: function () {
            var e = this,
                t = _.uniq(Array.isArray(this.props.value) ? this.props.value : [this.props.value]).map(function (t) {
                    return e.props.categories.find(function (e) {
                        return e.key === t
                    })
                }).filter(function (e) {
                    return e
                }),
                n = 0 === t.length,
                i = n ? d("no-category") : t.map(function (e) {
                    return e.label
                }).join(", "),
                o = 0 === this.props.categories.length;
            return React.createElement("div", {
                className: "CategoryInput " + (this.props.disabled || o ? "disabled" : "") + " " + (this.state.editing ? "editing" : "") + " " + this.verticalPosition(),
                title: i,
                ref: function (t) {
                    return e.wrapperRef = t
                },
                onContextMenu: function (e) {
                    return e.preventDefault()
                }
            }, React.createElement("div", {
                className: "value",
                onMouseDown: function (t) {
                    t.preventDefault(), e.toggleEditMode()
                }
            }, o ? React.createElement("div", {
                className: "label center"
            }, d("chart-no-categories")) : React.createElement(React.Fragment, null, React.createElement("div", {
                className: "colors"
            }, t.slice(0, 4).map(function (e) {
                return React.createElement("div", {
                    className: "color-sample",
                    key: e.key
                }, React.createElement("div", {
                    className: "color",
                    style: {
                        backgroundColor: e.color
                    }
                }))
            })), React.createElement("div", {
                className: "label " + (n && "center")
            }, i), React.createElement("div", {
                className: "icon icon-arrow-light-" + this.arrowDirection()
            }))), React.createElement(ReactTransitionGroup.CSSTransition, {
                classNames: "zoom",
                timeout: 300,
                in: this.state.editing,
                unmountOnExit: !0
            }, React.createElement("div", {
                className: "picker-popup",
                ref: this.scrollContainerRef
            }, React.createElement(CategoryPicker, {
                categories: this.props.categories,
                value: this.props.value,
                selectable: !0,
                editingDisabled: !0,
                onSelect: this.onSelect.bind(this),
                onSelectedItemRectSet: function (t) {
                    return requestAnimationFrame(function () {
                        return e.scrollToPosition(t.offsetTop)
                    })
                }
            }))))
        }
    }]), t
}();

var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var CategoryPicker = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return n.state = {
            editingKey: null,
            focusingKey: null
        }, n.selectedItemRef = React.createRef(), n
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "shouldComponentUpdate",
        value: function (e, t) {
            return differentObjectValues(this.state, t) || differentObjectValues(this.props, e, ["value", "categories", "disabled", "canApply", "onReorderItem", "editingDisabled"])
        }
    }, {
        key: "componentDidMount",
        value: function () {
            if (this.selectedItemRef.current && this.props.onSelectedItemRectSet) {
                var e = ReactDOM.findDOMNode(this.selectedItemRef.current);
                this.props.onSelectedItemRectSet(e.parentNode)
            }
        }
    }, {
        key: "onSelect",
        value: function (e) {
            this.props.onSelect && this.props.onSelect(e)
        }
    }, {
        key: "onDelete",
        value: function (e) {
            mercator.designer.uiEvents.deleteCategory(e)
        }
    }, {
        key: "toggleAccessible",
        value: function (e) {
            mercator.designer.uiEvents.toggleCategoryAccessible(e)
        }
    }, {
        key: "setColor",
        value: function (e, t) {
            mercator.designer.uiEvents.setCategoryColor(e, t)
        }
    }, {
        key: "setName",
        value: function (e, t) {
            mercator.designer.uiEvents.setCategoryName(e, t)
        }
    }, {
        key: "createCategory",
        value: function () {
            var e = this,
                t = mercator.designer.uiEvents.createCategory();
            this.setState({
                editingKey: t,
                focusingKey: t
            }), requestAnimationFrame(function () {
                return e.wrapperRef.scroll(0, 1e6)
            })
        }
    }, {
        key: "editCategory",
        value: function (e) {
            this.setState({
                editingKey: e
            })
        }
    }, {
        key: "stopEditing",
        value: function () {
            this.setState({
                editingKey: null
            })
        }
    }, {
        key: "renderDraggableList",
        value: function () {
            var e = this;
            if (0 === this.props.categories.length) return null;
            var t = Array.isArray(this.props.value) ? this.props.value : [this.props.value],
                n = this.props.categories.filter(function (e) {
                    return t.includes(e.key)
                }),
                r = n[0] && n[0].key;
            return React.createElement(DraggableList, {
                rowHeight: 29,
                onReorderItem: this.props.onReorderItem
            }, this.props.categories.map(function (n, i) {
                var o = t.includes(n.key);
                return React.createElement(CategoryPickerOption, {
                    key: n.key,
                    categoryKey: n.key,
                    color: n.color,
                    name: n.label,
                    accessible: n.accessible,
                    selectable: e.props.selectable,
                    disabled: e.props.disabled,
                    editingDisabled: e.props.editingDisabled,
                    alwaysEditing: !e.props.editingDisabled,
                    autoFocus: n.key === e.state.focusingKey,
                    onEditStart: function () {
                        return e.editCategory(n.key)
                    },
                    onEditEnd: function () {
                        return e.stopEditing()
                    },
                    selected: o,
                    onSelect: e.onSelect.bind(e, n.key),
                    onDelete: e.onDelete.bind(e, n.key),
                    onToggleAccessible: e.toggleAccessible.bind(e, n.key),
                    onColorChange: e.setColor.bind(e, n.key),
                    onNameChange: e.setName.bind(e, n.key),
                    tabIndex: 100 + i,
                    ref: r === n.key ? e.selectedItemRef : void 0
                })
            }))
        }
    }, {
        key: "render",
        value: function () {
            var e = this;
            return React.createElement("div", {
                className: "CategoryPicker",
                ref: function (t) {
                    return e.wrapperRef = t
                }
            }, !this.props.disabled && !this.props.editingDisabled && React.createElement("div", {
                className: "CategoryPickerOption create",
                onClick: this.createCategory.bind(this)
            }, React.createElement("div", {
                className: "description"
            }, React.createElement("div", {
                className: "color"
            }, React.createElement("div", {
                className: "icon icon-plus-bold"
            })), React.createElement("div", {
                className: "caption"
            }, d("create-new-category")))), this.renderDraggableList())
        }
    }]), t
}();

var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }
    return function (t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}

var CategoryPickerOption = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return n.state = {
            contextualMenuOpened: !1,
            focus: !1
        }, n.onContextualMenu = n.onContextualMenu.bind(n), n.handleClickOutside = n.handleClickOutside.bind(n), n.wrapperRef = React.createRef(), n.textInputRef = React.createRef(), n.pendingNameChanges = void 0, n
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "componentDidMount",
        value: function () {
            document.addEventListener("mousedown", this.handleClickOutside)
        }
    }, {
        key: "componentWillUnmount",
        value: function () {
            document.removeEventListener("mousedown", this.handleClickOutside)
        }
    }, {
        key: "handleClickOutside",
        value: function (e) {
            this.props.alwaysEditing || this.props.editing && this.wrapperRef.current && !this.wrapperRef.current.contains(e.target) && (e.preventDefault(), e.stopPropagation(), this.leaveEditMode())
        }
    }, {
        key: "contextMenuOptions",
        value: function () {
            return [{
                type: "edit",
                caption: d("edit"),
                uiEvent: "edit"
            }, {
                type: "delete",
                caption: d("delete"),
                uiEvent: "delete"
            }]
        }
    }, {
        key: "onContextualMenu",
        value: function (e) {
            var t = this;
            e.preventDefault(), this.props.editingDisabled || (this.setState({
                contextualMenuOpened: !0
            }), mercator.designer.uiEvents.showContextualMenu(this.contextMenuOptions(), {
                position: {
                    left: e.clientX,
                    top: e.clientY
                },
                onSelect: this.onContextMenuEvent.bind(this),
                onClose: function () {
                    return t.setState({
                        contextualMenuOpened: !1
                    })
                }
            }))
        }
    }, {
        key: "onContextMenuEvent",
        value: function (e) {
            switch (this.setState({
                contextualMenuOpened: !1
            }), e) {
                case "edit":
                    this.enterEditMode();
                    break;
                case "delete":
                    this.props.onDelete()
            }
        }
    }, {
        key: "enterEditMode",
        value: function () {
            this.props.onEditStart()
        }
    }, {
        key: "leaveEditMode",
        value: function () {
            void 0 !== this.pendingNameChanges && this.props.name !== this.pendingNameChanges && (this.props.onNameChange(this.pendingNameChanges), this.pendingNameChanges = void 0), this.props.onEditEnd()
        }
    }, {
        key: "onDragHandleMouseDown",
        value: function (e) {
            0 === e.button && this.props.onDrag(e)
        }
    }, {
        key: "render",
        value: function () {
            var e = this,
                t = this.props.editing || this.props.alwaysEditing,
                n = "CategoryPickerOption " + (this.props.disabled && "disabled") + " " + (this.props.selectable && "selectable") + " " + (this.props.selected && "selected") + " " + (this.state.focus && "focus") + " " + (this.props.accessible && "accessible") + " " + (t && "editing") + " " + (this.state.contextualMenuOpened && "contextualMenuOpened"),
                o = mercator.designer.categories.categories.map(function (e) {
                    return e.color
                }),
                i = d("key") + ": " + this.props.categoryKey;
            return React.createElement("div", {
                className: n,
                ref: this.wrapperRef
            }, React.createElement("div", {
                className: "description",
                onClick: this.props.onSelect,
                title: i,
                onContextMenu: this.onContextualMenu
            }, this.props.selectable ? React.createElement("div", {
                className: "icon-check"
            }) : !this.props.editingDisabled && React.createElement("div", {
                className: "drag-handle icon-drag-handle",
                onMouseDown: this.onDragHandleMouseDown.bind(this)
            }), React.createElement("div", {
                className: "color",
                style: {
                    backgroundColor: this.props.color
                }
            }, this.props.accessible && React.createElement("div", {
                className: "icon-accessible-new"
            })), React.createElement("div", {
                className: "caption"
            }, this.props.name), React.createElement("div", {
                className: "actions"
            }, !this.props.editingDisabled && React.createElement(Button, {
                preset: "icon",
                type: "more",
                onMouseDown: this.onContextualMenu,
                onContextMenu: this.onContextualMenu
            }))), React.createElement("div", {
                className: "editable"
            }, this.props.alwaysEditing && !this.props.editingDisabled && React.createElement("div", {
                className: "drag-handle icon-drag-handle",
                onMouseDown: this.onDragHandleMouseDown.bind(this)
            }), React.createElement("div", {
                className: "icon-accessible-new",
                onClick: this.props.onToggleAccessible,
                onContextMenu: function (e) {
                    return e.preventDefault()
                }
            }), React.createElement("div", {
                className: "color",
                style: {
                    backgroundColor: this.props.color
                },
                onClick: this.toggleEditingColor
            }), React.createElement(ColorInput, {
                value: this.props.color,
                paletteSet: "category",
                onChange: this.props.onColorChange,
                takenValues: o,
                onEditStart: function () {
                    return e.setState({
                        focus: !0
                    })
                },
                onEditEnd: function () {
                    return e.setState({
                        focus: !1
                    })
                },
                alignPickerToLeft: !0
            }), t && React.createElement(TextInput, {
                value: this.props.name,
                tooltip: i,
                onChange: function (t) {
                    return e.pendingNameChanges = t
                },
                onChangeFinal: this.props.onNameChange,
                onEditStart: function () {
                    return e.setState({
                        focus: !0
                    })
                },
                onEditEnd: function () {
                    return e.setState({
                        focus: !1
                    })
                },
                onEditCancel: function () {
                    return e.pendingNameChanges = void 0
                },
                autoFocus: !this.props.alwaysEditing || this.props.autoFocus,
                tabIndex: this.props.tabIndex
            }), React.createElement("div", {
                className: "actions",
                onContextMenu: function (e) {
                    return e.preventDefault()
                }
            }, !this.props.alwaysEditing && React.createElement(Button, {
                preset: "icon",
                type: "check",
                caption: d("accept"),
                tabIndex: "-1",
                onClick: this.leaveEditMode.bind(this)
            }), this.props.alwaysEditing && React.createElement(Button, {
                preset: "icon",
                type: "delete",
                caption: d("delete"),
                tabIndex: "-1",
                onClick: this.props.onDelete
            }))))
        }
    }]), t
}();

var _createClass = function () {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}

var ChartOverlayMessages = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, React.PureComponent), _createClass(t, [{
        key: "renderMessages",
        value: function () {
            var e = this;
            return Object.keys(this.props.messages || {}).map(function (t) {
                var r = e.props.messages[t].type,
                    n = e.props.messages[t].params,
                    s = d(t, n);
                return React.createElement("div", {
                    className: "message " + r,
                    key: s
                }, React.createElement("span", {
                    className: "icon icon-" + r
                }), s)
            })
        }
    }, {
        key: "render",
        value: function () {
            return React.createElement("div", {
                className: "ChartOverlayMessages"
            }, this.renderMessages())
        }
    }]), t
}();

var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }
    return function (t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}

var CheckboxInput = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "onCheckboxRef",
        value: function (e) {
            e && (this.inputElement = e, this.inputElement.indeterminate = Array.isArray(this.props.value))
        }
    }, {
        key: "componentDidUpdate",
        value: function (e) {
            this.inputElement && (this.inputElement.indeterminate = Array.isArray(this.props.value))
        }
    }, {
        key: "render",
        value: function () {
            var e = this;
            if (this.props.invisible) return null;
            var t = mercator.designer.uiEvents,
                n = Array.isArray(this.props.value) ? "" : !0 === this.props.value;
            return React.createElement("div", {
                className: "CheckboxInput " + (this.props.disabled && "disabled")
            }, this.props.caption && React.createElement("label", {
                className: "caption",
                htmlFor: this.props.caption
            }, this.props.caption, this.props.infoTooltip && React.createElement("span", {
                className: "icon-info info-tooltip-icon",
                onMouseOut: function () {
                    return t.hideTooltip()
                },
                onMouseOver: function (n) {
                    return t.showTooltip(React.createElement("p", null, e.props.infoTooltip), n, !0)
                }
            }), this.props.keyHint && React.createElement("span", {
                className: "key-hint"
            }, this.props.keyHint)), React.createElement("div", {
                className: "value"
            }, React.createElement("input", {
                type: "checkbox",
                id: this.props.caption,
                checked: n,
                onChange: function (t) {
                    return e.props.onChange(t.target.checked)
                },
                disabled: this.props.disabled,
                ref: this.onCheckboxRef.bind(this)
            }), this.props.disabled && this.props.disabledTooltip && this.props.disabledTooltipIcon && React.createElement("div", {
                className: "disabled-tooltip-icon icon-" + this.props.disabledTooltipIcon,
                onMouseOut: function () {
                    return t.hideTooltip()
                },
                onMouseOver: function (n) {
                    return t.showTooltip(React.createElement("p", null, e.props.disabledTooltip), n, !0)
                }
            })))
        }
    }]), t
}();

var _createClass = function () {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var o = t[i];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }
    return function (t, i, o) {
        return i && e(t.prototype, i), o && e(t, o), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var ColorInput = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var i = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return i.state = {
            editing: !1,
            pickerType: null
        }, i
    }
    return _inherits(t, React.PureComponent), _createClass(t, [{
        key: "componentDidMount",
        value: function () {
            this.boundingClientRect = this.getBoundingClientRect()
        }
    }, {
        key: "onChange",
        value: function (e) {
            this.props.onChange(e), this.refreshPicker(e)
        }
    }, {
        key: "enterEditMode",
        value: function () {
            this.setState({
                editing: !0
            }), this.openPicker(), this.props.onEditStart && this.props.onEditStart()
        }
    }, {
        key: "leaveEditMode",
        value: function () {
            this.setState({
                editing: !1
            }), this.closePicker(), this.props.onEditEnd && this.props.onEditEnd()
        }
    }, {
        key: "toggleEditMode",
        value: function () {
            this.state.editing ? this.leaveEditMode() : this.enterEditMode()
        }
    }, {
        key: "getBoundingClientRect",
        value: function () {
            return ReactDOM.findDOMNode(this.wrapperRef).getBoundingClientRect()
        }
    }, {
        key: "shouldPositionPickerBelow",
        value: function () {
            return this.getBoundingClientRect().y < window.innerHeight / 2
        }
    }, {
        key: "arrowDirection",
        value: function () {
            return this.state.editing ? "up" : "down"
        }
    }, {
        key: "allPalettes",
        value: function () {
            return mercator.ColorPalettes.sets[this.props.paletteSet] || []
        }
    }, {
        key: "allPaletteColors",
        value: function () {
            return this.allPalettes().flatMap(function (e) {
                return e.colors
            })
        }
    }, {
        key: "isAPaletteColor",
        value: function (e) {
            return this.allPaletteColors().includes(e.toCSSHex())
        }
    }, {
        key: "normalizedValue",
        value: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.props.value;
            e = Array.isArray(e) ? e[0] : e;
            var t = net.brehaut.Color(e.toLowerCase());
            return {
                color: t = t.setAlpha(this.props.opacity ? parseFloat(t.getAlpha().toPrecision(2)) : 1),
                value: (t.getAlpha() < 1 ? t.toCSS() : t.toCSSHex()).toUpperCase()
            }
        }
    }, {
        key: "getPickerPosition",
        value: function () {
            var e = {},
                t = this.getBoundingClientRect();
            this.props.alignPickerToLeft ? e.left = t.left : e.right = window.innerWidth - t.right;
            return this.shouldPositionPickerBelow() ? e.top = t.bottom + 6 : e.bottom = window.innerHeight - t.top + 6, e
        }
    }, {
        key: "buildPickerProps",
        value: function (e) {
            var t = this,
                i = this.normalizedValue(e),
                o = i.color;
            return {
                value: i.value,
                color: o,
                paletteSet: this.props.paletteSet,
                takenValues: this.props.takenValues,
                opacity: this.props.opacity,
                onChange: this.onChange.bind(this),
                onClickOutside: function () {
                    return t.leaveEditMode()
                },
                position: this.getPickerPosition(),
                colorScheme: mercator.designer.getCanvasColorScheme()
            }
        }
    }, {
        key: "openPicker",
        value: function () {
            mercator.designer.uiEvents.toggleFloatingPicker("DesignerColorPicker", this.buildPickerProps())
        }
    }, {
        key: "refreshPicker",
        value: function (e) {
            mercator.designer.uiEvents.updateFloatingPickerProps(this.buildPickerProps(e))
        }
    }, {
        key: "closePicker",
        value: function () {
            mercator.designer.uiEvents.closeFloatingPicker()
        }
    }, {
        key: "onMouseDown",
        value: function () {
            this.state.editing || (this.pressed = !0)
        }
    }, {
        key: "onMouseUp",
        value: function () {
            this.pressed && this.toggleEditMode(), this.pressed = !1
        }
    }, {
        key: "render",
        value: function () {
            var e = this,
                t = void 0,
                i = void 0;
            Array.isArray(this.props.value) && (i = this.props.value.join(", "), t = d("multiple-values") + ": " + i);
            var o = this.normalizedValue().value;
            return React.createElement("div", {
                className: "ColorInput " + (this.props.disabled ? "disabled" : "") + " " + (this.state.editing ? "editing" : "") + " ",
                title: t,
                ref: function (t) {
                    return e.wrapperRef = t
                },
                onContextMenu: function (e) {
                    return e.preventDefault()
                }
            }, React.createElement("div", {
                className: "sample",
                onMouseDown: function () {
                    return e.onMouseDown()
                },
                onMouseUp: function () {
                    return e.onMouseUp()
                }
            }, React.createElement("div", {
                className: "icon icon-arrow-" + this.arrowDirection()
            }), React.createElement("div", {
                className: "color",
                style: {
                    backgroundColor: o
                }
            })))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var l = 0; l < t.length; l++) {
            var o = t[l];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }
    return function (t, l, o) {
        return l && e(t.prototype, l), o && e(t, o), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var ColorPalette = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "onSelect",
        value: function (e) {
            this.props.onChange && this.props.onChange(e)
        }
    }, {
        key: "getTakenValues",
        value: function () {
            return this.props.takenValues ? this.props.takenValues.map(function (e) {
                return net.brehaut.Color(e).toCSSHex()
            }) : []
        }
    }, {
        key: "render",
        value: function () {
            for (var e = this, t = [], l = net.brehaut.Color(this.props.value).toCSSHex(), o = this.getTakenValues(), r = function (r) {
                var a = e.props.colors[r].toUpperCase(),
                    s = l === a ? "selected" : o.includes(a) ? "taken" : "unused";
                t.push(React.createElement("div", {
                    key: a,
                    className: "color " + s,
                    onClick: function () {
                        return e.onSelect(a)
                    }
                }, React.createElement("div", {
                    className: "outer",
                    style: {
                        backgroundColor: a
                    }
                }), React.createElement("div", {
                    className: "inner",
                    style: {
                        backgroundColor: a
                    }
                })))
            }, a = 0; a < 8; a++) r(a);
            return React.createElement("div", {
                className: "ColorPalette " + (this.props.docked && "docked") + " " + (this.props.opened ? "opened" : "closed")
            }, React.createElement("div", {
                className: "color-palette"
            }, React.createElement("div", {
                className: "color-wheel"
            }, t), React.createElement("div", {
                className: "color-code",
                style: {
                    color: l
                }
            }, React.createElement("div", {
                className: "value"
            }, l))), React.createElement("div", {
                className: "preview",
                onClick: this.props.onPreviewClick
            }, React.createElement("svg", {
                className: "preview-image",
                viewBox: "0 0 100 100",
                version: "1.1"
            }, React.createElement("path", {
                d: "M29.289,0l20.711,8.579l20.711,-8.579l8.578,20.711l20.711,8.578l-8.579,20.711l8.579,20.711l-20.711,8.578l-8.578,20.711l-20.711,-8.579l-20.711,8.579l-8.578,-20.711l-20.711,-8.578l8.579,-20.711l-8.579,-20.711l20.711,-8.578l8.578,-20.711Z",
                style: {
                    fill: this.props.colors[3]
                }
            }), React.createElement("path", {
                d: "M29.289,100l-8.578,-20.711l29.289,-29.289l0,41.421l-20.711,8.579Z",
                style: {
                    fill: this.props.colors[0]
                }
            }), React.createElement("path", {
                d: "M0,70.711l8.579,-20.711l41.421,0l-29.289,29.289l-20.711,-8.578Z",
                style: {
                    fill: this.props.colors[1]
                }
            }), React.createElement("path", {
                d: "M0,29.289l20.711,-8.578l29.289,29.289l-41.421,0l-8.579,-20.711Z",
                style: {
                    fill: this.props.colors[2]
                }
            }), React.createElement("path", {
                d: "M29.289,0l20.711,8.579l0,41.421l-29.289,-29.289l8.578,-20.711Z",
                style: {
                    fill: this.props.colors[3]
                }
            }), React.createElement("path", {
                d: "M70.711,0l8.578,20.711l-29.289,29.289l0,-41.421l20.711,-8.579Z",
                style: {
                    fill: this.props.colors[4]
                }
            }), React.createElement("path", {
                d: "M100,29.289l-8.579,20.711l-41.421,0l29.289,-29.289l20.711,8.578Z",
                style: {
                    fill: this.props.colors[5]
                }
            }), React.createElement("path", {
                d: "M100,70.711l-20.711,8.578l-29.289,-29.289l41.421,0l8.579,20.711Z",
                style: {
                    fill: this.props.colors[6]
                }
            }), React.createElement("path", {
                d: "M70.711,100l-20.711,-8.579l0,-41.421l29.289,29.289l-8.578,20.711Z",
                style: {
                    fill: this.props.colors[7]
                }
            }))), React.createElement("div", {
                className: "name"
            }, React.createElement("span", null, this.props.name), React.createElement("span", {
                className: "light icon-" + this.props.light,
                title: d("palette-light-" + this.props.light)
            })), React.createElement("div", {
                className: "placeholder",
                onClick: this.props.onPlaceholderClick
            }))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var o = t[a];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }
    return function (t, a, o) {
        return a && e(t.prototype, a), o && e(t, o), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var ColorPalettePicker = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var a = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)),
            o = net.brehaut.Color(e.value).toCSS(),
            l = -1;
        return a.allPalettes(e).forEach(function (e, t) {
            e.colors[a.props.colorScheme].includes(o) && (l = t)
        }), a.state = {
            palette: l
        }, a
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "allPalettes",
        value: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.props;
            return mercator.ColorPalettes.sets[e.paletteSet] || []
        }
    }, {
        key: "setPalette",
        value: function (e) {
            this.setState({
                palette: e
            })
        }
    }, {
        key: "getCurrentPaletteData",
        value: function () {
            return this.allPalettes()[this.state.palette] || {}
        }
    }, {
        key: "render",
        value: function () {
            var e = this,
                t = this.allPalettes().map(function (t, a) {
                    return React.createElement(ColorPalette, {
                        key: t.name,
                        name: d(t.name),
                        light: t.light,
                        value: e.props.value,
                        takenValues: e.props.takenValues,
                        colors: t.colors[e.props.colorScheme],
                        opened: e.state.palette === a,
                        docked: e.state.palette >= 0 && e.state.palette !== a,
                        onPreviewClick: e.setPalette.bind(e, a),
                        onPlaceholderClick: e.setPalette.bind(e, -1),
                        onChange: e.props.onChange
                    })
                }),
                a = "light" !== this.props.colorScheme,
                o = this.getCurrentPaletteData().colorblindSafe;
            return React.createElement("div", {
                className: "ColorPalettePicker count-" + t.length + " " + (this.props.disabled && "disabled") + " " + (a && "dark-mode") + " " + (this.state.palette >= 0 ? "palette-selected" : "")
            }, t, o && React.createElement("div", {
                className: "colorblind-indicator"
            }, React.createElement("span", {
                className: "icon icon-colorblind"
            }), React.createElement("span", {
                className: "icon icon-check"
            }), React.createElement(ToolbarTooltip, null, React.createElement("h2", null, d("colorblind-safe")), React.createElement("p", null, d("colorblind-safe-text")))))
        }
    }]), t
}();
var _createClass = function () {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }
    return function (e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e
    }
}();

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e
}

function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
}
var ContextActions = function (t) {
    function e(t) {
        _classCallCheck(this, e);
        var n = _possibleConstructorReturn(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
        return n.childRefs = {},
            n.state = {
                ga: "ga-rectangle",
                shape: "shape-rectangle",
                table: "table-round",
                contextualMenuOpened: null
            }, n.actionsToolbar = [
                "delete"
                // ["align-objects", "normalize-rows"], "separator", "flip-horizontal", "flip-vertical", "separator", "duplicate", "copy", "paste", "delete"
            ], n.actionsUiEvent = {
                "align-objects": "*",
                "normalize-rows": "actionNormalizeRows",
                "flip-horizontal": "actionFlipHorizontal",
                "flip-vertical": "actionFlipVertical",
                duplicate: "actionDuplicate",
                copy: "actionCopy",
                paste: "actionPaste",
                delete: "actionDelete"
            }, n.contextMenuActions = {
                "normalize-rows": [{
                    type: "straighten",
                    caption: d("straighten"),
                    uiEvent: "actionStraighten"
                }, {
                    type: "space-evenly",
                    caption: d("space-evenly"),
                    uiEvent: "actionEvenlySpace"
                }, {
                    type: "separator"
                }, {
                    type: "align-left",
                    caption: d("align-left"),
                    uiEvent: "actionAlignLeft"
                }, {
                    type: "align-center",
                    caption: d("align-center"),
                    uiEvent: "actionAlignCenter"
                }, {
                    type: "align-right",
                    caption: d("align-right"),
                    uiEvent: "actionAlignRight"
                }],
                "align-objects": [{
                    type: "align-objects-left",
                    caption: d("align-left"),
                    uiEvent: "actionAlignObjectsLeft"
                }, {
                    type: "align-objects-horizontal-center",
                    caption: d("align-center"),
                    uiEvent: "actionAlignObjectsHorizontalCenter",
                    default: !0
                }, {
                    type: "align-objects-right",
                    caption: d("align-right"),
                    uiEvent: "actionAlignObjectsRight"
                }, {
                    type: "space-objects-vertically",
                    caption: d("space-vertically"),
                    uiEvent: "actionSpaceObjectsVertically"
                }, {
                    type: "separator"
                }, {
                    type: "align-objects-top",
                    caption: d("align-top"),
                    uiEvent: "actionAlignObjectsTop"
                }, {
                    type: "align-objects-vertical-center",
                    caption: d("align-middle"),
                    uiEvent: "actionAlignObjectsVerticalCenter"
                }, {
                    type: "align-objects-bottom",
                    caption: d("align-bottom"),
                    uiEvent: "actionAlignObjectsBottom"
                }, {
                    type: "space-objects-horizontally",
                    caption: d("space-horizontally"),
                    uiEvent: "actionSpaceObjectsHorizontally"
                }]
            }, n.hotkeys = {
                duplicate: [META_KEY, "J"].join(SHORTCUT_CONNECTOR),
                copy: [META_KEY, "C"].join(SHORTCUT_CONNECTOR),
                paste: [META_KEY, "V"].join(SHORTCUT_CONNECTOR)
            }, n
    }
    return _inherits(e, React.Component), _createClass(e, [{
        key: "shouldComponentUpdate",
        value: function (t, e) {
            return differentObjectValues(this.state, e) || differentObjectValues(this.props.selection, t.selection, ["contextActions"]) || differentObjectValues(this.props.uiState, t.uiState, ["contextualMenuType", "lastUsedObjectAlign"])
        }
    }]), _createClass(e, [{
        key: "getDisplayedButtonName",
        value: function (t) {
            return this.contextMenuActions[t] && "*" === this.actionsUiEvent[t] ? "align-objects" === t && this.props.uiState.lastUsedObjectAlign ? this.props.uiState.lastUsedObjectAlign : this.contextMenuActions[t].reduce(function (t, e) {
                return e.default ? e : t
            }).type : t
        }
    }, {
        key: "getDisplayedButtonCaption",
        value: function (t, e) {
            return t !== e && this.contextMenuActions[t] ? this.contextMenuActions[t].reduce(function (t, n) {
                return n.type === e ? n : t
            }).caption : d(t)
        }
    }, {
        key: "toolbarTools",
        value: function () {
            var t = this;
            return this.actionsToolbar.map(function (e, n) {
                if (Array.isArray(e) && (e = e.reduce(function (e, n) {
                    return !e || t.props.selection.contextActions.includes(n) ? n : e
                })), "separator" === e) return React.createElement("div", {
                    key: "separator-" + n,
                    className: "separator"
                });
                var i = t.getDisplayedButtonName(e),
                    o = t.getDisplayedButtonCaption(e, i);
                return React.createElement(Button, {
                    key: i,
                    preset: t.contextMenuActions[e] ? "toolbar-icon-dropdown" : "toolbar-icon",
                    type: i,
                    caption: o,
                    keyHint: t.hotkeys[i],
                    onClick: function () {
                        return t.onClick(e, i)
                    },
                    onHold: function () {
                        return t.showContextMenuActions(e)
                    },
                    disabled: !t.props.selection.contextActions.includes(e),
                    dropdownSelected: t.state.contextualMenuOpened === e,
                    childRef: function (n) {
                        return t.childRefs[e] = n
                    }
                })
            })
        }
    }, {
        key: "onClick",
        value: function (t, e) {
            t !== e ? mercator.designer.uiEvents.trigger(this.getSubAction(t, e).uiEvent) : mercator.designer.uiEvents.trigger(this.actionsUiEvent[t])
        }
    }, {
        key: "getSubAction",
        value: function (t, e) {
            return this.contextMenuActions[t].reduce(function (t, n) {
                return n.type === e ? n : t
            })
        }
    }, {
        key: "onContextMenuEvent",
        value: function (t) {
            mercator.designer.uiEvents.trigger(t), this.setState({
                contextualMenuOpened: null
            })
        }
    }, {
        key: "showContextMenuActions",
        value: function (t) {
            var e = this,
                n = ReactDOM.findDOMNode(this.childRefs[t]).getBoundingClientRect(),
                i = this.contextMenuActions[t].map(function (t) {
                    return Object.assign(e.props.selection.contextActions.includes(t.type) ? {} : {
                        disabled: !0
                    }, t)
                });
            this.setState({
                contextualMenuOpened: t
            }), mercator.designer.uiEvents.showContextualMenu(i, {
                position: {
                    top: n.bottom + 3,
                    right: window.innerWidth - n.right
                },
                onSelect: this.onContextMenuEvent.bind(this),
                onClose: function () {
                    return e.setState({
                        contextualMenuOpened: null
                    })
                }
            })
        }
    }, {
        key: "render",
        value: function () {
            return React.createElement("div", {
                className: "ContextActions"
            }, this.toolbarTools())
        }
    }]), e
}();
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }
    return function (t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var ContextualMenu = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return n.handleClickOutside = n.handleClickOutside.bind(n), n.handleScroll = n.handleScroll.bind(n), n
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "close",
        value: function () {
            mercator.designer.uiEvents.clearContextualMenu()
        }
    }, {
        key: "componentDidMount",
        value: function () {
            document.addEventListener("mousedown", this.handleClickOutside), document.addEventListener("mousewheel", this.handleScroll)
        }
    }, {
        key: "componentWillUnmount",
        value: function () {
            document.removeEventListener("mousedown", this.handleClickOutside), document.removeEventListener("mousewheel", this.handleScroll)
        }
    }, {
        key: "handleClickOutside",
        value: function (e) {
            this.isVisible() && this.wrapperRef && !this.wrapperRef.contains(e.target) && (e.preventDefault(), e.stopPropagation(), this.onClose())
        }
    }, {
        key: "handleScroll",
        value: function (e) {
            this.isVisible() && e.preventDefault()
        }
    }, {
        key: "onLink",
        value: function (e) {
            window.open(e), this.close()
        }
    }, {
        key: "onSelect",
        value: function (e) {
            this.props.settings.onSelect && this.props.settings.onSelect(e), this.close()
        }
    }, {
        key: "onClose",
        value: function () {
            this.props.settings.onClose && this.props.settings.onClose(), this.close()
        }
    }, {
        key: "getPosition",
        value: function () {
            if (!this.props.settings) return {};
            var e = this.props.settings.position;
            return e && e.left > .85 * window.innerWidth && (e = {
                right: window.innerWidth - e.left,
                top: e.top,
                bottom: e.bottom
            }), e && e.top > .8 * window.innerHeight && (e = {
                right: e.right,
                left: e.left,
                bottom: window.innerHeight - e.top
            }), e
        }
    }, {
        key: "isVisible",
        value: function () {
            return this.props.options && Object.keys(this.props.options).length > 0
        }
    }, {
        key: "getContents",
        value: function () {
            var e = this;
            return (this.props.options || []).map(function (t, n) {
                switch (t.type) {
                    case "separator":
                        return React.createElement("div", {
                            key: "separator-" + n,
                            className: "separator"
                        });
                    case "validation-item":
                        return React.createElement("div", {
                            key: t.caption,
                            className: "validation-item " + t.validationType
                        }, React.createElement("span", {
                            className: "icon " + [t.icon]
                        }), React.createElement("span", {
                            className: "caption"
                        }, lang.d(t.caption)));
                    default:
                        return React.createElement(Button, {
                            key: t.type + "-" + t.caption,
                            preset: "contextual-menu-item",
                            type: t.type,
                            softIcon: t.link && "external-link",
                            caption: t.caption,
                            disabled: t.disabled,
                            onMouseUp: function () {
                                return t.uiEvent ? e.onSelect(t.uiEvent) : e.onLink(t.link)
                            }
                        })
                }
            })
        }
    }, {
        key: "render",
        value: function () {
            var e = this;
            return React.createElement("div", {
                className: "ContextualMenu " + (this.isVisible() && "open"),
                onContextMenu: function (e) {
                    return e.preventDefault()
                }
            }, React.createElement("div", {
                className: "menu",
                style: this.getPosition(),
                ref: function (t) {
                    return e.wrapperRef = t
                }
            }, this.getContents()))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var o = 0; o < t.length; o++) {
            var r = t[o];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    return function (t, o, r) {
        return o && e(t.prototype, o), r && e(t, r), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var DesignerColorPicker = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var o = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return o.state = {
            pickerType: null
        }, o.handleClickOutside = o.handleClickOutside.bind(o), o.wrapperRef = React.createRef(), o
    }
    return _inherits(t, React.PureComponent), _createClass(t, [{
        key: "componentDidMount",
        value: function () {
            document.addEventListener("mousedown", this.handleClickOutside)
        }
    }, {
        key: "componentWillUnmount",
        value: function () {
            document.removeEventListener("mousedown", this.handleClickOutside)
        }
    }, {
        key: "handleClickOutside",
        value: function (e) {
            this.wrapperRef.current && this.props.onClickOutside && !this.wrapperRef.current.contains(e.target) && this.props.onClickOutside()
        }
    }, {
        key: "submitNewValue",
        value: function (e) {
            this.props.onChange(e)
        }
    }, {
        key: "submitNewTextValue",
        value: function (e) {
            var t = net.brehaut.Color(e.toLowerCase());
            void 0 !== t.red && void 0 !== t.green && void 0 !== t.blue && (this.props.opacity || (t = t.setAlpha(1)), this.submitNewValue(t.toCSS()))
        }
    }, {
        key: "allPalettes",
        value: function () {
            var e = this,
                t = mercator.ColorPalettes.sets[this.props.paletteSet] || [];
            return t.forEach(function (t) {
                t.conditionalName && (t.name = t.conditionalName[e.props.colorScheme])
            }), t
        }
    }, {
        key: "allPaletteColors",
        value: function () {
            var e = this;
            return this.allPalettes().flatMap(function (t) {
                return t.colors[e.props.colorScheme]
            })
        }
    }, {
        key: "isAPaletteColor",
        value: function (e) {
            return this.allPaletteColors().includes(e.toCSSHex())
        }
    }, {
        key: "render",
        value: function () {
            var e = this,
                t = this.props,
                o = t.value,
                r = t.color,
                n = t.paletteSet,
                a = t.takenValues,
                i = t.opacity,
                l = t.position,
                c = t.colorScheme,
                s = null !== this.state.pickerType ? this.state.pickerType : this.isAPaletteColor(r) ? "palette" : "hsv",
                u = this.allPalettes().length > 0,
                p = r.getLuminance() > .85;
            return React.createElement("div", {
                className: "DesignerColorPicker picker-popup show-" + s,
                style: l,
                ref: this.wrapperRef
            }, React.createElement("div", {
                className: "palette face"
            }, React.createElement(ColorPalettePicker, {
                colorScheme: c,
                value: o,
                paletteSet: n,
                onChange: this.submitNewValue.bind(this),
                takenValues: a
            }), React.createElement(Button, {
                preset: "icon-circle",
                type: "color-picker",
                onClick: function () {
                    return e.setState({
                        pickerType: "hsv"
                    })
                }
            })), React.createElement("div", {
                className: "hsv face"
            }, React.createElement(ColorPicker, {
                color: o.toLowerCase(),
                onChange: this.submitNewValue.bind(this),
                opacitySlider: i
            }), React.createElement("div", {
                className: "color-code " + (p && "light-color"),
                style: {
                    color: o
                }
            }, React.createElement(EditableLabel, {
                value: o,
                onChange: this.submitNewTextValue.bind(this)
            })), u && React.createElement(Button, {
                preset: "icon",
                type: "color-palette",
                onClick: function () {
                    return e.setState({
                        pickerType: "palette"
                    })
                }
            })))
        }
    }]), t
}();
Dialogs.FloatingPickers.DesignerColorPicker = DesignerColorPicker;
var _createClass = function () {
    function e(e, t) {
        for (var s = 0; s < t.length; s++) {
            var a = t[s];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
        }
    }
    return function (t, s, a) {
        return s && e(t.prototype, s), a && e(t, a), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var DocumentState = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var s = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return s.state = {
            successPulse: !1,
            lastSavedAgo: null
        }, s.canSuccessPulse = !1, s
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "shouldComponentUpdate",
        value: function (e, t) {
            return differentObjectValues(this.state, t) || differentObjectValues(this.props, e, ["busyIndicators", "saveState", "lastSavedMoment", "saveErrorType", "hideDocumentName"]) || differentObjectValues(this.props.document, e.document, ["readOnly", "title"]) || differentObjectValues(this.props.designer, e.designer, ["disabledFeatures"])
        }
    }]), _createClass(t, [{
        key: "componentDidUpdate",
        value: function (e) {
            var t = this.getStateCodename(e) !== this.getStateCodename();
            switch (this.getStateCodename()) {
                case "PUBLISHED":
                    this.canSuccessPulse = !0, t && this.triggerSuccessPulse();
                    break;
                case "PUBLISHED_WITH_DRAFT":
                    this.canSuccessPulse && (this.triggerSuccessPulse(), this.canSuccessPulse = !1);
                    break;
                case "SAVE_FAILED":
                    this.canSuccessPulse = !0, this.clearSuccessPulse()
            }
        }
    }, {
        key: "triggerSuccessPulse",
        value: function () {
            var e = this;
            this.setState({
                successPulse: !0
            }), this.successPulseTimeout && (clearTimeout(this.successPulseTimeout), this.successPulseTimeout = null), this.successPulseTimeout = setTimeout(function () {
                return e.setState({
                    successPulse: !1
                })
            }, 2500)
        }
    }, {
        key: "clearSuccessPulse",
        value: function () {
            this.setState({
                successPulse: !1
            }), this.successPulseTimeout && (clearTimeout(this.successPulseTimeout), this.successPulseTimeout = null)
        }
    }, {
        key: "componentWillUnmount",
        value: function () {
            clearInterval(this.secondTick)
        }
    }, {
        key: "tick",
        value: function () {
            this.setState({
                lastSavedAgo: this.props.lastSavedMoment && this.props.lastSavedMoment.fromNow()
            })
        }
    }, {
        key: "onDocumentTitleChange",
        value: function (e) {
            mercator.designer.uiEvents.documentTitleChange(e)
        }
    }, {
        key: "getStateCodename",
        value: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.props;
            if (e.document.readOnly) return "READ_ONLY";
            if (e.saveErrorType) return e.saveErrorType;
            var t = e.document.status || "DRAFT";
            return "PUBLISHED" !== t || mercator.designer.v2Client.getWorkspaceSettings().draftChartDrawingsEnabled ? t : "NOT_USED"
        }
    }, {
        key: "getStateName",
        value: function () {
            return {
                SAVE_FAILED_VALIDATION_ERROR: d("saving-failed"),
                SAVE_FAILED_UNKNOWN_ERROR: d("saving-failed"),
                READ_ONLY: d("read-only"),
                PUBLISHED: d("published"),
                PUBLISHED_WITH_DRAFT: d("draft"),
                DRAFT: d("draft"),
                NOT_USED: d("saved")
            }[this.getStateCodename()]
        }
    }, {
        key: "getTooltipHeader",
        value: function () {
            return this.props.saveErrorType ? d("saving-failed") : this.state.lastSavedAgo ? d("last-saved") + " " + this.state.lastSavedAgo : ""
        }
    }, {
        key: "getTooltipText",
        value: function () {
            return {
                SAVE_FAILED_VALIDATION_ERROR: d("save-failed-validation-error"),
                SAVE_FAILED_UNKNOWN_ERROR: d("save-failed-warning"),
                READ_ONLY: d("read-only-warning"),
                PUBLISHED: d("published-warning"),
                PUBLISHED_WITH_DRAFT: d("published-with-draft-warning"),
                DRAFT: d("draft-warning"),
                NOT_USED: d("saved-warning")
            }[this.getStateCodename()]
        }
    }, {
        key: "publishVisible",
        value: function () {
            return ["PUBLISHED_WITH_DRAFT", "DRAFT"].includes(this.getStateCodename()) && mercator.designer.features.isEnabled(mercator.Features.Type.PUBLISHING)
        }
    }, {
        key: "publishEnabled",
        value: function () {
            return "saving" !== this.props.saveState
        }
    }, {
        key: "onMouseOver",
        value: function () {
            var e = this;
            this.tick(), this.secondTick = setInterval(function () {
                return e.tick()
            }, 1e3)
        }
    }, {
        key: "onMouseOut",
        value: function () {
            clearInterval(this.secondTick)
        }
    }, {
        key: "render",
        //NOME DO MAPA + BTN DE VOLTAR
        value: function () {
            return React.createElement("div", {
                className: "DocumentState",
            }), React.createElement(EditableLabel, {
                disabled: true,
                value: this.props.document.title || d("untitled-chart"),
                onChange: this.onDocumentTitleChange.bind(this)
            });
            // React.createElement("div", {
            //     className: "DocumentState",
            //     onMouseOver: this.onMouseOver.bind(this),
            //     onMouseOut: this.onMouseOut.bind(this)
            // }, React.createElement(ReactTransitionGroup.CSSTransition, {
            //     classNames: "right-shift",
            //     timeout: 400,
            //     in: !this.props.hideDocumentName,
            //     leave: !1,
            //     exit: !1,
            //     unmountOnExit: !0
            // }, React.createElement(EditableLabel, {
            //     disabled: this.props.document.readOnly || this.props.designer.disabledFeatures.includes(mercator.Features.Type.CHART_NAME),
            //     value: this.props.document.title || d("untitled-chart"),
            //     onChange: this.onDocumentTitleChange.bind(this)
            // })), React.createElement("div", {
            //     className: "status " + (this.props.saveState || "saved") + " " + (this.state.successPulse && "success-pulse")
            // },
            //     this.props.document.readOnly || this.props.saveErrorType ?
            //         React.createElement("div", {
            //             className: "status-icon"
            //         }, React.createElement("div", {
            //             className: "icon-read-only"
            //         }))
            //         :
            //         React.createElement("div", {
            //             className: "status-icon"
            //         }, React.createElement("div", {
            //             className: "icon-saving"
            //         }), React.createElement("div", {
            //             className: "icon-saved"
            //         })),
            //     React.createElement("div", {
            //         className: "status-caption"
            //     }, this.getStateName()), this.getTooltipText() && React.createElement(ToolbarTooltip, null, this.getTooltipHeader() && React.createElement("h2", null, this.getTooltipHeader()), React.createElement("p", null, this.getTooltipText()))), this.publishVisible() && React.createElement("span", {
            //         className: "publish-button"
            //     },
            //         React.createElement(Button, {
            //             preset: "icon-caption",
            //             type: this.props.busyIndicators.includes("publish") ? "saving" : "publish",
            //             color: "red",
            //             caption: d("publish"),
            //             onClick: function () {
            //                 return mercator.designer.uiEvents.requestPublishDraft()
            //             },
            //             disabled: !this.publishEnabled() || this.props.busyIndicators.includes("publish")
            //         }))
            // )
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var DraggableList = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return n.state = {
            draggedIndex: -1,
            targetIndex: -1,
            dragYPosition: 0
        }, n.wrapperRef = React.createRef(), n.onMouseMove = n.onMouseMove.bind(n), n.onMouseUp = n.onMouseUp.bind(n), n.initialDragYPosition = null, n
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "onChildDrag",
        value: function (e, t) {
            e.preventDefault(), this.setState({
                draggedIndex: t,
                targetIndex: t
            }), this.rectTop = ReactDOM.findDOMNode(this.wrapperRef.current).getBoundingClientRect().top, document.addEventListener("mousemove", this.onMouseMove), document.addEventListener("mouseup", this.onMouseUp), mercator.designer.uiEvents.setCursor("grabbing")
        }
    }, {
        key: "onMouseMove",
        value: function (e) {
            e.preventDefault(), null === this.initialDragYPosition && (this.initialDragYPosition = e.clientY - this.rectTop);
            var t = e.clientY - this.rectTop,
                n = Math.max(0, Math.min(this.props.children.length - 1, Math.floor(t / this.props.rowHeight)));
            this.setState({
                targetIndex: n,
                dragYPosition: t
            })
        }
    }, {
        key: "onMouseUp",
        value: function () {
            var e = this;
            document.removeEventListener("mousemove", this.onMouseMove), document.removeEventListener("mouseup", this.onMouseUp), this.state.draggedIndex !== this.state.targetIndex && this.props.onReorderItem(this.state.draggedIndex, this.state.targetIndex), requestAnimationFrame(function () {
                mercator.designer.uiEvents.setCursor(null), e.initialDragYPosition = null, e.setState({
                    draggedIndex: -1,
                    targetIndex: -1,
                    dragYPosition: 0
                })
            })
        }
    }, {
        key: "isWithinRange",
        value: function (e, t, n) {
            return (e - t) * (e - n) <= 0
        }
    }, {
        key: "isDragging",
        value: function () {
            return null !== this.initialDragYPosition
        }
    }, {
        key: "getChildOffset",
        value: function (e) {
            return this.isDragging() ? this.state.draggedIndex === e ? -(this.initialDragYPosition - this.state.dragYPosition) : this.isWithinRange(e, this.state.draggedIndex, this.state.targetIndex) ? (e > this.state.draggedIndex ? -1 : 1) * this.props.rowHeight : 0 : 0
        }
    }, {
        key: "render",
        value: function () {
            var e = this;
            return React.createElement("div", {
                className: "DraggableList " + this.props.className + " " + (this.isDragging() && "dragging"),
                ref: this.wrapperRef
            }, this.props.children.map(function (t, n) {
                return React.createElement(DraggableListItem, {
                    offset: e.getChildOffset(n),
                    dragged: e.state.draggedIndex === n,
                    key: n
                }, React.cloneElement(t, {
                    onDrag: function (t) {
                        return e.onChildDrag(t, n)
                    }
                }))
            }))
        }
    }]), t
}(),
    DraggableListItem = function (e) {
        function t() {
            return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return _inherits(t, React.Component), _createClass(t, [{
            key: "render",
            value: function () {
                var e = [];
                0 !== this.props.offset && e.push("translateY(" + this.props.offset + "px)"), this.props.dragged && e.push("scale(1.01)");
                var t = {
                    transform: e.join(" ")
                };
                return React.createElement("div", {
                    className: "DraggableListItem " + (this.props.dragged && "dragged"),
                    style: t
                }, this.props.children)
            }
        }]), t
    }();
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }
    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var EditableLabel = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return n.state = {
            editing: !1
        }, n.handleClickOutside = n.handleClickOutside.bind(n), n
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "componentDidMount",
        value: function () {
            document.addEventListener("mousedown", this.handleClickOutside)
        }
    }, {
        key: "componentWillUnmount",
        value: function () {
            document.removeEventListener("mousedown", this.handleClickOutside)
        }
    }, {
        key: "handleClickOutside",
        value: function (e) {
            this.wrapperRef && !this.wrapperRef.contains(e.target) && this.submitChanges()
        }
    }, {
        key: "enterEditMode",
        value: function () {
            this.props.disabled || this.setState({
                editing: !0
            })
        }
    }, {
        key: "leaveEditMode",
        value: function () {
            this.setState({
                editing: !1
            })
        }
    }, {
        key: "onKeyDown",
        value: function (e) {
            switch (e.key) {
                case "Escape":
                    this.leaveEditMode();
                    break;
                case "Enter":
                    this.submitChanges()
            }
        }
    }, {
        key: "onTextboxChange",
        value: function (e) {
            this.newValue = e.target.value
        }
    }, {
        key: "submitChanges",
        value: function () {
            this.leaveEditMode(), this.newValue && this.props.onChange(this.newValue)
        }
    }, {
        key: "render",
        value: function () {
            var e = this;
            return React.createElement("div", {
                className: "EditableLabel " + (this.props.disabled ? "disabled" : ""),
                ref: function (t) {
                    return e.wrapperRef = t
                }
            }, this.state.editing ? React.createElement("input", {
                type: "text",
                defaultValue: this.props.value,
                onKeyDown: this.onKeyDown.bind(this),
                onChange: this.onTextboxChange.bind(this),
                onFocus: function (e) {
                    return e.target.select()
                },
                onBlur: this.submitChanges.bind(this),
                autoFocus: !0
            }) : React.createElement("div", {
                className: "label",
                onClick: this.enterEditMode.bind(this)
            }, this.props.value))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var o = t[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }
    return function (t, r, o) {
        return r && e(t.prototype, r), o && e(t, o), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var FloorPickerHUD = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "shouldComponentUpdate",
        value: function (e, t) {
            return differentObjectValues(this.state, t) || differentObjectValues(this.props, e)
        }
    }, {
        key: "render",
        value: function () {
            var e = this,
                t = mercator.designer.uiEvents;
            return React.createElement("div", {
                className: "FloorPickerHUD"
            }, Array.from(Array(this.props.floors).keys()).map(function (r) {
                return React.createElement("div", {
                    className: "floor",
                    key: r
                }, React.createElement(Button, {
                    preset: "hud-caption",
                    selected: e.props.currentFloor === r,
                    onClick: function () {
                        return t.goToFloor(r)
                    },
                    caption: r + 1,
                    tooltip: d("floor-x", {
                        number: r + 1
                    }),
                    keyHint: buildShortcut([META_KEY, ALT_KEY, r + 1])
                }), e.props.canDeleteFloors && e.props.currentFloor === r && e.props.floors > 1 && React.createElement(Button, {
                    preset: "hud-icon-circle",
                    type: "delete",
                    color: "red",
                    onClick: function () {
                        return t.deleteFloor(r)
                    },
                    tooltip: d("delete-floor")
                }))
            }), this.props.canCreateNewFloor && React.createElement("div", {
                className: "floor",
                key: "new"
            }, React.createElement(Button, {
                preset: "hud-icon",
                type: "plus-bold",
                key: "new",
                onClick: function () {
                    return t.requestCreateFloor()
                },
                tooltip: d("new-floor"),
                disabled: !1
            })))
        }
    }]), t
}();

function GlobalTooltip(e) {
    return e.children ? React.createElement("div", {
        className: "ToolbarTooltip GlobalTooltip",
        style: Object.assign({}, e.style, e.position)
    }, e.children) : React.createElement("span", null)
}
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var IconGrid = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "render",
        value: function () {
            var e = this;
            return React.createElement("div", {
                className: "IconGrid"
            }, React.createElement("div", {
                className: "IconGridContainer"
            }, this.props.options.map(function (t) {
                return React.createElement("div", {
                    key: e.props.options.indexOf(t),
                    onClick: function (n) {
                        return e.props.onChange(t)
                    },
                    className: "IconGridItem " + (e.props.value === t && "active")
                }, React.createElement("span", {
                    className: "icon fa fa-" + t
                }))
            })))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var a = t[r];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
        }
    }
    return function (t, r, a) {
        return r && e(t.prototype, r), a && e(t, a), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var ImageInput = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var r = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return r.state = {
            dragOver: !1
        }, r.fileReader = new FileReader, r.fileReader.onload = function (e) {
            r.setState({
                previewURL: e.target.result
            })
        }, r
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "shouldComponentUpdate",
        value: function (e, t) {
            return differentObjectValues(this.state, t) || shallowDifferentObjectValues(this.props, e.selection) || differentObjectValues(this.props.selection, e.selection, ["contextActions"]) || differentObjectValues(this.props.uiState, e.uiState, ["contextualMenuType"])
        }
    }]), _createClass(t, [{
        key: "allowedFiletypes",
        value: function () {
            return this.props.mimeTypes.map(function (e) {
                return d(e)
            }).join(", ")
        }
    }, {
        key: "onSet",
        value: function (e) {
            var t = e.target.files[0];
            if (t) {
                if (!this.validate(t)) return;
                this.fileReader.readAsDataURL(t), this.props.onSet(t)
            }
        }
    }, {
        key: "onDrop",
        value: function (e) {
            e.stopPropagation(), e.preventDefault(), this.setState({
                dragOver: !1
            });
            var t = e.dataTransfer.files[0];
            if (t) {
                if (!this.validate(t)) return;
                this.fileReader.readAsDataURL(t), this.props.onSet(t)
            }
        }
    }, {
        key: "validate",
        value: function (e) {
            return this.props.mimeTypes && !this.props.mimeTypes.includes(e.type) ? (alert(d("upload-file-type-not-allowed", {
                filetypes: this.allowedFiletypes()
            })), !1) : !(this.props.maxFilesizeMB && e.size > 1024 * this.props.maxFilesizeMB * 1024) || (alert(d("upload-max-file-size-exceeded", {
                filesize: this.props.maxFilesizeMB + " MB"
            })), !1)
        }
    }, {
        key: "onDragEnd",
        value: function (e) {
            e.preventDefault(), this.setState({
                dragOver: !1
            })
        }
    }, {
        key: "onDragOver",
        value: function (e) {
            e.preventDefault(), this.setState({
                dragOver: !0
            })
        }
    }, {
        key: "requestFile",
        value: function () {
            this.fileElement.click()
        }
    }, {
        key: "render",
        value: function () {
            var e = this,
                t = void 0,
                r = void 0,
                a = [];
            return this.props.uploading && this.state.previewURL ? a = [React.createElement(ImageInputPreview, {
                key: this.state.previewURL,
                src: this.state.previewURL
            })] : Array.isArray(this.props.url) ? (r = d("images-count", {
                count: this.props.url.length
            }), a = this.props.url.map(function (e) {
                return e ? React.createElement(ImageInputPreview, {
                    key: e,
                    src: e
                }) : null
            })) : this.props.url ? a = [React.createElement(ImageInputPreview, {
                key: this.props.url,
                src: this.props.url
            })] : t = d("upload-message"), React.createElement("div", {
                className: "ImageInput " + (this.props.disabled && "disabled") + " " + (a.length > 0 ? "with-images" : "empty") + " " + (this.props.uploading && "uploading") + " " + (this.state.dragOver && "drag-over"),
                title: r
            }, a.length > 0 ? React.createElement("div", {
                className: "preview"
            }, React.createElement("div", {
                className: "loading"
            }, React.createElement("div", {
                className: "icon-saving"
            })), React.createElement("div", {
                className: "images"
            }, a), !this.props.uploading && React.createElement("div", {
                className: "remove"
            }, React.createElement("div", {
                className: "caption",
                onClick: this.props.onRemove
            }, React.createElement("span", {
                className: "icon icon-delete"
            }), d("remove")))) : React.createElement("div", {
                className: "dropzone",
                onClick: this.requestFile.bind(this),
                onDrop: this.onDrop.bind(this),
                onDragEnter: this.onDragOver.bind(this),
                onDragLeave: this.onDragEnd.bind(this),
                onDragOver: function (e) {
                    return e.preventDefault()
                },
                onDragEnd: function (e) {
                    return e.preventDefault()
                },
                onDragStart: function (e) {
                    return e.preventDefault()
                },
                onDrag: function (e) {
                    return e.preventDefault()
                }
            }, React.createElement("div", {
                className: "placeholder"
            }, t), React.createElement("div", {
                className: "filetypes"
            }, this.allowedFiletypes() + " " + (this.props.maxFilesizeMB && dl("filesize-smaller-than", {
                filesize: this.props.maxFilesizeMB + " MB"
            }))), React.createElement("input", {
                type: "file",
                onChange: this.onSet.bind(this),
                accept: this.props.mimeTypes ? this.props.mimeTypes.join(",") : "",
                ref: function (t) {
                    return e.fileElement = t
                }
            })))
        }
    }]), t
}();

function ImageInputPreview(e) {
    return React.createElement("div", {
        className: "image",
        style: {
            backgroundImage: "url(" + e.src + ")"
        }
    })
}
var _slicedToArray = function () {
    return function (e, t) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return function (e, t) {
            var r = [],
                o = !0,
                n = !1,
                i = void 0;
            try {
                for (var s, a = e[Symbol.iterator](); !(o = (s = a.next()).done) && (r.push(s.value), !t || r.length !== t); o = !0);
            } catch (e) {
                n = !0, i = e
            } finally {
                try {
                    !o && a.return && a.return()
                } finally {
                    if (n) throw i
                }
            }
            return r
        }(e, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }
}(),
    _createClass = function () {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var o = t[r];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        return function (t, r, o) {
            return r && e(t.prototype, r), o && e(t, o), t
        }
    }();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}

var _extends = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
    }
    return e
},
    InspectorPanel = function (e) {
        function t(e) {
            _classCallCheck(this, t);
            var r = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
            return r.childRefs = {}, r.state = {
                forcedScrollbars: !1
            }, r.toolFilter = {
                labeling: ["ObjectLabeling", "SeatLabeling", "Label"]
            }, r
        }
        return _inherits(t, React.Component), _createClass(t, [{
            key: "getToolFilter",
            value: function () {
                return this.toolFilter[this.props.designer.tool]
            }
        }, {
            key: "areAllUndefined",
            value: function (e) {
                return Object.keys(e).every(function (t) {
                    return void 0 === e[t]
                })
            }
        }, {
            key: "getSheetData",
            value: function () {
                var e = this,
                    t = {
                        sheets: {},
                        sharedProps: {}
                    };
                return Object.keys(this.props.selection.sheets).forEach(function (r) {
                    if (r.indexOf(".") < 0 && r[0] === r[0].toLowerCase()) t.sharedProps[r] = e.props.selection.sheets[r];
                    else {
                        var o = r.split("."),
                            n = _slicedToArray(o, 2),
                            i = n[0],
                            s = n[1];
                        e.props.selection.count && e.getToolFilter() && !e.getToolFilter().includes(i) || (t.sheets[i] || (t.sheets[i] = {}), t.sheets[i][s] = e.props.selection.sheets[r])
                    }
                }), t
            }
        }, {
            key: "componentDidUpdate",
            value: function () {
                this.goToSheet(this.props.uiState.goToSheet)
            }
        }, {
            key: "componentDidMount",
            value: function () {
                this.goToSheet(this.props.uiState.goToSheet)
            }
        }, {
            key: "goToSheet",
            value: function (e) {
                if (e && this.childRefs[e]) {
                    var t = ReactDOM.findDOMNode(this.childRefs[e]).getBoundingClientRect(),
                        r = ReactDOM.findDOMNode(this.refNode).getBoundingClientRect();
                    this.refNode.scrollTop = t.top + t.height - r.top, setTimeout(function () {
                        return mercator.designer.uiStateUpdate({
                            goToSheet: null
                        })
                    }, 600)
                }
            }
        }, {
            key: "getTitle",
            value: function (e) {
                return this.props.selection.count && e.objectType ? Array.isArray(e.objectType) ? e.objectType.map(function (e) {
                    return d(e)
                }).join(", ") : d(e.objectType) : null
            }
        }, {
            key: "setRefNode",
            value: function (e) {
                if (e && this.refNode !== e) {
                    this.refNode = e;
                    var t = ReactDOM.findDOMNode(e);
                    this.forcedScrollbars = t.offsetWidth - t.clientWidth > 0
                }
            }
        }, {
            key: "render",
            value: function () {
                var e = this,
                    t = this.getSheetData(),
                    r = t.sheets,
                    o = t.sharedProps,
                    n = this.getTitle(o);
                return React.createElement("div", {
                    className: "Inspector " + (this.forcedScrollbars && "forced-scrollbars"),
                    ref: function (t) {
                        return e.setRefNode(t)
                    }
                }, React.createElement("div", {
                    className: "container"
                }, n && React.createElement("div", {
                    key: "title",
                    className: "title"
                }, n), Object.keys(r).length > 0 ? Object.keys(r).map(function (t) {
                    var n = Inspector.Sheets[t],
                        i = r[t];
                    if (n && !e.areAllUndefined(i)) {
                        var s = (Array.isArray(o.uuid) ? o.uuid[0] + "-" + o.uuid.length : o.uuid) + "-" + t;
                        return React.createElement(n, _extends({}, e.props, {
                            key: s,
                            objectType: o.objectType,
                            disabled: o.disabled || [],
                            data: i,
                            childRef: function (r) {
                                return e.childRefs[t] = r
                            },
                            highlightFx: e.props.uiState.goToSheet === t
                        }))
                    }
                }) : React.createElement(Inspector.Sheets.NoSharedProperties, {
                    key: "no-shared-properties"
                })))
            }
        }]), t
    }();
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }
    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var NavigationHUD = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return n.state = {
            dragging: !1
        }, n.draggingMax = 15, n.draggingThreshold = 2, n.onMouseMoveBind = n.onMouseMove.bind(n), n.onMouseUpBind = n.onMouseUp.bind(n), n
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "shouldComponentUpdate",
        value: function (e, t) {
            return differentObjectValues(this.state, t) || differentObjectValues(this.props, e)
        }
    }]), _createClass(t, [{
        key: "enterDraggingMode",
        value: function () {
            this.setState({
                dragging: !0
            }), this.animatePanning(), mercator.designer.uiEvents.setCursor("grabbing")
        }
    }, {
        key: "leaveDraggingMode",
        value: function () {
            this.setState({
                dragging: !1
            }), this.currentAlpha = !1, this.refreshJoystickPosition(), mercator.designer.uiEvents.setCursor(null)
        }
    }, {
        key: "refreshJoystickPosition",
        value: function () {
            if (this.currentAlpha) {
                var e = -this.currentAlpha.x,
                    t = -this.currentAlpha.y;
                this.joystickRef.style.transform = "translateX(" + e + "px) translateY(" + t + "px)"
            } else this.joystickRef.style.transform = null
        }
    }, {
        key: "animatePanning",
        value: function () {
            this.currentAlpha && (mercator.designer.uiEvents.pan(-this.currentAlpha.x, -this.currentAlpha.y), window.requestAnimationFrame(this.animatePanning.bind(this)))
        }
    }, {
        key: "positionAbsAlpha",
        value: function (e, t) {
            return {
                x: Math.abs(e.x - t.clientX),
                y: Math.abs(e.y - t.clientY)
            }
        }
    }, {
        key: "positionAlpha",
        value: function (e, t) {
            return {
                x: e.x - t.clientX,
                y: e.y - t.clientY
            }
        }
    }, {
        key: "radialClampPositionAlpha",
        value: function (e, t) {
            var n = Math.atan2(e.y, e.x),
                i = Math.abs(Math.cos(n) * t),
                o = Math.abs(Math.sin(n) * t);
            return {
                x: Math.max(-i, Math.min(i, e.x)),
                y: Math.max(-o, Math.min(o, e.y))
            }
        }
    }, {
        key: "onMouseDown",
        value: function (e) {
            this.props.disabled || (this.dragStartPosition = {
                x: e.clientX,
                y: e.clientY
            }, window.addEventListener("mousemove", this.onMouseMoveBind), window.addEventListener("mouseup", this.onMouseUpBind), e.preventDefault(), e.stopPropagation())
        }
    }, {
        key: "onMouseMove",
        value: function (e) {
            if (this.state.dragging) this.currentAlpha = this.radialClampPositionAlpha(this.positionAlpha(this.dragStartPosition, e), this.draggingMax), this.refreshJoystickPosition();
            else {
                var t = this.positionAbsAlpha(this.dragStartPosition, e);
                (t.x >= this.draggingThreshold || t.y >= this.draggingThreshold) && (this.dragStartPosition = {
                    x: e.clientX,
                    y: e.clientY
                }, this.currentAlpha = {
                    x: 0,
                    y: 0
                }, this.enterDraggingMode())
            }
            e.preventDefault(), e.stopPropagation()
        }
    }, {
        key: "onMouseUp",
        value: function (e) {
            if (window.removeEventListener("mousemove", this.onMouseMoveBind), window.removeEventListener("mouseup", this.onMouseUpBind), this.state.dragging) this.leaveDraggingMode();
            else {
                var t = this.positionAbsAlpha(this.dragStartPosition, e);
                t.x < this.draggingThreshold && t.y < this.draggingThreshold && mercator.designer.uiEvents.panToCenter()
            }
            e.preventDefault(), e.stopPropagation()
        }
    }, {
        key: "render",
        value: function () {
            var e = this,
                t = mercator.designer.uiEvents;
            return React.createElement("div", {
                className: "NavigationHUD " + (this.state.dragging && "dragging") + " align-" + (this.props.align || "left")
            }, React.createElement("div", {
                className: "ring"
            }, React.createElement("div", {
                className: "arrows"
            }, React.createElement("div", {
                className: "left icon-arrow-left",
                onClick: function () {
                    return t.panLeft()
                }
            }), React.createElement("div", {
                className: "right icon-arrow-right",
                onClick: function () {
                    return t.panRight()
                }
            }), React.createElement("div", {
                className: "up icon-arrow-up",
                onClick: function () {
                    return t.panUp()
                }
            }), React.createElement("div", {
                className: "down icon-arrow-down",
                onClick: function () {
                    return t.panDown()
                }
            })), React.createElement("div", {
                className: "joystick",
                ref: function (t) {
                    return e.joystickRef = t
                },
                onMouseDown: this.onMouseDown.bind(this)
            })),
                React.createElement("div", {
                    className: "button-switcher"
                },
                    React.createElement(Button, {
                        preset: "hud-icon",
                        type: "minus",
                        caption: d("zoom-out") + " (alt + mouse wheel)",
                        onClick: function () {
                            return t.zoomOut()
                        },
                        disabled: this.props.zoomLevel <= this.props.minZoomLevel
                    }),
                    React.createElement(Button, {
                        preset: "hud-icon",
                        type: "plus",
                        caption: d("zoom-in") + " (alt + mouse wheel)",
                        onClick: function () {
                            return t.zoomIn()
                        },
                        disabled: this.props.zoomLevel >= this.props.maxZoomLevel
                    })))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var s = 0; s < t.length; s++) {
            var i = t[s];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }
    return function (t, s, i) {
        return s && e(t.prototype, s), i && e(t, i), t
    }
}();

function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0, s = Array(e.length); t < e.length; t++) s[t] = e[t];
        return s
    }
    return Array.from(e)
}

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var NumericInput = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var s = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return s.state = {
            value: e.value,
            displayValue: null,
            editing: !1,
            scrubbing: !1
        }, s.valueOnEditStart = null, s.scrubbingThreshold = 3, s.onMouseMoveBind = s.onMouseMove.bind(s), s.onMouseUpBind = s.onMouseUp.bind(s), s.handleClickOutside = s.handleClickOutside.bind(s), s.handleEscWhenScrubbing = s.handleEscWhenScrubbing.bind(s), s
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "shouldComponentUpdate",
        value: function (e, t) {
            return differentObjectValues(this.state, t) || differentObjectValues(this.props, e)
        }
    }]), _createClass(t, [{
        key: "componentDidMount",
        value: function () {
            document.addEventListener("mousedown", this.handleClickOutside)
        }
    }, {
        key: "componentWillUnmount",
        value: function () {
            this.state.scrubbing && this.leaveScrubbingMode(), document.removeEventListener("mousedown", this.handleClickOutside)
        }
    }, {
        key: "handleClickOutside",
        value: function (e) {
            this.state.editing && this.wrapperRef && !this.wrapperRef.contains(e.target) && this.submitChanges()
        }
    }, {
        key: "handleEscWhenScrubbing",
        value: function (e) {
            "Escape" === e.key && (this.leaveScrubbingMode(), window.removeEventListener("mousemove", this.onMouseMoveBind), window.removeEventListener("mouseup", this.onMouseUpBind), e.stopPropagation(), e.preventDefault())
        }
    }, {
        key: "enterEditMode",
        value: function () {
            this.props.disableDirectInput || (ReactDOM.findDOMNode(this.inputRef).select(), this.valueOnEditStart = this.props.value, this.setState({
                editing: !0,
                value: this.getSingleValue()
            }))
        }
    }, {
        key: "leaveEditMode",
        value: function () {
            this.setState({
                editing: !1,
                displayValue: null
            }), this.inputRef.blur()
        }
    }, {
        key: "enterScrubbingMode",
        value: function () {
            document.addEventListener("keydown", this.handleEscWhenScrubbing), mercator.designer.stateChangeDetector.pause(), this.setState({
                scrubbing: !0
            }), this.valueOnEditStart = this.props.value, this.refreshCursor()
        }
    }, {
        key: "leaveScrubbingMode",
        value: function () {
            document.removeEventListener("keydown", this.handleEscWhenScrubbing), mercator.designer.stateChangeDetector.resume(), this.submitChanges(), this.setState({
                scrubbing: !1
            }), mercator.designer.uiEvents.clearCursor()
        }
    }, {
        key: "step",
        value: function () {
            return this.props.step ? this.props.step : "odd" === this.props.numeral || "even" === this.props.numeral ? 2 : 1
        }
    }, {
        key: "getRoundPrecision",
        value: function () {
            return this.props.roundPrecision || 0
        }
    }, {
        key: "onKeyDown",
        value: function (e) {
            switch (e.key) {
                case "Escape":
                    this.leaveEditMode(), this.props.onCancel && this.props.onCancel(), e.stopPropagation();
                    break;
                case "Enter":
                    this.submitChanges();
                    break;
                case "ArrowUp":
                case "ArrowDown":
                    var t = "ArrowUp" == e.key ? 1 : -1;
                    this.modifyValue(t * this.getStep(e));
                    break;
                default:
                    return
            }
            e.preventDefault()
        }
    }, {
        key: "stepBack",
        value: function (e) {
            this.submitNewValue(this.props.value - this.getStep(e), !0)
        }
    }, {
        key: "stepForward",
        value: function (e) {
            this.submitNewValue(this.props.value + this.getStep(e), !0)
        }
    }, {
        key: "getStep",
        value: function (e) {
            return (e && e.altKey ? 1 : this.step()) * (e && e.shiftKey ? 10 : 1)
        }
    }, {
        key: "modifyValue",
        value: function (e) {
            this.state.editing && this.setState({
                value: this.submitNewValue(this.state.value + e, !1)
            })
        }
    }, {
        key: "onTextboxChange",
        value: function (e) {
            this.setState({
                value: this.toInteger(e.target.value),
                displayValue: e.target.value
            })
        }
    }, {
        key: "submitChanges",
        value: function () {
            this.leaveEditMode(), this.valueOnEditStart !== this.state.value && this.submitNewValue(this.state.value, !0)
        }
    }, {
        key: "_maxValue",
        value: function () {
            return Array.isArray(this.props.max) ? Math.min.apply(Math, _toConsumableArray(this.props.max)) : this.props.max
        }
    }, {
        key: "_minValue",
        value: function () {
            return Array.isArray(this.props.min) ? Math.max.apply(Math, _toConsumableArray(this.props.min)) : this.props.min
        }
    }, {
        key: "submitNewValue",
        value: function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            return isNaN(e) ? e : (!isNaN(this._maxValue()) && e >= this._maxValue() && (e = this.props.wrapsAround ? wrapAround(e, this._minValue() || 0, this._maxValue()) : Math.min(this._maxValue(), e)), !isNaN(this._minValue()) && e < this._minValue() && (e = this.props.wrapsAround ? wrapAround(e, this._minValue(), this._maxValue()) : Math.max(this._minValue(), e)), this.props.onChange && this.props.onChange(e), t ? this.props.onChangeFinal && this.props.onChangeFinal(e) : this.props.onChangePreview && this.props.onChangePreview(e), this.state.scrubbing && this.refreshCursor(e), this.setState({
                value: e,
                displayValue: null
            }), e)
        }
    }, {
        key: "positionAlpha",
        value: function (e, t) {
            return {
                x: Math.abs(e.x - t.clientX),
                y: Math.abs(e.y - t.clientY)
            }
        }
    }, {
        key: "refreshCursor",
        value: function (e) {
            e || (e = this.props.value);
            var t = "ew";
            !this.canStepBack(e) && this.canStepForward(e) ? t = "e" : this.canStepBack(e) && !this.canStepForward(e) && (t = "w"), mercator.designer.uiEvents.setCursor(t + "-resize")
        }
    }, {
        key: "canStepBack",
        value: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            return !!this.props.wrapsAround || (e || (e = this.getSingleValue()), isNaN(this._minValue()) || e > this._minValue())
        }
    }, {
        key: "canStepForward",
        value: function (e) {
            return !!this.props.wrapsAround || (e || (e = this.getSingleValue()), isNaN(this._maxValue()) || e < this._maxValue())
        }
    }, {
        key: "onMouseDown",
        value: function (e) {
            this.props.disabled || 0 !== e.button || (this.dragStartPosition = {
                x: e.clientX,
                y: e.clientY
            }, window.addEventListener("mousemove", this.onMouseMoveBind), window.addEventListener("mouseup", this.onMouseUpBind), e.preventDefault(), e.stopPropagation())
        }
    }, {
        key: "onMouseMove",
        value: function (e) {
            if (0 === e.button) {
                if (this.state.scrubbing) {
                    var t = e.clientX - this.scrubStartPosition.x,
                        s = this.step() || 1,
                        i = this.props.pixelsForStep || 1;
                    this.submitNewValue(this.scrubStartValue + roundTo(t / i, this.getRoundPrecision()) * s, !1)
                } else {
                    this.positionAlpha(this.dragStartPosition, e).x >= this.scrubbingThreshold && (this.scrubStartPosition = {
                        x: e.clientX,
                        y: e.clientY
                    }, this.scrubStartValue = this.getSingleValue(), this.enterScrubbingMode())
                }
                e.preventDefault(), e.stopPropagation()
            }
        }
    }, {
        key: "onMouseUp",
        value: function (e) {
            if (0 === e.button) {
                if (window.removeEventListener("mousemove", this.onMouseMoveBind), window.removeEventListener("mouseup", this.onMouseUpBind), this.state.scrubbing) this.leaveScrubbingMode();
                else this.positionAlpha(this.dragStartPosition, e).x < this.scrubbingThreshold && this.enterEditMode();
                e.preventDefault(), e.stopPropagation()
            }
        }
    }, {
        key: "toNumeral",
        value: function (e) {
            var t = this,
                s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.props;
            if (Array.isArray(e)) return e.map(function (e) {
                return t.toNumeral(e)
            });
            var i = void 0;
            switch (s.numeral) {
                case "alphabetic-sequence":
                    return i = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", this.props.skipNumerals && this.props.skipNumerals.forEach(function (e) {
                        return i = i.replace(e.toUpperCase(), "")
                    }), mercator.AutoLabeler.pickFrom(i, parseInt(e) - 1);
                case "alphabetic-sequence-lowercase":
                    return i = "abcdefghijklmnopqrstuvwxyz", this.props.skipNumerals && this.props.skipNumerals.forEach(function (e) {
                        return i = i.replace(e.toUpperCase(), "")
                    }), mercator.AutoLabeler.pickFrom(i, parseInt(e) - 1);
                case "roman-sequence":
                    return romanize(parseInt(e));
                case "decimal-sequence":
                    return parseInt(e);
                case "decimal-sequence-up-down-ascending":
                    return parseInt(mercator.AutoLabeler.getFirstPossibilities(mercator.AutoLabeler.getAlgorithm("UpDownAscending"), e).last());
                case "decimal-sequence-up-down-descending":
                    return parseInt(mercator.AutoLabeler.getFirstPossibilities(mercator.AutoLabeler.getAlgorithm("UpDownDescending"), e).last());
                case "odd":
                    return parseOdd(e);
                case "even":
                    return parseEven(e);
                default:
                    return null === e ? s.min || 0 : roundTo(parseFloat(e), this.getRoundPrecision())
            }
        }
    }, {
        key: "toInteger",
        value: function (e) {
            switch (this.props.numeral) {
                case "alphabetic-sequence":
                    return mercator.AutoLabeler.calculateIndex(mercator.AutoLabeler.getAlgorithm("SimpleLettersUppercase"), e.toUpperCase(), null, this.props.skipNumerals) + 1;
                case "alphabetic-sequence-lowercase":
                    return mercator.AutoLabeler.calculateIndex(mercator.AutoLabeler.getAlgorithm("SimpleLettersLowercase"), e.toLowerCase(), null, this.props.skipNumerals) + 1;
                case "roman-sequence":
                    return mercator.AutoLabeler.calculateIndex(mercator.AutoLabeler.getAlgorithm("Roman"), e) + 1;
                case "decimal-sequence":
                    return parseInt(e);
                case "decimal-sequence-up-down-ascending":
                    return mercator.AutoLabeler.calculateIndex(mercator.AutoLabeler.getAlgorithm("UpDownAscending"), e) + 1;
                case "decimal-sequence-up-down-descending":
                    return mercator.AutoLabeler.calculateIndex(mercator.AutoLabeler.getAlgorithm("UpDownDescending"), e) + 1;
                case "odd":
                    return parseOdd(e);
                case "even":
                    return parseEven(e);
                default:
                    return parseInt(e)
            }
        }
    }, {
        key: "getValue",
        value: function () {
            return Array.isArray(this.props.value) ? "" : this.toNumeral(this.props.value)
        }
    }, {
        key: "getSingleValue",
        value: function () {
            return Array.isArray(this.props.value) ? roundTo(this.props.value.reduce(function (e, t) {
                return e + t
            }) / this.props.value.length, this.getRoundPrecision()) : this.props.value
        }
    }, {
        key: "render",
        value: function () {
            var e = this;
            if (this.props.invisible) return null;
            var t = void 0,
                s = void 0,
                i = void 0,
                n = void 0;
            this.state.displayValue ? i = this.state.displayValue : (i = this.state.editing ? this.state.value : (n = !!this.props.previewValue) ? this.props.previewValue : this.props.value, Array.isArray(i) ? i.filter(function (e) {
                return !isNaN(e) && null !== e
            }).length > 1 ? (s = this.toNumeral(i).join(", "), t = d("multiple-values") + ": " + s) : i = this.toNumeral(i[0]) : i = isNaN(i) ? "" : this.toNumeral(i));
            return React.createElement("div", {
                className: "NumericInput " + (this.props.disabled ? "disabled" : "") + " " + (this.props.pulse ? "pulse" : "") + " " + (this.state.scrubbing ? "scrubbing" : "") + " " + (n && "previewing-value"),
                title: t,
                ref: function (t) {
                    return e.wrapperRef = t
                }
            }, this.props.caption && React.createElement("div", {
                key: "caption",
                className: "caption",
                onMouseDown: this.onMouseDown.bind(this)
            }, this.props.caption), React.createElement("div", {
                className: "value"
            }, React.createElement("div", {
                className: "editable"
            }, React.createElement("input", {
                type: "text",
                onKeyDown: this.onKeyDown.bind(this),
                onChange: this.onTextboxChange.bind(this),
                onFocus: this.enterEditMode.bind(this),
                onBlur: this.submitChanges.bind(this),
                placeholder: s,
                value: i,
                ref: function (t) {
                    return e.inputRef = t
                }
            })), !this.state.editing && React.createElement("div", {
                className: "label",
                title: this.props.disabled || t ? "" : d("numeric-input-scrubber-hint")
            }, React.createElement("div", {
                className: "arrow icon-arrow-light-left " + (!this.canStepBack(this.props.value) && "disabled"),
                onMouseDown: function (t) {
                    return e.stepBack(t)
                }
            }), s ? React.createElement("div", {
                key: "placeholder",
                className: "placeholder",
                onMouseDown: this.onMouseDown.bind(this)
            }, s) : React.createElement("div", {
                key: "caption",
                className: "caption",
                onMouseDown: this.onMouseDown.bind(this)
            }, i, " ", this.props.unit && React.createElement("span", {
                className: "unit"
            }, this.props.unit)), React.createElement("div", {
                className: "arrow icon-arrow-light-right " + (!this.canStepForward(this.props.value) && "disabled"),
                onMouseDown: function (t) {
                    return e.stepForward(t)
                }
            }))))
        }
    }]), t
}();

function Panel(e) {
    return React.createElement("div", {
        id: "panel-" + e.snap,
        className: "Panel snap-" + e.snap
    }, e.children)
}
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var PicturesChoiceInput = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "options",
        value: function () {
            return this.props.options ? this.props.options.map(function (e) {
                var t = e.value,
                    n = e.caption;
                return t || (t = e, n = d(t)), React.createElement("option", {
                    key: t,
                    value: t
                }, n)
            }) : []
        }
    }, {
        key: "render",
        value: function () {
            var e = this.props,
                t = e.options,
                n = e.onChange,
                r = Array.isArray(this.props.value) ? null : this.props.value,
                o = t.find(function (e) {
                    return e.value === r
                });
            return React.createElement("div", {
                className: "PicturesChoiceInput"
            }, React.createElement("div", {
                className: "options"
            }, t.map(function (e) {
                return React.createElement("button", {
                    style: {
                        backgroundImage: "url(" + e.imgURL + ")"
                    },
                    className: "option " + (e.value === r && "selected"),
                    onClick: function () {
                        return n(e.value)
                    }
                })
            })), o && React.createElement("div", {
                className: "details"
            }, o.label && React.createElement("div", {
                className: "label"
            }, o.label), o.description && React.createElement("div", {
                className: "description"
            }, o.description)))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }
    return function (t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var PressAndHoldInput = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "onCheckboxRef",
        value: function (e) {
            e && (this.inputElement = e, this.inputElement.indeterminate = Array.isArray(this.props.value))
        }
    }, {
        key: "componentDidUpdate",
        value: function (e) {
            this.inputElement && (this.inputElement.indeterminate = Array.isArray(this.props.value))
        }
    }, {
        key: "onPress",
        value: function () {
            this.props.onChange && this.props.onChange(!0), this.props.onPress && this.props.onPress()
        }
    }, {
        key: "onRelease",
        value: function () {
            this.props.onChange && this.props.onChange(!1), this.props.onRelease && this.props.onRelease()
        }
    }, {
        key: "render",
        value: function () {
            var e = this;
            if (this.props.invisible) return null;
            var t = mercator.designer.uiEvents,
                n = Array.isArray(this.props.value) ? this.props.value.some(function (e) {
                    return e
                }) : !0 === this.props.value;
            return React.createElement("div", {
                className: "PressAndHoldInput " + (this.props.disabled && "disabled") + " " + (n ? "pressed" : "")
            }, React.createElement("label", {
                className: "caption",
                onMouseDown: function () {
                    return e.onPress()
                },
                onMouseUp: function () {
                    return e.onRelease()
                }
            }, this.props.caption, this.props.infoTooltip && React.createElement("span", {
                className: "icon-info info-tooltip-icon",
                onMouseOut: function () {
                    return t.hideTooltip()
                },
                onMouseOver: function (n) {
                    return t.showTooltip(React.createElement("p", null, e.props.infoTooltip), n, !0)
                }
            }), this.props.keyHint && React.createElement("span", {
                className: "key-hint"
            }, this.props.keyHint)))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var o = 0; o < t.length; o++) {
            var s = t[o];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
        }
    }
    return function (t, o, s) {
        return o && e(t.prototype, o), s && e(t, s), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var ReferenceChartPreview = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var o = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return o.state = {
            placeholderX: -20,
            placeholderY: -20,
            showPlaceholder: !1,
            rightMousePressedIndex: -1,
            draggedSeatIndex: -1,
            draggingRow: !1,
            previewPlacedSeats: null
        }, o.viewportMaxSize = 500, o.dragState = t.DRAG_NONE, o.onMouseMove = o.onMouseMove.bind(o), o.onMouseUp = o.onMouseUp.bind(o), o
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "componentDidMount",
        value: function () {
            document.addEventListener("mousemove", this.onMouseMove), document.addEventListener("mouseup", this.onMouseUp)
        }
    }, {
        key: "componentWillUnmount",
        value: function () {
            document.removeEventListener("mousemove", this.onMouseMove), document.removeEventListener("mouseup", this.onMouseUp)
        }
    }, {
        key: "finalWidth",
        value: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.props;
            return Math.round(e.width * e.scale / 100)
        }
    }, {
        key: "finalHeight",
        value: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.props;
            return Math.round(e.height * e.scale / 100)
        }
    }, {
        key: "centerViewport",
        value: function (e) {
            e && (this.viewportRef = e), this.viewportRef && !this.alreadyScrolled && (this.viewportRef.scrollLeft = this.viewportMaxSize / 2 + this.finalWidth() / 2, this.viewportRef.scrollTop = this.viewportMaxSize / 2 + this.finalHeight() / 5, this.alreadyScrolled = !0)
        }
    }, {
        key: "coordinatesFromEvent",
        value: function (e) {
            return {
                x: e.clientX,
                y: e.clientY
            }
        }
    }, {
        key: "setDrag",
        value: function (e, t) {
            this.lastCursorPosition = this.coordinatesFromEvent(e), this.dragState = t
        }
    }, {
        key: "onViewportMouseDown",
        value: function (e) {
            e.preventDefault(), 0 === e.button && (this.canPan() ? this.setDrag(e, t.DRAG_PANNING) : this.canMark() && this.props.onPlacedSeatsChange(this.getPlacedSeats().concat([mercator.Point.fromDict({
                x: e.nativeEvent.offsetX,
                y: e.nativeEvent.offsetY
            })])))
        }
    }, {
        key: "onMouseMove",
        value: function (e) {
            if (this.dragState !== t.DRAG_NONE) {
                var o = this.coordinatesFromEvent(e),
                    s = mercator.Point.fromDict(this.subtractPoints(this.lastCursorPosition, o));
                if (this.lastCursorPosition = o, this.dragState === t.DRAG_PANNING && (this.viewportRef.scrollLeft += s.x, this.viewportRef.scrollTop += s.y, this.lastScrollLeft = this.viewportRef.scrollLeft, this.lastScrollTop = this.viewportRef.scrollTop), this.dragState === t.DRAG_SEAT && this.state.draggedSeatIndex >= 0) {
                    var a = this.getPlacedSeats().concat(),
                        i = a[this.state.draggedSeatIndex];
                    a[this.state.draggedSeatIndex] = i.subtract(s), this.setState({
                        previewPlacedSeats: a
                    })
                }
                if (this.dragState === t.DRAG_ROW) {
                    var n = this.props.duplicateRowOffset.subtract(s);
                    this.props.onDuplicateRowChange(n)
                }
            }
        }
    }, {
        key: "onMouseUp",
        value: function (e) {
            this.setDrag(e, t.DRAG_NONE), this.setState({
                draggingRow: !1
            }), 2 === e.button && this.setState({
                rightMousePressedIndex: -1
            })
        }
    }, {
        key: "onSeatMouseDown",
        value: function (e, o) {
            0 === e.button && (this.setDrag(e, t.DRAG_SEAT), this.setState({
                draggedSeatIndex: o
            })), 2 === e.button && this.setState({
                rightMousePressedIndex: o
            })
        }
    }, {
        key: "onSeatMouseUp",
        value: function (e, t) {
            if (this.state.draggedSeatIndex >= 0 && (this.props.onPlacedSeatsChange(this.getPlacedSeats()), this.setState({
                previewPlacedSeats: null,
                draggedSeatIndex: -1
            })), 2 === e.button && this.state.rightMousePressedIndex === t) {
                var o = this.getPlacedSeats()[t];
                this.setState({
                    placeholderX: o.x + e.nativeEvent.offsetX - this.getSeatSize() / 2,
                    placeholderY: o.y + e.nativeEvent.offsetY - this.getSeatSize() / 2
                }), this.removeMark(t)
            }
        }
    }, {
        key: "onDupRowMouseDown",
        value: function (e) {
            0 === e.button && (this.setDrag(e, t.DRAG_ROW), this.setState({
                draggingRow: !0
            }))
        }
    }, {
        key: "onViewportMouseMove",
        value: function (e) {
            this.setState({
                placeholderX: e.nativeEvent.offsetX,
                placeholderY: e.nativeEvent.offsetY
            })
        }
    }, {
        key: "getPlacedSeats",
        value: function () {
            return this.state.previewPlacedSeats || this.props.placedSeats || []
        }
    }, {
        key: "componentWillUpdate",
        value: function (e) {
            if (e.scale !== this.props.scale) {
                var t = this.viewportMaxSize,
                    o = this.viewportRef.getBoundingClientRect(),
                    s = this.lastScrollLeft || this.viewportRef.scrollLeft,
                    a = this.lastScrollTop || this.viewportRef.scrollTop,
                    i = s - t + o.width / 2,
                    n = a - t + o.height / 2;
                this.prevScrollData = {
                    crosshairXRate: i / this.finalWidth(),
                    crosshairYRate: n / this.finalHeight()
                }
            }
        }
    }, {
        key: "componentDidUpdate",
        value: function () {
            if (this.prevScrollData) {
                var e = this.viewportMaxSize,
                    t = this.viewportRef.getBoundingClientRect(),
                    o = this.prevScrollData.crosshairXRate * this.finalWidth(),
                    s = this.prevScrollData.crosshairYRate * this.finalHeight();
                this.lastScrollLeft = o + e - t.width / 2, this.lastScrollTop = s + e - t.height / 2, this.viewportRef.scrollLeft = this.lastScrollLeft, this.viewportRef.scrollTop = this.lastScrollTop, this.prevScrollData = null
            }
        }
    }, {
        key: "canPan",
        value: function () {
            return "find" === this.props.mode
        }
    }, {
        key: "canMark",
        value: function () {
            return "mark" === this.props.mode
        }
    }, {
        key: "canDragDuplicate",
        value: function () {
            return "duplicate" === this.props.mode
        }
    }, {
        key: "removeMark",
        value: function (e) {
            var t = this.props.placedSeats.concat();
            t.splice(e, 1), this.props.onPlacedSeatsChange(t), this.setState({
                showPlaceholder: !0
            })
        }
    }, {
        key: "getSeatSize",
        value: function () {
            return (this.props.seatSize || 8) * (this.props.scale / 100)
        }
    }, {
        key: "subtractPoints",
        value: function (e, t) {
            return {
                x: e.x - t.x,
                y: e.y - t.y
            }
        }
    }, {
        key: "renderSeat",
        value: function (e, t) {
            var o = this,
                s = ["seat"];
            return this.state.rightMousePressedIndex === t && s.push("contextual-active"), this.state.draggedSeatIndex === t && s.push("dragged"), React.createElement("div", {
                key: t,
                className: s.join(" "),
                style: {
                    left: e.x + "px",
                    top: e.y + "px",
                    fontSize: this.getSeatSize() + "px"
                },
                onMouseDown: function (e) {
                    return o.onSeatMouseDown(e, t)
                },
                onMouseUp: function (e) {
                    return o.onSeatMouseUp(e, t)
                }
            })
        }
    }, {
        key: "render",
        value: function () {
            var e = this,
                o = this.props.width && this.props.height,
                s = o ? {
                    width: this.finalWidth() + "px",
                    height: this.finalHeight() + "px",
                    padding: this.viewportMaxSize + "px"
                } : {},
                a = this.canMark() && this.state.showPlaceholder && this.dragState === t.DRAG_NONE,
                i = this.canDragDuplicate();
            return React.createElement("div", {
                className: "ReferenceChartPreview " + (o && "loaded") + " " + this.props.mode,
                onContextMenu: function (e) {
                    return e.preventDefault()
                }
            }, o ? React.createElement(React.Fragment, null, React.createElement("div", {
                className: "seats-overlay"
            }, this.getPlacedSeats().map(function (t, o) {
                return e.renderSeat(t, o)
            }), a && React.createElement("div", {
                className: "seat placeholder",
                style: {
                    top: this.state.placeholderY,
                    left: this.state.placeholderX,
                    fontSize: this.getSeatSize() + "px"
                }
            })), i && React.createElement(React.Fragment, null, React.createElement("div", {
                className: "duplicate-row-overlay " + (this.state.draggingRow && "dragged"),
                onMouseDown: this.onDupRowMouseDown.bind(this)
            }, this.getPlacedSeats().map(function (t, o) {
                return e.renderSeat(t.add(e.props.duplicateRowOffset), o)
            }))), React.createElement("div", {
                className: "viewport",
                ref: function (t) {
                    return e.centerViewport(t)
                },
                onMouseDown: this.onViewportMouseDown.bind(this),
                onMouseMove: this.onViewportMouseMove.bind(this),
                onMouseEnter: function () {
                    return e.setState({
                        showPlaceholder: !0
                    })
                },
                onMouseLeave: function () {
                    return e.setState({
                        showPlaceholder: !1
                    })
                }
            }, React.createElement("img", {
                className: "background",
                style: s,
                src: this.props.src
            }))) : React.createElement("div", {
                className: "loading icon-saving"
            }))
        }
    }]), t
}();

ReferenceChartPreview.DRAG_NONE = 0, ReferenceChartPreview.DRAG_PANNING = 1, ReferenceChartPreview.DRAG_SEAT = 2, ReferenceChartPreview.DRAG_ROW = 3;

var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}

var SelectInput = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "options",
        value: function () {
            return this.props.options ? this.props.options.map(function (e) {
                var t = e.value,
                    n = e.caption;
                return t || (t = e, n = d(t)), React.createElement("option", {
                    key: t,
                    value: t
                }, n)
            }) : []
        }
    }, {
        key: "render",
        value: function () {
            var e = this,
                t = Array.isArray(this.props.value) ? null : this.props.value;
            return React.createElement("div", {
                className: "SelectInput"
            }, React.createElement("select", {
                onChange: function (t) {
                    return e.props.onChange(t.target.value)
                },
                disabled: this.props.disabled,
                value: t || "select-input-none"
            }, Array.isArray(this.props.value) && React.createElement("option", {
                value: "select-input-none",
                disabled: !0
            }, d("multiple-values")), !Array.isArray(this.props.value) && null === t && React.createElement("option", {
                value: "select-input-none",
                disabled: !0
            }), this.options()))
        }
    }]), t
}();

var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
        }
    }
    return function (t, n, s) {
        return n && e(t.prototype, n), s && e(t, s), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var SliderInput = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return n.state = {
            value: n.getSingleValue(e),
            scrubbing: !1,
            noTransitions: !0
        }, n.scrubbingThreshold = 2, n.onMouseMoveBind = n.onMouseMove.bind(n), n.onMouseUpBind = n.onMouseUp.bind(n), n.handleEscWhenScrubbing = n.handleEscWhenScrubbing.bind(n), n.railRef = React.createRef(), n.railWidth = 85, n.newValue = null, n
    }
    return _inherits(t, React.PureComponent), _createClass(t, [{
        key: "componentDidMount",
        value: function () {
            var e = ReactDOM.findDOMNode(this.railRef.current);
            e && (this.railWidth = e.getBoundingClientRect().width)
        }
    }, {
        key: "handleEscWhenScrubbing",
        value: function (e) {
            "Escape" === e.key && (this.props.onCancel && this.props.onCancel(), this.leaveScrubbingMode(), window.removeEventListener("mousemove", this.onMouseMoveBind), window.removeEventListener("mouseup", this.onMouseUpBind), e.stopPropagation(), e.preventDefault())
        }
    }, {
        key: "enterScrubbingMode",
        value: function () {
            document.addEventListener("keydown", this.handleEscWhenScrubbing), mercator.designer.stateChangeDetector.pause(), this.setState({
                noTransitions: !1,
                scrubbing: !0,
                value: this.props.value,
                fromHandle: this.fromHandle
            }), this.refreshCursor()
        }
    }, {
        key: "leaveScrubbingMode",
        value: function () {
            document.removeEventListener("keydown", this.handleEscWhenScrubbing), mercator.designer.stateChangeDetector.resume(), this.setState({
                scrubbing: !1
            }), this.resetValueIfNeeded(), mercator.designer.uiEvents.clearCursor()
        }
    }, {
        key: "resetValueIfNeeded",
        value: function () {
            this.props.resetOnChangeFinal && this.setState({
                value: this.props.value
            })
        }
    }, {
        key: "step",
        value: function () {
            return this.props.step || 1
        }
    }, {
        key: "stepBack",
        value: function (e) {
            this.submitNewValue(this.props.value - this.getStep(e), !0), this.resetValueIfNeeded()
        }
    }, {
        key: "stepForward",
        value: function (e) {
            this.submitNewValue(this.props.value + this.getStep(e), !0), this.resetValueIfNeeded()
        }
    }, {
        key: "getStep",
        value: function (e) {
            return (e && e.altKey ? 1 : this.step()) * (e && e.shiftKey ? 10 : 1)
        }
    }, {
        key: "modifyValue",
        value: function (e) {
            this.newValue = this.submitNewValue(this.newValue + e, !1)
        }
    }, {
        key: "submitChanges",
        value: function () {
            null !== this.newValue && void 0 !== this.newValue && this.submitNewValue(this.newValue, !0), this.newValue = null
        }
    }, {
        key: "submitNewValue",
        value: function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            return isNaN(e) ? e : (!isNaN(this.props.max) && e >= this.props.max && (e = Math.min(this.props.max, e)), !isNaN(this.props.min) && e < this.props.min && (e = Math.max(this.props.min, e)), this.props.onChange && this.props.onChange(e), t ? this.props.onChangeFinal && this.props.onChangeFinal(e) : this.props.onChangePreview && this.props.onChangePreview(e), this.state.scrubbing && this.refreshCursor(e), this.setState({
                value: e
            }), e)
        }
    }, {
        key: "positionAlpha",
        value: function (e, t) {
            return {
                x: Math.abs(e.x - t.clientX)
            }
        }
    }, {
        key: "refreshCursor",
        value: function (e) {
            e || (e = this.props.value);
            var t = void 0;
            if (this.state.fromHandle) t = "grabbing";
            else {
                var n = "ew";
                !this.canStepBack(e) && this.canStepForward(e) ? n = "e" : this.canStepBack(e) && !this.canStepForward(e) && (n = "w"), t = n + "-resize"
            }
            mercator.designer.uiEvents.setCursor(t)
        }
    }, {
        key: "canStepBack",
        value: function (e) {
            return e || (e = this.getSingleValue()), isNaN(this.props.min) || e > this.props.min
        }
    }, {
        key: "canStepForward",
        value: function (e) {
            return e || (e = this.state.value), isNaN(this.props.max) || e < this.props.max
        }
    }, {
        key: "onMouseDown",
        value: function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            this.props.disabled || 0 !== e.button || (this.dragStartPosition = {
                x: e.clientX
            }, this.fromHandle = t, window.addEventListener("mousemove", this.onMouseMoveBind), window.addEventListener("mouseup", this.onMouseUpBind), e.preventDefault(), e.stopPropagation())
        }
    }, {
        key: "onMouseMove",
        value: function (e) {
            if (0 === e.button) {
                if (this.state.scrubbing) {
                    var t = 1 * (this.props.max - this.props.min) / this.railWidth,
                        n = e.clientX - this.scrubStartPosition.x;
                    this.newValue = Math.min(this.props.max, Math.max(this.props.min, this.props.value + n * t)), this.submitNewValue(this.newValue, !1)
                } else {
                    this.positionAlpha(this.dragStartPosition, e).x >= this.scrubbingThreshold && (this.scrubStartPosition = {
                        x: e.clientX
                    }, this.enterScrubbingMode())
                }
                e.preventDefault(), e.stopPropagation()
            }
        }
    }, {
        key: "onMouseUp",
        value: function (e) {
            0 === e.button && (window.removeEventListener("mousemove", this.onMouseMoveBind), window.removeEventListener("mouseup", this.onMouseUpBind), this.state.scrubbing && (this.submitChanges(), this.leaveScrubbingMode()), e.preventDefault(), e.stopPropagation())
        }
    }, {
        key: "getSingleValue",
        value: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.props;
            return Array.isArray(e.value) ? e.value[0] : e.value
        }
    }, {
        key: "getValueRate",
        value: function () {
            return (this.state.value - this.props.min) / (this.props.max - this.props.min)
        }
    }, {
        key: "render",
        value: function () {
            var e = this;
            if (this.props.invisible) return null;
            var t = this.state.value;
            return React.createElement("div", {
                className: "SliderInput " + (this.props.disabled && "disabled") + " " + (this.state.scrubbing && "scrubbing") + " " + (this.state.fromHandle && "from-handle") + " " + (this.state.noTransitions && "no-transitions"),
                ref: function (t) {
                    return e.wrapperRef = t
                }
            }, this.props.caption && React.createElement("div", {
                key: "caption",
                className: "caption",
                onMouseDown: function (t) {
                    return e.onMouseDown(t, !1)
                }
            }, this.props.caption), React.createElement("div", {
                className: "value"
            }, React.createElement("div", {
                className: "arrow icon-arrow-light-left " + (!this.canStepBack(t) && "disabled"),
                onMouseDown: function (t) {
                    return e.stepBack(t)
                }
            }), React.createElement("div", {
                className: "slider",
                title: d("numeric-input-scrubber-hint")
            }, React.createElement("div", {
                className: "rail",
                ref: this.railRef
            }, React.createElement("div", {
                className: "handle",
                onMouseDown: function (t) {
                    return e.onMouseDown(t, !0)
                },
                style: {
                    left: this.getValueRate() * this.railWidth + "px"
                }
            })), React.createElement("div", {
                className: "preview"
            }, Math.round(t), this.props.unit && React.createElement("span", {
                className: "unit"
            }, this.props.unit))), React.createElement("div", {
                className: "arrow icon-arrow-light-right " + (!this.canStepForward(t) && "disabled"),
                onMouseDown: function (t) {
                    return e.stepForward(t)
                }
            })))
        }
    }]), t
}();

function StatusBar(e) {
    var t = d(e.designer.tool),
        s = d(e.designer.toolHint, {
            meta: META_KEY + SHORTCUT_CONNECTOR,
            object: d(e.designer.tool)
        }),
        c = void 0,
        n = e.selection.count,
        a = e.selection.subCount;
    return ["mouse-pointer", "select-brush", "select-seats", "category", "label"].includes(e.designer.tool) && n + a > 0 && (n > 0 ? c = d("objects-selected-count", {
        smart_count: n
    }) + (a > n ? " (" + d("children-count", {
        smart_count: a
    }) + ")" : "") : a > 0 && (c = d("objects-selected-count", {
        smart_count: a
    }))), s = s.replace(/!\[(.*?)\]/gi, function (t, s) {
        var c = s.toLowerCase();
        return '<span class="key ' + ((c.includes("alt") && e.designer.altKey || c.includes("ctrl") && e.designer.ctrlKey || c.includes("shift") && e.designer.shiftKey || c.includes("right click") && e.designer.rightMouseButton) && "active") + '">' + s + "</span>"
    }), React.createElement("div", {
        className: "StatusBar"
    }, React.createElement("div", {
        className: "caption"
    }, t), React.createElement("div", {
        className: "description",
        dangerouslySetInnerHTML: {
            __html: s
        }
    }), c && React.createElement("div", {
        className: "status",
        dangerouslySetInnerHTML: {
            __html: c
        }
    }))
}
var _createClass = function () {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var TabSwitcher = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, React.PureComponent), _createClass(t, [{
        key: "render",
        value: function () {
            var e = this;
            return React.createElement("div", {
                className: "TabSwitcher"
            }, this.props.options.map(function (t) {
                return React.createElement("div", {
                    key: t.value,
                    className: "tab " + (t.value === e.props.value && "active"),
                    onClick: function () {
                        return e.props.onChange(t.value)
                    }
                }, t.label)
            }))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }
    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}

var TextInput = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return n.state = {
            editing: !1,
            suggestionsPointer: -1
        }, n.inputRef = React.createRef(), n
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "isReadOnly",
        value: function () {
            return this.props.locked || this.props.disabled
        }
    }, {
        key: "onKeyDown",
        value: function (e) {
            switch (e.key) {
                case "Escape":
                    if (this.props.escCancelsEdit) {
                        this.cancelEdit();
                        break
                    }
                case "Enter":
                    e.target.blur(), e.preventDefault(), e.stopPropagation();
                    break;
                case "ArrowUp":
                case "ArrowDown":
                    this.usingSuggestions() && (e.preventDefault(), e.stopPropagation(), this.moveSuggestionsPointer("ArrowDown" === e.key ? 1 : -1))
            }
        }
    }, {
        key: "moveSuggestionsPointer",
        value: function (e) {
            var n = this.state.suggestionsPointer + e;
            this.getSuggestions()[n] === t.SUGGESTIONS_SEPARATOR && (n += e / Math.abs(e)), n = wrapAround(n, 0, this.getSuggestions().length), this.setState({
                suggestionsPointer: n
            });
            var i = d(this.getSuggestions()[n]);
            this.setCurrentValue(i)
        }
    }, {
        key: "onEditStart",
        value: function () {
            this.newValue = this.getValue(), this.initialValue = this.newValue, this.setState({
                editing: !0,
                suggestionsPointer: -1
            }), this.props.onEditStart && this.props.onEditStart()
        }
    }, {
        key: "onEditStartAndSelect",
        value: function (e) {
            e.preventDefault(), this.onEditStart(), this.inputRef.current.select()
        }
    }, {
        key: "onEditEnd",
        value: function () {
            this.submitChanges(), this.cancelEdit()
        }
    }, {
        key: "cancelEdit",
        value: function () {
            this.newValue = null, this.setState({
                editing: !1
            }), this.props.onEditEnd && this.props.onEditEnd()
        }
    }, {
        key: "onTextboxChange",
        value: function () {
            this.newValue = this.inputRef.current.value, this.submitChanges(!1)
        }
    }, {
        key: "setCurrentValue",
        value: function (e) {
            this.newValue = e, this.inputRef.current.value = e
        }
    }, {
        key: "onClearValue",
        value: function () {
            this.newValue = this.getEmptyValue(), this.inputRef.current.value = this.getEmptyValue(), this.submitChanges()
        }
    }, {
        key: "getEmptyValue",
        value: function () {
            return this.props.emptyValue ? this.props.emptyValue : ""
        }
    }, {
        key: "submitChanges",
        value: function () {
            var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            !e && this.newValue !== this.getValue() && this.props.onChangePreview && this.props.onChangePreview(this.newValue), e && this.initialValue !== this.newValue && this.props.onChangeFinal && this.props.onChangeFinal(this.newValue), this.props.onChange && this.props.onChange(this.newValue)
        }
    }, {
        key: "getValue",
        value: function () {
            return Array.isArray(this.props.value) ? "" : this.props.value
        }
    }, {
        key: "componentDidUpdate",
        value: function () {
            var e = this.inputRef.current && this.props.value && this.props.value !== this.inputRef.current.value;
            !this.state.editing && e && (this.inputRef.current.value = this.props.value)
        }
    }, {
        key: "useSuggestion",
        value: function (e) {
            this.setCurrentValue(e), this.submitChanges()
        }
    }, {
        key: "getSuggestions",
        value: function () {
            var e = (this.props.suggestions || []).filter(function (e) {
                return e && e.length > 0
            });
            return _.last(e) === t.SUGGESTIONS_SEPARATOR && e.pop(), e
        }
    }, {
        key: "usingSuggestions",
        value: function () {
            return this.getSuggestions().length > 0
        }
    }, {
        key: "handleFocus",
        value: function (e) {
            this.onEditStart(), e.target.select()
        }
    }, {
        key: "render",
        value: function () {
            var e = this;
            if (this.props.invisible) return null;
            var n, i = void 0,
                s = void 0,
                o = !1;
            n = this.getValue(), Array.isArray(this.props.value) ? (o = !0, i = this.props.value.join(", "), s = d("multiple-values") + ": " + i) : (i = this.props.placeholder, s = this.props.tooltip);
            var a = mercator.designer.uiEvents;
            return React.createElement("div", {
                className: "TextInput preset-" + this.props.type + " " + (this.isReadOnly() ? "disabled" : "") + " " + (this.state.editing && "editing") + " " + (this.props.expanded && "expanded")
            }, this.props.caption && React.createElement("label", {
                className: "caption",
                onMouseUp: function (t) {
                    return e.onEditStartAndSelect(t)
                }
            }, this.props.caption, this.props.infoTooltip && React.createElement("span", {
                className: "icon-info info-tooltip-icon",
                onMouseOut: function () {
                    return a.hideTooltip()
                },
                onMouseOver: function (t) {
                    return a.showTooltip(React.createElement("p", null, e.props.infoTooltip), t, !0)
                }
            })), React.createElement("div", {
                className: "value"
            }, React.createElement("input", {
                type: this.props.type || "text",
                id: this.props.caption,
                defaultValue: n,
                onKeyDown: function (t) {
                    return e.onKeyDown(t)
                },
                onChange: function () {
                    return e.onTextboxChange()
                },
                onFocus: this.handleFocus.bind(this),
                onBlur: function () {
                    return e.onEditEnd()
                },
                placeholder: i,
                autoFocus: this.props.autoFocus,
                title: s,
                disabled: this.isReadOnly(),
                autoComplete: this.usingSuggestions() ? "off" : "",
                tabIndex: this.props.tabIndex,
                ref: this.inputRef
            }), o && !this.isReadOnly() && React.createElement("div", {
                className: "action clear",
                title: d("clear"),
                onClick: function () {
                    return e.onClearValue()
                }
            }, React.createElement("span", {
                className: "icon-close-light"
            })), !this.props.disabled && this.props.locked && React.createElement("div", {
                className: "action edit",
                title: d("edit"),
                onClick: function () {
                    return e.props.onLockClicked && e.props.onLockClicked()
                }
            }, React.createElement("span", {
                className: "icon-locked"
            })), this.props.disabled && this.props.disabledTooltip && this.props.disabledTooltipIcon && React.createElement("div", {
                className: "disabled-tooltip-icon icon-" + this.props.disabledTooltipIcon,
                onMouseOut: function () {
                    return a.hideTooltip()
                },
                onMouseOver: function (t) {
                    return a.showTooltip(React.createElement("p", null, e.props.disabledTooltip), t, !0)
                }
            })), this.usingSuggestions() && this.state.editing && React.createElement("div", {
                className: "suggestions",
                onMouseOver: function () {
                    return e.setState({
                        suggestionsPointer: -1
                    })
                }
            }, this.getSuggestions().map(function (i, s) {
                return i === t.SUGGESTIONS_SEPARATOR ? React.createElement("div", {
                    key: "separator-" + s,
                    className: "separator"
                }) : React.createElement("div", {
                    key: i,
                    className: "item " + (e.state.suggestionsPointer === s && "selected") + " " + (i === n && "checked"),
                    onMouseDown: function () {
                        return e.useSuggestion(i)
                    }
                }, i)
            })))
        }
    }]), t
}();
TextInput.SUGGESTIONS_SEPARATOR = "---";
var _slicedToArray = function () {
    return function (e, t) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return function (e, t) {
            var o = [],
                s = !0,
                i = !1,
                n = void 0;
            try {
                for (var r, l = e[Symbol.iterator](); !(s = (r = l.next()).done) && (o.push(r.value), !t || o.length !== t); s = !0);
            } catch (e) {
                i = !0, n = e
            } finally {
                try {
                    !s && l.return && l.return()
                } finally {
                    if (i) throw n
                }
            }
            return o
        }(e, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }
}(),
    _createClass = function () {
        function e(e, t) {
            for (var o = 0; o < t.length; o++) {
                var s = t[o];
                s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
            }
        }
        return function (t, o, s) {
            return o && e(t.prototype, o), s && e(t, s), t
        }
    }();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var ToolPicker = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var o = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return o.state = {
            softTooltips: !1,
            showGroup: !1,
            hoverTooltip: !1
        }, o.definitions = {
            "mouse-pointer": ["selectCursor", "mouse-pointer", "toolSelectCursor"],
            // "select-brush": ["selectBrush", "select-brush", "toolSelectBrush"],
            // "select-seats": ["selectSeats", "select-seats", "toolSelectSeats"],
            // "select-sameType": ["selectSameType", "select-sameType", "toolSelectSameType"],
            // node: [mercator.Features.Type.NODES, "node", "toolNode"],
            // "row-single": [mercator.Features.Type.ROWS, "row-single", "toolRowSingle"],
            // "row-segmented": [mercator.Features.Type.ROWS, "row-segmented", "toolRowSegmented"],
            // "row-multiple": [mercator.Features.Type.ROWS, "row-multiple", "toolRowMultiple"],
            // "section-polygon": [mercator.Features.Type.SECTIONS, "section-polygon", "toolSection"],
            // "section-rectangle": [mercator.Features.Type.SECTIONS, "section-rectangle", "toolSection"],

            "row-single": [mercator.Features.Type.ROWS, "row-single", "toolRowSingle"],
            // booth: [mercator.Features.Type.BOOTHS, "booth", "toolBooth"],
            "ga-rectangle": [mercator.Features.Type.AREAS, "ga-rectangle", "toolGaRectangle"],
            "ga-ellipse": [mercator.Features.Type.AREAS, "ga-ellipse", "toolGaEllipse"],
            "ga-polygon": [mercator.Features.Type.AREAS, "ga-polygon", "toolGaPolygon"],

            "shape-rectangle": [mercator.Features.Type.SHAPES, "shape-rectangle", "toolShapeRectangle"],
            "shape-ellipse": [mercator.Features.Type.SHAPES, "shape-ellipse", "toolShapeEllipse"],
            "shape-polygon": [mercator.Features.Type.SHAPES, "shape-polygon", "toolShapePolygon"],

            "table-round": [mercator.Features.Type.TABLES, "table-round", "toolTableRound"],
            "table-rectangle": [mercator.Features.Type.TABLES, "table-rectangle", "toolTableRectangle"],

            text: [mercator.Features.Type.TEXTS, "text", "toolText"],
            image: [mercator.Features.Type.IMAGES, "image", "toolImageObject"],
            icon: [mercator.Features.Type.ICONS, "icon", "toolIcon"],
            // focalpoint: [mercator.Features.Type.FOCAL_POINT, "focalpoint", "toolFocalPoint"],
            // hand: [mercator.Features.Type.HAND, "hand", "toolHand"]
        }, o.handleClickOutside = o.handleClickOutside.bind(o), o.onMouseOver = o.onMouseOver.bind(o), o.onMouseOut = o.onMouseOut.bind(o), o
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "shouldComponentUpdate",
        value: function (e, t) {
            return differentObjectValues(this.state, t) || differentObjectValues(this.props, e, ["disableTooltips"]) || differentObjectValues(this.props.designer, e.designer, ["tool", "disabledFeatures", "atMasterSubChart", "lastGroupTool", "toolProperties", "spacebarIsPressed"])
        }
    }]), _createClass(t, [{
        key: "handleClickOutside",
        value: function (e) {
            this.wrapperRef && !this.wrapperRef.contains(e.target) && this.hideGroup()
        }
    }, {
        key: "groupSiblings",
        value: function () {
            return [
                // ["row-single", "row-segmented", "row-multiple"],
                // ["section-polygon", "section-rectangle"],
                // ["ga-rectangle", "ga-ellipse", "ga-polygon"],
                // ["shape-rectangle", "shape-ellipse", "shape-polygon"],
                // ["table-round", "table-rectangle"]
            ]
        }
    }, {
        key: "anyGroupOpen",
        value: function () {
            return this.state.showGroup && void 0 !== this.toolSiblingsList(this.props.designer.tool)
        }
    }, {
        key: "selectTool",
        value: function (e) {
            !(arguments.length > 1 && void 0 !== arguments[1] && arguments[1]) && this.toolsAreSiblings(this.props.designer.tool, e) || this.hideGroup(), this.props.designer.tool !== e && mercator.designer.uiEvents.trigger(this.definitions[e][2]), this.clearOnMouseOverTimeout()
        }
    }, {
        key: "showGroup",
        value: function (e) {
            e && (this.selectTool(e), !this.toolSiblingsList(e)) || this.setState({
                showGroup: !0
            })
        }
    }, {
        key: "hideGroup",
        value: function () {
            this.setState({
                showGroup: !1
            })
        }
    }, {
        key: "getKeyHint",
        value: function (e) {
            var t = Object.keys(TOOLS_HOTKEYS).find(function (t) {
                return TOOLS_HOTKEYS[t].toolName === e || TOOLS_HOTKEYS[t].toolName === e.split("-")[0]
            });
            return " " === t ? d("spacebar") : t
        }
    }, {
        key: "tool",
        value: function (e) {
            var t = this,
                o = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            if (this.definitions[e]) {
                var s = _slicedToArray(this.definitions[e], 3),
                    i = (s[0], s[1]),
                    n = (s[2], this.props.designer.tool === e),
                    r = "icon" === e ? this.props.designer.toolProperties["Icon.icon"] : e;
                return React.createElement(Button, {
                    key: e,
                    preset: "tool",
                    type: r,
                    caption: d("tool-tool", {
                        tool: d(i)
                    }),
                    keyHint: this.getKeyHint(e),
                    selected: n,
                    softTooltip: (o && !this.anyGroupOpen() || !o) && this.state.softTooltips && !this.props.disableTooltips,
                    onMouseOver: this.onMouseOver,
                    onMouseOut: this.onMouseOut,
                    onMouseUp: function () {
                        return !o && t.selectTool(e, !0)
                    },
                    onMouseDown: function () {
                        return o && t.showGroup(e)
                    },
                    onHold: function () {
                        return o && t.showGroup(e)
                    },
                    onDrag: function () {
                        return o && t.showGroup(e)
                    },
                    onDoubleClick: function () {
                        return o && t.showGroup(e)
                    }
                })
            }
        }
    }, {
        key: "toolGroup",
        value: function (e) {
            var t = this.definitions[e] || [],
                o = _slicedToArray(t, 1)[0],
                s = !this.props.designer.disabledFeatures.includes(o);
            return React.createElement("div", {
                className: "toolGroup " + (this.isToolSelected(e) && "selected") + " " + (this.isToolActiveOnSecondPlane(e) && "key-pressed") + " " + (s ? "visible" : "hidden") + " " + (this.state.showGroup && "show-group")
            }, this.tool(e), this.toolSiblingsIndicator(e), this.isToolSelected(e) && this.state.showGroup && this.toolSiblings(e))
        }
    }, {
        key: "isToolSelected",
        value: function (e) {
            return this.props.designer.tool === e
        }
    }, {
        key: "isToolActiveOnSecondPlane",
        value: function (e) {
            return !("hand" !== e || !this.props.designer.spacebarIsPressed)
        }
    }, {
        key: "toolsAreSiblings",
        value: function (e, t) {
            var o = this.toolSiblingsList(e);
            return !!o && o.includes(t)
        }
    }, {
        key: "toolSiblingsList",
        value: function (e) {
            return this.groupSiblings().find(function (t) {
                return t.includes(e)
            })
        }
    }, {
        key: "toolSiblingsIndicator",
        value: function (e) {
            return this.toolSiblingsList(e) ? React.createElement("div", {
                className: "indicator icon-tool-group-indicator"
            }) : null
        }
    },
    {
        key: "toolSiblings",
        value: function (e) {
            var t = this,
                o = this.toolSiblingsList(e);
            return o ? React.createElement("div", {
                className: "tool-siblings"
            }, o.map(function (e) {
                return t.tool(e, !1)
            })) : null
        }
    }
        , {
        key: "componentDidMount",
        value: function () {
            var e = this,
                t = mercator.designer.storage.getItem("v2.timesSeenToolPickerTooltips", 0);
            t < 3 && (setTimeout(function () {
                return e.setState({
                    softTooltips: !0
                })
            }, 400), mercator.designer.storage.setItem("v2.timesSeenToolPickerTooltips", t + 1)), document.addEventListener("mousedown", this.handleClickOutside), document.addEventListener("keydown", this.handleClickOutside)
        }
    }, {
        key: "componentWillUnmount",
        value: function () {
            document.removeEventListener("mousedown", this.handleClickOutside), document.removeEventListener("keydown", this.handleClickOutside)
        }
    }, {
        key: "componentDidUpdate",
        value: function () {
            this.props.designer.atMasterSubChart || this.setState({
                softTooltips: !1
            })
        }
    }, {
        key: "onMouseOver",
        value: function () {
            var e = this;
            this.mouseOver = !0, this.onMouseOverHoverTimeout = setTimeout(function () {
                e.mouseOver && e.setState({
                    hoverTooltip: !0
                })
            }, 600), this.clearOnMouseOutTimeout()
        }
    }, {
        key: "onMouseOut",
        value: function () {
            var e = this;
            this.mouseOver = !1, this.onMouseOutHoverTimeout = setTimeout(function () {
                e.mouseOver || e.setState({
                    hoverTooltip: !1,
                    softTooltips: !1
                })
            }, 300), this.clearOnMouseOverTimeout()
        }
    }, {
        key: "clearOnMouseOverTimeout",
        value: function () {
            this.onMouseOverHoverTimeout && (clearTimeout(this.onMouseOverHoverTimeout), this.onMouseOverHoverTimeout = null)
        }
    }, {
        key: "clearOnMouseOutTimeout",
        value: function () {
            this.onMouseOutHoverTimeout && (clearTimeout(this.onMouseOutHoverTimeout), this.onMouseOutHoverTimeout = null)
        }
    }, {
        key: "render",
        value: function () {
            var e = this;
            return React.createElement("div", {
                className: "ToolPicker " + (this.anyGroupOpen() && "open-group") + " " + (this.state.hoverTooltip && "show-hover-tooltip"),
                ref: function (t) {
                    return e.wrapperRef = t
                }
            }, this.toolGroup("mouse-pointer"),
                this.toolGroup("select-brush"),
                this.toolGroup("select-seats"),
                this.toolGroup("select-sameType"),
                this.toolGroup("node"),
                React.createElement("div", {
                    className: "separator"
                }),
                // this.toolGroup("focalpoint"), 
                console.log(this.props.designer.lastGroupTool.row),

                this.toolGroup("row-" + this.props.designer.lastGroupTool.row),
                this.toolGroup("section-" + this.props.designer.lastGroupTool.section),
                this.toolGroup("table-" + this.props.designer.lastGroupTool.table),
                // this.toolGroup("booth"),
                this.toolGroup("ga-" + this.props.designer.lastGroupTool.ga),
                this.toolGroup("shape-" + this.props.designer.lastGroupTool.shape),
                this.toolGroup("text"),
                this.toolGroup("image"),
                this.toolGroup("icon"),
                React.createElement("div", {
                    className: "flex-spacer"
                }),
                this.toolGroup("hand"))
        }
    }]), t
}();

function ToolbarTooltip(e) {
    return e.children ? React.createElement("div", {
        className: "ToolbarTooltip",
        style: e.style
    }, e.children) : React.createElement("span", null)
}
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }
    return function (t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var UnlockableInspectorInput = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return n.state = {
            unlocked: e.showContents
        }, n
    }
    return _inherits(t, React.PureComponent), _createClass(t, [{
        key: "render",
        value: function () {
            var e = this,
                t = this.props,
                n = t.caption,
                o = t.infoTooltip,
                r = t.showContents,
                c = t.invisible,
                a = t.children,
                i = this.state.unlocked,
                s = mercator.designer.uiEvents;
            return c ? null : r || i ? a : React.createElement("div", {
                className: "TextInput UnlockableInspectorInput"
            }, React.createElement("label", {
                className: "caption",
                onMouseUp: function (t) {
                    return e.onEditStartAndSelect(t)
                }
            }, n, o && React.createElement("span", {
                className: "icon-info info-tooltip-icon",
                onMouseOut: function () {
                    return s.hideTooltip()
                },
                onMouseOver: function (e) {
                    return s.showTooltip(React.createElement("p", null, o), e, !0)
                }
            })), React.createElement("div", {
                className: "value"
            }, React.createElement(Button, {
                preset: "hud-icon",
                type: "edit",
                caption: d("set"),
                onClick: function () {
                    return e.setState({
                        unlocked: !0
                    })
                }
            })))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Inspector.InspectorSheet = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "shouldComponentUpdate",
        value: function (e) {
            return differentObjectValues(this.props, e, ["disabled", "data", "highlightFx", "designer"])
        }
    }, {
        key: "renderContents",
        value: function () {
            return null
        }
    }, {
        key: "renderClassName",
        value: function () {
            return "InspectorSheet " + (this.props.highlightFx && "highlight-fx")
        }
    }, {
        key: "render",
        value: function () {
            var e = this.renderContents();
            return e ? React.createElement("div", {
                className: this.renderClassName(),
                ref: this.props.childRef
            }, e) : null
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var o = 0; o < t.length; o++) {
            var a = t[o];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
        }
    }
    return function (t, o, a) {
        return o && e(t.prototype, o), a && e(t, a), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Dialogs.FloatingDialogs.BoothDetails = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Dialogs.FloatingDialog), _createClass(t, [{
        key: "title",
        value: function () {
            return d("booths")
        }
    }, {
        key: "getDataSource",
        value: function () {
            return this.props.document[this.props.designer.atMasterSubChart ? "globalStats" : "subChartStats"] || {}
        }
    }, {
        key: "getTotalBooths",
        value: function () {
            return this.getDataSource().totalBooths
        }
    }, {
        key: "getBoothsByCategory",
        value: function () {
            return this.getDataSource().boothsByCategory
        }
    }, {
        key: "getRenderByCategory",
        value: function () {
            var e = this,
                t = this.getBoothsByCategory();
            return React.createElement("div", {
                className: "list",
                key: "list-category"
            }, Object.keys(t).map(function (o) {
                o = detectCategoryKeyType(o);
                var a = e.props.document.categories.findOne(function (e) {
                    return e.key === o
                }) || {
                    label: d("uncategorized")
                },
                    n = t[o];
                if (n > 0) return React.createElement("div", {
                    className: "item",
                    key: o
                }, React.createElement("div", {
                    className: "caption"
                }, React.createElement("div", {
                    className: "color",
                    style: {
                        backgroundColor: a.color
                    }
                }, a.accessible && React.createElement("div", {
                    className: "icon-accessible-new"
                })), React.createElement("span", {
                    className: "categoryLabel",
                    title: d("category")
                }, a.label)), React.createElement("div", {
                    className: "rightValue"
                }, n.toLocaleString({
                    useGrouping: !0
                }), React.createElement("span", {
                    className: "unit"
                }, " ", dl("booths", {
                    smart_count: n
                }))))
            }))
        }
    }, {
        key: "contents",
        value: function () {
            var e = this.getTotalBooths(),
                t = this.getTotalBooths().toLocaleString({
                    useGrouping: !0
                });
            return e > 0 ? React.createElement(React.Fragment, null, React.createElement("div", {
                className: "tip dragHandle",
                onMouseDown: this.onMouseDown.bind(this)
            }, d("chart-booths-description", {
                count: t,
                booths: dl("booths", {
                    smart_count: e
                })
            })), this.getRenderByCategory()) : React.createElement("div", {
                className: "tip dragHandle",
                onMouseDown: this.onMouseDown.bind(this)
            }, d("chart-no-booths"))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var c = t[a];
            c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(e, c.key, c)
        }
    }
    return function (t, a, c) {
        return a && e(t.prototype, a), c && e(t, c), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Dialogs.FloatingDialogs.CapacityDetails = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Dialogs.FloatingDialog), _createClass(t, [{
        key: "title",
        value: function () {
            return d("chart-capacity")
        }
    }, {
        key: "getDataSource",
        value: function () {
            return this.props.document[this.props.designer.atMasterSubChart ? "globalStats" : "subChartStats"] || {}
        }
    }, {
        key: "getTotalCapacity",
        value: function () {
            return this.getDataSource().totalPeopleCapacity
        }
    }, {
        key: "getCapacityByObjectType",
        value: function () {
            return this.getDataSource().capacityByObjectType
        }
    }, {
        key: "getCapacityByCategory",
        value: function () {
            return this.getDataSource().capacityByCategory
        }
    }, {
        key: "getRenderByObjectType",
        value: function () {
            var e = this.getCapacityByObjectType();
            return React.createElement("div", {
                className: "list",
                key: "list-type"
            }, Object.keys(e).map(function (t) {
                var a = e[t];
                if (a > 0) return React.createElement("div", {
                    className: "item",
                    key: t
                }, React.createElement("div", {
                    className: "caption"
                }, React.createElement("span", {
                    className: "icon icon-" + t,
                    title: d("object-type")
                }), React.createElement("span", {
                    className: "objectType",
                    title: d("object-type")
                }, d(t))), React.createElement("div", {
                    className: "rightValue"
                }, a.toLocaleString({
                    useGrouping: !0
                }), React.createElement("span", {
                    className: "unit"
                }, " ", dl("places", {
                    smart_count: a
                }))))
            }))
        }
    }, {
        key: "getRenderByCategory",
        value: function () {
            var e = this,
                t = this.getCapacityByCategory();
            return React.createElement("div", {
                className: "list",
                key: "list-category"
            }, Object.keys(t).map(function (a) {
                a = detectCategoryKeyType(a);
                var c = e.props.document.categories.findOne(function (e) {
                    return e.key === a
                }) || {
                    label: d("uncategorized")
                },
                    n = t[a];
                if (n > 0) return React.createElement("div", {
                    className: "item",
                    key: a
                }, React.createElement("div", {
                    className: "caption"
                }, React.createElement("div", {
                    className: "color",
                    style: {
                        backgroundColor: c.color
                    }
                }, c.accessible && React.createElement("div", {
                    className: "icon-accessible-new"
                })), React.createElement("span", {
                    className: "categoryLabel",
                    title: d("category")
                }, c.label)), React.createElement("div", {
                    className: "rightValue"
                }, n.toLocaleString({
                    useGrouping: !0
                }), React.createElement("span", {
                    className: "unit"
                }, " ", dl("places", {
                    smart_count: n
                }))))
            }))
        }
    }, {
        key: "contents",
        value: function () {
            var e = this.getTotalCapacity(),
                t = this.getTotalCapacity().toLocaleString({
                    useGrouping: !0
                });
            return e > 0 ? [React.createElement("div", {
                key: "handle-0",
                className: "tip dragHandle",
                onMouseDown: this.onMouseDown.bind(this)
            }, d("container-has-objects-count", {
                container: dl(this.props.designer.atMasterSubChart ? "chart" : "section"),
                count: t,
                object: d("places", {
                    smart_count: e
                })
            })), React.createElement("div", {
                key: "handle-1",
                className: "sub-title"
            }, d("capacity-by-type", {
                type: dl("object-type")
            })), this.getRenderByObjectType(), React.createElement("div", {
                key: "handle-2",
                className: "sub-title"
            }, d("capacity-by-type", {
                type: dl("category")
            })), this.getRenderByCategory()] : React.createElement("div", {
                className: "tip dragHandle",
                onMouseDown: this.onMouseDown.bind(this)
            }, d("container-no-capacity", {
                container: dl(this.props.designer.atMasterSubChart ? "chart" : "section")
            }))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var n = t[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    return function (t, a, n) {
        return a && e(t.prototype, a), n && e(t, n), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Dialogs.FloatingDialogs.CategoriesInfo = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var a = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return a.state = {
            activeTab: a.isEditingDisabled() ? "keys" : "categories"
        }, a
    }
    return _inherits(t, Dialogs.FloatingDialog), _createClass(t, [{
        key: "title",
        value: function () {
            return d("categories")
        }
    }, {
        key: "className",
        value: function () {
            return "CategoriesInfo"
        }
    }, {
        key: "isEditingEnabled",
        value: function () {
            return mercator.designer.features.isEnabled(mercator.Features.Type.CATEGORY_LIST)
        }
    }, {
        key: "isEditingDisabled",
        value: function () {
            return mercator.designer.features.isReadOnly(mercator.Features.Type.CATEGORY_LIST) || this.isApplyingDisabled()
        }
    }, {
        key: "isApplyingDisabled",
        value: function () {
            return mercator.designer.features.isDisabled(mercator.Features.Type.CATEGORY_LIST)
        }
    }, {
        key: "getCategoriesDetails",
        value: function () {
            var e = this;
            return "keys" === this.state.activeTab ? React.createElement("div", {
                className: "list",
                key: "list-categories"
            }, this.props.document.categories.map(function (t) {
                return React.createElement("div", {
                    className: "item",
                    key: t.key
                }, React.createElement("div", {
                    className: "caption"
                }, React.createElement("div", {
                    className: "color",
                    style: {
                        backgroundColor: t.color
                    }
                }, t.accessible && React.createElement("div", {
                    className: "icon-accessible-new"
                })), React.createElement("span", {
                    className: "categoryLabel",
                    title: d("category")
                }, t.label)), React.createElement("div", {
                    className: "rightValue horizontal-flex"
                }, e.state.editingKey === t.key ? React.createElement("span", {
                    className: "horizontal-flex"
                }, React.createElement(TextInput, {
                    value: t.key,
                    onChangeFinal: function (a) {
                        return e.commitKeyEdit(t.key, a)
                    },
                    autoFocus: !0,
                    onEditEnd: e.endKeyEdit.bind(e),
                    escCancelsEdit: !0
                }), React.createElement("span", {
                    className: "action icon icon-check"
                })) : React.createElement(React.Fragment, null, React.createElement("span", {
                    className: "fixed-width multiline"
                }, React.createElement("span", {
                    className: "unit"
                }, d("key")), " ", React.createElement("span", {
                    className: "selectable"
                }, "string" == typeof t.key ? React.createElement(React.Fragment, null, React.createElement("span", {
                    className: "soft"
                }, '"'), t.key, React.createElement("span", {
                    className: "soft"
                }, '"')) : t.key)), e.isEditingEnabled() && React.createElement("span", {
                    className: "action icon icon-edit",
                    onClick: function () {
                        return e.beginKeyEdit(t.key)
                    }
                }))))
            })) : React.createElement(React.Fragment, null, React.createElement(CategoryPicker, {
                categories: this.props.document.categories,
                disabled: this.isApplyingDisabled(),
                editingDisabled: this.isEditingDisabled(),
                onReorderItem: function (e, t) {
                    return mercator.designer.uiEvents.reorderCategory(e, t)
                }
            }))
        }
    }, {
        key: "componentDidUpdate",
        value: function () {
            this.pendingKeyEdit && this.props.designer.ignoredLabelEditingWarnings.includes("categoryKey") && (this.setState({
                editingKey: this.pendingKeyEdit
            }), this.pendingKeyEdit = null)
        }
    }, {
        key: "beginKeyEdit",
        value: function (e) {
            this.props.designer.chartHasEvents && !this.props.designer.ignoredLabelEditingWarnings.includes("categoryKey") ? (this.pendingKeyEdit = e, mercator.designer.uiEvents.showCategoryKeyEditWarning()) : this.setState({
                editingKey: e
            })
        }
    }, {
        key: "commitKeyEdit",
        value: function (e, t) {
            t = detectCategoryKeyType(t), mercator.designer.uiEvents.changeCategoryKey(e, t) || alert(d("category-key-already-exists", {
                key: "string" == typeof t ? '"' + t + '"' : t
            })), this.endKeyEdit()
        }
    }, {
        key: "endKeyEdit",
        value: function () {
            this.setState({
                editingKey: null
            })
        }
    }, {
        key: "contents",
        value: function () {
            var e = this;
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "tip dragHandle",
                onMouseDown: this.onMouseDown.bind(this)
            }, d("categories-info-description-1")), !this.isEditingDisabled() && React.createElement(TabSwitcher, {
                value: this.state.activeTab,
                options: [{
                    label: d("categories"),
                    value: "categories"
                }, {
                    label: d("keys"),
                    value: "keys"
                }],
                onChange: function (t) {
                    return e.setState({
                        activeTab: t
                    })
                }
            }), this.getCategoriesDetails())
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var n = t[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    return function (t, a, n) {
        return a && e(t.prototype, a), n && e(t, n), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Dialogs.FloatingDialogs.DuplicateObjects = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Dialogs.FloatingDialog), _createClass(t, [{
        key: "title",
        value: function () {
            return d("duplicate-objects")
        }
    }, {
        key: "objectTitle",
        value: function (e) {
            return d("object-label", {
                object: d(e)
            })
        }
    }, {
        key: "getDuplicateObjects",
        value: function () {
            return this.props.document[this.props.designer.atMasterSubChart ? "globalStats" : "subChartStats"].duplicateObjects || {}
        }
    }, {
        key: "getBreakdown",
        value: function (e, t, a, n, c, s) {
            var l = void 0 !== s && React.createElement("span", {
                className: "floorLevel",
                title: d("floor")
            }, s + 1);
            switch (e) {
                case t + "-" + a + "-" + c:
                    return React.createElement("span", null, l, React.createElement("span", {
                        className: "sectionLabel",
                        title: this.objectTitle("section")
                    }, t), "-", React.createElement("span", {
                        className: "parentLabel",
                        title: this.objectTitle(n)
                    }, a), "-", React.createElement("span", {
                        className: "seatLabel",
                        title: this.objectTitle("seat")
                    }, c));
                case a + "-" + c:
                    return React.createElement("span", {
                        key: e
                    }, l, React.createElement("span", {
                        className: "parentLabel",
                        title: this.objectTitle(n)
                    }, a), "-", React.createElement("span", {
                        className: "seatLabel",
                        title: this.objectTitle("seat")
                    }, c));
                case t + "-" + c:
                    return React.createElement("span", {
                        key: e
                    }, l, React.createElement("span", {
                        className: "sectionLabel",
                        title: this.objectTitle("section")
                    }, t), "-", React.createElement("span", {
                        className: "seatLabel",
                        title: this.objectTitle("object")
                    }, c));
                default:
                    return React.createElement(React.Fragment, null, l, React.createElement("span", {
                        key: e,
                        title: this.objectTitle("object")
                    }, e))
            }
        }
    }, {
        key: "onWarningMouseOver",
        value: function (e, t, a, n) {
            mercator.designer.uiEvents.showTooltip([React.createElement("h2", {
                key: "title"
            }, d("duplicate-objects-sections")), React.createElement("p", {
                key: "paragraph",
                dangerouslySetInnerHTML: {
                    __html: d(a.length > 0 ? "num-sections-duplicate-object" : "num-unlabeled-sections-duplicate-object", {
                        numSections: t,
                        sectionLabel: a,
                        objectLabel: n
                    })
                }
            })], e)
        }
    }, {
        key: "onWarningMouseOut",
        value: function () {
            mercator.designer.uiEvents.hideTooltip()
        }
    }, {
        key: "getDuplicates",
        value: function () {
            var e = this,
                t = mercator.designer.uiEvents;
            return React.createElement("div", {
                className: "list",
                key: "list-duplicates"
            }, this.getDuplicateObjects().map(function (a) {
                var n = a.total,
                    c = a.floor,
                    s = a.fullLabel,
                    l = a.sectionLabel,
                    o = a.parentLabel,
                    i = a.parentType,
                    r = a.objectLabel,
                    u = a.parentUuid,
                    p = u.join(",") + "-" + s;
                if (u.length > 1) return u.map(function (a, n) {
                    var b = e.props.designer.sectionUuid === a;
                    return React.createElement("div", {
                        className: "item " + (n > 0 ? "soft-group" : null),
                        key: p + "-" + n
                    }, React.createElement("div", {
                        className: "leftValue"
                    }, 0 === n && React.createElement("div", {
                        className: "warning",
                        onMouseOut: function () {
                            return e.onWarningMouseOut()
                        },
                        onMouseOver: function (t) {
                            return e.onWarningMouseOver(t, u.length, l, o + "-" + r)
                        }
                    }, "⚠️")), React.createElement("div", {
                        className: "caption"
                    }, e.getBreakdown(s, l, o, i, r, c)), React.createElement(Button, {
                        preset: "icon-soft",
                        type: "loupe",
                        selected: b,
                        onClick: function () {
                            return t.goToSectionAndEditLabels(b ? null : a)
                        }
                    }))
                });
                var b = u[0],
                    d = e.props.designer.sectionUuid === b;
                return React.createElement("div", {
                    className: "item",
                    key: p
                }, React.createElement("div", {
                    className: "leftValue",
                    title: n + ' x "' + s + '"'
                }, n, " ×"), React.createElement("div", {
                    className: "caption"
                }, e.getBreakdown(s, l, o, i, r, c)), l && React.createElement(Button, {
                    preset: "icon-soft",
                    type: "loupe",
                    selected: d,
                    onClick: function () {
                        return t.goToSectionAndEditLabels(d ? null : b)
                    }
                }))
            }))
        }
    }, {
        key: "contents",
        value: function () {
            return this.getDuplicateObjects().length > 0 ? [React.createElement("div", {
                key: "handle-0",
                className: "tip dragHandle",
                onMouseDown: this.onMouseDown.bind(this)
            }, d("chart-duplicate-objects")), React.createElement("div", {
                key: "handle-1",
                className: "tip dragHandle",
                onMouseDown: this.onMouseDown.bind(this)
            }, d("chart-duplicate-objects-description")), this.getDuplicates()] : React.createElement("div", {
                className: "tip dragHandle",
                onMouseDown: this.onMouseDown.bind(this)
            }, d("chart-no-duplicate-objects"))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var n = t[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    return function (t, a, n) {
        return a && e(t.prototype, a), n && e(t, n), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Dialogs.FloatingDialogs.ImageObjects = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Dialogs.FloatingDialog), _createClass(t, [{
        key: "title",
        value: function () {
            return d("images")
        }
    }, {
        key: "getDataSource",
        value: function () {
            return this.props.document[this.props.designer.atMasterSubChart ? "globalStats" : "subChartStats"] || {}
        }
    }, {
        key: "getSizeByImage",
        value: function () {
            return this.getDataSource().fileSizeByImage
        }
    }, {
        key: "getImagesTotalSize",
        value: function () {
            return this.getDataSource().imagesTotalSize
        }
    }, {
        key: "getRender",
        value: function () {
            var e = this.getSizeByImage();
            return React.createElement("div", {
                className: "list",
                key: "list-render"
            }, Object.keys(e).map(function (t) {
                var a = Math.round(e[t] / 1024);
                if (a > 0) return React.createElement("div", {
                    className: "item tight-separation",
                    key: t
                }, React.createElement("div", {
                    className: "caption"
                }, React.createElement("div", {
                    className: "image",
                    style: {
                        backgroundImage: "url('" + t + "')"
                    }
                })), React.createElement("div", {
                    className: "rightValue"
                }, a.toLocaleString({
                    useGrouping: !0
                }), React.createElement("span", {
                    className: "unit"
                }, " KB")))
            }))
        }
    }, {
        key: "contents",
        value: function () {
            var e = Object.keys(this.getSizeByImage()).length,
                t = Math.round(this.getImagesTotalSize() / 1024),
                a = t.toLocaleString({
                    useGrouping: !0
                }),
                n = (mercator.ImageObject.WARN_TOTAL_FILESIZE_BYTES / 1024).toLocaleString({
                    useGrouping: !0
                });
            return t > 0 ? [React.createElement("div", {
                key: "handle-0",
                className: "tip dragHandle",
                onMouseDown: this.onMouseDown.bind(this)
            }, d("chart-images-description", {
                count: e,
                filesize: a
            })), React.createElement("div", {
                key: "handle-1",
                className: "tip dragHandle",
                onMouseDown: this.onMouseDown.bind(this)
            }, d("chart-images-tip", {
                filesize: n
            })), this.getRender()] : React.createElement("div", {
                className: "tip dragHandle",
                onMouseDown: this.onMouseDown.bind(this)
            }, d("chart-no-images"))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var o = t[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }
    return function (t, r, o) {
        return r && e(t.prototype, r), o && e(t, o), t
    }
}(),
    _get = function e(t, r, o) {
        null === t && (t = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(t, r);
        if (void 0 === n) {
            var i = Object.getPrototypeOf(t);
            return null === i ? void 0 : e(i, r, o)
        }
        if ("value" in n) return n.value;
        var c = n.get;
        return void 0 !== c ? c.call(o) : void 0
    };

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Dialogs.FloatingDialogs.Preview = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var r = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return r.rerenderPreview = _.debounce(r.rerenderPreview, 750), r
    }
    return _inherits(t, Dialogs.FloatingDialog), _createClass(t, [{
        key: "title",
        value: function () {
            return d("preview")
        }
    }, {
        key: "className",
        value: function () {
            return "Preview " + this.props.document.colorScheme
        }
    }, {
        key: "componentDidMount",
        value: function () {
            _get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "componentDidMount", this).call(this), this.renderPreview()
        }
    }, {
        key: "componentDidUpdate",
        value: function (e) {
            _get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "componentDidUpdate", this).call(this), _.isEqual(e.document.chartJsonForPreview, this.props.document.chartJsonForPreview) || this.rerenderPreview()
        }
    }, {
        key: "rerenderPreview",
        value: function () {
            this.deletePrevChart(), this.prevChart = this.chart, this.renderPreview()
        }
    }, {
        key: "deletePrevChart",
        value: function () {
            this.prevChart && (this.prevChart.destroy(), this.prevChart = null)
        }
    }, {
        key: "renderPreview",
        value: function () {
            this.chart = new mercatorNoConflict.SeatingChart({
                divId: "chartPreview",
                workspaceKey: this.props.document.workspaceKey,
                chart: this.props.document.chartKey,
                mode: "static",
                onChartRendered: this.deletePrevChart.bind(this),
                chartJsonForPreview: this.props.document.chartJsonForPreview,
                fitTo: "widthAndHeight",
                colorScheme: this.props.document.colorScheme || "light"
            }).render()
        }
    }, {
        key: "componentWillUnmount",
        value: function () {
            _get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "componentWillUnmount", this).call(this), this.deletePrevChart(), this.chart.destroy()
        }
    }, {
        key: "contents",
        value: function () {
            return React.createElement("div", {
                id: "chartPreview"
            })
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var n = t[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    return function (t, a, n) {
        return a && e(t.prototype, a), n && e(t, n), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Dialogs.FloatingDialogs.TypesByCategory = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Dialogs.FloatingDialog), _createClass(t, [{
        key: "title",
        value: function () {
            return d("object-types-per-category")
        }
    }, {
        key: "getStats",
        value: function () {
            return this.props.document.globalStats
        }
    }, {
        key: "getTypesByCategory",
        value: function () {
            return this.getStats().objectTypesByCategory || {}
        }
    }, {
        key: "getTotalCategoriesWithMultipleObjectTypes",
        value: function () {
            return this.getStats().totalCategoriesWithMultipleObjectTypes || 0
        }
    }, {
        key: "getCategoriesDetails",
        value: function () {
            var e = this.getTypesByCategory();
            return React.createElement("div", {
                className: "list"
            }, this.props.document.categories.map(function (t) {
                var a = e[t.key] || [],
                    n = d("key") + ": " + t.key;
                return React.createElement("div", {
                    className: "item",
                    key: t.key
                }, React.createElement("div", {
                    className: "caption"
                }, React.createElement("div", {
                    className: "color",
                    style: {
                        backgroundColor: t.color
                    }
                }, t.accessible && React.createElement("div", {
                    className: "icon-accessible-new"
                })), React.createElement("span", {
                    className: "categoryLabel",
                    title: n
                }, t.label)), React.createElement("div", {
                    className: "rightValue"
                }, a.length >= 1 ? React.createElement("div", {
                    className: "icons " + (a.length > 1 ? "error" : "")
                }, a.map(function (e) {
                    return React.createElement("span", {
                        key: e,
                        className: "icon icon-" + e,
                        title: d(e)
                    })
                })) : React.createElement("div", {
                    className: "soft"
                }, d("unused"))))
            }))
        }
    }, {
        key: "contents",
        value: function () {
            var e = this.getTotalCategoriesWithMultipleObjectTypes();
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "tip dragHandle",
                onMouseDown: this.onMouseDown.bind(this)
            }, d(e > 0 ? "object-types-per-category-invalid" : "object-types-per-category-valid")), this.getCategoriesDetails())
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }
    return function (t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Dialogs.FloatingDialogs.UncategorizedObjects = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Dialogs.FloatingDialog), _createClass(t, [{
        key: "title",
        value: function () {
            return d("uncategorized-objects")
        }
    }, {
        key: "getUncategorizedObjects",
        value: function () {
            return this.props.document[this.props.designer.atMasterSubChart ? "globalStats" : "subChartStats"].uncategorizedObjects || {}
        }
    }, {
        key: "getUncategorizedObjectCount",
        value: function () {
            return this.getUncategorizedObjects().count
        }
    }, {
        key: "getUncategorizedObjectsDetails",
        value: function () {
            return this.getUncategorizedObjects().details
        }
    }, {
        key: "getUncategorized",
        value: function () {
            var e = this,
                t = mercator.designer.uiEvents;
            return React.createElement("div", {
                className: "list",
                key: "list-uncategorized"
            }, this.getUncategorizedObjectsDetails().map(function (n) {
                var o = n.uuid,
                    a = n.floor,
                    c = n.type,
                    r = n.label,
                    i = n.count;
                "?" === r && (r = "");
                var s = "section" !== c && e.props.selection.uuid.includes(o);
                return React.createElement("div", {
                    className: "item",
                    key: n.uuid
                }, React.createElement("div", {
                    className: "caption"
                }, React.createElement("span", {
                    className: "icon icon-" + c,
                    title: d(c)
                }), void 0 !== a && React.createElement("span", {
                    className: "floorLevel",
                    title: d("floor")
                }, a + 1), React.createElement("span", {
                    className: "objectLabel " + (!r && "unlabeled"),
                    title: d("label")
                }, r || d("unlabeled-object", {
                    object: dl(c)
                }))), (i > 1 || i >= 1 && "section" === c) && React.createElement("div", {
                    className: "rightValue"
                }, i, React.createElement("span", {
                    className: "unit"
                }, " ", dl("table" === c || "row" === c ? "seats" : "objects", {
                    smart_count: i
                }))), React.createElement(Button, {
                    preset: "icon-soft",
                    type: "loupe",
                    selected: s,
                    onClick: function () {
                        return "section" === c ? t.enterSectionByUuid(s ? null : o) : t.selectObjectByUuid(s ? null : o)
                    }
                }))
            }))
        }
    }, {
        key: "contents",
        value: function () {
            var e = this.getUncategorizedObjectCount(),
                t = this.props.designer.atMasterSubChart ? dl("chart") : dl("section");
            return e > 0 ? [React.createElement("div", {
                key: "handle-0",
                className: "tip dragHandle",
                onMouseDown: this.onMouseDown.bind(this)
            }, d("container-has-objects-count", {
                container: t,
                count: e,
                object: dl("uncategorized-objects", {
                    smart_count: e
                })
            })), React.createElement("div", {
                key: "handle-1",
                className: "tip dragHandle",
                onMouseDown: this.onMouseDown.bind(this)
            }, d("uncategorized-objects-description")), this.getUncategorized()] : React.createElement("div", {
                className: "tip dragHandle",
                onMouseDown: this.onMouseDown.bind(this)
            }, d("container-no-uncategorized-objects", {
                container: t
            }))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
        }
    }
    return function (t, n, a) {
        return n && e(t.prototype, n), a && e(t, a), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Dialogs.FloatingDialogs.UnlabeledObjects = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Dialogs.FloatingDialog), _createClass(t, [{
        key: "title",
        value: function () {
            return d("unlabeled-objects")
        }
    }, {
        key: "getUnlabeledObjects",
        value: function () {
            return (this.props.designer.atMasterSubChart ? this.props.document.globalStats.unlabeledObjects : this.props.document.subChartStats.unlabeledObjects) || {}
        }
    }, {
        key: "getUnlabeledObjectsCount",
        value: function () {
            return this.getUnlabeledObjects().count
        }
    }, {
        key: "getUnlabeledObjectsDetails",
        value: function () {
            return this.getUnlabeledObjects().details
        }
    }, {
        key: "getBreakdown",
        value: function (e, t, n) {
            var a = void 0 !== n && React.createElement("span", {
                className: "floorLevel",
                title: d("floor")
            }, n + 1);
            return "section" === t ? React.createElement(React.Fragment, null, a, React.createElement("span", {
                className: "sectionLabel",
                title: d("object-label", {
                    object: d("section")
                })
            }, e)) : React.createElement(React.Fragment, null, a, React.createElement("span", {
                className: "objectLabel",
                title: d("object-label", {
                    object: d(t)
                })
            }, e))
        }
    }, {
        key: "getUnlabeled",
        value: function () {
            var e = this,
                t = mercator.designer.uiEvents;
            return React.createElement("div", {
                className: "list",
                key: "list-unlabeled"
            }, this.getUnlabeledObjectsDetails().map(function (n) {
                var a = n.uuid,
                    l = n.floor,
                    o = n.type,
                    c = n.label,
                    s = n.count,
                    r = n.isUnlabeled;
                "?" === c && (c = "");
                var i = "section" === o && s > 0;
                if (s > 0 || r) {
                    var u = !i && e.props.selection.uuid.includes(a);
                    return React.createElement("div", {
                        className: "item",
                        key: a
                    }, React.createElement("div", {
                        className: "caption"
                    }, React.createElement("span", {
                        className: "icon icon-" + o,
                        title: d(o)
                    }), r || "" === c ? React.createElement("span", {
                        className: "objectLabel unlabeled",
                        title: d("object-label", {
                            object: d(o)
                        })
                    }, d("unlabeled-object", {
                        object: dl(o)
                    })) : e.getBreakdown(c, o, l)), s > 0 && React.createElement("div", {
                        className: "rightValue"
                    }, s, React.createElement("span", {
                        className: "unit"
                    }, " ", dl("table" === o || "row" === o ? "seats" : "objects", {
                        smart_count: s
                    }))), React.createElement(Button, {
                        preset: "icon-soft",
                        type: "loupe",
                        selected: u,
                        onClick: function () {
                            return i ? t.enterSectionByUuid(u ? null : a) : t.selectObjectForLabelingByUuid(u ? null : a)
                        }
                    }))
                }
                return null
            }))
        }
    }, {
        key: "contents",
        value: function () {
            var e = this.getUnlabeledObjectsCount(),
                t = this.props.designer.atMasterSubChart ? dl("chart") : dl("section");
            return e > 0 ? [React.createElement("div", {
                key: "handle-0",
                className: "tip dragHandle",
                onMouseDown: this.onMouseDown.bind(this)
            }, d("container-has-objects-count", {
                container: t,
                count: e,
                object: dl("unlabeled-objects", {
                    smart_count: e
                })
            })), React.createElement("div", {
                key: "handle-1",
                className: "tip dragHandle",
                onMouseDown: this.onMouseDown.bind(this)
            }, d("unlabeled-objects-description")), this.getUnlabeled()] : React.createElement("div", {
                className: "tip dragHandle",
                onMouseDown: this.onMouseDown.bind(this)
            }, d("container-no-unlabeled-objects", {
                container: t
            }))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
        }
    }
    return function (t, n, a) {
        return n && e(t.prototype, n), a && e(t, a), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Dialogs.ModalDialogs.CategoryKeyEditWarning = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Dialogs.ModalDialog), _createClass(t, [{
        key: "renderDialogActions",
        value: function (e) {
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "action soft",
                onClick: function () {
                    return e.closeModalDialog()
                }
            }, d("cancel")), React.createElement("div", {
                className: "action danger",
                onClick: function () {
                    e.ignoreLabelEditWarning("categoryKey"), e.closeModalDialog()
                }
            }, d("edit")))
        }
    }, {
        key: "renderDialogContents",
        value: function () {
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "dialog-title"
            }, d("category-edit-warning-title")), React.createElement("div", {
                className: "dialog-icon icon-warning danger"
            }), React.createElement("div", {
                className: "dialog-text"
            }, React.createElement("p", null, d("category-edit-warning-description"))))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var o = t[a];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }
    return function (t, a, o) {
        return a && e(t.prototype, a), o && e(t, o), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Dialogs.ModalDialogs.ExitDialog = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Dialogs.ModalDialog), _createClass(t, [{
        key: "renderDialogActions",
        value: function (e) {
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "action soft",
                onClick: function () {
                    return e.closeModalDialog()
                }
            }, d("cancel")), React.createElement("div", {
                className: "action select",
                onClick: function () {
                    return e.closeApp()
                }
            }, d("exit")))
        }
    }, {
        key: "renderDialogContents",
        value: function () {
            var e = this,
                t = {
                    totalDuplicateObjects: this.props.globalStats.totalDuplicateObjects,
                    totalUnlabeledObjects: this.props.globalStats.totalUnlabeledObjects,
                    totalUncategorized: this.props.globalStats.totalUncategorized,
                    missingFocalPoint: this.props.globalStats.missingFocalPoint,
                    hasUnusedFloors: this.props.globalStats.hasUnusedFloors,
                    hasNoObjects: this.props.globalStats.hasNoObjects,
                    hasMultipleFloors: this.props.hasMultipleFloors,
                    maxCapacityExceeded: this.props.globalStats.maxCapacityExceeded
                },
                a = Object.keys(t).some(function (t) {
                    return e.props.globalStats[t] > 0
                });
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "dialog-title"
            }, d("close-designer-with-errors-question")), React.createElement("div", {
                className: "dialog-icon icon-close danger"
            }), React.createElement("div", {
                className: "dialog-text"
            }, React.createElement("p", null, d("close-designer-with-errors-description"))), a && React.createElement("div", {
                className: "inspector-snippet"
            }, React.createElement("div", {
                className: "content"
            }, Inspector.Sheets.ChartInfo.getChartStats(t, {}, !0))))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var n = t[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    return function (t, a, n) {
        return a && e(t.prototype, a), n && e(t, n), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Dialogs.ModalDialogs.GABookableAsAWholeWarning = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Dialogs.ModalDialog), _createClass(t, [{
        key: "renderDialogActions",
        value: function (e) {
            var t = this.props.uiState.modalDialogProps.variableOccupancy;
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "action soft",
                onClick: function () {
                    return e.closeModalDialog()
                }
            }, d("cancel")), React.createElement("div", {
                className: "action danger",
                onClick: function () {
                    e.setSelectionBookAsAWhole(!0), e.setSelectionVariableOccupancy(t), e.closeModalDialog()
                }
            }, d("ga-bookable-as-a-whole-warning-confirm")))
        }
    }, {
        key: "renderDialogContents",
        value: function () {
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "dialog-title"
            }, d("ga-bookable-as-a-whole-warning-title")), React.createElement("div", {
                className: "dialog-icon icon-warning danger"
            }), React.createElement("div", {
                className: "dialog-text"
            }, React.createElement("p", null, React.createElement("span", null, d("ga-bookable-as-a-whole-warning")))))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Dialogs.ModalDialogs.KeyboardShortcuts = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return n.state = {
            highlightErrors: !1,
            waiting: !1
        }, n
    }
    return _inherits(t, Dialogs.ModalDialog), _createClass(t, [{
        key: "renderToolHotkeys",
        value: function () {
            return Object.keys(TOOLS_HOTKEYS).map(function (e) {
                return React.createElement(KeyboardShortcutDefinition, {
                    key: e,
                    combinations: [e],
                    description: d(TOOLS_HOTKEYS[e].toolName)
                })
            })
        }
    }, {
        key: "renderActionHotkeys",
        value: function () {
            return ACTIONS_HOTKEYS.map(function (e) {
                return React.createElement(KeyboardShortcutDefinition, {
                    key: e.keys,
                    combinations: e.keys,
                    description: d(e.name)
                })
            })
        }
    }, {
        key: "className",
        value: function () {
            return "KeyboardShortcuts " + (!mercator.isMac && "pc-shortcuts")
        }
    }, {
        key: "renderDialogContents",
        value: function () {
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "dialog-title"
            }, d("keyboard-shortcuts")), React.createElement("div", {
                className: "scrollable-list"
            }, React.createElement("div", {
                className: "columns"
            }, React.createElement("div", {
                className: "column"
            }, React.createElement("div", {
                className: "title key-definition-offset"
            }, d("tools")), this.renderToolHotkeys()), React.createElement("div", {
                className: "column"
            }, React.createElement("div", {
                className: "title key-definition-offset"
            }, d("actions")), this.renderActionHotkeys()))))
        }
    }]), t
}();
var KeyboardShortcutDefinition = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, React.PureComponent), _createClass(t, [{
        key: "processKey",
        value: function (e) {
            switch (e = e.toUpperCase()) {
                case "META":
                    return META_KEY;
                case "ALT":
                    return ALT_KEY;
                case "SHIFT":
                    return SHIFT_KEY;
                case "BACKSPACE":
                    return BACKSPACE_KEY;
                case " ":
                    return d("spacebar");
                default:
                    return e.length > 1 ? e.toLowerCase() : e
            }
        }
    }, {
        key: "renderCombinations",
        value: function () {
            var e = this;
            return this.props.combinations.map(function (t) {
                return React.createElement("div", {
                    className: "combination"
                }, t.split("+").map(function (t) {
                    return React.createElement("div", {
                        className: "key",
                        key: t
                    }, e.processKey(t))
                }))
            })
        }
    }, {
        key: "render",
        value: function () {
            return React.createElement("div", {
                className: "shortcut-definition"
            }, React.createElement("div", {
                className: "combinations"
            }, this.renderCombinations()), React.createElement("div", {
                className: "description"
            }, this.props.description))
        }
    }]), t
}(),
    ACTIONS_HOTKEYS = [{
        keys: ["META+ESC"],
        name: "exit-section"
    }, {
        keys: ["META+E"],
        name: "toggle-reference-chart"
    }, {
        keys: ["META+ALT+1", "META+ALT+2", "META+ALT+3"],
        name: "go-to-floor"
    }, {
        keys: ["META+J"],
        name: "duplicate"
    }, {
        keys: ["BACKSPACE"],
        name: "delete"
    }, {
        keys: ["META+D"],
        name: "deselect"
    }, {
        keys: ["META+Z"],
        name: "undo"
    }, {
        keys: mercator.isMac ? ["META+SHIFT+Z"] : ["META+Y", "META+SHIFT+Z"],
        name: "redo"
    }, {
        keys: ["META+X"],
        name: "cut"
    }, {
        keys: ["META+C"],
        name: "copy"
    }, {
        keys: ["META+V"],
        name: "paste"
    }];
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
        }
    }
    return function (t, n, a) {
        return n && e(t.prototype, n), a && e(t, a), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Dialogs.ModalDialogs.LabelEditingWarning = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Dialogs.ModalDialog), _createClass(t, [{
        key: "renderDialogActions",
        value: function (e) {
            var t = this.props.uiState.modalDialogProps.objectType;
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "action soft",
                onClick: function () {
                    return e.closeModalDialog()
                }
            }, d("cancel")), React.createElement("div", {
                className: "action danger",
                onClick: function () {
                    e.ignoreLabelEditWarning(t), e.closeModalDialog()
                }
            }, d("edit-anyway")))
        }
    }, {
        key: "renderDialogContents",
        value: function () {
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "dialog-title"
            }, d("label-editing-warning-title")), React.createElement("div", {
                className: "dialog-icon icon-warning danger"
            }), React.createElement("div", {
                className: "dialog-text"
            }, React.createElement("p", null, React.createElement("span", null, d("label-editing-warning")), " ", React.createElement("a", {
                href: "http://support.seats.io/design-your-floor-plan/what-happens-to-bookings-when-i-change-an-object-label",
                target: "_blank"
            }, du("more-info")))))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var o = 0; o < t.length; o++) {
            var n = t[o];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    return function (t, o, n) {
        return o && e(t.prototype, o), n && e(t, n), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Dialogs.ModalDialogs.NewFloorDialog = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Dialogs.ModalDialog), _createClass(t, [{
        key: "onConfirmNewFloor",
        value: function () {
            var e = mercator.designer.uiEvents;
            e.createFloor(), e.closeModalDialog()
        }
    }, {
        key: "renderDialogActions",
        value: function (e) {
            var t = this;
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "action soft",
                onClick: function () {
                    return e.closeModalDialog()
                }
            }, d("cancel")), React.createElement("div", {
                className: "action select",
                onClick: function () {
                    return t.onConfirmNewFloor()
                }
            }, d("create")))
        }
    }, {
        key: "renderDialogContents",
        value: function () {
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "dialog-title"
            }, d("create-new-floor")), React.createElement("div", {
                className: "dialog-text"
            }, React.createElement("p", null, d("new-floor-dialog-multifloor-description"))), React.createElement("div", {
                className: "image"
            }, React.createElement("img", {
                src: "designer/multifloor-screenshot@2x.jpg",
                height: "261",
                style: {
                    borderRadius: "8px"
                }
            })), React.createElement("div", {
                className: "dialog-text"
            }, React.createElement("p", null, d("new-floor-dialog-floor-spread-notice"))))
        }
    }]), t
}();
var _createClass = function () {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var s = e[a];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(t, s.key, s)
        }
    }
    return function (e, a, s) {
        return a && t(e.prototype, a), s && t(e, s), e
    }
}();

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e
}

function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
}
Dialogs.ModalDialogs.PublishDialog = function (t) {
    function e(t) {
        _classCallCheck(this, e);
        var a = _possibleConstructorReturn(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
        return a.state = {
            highlightErrors: !1,
            waiting: !1
        }, a
    }
    return _inherits(e, Dialogs.ModalDialog), _createClass(e, [{
        key: "onPublishDraft",
        value: function () {
            var t = this;
            this.hasValidationErrors() ? (this.setState({
                highlightErrors: !0
            }), this.highlightErrorsTimeout && clearTimeout(this.highlightErrorsTimeout), this.highlightErrorsTimeout = setTimeout(function () {
                t.setState({
                    highlightErrors: !1
                }), t.highlightErrorsTimeout = null
            }, 200)) : this.setState({
                waiting: !0
            }, function () {
                return mercator.designer.uiEvents.publishDraft()
            })
        }
    }, {
        key: "hasValidationErrors",
        value: function () {
            return mercator.designer.hasValidationErrors(mercator.designer.subChartFloors.allMasterSubCharts())
        }
    }, {
        key: "renderActionButtons",
        value: function (t) {
            var e = this;
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "action soft",
                onClick: function () {
                    return t.closeModalDialog()
                }
            }, d("cancel")), React.createElement("div", {
                className: "action select",
                onClick: function () {
                    return e.onPublishDraft()
                },
                disabled: this.hasValidationErrors()
            }, d("publish")))
        }
    }, {
        key: "renderDialogActions",
        value: function (t) {
            return this.state.waiting ? React.createElement(Dialogs.ModalDialogs.Waiting, null) : this.renderActionButtons(t)
        }
    }, {
        key: "renderDialogContents",
        value: function () {
            var t = this,
                e = {
                    totalDuplicateObjects: this.props.globalStats.totalDuplicateObjects,
                    totalUnlabeledObjects: this.props.globalStats.totalUnlabeledObjects,
                    totalUncategorized: this.props.globalStats.totalUncategorized,
                    missingFocalPoint: this.props.globalStats.missingFocalPoint,
                    hasUnusedFloors: this.props.globalStats.hasUnusedFloors,
                    hasNoObjects: this.props.globalStats.hasNoObjects,
                    totalCategoriesWithMultipleObjectTypes: this.props.globalStats.totalCategoriesWithMultipleObjectTypes,
                    hasMultipleFloors: this.props.hasMultipleFloors,
                    maxCapacityExceeded: this.props.globalStats.maxCapacityExceeded
                },
                a = Object.keys(e).some(function (e) {
                    return t.props.globalStats[e] > 0
                }),
                s = this.hasValidationErrors();
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "dialog-title"
            }, d("publish-draft-question")), React.createElement("div", {
                className: "dialog-icon icon-publish-thin " + (s ? "danger" : "warning")
            }), !s && React.createElement("div", {
                className: "dialog-text"
            }, React.createElement("p", null, d("publish-draft-description")), React.createElement("p", null, d("action-cannot-be-undone"))), a && React.createElement("div", {
                className: "inspector-snippet " + (this.state.highlightErrors && "highlight")
            }, React.createElement("div", {
                className: "title"
            }, d(s ? "chart-has-unresolved-errors" : "chart-has-unresolved-warnings")), React.createElement("div", {
                className: "content"
            }, Inspector.Sheets.ChartInfo.getChartStats(e, {}, !0, !0))))
        }
    }]), e
}();
var _createClass = function () {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var i = t[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }
    return function (t, a, i) {
        return a && e(t.prototype, a), i && e(t, i), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Dialogs.ModalDialogs.ReferenceChartDialog = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var a = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return a.defaultDuplicateRowOffset = new mercator.Point(10, -10), a.state = {
            pulse: !1,
            scale: 300,
            slide: 0,
            seatSize: a.scaleToSeatSize(e.referenceChartScale),
            pretendSeatSize: 0,
            placedSeats: [],
            duplicateRowOffset: a.defaultDuplicateRowOffset.clone(),
            slideOut: !1,
            completed: !1
        }, a.REQUIRED_SEATS = 4, a.onKeyDown = a.onKeyDown.bind(a), a.INTRODUCTION_SLIDE = 0, a.POSITIONING_SLIDE = 1, a.SEAT_PLACEMENT_SLIDE = 2, a.SEAT_SPACING_SLIDE = 3, a.ROW_SLIDE = 4, a.CONCLUSION_SLIDE = 5, a.LAST_SLIDE = a.CONCLUSION_SLIDE, a
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "componentDidMount",
        value: function () {
            document.addEventListener("keydown", this.onKeyDown)
        }
    }, {
        key: "componentWillUnmount",
        value: function () {
            document.removeEventListener("keydown", this.onKeyDown)
        }
    }, {
        key: "onKeyDown",
        value: function (e) {
            "Escape" === e.key && mercator.designer.uiEvents.closeModalDialog()
        }
    }, {
        key: "setPlacedSeats",
        value: function (e) {
            this.setState({
                placedSeats: orderPointsPerceptually(e)
            })
        }
    }, {
        key: "scaleToSeatSize",
        value: function (e) {
            return roundTo(mercator.Chair.width / (e / 100), 1)
        }
    }, {
        key: "applyScale",
        value: function () {
            mercator.designer.uiEvents.setReferenceChartScale(100 * this.getFinalBackgroundScale()), mercator.designer.uiEvents.setRowChairSpacing(this.getFinalSeatSpacing())
        }
    }, {
        key: "getMinPretendSeatSize",
        value: function () {
            return this.state.seatSize / (mercator.Row.MAX_CHAIR_SPACING / mercator.Chair.width)
        }
    }, {
        key: "getMaxPretendSeatSize",
        value: function () {
            return this.state.seatSize * (1 + mercator.Row.MIN_CHAIR_SPACING / mercator.Chair.width)
        }
    }, {
        key: "getFinalSeatSpacing",
        value: function () {
            return (this.getAvgSeatDistance() / this.getPreviewScale() - this.getFinalSeatSize()) * this.getFinalBackgroundScale()
        }
    }, {
        key: "getFinalSeatSize",
        value: function () {
            return this.state.pretendSeatSize > 0 ? this.state.pretendSeatSize : this.state.seatSize
        }
    }, {
        key: "getPreviewScale",
        value: function () {
            return this.state.scale / 100
        }
    }, {
        key: "getFinalBackgroundScale",
        value: function () {
            return mercator.Chair.width / this.getFinalSeatSize()
        }
    }, {
        key: "getRowSpacing",
        value: function () {
            return (this.state.duplicateRowOffset.length() / this.getPreviewScale() - this.getFinalSeatSize()) * this.getFinalBackgroundScale()
        }
    }, {
        key: "applyRowSpacing",
        value: function () {
            mercator.designer.uiEvents.setRowSpacing(roundTo(this.getRowSpacing(), 1))
        }
    }, {
        key: "setSeatSize",
        value: function (e) {
            this.setState({
                seatSize: e,
                pulse: !1
            })
        }
    }, {
        key: "setPretendSeatSize",
        value: function (e) {
            this.setState({
                pretendSeatSize: e,
                pulse: !1
            })
        }
    }, {
        key: "goToSlide",
        value: function (e) {
            var t = this,
                a = e > this.state.slide;
            this.setState({
                slideOut: a,
                completed: e === this.LAST_SLIDE
            }), setTimeout(function () {
                t.onEnterSlide(e), t.setState({
                    slideOut: !1,
                    slide: e
                })
            }, a ? 600 : 0)
        }
    }, {
        key: "prevSlide",
        value: function () {
            this.state.slide > 0 && this.goToSlide(this.state.slide - 1)
        }
    }, {
        key: "nextSlide",
        value: function () {
            if (this.state.slide < this.LAST_SLIDE) {
                var e = this.state.slide + 1;
                this.state.slide === this.SEAT_PLACEMENT_SLIDE ? this.goToSlide(this.doesSeatPlacementMakeARow() ? e : this.LAST_SLIDE) : this.goToSlide(e)
            } else mercator.designer.uiEvents.closeModalDialog()
        }
    }, {
        key: "canGoNextSlide",
        value: function () {
            return this.state.slide !== this.SEAT_PLACEMENT_SLIDE || this.state.placedSeats.length >= this.REQUIRED_SEATS
        }
    }, {
        key: "onEnterSlide",
        value: function (e) {
            if (e === this.SEAT_PLACEMENT_SLIDE && this.setState({
                placedSeats: [],
                pulse: !0
            }), e === this.SEAT_SPACING_SLIDE) {
                var t = mercator.Chair.width,
                    a = t + mercator.Row.DEFAULT_CHAIR_SPACING,
                    i = roundTo(t * (this.getAvgSeatDistance() / a) / this.getPreviewScale(), 1);
                this.setState({
                    seatSize: i,
                    pretendSeatSize: i,
                    pulse: !0
                })
            }
            e === this.ROW_SLIDE && this.setState({
                duplicateRowOffset: this.defaultDuplicateRowOffset.clone(),
                pulse: !1
            }), e === this.CONCLUSION_SLIDE && (this.applyScale(), this.getRowSpacing() >= 1 && this.applyRowSpacing())
        }
    }, {
        key: "getAvgSeatDistance",
        value: function () {
            var e = this.state.placedSeats.map(function (e) {
                return mercator.Point.fromDict(e)
            }),
                t = _.compact(e.map(function (t, a) {
                    return 0 === a ? null : t.distanceToPoint(e[a - 1])
                }));
            return t.reduce(function (e, t) {
                return t + e
            }, 0) / t.length
        }
    }, {
        key: "getFirstLastSeatDistance",
        value: function () {
            var e = _.first(this.state.placedSeats),
                t = _.last(this.state.placedSeats);
            return e.distanceToPoint(t)
        }
    }, {
        key: "getSlideActions",
        value: function () {
            var e = this,
                t = this.state.slide < this.LAST_SLIDE;
            return React.createElement("div", {
                className: "dialog-navigation"
            }, this.state.slide > 0 && this.state.slide < this.LAST_SLIDE && React.createElement(Button, {
                preset: "icon-caption",
                type: "arrow-light-left",
                color: "link",
                caption: d("back"),
                onClick: function () {
                    return e.prevSlide()
                },
                size: 20
            }), React.createElement(Button, {
                preset: "caption-icon",
                disabled: !this.canGoNextSlide(),
                type: t ? "arrow-light-right" : null,
                color: "link",
                caption: d(t ? "next" : "done"),
                onClick: function () {
                    return e.nextSlide()
                },
                size: 20
            }))
        }
    }, {
        key: "doesSeatPlacementMakeARow",
        value: function () {
            return this.state.placedSeats.length < this.REQUIRED_SEATS || !(this.getFirstLastSeatDistance() < 2 * this.getAvgSeatDistance()) && 2 === getEndPoints(this.state.placedSeats).length
        }
    }, {
        key: "getScale",
        value: function () {
            return this.props.document.referenceChartScale * mercator.designer.sectionScaleFactor / 100
        }
    }, {
        key: "getSlide",
        value: function () {
            var e = this;
            switch (this.state.slide) {
                case this.INTRODUCTION_SLIDE:
                    return React.createElement("div", {
                        className: "slide display"
                    }, React.createElement("div", {
                        className: "icon icon-calibrate"
                    }), React.createElement("div", {
                        className: "dialog-title"
                    }, d("reference-chart-intro-title")), React.createElement("div", {
                        className: "dialog-text"
                    }, React.createElement("p", null, d("reference-chart-intro-description"))), this.getSlideActions());
                case this.POSITIONING_SLIDE:
                    return React.createElement("div", {
                        className: "slide"
                    }, React.createElement("div", {
                        className: "rows"
                    }, React.createElement("div", {
                        className: "row instructions"
                    }, React.createElement("div", {
                        className: "step"
                    }, "1"), React.createElement("div", {
                        className: "text"
                    }, React.createElement("div", {
                        className: "dialog-title"
                    }, d("find-seats")), React.createElement("div", {
                        className: "dialog-text"
                    }, React.createElement("p", null, d("find-seats-description"))))), React.createElement("div", {
                        className: "row preview"
                    }, React.createElement(ReferenceChartPreview, {
                        mode: "find",
                        scale: this.state.scale,
                        width: this.props.uiState.modalDialogProps.imageWidth,
                        height: this.props.uiState.modalDialogProps.imageHeight,
                        src: this.props.uiState.modalDialogProps.imageUrl,
                        seatSize: this.state.seatSize
                    })), React.createElement("div", {
                        className: "row input"
                    }, React.createElement(NumericInput, {
                        key: "zoom-level",
                        caption: d("zoom-level"),
                        value: this.state.scale,
                        min: 25,
                        max: 600,
                        step: 25,
                        pixelsForStep: 8,
                        unit: "%",
                        onChange: function (t) {
                            return e.setState({
                                scale: t
                            })
                        },
                        pulse: this.state.pulse,
                        disableDirectInput: !0
                    }))), this.getSlideActions());
                case this.SEAT_PLACEMENT_SLIDE:
                    return React.createElement("div", {
                        className: "slide"
                    }, React.createElement("div", {
                        className: "rows"
                    }, React.createElement("div", {
                        className: "row instructions"
                    }, React.createElement("div", {
                        className: "step"
                    }, "2"), React.createElement("div", {
                        className: "text"
                    }, React.createElement("div", {
                        className: "dialog-title"
                    }, d("click-on-seats")), React.createElement("div", {
                        className: "dialog-text"
                    }, React.createElement("p", null, d("click-on-seats-description"))))), React.createElement("div", {
                        className: "row preview"
                    }, React.createElement(ReferenceChartPreview, {
                        mode: "mark",
                        scale: this.state.scale,
                        width: this.props.uiState.modalDialogProps.imageWidth,
                        height: this.props.uiState.modalDialogProps.imageHeight,
                        src: this.props.uiState.modalDialogProps.imageUrl,
                        seatSize: this.state.seatSize,
                        placedSeats: this.state.placedSeats,
                        onPlacedSeatsChange: this.setPlacedSeats.bind(this)
                    }), !this.doesSeatPlacementMakeARow() && React.createElement("div", {
                        className: "warning"
                    }, d("no-row-shape-detected"))), React.createElement("div", {
                        className: "row instructions"
                    }, React.createElement("div", {
                        className: "step"
                    }, "?"), React.createElement("div", {
                        className: "text"
                    }, React.createElement("div", {
                        className: "dialog-title"
                    }, d("adjust-seat-size")), React.createElement("div", {
                        className: "dialog-text"
                    }, React.createElement("p", null, d("adjust-seat-size-description")))), React.createElement("div", {
                        className: "input-box"
                    }, React.createElement(NumericInput, {
                        key: "seat-size-1",
                        caption: d("seat-size"),
                        value: this.state.seatSize,
                        min: 4,
                        max: 100,
                        step: .2,
                        roundPrecision: 1,
                        unit: "pt",
                        onChange: function (t) {
                            return e.setSeatSize(t)
                        },
                        pulse: this.state.pulse,
                        placedSeats: this.state.placedSeats,
                        disableDirectInput: !0
                    })))), this.getSlideActions());
                case this.SEAT_SPACING_SLIDE:
                    return React.createElement("div", {
                        className: "slide"
                    }, React.createElement("div", {
                        className: "rows"
                    }, React.createElement("div", {
                        className: "row instructions"
                    }, React.createElement("div", {
                        className: "step"
                    }, "!"), React.createElement("div", {
                        className: "text"
                    }, React.createElement("div", {
                        className: "dialog-title"
                    }, d("seat-size-autoadjusted")), React.createElement("div", {
                        className: "dialog-text"
                    }, React.createElement("p", null, d("seat-size-autoadjusted-description"))))), React.createElement("div", {
                        className: "row preview"
                    }, React.createElement(ReferenceChartPreview, {
                        mode: "static",
                        scale: this.state.scale,
                        width: this.props.uiState.modalDialogProps.imageWidth,
                        height: this.props.uiState.modalDialogProps.imageHeight,
                        src: this.props.uiState.modalDialogProps.imageUrl,
                        seatSize: this.state.pretendSeatSize,
                        placedSeats: this.state.placedSeats
                    })), React.createElement("div", {
                        className: "row instructions"
                    }, React.createElement("div", {
                        className: "step"
                    }, "3"), React.createElement("div", {
                        className: "text"
                    }, React.createElement("div", {
                        className: "dialog-title"
                    }, d("confirm-seat-size")), React.createElement("div", {
                        className: "dialog-text"
                    }, React.createElement("p", null, d("confirm-seat-size-description")))), React.createElement("div", {
                        className: "input-box"
                    }, React.createElement(NumericInput, {
                        key: "seat-size-1",
                        caption: d("seat-size"),
                        value: this.state.pretendSeatSize,
                        min: this.getMinPretendSeatSize(),
                        max: this.getMaxPretendSeatSize(),
                        pixelsForStep: 2,
                        step: .5,
                        roundPrecision: 1,
                        unit: "pt",
                        onChange: function (t) {
                            return e.setPretendSeatSize(t)
                        },
                        pulse: this.state.pulse,
                        placedSeats: this.state.placedSeats,
                        disableDirectInput: !0
                    })))), this.getSlideActions());
                case this.ROW_SLIDE:
                    return React.createElement("div", {
                        className: "slide"
                    }, React.createElement("div", {
                        className: "rows"
                    }, React.createElement("div", {
                        className: "row instructions"
                    }, React.createElement("div", {
                        className: "step"
                    }, "4"), React.createElement("div", {
                        className: "text"
                    }, React.createElement("div", {
                        className: "dialog-title"
                    }, d("row-spacing-step")), React.createElement("div", {
                        className: "dialog-text"
                    }, React.createElement("p", null, d("row-spacing-step-description"))))), React.createElement("div", {
                        className: "row preview long"
                    }, React.createElement(ReferenceChartPreview, {
                        mode: "duplicate",
                        scale: this.state.scale,
                        width: this.props.uiState.modalDialogProps.imageWidth,
                        height: this.props.uiState.modalDialogProps.imageHeight,
                        src: this.props.uiState.modalDialogProps.imageUrl,
                        seatSize: this.getFinalSeatSize(),
                        placedSeats: this.state.placedSeats,
                        duplicateRowOffset: this.state.duplicateRowOffset,
                        onDuplicateRowChange: function (t) {
                            return e.setState({
                                duplicateRowOffset: t
                            })
                        }
                    }))), this.getSlideActions());
                case this.CONCLUSION_SLIDE:
                    return React.createElement("div", {
                        className: "slide display"
                    }, React.createElement("div", {
                        className: "icon icon-check"
                    }), React.createElement("div", {
                        className: "dialog-title"
                    }, d("reference-chart-complete-1")), React.createElement("div", {
                        className: "dialog-text"
                    }, React.createElement("p", null, d("reference-chart-complete-2"))), this.getSlideActions());
                default:
                    return null
            }
        }
    }, {
        key: "render",
        value: function () {
            var e = mercator.designer.uiEvents;
            return React.createElement("div", {
                className: "ReferenceChartDialog modal-dialog " + (this.state.slideOut && "slide-out") + " " + (this.state.completed && "completed")
            }, React.createElement("div", {
                className: "dialog-controls"
            }, React.createElement(Button, {
                preset: "icon",
                type: "close-thin",
                size: 30,
                onClick: function () {
                    return e.closeModalDialog()
                }
            })), this.getSlide())
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
        }
    }
    return function (t, n, a) {
        return n && e(t.prototype, n), a && e(t, a), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Dialogs.ModalDialogs.ReferenceChartStartupDialog = function (e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return n.onKeyDown = n.onKeyDown.bind(n), n
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "componentDidMount",
        value: function () {
            document.addEventListener("keydown", this.onKeyDown)
        }
    }, {
        key: "componentWillUnmount",
        value: function () {
            document.removeEventListener("keydown", this.onKeyDown)
        }
    }, {
        key: "onKeyDown",
        value: function (e) {
            "Escape" === e.key && mercator.designer.uiEvents.closeModalDialog()
        }
    }, {
        key: "render",
        value: function () {
            var e = mercator.designer.uiEvents,
                t = this.props.busyIndicators.includes("referenceChartUpload") || this.props.busyIndicators.includes("referenceChartImage"),
                n = React.createElement("div", {
                    className: "dialog-actions " + (t && "invisible")
                }, React.createElement(Button, {
                    preset: "caption-icon",
                    type: "arrow-light-right-halt",
                    color: "link",
                    caption: d("skip"),
                    onClick: function () {
                        return e.closeModalDialog()
                    },
                    size: 20
                }));
            return React.createElement("div", {
                className: "ReferenceChartStartupDialog modal-dialog allow-horizontal-flex"
            }, React.createElement("div", {
                className: "contents"
            }, React.createElement("img", {
                className: "dialog-image",
                src: "designer/reference-chart-icon.svg",
                width: "279",
                height: "152"
            }), React.createElement("div", {
                className: "dialog-title"
            }, d("trace-chart")), React.createElement("div", {
                className: "dialog-text"
            }, d("reference-chart-description-1")), React.createElement("div", {
                className: "dialog-text"
            }, d("reference-chart-description-2")), n), React.createElement("div", {
                className: "contents"
            }, React.createElement("div", {
                className: "options"
            }, React.createElement(ImageInput, {
                uploading: t,
                onSet: function (t) {
                    return e.setReferenceChartImage(t, function () {
                        return e.openReferenceChartDialog()
                    })
                },
                mimeTypes: ["image/png", "image/gif", "image/jpeg", "application/pdf"],
                maxFilesizeMB: mercator.ReferenceChart.MAX_UPLOAD_FILESIZE_MB
            })), n))
        }
    }]), t
}();
Dialogs.ModalDialogs.VenueTypeSelectorDialog = function () {
    var e = mercator.designer.uiEvents,
        t = !!mercator.designer.onExitRequested;
    return React.createElement("div", {
        className: "VenueTypeSelector modal-dialog allow-horizontal-flex"
    }, React.createElement("div", {
        className: "dialog-controls"
    }, t && React.createElement(Button, {
        preset: "icon",
        type: "close-thin",
        size: 30,
        onClick: function () {
            return e.closeApp()
        }
    })), React.createElement("div", {
        className: "contents"
    }, React.createElement("div", {
        className: "dialog-title"
    }, d("new-chart")), React.createElement("div", {
        className: "options"
    }, React.createElement("div", {
        className: "option",
        onClick: function () {
            return e.selectWithoutSectionsVenueType()
        }
    }, React.createElement("img", {
        className: "preview-image preview-sheet",
        src: "venueTypes/simple-chart@2x.jpg"
    }), React.createElement("div", {
        className: "title"
    }, d("without-sections")), React.createElement("div", {
        className: "title-description"
    }, d("without-sections-1"))), React.createElement("div", {
        className: "option",
        onClick: function () {
            return e.selectWithSectionsVenueType()
        }
    }, React.createElement("div", {
        className: "dual-preview preview-sheet"
    }, React.createElement("img", {
        className: "preview-image a",
        src: "venueTypes/sections-chart-a@2x.jpg"
    }), React.createElement("img", {
        className: "preview-image b",
        src: "venueTypes/sections-chart-b@2x.jpg"
    })), React.createElement("div", {
        className: "title"
    }, d("with-sections-and-floors")), React.createElement("div", {
        className: "title-description"
    }, d("with-sections-1"))))))
};
var _createClass = function () {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var n = t[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    return function (t, a, n) {
        return a && e(t.prototype, a), n && e(t, n), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Dialogs.ModalDialogs.Waiting = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, React.Component), _createClass(t, [{
        key: "render",
        value: function () {
            return React.createElement("div", {
                className: "waiting-indicator " + (this.props.isWaitingCompleted && "done")
            }, React.createElement("div", {
                className: "done-indicator"
            }, React.createElement("div", {
                className: "stamp"
            }, React.createElement("div", {
                className: "stroke"
            }))), React.createElement("div", {
                className: "LoadingIndicator"
            }, React.createElement("div", {
                className: "indicator"
            }), React.createElement("div", {
                className: "indicator"
            }), React.createElement("div", {
                className: "indicator"
            }), React.createElement("div", {
                className: "indicator"
            }), React.createElement("div", {
                className: "indicator"
            })))
        }
    }]), t
}();
Inspector.GUI.DataRow = function (e) {
    var i = !0;
    return "function" == typeof e.visible ? i = e.visible(e.value) : void 0 !== e.visible && (i = e.visible), i && e.children ? React.createElement("div", {
        className: "DataRow " + (e.onClick ? "interactive" : "") + " preset-" + e.preset + " " + (e.wide && "wide"),
        onClick: e.onClick
    }, React.createElement("div", {
        className: "caption"
    }, e.caption), React.createElement("div", {
        className: "value"
    }, e.children)) : null
};
Inspector.GUI.SelectableDataRow = function (e) {
    var a = !0;
    "function" == typeof e.visible ? a = e.visible(e.visibleValue) : void 0 !== e.visible && (a = e.visible);
    var t = e.options.map(function (e) {
        var a = e.value,
            t = e.caption;
        return a || (a = e, t = d(a)), React.createElement("option", {
            key: a,
            value: a
        }, t)
    });
    return a && e.children ? React.createElement("div", {
        className: "DataRow SelectableDataRow " + (e.onClick ? "interactive" : "") + " preset-" + e.preset,
        onClick: e.onClick
    }, React.createElement("select", {
        className: "dropdown-caption",
        onChange: function (a) {
            return e.onChange(a.target.value)
        },
        disabled: e.disabled,
        value: e.value || "select-input-none"
    }, t), React.createElement("div", {
        className: "value"
    }, e.children)) : null
};
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }
    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Inspector.GUI.StatusInfo = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, React.PureComponent), _createClass(t, [{
        key: "isVisible",
        value: function (e) {
            return "function" == typeof this.props.visible ? this.props.visible(e) : void 0 === this.props.visible || this.props.visible
        }
    }, {
        key: "renderLabel",
        value: function (e) {
            var t = e && e.toLocaleString({
                useGrouping: !0
            });
            return e && e > 0 ? React.createElement(React.Fragment, null, React.createElement("span", {
                className: "value"
            }, t), React.createElement("span", {
                className: "caption"
            }, (this.props.unit ? this.props.unit + " " : "") + _.lowerFirst(this.props.caption))) : React.createElement("span", {
                className: "caption"
            }, this.props.noValueCaption)
        }
    }, {
        key: "getValidationIcon",
        value: function (e) {
            return "valid" === e ? "check" : "validation-" + e
        }
    }, {
        key: "renderIcon",
        value: function () {
            return this.props.validation ? React.createElement("div", {
                className: "icon icon-" + this.getValidationIcon(this.props.validation),
                title: d(this.props.validation)
            }) : this.props.icon ? React.createElement("div", {
                className: "icon icon-" + this.props.icon
            }) : void 0
        }
    }, {
        key: "render",
        value: function () {
            var e = this,
                t = Array.isArray(this.props.value) ? this.props.value.reduce(function (e, t) {
                    return e + t
                }) : this.props.value;
            return this.isVisible(t) ? React.createElement("div", {
                className: "StatusInfo validation-" + (null === this.props.validation ? "none" : this.props.validation)
            }, this.renderIcon(), React.createElement("div", {
                className: "label"
            }, this.renderLabel(t)), this.props.warningMessage && React.createElement("div", {
                className: "warningMessage icon-warning",
                onClick: function (t) {
                    return mercator.designer.uiEvents.showTooltip([React.createElement("p", null, e.props.warningMessage)], t, !0)
                },
                onMouseOut: function () {
                    return mercator.designer.uiEvents.hideTooltip()
                }
            }), this.props.onDetails && React.createElement(Button, {
                preset: "icon-soft",
                caption: this.props.detailsTooltip || "",
                color: "blue-selected",
                type: this.props.detailsIcon || "loupe",
                selected: this.props.detailsSelected,
                onClick: this.props.onDetails
            })) : null
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var n = t[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    return function (t, a, n) {
        return a && e(t.prototype, a), n && e(t, n), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Inspector.Sheets.Capacity = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Inspector.InspectorSheet), _createClass(t, [{
        key: "renderContents",
        value: function () {
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "title"
            }, d("capacity")), this.typeSelect(), this.helpText(), this.normalGA(), this.fixedCapacityPod(), this.variableOccupancyPod())
        }
    }, {
        key: "currentSelection",
        value: function () {
            var e = Inspector.Sheets.Capacity.options;
            return this.props.data.bookAsAWhole ? this.props.data.variableOccupancy ? e.variableOccupancy : e.fixedOccupancy : e.generalAdmission
        }
    }, {
        key: "selectTypeOption",
        value: function (e) {
            var t = Inspector.Sheets.Capacity.options[e];
            !this.props.data.bookAsAWhole && t.bookAsAWhole && this.props.designer.chartHasEvents ? mercator.designer.uiEvents.showGABookableAsAWholeWarning(t.variableOccupancy) : (mercator.designer.uiEvents.setSelectionBookAsAWhole(t.bookAsAWhole), mercator.designer.uiEvents.setSelectionVariableOccupancy(t.variableOccupancy))
        }
    }, {
        key: "typeSelect",
        value: function () {
            var e = this,
                t = Object.keys(Inspector.Sheets.Capacity.options).map(function (e) {
                    return {
                        value: e,
                        caption: d(Inspector.Sheets.Capacity.options[e].caption)
                    }
                });
            return React.createElement(Inspector.GUI.DataRow, {
                caption: d("type"),
                wide: !0
            }, React.createElement(SelectInput, {
                options: t,
                value: this.currentSelection().value,
                onChange: function (t) {
                    return e.selectTypeOption(t)
                }
            }))
        }
    }, {
        key: "capacityNumericInput",
        value: function (e) {
            return React.createElement(NumericInput, {
                caption: d(e),
                value: this.props.data.capacity,
                min: 1,
                max: 1e5,
                step: 1,
                unit: dl("places", {
                    smart_count: this.props.data.capacity
                }),
                onChange: function (e) {
                    return mercator.designer.uiEvents.setSelectionCapacity(e)
                }
            })
        }
    }, {
        key: "normalGA",
        value: function () {
            if (!this.props.data.bookAsAWhole) return this.capacityNumericInput("capacity")
        }
    }, {
        key: "fixedCapacityPod",
        value: function () {
            if (this.props.data.bookAsAWhole && !this.props.data.variableOccupancy) return this.capacityNumericInput("capacity")
        }
    }, {
        key: "variableOccupancyPod",
        value: function () {
            if (this.props.data.bookAsAWhole && this.props.data.variableOccupancy) return React.createElement(React.Fragment, null, React.createElement(NumericInput, {
                caption: d("min-occupancy"),
                value: this.props.data.minOccupancy,
                min: 1,
                max: this.props.data.capacity,
                step: 1,
                unit: dl("places", {
                    smart_count: this.props.data.minOccupancy
                }),
                onChange: function (e) {
                    return mercator.designer.uiEvents.setSelectionMinOccupancy(e)
                }
            }), this.capacityNumericInput("max-occupancy"))
        }
    }, {
        key: "helpText",
        value: function () {
            return React.createElement("div", {
                className: "text-info",
                dangerouslySetInnerHTML: {
                    __html: d(this.currentSelection().helpText)
                }
            })
        }
    }]), t
}(), Inspector.Sheets.Capacity.options = {
    generalAdmission: {
        value: "generalAdmission",
        caption: "type_generalAdmission",
        bookAsAWhole: !1,
        variableOccupancy: void 0,
        helpText: "general-admission-area-info"
    },
    fixedOccupancy: {
        value: "fixedOccupancy",
        caption: "type_fixedOccupancy",
        bookAsAWhole: !0,
        variableOccupancy: !1,
        helpText: "fixedOccupancy-info"
    },
    variableOccupancy: {
        value: "variableOccupancy",
        caption: "type_variableOccupancy",
        bookAsAWhole: !0,
        variableOccupancy: !0,
        helpText: "variableOccupancy-info"
    }
};
var _slicedToArray = function () {
    return function (e, t) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return function (e, t) {
            var r = [],
                n = !0,
                o = !1,
                a = void 0;
            try {
                for (var c, i = e[Symbol.iterator](); !(n = (c = i.next()).done) && (r.push(c.value), !t || r.length !== t); n = !0);
            } catch (e) {
                o = !0, a = e
            } finally {
                try {
                    !n && i.return && i.return()
                } finally {
                    if (o) throw a
                }
            }
            return r
        }(e, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }
}(),
    _createClass = function () {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        return function (t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t
        }
    }();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Inspector.Sheets.CategoriesMoved = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Inspector.InspectorSheet), _createClass(t, [{
        key: "renderContents",
        value: function () {
            var e = d("categories-have-moved-li-2").split("[icon]"),
                t = _slicedToArray(e, 2),
                r = t[0],
                n = t[1];
            return React.createElement("div", {
                className: "CategoriesMoved"
            }, React.createElement("div", {
                className: "sign"
            }, React.createElement("div", {
                className: "icon icon-categories"
            }), React.createElement("div", {
                className: "title"
            }, d("categories-have-moved"))), React.createElement("ol", {
                className: "steps"
            }, React.createElement("li", null, d("categories-have-moved-li-1")), React.createElement("li", null, r, React.createElement("span", {
                className: "icon icon-loupe"
            }), n)))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Inspector.Sheets.Category = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Inspector.InspectorSheet), _createClass(t, [{
        key: "shouldComponentUpdate",
        value: function (e, t) {
            return differentObjectValues(this.state, t) || differentObjectValues(this.props, e, ["data", "disabled", "highlightFx"]) || differentObjectValues(this.props.document, e.document, ["categories"]) || differentObjectValues(this.props.uiState, e.uiState, ["floatingDialog"])
        }
    }, {
        key: "isEditingPropertiesDisabled",
        value: function () {
            return mercator.designer.features.isReadOnly(mercator.Features.Type.CATEGORY_LIST) || this.isApplyingDisabled()
        }
    }, {
        key: "isApplyingDisabled",
        value: function () {
            return mercator.designer.features.isDisabled(mercator.Features.Type.CATEGORY_LIST)
        }
    }, {
        key: "getContextualAction",
        value: function () {
            return React.createElement("div", {
                className: "contextual-action"
            }, React.createElement(Button, {
                preset: "icon-caption",
                type: "settings",
                caption: d("manage"),
                selected: "CategoriesInfo" === this.props.uiState.floatingDialog,
                onClick: function () {
                    return mercator.designer.uiEvents.toggleCategoriesInfoDialog()
                }
            }))
        }
    }, {
        key: "renderContents",
        value: function () {
            return React.createElement(React.Fragment, null, this.getContextualAction(), React.createElement("div", {
                className: "title"
            }, d("category")), React.createElement(CategoryInput, {
                categories: this.props.document.categories,
                value: this.props.data.category,
                disabled: this.isApplyingDisabled(),
                onReorderItem: function (e, t) {
                    return mercator.designer.uiEvents.reorderCategory(e, t)
                }
            }))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t
    }
}(),
    _get = function e(t, r, n) {
        null === t && (t = Function.prototype);
        var a = Object.getOwnPropertyDescriptor(t, r);
        if (void 0 === a) {
            var i = Object.getPrototypeOf(t);
            return null === i ? void 0 : e(i, r, n)
        }
        if ("value" in a) return a.value;
        var o = a.get;
        return void 0 !== o ? o.call(n) : void 0
    };

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Inspector.Sheets.ChartBackground = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Inspector.InspectorSheet), _createClass(t, [{
        key: "shouldComponentUpdate",
        value: function (e) {
            return _get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "shouldComponentUpdate", this).call(this, e) || differentObjectValues(this.props, e, ["busyIndicators"])
        }
    }, {
        key: "renderContents",
        value: function () {
            var e = mercator.designer.features.isDisabled(mercator.Features.Type.BACKGROUND_IMAGE);
            if (!this.props.data.url && e) return null;
            var t = mercator.designer.uiEvents;
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "title"
            }, d("background")), React.createElement(ImageInput, {
                url: this.props.data.url,
                uploading: this.props.busyIndicators.includes("chartBackgroundUpload") || this.props.busyIndicators.includes("chartBackgroundImage"),
                onSet: function (e) {
                    return t.setChartBackgroundImage(e)
                },
                onRemove: function () {
                    return t.removeChartBackgroundImage()
                },
                mimeTypes: ["image/png", "image/gif", "image/jpeg"],
                maxFilesizeMB: 10,
                disabled: e
            }), !this.props.data.url && React.createElement("div", {
                className: "text-info"
            }, d("chart-background-hint")), React.createElement(NumericInput, {
                caption: d("scale"),
                value: this.props.data.scale,
                min: 10,
                max: 500,
                unit: "%",
                onChange: function (e) {
                    return t.setChartBackgroundScale(e)
                },
                disabled: e,
                invisible: !this.props.data.url
            }), this.props.data.url && (this.props.data.visibleToTicketBuyers ? React.createElement("div", {
                className: "text-info"
            }, d("visible-to-ticket-buyers")) : [React.createElement(Button, {
                key: "visible-action",
                preset: "expansive",
                caption: d("make-visible-to-ticket-buyers"),
                onClick: function () {
                    return t.setChartBackgroundVisibleToTicketBuyers(!0)
                },
                disabled: e
            }), React.createElement("div", {
                key: "visible-hint",
                className: "text-info"
            }, d("make-visible-to-ticket-buyers-hint"))]), this.props.data.fileSize > 512e3 && this.props.data.visibleToTicketBuyers ? React.createElement("div", {
                className: "text-warning"
            }, d("background-file-too-big")) : null)
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Inspector.Sheets.ChartCategories = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Inspector.InspectorSheet), _createClass(t, [{
        key: "shouldComponentUpdate",
        value: function (e, t) {
            return differentObjectValues(this.state, t) || differentObjectValues(this.props, e, ["data", "disabled", "highlightFx"]) || differentObjectValues(this.props.document, e.document, ["categories"]) || differentObjectValues(this.props.uiState, e.uiState, ["floatingDialog"])
        }
    }, {
        key: "isEditingDisabled",
        value: function () {
            return mercator.designer.features.isReadOnly(mercator.Features.Type.CATEGORY_LIST) || this.isApplyingDisabled()
        }
    }, {
        key: "isApplyingDisabled",
        value: function () {
            return mercator.designer.features.isDisabled(mercator.Features.Type.CATEGORY_LIST)
        }
    }, {
        key: "renderContents",
        value: function () {
            var e = this.isEditingDisabled();
            return 0 === this.props.document.categories.length && e ? null : React.createElement(React.Fragment, null, React.createElement("div", {
                className: "title"
            }, d("categories")), React.createElement(Button, {
                preset: "toolbar-icon",
                type: "categories",
                caption: "" + d("categories"),
                selected: "CategoriesInfo" === this.props.uiState.floatingDialog,
                onClick: function () {
                    return mercator.designer.uiEvents.toggleCategoriesInfoDialog()
                }
            }))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var o = t[a];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }
    return function (t, a, o) {
        return a && e(t.prototype, a), o && e(t, o), t
    }
}(),
    _get = function e(t, a, o) {
        null === t && (t = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(t, a);
        if (void 0 === n) {
            var i = Object.getPrototypeOf(t);
            return null === i ? void 0 : e(i, a, o)
        }
        if ("value" in n) return n.value;
        var l = n.get;
        return void 0 !== l ? l.call(o) : void 0
    };

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Inspector.Sheets.ChartInfo = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Inspector.InspectorSheet), _createClass(t, [{
        key: "shouldComponentUpdate",
        value: function (e) {
            return _get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "shouldComponentUpdate", this).call(this, e) || differentObjectValues(this.props, e, ["uiState"])
        }
    }, {
        key: "renderClassName",
        value: function () {
            return _get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "renderClassName", this).call(this) + " wide bottom-to-edge"
        }
    }, {
        key: "renderContents",
        value: function () {
            var e = this.props.data.name && this.props.data.name !== d("untitled-chart") ? d("chart-chart", {
                chart: this.props.data.name
            }) : d("untitled-chart"),
                t = Object.assign({
                    categoriesLength: this.props.document.categories.length
                }, this.props.data);
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "title"
            }, e), Inspector.Sheets.ChartInfo.getChartStats(t, this.props.uiState))
        }
    }], [{
        key: "getChartStats",
        value: function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                o = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                n = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                i = mercator.designer.uiEvents,
                l = n ? mercator.designer.getValidationStates() : mercator.designer.getValidationStates(mercator.designer.subChartFloors.allMasterSubCharts());
            return !0 === e.isEmpty && !a && n ? React.createElement("div", {
                className: "text-info"
            }, d("container-is-empty", {
                container: dl("section")
            })) : React.createElement(React.Fragment, null, React.createElement(Inspector.GUI.StatusInfo, {
                key: "has-no-objects",
                validation: e.hasNoObjects ? l.hasNoObjects : "valid",
                noValueCaption: d("no-objects"),
                visible: !0 === e.hasNoObjects && a && o && "" !== l.hasNoObjects
            }), React.createElement(Inspector.GUI.StatusInfo, {
                key: "seats",
                icon: "seats",
                value: e.totalPeopleCapacity,
                caption: d("places", {
                    smart_count: e.totalPeopleCapacity
                }),
                detailsSelected: "CapacityDetails" === t.floatingDialog,
                onDetails: !a && e.totalPeopleCapacity > 0 ? function () {
                    return i.toggleCapacityDetailsDialog()
                } : null,
                visible: !a && e.totalPeopleCapacity > 0
            }), React.createElement(Inspector.GUI.StatusInfo, {
                key: "categories",
                icon: "categories",
                value: e.categoriesLength,
                caption: d("n-categories", {
                    smart_count: e.categoriesLength
                }),
                noValueCaption: d("chart-no-categories"),
                detailsSelected: "CategoriesInfo" === t.floatingDialog,
                onDetails: function () {
                    return i.toggleCategoriesInfoDialog()
                },
                visible: !a && void 0 !== e.categoriesLength
            }), React.createElement(Inspector.GUI.StatusInfo, {
                key: "booths",
                icon: "booths",
                value: e.totalBooths,
                caption: d("booths", {
                    smart_count: e.totalBooths
                }),
                detailsSelected: "BoothDetails" === t.floatingDialog,
                onDetails: !a && e.totalBooths > 0 ? function () {
                    return i.toggleBoothDetailsDialog()
                } : null,
                visible: !a && e.totalBooths > 0
            }), React.createElement(Inspector.GUI.StatusInfo, {
                key: "max-capacity-exceeded",
                validation: e.maxCapacityExceeded ? l.maxCapacityExceeded : null,
                noValueCaption: d("max-capacity-exceeded", {
                    maxCapacity: mercator.ChartDesigner.MAX_CAPACITY.toLocaleString()
                }),
                visible: void 0 !== e.maxCapacityExceeded && (a && e.maxCapacityExceeded || e.maxCapacityExceeded)
            }), React.createElement(Inspector.GUI.StatusInfo, {
                key: "duplicate-seats",
                validation: e.totalDuplicateObjects > 0 ? l.duplicates : "valid",
                value: e.totalDuplicateObjects,
                caption: d("duplicate-objects"),
                noValueCaption: d("no-duplicate-objects"),
                detailsSelected: "DuplicateObjects" === t.floatingDialog,
                onDetails: !a && e.totalDuplicateObjects > 0 ? function () {
                    return i.toggleDuplicateObjectsDialog()
                } : null,
                visible: !1 === e.isEmpty || a && e.totalDuplicateObjects > 0 && "" !== l.duplicates
            }), React.createElement(Inspector.GUI.StatusInfo, {
                key: "unlabeled-objects",
                validation: e.totalUnlabeledObjects > 0 ? l.unlabeled : "valid",
                value: e.totalUnlabeledObjects,
                caption: d("unlabeled-objects", {
                    smart_count: e.totalUnlabeledObjects
                }),
                noValueCaption: d("all-objects-labeled"),
                detailsSelected: "UnlabeledObjects" === t.floatingDialog,
                onDetails: !a && e.totalUnlabeledObjects > 0 ? function () {
                    return i.toggleUnlabeledObjectsDialog()
                } : null,
                visible: !1 === e.isEmpty || a && e.totalUnlabeledObjects > 0 && "" !== l.unlabeled
            }), React.createElement(Inspector.GUI.StatusInfo, {
                key: "uncategorized-objects",
                validation: e.totalUncategorized > 0 ? l.uncategorized : "valid",
                value: e.totalUncategorized,
                caption: d("uncategorized-objects", {
                    smart_count: e.totalUncategorized
                }),
                noValueCaption: d("all-objects-categorized"),
                detailsSelected: "UncategorizedObjects" === t.floatingDialog,
                onDetails: !a && e.totalUncategorized > 0 ? function () {
                    return i.toggleUncategorizedObjectsDialog()
                } : null,
                visible: !1 === e.isEmpty || a && e.totalUncategorized > 0 && "" !== l.uncategorized
            }), React.createElement(Inspector.GUI.StatusInfo, {
                key: "types-per-category",
                validation: e.totalCategoriesWithMultipleObjectTypes > 0 ? l.typesPerCategory : "valid",
                value: e.totalCategoriesWithMultipleObjectTypes,
                caption: d("multiple-object-types-per-category", {
                    smart_count: e.totalCategoriesWithMultipleObjectTypes
                }),
                noValueCaption: d("unique-object-types-per-category"),
                detailsSelected: "TypesByCategory" === t.floatingDialog,
                onDetails: !a && e.totalCategories > 0 ? function () {
                    return i.toggleTypesByCategoryDialog()
                } : null,
                visible: !n && (!1 === e.isEmpty || a && e.totalCategoriesWithMultipleObjectTypes > 0)
            }), React.createElement(Inspector.GUI.StatusInfo, {
                key: "missing-focal-point",
                validation: e.missingFocalPoint ? l.missingFocalPoint : "valid",
                noValueCaption: e.missingFocalPoint ? d("no-focal-point-set") : d("focal-point-set"),
                visible: void 0 !== e.missingFocalPoint && (!a || a && e.missingFocalPoint && "" !== l.missingFocalPoint)
            }), React.createElement(Inspector.GUI.StatusInfo, {
                key: "has-unused-floors",
                validation: e.hasUnusedFloors ? l.hasUnusedFloors : "valid",
                noValueCaption: e.hasUnusedFloors ? d("unused-floors") : d("no-unused-floors"),
                visible: void 0 !== e.hasUnusedFloors && (!a || a && e.hasUnusedFloors && "" !== l.hasUnusedFloors)
            }), React.createElement(Inspector.GUI.StatusInfo, {
                key: "images",
                validation: e.imagesTotalSize > mercator.ImageObject.WARN_TOTAL_FILESIZE_BYTES ? "warning" : "valid",
                value: Math.round(e.imagesTotalSize / 1024),
                unit: "KB",
                caption: d("from-images"),
                detailsSelected: "ImageObjects" === t.floatingDialog,
                onDetails: function () {
                    return i.toggleImageObjectsDialog()
                },
                visible: e.imagesTotalSize > 0 && !a
            }))
        }
    }]), t
}();
Inspector.Sheets.FocalPoint = function (e) {
    var t = mercator.designer.uiEvents;
    return React.createElement("div", {
        className: "InspectorSheet " + (e.highlightFx && "highlight-fx"),
        ref: e.childRef
    }, React.createElement("div", {
        className: "contextual-action"
    }, React.createElement(Button, {
        preset: "icon-caption",
        type: "close-light",
        caption: d("remove"),
        onClick: function () {
            return t.actionDelete(!0)
        }
    })), React.createElement("div", {
        className: "title"
    }, d("focalpoint")), React.createElement("div", {
        className: "text-info"
    }, d("focalpoint-hint")))
};
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }
    return function (t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Inspector.Sheets.Icon = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Inspector.InspectorSheet), _createClass(t, [{
        key: "renderContents",
        value: function () {
            var e = mercator.designer.uiEvents;
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "title"
            }, d("icon")), React.createElement(IconGrid, {
                options: mercator.Icon.CHOICES,
                value: this.props.data.icon,
                onChange: function (t) {
                    return e.setSelectionIcon(t)
                }
            }), React.createElement(NumericInput, {
                caption: d("size"),
                value: this.props.data.size,
                min: 1,
                max: 5e3,
                unit: "pt",
                step: 2,
                onChange: function (t) {
                    return e.setSelectionSize(t)
                },
                invisible: void 0 === this.props.data.size
            }), React.createElement(Inspector.GUI.DataRow, {
                caption: d("fill-color"),
                visible: void 0 !== this.props.data.fillColor
            }, React.createElement(ColorInput, {
                value: this.props.data.fillColor,
                paletteSet: "shape",
                onChange: function (t) {
                    return e.setSelectionIconFillColor(t)
                },
                opacity: !0
            })))
        }
    }]), t
}();
Inspector.Sheets.Image = function (e) {
    var a = Math.round(e.data.fileSize > 1024 ? e.data.fileSize / 1024 : e.data.fileSize);
    return React.createElement("div", {
        className: "InspectorSheet " + (e.highlightFx && "highlight-fx") + " wide bottom-to-edge",
        ref: e.childRef
    }, !e.data.loaded && React.createElement("div", {
        className: "loading"
    }, React.createElement("div", {
        className: "icon-saving"
    })), React.createElement("div", {
        className: "title"
    }, d("image")), e.data.fileSize > 524288 && React.createElement("div", {
        className: "text-warning"
    }, d("background-file-too-big")), React.createElement(Inspector.GUI.StatusInfo, {
        value: a,
        caption: e.data.fileSize > 1024 ? "KB" : "B"
    }))
};
Inspector.Sheets.ImageUpload = function (e) {
    if (e.designer.disabledFeatures.includes(mercator.Features.Type.IMAGES)) return null;
    var a = mercator.designer.uiEvents;
    return React.createElement("div", {
        className: "InspectorSheet " + (e.highlightFx && "highlight-fx"),
        ref: e.childRef
    }, React.createElement("div", {
        className: "title"
    }, d("image")), React.createElement("div", {
        className: "text-info"
    }, d("image-tool-info")), React.createElement(ImageInput, {
        url: e.data.url,
        uploading: e.busyIndicators.includes("imageObjectUpload"),
        onSet: function (e) {
            return a.uploadAndPlaceImage(e)
        },
        mimeTypes: ["image/png", "image/gif", "image/jpeg"],
        maxFilesizeMB: mercator.ImageObject.MAX_FILESIZE_MB
    }))
};
var _createClass = function () {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    return function (t, i, n) {
        return i && e(t.prototype, i), n && e(t, n), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Inspector.Sheets.Label = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Inspector.InspectorSheet), _createClass(t, [{
        key: "renderContents",
        value: function () {
            var e = this,
                t = mercator.designer.uiEvents,
                i = isLabelingLocked(this.props, this.props.objectType),
                n = this.props.disabled.includes("Label.caption"),
                o = this.props.data.displayLabel && this.props.data.caption !== this.props.data.displayLabel || i || n;
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "title"
            }, d("label")), React.createElement(TextInput, {
                caption: d("label"),
                value: this.props.data.caption,
                onChangePreview: function (e) {
                    return t.previewSelectionLabelCaption(e)
                },
                onChangeFinal: function (e) {
                    return t.setSelectionLabelCaption(e)
                },
                disabled: n,
                invisible: void 0 === this.props.data.caption,
                locked: i,
                onLockClicked: function () {
                    return mercator.designer.uiEvents.showLabelEditingWarning(e.props.objectType)
                },
                disabledTooltip: n ? d("published-labels-disabled") : void 0,
                disabledTooltipIcon: n ? "restricted" : void 0
            }), React.createElement(UnlockableInspectorInput, {
                caption: d("displayed-label"),
                infoTooltip: d("displayed-label-tooltip"),
                showContents: o,
                invisible: !(this.props.data.caption && "?" !== this.props.data.caption || n)
            }, React.createElement(TextInput, {
                caption: d("displayed-label"),
                value: this.props.data.displayLabel,
                onChange: function (e) {
                    return t.setSelectionDisplayLabel(e)
                },
                placeholder: this.props.data.caption,
                infoTooltip: d("displayed-label-tooltip"),
                autoFocus: !o
            })), React.createElement(CheckboxInput, {
                caption: d("visible"),
                value: this.props.data.visible,
                onChange: function (e) {
                    return t.setSelectionLabelVisible(e)
                },
                invisible: void 0 === this.props.data.visible
            }), React.createElement(NumericInput, {
                caption: d("font-size"),
                value: this.props.data.size,
                min: 1,
                max: mercator.ObjectLabel.MAX_LABEL_SIZE,
                unit: "pt",
                onChange: function (e) {
                    return t.setSelectionLabelSize(e)
                },
                invisible: void 0 === this.props.data.size
            }), React.createElement(NumericInput, {
                caption: d("rotation"),
                value: this.props.data.rotation,
                min: 0,
                max: 360,
                wrapsAround: !0,
                unit: "º",
                onChange: function (e) {
                    return t.setSelectionLabelRotation(e)
                },
                invisible: void 0 === this.props.data.rotation
            }), React.createElement(NumericInput, {
                caption: d("position-x"),
                value: this.props.data.positionX,
                min: -50,
                max: 50,
                unit: "%",
                onChange: function (e) {
                    return t.setSelectionLabelPositionX(e)
                },
                invisible: void 0 === this.props.data.positionX
            }), React.createElement(NumericInput, {
                caption: d("position-y"),
                value: this.props.data.positionY,
                min: -50,
                max: 50,
                unit: "%",
                onChange: function (e) {
                    return t.setSelectionLabelPositionY(e)
                },
                invisible: void 0 === this.props.data.positionY
            }))
        }
    }]), t
}();

function isLabelingLocked(e, n) {
    var t = e.data.isNewObject instanceof Array ? !e.data.isNewObject.contains(!1) : e.data.isNewObject;
    return e.designer.chartHasEvents && !e.designer.ignoredLabelEditingWarnings.includes(n) && !t
}

function translateObjectType(e) {
    return Array.isArray(e) ? e.map(function (e) {
        return translateObjectType(e)
    }) : d(e)
}

function LockedLabeling(e) {
    var t = e.title,
        a = e.objectType,
        n = e.editable,
        c = e.disabledCaption;
    return React.createElement(React.Fragment, null, n && React.createElement("div", {
        className: "contextual-action"
    }, React.createElement(Button, {
        preset: "icon-caption",
        type: "locked",
        caption: d("edit"),
        onClick: function () {
            return mercator.designer.uiEvents.showLabelEditingWarning(a)
        }
    })), React.createElement("div", {
        className: "title"
    }, t), !n && c && React.createElement("div", {
        className: "text-info"
    }, c))
}
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }
    return function (t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Inspector.Sheets.Misc = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Inspector.InspectorSheet), _createClass(t, [{
        key: "renderContents",
        value: function () {
            var e = mercator.designer.uiEvents,
                t = void 0 === this.props.data.entrance,
                n = this.props.objectType !== mercator.Table.prototype.type || mercator.designer.features.isDisabled(mercator.Features.Type.TABLES_BOOK_AS_A_WHOLE);
            return t && n ? null : React.createElement(React.Fragment, null, React.createElement("div", {
                className: "title"
            }, d("misc")), React.createElement(TextInput, {
                caption: d("entrance"),
                value: this.props.data.entrance,
                onChange: function (t) {
                    return e.setSelectionEntrance(t)
                },
                invisible: t
            }), React.createElement(CheckboxInput, {
                caption: d("bookable-as-a-whole"),
                value: this.props.data.bookAsAWhole,
                onChange: function (t) {
                    e.setSelectionBookAsAWhole(t)
                },
                invisible: n,
                infoTooltip: d("bookable-as-a-whole-table-tooltip")
            }))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var o = 0; o < t.length; o++) {
            var r = t[o];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    return function (t, o, r) {
        return o && e(t.prototype, o), r && e(t, r), t
    }
}(),
    _get = function e(t, o, r) {
        null === t && (t = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(t, o);
        if (void 0 === n) {
            var i = Object.getPrototypeOf(t);
            return null === i ? void 0 : e(i, o, r)
        }
        if ("value" in n) return n.value;
        var s = n.get;
        return void 0 !== s ? s.call(r) : void 0
    };

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Inspector.Sheets.MultiFloor = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Inspector.InspectorSheet), _createClass(t, [{
        key: "shouldComponentUpdate",
        value: function (e) {
            return _get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "shouldComponentUpdate", this).call(this, e) || differentObjectValues(this.props.document, e.document, ["floors"])
        }
    }, {
        key: "renderContents",
        value: function () {
            if (!(this.props.document.floors <= 1)) {
                var e = mercator.designer.uiEvents;
                return React.createElement(React.Fragment, null, React.createElement("div", {
                    className: "title"
                }, d("multifloor-view")), React.createElement(PicturesChoiceInput, {
                    options: [{
                        value: "isometric",
                        label: d("isometric-view"),
                        description: d("isometric-view-description"),
                        imgURL: "designer/isometric-view@2x.png"
                    }, {
                        value: "stage",
                        label: d("stage-view"),
                        description: d("stage-view-description"),
                        imgURL: "designer/stage-view@2x.png"
                    }],
                    value: this.props.data.view,
                    onChange: function (t) {
                        e.setMultiFloorView(t), e.showPreviewDialog()
                    }
                }))
            }
        }
    }]), t
}();
Inspector.Sheets.NoProperties = function (e) {
    mercator.designer.uiEvents;
    return React.createElement("div", {
        className: "InspectorSheet " + (e.highlightFx && "highlight-fx"),
        ref: e.childRef
    }, e.data.toolName && React.createElement("div", {
        className: "title"
    }, d(e.data.toolName)), React.createElement("div", {
        className: "text-info"
    }, d("object-has-no-properties")))
};
Inspector.Sheets.NoSharedProperties = function (e) {
    return React.createElement("div", {
        className: "InspectorSheet full-height " + (e.highlightFx && "highlight-fx"),
        ref: e.childRef
    }, React.createElement("div", {
        className: "text-info"
    }, d("objects-have-no-properties-in-common")))
};
var _createClass = function () {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
        }
    }
    return function (t, i, a) {
        return i && e(t.prototype, i), a && e(t, a), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Inspector.Sheets.ObjectLabeling = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Inspector.InspectorSheet), _createClass(t, [{
        key: "shouldComponentUpdate",
        value: function (e) {
            return differentObjectValues(this.props, e, ["data", "objectType", "highlightFx", "designer"]) || differentObjectValues(this.props.selection, e.selection, ["count"])
        }
    }, {
        key: "getSkipNumerals",
        value: function (e) {
            var t = [];
            return e && (this.props.data.skipI && t.push("I"), this.props.data.skipO && t.push("O"), this.props.data.skipQ && t.push("Q")), t
        }
    }, {
        key: "translateObjectType",
        value: function (e) {
            var t = this;
            return Array.isArray(e) ? e.map(function (e) {
                return t.translateObjectType(e)
            }) : d(e)
        }
    }, {
        key: "determineRowPositionLetter",
        value: function () {
            var e = this.props.data.displayLabel || this.props.data.label;
            return ((Array.isArray(e) ? e[0] : e) || "?").charAt(0)
        }
    }, {
        key: "renderContents",
        value: function () {
            var e = this,
                t = Array.isArray(this.props.objectType) || !this.props.objectType ? "object" : this.props.objectType,
                i = mercator.designer.uiEvents,
                a = mercator.AutoLabeler.getAlgorithmGroup("object").map(function (e) {
                    return {
                        value: e.name,
                        caption: e.text
                    }
                }),
                o = this.props.data.sequence && !Array.isArray(this.props.data.sequence) ? mercator.AutoLabeler.getAlgorithm(this.props.data.sequence).inputNumeral : null,
                n = this.getSkipNumerals(o),
                s = this.props.data.verticalRowLabelDirection && !this.props.data.verticalRowLabelDirection.includes(null),
                r = !this.props.data.rowLabelDisabled,
                l = isLabelingLocked(this.props, t),
                c = this.props.disabled.includes("ObjectLabeling.label"),
                p = this.props.data.displayLabel && this.props.data.caption !== this.props.data.displayLabel || l || c;
            return this.props.selection.count > 1 && isLabelingLocked(this.props, t) ? c ? React.createElement(React.Fragment, null, React.createElement("div", {
                className: "title"
            }, d("object-labeling", {
                object: d(t)
            })), React.createElement(TextInput, {
                caption: d("displayed-label"),
                value: this.props.data.displayLabel,
                placeholder: this.props.data.label,
                onChangePreview: function (e) {
                    return i.previewSelectionObjectDisplayLabel(e)
                },
                onChangeFinal: function (e) {
                    return i.setSelectionObjectDisplayLabel(e)
                },
                infoTooltip: d("displayed-label-tooltip")
            })) : React.createElement(LockedLabeling, {
                title: d("object-labeling", {
                    object: d(t)
                }),
                objectType: t,
                editable: !0
            }) : 1 === this.props.selection.count && void 0 === this.props.data.label ? null : React.createElement(React.Fragment, null, this.props.selection.count > 1 && null !== this.props.data.label && !c && React.createElement("div", {
                className: "contextual-action"
            }, React.createElement(Button, {
                preset: "icon-caption",
                type: "close-light",
                caption: d("clear"),
                onClick: function () {
                    return i.actionClearObjectLabeling(!0)
                }
            })), React.createElement("div", {
                className: "title"
            }, d("object-labeling", {
                object: d(t)
            })), React.createElement(CheckboxInput, {
                caption: d("rowlabel-enabled"),
                value: !this.props.data.rowLabelDisabled,
                onChange: function (e) {
                    return i.setRowLabelDisabled(!e)
                },
                invisible: "row" !== t,
                disabled: c,
                disabledTooltip: c ? d("published-labels-disabled") : void 0,
                disabledTooltipIcon: c ? "restricted" : void 0
            }), React.createElement(TextInput, {
                caption: d("label"),
                value: this.props.data.label,
                onChangePreview: function (e) {
                    return i.previewSelectionObjectLabel(e)
                },
                onChangeFinal: function (e) {
                    return i.setSelectionObjectLabel(e)
                },
                invisible: !r || 1 !== this.props.selection.count || void 0 === this.props.data.label,
                locked: l,
                onLockClicked: function () {
                    return mercator.designer.uiEvents.showLabelEditingWarning(t)
                },
                disabled: c,
                disabledTooltip: c ? d("published-labels-disabled") : void 0,
                disabledTooltipIcon: c ? "restricted" : void 0
            }), React.createElement(Inspector.GUI.DataRow, {
                caption: d("labels"),
                visible: r && this.props.selection.count > 1 && void 0 !== this.props.data.sequence
            }, React.createElement(SelectInput, {
                options: a,
                value: this.props.data.sequence,
                onChange: function (e) {
                    return i.setSelectionObjectLabelingSequence(e)
                },
                disabled: c
            })), React.createElement(UnlockableInspectorInput, {
                caption: d("displayed-label"),
                infoTooltip: d("displayed-label-tooltip"),
                showContents: p,
                invisible: !r || !this.props.data.label && !c
            }, React.createElement(TextInput, {
                caption: d("displayed-label"),
                value: this.props.data.displayLabel,
                placeholder: this.props.data.label,
                onChangePreview: function (e) {
                    return i.previewSelectionObjectDisplayLabel(e)
                },
                onChangeFinal: function (e) {
                    return i.setSelectionObjectDisplayLabel(e)
                },
                infoTooltip: d("displayed-label-tooltip"),
                autoFocus: !p
            })), React.createElement(TextInput, {
                caption: d("prefix"),
                value: this.props.data.prefix,
                onChangePreview: function (e) {
                    return i.setSelectionObjectLabelingPrefix(e, !0)
                },
                onChangeFinal: function (e) {
                    return i.setSelectionObjectLabelingPrefix(e, !1)
                },
                disabled: c,
                invisible: !r || this.props.selection.count <= 1 || void 0 === this.props.data.prefix || !1 === mercator.designer.showPrefixes
            }), React.createElement(NumericInput, {
                caption: d("start-at"),
                value: this.props.data.start,
                min: 1,
                pixelsForStep: 3,
                numeral: o,
                skipNumerals: n,
                onChangePreview: function (e) {
                    return i.setSelectionObjectLabelingStart(e - 1, !0)
                },
                onChangeFinal: function (e) {
                    return i.setSelectionObjectLabelingStart(e - 1, !1)
                },
                disabled: c,
                invisible: !r || this.props.selection.count <= 1 || void 0 === this.props.data.start
            }), React.createElement(Inspector.GUI.DataRow, {
                caption: d("skip"),
                visible: r && void 0 !== this.props.data.sequence && "SimpleLettersUppercase" === this.props.data.sequence && void 0 !== this.props.data.skippableCharacters && this.props.data.skippableCharacters
            }, React.createElement("div", {
                className: "button-switcher"
            }, React.createElement(Button, {
                preset: "switcher-caption",
                caption: "I",
                tooltip: d("label-skip", {
                    letter: "I"
                }),
                selected: this.props.data.skipI,
                onClick: function () {
                    return i.setSelectionObjectLabelingSkipCharacter("I", !e.props.data.skipI)
                },
                disabled: c
            }), React.createElement(Button, {
                preset: "switcher-caption",
                caption: "O",
                tooltip: d("label-skip", {
                    letter: "O"
                }),
                selected: this.props.data.skipO,
                onClick: function () {
                    return i.setSelectionObjectLabelingSkipCharacter("O", !e.props.data.skipO)
                },
                disabled: c
            }), React.createElement(Button, {
                preset: "switcher-caption",
                caption: "Q",
                tooltip: d("label-skip", {
                    letter: "Q"
                }),
                selected: this.props.data.skipQ,
                onClick: function () {
                    return i.setSelectionObjectLabelingSkipCharacter("Q", !e.props.data.skipQ)
                },
                disabled: c
            }))), React.createElement(Inspector.GUI.DataRow, {
                caption: d("direction"),
                visible: r && this.props.selection.count > 1 && void 0 !== this.props.data.sequence
            }, React.createElement(Button, {
                preset: "switcher",
                type: "invert-horizontal",
                caption: d("invert"),
                onClick: function () {
                    return i.actionInvertObjectLabeling()
                },
                disabled: c
            })), React.createElement(Inspector.GUI.DataRow, {
                caption: du("position"),
                visible: r && void 0 !== this.props.data.rowLabelPositionLeft
            }, React.createElement("div", {
                className: "button-row-toggler"
            }, React.createElement(Button, {
                preset: "switcher-caption",
                caption: this.determineRowPositionLetter(),
                tooltip: s ? d("label-position-bottom") : d("label-position-left"),
                selected: this.props.data.rowLabelPositionLeft,
                onClick: function () {
                    return i.setSelectionRowLabelPositionLeft(!e.props.data.rowLabelPositionLeft)
                }
            }), React.createElement(Button, {
                preset: "switcher-caption",
                caption: this.determineRowPositionLetter(),
                tooltip: s ? d("label-position-top") : d("label-position-right"),
                selected: this.props.data.rowLabelPositionRight,
                onClick: function () {
                    return i.setSelectionRowLabelPositionRight(!e.props.data.rowLabelPositionRight)
                }
            }))), React.createElement(TextInput, {
                caption: d("displayObjectType"),
                value: this.translateObjectType(this.props.data.displayObjectType),
                suggestions: mercator.designer.getTranslatedRowDisplayTypeSuggestions(),
                onChange: function (e) {
                    return i.setSelectionRowDisplayObjectType(e)
                },
                invisible: !r || void 0 === this.props.data.displayObjectType
            }), React.createElement(Inspector.GUI.DataRow, {
                caption: d("horizontal-orientation"),
                visible: r && (s || !1)
            }, React.createElement("div", {
                className: "button-switcher baseline-buttons"
            }, React.createElement(Button, {
                preset: "switcher-caption",
                className: "rotate-90ccw",
                caption: this.determineRowPositionLetter(),
                tooltip: "",
                selected: this.props.data.verticalRowLabelDirection && this.props.data.verticalRowLabelDirection.includes("BASELINE_RIGHT"),
                onClick: function () {
                    return i.setVerticalRowLabelDirection("BASELINE_RIGHT")
                }
            }), React.createElement(Button, {
                preset: "switcher-caption",
                className: "rotate-90cw",
                caption: this.determineRowPositionLetter(),
                tooltip: "",
                selected: this.props.data.verticalRowLabelDirection && this.props.data.verticalRowLabelDirection.includes("BASELINE_LEFT"),
                onClick: function () {
                    return i.setVerticalRowLabelDirection("BASELINE_LEFT")
                }
            }))), React.createElement(CheckboxInput, {
                caption: d("visible"),
                value: this.props.data.visible,
                onChange: function (e) {
                    return i.setSelectionLabelVisible(e)
                },
                invisible: !r || void 0 === this.props.data.visible
            }), React.createElement(NumericInput, {
                caption: d("font-size"),
                value: this.props.data.size,
                min: 1,
                max: mercator.ObjectLabel.MAX_LABEL_SIZE,
                unit: "pt",
                onChange: function (e) {
                    return i.setSelectionLabelSize(e)
                },
                invisible: void 0 === this.props.data.size
            }), React.createElement(NumericInput, {
                caption: d("position-x"),
                value: this.props.data.positionX,
                min: -50,
                max: 50,
                unit: "%",
                onChange: function (e) {
                    return i.setSelectionLabelPositionX(e)
                },
                invisible: void 0 === this.props.data.positionX
            }), React.createElement(NumericInput, {
                caption: d("position-y"),
                value: this.props.data.positionY,
                min: -50,
                max: 50,
                unit: "%",
                onChange: function (e) {
                    return i.setSelectionLabelPositionY(e)
                },
                invisible: void 0 === this.props.data.positionY
            }))
        }
    }]), t
}();
Inspector.Sheets.RectangularTable = function (t) {
    var e = mercator.designer.uiEvents,
        a = function () {
            return t.data.chairsTop + t.data.chairsBottom + t.data.chairsLeft + t.data.chairsRight > 0 ? 0 : 1
        };
    return React.createElement("div", {
        className: "InspectorSheet " + (t.highlightFx && "highlight-fx"),
        ref: t.childRef
    }, React.createElement("div", {
        className: "title"
    }, d("table-rectangle")), React.createElement(NumericInput, {
        caption: d("up"),
        value: t.data.chairsTop,
        min: Math.max(t.data.minChairsTop, a()),
        max: 50,
        pixelsForStep: 2,
        unit: dl("chairs"),
        onChange: function (t) {
            return e.setSelectionTableChairs(t, "top")
        }
    }), React.createElement(NumericInput, {
        caption: d("down"),
        value: t.data.chairsBottom,
        min: Math.max(t.data.minChairsBottom, a()),
        max: 50,
        pixelsForStep: 2,
        unit: dl("chairs"),
        onChange: function (t) {
            return e.setSelectionTableChairs(t, "bottom")
        }
    }), React.createElement(NumericInput, {
        caption: d("left"),
        value: t.data.chairsLeft,
        min: Math.max(t.data.minChairsLeft, a()),
        max: 50,
        pixelsForStep: 2,
        unit: dl("chairs"),
        onChange: function (t) {
            return e.setSelectionTableChairs(t, "left")
        }
    }), React.createElement(NumericInput, {
        caption: d("right"),
        value: t.data.chairsRight,
        min: Math.max(t.data.minChairsRight, a()),
        max: 50,
        pixelsForStep: 2,
        unit: dl("chairs"),
        onChange: function (t) {
            return e.setSelectionTableChairs(t, "right")
        }
    }))
};
var _createClass = function () {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t
    }
}(),
    _get = function e(t, r, n) {
        null === t && (t = Function.prototype);
        var o = Object.getOwnPropertyDescriptor(t, r);
        if (void 0 === o) {
            var a = Object.getPrototypeOf(t);
            return null === a ? void 0 : e(a, r, n)
        }
        if ("value" in o) return o.value;
        var i = o.get;
        return void 0 !== i ? i.call(n) : void 0
    };

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Inspector.Sheets.ReferenceChart = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Inspector.InspectorSheet), _createClass(t, [{
        key: "shouldComponentUpdate",
        value: function (e) {
            return _get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "shouldComponentUpdate", this).call(this, e) || differentObjectValues(this.props, e, ["busyIndicators"])
        }
    }, {
        key: "renderContents",
        value: function () {
            var e = mercator.designer.features.isDisabled(mercator.Features.Type.REFERENCE_CHART);
            if (!this.props.data.url && e) return null;
            var t = mercator.designer.uiEvents;
            return React.createElement(React.Fragment, null, this.props.data.url && !e && React.createElement("div", {
                className: "contextual-action"
            }, React.createElement(Button, {
                preset: "icon-caption",
                type: "calibrate",
                caption: d("recalibrate"),
                onClick: function () {
                    return t.openReferenceChartDialog()
                }
            })), React.createElement("div", {
                className: "title"
            }, d("reference-chart")), React.createElement(ImageInput, {
                url: this.props.data.url,
                uploading: this.props.busyIndicators.includes("referenceChartUpload") || this.props.busyIndicators.includes("referenceChartImage"),
                onSet: function (e) {
                    return t.setReferenceChartImage(e)
                },
                onRemove: function () {
                    return t.removeReferenceChartImage()
                },
                mimeTypes: ["image/png", "image/gif", "image/jpeg", "application/pdf"],
                maxFilesizeMB: mercator.ReferenceChart.MAX_UPLOAD_FILESIZE_MB,
                disabled: e
            }), !this.props.data.url && React.createElement("div", {
                className: "text-info"
            }, d("reference-chart-hint")), React.createElement(CheckboxInput, {
                caption: d("visible"),
                value: this.props.data.visible,
                onChange: function (e) {
                    return t.setReferenceChartVisible(e)
                },
                invisible: !this.props.data.url,
                keyHint: buildShortcut([META_KEY, "E"])
            }), React.createElement(PressAndHoldInput, {
                caption: d("show-above"),
                value: this.props.data.showAbove,
                onPress: function () {
                    return t.setReferenceChartShowAbove(!0)
                },
                onRelease: function () {
                    return t.setReferenceChartShowAbove(!1)
                },
                invisible: !this.props.data.url,
                keyHint: buildShortcut(["W"])
            }))
        }
    }]), t
}();
Inspector.Sheets.RoundTable = function (e) {
    var a = mercator.designer.uiEvents;
    return React.createElement("div", {
        className: "InspectorSheet " + (e.highlightFx && "highlight-fx"),
        ref: e.childRef
    }, React.createElement("div", {
        className: "title"
    }, d("table-round")), React.createElement(NumericInput, {
        caption: d("chairs"),
        value: e.data.chairs,
        min: e.data.minChairs,
        max: 50,
        pixelsForStep: 2,
        unit: dl("chairs"),
        onChange: function (e) {
            return a.setSelectionTableChairs(e)
        },
        invisible: void 0 === e.data.chairs
    }), React.createElement(NumericInput, {
        caption: d("open-spaces"),
        value: e.data.openSpaces,
        min: 0,
        max: 20,
        pixelsForStep: 2,
        unit: dl("spaces"),
        onChange: function (e) {
            return a.setSelectionTableOpenSpaces(e)
        },
        invisible: void 0 === e.data.openSpaces
    }), React.createElement(Inspector.GUI.DataRow, {
        caption: d("automatic-radius"),
        visible: void 0 !== e.data.radius
    }), React.createElement(CheckboxInput, {
        caption: d("automatic-radius"),
        value: e.data.autoRadius,
        onChange: function (e) {
            return a.setSelectionTableAutoRadius(e)
        },
        invisible: void 0 === e.data.radius
    }), React.createElement(NumericInput, {
        caption: d("radius"),
        value: e.data.radius,
        min: 10,
        max: 200,
        unit: "pt",
        onChange: function (e) {
            return a.setSelectionTableRadius(e)
        },
        invisible: void 0 === e.data.radius || e.data.autoRadius
    }))
};
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }
    return function (t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Inspector.Sheets.Row = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Inspector.InspectorSheet), _createClass(t, [{
        key: "shouldComponentUpdate",
        value: function (e) {
            return differentObjectValues(this.props, e, ["data", "objectType", "highlightFx"]) || differentObjectValues(this.props.selection, e.selection, ["count", "rowSpacing"])
        }
    }, {
        key: "renderContents",
        value: function () {
            var e = mercator.designer.uiEvents;
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "title"
            }, d("row")), React.createElement(NumericInput, {
                caption: d("seat-count"),
                value: this.props.data.seatCount,
                step: 1,
                pixelsForStep: 2,
                min: this.props.data.minSeatCount,
                max: this.props.data.maxSeatCount,
                onChange: function (t) {
                    return e.setSelectionRowSeatCount(t)
                },
                invisible: !this.props.selection.info.canSeatCountBeEdited
            }), React.createElement(NumericInput, {
                caption: d("curve"),
                value: this.props.data.curve,
                min: -30,
                max: 30,
                pixelsForStep: 2,
                onChangePreview: function (t) {
                    return e.previewSelectionRowCurve(t)
                },
                onChangeFinal: function (t) {
                    return e.setSelectionRowCurve(t)
                },
                invisible: !this.props.selection.info.canBeCurved
            }), React.createElement(CheckboxInput, {
                caption: d("smoothing"),
                value: this.props.data.smooth,
                onChange: function (t) {
                    return e.setSelectionSmooth(t)
                },
                invisible: !this.props.selection.info.canBeSmoothened
            }), React.createElement(SliderInput, {
                caption: d("tension"),
                value: this.props.data.smoothness,
                min: 1,
                max: 100,
                step: 1,
                unit: "%",
                onChangePreview: function (t) {
                    return e.previewSelectionSmoothness(t)
                },
                onChangeFinal: function (t) {
                    return e.setSelectionSmoothness(t)
                },
                invisible: !this.props.data.smooth
            }), React.createElement(NumericInput, {
                caption: d("row-spacing"),
                value: this.props.selection.rowSpacing,
                min: mercator.Row.MIN_SPACING,
                max: mercator.Row.MAX_SPACING,
                step: .1,
                roundPrecision: 1,
                unit: "pt",
                onChange: function (t) {
                    return e.setSelectionRowSpacing(t)
                },
                invisible: this.props.selection.count < 2 || "row" !== this.props.objectType || this.props.selection.rowSpacing < 0
            }), React.createElement(NumericInput, {
                caption: d("seat-spacing"),
                value: this.props.data.chairSpacing,
                min: mercator.Row.MIN_CHAIR_SPACING,
                max: mercator.Row.MAX_CHAIR_SPACING,
                step: .1,
                roundPrecision: 1,
                unit: "pt",
                onChange: function (t) {
                    return e.setSelectionRowChairSpacing(t)
                },
                invisible: !this.props.selection.info.canChairSpacingBeEdited
            }))
        }
    }]), t
}();
Inspector.Sheets.RowDrawing = function (e) {
    var t = mercator.designer.uiEvents;
    return React.createElement("div", {
        className: "InspectorSheet " + (e.highlightFx && "highlight-fx"),
        ref: e.childRef
    }, React.createElement("div", {
        className: "title"
    }, d("tool-tool", {
        tool: d("row")
    })), React.createElement(NumericInput, {
        caption: d("row-spacing"),
        value: e.data.spacing,
        min: mercator.Row.MIN_SPACING,
        max: mercator.Row.MAX_SPACING,
        step: .1,
        roundPrecision: 1,
        unit: "pt",
        onChange: function (e) {
            return t.setRowSpacing(e)
        }
    }), React.createElement(NumericInput, {
        caption: d("seat-spacing"),
        value: e.data.chairSpacing,
        previewValue: e.data.chairSpacingPreview,
        min: mercator.Row.MIN_CHAIR_SPACING,
        max: mercator.Row.MAX_CHAIR_SPACING,
        step: .1,
        roundPrecision: 1,
        unit: "pt",
        onChange: function (e) {
            return t.setRowChairSpacing(e)
        }
    }), React.createElement(Inspector.GUI.DataRow, {
        caption: d("block-style"),
        visible: void 0 !== e.data.rowBlockStyle
    }, React.createElement("div", {
        className: "button-switcher"
    }, React.createElement(Button, {
        preset: "switcher",
        type: "row-multiple",
        caption: d("row-multiple"),
        selected: "normal" === e.data.rowBlockStyle,
        onClick: function () {
            return t.setRowBlockStyle("normal")
        }
    }), React.createElement(Button, {
        preset: "switcher",
        type: "row-intertwined",
        caption: d("row-intertwined"),
        selected: "intertwined" === e.data.rowBlockStyle,
        onClick: function () {
            return t.setRowBlockStyle("intertwined")
        }
    }))))
};
Inspector.Sheets.Seat = function (e) {
    var a = mercator.designer.uiEvents;
    return React.createElement("div", {
        className: "InspectorSheet " + (e.highlightFx && "highlight-fx"),
        ref: e.childRef
    }, React.createElement("div", {
        className: "title"
    }, d("seat")), React.createElement(CheckboxInput, {
        caption: d("restricted-view"),
        value: e.data.restrictedView,
        onChange: function (e) {
            return a.setSelectionRestrictedView(e)
        },
        invisible: void 0 === e.data.restrictedView
    }), React.createElement(CheckboxInput, {
        caption: d("accessible"),
        infoTooltip: e.data.accessibleByCategory && d("accessible-disabled-because-disabled-category"),
        disabled: e.data.accessibleByCategory,
        value: e.data.accessibleByCategory || e.data.accessible,
        onChange: function (t) {
            a.setAccessible(t), t && e.data.companionSeat && a.setCompanionSeat(!1)
        },
        invisible: void 0 === e.data.accessible
    }), React.createElement(CheckboxInput, {
        caption: d("companion-seat"),
        infoTooltip: e.data.accessibleByCategory && d("companion-seat-disabled-because-disabled-category"),
        disabled: e.data.accessibleByCategory,
        value: e.data.companionSeat,
        onChange: function (t) {
            t && e.data.accessible && a.setAccessible(!1), a.setCompanionSeat(t)
        },
        invisible: void 0 === e.data.accessible
    }), React.createElement(CheckboxInput, {
        caption: d("disabled-by-social-distancing-rules"),
        value: e.data.disabledBySocialDistancingRules,
        onChange: function (e) {
            return a.setDisabledBySocialDistancingRules(e)
        },
        invisible: !e.designer.shouldShowLegacySocialDistancingCheckbox || void 0 === e.data.disabledBySocialDistancingRules
    }))
};
var _createClass = function () {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var n = t[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    return function (t, a, n) {
        return a && e(t.prototype, a), n && e(t, n), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Inspector.Sheets.SeatLabeling = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Inspector.InspectorSheet), _createClass(t, [{
        key: "shouldComponentUpdate",
        value: function (e) {
            return differentObjectValues(this.props, e, ["data", "highlightFx", "designer"]) || differentObjectValues(this.props.selection, e.selection, ["count", "subCount", "longestSubCount"])
        }
    }, {
        key: "renderContents",
        value: function () {
            return "string" == typeof this.props.data.label && 1 === this.props.selection.subCount ? this.singleSeatSelected() : 0 === this.props.selection.count && this.props.selection.subCount > 1 ? this.multipleSeatsSelected() : this.props.selection.count > 0 ? this.multipleRowsSelected() : null
        }
    }, {
        key: "multipleSeatsSelected",
        value: function () {
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "title"
            }, d("object-labeling", {
                object: d("seat")
            })), React.createElement(React.Fragment, null, this.seatDisplayObjectType()))
        }
    }, {
        key: "multipleRowsSelected",
        value: function () {
            var e = this;
            if (isLabelingLocked(this.props, "seat")) return React.createElement(LockedLabeling, {
                title: d("object-labeling", {
                    object: d("seat")
                }),
                objectType: "seat",
                editable: !this.props.disabled.includes("SeatLabeling"),
                disabledCaption: d("published-labels-disabled")
            });
            var t = mercator.designer.uiEvents,
                a = mercator.AutoLabeler.getAlgorithmGroup("seat").map(function (e) {
                    return {
                        value: e.name,
                        caption: e.text
                    }
                }),
                n = this.props.data.sequence && !Array.isArray(this.props.data.sequence) ? mercator.AutoLabeler.getAlgorithm(this.props.data.sequence).inputNumeral : null,
                i = void 0 !== this.props.data.sequence && null !== this.props.data.sequence && !Array.isArray(this.props.data.sequence),
                s = this.props.disabled.includes("SeatLabeling.label");
            return React.createElement(React.Fragment, null, this.props.data.label && (this.props.data.label.length > 1 || null !== this.props.data.label[0]) && !s && React.createElement("div", {
                className: "contextual-action"
            }, React.createElement(Button, {
                preset: "icon-caption",
                type: "close-light",
                caption: d("clear"),
                onClick: function () {
                    return t.actionClearSeatLabeling(!0)
                }
            })), React.createElement("div", {
                className: "title"
            }, d("object-labeling", {
                object: d("seat")
            })), React.createElement(Inspector.GUI.DataRow, {
                caption: d("labels"),
                visible: void 0 !== this.props.data.sequence
            }, React.createElement(SelectInput, {
                options: a,
                value: this.props.data.sequence,
                onChange: function (e) {
                    return t.setSelectionSeatLabelingSequence(e)
                },
                disabled: s
            })), i && React.createElement(React.Fragment, null, React.createElement(Inspector.GUI.SelectableDataRow, {
                options: ["start-at", "end-at"],
                value: this.props.data.useEndAt ? "end-at" : "start-at",
                onChange: function (e) {
                    return t.setSelectionSeatLabelingEndAt(e)
                },
                visible: void 0 !== this.props.data.start,
                disabled: s
            }, React.createElement(NumericInput, {
                value: this.props.data.start,
                min: mercator.AutoLabeler.getAlgorithmMinValue(this.props.data.sequence, this.props.data.useEndAt, this.props.selection.longestSubCount),
                pixelsForStep: 3,
                numeral: n,
                onChangePreview: function (e) {
                    return t.setSelectionSeatLabelingStart(e - 1, !0)
                },
                onChangeFinal: function (e) {
                    return t.setSelectionSeatLabelingStart(e - 1, !1)
                },
                invisible: void 0 === this.props.data.start,
                disabled: s
            })), React.createElement(Inspector.GUI.DataRow, {
                caption: d("direction"),
                key: "direction"
            }, React.createElement("div", {
                className: "button-options"
            }, React.createElement(Button, {
                preset: "inspector-icon",
                type: "invert-horizontal",
                caption: d("reverse"),
                size: 14,
                onClick: function () {
                    return t.setSelectionSeatLabelingInverted(!e.props.data.inverted)
                },
                invisible: this.props.selection.count > 1,
                disabled: s
            }), React.createElement(Button, {
                preset: "inspector-icon",
                type: "arrow-light-left",
                size: 14,
                onClick: function () {
                    return t.setSelectionSeatLabelingInverted(!0)
                },
                invisible: this.props.selection.count <= 1,
                disabled: s
            }), React.createElement(Button, {
                preset: "inspector-icon",
                type: "arrow-light-right",
                size: 14,
                onClick: function () {
                    return t.setSelectionSeatLabelingInverted(!1)
                },
                invisible: this.props.selection.count <= 1,
                disabled: s
            })))), React.createElement(React.Fragment, null, this.seatDisplayObjectType()))
        }
    }, {
        key: "singleSeatSelected",
        value: function () {
            var e = mercator.designer.uiEvents,
                t = isLabelingLocked(this.props, "seat"),
                a = this.props.disabled.includes("SeatLabeling.label"),
                n = this.props.data.displayLabel && this.props.data.caption !== this.props.data.displayLabel || t || a;
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "title"
            }, d("object-label", {
                object: d("seat")
            })), React.createElement(TextInput, {
                caption: d("label"),
                value: this.props.data.label,
                onChangePreview: function (t) {
                    return e.previewSelectionObjectLabel(t)
                },
                onChangeFinal: function (t) {
                    return e.setSelectionObjectLabel(t)
                },
                disabled: a,
                locked: t,
                onLockClicked: function () {
                    return mercator.designer.uiEvents.showLabelEditingWarning("seat")
                },
                disabledTooltip: a ? d("published-labels-disabled") : void 0,
                disabledTooltipIcon: a ? "restricted" : void 0
            }), React.createElement(UnlockableInspectorInput, {
                caption: d("displayed-label"),
                infoTooltip: d("displayed-label-tooltip"),
                showContents: n,
                invisible: !this.props.data.label && !a
            }, React.createElement(TextInput, {
                caption: d("displayed-label"),
                value: this.props.data.displayLabel,
                placeholder: this.props.data.label,
                onChangePreview: function (t) {
                    return e.previewSelectionObjectDisplayLabel(t)
                },
                onChangeFinal: function (t) {
                    return e.setSelectionObjectDisplayLabel(t)
                },
                infoTooltip: d("displayed-label-tooltip"),
                autoFocus: !n
            })), this.seatDisplayObjectType())
        }
    }, {
        key: "seatDisplayObjectType",
        value: function () {
            return React.createElement(TextInput, {
                caption: d("displayObjectType"),
                value: translateObjectType(this.props.data.displayObjectType),
                suggestions: mercator.designer.getTranslatedSeatDisplayTypeSuggestions(),
                onChange: function (e) {
                    return mercator.designer.uiEvents.setSelectionSeatDisplayObjectType(e)
                },
                emptyValue: d(mercator.Chair.DEFAULT_DISPLAY_OBJECT_TYPE)
            })
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }
    return function (t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t
    }
}(),
    _get = function e(t, n, o) {
        null === t && (t = Function.prototype);
        var r = Object.getOwnPropertyDescriptor(t, n);
        if (void 0 === r) {
            var a = Object.getPrototypeOf(t);
            return null === a ? void 0 : e(a, n, o)
        }
        if ("value" in r) return r.value;
        var i = r.get;
        return void 0 !== i ? i.call(o) : void 0
    };

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Inspector.Sheets.SectionInfo = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Inspector.InspectorSheet), _createClass(t, [{
        key: "shouldComponentUpdate",
        value: function (e) {
            return _get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "shouldComponentUpdate", this).call(this, e) || differentObjectValues(this.props, e, ["uiState"])
        }
    }, {
        key: "renderClassName",
        value: function () {
            return _get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "renderClassName", this).call(this) + " wide " + (!mercator.designer.showLegacySectionScaling && "bottom-to-edge")
        }
    }, {
        key: "renderContents",
        value: function () {
            var e = mercator.designer.uiEvents;
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "title"
            }, this.props.data.name ? d("section-section", {
                section: this.props.data.name
            }) : d("unlabeled-object", {
                object: d("section")
            })), Inspector.Sheets.ChartInfo.getChartStats(this.props.data, this.props.uiState, !1, !1, !0), mercator.designer.showLegacySectionScaling && React.createElement(NumericInput, {
                caption: d("sections-scaling"),
                value: this.props.data.sectionScale,
                min: 20,
                max: 500,
                unit: "%",
                onChange: function (t) {
                    return e.setSectionScale(t)
                }
            }))
        }
    }]), t
}();
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }
    return function (t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Inspector.Sheets.SectionLabeling = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Inspector.InspectorSheet), _createClass(t, [{
        key: "renderContents",
        value: function () {
            var e = mercator.designer.uiEvents;
            if (void 0 === this.props.data.sectionLabel || mercator.designer.features.isDisabled(mercator.Features.Type.OBJECT_SECTION_LABELS)) return null;
            var t = isLabelingLocked(this.props, "section"),
                n = this.props.disabled.includes("SectionLabeling.sectionLabel"),
                o = this.props.data.displayLabel && this.props.data.caption !== this.props.data.displayLabel || t || n;
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "title"
            }, d("object-labeling", {
                object: d("section")
            })), React.createElement(TextInput, {
                caption: d("object-label", {
                    object: d("section")
                }),
                value: this.props.data.sectionLabel,
                onChangePreview: function (t) {
                    return e.setSelectionSectionLabel(t, !0)
                },
                onChangeFinal: function (t) {
                    return e.setSelectionSectionLabel(t, !1)
                },
                disabled: n,
                locked: t,
                onLockClicked: function () {
                    return mercator.designer.uiEvents.showLabelEditingWarning("section")
                },
                disabledTooltip: n ? d("published-labels-disabled") : void 0,
                disabledTooltipIcon: n ? "restricted" : void 0
            }), React.createElement(UnlockableInspectorInput, {
                caption: d("displayed-label"),
                infoTooltip: d("displayed-label-tooltip"),
                showContents: o,
                invisible: !this.props.data.sectionLabel && !n
            }, React.createElement(TextInput, {
                caption: d("displayed-label"),
                value: this.props.data.sectionDisplayedLabel,
                placeholder: this.props.data.sectionLabel,
                onChangePreview: function (t) {
                    return e.setSelectionSectionDisplayedLabel(t, !0)
                },
                onChangeFinal: function (t) {
                    return e.setSelectionSectionDisplayedLabel(t, !1)
                },
                infoTooltip: d("displayed-label-tooltip"),
                autoFocus: !o
            })))
        }
    }]), t
}();
var _createClass = function () {
    function t(t, e) {
        for (var o = 0; o < e.length; o++) {
            var n = e[o];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
    }
    return function (e, o, n) {
        return o && t(e.prototype, o), n && t(e, n), e
    }
}();

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e
}

function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
}
Inspector.Sheets.Shape = function (t) {
    function e() {
        return _classCallCheck(this, e), _possibleConstructorReturn(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
    }
    return _inherits(e, Inspector.InspectorSheet), _createClass(e, [{
        key: "renderContents",
        value: function () {
            var t = mercator.designer.uiEvents;
            return React.createElement(React.Fragment, null, React.createElement("div", {
                className: "title"
            }, d("shape")), React.createElement(NumericInput, {
                caption: d("width"),
                value: this.props.data.width,
                min: 1,
                max: 5e3,
                unit: "pt",
                step: 2,
                onChange: function (e) {
                    return t.setSelectionWidth(e)
                },
                invisible: void 0 === this.props.data.width
            }), React.createElement(NumericInput, {
                caption: d("height"),
                value: this.props.data.height,
                min: 1,
                max: 5e3,
                unit: "pt",
                step: 2,
                onChange: function (e) {
                    return t.setSelectionHeight(e)
                },
                invisible: void 0 === this.props.data.height
            }), React.createElement(NumericInput, {
                caption: d("scale"),
                value: this.props.data.scale,
                min: 1,
                max: 1e3,
                unit: "%",
                onChange: function (e) {
                    return t.setSelectionScale(e)
                },
                invisible: void 0 === this.props.data.scale
            }), React.createElement(NumericInput, {
                caption: d("rotation"),
                value: this.props.data.rotation,
                min: 0,
                max: 360,
                wrapsAround: !0,
                unit: "º",
                onChangePreview: function (e) {
                    return t.setSelectionRotationPreview(e)
                },
                onChangeFinal: function (e) {
                    return t.setSelectionRotation(e)
                },
                invisible: void 0 === this.props.data.rotation || null === this.props.data.rotation
            }), React.createElement(NumericInput, {
                caption: d("opacity"),
                value: this.props.data.opacity,
                min: 1,
                max: 100,
                unit: "%",
                onChange: function (e) {
                    return t.setSelectionOpacity(e)
                },
                invisible: void 0 === this.props.data.opacity
            }), React.createElement(NumericInput, {
                caption: d("corner-radius"),
                value: this.props.data.cornerRadius,
                min: 0,
                max: 100,
                unit: "pt",
                onChange: function (e) {
                    return t.setSelectionCornerRadius(e)
                },
                invisible: void 0 === this.props.data.cornerRadius
            }), React.createElement(Inspector.GUI.DataRow, {
                caption: d("fill-color"),
                visible: void 0 !== this.props.data.fillColor
            }, React.createElement(ColorInput, {
                value: this.props.data.fillColor,
                paletteSet: "shape",
                onChange: function (e) {
                    return t.setSelectionFillColor(e)
                },
                opacity: !0
            })), React.createElement(Inspector.GUI.DataRow, {
                caption: d("automatic-stroke"),
                visible: void 0 !== this.props.data.autoStroke
            }), React.createElement(CheckboxInput, {
                caption: d("automatic-stroke"),
                value: this.props.data.autoStroke,
                onChange: function (e) {
                    return t.setSelectionAutoStroke(e)
                },
                invisible: void 0 === this.props.data.autoStroke
            }), React.createElement(NumericInput, {
                caption: d("stroke-width"),
                value: this.props.data.strokeWidth,
                min: 0,
                max: 20,
                pixelsForStep: 3,
                unit: "pt",
                onChange: function (e) {
                    return t.setSelectionStrokeWidth(e)
                },
                invisible: void 0 === this.props.data.strokeWidth || this.props.data.autoStroke
            }), React.createElement(Inspector.GUI.DataRow, {
                caption: d("stroke-color"),
                visible: this.props.data.strokeWidth > 0 && void 0 !== this.props.data.strokeColor && !this.props.data.autoStroke
            }, React.createElement(ColorInput, {
                value: this.props.data.strokeColor,
                paletteSet: "shape",
                onChange: function (e) {
                    return t.setSelectionStrokeColor(e)
                },
                opacity: !0
            })), React.createElement(Inspector.GUI.DataRow, {
                caption: d("order"),
                visible: void 0 !== this.props.data.foreground
            }, React.createElement("div", {
                className: "button-switcher"
            }, React.createElement(Button, {
                preset: "switcher",
                type: "to-background",
                caption: d("background"),
                selected: !this.props.data.foreground,
                onClick: function () {
                    return t.setSelectionForeground(!1)
                }
            }), React.createElement(Button, {
                preset: "switcher",
                type: "to-foreground",
                caption: d("foreground"),
                selected: this.props.data.foreground,
                onClick: function () {
                    return t.setSelectionForeground(!0)
                }
            }))))
        }
    }]), e
}();
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
        }
    }
    return function (t, n, a) {
        return n && e(t.prototype, n), a && e(t, a), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Inspector.Sheets.SmartLabel = function (e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return _inherits(t, Inspector.InspectorSheet), _createClass(t, [{
        key: "shouldComponentUpdate",
        value: function (e) {
            return differentObjectValues(this.props, e, ["data", "objectType", "highlightFx"]) || differentObjectValues(this.props.selection, e.selection, ["count"])
        }
    }, {
        key: "render",
        value: function () {
            var e = mercator.designer.uiEvents,
                t = this.props;
            return React.createElement("div", {
                className: "InspectorSheet " + (t.highlightFx && "highlight-fx"),
                ref: t.childRef
            }, React.createElement("div", {
                className: "title"
            }, d("label")), React.createElement(Inspector.GUI.DataRow, {
                caption: d("type")
            }, React.createElement(SelectInput, {
                options: mercator.ShapedObject.SMART_TYPES,
                value: t.data.smartType,
                onChange: function (t) {
                    return e.setSelectionSmartType(t)
                }
            })), React.createElement(Inspector.GUI.DataRow, {
                caption: d("variation"),
                visible: !!mercator.ShapedObject.SMART_TYPES_VARIATIONS[t.data.smartType]
            }, React.createElement(SelectInput, {
                options: mercator.ShapedObject.SMART_TYPES_VARIATIONS[t.data.smartType],
                value: t.data.smartTypeVariation,
                onChange: function (t) {
                    return e.setSelectionSmartTypeVariation(t)
                }
            })), React.createElement(TextInput, {
                caption: d("caption"),
                value: t.data.caption !== d(t.data.smartType) ? t.data.caption : "",
                placeholder: t.data.caption === d(t.data.smartType) ? t.data.caption : null,
                expanded: !0,
                onChange: function (t) {
                    return e.setSelectionLabelCaption(t)
                }
            }), React.createElement(NumericInput, {
                caption: d("font-size"),
                value: t.data.size,
                min: 1,
                max: mercator.ObjectLabel.MAX_LABEL_SIZE,
                unit: "pt",
                onChange: function (t) {
                    return e.setSelectionLabelSize(t)
                },
                invisible: void 0 === t.data.size
            }), React.createElement(NumericInput, {
                caption: d("rotation"),
                value: t.data.rotation,
                min: 0,
                max: 360,
                wrapsAround: !0,
                unit: "º",
                onChange: function (t) {
                    return e.setSelectionLabelRotation(t)
                },
                invisible: void 0 === t.data.rotation
            }), React.createElement(NumericInput, {
                caption: d("position-x"),
                value: t.data.positionX,
                min: -50,
                max: 50,
                unit: "%",
                onChange: function (t) {
                    return e.setSelectionLabelPositionX(t)
                },
                invisible: void 0 === t.data.positionX
            }), React.createElement(NumericInput, {
                caption: d("position-y"),
                value: t.data.positionY,
                min: -50,
                max: 50,
                unit: "%",
                onChange: function (t) {
                    return e.setSelectionLabelPositionY(t)
                },
                invisible: void 0 === t.data.positionY
            }))
        }
    }]), t
}();
Inspector.Sheets.SubChart = function (e) {
    var t = mercator.designer.uiEvents,
        a = e.data.totalPeopleCapacity,
        n = e.data.totalBooths,
        c = a > 0 || n > 0;
    return React.createElement("div", {
        className: "InspectorSheet wide bottom-to-edge",
        ref: e.childRef
    }, !Array.isArray(e.data.uuid) && React.createElement("div", {
        className: "contextual-action"
    }, React.createElement(Button, {
        preset: "icon-caption",
        type: "edit",
        caption: d("edit-contents"),
        onClick: function () {
            return t.enterSectionByUuid(e.data.uuid)
        }
    })), React.createElement("div", {
        className: "title"
    }, d("section")), c ? [React.createElement(Inspector.GUI.StatusInfo, {
        key: "seats",
        icon: "seats",
        value: a,
        caption: d("places", {
            smart_count: a
        }),
        visible: a > 0
    }), React.createElement(Inspector.GUI.StatusInfo, {
        key: "booths",
        icon: "booths",
        value: n,
        caption: d("booths", {
            smart_count: n
        }),
        visible: n > 0
    })] : React.createElement("div", {
        className: "text-info",
        style: {
            padding: "5px 0 13px"
        }
    }, d("container-is-empty", {
        container: dl("section")
    })))
};
Inspector.Sheets.Text = function (t) {
    var e = mercator.designer.uiEvents;
    return React.createElement("div", {
        className: "InspectorSheet " + (t.highlightFx && "highlight-fx"),
        ref: t.childRef
    }, React.createElement("div", {
        className: "title"
    }, d("text")), React.createElement(TextInput, {
        caption: d("caption"),
        value: t.data.caption,
        onChange: function (t) {
            return e.setSelectionTextCaption(t)
        },
        invisible: void 0 === t.data.caption,
        expanded: !0,
        autoFocus: !Array.isArray(t.data.caption)
    }), React.createElement(NumericInput, {
        caption: d("font-size"),
        value: t.data.size,
        min: 6,
        max: mercator.ObjectLabel.MAX_LABEL_SIZE,
        unit: "pt",
        onChange: function (t) {
            return e.setSelectionTextSize(t)
        }
    }), React.createElement(Inspector.GUI.DataRow, {
        caption: d("text-color"),
        visible: void 0 !== t.data.color
    }, React.createElement(ColorInput, {
        value: t.data.color,
        paletteSet: "text",
        onChange: function (t) {
            return e.setSelectionTextColor(t)
        },
        opacity: !0
    })), React.createElement(Inspector.GUI.DataRow, {
        caption: d("style")
    }, React.createElement("div", {
        className: "button-options"
    }, React.createElement(Button, {
        preset: "inspector-icon",
        type: "bold",
        caption: d("bold"),
        selected: t.data.bold,
        onClick: function () {
            return e.setTextBold(!t.data.bold)
        }
    }), React.createElement(Button, {
        preset: "inspector-icon",
        type: "italic",
        caption: d("italic"),
        selected: t.data.italic,
        onClick: function () {
            return e.setTextItalic(!t.data.italic)
        }
    }))))
};
var _createClass = function () {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var o = n[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }
    return function (n, t, o) {
        return t && e(n.prototype, t), o && e(n, o), n
    }
}();

function _classCallCheck(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, n) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !n || "object" != typeof n && "function" != typeof n ? e : n
}

function _inherits(e, n) {
    if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + typeof n);
    e.prototype = Object.create(n && n.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n)
}
Inspector.Sheets.Transform = function (e) {
    function n() {
        return _classCallCheck(this, n), _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments))
    }
    return _inherits(n, React.Component), _createClass(n, [{
        key: "previewScaling",
        value: function (e) {
            mercator.designer.uiEvents.previewPolygonScale(e)
        }
    }, {
        key: "endScaling",
        value: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            e && mercator.designer.uiEvents.applyPolygonScale(e), mercator.designer.uiEvents.endPreviewPolygonScale()
        }
    }, {
        key: "onChangeSmoothingPreview",
        value: function (e) {
            mercator.designer.uiEvents.previewCutoffAngleRate(percentToNumberInRange(e, 180, 90))
        }
    }, {
        key: "onChangeSmoothingFinal",
        value: function (e) {
            mercator.designer.uiEvents.setCutoffAngleRate(percentToNumberInRange(e, 180, 90))
        }
    }, {
        key: "render",
        value: function () {
            var e = this,
                n = this.props.objectType.includes("section"),
                t = this.props.designer.disabledFeatures.includes(mercator.Features.Type.SECTIONS),
                o = 100 !== mercator.designer.sectionScaleFactor,
                i = n && (t || o);
            return React.createElement("div", {
                className: "InspectorSheet",
                ref: this.props.childRef
            }, React.createElement("div", {
                className: "title"
            }, d("transform")), !i && React.createElement(SliderInput, {
                caption: d("scale"),
                value: 100,
                min: 25,
                max: 200,
                step: 2,
                unit: "%",
                resetOnChangeFinal: !0,
                onChangePreview: function (n) {
                    return e.previewScaling(n)
                },
                onChangeFinal: function (n) {
                    return e.endScaling(n)
                },
                onCancel: function () {
                    return e.endScaling(100)
                }
            }), React.createElement(SliderInput, {
                caption: d("smoothing"),
                value: numberInRangeToPercent(this.props.data.cutoffAngle, 180, 90),
                min: 0,
                max: 100,
                step: 25,
                unit: "%",
                onChangePreview: _.debounce(this.onChangeSmoothingPreview, 30, {
                    maxWait: 100,
                    leading: !0,
                    trailing: !1
                }),
                onChangeFinal: this.onChangeSmoothingFinal
            }))
        }
    }]), n
}();
Inspector.Sheets.ViewFromSeat = function (e) {
    var t = e.designer.disabledFeatures.includes(mercator.Features.Type.VIEW_FROM_YOUR_SEAT);
    if (!e.data.url && t) return null;
    var a = mercator.designer.uiEvents;
    return React.createElement("div", {
        className: "InspectorSheet " + (e.highlightFx && "highlight-fx"),
        ref: e.childRef
    }, React.createElement("div", {
        className: "title"
    }, d("view-from-seats")), React.createElement(ImageInput, {
        url: e.data.url,
        uploading: e.busyIndicators.includes("viewFromSeatsUpload"),
        onSet: function (e) {
            return a.setViewFromSeatsImage(e)
        },
        onRemove: function () {
            return a.removeViewFromSeatsImage()
        },
        mimeTypes: ["image/png", "image/gif", "image/jpeg"],
        maxFilesizeMB: 4,
        disabled: t
    }))
};