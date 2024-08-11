/* eslint-disable */
var OrgChart = function (t, e) {
  var r = this;
  if (
    (("string" == typeof t || t instanceof String) &&
      (t = document.querySelector(t)),
    (this.element = t),
    (this.config = OrgChart.mergeDeep(OrgChart._defaultConfig(e), e)),
    (this._layoutConfigs = {
      base: {
        orientation: this.config.orientation,
        levelSeparation: this.config.levelSeparation,
        mixedHierarchyNodesSeparation:
          this.config.mixedHierarchyNodesSeparation,
        assistantSeparation: this.config.assistantSeparation,
        subtreeSeparation: this.config.subtreeSeparation,
        siblingSeparation: this.config.siblingSeparation,
        layout: this.config.layout,
        columns: this.config.columns,
        collapse: this.config.collapse,
        partnerNodeSeparation: this.config.partnerNodeSeparation,
      },
    }),
    this.config.tags)
  )
    for (var i in this.config.tags) {
      var a = this.config.tags[i];
      null != a.subTreeConfig &&
        (this._layoutConfigs[i] = {
          orientation:
            null != a.subTreeConfig.orientation
              ? a.subTreeConfig.orientation
              : this.config.orientation,
          levelSeparation:
            null != a.subTreeConfig.levelSeparation
              ? a.subTreeConfig.levelSeparation
              : this.config.levelSeparation,
          mixedHierarchyNodesSeparation:
            null != a.subTreeConfig.mixedHierarchyNodesSeparation
              ? a.subTreeConfig.mixedHierarchyNodesSeparation
              : this.config.mixedHierarchyNodesSeparation,
          assistantSeparation:
            null != a.subTreeConfig.assistantSeparation
              ? a.subTreeConfig.assistantSeparation
              : this.config.assistantSeparation,
          subtreeSeparation:
            null != a.subTreeConfig.subtreeSeparation
              ? a.subTreeConfig.subtreeSeparation
              : this.config.subtreeSeparation,
          siblingSeparation:
            null != a.subTreeConfig.siblingSeparation
              ? a.subTreeConfig.siblingSeparation
              : this.config.siblingSeparation,
          layout:
            null != a.subTreeConfig.layout
              ? a.subTreeConfig.layout
              : this.config.layout,
          columns:
            null != a.subTreeConfig.columns
              ? a.subTreeConfig.columns
              : this.config.columns,
          collapse:
            null != a.subTreeConfig.collapse
              ? a.subTreeConfig.collapse
              : this.config.collapse,
          partnerNodeSeparation:
            null != a.subTreeConfig.partnerNodeSeparation
              ? a.subTreeConfig.partnerNodeSeparation
              : this.config.partnerNodeSeparation,
        });
    }
  (this._event_id = OrgChart._guid()),
    OrgChart._validateConfig(this.config) &&
      ((this._vScroll = {}),
      this.config.ui || (this.ui = OrgChart.ui),
      this.config.editUI
        ? (this.editUI = this.config.editUI)
        : (this.editUI = new OrgChart.editUI()),
      this.editUI.init(this),
      this.config.filterUI
        ? (this.filterUI = this.config.filterUI)
        : (this.filterUI = new OrgChart.filterUI()),
      this.filterUI.init(this),
      (this.manager = new OrgChart.manager(this)),
      this.config.searchUI
        ? (this.searchUI = this.config.searchUI)
        : (this.searchUI = new OrgChart.searchUI()),
      this.config.nodeMenuUI
        ? (this.nodeMenuUI = this.config.nodeMenuUI)
        : (this.nodeMenuUI = new OrgChart.menuUI()),
      this.nodeMenuUI.init(this, this.config.nodeMenu),
      this.config.nodeCircleMenuUI
        ? (this.nodeCircleMenuUI = this.config.nodeCircleMenuUI)
        : (this.nodeCircleMenuUI = new OrgChart.circleMenuUI()),
      this.nodeCircleMenuUI.init(this, this.config.nodeCircleMenu),
      this.config.nodeContextMenuUI
        ? (this.nodeContextMenuUI = this.config.nodeContextMenuUI)
        : (this.nodeContextMenuUI = new OrgChart.menuUI()),
      this.nodeContextMenuUI.init(this, this.config.nodeContextMenu),
      this.config.toolbarUI
        ? (this.toolbarUI = this.config.toolbarUI)
        : (this.toolbarUI = new OrgChart.toolbarUI()),
      this.config.notifierUI
        ? (this.notifierUI = this.config.notifierUI)
        : (this.notifierUI = new OrgChart.notifierUI()),
      this.notifierUI.init(this),
      this.config.menuUI
        ? (this.menuUI = this.config.menuUI)
        : (this.menuUI = new OrgChart.menuUI()),
      this.menuUI.init(this, this.config.menu),
      this.config.xScrollUI ||
        (this.xScrollUI = new OrgChart.xScrollUI(
          this.element,
          this.config,
          function () {
            return {
              boundary: r.response.boundary,
              scale: r.getScale(),
              viewBox: r.getViewBox(),
              padding: r.config.padding,
            };
          },
          function (t) {
            r.setViewBox(t);
          },
          function () {
            r._draw(!0, OrgChart.action.xScroll);
          }
        )),
      this.config.yScrollUI ||
        (this.yScrollUI = new OrgChart.yScrollUI(
          this.element,
          this.config,
          function () {
            return {
              boundary: r.response.boundary,
              scale: r.getScale(),
              viewBox: r.getViewBox(),
              padding: r.config.padding,
            };
          },
          function (t) {
            r.setViewBox(t);
          },
          function () {
            r._draw(!0, OrgChart.action.xScroll);
          }
        )),
      this.config.undoRedoUI
        ? (this.undoRedoUI = this.config.undoRedoUI)
        : (this.undoRedoUI = new OrgChart.undoRedoUI()),
      this.element.classList.add("boc-" + this.config.mode),
      (this._gragStartedId = null),
      (this._timeout = null),
      (this._touch = null),
      (this._initialized = !1),
      (this._loaded = !1),
      (this._moveInterval = null),
      (this._movePosition = null),
      (this.response = null),
      (this.nodes = null),
      (this.isVisible = null),
      OrgChart._intersectionObserver(this.element, function (t) {
        (r.isVisible = t),
          !1 !== OrgChart.events.publish("visibility-change", [r]) &&
            OrgChart.LAZY_LOADING &&
            r.isVisible &&
            (r._loaded
              ? r._draw(!1, OrgChart.action.update)
              : (r._setInitialSizeIfNotSet(),
                r._draw(!1, OrgChart.action.init)));
      }));
};
(OrgChart._defaultConfig = function (t) {
  return {
    interactive: !0,
    mode: "light",
    lazyLoading: !0,
    enableDragDrop: !1,
    enableSearch: !0,
    enableTouch: !1,
    enablePan: !0,
    keyNavigation: !1,
    miniMap: !1,
    nodeMenu: null,
    nodeCircleMenu: null,
    nodeContextMenu: null,
    menu: null,
    toolbar: !1,
    sticky: !0,
    nodeMouseClick: OrgChart.action.details,
    nodeMouseDbClick: OrgChart.none,
    mouseScrool: OrgChart.action.zoom,
    showXScroll: OrgChart.none,
    showYScroll: OrgChart.none,
    template: "ana",
    tags: {},
    min: !1,
    nodeBinding: {},
    linkBinding: {},
    searchFields: null,
    searchDisplayField: null,
    searchFieldsWeight: null,
    searchFieldsAbbreviation: null,
    nodes: [],
    clinks: [],
    slinks: [],
    groupDottedLines: [],
    dottedLines: [],
    undoRedoStorageName: null,
    levelSeparation: 60,
    siblingSeparation: 20,
    subtreeSeparation: 40,
    mixedHierarchyNodesSeparation: 15,
    assistantSeparation: 100,
    minPartnerSeparation: 50,
    partnerChildrenSplitSeparation: 20,
    partnerNodeSeparation: 15,
    columns: 10,
    padding: 30,
    orientation: OrgChart.orientation.top,
    layout: OrgChart.layout.normal,
    layoutGridColumns: "dynamic",
    scaleInitial: 1,
    movable: null,
    scaleMin: 0.1,
    scaleMax: 5,
    orderBy: null,
    editUI: null,
    filterUI: null,
    searchUI: null,
    xScrollUI: null,
    yScrollUI: null,
    nodeMenuUI: null,
    nodeCircleMenuUI: null,
    nodeContextMenuUI: null,
    toolbarUI: null,
    notifierUI: null,
    menuUI: null,
    undoRedoUI: null,
    exportUrl: "https://balkan.app/export",
    collapse: {},
    expand: {},
    align: OrgChart.CENTER,
    UI: null,
    anim: { func: OrgChart.anim.outPow, duration: 200 },
    zoom: { speed: 120, smooth: 12 },
    roots: null,
    state: null,
    editForm: {
      readOnly: !1,
      titleBinding: "name",
      photoBinding: "img",
      addMore: "Add more fields",
      addMoreBtn: "Add",
      addMoreFieldName: "Field name",
      saveAndCloseBtn: "Save and close",
      cancelBtn: "Cancel",
      generateElementsFromFields: !0,
      focusBinding: null,
      buttons: {
        edit: {
          icon: OrgChart.icon.edit(24, 24, "#fff"),
          text: "Edit",
          hideIfEditMode: !0,
          hideIfDetailsMode: !1,
        },
        share: { icon: OrgChart.icon.share(24, 24, "#fff"), text: "Share" },
        pdf: { icon: OrgChart.icon.pdf(24, 24, "#fff"), text: "Save as PDF" },
        remove: {
          icon: OrgChart.icon.remove(24, 24, "#fff"),
          text: "Remove",
          hideIfDetailsMode: !0,
        },
      },
      elements: [],
    },
  };
}),
  (OrgChart.prototype.load = function (t, e) {
    var r = this;
    return (
      (this.config.nodes = t),
      this._draw(!1, OrgChart.action.init, void 0, function () {
        r.filterUI.update(), e && e();
      }),
      this
    );
  }),
  (OrgChart.prototype.loadXML = function (t, e) {
    var r = OrgChart._xml2json(t);
    return this.load(r, e);
  }),
  (OrgChart.prototype.getXML = function () {
    return OrgChart._json2xml(this.config.nodes);
  }),
  (OrgChart.prototype.on = function (t, e) {
    return OrgChart.events.on(t, e, this._event_id), this;
  }),
  (OrgChart.prototype.removeListener = function (t, e) {
    return OrgChart.events.remove(t, e, this._event_id);
  }),
  (OrgChart.prototype.draw = function (t, e, r) {
    null == t && (t = OrgChart.action.update), this._draw(!1, t, e, r);
  }),
  (OrgChart.prototype._draw = function (t, e, r, i) {
    var a = this;
    if (!OrgChart.LAZY_LOADING || this.isVisible)
      if (
        OrgChart.LAZY_LOADING ||
        this._initialized ||
        (this._setInitialSizeIfNotSet(),
        0 != this.width() && 0 != this.height())
      ) {
        this._hideBeforeAnimationCompleted = !1;
        var n = e == OrgChart.action.init ? null : this.getViewBox();
        this.manager.read(
          t,
          this.width(),
          this.height(),
          n,
          e,
          r,
          function (t) {
            if (!a.notifierUI.show(t.notif)) {
              e != OrgChart.action.exporting &&
                ((a.nodes = t.nodes),
                (a.visibleNodeIds = t.visibleNodeIds),
                (a.roots = t.roots)),
                (a.editUI.fields = t.allFields);
              var n = { defs: "" };
              OrgChart.events.publish("renderdefs", [a, n]);
              var o = a.ui.defs(n.defs),
                l = a.getScale(t.viewBox);
              o += a.ui.pointer(a.config, e, l);
              var s = a.getViewBox(),
                h = t.viewBox;
              n = { content: o, res: t };
              OrgChart.events.publish("prerender", [a, n]), (o = n.content);
              var d = [];
              if (OrgChart.RENDER_LINKS_BEFORE_NODES)
                for (var c = 0; c < t.visibleNodeIds.length; c++) {
                  var g = t.nodes[t.visibleNodeIds[c]];
                  OrgChart.getRootOf(g).stParent
                    ? d.push(g.id)
                    : (o += a.ui.link(
                        g,
                        a,
                        l,
                        t.bordersByRootIdAndLevel,
                        t.nodes,
                        e
                      ));
                }
              for (c = 0; c < t.visibleNodeIds.length; c++) {
                g = t.nodes[t.visibleNodeIds[c]];
                var p = a._get(g.id);
                OrgChart.RENDER_LINKS_BEFORE_NODES &&
                  d.includes(g.id) &&
                  (o += a.ui.link(
                    g,
                    a,
                    l,
                    t.bordersByRootIdAndLevel,
                    t.nodes,
                    e
                  )),
                  (o += a.ui.node(
                    g,
                    p,
                    t.animations,
                    a.config,
                    void 0,
                    void 0,
                    void 0,
                    e,
                    l,
                    a
                  ));
              }
              for (c = 0; c < t.visibleNodeIds.length; c++) {
                g = t.nodes[t.visibleNodeIds[c]];
                OrgChart.RENDER_LINKS_BEFORE_NODES ||
                  (o += a.ui.link(
                    g,
                    a,
                    l,
                    t.bordersByRootIdAndLevel,
                    t.nodes,
                    e
                  )),
                  (o += a.ui.expandCollapseBtn(a, g, a._layoutConfigs, e, l));
              }
              n = { content: o, res: t };
              if (
                (OrgChart.events.publish("render", [a, n]),
                (o = n.content),
                (t = n.res),
                (o += a.ui.lonely(a.config)),
                e !== OrgChart.action.exporting)
              ) {
                (e !== OrgChart.action.centernode &&
                  e !== OrgChart.action.insert &&
                  e !== OrgChart.action.expand &&
                  e !== OrgChart.action.collapse &&
                  e !== OrgChart.action.update) ||
                  (h = s),
                  e === OrgChart.action.init && null != s && (h = s),
                  (a.response = t);
                y = a.ui.svg(a.width(), a.height(), h, a.config, o);
                if (a._initialized) {
                  var u = a.getSvg(),
                    f = u.parentNode;
                  f.removeChild(u),
                    f.insertAdjacentHTML("afterbegin", y),
                    a._attachEventHandlers(),
                    a.xScrollUI.addListener(a.getSvg()),
                    a.yScrollUI.addListener(a.getSvg()),
                    a.xScrollUI.setPosition(),
                    a.yScrollUI.setPosition();
                } else
                  (a.element.innerHTML =
                    a.ui.css() + y + a.ui.menuButton(a.config)),
                    a._attachInitEventHandlers(),
                    a._attachEventHandlers(),
                    a.xScrollUI.create(a.width(), a.config.padding),
                    a.xScrollUI.setPosition(),
                    a.xScrollUI.addListener(a.getSvg()),
                    a.yScrollUI.create(a.height(), a.config.padding),
                    a.yScrollUI.setPosition(),
                    a.yScrollUI.addListener(a.getSvg()),
                    a.config.enableSearch && a.searchUI.init(a),
                    a.toolbarUI.init(a, a.config.toolbar),
                    a.undoRedoUI.init(a);
                var m = !1,
                  C = a.response.animations;
                if (C[0].length > 0) {
                  a._hideBeforeAnimation(C[0].length);
                  for (c = 0; c < C[0].length; c++)
                    C[0][c] = a.getNodeElement(C[0][c]);
                  OrgChart.animate(
                    C[0],
                    C[1],
                    C[2],
                    a.config.anim.duration,
                    a.config.anim.func,
                    function () {
                      m ||
                        (i && i(),
                        OrgChart.events.publish("redraw", [a]),
                        a._showAfterAnimation(),
                        (m = !0));
                    }
                  );
                }
                e === OrgChart.action.centerNode
                  ? OrgChart.animate(
                      a.getSvg(),
                      { viewbox: s },
                      { viewbox: a.response.viewBox },
                      a.config.anim.duration,
                      a.config.anim.func,
                      function () {
                        a.ripple(r.options.rippleId),
                          m ||
                            (i && i(),
                            OrgChart.events.publish("redraw", [a]),
                            a._showAfterAnimation(),
                            (m = !0));
                      },
                      function () {
                        a.xScrollUI.setPosition(), a.yScrollUI.setPosition();
                      }
                    )
                  : !s ||
                    !a.response ||
                    (s[0] == a.response.viewBox[0] &&
                      s[1] == a.response.viewBox[1] &&
                      s[2] == a.response.viewBox[2] &&
                      s[3] == a.response.viewBox[3]) ||
                    (e !== OrgChart.action.insert &&
                      e !== OrgChart.action.expand &&
                      e !== OrgChart.action.collapse &&
                      e !== OrgChart.action.update &&
                      e !== OrgChart.action.init)
                  ? 0 == C[0].length &&
                    (m ||
                      (i && i(),
                      OrgChart.events.publish("redraw", [a]),
                      (m = !0)))
                  : OrgChart.animate(
                      a.getSvg(),
                      { viewbox: s },
                      { viewbox: a.response.viewBox },
                      2 * a.config.anim.duration,
                      a.config.anim.func,
                      function () {
                        a.xScrollUI.setPosition(),
                          a.yScrollUI.setPosition(),
                          m ||
                            (i && i(),
                            OrgChart.events.publish("redraw", [a]),
                            (m = !0));
                      }
                    ),
                  a._initialized ||
                    ((a._initialized = !0),
                    a.filterUI.update(),
                    OrgChart.events.publish("init", [a])),
                  !a._loaded &&
                    t &&
                    t.nodes &&
                    Object.keys(t.nodes).length &&
                    (a._loaded = !0);
              } else {
                var O = t.boundary,
                  b = O.maxX - O.minX,
                  v = O.maxY - O.minY,
                  y = a.ui.svg(b, v, [O.minX, O.minY, b, v], a.config, o, l);
                i(y, t);
              }
            }
          },
          function (t) {
            OrgChart.events.publish("ready", [a, t]);
          }
        );
      } else
        console.error(
          "Cannot load the chart with size 0! If you are using the OrgChart within tabs set OrgChart.LAZY_LOADING to true! "
        );
  }),
  (OrgChart.prototype._setInitialSizeIfNotSet = function () {
    (this.element.style.overflow = "hidden"),
      (this.element.style.position = "relative"),
      0 == this.element.offsetHeight &&
        ((this.element.style.height = "100%"),
        0 == this.element.offsetHeight &&
          (this.element.style.height = "700px")),
      0 == this.element.offsetWidth &&
        ((this.element.style.width = "100%"),
        0 == this.element.offsetWidth && (this.element.style.width = "700px"));
  }),
  (OrgChart.prototype.width = function () {
    return this.element.offsetWidth;
  }),
  (OrgChart.prototype.height = function () {
    return this.element.offsetHeight;
  }),
  (OrgChart.prototype.getViewBox = function () {
    var t = this.getSvg();
    return OrgChart._getViewBox(t);
  }),
  (OrgChart.prototype.setViewBox = function (t) {
    this.getSvg().setAttribute("viewBox", t.toString());
  }),
  (OrgChart.prototype.getScale = function (t) {
    return (
      t || (t = this.getViewBox()),
      OrgChart.getScale(
        t,
        this.width(),
        this.height(),
        this.config.scaleInitial,
        this.config.scaleMax,
        this.config.scaleMin
      )
    );
  }),
  (OrgChart.prototype.setScale = function (t) {
    t > this.config.scaleMax && (t = this.config.scaleMax),
      t < this.config.scaleMin && (t = this.config.scaleMin);
    var e = this.getViewBox().slice(0),
      r = this.width(),
      i = this.height(),
      a = r / e[2],
      n = i / e[3],
      o = a > n ? n : a,
      l = e,
      s = e[2],
      h = e[3];
    return (
      (e[2] = e[2] / (t / o)),
      (e[3] = e[3] / (t / o)),
      (e[0] = l[0] - (e[2] - s) / 2),
      (e[1] = l[1] - (e[3] - h) / 2),
      this.setViewBox(e),
      OrgChart.events.publish("redraw", [this]),
      t
    );
  }),
  (OrgChart.prototype.ripple = function (t, e, r) {
    var i = this.getNode(t);
    if (null != i) {
      var a = this.getNodeElement(t);
      if (null != a) {
        var n = this.getScale(),
          o = i.w / 2,
          l = i.h / 2;
        if (void 0 !== e && void 0 !== r) {
          var s = a.getBoundingClientRect();
          (o = e / n - s.left / n), (l = r / n - s.top / n);
        }
        var h = i.w,
          d = i.h,
          c = h - o > o ? h - o : o,
          g = d - l > l ? d - l : l,
          p = c > g ? c : g,
          u = document.createElementNS("http://www.w3.org/2000/svg", "g"),
          f = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "clipPath"
          ),
          m = document.createElementNS("http://www.w3.org/2000/svg", "rect"),
          C = document.createElementNS("http://www.w3.org/2000/svg", "circle"),
          O = OrgChart.randomId();
        f.setAttribute("id", O);
        var b = {
          ripple: OrgChart.t(i.templateName, i.min, this.getScale()).ripple,
          node: i,
        };
        OrgChart.events.publish("ripple", [this, b]),
          m.setAttribute("x", b.ripple.rect ? b.ripple.rect.x : 0),
          m.setAttribute("y", b.ripple.rect ? b.ripple.rect.y : 0),
          m.setAttribute("width", b.ripple.rect ? b.ripple.rect.width : i.w),
          m.setAttribute("height", b.ripple.rect ? b.ripple.rect.height : i.h),
          m.setAttribute("rx", b.ripple.radius),
          m.setAttribute("ry", b.ripple.radius),
          C.setAttribute("clip-path", "url(#" + O + ")"),
          C.setAttribute("cx", o),
          C.setAttribute("cy", l),
          C.setAttribute("r", 0),
          C.setAttribute("fill", b.ripple.color),
          C.setAttribute("class", "boc-ripple"),
          f.appendChild(m),
          u.appendChild(f),
          u.appendChild(C),
          a.appendChild(u),
          OrgChart.animate(
            C,
            { r: 0, opacity: 1 },
            { r: p, opacity: 0 },
            500,
            OrgChart.anim.outPow,
            function () {
              a.removeChild(u);
            }
          );
      }
    }
  }),
  (OrgChart.prototype.center = function (t, e, r) {
    var i,
      a,
      n = t,
      o = !0,
      l = !0;
    e && null != e.parentState && (i = e.parentState),
      e && null != e.childrenState && (a = e.childrenState),
      e && null != e.rippleId && (n = e.rippleId),
      e && null != e.vertical && (o = e.vertical),
      e && null != e.horizontal && (l = e.horizontal);
    var s = {
      parentState: i,
      childrenState: a,
      rippleId: n,
      vertical: o,
      horizontal: l,
    };
    this._draw(!1, OrgChart.action.centerNode, { id: t, options: s }, r);
  }),
  (OrgChart.prototype.fit = function (t) {
    (this.config.scaleInitial = OrgChart.match.boundary),
      this._draw(!0, OrgChart.action.init, { method: "fit" }, t);
  }),
  (OrgChart.prototype.toggleFullScreen = function () {
    var t = document.querySelector(
      "[" + OrgChart.attr.tlbr + "r='fullScreen']"
    );
    document.fullscreenElement == this.element ||
    document.webkitFullscreenElement == this.element ||
    document.mozFullScreenElement == this.element ||
    document.msFullscreenElement == this.element
      ? (document.exitFullscreen
          ? document.exitFullscreen()
          : document.mozCancelFullScreen
          ? document.mozCancelFullScreen()
          : document.webkitExitFullscreen
          ? document.webkitExitFullscreen()
          : document.msExitFullscreen && document.msExitFullscreen(),
        t && (t.innerHTML = OrgChart.toolbarUI.openFullScreenIcon))
      : (this.element.requestFullscreen
          ? this.element.requestFullscreen()
          : this.element.mozRequestFullScreen
          ? this.element.mozRequestFullScreen()
          : this.element.webkitRequestFullscreen
          ? this.element.webkitRequestFullscreen()
          : this.element.msRequestFullscreen &&
            this.element.msRequestFullscreen(),
        t && (t.innerHTML = OrgChart.toolbarUI.closeFullScreenIcon));
  }),
  (OrgChart.prototype.getNode = function (t) {
    return this.nodes[t];
  }),
  (OrgChart.prototype.setLayout = function (t, e) {
    e || (e = "base"),
      (this._layoutConfigs[e].layout = t),
      "base" == e && (this.config.layout = t),
      this._draw(!1, OrgChart.action.update);
  }),
  (OrgChart.prototype.setOrientation = function (t, e, r) {
    var i = this;
    e || (e = "base"),
      (this._layoutConfigs[e].orientation = t),
      "base" == e && (this.config.orientation = t),
      this._draw(!1, OrgChart.action.update, void 0, function () {
        OrgChart._moveToBoundaryArea(
          i.getSvg(),
          i.getViewBox(),
          i.response.boundary,
          function () {
            i._draw(!0, OrgChart.action.pan), r && r();
          }
        );
      });
  }),
  (OrgChart.prototype.search = function (t, e, r) {
    return (
      OrgChart.isNEU(e) && (e = this.searchUI._searchFields),
      OrgChart.isNEU(r) && (r = e),
      OrgChart._search.search(
        this.config.nodes,
        t,
        e,
        r,
        this.config.searchDisplayField,
        this.config.searchFieldsWeight,
        this.searchUI._searchFieldsAbbreviation
      )
    );
  }),
  (OrgChart.prototype._hideBeforeAnimation = function (t) {
    if (
      1 != this._hideBeforeAnimationCompleted &&
      !(t && t < OrgChart.ANIM_THRESHOLD)
    ) {
      var e = this.element.getElementsByTagName("text");
      if (e.length > OrgChart.TEXT_THRESHOLD)
        for (var r = 0; r < e.length; r++) e[r].style.display = "none";
      var i = this.element.getElementsByTagName("image");
      if (i.length > OrgChart.IMAGES_THRESHOLD)
        for (r = 0; r < i.length; r++) i[r].style.display = "none";
      var a = this.element.querySelectorAll("[" + OrgChart.attr.link_id + "]");
      if (a.length > OrgChart.LINKS_THRESHOLD)
        for (r = 0; r < a.length; r++) a[r].style.display = "none";
      var n = this.element.querySelectorAll(
        "[" + OrgChart.attr.control_expcoll_id + "]"
      );
      if (n.length > OrgChart.BUTTONS_THRESHOLD)
        for (r = 0; r < n.length; r++) n[r].style.display = "none";
      var o = this.element.querySelectorAll(
        "[" + OrgChart.attr.control_up_id + "]"
      );
      if (o.length > OrgChart.BUTTONS_THRESHOLD)
        for (r = 0; r < o.length; r++) o[r].style.display = "none";
      this._hideBeforeAnimationCompleted = !0;
    }
  }),
  (OrgChart.prototype._showAfterAnimation = function () {
    for (
      var t = this.element.getElementsByTagName("text"), e = 0;
      e < t.length;
      e++
    )
      t[e].style.display = "";
    var r = this.element.getElementsByTagName("image");
    for (e = 0; e < r.length; e++) r[e].style.display = "";
    var i = this.element.querySelectorAll("[" + OrgChart.attr.link_id + "]");
    for (e = 0; e < i.length; e++) i[e].style.display = "";
    var a = this.element.querySelectorAll(
      "[" + OrgChart.attr.control_expcoll_id + "]"
    );
    for (e = 0; e < a.length; e++) a[e].style.display = "";
    var n = this.element.querySelectorAll(
      "[" + OrgChart.attr.control_up_id + "]"
    );
    for (e = 0; e < n.length; e++) n[e].style.display = "";
    this._hideBeforeAnimationCompleted = !1;
  }),
  (OrgChart.prototype.isChild = function (t, e) {
    for (var r = this.getNode(e); r; ) {
      if (r.id == t) return !0;
      r = r.parent ? r.parent : r.stParent;
    }
    return !1;
  }),
  (OrgChart.prototype.getCollapsedIds = function (t) {
    for (var e = [], r = 0; r < t.childrenIds.length; r++) {
      var i = this.getNode(t.childrenIds[r]);
      1 == i.collapsed && e.push(i.id);
    }
    return e;
  }),
  (OrgChart.prototype.stateToUrl = function () {
    if (this.manager.state) {
      var t = {};
      return (
        (t.exp = this.manager.state.exp.join("*")),
        (t.min = this.manager.state.min.join("*")),
        (t.adjustify =
          this.manager.state.adjustify.x +
          "*" +
          this.manager.state.adjustify.y),
        (t.scale = this.manager.state.scale),
        (t.y = this.manager.state.x),
        (t.x = this.manager.state.y),
        new URLSearchParams(t).toString()
      );
    }
    return "";
  }),
  (OrgChart.prototype.generateId = function () {
    for (;;) {
      var t =
        "_" +
        ("0000" + ((Math.random() * Math.pow(36, 4)) | 0).toString(36)).slice(
          -4
        );
      if (null == this.nodes || !this.nodes.hasOwnProperty(t)) return t;
    }
  }),
  (OrgChart.prototype.moveNodesToVisibleArea = function (t, e) {
    for (
      var r = this,
        i = this.getSvg(),
        a = this.getViewBox(),
        n = null,
        o = null,
        l = null,
        s = null,
        h = 0;
      h < t.length;
      h++
    ) {
      var d = this.nodes[t[h]];
      (null === n || n < d.x + d.w) && (n = d.x + d.w),
        (null === o || o < d.y + d.h) && (o = d.y + d.h),
        (null === l || l > d.x) && (l = d.x),
        (null === s || s > d.y) && (s = d.y);
    }
    var c = this.width(),
      g = this.height(),
      p = c / (O = n - l + 2 * this.config.padding),
      u = g / (b = o - s + 2 * this.config.padding),
      f = p > u ? u : p,
      m = Math.ceil(c / f),
      C = Math.ceil(g / f),
      O = 0,
      b = 0;
    if (m - 2 * this.config.padding >= n - l) O = (n + l) / 2 - m / 2;
    else
      switch (
        ((O =
          firstRoot.x -
          m / 2 +
          OrgChart.manager._getNodeWidth(firstRoot, this.config) / 2),
        this.config.orientation)
      ) {
        case OrgChart.orientation.right:
        case OrgChart.orientation.right_top:
          (O = -(m / 2 - (l - n) / 2)) < this.config.padding - m &&
            (O = this.config.padding - m);
          break;
        case OrgChart.orientation.left:
        case OrgChart.orientation.bottom_left:
        case OrgChart.orientation.top_left:
        case OrgChart.orientation.left_top:
          (O = -(m / 2 - (n - l) / 2)) > -this.config.padding &&
            (O = -this.config.padding);
      }
    if (C - 2 * this.config.padding >= o - s) b = (o + s) / 2 - C / 2;
    else
      switch (
        ((b = -(C / 2 - (o - s) / 2)) > -this.config.padding &&
          (b = -this.config.padding),
        this.config.orientation)
      ) {
        case OrgChart.orientation.bottom:
        case OrgChart.orientation.bottom_left:
          (b = -(C / 2 - (s - o) / 2)) < this.config.padding - C &&
            (b = this.config.padding - C);
          break;
        case OrgChart.orientation.left:
        case OrgChart.orientation.right:
          b =
            firstRoot.y -
            C / 2 +
            OrgChart.manager._getNodeWidth(firstRoot, this.config) / 2;
      }
    var v = [O, b, m, C];
    a[0] !== v[0] || a[1] !== v[1]
      ? OrgChart.animate(
          i,
          { viewBox: a },
          { viewBox: v },
          this.config.anim.duration,
          this.config.anim.func,
          function () {
            r.draw(OrgChart.action.update, void 0, e);
          }
        )
      : e && e();
  }),
  (OrgChart.prototype._nodeHasHiddenParent = function (t) {
    return !t.parent && !OrgChart.isNEU(t.pid) && this.getNode(t.pid);
  }),
  (OrgChart.prototype.destroy = function () {
    this._removeEvent(window, "resize"),
      OrgChart.events.removeForEventId(this._event_id),
      (this.element.innerHTML = null);
  }),
  (OrgChart.localStorage = {}),
  (OrgChart.localStorage.getItem = function (t) {
    var e = localStorage.getItem("to_date");
    if (e) {
      if ((e = new Date(e)) < new Date()) {
        for (var r = 0, i = localStorage.length; r < i; ++r) {
          var a = localStorage.key(r);
          a &&
            a.startsWith &&
            a.startsWith('{"n"') &&
            localStorage.removeItem(a);
        }
        localStorage.removeItem("to_date");
      }
    } else
      (e = new Date()).setDate(e.getDate() + 5),
        (e = e.toISOString()),
        localStorage.setItem("to_date", e);
    return localStorage.getItem(t);
  }),
  (OrgChart.localStorage.setItem = function (t, e) {
    try {
      localStorage.setItem(t, e);
    } catch (t) {
      t.code == t.QUOTA_EXCEEDED_ERR
        ? (console.warn("Local storage quota exceeded"), localStorage.clear())
        : (console.error("Local storage error code:" + t.code),
          console.error(t));
    }
  }),
  (OrgChart.prototype.canUpdateLink = function (t, e) {
    if (null == e || null == e) return !1;
    if (null == t || null == t) return !1;
    if (t == e) return !1;
    var r = this.getNode(e),
      i = this.getNode(t);
    return (
      !(
        r &&
        i &&
        (r.isPartner ||
          (r.hasPartners && i.isAssistant) ||
          (r.hasAssistants && i.isPartner))
      ) && !this.isChild(t, e)
    );
  }),
  (OrgChart.prototype._canUpdateLink = OrgChart.prototype.canUpdateLink),
  (OrgChart.prototype.updateNode = function (t, e, r) {
    var i = this,
      a = this.get(t.id);
    if (!0 === r && !1 === OrgChart.events.publish("update", [this, a, t]))
      return !1;
    this.update(t),
      OrgChart.events.publish("updated", [this]),
      this.filterUI.update();
    var n = this.getNode(t.id),
      o = n.pid;
    null == o && (o = n.stpid),
      this._draw(!1, OrgChart.action.update, { id: o }, function () {
        i.ripple(t.id), e && e();
      });
  }),
  (OrgChart.prototype.update = function (t) {
    for (var e = 0; e < this.config.nodes.length; e++)
      if (this.config.nodes[e].id == t.id) {
        this._putInUndoStack(), this.clearRedo(), (this.config.nodes[e] = t);
        break;
      }
    return this;
  }),
  (OrgChart.prototype.removeNode = function (t, e, r) {
    var i = this;
    if (!this.canRemove(t)) return !1;
    var a = this._getNewPidsAndStpidsForIds(t);
    if (!0 === r && !1 === OrgChart.events.publish("remove", [this, t, a]))
      return !1;
    return (
      this.remove(t),
      OrgChart.events.publish("updated", [this]),
      this.filterUI.update(),
      this._draw(!1, OrgChart.action.update, null, function () {
        i.config.sticky &&
          OrgChart._moveToBoundaryArea(
            i.getSvg(),
            i.getViewBox(),
            i.response.boundary
          ),
          e && e();
      }),
      !0
    );
  }),
  (OrgChart.prototype.remove = function (t) {
    var e = this.get(t);
    if (e) {
      this._putInUndoStack(), this.clearRedo();
      for (var r = this.config.nodes.length - 1; r >= 0; r--)
        (this.config.nodes[r].pid != t && this.config.nodes[r].stpid != t) ||
          ((this.config.nodes[r].pid = e.pid),
          (this.config.nodes[r].stpid = e.stpid)),
          this.config.nodes[r].id == t && this.config.nodes.splice(r, 1);
    }
    return this;
  }),
  (OrgChart.prototype._getNewPidsAndStpidsForIds = function (t) {
    var e = this.get(t),
      r = {},
      i = {};
    if (e)
      for (var a = this.config.nodes.length - 1; a >= 0; a--)
        this.config.nodes[a].pid == t
          ? (r[this.config.nodes[a].id] = e.pid)
          : this.config.nodes[a].stpid == t &&
            (i[this.config.nodes[a].id] = e.stpid);
    return { newPidsForIds: r, newStpidsForIds: i };
  }),
  (OrgChart.prototype.addNode = function (t, e, r) {
    var i = this;
    if (!0 === r && !1 === OrgChart.events.publish("add", [this, t])) return !1;
    this.add(t),
      OrgChart.events.publish("updated", [this]),
      this.filterUI.update(),
      i._draw(
        !1,
        OrgChart.action.insert,
        { id: t.pid, insertedNodeId: t.id },
        function () {
          i.ripple(t.id), e && e();
        }
      );
  }),
  (OrgChart.prototype.add = function (t) {
    if (
      (null == t.id && console.error("Call addNode without id"),
      this._putInUndoStack(),
      this.clearRedo(),
      this.config.movable && !OrgChart.isNEU(t.pid))
    ) {
      var e = this._get(t.pid);
      e &&
        (null != e.movex && (t.movex = e.movex),
        null != e.movey && (t.movey = e.movey));
    }
    return this.config.nodes.push(t), this;
  }),
  (OrgChart.prototype.replaceIds = function (t, e) {
    this._replaceIds(t), this._draw(!1, OrgChart.action.update, void 0, e);
  }),
  (OrgChart.prototype._replaceIds = function (t) {
    for (
      var e = function (e) {
          for (var r = 0; r < e.length; r++) {
            var i = e[r];
            for (var a in t) {
              var n = t[a];
              i.from == a && (i.from = n), i.to == a && (i.to = n);
            }
          }
        },
        r = 0;
      r < this.config.nodes.length;
      r++
    ) {
      var i = this.config.nodes[r];
      for (var a in t) {
        var n = t[a];
        i.id == a && (i.id = n),
          i.pid == a && (i.pid = n),
          i.stpid == a && (i.stpid = n),
          i.ppid == a && (i.ppid = n);
      }
    }
    if (Array.isArray(this.config.roots))
      for (r = 0; r < this.config.roots.length; r++)
        OrgChart.isNEU(t[this.config.roots[r]]) ||
          (this.config.roots[r] = t[this.config.roots[r]]);
    if (this.nodes)
      for (var o in this.nodes)
        if (!OrgChart.isNEU(t[o])) {
          n = t[o];
          ((l = this.nodes[o]).id = n), (this.nodes[n] = l);
        }
    if (this.manager.oldNodes)
      for (var o in this.manager.oldNodes)
        if (!OrgChart.isNEU(t[o])) {
          n = t[o];
          ((l = this.manager.oldNodes[o]).id = n),
            (this.manager.oldNodes[n] = l);
        }
    if (this.roots)
      for (var o in this.roots)
        if (!OrgChart.isNEU(t[o])) {
          var l;
          n = t[o];
          ((l = this.roots[o]).id = n), (this.roots[n] = l);
        }
    e(this.config.clinks),
      e(this.config.slinks),
      e(this.config.groupDottedLines),
      e(this.config.dottedLines);
  }),
  (OrgChart.prototype._get = function (t) {
    var e = this.__get(t);
    if (e) return e;
    if (
      (this.config.groupDottedLines.length || this.config.dottedLines.length) &&
      !OrgChart.isNEU(t) &&
      "string" == typeof t &&
      (-1 != t.indexOf("balkan_group_dotted_") ||
        -1 != t.indexOf("balkan_dotted_"))
    ) {
      var r = (t = (t = t.replace("balkan_group_dotted_", "")).replace(
        "balkan_dotted_",
        ""
      )).indexOf("_balkan_id_");
      if (((t = t.substring(r + 11)), (e = this.__get(t)))) return e;
    }
    return null;
  }),
  (OrgChart.prototype.__get = function (t) {
    for (var e = 0; e < this.config.nodes.length; e++)
      if (this.config.nodes[e].id == t) return this.config.nodes[e];
    return null;
  }),
  (OrgChart.prototype.get = function (t) {
    var e = this._get(t);
    return null == e ? null : JSON.parse(JSON.stringify(e));
  }),
  (OrgChart.prototype.canRemove = function (t) {
    var e = this.getNode(t);
    return !!e && !e.hasPartners && !e.hasAssistants;
  }),
  void 0 === OrgChart && (OrgChart = {}),
  (OrgChart._ajax = function (t, e, r, i, a) {
    null == i && (i = "arraybuffer");
    var n = new XMLHttpRequest();
    (n.onload = function (t) {
      4 == n.readyState &&
        200 === this.status &&
        (null == t.target ? a(this.response) : a(t.target.response));
    }),
      (n.onerror = function (t) {
        a({ error: t });
      }),
      n.open(e, t),
      (n.responseType = i),
      n.setRequestHeader("Content-Type", "application/json"),
      null == r ? n.send() : n.send(r);
  }),
  void 0 === OrgChart && (OrgChart = {}),
  (OrgChart.animate = function (t, e, r, i, a, n, o) {
    var l,
      s = 10,
      h = 1,
      d = i / s + 1;
    document.getElementsByTagName("g");
    return (
      Array.isArray(t) || (t = [t]),
      Array.isArray(e) || (e = [e]),
      Array.isArray(r) || (r = [r]),
      (l = setInterval(function () {
        for (var c = 0; c < t.length; c++)
          for (var g in r[c]) {
            var p = OrgChart._arrayContains(
              ["top", "left", "right", "bottom", "width", "height"],
              g.toLowerCase()
            )
              ? "px"
              : "";
            switch (g.toLowerCase()) {
              case "d":
                var u =
                    a((h * s - s) / i) * (r[c][g][0] - e[c][g][0]) + e[c][g][0],
                  f =
                    a((h * s - s) / i) * (r[c][g][1] - e[c][g][1]) + e[c][g][1];
                t[c].setAttribute(
                  "d",
                  t[c].getAttribute("d") + " L" + u + " " + f
                );
                break;
              case "r":
                var m = a((h * s - s) / i) * (r[c][g] - e[c][g]) + e[c][g];
                t[c].setAttribute("r", m);
                break;
              case "x1":
                m = a((h * s - s) / i) * (r[c][g] - e[c][g]) + e[c][g];
                t[c].setAttribute("x1", m);
                break;
              case "x2":
                m = a((h * s - s) / i) * (r[c][g] - e[c][g]) + e[c][g];
                t[c].setAttribute("x2", m);
                break;
              case "y1":
                m = a((h * s - s) / i) * (r[c][g] - e[c][g]) + e[c][g];
                t[c].setAttribute("y1", m);
                break;
              case "y2":
                m = a((h * s - s) / i) * (r[c][g] - e[c][g]) + e[c][g];
                t[c].setAttribute("y2", m);
                break;
              case "rotate3d":
                if (r[c][g]) {
                  var C = e[c][g],
                    O = r[c][g],
                    b = [0, 0, 0, 0];
                  for (var v in C)
                    b[v] = a((h * s - s) / i) * (O[v] - C[v]) + C[v];
                  t[c].style.transform = "rotate3d(" + b.toString() + "deg)";
                }
                break;
              case "transform":
                if (r[c][g]) {
                  (C = e[c][g]), (O = r[c][g]), (b = [0, 0, 0, 0, 0, 0]);
                  for (var v in C)
                    b[v] = a((h * s - s) / i) * (O[v] - C[v]) + C[v];
                  t[c].hasAttribute("transform")
                    ? t[c].setAttribute(
                        "transform",
                        "matrix(" + b.toString() + ")"
                      )
                    : (t[c].style.transform = "matrix(" + b.toString() + ")");
                }
                break;
              case "viewbox":
                if (r[c][g]) {
                  (C = e[c][g]), (O = r[c][g]), (b = [0, 0, 0, 0]);
                  for (var v in C)
                    b[v] = a((h * s - s) / i) * (O[v] - C[v]) + C[v];
                  t[c].setAttribute("viewBox", b.toString());
                }
                break;
              case "margin":
                if (r[c][g]) {
                  (C = e[c][g]), (O = r[c][g]), (b = [0, 0, 0, 0]);
                  for (var v in C)
                    b[v] = a((h * s - s) / i) * (O[v] - C[v]) + C[v];
                  var y = "";
                  for (v = 0; v < b.length; v++) y += parseInt(b[v]) + "px ";
                  t[c] && t[c].style && (t[c].style[g] = y);
                }
                break;
              case "scrolly":
                m = a((h * s - s) / i) * (r[c][g] - e[c][g]) + e[c][g];
                t[c].scrollTo(0, m);
                break;
              default:
                m = a((h * s - s) / i) * (r[c][g] - e[c][g]) + e[c][g];
                t[c] && t[c].style && (t[c].style[g] = m + p);
            }
          }
        o && o(), (h += 1) > d + 1 && (clearInterval(l), n && n(t));
      }, s))
    );
  }),
  (OrgChart.anim = {}),
  (OrgChart.anim.inPow = function (t) {
    return t < 0 ? 0 : t > 1 ? 1 : Math.pow(t, 2);
  }),
  (OrgChart.anim.outPow = function (t) {
    if (t < 0) return 0;
    if (t > 1) return 1;
    return -1 * (Math.pow(t - 1, 2) + -1);
  }),
  (OrgChart.anim.inOutPow = function (t) {
    if (t < 0) return 0;
    if (t > 1) return 1;
    if ((t *= 2) < 1) return OrgChart.anim.inPow(t, 2) / 2;
    return -0.5 * (Math.pow(t - 2, 2) + -2);
  }),
  (OrgChart.anim.inSin = function (t) {
    return t < 0 ? 0 : t > 1 ? 1 : 1 - Math.cos(t * (Math.PI / 2));
  }),
  (OrgChart.anim.outSin = function (t) {
    return t < 0 ? 0 : t > 1 ? 1 : Math.sin(t * (Math.PI / 2));
  }),
  (OrgChart.anim.inOutSin = function (t) {
    return t < 0 ? 0 : t > 1 ? 1 : -0.5 * (Math.cos(Math.PI * t) - 1);
  }),
  (OrgChart.anim.inExp = function (t) {
    return t < 0 ? 0 : t > 1 ? 1 : Math.pow(2, 10 * (t - 1));
  }),
  (OrgChart.anim.outExp = function (t) {
    return t < 0 ? 0 : t > 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }),
  (OrgChart.anim.inOutExp = function (t) {
    return t < 0
      ? 0
      : t > 1
      ? 1
      : t < 0.5
      ? 0.5 * Math.pow(2, 10 * (2 * t - 1))
      : 0.5 * (2 - Math.pow(2, 10 * (-2 * t + 1)));
  }),
  (OrgChart.anim.inCirc = function (t) {
    return t < 0 ? 0 : t > 1 ? 1 : -(Math.sqrt(1 - t * t) - 1);
  }),
  (OrgChart.anim.outCirc = function (t) {
    return t < 0 ? 0 : t > 1 ? 1 : Math.sqrt(1 - (t - 1) * (t - 1));
  }),
  (OrgChart.anim.inOutCirc = function (t) {
    return t < 0
      ? 0
      : t > 1
      ? 1
      : t < 1
      ? -0.5 * (Math.sqrt(1 - t * t) - 1)
      : 0.5 * (Math.sqrt(1 - (2 * t - 2) * (2 * t - 2)) + 1);
  }),
  (OrgChart.anim.rebound = function (t) {
    return t < 0
      ? 0
      : t > 1
      ? 1
      : t < 1 / 2.75
      ? 1 - 7.5625 * t * t
      : t < 2 / 2.75
      ? 1 - (7.5625 * (t - 1.5 / 2.75) * (t - 1.5 / 2.75) + 0.75)
      : t < 2.5 / 2.75
      ? 1 - (7.5625 * (t - 2.25 / 2.75) * (t - 2.25 / 2.75) + 0.9375)
      : 1 - (7.5625 * (t - 2.625 / 2.75) * (t - 2.625 / 2.75) + 0.984375);
  }),
  (OrgChart.anim.inBack = function (t) {
    return t < 0 ? 0 : t > 1 ? 1 : t * t * (2.70158 * t - 1.70158);
  }),
  (OrgChart.anim.outBack = function (t) {
    return t < 0
      ? 0
      : t > 1
      ? 1
      : (t - 1) * (t - 1) * (2.70158 * (t - 1) + 1.70158) + 1;
  }),
  (OrgChart.anim.inOutBack = function (t) {
    return t < 0
      ? 0
      : t > 1
      ? 1
      : t < 0.5
      ? 4 * t * t * (7.1898 * t - 2.5949) * 0.5
      : 0.5 * ((2 * t - 2) * (2 * t - 2) * (3.5949 * (2 * t - 2) + 2.5949) + 2);
  }),
  (OrgChart.anim.impulse = function (t) {
    var e = 2 * t;
    return e * Math.exp(1 - e);
  }),
  (OrgChart.anim.expPulse = function (t) {
    return Math.exp(-2 * Math.pow(t, 2));
  }),
  void 0 === OrgChart && (OrgChart = {}),
  (OrgChart.prototype._attachInitEventHandlers = function (t) {
    this._addEvent(window, "resize", this._resizeHandler);
  }),
  (OrgChart.prototype._attachEventHandlers = function (t) {
    if (this.config.interactive) {
      t = this.getSvg();
      this.config.enableTouch || OrgChart.isMobile()
        ? (this._addEvent(t, "touchstart", this._globalMouseDownHandler),
          this._addEvent(t, "touchend", this._globalClickHandler))
        : (this._addEvent(t, "mousedown", this._globalMouseDownHandler),
          this._addEvent(t, "click", this._globalClickHandler),
          this._addEvent(t, "contextmenu", this._globalContextHandler),
          this._addEvent(t, "dblclick", this._globalDbClickHandler),
          this.config.mouseScrool != OrgChart.action.none &&
            this._addEvent(t, "wheel", this._mouseScrollHandler));
      var e = this.getMenuButton();
      e && this._addEvent(e, "click", this._menuClickHandler);
    }
  }),
  (OrgChart.prototype._addEvent = function (t, e, r, i) {
    var a, n;
    (i || (i = ""),
    t.getListenerList || (t.getListenerList = {}),
    t.getListenerList[e + i]) ||
      ((a = this),
      (n = r),
      (r = function () {
        if (n) return n.apply(a, [this, arguments[0]]);
      }),
      t.addEventListener
        ? "mousewheel" == e
          ? t.addEventListener(e, o, { passive: !1 })
          : t.addEventListener(e, o, !1)
        : t.attachEvent("on" + e, function () {
            var e = r.call(t, window.event);
            return (
              !1 === e &&
                ((window.event.returnValue = !1),
                (window.event.cancelBubble = !0)),
              e
            );
          }),
      (t.getListenerList[e + i] = o));
    function o(t) {
      var e = r.apply(this, arguments);
      return !1 === e && (t.stopPropagation(), t.preventDefault()), e;
    }
  }),
  (OrgChart.prototype._removeEvent = function (t, e) {
    if (t.getListenerList[e]) {
      var r = t.getListenerList[e];
      t.removeEventListener(e, r, !1), delete t.getListenerList[e];
    }
  }),
  void 0 === OrgChart && (OrgChart = {}),
  (OrgChart.VERSION = "8.14.37"),
  (OrgChart.orientation = {}),
  (OrgChart.orientation.top = 0),
  (OrgChart.orientation.bottom = 1),
  (OrgChart.orientation.right = 2),
  (OrgChart.orientation.left = 3),
  (OrgChart.orientation.top_left = 4),
  (OrgChart.orientation.bottom_left = 5),
  (OrgChart.orientation.right_top = 6),
  (OrgChart.orientation.left_top = 7),
  (OrgChart.align = {}),
  (OrgChart.align.center = OrgChart.CENTER = 8),
  (OrgChart.align.orientation = OrgChart.ORIENTATION = 9),
  (OrgChart.attr = {}),
  (OrgChart.attr.l = "data-l"),
  (OrgChart.attr.id = "data-id"),
  (OrgChart.attr.sl = "data-sl"),
  (OrgChart.attr.lbl = "data-lbl"),
  (OrgChart.attr.val = "data-val"),
  (OrgChart.attr.tlbr = "data-tlbr"),
  (OrgChart.attr.item = "data-item"),
  (OrgChart.attr.layout = "data-layout"),
  (OrgChart.attr.node_id = "data-n-id"),
  (OrgChart.attr.link_id = "data-l-id"),
  (OrgChart.attr.field_name = "data-f-name"),
  (OrgChart.attr.c_link_to = "data-c-l-to"),
  (OrgChart.attr.c_link_from = "data-c-l-from"),
  (OrgChart.attr.s_link_to = "data-s-l-to"),
  (OrgChart.attr.s_link_from = "data-s-l-from"),
  (OrgChart.attr.control_add = "data-ctrl-add"),
  (OrgChart.attr.control_expcoll_id = "data-ctrl-ec-id"),
  (OrgChart.attr.control_up_id = "data-ctrl-up-id"),
  (OrgChart.attr.control_export_menu = "data-ctrl-menu"),
  (OrgChart.attr.control_node_menu_id = "data-ctrl-n-menu-id"),
  (OrgChart.attr.control_node_circle_menu_id = "data-ctrl-n-c-menu-id"),
  (OrgChart.attr.control_node_circle_menu_name = "data-ctrl-n-c-menu-name"),
  (OrgChart.attr.control_node_circle_menu_wrraper_id =
    "data-ctrl-n-c-menu-wrapper-id"),
  (OrgChart.attr.width = "data-width"),
  (OrgChart.attr.text_overflow = "data-text-overflow"),
  (OrgChart.ID = "id"),
  (OrgChart.PID = "pid"),
  (OrgChart.STPID = "stpid"),
  (OrgChart.TAGS = "tags"),
  (OrgChart.NODES = "nodes"),
  (OrgChart.ELASTIC = "elastic"),
  (OrgChart.ASSISTANT = "Assistant"),
  (OrgChart.action = {}),
  (OrgChart.action.expand = 0),
  (OrgChart.action.collapse = 1),
  (OrgChart.action.maximize = 101),
  (OrgChart.action.minimize = 102),
  (OrgChart.action.expandCollapse = 501),
  (OrgChart.action.edit = 1),
  (OrgChart.action.zoom = 2),
  (OrgChart.action.ctrlZoom = 22),
  (OrgChart.action.scroll = 41),
  (OrgChart.action.xScroll = 3),
  (OrgChart.action.yScroll = 4),
  (OrgChart.action.none = 5),
  (OrgChart.action.init = 6),
  (OrgChart.action.update = 7),
  (OrgChart.action.move = 70),
  (OrgChart.action.pan = 8),
  (OrgChart.action.centerNode = 9),
  (OrgChart.action.resize = 10),
  (OrgChart.action.insert = 11),
  (OrgChart.action.insertfirst = 12),
  (OrgChart.action.details = 13),
  (OrgChart.action.exporting = 14),
  (OrgChart.none = 400001),
  (OrgChart.scroll = {}),
  (OrgChart.scroll.visible = !0),
  (OrgChart.scroll.smooth = 12),
  (OrgChart.scroll.speed = 120),
  (OrgChart.scroll.safari = { smooth: 12, speed: 250 }),
  (OrgChart.match = {}),
  (OrgChart.match.height = 100001),
  (OrgChart.match.width = 100002),
  (OrgChart.match.boundary = 100003),
  (OrgChart.movable = {}),
  (OrgChart.movable.node = "node"),
  (OrgChart.movable.tree = "tree"),
  (OrgChart.movable.detachTree = "detachTree"),
  (OrgChart.layout = {}),
  (OrgChart.layout.normal = OrgChart.normal = 0),
  (OrgChart.layout.mixed = OrgChart.mixed = 1),
  (OrgChart.layout.tree = OrgChart.tree = 2),
  (OrgChart.layout.treeLeftOffset = OrgChart.treeLeftOffset = 3),
  (OrgChart.layout.treeRightOffset = OrgChart.treeRightOffset = 4),
  (OrgChart.layout.treeLeft = 5),
  (OrgChart.layout.treeRight = 6),
  (OrgChart.layout.grid = -1),
  (OrgChart.nodeOpenTag =
    "<g " +
    OrgChart.attr.node_id +
    '="{id}" style="opacity: {opacity}" transform="matrix(1,0,0,1,{x},{y})" class="{class}" ' +
    OrgChart.attr.sl +
    '="{sl}" ' +
    OrgChart.attr.l +
    "={level} {lcn}>"),
  (OrgChart.linkOpenTag =
    "<g " + OrgChart.attr.link_id + '="[{id}][{child-id}]" class="{class}">'),
  (OrgChart.expcollOpenTag =
    "<g " +
    OrgChart.attr.control_expcoll_id +
    '="{id}" transform="matrix(1,0,0,1,{x},{y})"  style="cursor:pointer;">'),
  (OrgChart.upOpenTag =
    "<g " +
    OrgChart.attr.control_up_id +
    '="{id}" transform="matrix(1,0,0,1,{x},{y})" style="cursor:pointer;">'),
  (OrgChart.linkFieldsOpenTag =
    '<g transform="matrix(1,0,0,1,{x},{y}) rotate({rotate})">'),
  (OrgChart.grCloseTag = "</g>"),
  (OrgChart.A5w = 420),
  (OrgChart.A5h = 595),
  (OrgChart.A4w = 595),
  (OrgChart.A4h = 842),
  (OrgChart.A3w = 842),
  (OrgChart.A3h = 1191),
  (OrgChart.A2w = 1191),
  (OrgChart.A2h = 1684),
  (OrgChart.A1w = 1684),
  (OrgChart.A1h = 2384),
  (OrgChart.Letterw = 612),
  (OrgChart.Letterh = 791),
  (OrgChart.Legalw = 612),
  (OrgChart.Legalh = 1009),
  (OrgChart.COLLAPSE_PARENT_NEIGHBORS = 1),
  (OrgChart.COLLAPSE_SUB_CHILDRENS = 2),
  (OrgChart.COLLAPSE_PARENT_SUB_CHILDREN_EXCEPT_CLICKED = 3),
  (OrgChart.TEXT_THRESHOLD = 400),
  (OrgChart.IMAGES_THRESHOLD = 100),
  (OrgChart.LINKS_THRESHOLD = 200),
  (OrgChart.BUTTONS_THRESHOLD = 70),
  (OrgChart.ANIM_THRESHOLD = 50),
  (OrgChart.IT_IS_LONELY_HERE =
    '<g transform="translate(-100, 0)" style="cursor:pointer;"  ' +
    OrgChart.attr.control_add +
    '="control-add"><text fill="#039be5">{link}</text></g>'),
  (OrgChart.RES = {}),
  (OrgChart.RES.IT_IS_LONELY_HERE_LINK =
    "It's lonely here, add your first node"),
  (OrgChart.FIRE_DRAG_NOT_CLICK_IF_MOVE = 3),
  (OrgChart.STRING_TAGS = !1),
  (OrgChart.MAX_NODES_MESS =
    "The trial has expired or 200 nodes limit was reached! <br /><a style='color: #039BE5;' target='_blank' href='https://balkan.app/OrgChartJS/Docs/Evaluation'>See more</a>"),
  (OrgChart.OFFLINE_MESS =
    "The evaluation version requires internet connection! <br /><a style='color: #039BE5;' target='_blank' href='https://balkan.app/OrgChartJS/Docs/Evaluation'>See more</a>"),
  (OrgChart.SEARCH_PLACEHOLDER = "Search... type ? to get help."),
  (OrgChart.SEARCH_HELP_SYMBOL = "?"),
  (OrgChart.SEARCH_CLOSE_RESULT_ON_ESCAPE_OR_CLICKOUTSIDE = !1),
  (OrgChart.SEARCH_RESULT_LIMIT = 10),
  (OrgChart.IMPORT_MESSAGE =
    "Choose the columns (fields) in your data file that contain the required information."),
  (OrgChart.FIXED_POSITION_ON_CLICK = !1),
  (OrgChart.RENDER_LINKS_BEFORE_NODES = !1),
  (OrgChart.RENDER_CLINKS_BEFORE_NODES = !1),
  (OrgChart.MIXED_LAYOUT_ALL_NODES = !0),
  (OrgChart.MIXED_LAYOUT_FOR_NODES_WITH_COLLAPSED_CHILDREN = !1),
  (OrgChart.MIXED_LAYOUT_IF_NUMBER_OF_CHILDREN_IS_MORE_THEN = 1),
  (OrgChart.LINK_ROUNDED_CORNERS = 5),
  (OrgChart.MOVE_STEP = 5),
  (OrgChart.CLINK_CURVE = 1),
  (OrgChart.MAX_DEPTH = 200),
  (OrgChart.SCALE_FACTOR = 1.44),
  (OrgChart.LAZY_LOADING_FACTOR = 500),
  (OrgChart.HIDE_EDIT_FORM_ON_PAN = !0),
  (OrgChart.LAZY_LOADING = !0),
  (OrgChart.ARRAY_FIELDS = ["tags"]),
  (OrgChart.CSV_DELIMITER = ","),
  (OrgChart.EDITFORM_CLOSE_BTN =
    '<svg data-edit-from-close class="boc-edit-form-close"><path style="fill:#ffffff;" d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111 C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587 c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"></path></svg>'),
  (OrgChart.ESCAPE_HTML = !1),
  (OrgChart.VERTICAL_CHILDREN_ASSISTANT = !1),
  (OrgChart.EXPORT_PAGES_CUT_NODES = !1),
  (OrgChart.RESET_MOVABLE_ONEXPANDCOLLAPSE = !1),
  "undefined" != typeof module && (module.exports = OrgChart),
  (OrgChart._intersects = function (t, e, r) {
    var i = t.x - r.siblingSeparation / 4,
      a = t.y,
      n = t.x + t.w + r.siblingSeparation / 4,
      o = t.y;
    switch (r.orientation) {
      case OrgChart.orientation.right:
      case OrgChart.orientation.right_top:
      case OrgChart.orientation.left:
      case OrgChart.orientation.left_top:
        (i = t.x),
          (a = t.y - r.siblingSeparation / 4),
          (n = t.x),
          (o = t.y + t.h + r.siblingSeparation / 4);
    }
    var l,
      s,
      h,
      d = e.p,
      c = e.q,
      g = e.r,
      p = e.s;
    return (
      0 !== (l = (n - i) * (p - c) - (g - d) * (o - a)) &&
      ((s = ((a - o) * (g - i) + (n - i) * (p - a)) / l),
      0 < (h = ((p - c) * (g - i) + (d - g) * (p - a)) / l) &&
        h < 1 &&
        0 < s &&
        s < 1)
    );
  }),
  (OrgChart._addPoint = function (t, e, r, i, a) {
    switch (r.orientation) {
      case OrgChart.orientation.top:
      case OrgChart.orientation.top_left:
        return OrgChart._addPointTop(t, e, r, i, a);
      case OrgChart.orientation.bottom:
      case OrgChart.orientation.bottom_left:
        return OrgChart._addPointBottom(t, e, r, i, a);
      case OrgChart.orientation.left:
      case OrgChart.orientation.left_top:
        return OrgChart._addPointLeft(t, e, r, i, a);
      case OrgChart.orientation.right:
      case OrgChart.orientation.right_top:
        return OrgChart._addPointRight(t, e, r, i, a);
    }
  }),
  (OrgChart._addPointTop = function (t, e, r, i, a) {
    var n, o, l;
    return (
      "left" == a
        ? (n = t.leftNeighbor
            ? t.x + (t.leftNeighbor.x + t.leftNeighbor.w - t.x) / 2
            : t.x - r.siblingSeparation / 2)
        : "right" == a &&
          (n = t.rightNeighbor
            ? t.x + t.w + (t.rightNeighbor.x - (t.x + t.w)) / 2
            : t.x + t.w + r.siblingSeparation / 2),
      e.push([n, e[e.length - 1][1]]),
      e.push([n, t.y - r.levelSeparation / 3]),
      (o = e[e.length - 1][1]),
      (l = n),
      (i.p = n),
      (i.q = o),
      (i.r = l),
      i
    );
  }),
  (OrgChart._addPointBottom = function (t, e, r, i, a) {
    var n, o, l;
    return (
      "left" == a
        ? (n = t.leftNeighbor
            ? t.x + (t.leftNeighbor.x + t.leftNeighbor.w - t.x) / 2
            : t.x - r.siblingSeparation / 2)
        : "right" == a &&
          (n = t.rightNeighbor
            ? t.x + t.w + (t.rightNeighbor.x - (t.x + t.w)) / 2
            : t.x + t.w + r.siblingSeparation / 2),
      e.push([n, e[e.length - 1][1]]),
      e.push([n, t.y + t.h + r.levelSeparation / 3]),
      (o = e[e.length - 1][1]),
      (l = n),
      (i.p = n),
      (i.q = o),
      (i.r = l),
      i
    );
  }),
  (OrgChart._addPointLeft = function (t, e, r, i, a) {
    var n,
      o = e[e.length - 1][0];
    "bottom" == a
      ? (n = t.rightNeighbor
          ? t.y + t.h + (t.rightNeighbor.y - (t.y + t.h)) / 2
          : t.y + t.h + r.siblingSeparation / 2)
      : "top" == a &&
        (n = t.leftNeighbor
          ? t.y + (t.leftNeighbor.y + t.leftNeighbor.h - t.y) / 2
          : t.y - r.siblingSeparation / 2),
      e.push([e[e.length - 1][0], n]),
      e.push([t.x - r.levelSeparation / 3, n]),
      (o = e[e.length - 1][0]);
    var l = n;
    return (i.p = o), (i.q = n), (i.s = l), i;
  }),
  (OrgChart._addPointRight = function (t, e, r, i, a) {
    var n,
      o = e[e.length - 1][0];
    "bottom" == a
      ? (n = t.rightNeighbor
          ? t.y + t.h + (t.rightNeighbor.y - (t.y + t.h)) / 2
          : t.y + t.h + r.siblingSeparation / 2)
      : "top" == a &&
        (n = t.leftNeighbor
          ? t.y + (t.leftNeighbor.y + t.leftNeighbor.h - t.y) / 2
          : t.y - r.siblingSeparation / 2),
      e.push([e[e.length - 1][0], n]),
      e.push([t.x + t.w + r.levelSeparation / 3, n]),
      (o = e[e.length - 1][0]);
    var l = n;
    return (i.p = o), (i.q = n), (i.s = l), i;
  }),
  (OrgChart.editUI = function () {}),
  (OrgChart.editUI.prototype.init = function (t) {
    (this.obj = t), (this.fields = null), (this._event_id = OrgChart._guid());
  }),
  (OrgChart.editUI.prototype.on = function (t, e) {
    return OrgChart.events.on(t, e, this._event_id), this;
  }),
  (OrgChart.editUI.prototype.show = function (t, e, r) {
    if ((this.hide(), !1 === OrgChart.events.publish("show", [this, t])))
      return !1;
    var i = this,
      a = this.content(t, e, r);
    this.obj.element.appendChild(a.element),
      OrgChart.input.init(this.obj.element),
      r
        ? e || this._focusElement(a.focusId)
        : (this.interval = OrgChart.animate(
            a.element,
            { right: -20, opacity: 0 },
            { right: 0, opacity: 1 },
            300,
            OrgChart.anim.outSin,
            function () {
              e || i._focusElement(a.focusId);
            }
          )),
      this.obj.element
        .querySelector("[data-edit-from-close]")
        .addEventListener("click", function (e) {
          e.preventDefault(),
            !1 !== OrgChart.events.publish("cancel", [i, { id: t }]) &&
              i.hide();
        }),
      this.obj.element
        .querySelector("[data-edit-from-cancel]")
        .addEventListener("click", function (e) {
          e.preventDefault(),
            !1 !== OrgChart.events.publish("cancel", [i, { id: t }]) &&
              i.hide();
        }),
      this.obj.element
        .querySelector("[data-edit-from-save]")
        .addEventListener("click", function (e) {
          e.preventDefault();
          var r = OrgChart.input.validateAndGetData(a.element);
          if (!1 !== r) {
            var n = i.obj.get(t),
              o = { data: OrgChart.mergeDeep(n, r) };
            if (!1 === OrgChart.events.publish("save", [i, o])) return;
            i.obj.updateNode(o.data, null, !0), i.hide();
          }
        });
    for (
      var n = this.obj.element.querySelectorAll("[data-input-btn]"), o = 0;
      o < n.length;
      o++
    ) {
      n[o].addEventListener("click", function (e) {
        e.preventDefault(),
          OrgChart.events.publish("element-btn-click", [
            i,
            {
              input: this.parentNode.querySelector("input"),
              nodeId: t,
              event: e,
            },
          ]);
      });
    }
    this.obj.element
      .querySelector("[data-add-more-fields-btn]")
      .addEventListener("click", function (t) {
        t.stopPropagation(), t.preventDefault();
        var e = this,
          r = OrgChart.elements.textbox(
            {},
            {
              type: "textbox",
              label: i.obj.config.editForm.addMoreFieldName,
              btn: i.obj.config.editForm.addMoreBtn,
            },
            "280px"
          );
        e.parentNode.insertAdjacentHTML("beforebegin", r.html),
          (e.style.display = "none"),
          OrgChart.input.init(e.parentNode.previousSibling);
        var a = document.getElementById(r.id);
        a.focus(),
          a.nextElementSibling.addEventListener("click", function (t) {
            t.stopPropagation(), t.preventDefault();
            var r = a.value,
              n = i.obj.element.querySelector(
                '[data-binding="' + OrgChart._escapeDoubleQuotes(a.value) + '"]'
              );
            if (OrgChart.isNEU(r) || n) a.focus();
            else {
              var o = OrgChart.elements.textbox(
                {},
                { type: "textbox", label: r, binding: r },
                "280px"
              );
              a.parentNode.parentNode.parentNode.removeChild(
                a.parentNode.parentNode
              ),
                e.parentNode.insertAdjacentHTML("beforebegin", o.html),
                (e.style.display = ""),
                OrgChart.input.init(e.parentNode.previousSibling),
                document.getElementById(o.id).focus();
            }
          });
      }),
      this.obj.element
        .querySelector("[data-boc-edit-from-btns]")
        .addEventListener("click", function (e) {
          for (
            var r = e.target;
            r && r.hasAttribute && !r.hasAttribute("data-edit-from-btn");

          )
            r = r.parentNode;
          if (r && r.hasAttribute) {
            var n = r.getAttribute("data-edit-from-btn"),
              o = {
                button: i.obj.config.editForm.buttons[n],
                name: n,
                nodeId: t,
                event: e,
              };
            if (!1 === OrgChart.events.publish("button-click", [i, o]))
              return !1;
            switch (n) {
              case "edit":
                i.obj.editUI.show(t, !1, !0);
                break;
              case "pdf":
                i.obj.exportPDFProfile({ id: t, filename: a.title }), i.hide();
                break;
              case "png":
                i.obj.exportPNGProfile({ id: t, filename: a.title }), i.hide();
                break;
              case "share":
                i.obj.shareProfile(t);
                break;
              case "remove":
                i.obj.removeNode(t, null, !0), i.hide();
            }
          }
        });
  }),
  (OrgChart.editUI.prototype._focusElement = function (t) {
    var e = null;
    OrgChart.isNEU(this.obj.config.editForm.focusBinding)
      ? OrgChart.isNEU(t) || (e = document.getElementById(t))
      : (e = this.obj.element.querySelector(
          '[data-binding="' + this.obj.config.editForm.focusBinding + '"]'
        )),
      e &&
        (e.value &&
          e.value.length &&
          e.setSelectionRange(e.value.length, e.value.length),
        e.focus());
  }),
  (OrgChart.editUI.prototype.setAvatar = function (t) {
    var e = this.obj.element.querySelector("#boc-avatar");
    OrgChart.isNEU(t)
      ? (e.innerHTML = OrgChart.icon.user(150, 150, "#8C8C8C", 0, 0))
      : (e.innerHTML = `<img style="width: 100%;height:100%;object-fit:cover;border-radius: 50%;" src="${t}"></img>`);
  }),
  (OrgChart.editUI.prototype.content = function (t, e, r, i, a) {
    var n,
      o = this.obj.config.editForm.readOnly,
      l = JSON.parse(JSON.stringify(this.obj.config.editForm.elements)),
      s = this.obj.config.editForm.addMore,
      h = this.obj.config.editForm.saveAndCloseBtn,
      d = this.obj.config.editForm.cancelBtn,
      c = this.obj.config.editForm.buttons,
      g = this.obj.config.editForm.titleBinding,
      p = this.obj.config.editForm.photoBinding,
      u = this.obj.getNode(t),
      f = this.obj._get(t),
      m = OrgChart.t(u.templateName, u.min, this.obj.getScale()),
      C = f[g],
      O = f[p];
    if (this.obj.config.editForm.generateElementsFromFields)
      for (var b = 0; b < this.fields.length; b++) {
        var v = this.fields[b];
        if ("tags" != v) {
          for (var y = !1, x = 0; x < l.length; x++) {
            if (Array.isArray(l[x])) {
              for (var _ = 0; _ < l[x].length; _++)
                if (v == l[x][_].binding) {
                  y = !0;
                  break;
                }
            } else if (v == l[x].binding) {
              y = !0;
              break;
            }
            if (y) break;
          }
          y || l.push({ type: "textbox", label: v, binding: v });
        }
      }
    OrgChart.isNEU(C) && (C = ""),
      (O = OrgChart.isNEU(O)
        ? OrgChart.icon.user(150, 150, "#8C8C8C", 0, 0)
        : `<img style="width: 100%;height:100%;border-radius: 50%;object-fit:cover;" src="${O}"></img>`);
    var w = !e,
      k = e ? "display:none;" : "",
      S = e || !s ? "display:none;" : "",
      I = m.editFormHeaderColor
        ? `style="background-color:${m.editFormHeaderColor};"`
        : "",
      A = document.createElement("form");
    if (
      (A.setAttribute("data-boc-edit-form", ""),
      A.classList.add("boc-edit-form"),
      A.classList.add(this.obj.config.mode),
      A.classList.add(u.templateName.replaceAll(" ", "")),
      A.classList.add(OrgChart.ui._defsIds[u.templateName]),
      Array.isArray(u.tags) && u.tags.length)
    )
      for (b = 0; b < u.tags.length; b++)
        A.classList.add(u.tags[b].replaceAll(" ", ""));
    (A.style.display = "flex"),
      (A.style.opacity = r ? 1 : 0),
      (A.style.right = r ? 0 : "-20px"),
      i && (A.style.width = i);
    var L = [],
      N = a ? "" : OrgChart.EDITFORM_CLOSE_BTN;
    return (
      (A.innerHTML = `<div>\n                        <div class="boc-edit-form-header" ${I}>\n                            ${N}\n                            ${OrgChart.editUI.renderHeaderContent(
        C,
        O,
        u,
        f
      )}\n                        </div>\n                        <div data-boc-edit-from-btns class="boc-edit-form-instruments">\n                        ${(function () {
        if (a) return "";
        var t = "";
        for (var r in c) {
          var i = c[r];
          OrgChart.isNEU(i) ||
            (w && i.hideIfEditMode) ||
            (e && i.hideIfDetailsMode) ||
            (o && "Edit" == i.text) ||
            (t += `<div data-edit-from-btn='${r}' class="boc-img-button" ${I} title="${i.text}">${i.icon}</div>`);
        }
        return t;
      })()}    \n                        </div>\n                    </div>\n                    <div class="boc-edit-form-fields">\n                        <div class="boc-edit-form-fields-inner">\n                            <div class="boc-form-fieldset">\n                                ${(function () {
        for (var t = "", r = 0; r < l.length; r++) {
          var i = l[r];
          if (Array.isArray(i)) {
            t += '<div class="boc-form-field-100 boc-form-fieldset">';
            for (var a = 0; a < i.length; a++) {
              var o = i[a],
                s = OrgChart.elements[o.type](f, o, "unset", e);
              !OrgChart.isNEU(s.id) &&
                OrgChart.isNEU(n) &&
                OrgChart.isNEU(s.value) &&
                (n = s.id),
                OrgChart.isNEU(s.value) || L.push(`${o.label}: ${s.value}`),
                (t += s.html);
            }
            t += "</div>";
          } else {
            s = OrgChart.elements[i.type](f, i, "280px", e);
            !OrgChart.isNEU(s.id) &&
              OrgChart.isNEU(n) &&
              OrgChart.isNEU(s.value) &&
              (n = s.id),
              OrgChart.isNEU(s.value) || L.push(`${i.label}: ${s.value}`),
              (t += s.html);
          }
        }
        return t;
      })()}\n\n                                <div class="boc-form-field" style="min-width: 280px; text-align:center; ${S}">\n                                    <a data-add-more-fields-btn href="#" class="boc-link">${s}</a>\n                                </div>\n                            </div>        \n                        </div>\n                    </div>\n                    <div class="boc-form-fieldset" style="padding: 14px 10px; ${k}">\n                        <div class="boc-form-field" style="min-width: initial;">\n                            <button data-edit-from-cancel type="button" class="boc-button transparent">${d}</button>\n                        </div>\n                        <div class="boc-form-field" style="min-width: initial;">\n                            <button type="submit" data-edit-from-save type="button" class="boc-button">${h}</button>\n                        </div>\n                    </div>`),
      { element: A, focusId: n, title: C, shareText: L.join("\n") }
    );
  }),
  (OrgChart.editUI.prototype.hide = function () {
    if (!1 === OrgChart.events.publish("hide", [this])) return !1;
    OrgChart.isNEU(this.interval) &&
      (clearInterval(this.interval), (this.interval = null));
    var t = this.obj.element.querySelector("[data-boc-edit-form]");
    t && t.parentNode && t.parentNode.removeChild(t);
  }),
  (OrgChart.editUI.renderHeaderContent = function (t, e, r, i) {
    return `<h1 class="boc-edit-form-title">${OrgChart._escapeGreaterLessSign(
      t
    )}</h1>\n                <div id="boc-avatar" class="boc-edit-form-avatar">${e}</div>`;
  }),
  (OrgChart.prototype.getSvg = function () {
    var t = this.element.getElementsByTagName("svg");
    return t && t.length ? t[0] : null;
  }),
  (OrgChart.prototype.getPointerElement = function () {
    return this.element.querySelector("g[data-pointer]");
  }),
  (OrgChart.prototype.getNodeElement = function (t) {
    return this.element.querySelector(
      "[" + OrgChart.attr.node_id + "='" + t + "']"
    );
  }),
  (OrgChart.prototype.getMenuButton = function () {
    return this.element.querySelector(
      "[" + OrgChart.attr.control_export_menu + "]"
    );
  }),
  (OrgChart.menuUI = function () {}),
  (OrgChart.menuUI.prototype.init = function (t, e) {
    (this.obj = t),
      (this.wrapper = null),
      (this.menu = e),
      (this._event_id = OrgChart._guid());
  }),
  (OrgChart.menuUI.prototype.showStickIn = function (t, e, r, i) {
    this._show(t, null, e, r, i);
  }),
  (OrgChart.menuUI.prototype.show = function (t, e, r, i, a) {
    this._show(t, e, r, i, a);
  }),
  (OrgChart.menuUI.prototype._show = function (t, e, r, i, a) {
    var n = this;
    this.hide();
    var o = "";
    a || (a = this.menu);
    var l = { firstNodeId: r, secondNodeId: i, menu: a };
    if (!1 === OrgChart.events.publish("show", [this, l])) return !1;
    for (var s in (a = l.menu)) {
      var h = a[s].icon,
        d = a[s].text;
      void 0 === h &&
        (h = OrgChart.icon[s] ? OrgChart.icon[s](24, 24, "#7A7A7A") : ""),
        "function" == typeof d && (d = d()),
        "function" == typeof h && (h = h()),
        (o +=
          "<div " +
          OrgChart.attr.item +
          '="' +
          s +
          '">' +
          h +
          "<span>&nbsp;&nbsp;" +
          d +
          "</span></div>");
    }
    if ("" != o) {
      if (
        ((this.wrapper = document.createElement("div")),
        (this.wrapper.className = "boc-chart-menu"),
        (this.wrapper.style.left = "-99999px"),
        (this.wrapper.style.top = "-99999px"),
        (this.wrapper.innerHTML = o),
        this.obj.element.appendChild(this.wrapper),
        null == e)
      ) {
        var c = OrgChart._menuPosition(t, this.wrapper, this.obj.getSvg());
        (t = c.x), (e = c.y);
      }
      var g = t + 45;
      (this.wrapper.style.left = g + "px"),
        (this.wrapper.style.top = e + "px"),
        (this.wrapper.style.left = g - this.wrapper.offsetWidth + "px");
      var p = t - this.wrapper.offsetWidth;
      OrgChart.animate(
        this.wrapper,
        { opacity: 0, left: g - this.wrapper.offsetWidth },
        { opacity: 1, left: p },
        300,
        OrgChart.anim.inOutPow
      );
      for (
        var u = this.wrapper.getElementsByTagName("div"), f = 0;
        f < u.length;
        f++
      ) {
        (s = u[f]).addEventListener("click", function (t) {
          var e,
            o = this.getAttribute(OrgChart.attr.item);
          if (void 0 === a[o].onClick)
            if ("add" === o) {
              var l = { id: n.obj.generateId(), pid: r };
              n.obj.addNode(l, null, !0);
            } else if ("edit" === o) {
              var s = n.obj.getNode(r);
              n.obj.editUI.show(s.id);
            } else if ("details" === o) {
              s = n.obj.getNode(r);
              n.obj.editUI.show(s.id, !0);
            } else
              "remove" === o
                ? n.obj.removeNode(r, null, !0)
                : "svg" === o
                ? n.obj.exportSVG({
                    filename: "OrgChart.svg",
                    expandChildren: !1,
                    nodeId: r,
                  })
                : "pdf" === o
                ? n.obj.exportPDF({
                    filename: "OrgChart.pdf",
                    expandChildren: !1,
                    nodeId: r,
                  })
                : "png" === o
                ? n.obj.exportPNG({
                    filename: "OrgChart.png",
                    expandChildren: !1,
                    nodeId: r,
                  })
                : "csv" === o
                ? n.obj.exportCSV({ nodeId: r })
                : "xml" === o
                ? n.obj.exportXML({ nodeId: r })
                : "json" === o && n.obj.exportJSON({ nodeId: r });
          else e = a[o].onClick.call(n.obj, r, i);
          0 != e && n.hide();
        });
      }
    }
  }),
  (OrgChart.menuUI.prototype.isVisible = function () {
    return null != this.wrapper;
  }),
  (OrgChart.menuUI.prototype.hide = function () {
    null != this.wrapper &&
      (this.obj.element.removeChild(this.wrapper), (this.wrapper = null));
  }),
  (OrgChart.menuUI.prototype.on = function (t, e) {
    return OrgChart.events.on(t, e, this._event_id), this;
  }),
  (OrgChart.circleMenuUI = function () {}),
  (OrgChart.circleMenuUI.prototype.init = function (t, e) {
    (this.obj = t),
      (this.menu = e),
      (this._menu = null),
      (this._buttonsInterval = []),
      (this._linesInterval = []),
      (this._event_id = OrgChart._guid());
  }),
  (OrgChart.circleMenuUI.prototype.show = function (t, e) {
    this._show(t, e);
  }),
  (OrgChart.circleMenuUI.prototype._show = function (t, e) {
    var r = this,
      i = this.obj.getNode(t),
      a = OrgChart.t(i.templateName, i.min, this.obj.getScale());
    if (!OrgChart.isNEU(a.nodeCircleMenuButton)) {
      var n = this.obj.getSvg(),
        o = this.obj.element.querySelector(
          "[" + OrgChart.attr.control_node_circle_menu_id + '="' + t + '"]'
        ),
        l = this.obj.getNodeElement(t),
        s = OrgChart._getTransform(o),
        h = OrgChart._getTransform(l),
        d = s[4] + h[4],
        c = s[5] + h[5],
        g = o.querySelectorAll("line"),
        p = this.obj.element.querySelector(
          "[" + OrgChart.attr.control_node_circle_menu_wrraper_id + "]"
        );
      if (
        OrgChart.isNEU(p) ||
        p.getAttribute(OrgChart.attr.control_node_circle_menu_wrraper_id) != t
      ) {
        this.hide(), e || (e = this.menu);
        var u = { nodeId: t, menu: e },
          f = OrgChart.events.publish("show", [this, u]);
        if (((this._menu = e), !1 === f)) return !1;
        for (
          var m = 0,
            C = Object.keys(u.menu).length,
            O = 2 * a.nodeCircleMenuButton.radius + 4,
            b = 2 * Math.PI * O,
            v = b / C - (2 * a.nodeCircleMenuButton.radius + 2);
          v < 0;

        )
          (O += 8),
            (v =
              (b = 2 * Math.PI * O) / C -
              (2 * a.nodeCircleMenuButton.radius + 2));
        for (var y in ((p = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "g"
        )).setAttribute(OrgChart.attr.control_node_circle_menu_wrraper_id, t),
        p.setAttribute("transform", "matrix(1,0,0,1," + d + "," + c + ")"),
        n.appendChild(p),
        u.menu)) {
          var x = u.menu[y].icon,
            _ = u.menu[y].color,
            w = u.menu[y].text;
          "function" == typeof x && (x = x()),
            "function" == typeof _ && (_ = _()),
            "function" == typeof w && (w = w());
          var k = document.createElementNS("http://www.w3.org/2000/svg", "g");
          k.setAttribute("transform", "matrix(1,0,0,1,0,0)"),
            k.setAttribute(OrgChart.attr.control_node_circle_menu_name, y),
            (k.style.cursor = "pointer");
          var S = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "title"
          );
          OrgChart.isNEU(w) || (S.innerHTML = w);
          var I = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );
          I.setAttribute("cx", 0),
            I.setAttribute("cy", 0),
            I.setAttribute("r", a.nodeCircleMenuButton.radius),
            I.setAttribute("fill", _),
            I.setAttribute("stroke-width", "1"),
            I.setAttribute("stroke", a.nodeCircleMenuButton.stroke),
            k.appendChild(I),
            k.appendChild(S),
            (k.innerHTML += x),
            p.appendChild(k);
          var A = k.getElementsByTagName("svg")[0];
          if ((A.setAttribute("pointer-events", "none"), A)) {
            var L = parseInt(A.getAttribute("width")),
              N = parseInt(A.getAttribute("height"));
            A.setAttribute("x", -L / 2), A.setAttribute("y", -N / 2);
          }
          var E = (m * Math.PI) / (C / 2);
          m++;
          var M = Math.cos(E) * O,
            T = Math.sin(E) * O;
          this._buttonsInterval.push(
            OrgChart.animate(
              k,
              { transform: [1, 0, 0, 1, 0, 0] },
              { transform: [1, 0, 0, 1, M, T] },
              250,
              OrgChart.anim.outBack,
              function (t) {
                var e = t[0].getAttribute(
                    OrgChart.attr.control_node_circle_menu_name
                  ),
                  i = t[0].parentNode.getAttribute(
                    OrgChart.attr.control_node_circle_menu_wrraper_id
                  );
                t[0].addEventListener("mouseenter", function (t) {
                  OrgChart.events.publish("mouseenter", [
                    r,
                    { from: i, menuItem: u.menu[e], menuItemName: e, event: t },
                  ]);
                }),
                  t[0].addEventListener("mouseout", function (t) {
                    OrgChart.events.publish("mouseout", [
                      r,
                      {
                        from: i,
                        menuItem: u.menu[e],
                        menuItemName: e,
                        event: t,
                      },
                    ]);
                  });
              }
            )
          );
        }
        this._linesInterval.push(
          OrgChart.animate(
            g[0],
            {
              x1: -a.nodeCircleMenuButton.radius / 2,
              y1: -6,
              x2: a.nodeCircleMenuButton.radius / 2,
              y2: -6,
            },
            { x1: -7, y1: -7, x2: 7, y2: 7 },
            500,
            OrgChart.anim.inOutSin
          )
        ),
          this._linesInterval.push(
            OrgChart.animate(
              g[1],
              {
                x1: -a.nodeCircleMenuButton.radius / 2,
                y1: 0,
                x2: a.nodeCircleMenuButton.radius / 2,
                y2: 0,
              },
              { x1: 0, y1: 0, x2: 0, y2: 0 },
              500,
              OrgChart.anim.inOutSin
            )
          ),
          this._linesInterval.push(
            OrgChart.animate(
              g[2],
              {
                x1: -a.nodeCircleMenuButton.radius / 2,
                y1: 6,
                x2: a.nodeCircleMenuButton.radius / 2,
                y2: 6,
              },
              { x1: -7, y1: 7, x2: 7, y2: -7 },
              500,
              OrgChart.anim.inOutSin
            )
          );
      } else this.hide();
    }
  }),
  (OrgChart.circleMenuUI.prototype.hide = function () {
    for (var t = this._buttonsInterval.length - 1; t >= 0; t--)
      clearInterval(this._buttonsInterval[t]),
        this._buttonsInterval.splice(t, 1);
    this._buttonsInterval = [];
    for (t = this._linesInterval.length - 1; t >= 0; t--)
      clearInterval(this._linesInterval[t]), this._linesInterval.splice(t, 1);
    this._linesInterval = [];
    var e = this.obj.element.querySelector(
      "[" + OrgChart.attr.control_node_circle_menu_wrraper_id + "]"
    );
    if (null != e) {
      var r = e.getAttribute(OrgChart.attr.control_node_circle_menu_wrraper_id),
        i = this.obj.getNode(r),
        a = OrgChart.t(i.templateName, i.min, this.obj.getScale()),
        n = this.obj.element
          .querySelector(
            "[" + OrgChart.attr.control_node_circle_menu_id + '="' + r + '"]'
          )
          .querySelectorAll("line");
      n[0].setAttribute("x1", -a.nodeCircleMenuButton.radius / 2),
        n[0].setAttribute("x2", a.nodeCircleMenuButton.radius / 2),
        n[0].setAttribute("y1", -6),
        n[0].setAttribute("y2", -6),
        n[1].setAttribute("x1", -a.nodeCircleMenuButton.radius / 2),
        n[1].setAttribute("x2", a.nodeCircleMenuButton.radius / 2),
        n[1].setAttribute("y1", 0),
        n[1].setAttribute("y2", 0),
        n[2].setAttribute("x1", -a.nodeCircleMenuButton.radius / 2),
        n[2].setAttribute("x2", a.nodeCircleMenuButton.radius / 2),
        n[2].setAttribute("y1", 6),
        n[2].setAttribute("y2", 6),
        e.parentElement.removeChild(e),
        (e = null);
    }
  }),
  (OrgChart.circleMenuUI.prototype.on = function (t, e) {
    return OrgChart.events.on(t, e, this._event_id), this;
  }),
  void 0 === OrgChart && (OrgChart = {}),
  (OrgChart.idb = {
    version: 1,
    dbName: "BALKAN",
    tableName: "orgchart-js",
    keyPath: "id",
  }),
  (OrgChart.idb.db = null),
  (OrgChart.idb._open = function (t) {
    if (OrgChart._browser().msie) t && t(!1);
    else if (
      (navigator.userAgent.toLowerCase().indexOf("safari") > 0 ||
        navigator.userAgent.toLowerCase().indexOf("firefox") > 0) &&
      window.location !== window.parent.location
    )
      t && t(!1);
    else {
      if (!window.indexedDB)
        return (
          console.error(
            "Your browser doesn't support a stable version of IndexedDB."
          ),
          void (t && t(!1))
        );
      if (null == OrgChart.idb.db) {
        var e = indexedDB.open(OrgChart.idb.dbName, OrgChart.idb.version);
        (e.onerror = function (e) {
          console.error("Cannot open database!"), t && t(!1);
        }),
          (e.onsuccess = function (e) {
            (OrgChart.idb.db = e.target.result), t && t(!0);
          }),
          (e.onupgradeneeded = function (t) {
            var e = t.target.result;
            e.objectStoreNames.contains(OrgChart.idb.tableName) &&
              e.deleteObjectStore(OrgChart.idb.tableName);
            e.createObjectStore(OrgChart.idb.tableName, {
              keyPath: OrgChart.idb.keyPath,
            });
          });
      } else t && t(!0);
    }
  }),
  (OrgChart.idb.read = function (t, e) {
    OrgChart.idb._open(function (r) {
      if (r) {
        var i = OrgChart.idb.db
          .transaction([OrgChart.idb.tableName])
          .objectStore(OrgChart.idb.tableName)
          .get(t);
        (i.onerror = function (t) {
          console.error("Unable to retrieve data from database!"), e && e(!1);
        }),
          (i.onsuccess = function (t) {
            i.result ? e && e(!0, i.result) : e && e(null);
          });
      } else e && e(!1);
    });
  }),
  (OrgChart.idb.write = function (t, e) {
    OrgChart.idb.read(t.id, function (r) {
      if (null == r) {
        var i = OrgChart.idb.db
          .transaction([OrgChart.idb.tableName], "readwrite")
          .objectStore(OrgChart.idb.tableName)
          .add(t);
        (i.onerror = function (t) {
          console.error("Unable to add data to database!"), e && e(!1);
        }),
          (i.onsuccess = function (t) {
            e && e(!0);
          });
      } else e && e(r);
    });
  }),
  (OrgChart.idb.put = function (t, e) {
    OrgChart.idb._open(function (r) {
      if (r) {
        var i = OrgChart.idb.db
          .transaction([OrgChart.idb.tableName], "readwrite")
          .objectStore(OrgChart.idb.tableName)
          .put(t);
        (i.onerror = function (t) {
          console.error("Unable to put data to database!"), e && e(!1);
        }),
          (i.onsuccess = function (t) {
            e && e(!0);
          });
      } else e && e(!1);
    });
  }),
  (OrgChart.idb.delete = function (t, e) {
    OrgChart.idb._open(function (r) {
      if (r) {
        var i = OrgChart.idb.db
          .transaction([OrgChart.idb.tableName], "readwrite")
          .objectStore(OrgChart.idb.tableName)
          .delete(t);
        (i.onerror = function (t) {
          console.error("Unable to retrieve data from database!"), e && e(!1);
        }),
          (i.onsuccess = function (t) {
            i.error ? e && e(!1) : e && e(!0);
          });
      } else e && e(!1);
    });
  }),
  (OrgChart.toolbarUI = function () {}),
  (OrgChart.toolbarUI.expandAllIcon =
    '<svg style="margin-bottom:7px;box-shadow: 0px 1px 4px rgba(0,0,0,0.3); border: 1px solid #cacaca;background-color: #f9f9f9;display: block;cursor: pointer;" width="32px" height="32px"><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#757575" /></marker><line x1="11" y1="11" x2="6" y2="6" stroke="#757575" stroke-width="2" marker-end="url(#arrow)" /><line x1="21" y1="11" x2="26" y2="6" stroke="#757575" stroke-width="2" marker-end="url(#arrow)" /><line x1="21" y1="21" x2="26" y2="26" stroke="#757575" stroke-width="2" marker-end="url(#arrow)" /><line x1="11" y1="21" x2="6" y2="26" stroke="#757575" stroke-width="2" marker-end="url(#arrow)" /><rect x="12" y="12" width="8" height="8" fill="#757575"></rect></svg>'),
  (OrgChart.toolbarUI.fitIcon =
    '<svg  style="margin-bottom:7px;box-shadow: 0px 1px 4px rgba(0,0,0,0.3); border: 1px solid #cacaca;background-color: #f9f9f9;display: block;cursor: pointer;" width="32px" height="32px"><path stroke-width="3" fill="none" stroke="#757575" d="M4,11 L4,4 L11,4"></path><path stroke-width="3" fill="none" stroke="#757575" d="M28,11 L28,4 L21,4"></path><path stroke-width="3" fill="none" stroke="#757575" d="M28,21 L28,28 L21,28"></path><path stroke-width="3" fill="none" stroke="#757575" d="M4,21 L4,28 L11,28"></path><circle cx="16" cy="16" r="5" fill="#757575"></circle></svg>'),
  (OrgChart.toolbarUI.openFullScreenIcon =
    '<svg  style="margin-bottom:7px;box-shadow: 0px 1px 4px rgba(0,0,0,0.3); border: 1px solid #cacaca;background-color: #f9f9f9;display: block;cursor: pointer;" width="32px" height="32px"><path stroke-width="3" fill="none" stroke="#757575" d="M4,11 L4,4 L11,4"></path><path stroke-width="3" fill="none" stroke="#757575" d="M28,11 L28,4 L21,4"></path><path stroke-width="3" fill="none" stroke="#757575" d="M28,21 L28,28 L21,28"></path><path stroke-width="3" fill="none" stroke="#757575" d="M4,21 L4,28 L11,28"></path><line x1="5" y1="5" x2="27" y2="27" stroke-width="3" stroke="#757575"></line><line x1="5" y1="27" x2="27" y2="5" stroke-width="3" stroke="#757575"></line></svg>'),
  (OrgChart.toolbarUI.closeFullScreenIcon =
    '<svg  style="margin-bottom:7px;box-shadow: 0px 1px 4px rgba(0,0,0,0.3); border: 1px solid #cacaca;background-color: #f9f9f9;display: block;cursor: pointer;" width="32px" height="32px"><path stroke-width="3" fill="none" stroke="#757575" d="M4,11 L4,4 L11,4"></path><path stroke-width="3" fill="none" stroke="#757575" d="M28,11 L28,4 L21,4"></path><path stroke-width="3" fill="none" stroke="#757575" d="M28,21 L28,28 L21,28"></path><path stroke-width="3" fill="none" stroke="#757575" d="M4,21 L4,28 L11,28"></path><rect x="11" y="11" width="10" height="10" stroke-width="3" fill="none" stroke="#757575" ></rect></svg>'),
  (OrgChart.toolbarUI.zoomInIcon =
    '<svg style="box-shadow: 0px 1px 4px rgba(0,0,0,0.3); border-left: 1px solid #cacaca; border-right: 1px solid #cacaca; border-top: 1px solid #cacaca; background-color: #f9f9f9;display: block; cursor: pointer;" width="32px" height="32px" ><g><rect fill="#f9f9f9" x="0" y="0" width="32" height="32" ></rect><line x1="8" y1="16" x2="24" y2="16" stroke-width="3" stroke="#757575"></line><line x1="16" y1="8" x2="16" y2="24" stroke-width="3" stroke="#757575"></line></g><line x1="4" y1="32" x2="28" y2="32" stroke-width="1" stroke="#cacaca"></line></svg>'),
  (OrgChart.toolbarUI.zoomOutIcon =
    '<svg style="box-shadow: 0px 1px 4px rgba(0,0,0,0.3); margin-bottom:7px; border-left: 1px solid #cacaca; border-right: 1px solid #cacaca; border-bottom: 1px solid #cacaca; background-color: #f9f9f9;display: block; cursor: pointer;" width="32px" height="32px" ><g><rect fill="#f9f9f9" x="0" y="0" width="32" height="32" ></rect><line x1="8" y1="16" x2="24" y2="16" stroke-width="3" stroke="#757575"></line></g></svg>'),
  (OrgChart.toolbarUI.layoutIcon =
    "<svg " +
    OrgChart.attr.tlbr +
    '="layout" style="box-shadow: 0px 1px 4px rgba(0,0,0,0.3); border: 1px solid #cacaca;background-color: #f9f9f9;display: block;cursor: pointer;" width="32px" height="32px"><path stroke-width="3" fill="none" stroke="#757575" d="M8,24 L16,14 L24,24"></path><path stroke-width="3" fill="none" stroke="#757575" d="M8,16 L16,8 L24,16"></path></svg>'),
  (OrgChart.toolbarUI.prototype.init = function (t, e) {
    if (e) {
      (this.obj = t),
        (this.toolbar = e),
        (this._visible = !1),
        (this.div = document.createElement("div")),
        this.div.classList.add("boc-toolbar-container"),
        Object.assign(this.div.style, {
          position: "absolute",
          padding: "3px",
          right: this.obj.config.padding - 10 + "px",
          bottom: this.obj.config.padding - 10 + "px",
        }),
        e.expandAll &&
          (this.div.innerHTML +=
            "<div " +
            OrgChart.attr.tlbr +
            '="expand">' +
            OrgChart.toolbarUI.expandAllIcon +
            "</div>"),
        e.fit &&
          (this.div.innerHTML +=
            "<div " +
            OrgChart.attr.tlbr +
            '="fit">' +
            OrgChart.toolbarUI.fitIcon +
            "</div>"),
        e.zoom &&
          ((this.div.innerHTML +=
            "<div " +
            OrgChart.attr.tlbr +
            '="plus">' +
            OrgChart.toolbarUI.zoomInIcon +
            "</div>"),
          (this.div.innerHTML +=
            "<div " +
            OrgChart.attr.tlbr +
            '="minus">' +
            OrgChart.toolbarUI.zoomOutIcon +
            "</div>")),
        e.layout &&
          ((this.div.innerHTML +=
            "<div " +
            OrgChart.attr.tlbr +
            '="layout">' +
            OrgChart.toolbarUI.layoutIcon +
            "</div>"),
          (this.layouts = document.createElement("div")),
          this.layouts.classList.add("boc-toolbar-layout"),
          (this.layouts.innerHTML =
            '<svg data-layout="normal" style="cursor: pointer;" width="110" height="100"><rect fill="#039BE5" x="35" y="0" width="50" height="27"></rect><rect fill="#F57C00" x="7" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="63" y="41" width="50" height="27"></rect><line stroke="#000000" x1="60" x2="60" y1="27" y2="35" stroke-width="1"></line><line stroke="#000000" x1="32" x2="88" y1="35" y2="35" stroke-width="1"></line><line stroke="#000000" x1="32" x2="32" y1="35" y2="41" stroke-width="1"></line><line stroke="#000000" x1="88" x2="88" y1="35" y2="41" stroke-width="1"></line></svg>\n            <svg data-layout="treeRightOffset" style="cursor: pointer;" width="110" height="100"><rect fill="#039BE5" x="35" y="0" width="50" height="27"></rect><rect fill="#F57C00" x="40" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="40" y="73" width="50" height="27"></rect><line stroke="#000000" x1="60" x2="60" y1="27" y2="35" stroke-width="1"></line><line stroke="#000000" x1="60" x2="35" y1="35" y2="35" stroke-width="1"></line><line stroke="#000000" x1="35" x2="35" y1="35" y2="86" stroke-width="1"></line><line stroke="#000000" x1="35" x2="40" y1="86" y2="86" stroke-width="1"></line><line stroke="#000000" x1="35" x2="40" y1="54" y2="54" stroke-width="1"></line></svg>\n            <svg data-layout="treeLeftOffset" style="cursor: pointer;" width="110" height="100"><rect fill="#039BE5" x="35" y="0" width="50" height="27"></rect><rect fill="#F57C00" x="30" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="30" y="73" width="50" height="27"></rect><line stroke="#000000" x1="60" x2="60" y1="27" y2="35" stroke-width="1"></line><line stroke="#000000" x1="60" x2="85" y1="35" y2="35" stroke-width="1"></line><line stroke="#000000" x1="85" x2="85" y1="35" y2="86" stroke-width="1"></line><line stroke="#000000" x1="80" x2="85" y1="86" y2="86" stroke-width="1"></line><line stroke="#000000" x1="80" x2="85" y1="54" y2="54" stroke-width="1"></line></svg>\n            <svg data-layout="mixed" style="cursor: pointer;" width="110" height="100"><rect fill="#039BE5" x="35" y="0" width="50" height="27"></rect><rect fill="#F57C00" x="35" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="35" y="73" width="50" height="27"></rect><line stroke="#000000" x1="60" x2="60" y1="27" y2="41" stroke-width="1"></line><line stroke="#000000" x1="60" x2="60" y1="68" y2="73" stroke-width="1"></line></svg>\n            <svg data-layout="tree" style="cursor: pointer;" width="110" height="100"><rect fill="#039BE5" x="35" y="0" width="50" height="27"></rect><rect fill="#F57C00" x="7" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="35" y="73" width="50" height="27"></rect><rect fill="#F57C00" x="63" y="41" width="50" height="27"></rect><line stroke="#000000" x1="60" x2="60" y1="27" y2="73" stroke-width="1"></line><line stroke="#000000" x1="57" x2="63" y1="54" y2="54" stroke-width="1"></line></svg>\n            <svg data-layout="grid" style="cursor: pointer;" width="110" height="100"><rect fill="#039BE5" x="35" y="0" width="50" height="27"></rect><rect fill="#F57C00" x="7" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="7" y="73" width="50" height="27"></rect><rect fill="#F57C00" x="63" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="63" y="73" width="50" height="27"></rect><line stroke="#000000" x1="60" x2="60" y1="27" y2="71" stroke-width="1"></line><line stroke="#000000" x1="32" x2="88" y1="39" y2="39" stroke-width="1"></line><line stroke="#000000" x1="32" x2="88" y1="71" y2="71" stroke-width="1"></line><line stroke="#000000" x1="32" x2="32" y1="71" y2="73" stroke-width="1"></line><line stroke="#000000" x1="88" x2="88" y1="71" y2="73" stroke-width="1"></line><line stroke="#000000" x1="32" x2="32" y1="39" y2="41" stroke-width="1"></line><line stroke="#000000" x1="88" x2="88" y1="39" y2="41" stroke-width="1"></line></svg>'),
          this.obj.element.appendChild(this.layouts)),
        e.fullScreen &&
          (this.div.innerHTML +=
            "<div " +
            OrgChart.attr.tlbr +
            '="fullScreen">' +
            OrgChart.toolbarUI.openFullScreenIcon +
            "</div>"),
        this.obj.element.appendChild(this.div),
        (this.layoutBtn = this.div.querySelector(
          "[" + OrgChart.attr.tlbr + '="layout"]'
        ));
      var r = this.div.querySelector("[" + OrgChart.attr.tlbr + '="plus"]'),
        i = this.div.querySelector("[" + OrgChart.attr.tlbr + '="minus"]'),
        a = this.div.querySelector("[" + OrgChart.attr.tlbr + '="fit"]'),
        n = this.div.querySelector("[" + OrgChart.attr.tlbr + '="fullScreen"]'),
        o = this.div.querySelector("[" + OrgChart.attr.tlbr + '="expand"]'),
        l = this;
      r &&
        r.addEventListener("click", function () {
          l.obj.zoom(!0, null, !0);
        }),
        i &&
          i.addEventListener("click", function () {
            l.obj.zoom(!1, null, !0);
          }),
        a &&
          a.addEventListener("click", function () {
            l.obj.fit();
          }),
        n &&
          n.addEventListener("click", function () {
            l.obj.toggleFullScreen();
          }),
        o &&
          o.addEventListener("click", function () {
            l.obj.expand(null, "all");
          }),
        this.layoutBtn &&
          this.layoutBtn.addEventListener("click", function () {
            l._visible ? l.hideLayout() : l.showLayout();
          }),
        this.layouts &&
          this.layouts.addEventListener("click", function (t) {
            for (var e = t.target; e; ) {
              if (e.hasAttribute && e.hasAttribute(OrgChart.attr.layout)) {
                (e = e.getAttribute(OrgChart.attr.layout)),
                  l.obj.setLayout(OrgChart.layout[e]);
                break;
              }
              e = e.parentNode;
            }
          });
    }
  }),
  (OrgChart.toolbarUI.prototype.showLayout = function () {
    (this._visible = !0),
      (this.layoutBtn.style.transform =
        "rotate(180deg) translateX(0px) translateY(0px)"),
      OrgChart.animate(
        this.div,
        { bottom: this.obj.config.padding - 10 },
        { bottom: this.obj.config.padding + 135 },
        this.obj.config.anim.duration,
        this.obj.config.anim.func
      ),
      OrgChart.animate(
        this.layouts,
        { bottom: -145 },
        { bottom: 0 },
        this.obj.config.anim.duration,
        this.obj.config.anim.func
      );
  }),
  (OrgChart.toolbarUI.prototype.hideLayout = function () {
    (this._visible = !1),
      (this.layoutBtn.style.transform =
        "rotate(0deg) translateX(0px) translateY(0px)"),
      OrgChart.animate(
        this.div,
        { bottom: this.obj.config.padding + 135 },
        { bottom: this.obj.config.padding - 10 },
        this.obj.config.anim.duration,
        this.obj.config.anim.func
      ),
      OrgChart.animate(
        this.layouts,
        { bottom: 0 },
        { bottom: -145 },
        this.obj.config.anim.duration,
        this.obj.config.anim.func
      );
  }),
  (OrgChart.notifierUI = function () {}),
  (OrgChart.notifierUI.prototype.init = function (t) {
    this.obj = t;
  }),
  (OrgChart.notifierUI.prototype.show = function (t, e) {
    if (null == t) return !1;
    1 == t && ((t = OrgChart.MAX_NODES_MESS), (e = "#FFCA28")),
      2 == t && ((t = OrgChart.OFFLINE_MESS), (e = "#FFCA28"));
    var r = document.createElement("div");
    (r.innerHTML = t),
      Object.assign(r.style, {
        position: "absolute",
        "background-color": e,
        color: "#ffffff",
        padding: "15px",
        "border-radius": "40px",
        opacity: 0,
        overflow: "hidden",
        "white-space": "nowrap",
        "text-align": "center",
      }),
      this.obj.element.appendChild(r);
    var i = this.obj.width() / 2 - r.offsetWidth / 2,
      a = this.obj.height() / 2 - r.offsetHeight / 2;
    (r.style.left = i + "px"), (r.style.top = a + "px");
    var n = r.offsetWidth;
    return (
      (r.style.width = "20px"),
      OrgChart.animate(
        r,
        { opacity: 0, width: 10 },
        { opacity: 1, width: n },
        this.obj.config.anim.duration,
        this.obj.config.anim.func
      ),
      !0
    );
  }),
  void 0 === OrgChart && (OrgChart = {}),
  (OrgChart.icon = {}),
  (OrgChart.icon.png = function (t, e, r) {
    return (
      '<svg width="' +
      t +
      '" height="' +
      e +
      '" viewBox="0 0 550.801 550.801"><path fill="' +
      r +
      '" d="M146.747,276.708c0-13.998-9.711-22.352-26.887-22.352c-6.99,0-11.726,0.675-14.204,1.355v44.927 c2.932,0.676,6.539,0.896,11.52,0.896C135.449,301.546,146.747,292.28,146.747,276.708z"/><path fill="' +
      r +
      '" d="M488.426,197.019H475.2v-63.816c0-0.398-0.063-0.799-0.116-1.202c-0.021-2.534-0.827-5.023-2.562-6.995L366.325,3.694 c-0.032-0.031-0.063-0.042-0.085-0.076c-0.633-0.707-1.371-1.295-2.151-1.804c-0.231-0.155-0.464-0.285-0.706-0.419 c-0.676-0.369-1.393-0.675-2.131-0.896c-0.2-0.056-0.38-0.138-0.58-0.19C359.87,0.119,359.037,0,358.193,0H97.2 c-11.918,0-21.6,9.693-21.6,21.601v175.413H62.377c-17.049,0-30.873,13.818-30.873,30.873v160.545 c0,17.043,13.824,30.87,30.873,30.87h13.224V529.2c0,11.907,9.682,21.601,21.6,21.601h356.4c11.907,0,21.6-9.693,21.6-21.601 V419.302h13.226c17.044,0,30.871-13.827,30.871-30.87v-160.54C519.297,210.838,505.47,197.019,488.426,197.019z M97.2,21.605 h250.193v110.513c0,5.967,4.841,10.8,10.8,10.8h95.407v54.108H97.2V21.605z M234.344,335.86v45.831h-31.601V229.524h40.184 l31.611,55.759c9.025,16.031,18.064,34.983,24.825,52.154h0.675c-2.257-20.103-2.933-40.643-2.933-63.44v-44.473h31.614v152.167 h-36.117l-32.516-58.703c-9.049-16.253-18.971-35.892-26.438-53.727l-0.665,0.222C233.906,289.58,234.344,311.027,234.344,335.86z M71.556,381.691V231.56c10.613-1.804,25.516-3.159,46.506-3.159c21.215,0,36.353,4.061,46.509,12.192 c9.698,7.673,16.255,20.313,16.255,35.219c0,14.897-4.959,27.549-13.999,36.123c-11.738,11.063-29.123,16.031-49.441,16.031 c-4.522,0-8.593-0.231-11.736-0.675v54.411H71.556V381.691z M453.601,523.353H97.2V419.302h356.4V523.353z M485.652,374.688 c-10.61,3.607-30.713,8.585-50.805,8.585c-27.759,0-47.872-7.003-61.857-20.545c-13.995-13.1-21.684-32.97-21.452-55.318 c0.222-50.569,37.03-79.463,86.917-79.463c19.644,0,34.783,3.829,42.219,7.446l-7.214,27.543c-8.369-3.617-18.752-6.55-35.458-6.55 c-28.656,0-50.341,16.256-50.341,49.22c0,31.382,19.649,49.892,47.872,49.892c7.895,0,14.218-0.901,16.934-2.257v-31.835h-23.493 v-26.869h56.679V374.688z"/></svg>'
    );
  }),
  (OrgChart.icon.pdf = function (t, e, r) {
    return (
      '<svg width="' +
      t +
      '" height="' +
      e +
      '" viewBox="0 0 550.801 550.801"><path fill="' +
      r +
      '" d="M160.381,282.225c0-14.832-10.299-23.684-28.474-23.684c-7.414,0-12.437,0.715-15.071,1.432V307.6 c3.114,0.707,6.942,0.949,12.192,0.949C148.419,308.549,160.381,298.74,160.381,282.225z"/><path fill="' +
      r +
      '" d="M272.875,259.019c-8.145,0-13.397,0.717-16.519,1.435v105.523c3.116,0.729,8.142,0.729,12.69,0.729 c33.017,0.231,54.554-17.946,54.554-56.474C323.842,276.719,304.215,259.019,272.875,259.019z"/><path fill="' +
      r +
      '" d="M488.426,197.019H475.2v-63.816c0-0.398-0.063-0.799-0.116-1.202c-0.021-2.534-0.827-5.023-2.562-6.995L366.325,3.694 c-0.032-0.031-0.063-0.042-0.085-0.076c-0.633-0.707-1.371-1.295-2.151-1.804c-0.231-0.155-0.464-0.285-0.706-0.419 c-0.676-0.369-1.393-0.675-2.131-0.896c-0.2-0.056-0.38-0.138-0.58-0.19C359.87,0.119,359.037,0,358.193,0H97.2 c-11.918,0-21.6,9.693-21.6,21.601v175.413H62.377c-17.049,0-30.873,13.818-30.873,30.873v160.545 c0,17.043,13.824,30.87,30.873,30.87h13.224V529.2c0,11.907,9.682,21.601,21.6,21.601h356.4c11.907,0,21.6-9.693,21.6-21.601 V419.302h13.226c17.044,0,30.871-13.827,30.871-30.87v-160.54C519.297,210.838,505.47,197.019,488.426,197.019z M97.2,21.605 h250.193v110.513c0,5.967,4.841,10.8,10.8,10.8h95.407v54.108H97.2V21.605z M362.359,309.023c0,30.876-11.243,52.165-26.82,65.333 c-16.971,14.117-42.82,20.814-74.396,20.814c-18.9,0-32.297-1.197-41.401-2.389V234.365c13.399-2.149,30.878-3.346,49.304-3.346 c30.612,0,50.478,5.508,66.039,17.226C351.828,260.69,362.359,280.547,362.359,309.023z M80.7,393.499V234.365 c11.241-1.904,27.042-3.346,49.296-3.346c22.491,0,38.527,4.308,49.291,12.928c10.292,8.131,17.215,21.534,17.215,37.328 c0,15.799-5.25,29.198-14.829,38.285c-12.442,11.728-30.865,16.996-52.407,16.996c-4.778,0-9.1-0.243-12.435-0.723v57.67H80.7 V393.499z M453.601,523.353H97.2V419.302h356.4V523.353z M484.898,262.127h-61.989v36.851h57.913v29.674h-57.913v64.848h-36.593 V232.216h98.582V262.127z"/></svg>'
    );
  }),
  (OrgChart.icon.svg = function (t, e, r) {
    return (
      '<svg width="' +
      t +
      '" height="' +
      e +
      '" viewBox="0 0 550.801 550.801"><path fill="' +
      r +
      '" d="M488.426,197.019H475.2v-63.816c0-0.398-0.063-0.799-0.116-1.202c-0.021-2.534-0.827-5.023-2.562-6.995L366.325,3.694 c-0.032-0.031-0.063-0.042-0.085-0.076c-0.633-0.707-1.371-1.295-2.151-1.804c-0.231-0.155-0.464-0.285-0.706-0.419 c-0.676-0.369-1.393-0.675-2.131-0.896c-0.2-0.056-0.38-0.138-0.58-0.19C359.87,0.119,359.037,0,358.193,0H97.2 c-11.918,0-21.6,9.693-21.6,21.601v175.413H62.377c-17.049,0-30.873,13.818-30.873,30.873v160.545 c0,17.043,13.824,30.87,30.873,30.87h13.224V529.2c0,11.907,9.682,21.601,21.6,21.601h356.4c11.907,0,21.6-9.693,21.6-21.601 V419.302h13.226c17.044,0,30.871-13.827,30.871-30.87v-160.54C519.297,210.838,505.47,197.019,488.426,197.019z M97.2,21.605 h250.193v110.513c0,5.967,4.841,10.8,10.8,10.8h95.407v54.108H97.2V21.605z M338.871,225.672L284.545,386.96h-42.591 l-51.69-161.288h39.967l19.617,68.196c5.508,19.143,10.531,37.567,14.36,57.67h0.717c4.061-19.385,9.089-38.527,14.592-56.953 l20.585-68.918h38.77V225.672z M68.458,379.54l7.415-30.153c9.811,5.021,24.888,10.051,40.439,10.051 c16.751,0,25.607-6.935,25.607-17.465c0-10.052-7.662-15.795-27.05-22.734c-26.8-9.328-44.263-24.168-44.263-47.611 c0-27.524,22.971-48.579,61.014-48.579c18.188,0,31.591,3.823,41.159,8.131l-8.126,29.437c-6.465-3.116-17.945-7.657-33.745-7.657 c-15.791,0-23.454,7.183-23.454,15.552c0,10.296,9.089,14.842,29.917,22.731c28.468,10.536,41.871,25.365,41.871,48.094 c0,27.042-20.812,50.013-65.09,50.013C95.731,389.349,77.538,384.571,68.458,379.54z M453.601,523.353H97.2V419.302h356.4V523.353z M488.911,379.54c-11.243,3.823-32.537,9.103-53.831,9.103c-29.437,0-50.73-7.426-65.57-21.779 c-14.839-13.875-22.971-34.942-22.738-58.625c0.253-53.604,39.255-84.235,92.137-84.235c20.81,0,36.852,4.073,44.74,7.896 l-7.657,29.202c-8.859-3.829-19.849-6.95-37.567-6.95c-30.396,0-53.357,17.233-53.357,52.173c0,33.265,20.81,52.882,50.73,52.882 c8.375,0,15.072-0.96,17.94-2.395v-33.745h-24.875v-28.471h60.049V379.54L488.911,379.54z" /></svg>'
    );
  }),
  (OrgChart.icon.csv = function (t, e, r) {
    return (
      '<svg width="' +
      t +
      '" height="' +
      e +
      '" viewBox="0 0 548.29 548.291" ><path fill="' +
      r +
      '" d="M486.2,196.121h-13.164V132.59c0-0.399-0.064-0.795-0.116-1.2c-0.021-2.52-0.824-5-2.551-6.96L364.656,3.677 c-0.031-0.034-0.064-0.044-0.085-0.075c-0.629-0.707-1.364-1.292-2.141-1.796c-0.231-0.157-0.462-0.286-0.704-0.419 c-0.672-0.365-1.386-0.672-2.121-0.893c-0.199-0.052-0.377-0.134-0.576-0.188C358.229,0.118,357.4,0,356.562,0H96.757 C84.893,0,75.256,9.649,75.256,21.502v174.613H62.093c-16.972,0-30.733,13.756-30.733,30.73v159.81 c0,16.966,13.761,30.736,30.733,30.736h13.163V526.79c0,11.854,9.637,21.501,21.501,21.501h354.777 c11.853,0,21.502-9.647,21.502-21.501V417.392H486.2c16.966,0,30.729-13.764,30.729-30.731v-159.81 C516.93,209.872,503.166,196.121,486.2,196.121z M96.757,21.502h249.053v110.006c0,5.94,4.818,10.751,10.751,10.751h94.973v53.861 H96.757V21.502z M258.618,313.18c-26.68-9.291-44.063-24.053-44.063-47.389c0-27.404,22.861-48.368,60.733-48.368 c18.107,0,31.447,3.811,40.968,8.107l-8.09,29.3c-6.43-3.107-17.862-7.632-33.59-7.632c-15.717,0-23.339,7.149-23.339,15.485 c0,10.247,9.047,14.769,29.78,22.632c28.341,10.479,41.681,25.239,41.681,47.874c0,26.909-20.721,49.786-64.792,49.786 c-18.338,0-36.449-4.776-45.497-9.77l7.38-30.016c9.772,5.014,24.775,10.006,40.264,10.006c16.671,0,25.488-6.908,25.488-17.396 C285.536,325.789,277.909,320.078,258.618,313.18z M69.474,302.692c0-54.781,39.074-85.269,87.654-85.269 c18.822,0,33.113,3.811,39.549,7.149l-7.392,28.816c-7.38-3.084-17.632-5.939-30.491-5.939c-28.822,0-51.206,17.375-51.206,53.099 c0,32.158,19.051,52.4,51.456,52.4c10.947,0,23.097-2.378,30.241-5.238l5.483,28.346c-6.672,3.34-21.674,6.919-41.208,6.919 C98.06,382.976,69.474,348.424,69.474,302.692z M451.534,520.962H96.757v-103.57h354.777V520.962z M427.518,380.583h-42.399 l-51.45-160.536h39.787l19.526,67.894c5.479,19.046,10.479,37.386,14.299,57.397h0.709c4.048-19.298,9.045-38.352,14.526-56.693 l20.487-68.598h38.599L427.518,380.583z" /></svg>'
    );
  }),
  (OrgChart.icon.json = function (t, e, r) {
    return (
      '<svg width="' +
      t +
      '" height="' +
      e +
      '" viewBox="0 0 32 32" ><polygon fill="' +
      r +
      '"  points="31 11 31 21 29 21 27 15 27 21 25 21 25 11 27 11 29 17 29 11 31 11"/><path fill="' +
      r +
      '"  d="M21.3335,21h-2.667A1.6684,1.6684,0,0,1,17,19.3335v-6.667A1.6684,1.6684,0,0,1,18.6665,11h2.667A1.6684,1.6684,0,0,1,23,12.6665v6.667A1.6684,1.6684,0,0,1,21.3335,21ZM19,19h2V13H19Z"/><path fill="' +
      r +
      '"  d="M13.3335,21H9V19h4V17H11a2.002,2.002,0,0,1-2-2V12.6665A1.6684,1.6684,0,0,1,10.6665,11H15v2H11v2h2a2.002,2.002,0,0,1,2,2v2.3335A1.6684,1.6684,0,0,1,13.3335,21Z"/><path fill="' +
      r +
      '"  d="M5.3335,21H2.6665A1.6684,1.6684,0,0,1,1,19.3335V17H3v2H5V11H7v8.3335A1.6684,1.6684,0,0,1,5.3335,21Z"/><rect fill="' +
      r +
      '"  id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" style="fill: none;" width="32" height="32"/></svg>'
    );
  }),
  (OrgChart.icon.excel = function (t, e, r) {
    return (
      '<svg width="' +
      t +
      '" height="' +
      e +
      '" viewBox="0 0 512 512"><path fill="#ECEFF1" d="M496,432.011H272c-8.832,0-16-7.168-16-16s0-311.168,0-320s7.168-16,16-16h224 c8.832,0,16,7.168,16,16v320C512,424.843,504.832,432.011,496,432.011z" /><path fill="' +
      r +
      '" d="M336,176.011h-64c-8.832,0-16-7.168-16-16s7.168-16,16-16h64c8.832,0,16,7.168,16,16 S344.832,176.011,336,176.011z" /><path fill="' +
      r +
      '" d="M336,240.011h-64c-8.832,0-16-7.168-16-16s7.168-16,16-16h64c8.832,0,16,7.168,16,16 S344.832,240.011,336,240.011z" /><path fill="' +
      r +
      '" d="M336,304.011h-64c-8.832,0-16-7.168-16-16s7.168-16,16-16h64c8.832,0,16,7.168,16,16 S344.832,304.011,336,304.011z" /><path fill="' +
      r +
      '" d="M336,368.011h-64c-8.832,0-16-7.168-16-16s7.168-16,16-16h64c8.832,0,16,7.168,16,16 S344.832,368.011,336,368.011z" /><path fill="' +
      r +
      '" d="M432,176.011h-32c-8.832,0-16-7.168-16-16s7.168-16,16-16h32c8.832,0,16,7.168,16,16 S440.832,176.011,432,176.011z" /><path fill="' +
      r +
      '" d="M432,240.011h-32c-8.832,0-16-7.168-16-16s7.168-16,16-16h32c8.832,0,16,7.168,16,16 S440.832,240.011,432,240.011z" /><path fill="' +
      r +
      '" d="M432,304.011h-32c-8.832,0-16-7.168-16-16s7.168-16,16-16h32c8.832,0,16,7.168,16,16 S440.832,304.011,432,304.011z" /><path fill="' +
      r +
      '" d="M432,368.011h-32c-8.832,0-16-7.168-16-16s7.168-16,16-16h32c8.832,0,16,7.168,16,16 S440.832,368.011,432,368.011z" /><path fill="' +
      r +
      '"  d="M282.208,19.691c-3.648-3.04-8.544-4.352-13.152-3.392l-256,48C5.472,65.707,0,72.299,0,80.011v352 c0,7.68,5.472,14.304,13.056,15.712l256,48c0.96,0.192,1.952,0.288,2.944,0.288c3.712,0,7.328-1.28,10.208-3.68 c3.68-3.04,5.792-7.584,5.792-12.32v-448C288,27.243,285.888,22.731,282.208,19.691z" /><path fill="#FAFAFA" d="M220.032,309.483l-50.592-57.824l51.168-65.792c5.44-6.976,4.16-17.024-2.784-22.464 c-6.944-5.44-16.992-4.16-22.464,2.784l-47.392,60.928l-39.936-45.632c-5.856-6.72-15.968-7.328-22.56-1.504 c-6.656,5.824-7.328,15.936-1.504,22.56l44,50.304L83.36,310.187c-5.44,6.976-4.16,17.024,2.784,22.464 c2.944,2.272,6.432,3.36,9.856,3.36c4.768,0,9.472-2.112,12.64-6.176l40.8-52.48l46.528,53.152 c3.168,3.648,7.584,5.504,12.032,5.504c3.744,0,7.488-1.312,10.528-3.968C225.184,326.219,225.856,316.107,220.032,309.483z" /></svg>'
    );
  }),
  (OrgChart.icon.edit = function (t, e, r) {
    return (
      '<svg width="' +
      t +
      '" height="' +
      e +
      '" viewBox="0 0 528.899 528.899"><path fill="' +
      r +
      '" d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981 c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611 C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069 L27.473,390.597L0.3,512.69z" /></svg>'
    );
  }),
  (OrgChart.icon.details = function (t, e, r) {
    return (
      '<svg width="' +
      t +
      '" height="' +
      e +
      '" viewBox="0 0 512 512"><path fill="' +
      r +
      '" d="M447.933,103.629c-0.034-3.076-1.224-6.09-3.485-8.352L352.683,3.511c-0.004-0.004-0.007-0.005-0.011-0.008 C350.505,1.338,347.511,0,344.206,0H89.278C75.361,0,64.04,11.32,64.04,25.237v461.525c0,13.916,11.32,25.237,25.237,25.237 h333.444c13.916,0,25.237-11.32,25.237-25.237V103.753C447.96,103.709,447.937,103.672,447.933,103.629z M356.194,40.931 l50.834,50.834h-49.572c-0.695,0-1.262-0.567-1.262-1.262V40.931z M423.983,486.763c0,0.695-0.566,1.261-1.261,1.261H89.278 c-0.695,0-1.261-0.566-1.261-1.261V25.237c0-0.695,0.566-1.261,1.261-1.261h242.94v66.527c0,13.916,11.322,25.239,25.239,25.239 h66.527V486.763z"/><path fill="' +
      r +
      '" d="M362.088,164.014H149.912c-6.62,0-11.988,5.367-11.988,11.988c0,6.62,5.368,11.988,11.988,11.988h212.175 c6.62,0,11.988-5.368,11.988-11.988C374.076,169.381,368.707,164.014,362.088,164.014z"/><path fill="' +
      r +
      '" d="M362.088,236.353H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.62,5.368,11.988,11.988,11.988h212.175 c6.62,0,11.988-5.368,11.988-11.988C374.076,241.721,368.707,236.353,362.088,236.353z"/><path fill="' +
      r +
      '" d="M362.088,308.691H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.621,5.368,11.988,11.988,11.988h212.175 c6.62,0,11.988-5.367,11.988-11.988C374.076,314.06,368.707,308.691,362.088,308.691z"/><path fill="' +
      r +
      '" d="M256,381.031H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.621,5.368,11.988,11.988,11.988H256 c6.62,0,11.988-5.367,11.988-11.988C267.988,386.398,262.62,381.031,256,381.031z"/></svg>'
    );
  }),
  (OrgChart.icon.remove = function (t, e, r) {
    return (
      '<svg width="' +
      t +
      '" height="' +
      e +
      '"  viewBox="0 0 900.5 900.5"><path fill="' +
      r +
      '" d="M176.415,880.5c0,11.046,8.954,20,20,20h507.67c11.046,0,20-8.954,20-20V232.487h-547.67V880.5L176.415,880.5z M562.75,342.766h75v436.029h-75V342.766z M412.75,342.766h75v436.029h-75V342.766z M262.75,342.766h75v436.029h-75V342.766z"/><path fill="' +
      r +
      '" d="M618.825,91.911V20c0-11.046-8.954-20-20-20h-297.15c-11.046,0-20,8.954-20,20v71.911v12.5v12.5H141.874 c-11.046,0-20,8.954-20,20v50.576c0,11.045,8.954,20,20,20h34.541h547.67h34.541c11.046,0,20-8.955,20-20v-50.576 c0-11.046-8.954-20-20-20H618.825v-12.5V91.911z M543.825,112.799h-187.15v-8.389v-12.5V75h187.15v16.911v12.5V112.799z"/></svg>'
    );
  }),
  (OrgChart.icon.add = function (t, e, r) {
    return (
      '<svg width="' +
      t +
      '" height="' +
      e +
      '"   viewBox="0 0 922 922"><path fill="' +
      r +
      '" d="M922,453V81c0-11.046-8.954-20-20-20H410c-11.045,0-20,8.954-20,20v149h318c24.812,0,45,20.187,45,45v198h149 C913.046,473.001,922,464.046,922,453z" /><path fill="' +
      r +
      '" d="M557,667.001h151c11.046,0,20-8.954,20-20v-174v-198c0-11.046-8.954-20-20-20H390H216c-11.045,0-20,8.954-20,20v149h194 h122c24.812,0,45,20.187,45,45v4V667.001z" /><path fill="' +
      r +
      '" d="M0,469v372c0,11.046,8.955,20,20,20h492c11.046,0,20-8.954,20-20V692v-12.501V667V473v-4c0-11.046-8.954-20-20-20H390H196 h-12.5H171H20C8.955,449,0,457.955,0,469z" /></svg>'
    );
  }),
  (OrgChart.icon.search = function (t, e, r) {
    return (
      '<svg width="' +
      t +
      '" height="' +
      e +
      '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 485.213 485.213"><path fill="' +
      r +
      '" d="M471.882,407.567L360.567,296.243c-16.586,25.795-38.536,47.734-64.331,64.321l111.324,111.324 c17.772,17.768,46.587,17.768,64.321,0C489.654,454.149,489.654,425.334,471.882,407.567z" /><path fill="' +
      r +
      '" d="M363.909,181.955C363.909,81.473,282.44,0,181.956,0C81.474,0,0.001,81.473,0.001,181.955s81.473,181.951,181.955,181.951 C282.44,363.906,363.909,282.437,363.909,181.955z M181.956,318.416c-75.252,0-136.465-61.208-136.465-136.46 c0-75.252,61.213-136.465,136.465-136.465c75.25,0,136.468,61.213,136.468,136.465 C318.424,257.208,257.206,318.416,181.956,318.416z" /><path fill="' +
      r +
      '" d="M75.817,181.955h30.322c0-41.803,34.014-75.814,75.816-75.814V75.816C123.438,75.816,75.817,123.437,75.817,181.955z" /></svg>'
    );
  }),
  (OrgChart.icon.xml = function (t, e, r) {
    return (
      '<svg width="' +
      t +
      '" height="' +
      e +
      '" viewBox="0 0 550.801 550.801"><path fill="' +
      r +
      '"  d="M488.426,197.019H475.2v-63.816c0-0.401-0.063-0.799-0.116-1.205c-0.021-2.534-0.827-5.023-2.562-6.992L366.325,3.691 c-0.032-0.031-0.063-0.042-0.085-0.073c-0.633-0.707-1.371-1.298-2.151-1.804c-0.231-0.158-0.464-0.287-0.706-0.422 c-0.676-0.366-1.393-0.675-2.131-0.896c-0.2-0.053-0.38-0.135-0.58-0.19C359.87,0.119,359.037,0,358.193,0H97.2 c-11.918,0-21.6,9.693-21.6,21.601v175.413H62.377c-17.049,0-30.873,13.818-30.873,30.87v160.542 c0,17.044,13.824,30.876,30.873,30.876h13.224V529.2c0,11.907,9.682,21.601,21.6,21.601h356.4c11.907,0,21.6-9.693,21.6-21.601 V419.302h13.226c17.044,0,30.871-13.827,30.871-30.87V227.89C519.297,210.838,505.47,197.019,488.426,197.019z M97.2,21.605 h250.193v110.51c0,5.967,4.841,10.8,10.8,10.8h95.407v54.108H97.2V21.605z M369.531,374.53h-32.058l-2.156-55.519 c-0.644-17.434-1.298-38.518-1.298-59.611h-0.633c-4.514,18.516-10.547,39.166-16.137,56.162l-17.645,56.601h-25.618 l-15.494-56.157c-4.725-16.996-9.671-37.658-13.123-56.6h-0.43c-0.854,19.585-1.508,41.961-2.586,60.038l-2.576,55.086h-30.343 l9.26-145.035h43.677l14.207,48.421c4.517,16.774,9.041,34.847,12.258,51.843h0.654c4.081-16.77,9.038-35.923,13.774-52.064 l15.493-48.199h42.82L369.531,374.53z M69.992,374.53l41.955-73.385l-40.444-71.65h37.655l12.688,26.465 c4.316,8.828,7.533,15.928,10.99,24.092h0.422c3.438-9.242,6.23-15.694,9.893-24.092l12.274-26.465h37.434l-40.89,70.796 l43.044,74.239h-37.866l-13.134-26.257c-5.376-10.108-8.817-17.639-12.909-26.04h-0.433c-3.009,8.401-6.674,15.932-11.19,26.04 l-12.042,26.257H69.992z M453.601,523.353H97.2V419.302h356.4V523.353z M485.325,374.53h-90.608V229.495h32.933v117.497h57.682 v27.538H485.325z"/></svg>'
    );
  }),
  (OrgChart.icon.link = function (t, e, r) {
    return (
      '<svg width="' +
      t +
      '" height="' +
      e +
      '" viewBox="0 0 512.092 512.092"  ><path fill="' +
      r +
      '" d="M312.453,199.601c-6.066-6.102-12.792-11.511-20.053-16.128c-19.232-12.315-41.59-18.859-64.427-18.859 c-31.697-0.059-62.106,12.535-84.48,34.987L34.949,308.23c-22.336,22.379-34.89,52.7-34.91,84.318 c-0.042,65.98,53.41,119.501,119.39,119.543c31.648,0.11,62.029-12.424,84.395-34.816l89.6-89.6 c1.628-1.614,2.537-3.816,2.524-6.108c-0.027-4.713-3.87-8.511-8.583-8.484h-3.413c-18.72,0.066-37.273-3.529-54.613-10.581 c-3.195-1.315-6.867-0.573-9.301,1.877l-64.427,64.512c-20.006,20.006-52.442,20.006-72.448,0 c-20.006-20.006-20.006-52.442,0-72.448l108.971-108.885c19.99-19.965,52.373-19.965,72.363,0 c13.472,12.679,34.486,12.679,47.957,0c5.796-5.801,9.31-13.495,9.899-21.675C322.976,216.108,319.371,206.535,312.453,199.601z" /><path fill="' +
      r +
      '" d="M477.061,34.993c-46.657-46.657-122.303-46.657-168.96,0l-89.515,89.429c-2.458,2.47-3.167,6.185-1.792,9.387 c1.359,3.211,4.535,5.272,8.021,5.205h3.157c18.698-0.034,37.221,3.589,54.528,10.667c3.195,1.315,6.867,0.573,9.301-1.877 l64.256-64.171c20.006-20.006,52.442-20.006,72.448,0c20.006,20.006,20.006,52.442,0,72.448l-80.043,79.957l-0.683,0.768 l-27.989,27.819c-19.99,19.965-52.373,19.965-72.363,0c-13.472-12.679-34.486-12.679-47.957,0 c-5.833,5.845-9.35,13.606-9.899,21.845c-0.624,9.775,2.981,19.348,9.899,26.283c9.877,9.919,21.433,18.008,34.133,23.893 c1.792,0.853,3.584,1.536,5.376,2.304c1.792,0.768,3.669,1.365,5.461,2.048c1.792,0.683,3.669,1.28,5.461,1.792l5.035,1.365 c3.413,0.853,6.827,1.536,10.325,2.133c4.214,0.626,8.458,1.025,12.715,1.195h5.973h0.512l5.12-0.597 c1.877-0.085,3.84-0.512,6.059-0.512h2.901l5.888-0.853l2.731-0.512l4.949-1.024h0.939c20.961-5.265,40.101-16.118,55.381-31.403 l108.629-108.629C523.718,157.296,523.718,81.65,477.061,34.993z" /></svg>'
    );
  }),
  (OrgChart.icon.happy = function (t, e, r) {
    return (
      '<svg width="' +
      t +
      '" height="' +
      e +
      '" viewBox="0 0 512 512"><path fill="' +
      r +
      '" d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M256,480 C132.288,480,32,379.712,32,256S132.288,32,256,32s224,100.288,224,224S379.712,480,256,480z"/><path fill="' +
      r +
      '" d="M176,176c17.673,0,32,14.327,32,32h32c0-35.346-28.654-64-64-64c-35.346,0-64,28.654-64,64h32 C144,190.327,158.327,176,176,176z"/><path fill="' +
      r +
      '" d="M336,144c-35.346,0-64,28.654-64,64h32c0-17.673,14.327-32,32-32c17.673,0,32,14.327,32,32h32 C400,172.654,371.346,144,336,144z"/><path fill="' +
      r +
      '" d="M256,368c-53.019,0-96-42.981-96-96h-32c0,70.692,57.308,128,128,128s128-57.308,128-128h-32 C352,325.019,309.019,368,256,368z"/></svg>'
    );
  }),
  (OrgChart.icon.sad = function (t, e, r) {
    return (
      '<svg width="' +
      t +
      '" height="' +
      e +
      '" viewBox="0 0 512 512"><path fill="' +
      r +
      '" d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M256,480 C132.288,480,32,379.712,32,256S132.288,32,256,32s224,100.288,224,224S379.712,480,256,480z"/><path fill="' +
      r +
      '" d="M336,192c-17.673,0-32-14.327-32-32h-32c0,35.346,28.654,64,64,64c35.346,0,64-28.654,64-64h-32 C368,177.673,353.673,192,336,192z"/><path fill="' +
      r +
      '" d="M176,224c35.346,0,64-28.654,64-64h-32c0,17.673-14.327,32-32,32s-32-14.327-32-32h-32C112,195.346,140.654,224,176,224z "/><path fill="' +
      r +
      '" d="M256,256c-70.692,0-128,57.308-128,128h32c0-53.019,42.981-96,96-96s96,42.981,96,96h32C384,313.308,326.692,256,256,256 z"/></svg>'
    );
  }),
  (OrgChart.icon.share = function (t, e, r, i, a) {
    return (
      null == i && (i = 0),
      null == a && (a = 0),
      `<svg width="${t}" height="${e}" x="${i}" y="${a}" viewBox="0 0 512 512">\n                <path fill="${r}" d="M406,332c-29.641,0-55.761,14.581-72.167,36.755L191.99,296.124c2.355-8.027,4.01-16.346,4.01-25.124\n                    c0-11.906-2.441-23.225-6.658-33.636l148.445-89.328C354.307,167.424,378.589,180,406,180c49.629,0,90-40.371,90-90\n                    c0-49.629-40.371-90-90-90c-49.629,0-90,40.371-90,90c0,11.437,2.355,22.286,6.262,32.358l-148.887,89.59\n                    C156.869,193.136,132.937,181,106,181c-49.629,0-90,40.371-90,90c0,49.629,40.371,90,90,90c30.13,0,56.691-15.009,73.035-37.806\n                    l141.376,72.395C317.807,403.995,316,412.75,316,422c0,49.629,40.371,90,90,90c49.629,0,90-40.371,90-90\n                    C496,372.371,455.629,332,406,332z"/>\n                </svg>`
    );
  }),
  (OrgChart.icon.user = function (t, e, r, i, a) {
    return (
      OrgChart.isNEU(i) && (i = 0),
      OrgChart.isNEU(a) && (a = 0),
      `<svg width="${t}" height="${e}" x="${i}" y="${a}" viewBox="0 0 24 24">\n                <path fill="${r}" d="M12 11.796C14.7189 11.796 16.9231 9.60308 16.9231 6.89801C16.9231 4.19294 14.7189 2.00005 12 2.00005C9.28106 2.00005 7.07692 4.19294 7.07692 6.89801C7.07692 9.60308 9.28106 11.796 12 11.796Z" fill="#030D45"/>\n                <path fill="${r}" d="M14.5641 13.8369H9.4359C6.46154 13.8369 4 16.2859 4 19.245C4 19.9593 4.30769 20.5716 4.92308 20.8777C5.84615 21.3879 7.89744 22.0001 12 22.0001C16.1026 22.0001 18.1538 21.3879 19.0769 20.8777C19.5897 20.5716 20 19.9593 20 19.245C20 16.1838 17.5385 13.8369 14.5641 13.8369Z" fill="#030D45"/>\n            </svg>`
    );
  }),
  (OrgChart.icon.close = function (t, e, r, i, a) {
    return (
      null == i && (i = 0),
      null == a && (a = 0),
      `<svg width="${t}" height="${e}" x="${i}" y="${a}" viewBox="0 0 512 512">\n    <path fill="${r}" d="m256 0c-141.49 0-256 114.5-256 256 0 141.49 114.5 256 256 256 141.49 0 256-114.5 256-256 0-141.49-114.5-256-256-256zm-12.284 317.397-58.121 58.132c-6.565 6.553-15.283 10.166-24.557 10.166-19.196 0-34.734-15.526-34.734-34.734 0-9.274 3.612-17.992 10.166-24.557l58.132-58.121c6.785-6.784 6.785-17.783 0-24.568l-58.132-58.121c-6.553-6.565-10.166-15.283-10.166-24.557 0-19.196 15.526-34.734 34.734-34.734 9.274 0 17.992 3.613 24.557 10.166l58.121 58.132c6.785 6.773 17.784 6.773 24.568 0l58.121-58.132c6.565-6.553 15.283-10.166 24.557-10.166 19.196 0 34.734 15.526 34.734 34.734 0 9.274-3.612 17.992-10.166 24.557l-58.132 58.121c-6.785 6.784-6.785 17.783 0 24.568l58.132 58.121c6.553 6.565 10.166 15.283 10.166 24.557 0 19.196-15.526 34.734-34.734 34.734-9.274 0-17.992-3.613-24.557-10.166l-58.121-58.132c-6.784-6.784-17.784-6.773-24.568 0z"/>\n    </svg>`
    );
  }),
  (OrgChart.icon.undo = function (t, e, r, i, a) {
    return (
      null == i && (i = 0),
      null == a && (a = 0),
      `<svg width="${t}" height="${e}" x="${i}" y="${a}" viewBox="0 0 24 24">\n    <path fill-rule="evenodd" clip-rule="evenodd" fill="${r}" d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.7141 22 12C22 7.28598 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM9.25871 7.97395C9.56308 7.693 9.58205 7.21851 9.3011 6.91414C9.02015 6.60978 8.54565 6.5908 8.24129 6.87175L5.99129 8.94867C5.83748 9.09065 5.75 9.29045 5.75 9.49977C5.75 9.7091 5.83748 9.9089 5.99129 10.0509L8.24129 12.1278C8.54565 12.4088 9.02015 12.3898 9.3011 12.0854C9.58205 11.781 9.56308 11.3065 9.25871 11.0256L8.41824 10.2498H14.0385C14.7376 10.2498 15.2069 10.2506 15.5652 10.2862C15.9116 10.3205 16.0724 10.3813 16.1787 10.4501C16.3272 10.5461 16.4537 10.6726 16.5497 10.8211C16.6184 10.9274 16.6793 11.0882 16.7136 11.4345C16.7491 11.7929 16.75 12.2622 16.75 12.9613C16.75 13.6604 16.7491 14.1298 16.7136 14.4881C16.6793 14.8344 16.6185 14.9952 16.5497 15.1015C16.4537 15.2501 16.3272 15.3765 16.1787 15.4726C16.0724 15.5413 15.9116 15.6021 15.5652 15.6365C15.2069 15.672 14.7376 15.6729 14.0385 15.6729H9.5C9.08579 15.6729 8.75 16.0086 8.75 16.4229C8.75 16.8371 9.08579 17.1729 9.5 17.1729H14.0758C14.7279 17.1729 15.2721 17.1729 15.7133 17.1291C16.1748 17.0834 16.6038 16.9839 16.9931 16.7322C17.3199 16.5209 17.5981 16.2427 17.8094 15.916C18.0611 15.5266 18.1605 15.0976 18.2063 14.6361C18.25 14.195 18.25 13.6508 18.25 12.9987V12.924C18.25 12.2718 18.25 11.7276 18.2063 11.2865C18.1605 10.825 18.0611 10.396 17.8093 10.0067C17.5981 9.6799 17.3199 9.40169 16.9931 9.19042C16.6038 8.9387 16.1748 8.83927 15.7133 8.7935C15.2721 8.74975 14.7279 8.74976 14.0758 8.74977L8.41824 8.74977L9.25871 7.97395Z" />\n    <rect style="opacity: 0" x="2" y="2" width="20" height="20"></rect>\n    </svg>`
    );
  }),
  (OrgChart.icon.redo = function (t, e, r, i, a) {
    return (
      null == i && (i = 0),
      null == a && (a = 0),
      `<svg width="${t}" height="${e}" x="${i}" y="${a}" viewBox="0 0 24 24" >\n    <path fill="#f9f9f9" fill-rule="evenodd" clip-rule="evenodd" fill="${r}" d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.7141 22 12C22 7.28598 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM15.7587 6.87273C15.4543 6.59177 14.9799 6.61075 14.6989 6.91512C14.4179 7.21948 14.4369 7.69398 14.7413 7.97493L15.5818 8.75075H9.96155C7.63558 8.75075 5.75 10.6363 5.75 12.9623C5.75 15.2883 7.63557 17.1738 9.96154 17.1738H14.5C14.9142 17.1738 15.25 16.838 15.25 16.4238C15.25 16.0096 14.9142 15.6738 14.5 15.6738H9.96154C8.464 15.6738 7.25 14.4598 7.25 12.9623C7.25 11.4647 8.464 10.2508 9.96155 10.2508H15.5818L14.7413 11.0266C14.4369 11.3075 14.4179 11.782 14.6989 12.0864C14.9799 12.3908 15.4543 12.4097 15.7587 12.1288L18.0087 10.0519C18.1625 9.90987 18.25 9.71007 18.25 9.50075C18.25 9.29143 18.1625 9.09163 18.0087 8.94965L15.7587 6.87273Z"/>\n    <rect style="opacity: 0" x="2" y="2" width="20" height="20"></rect>    \n    </svg>`
    );
  }),
  (OrgChart.prototype.exportPDFProfile = function (t, e) {
    (t = this._defaultExportProfileOptions(t, "pdf")),
      this._exportProfile(t, e);
  }),
  (OrgChart.prototype.exportPDFPreview = function (t) {
    OrgChart.pdfPrevUI.show(this, t);
  }),
  (OrgChart.prototype.exportPNGProfile = function (t, e) {
    (t = this._defaultExportProfileOptions(t, "png")),
      this._exportProfile(t, e);
  }),
  (OrgChart.prototype.shareProfile = function (t) {
    var e;
    "object" == typeof t
      ? (t = (e = t).focusId)
      : (e = this.editUI.content(t, !0, !0, "100%", !0));
    var r = new URL(window.location.href);
    r.searchParams.append("nodeId", t);
    var i = { title: e.title, text: e.shareText, url: r.href };
    try {
      navigator.share(i);
    } catch (t) {
      console.error("error: " + t);
    }
  }),
  (OrgChart.prototype.exportPDF = function (t, e) {
    (t = this._defaultExportOptions(t, "pdf")), this._export(t, e);
  }),
  (OrgChart.prototype.exportPNG = function (t, e) {
    (t = this._defaultExportOptions(t, "png")), this._export(t, e);
  }),
  (OrgChart.prototype.exportSVG = function (t, e) {
    (t = this._defaultExportOptions(t, "svg")), this._export(t, e);
  }),
  (OrgChart.prototype._defaultExportOptions = function (t, e) {
    return (
      null == t && (t = {}),
      "svg" == e
        ? ((t.ext = "svg"), (t.mime = "image/svg+xml"))
        : "pdf" == e
        ? ((t.mime = "application/pdf"), (t.ext = "pdf"))
        : "png" == e && ((t.mime = "image/png"), (t.ext = "png")),
      null == t.margin && (t.margin = [50, 40, 50, 40]),
      null == t.padding && (t.padding = 0),
      null == t.landscape && (t.landscape = !1),
      null == t.filename && (t.filename = "OrgChart." + t.ext),
      null == t.scale && (t.scale = "fit"),
      null == t.format && (t.format = "fit"),
      null == t.header && (t.header = ""),
      "pdf" == e && null == t.footer
        ? (t.footer = "Page {current-page} of {total-pages}")
        : null == t.footer && (t.footer = ""),
      null == t.openInNewTab && (t.openInNewTab = !1),
      null == t.mode && (t.mode = "boc-" + this.config.mode),
      t
    );
  }),
  (OrgChart.prototype._export = function (t, e) {
    var r = this,
      i = { id: t.nodeId, expandChildren: t.expandChildren, min: t.min };
    t.margin && t.margin[0] < 2 && (t.margin[0] = 2),
      t.margin && t.margin[1] < 2 && (t.margin[1] = 2),
      t.margin && t.margin[2] < 2 && (t.margin[2] = 2),
      t.margin && t.margin[3] < 2 && (t.margin[3] = 2),
      this._draw(!1, OrgChart.action.exporting, i, function (i, a) {
        var n = document.createElement("div");
        if (((n.innerHTML = i), t.padding > 0)) {
          var o = n.querySelector("svg"),
            l = OrgChart._getViewBox(o);
          (l[0] -= t.padding),
            (l[1] -= t.padding),
            (l[2] += 2 * t.padding),
            (l[3] += 2 * t.padding),
            o.setAttribute("viewBox", l.join()),
            o.setAttribute("width", l[2]),
            o.setAttribute("height", l[3]);
        }
        if ("svg" == t.ext)
          if (e) e(t, n.innerHTML);
          else {
            (o = n.querySelector("svg")).classList.add("boc-" + r.config.mode);
            var s = { content: n.innerHTML, options: t, styles: "" },
              h = OrgChart.events.publish("exportstart", [r, s]),
              d = r.element.querySelector("[data-boc-styles]");
            if (
              (d && (s.styles += d.outerHTML),
              s.styles &&
                (n.childNodes[0].insertAdjacentHTML("afterbegin", s.styles),
                (s.content = n.innerHTML)),
              !1 === h)
            )
              return !1;
            if (!1 === (h = OrgChart.events.publish("exportend", [r, s])))
              return !1;
            OrgChart._downloadFile(
              t.mime,
              s.content,
              s.options.filename,
              s.options.openInNewTab,
              s.options.ext
            );
          }
        else
          r._pages(t, n.querySelector("svg"), a, function (i) {
            var a = { content: n.innerHTML, options: t, pages: i, styles: "" },
              o = OrgChart.events.publish("exportstart", [r, a]),
              l = r.element.querySelector("[data-boc-styles]");
            if ((l && (a.styles += l.outerHTML), !1 === o)) return !1;
            e || OrgChart.loading.show(r),
              e
                ? e(r, a, n.querySelector("svg"))
                : ((a = JSON.stringify(a)),
                  OrgChart._ajax(
                    r.config.exportUrl + "/v3",
                    "POST",
                    a,
                    "arraybuffer",
                    function (e) {
                      var i = OrgChart.events.publish("exportend", [r, e]);
                      if ((OrgChart.loading.hide(r), !1 === i)) return !1;
                      OrgChart._downloadFile(
                        t.mime,
                        e,
                        t.filename,
                        t.openInNewTab,
                        t.ext
                      );
                    }
                  ));
          });
      });
  }),
  (OrgChart.prototype.exportCSV = function (t) {
    var e = OrgChart._defaultExportProfileOptionsForCSV_SVG_JSON(t, "csv"),
      r = this.getNode(e.nodeId),
      i = null;
    r
      ? ((i = []), OrgChart._exportIterateForJSON_XML_CSV(this, r, e, i))
      : !1 === e.min || !1 === e.expandChildren
      ? OrgChart._exportIterateForJSON_XML_CSV(this, this.roots, e, i)
      : (i = JSON.parse(JSON.stringify(this.config.nodes)));
    var a = { ext: "csv", filename: t, options: e, nodes: i };
    if (!1 === OrgChart.events.publish("exportstart", [this, a])) return !1;
    var n = OrgChart._json2csv(a.nodes),
      o = {
        ext: a.ext,
        filename: a.filename,
        options: e,
        nodes: a.nodes,
        content: n,
      };
    if (!1 === OrgChart.events.publish("exportend", [this, o])) return !1;
    OrgChart._downloadFile(
      "text/csv;charset=utf-8;",
      "\ufeff" + o.content,
      o.options.filename,
      o.options.openInNewTab,
      o.ext
    );
  }),
  (OrgChart.prototype.exportXML = function (t) {
    var e = OrgChart._defaultExportProfileOptionsForCSV_SVG_JSON(t, "xml"),
      r = this.getNode(e.nodeId),
      i = null;
    r
      ? ((i = []), OrgChart._exportIterateForJSON_XML_CSV(this, r, e, i))
      : !1 === e.min || !1 === e.expandChildren
      ? OrgChart._exportIterateForJSON_XML_CSV(this, this.roots, e, i)
      : (i = JSON.parse(JSON.stringify(this.config.nodes)));
    var a = { ext: "xml", filename: t, options: e, nodes: i };
    if (!1 === OrgChart.events.publish("exportstart", [this, a])) return !1;
    var n = OrgChart._json2xml(a.nodes),
      o = {
        ext: a.ext,
        filename: a.filename,
        options: e,
        nodes: a.nodes,
        content: n,
      };
    if (!1 === OrgChart.events.publish("exportend", [this, o])) return !1;
    OrgChart._downloadFile(
      "application/xml",
      o.content,
      o.options.filename,
      o.options.openInNewTab,
      o.ext
    );
  }),
  (OrgChart.prototype.exportJSON = function (t) {
    var e = OrgChart._defaultExportProfileOptionsForCSV_SVG_JSON(t, "json"),
      r = this.getNode(e.nodeId),
      i = null;
    r
      ? ((i = []), OrgChart._exportIterateForJSON_XML_CSV(this, r, e, i))
      : !1 === e.min || !1 === e.expandChildren
      ? OrgChart._exportIterateForJSON_XML_CSV(this, this.roots, e, i)
      : (i = JSON.parse(JSON.stringify(this.config.nodes)));
    var a = { ext: "json", filename: e.filename, options: e, nodes: i };
    if (!1 === OrgChart.events.publish("exportstart", [this, a])) return !1;
    var n = {
      ext: a.ext,
      filename: a.filename,
      options: e,
      nodes: a.nodes,
      content: JSON.stringify(a.nodes),
    };
    if (!1 === OrgChart.events.publish("exportend", [this, n])) return !1;
    OrgChart._downloadFile(
      "application/json",
      n.content,
      n.options.filename,
      n.options.openInNewTab,
      n.ext
    );
  }),
  (OrgChart._exportIterateForJSON_XML_CSV = function (t, e, r, i) {
    if (Array.isArray(e))
      for (var a = 0; a < e.length; a++)
        OrgChart._exportIterateForJSON_XML_CSV(t, e[a], r, i);
    else {
      var n = t.get(e.id);
      if ((i.push(n), r.min))
        for (a = 0; a < e.stChildrenIds.length; a++)
          OrgChart._exportIterateForJSON_XML_CSV(
            t,
            t.getNode(e.stChildrenIds[a]),
            r,
            i
          );
      else
        for (a = 0; a < e.stChildren.length; a++)
          OrgChart._exportIterateForJSON_XML_CSV(t, e.stChildren[a], r, i);
      if (r.expandChildren)
        for (a = 0; a < e.childrenIds.length; a++)
          OrgChart._exportIterateForJSON_XML_CSV(
            t,
            t.getNode(e.childrenIds[a]),
            r,
            i
          );
      else
        for (a = 0; a < e.children.length; a++)
          OrgChart._exportIterateForJSON_XML_CSV(t, e.children[a], r, i);
    }
  }),
  (OrgChart.prototype._pages = function (t, e, r, i) {
    ("A5" == t.format && "fit" != t.scale) ||
    ("A4" == t.format && "fit" != t.scale) ||
    ("A3" == t.format && "fit" != t.scale) ||
    ("A2" == t.format && "fit" != t.scale) ||
    ("A1" == t.format && "fit" != t.scale) ||
    ("Letter" == t.format && "fit" != t.scale) ||
    ("Legal" == t.format && "fit" != t.scale)
      ? i(this._pagesA100(t, e, t.scale))
      : ("A5" == t.format && "fit" == t.scale) ||
        ("A4" == t.format && "fit" == t.scale) ||
        ("A3" == t.format && "fit" == t.scale) ||
        ("A2" == t.format && "fit" == t.scale) ||
        ("A1" == t.format && "fit" == t.scale) ||
        ("Letter" == t.format && "fit" == t.scale) ||
        ("Legal" == t.format && "fit" == t.scale)
      ? i(this._pagesAfit(t, e, r))
      : "fit" == t.format && i(this._pagesFit(t, e));
  }),
  (OrgChart.prototype._pagesFit = function (t, e) {
    var r = e.getAttribute("width"),
      i = e.getAttribute("height"),
      a = OrgChart._getViewBox(e),
      n = { w: parseFloat(r), h: parseFloat(i) };
    return [
      {
        vb: a,
        size: {
          w: n.w + (t.margin[1] + t.margin[3]),
          h: n.h + (t.margin[0] + t.margin[2]),
        },
        innerSize: n,
      },
    ];
  }),
  (OrgChart.prototype._pagesAfit = function (t, e, r) {
    var i = e.getAttribute("width"),
      a = 0,
      n = 0;
    switch (t.format) {
      case "A5":
        (a = OrgChart.A5w), (n = OrgChart.A5h);
        break;
      case "A4":
        (a = OrgChart.A4w), (n = OrgChart.A4h);
        break;
      case "A3":
        (a = OrgChart.A3w), (n = OrgChart.A3h);
        break;
      case "A2":
        (a = OrgChart.A2w), (n = OrgChart.A2h);
        break;
      case "A1":
        (a = OrgChart.A1w), (n = OrgChart.A1h);
        break;
      case "Letter":
        (a = OrgChart.Letterw), (n = OrgChart.Letterh);
        break;
      case "Legal":
        (a = OrgChart.Legalw), (n = OrgChart.Legalh);
    }
    var o = t.landscape
        ? n - (t.margin[1] + t.margin[3])
        : a - (t.margin[1] + t.margin[3]),
      l =
        (t.landscape ? (t.margin[0], t.margin[2]) : (t.margin[0], t.margin[2]),
        o / i);
    return this._pagesA100(t, e, 100 * l, r);
  }),
  (OrgChart.prototype._pagesA100 = function (t, e, r, i) {
    var a = OrgChart._getViewBox(e),
      n = 0,
      o = 0;
    switch (t.format) {
      case "A5":
        (n = OrgChart.A5w), (o = OrgChart.A5h);
        break;
      case "A4":
        (n = OrgChart.A4w), (o = OrgChart.A4h);
        break;
      case "A3":
        (n = OrgChart.A3w), (o = OrgChart.A3h);
        break;
      case "A2":
        (n = OrgChart.A2w), (o = OrgChart.A2h);
        break;
      case "A1":
        (n = OrgChart.A1w), (o = OrgChart.A1h);
        break;
      case "Letter":
        (n = OrgChart.Letterw), (o = OrgChart.Letterh);
        break;
      case "Legal":
        (n = OrgChart.Legalw), (o = OrgChart.Legalh);
    }
    var l = a[0],
      s = a[1],
      h = a[2],
      d = a[3],
      c = {
        w: t.landscape
          ? o - (t.margin[1] + t.margin[3])
          : n - (t.margin[1] + t.margin[3]),
        h: t.landscape
          ? n - (t.margin[0] + t.margin[2])
          : o - (t.margin[0] + t.margin[2]),
      },
      g = { w: t.landscape ? o : n, h: t.landscape ? n : o };
    e.setAttribute("width", c.w), e.setAttribute("height", c.h);
    var p = c.w * (100 / r),
      u = c.h * (100 / r),
      f = l,
      m = s,
      C = [],
      O = !0;
    if (!OrgChart.EXPORT_PAGES_CUT_NODES && "fit" == t.scale) {
      e.setAttribute("preserveAspectRatio", "xMinYMin");
      for (
        var b = Object.keys(i.bordersByRootIdAndLevel),
          v = i.bordersByRootIdAndLevel[b[0]],
          y = Object.keys(v).length,
          x = 1;
        x < b.length;
        x++
      )
        y < Object.keys(i.bordersByRootIdAndLevel[b[x]]).length &&
          ((v = i.bordersByRootIdAndLevel[b[x]]), (y = Object.keys(v).length));
      for (var _ = 0, w = 0; ; ) {
        for (w = _; !(y <= _); ) {
          if ((v[_].maxY - v[_].minY) / (100 / r) > c.h) {
            O = !1;
            break;
          }
          var k = (v[_].minY - v[w].minY) / (100 / r);
          if (
            (_ == y - 1 && (k = (v[_].maxY - v[w].minY) / (100 / r)), k > c.h)
          )
            break;
          _++;
        }
        if (!O) break;
        var S = (_ == y ? v[_ - 1].maxY : v[_ - 1].minY) - v[w].minY;
        if (0 == S) {
          O = !1;
          break;
        }
        if (
          ((I = (I = [f, v[w].minY, p, S]).join()),
          C.push({
            vb: I,
            innerSize: { w: c.x, h: S / (100 / r) - 1 },
            size: g,
          }),
          _ == y)
        )
          break;
        _--;
      }
      C.length && (C[C.length - 1].innerSize.h += 1);
    }
    if (!O || OrgChart.EXPORT_PAGES_CUT_NODES || "fit" != t.scale)
      for (
        e.setAttribute("preserveAspectRatio", "xMinYMin slice"), C = [];
        f < h + l;

      ) {
        for (; m < d + s; ) {
          var I;
          (I = (I = [f, m, p, u]).join()),
            C.push({ vb: I, innerSize: c, size: g }),
            (m += u);
        }
        (f += p), (m = s);
      }
    return C;
  }),
  (OrgChart.prototype._defaultExportProfileOptions = function (t, e) {
    return (
      (OrgChart.isNEU(t) || OrgChart.isNEU(t.id)) &&
        console.error("options.id is not defilned"),
      "svg" == e
        ? ((t.ext = "svg"), (t.mime = "image/svg+xml"))
        : "pdf" == e
        ? ((t.mime = "application/pdf"), (t.ext = "pdf"))
        : "png" == e && ((t.mime = "image/png"), (t.ext = "png")),
      null == t.margin && (t.margin = [50, 40, 50, 40]),
      null == t.padding && (t.padding = 0),
      null == t.landscape && (t.landscape = !1),
      null == t.filename && (t.filename = "Profile." + t.ext),
      null == t.scale && (t.scale = "fit"),
      null == t.format && (t.format = "A4"),
      null == t.header && (t.header = ""),
      null == t.footer && (t.footer = ""),
      null == t.openInNewTab && (t.openInNewTab = !1),
      null == t.mode && (t.mode = "boc-" + this.config.mode),
      t
    );
  }),
  (OrgChart._defaultExportProfileOptionsForCSV_SVG_JSON = function (t, e) {
    return (
      OrgChart.isNEU(t) && (t = {}),
      "string" == typeof t && (t = { filename: t }),
      OrgChart.isNEU(t.filename) && (t.filename = `OrgChart.${e}`),
      OrgChart.isNEU(t.expandChildren) && (t.expandChildren = !0),
      OrgChart.isNEU(t.min) && (t.min = !0),
      OrgChart.isNEU(t.openInNewTab) && (t.openInNewTab = !1),
      t
    );
  }),
  (OrgChart.prototype._exportProfile = function (t, e) {
    var r = this,
      i = 0,
      a = 0;
    switch (t.format) {
      case "A5":
        (i = OrgChart.A5w), (a = OrgChart.A5h);
        break;
      case "A4":
        (i = OrgChart.A4w), (a = OrgChart.A4h);
        break;
      case "A3":
        (i = OrgChart.A3w), (a = OrgChart.A3h);
        break;
      case "A2":
        (i = OrgChart.A2w), (a = OrgChart.A2h);
        break;
      case "A1":
        (i = OrgChart.A1w), (a = OrgChart.A1h);
        break;
      case "Letter":
        (i = OrgChart.Letterw), (a = OrgChart.Letterh);
        break;
      case "Legal":
        (i = OrgChart.Legalw), (a = OrgChart.Legalh);
    }
    var n = {
        w: t.landscape
          ? a - (t.margin[1] + t.margin[3])
          : i - (t.margin[1] + t.margin[3]),
        h: t.landscape
          ? i - (t.margin[0] + t.margin[2])
          : a - (t.margin[0] + t.margin[2]),
      },
      o = { w: t.landscape ? a : i, h: t.landscape ? i : a },
      l = this.editUI.content(t.id, !0, !0, "100%", !0).element;
    OrgChart.input.init(l);
    var s = {
      content: l.outerHTML,
      options: t,
      pages: [{ vb: "", innerSize: n, size: o }],
      styles: "",
    };
    if (!e) {
      if (!1 === OrgChart.events.publish("exportstart", [r, s])) return !1;
      OrgChart.loading.show(r);
    }
    var h = this.element.querySelector("[data-boc-styles]");
    h && (s.styles += h.outerHTML);
    var d = this.getSvg().querySelector("defs");
    if (d)
      for (var c = 0; c < d.children.length; c++)
        "style" == d.children[c].nodeName.toLowerCase() &&
          (s.styles += d.children[c].outerHTML);
    (s = JSON.stringify(s)),
      OrgChart._ajax(
        this.config.exportUrl + "/v3",
        "POST",
        s,
        "arraybuffer",
        function (i) {
          if (e) e(r, i);
          else {
            var a = OrgChart.events.publish("exportend", [r, i]);
            if ((OrgChart.loading.hide(r), !1 === a)) return !1;
            OrgChart._downloadFile(
              t.mime,
              i,
              t.filename,
              t.openInNewTab,
              t.ext
            );
          }
        }
      );
  }),
  void 0 === OrgChart && (OrgChart = {}),
  (OrgChart.events = (function () {
    var t = {};
    return {
      on: function (e, r, i) {
        Array.isArray(t[e]) || (t[e] = []),
          t[e].push({ listener: r, event_id: i });
      },
      removeAll: function (e) {
        Array.isArray(t[e]) || (t[e] = []), (t[e] = []);
      },
      remove: function (e, r, i) {
        var a = !1;
        if (t[e] && Array.isArray(t[e]) && t[e].length > 0)
          for (var n = t[e].length - 1; n >= 0; n--)
            ((!OrgChart.isNEU(i) &&
              !OrgChart.isNEU(r) &&
              t[e][n].event_id == i &&
              t[e][n].listener == r) ||
              (!OrgChart.isNEU(i) &&
                OrgChart.isNEU(r) &&
                t[e][n].event_id == i) ||
              (OrgChart.isNEU(i) &&
                !OrgChart.isNEU(r) &&
                t[e][n].listener == r) ||
              (OrgChart.isNEU(i) && OrgChart.isNEU(r))) &&
              (t[e].splice(n, 1), (a = !0));
        return a;
      },
      has: function (e, r) {
        if (t[e] && Array.isArray(t[e]) && t[e].length > 0) {
          if (OrgChart.isNEU(r)) return !0;
          for (var i = 0; i < t[e].length; i++)
            if (t[e][i].event_id == r) return !0;
        }
        return !1;
      },
      removeForEventId: function (e) {
        for (var r in t)
          if (Array.isArray(t[r]))
            for (var i = t[r].length - 1; i >= 0; i--)
              t[r][i].event_id == e && t[r].splice(i, 1);
      },
      publish: function (e, r) {
        if (t[e]) {
          for (var i = [], a = 0; a < t[e].length; a++) {
            var n = t[e][a];
            (null != n.event_id && n.event_id != r[0]._event_id) ||
              i.push(n.listener);
          }
          if (i.length > 0) {
            var o = !0;
            for (
              a = 0;
              a < i.length &&
              (1 == r.length
                ? (o = i[a](r[0]) && o)
                : 2 == r.length
                ? (o = i[a](r[0], r[1]) && o)
                : 3 == r.length
                ? (o = i[a](r[0], r[1], r[2]) && o)
                : 4 == r.length
                ? (o = i[a](r[0], r[1], r[2], r[3]) && o)
                : 5 == r.length &&
                  (o = i[a](r[0], r[1], r[2], r[3], r[4]) && o),
              !1 !== o);
              a++
            );
            return o;
          }
        }
      },
    };
  })()),
  (OrgChart.prototype.importCSV = function () {
    var t = this,
      e = document.createElement("INPUT");
    e.setAttribute("type", "file"),
      e.setAttribute("accept", ".csv"),
      (e.style.display = "none"),
      (e.onchange = function (e) {
        var r = e.target,
          i = new FileReader();
        (i.onload = function () {
          var e = i.result,
            r = OrgChart._csvToArray(e),
            a = [],
            n = r[0];
          OrgChart._importSetColumnNames(n, function (e) {
            for (var i = 1; i < r.length; i++) {
              for (var n = {}, o = 0; o < r[i].length; o++) {
                var l = e[o],
                  s = r[i][o];
                n[l] = OrgChart._convertStringToArray(l, s);
              }
              "" != n.id.trim() && a.push(n);
            }
            var h = { nodes: a, columnNames: r[0] };
            0 != OrgChart.events.publish("import", [t, h]) &&
              (t._putInUndoStack(),
              t.clearRedo(),
              (t.config.nodes = h.nodes),
              OrgChart.events.publish("updated", [t]),
              t.filterUI.update(),
              t.draw());
          });
        }),
          i.readAsText(r.files[0]);
      }),
      e.click();
  }),
  (OrgChart._importSetColumnNames = function (t, e) {
    if (-1 == t.indexOf("id") || -1 == t.indexOf("pid")) {
      var r = document.createElement("DIV"),
        i = document.createElement("P");
      (i.style.padding = "5px"),
        (i.style.color = "rgb(122, 122, 122)"),
        (i.innerHTML = OrgChart.IMPORT_MESSAGE),
        r.appendChild(i);
      var a = document.createElement("div"),
        n = document.createElement("div"),
        o = document.createElement("div"),
        l = document.createElement("span");
      a.setAttribute("id", "boc-sampleDialog"),
        (a.style.height = "260px"),
        (a.style.width = "400px"),
        (a.style.background = "white"),
        (a.style.border = "0.5px solid grey"),
        (a.style.position = "fixed"),
        (a.style.overflow = "hidden"),
        (a.style.zIndex = "99"),
        n.setAttribute("id", "title"),
        (n.style.backgroundColor = "#e5e5e5"),
        (n.style.fontWeight = "bold"),
        (n.style.color = "rgb(122, 122, 122)"),
        (n.style.height = "20px"),
        (n.style.padding = "3px 0 0 7px"),
        l.setAttribute("id", "close"),
        (l.style.cursor = "pointer"),
        (l.style.position = "absolute"),
        (l.style.color = "rgb(122, 122, 122)"),
        (l.style.fontWeight = "bold"),
        (l.style.top = "2px"),
        (l.style.zIndex = 100),
        o.setAttribute("id", "content"),
        (o.style.padding = "2px"),
        (n.innerHTML = "Import Organizational Chart Data"),
        (l.innerHTML = "&times;");
      var s = document.createElement("HR");
      (s.style.height = "0.1px"),
        (s.style.backgroundColor = "#aeaeae"),
        (s.style.border = "none"),
        (s.style.margin = "0"),
        a.appendChild(n),
        a.appendChild(s),
        o.appendChild(r),
        a.appendChild(o),
        a.appendChild(l),
        document.body.appendChild(a),
        OrgChart._importCenter(a),
        (l.style.left = a.offsetWidth - 20 + "px");
      var h = document.createElement("div");
      h.setAttribute("id", "overlay"),
        (h.style.width = "100%"),
        (h.style.height = "100%"),
        (h.style.left = 0),
        (h.style.top = 0),
        (h.style.position = "fixed"),
        (h.style.background = "grey"),
        (h.style.opacity = "0.5"),
        (h.style.zIndex = 98),
        document.body.appendChild(h),
        (a._overlay = h);
      var d = document.createElement("LABEL"),
        c = document.createTextNode("Name:");
      d.setAttribute("for", "boc-id-select"),
        d.appendChild(c),
        (d.style.fontSize = "16px"),
        (d.style.color = "rgb(122, 122, 122)"),
        (d.style.padding = "5px"),
        (d.style.margin = "5px"),
        (d.style.width = "30%"),
        (d.style.textAlign = "right"),
        (d.style.display = "inline-block"),
        r.appendChild(d);
      var g = document.createElement("SELECT");
      (g.id = "boc-id-select"),
        (g.style.fontSize = "16px"),
        (g.style.color = "rgb(122, 122, 122)"),
        (g.style.padding = "5px"),
        (g.style.margin = "5px"),
        (g.style.width = "60%"),
        (g.style.border = "1px solid #aeaeae"),
        r.appendChild(g);
      var p = document.createElement("BR");
      r.appendChild(p);
      for (var u = 0; u < t.length; u++) {
        (b = document.createElement("option")).setAttribute("value", t[u]);
        var f = document.createTextNode(t[u]);
        b.appendChild(f), g.appendChild(b);
      }
      var m = document.createElement("LABEL"),
        C = document.createTextNode("Reports to:");
      m.setAttribute("for", "pid-select"),
        m.appendChild(C),
        (m.style.fontSize = "16px"),
        (m.style.color = "rgb(122, 122, 122)"),
        (m.style.padding = "5px"),
        (m.style.margin = "5px"),
        (m.style.width = "30%"),
        (m.style.textAlign = "right"),
        (m.style.display = "inline-block"),
        r.appendChild(m);
      var O = document.createElement("SELECT");
      (O.id = "pid-select"),
        (O.style.fontSize = "16px"),
        (O.style.color = "rgb(122, 122, 122)"),
        (O.style.padding = "5px"),
        (O.style.margin = "5px"),
        (O.style.width = "60%"),
        (O.style.border = "1px solid #aeaeae"),
        r.appendChild(O);
      for (u = 0; u < t.length; u++) {
        var b;
        (b = document.createElement("option")).setAttribute("value", t[u]);
        f = document.createTextNode(t[u]);
        b.appendChild(f), O.appendChild(b);
      }
      var v = document.createElement("BUTTON");
      (v.innerHTML = "Import"),
        (v.style.fontSize = "16px"),
        (v.style.color = "rgb(122, 122, 122)"),
        (v.style.padding = "5px 20px"),
        (v.style.margin = "20px auto"),
        (v.style.display = "block"),
        (v.onclick = function () {
          (a.style.display = "none"),
            a._overlay && a._overlay.parentNode.removeChild(a._overlay);
          var r = g.options[g.selectedIndex].value,
            i = t.indexOf(r);
          t[i] = "id";
          var n = O.options[O.selectedIndex].value,
            o = t.indexOf(n);
          (t[o] = "pid"), e(t);
        });
      var y = document.createElement("DIV");
      return (
        y.appendChild(v),
        r.appendChild(y),
        (l.onclick = function (t) {
          a._overlay && a._overlay.parentNode.removeChild(a._overlay),
            a.parentNode.removeChild(a),
            t.stopPropagation();
        }),
        (n.onmousedown = function (t) {
          (t = t || window.event),
            (a._dragging = !0),
            (a._originalLeft = a.offsetLeft),
            (a._originalTop = a.offsetTop),
            (a._mouseLeft = t.clientX),
            (a._mouseTop = t.clientY);
        }),
        (document.onmousemove = function (t) {
          (t = t || window.event),
            a._dragging &&
              ((a.style.left =
                a._originalLeft + t.clientX - a._mouseLeft + "px"),
              (a.style.top = a._originalTop + t.clientY - a._mouseTop + "px"));
        }),
        (document.onmouseup = function (t) {
          (t = t || window.event),
            a._dragging &&
              ((a.style.left =
                a._originalLeft + t.clientX - a._mouseLeft + "px"),
              (a.style.top = a._originalTop + t.clientY - a._mouseTop + "px"),
              (a._dragging = !1));
        }),
        a
      );
    }
    e(t);
  }),
  (OrgChart._importCenter = function (t) {
    t &&
      ((t.style.left = (window.innerWidth - t.offsetWidth) / 2 + "px"),
      (t.style.top = (window.innerHeight - t.offsetHeight) / 2 + "px"));
  }),
  (OrgChart.prototype.importXML = function () {
    var t = this,
      e = document.createElement("INPUT");
    e.setAttribute("type", "file"),
      e.setAttribute("accept", ".xml"),
      (e.style.display = "none"),
      (e.onchange = function (e) {
        var r = e.target,
          i = new FileReader();
        (i.onload = function () {
          var e = i.result,
            r = OrgChart._xml2json(e);
          0 != OrgChart.events.publish("import", [t, r]) &&
            (t._putInUndoStack(),
            t.clearRedo(),
            (t.config.nodes = r),
            OrgChart.events.publish("updated", [t]),
            t.filterUI.update(),
            t.draw());
        }),
          i.readAsText(r.files[0]);
      }),
      e.click();
  }),
  (OrgChart.prototype.importJSON = function () {
    var t = this,
      e = document.createElement("INPUT");
    e.setAttribute("type", "file"),
      e.setAttribute("accept", ".json"),
      (e.style.display = "none"),
      (e.onchange = function (e) {
        var r = e.target,
          i = new FileReader();
        (i.onload = function () {
          var e = i.result,
            r = JSON.parse(e);
          0 != OrgChart.events.publish("import", [t, r]) &&
            (t._putInUndoStack(),
            t.clearRedo(),
            (t.config.nodes = r),
            OrgChart.events.publish("updated", [t]),
            t.filterUI.update(),
            t.draw());
        }),
          i.readAsText(r.files[0]);
      }),
      e.click();
  }),
  (OrgChart.prototype.expand = function (t, e, r) {
    this._resetMovableNodes();
    var i = { id: t, ids: e };
    this._draw(!1, OrgChart.action.expand, i, r);
  }),
  (OrgChart.prototype.collapse = function (t, e, r) {
    this._resetMovableNodes();
    var i = { id: t, ids: e };
    this._draw(!1, OrgChart.action.collapse, i, r);
  }),
  (OrgChart.prototype.expandCollapse = function (t, e, r, i) {
    this._resetMovableNodes(),
      Array.isArray(e) || (e = []),
      Array.isArray(r) || (r = []);
    var a = { id: t, expandIds: e, collapseIds: r, ids: e.concat(r) };
    this._draw(!1, OrgChart.action.collapse, a, i);
  }),
  (OrgChart.prototype.changeRoots = function (t, e, r) {
    this.config.roots = e;
    var i = { id: t, changeRoots: e };
    this._draw(!1, OrgChart.action.update, i, r);
  }),
  (OrgChart.prototype._resetMovableNodes = function () {
    if (
      OrgChart.RESET_MOVABLE_ONEXPANDCOLLAPSE &&
      null != this.config.movable
    ) {
      for (var t = !1, e = 0; e < this.config.nodes.length; e++) {
        var r = this.config.nodes[e];
        null != r.movex && ((r.movex = 0), (t = !0)),
          null != r.movey && ((r.movey = 0), (t = !0));
      }
      t && OrgChart.events.publish("updated", [this]);
    }
  }),
  (OrgChart.prototype.maximize = function (t, e, r, i) {
    var a = this,
      n = { id: t, options: {} };
    OrgChart.isNEU(n.id) && ((n.id = this.roots[0].id), (n.all = !0)),
      (n.options.horizontal = !1),
      (n.options.vertical = !1),
      e && (n.options.horizontal = e),
      r && (n.options.vertical = r),
      this._draw(!1, OrgChart.action.maximize, n, function () {
        a.ripple(t), i && i();
      });
  }),
  (OrgChart.prototype.minimize = function (t, e) {
    var r = this,
      i = { id: t };
    OrgChart.isNEU(i.id) && ((i.id = this.roots[0].id), (i.all = !0)),
      this._draw(!1, OrgChart.action.minimize, i, function () {
        r.ripple(t), e && e();
      });
  }),
  (OrgChart.prototype._expCollHandler = function (t) {
    this.nodeMenuUI.hide(),
      this.nodeContextMenuUI.hide(),
      this.menuUI.hide(),
      this.nodeCircleMenuUI.hide();
    var e = this.getNode(t),
      r = this.getCollapsedIds(e);
    if (r.length) {
      if (!1 === OrgChart.events.publish("expcollclick", [this, !1, t, r]))
        return !1;
      this.expand(t, r, !1);
    } else {
      if (
        !1 ===
        OrgChart.events.publish("expcollclick", [this, !0, t, e.childrenIds])
      )
        return !1;
      this.collapse(t, e.childrenIds, !1);
    }
  }),
  (OrgChart.prototype._upHandler = function (t) {
    this.nodeMenuUI.hide(),
      this.nodeContextMenuUI.hide(),
      this.menuUI.hide(),
      this.nodeCircleMenuUI.hide();
    var e = this._upHandlerCreateArgs(t);
    if (!1 === OrgChart.events.publish("up-click", [this, e])) return !1;
    this.changeRoots(e.id, e.roots, !1);
  }),
  (OrgChart.prototype._upHandlerCreateArgs = function (t) {
    var e,
      r = this.getNode(t),
      i = Object.assign([], this.config.roots),
      a = this.getNode(r.pid);
    if ((a && (e = a), e)) {
      if (Array.isArray(i)) {
        var n = i.indexOf(r.id);
        -1 != n && i.splice(n, 1);
      } else i = [];
      i.push(e.id);
    }
    return { id: r.id, roots: i };
  }),
  String.prototype.replaceAll ||
    (String.prototype.replaceAll = function (t, e) {
      return this.replace(new RegExp(t, "g"), e);
    }),
  String.prototype.endsWith ||
    (String.prototype.endsWith = function (t) {
      return -1 !== this.indexOf(t, this.length - t.length);
    }),
  String.prototype.splice ||
    (String.prototype.splice = function (t, e, r) {
      return this.slice(0, t) + r + this.slice(t + Math.abs(e));
    }),
  String.prototype.insert ||
    (String.prototype.insert = function (t, e) {
      return t > 0 ? this.substring(0, t) + e + this.substr(t) : e + this;
    }),
  Array.prototype.unique ||
    Object.defineProperty(Array.prototype, "unique", {
      value: function () {
        for (var t = this.concat(), e = 0; e < t.length; ++e)
          for (var r = e + 1; r < t.length; ++r)
            t[e] === t[r] && t.splice(r--, 1);
        return t;
      },
      writable: !0,
      configurable: !0,
      enumerable: !1,
    }),
  Array.prototype.has ||
    Object.defineProperty(Array.prototype, "has", {
      value: function (t) {
        for (var e = 0; e < this.length; e++) if (this[e] == t) return !0;
        return !1;
      },
      writable: !0,
      configurable: !0,
      enumerable: !1,
    }),
  Array.prototype.compare ||
    Object.defineProperty(Array.prototype, "compare", {
      value: function (t) {
        if (this.length != t.length) return !1;
        for (var e = 0; e < this.length; e++) if (!t.has(this[e])) return !1;
        return !0;
      },
      writable: !0,
      configurable: !0,
      enumerable: !1,
    }),
  Object.assign ||
    Object.defineProperty(Object, "assign", {
      value: function (t, e) {
        "use strict";
        if (null == t)
          throw new TypeError("Cannot convert undefined or null to object");
        for (var r = Object(t), i = 1; i < arguments.length; i++) {
          var a = arguments[i];
          if (null != a)
            for (var n in a)
              Object.prototype.hasOwnProperty.call(a, n) && (r[n] = a[n]);
        }
        return r;
      },
      writable: !0,
      configurable: !0,
    }),
  (OrgChart.prototype._globalMouseDownHandler = function (t, e) {
    var r = { move: "mousemove", up: "mouseup", leave: "mouseleave" };
    if (
      (-1 != e.type.indexOf("touch") &&
        (1 == e.touches.length
          ? (this._touch = { x: e.touches[0].clientX, y: e.touches[0].clientY })
          : (this._touch = null),
        (r = { move: "touchmove", up: "touchend", touchstart: "touchstart" })),
      t == e.target)
    )
      return (
        e.stopPropagation(),
        e.preventDefault(),
        void this._mouseDownHandler(t, e, r)
      );
    if (this.config.nodeMouseClick == OrgChart.action.pan) {
      for (
        var i = e.target;
        i != t &&
        !i.hasAttribute(OrgChart.attr.control_expcoll_id) &&
        !i.hasAttribute(OrgChart.attr.control_up_id);

      )
        i = i.parentNode;
      if (
        !i.hasAttribute(OrgChart.attr.control_expcoll_id) &&
        !i.hasAttribute(OrgChart.attr.control_up_id)
      )
        return (
          e.stopPropagation(),
          e.preventDefault(),
          void this._mouseDownHandler(t, e, r)
        );
    }
    for (var a = e.target; a != t; ) {
      if (a.hasAttribute(OrgChart.attr.node_id))
        return void this._nodeMouseDownHandler(a, e, r);
      if (a.hasAttribute(OrgChart.attr.control_node_circle_menu_name))
        return (
          e.stopPropagation(),
          e.preventDefault(),
          void this._nodeCircleNodeMenuItemMouseDownHandler(a, e, r)
        );
      a = a.parentNode;
    }
  }),
  (OrgChart.prototype._globalClickHandler = function (t, e) {
    if (
      -1 != e.type.indexOf("touch") &&
      this._touch &&
      1 == e.changedTouches.length
    ) {
      if (e.changedTouches.length) {
        var r = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
          },
          i = OrgChart.t(this.config.template, !1, this.getScale()).size,
          a = this.getScale(),
          n = Math.abs(r.x - this._touch.x) / a,
          o = Math.abs(r.y - this._touch.y) / a;
        if (((this._touch = null), n > i[0] / 10)) return;
        if (o > i[1] / 10) return;
      }
    } else if (-1 != e.type.indexOf("touch") && null == this._touch) return;
    for (var l = e.target; l != t; ) {
      if (l.hasAttribute(OrgChart.attr.control_expcoll_id)) {
        var s = l.getAttribute(OrgChart.attr.control_expcoll_id),
          h = this.getNode(s);
        return void this._expCollHandler(h.id);
      }
      if (l.hasAttribute(OrgChart.attr.node_id)) {
        (s = l.getAttribute(OrgChart.attr.node_id)), (h = this.getNode(s));
        return void this._nodeClickHandler(h.id, e);
      }
      if (l.hasAttribute(OrgChart.attr.control_node_menu_id)) {
        e.stopPropagation(), e.preventDefault();
        (s = l.getAttribute(OrgChart.attr.control_node_menu_id)),
          (h = this.getNode(s));
        return void this._nodeMenuClickHandler(h.id, l, e);
      }
      if (l.hasAttribute(OrgChart.attr.control_node_circle_menu_id)) {
        e.stopPropagation(), e.preventDefault();
        s = l.getAttribute(OrgChart.attr.control_node_circle_menu_id);
        return void this._nodeCircleMenuClickHandler(s);
      }
      if (l.hasAttribute(OrgChart.attr.control_node_circle_menu_name))
        return (
          e.stopPropagation(),
          e.preventDefault(),
          void this._nodeCircleMenuItemClickHandler(l, e)
        );
      if (l.hasAttribute(OrgChart.attr.control_add))
        return void this._lonelyButtonHandler();
      if (l.hasAttribute(OrgChart.attr.control_up_id)) {
        s = l.getAttribute(OrgChart.attr.control_up_id);
        return e.stopPropagation(), e.preventDefault(), void this._upHandler(s);
      }
      if (l.hasAttribute(OrgChart.attr.c_link_from))
        return void OrgChart.events.publish("clink-click", [
          this,
          {
            from: l.getAttribute(OrgChart.attr.c_link_from),
            to: l.getAttribute(OrgChart.attr.c_link_to),
            event: e,
          },
        ]);
      if (l.hasAttribute(OrgChart.attr.s_link_from))
        return void OrgChart.events.publish("slink-click", [
          this,
          {
            from: l.getAttribute(OrgChart.attr.s_link_from),
            to: l.getAttribute(OrgChart.attr.s_link_to),
            event: e,
          },
        ]);
      l = l.parentNode;
    }
  }),
  (OrgChart.prototype._globalContextHandler = function (t, e) {
    for (var r = e.target; r != t; ) {
      if (r.hasAttribute(OrgChart.attr.node_id)) {
        var i = r.getAttribute(OrgChart.attr.node_id),
          a = this.getNode(i);
        return void this._nodeContextHandler(a.id, e);
      }
      r = r.parentNode;
    }
  }),
  (OrgChart.prototype._nodeContextHandler = function (t, e) {
    e.preventDefault(),
      OrgChart.SEARCH_CLOSE_RESULT_ON_ESCAPE_OR_CLICKOUTSIDE &&
        this.searchUI.hide(),
      this.nodeMenuUI.hide(),
      this.nodeContextMenuUI.hide(),
      this.menuUI.hide(),
      this.nodeCircleMenuUI.hide();
    var r = this.get(t),
      i = null;
    if (null != r && Array.isArray(r.tags))
      for (var a = 0; a < r.tags.length; a++) {
        var n = r.tags[a];
        this.config.tags[n] &&
          this.config.tags[n].nodeContextMenu &&
          (i = this.config.tags[n].nodeContextMenu);
      }
    var o = this.element.getBoundingClientRect(),
      l = e.clientX - o.left,
      s = e.clientY - o.top;
    this.nodeContextMenuUI.show(l, s, t, null, i);
  }),
  (OrgChart.prototype._globalDbClickHandler = function (t, e) {
    for (var r = e.target; r != t; ) {
      if (r.hasAttribute(OrgChart.attr.node_id)) {
        var i = r.getAttribute(OrgChart.attr.node_id),
          a = this.getNode(i);
        return void this._nodeDbClickHandler(a.id, e);
      }
      r = r.parentNode;
    }
  }),
  (OrgChart.prototype._mouseScrollHandler = function (t, e) {
    this.__mouseScrollHandler(this.getSvg(), e);
  }),
  (OrgChart.prototype.__mouseScrollHandler = function (t, e) {
    if (e.ctrlKey) {
      if (this.config.mouseScrool == OrgChart.action.zoom) return;
    } else {
      if (this.config.mouseScrool == OrgChart.action.ctrlZoom) return;
      if (this.config.mouseScrool != OrgChart.action.zoom) return;
    }
    var r = this,
      i = !1,
      a = this.config.zoom.speed,
      n = this.config.zoom.smooth,
      o = 0,
      l = this.getScale(),
      s = OrgChart._centerPointInPercent(t, e.pageX, e.pageY);
    var h =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (t) {
        setTimeout(t, 20);
      };
    e.preventDefault();
    var d = e.delta || e.wheelDelta;
    void 0 === d && (d = -e.detail),
      (d = Math.max(-1, Math.min(1, d))),
      (o += -d * a),
      i ||
        (function t() {
          i = !0;
          var e = (o - l) / n;
          e > 0 ? e++ : e--,
            (l += e),
            r.zoom(1 - e / 12 / 50, s),
            parseInt(l) == parseInt(o) ? (i = !1) : h(t);
        })();
  }),
  (OrgChart.prototype._nodeCircleNodeMenuItemMouseDownHandler = function (
    t,
    e,
    r
  ) {
    var i = t.parentNode.getAttribute(
        OrgChart.attr.control_node_circle_menu_wrraper_id
      ),
      a = t.getAttribute(OrgChart.attr.control_node_circle_menu_name),
      n = this.nodeCircleMenuUI._menu[a];
    if (n.draggable) {
      var o = this,
        l = OrgChart._getClientXY(e),
        s = this.getNode(i);
      t._dragEventFired = !1;
      var h = o.getScale(),
        d = null,
        c = null;
      (this._gragStartedId = i),
        (document.body.style.mozUserSelect =
          document.body.style.webkitUserSelect =
          document.body.style.userSelect =
            "none");
      var g = this.getSvg(),
        p = { x: l.x, y: l.y },
        u = t.cloneNode(!0);
      g.insertBefore(u, g.firstChild);
      var f = OrgChart._getTransform(u),
        m = f[4],
        C = f[5],
        O = (function (t) {
          for (
            ;
            t &&
            !t.hasAttribute(OrgChart.attr.control_node_circle_menu_wrraper_id);

          )
            t = t.parentNode;
          if (t) {
            var e = OrgChart._getTransform(t);
            return { x: e[4], y: e[5] };
          }
          console.error(
            "cannot find parent" +
              OrgChart.attr.control_node_circle_menu_wrraper_id
          );
        })(t);
      u.setAttribute(
        "transform",
        "matrix(1,0,0,1," + (m + O.x) + "," + (C + O.y) + ")"
      ),
        (u.style.opacity = 0.7);
      var b = function (t, e) {
          if (null != t) {
            e.classList.remove("boc-drag-over");
            for (
              var r = OrgChart.getStParentNodes(o.getNode(d)), i = 0;
              i < r.length;
              i++
            ) {
              var a = o.getNodeElement(r[i].id);
              a && (a.style.opacity = 1);
            }
          }
        },
        v = function (e) {
          if (p) {
            var r = OrgChart._getClientXY(e),
              i = e.target;
            OrgChart.isMobile() && (i = document.elementFromPoint(r.x, r.y)),
              (r.x += O.x * h),
              (r.y += O.y * h);
            var l = OrgChart._getOffsetXY(o.element, e),
              s = {
                left: o.width() - (l.x + o.config.padding) < 0,
                right: l.x - o.config.padding < 0,
                up: o.height() - (l.y + o.config.padding) < 0,
                down: l.y - o.config.padding < 0,
              };
            if (s.left || s.right || s.up || s.down) {
              g.classList &&
                (g.classList.remove("boc-cursor-grab"),
                g.classList.add("boc-cursor-move"),
                g.classList.remove("boc-cursor-nodrop"),
                g.classList.remove("boc-cursor-copy"));
              var v = f[4],
                x = f[5],
                _ = p.x,
                w = p.y,
                k = r.x,
                S = r.y;
              o.moveStart(s, function (t) {
                (f[4] = v + t.x),
                  (f[5] = x + t.y),
                  (p.x = _ - t.xWithoutScale),
                  (p.y = w - t.yWithoutScale),
                  (r.x = k - t.xWithoutScale),
                  (r.y = S - t.yWithoutScale),
                  u.setAttribute("transform", "matrix(" + f.toString() + ")");
              });
            } else {
              for (
                o.moveEnd(),
                  g.classList &&
                    (g.classList.add("boc-cursor-grab"),
                    g.classList.remove("boc-cursor-move"),
                    g.classList.remove("boc-cursor-nodrop"),
                    g.classList.remove("boc-cursor-copy")),
                  b(d, c),
                  d = null,
                  c = null;
                null != i && i != g;

              ) {
                if (i.hasAttribute && i.hasAttribute(OrgChart.attr.node_id)) {
                  var I = i.getAttribute(OrgChart.attr.node_id);
                  (d = I), (c = i);
                  break;
                }
                i = i.parentNode;
              }
              if (null != d) {
                c.classList.add("boc-drag-over");
                for (
                  var A = o.getNode(d), L = OrgChart.getStParentNodes(A), N = 0;
                  N < L.length;
                  N++
                ) {
                  var E = o.getNodeElement(L[N].id);
                  E && (E.style.opacity = 0.1);
                }
                g.classList.remove("boc-cursor-grab"),
                  g.classList.remove("boc-cursor-move"),
                  g.classList.add("boc-cursor-copy"),
                  g.classList.remove("boc-cursor-nodrop");
              }
              var M = (r.x - p.x) / h,
                T = (r.y - p.y) / h;
              if (
                ((f[4] = m + M),
                (f[5] = C + T),
                !t._dragEventFired &&
                  (Math.abs(r.x - p.x) > OrgChart.FIRE_DRAG_NOT_CLICK_IF_MOVE ||
                    Math.abs(r.y - p.y) > OrgChart.FIRE_DRAG_NOT_CLICK_IF_MOVE))
              )
                !1 ===
                  OrgChart.events.publish("drag", [
                    o.nodeCircleMenuUI,
                    { from: I, menuItem: n, menuItemName: a },
                  ]) && y(),
                  (t._dragEventFired = !0);
              u.setAttribute("transform", "matrix(" + f.toString() + ")");
            }
          }
        },
        y = function (e) {
          if (
            (o.moveEnd(),
            g.classList &&
              (g.classList.remove("boc-cursor-grab"),
              g.classList.remove("boc-cursor-move"),
              g.classList.remove("boc-cursor-nodrop"),
              g.classList.remove("boc-cursor-copy")),
            g.removeEventListener(r.move, v),
            g.removeEventListener(r.up, y),
            r.leave && g.removeEventListener(r.leave, y),
            s.id == d || null == d)
          )
            return (
              g.removeChild(u),
              (o._gragStartedId = null),
              void (
                t._dragEventFired &&
                OrgChart.events.publish("drop", [
                  o.nodeCircleMenuUI,
                  { from: s.id, menuItemName: a, menuItem: n, event: e },
                ])
              )
            );
          var i = o.getNode(d);
          OrgChart.events.publish("drop", [
            o.nodeCircleMenuUI,
            { from: s.id, to: i.id, menuItem: n, menuItemName: a, event: e },
          ]),
            b(d, c),
            g.removeChild(u),
            (o._gragStartedId = null);
        };
      g.addEventListener(r.move, v),
        g.addEventListener(r.up, y),
        r.leave && g.addEventListener(r.leave, y);
    }
  }),
  (OrgChart.prototype._nodeMouseDownHandler = function (t, e, r) {
    var i = t.getAttribute(OrgChart.attr.node_id),
      a = this.getNode(i);
    this.config.movable && !OrgChart.getRootOf(a).stParent
      ? this._movableHandler(t, e, r)
      : this.config.enableDragDrop && this._dragDropHandler(t, e, r);
  }),
  (OrgChart.prototype._movableHandler = function (t, e, r) {
    var i = this,
      a = t.getAttribute(OrgChart.attr.node_id),
      n = [],
      o = function (t, e) {
        if (Array.isArray(t)) for (var r = 0; r < t.length; r++) o(t[r], e);
        else {
          e.push(t.id);
          for (r = 0; r < t.stChildren.length; r++) o(t.stChildren[r], e);
          for (r = 0; r < t.children.length; r++) o(t.children[r], e);
        }
      },
      l = function (t, e) {
        if (Array.isArray(t)) for (var r = 0; r < t.length; r++) o(t[r], e);
        else {
          e.push(t.id);
          for (r = 0; r < t.stChildrenIds.length; r++)
            l(i.getNode(t.stChildrenIds[r]), e);
          for (r = 0; r < t.childrenIds.length; r++)
            l(i.getNode(t.childrenIds[r]), e);
        }
      },
      s = this.getNode(a);
    o(s, n);
    for (
      var h = this.getSvg(),
        d = OrgChart._getClientXY(e),
        c = [],
        g = [],
        p = [],
        u = [],
        f = [],
        m = [],
        C = [],
        O = [],
        b = 0;
      b < n.length;
      b++
    ) {
      var v = this.getNode(n[b]);
      c.push(v), p.push({ x: v.x, y: v.y });
      var y = this.getNodeElement(n[b]);
      if (y) {
        f.push(y);
        var x = OrgChart._getTransform(y);
        u.push({ x: x[4], y: x[5] }), g.push(x);
        var _ = this.element.querySelector(`[data-ctrl-ec-id="${n[b]}"]`);
        if (_) {
          m.push(_);
          var w = OrgChart._getTransform(_);
          C.push(w), O.push({ x: w[4], y: w[5] });
        } else m.push(null), C.push(null), O.push(null);
        if (this.config.movable == OrgChart.movable.node) break;
      }
    }
    t._dragEventFired = !1;
    var k = null,
      S = null;
    (this._gragStartedId = n[0]),
      (document.body.style.mozUserSelect =
        document.body.style.webkitUserSelect =
        document.body.style.userSelect =
          "none");
    var I = { x: d.x, y: d.y },
      A = i.getScale(),
      L = function (t, e) {
        if (null != t) {
          e.classList.remove("boc-drag-over");
          for (
            var r = i.getNode(k), a = OrgChart.getStParentNodes(r), n = 0;
            n < a.length;
            n++
          ) {
            var o = i.getNodeElement(a[n].id);
            o && (o.style.opacity = 1);
          }
        }
      },
      N = function (e) {
        if (I) {
          var r = OrgChart._getClientXY(e),
            o = e.target;
          OrgChart.isMobile() && (o = document.elementFromPoint(r.x, r.y));
          var l = OrgChart._getOffsetXY(i.element, e),
            d = {
              left: i.width() - (l.x + i.config.padding) < 0,
              right: l.x - i.config.padding < 0,
              up: i.height() - (l.y + i.config.padding) < 0,
              down: l.y - i.config.padding < 0,
            };
          if (d.left || d.right || d.up || d.down) {
            h.classList &&
              (h.classList.remove("boc-cursor-grab"),
              h.classList.add("boc-cursor-move"),
              h.classList.remove("boc-cursor-nodrop"),
              h.classList.remove("boc-cursor-copy"));
            for (var b = [], v = [], y = [], x = [], _ = 0; _ < g.length; _++)
              b.push(g[_][4]),
                v.push(g[_][5]),
                C[_]
                  ? (y.push(C[_][4]), x.push(C[_][5]))
                  : (y.push(null), x.push(null));
            var w = I.x,
              N = I.y,
              M = r.x,
              T = r.y;
            i.moveStart(d, function (t) {
              for (var e = 0; e < g.length; e++) {
                var a = b[e],
                  n = v[e],
                  o = y[e],
                  l = x[e];
                (g[e][4] = a + t.x),
                  (g[e][5] = n + t.y),
                  (I.x = w - t.xWithoutScale),
                  (I.y = N - t.yWithoutScale),
                  (r.x = M - t.xWithoutScale),
                  (r.y = T - t.yWithoutScale),
                  (c[e].x = a + t.x),
                  (c[e].y = n + t.y),
                  (c[e].movex = t.x),
                  (c[e].movey = t.y),
                  C[e] && ((C[e][4] = o + t.x), (C[e][5] = l + t.y));
                for (
                  var s = OrgChart.ui.link(
                      c[e],
                      i,
                      A,
                      i.response.bordersByRootIdAndLevel,
                      i.nodes,
                      OrgChart.action.update,
                      !0
                    ),
                    h = 0;
                  h < s.length;
                  h++
                ) {
                  var d = s[h];
                  (p = i.element.querySelector(
                    `[data-l-id="[${d.id}][${d.childId}]"]`
                  )) && (p.innerHTML = d.html);
                }
                if (c[e].parent)
                  for (
                    s = OrgChart.ui.link(
                      c[e].parent,
                      i,
                      A,
                      i.response.bordersByRootIdAndLevel,
                      i.nodes,
                      OrgChart.action.update,
                      !0
                    ),
                      h = 0;
                    h < s.length;
                    h++
                  ) {
                    var p;
                    d = s[h];
                    (p = i.element.querySelector(
                      `[data-l-id="[${d.id}][${d.childId}]"]`
                    )) && (p.innerHTML = d.html);
                  }
                f[e].setAttribute(
                  "transform",
                  "matrix(" + g[e].toString() + ")"
                ),
                  m[e] &&
                    m[e].setAttribute(
                      "transform",
                      "matrix(" + C[e].toString() + ")"
                    );
              }
            });
          } else {
            if (
              (i.moveEnd(),
              h.classList &&
                (h.classList.add("boc-cursor-grab"),
                h.classList.remove("boc-cursor-move"),
                h.classList.remove("boc-cursor-nodrop"),
                h.classList.remove("boc-cursor-copy")),
              L(k, S),
              (k = null),
              (S = null),
              i.config.enableDragDrop)
            )
              for (; null != o && o != h; ) {
                if (o.hasAttribute && o.hasAttribute(OrgChart.attr.node_id)) {
                  var B = o.getAttribute(OrgChart.attr.node_id);
                  if (i._gragStartedId && B != i._gragStartedId) {
                    (k = B), (S = o);
                    break;
                  }
                }
                o = o.parentNode;
              }
            if (null != k) {
              S.classList.add("boc-drag-over");
              for (
                var U = i.getNode(k), R = OrgChart.getStParentNodes(U), P = 0;
                P < R.length;
                P++
              ) {
                var F = i.getNodeElement(R[P].id);
                F && (F.style.opacity = 0.1);
              }
              !i.canUpdateLink(c[0].id, k) && h.classList
                ? (h.classList.remove("boc-cursor-grab"),
                  h.classList.remove("boc-cursor-move"),
                  h.classList.remove("boc-cursor-copy"),
                  h.classList.add("boc-cursor-nodrop"))
                : h.classList &&
                  (h.classList.remove("boc-cursor-grab"),
                  h.classList.remove("boc-cursor-move"),
                  h.classList.add("boc-cursor-copy"),
                  h.classList.remove("boc-cursor-nodrop"));
            }
            var H = (r.x - I.x) / A,
              D = (r.y - I.y) / A;
            for (_ = 0; _ < g.length; _++) {
              (g[_][4] = u[_].x + H),
                (g[_][5] = u[_].y + D),
                C[_] && ((C[_][4] = O[_].x + H), (C[_][5] = O[_].y + D)),
                (c[_].x = p[_].x + H),
                (c[_].y = p[_].y + D),
                (c[_].movex = H),
                (c[_].movey = D);
              var z = OrgChart.ui.link(
                c[_],
                i,
                A,
                i.response.bordersByRootIdAndLevel,
                i.nodes,
                OrgChart.action.update,
                !0
              );
              for (P = 0; P < z.length; P++) {
                var j = z[P];
                (Y = i.element.querySelector(
                  `[data-l-id="[${j.id}][${j.childId}]"]`
                )) && (Y.innerHTML = j.html);
              }
            }
            if (s.parent)
              if (i.config.movable == OrgChart.movable.detachTree)
                (Y = i.element.querySelector(
                  `[data-l-id="[${s.parent.id}][${s.id}]"]`
                )) && Y.parentElement.removeChild(Y);
              else
                for (
                  z = OrgChart.ui.link(
                    s.parent,
                    i,
                    A,
                    i.response.bordersByRootIdAndLevel,
                    i.nodes,
                    OrgChart.action.update,
                    !0
                  ),
                    P = 0;
                  P < z.length;
                  P++
                ) {
                  var Y;
                  j = z[P];
                  (Y = i.element.querySelector(
                    `[data-l-id="[${j.id}][${j.childId}]"]`
                  )) && (Y.innerHTML = j.html);
                }
            if (
              !t._dragEventFired &&
              (Math.abs(r.x - I.x) > OrgChart.FIRE_DRAG_NOT_CLICK_IF_MOVE ||
                Math.abs(r.y - I.y) > OrgChart.FIRE_DRAG_NOT_CLICK_IF_MOVE)
            ) {
              if (
                (!1 === OrgChart.events.publish("drag", [i, a, e, n]) && E(),
                i.config.enableDragDrop)
              )
                for (_ = 0; _ < f.length; _++)
                  h.insertBefore(f[_], h.firstChild);
              t._dragEventFired = !0;
            }
            for (_ = 0; _ < g.length; _++)
              f[_].setAttribute("transform", "matrix(" + g[_].toString() + ")"),
                m[_] &&
                  m[_].setAttribute(
                    "transform",
                    "matrix(" + C[_].toString() + ")"
                  );
          }
        }
      },
      E = function (e) {
        for (var a = 0; a < c.length; a++) (c[a].x = p[a].x), (c[a].y = p[a].y);
        if (
          (i.moveEnd(),
          h.classList &&
            (h.classList.remove("boc-cursor-grab"),
            h.classList.remove("boc-cursor-move"),
            h.classList.remove("boc-cursor-nodrop"),
            h.classList.remove("boc-cursor-copy")),
          h.removeEventListener(r.move, N),
          h.removeEventListener(r.up, E),
          r.leave && h.removeEventListener(r.leave, E),
          c[0].id != k && null != k)
        ) {
          var n = i.getNode(k);
          if (
            !1 ===
            (o = OrgChart.events.publish("drop", [i, c[0].id, n.id, f[0], e]))
          )
            return L(k, S), void (i._gragStartedId = null);
          if (i.canUpdateLink(c[0].id, k))
            ((C = i.get(c[0].id)).pid = k),
              (C.stpid = null),
              i.updateNode(C, null, !0);
          else L(k, S);
          i._gragStartedId = null;
        } else {
          if (t._dragEventFired) {
            var o = OrgChart.events.publish("drop", [
              i,
              c[0].id,
              void 0,
              f[0],
              e,
            ]);
            if (i.config.movable && !1 !== o)
              if (i.config.movable == OrgChart.movable.detachTree) {
                var d = OrgChart._getTransform(i.getNodeElement(s.id));
                ((C = i.get(s.id)).pid = null),
                  (C.stpid = null),
                  i.updateNode(C, null, !0);
              } else {
                var g = [];
                i.config.movable == OrgChart.movable.node
                  ? g.push(s.id)
                  : l(s, g);
                var u =
                    (d = OrgChart._getTransform(i.getNodeElement(s.id)))[4] -
                    s.x,
                  m = d[5] - s.y;
                for (a = 0; a < g.length; a++) {
                  var C;
                  (C = i.get(g[a])) &&
                    (null != C.movex ? (C.movex += u) : (C.movex = u),
                    null != C.movey ? (C.movey += m) : (C.movey = m),
                    i.update(C));
                }
                OrgChart.events.publish("updated", [i]),
                  i.draw(OrgChart.action.update, { dragNodeIdList: g });
              }
          }
          i._gragStartedId = null;
        }
      };
    h.addEventListener(r.move, N),
      h.addEventListener(r.up, E),
      r.leave && h.addEventListener(r.leave, E);
  }),
  (OrgChart.prototype._dragDropHandler = function (t, e, r) {
    var i = OrgChart._getClientXY(e),
      a = t.getAttribute(OrgChart.attr.node_id),
      n = this.getNode(a);
    t._dragEventFired = !1;
    var o = null,
      l = null;
    (this._gragStartedId = a),
      (this.element.style.mozUserSelect =
        this.element.style.webkitUserSelect =
        this.element.style.userSelect =
          "none");
    var s = this,
      h = this.getSvg(),
      d = { x: i.x, y: i.y },
      c = OrgChart._getTransform(t),
      g = c[4],
      p = c[5],
      u = s.getScale(),
      f = t.cloneNode(!0);
    f.setAttribute("data-n-id", "draging"),
      h.insertBefore(f, h.firstChild),
      (f.style.opacity = 0.7);
    var m = function (t, e) {
        if (null != t) {
          e.classList.remove("boc-drag-over");
          for (
            var r = s.getNode(o), i = OrgChart.getStParentNodes(r), a = 0;
            a < i.length;
            a++
          ) {
            var n = s.getNodeElement(i[a].id);
            n && (n.style.opacity = 1);
          }
        }
      },
      C = function (e) {
        if (d) {
          var r = OrgChart._getClientXY(e),
            i = e.target;
          OrgChart.isMobile() && (i = document.elementFromPoint(r.x, r.y));
          var a = OrgChart._getOffsetXY(s.element, e),
            C = {
              left: s.width() - (a.x + s.config.padding) < 0,
              right: a.x - s.config.padding < 0,
              up: s.height() - (a.y + s.config.padding) < 0,
              down: a.y - s.config.padding < 0,
            };
          if (C.left || C.right || C.up || C.down) {
            h.classList &&
              (h.classList.remove("boc-cursor-grab"),
              h.classList.add("boc-cursor-move"),
              h.classList.remove("boc-cursor-nodrop"),
              h.classList.remove("boc-cursor-copy"));
            var b = c[4],
              v = c[5],
              y = d.x,
              x = d.y,
              _ = r.x,
              w = r.y;
            s.moveStart(C, function (t) {
              (c[4] = b + t.x),
                (c[5] = v + t.y),
                (d.x = y - t.xWithoutScale),
                (d.y = x - t.yWithoutScale),
                (r.x = _ - t.xWithoutScale),
                (r.y = w - t.yWithoutScale),
                f.setAttribute("transform", "matrix(" + c.toString() + ")");
            });
          } else {
            if (
              (s.moveEnd(),
              h.classList &&
                (h.classList.add("boc-cursor-grab"),
                h.classList.remove("boc-cursor-move"),
                h.classList.remove("boc-cursor-nodrop"),
                h.classList.remove("boc-cursor-copy")),
              m(o, l),
              (o = null),
              (l = null),
              s.config.enableDragDrop)
            )
              for (; null != i && i != h; ) {
                if (i.hasAttribute && i.hasAttribute(OrgChart.attr.node_id)) {
                  var k = i.getAttribute(OrgChart.attr.node_id);
                  if (s._gragStartedId && k != s._gragStartedId) {
                    (o = k), (l = i);
                    break;
                  }
                }
                i = i.parentNode;
              }
            if (("draging" == o && ((o = null), (l = null)), null != o)) {
              l.classList.add("boc-drag-over");
              for (
                var S = s.getNode(o), I = OrgChart.getStParentNodes(S), A = 0;
                A < I.length;
                A++
              ) {
                var L = s.getNodeElement(I[A].id);
                L && (L.style.opacity = 0.1);
              }
              !s.canUpdateLink(n.id, o) && h.classList
                ? (h.classList.remove("boc-cursor-grab"),
                  h.classList.remove("boc-cursor-move"),
                  h.classList.remove("boc-cursor-copy"),
                  h.classList.add("boc-cursor-nodrop"))
                : h.classList &&
                  (h.classList.remove("boc-cursor-grab"),
                  h.classList.remove("boc-cursor-move"),
                  h.classList.add("boc-cursor-copy"),
                  h.classList.remove("boc-cursor-nodrop"));
            }
            var N = (r.x - d.x) / u,
              E = (r.y - d.y) / u;
            if (
              ((c[4] = g + N),
              (c[5] = p + E),
              !t._dragEventFired &&
                (Math.abs(r.x - d.x) > OrgChart.FIRE_DRAG_NOT_CLICK_IF_MOVE ||
                  Math.abs(r.y - d.y) > OrgChart.FIRE_DRAG_NOT_CLICK_IF_MOVE))
            )
              !1 === OrgChart.events.publish("drag", [s, k, e]) && O(),
                (t._dragEventFired = !0);
            f.setAttribute("transform", "matrix(" + c.toString() + ")");
          }
        }
      },
      O = function (e) {
        if (
          (s.moveEnd(),
          h.classList &&
            (h.classList.remove("boc-cursor-grab"),
            h.classList.remove("boc-cursor-move"),
            h.classList.remove("boc-cursor-nodrop"),
            h.classList.remove("boc-cursor-copy")),
          h.removeEventListener(r.move, C),
          h.removeEventListener(r.up, O),
          r.leave && h.removeEventListener(r.leave, O),
          n.id == o || null == o)
        )
          return (
            t._dragEventFired &&
              OrgChart.events.publish("drop", [s, n.id, void 0, f, e]),
            h.removeChild(f),
            void (s._gragStartedId = null)
          );
        var i = s.getNode(o);
        if (!1 === OrgChart.events.publish("drop", [s, n.id, i.id, f, e]))
          return m(o, l), h.removeChild(f), void (s._gragStartedId = null);
        if (s.canUpdateLink(n.id, o)) {
          var a = s.get(n.id);
          (a.pid = o),
            (a.stpid = null),
            null != a.movex && (a.movex = void 0),
            null != a.movey && (a.movey = void 0),
            s.updateNode(a, null, !0);
        } else h.removeChild(f), m(o, l);
        s._gragStartedId = null;
      };
    h.addEventListener(r.move, C),
      h.addEventListener(r.up, O),
      r.leave && h.addEventListener(r.leave, O);
  }),
  (OrgChart.prototype._resizeHandler = function (t, e) {
    if (this.isVisible) {
      var r = this.getViewBox(),
        i = this.getSvg(),
        a = i.getAttribute("width"),
        n = i.getAttribute("height"),
        o = a / r[2],
        l = n / r[3],
        s = o > l ? l : o;
      i.setAttribute("width", this.width()),
        i.setAttribute("height", this.height()),
        (r[2] = this.width() / s),
        (r[3] = this.height() / s),
        this.setViewBox(r),
        this.xScrollUI.create(this.width()),
        this.yScrollUI.create(this.height()),
        this._draw(!1, OrgChart.action.resize);
    }
  }),
  (OrgChart.prototype._nodeDbClickHandler = function (t, e) {
    if (!1 === OrgChart.events.publish("dbclick", [this, this.get(t)]))
      return !1;
    this._commonClickHandler(t, e, this.config.nodeMouseDbClick);
  }),
  (OrgChart.prototype._nodeClickHandler = function (t, e) {
    var r = this.getNodeElement(t);
    if (r && r._dragEventFired) r._dragEventFired = !1;
    else {
      if (
        !1 ===
        OrgChart.events.publish("click", [
          this,
          { node: this.getNode(t), event: e },
        ])
      )
        return !1;
      this._commonClickHandler(t, e, this.config.nodeMouseClick);
    }
  }),
  (OrgChart.prototype._nodeCircleMenuItemClickHandler = function (t, e) {
    var r = t.parentNode.getAttribute(
        OrgChart.attr.control_node_circle_menu_wrraper_id
      ),
      i = t.getAttribute(OrgChart.attr.control_node_circle_menu_name),
      a = this.nodeCircleMenuUI._menu[i];
    OrgChart.events.publish("click", [
      this.nodeCircleMenuUI,
      { nodeId: r, menuItemName: i, menuItem: a, event: e },
    ]);
  }),
  (OrgChart.prototype._nodeCircleMenuClickHandler = function (t) {
    OrgChart.SEARCH_CLOSE_RESULT_ON_ESCAPE_OR_CLICKOUTSIDE &&
      this.searchUI.hide(),
      this.nodeMenuUI.hide(),
      this.nodeContextMenuUI.hide(),
      this.menuUI.hide();
    var e = this.getNode(t),
      r = null;
    if (Array.isArray(e.tags))
      for (var i = 0; i < e.tags.length; i++) {
        var a = e.tags[i];
        this.config.tags[a] &&
          this.config.tags[a].nodeCircleMenu &&
          (r = this.config.tags[a].nodeCircleMenu);
      }
    this.nodeCircleMenuUI.show(t, r);
  }),
  (OrgChart.prototype._commonClickHandler = function (t, e, r) {
    var i;
    (OrgChart.SEARCH_CLOSE_RESULT_ON_ESCAPE_OR_CLICKOUTSIDE &&
      this.searchUI.hide(),
    this.nodeMenuUI.hide(),
    this.nodeContextMenuUI.hide(),
    this.menuUI.hide(),
    this.nodeCircleMenuUI.hide(),
    r == OrgChart.action.expandCollapse && this.toggleExpandCollapse(t, e),
    r == OrgChart.action.edit) &&
      (i = this.getNode(t)) &&
      (this.editUI.show(i.id), this.ripple(i.id, e.clientX, e.clientY));
    r == OrgChart.action.details &&
      (i = this.getNode(t)) &&
      (this.editUI.show(i.id, !0), this.ripple(i.id, e.clientX, e.clientY));
  }),
  (OrgChart.prototype._menuHandlerMouseDownHandler = function (t, e) {
    e.stopPropagation(), e.preventDefault();
  }),
  (OrgChart.prototype._nodeMenuClickHandler = function (t, e, r) {
    OrgChart.SEARCH_CLOSE_RESULT_ON_ESCAPE_OR_CLICKOUTSIDE &&
      this.searchUI.hide(),
      this.nodeMenuUI.hide(),
      this.nodeContextMenuUI.hide(),
      this.menuUI.hide(),
      this.nodeCircleMenuUI.hide();
    var i = this.getNode(t),
      a = null;
    if (Array.isArray(i.tags))
      for (var n = 0; n < i.tags.length; n++) {
        var o = i.tags[n];
        this.config.tags[o] &&
          this.config.tags[o].nodeMenu &&
          (a = this.config.tags[o].nodeMenu);
      }
    this.nodeMenuUI.showStickIn(e, t, null, a);
  }),
  (OrgChart.prototype._menuClickHandler = function (t, e) {
    e.stopPropagation(),
      e.preventDefault(),
      this.nodeMenuUI.hide(),
      this.nodeContextMenuUI.hide(),
      this.menuUI.show(t.offsetLeft, t.offsetTop);
  }),
  (OrgChart.prototype._lonelyButtonHandler = function () {
    var t = { id: this.generateId() };
    !1 !== this.addNode(t, null, !0) && this.center(t.id);
  }),
  (OrgChart.prototype.toggleExpandCollapse = function (t, e) {
    var r = this.getNode(t),
      i = this.getCollapsedIds(r);
    if (i.length) {
      if (!1 === OrgChart.events.publish("expcollclick", [this, !1, t, i]))
        return !1;
      this.expand(t, i, !1);
    } else {
      if (
        !1 ===
        OrgChart.events.publish("expcollclick", [this, !0, t, r.childrenIds])
      )
        return !1;
      this.collapse(t, r.childrenIds, !1);
    }
    e && this.ripple(r.id, e.clientX, e.clientY);
  }),
  (OrgChart.prototype._move = function (t, e, r) {
    (r[0] = e),
      (r[1] = t),
      this.setViewBox(r),
      this.xScrollUI.setPosition(),
      this.yScrollUI.setPosition();
  }),
  (OrgChart.prototype.moveStart = function (t, e, r, i) {
    if (t) {
      if (!this._moveInterval) {
        var a = this,
          n = this.getViewBox().slice(0),
          o = this.getScale(),
          l = 0,
          s = 0,
          h = 1;
        OrgChart.isNEU(r) && (r = OrgChart.anim.inSin),
          OrgChart.isNEU(i) && (i = 3e3),
          (this._moveInterval = setInterval(function () {
            var d = { x: 0, y: 0, xWithoutScale: 0, yWithoutScale: 0 };
            t.left
              ? (l++,
                (d.x = (l * OrgChart.MOVE_STEP) / o),
                (d.xWithoutScale = l * OrgChart.MOVE_STEP))
              : t.right &&
                (l++,
                (d.x = (-l * OrgChart.MOVE_STEP) / o),
                (d.xWithoutScale = -l * OrgChart.MOVE_STEP)),
              t.up
                ? (s++,
                  (d.y = (s * OrgChart.MOVE_STEP) / o),
                  (d.yWithoutScale = s * OrgChart.MOVE_STEP))
                : t.down &&
                  (s++,
                  (d.y = (-s * OrgChart.MOVE_STEP) / o),
                  (d.yWithoutScale = -s * OrgChart.MOVE_STEP));
            var c = r((10 * h - 10) / i);
            (d.x = d.x * c),
              (d.xWithoutScale = d.xWithoutScale * c),
              (d.y = d.y * c),
              (d.yWithoutScale = d.yWithoutScale * c),
              a.setViewBox([n[0] + d.x, n[1] + d.y, n[2], n[3]]),
              e && e(d),
              (h += 1);
          }, 10));
      }
    } else console.error("movePosition parameter not defined");
  }),
  (OrgChart.prototype.moveEnd = function () {
    this._moveInterval &&
      (clearInterval(this._moveInterval), (this._moveInterval = null));
  }),
  void 0 === OrgChart && (OrgChart = {}),
  (OrgChart.node = function (t, e, r, i) {
    (this.templateName = i),
      (this.id = t),
      (this.pid = e),
      (this.children = []),
      (this.childrenIds = []),
      (this.parent = null),
      (this.stpid = null),
      (this.stParent = null),
      (this.stChildren = []),
      (this.stChildrenIds = []),
      (this.tags = r),
      this.tags || (this.tags = []);
  }),
  (OrgChart.prototype._mouseDownHandler = function (t, e, r) {
    var i = this;
    OrgChart.HIDE_EDIT_FORM_ON_PAN && this.editUI.hide(),
      OrgChart.SEARCH_CLOSE_RESULT_ON_ESCAPE_OR_CLICKOUTSIDE &&
        this.searchUI.hide(),
      this.nodeMenuUI.hide(),
      this.nodeContextMenuUI.hide(),
      this.menuUI.hide(),
      this.nodeCircleMenuUI.hide();
    var a = this.getViewBox(),
      n = this.getScale(),
      o = OrgChart._getClientTouchesXY(e, 0),
      l = OrgChart._getClientTouchesXY(e, 1),
      s = {
        diffX: 0,
        diffY: 0,
        x0: o.x,
        y0: o.y,
        type: "pan",
        viewBoxLeft: a[0],
        viewBoxTop: a[1],
      };
    e.touches &&
      e.touches.length > 1 &&
      ((s.type = "pinch"),
      (s.dist = Math.sqrt(
        (o.x - l.x) * (o.x - l.x) + (o.y - l.y) * (o.y - l.y)
      ))),
      "pan" == s.type &&
        (this._hideBeforeAnimation(), this._changeCursorOnPanStart(a, n, e));
    var h = function (t) {
        var e = OrgChart._getClientTouchesXY(t, 0);
        if (s && "pan" == s.type) {
          i._hideBeforeAnimation(),
            (s.diffX = e.x - s.x0),
            (s.diffY = e.y - s.y0);
          var r = -s.diffY / n + s.viewBoxTop,
            o = -s.diffX / n + s.viewBoxLeft;
          i._move(r, o, a);
        } else if (s && "pinch" == s.type) {
          var l = OrgChart._getClientTouchesXY(t, 1),
            h = Math.sqrt(
              (e.x - l.x) * (e.x - l.x) + (e.y - l.y) * (e.y - l.y)
            ),
            d = 1 + (h - s.dist) / (s.dist / 100) / 100;
          s.dist = h;
          var c = OrgChart._pinchMiddlePointInPercent(
            i.element,
            i.width(),
            i.height(),
            t
          );
          i.zoom(d, c);
        }
      },
      d = function () {
        "pan" == s.type && i.config.sticky
          ? setTimeout(function () {
              OrgChart._moveToBoundaryArea(
                t,
                i.getViewBox(),
                i.response.boundary,
                function () {
                  i._draw(!0, OrgChart.action.pan);
                }
              );
            }, 0)
          : "pan" != s.type ||
            i.config.sticky ||
            setTimeout(function () {
              i._draw(!0, OrgChart.action.pan);
            }, 0),
          "pan" == s.type && i._changeCursorOnPanEnd(),
          (s = null),
          t.removeEventListener(r.move, h),
          t.removeEventListener(r.up, d),
          r.leave && t.removeEventListener(r.leave, d),
          r.touchstart && t.removeEventListener(r.touchstart, d);
      };
    this.config.enablePan &&
      (t.addEventListener(r.move, h),
      t.addEventListener(r.up, d),
      r.leave && t.addEventListener(r.leave, d),
      r.touchstart && t.addEventListener(r.touchstart, d));
  }),
  (OrgChart.prototype._changeCursorOnPanStart = function (t, e, r) {
    var i = this.getPointerElement(),
      a = OrgChart._getOffsetXY(this.element, r),
      n = a.x / e + t[0] - 16 / e,
      o = a.y / e + t[1] - 16 / e;
    (i.style.display = "inherit"),
      i.setAttribute("transform", "matrix(0,0,0,0," + n + "," + o + ")"),
      OrgChart.animate(
        i,
        { transform: [0, 0, 0, 0, n, o], opacity: 0 },
        { transform: [1 / e, 0, 0, 1 / e, n, o], opacity: 1 },
        300,
        OrgChart.anim.outBack
      );
  }),
  (OrgChart.prototype._changeCursorOnPanEnd = function () {
    this.getPointerElement().style.display = "none";
  }),
  (OrgChart.searchUI = function () {
    (this.lastSearch = []),
      (this._searchAfterEnterPress = !1),
      (this._event_id = OrgChart._guid()),
      (this.instance = null);
  }),
  (OrgChart.searchUI.prototype.init = function (t) {
    (this.instance = t), (this.obj = this.instance), this._initSearchFields();
    var e = this,
      r = this.instance.config.padding - 10,
      i = this.instance.config.padding - 10,
      a = this.instance.getMenuButton();
    if (a) {
      var n = a.getBoundingClientRect(),
        o = this.instance.getSvg().getBoundingClientRect();
      (r = o.right - n.left + 10), (i = n.top - o.top - 10);
    }
    var l = document.createElement("div");
    l.classList.add("boc-search"),
      (l.style.right = r + "px"),
      (l.style.top = i + "px");
    var s = OrgChart.elements.textbox(
      {},
      { label: OrgChart.SEARCH_PLACEHOLDER, btn: "X" },
      "320px"
    );
    (l.innerHTML += s.html),
      (this.xBtn = l.querySelector("[data-input-btn]")),
      (this.xBtn.style.display = "none"),
      (this.searchTableWrapper = document.createElement("div")),
      l.appendChild(this.searchTableWrapper);
    var h = this.instance.getSvg().nextSibling;
    this.instance.element.insertBefore(l, h),
      OrgChart.input.init(l),
      (this.input = document.getElementById(s.id)),
      this.xBtn.addEventListener("click", function (t) {
        t.preventDefault(), e.hide();
      }),
      this.input.addEventListener("keypress", function (t) {
        "Enter" == t.key && t.preventDefault();
      }),
      this.input.addEventListener("focus", function (t) {
        (e.xBtn.style.display = ""), e._search();
      }),
      this.input.addEventListener("blur", function (t) {
        OrgChart.isNEU(e.input.value) &&
          OrgChart.SEARCH_HELP_SYMBOL != e.input.value &&
          (e.xBtn.style.display = "none");
      }),
      this.input.addEventListener("keydown", function (t) {
        ("ArrowDown" == t.key || "ArrowUp" == t.key) && t.preventDefault();
      }),
      this.input.addEventListener("keyup", function (t) {
        "ArrowDown" == t.key
          ? d()
          : "ArrowUp" == t.key
          ? c()
          : "Enter" == t.key
          ? e._enterHandler()
          : "Escape" == t.key
          ? e.hide()
          : e._search();
      });
    var d = function () {
        var t = e.instance.element.querySelectorAll("[data-search-item-id]"),
          r = e.instance.element.querySelector('[data-selected="yes"]');
        null == r && t.length > 0
          ? t[0].setAttribute("data-selected", "yes")
          : t.length > 0 &&
            r.nextSibling &&
            r.nextSibling.setAttribute &&
            (r.removeAttribute("data-selected"),
            r.nextSibling.setAttribute("data-selected", "yes"));
      },
      c = function () {
        var t = e.instance.element.querySelectorAll("[data-search-item-id]"),
          r = e.instance.element.querySelector('[data-selected="yes"]');
        null == r && t.length > 0
          ? t[t.length - 1].setAttribute("data-selected", "yes")
          : t.length > 0 &&
            r.previousSibling &&
            r.previousSibling.setAttribute &&
            (r.removeAttribute("data-selected"),
            r.previousSibling.setAttribute("data-selected", "yes"));
      };
  }),
  (OrgChart.searchUI.prototype._enterHandler = function () {
    var t = this.instance.element.querySelector('[data-selected="yes"]');
    if (t) {
      if (t.hasAttribute("data-search-item-id")) {
        var e = t.getAttribute("data-search-item-id");
        if (this.input.value != OrgChart.SEARCH_HELP_SYMBOL) {
          var r = OrgChart.events.publish("", [this.instance, e]),
            i = OrgChart.events.publish("searchclick", [this, { nodeId: e }]);
          !1 === r && (i = !1), 0 != i && this.instance.center(e);
        } else
          (this.input.value = e + " "),
            (this.searchTableWrapper.innerHTML = "");
      }
    } else
      (this._searchAfterEnterPress = !0),
        this.__search(),
        (this.searchTableWrapper.innerHTML = ""),
        this.instance.draw();
  }),
  (OrgChart.searchUI.prototype._initSearchFields = function () {
    if (null == this.instance.config.searchFields) {
      this._searchFields = [];
      for (var t = 0; t < this.instance.response.allFields.length; t++) {
        var e = this.instance.response.allFields[t];
        "tags" == e ||
          OrgChart._fieldIsImg(this.instance.config, e) ||
          (-1 == this._searchFields.indexOf(e) && this._searchFields.push(e));
      }
    } else this._searchFields = this.instance.config.searchFields;
    if (null == this.instance.config.searchFieldsAbbreviation) {
      this.searchFieldsAbbreviation = {};
      for (t = 0; t < this._searchFields.length; t++) {
        for (
          var r = this._searchFields[t],
            i = 0,
            a = r.slice(0, i + 1).toLowerCase();
          this.searchFieldsAbbreviation[a];

        )
          i++, (a = r.slice(0, i + 1).toLowerCase());
        this.searchFieldsAbbreviation[a] = r;
      }
    } else
      this.searchFieldsAbbreviation =
        this.instance.config.searchFieldsAbbreviation;
    this._searchFieldsAbbreviation = this.searchFieldsAbbreviation;
  }),
  (OrgChart.searchUI.prototype.find = function (t) {
    this.input &&
      ((this.input.value = t),
      document.activeElement == this.input
        ? this._search(t)
        : this.input.focus());
  }),
  (OrgChart.searchUI.prototype.addMatchTag = function (t) {
    if (this._searchAfterEnterPress) {
      for (var e = 0; e < this.lastSearch.length; e++)
        if (this.lastSearch[e].id == t) return !0;
      return !1;
    }
    return null;
  }),
  (OrgChart.searchUI.prototype.__search = function () {
    this.lastSearch = OrgChart._search.search(
      this.instance.config.nodes,
      this.input.value,
      this._searchFields,
      this._searchFields,
      this.instance.config.searchDisplayField,
      this.instance.config.searchFieldsWeight,
      this.searchFieldsAbbreviation
    );
  }),
  (OrgChart.searchUI.prototype._search = function () {
    var t,
      e = this;
    if (
      ((this._searchAfterEnterPress = !1),
      this.input.value == OrgChart.SEARCH_HELP_SYMBOL)
    )
      t = this.helpView();
    else {
      this.__search();
      var r = OrgChart._getFistImgField(this.instance.config);
      t = `<table border="0" cellspacing="0" cellpadding="0">\n                        <tbody>\n                            ${(function () {
        for (
          var t = "", i = 0;
          i < e.lastSearch.length && !(i >= OrgChart.SEARCH_RESULT_LIMIT);
          i++
        ) {
          var a = e.lastSearch[i],
            n = "";
          if (r) {
            var o = e.instance._get(a.id);
            "function" == typeof r
              ? (n = r(e.instance, e.instance.getNode(a.id), o))
              : o[r] && (n = o[r]);
          }
          var l = "",
            s = "";
          e.instance.config.searchDisplayField == a.__searchField
            ? (l = a.__searchMarks)
            : e.instance.config.searchDisplayField
            ? ((l = a[e.instance.config.searchDisplayField]),
              OrgChart.isNEU(l) && (l = ""),
              (s = a.__searchMarks))
            : (l = a.__searchMarks);
          var h = {
            img: n,
            nodeId: a.id,
            first: l,
            second: s,
            searchItem: a,
            html: OrgChart.searchUI.createItem(n, a.id, l, s),
          };
          OrgChart.events.publish("add-item", [e, h]), (t += h.html);
        }
        return t;
      })()}  \n                        </tbody>\n                    </table>`;
    }
    this.searchTableWrapper.innerHTML = t;
    for (
      var i = this.instance.element.querySelectorAll("[data-search-item-id]"),
        a = 0;
      a < i.length;
      a++
    )
      i[a].addEventListener("click", function () {
        if (this.hasAttribute("data-search-item-id")) {
          var t = this.getAttribute("data-search-item-id");
          if (e.input.value != OrgChart.SEARCH_HELP_SYMBOL) {
            var r = OrgChart.events.publish("searchclick", [e.instance, t]),
              i = OrgChart.events.publish("searchclick", [e, { nodeId: t }]);
            if ((!1 === r && (i = !1), !1 !== i)) {
              e.instance.center(this.getAttribute("data-search-item-id"));
              var a = e.instance.element.querySelector('[data-selected="yes"]');
              a && a.removeAttribute("data-selected"),
                this.setAttribute("data-selected", "yes"),
                e.input.focus();
            }
          } else
            (e.input.value = t + " "),
              (e.searchTableWrapper.innerHTML = ""),
              e.input.focus();
        }
      });
    OrgChart.events.publish("show-items", [this, {}]);
  }),
  (OrgChart.searchUI.prototype.helpView = function () {
    var t = '<table border="0" cellspacing="0" cellpadding="0">';
    for (var e in this.searchFieldsAbbreviation)
      t += `<tr data-search-item-id="${e}" style="height: 50px;"><td class="boc-search-image-td" style="text-align: center;">${e}</td><td class="boc-search-text-td">${this.searchFieldsAbbreviation[e]}</td></tr>`;
    return (t += "</table>");
  }),
  (OrgChart.searchUI.createItem = function (t, e, r, i) {
    return (
      r && (r = "<b>" + r + "</b>"),
      `<tr data-search-item-id="${e}">\n                <td class="boc-search-image-td">\n                    ${(t =
        t
          ? `<div class="boc-search-photo" style="background-image: url(${t})"></div>`
          : `<div class="boc-search-photo">${OrgChart.icon.user(
              32,
              32,
              "#aeaeae"
            )}</div>`)}\n                </td>\n                <td class="boc-search-text-td">${r} <br/>${i}</td>\n            </tr>`
    );
  }),
  (OrgChart.searchUI.prototype.hide = function () {
    if (!1 === OrgChart.events.publish("hide", [this])) return !1;
    this._searchAfterEnterPress &&
      ((this._searchAfterEnterPress = !1), this.instance.draw()),
      (this.lastSearch = []),
      this.xBtn && (this.xBtn.style.display = "none"),
      this.searchTableWrapper && (this.searchTableWrapper.innerHTML = ""),
      this.input &&
        ((this.input.value = ""),
        document.activeElement == this.input && this.input.blur(),
        document.activeElement == this.xBtn &&
          OrgChart.input.blurHandler(this.input));
  }),
  (OrgChart.searchUI.prototype.on = function (t, e) {
    return OrgChart.events.on(t, e, this._event_id), this;
  }),
  void 0 === OrgChart && (OrgChart = {}),
  (OrgChart.manager = function (t) {
    (this.config = t.config),
      (this.layoutConfigs = t._layoutConfigs),
      (this.visibleNodeIds = []),
      (this.viewBox = null),
      (this.action = null),
      (this.actionParams = null),
      (this.nodes = {}),
      (this.oldNodes = {}),
      (this.maxX = null),
      (this.maxY = null),
      (this.minX = null),
      (this.minY = null),
      (this.bordersByRootIdAndLevel = null),
      (this.roots = null),
      (this.state = null),
      (this.vbIsInitializedFromState = !1),
      (this.rootList = []),
      (this.instance = t),
      (this._fixAdjustForExport = { x: 0, y: 0 });
  }),
  (OrgChart.manager.prototype.read = function (t, e, r, i, a, n, o, l) {
    var s = this;
    OrgChart.state._get(this.config.state, e, r, function (h) {
      (s.state = h),
        (s.action = a),
        (s.actionParams = n),
        a != OrgChart.action.init ||
        !s.state ||
        (n && n.method && "fit" == n.method)
          ? ((s.viewBox = i), (s.vbIsInitializedFromState = !1))
          : ((s.viewBox = s.state.vb),
            (s.vbIsInitializedFromState = !0),
            Array.isArray(s.state.roots) && (s.config.roots = s.state.roots));
      var d = s.maxX,
        c = s.maxY,
        g = s.minX,
        p = s.minY,
        u = s.bordersByRootIdAndLevel,
        f = s.roots,
        m = s.nodes;
      if (t) {
        var C = OrgChart.manager._getResponse(
          e,
          r,
          s.visibleNodeIds,
          s.config,
          d,
          c,
          g,
          p,
          s.viewBox,
          f,
          s.action,
          s.actionParams,
          m,
          s.oldNodes,
          s.vbIsInitializedFromState
        );
        a != OrgChart.action.exporting &&
          ((s.maxX = d),
          (s.maxY = c),
          (s.minX = g),
          (s.minY = p),
          (s.roots = f),
          (s.nodes = m),
          (s.visibleNodeIds = C.visibleNodeIds)),
          (C.bordersByRootIdAndLevel = u),
          (C.roots = f),
          (C.adjustify = { x: 0, y: 0 }),
          s.state && (C.adjustify = s.state.adjustify),
          o(C);
      } else
        (s.oldNodes = m || null),
          s._read(function (t) {
            (d = t.maxX),
              (c = t.maxY),
              (g = t.minX),
              (p = t.minY),
              (u = t.bordersByRootIdAndLevel),
              (f = t.roots),
              (m = t.nodes);
            var i = OrgChart.manager._getResponse(
              e,
              r,
              s.visibleNodeIds,
              s.config,
              d,
              c,
              g,
              p,
              s.viewBox,
              f,
              s.action,
              s.actionParams,
              m,
              s.oldNodes,
              s.vbIsInitializedFromState
            );
            (i.notif = t.limit),
              (i.roots = f),
              (i.bordersByRootIdAndLevel = u),
              (i.adjustify = t.adjustify),
              a != OrgChart.action.exporting &&
                ((s.maxX = d),
                (s.maxY = c),
                (s.minX = g),
                (s.minY = p),
                (s.roots = f),
                (s.nodes = m),
                (s.visibleNodeIds = i.visibleNodeIds),
                (s.bordersByRootIdAndLevel = u),
                (s.rootList = t.rootList)),
              o(i);
          }, l);
    });
  }),
  (OrgChart.manager.prototype._read = function (t, e) {
    var r = this,
      i = OrgChart.manager._createNodes(this.instance);
    e(i);
    var a = i.nodes,
      n = i.roots,
      o = OrgChart.remote;
    null == o && (o = OrgChart.local),
      o._setPositions(
        n,
        r.layoutConfigs,
        function (e) {
          var o = OrgChart.manager._doNotChangePositionOfClickedNodeIfAny(
            n,
            a,
            r.action,
            r.actionParams,
            r.oldNodes,
            r.config.orientation
          );
          r.state &&
            r.action == OrgChart.action.init &&
            (o = r.state.adjustify),
            r.action == OrgChart.action.exporting
              ? (o = r._fixAdjustForExport)
              : (r._fixAdjustForExport = o);
          for (
            var l = { minX: null, minY: null, maxX: null, maxY: null },
              s = {},
              h = 0;
            h < n.length;
            h++
          )
            OrgChart.manager._setMinMaxXYAdjustifyIterate(
              n[h],
              n[h],
              l,
              0,
              s,
              o,
              r.config.orientation
            );
          t({
            minX: l.minX,
            minY: l.minY,
            maxX: l.maxX,
            maxY: l.maxY,
            bordersByRootIdAndLevel: s,
            nodes: a,
            roots: n,
            rootList: i.rootList,
            limit: e,
            adjustify: o,
          });
        },
        a
      );
  }),
  void 0 === OrgChart && (OrgChart = {}),
  (OrgChart.manager._initDinamicNode = function (t, e, r) {
    e && (t.lcn = e), r && (t.isAssistant = !0);
    var i = OrgChart.t(t.templateName);
    (t.w = i && i.size ? i.size[0] : 0),
      (t.h = i && i.size ? i.size[1] : 0),
      (t.isSplit = "split" == t.templateName),
      (t.isMirror = "mirror" == t.templateName),
      (t.isSubLevel = "subLevel" == t.templateName);
  }),
  (OrgChart.manager._setCollpasedProperty = function (t, e, r, i, a, n, o) {
    null == t.collapsed && e.collapse && e.collapse.allChildren
      ? (t.collapsed = !0)
      : null == t.collapsed && (t.collapsed = !1),
      a == OrgChart.action.expand &&
        -1 != r.ids.indexOf(t.id) &&
        (t.collapsed = !1),
      a == OrgChart.action.collapse && (r.expandIds || r.collapseIds)
        ? r.expandIds && -1 != r.expandIds.indexOf(t.id)
          ? (t.collapsed = !1)
          : r.collapseIds &&
            -1 != r.collapseIds.indexOf(t.id) &&
            (t.collapsed = !0)
        : a == OrgChart.action.collapse &&
          -1 != r.ids.indexOf(t.id) &&
          (t.collapsed = !0),
      a == OrgChart.action.expand && "all" == r.ids && (t.collapsed = !1),
      a == OrgChart.action.exporting && r.expandChildren && (t.collapsed = !1),
      a == OrgChart.action.init && null != o
        ? (t.collapsed = !o.exp.has(t.id))
        : a == OrgChart.action.init
        ? (t.collapsed =
            e.collapse && n >= e.collapse.level - 1 && -1 == i.indexOf(t.id))
        : a == OrgChart.action.centerNode ||
          a == OrgChart.action.insert ||
          a == OrgChart.action.expand ||
          a == OrgChart.action.collapse
        ? i.has(t.id) && (t.collapsed = !1)
        : a == OrgChart.action.update &&
          r &&
          r.changeRoots &&
          r.changeRoots.has(t.id) &&
          (t.collapsed = !1);
  }),
  (OrgChart.manager._initNode = function (t, e, r, i, a, n, o) {
    var l = o.manager.config,
      s = o.manager.layoutConfigs,
      h = o.manager.action,
      d = o.manager.actionParams,
      c = o.manager.state,
      g = s[r || "base"];
    null == t.parent &&
      OrgChart.manager._setCollpasedProperty(t, g, d, a, h, i - 1, c);
    for (var p = 0; p < t.childrenIds.length; p++) {
      var u = e[t.childrenIds[p]];
      if (
        (OrgChart.manager._setCollpasedProperty(u, g, d, a, h, i, c),
        !u.collapsed)
      ) {
        if (((u.parent = t), null != u.ppid)) {
          var f = e[u.ppid];
          f && (u.parentPartner = f);
        }
        (-1 != u.tags.indexOf("left-partner") ||
          -1 != u.tags.indexOf("right-partner") ||
          -1 != u.tags.indexOf("partner") ||
          u.parentPartner) &&
          -1 == n.indexOf(t.id) &&
          n.push(t.id),
          t.children.push(u);
      }
    }
    if (
      (h != OrgChart.action.minimize || t.min
        ? h == OrgChart.action.maximize && !0 === t.min
          ? (d.all || d.id == t.id) && (t.min = !1)
          : h == OrgChart.action.exporting && !1 === d.min
          ? (t.min = !1)
          : h == OrgChart.action.init && null != c && (t.min = c.min.has(t.id))
        : (d.all || d.id == t.id) && (t.min = !0),
      !t.min)
    )
      for (p = 0; p < t.stChildrenIds.length; p++) {
        u = e[t.stChildrenIds[p]];
        (t.tags && t.tags.has("filter")) ||
          ((u.stParent = t), t.stChildren.push(u));
      }
    null != i && (t.level = i), r && (t.lcn = r);
    var m = OrgChart._getSubLevels(t.tags, l.tags);
    m > 0 && (t.subLevels = m),
      -1 != t.tags.indexOf("assistant") &&
        null != t.parent &&
        (t.isAssistant = !0);
    var C = OrgChart.t(t.templateName, t.min);
    (t.w = C && C.size ? C.size[0] : 0),
      (t.h = C && C.size ? C.size[1] : 0),
      (t.padding = C && C.padding ? C.padding : [0, 0, 0, 0]);
    var O = { node: t };
    OrgChart.events.publish("node-initialized", [o, O]),
      OrgChart.events.publish("node-created", [t]);
  }),
  (OrgChart.manager._iterate = function (t, e, r, i, a, n, o, l, s, h, d, c) {
    var g = c.manager.layoutConfigs;
    if (
      (OrgChart.manager._initNode(e, r, s, i, h, d, c),
      e.isAssistant && (n[e.pid] || (n[e.pid] = []), n[e.pid].push(e.id)),
      e.subLevels > 0 && o.push(e.id),
      OrgChart.MIXED_LAYOUT_FOR_NODES_WITH_COLLAPSED_CHILDREN &&
        !e.isAssistant &&
        e.parent)
    ) {
      if (
        e.parent &&
        e.parent.children.length &&
        e.parent.children[e.parent.children.length - 1] == e
      ) {
        for (
          var p = [], u = 0, f = 0, m = 0;
          m < e.parent.children.length;
          m++
        ) {
          -1 == (C = e.parent.children[m]).tags.indexOf("partner") &&
          -1 == C.tags.indexOf("left-partner") &&
          -1 == C.tags.indexOf("right-partner") &&
          -1 == C.tags.indexOf("assistant") &&
          0 == C.children.length
            ? p.push(C.id)
            : -1 != C.tags.indexOf("assistant")
            ? u++
            : (-1 == C.tags.indexOf("partner") &&
                -1 == C.tags.indexOf("left-partner") &&
                -1 == C.tags.indexOf("right-partner")) ||
              f++;
        }
        ((OrgChart.MIXED_LAYOUT_ALL_NODES &&
          p.length > 1 &&
          p.length == e.parent.children.length - u - f) ||
          (!OrgChart.MIXED_LAYOUT_ALL_NODES && p.length > 1)) &&
          (l[e.pid] = p);
      }
    } else if (
      !e.isAssistant &&
      0 == e.childrenIds.length &&
      e.parent &&
      !l[e.pid]
    ) {
      for (p = [], u = 0, f = 0, m = 0; m < e.parent.children.length; m++) {
        var C;
        -1 == (C = e.parent.children[m]).tags.indexOf("partner") &&
        -1 == C.tags.indexOf("left-partner") &&
        -1 == C.tags.indexOf("right-partner") &&
        -1 == C.tags.indexOf("assistant") &&
        0 == C.childrenIds.length
          ? p.push(C.id)
          : -1 != C.tags.indexOf("assistant")
          ? u++
          : (-1 == C.tags.indexOf("partner") &&
              -1 == C.tags.indexOf("left-partner") &&
              -1 == C.tags.indexOf("right-partner")) ||
            f++;
      }
      ((OrgChart.MIXED_LAYOUT_ALL_NODES &&
        p.length > OrgChart.MIXED_LAYOUT_IF_NUMBER_OF_CHILDREN_IS_MORE_THEN &&
        p.length == e.parent.childrenIds.length - u - f) ||
        (!OrgChart.MIXED_LAYOUT_ALL_NODES &&
          p.length >
            OrgChart.MIXED_LAYOUT_IF_NUMBER_OF_CHILDREN_IS_MORE_THEN)) &&
        (l[e.pid] = p);
    }
    e.stChildren.length &&
      (t.stContainerNodes || (t.stContainerNodes = []),
      t.stContainerNodes.push(e));
    for (var O = 0; O < e.stChildren.length; O++) {
      var b = "";
      for (m = 0; m < e.tags.length; m++)
        if (g[e.tags[m]]) {
          b = e.tags[m];
          break;
        }
      a.push(e.stChildren[O].id),
        OrgChart.manager._iterate(
          t,
          e.stChildren[O],
          r,
          0,
          a,
          n,
          o,
          l,
          b,
          h,
          d,
          c
        );
    }
    i++;
    for (O = 0; O < e.children.length; O++)
      OrgChart.manager._iterate(t, e.children[O], r, i, a, n, o, l, s, h, d, c);
  }),
  (OrgChart.manager.__createNodes = function (t, e, r, i, a, n, o, l) {
    for (
      var s = [], h = OrgChart._addDottedLines(r), d = 0;
      d < h.length;
      d++
    ) {
      var c,
        g = h[d];
      (c = OrgChart.STRING_TAGS
        ? g.tags
          ? g.tags.split(",")
          : []
        : Array.isArray(g.tags)
        ? g.tags.slice(0)
        : []),
        l.filterUI.addFilterTag(g) && c.unshift("filter");
      var p = l.searchUI.addMatchTag(g.id);
      !0 === p ? c.unshift("match") : !1 === p && c.unshift("no-match");
      var u = OrgChart._getTemplate(c, r.tags, r.template),
        f = new OrgChart.node(g.id, g.pid, c, u);
      OrgChart.isNEU(g.ppid) || (f.ppid = g.ppid),
        OrgChart.isNEU(g.stpid) || (f.stpid = g.stpid),
        null != r.orderBy &&
          (f.order = OrgChart.manager._getOrderFieldValue(g, r.orderBy)),
        null != g.movex && (f.movex = g.movex),
        null != g.movey && (f.movey = g.movey),
        (t[g.id] = f),
        s.push(g.id);
    }
    null != r.orderBy &&
      s.sort(function (e, i) {
        var a = t[e].order,
          n = t[i].order;
        return "number" == typeof a || "number" == typeof n
          ? (null == a && (a = -1),
            null == n && (n = -1),
            r.orderBy.desc ? n - a : a - n)
          : "string" == typeof a || "string" == typeof n
          ? (null == a && (a = ""),
            null == n && (n = ""),
            r.orderBy.desc ? n.localeCompare(a) : a.localeCompare(n))
          : void 0;
      });
    for (d = 0; d < s.length; d++) {
      var m = s[d],
        C = ((f = t[m]), n ? n[m] : null),
        O = t[f.stpid],
        b = t[f.pid];
      if ((O || (f.stpid = null), b || (f.pid = null), O)) {
        var v = n ? n[O.id] : null;
        v && (O.min = v.min), O.stChildrenIds.push(f.id);
      } else
        b
          ? (C && ((f.collapsed = C.collapsed), (f.min = C.min)),
            b.childrenIds.push(f.id))
          : (C && ((f.collapsed = C.collapsed), (f.min = C.min)),
            e.push(f),
            o.push(f.id));
      i == OrgChart.action.init && (f.min = OrgChart._getMin(f, r));
    }
  }),
  (OrgChart.manager._createNodes = function (t) {
    var e = t.manager.config,
      r = t.manager.layoutConfigs,
      i = t.manager.action,
      a = t.manager.actionParams,
      n = t.manager.oldNodes,
      o = t.manager.state,
      l = {},
      s = [],
      h = [];
    if (
      (OrgChart.manager.__createNodes(l, s, e, i, a, n, h, t), null != e.roots)
    ) {
      s = [];
      for (var d = 0; d < e.roots.length; d++) {
        var c = l[e.roots[d]];
        if (c && i == OrgChart.action.centerNode) {
          for (var g = c; null != g.pid || null != g.stpid; )
            g = null == g.pid && null != g.stpid ? l[g.stpid] : l[g.pid];
          for (var p = l[a.id]; (null != p.pid || null != p.stpid) && p != c; )
            p = null == p.pid && null != p.stpid ? l[p.stpid] : l[p.pid];
          g == p && (c = g);
        }
        if (c) {
          for (var u = !1, f = 0; f < s.length; f++)
            if (s[f].id == c.id) {
              u = !0;
              break;
            }
          if (!u) {
            if (!OrgChart.isNEU(c.pid))
              (ft = (O = l[c.pid]).childrenIds.indexOf(c.id)) > -1 &&
                O.childrenIds.splice(ft, 1);
            s.push(c);
          }
        }
      }
      e.roots = [];
      for (d = 0; d < s.length; d++) e.roots.push(s[d].id);
    }
    i == OrgChart.action.exporting &&
      null != a.id &&
      (C = l[a.id]) &&
      ((C.pid = null), (s = [C]));
    var m = [];
    if (i == OrgChart.action.init && e.expand && e.expand.nodes && null == o)
      for (d = 0; d < e.expand.nodes.length; d++) {
        var C = l[e.expand.nodes[d]];
        for (
          !0 === e.expand.allChildren &&
          OrgChart.manager._addExpandedNodeIdsIterate(C, l, m);
          C;

        )
          m.push(C.id),
            null == C.pid && null != C.stpid
              ? ((C = l[C.stpid]).min = !1)
              : (C = l[C.pid]);
      }
    else if (
      (i == OrgChart.action.expand && a.ids && "all" != a.ids) ||
      (i == OrgChart.action.collapse && a && a.expandIds)
    ) {
      it = i == OrgChart.action.expand ? a.ids : a.expandIds;
      for (d = 0; d < it.length; d++)
        for (var O = l[(C = l[it[d]]).pid]; O; )
          m.push(O.id),
            null == O.pid && null != O.stpid
              ? ((O = l[O.stpid]).min = !1)
              : (O = l[O.pid]);
    } else if (i == OrgChart.action.centerNode) {
      for (var b = l[a.id]; b; ) {
        if (
          (m.push(b.id),
          a.options.parentState === OrgChart.COLLAPSE_PARENT_NEIGHBORS && b)
        )
          for (d = 0; d < b.childrenIds.length; d++) {
            (H = l[b.childrenIds[d]]).collapsed = !0;
          }
        null == b.pid && null != b.stpid
          ? ((b = l[b.stpid]).min = !1)
          : (b = l[b.pid]);
      }
      b = l[a.id];
      if (a.options.childrenState === OrgChart.COLLAPSE_SUB_CHILDRENS)
        for (d = 0; d < b.childrenIds.length; d++) {
          (y = l[b.childrenIds[d]]).collapsed = !1;
          for (var v = 0; v < y.childrenIds.length; v++) {
            l[y.childrenIds[v]].collapsed = !0;
          }
        }
      if (
        a.options.parentState ===
        OrgChart.COLLAPSE_PARENT_SUB_CHILDREN_EXCEPT_CLICKED
      )
        if ((O = l[b.pid]))
          for (d = 0; d < O.childrenIds.length; d++) {
            var y;
            if ((y = l[O.childrenIds[d]]) != b) {
              y.collapsed = !1;
              for (v = 0; v < y.childrenIds.length; v++) {
                l[y.childrenIds[v]].collapsed = !0;
              }
            }
          }
    } else if (i == OrgChart.action.insert)
      for (C = l[a.insertedNodeId]; C; )
        m.push(C.id),
          null == C.pid && null != C.stpid
            ? ((C = l[C.stpid]).min = !1)
            : (C = l[C.pid]);
    var x = [],
      _ = {},
      w = [],
      k = {},
      S = [];
    for (d = 0; d < s.length; d++)
      OrgChart.manager._iterate(s[d], s[d], l, 0, x, _, w, k, "", m, S, t);
    if (
      i == OrgChart.action.collapse &&
      a &&
      Array.isArray(a.expandIds) &&
      Array.isArray(a.collapseIds)
    )
      for (d = 0; d < a.ids.length; d++) {
        if (a.expandIds.has(a.collapseIds[d]))
          console.error(
            `id ${a.collapseIds[d]} exist in both collapseIds and expandIds`
          );
        else (C = l[a.collapseIds[d]]) && (C.collapsed = !0);
      }
    for (d = s.length - 1; d >= 0; d--) s[d].collapsed && s.splice(d, 1);
    for (d = 0; d < S.length; d++) {
      C = l[S[d]];
      var I = [],
        A = [],
        L = [],
        N = {},
        E = 0,
        M = 0,
        T = 0,
        B = [],
        U = [];
      for (v = 0; v < C.children.length; v++) {
        (H = C.children[v]).isAssistant
          ? I.push(H.id)
          : -1 != H.tags.indexOf("right-partner")
          ? ((H.isPartner = 1), (H.children = []), A.push(H.id))
          : -1 != H.tags.indexOf("left-partner")
          ? ((H.isPartner = 2), (H.children = []), L.push(H.id))
          : -1 == H.tags.indexOf("partner") || E % 2
          ? -1 != H.tags.indexOf("partner") && E % 2
            ? ((H.isPartner = 2), (H.children = []), L.push(H.id), E++)
            : H.parentPartner
            ? (N[H.parentPartner.id] || (N[H.parentPartner.id] = []),
              N[H.parentPartner.id].push(H.id))
            : I.push(H.id)
          : ((H.isPartner = 1), (H.children = []), A.push(H.id), E++);
      }
      C.children = [];
      var R = [];
      for (v = 0; v < A.length; v++) {
        N[(H = l[A[v]]).id] ? C.children.push(H) : C.children.splice(0, 0, H);
        for (var P = 0; P < H.childrenIds.length; P++) R.push(H.childrenIds[P]);
      }
      var F = [];
      for (v = 0; v < L.length; v++) {
        N[(H = l[L[v]]).id] ? C.children.push(H) : C.children.splice(0, 0, H);
        for (P = 0; P < H.childrenIds.length; P++) F.push(H.childrenIds[P]);
      }
      for (v = 0; v < F.length; v++) {
        (H = l[F[v]]).collapsed ||
          ((H.parentPartner = H.parent),
          (H.parent = C),
          (H.isChildOfPartner = !0),
          C.children.push(H));
      }
      for (v = L.length - 1; v >= 0; v--)
        if (N[L[v]])
          for (f = 0; f < N[L[v]].length; f++)
            C.children.push(l[N[L[v]][f]]),
              M++,
              -1 == U.indexOf(L[v]) && U.push(L[v]);
      for (v = 0; v < I.length; v++) {
        var H = l[I[v]];
        C.children.push(H);
      }
      for (v = 0; v < A.length; v++)
        if (N[A[v]])
          for (f = 0; f < N[A[v]].length; f++)
            C.children.push(l[N[A[v]][f]]),
              T++,
              -1 == B.indexOf(A[v]) && B.push(A[v]);
      for (v = 0; v < R.length; v++) {
        (H = l[R[v]]).collapsed ||
          ((H.parentPartner = H.parent),
          (H.parent = C),
          (H.isChildOfPartner = !0),
          C.children.push(H));
      }
      (C.partnerSeparation =
        Math.max(U.length, B.length) * e.partnerChildrenSplitSeparation +
        e.minPartnerSeparation),
        I.length || !M || T
          ? I.length || M || !T
            ? I.length || 1 != M || 1 != T
              ? I.length || M || T
                ? !I.length || M || T
                  ? I.length && (M || T)
                    ? (C.hasPartners = 7)
                    : (C.hasPartners = 1)
                  : (C.hasPartners = 6)
                : (C.hasPartners = 5)
              : (C.hasPartners = 4)
            : (C.hasPartners = 3)
          : (C.hasPartners = 2);
    }
    for (d = 0; d < w.length; d++) {
      var D = r[(C = l[w[d]]).lcn ? C.lcn : "base"];
      for (v = 0; v < C.subLevels; v++) {
        var z = new OrgChart.node(
          C.id + "_sub_level_index_" + v,
          C.pid,
          [],
          "subLevel"
        );
        if ((OrgChart.manager._initDinamicNode(z, C.lcn), (O = C.parent)))
          (ft = O.children.indexOf(C)) > -1 &&
            (O.children.splice(ft, 1), O.children.splice(ft, 0, z)),
            z.children.push(C),
            (z.parent = O),
            (C.parent = z),
            (l[z.id] = z);
      }
    }
    for (var j in _) {
      (O = l[j]).hasAssistants = !0;
      z = new OrgChart.node(
        O.id + "_split_assitant_0",
        O.id,
        ["assistant"],
        "split"
      );
      OrgChart.manager._initDinamicNode(z, O.lcn, !0), (l[z.id] = z);
      var Y = [];
      for (v = O.children.length - 1; v >= 0; v--) {
        (H = O.children[v]).isAssistant
          ? ((H.parent = null), O.children.splice(v, 1), Y.splice(0, 0, H.id))
          : H.isPartner ||
            (H.parent &&
              k[H.parent.id] &&
              z &&
              H.parent.id != z.id &&
              (Object.defineProperty(
                k,
                z.id,
                Object.getOwnPropertyDescriptor(k, H.parent.id)
              ),
              delete k[H.parent.id]),
            (H.parent = z),
            z.children.unshift(H),
            O.children.splice(v, 1));
      }
      if (Y.length % 2) {
        var q = l[Y[Y.length - 1]],
          $ = new OrgChart.node(q.id + "_mirror", O.pid, [], "mirror");
        OrgChart.manager._initDinamicNode($, q.lcn, !0),
          ($.isAssistant = !0),
          ($.w = q.w),
          ($.h = q.h),
          (l[$.id] = $),
          Y.splice(Y.length - 1, 0, $.id);
      }
      var X = 1;
      for (v = Y.length - 1; v >= 0; v--)
        if (v % 2 && v != Y.length - 1) {
          var V = new OrgChart.node(
            O.id + "_split_assitant_" + X,
            O.pid,
            [],
            "split"
          );
          OrgChart.manager._initDinamicNode(V, O.lcn, !0),
            (l[V.id] = V),
            Y.splice(v, 0, V.id),
            X++;
        } else v % 2 && Y.splice(v, 0, z.id);
      for (v = 0; v < Y.length; v += 3) {
        var G = null;
        G = 0 == v ? O : l[Y[v - 2]];
        var W = l[Y[v]],
          J = l[Y[v + 1]],
          K = l[Y[v + 2]];
        (W.parent = G),
          (J.parent = G),
          (K.parent = G),
          G.children.push(W),
          G.children.push(J),
          G.children.push(K);
      }
    }
    var Z = !1;
    for (var Q in r) {
      if (0 != (D = r[Q]).layout) {
        Z = !0;
        break;
      }
    }
    var tt = OrgChart.events.has("node-layout", t._event_id);
    if (Z || tt) {
      var et = { nodes: l, config: e, action: i, actionParams: a };
      if (w.length) {
        var rt = !1;
        for (var j in k) {
          var it = k[j];
          for (d = 0; d < it.length; d++) {
            if ((C = l[it[d]]).subLevels) {
              rt = !0;
              break;
            }
          }
          if (rt) break;
        }
        if (rt) {
          var at = {},
            nt = {},
            ot = {};
          for (var j in k) {
            it = k[j];
            var lt = !1,
              st = null;
            for (d = 0; d < it.length; d++) {
              var ht = it[d];
              (null === st || w.has(ht)) &&
                ((st = l[ht].parent.id),
                lt ||
                  OrgChart.isNEU(l[ht].subLevels) ||
                  (lt = l[ht].subLevels > 0)),
                at[st] || (at[st] = []),
                at[st].push(ht),
                lt && ((ot[st] = j), nt[st] || (nt[st] = []), nt[st].push(ht));
            }
          }
          for (var j in ((k = {}), nt))
            if (
              nt[j].length >
              OrgChart.MIXED_LAYOUT_IF_NUMBER_OF_CHILDREN_IS_MORE_THEN
            ) {
              var dt = ot[j];
              for (d = l[dt].children.length - 1; d >= 0; d--) {
                H = l[dt].children[d];
                nt[j].has(H.id) && l[dt].children.splice(d, 1);
              }
            }
          for (var j in at)
            at[j].length >
              OrgChart.MIXED_LAYOUT_IF_NUMBER_OF_CHILDREN_IS_MORE_THEN &&
              (k[j] = at[j]);
        }
      }
      for (var j in k) {
        for (var ct = (O = l[j]); ct.isSplit; ) ct = l[ct.pid];
        for (; ct.isSubLevel; ) ct = l[ct.pid];
        if (0 != (D = r[O.lcn ? O.lcn : "base"]).layout || tt) {
          (et.pnode = O),
            (et.layout = D.layout),
            (et.layoutGridColumns = e.layoutGridColumns),
            (et.childrenIds = k[j]),
            (et.lastChildrenPidIds = k),
            (et.subLevels = 0),
            (et.layouts = []),
            OrgChart.events.publish("node-layout", [t, et]),
            OrgChart.events.publish("layout", [et]),
            et.layouts.length ||
              et.layouts.push({
                layout: et.layout,
                childrenIds: et.childrenIds,
                subLevels: et.subLevels,
                layoutGridColumns: et.layoutGridColumns,
              });
          for (var gt = 0; gt < et.layouts.length; gt++) {
            var pt = et.layouts[gt];
            for (
              OrgChart.isNEU(pt.subLevels) && (pt.subLevels = 0),
                OrgChart.isNEU(pt.layout) && (pt.layout = D.layout),
                ct = O = l[j];
              ct.isSplit;

            )
              ct = l[ct.pid];
            for (; ct.isSubLevel; ) ct = l[ct.pid];
            var ut = O;
            for (v = 0; v < pt.subLevels; v++) {
              z = new OrgChart.node(
                gt + "_sublevel_layout_" + v,
                ut.id,
                [],
                "subLevel"
              );
              OrgChart.manager._initDinamicNode(z, ut.lcn),
                (z.parent = ut),
                ut.children.push(z),
                (l[z.id] = z),
                (ut = z);
            }
            if (pt.subLevels) {
              for (v = 0; v < pt.childrenIds.length; v++) {
                var ft;
                H = l[pt.childrenIds[v]];
                -1 != (ft = O.children.indexOf(H)) && O.children.splice(ft, 1),
                  (H.parent = ut),
                  ut.children.push(H);
              }
              O = ut;
            }
            if (
              pt.layout == OrgChart.layout.grid &&
              pt.childrenIds.length > 2
            ) {
              "dynamic" == pt.layoutGridColumns &&
                (pt.layoutGridColumns = OrgChart._getDynamicGridCoulumns(
                  pt.childrenIds.length
                ));
              var mt = O.id;
              for (d = O.children.length - 1; d >= 0; d--)
                for (v = 0; v < pt.childrenIds.length; v++) {
                  ht = pt.childrenIds[v];
                  if (O.children[d].id == ht) {
                    O.children.splice(d, 1);
                    break;
                  }
                }
              var Ct = pt.layoutGridColumns;
              Ct % 2 != 0 && Ct > 2 && Ct--;
              for (d = 0; d < pt.childrenIds.length; d += Ct) {
                var Ot = null;
                for (v = 0; v < Ct; v++) {
                  var bt = d + Ct >= pt.childrenIds.length;
                  if (pt.childrenIds.length - 1 < d + v) break;
                  ((H = l[(ht = pt.childrenIds[d + v])]).parent = l[mt]),
                    l[mt].children.push(H),
                    bt ||
                      (Ct / 2 - 1 == v &&
                        ((Ot = new OrgChart.node(
                          pt.childrenIds[d + v - 1] +
                            "_grid_pseudo_node_" +
                            pt.childrenIds[d + v + 1],
                          mt,
                          [],
                          "subLevel"
                        )),
                        OrgChart.manager._initDinamicNode(Ot, O.lcn),
                        (Ot.parent = l[mt]),
                        l[mt].children.push(Ot),
                        (l[Ot.id] = Ot)),
                      Ct - 1 == v && (mt = Ot.id));
                }
              }
            }
            if (pt.layout == OrgChart.layout.mixed) {
              var vt = pt.childrenIds;
              for (d = vt.length - 1; d >= 0; d--) {
                (O = (H = l[vt[d]]).parent), (H.layout = OrgChart.layout.mixed);
                for (v = O.children.length - 1; v >= 0; v--)
                  if (H.id == O.children[v].id) {
                    O.children.splice(v, 1);
                    break;
                  }
                if (d > 0) {
                  var yt = l[vt[d - 1]];
                  (H.parent = yt),
                    (H.layout = OrgChart.layout.mixed),
                    yt.children.push(H);
                } else O.children.push(H);
              }
            } else if (pt.layout > 1) {
              z = new OrgChart.node(
                gt + "_" + O.id + "_split_0",
                ct.id,
                [],
                "split"
              );
              OrgChart.manager._initDinamicNode(z, O.lcn),
                (l[z.id] = z),
                (z.layout = pt.layout);
              var xt = [];
              for (d = pt.childrenIds.length - 1; d >= 0; d--) {
                for (
                  H = l[pt.childrenIds[d]], v = 0;
                  v < O.children.length;
                  v++
                )
                  O.children[v].id == H.id && O.children.splice(v, 1);
                if (
                  ((H.parent = null),
                  (H.layout = pt.layout),
                  (pt.layout != OrgChart.layout.treeRightOffset &&
                    pt.layout != OrgChart.layout.treeRight) ||
                    xt.splice(0, 0, H.id),
                  pt.layout > 2)
                ) {
                  var _t = new OrgChart.node(
                    gt + "_" + H.id + "_mirror",
                    ct.id,
                    [],
                    "mirror"
                  );
                  OrgChart.manager._initDinamicNode(_t, H.lcn),
                    (_t.layout = pt.layout),
                    (l[_t.id] = _t),
                    xt.splice(0, 0, _t.id);
                }
                pt.layout != OrgChart.layout.treeRightOffset &&
                  pt.layout != OrgChart.layout.treeRight &&
                  xt.splice(0, 0, H.id);
              }
              for (X = 1, v = xt.length - 1; v >= 0; v--)
                if (v % 2 && v != xt.length - 1) {
                  V = new OrgChart.node(
                    gt + "_" + O.id + "_split_" + X,
                    ct.id,
                    [],
                    "split"
                  );
                  OrgChart.manager._initDinamicNode(V, O.lcn),
                    (V.layout = pt.layout),
                    (l[V.id] = V),
                    xt.splice(v, 0, V.id),
                    X++;
                } else v % 2 && xt.splice(v, 0, z.id);
              for (v = 0; v < xt.length; v += 3) {
                G = null;
                0 == v && (G = O);
                (W = l[xt[v]]), (J = l[xt[v + 1]]), (K = l[xt[v + 2]]);
                0 != v && (G = l[xt[v - 3]]),
                  0 == v || J || (G = l[xt[v - 2]]),
                  (W.parent = G),
                  G.children.push(W),
                  J &&
                    (0 != v && (G = l[xt[v - 2]]),
                    (J.parent = G),
                    G.children.push(J)),
                  K &&
                    (0 != v && (G = l[xt[v - 1]]),
                    (K.parent = G),
                    G.children.push(K));
              }
            }
          }
        }
      }
    }
    if (OrgChart.VERTICAL_CHILDREN_ASSISTANT)
      for (d = 0; d < s.length; d++)
        OrgChart.manager._verticalAssistantIterate(s[d], l);
    et = { nodes: l, roots: s };
    return (
      OrgChart.events.publish("nodes-initialized", [t, et]),
      { nodes: et.nodes, roots: et.roots, rootList: h }
    );
  }),
  (OrgChart.manager._getOrderFieldValue = function (t, e) {
    var r = e;
    return e.field && (r = e.field), t[r];
  }),
  (OrgChart.manager._getNodeWidth = function (t, e) {
    switch (e.orientation) {
      case OrgChart.orientation.top:
      case OrgChart.orientation.top_left:
      case OrgChart.orientation.bottom:
      case OrgChart.orientation.bottom_left:
        return t.w;
      case OrgChart.orientation.right:
      case OrgChart.orientation.right_top:
      case OrgChart.orientation.left:
      case OrgChart.orientation.left_top:
        return t.h;
    }
    return 0;
  }),
  (OrgChart.manager._isVisible = function (t, e, r, i) {
    if (null != t.x && null != t.y) {
      if (e.lazyLoading && i !== OrgChart.action.exporting) {
        function a(t, e) {
          var r = t.x,
            i = t.y,
            a = t.w,
            n = t.h,
            o = e[0] - OrgChart.LAZY_LOADING_FACTOR,
            l = e[2] + OrgChart.LAZY_LOADING_FACTOR + e[0],
            s = e[1] - OrgChart.LAZY_LOADING_FACTOR,
            h = e[3] + OrgChart.LAZY_LOADING_FACTOR + e[1],
            d = r + a > o && l > r;
          return d && (d = i + n > s && h > i), d;
        }
        if (a(t, r)) return !0;
        for (var n = 0; n < t.children.length; n++)
          if (a(t.children[n], r)) return !0;
        return !1;
      }
      return !0;
    }
  }),
  (OrgChart.manager.getAllFields = function (t) {
    var e = [OrgChart.TAGS];
    for (var r in t.nodeBinding) e.push(t.nodeBinding[r]);
    for (r = 0; r < t.nodes.length; r++)
      for (var i in t.nodes[r])
        i !== OrgChart.ID &&
          i !== OrgChart.TAGS &&
          i !== OrgChart.NODES &&
          i !== OrgChart.PID &&
          i !== OrgChart.STPID &&
          "movex" !== i &&
          "movey" !== i &&
          (t.nodeBinding[i] || e.has(i) || e.push(i));
    return e;
  }),
  (OrgChart.manager._getMostDeepChild = function (t) {
    if (t) {
      var e = t;
      return (
        (function t(r) {
          r.sl > e.sl && (e = r);
          for (var i = 0; i < r.children.length; i++) t(r.children[i]);
        })(t),
        e
      );
    }
  }),
  (OrgChart.manager._getResponse = function (
    t,
    e,
    r,
    i,
    a,
    n,
    o,
    l,
    s,
    h,
    d,
    c,
    g,
    p,
    u
  ) {
    var f = h[0],
      m = [],
      C = {
        top: null,
        left: null,
        bottom: null,
        right: null,
        minX: null,
        maxX: null,
        minY: null,
        maxY: null,
      },
      O = [[], [], []],
      b = a - o + 2 * i.padding,
      v = n - l + 2 * i.padding,
      y = OrgChart.getScale(
        s,
        t,
        e,
        i.scaleInitial,
        i.scaleMax,
        i.scaleMin,
        b,
        v
      );
    if (
      ((C.top = l - i.padding),
      (C.left = o - i.padding),
      (C.bottom = n + i.padding - e / y),
      (C.right = a + i.padding - t / y),
      (C.maxX = a),
      (C.minX = o),
      (C.maxY = n),
      (C.minY = l),
      0 == h.length || (null == s && !u && i.align == OrgChart.CENTER))
    ) {
      var x = Math.ceil(t / y),
        _ = Math.ceil(e / y),
        w = 0,
        k = 0;
      if (x - 2 * i.padding >= a - o)
        switch (((w = (a + o) / 2 - x / 2), i.orientation)) {
          case OrgChart.orientation.right:
          case OrgChart.orientation.right_top:
            w = (o - a) / 2 - x / 2;
        }
      else
        switch (
          ((w = f.x - x / 2 + OrgChart.manager._getNodeWidth(f, i) / 2),
          i.orientation)
        ) {
          case OrgChart.orientation.right:
          case OrgChart.orientation.right_top:
            (w = -(x / 2 - (o - a) / 2)) < i.padding - x && (w = i.padding - x);
            break;
          case OrgChart.orientation.left:
          case OrgChart.orientation.bottom_left:
          case OrgChart.orientation.top_left:
          case OrgChart.orientation.left_top:
            (w = -(x / 2 - (a - o) / 2)) > -i.padding && (w = -i.padding);
        }
      if (_ - 2 * i.padding >= n - l)
        switch (((k = (n + l) / 2 - _ / 2), i.orientation)) {
          case OrgChart.orientation.bottom:
          case OrgChart.orientation.bottom_left:
            k = (l - n) / 2 - _ / 2;
        }
      else
        switch (
          ((k = -(_ / 2 - (n - l) / 2)) > -i.padding && (k = -i.padding),
          i.orientation)
        ) {
          case OrgChart.orientation.bottom:
          case OrgChart.orientation.bottom_left:
            (k = -(_ / 2 - (l - n) / 2)) < i.padding - _ && (k = i.padding - _);
            break;
          case OrgChart.orientation.left:
          case OrgChart.orientation.right:
            k = f.y - _ / 2 + OrgChart.manager._getNodeWidth(f, i) / 2;
        }
      s = [w, k, x, _];
    } else if (null == s && !u && i.align == OrgChart.ORIENTATION) {
      (x = Math.ceil(t / y)), (_ = Math.ceil(e / y)), (w = 0), (k = 0);
      switch (i.orientation) {
        case OrgChart.orientation.top:
          (w = f.x - x / 2 + OrgChart.manager._getNodeWidth(f, i) / 2),
            (k = -i.padding);
          break;
        case OrgChart.orientation.bottom:
          (w = f.x - x / 2 + OrgChart.manager._getNodeWidth(f, i) / 2),
            (k = i.padding - _);
          break;
        case OrgChart.orientation.left:
          (w = -i.padding),
            (k = f.y - _ / 2 + OrgChart.manager._getNodeWidth(f, i) / 2);
          break;
        case OrgChart.orientation.right:
          (w = i.padding - x),
            (k = f.y - _ / 2 + OrgChart.manager._getNodeWidth(f, i) / 2);
          break;
        case OrgChart.orientation.top_left:
          (w = -i.padding), (k = -i.padding);
          break;
        case OrgChart.orientation.right_top:
          (w = i.padding - x), (k = -i.padding);
          break;
        case OrgChart.orientation.left_top:
          (w = -i.padding), (k = -i.padding);
          break;
        case OrgChart.orientation.bottom_left:
          (w = -i.padding), (k = i.padding - _);
      }
      (s = [w, k, x, _]),
        i.sticky &&
          (s[0] < C.left &&
            s[0] < C.right &&
            (s[0] = C.left > C.right ? C.right : C.left),
          s[0] > C.right &&
            s[0] > C.left &&
            (s[0] = C.left > C.right ? C.left : C.right),
          s[1] < C.top &&
            s[1] < C.bottom &&
            (s[1] = C.top > C.bottom ? C.bottom : C.top),
          s[1] > C.bottom &&
            s[1] > C.top &&
            (s[1] = C.top > C.bottom ? C.top : C.bottom));
    }
    if (d == OrgChart.action.centerNode || d == OrgChart.action.maximize) {
      var S = g[c.id];
      1 == c.options.horizontal && (s[0] = S.x + S.w / 2 - s[2] / 2),
        1 == c.options.vertical && (s[1] = S.y + S.h / 2 - s[3] / 2),
        i.sticky &&
          (s[0] < C.left &&
            s[0] < C.right &&
            (s[0] = C.left > C.right ? C.right : C.left),
          s[0] > C.right &&
            s[0] > C.left &&
            (s[0] = C.left > C.right ? C.left : C.right),
          s[1] < C.top &&
            s[1] < C.bottom &&
            (s[1] = C.top > C.bottom ? C.bottom : C.top),
          s[1] > C.bottom &&
            s[1] > C.top &&
            (s[1] = C.top > C.bottom ? C.top : C.bottom));
    }
    if (
      d == OrgChart.action.insert ||
      d == OrgChart.action.expand ||
      d == OrgChart.action.collapse ||
      d == OrgChart.action.update ||
      d == OrgChart.action.centerNode
    ) {
      var I = null;
      if (
        d == OrgChart.action.insert &&
        c &&
        null != c.insertedNodeId &&
        null != c.insertedNodeId
      )
        I = g[c.insertedNodeId];
      else if (
        d == OrgChart.action.update &&
        c &&
        null != c.visId &&
        null != c.visId
      )
        I = g[c.visId];
      else if (
        (d != OrgChart.action.expand && d != OrgChart.action.collapse) ||
        !c ||
        null == c.id ||
        null == c.id
      ) {
        if (d == OrgChart.action.centerNode) {
          switch (i.orientation) {
            case OrgChart.orientation.top:
            case OrgChart.orientation.top_left:
            case OrgChart.orientation.bottom:
            case OrgChart.orientation.bottom_left:
              c.options.vertical || (I = g[c.id]);
              break;
            case OrgChart.orientation.right:
            case OrgChart.orientation.right_top:
            case OrgChart.orientation.left:
            case OrgChart.orientation.left_top:
              c.options.horizontal || (I = g[c.id]);
          }
          I && (I = OrgChart.manager._getMostDeepChild(I, g));
        }
      } else (I = g[c.id]), (I = OrgChart.manager._getMostDeepChild(I, g));
      if (!OrgChart.FIXED_POSITION_ON_CLICK && I)
        switch (i.orientation) {
          case OrgChart.orientation.top:
          case OrgChart.orientation.top_left:
            var A = I.y + I.h - s[3] + i.padding;
            s[1] < A && (s[1] = A);
            break;
          case OrgChart.orientation.bottom:
          case OrgChart.orientation.bottom_left:
            A = I.y - i.padding;
            s[1] > A && (s[1] = A);
            break;
          case OrgChart.orientation.right:
          case OrgChart.orientation.right_top:
            A = I.x - i.padding;
            s[0] > A && (s[0] = A);
            break;
          case OrgChart.orientation.left:
          case OrgChart.orientation.left_top:
            A = I.x + I.w - s[2] + i.padding;
            s[0] < A && (s[0] = A);
        }
    }
    for (var L = 0; L < h.length; L++)
      OrgChart.manager._iterate2(h[L], g, i, s, d, c, m, p, r, O);
    return {
      animations: O,
      boundary: C,
      viewBox: s,
      visibleNodeIds: m,
      nodes: g,
      allFields: OrgChart.manager.getAllFields(i),
    };
  }),
  (OrgChart.manager._iterate2 = function (t, e, r, i, a, n, o, l, s, h) {
    if (OrgChart.manager._isVisible(t, r, i, a)) {
      o.push(t.id);
      var d = null;
      if (
        (a == OrgChart.action.expand ||
          a == OrgChart.action.collapse ||
          a == OrgChart.action.maximize) &&
        l &&
        l[t.id] &&
        "expandCollapseToLevel" == n.method
      ) {
        if (((d = { x: (u = l[t.id]).x, y: u.y }), u)) {
          d = { x: u.x, y: u.y };
          for (var c = t, g = null; null != c; )
            l[c.id] && l[c.id].collapsed && (g = c), (c = c.parent);
          g && g.parent && (d = { x: g.parent.x, y: g.parent.y });
        }
        if ((f = e[n.id])) {
          for (c = t.parent; null != c; ) c = c.parent;
          c && (d = { x: f.x + f.w / 2 - t.w / 2, y: f.y + f.h / 2 - t.h / 2 });
        }
      } else if (
        (a == OrgChart.action.expand || a == OrgChart.action.collapse) &&
        l &&
        l[t.id]
      ) {
        if (((d = { x: (u = l[t.id]).x, y: u.y }), "all" == n.ids && u)) {
          d = { x: u.x, y: u.y };
          for (c = t, g = null; null != c; )
            l[c.id] && l[c.id].collapsed && (g = c), (c = c.parent);
          g && g.parent && (d = { x: g.parent.x, y: g.parent.y });
        }
        if ((f = e[n.id])) {
          for (
            c = t.parent;
            null != c && -1 == n.ids.indexOf(t.id) && -1 == n.ids.indexOf(c.id);

          )
            c = c.parent;
          c && (d = { x: f.x + f.w / 2 - t.w / 2, y: f.y + f.h / 2 - t.h / 2 });
        }
      } else if (a == OrgChart.action.centerNode && l && l[t.id]) {
        if (
          (null != (u = l[t.id]).x && null != u.y && (d = { x: u.x, y: u.y }),
          (p = e[n.id]) && p == t)
        )
          (c = t.parent) &&
            c.id == n.id &&
            (d = { x: p.x + p.w / 2 - t.w / 2, y: p.y + p.h / 2 - t.h / 2 });
      } else if (a == OrgChart.action.maximize && l && l[t.id]) {
        var p;
        if (
          (null != (u = l[t.id]).x && null != u.y && (d = { x: u.x, y: u.y }),
          (p = e[n.id]) && p == t)
        )
          (c = t.parent) &&
            c.id == n.id &&
            (d = { x: p.x + p.w / 2 - t.w / 2, y: p.y + p.h / 2 - t.h / 2 });
      } else if (a == OrgChart.action.minimize && l && l[t.id]) {
        d = { x: (u = l[t.id]).x, y: u.y };
      } else if (
        a == OrgChart.action.insert &&
        n &&
        n.insertedNodeId == t.id &&
        t.parent
      )
        d = { x: t.parent.x, y: t.parent.y };
      else if (
        (a != OrgChart.action.update && a != OrgChart.action.insert) ||
        !l
      )
        a !== OrgChart.action.exporting &&
          a !== OrgChart.action.init &&
          -1 == s.indexOf(t.id) &&
          (h[0].push(t.id),
          h[1].push({ opacity: 0 }),
          h[2].push({ opacity: 1 }));
      else {
        var u, f;
        if (
          (!(u = l[t.id]) || (OrgChart.isNEU(u.x) && OrgChart.isNEU(u.y))) &&
          n
        ) {
          if ((f = e[n.id])) {
            for (c = f; c && c.id == t.id; ) c = c.parent;
            c && (d = { x: f.x, y: f.y });
          }
        } else u && (d = { x: u.x, y: u.y });
      }
      if (null != d && null != d.x && null != d.y)
        if (d.x != t.x || d.y != t.y)
          (n && n.dragNodeIdList && -1 != n.dragNodeIdList.indexOf(t.id)) ||
            (h[0].push(t.id),
            h[1].push({ transform: [1, 0, 0, 1, d.x, d.y] }),
            h[2].push({ transform: [1, 0, 0, 1, t.x, t.y] }));
    }
    for (var m = 0; m < t.stChildren.length; m++)
      OrgChart.manager._iterate2(t.stChildren[m], e, r, i, a, n, o, l, s, h);
    for (m = 0; m < t.children.length; m++)
      OrgChart.manager._iterate2(t.children[m], e, r, i, a, n, o, l, s, h);
  }),
  (OrgChart.manager._addExpandedNodeIdsIterate = function (t, e, r) {
    for (var i = 0; i < t.childrenIds.length; i++)
      r.push(t.childrenIds[i]),
        OrgChart.manager._addExpandedNodeIdsIterate(e[t.childrenIds[i]], e, r);
  }),
  (OrgChart.manager._setMinMaxXYAdjustifyIterate = function (
    t,
    e,
    r,
    i,
    a,
    n,
    o
  ) {
    (t.x += n.x), (t.y += n.y);
    for (var l = 0; l < t.stChildren.length; l++)
      OrgChart.manager._setMinMaxXYAdjustifyIterate(
        t.stChildren[l],
        t.stChildren[l],
        r,
        0,
        a,
        n,
        o
      );
    t.isPartner ? (t.sl = i - 1) : (t.sl = i),
      null == a[e.id] && (a[e.id] = {}),
      null == a[e.id][t.sl] &&
        (a[e.id][t.sl] = { minX: null, minY: null, maxX: null, maxY: null }),
      t.layout || OrgChart._setMinMaxXY(t, a[e.id][t.sl]),
      null != t.movex && (t.x += t.movex),
      null != t.movey && (t.y += t.movey),
      OrgChart._setMinMaxXY(t, r),
      i++;
    for (l = 0; l < t.children.length; l++)
      OrgChart.manager._setMinMaxXYAdjustifyIterate(
        t.children[l],
        e,
        r,
        i,
        a,
        n,
        o
      );
  }),
  (OrgChart.manager._doNotChangePositionOfClickedNodeIfAny = function (
    t,
    e,
    r,
    i,
    a,
    n
  ) {
    if (
      r != OrgChart.action.expand &&
      r != OrgChart.action.collapse &&
      r != OrgChart.action.minimize &&
      r != OrgChart.action.maximize &&
      r != OrgChart.action.centerNode &&
      r != OrgChart.action.update &&
      r != OrgChart.action.insert
    )
      return { x: 0, y: 0 };
    if (r == OrgChart.action.update && (!i || null == i.id)) {
      if (!t || !t.length) return { x: 0, y: 0 };
      i = { id: t[0].id };
    }
    if (null == i.id) return { x: 0, y: 0 };
    var o = i.id;
    ((r == OrgChart.action.minimize && e[o].parent) ||
      (r == OrgChart.action.maximize && e[o].parent)) &&
      (o = e[o].pid);
    var l = e[o],
      s = a[o];
    if (!s) return { x: 0, y: 0 };
    var h = null != s.movex ? s.movex : 0,
      d = null != s.movey ? s.movey : 0;
    return { x: (s.x ? s.x - h : 0) - l.x, y: (s.y ? s.y - d : 0) - l.y };
  }),
  (OrgChart.manager._verticalAssistantIterate = function (t, e) {
    for (var r = 0; r < t.stChildren.length; r++)
      OrgChart.manager._verticalAssistantIterate(t.stChildren[r], e);
    if (3 == t.children.length)
      OrgChart.manager._verticalAssistantIterate(t.children[0], e),
        OrgChart.manager._verticalAssistantIterate(t.children[2], e),
        OrgChart.manager._verticalAssistantIterate(t.children[1], e);
    else
      for (r = 0; r < t.children.length; r++)
        OrgChart.manager._verticalAssistantIterate(t.children[r], e);
    if (t.isAssistant && t.isSplit && t.children.length) {
      for (
        var i = t.parent.children[0], a = t.parent.children[2], n = t.parent;
        !n.hasAssistants;

      )
        n = n.parent;
      var o = { max: 0 },
        l = { max: 0 };
      OrgChart.manager._verticalAssistantLevelCountIterate(i, 0, o),
        OrgChart.manager._verticalAssistantLevelCountIterate(a, 0, l);
      var s = Math.max(o.max, l.max),
        h = [];
      for (r = 0; r < s; r++) {
        var d = new OrgChart.node(
          t.parent.id + "_split_assitant_level_" + r,
          t.pid,
          [],
          "subLevel"
        );
        OrgChart.manager._initDinamicNode(d, t.lcn, !0),
          r > 0 && (h[r - 1].children.push(d), (d.parent = h[r - 1])),
          (e[d.id] = d),
          h.push(d);
      }
      if (h.length) {
        for (
          var c = h[h.length - 1], g = h[0], p = t.children.length - 1;
          p >= 0;
          p--
        ) {
          var u = t.children[p];
          c.children.unshift(u), (u.parent = c), t.children.splice(p, 1);
        }
        t.children.push(g), (g.parent = t);
      }
    }
  }),
  (OrgChart.manager._verticalAssistantLevelCountIterate = function (t, e, r) {
    r.max < e && (r.max = e), e++;
    for (var i = 0; i < t.children.length; i++)
      OrgChart.manager._verticalAssistantLevelCountIterate(t.children[i], e, r);
  }),
  (OrgChart._addDottedLines = function (t) {
    var e = t.nodes;
    if (
      ((t.groupDottedLines.length || t.dottedLines.length) &&
        (e = JSON.parse(JSON.stringify(e))),
      t.groupDottedLines.length)
    )
      for (var r = [], i = 0; i < t.groupDottedLines.length; i++) {
        var a = t.groupDottedLines[i];
        null == a.rootId && (a.rootId = a.to);
        var n = `balkan_group_dotted_${a.rootId}`;
        if (!r.has(n))
          for (var o = 0; o < e.length; o++)
            if (e[o].id == a.rootId) {
              ((d = JSON.parse(
                JSON.stringify(e[o])
              )).id = `balkan_group_dotted_${a.rootId}_balkan_id_${e[o].id}`),
                (d.pid = void 0),
                (d.stpid = e[o].id),
                e.push(d),
                r.push(n),
                e[o].tags || (e[o].tags = []),
                e[o].tags.push("group-dotted-lines"),
                e[o].tags.push("group-dotted-lines-" + n);
              break;
            }
        for (o = 0; o < e.length; o++)
          if (e[o].id == a.from) {
            if (
              (((d = JSON.parse(
                JSON.stringify(e[o])
              )).id = `balkan_group_dotted_${a.rootId}_balkan_id_${e[o].id}`),
              (d.pid = `balkan_group_dotted_${a.rootId}_balkan_id_${a.to}`),
              d.tags)
            ) {
              var l = d.tags.indexOf("group-dotted-lines");
              -1 != l && d.tags.splice(l, 1);
            }
            if (
              (d.tags || (d.tags = []),
              d.tags.push("boc-dotted-connector"),
              a.tags)
            )
              for (var s = 0; s < a.tags.length; s++) d.tags.push(a.tags[s]);
            e.push(d);
            break;
          }
      }
    if (t.dottedLines.length)
      for (i = 0; i < t.dottedLines.length; i++) {
        var h = t.dottedLines[i];
        null == h.rootId && (h.rootId = h.to);
        for (o = 0; o < e.length; o++)
          if (e[o].id == h.from) {
            var d;
            if (
              (((d = JSON.parse(
                JSON.stringify(e[o])
              )).id = `balkan_dotted_${h.rootId}_balkan_id_${e[o].id}`),
              h.rootId == h.to
                ? (d.pid = h.to)
                : (d.pid = `balkan_dotted_${h.rootId}_balkan_id_${h.to}`),
              d.tags || (d.tags = []),
              d.tags.push("boc-dotted-connector"),
              h.tags)
            )
              for (s = 0; s < h.tags.length; s++) d.tags.push(h.tags[s]);
            e.push(d);
            break;
          }
      }
    return e;
  }),
  void 0 === OrgChart && (OrgChart = {}),
  (OrgChart.templates = {}),
  (OrgChart.templates.base = {
    defs: "",
    size: [250, 120],
    expandCollapseSize: 30,
    linkAdjuster: { fromX: 0, fromY: 0, toX: 0, toY: 0 },
    ripple: { radius: 0, color: "#e6e6e6", rect: null },
    assistanseLink:
      '<path stroke-linejoin="round" stroke="#aeaeae" stroke-width="2px" fill="none" d="M{xa},{ya} {xb},{yb} {xc},{yc} {xd},{yd} L{xe},{ye}"/>',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:block;" width="{w}" height="{h}" viewBox="{viewBox}">{content}</svg>',
    link: '<path stroke-linejoin="round" stroke="#aeaeae" stroke-width="1px" fill="none" d="M{xa},{ya} {xb},{yb} {xc},{yc} L{xd},{yd}"/>',
    pointer:
      '<g data-pointer="pointer" transform="matrix(0,0,0,0,100,100)"><radialGradient id="pointerGradient"><stop stop-color="#ffffff" offset="0" /><stop stop-color="#C1C1C1" offset="1" /></radialGradient><circle cx="16" cy="16" r="16" stroke-width="1" stroke="#acacac" fill="url(#pointerGradient)"></circle></g>',
    node: '<rect x="0" y="0" height="120" width="250" fill="none" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>',
    plus: '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#aeaeae"></line><line x1="15" y1="4" x2="15" y2="26" stroke-width="1" stroke="#aeaeae"></line>',
    minus:
      '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#aeaeae"></line>',
    nodeMenuButton:
      '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,105)" ' +
      OrgChart.attr.control_node_menu_id +
      '="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="7" cy="0" r="2" fill="#ffffff"></circle><circle cx="14" cy="0" r="2" fill="#ffffff"></circle></g>',
    menuButton:
      '<div style="position:absolute;right:{p}px;top:{p}px; width:30px;height:50px;cursor:pointer;" ' +
      OrgChart.attr.control_export_menu +
      '=""><hr style="background-color: #7A7A7A; height: 3px; border: none;"><hr style="background-color: #7A7A7A; height: 3px; border: none;"><hr style="background-color: #7A7A7A; height: 3px; border: none;"></div>',
    img_0:
      '<clipPath id="{randId}"><circle cx="60" cy="60" r="40"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="20" y="20"  width="80" height="80"></image>',
    link_field_0:
      '<text text-anchor="middle" fill="#aeaeae" ' +
      OrgChart.attr.width +
      '="290" x="0" y="0" style="font-size:10px;">{val}</text>',
    editFormHeaderColor: "#039BE5",
  }),
  (OrgChart.templates.ana = {
    defs: "",
    size: [250, 120],
    linkAdjuster: { fromX: 0, fromY: 0, toX: 0, toY: 0 },
    ripple: { radius: 0, color: "#e6e6e6", rect: null },
    expandCollapseSize: 30,
    svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  style="display:block;" width="{w}" height="{h}" viewBox="{viewBox}">{content}</svg>',
    link: '<path stroke-linejoin="round" stroke="#aeaeae" stroke-width="1px" fill="none" d="{rounded}" />',
    assistanseLink:
      '<path stroke-linejoin="round" stroke="#aeaeae" stroke-width="2px" fill="none" d="M{xa},{ya} {xb},{yb} {xc},{yc} {xd},{yd} L{xe},{ye}"/>',
    pointer:
      '<g data-pointer="pointer" transform="matrix(0,0,0,0,100,100)"><radialGradient id="pointerGradient"><stop stop-color="#ffffff" offset="0" /><stop stop-color="#C1C1C1" offset="1" /></radialGradient><circle cx="16" cy="16" r="16" stroke-width="1" stroke="#acacac" fill="url(#pointerGradient)"></circle></g>',
    node: '<rect x="0" y="0" height="{h}" width="{w}" fill="#039BE5" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>',
    plus: '<circle cx="15" cy="15" r="15" class="boc-fill" stroke="#aeaeae" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#aeaeae"></line><line x1="15" y1="4" x2="15" y2="26" stroke-width="1" stroke="#aeaeae"></line>',
    minus:
      '<circle cx="15" cy="15" r="15" class="boc-fill" stroke="#aeaeae" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#aeaeae"></line>',
    up: '<rect x="20" y="-25" width="30" height="17" fill="#aeaeae" rx="3" ry="3"></rect><line x1="35" x2="35" y1="0" y2="-8" stroke="#aeaeae" stroke-width="1"></line>',
    nodeMenuButton:
      '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,105)" ' +
      OrgChart.attr.control_node_menu_id +
      '="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="7" cy="0" r="2" fill="#ffffff"></circle><circle cx="14" cy="0" r="2" fill="#ffffff"></circle></g>',
    menuButton: OrgChart.templates.base.menuButton,
    img_0:
      '<clipPath id="{randId}"><circle cx="50" cy="30" r="40"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="10" y="-10"  width="80" height="80"></image>',
    link_field_0:
      '<text text-anchor="middle" fill="#aeaeae" ' +
      OrgChart.attr.width +
      '="290" x="0" y="0" style="font-size:10px;">{val}</text>',
    field_0:
      "<text " +
      OrgChart.attr.width +
      '="230" style="font-size: 18px;" fill="#ffffff" x="125" y="95" text-anchor="middle">{val}</text>',
    field_1:
      "<text " +
      OrgChart.attr.width +
      '="130" ' +
      OrgChart.attr.text_overflow +
      '="multiline" style="font-size: 14px;" fill="#ffffff" x="230" y="30" text-anchor="end">{val}</text>',
    padding: [50, 20, 35, 20],
    editFormHeaderColor: "#039BE5",
  }),
  (OrgChart.templates.split = Object.assign({}, OrgChart.templates.ana)),
  (OrgChart.templates.split.size = [10, 10]),
  (OrgChart.templates.split.node =
    '<circle cx="5" cy="5" r="5" fill="none" stroke-width="1" stroke="#aeaeae"></circle>'),
  (OrgChart.templates.split.field_0 = ""),
  (OrgChart.templates.split.field_1 = ""),
  (OrgChart.templates.split.img_0 = ""),
  (OrgChart.templates.dot = Object.assign({}, OrgChart.templates.split)),
  (OrgChart.templates.group = Object.assign({}, OrgChart.templates.ana)),
  (OrgChart.templates.group.size = [250, 120]),
  (OrgChart.templates.group.node =
    '<rect rx="50" ry="50" x="0" y="0" height="{h}" width="{w}" fill="#f2f2f2" stroke-width="0"></rect>'),
  (OrgChart.templates.group.link =
    '<path stroke="#aeaeae" stroke-width="1px" fill="none" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}"/>'),
  (OrgChart.templates.group.nodeMenuButton =
    '<g style="cursor:pointer;" transform="matrix(1,0,0,1,{ew},25)" ' +
    OrgChart.attr.control_node_menu_id +
    '="{id}"><g transform="matrix(1,0,0,1,-22,-8)"><rect x="0" y="0" fill="red" fill-opacity="0" width="18" height="22"></rect><line x1="0" y1="2" x2="9" y2="2" stroke="#aeaeae" stroke-width="1"></line><line x1="0" y1="9" x2="18" y2="9" stroke="#aeaeae" stroke-width="1"></line><line x1="0" y1="16" x2="22" y2="16" stroke="#aeaeae" stroke-width="1"></line></g></g>'),
  (OrgChart.templates.group.field_0 =
    "<text " +
    OrgChart.attr.width +
    '="230" style="font-size: 18px;" fill="#aeaeae" x="{cw}" y="30" text-anchor="middle">{val}</text>'),
  (OrgChart.templates.group.field_1 = ""),
  (OrgChart.templates.group.ripple = { radius: 50, color: "#aeaeae" }),
  (OrgChart.templates.invisibleGroup = Object.assign(
    {},
    OrgChart.templates.group
  )),
  (OrgChart.templates.invisibleGroup.node = ""),
  (OrgChart.templates.invisibleGroup.padding = [0, 0, 0, 0]),
  (OrgChart.templates.invisibleGroup.field_0 = ""),
  (OrgChart.templates.invisibleGroup.nodeMenuButton = ""),
  (OrgChart.templates.mirror = {
    linkAdjuster: {},
    link: "",
    node: "",
    nodeMenuButton: "",
    size: [0, 0],
  }),
  (OrgChart.templates.ula = Object.assign({}, OrgChart.templates.ana)),
  (OrgChart.templates.ula.field_0 =
    "<text " +
    OrgChart.attr.width +
    '="145" style="font-size: 18px;" fill="#039BE5" x="100" y="55">{val}</text>'),
  (OrgChart.templates.ula.field_1 =
    "<text " +
    OrgChart.attr.width +
    '="145" ' +
    OrgChart.attr.text_overflow +
    '="multiline" style="font-size: 14px;" fill="#afafaf" x="100" y="76">{val}</text>'),
  (OrgChart.templates.ula.node =
    '<rect x="0" y="0" height="{h}" width="{w}" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect><line x1="0" y1="0" x2="250" y2="0" stroke-width="2" stroke="#039BE5"></line>'),
  (OrgChart.templates.ula.img_0 =
    '<clipPath id="{randId}"><circle cx="50" cy="60" r="40"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="10" y="20" width="80" height="80" ></image>'),
  (OrgChart.templates.ula.menu =
    '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,12)" ' +
    OrgChart.attr.control_node_menu_id +
    '="{id}"><rect x="-4" y="-10" fill="#ffffff" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#039BE5"></circle><circle cx="7" cy="0" r="2" fill="#039BE5"></circle><circle cx="14" cy="0" r="2" fill="#039BE5"></circle></g>'),
  (OrgChart.templates.ula.nodeMenuButton =
    '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,105)" ' +
    OrgChart.attr.control_node_menu_id +
    '="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#AEAEAE"></circle><circle cx="7" cy="0" r="2" fill="#AEAEAE"></circle><circle cx="14" cy="0" r="2" fill="#AEAEAE"></circle></g>'),
  (OrgChart.templates.olivia = Object.assign({}, OrgChart.templates.ana)),
  (OrgChart.templates.olivia.defs =
    '<style>\n                                    #olivia_gradient {\n                                        --color-stop-1: #ffffff;\n                                        --color-stop-2: #eeeeee;\n                                        --opacity-stop: 1;\n                                    }\n                                    .olivia-f0{\n                                        font-size: 18px;\n                                        fill: #757575;\n                                    }\n                                    .olivia-f1{\n                                        font-size: 14px;\n                                        fill: #757575;\n                                    }\n                                    .boc-dark .olivia-f0,.boc-dark .olivia-f1{\n                                        fill: #aeaeae;\n                                    }\n                                    .boc-dark #olivia_gradient {\n                                        --color-stop-1: #646464;\n                                        --color-stop-2: #363636;\n                                        --opacity-stop: 1;\n                                    }\n                                </style>\n                                \'<linearGradient id="olivia_gradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="var(--color-stop-1)" stop-opacity="var(--opacity-stop)"/><stop offset="100%" stop-color="var(--color-stop-2)" stop-opacity="var(--opacity-stop)" /></linearGradient>'),
  (OrgChart.templates.olivia.field_0 =
    "<text " +
    OrgChart.attr.width +
    '="135" class="olivia-f0" x="100" y="55">{val}</text>'),
  (OrgChart.templates.olivia.field_1 =
    "<text " +
    OrgChart.attr.width +
    '="135" class="olivia-f1" x="100" y="76">{val}</text>'),
  (OrgChart.templates.olivia.node =
    '<rect fill="url(#olivia_gradient)" x="0" y="0" height="{h}" width="{w}" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>'),
  (OrgChart.templates.olivia.img_0 =
    '<clipPath id="{randId}"><circle cx="50" cy="60" r="40"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="10" y="20" width="80" height="80" ></image>'),
  (OrgChart.templates.olivia.nodeMenuButton =
    '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,105)" ' +
    OrgChart.attr.control_node_menu_id +
    '="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#AEAEAE"></circle><circle cx="7" cy="0" r="2" fill="#AEAEAE"></circle><circle cx="14" cy="0" r="2" fill="#AEAEAE"></circle></g>'),
  (OrgChart.templates.belinda = Object.assign({}, OrgChart.templates.ana)),
  (OrgChart.templates.belinda.size = [180, 180]),
  (OrgChart.templates.belinda.ripple = {
    radius: 90,
    color: "#e6e6e6",
    rect: null,
  }),
  (OrgChart.templates.belinda.node =
    '<circle cx="90" cy="90" r="90" fill="#039BE5" stroke-width="1" stroke="#aeaeae"></circle>'),
  (OrgChart.templates.belinda.img_0 =
    '<clipPath id="{randId}"><circle cx="90" cy="45" r="40"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="50" y="5" width="80" height="80" ></image>'),
  (OrgChart.templates.belinda.field_0 =
    "<text " +
    OrgChart.attr.width +
    '="170" style="font-size: 18px;" text-anchor="middle" fill="#ffffff"  x="90" y="105">{val}</text>'),
  (OrgChart.templates.belinda.field_1 =
    "<text " +
    OrgChart.attr.width +
    '="160" style="font-size: 14px;" text-anchor="middle" fill="#ffffff"  x="90" y="125">{val}</text>'),
  (OrgChart.templates.belinda.link =
    '<path stroke="#aeaeae" stroke-width="1px" fill="none" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}"/>'),
  (OrgChart.templates.belinda.nodeMenuButton =
    '<g style="cursor:pointer;" transform="matrix(1,0,0,1,79,5)" ' +
    OrgChart.attr.control_node_menu_id +
    '="{id}"><rect x="0" y="0" fill="#000000" fill-opacity="0" width="22" height="22"></rect><line stroke-width="2" stroke="#000" x1="0" y1="3" x2="22" y2="3"></line><line stroke-width="2" stroke="#000" x1="0" y1="9" x2="22" y2="9"></line><line stroke-width="2" stroke="#000" x1="0" y1="15" x2="22" y2="15"></line></g>'),
  (OrgChart.templates.rony = Object.assign({}, OrgChart.templates.ana)),
  (OrgChart.templates.rony.svg =
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background-color:#E8E8E8;display:block;" width="{w}" height="{h}" viewBox="{viewBox}">{content}</svg>'),
  (OrgChart.templates.rony.defs =
    '<filter id="{randId}" x="0" y="0" width="200%" height="200%"><feOffset result="offOut" in="SourceAlpha" dx="5" dy="5"></feOffset><feGaussianBlur result="blurOut" in="offOut" stdDeviation="5"></feGaussianBlur><feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend></filter>'),
  (OrgChart.templates.rony.size = [180, 250]),
  (OrgChart.templates.rony.ripple = {
    color: "#F57C00",
    radius: 5,
    rect: null,
  }),
  (OrgChart.templates.rony.img_0 =
    '<clipPath id="{randId}"><circle cx="90" cy="160" r="60"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="30" y="100"  width="120" height="120"></image>'),
  (OrgChart.templates.rony.node =
    '<rect filter="url(#{randId})" x="0" y="0" height="250" width="180" fill="#ffffff" stroke-width="0" rx="7" ry="7"></rect>'),
  (OrgChart.templates.rony.field_0 =
    "<text " +
    OrgChart.attr.width +
    '="165" style="font-size: 18px;" fill="#039BE5" x="90" y="40" text-anchor="middle">{val}</text>'),
  (OrgChart.templates.rony.field_1 =
    "<text " +
    OrgChart.attr.width +
    '="165" style="font-size: 14px;" fill="#F57C00" x="90" y="60" text-anchor="middle">{val}</text>'),
  (OrgChart.templates.rony.field_2 =
    "<text " +
    OrgChart.attr.width +
    '="165" style="font-size: 14px;" fill="#FFCA28" x="90" y="80" text-anchor="middle">{val}</text>'),
  (OrgChart.templates.rony.link =
    '<path stroke="#039BE5" stroke-width="1px" fill="none" d="M{xa},{ya} {xb},{yb} {xc},{yc} L{xd},{yd}"/>'),
  (OrgChart.templates.rony.plus =
    '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#039BE5" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#039BE5"></line><line x1="15" y1="4" x2="15" y2="26" stroke-width="1" stroke="#039BE5"></line>'),
  (OrgChart.templates.rony.minus =
    '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#039BE5" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#039BE5"></line>'),
  (OrgChart.templates.rony.nodeMenuButton =
    '<g style="cursor:pointer;" transform="matrix(1,0,0,1,155,235)" ' +
    OrgChart.attr.control_node_menu_id +
    '="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#F57C00"></circle><circle cx="7" cy="0" r="2" fill="#F57C00"></circle><circle cx="14" cy="0" r="2" fill="#F57C00"></circle></g>'),
  (OrgChart.templates.mery = Object.assign({}, OrgChart.templates.ana)),
  (OrgChart.templates.mery.ripple = {
    color: "#e6e6e6",
    radius: 50,
    rect: null,
  }),
  (OrgChart.templates.mery.node =
    '<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#686868" rx="50" ry="50"></rect><rect x="0" y="45" height="30" width="250" fill="#039BE5" stroke-width="1"></rect>'),
  (OrgChart.templates.mery.link =
    '<path stroke="#aeaeae" stroke-width="1px" fill="none" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}" />'),
  (OrgChart.templates.mery.img_0 =
    '<clipPath id="{randId}"><circle cx="125" cy="60" r="24"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="95" y="33"  width="60" height="60"></image>'),
  (OrgChart.templates.mery.field_0 =
    "<text " +
    OrgChart.attr.width +
    '="220" style="font-size: 18px;" fill="#039BE5" x="125" y="30" text-anchor="middle">{val}</text>'),
  (OrgChart.templates.mery.field_1 =
    "<text " +
    OrgChart.attr.width +
    '="220" style="font-size: 14px;" fill="#039BE5" x="125" y="100" text-anchor="middle">{val}</text>'),
  (OrgChart.templates.mery.nodeMenuButton =
    '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,60)" ' +
    OrgChart.attr.control_node_menu_id +
    '="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="7" cy="0" r="2" fill="#ffffff"></circle><circle cx="14" cy="0" r="2" fill="#ffffff"></circle></g>'),
  (OrgChart.templates.polina = Object.assign({}, OrgChart.templates.ana)),
  (OrgChart.templates.polina.size = [300, 80]),
  (OrgChart.templates.polina.ripple = {
    color: "#e6e6e6",
    radius: 40,
    rect: null,
  }),
  (OrgChart.templates.polina.node =
    '<rect x="0" y="0" height="80" width="300" fill="#039BE5" stroke-width="1" stroke="#686868" rx="40" ry="40"></rect>'),
  (OrgChart.templates.polina.img_0 =
    '<clipPath id="{randId}"><circle  cx="40" cy="40" r="35"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="0" y="0"  width="80" height="80"></image>'),
  (OrgChart.templates.polina.field_0 =
    "<text " +
    OrgChart.attr.width +
    '="210" style="font-size: 18px;" fill="#ffffff" x="80" y="30" text-anchor="start">{val}</text>'),
  (OrgChart.templates.polina.field_1 =
    "<text " +
    OrgChart.attr.width +
    '="210" style="font-size: 14px;" fill="#ffffff" x="80" y="55" text-anchor="start">{val}</text>'),
  (OrgChart.templates.polina.link =
    '<path stroke="#686868" stroke-width="1px" fill="none" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}" />'),
  (OrgChart.templates.polina.nodeMenuButton =
    '<g style="cursor:pointer;" transform="matrix(1,0,0,1,285,33)" ' +
    OrgChart.attr.control_node_menu_id +
    '="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="0" cy="7" r="2" fill="#ffffff"></circle><circle cx="0" cy="14" r="2" fill="#ffffff"></circle></g>'),
  (OrgChart.templates.mila = Object.assign({}, OrgChart.templates.ana)),
  (OrgChart.templates.mila.node =
    '<rect x="0" y="0" height="120" width="250" fill="#039BE5" stroke-width="1" stroke="#aeaeae"></rect><rect x="-5" y="70" height="30" width="260" fill="#ffffff" stroke-width="1" stroke="#039BE5"></rect><line x1="-5" x2="0" y1="100" y2="105" stroke-width="1" stroke="#039BE5"/><line x1="255" x2="250" y1="100" y2="105" stroke-width="1" stroke="#039BE5"/>'),
  (OrgChart.templates.mila.img_0 =
    '<image preserveAspectRatio="xMidYMid slice" xlink:href="{val}" x="20" y="5"  width="64" height="64"></image>'),
  (OrgChart.templates.mila.field_0 =
    "<text " +
    OrgChart.attr.width +
    '="240" style="font-size: 18px;" fill="#039BE5" x="125" y="92" text-anchor="middle">{val}</text>'),
  (OrgChart.templates.mila.nodeMenuButton =
    '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,110)" ' +
    OrgChart.attr.control_node_menu_id +
    '="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="7" cy="0" r="2" fill="#ffffff"></circle><circle cx="14" cy="0" r="2" fill="#ffffff"></circle></g>'),
  (OrgChart.templates.diva = Object.assign({}, OrgChart.templates.ana)),
  (OrgChart.templates.diva.size = [200, 170]),
  (OrgChart.templates.diva.node =
    '<rect x="0" y="80" height="90" width="200" fill="#039BE5"></rect><circle cx="100" cy="50" fill="#ffffff" r="50" stroke="#039BE5" stroke-width="2"></circle>'),
  (OrgChart.templates.diva.img_0 =
    '<clipPath id="{randId}"><circle cx="100" cy="50" r="45"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="50" y="0"  width="100" height="100"></image>'),
  (OrgChart.templates.diva.field_0 =
    "<text " +
    OrgChart.attr.width +
    '="185" style="font-size: 18px;" fill="#ffffff" x="100" y="125" text-anchor="middle">{val}</text>'),
  (OrgChart.templates.diva.field_1 =
    "<text " +
    OrgChart.attr.width +
    '="185" style="font-size: 14px;" fill="#ffffff" x="100" y="145" text-anchor="middle">{val}</text>'),
  (OrgChart.templates.diva.pointer =
    '<g data-pointer="pointer" transform="matrix(0,0,0,0,100,100)"><radialGradient id="pointerGradient"><stop stop-color="#ffffff" offset="0" /><stop stop-color="#039BE5" offset="1" /></radialGradient><circle cx="16" cy="16" r="16" stroke-width="1" stroke="#acacac" fill="url(#pointerGradient)"></circle></g>'),
  (OrgChart.templates.diva.nodeMenuButton =
    '<g style="cursor:pointer;" transform="matrix(1,0,0,1,175,155)" ' +
    OrgChart.attr.control_node_menu_id +
    '="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="7" cy="0" r="2" fill="#ffffff"></circle><circle cx="14" cy="0" r="2" fill="#ffffff"></circle></g>'),
  (OrgChart.templates.luba = Object.assign({}, OrgChart.templates.ana)),
  (OrgChart.templates.luba.svg =
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:block;background-color: #2E2E2E;" width="{w}" height="{h}" viewBox="{viewBox}">{content}</svg>'),
  (OrgChart.templates.luba.defs =
    '<linearGradient id="{randId}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#646464;stop-opacity:1" /><stop offset="100%" style="stop-color:#363636;stop-opacity:1" /></linearGradient>'),
  (OrgChart.templates.luba.node =
    '<rect fill="url(#{randId})" x="0" y="0" height="120" width="250" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>'),
  (OrgChart.templates.luba.img_0 =
    '<clipPath id="{randId}"><circle cx="50" cy="25" r="40"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="10" y="-15"  width="80" height="80"></image>'),
  (OrgChart.templates.luba.nodeMenuButton =
    '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,105)" ' +
    OrgChart.attr.control_node_menu_id +
    '="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#aeaeae"></circle><circle cx="7" cy="0" r="2" fill="#aeaeae"></circle><circle cx="14" cy="0" r="2" fill="#aeaeae"></circle></g>'),
  (OrgChart.templates.luba.field_0 =
    "<text " +
    OrgChart.attr.width +
    '="235" style="font-size: 18px;" fill="#aeaeae" x="125" y="90" text-anchor="middle">{val}</text>'),
  (OrgChart.templates.luba.field_1 =
    "<text " +
    OrgChart.attr.width +
    '="140" style="font-size: 14px;" fill="#aeaeae" x="240" y="30" text-anchor="end">{val}</text>'),
  (OrgChart.templates.luba.plus =
    '<rect x="0" y="0" width="36" height="36" rx="12" ry="12" fill="#2E2E2E" stroke="#aeaeae" stroke-width="1"></rect><line x1="4" y1="18" x2="32" y2="18" stroke-width="1" stroke="#aeaeae"></line><line x1="18" y1="4" x2="18" y2="32" stroke-width="1" stroke="#aeaeae"></line>'),
  (OrgChart.templates.luba.minus =
    '<rect x="0" y="0" width="36" height="36" rx="12" ry="12" fill="#2E2E2E" stroke="#aeaeae" stroke-width="1"></rect><line x1="4" y1="18" x2="32" y2="18" stroke-width="1" stroke="#aeaeae"></line>'),
  (OrgChart.templates.luba.expandCollapseSize = 36),
  (OrgChart.templates.isla = Object.assign({}, OrgChart.templates.ana)),
  (OrgChart.templates.isla.defs =
    '<filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="isla-shadow"><feOffset dx="0" dy="4" in="SourceAlpha" result="shadowOffsetOuter1" /><feGaussianBlur stdDeviation="10" in="shadowOffsetOuter1" result="shadowBlurOuter1" /><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.2 0" in="shadowBlurOuter1" type="matrix" result="shadowMatrixOuter1" /><feMerge><feMergeNode in="shadowMatrixOuter1" /><feMergeNode in="SourceGraphic" /></feMerge></filter>'),
  (OrgChart.templates.isla.size = [180, 120]),
  (OrgChart.templates.isla.node =
    '<rect filter="url(#isla-shadow)" x="0" y="20" rx="7" ry="7" height="100" width="180" fill="#FFF" stroke-width="1" stroke="#039BE5" ></rect><rect x="25" y="75" rx="10" ry="10" height="20" width="130" fill="#039BE5" stroke-width="3" stroke="#039BE5"></rect><rect fill="#ffffff" stroke="#039BE5" stroke-width="1" x="70" y="0" rx="13" ry="13" width="40" height="40"></rect><circle stroke="#FFCA28" stroke-width="3" fill="none" cx="90" cy="12" r="8"></circle><path d="M75,34 C75,17 105,17 105,34" stroke="#FFCA28" stroke-width="3" fill="none"></path>'),
  (OrgChart.templates.isla.field_0 =
    "<text " +
    OrgChart.attr.width +
    '="120" style="font-size: 12px;" fill="#fff" x="90" y="90" text-anchor="middle">{val}</text>'),
  (OrgChart.templates.isla.field_1 =
    "<text " +
    OrgChart.attr.width +
    '="160" style="font-size: 13px;" fill="#039BE5" x="90" y="64" text-anchor="middle">{val}</text>'),
  (OrgChart.templates.isla.img_0 =
    '<clipPath id="{randId}"><rect filter="url(#isla-shadow)" fill="#ffffff" stroke="#039BE5" stroke-width="1" x="70" y="0" rx="13" ry="13" width="40" height="40"></rect></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="70" y="0"  width="40" height="40"></image>'),
  (OrgChart.templates.isla.minus =
    '<circle cx="15" cy="15" r="15" fill="#F57C00" stroke="#F57C00" stroke-width="1"></circle><line x1="8" y1="15" x2="22" y2="15" stroke-width="1" stroke="#ffffff"></line>'),
  (OrgChart.templates.isla.plus =
    '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#039BE5" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#039BE5"></line><line x1="15" y1="4" x2="15" y2="26" stroke-width="1" stroke="#039BE5"></line>'),
  (OrgChart.templates.isla.nodeMenuButton =
    '<g style="cursor:pointer;" transform="matrix(1,0,0,1,83,45)" ' +
    OrgChart.attr.control_node_menu_id +
    '="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#F57C00"></circle><circle cx="7" cy="0" r="2" fill="#F57C00"></circle><circle cx="14" cy="0" r="2" fill="#F57C00"></circle></g>'),
  (OrgChart.templates.isla.ripple = {
    radius: 0,
    color: "#F57C00",
    rect: { x: 0, y: 20, width: 180, height: 100 },
  }),
  (OrgChart.templates.deborah = Object.assign({}, OrgChart.templates.polina)),
  (OrgChart.templates.deborah.size = [150, 150]),
  (OrgChart.templates.deborah.node =
    '<rect x="0" y="0" height="150" width="150" fill="#039BE5" stroke-width="1" stroke="#686868" rx="15" ry="15"></rect>'),
  (OrgChart.templates.deborah.img_0 =
    '<clipPath id="{randId}"><rect fill="#ffffff" stroke="#039BE5" stroke-width="1" x="5" y="5" rx="15" ry="15" width="140" height="140"></rect></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="5" y="5"  width="140" height="140"></image><rect x="3" y="5" height="30" width="144" fill="#039BE5" opacity="0.5" rx="3" ry="3"></rect><rect x="3" y="115" height="30" width="144" fill="#039BE5" opacity="0.5" rx="3" ry="3"></rect>'),
  (OrgChart.templates.deborah.field_0 =
    "<text " +
    OrgChart.attr.width +
    '="125" ' +
    OrgChart.attr.text_overflow +
    '="ellipsis" style="font-size: 18px;" fill="#ffffff" x="15" y="25" text-anchor="start">{val}</text>'),
  (OrgChart.templates.deborah.field_1 =
    "<text " +
    OrgChart.attr.width +
    '="105" ' +
    OrgChart.attr.text_overflow +
    '="ellipsis" style="font-size: 11px;" fill="#ffffff" x="15" y="135" text-anchor="start">{val}</text>'),
  (OrgChart.templates.deborah.nodeMenuButton =
    '<g style="cursor:pointer;" transform="matrix(1,0,0,1,125,130)" ' +
    OrgChart.attr.control_node_menu_id +
    '="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="7" cy="0" r="2" fill="#ffffff"></circle><circle cx="14" cy="0" r="2" fill="#ffffff"></circle></g>'),
  (OrgChart.templates.subLevel = Object.assign({}, OrgChart.templates.base)),
  (OrgChart.templates.subLevel.size = [0, 0]),
  (OrgChart.templates.subLevel.node = ""),
  (OrgChart.templates.subLevel.plus = ""),
  (OrgChart.templates.subLevel.minus = ""),
  (OrgChart.templates.subLevel.nodeMenuButton = ""),
  (OrgChart.templates.group_dotted_lines = Object.assign(
    {},
    OrgChart.templates.group
  )),
  (OrgChart.templates.group_dotted_lines.size = [250, 120]),
  (OrgChart.templates.group_dotted_lines.link =
    '<path stroke-linejoin="round" stroke="#aeaeae" stroke-width="1px" fill="none" d="{rounded}" />'),
  (OrgChart.templates.group_dotted_lines.node =
    '<rect rx="5" ry="5" x="0" y="0" height="{h}" width="{w}" fill="#e5e5e5" stroke-width="0"></rect>'),
  (OrgChart.templates.group_dotted_lines.nodeGroupDottedCloseButton =
    '<g transform="matrix(1,0,0,1,{ew},0)"><circle cx="0.5" cy="21.5" r="12" fill="#F57C00"></circle>' +
    OrgChart.icon.close(25, 25, "#fff", -13, 8) +
    "</g>"),
  (OrgChart.templates.group_dotted_lines.field_0 =
    '<text data-width="230" style="font-size: 18px;" fill="#F57C00" x="20" y="30" text-anchor="start">Dotted Lines</text>'),
  (OrgChart.templates.group_dotted_lines.field_1 = ""),
  (OrgChart.templates.group_dotted_lines.img_0 = ""),
  (OrgChart.templates.group_dotted_lines.ripple.radius = 5),
  (OrgChart.templates.group_dotted_lines.min = Object.assign(
    {},
    OrgChart.templates.olivia
  )),
  (OrgChart.templates.group_dotted_lines.min.nodeGroupDottedOpenButton =
    '<g transform="matrix(1,0,0,1,220,10)"><rect x="0" y="0" width="22" height="22" stroke="#aeaeae" stroke-width="1" fill="#ffffff" rx="5" ry="5"></rect><text x="11" y="16" text-anchor="middle" style="font-size: 14px;" fill="#2A292E">{children-total-count}</text><rect x="0" y="0" width="22" height="22" style="opacity: 0" stroke="#aeaeae" stroke-width="1" fill="red" rx="5" ry="5"></rect></g>'),
  (OrgChart.ui = {
    _defsIds: {},
    defs: function (t) {
      var e = "";
      for (var r in OrgChart.templates) {
        var i = OrgChart.templates[r];
        i.defs &&
          ((OrgChart.ui._defsIds[r] = OrgChart.randomId()),
          (e += i.defs.replaceAll("{randId}", OrgChart.ui._defsIds[r])));
      }
      return "<defs>" + e + t + "</defs>";
    },
    lonely: function (t) {
      return t.nodes && t.nodes.length
        ? ""
        : OrgChart.IT_IS_LONELY_HERE.replace(
            "{link}",
            OrgChart.RES.IT_IS_LONELY_HERE_LINK
          );
    },
    pointer: function (t, e, r) {
      return e === OrgChart.action.exporting
        ? ""
        : OrgChart.t(t.template, !1, r).pointer;
    },
    node: function (t, e, r, i, a, n, o, l, s, h) {
      var d = OrgChart.t(t.templateName, t.min, s),
        c = d.node.replaceAll("{w}", t.w).replaceAll("{h}", t.h);
      d.defs &&
        (c = c.replaceAll("{randId}", OrgChart.ui._defsIds[t.templateName])),
        null == o && (o = i.nodeBinding);
      var g = { node: t, data: e };
      for (var p in o) {
        var u,
          f = o[p];
        e && (u = e[f]);
        var m = OrgChart._lblIsImg(i, p);
        if (
          ((g.value = u),
          (g.element = d[p]),
          (g.name = f),
          (g.field = p),
          !1 !== OrgChart.events.publish("field", [h, g]) &&
            null != g.value &&
            null != g.value &&
            null != g.element &&
            (!m || (m && !OrgChart.isNEU(g.value))))
        ) {
          if (!m && "string" == typeof g.value) {
            var C = g.element;
            C &&
              (C = C.replaceAll(
                "{ew}",
                t.w - (t.padding ? t.padding[1] : 0)
              ).replaceAll("{cw}", t.w / 2)),
              (g.value = OrgChart.wrapText(g.value, C));
          }
          var O = g.element.replace("{val}", g.value);
          c += O = O.replaceAll("{ew}", t.w - (t.padding ? t.padding[1] : 0))
            .replaceAll("{cw}", t.w / 2)
            .replaceAll("{randId}", OrgChart.randomId())
            .replaceAll("{randId2}", OrgChart.randomId());
        }
      }
      var b = OrgChart._getPosition(r, t, a, n),
        v = "node";
      Array.isArray(t.tags) && t.tags.length && (v += " " + t.tags.join(" ")),
        t.layout && (v += " tree-layout");
      var y = "";
      t.lcn && (y = 'lcn="' + t.lcn + '"');
      var x = OrgChart.nodeOpenTag
          .replace("{lcn}", y)
          .replace("{id}", t.id)
          .replace("{class}", v)
          .replace("{sl}", t.sl)
          .replace("{level}", t.level)
          .replace("{x}", b.x)
          .replace("{y}", b.y),
        _ = OrgChart._getOpacity(r, t);
      return (c =
        (x = x.replace("{opacity}", _)) +
        (c += OrgChart.ui.nodeBtns(i, t, l, d, h)) +
        OrgChart.grCloseTag);
    },
    nodeBtns: function (t, e, r, i, a) {
      var n = "";
      return (
        null == t.nodeMenu ||
          e.isSplit ||
          r === OrgChart.action.exporting ||
          (n += i.nodeMenuButton
            .replace("{id}", e.id)
            .replace("{cw}", e.w / 2)
            .replace("{ch}", e.h / 2)
            .replace("{ew}", e.w - (e.padding ? e.padding[1] : 0))
            .replace("{eh}", e.h - (e.padding ? e.padding[2] : 0))),
        null == t.nodeCircleMenu ||
          e.isSplit ||
          r === OrgChart.action.exporting ||
          OrgChart.isNEU(i.nodeCircleMenuButton) ||
          (n +=
            '<g style="cursor:pointer;" transform="matrix(1,0,0,1,' +
            i.nodeCircleMenuButton.x +
            "," +
            i.nodeCircleMenuButton.y +
            ')" ' +
            OrgChart.attr.control_node_circle_menu_id +
            '="' +
            e.id +
            '"><circle cx="0" cy="0" fill="' +
            i.nodeCircleMenuButton.color +
            '" r="' +
            i.nodeCircleMenuButton.radius +
            '" stroke-width="1" stroke="' +
            i.nodeCircleMenuButton.stroke +
            '"></circle><line x1="-' +
            i.nodeCircleMenuButton.radius / 2 +
            '" y1="-6" x2="' +
            i.nodeCircleMenuButton.radius / 2 +
            '" y2="-6" stroke-width="2" stroke="' +
            i.nodeCircleMenuButton.stroke +
            '"></line><line x1="-' +
            i.nodeCircleMenuButton.radius / 2 +
            '" y1="0" x2="' +
            i.nodeCircleMenuButton.radius / 2 +
            '" y2="0" stroke-width="2" stroke="' +
            i.nodeCircleMenuButton.stroke +
            '"></line><line x1="-' +
            i.nodeCircleMenuButton.radius / 2 +
            '" y1="6" x2="' +
            i.nodeCircleMenuButton.radius / 2 +
            '" y2="6" stroke-width="2" stroke="' +
            i.nodeCircleMenuButton.stroke +
            '"></line></g>'),
        n
      );
    },
    expandCollapseBtn: function (t, e, r, i, a) {
      var n = "";
      if (i !== OrgChart.action.exporting && !e.isSplit) {
        var o = r[e.lcn ? e.lcn : "base"],
          l = 0,
          s = 0,
          h = OrgChart.t(e.templateName, e.min, a);
        if (e.childrenIds.length > 0) {
          if (e.hasPartners) {
            for (var d = !1, c = 0; c < e.childrenIds.length; c++) {
              var g = t.getNode(e.childrenIds[c]);
              !g || g.parentPartner || g.isPartner || (d = !0);
            }
            if (!d) return "";
          }
          switch (o.orientation) {
            case OrgChart.orientation.top:
            case OrgChart.orientation.top_left:
              (l = e.x + e.w / 2), (s = e.y + e.h);
              break;
            case OrgChart.orientation.bottom:
            case OrgChart.orientation.bottom_left:
              (l = e.x + e.w / 2), (s = e.y);
              break;
            case OrgChart.orientation.right:
            case OrgChart.orientation.right_top:
              (l = e.x), (s = e.y + e.h / 2);
              break;
            case OrgChart.orientation.left:
            case OrgChart.orientation.left_top:
              (l = e.x + e.w), (s = e.y + e.h / 2);
          }
          if (
            ((l -= h.expandCollapseSize / 2),
            (s -= h.expandCollapseSize / 2),
            t.getCollapsedIds(e).length
              ? ((n += OrgChart.expcollOpenTag
                  .replace("{id}", e.id)
                  .replace("{x}", l)
                  .replace("{y}", s)),
                (n += h.plus),
                (n += OrgChart.grCloseTag))
              : ((n += OrgChart.expcollOpenTag
                  .replace("{id}", e.id)
                  .replace("{x}", l)
                  .replace("{y}", s)),
                (n += h.minus),
                (n += OrgChart.grCloseTag)),
            -1 != n.indexOf("{collapsed-children-count}"))
          ) {
            var p = OrgChart.collapsedChildrenCount(t, e);
            n = n.replace("{collapsed-children-count}", p);
          }
          if (-1 != n.indexOf("{collapsed-children-total-count}")) {
            var u = OrgChart.collapsedChildrenTotalCount(t, e);
            n = n.replace("{collapsed-children-total-count}", u);
          }
          if (-1 != n.indexOf("{children-count}")) {
            var f = OrgChart.childrenCount(t, e);
            n = n.replace("{children-count}", f);
          }
          if (-1 != n.indexOf("{children-total-count}")) {
            var m = OrgChart.childrenTotalCount(t, e);
            n = n.replace("{children-total-count}", m);
          }
        }
        t._nodeHasHiddenParent(e) &&
          ((n += OrgChart.upOpenTag
            .replace("{id}", e.id)
            .replace("{x}", e.x)
            .replace("{y}", e.y)),
          (n += h.up),
          (n += OrgChart.grCloseTag));
      }
      var C = { html: n, node: e };
      return OrgChart.events.publish("renderbuttons", [t, C]), C.html;
    },
    link: function (t, e, r, i, a, n, o) {
      var l = t.lcn ? t.lcn : "base",
        s = e._layoutConfigs[l],
        h = OrgChart.t(t.templateName, t.min, r),
        d = [],
        c = [],
        g = s.levelSeparation / 2;
      t.layout > 0 && (g = s.mixedHierarchyNodesSeparation / 2);
      var p = 0,
        u = OrgChart.getRootOf(t).id,
        f = i[u][t.sl],
        m = void 0;
      if (t.hasPartners) {
        m = {
          ids: [],
          indexes: {},
          ppnodes: {},
          lastLeft: null,
          firstRight: null,
          maxSidePartnersWithChildren: 0,
          rightIds: [],
          leftIds: [],
          partnerChildrenSplitSeparation:
            e.config.partnerChildrenSplitSeparation,
        };
        for (var C = 0; C < t.children.length; C++) {
          (b = t.children[C]).parentPartner
            ? ((m.ppnodes[b.id] = b.parentPartner),
              m.ids.push(b.id),
              1 == b.parentPartner.isPartner
                ? (-1 == m.rightIds.indexOf(b.parentPartner.id) &&
                    m.rightIds.push(b.parentPartner.id),
                  (m.indexes[b.id] = m.rightIds.indexOf(b.parentPartner.id)),
                  m.firstRight || (m.firstRight = b))
                : 2 == b.parentPartner.isPartner &&
                  (-1 == m.leftIds.indexOf(b.parentPartner.id) &&
                    m.leftIds.push(b.parentPartner.id),
                  (m.indexes[b.id] = m.leftIds.indexOf(b.parentPartner.id)),
                  (m.lastLeft = b)))
            : b.isPartner ||
              ((m.lastLeft = b), m.firstRight || (m.firstRight = b));
        }
        (m.maxSidePartnersWithChildren = Math.max(
          m.leftIds.length,
          m.rightIds.length
        )),
          (p =
            0 == m.maxSidePartnersWithChildren
              ? e.config.minPartnerSeparation / 2
              : e.config.minPartnerSeparation / 2 +
                m.partnerChildrenSplitSeparation *
                  m.maxSidePartnersWithChildren +
                m.partnerChildrenSplitSeparation / 2);
      }
      for (C = 0; C < t.children.length; C++) {
        var O,
          b = t.children[C],
          v = i[u][b.sl],
          y = {
            xa: 0,
            ya: 0,
            xb: 0,
            yb: 0,
            xc: 0,
            yc: 0,
            xd: 0,
            yd: 0,
            x: 0,
            y: 0,
            rotate: 0,
          },
          x = (h = OrgChart.t(b.templateName, b.min, r)).link;
        if (b.isChildOfPartner)
          switch (s.orientation) {
            case OrgChart.orientation.top:
            case OrgChart.orientation.top_left:
              var _ = 1 == b.layout ? void 0 : v.minY - (v.minY - f.maxY) / 2;
              y = OrgChart.ui._linkTopToBottom(b.parentPartner, b, h, g, _);
              break;
            case OrgChart.orientation.bottom:
            case OrgChart.orientation.bottom_left:
              _ = 1 == b.layout ? void 0 : v.maxY - (v.maxY - f.minY) / 2;
              y = OrgChart.ui._linkBottomToTop(b.parentPartner, b, h, g, _);
              break;
            case OrgChart.orientation.right:
            case OrgChart.orientation.right_top:
              _ = 1 == b.layout ? void 0 : v.maxX - (v.maxX - f.minX) / 2;
              y = OrgChart.ui._linkRightToLeft(b.parentPartner, b, h, g, _);
              break;
            case OrgChart.orientation.left:
            case OrgChart.orientation.left_top:
              _ = 1 == b.layout ? void 0 : v.minX - (v.minX - f.maxX) / 2;
              y = OrgChart.ui._linkLeftToRight(b.parentPartner, b, h, g, _);
          }
        else if (m && -1 != m.ids.indexOf(b.id))
          switch (s.orientation) {
            case OrgChart.orientation.top:
            case OrgChart.orientation.top_left:
              y = OrgChart.ui._linkPpTop(m, t, b, v, f, h);
              break;
            case OrgChart.orientation.bottom:
            case OrgChart.orientation.bottom_left:
              y = OrgChart.ui._linkPpBottom(m, t, b, v, f, h);
              break;
            case OrgChart.orientation.right:
            case OrgChart.orientation.right_top:
              y = OrgChart.ui._linkPpRight(m, t, b, v, f, h);
              break;
            case OrgChart.orientation.left:
            case OrgChart.orientation.left_top:
              y = OrgChart.ui._linkPpLeft(m, t, b, v, f, h);
          }
        else {
          var w =
              b.isAssistant &&
              b.rightNeighbor &&
              b.rightNeighbor.isAssistant &&
              b.parent == b.rightNeighbor.parent,
            k =
              b.isAssistant &&
              b.leftNeighbor &&
              b.leftNeighbor.isAssistant &&
              b.parent == b.leftNeighbor.parent;
          if ((w || b.layout > 1) && b.rightNeighbor && b.rightNeighbor.isSplit)
            switch (s.orientation) {
              case OrgChart.orientation.top:
              case OrgChart.orientation.top_left:
              case OrgChart.orientation.bottom:
              case OrgChart.orientation.bottom_left:
                y = OrgChart.ui._linkRightToLeft(b.rightNeighbor, b, h, g);
                break;
              case OrgChart.orientation.right:
              case OrgChart.orientation.right_top:
              case OrgChart.orientation.left:
              case OrgChart.orientation.left_top:
                y = OrgChart.ui._linkBottomToTop(b.rightNeighbor, b, h, g);
            }
          else if (
            (k || b.layout > 1) &&
            b.leftNeighbor &&
            b.leftNeighbor.isSplit
          )
            switch (s.orientation) {
              case OrgChart.orientation.top:
              case OrgChart.orientation.top_left:
              case OrgChart.orientation.bottom:
              case OrgChart.orientation.bottom_left:
                y = OrgChart.ui._linkLeftToRight(b.leftNeighbor, b, h, g);
                break;
              case OrgChart.orientation.right:
              case OrgChart.orientation.right_top:
              case OrgChart.orientation.left:
              case OrgChart.orientation.left_top:
                y = OrgChart.ui._linkTopToBottom(b.leftNeighbor, b, h, g);
            }
          else
            switch (s.orientation) {
              case OrgChart.orientation.top:
              case OrgChart.orientation.top_left:
                if (1 == b.isPartner)
                  y = OrgChart.ui._linkLeftToRight(t, b, h, p);
                else if (2 == b.isPartner)
                  y = OrgChart.ui._linkRightToLeft(t, b, h, p);
                else {
                  _ = 1 == b.layout ? void 0 : v.minY - (v.minY - f.maxY) / 2;
                  y = OrgChart.ui._linkTopToBottom(t, b, h, g, _);
                }
                break;
              case OrgChart.orientation.bottom:
              case OrgChart.orientation.bottom_left:
                if (1 == b.isPartner)
                  y = OrgChart.ui._linkLeftToRight(t, b, h, p);
                else if (2 == b.isPartner)
                  y = OrgChart.ui._linkRightToLeft(t, b, h, p);
                else {
                  _ = 1 == b.layout ? void 0 : v.maxY - (v.maxY - f.minY) / 2;
                  y = OrgChart.ui._linkBottomToTop(t, b, h, g, _);
                }
                break;
              case OrgChart.orientation.right:
              case OrgChart.orientation.right_top:
                if (1 == b.isPartner)
                  y = OrgChart.ui._linkTopToBottom(t, b, h, p);
                else if (2 == b.isPartner)
                  y = OrgChart.ui._linkBottomToTop(t, b, h, p);
                else {
                  _ = 1 == b.layout ? void 0 : v.maxX - (v.maxX - f.minX) / 2;
                  y = OrgChart.ui._linkRightToLeft(t, b, h, g, _);
                }
                break;
              case OrgChart.orientation.left:
              case OrgChart.orientation.left_top:
                if (1 == b.isPartner)
                  y = OrgChart.ui._linkTopToBottom(t, b, h, p);
                else if (2 == b.isPartner)
                  y = OrgChart.ui._linkBottomToTop(t, b, h, p);
                else {
                  _ = 1 == b.layout ? void 0 : v.minX - (v.minX - f.maxX) / 2;
                  y = OrgChart.ui._linkLeftToRight(t, b, h, g, _);
                }
            }
        }
        var S = OrgChart.ui._draggableLinkPath(e, t, b, y, g, s.orientation);
        if (S)
          (O = S),
            (x = x
              .replaceAll("{rounded}", S)
              .replaceAll("{edge}", S)
              .replaceAll("{curve}", O));
        else if (-1 != x.indexOf("{rounded}"))
          if (
            (y.xa == y.xb && y.xa == y.xc && y.xa == y.xd) ||
            (y.ya == y.yb && y.ya == y.yc && y.ya == y.yd)
          )
            (O = "M" + y.xa + "," + y.ya + " L" + y.xd + "," + y.yd),
              (x = x.replaceAll("{rounded}", O));
          else if (
            Math.abs(y.xa - y.xd) <= OrgChart.LINK_ROUNDED_CORNERS &&
            Math.abs(y.xa - y.xc) <= OrgChart.LINK_ROUNDED_CORNERS &&
            Math.abs(y.xa - y.xb) <= OrgChart.LINK_ROUNDED_CORNERS
          )
            (O = "M" + y.xa + "," + y.ya + " L" + y.xa + "," + y.yd),
              (x = x.replaceAll("{rounded}", O));
          else if (
            Math.abs(y.ya - y.yd) <= OrgChart.LINK_ROUNDED_CORNERS &&
            Math.abs(y.ya - y.yc) <= OrgChart.LINK_ROUNDED_CORNERS &&
            Math.abs(y.ya - y.yb) <= OrgChart.LINK_ROUNDED_CORNERS
          )
            (O = "M" + y.xa + "," + y.ya + " L" + y.xd + "," + y.ya),
              (x = x.replaceAll("{rounded}", O));
          else {
            var I = OrgChart.ui._roundedEdge(
                y.xa,
                y.ya,
                y.xb,
                y.yb,
                y.xc,
                y.yc
              ),
              A = OrgChart.ui._roundedEdge(y.xb, y.yb, y.xc, y.yc, y.xd, y.yd);
            (O =
              "M" +
              I.x1 +
              "," +
              I.y1 +
              " " +
              I.x2 +
              "," +
              I.y2 +
              " Q" +
              I.qx1 +
              "," +
              I.qy1 +
              " " +
              I.qx2 +
              "," +
              I.qy2 +
              " L" +
              A.x2 +
              "," +
              A.y2 +
              " Q" +
              A.qx1 +
              "," +
              A.qy1 +
              " " +
              A.qx2 +
              "," +
              A.qy2 +
              " L" +
              A.x3 +
              "," +
              A.y3),
              (x = x.replaceAll("{rounded}", O));
          }
        else
          -1 != x.indexOf("{edge}")
            ? ((O =
                "M" +
                y.xa +
                "," +
                y.ya +
                " " +
                y.xb +
                "," +
                y.yb +
                " " +
                y.xc +
                "," +
                y.yc +
                " L" +
                y.xd +
                "," +
                y.yd),
              (x = x.replaceAll("{edge}", O)))
            : -1 != x.indexOf("{curve}")
            ? ((O =
                "M" +
                y.xa +
                "," +
                y.ya +
                " C" +
                y.xb +
                "," +
                y.yb +
                " " +
                y.xc +
                "," +
                y.yc +
                " " +
                y.xd +
                "," +
                y.yd),
              (x = x.replaceAll("{curve}", O)))
            : ((O = x
                .replaceAll("{xa}", y.xa)
                .replaceAll("{ya}", y.ya)
                .replaceAll("{xb}", y.xb)
                .replaceAll("{yb}", y.yb)
                .replaceAll("{xc}", y.xc)
                .replaceAll("{yc}", y.yc)
                .replaceAll("{xd}", y.xd)
                .replaceAll("{yd}", y.yd)),
              (x = O));
        d.push(
          OrgChart.linkOpenTag
            .replaceAll("{id}", t.id)
            .replaceAll("{class}", "link " + b.tags.join(" "))
            .replaceAll("{child-id}", b.id)
        );
        var L = { node: t, cnode: b, p: y, html: x, action: n };
        OrgChart.events.publish("render-link", [e, L]),
          d.push(L.html),
          o && c.push({ id: t.id, childId: b.id, html: L.html });
        var N = "";
        for (var E in e.config.linkBinding) {
          var M = e.config.linkBinding[E],
            T = e._get(b.id);
          if (T) {
            var B = T[M];
            (L.value = B),
              (L.element = h[E]),
              (L.name = M),
              !1 !== OrgChart.events.publish("label", [e, L]) &&
                (OrgChart.isNEU(L.value) ||
                  OrgChart.isNEU(L.element) ||
                  (N += L.element.replace("{val}", L.value)));
          }
        }
        if ("" != N) {
          var U = y.x,
            R = y.y;
          null != b.movey && (R += b.movey),
            (N =
              OrgChart.linkFieldsOpenTag
                .replace("{x}", U)
                .replace("{y}", R)
                .replace("{rotate}", 0) +
              N +
              OrgChart.grCloseTag),
            d.push(N);
        }
        d.push(OrgChart.grCloseTag);
      }
      return o ? c : d.join("");
    },
    svg: function (t, e, r, i, a, n) {
      return OrgChart.t(i.template, !1, n)
        .svg.replace("{w}", t)
        .replace("{h}", e)
        .replace("{viewBox}", r)
        .replace("{randId}", OrgChart.ui._defsIds[i.template])
        .replace("{mode}", i.mode)
        .replace("{template}", i.template)
        .replace("{content}", function () {
          return a;
        });
    },
    menuButton: function (t) {
      return null == t.menu
        ? ""
        : OrgChart.t(t.template, !1).menuButton.replaceAll("{p}", t.padding);
    },
    _roundedEdge: function (t, e, r, i, a, n) {
      var o,
        l,
        s,
        h = OrgChart.LINK_ROUNDED_CORNERS,
        d = 0;
      return (
        (t == r && t == a) || (e == i && e == n)
          ? ((o = s = r), (l = d = i))
          : (t != a &&
              r == a &&
              ((o = s = r),
              (l = i),
              e < n ? (d = i + h) : e > n && (d = i - h)),
            t < a && r == a ? (r -= h) : t > a && r == a && (r += h),
            e != n &&
              i == n &&
              ((o = r),
              (l = d = i),
              t < a ? (s = r + h) : t > a && (s = r - h)),
            e < n && i == n ? (i -= h) : e > n && i == n && (i += h)),
        {
          x1: t,
          y1: e,
          x2: r,
          y2: i,
          x3: a,
          y3: n,
          qx1: o,
          qy1: l,
          qx2: s,
          qy2: d,
        }
      );
    },
    _linkTopToBottom: function (t, e, r, i, a) {
      var n,
        o,
        l,
        s,
        h,
        d = 0;
      return (
        (n = t.x + t.w / 2 + r.linkAdjuster.toX),
        (o = t.y + t.h + r.linkAdjuster.toY),
        (s = l = e.x + e.w / 2 + r.linkAdjuster.fromX),
        (h = e.y + r.linkAdjuster.fromY),
        {
          xa: n,
          ya: o,
          xb: n,
          yb: (d =
            t.rightNeighbor &&
            t.rightNeighbor.isAssistant &&
            "split" == e.templateName
              ? t.rightNeighbor.y + t.rightNeighbor.h + i
              : "split" == t.templateName && (e.isAssistant || e.layout > 1)
              ? h
              : "split" == e.templateName
              ? o + i
              : null != a
              ? a
              : h - i),
          xc: l,
          yc: d,
          xd: s,
          yd: h,
          x: l,
          y: OrgChart.isNEU(e.parentPartner) ? d + 16 : d,
          rotate: 0,
        }
      );
    },
    _linkBottomToTop: function (t, e, r, i, a) {
      var n,
        o,
        l,
        s,
        h,
        d = 0;
      return (
        (n = t.x + t.w / 2 + r.linkAdjuster.toX),
        (o = t.y + r.linkAdjuster.toY),
        (s = l = e.x + e.w / 2 + r.linkAdjuster.fromX),
        (h = e.y + e.h + r.linkAdjuster.fromY),
        {
          xa: n,
          ya: o,
          xb: n,
          yb: (d =
            t.rightNeighbor &&
            t.rightNeighbor.isAssistant &&
            "split" == e.templateName
              ? t.rightNeighbor.y - i
              : "split" == t.templateName && (e.isAssistant || e.layout > 1)
              ? h
              : "split" == e.templateName
              ? o - i
              : null != a
              ? a
              : h + i),
          xc: l,
          yc: d,
          xd: s,
          yd: h,
          x: l,
          y: d - 14,
          rotate: 0,
        }
      );
    },
    _linkRightToLeft: function (t, e, r, i, a) {
      var n,
        o,
        l,
        s,
        h,
        d,
        c = 0;
      return (
        (n = t.x + r.linkAdjuster.toX),
        (o = t.y + t.h / 2 + r.linkAdjuster.toY),
        (h = e.x + e.w + r.linkAdjuster.fromX),
        (d = s = e.y + e.h / 2 + r.linkAdjuster.fromY),
        (l = o),
        90,
        {
          xa: n,
          ya: o,
          xb: (c =
            t.rightNeighbor &&
            t.rightNeighbor.isAssistant &&
            "split" == e.templateName
              ? t.rightNeighbor.x - i
              : "split" == t.templateName && (e.isAssistant || e.layout > 1)
              ? h
              : "split" == e.templateName
              ? n - i
              : null != a
              ? a
              : h + i),
          yb: l,
          xc: c,
          yc: s,
          xd: h,
          yd: d,
          x: c - 16,
          y: s,
          rotate: 90,
        }
      );
    },
    _linkLeftToRight: function (t, e, r, i, a) {
      var n,
        o,
        l,
        s,
        h,
        d,
        c = 0;
      return (
        (n = t.x + t.w + r.linkAdjuster.toX),
        (o = t.y + t.h / 2 + r.linkAdjuster.toY),
        (h = e.x + r.linkAdjuster.fromX),
        (d = s = e.y + e.h / 2 + r.linkAdjuster.fromY),
        (l = o),
        270,
        {
          xa: n,
          ya: o,
          xb: (c =
            t.rightNeighbor &&
            t.rightNeighbor.isAssistant &&
            "split" == e.templateName
              ? t.rightNeighbor.x + t.rightNeighbor.w + i
              : "split" == t.templateName && (e.isAssistant || e.layout > 1)
              ? h
              : "split" == e.templateName
              ? n + i
              : null != a
              ? a
              : h - i),
          yb: l,
          xc: c,
          yc: s,
          xd: h,
          yd: d,
          x: c + 14,
          y: s,
          rotate: 270,
        }
      );
    },
    _linkPpTop: function (t, e, r, i, a, n) {
      var o = t.ppnodes[r.id],
        l = o.y + o.h / 2,
        s = i.minY - (i.minY - a.maxY) / 2,
        h = (i.minY - a.maxY) / t.maxSidePartnersWithChildren / 4,
        d = OrgChart.ui.__linkPpBottomTop(t, e, r, s, h, o),
        c = d.x;
      return (
        (s = d.mid),
        OrgChart.ui._linkTopToBottom({ x: c, y: l, w: 0, h: 0 }, r, n, 0, s)
      );
    },
    _linkPpBottom: function (t, e, r, i, a, n) {
      var o = t.ppnodes[r.id],
        l = o.y + o.h / 2,
        s = i.maxY - (i.maxY - a.minY) / 2,
        h = (i.maxY - a.minY) / t.maxSidePartnersWithChildren / 4,
        d = OrgChart.ui.__linkPpBottomTop(t, e, r, s, h, o),
        c = d.x;
      return (
        (s = d.mid),
        OrgChart.ui._linkBottomToTop({ x: c, y: l, w: 0, h: 0 }, r, n, 0, s)
      );
    },
    _linkPpLeft: function (t, e, r, i, a, n) {
      var o = t.ppnodes[r.id],
        l = i.minX - (i.minX - a.maxX) / 2,
        s = (i.minX - a.maxX) / t.maxSidePartnersWithChildren / 4,
        h = o.x + o.w / 2,
        d = OrgChart.ui.__linkPpLeftRight(t, e, r, l, s, o),
        c = d.y;
      return (
        (l = d.mid),
        OrgChart.ui._linkLeftToRight({ x: h, y: c, w: 0, h: 0 }, r, n, 0, l)
      );
    },
    _linkPpRight: function (t, e, r, i, a, n) {
      var o = t.ppnodes[r.id],
        l = i.maxX - (i.maxX - a.minX) / 2,
        s = (i.maxX - a.minX) / t.maxSidePartnersWithChildren / 4,
        h = o.x + o.w / 2,
        d = OrgChart.ui.__linkPpLeftRight(t, e, r, l, s, o),
        c = d.y;
      return (
        (l = d.mid),
        OrgChart.ui._linkRightToLeft({ x: h, y: c, w: 0, h: 0 }, r, n, 0, l)
      );
    },
    __linkPpBottomTop: function (t, e, r, i, a, n) {
      var o = 0;
      return (
        1 == n.isPartner
          ? ((o =
              n.x -
              e.partnerSeparation / 2 +
              t.indexes[r.id] * t.partnerChildrenSplitSeparation -
              ((t.rightIds.length - 1) * t.partnerChildrenSplitSeparation) / 2),
            t.lastLeft && o < t.lastLeft.x + t.lastLeft.w / 2
              ? o < r.x + r.w / 2
                ? (i -= (t.indexes[r.id] + 1) * a)
                : (i -= (t.rightIds.length - t.indexes[r.id]) * a)
              : o < r.x + r.w / 2
              ? (i += (t.rightIds.length - t.indexes[r.id]) * a)
              : (i += (t.indexes[r.id] + 1) * a))
          : 2 == n.isPartner &&
            ((o =
              n.x +
              n.w +
              e.partnerSeparation / 2 +
              t.indexes[r.id] * t.partnerChildrenSplitSeparation -
              ((t.leftIds.length - 1) * t.partnerChildrenSplitSeparation) / 2),
            t.firstRight && o > t.firstRight.x + t.firstRight.w / 2
              ? o < r.x + r.w / 2
                ? (i -= (t.indexes[r.id] + 1) * a)
                : (i -= (t.leftIds.length - t.indexes[r.id]) * a)
              : o < r.x + r.w / 2
              ? (i += (t.leftIds.length - t.indexes[r.id]) * a)
              : (i += (t.indexes[r.id] + 1) * a)),
        { x: o, mid: i }
      );
    },
    __linkPpLeftRight: function (t, e, r, i, a, n) {
      var o = 0;
      return (
        1 == n.isPartner
          ? ((o =
              n.y -
              e.partnerSeparation / 2 +
              t.indexes[r.id] * t.partnerChildrenSplitSeparation -
              ((t.rightIds.length - 1) * t.partnerChildrenSplitSeparation) / 2),
            t.lastLeft && o < t.lastLeft.y + t.lastLeft.h / 2
              ? o < r.y + r.h / 2
                ? (i -= (t.indexes[r.id] + 1) * a)
                : (i -= (t.rightIds.length - t.indexes[r.id]) * a)
              : o < r.y + r.h / 2
              ? (i += (t.rightIds.length - t.indexes[r.id]) * a)
              : (i += (t.indexes[r.id] + 1) * a))
          : 2 == n.isPartner &&
            ((o =
              n.y +
              n.h +
              e.partnerSeparation / 2 +
              t.indexes[r.id] * t.partnerChildrenSplitSeparation -
              ((t.leftIds.length - 1) * t.partnerChildrenSplitSeparation) / 2),
            t.firstRight && o > t.firstRight.y + t.firstRight.h / 2
              ? o < r.y + r.h / 2
                ? (i -= (t.indexes[r.id] + 1) * a)
                : (i -= (t.leftIds.length - t.indexes[r.id]) * a)
              : o < r.y + r.h / 2
              ? (i += (t.leftIds.length - t.indexes[r.id]) * a)
              : (i += (t.indexes[r.id] + 1) * a)),
        { y: o, mid: i }
      );
    },
    _draggableLinkPath: function (t, e, r, i, a, n) {
      if (r.isPartner) return null;
      if (r.isAssistant) return null;
      if (OrgChart._isMoved(r) && !OrgChart._isMoved(e)) {
        var o = [];
        switch (n) {
          case OrgChart.orientation.top:
          case OrgChart.orientation.top_left:
            if (i.yb + a / 2 < i.yd) return null;
            (s = i.xa < i.xd ? r.x - a / 2 : r.x + r.w + a / 2),
              (h = r.y - a / 2);
            break;
          case OrgChart.orientation.bottom:
          case OrgChart.orientation.bottom_left:
            if (i.yb - a / 2 > i.yd) return null;
            (s = i.xa < i.xd ? r.x - a / 2 : r.x + r.w + a / 2),
              (h = r.y + r.h + a / 2);
            break;
          case OrgChart.orientation.right:
          case OrgChart.orientation.right_top:
            if (i.xb - a / 2 > i.xd) return null;
            (h = i.ya < i.yd ? r.y - a / 2 : r.y + r.h + a / 2),
              (s = r.x + r.w + a / 2);
            break;
          case OrgChart.orientation.left:
          case OrgChart.orientation.left_top:
            if (i.xb + a / 2 < i.xd) return null;
            (h = i.ya < i.yd ? r.y - a / 2 : r.y + r.h + a / 2),
              (s = r.x - a / 2);
        }
        switch (n) {
          case OrgChart.orientation.top:
          case OrgChart.orientation.top_left:
          case OrgChart.orientation.bottom:
          case OrgChart.orientation.bottom_left:
            o.push(["M", i.xa, i.ya]),
              o.push(["L", i.xb, i.yb]),
              o.push(["L", s, i.yb]),
              o.push(["L", s, h]),
              o.push(["L", i.xd, h]),
              o.push(["L", i.xd, i.yd]);
            break;
          case OrgChart.orientation.right:
          case OrgChart.orientation.right_top:
          case OrgChart.orientation.left:
          case OrgChart.orientation.left_top:
            (o = []).push(["M", i.xa, i.ya]),
              o.push(["L", i.xb, i.yb]),
              o.push(["L", i.xb, h]),
              o.push(["L", s, h]),
              o.push(["L", s, i.yd]),
              o.push(["L", i.xd, i.yd]);
        }
        return OrgChart.roundPathCorners(o, OrgChart.LINK_ROUNDED_CORNERS, !1);
      }
      if (!OrgChart._isMoved(r) && OrgChart._isMoved(e)) {
        var l = !1;
        o = [];
        switch (n) {
          case OrgChart.orientation.top:
          case OrgChart.orientation.top_left:
            if (i.ya + a / 2 > i.yb)
              (l = !0),
                (s = i.xa < i.xd ? e.x + e.w + a / 2 : e.x - a / 2),
                (h = e.y + e.h + a);
            else {
              if (i.yb + a / 2 < i.yd) return null;
              (s = i.xa < i.xd ? r.x - a / 2 : r.x + r.w + a / 2),
                (h = r.y - a / 2);
            }
            break;
          case OrgChart.orientation.bottom:
          case OrgChart.orientation.bottom_left:
            if (i.ya - a / 2 < i.yb)
              (l = !0),
                (s = i.xa < i.xd ? e.x + e.w + a / 2 : e.x - a / 2),
                (h = e.y - a);
            else {
              if (i.yb - a / 2 > i.yd) return null;
              (s = i.xa < i.xd ? r.x - a / 2 : r.x + r.w + a / 2),
                (h = r.y + r.h + a / 2);
            }
            break;
          case OrgChart.orientation.right:
          case OrgChart.orientation.right_top:
            if (i.xa - a / 2 < i.xb)
              (l = !0),
                (h = i.ya < i.yd ? e.y + e.h + a / 2 : e.y - a / 2),
                (s = e.x - a);
            else {
              if (i.xb - a / 2 > i.xd) return null;
              (h = i.ya < i.yd ? r.y - a / 2 : r.y + r.h + a / 2),
                (s = r.x + r.w + a / 2);
            }
            break;
          case OrgChart.orientation.left:
          case OrgChart.orientation.left_top:
            if (i.xa + a / 2 > i.xb)
              (l = !0),
                (h = i.ya < i.yd ? e.y + e.h + a / 2 : e.y - a / 2),
                (s = e.x + e.w + a);
            else {
              if (i.xb + a / 2 < i.xd) return null;
              (h = i.ya < i.yd ? r.y - a / 2 : r.y + r.h + a / 2),
                (s = r.x - a / 2);
            }
        }
        if (l)
          switch (n) {
            case OrgChart.orientation.top:
            case OrgChart.orientation.top_left:
            case OrgChart.orientation.bottom:
            case OrgChart.orientation.bottom_left:
              o.push(["M", i.xa, i.ya]),
                o.push(["L", i.xa, h]),
                o.push(["L", s, h]),
                o.push(["L", s, i.yc]),
                o.push(["L", i.xc, i.yc]),
                o.push(["L", i.xd, i.yd]);
              break;
            case OrgChart.orientation.right:
            case OrgChart.orientation.right_top:
            case OrgChart.orientation.left:
            case OrgChart.orientation.left_top:
              o.push(["M", i.xa, i.ya]),
                o.push(["L", s, i.ya]),
                o.push(["L", s, h]),
                o.push(["L", i.xc, h]),
                o.push(["L", i.xc, i.yc]),
                o.push(["L", i.xd, i.yd]);
          }
        else
          switch (n) {
            case OrgChart.orientation.top:
            case OrgChart.orientation.top_left:
            case OrgChart.orientation.bottom:
            case OrgChart.orientation.bottom_left:
              o.push(["M", i.xa, i.ya]),
                o.push(["L", i.xb, i.yb]),
                o.push(["L", s, i.yb]),
                o.push(["L", s, h]),
                o.push(["L", i.xd, h]),
                o.push(["L", i.xd, i.yd]);
              break;
            case OrgChart.orientation.right:
            case OrgChart.orientation.right_top:
            case OrgChart.orientation.left:
            case OrgChart.orientation.left_top:
              o.push(["M", i.xa, i.ya]),
                o.push(["L", i.xb, i.yb]),
                o.push(["L", i.xb, h]),
                o.push(["L", s, h]),
                o.push(["L", s, i.yd]),
                o.push(["L", i.xd, i.yd]);
          }
        return OrgChart.roundPathCorners(o, OrgChart.LINK_ROUNDED_CORNERS, !1);
      }
      if (OrgChart._isMoved(r) && OrgChart._isMoved(e)) {
        o = [];
        switch (n) {
          case OrgChart.orientation.top:
          case OrgChart.orientation.top_left:
            if (i.ya + a > i.yd) {
              var s = i.xa < i.xd ? e.x + e.w + a / 2 : e.x - a / 2,
                h = e.y + e.h + a,
                d = r.y - a;
              o.push(["M", i.xa, i.ya]),
                o.push(["L", i.xa, h]),
                o.push(["L", s, h]),
                o.push(["L", s, d]),
                o.push(["L", i.xc, d]),
                o.push(["L", i.xd, i.yd]);
            } else
              o.push(["M", i.xa, i.ya]),
                o.push(["L", i.xa, e.y + e.h + a]),
                o.push(["L", i.xc, e.y + e.h + a]),
                o.push(["L", i.xd, i.yd]);
            break;
          case OrgChart.orientation.bottom:
          case OrgChart.orientation.bottom_left:
            if (i.ya - a < i.yd) {
              (s = i.xa < i.xd ? e.x + e.w + a / 2 : e.x - a / 2),
                (h = e.y - a),
                (d = r.y + r.h + a);
              o.push(["M", i.xa, i.ya]),
                o.push(["L", i.xa, h]),
                o.push(["L", s, h]),
                o.push(["L", s, d]),
                o.push(["L", i.xc, d]),
                o.push(["L", i.xd, i.yd]);
            } else
              o.push(["M", i.xa, i.ya]),
                o.push(["L", i.xa, e.y - a]),
                o.push(["L", i.xc, e.y - a]),
                o.push(["L", i.xd, i.yd]);
            break;
          case OrgChart.orientation.right:
          case OrgChart.orientation.right_top:
            if (i.xa - a < i.xd) {
              (h = i.ya < i.yd ? e.y + e.h + a / 2 : e.y - a / 2),
                (s = e.x - a);
              var c = r.x + r.w + a;
              o.push(["M", i.xa, i.ya]),
                o.push(["L", s, i.ya]),
                o.push(["L", s, h]),
                o.push(["L", c, h]),
                o.push(["L", c, i.yc]),
                o.push(["L", i.xd, i.yd]);
            } else
              o.push(["M", i.xa, i.ya]),
                o.push(["L", e.x - a, i.ya]),
                o.push(["L", e.x - a, i.yc]),
                o.push(["L", i.xd, i.yd]);
            break;
          case OrgChart.orientation.left:
          case OrgChart.orientation.left_top:
            if (i.xa + a > i.xd) {
              (h = i.ya < i.yd ? e.y + e.h + a / 2 : e.y - a / 2),
                (s = e.x + e.w + a),
                (c = r.x - a);
              o.push(["M", i.xa, i.ya]),
                o.push(["L", s, i.ya]),
                o.push(["L", s, h]),
                o.push(["L", c, h]),
                o.push(["L", c, i.yc]),
                o.push(["L", i.xd, i.yd]);
            } else
              o.push(["M", i.xa, i.ya]),
                o.push(["L", e.x + e.w + a, i.ya]),
                o.push(["L", e.x + e.w + a, i.yc]),
                o.push(["L", i.xd, i.yd]);
        }
        return OrgChart.roundPathCorners(o, OrgChart.LINK_ROUNDED_CORNERS, !1);
      }
      return null;
    },
  }),
  void 0 === OrgChart && (OrgChart = {}),
  (OrgChart._validateConfig = function (t) {
    return !!t || (console.error("config is not defined"), !1);
  }),
  (OrgChart._arrayContains = function (t, e) {
    if (t && Array.isArray(t))
      for (var r = t.length; r--; ) if (t[r] === e) return !0;
    return !1;
  }),
  (OrgChart._interceptions = function (t, e) {
    if (!t) return [];
    if (!e) return [];
    var r = [];
    if (Array.isArray(t) && Array.isArray(e))
      for (var i in t) for (var a in e) t[i] == e[a] && r.push(t[i]);
    else if (Array.isArray(t) && !Array.isArray(e))
      for (var i in t) for (var a in e) t[i] == a && r.push(t[i]);
    else if (!Array.isArray(t) && Array.isArray(e))
      for (var i in t) for (var a in e) i == e[a] && r.push(e[a]);
    return r;
  }),
  (OrgChart._getTags = function (t) {
    return t.tags && !Array.isArray(t.tags)
      ? t.tags.split(",")
      : t.tags && Array.isArray(t.tags)
      ? t.tags
      : [];
  }),
  (OrgChart._centerPointInPercent = function (t, e, r) {
    var i = t.getBoundingClientRect(),
      a = e - i.left,
      n = r - i.top;
    return [a / (i.width / 100), n / (i.height / 100)];
  }),
  (OrgChart._trim = function (t) {
    return t.replace(/^\s+|\s+$/g, "");
  }),
  (OrgChart._getTransform = function (t) {
    var e = t.getAttribute("transform");
    return (
      (e = e.replace("matrix", "").replace("(", "").replace(")", "")),
      OrgChart._browser().msie && (e = e.replace(/ /g, ",")),
      (e = "[" + (e = OrgChart._trim(e)) + "]"),
      (e = JSON.parse(e))
    );
  }),
  (OrgChart.getScale = function (t, e, r, i, a, n, o, l) {
    var s = 1;
    if (t || i !== OrgChart.match.boundary)
      if (t || i !== OrgChart.match.width)
        if (t || i !== OrgChart.match.height)
          if (t) {
            var h, d;
            s = (h = e / t[2]) > (d = r / t[3]) ? d : h;
          } else s = i;
        else s = r / l;
      else s = e / o;
    else s = (h = e / o) > (d = r / l) ? d : h;
    return s && s > a && (s = a), s && s < n && (s = n), s;
  }),
  (OrgChart.isObject = function (t) {
    return t && "object" == typeof t && !Array.isArray(t) && null !== t;
  }),
  (OrgChart.fileUploadDialog = function (t) {
    var e = document.createElement("INPUT");
    e.setAttribute("type", "file"),
      (e.style.display = "none"),
      (e.onchange = function () {
        var e = this.files[0];
        t(e);
      }),
      document.body.appendChild(e),
      e.click();
  }),
  (OrgChart.mergeDeep = function (t, e) {
    if (OrgChart.isObject(t) && OrgChart.isObject(e))
      for (var r in e)
        OrgChart.isObject(e[r])
          ? (t[r] || Object.assign(t, { [r]: {} }),
            OrgChart.mergeDeep(t[r], e[r]))
          : Object.assign(t, { [r]: e[r] });
    return t;
  }),
  (OrgChart._lblIsImg = function (t, e) {
    return !(
      !t.nodeBinding ||
      "string" != typeof e ||
      -1 == e.indexOf("img") ||
      !t.nodeBinding[e]
    );
  }),
  (OrgChart._getFistImgField = function (t) {
    if (t.nodeBinding)
      for (var e in t.nodeBinding)
        if (-1 != e.indexOf("img")) return t.nodeBinding[e];
    return !1;
  }),
  (OrgChart._fieldIsImg = function (t, e) {
    if (t.nodeBinding)
      for (var r in t.nodeBinding)
        if (t.nodeBinding[r] == e) return OrgChart._lblIsImg(t, r);
    return !1;
  }),
  (OrgChart._guid = function () {
    function t() {
      return Math.floor(65536 * (1 + Math.random()))
        .toString(16)
        .substring(1);
    }
    return (
      t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
    );
  }),
  (OrgChart.htmlRipple = function (t) {
    var e = document.createElement("style");
    (e.type = "text/css"),
      (e.innerHTML =
        " .boc-ripple-container {position: absolute; top: 0; right: 0; bottom: 0; left: 0; } .boc-ripple-container span {transform: scale(0);border-radius:100%;position:absolute;opacity:0.75;background-color:#fff;animation: boc-ripple 1000ms; }@-moz-keyframes boc-ripple {to {opacity: 0;transform: scale(2);}}@-webkit-keyframes boc-ripple {to {opacity: 0;transform: scale(2);}}@-o-keyframes boc-ripple {to {opacity: 0;transform: scale(2);}}@keyframes boc-ripple {to {opacity: 0;transform: scale(2);}}"),
      document.head.appendChild(e);
    var r,
      i,
      a,
      n = document.createElement("div");
    (n.className = "boc-ripple-container"),
      t.addEventListener("mousedown", function (e) {
        var r, i, a, n, o;
        return (
          this,
          (i = document.createElement("span")),
          (a = this.offsetWidth),
          (r = this.getBoundingClientRect()),
          (o = e.pageX - r.left - a / 2),
          (n =
            "top:" +
            (e.pageY - r.top - a / 2) +
            "px; left: " +
            o +
            "px; height: " +
            a +
            "px; width: " +
            a +
            "px;"),
          t.rippleContainer.appendChild(i),
          i.setAttribute("style", n)
        );
      }),
      t.addEventListener(
        "mouseup",
        ((r = function () {
          for (; this.rippleContainer.firstChild; )
            this.rippleContainer.removeChild(this.rippleContainer.firstChild);
        }),
        (i = 2e3),
        (a = void 0),
        function () {
          var t, e;
          return (
            (e = this),
            (t = arguments),
            clearTimeout(a),
            (a = setTimeout(function () {
              return r.apply(e, t);
            }, i))
          );
        })
      ),
      (t.rippleContainer = n),
      t.appendChild(n);
  }),
  (OrgChart._moveToBoundaryArea = function (t, e, r, i) {
    var a = e.slice(0);
    e[0] < r.left &&
      e[0] < r.right &&
      (a[0] = r.left > r.right ? r.right : r.left),
      e[0] > r.right &&
        e[0] > r.left &&
        (a[0] = r.left > r.right ? r.left : r.right),
      e[1] < r.top &&
        e[1] < r.bottom &&
        (a[1] = r.top > r.bottom ? r.bottom : r.top),
      e[1] > r.bottom &&
        e[1] > r.top &&
        (a[1] = r.top > r.bottom ? r.top : r.bottom),
      e[0] !== a[0] || e[1] !== a[1]
        ? OrgChart.animate(
            t,
            { viewBox: e },
            { viewBox: a },
            300,
            OrgChart.anim.outPow,
            function () {
              i && i();
            }
          )
        : i && i();
  }),
  (OrgChart.randomId = function () {
    return (
      "_" +
      ("0000" + ((Math.random() * Math.pow(36, 4)) | 0).toString(36)).slice(-4)
    );
  }),
  (OrgChart._getClientXY = function (t) {
    return -1 == t.type.indexOf("touch")
      ? { x: t.clientX, y: t.clientY }
      : t.changedTouches.length
      ? { x: t.changedTouches[0].clientX, y: t.changedTouches[0].clientY }
      : void 0;
  }),
  (OrgChart._getClientTouchesXY = function (t, e) {
    return -1 != t.type.indexOf("touch")
      ? t.touches.length < e + 1
        ? { x: null, y: null }
        : { x: t.touches[e].clientX, y: t.touches[e].clientY }
      : { x: t.clientX, y: t.clientY };
  }),
  (OrgChart._getOffset = function (t, e) {
    t &&
      ((e.x += t.offsetLeft),
      (e.y += t.offsetTop),
      OrgChart._getOffset(t.offsetParent, e));
  }),
  (OrgChart._getTopLeft = function (t) {
    var e = { x: 0, y: 0 };
    return OrgChart._getOffset(t, e), e;
  }),
  (OrgChart._getOffsetXY = function (t, e) {
    if (-1 == e.type.indexOf("touch")) return { x: e.offsetX, y: e.offsetY };
    if (e.touches.length) {
      var r = OrgChart._getTopLeft(t);
      return { x: e.touches[0].pageX - r.x, y: e.touches[0].pageY - r.y };
    }
    if (e.changedTouches.length) {
      r = OrgChart._getTopLeft(t);
      return {
        x: e.changedTouches[0].pageX - r.x,
        y: e.changedTouches[0].pageY - r.y,
      };
    }
  }),
  (OrgChart._pinchMiddlePointInPercent = function (t, e, r, i) {
    var a = OrgChart._getTopLeft(t),
      n = i.touches[0].pageX - a.x,
      o = i.touches[0].pageY - a.y,
      l = i.touches[1].pageX - a.x,
      s = i.touches[1].pageY - a.y;
    return [((n - l) / 2 + l) / (e / 100), ((o - s) / 2 + s) / (r / 100)];
  }),
  (OrgChart._browser = function () {
    var t =
        (!!window.opr && !!window.opr.addons) ||
        !!window.opera ||
        navigator.userAgent.indexOf(" OPR/") >= 0,
      e = "undefined" != typeof InstallTrigger,
      r =
        /constructor/i.test(window.HTMLElement) ||
        "[object SafariRemoteNotification]" ===
          (
            !window.safari ||
            (void 0 !== window.safari && safari.pushNotification)
          ).toString(),
      i = !!document.documentMode,
      a = !i && !!window.StyleMedia,
      n = !(
        !window.chrome ||
        (!window.chrome.webstore && !window.chrome.runtime)
      );
    return {
      opera: t,
      firefox: e,
      safari: r,
      msie: i,
      edge: a,
      chrome: n,
      blink: (n || t) && !!window.CSS,
    };
  }),
  (OrgChart._menuPosition = function (t, e, r) {
    var i = t.getBoundingClientRect(),
      a = r.getBoundingClientRect(),
      n = e.getBoundingClientRect(),
      o = i.left - a.left,
      l = i.top - a.top;
    return (
      i.top + n.height > a.top + a.height && (l -= n.height),
      i.left - n.width < a.left && (o += n.width),
      { x: o, y: l }
    );
  }),
  (OrgChart._getTemplate = function (t, e, r) {
    if (Array.isArray(t))
      for (var i = 0; i < t.length; i++) {
        var a = e[t[i]];
        if (a && a.template) return a.template;
      }
    return r;
  }),
  (OrgChart._getMin = function (t, e) {
    if (t.tags && t.tags.length && e.tags)
      for (var r = 0; r < t.tags.length; r++) {
        var i = e.tags[t.tags[r]];
        if (i && !0 === i.min) return !0;
      }
    return e.min;
  }),
  (OrgChart._getSubLevels = function (t, e) {
    if (t && t.length)
      for (var r = 0; r < t.length; r++) {
        var i = e[t[r]];
        if (i && i.subLevels) return i.subLevels;
      }
    return 0;
  }),
  (OrgChart._isHTML = function (t) {
    var e = new DOMParser().parseFromString(t, "text/html");
    return Array.from(e.body.childNodes).some((t) => 1 === t.nodeType);
  }),
  (OrgChart._getTestDiv = function () {
    var t = document.getElementById("orgchart_js_test_div");
    return (
      t ||
        (((t = document.createElement("div")).id = "orgchart_js_test_div"),
        (t.style.position = "fixed"),
        (t.style.top = "-10000px"),
        (t.style.left = "-10000px"),
        document.body.appendChild(t)),
      t
    );
  }),
  (OrgChart._getLabelSize = function (t) {
    var e = OrgChart._getTestDiv();
    return (
      (e.innerHTML = "<svg>" + t + "</svg>"),
      e.querySelector("text").getBoundingClientRect()
    );
  }),
  (OrgChart.wrapText = function (t, e) {
    var r = e.toLowerCase();
    if (-1 == r.indexOf("<text")) return OrgChart._escapeHtml(t);
    if (-1 == r.indexOf(OrgChart.attr.width)) return OrgChart._escapeHtml(t);
    if (-1 != r.indexOf("foreignobject")) return OrgChart._escapeHtml(t);
    if (-1 == e.indexOf(OrgChart.attr.width)) return OrgChart._escapeHtml(t);
    if (OrgChart.ESCAPE_HTML && "string" == typeof str && OrgChart._isHTML(t))
      return OrgChart._escapeHtml(t);
    if (!OrgChart.ESCAPE_HTML && OrgChart._isHTML(t)) return t;
    var i = OrgChart._getTestDiv();
    (e = e.replaceAll("{cw}", 0)), (i.innerHTML = "<svg>" + e + "</svg>");
    var a,
      n,
      o = new DOMParser()
        .parseFromString(e, "text/xml")
        .getElementsByTagName("text")[0],
      l = parseFloat(o.getAttribute("x")),
      s = parseFloat(o.getAttribute("y")),
      h = o.getAttribute("text-anchor"),
      d = o.getAttribute(OrgChart.attr.width),
      c = o.getAttribute(OrgChart.attr.text_overflow),
      g = "http://www.w3.org/2000/svg",
      p = i.getElementsByTagName("svg")[0].getElementsByTagName("text")[0];
    c || (c = "ellipsis");
    var u = c.split("-");
    if (
      (u.length > 1 &&
        ((a = parseInt(c.split("-")[1])),
        u.length > 2 && "ellipsis" == u[2] && (n = !0)),
      !d)
    )
      return OrgChart._escapeHtml(t);
    if (
      ((d = parseFloat(d)),
      l || (l = 0),
      s || (s = 0),
      l || (h = "start"),
      "ellipsis" == c)
    ) {
      p.removeChild(p.firstChild), (p.textContent = t);
      for (var f = p.getComputedTextLength(), m = 2; f > d; )
        (p.textContent = t.substring(0, t.length - m)),
          (p.textContent += "..."),
          (f = p.getComputedTextLength()),
          m++;
      return m > 2
        ? `<title>${OrgChart._escapeHtml(t)}</title>${p.textContent}`
        : OrgChart._escapeHtml(t);
    }
    if (-1 != c.indexOf("multiline")) {
      var C = t.split(" "),
        O = p.getBBox().height;
      p.textContent = "";
      var b = document.createElementNS(g, "tspan"),
        v = document.createTextNode(C[0]);
      b.setAttributeNS(null, "x", l),
        b.setAttributeNS(null, "y", s),
        b.setAttributeNS(null, "text-anchor", h),
        b.appendChild(v),
        p.appendChild(b);
      m = 1;
      for (var y = 1, x = !1, _ = 1; _ < C.length; _++) {
        var w = b.firstChild.data.length;
        if (
          ((b.firstChild.data += " " + C[_]), b.getComputedTextLength() > d)
        ) {
          if (
            ((b.firstChild.data = b.firstChild.data.slice(0, w)),
            y++,
            a && y > a)
          ) {
            if (n && p.children.length == a) {
              var k = p.children[a - 1].textContent;
              (p.children[a - 1].textContent =
                k.substring(0, k.length - 3) + "..."),
                (x = !0);
            }
            break;
          }
          (b = document.createElementNS(g, "tspan")).setAttributeNS(
            null,
            "x",
            l
          ),
            b.setAttributeNS(null, "y", s + O * m),
            b.setAttributeNS(null, "text-anchor", h),
            (v = document.createTextNode(C[_])),
            b.appendChild(v),
            p.appendChild(b),
            m++;
        }
      }
      var S = "";
      if (null != p.innerHTML) (S = p.innerHTML), (p.innerHTML = "");
      else {
        var I = "";
        for (_ = p.childNodes.length - 1; _ >= 0; _--)
          (I = XMLSerializer().serializeToString(p.childNodes[_]) + I),
            p.removeChild(p.childNodes[_]);
        S = I;
      }
      return x ? `<title>${OrgChart._escapeHtml(t)}</title>${S}` : S;
    }
  }),
  (OrgChart._downloadFile = function (t, e, r, i, a) {
    var n = new Blob([e], { type: t });
    if (1 == i) {
      var o = URL.createObjectURL(n);
      window.open(o, "_blank").focus();
    } else if (navigator.msSaveBlob) navigator.msSaveBlob(n, r);
    else {
      var l = document.createElement("a");
      if (void 0 !== l.download) {
        o = URL.createObjectURL(n);
        l.setAttribute("href", o);
        var s = r;
        s.toLowerCase().endsWith(a.toLowerCase()) || (s = s + "." + a),
          l.setAttribute("download", s),
          (l.style.visibility = "hidden"),
          document.body.appendChild(l),
          l.click(),
          document.body.removeChild(l);
      }
    }
  }),
  (OrgChart._getPosition = function (t, e, r, i) {
    var a = { x: e.x, y: e.y };
    if ((null != r && (a.x = r), null != i && (a.y = r), t && 3 == t.length)) {
      var n = t[0].indexOf(e.id);
      -1 != n &&
        null != t[1][n].transform &&
        (null == r && (a.x = t[1][n].transform[4]),
        null == i && (a.y = t[1][n].transform[5]));
    }
    return a;
  }),
  (OrgChart._getOpacity = function (t, e) {
    var r = 1;
    if (t && 3 == t.length) {
      var i = t[0].indexOf(e.id);
      -1 != i && null != t[1][i].opacity && (r = t[1][i].opacity);
    }
    return r;
  }),
  (OrgChart.t = function (t, e, r) {
    var i = OrgChart.templates[t];
    null == i && console.error(`Template "${t}" does not exist!`);
    var a = null;
    if (null != r && i.scaleLessThen) {
      var n = [];
      for (var o in i.scaleLessThen) {
        var l = parseFloat(o);
        r < l && n.push(l);
      }
      if (n.length > 0) {
        n.sort(function (t, e) {
          return t - e;
        });
        var s = i.scaleLessThen[n[0]];
        for (var h in s) null == a && (a = Object.assign({}, i)), (a[h] = s[h]);
      }
    }
    return e
      ? null == a
        ? i.min
          ? i.min
          : i
        : a.min
        ? a.min
        : a
      : null == a
      ? i
      : a;
  }),
  (OrgChart.setNodeSize = function (t) {
    var e = OrgChart.t(t.templateName, t.min);
    (t.w = e && e.size ? e.size[0] : 0), (t.h = e && e.size ? e.size[1] : 0);
  }),
  (OrgChart._imgs2base64 = function (t, e, r, i) {
    var a = t.getElementsByTagName(e),
      n = a.length;
    0 == n && i();
    for (var o = 0; o < n; o++)
      !(function () {
        var t = o,
          e = a[t];
        OrgChart._getDataUri(e.getAttribute(r), function (a) {
          a.success && e.setAttribute(r, a.result), t == n - 1 && i();
        });
      })();
  }),
  (OrgChart._getDataUri = function (t, e) {
    if (-1 != t.indexOf("base64")) e({ success: !1 });
    else {
      var r = new XMLHttpRequest();
      r.open("GET", t),
        (r.responseType = "blob"),
        (r.onload = function () {
          200 === r.status
            ? i.readAsDataURL(r.response)
            : 404 === r.status && e({ success: !1, result: r.status });
        });
      var i = new FileReader();
      (i.onloadend = function () {
        e({ success: !0, result: i.result });
      }),
        r.send();
    }
  }),
  (OrgChart._convertStringToArray = function (t, e) {
    return -1 != OrgChart.ARRAY_FIELDS.indexOf(t)
      ? OrgChart.isNEU(e)
        ? []
        : e.split(",")
      : e;
  }),
  (OrgChart._convertArrayToString = function (t) {
    return !OrgChart.isNEU(t) && Array.isArray(t) ? t.join() : t;
  }),
  (OrgChart._csvToArray = function (t, e) {
    e = e || OrgChart.CSV_DELIMITER;
    for (
      var r = new RegExp(
          "(\\" +
            e +
            '|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\' +
            e +
            "\\r\\n]*))",
          "gi"
        ),
        i = [[]],
        a = null;
      (a = r.exec(t));

    ) {
      var n,
        o = a[1];
      o.length && o !== e && i.push([]),
        (n = a[2] ? a[2].replace(new RegExp('""', "g"), '"') : a[3]),
        i[i.length - 1].push(n);
    }
    return i;
  }),
  (OrgChart._json2xml = function (t) {
    for (
      var e = document.implementation.createDocument("", "", null),
        r = e.createElement("nodes"),
        i = 0;
      i < t.length;
      i++
    ) {
      var a = e.createElement("node"),
        n = t[i];
      for (var o in n) {
        var l = n[o];
        a.setAttribute(o, OrgChart._convertArrayToString(l));
      }
      r.appendChild(a);
    }
    return (
      e.appendChild(r),
      '<?xml version="1.0" encoding="utf-8" ?>' +
        new XMLSerializer().serializeToString(e.documentElement)
    );
  }),
  (OrgChart._xml2json = function (t) {
    for (
      var e = new DOMParser()
          .parseFromString(t, "text/xml")
          .getElementsByTagName("node"),
        r = [],
        i = 0;
      i < e.length;
      i++
    ) {
      for (var a = e[i], n = {}, o = 0; o < a.attributes.length; o++) {
        var l = a.attributes[o];
        n[l.name] = OrgChart._convertStringToArray(l.name, l.value);
      }
      r.push(n);
    }
    return r;
  }),
  (OrgChart.convertNodesToCsv = function (t) {
    return OrgChart._json2csv(t);
  }),
  (OrgChart._json2csv = function (t) {
    for (
      var e = [],
        r = function (t) {
          for (var r = "", i = 0; i < e.length; i++) {
            var a;
            (a =
              "reportsTo" == e[i]
                ? null
                : null == t[e[i]]
                ? ""
                : t[e[i]]) instanceof Date && (a = a.toLocaleString());
            var n = (a = null === a ? "" : a.toString()).replace(/"/g, '""'),
              o = new RegExp('("|;|\n)', "g");
            n.search(o) >= 0 && (n = '"' + n + '"'),
              i > 0 && (r += OrgChart.CSV_DELIMITER),
              (r += n);
          }
          return r + "\n";
        },
        i = "",
        a = 0;
      a < t.length;
      a++
    )
      for (var n in t[a])
        OrgChart._arrayContains(e, n) ||
          (e.push(n), (i += n + OrgChart.CSV_DELIMITER));
    (i = i.substring(0, i.length - 1)), (i += "\n");
    for (a = 0; a < t.length; a++) i += r(t[a]);
    return (i = i.substring(0, i.length - 1));
  }),
  (OrgChart.accentFold = function (t) {
    return (t = t.toString().toLowerCase()).replace(
      /([àáâãäå])|([ç])|([èéêë])|([ìíîï])|([ñ])|([òóôõöø])|([ß])|([ùúûü])|([ÿ])|([æ])/g,
      function (t, e, r, i, a, n, o, l, s, h, d) {
        return e
          ? "a"
          : r
          ? "c"
          : i
          ? "e"
          : a
          ? "i"
          : n
          ? "n"
          : o
          ? "o"
          : l
          ? "s"
          : s
          ? "u"
          : h
          ? "y"
          : d
          ? "ae"
          : void 0;
      }
    );
  }),
  (OrgChart.copy = function (t) {
    if (null === t || "object" != typeof t || "isActiveClone" in t) return t;
    if (t instanceof Date) var e = new t.constructor();
    else e = t.constructor();
    for (var r in t)
      Object.prototype.hasOwnProperty.call(t, r) &&
        ((t.isActiveClone = null),
        (e[r] = OrgChart.copy(t[r])),
        delete t.isActiveClone);
    return e;
  }),
  (OrgChart._getScrollSensitivity = function () {
    var t = OrgChart._browser();
    return t.msie && OrgChart.scroll.ie
      ? OrgChart.scroll.ie
      : t.edge && OrgChart.scroll.edge
      ? OrgChart.scroll.edge
      : t.safari && OrgChart.scroll.safari
      ? OrgChart.scroll.safari
      : t.chrome && OrgChart.scroll.chrome
      ? OrgChart.scroll.chrome
      : t.firefox && OrgChart.scroll.firefox
      ? OrgChart.scroll.firefox
      : t.opera && OrgChart.scroll.opera
      ? OrgChart.scroll.opera
      : { smooth: OrgChart.scroll.smooth, speed: OrgChart.scroll.speed };
  }),
  (OrgChart.isMobile = function () {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }),
  (OrgChart.isTrial = function () {
    return void 0 !== OrgChart.remote;
  }),
  (OrgChart.childrenCount = function (t, e) {
    for (var r = 0, i = 0; i < e.childrenIds.length; i++) {
      t.nodes[e.childrenIds[i]] && r++;
    }
    return r;
  }),
  (OrgChart.childrenTotalCount = function (t, e) {
    for (var r = 0, i = 0; i < e.childrenIds.length; i++) {
      var a = t.nodes[e.childrenIds[i]];
      a && (r++, (r += OrgChart.childrenTotalCount(t, a)));
    }
    return r;
  }),
  (OrgChart.collapsedChildrenCount = function (t, e) {
    for (var r = 0, i = 0; i < e.childrenIds.length; i++) {
      var a = t.nodes[e.childrenIds[i]];
      a && !0 === a.collapsed && r++;
    }
    return r;
  }),
  (OrgChart.collapsedChildrenTotalCount = function (t, e, r) {
    for (var i = 0, a = 0; a < e.childrenIds.length; a++) {
      var n = t.nodes[e.childrenIds[a]];
      n &&
        ((r || !0 === n.collapsed) && i++,
        (i += OrgChart.collapsedChildrenTotalCount(t, n, !0)));
    }
    return i;
  }),
  (OrgChart._setMinMaxXY = function (t, e) {
    (null == e.minX || (null != t.x && t.x < e.minX)) && (e.minX = t.x),
      (null == e.minY || (null != t.y && t.y < e.minY)) && (e.minY = t.y),
      (null == e.maxX || (null != t.x && t.x + t.w > e.maxX)) &&
        (e.maxX = t.x + t.w),
      (null == e.maxY || (null != t.y && t.y + t.h > e.maxY)) &&
        (e.maxY = t.y + t.h);
  }),
  (OrgChart.getStParentNodes = function (t, e) {
    for (e || (e = []); t.parent; ) t = t.parent;
    return (
      t.stParent &&
        (e.push(t.stParent), OrgChart.getStParentNodes(t.stParent, e)),
      e
    );
  }),
  (OrgChart.getRootOf = function (t) {
    for (; t && t.parent; ) t = t.parent;
    return t;
  }),
  (OrgChart._getViewBox = function (t) {
    var e = null;
    return t
      ? ((e = (e = "[" + (e = t.getAttribute("viewBox")) + "]").replace(
          /\ /g,
          ","
        )),
        (e = JSON.parse(e)))
      : null;
  }),
  (OrgChart.isNEU = function (t) {
    return null == t || "" === t;
  }),
  (OrgChart.gradientCircleForDefs = function (t, e, r, i) {
    function a(t, e, r, i) {
      var a = ((i - 90) * Math.PI) / 180;
      return { x: t + r * Math.cos(a), y: e + r * Math.sin(a) };
    }
    function n(t, e, r, i, n) {
      var o = a(t, e, r, n),
        l = a(t, e, r, i),
        s = n - i <= 180 ? "0" : "1";
      return ["M", o.x, o.y, "A", r, r, 0, s, 0, l.x, l.y].join(" ");
    }
    return (
      Array.isArray(e) || (e = [e, e, e, e, e, e]),
      `<linearGradient id="${t}_linearColors1" x1="0" y1="0" x2="1" y2="1">\n            <stop offset="0%" stop-color="${
        e[0]
      }"></stop>\n            <stop offset="100%" stop-color="${
        e[1]
      }"></stop>\n        </linearGradient>\n        <linearGradient id="${t}_linearColors2" x1="0.5" y1="0" x2="0.5" y2="1">\n            <stop offset="0%" stop-color="${
        e[1]
      }"></stop>\n            <stop offset="100%" stop-color="${
        e[2]
      }"></stop>\n        </linearGradient>\n        <linearGradient id="${t}_linearColors3" x1="1" y1="0" x2="0" y2="1">\n            <stop offset="0%" stop-color="${
        e[2]
      }"></stop>\n            <stop offset="100%" stop-color="${
        e[3]
      }"></stop>\n        </linearGradient>\n        <linearGradient id="${t}_linearColors4" x1="1" y1="1" x2="0" y2="0">\n            <stop offset="0%" stop-color="${
        e[3]
      }"></stop>\n            <stop offset="100%" stop-color="${
        e[4]
      }"></stop>\n        </linearGradient>\n        <linearGradient id="${t}_linearColors5" x1="0.5" y1="1" x2="0.5" y2="0">\n            <stop offset="0%" stop-color="${
        e[4]
      }"></stop>\n            <stop offset="100%" stop-color="${
        e[5]
      }"></stop>\n        </linearGradient>\n        <linearGradient id="${t}_linearColors6" x1="0" y1="1" x2="1" y2="0">\n            <stop offset="0%" stop-color="${
        e[5]
      }"></stop>\n            <stop offset="100%" stop-color="${
        e[0]
      }"></stop>\n        </linearGradient>        \n        <g id="${t}">\n            <path stroke-width="${i}" fill="none" stroke="url(#${t}_linearColors1)" d="${n(
        r,
        r,
        r,
        1,
        60
      )}"  />\n            <path stroke-width="${i}" fill="none" stroke="url(#${t}_linearColors2)" d="${n(
        r,
        r,
        r,
        60,
        120
      )}"/>\n            <path stroke-width="${i}" fill="none" stroke="url(#${t}_linearColors3)" d="${n(
        r,
        r,
        r,
        120,
        180
      )}" />\n            <path stroke-width="${i}" fill="none" stroke="url(#${t}_linearColors4)" d="${n(
        r,
        r,
        r,
        180,
        240
      )}" />\n            <path stroke-width="${i}" fill="none" stroke="url(#${t}_linearColors5)" d="${n(
        r,
        r,
        r,
        240,
        300
      )}" />\n            <path stroke-width="${i}" fill="none" stroke="url(#${t}_linearColors6)" d="${n(
        r,
        r,
        r,
        300,
        1
      )}"/>\n        </g>`
    );
  }),
  (OrgChart._intersectionObserver = function (t, e) {
    "function" == typeof IntersectionObserver
      ? new IntersectionObserver(function (t, r) {
          t.forEach(function (t) {
            var r = t.intersectionRatio > 0;
            0 == t.intersectionRatio && (r = t.isIntersecting), e(r);
          });
        }).observe(t)
      : e(!0);
  }),
  (OrgChart.convertCsvToNodes = function (t) {
    for (
      var e = OrgChart._csvToArray(t), r = e[0], i = [], a = 1;
      a < e.length;
      a++
    ) {
      for (var n = {}, o = 0; o < e[a].length; o++) {
        var l = r[o],
          s = e[a][o];
        n[r[o]] = OrgChart._convertStringToArray(l, s);
      }
      "" != n.id.trim() && i.push(n);
    }
    return i;
  }),
  (OrgChart._escapeHtml = function (t) {
    return OrgChart.ESCAPE_HTML && "string" == typeof t
      ? t
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")
      : t;
  }),
  (OrgChart._escapeDoubleQuotes = function (t) {
    return "string" == typeof t ? t.replace(/"/g, "&quot;") : t;
  }),
  (OrgChart._escapeGreaterLessSign = function (t) {
    return "string" == typeof t
      ? t.replace(/</g, "&lt;").replace(/>/g, "&gt;")
      : t;
  }),
  (OrgChart.roundPathCorners = function (t, e, r) {
    function i(t, e, r) {
      var i = e.x - t.x,
        n = e.y - t.y,
        o = Math.sqrt(i * i + n * n);
      return a(t, e, Math.min(1, r / o));
    }
    function a(t, e, r) {
      return { x: t.x + (e.x - t.x) * r, y: t.y + (e.y - t.y) * r };
    }
    function n(t, e) {
      t.length > 2 && ((t[t.length - 2] = e.x), (t[t.length - 1] = e.y));
    }
    function o(t) {
      return { x: parseFloat(t[t.length - 2]), y: parseFloat(t[t.length - 1]) };
    }
    Array.isArray(t) ||
      (t = (t = t.split(/[,\s]/).reduce(function (t, e) {
        var r = e.match("([a-zA-Z])(.+)");
        return r ? (t.push(r[1]), t.push(r[2])) : t.push(e), t;
      }, [])).reduce(function (t, e) {
        return (
          parseFloat(e) == e && t.length
            ? t[t.length - 1].push(e)
            : t.push([e]),
          t
        );
      }, []));
    var l = [];
    if (t.length > 1) {
      var s = o(t[0]),
        h = null;
      "Z" == t[t.length - 1][0] &&
        t[0].length > 2 &&
        ((h = ["L", s.x, s.y]), (t[t.length - 1] = h)),
        l.push(t[0]);
      for (var d = 1; d < t.length; d++) {
        var c = l[l.length - 1],
          g = t[d],
          p = g == h ? t[1] : t[d + 1];
        if (
          p &&
          c &&
          c.length > 2 &&
          "L" == g[0] &&
          p.length > 2 &&
          "L" == p[0]
        ) {
          var u,
            f,
            m = o(c),
            C = o(g),
            O = o(p);
          r
            ? ((u = a(C, c.origPoint || m, e)), (f = a(C, p.origPoint || O, e)))
            : ((u = i(C, m, e)), (f = i(C, O, e))),
            n(g, u),
            (g.origPoint = C),
            l.push(g);
          var b = a(u, C, 0.5),
            v = a(C, f, 0.5),
            y = ["C", b.x, b.y, v.x, v.y, f.x, f.y];
          (y.origPoint = C), l.push(y);
        } else l.push(g);
      }
      if (h) {
        var x = o(l[l.length - 1]);
        l.push(["Z"]), n(l[0], x);
      }
    } else l = t;
    return l.reduce(function (t, e) {
      return t + e.join(" ") + " ";
    }, "");
  }),
  (OrgChart._isMoved = function (t) {
    return null != t.movex || null != t.movey;
  }),
  (OrgChart._getDynamicGridCoulumns = function (t) {
    for (var e = 1; e < t && (t / e, !(t / e - e <= 0)); e++);
    return e % 2 != 0 && e > 2 && e--, e;
  }),
  (OrgChart.xScrollUI = function (t, e, r, i, a) {
    (this.element = t),
      (this.requestParams = r),
      (this.config = e),
      (this.onSetViewBoxCallback = i),
      (this.onDrawCallback = a),
      (this.position = 0),
      (this.bar = null),
      (this._event_id = OrgChart._guid());
  }),
  (OrgChart.xScrollUI.prototype.addListener = function (t) {
    var e = this;
    if (
      (this.config.mouseScrool == OrgChart.action.xScroll ||
        this.config.mouseScrool == OrgChart.action.scroll) &&
      this.bar
    ) {
      var r = -1 !== navigator.userAgent.indexOf("Mac OS"),
        i = OrgChart._getScrollSensitivity();
      !(function (t, i, a) {
        var n = !1;
        function o() {
          n = !0;
          var t = (e.position - e.bar.scrollLeft) / a;
          if (t > 0) t++;
          else {
            if (0 == t) return void (n = !1);
            t--;
          }
          Math.ceil(e.bar.scrollLeft) == Math.ceil(e.position)
            ? (n = !1)
            : ((e.bar.scrollLeft += t), l(o));
        }
        t.addEventListener(
          "wheel",
          function (t) {
            if (t.ctrlKey) return;
            var a = 0;
            if (e.config.mouseScrool == OrgChart.action.xScroll)
              (a = t.deltaX || t.wheelDeltaX) ||
                (a = t.deltaY || t.wheelDeltaY);
            else if (
              e.config.mouseScrool == OrgChart.action.scroll &&
              !(a =
                r || !t.shiftKey
                  ? t.deltaX || t.wheelDeltaX
                  : t.deltaY || t.wheelDeltaY)
            )
              return;
            (a = -a),
              (a = Math.max(-1, Math.min(1, a))),
              (e.position += -a * i);
            var l =
              parseFloat(e.innerBar.clientWidth) -
              parseFloat(e.bar.clientWidth);
            e.position < 0 && (e.position = 0);
            e.position > l && (e.position = l);
            n || o();
          },
          { passive: !0 }
        );
        var l =
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (t) {
            setTimeout(t, 20);
          };
      })(t, i.speed, i.smooth);
    }
  }),
  (OrgChart.xScrollUI.prototype.create = function (t) {
    if (
      this.config.showXScroll === OrgChart.scroll.visible ||
      this.config.mouseScrool === OrgChart.action.scroll ||
      this.config.mouseScrool === OrgChart.action.xScroll
    ) {
      var e = this;
      this.bar &&
        this.bar.parentNode &&
        this.bar.parentNode.removeChild(this.bar),
        (this.bar = document.createElement("div")),
        (this.innerBar = document.createElement("div"));
      this.requestParams();
      (this.innerBar.innerHTML = "&nbsp"),
        Object.assign(this.bar.style, {
          position: "absolute",
          left: 0,
          bottom: 0,
          width: t + "px",
          "overflow-x": "scroll",
          height: "20px",
        }),
        this.element.appendChild(this.bar),
        this.bar.appendChild(this.innerBar),
        this.bar.addEventListener("scroll", function () {
          if (this.ignore) this.ignore = !1;
          else {
            var t = e.requestParams(),
              r =
                (parseFloat(e.innerBar.clientWidth) -
                  parseFloat(e.bar.clientWidth)) /
                100,
              i = this.scrollLeft / r,
              a = (t.boundary.right - t.boundary.left) / 100;
            (t.viewBox[0] = i * a + t.boundary.left),
              e.onSetViewBoxCallback(t.viewBox),
              clearTimeout(this._timeout),
              (this._timeout = setTimeout(function () {
                e.onDrawCallback();
              }, 500));
          }
        });
    }
  }),
  (OrgChart.xScrollUI.prototype.setPosition = function () {
    if (this.bar) {
      var t = this.requestParams(),
        e =
          (Math.abs(t.boundary.maxX - t.boundary.minX) +
            2 * this.config.padding) *
          t.scale;
      switch (this.config.orientation) {
        case OrgChart.orientation.right:
        case OrgChart.orientation.right_top:
          e = Math.abs(t.boundary.minX * t.scale);
      }
      this.innerBar.style.width = e + "px";
      var r = (t.boundary.right - t.boundary.left) / 100,
        i = (t.viewBox[0] - t.boundary.left) / r;
      i < 0 ? (i = 0) : i > 100 && (i = 100);
      var a =
          (parseFloat(this.innerBar.clientWidth) -
            parseFloat(this.bar.clientWidth)) /
          100,
        n = i * a;
      (this.bar.ignore = !0),
        (this.bar.scrollLeft = n),
        (this.position = this.bar.scrollLeft),
        (this.bar.style.visibility = a <= 0 ? "hidden" : ""),
        this.config.showXScroll !== OrgChart.scroll.visible &&
          (this.bar.style.visibility = "hidden"),
        OrgChart.events.publish("change", [
          this,
          { isScrollBarVisible: "hidden" != this.bar.style.visibility },
        ]);
    }
  }),
  (OrgChart.xScrollUI.prototype.on = function (t, e) {
    return OrgChart.events.on(t, e, this._event_id), this;
  }),
  (OrgChart.yScrollUI = function (t, e, r, i, a) {
    (this.element = t),
      (this.requestParams = r),
      (this.config = e),
      (this.onSetViewBoxCallback = i),
      (this.onDrawCallback = a),
      (this.position = 0),
      (this.bar = null),
      (this._event_id = OrgChart._guid());
  }),
  (OrgChart.yScrollUI.prototype.addListener = function (t) {
    var e = this;
    if (
      (this.config.mouseScrool == OrgChart.action.yScroll ||
        this.config.mouseScrool == OrgChart.action.scroll) &&
      this.bar
    ) {
      var r = -1 !== navigator.userAgent.indexOf("Mac OS"),
        i = OrgChart._getScrollSensitivity();
      !(function (t, i, a) {
        var n = !1;
        function o() {
          n = !0;
          var t = (e.position - e.bar.scrollTop) / a;
          if (t > 0) t++;
          else {
            if (0 == t) return void (n = !1);
            t--;
          }
          Math.ceil(e.bar.scrollTop) == Math.ceil(e.position)
            ? (n = !1)
            : ((e.bar.scrollTop += t), l(o));
        }
        t.addEventListener(
          "wheel",
          function (t) {
            if (t.ctrlKey) return;
            var a = 0;
            if (e.config.mouseScrool == OrgChart.action.yScroll)
              (a = t.deltaY || t.wheelDeltaY) ||
                (a = t.deltaX || t.wheelDeltaX);
            else if (
              e.config.mouseScrool == OrgChart.action.scroll &&
              !(a =
                r || !t.shiftKey
                  ? t.deltaY || t.wheelDeltaY
                  : t.deltaX || t.wheelDeltaX)
            )
              return;
            (a = -a),
              (a = Math.max(-1, Math.min(1, a))),
              (e.position += -a * i);
            var l =
              parseFloat(e.innerBar.clientHeight) -
              parseFloat(e.bar.clientHeight);
            e.position < 0 && (e.position = 0);
            e.position > l && (e.position = l);
            n || o();
          },
          { passive: !0 }
        );
        var l =
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (t) {
            setTimeout(t, 20);
          };
      })(t, i.speed, i.smooth);
    }
  }),
  (OrgChart.yScrollUI.prototype.create = function (t) {
    if (
      this.config.showYScroll === OrgChart.scroll.visible ||
      this.config.mouseScrool === OrgChart.action.scroll ||
      this.config.mouseScrool === OrgChart.action.yScroll
    ) {
      var e = this;
      this.bar &&
        this.bar.parentNode &&
        this.bar.parentNode.removeChild(this.bar),
        (this.bar = document.createElement("div")),
        (this.innerBar = document.createElement("div")),
        (this.innerBar.innerHTML = "&nbsp"),
        Object.assign(this.bar.style, {
          position: "absolute",
          right: 0,
          bottom: 0,
          height: t + "px",
          "overflow-y": "scroll",
          width: "20px",
        }),
        this.element.appendChild(this.bar),
        this.bar.appendChild(this.innerBar),
        this.bar.addEventListener("scroll", function () {
          if (this.ignore) this.ignore = !1;
          else {
            var t = e.requestParams(),
              r =
                (parseFloat(e.innerBar.clientHeight) -
                  parseFloat(e.bar.clientHeight)) /
                100,
              i = this.scrollTop / r,
              a = (t.boundary.bottom - t.boundary.top) / 100;
            (t.viewBox[1] = i * a + t.boundary.top),
              e.onSetViewBoxCallback(t.viewBox),
              clearTimeout(this._timeout),
              (this._timeout = setTimeout(function () {
                e.onDrawCallback();
              }, 500));
          }
        });
    }
  }),
  (OrgChart.yScrollUI.prototype.setPosition = function () {
    if (this.bar) {
      var t = this.requestParams(),
        e =
          (Math.abs(t.boundary.maxY - t.boundary.minY) +
            2 * this.config.padding) *
          t.scale;
      switch (this.config.orientation) {
        case OrgChart.orientation.bottom:
        case OrgChart.orientation.bottom_left:
          e = Math.abs(t.boundary.minY * t.scale);
      }
      this.innerBar.style.height = e + "px";
      var r = (t.boundary.bottom - t.boundary.top) / 100,
        i = (t.viewBox[1] - t.boundary.top) / Math.abs(r);
      i < 0 ? (i = 0) : i > 100 && (i = 100);
      var a =
          (parseFloat(this.innerBar.clientHeight) -
            parseFloat(this.bar.clientHeight)) /
          100,
        n = i * a;
      (this.bar.ignore = !0),
        (this.bar.scrollTop = n),
        (this.position = this.bar.scrollTop),
        (this.bar.style.visibility = a <= 0 ? "hidden" : ""),
        this.config.showYScroll !== OrgChart.scroll.visible &&
          (this.bar.style.visibility = "hidden"),
        OrgChart.events.publish("change", [
          this,
          { isScrollBarVisible: "hidden" != this.bar.style.visibility },
        ]);
    }
  }),
  (OrgChart.yScrollUI.prototype.on = function (t, e) {
    return OrgChart.events.on(t, e, this._event_id), this;
  }),
  (OrgChart.prototype.zoom = function (t, e, r, i) {
    var a = this.getViewBox().slice(0),
      n = a,
      o = a[2],
      l = a[3];
    !0 === t
      ? ((a[2] = a[2] / OrgChart.SCALE_FACTOR),
        (a[3] = a[3] / OrgChart.SCALE_FACTOR))
      : !1 === t
      ? ((a[2] = a[2] * OrgChart.SCALE_FACTOR),
        (a[3] = a[3] * OrgChart.SCALE_FACTOR))
      : ((a[2] = a[2] / t), (a[3] = a[3] / t)),
      e || (e = [50, 50]),
      (a[0] = n[0] - (a[2] - o) / (100 / e[0])),
      (a[1] = n[1] - (a[3] - l) / (100 / e[1]));
    var s = this.getScale(a);
    if (
      ((a[2] = this.width() / s),
      (a[3] = this.height() / s),
      (!0 === t && s < this.config.scaleMax) ||
        (!1 === t && s > this.config.scaleMin) ||
        (0 != t &&
          1 != t &&
          s < this.config.scaleMax &&
          s > this.config.scaleMin))
    ) {
      this._hideBeforeAnimation();
      var h = this;
      r
        ? (clearTimeout(h._timeout),
          OrgChart.animate(
            this.getSvg(),
            { viewbox: this.getViewBox() },
            { viewbox: a },
            this.config.anim.duration,
            this.config.anim.func,
            function () {
              clearTimeout(h._timeout),
                (h._timeout = setTimeout(function () {
                  h._draw(!0, OrgChart.action.zoom, null, i);
                }, 500));
            }
          ))
        : (this.setViewBox(a),
          clearTimeout(h._timeout),
          (h._timeout = setTimeout(function () {
            h._draw(!0, OrgChart.action.zoom, null, i);
          }, 500)));
    }
  }),
  (OrgChart.loading = {}),
  (OrgChart.loading.show = function (t) {
    var e = document.createElement("div");
    (e.id = "boc-loading"),
      (e.innerHTML =
        '<style>@-webkit-keyframes dot-keyframes {0% { opacity: .4; -webkit-transform: scale(1, 1);transform: scale(1, 1);}50% {opacity: 1;-webkit-transform: scale(1.2, 1.2);transform: scale(1.2, 1.2);}100% {opacity: .4;-webkit-transform: scale(1, 1);transform: scale(1, 1);}}@keyframes dot-keyframes {0% {opacity: .4;-webkit-transform: scale(1, 1);transform: scale(1, 1);}50% {opacity: 1;-webkit-transform: scale(1.2, 1.2);transform: scale(1.2, 1.2);}100% {opacity: .4;-webkit-transform: scale(1, 1);transform: scale(1, 1);}}.boc-loading-dots div {margin: 10px;}      .boc-dot-1 {background-color: #039BE5;}.boc-dot-2 {background-color: #F57C00;}.boc-dot-3 {background-color: #FFCA28;}      .boc-loading-dots {text-align: center;width: 100%; position: absolute; top: 0;}.boc-loading-dots--dot {-webkit-animation: dot-keyframes 1.5s infinite ease-in-out;animation: dot-keyframes 1.5s infinite ease-in-out;        border-radius: 10px;display: inline-block;height: 10px;width: 10px;}.boc-loading-dots--dot:nth-child(2) {-webkit-animation-delay: .5s;animation-delay: .5s;}.boc-loading-dots--dot:nth-child(3) {-webkit-animation-delay: 1s;animation-delay: 1s;}</style><div class="boc-loading-dots"><div class="boc-loading-dots--dot boc-dot-1"></div><div class="boc-loading-dots--dot boc-dot-2"></div><div class="boc-loading-dots--dot boc-dot-3"></div></div>'),
      t.element.appendChild(e);
  }),
  (OrgChart.loading.hide = function (t) {
    var e = t.element.querySelector("#boc-loading");
    e && e.parentNode.removeChild(e);
  }),
  (OrgChart.pdfPrevUI = {}),
  OrgChart.loc || (OrgChart.loc = {}),
  (OrgChart.loc.ppdfCmdTitle = "PDF Preview"),
  (OrgChart.loc.ppdfSave = "Save"),
  (OrgChart.loc.ppdfCancel = "Cancel"),
  (OrgChart.loc.ppdfFormat = "Format"),
  (OrgChart.loc.ppdfFitToDrwaing = "Fit"),
  (OrgChart.loc.ppdfA4 = "A4"),
  (OrgChart.loc.ppdfA3 = "A3"),
  (OrgChart.loc.ppdfA2 = "A2"),
  (OrgChart.loc.ppdfA1 = "A1"),
  (OrgChart.loc.ppdfLetter = "Letter"),
  (OrgChart.loc.ppdfLegal = "Legal"),
  (OrgChart.loc.ppdfLayout = "Layout"),
  (OrgChart.loc.ppdfPortrait = "Portrait"),
  (OrgChart.loc.ppdfLandscape = "Landscape"),
  (OrgChart.loc.ppdfFittopagewidth = "Fit to page width"),
  (OrgChart.loc.ppdfMargin = "Margin"),
  (OrgChart.loc.ppdfHeader = "Header"),
  (OrgChart.loc.ppdfFooter = "Footer"),
  (OrgChart.loc.ppdfScale = "Scale"),
  (OrgChart.pdfPrevUI.show = function (t, e) {
    OrgChart.pdfPrevUI.hide(t), (e = t._defaultExportOptions(e, "pdf"));
    var r = document.createElement("div");
    r.classList.add(t.config.mode),
      (r.id = "boc-ppdf-btns"),
      Object.assign(r.style, {
        position: "absolute",
        top: 0,
        left: 0,
        "background-color": "#fff",
        "z-index": 5,
        margin: "0 0 0 -265px",
        "box-shadow":
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        width: "265px",
        height: "100%",
        "font-family": "Roboto,Helvetica",
        color: "#757575",
        "text-align": "right",
        padding: "10px",
      }),
      t.element.appendChild(r),
      (r.innerHTML =
        "<h1>" +
        OrgChart.loc.ppdfCmdTitle +
        '</h1><div><button type="button" id="boc-prev-save" style="font-size: 14px; width: 90px;">' +
        OrgChart.loc.ppdfSave +
        '</button>&nbsp;<button type="button" id="boc-prev-cancel" style="width: 90px;font-size: 14px;">' +
        OrgChart.loc.ppdfCancel +
        '</button></div><div style="margin-top:30px; height:10px;border-bottom:1px solid #eeeeee;"></div><div style="padding-top:30px;"><label for="boc-size">' +
        OrgChart.loc.ppdfFormat +
        ': </label><select id="boc-ppdf-size" style="color: #757575; width: 150px; font-size: 14px;" id="boc-size"><option value="fit">' +
        OrgChart.loc.ppdfFitToDrwaing +
        '</option><option value="A4">' +
        OrgChart.loc.ppdfA4 +
        '</option><option value="A3">' +
        OrgChart.loc.ppdfA3 +
        '</option><option value="A2">' +
        OrgChart.loc.ppdfA2 +
        '</option><option value="A1">' +
        OrgChart.loc.ppdfA1 +
        '</option><option value="Letter">' +
        OrgChart.loc.ppdfLetter +
        '</option><option value="Legal">' +
        OrgChart.loc.ppdfLegal +
        '</option></select></div><div style="padding-top:10px;"><label for="boc-ppdf-layout">' +
        OrgChart.loc.ppdfLayout +
        ': </label><select id="boc-ppdf-layout" style="color: #757575; width: 150px;font-size: 14px;" ><option value="false">' +
        OrgChart.loc.ppdfPortrait +
        '</option><option value="true">' +
        OrgChart.loc.ppdfLandscape +
        '</option></select></div><div style="padding-top:10px;"><label for="boc-scale">' +
        OrgChart.loc.ppdfScale +
        ': </label><select id="boc-ppdf-scale" style="color: #757575; width: 150px;font-size: 14px;" id="boc-scale"><option value="fit">' +
        OrgChart.loc.ppdfFittopagewidth +
        '</option><option value="10">10%</option><option value="20">20%</option><option value="30">30%</option><option value="40">40%</option><option value="50">50%</option><option value="60">60%</option><option value="70">70%</option><option value="80">80%</option><option value="90">90%</option><option value="100">100%</option><option value="110">110%</option><option value="120">120%</option><option value="130">130%</option><option value="140">140%</option><option value="150">150%</option><option value="160">160%</option><option value="170">170%</option><option value="180">180%</option><option value="190">190%</option><option value="200">200%</option></select></div><div style="margin-top:10px;margin-bottom:10px; height:10px;border-bottom:1px solid #eeeeee;"></div><div style="padding-top:10px;"><label for="boc-ppdf-header">' +
        OrgChart.loc.ppdfHeader +
        ': </label><input id="boc-ppdf-header" type="text" style="color: #757575; width: 100px;font-size: 14px;" ></div><div style="padding-top:10px;"><label for="boc-ppdf-footer">' +
        OrgChart.loc.ppdfFooter +
        ': </label><input id="boc-ppdf-footer" type="text" style="color: #757575; width: 100px;font-size: 14px;" ></div><div style="padding-top:10px;"><label for="boc-ppdf-margin">' +
        OrgChart.loc.ppdfMargin +
        ': </label><input id="boc-ppdf-margin" type="text" style="color: #757575; width: 100px;font-size: 14px;" ></div>');
    var i = document.createElement("div");
    (i.id = "boc-ppdf-wrapper"),
      Object.assign(i.style, {
        "overflow-y": "scroll",
        "z-index": 11,
        position: "absolute",
        top: 0,
        left: "285px",
        "background-color": "#eee",
        width: t.width() - 270 + "px",
        height: "100%",
      }),
      t.element.appendChild(i),
      (i.innerHTML =
        '<div id="boc-ppdf-content" style="width: 100%;margin-top:10px;margin-bottom:10px;opacity:0;"></div>');
    var a,
      n,
      o,
      l = t.element.querySelector("#boc-ppdf-size"),
      s = t.element.querySelector("#boc-ppdf-layout"),
      h = t.element.querySelector("#boc-ppdf-scale"),
      d = t.element.querySelector("#boc-ppdf-margin"),
      c = t.element.querySelector("#boc-ppdf-header"),
      g = t.element.querySelector("#boc-ppdf-footer");
    (l.value = e.format),
      (s.value = e.landscape),
      (h.value = e.scale),
      (d.value = e.margin),
      (c.value = e.header),
      (g.value = e.footer),
      OrgChart.animate(
        t.element.querySelector("#boc-ppdf-btns"),
        { margin: [0, 0, 0, -250] },
        { margin: [0, 0, 0, 0] },
        300,
        OrgChart.anim.outSin,
        function () {
          t.exportPDF(e, OrgChart.pdfPrevUI._handler);
        }
      ),
      t.element
        .querySelector("#boc-prev-cancel")
        .addEventListener("click", function () {
          OrgChart.pdfPrevUI.hide(t);
        }),
      t.element
        .querySelector("#boc-prev-save")
        .addEventListener("click", function () {
          t.exportPDF(e), OrgChart.pdfPrevUI.hide(t);
        }),
      OrgChart.pdfPrevUI._showHide(l, s, h),
      l.addEventListener("change", function () {
        OrgChart.animate(
          t.element.querySelector("#boc-ppdf-content"),
          { opacity: 1 },
          { opacity: 0 },
          300,
          OrgChart.anim.inSin,
          function () {
            (t.element.querySelector("#boc-ppdf-content").innerHTML = ""),
              (e.format = l.value),
              t.exportPDF(e, OrgChart.pdfPrevUI._handler),
              OrgChart.pdfPrevUI._showHide(l, s, h);
          }
        );
      }),
      s.addEventListener("change", function () {
        OrgChart.animate(
          t.element.querySelector("#boc-ppdf-content"),
          { opacity: 1 },
          { opacity: 0 },
          300,
          OrgChart.anim.inSin,
          function () {
            (t.element.querySelector("#boc-ppdf-content").innerHTML = ""),
              (e.landscape = "true" == s.value),
              t.exportPDF(e, OrgChart.pdfPrevUI._handler),
              OrgChart.pdfPrevUI._showHide(l, s, h);
          }
        );
      }),
      h.addEventListener("change", function () {
        OrgChart.animate(
          t.element.querySelector("#boc-ppdf-content"),
          { opacity: 1 },
          { opacity: 0 },
          300,
          OrgChart.anim.inSin,
          function () {
            (t.element.querySelector("#boc-ppdf-content").innerHTML = ""),
              (e.scale = h.value),
              t.exportPDF(e, OrgChart.pdfPrevUI._handler),
              OrgChart.pdfPrevUI._showHide(l, s, h);
          }
        );
      }),
      d.addEventListener("keyup", function () {
        clearTimeout(a),
          (a = setTimeout(function () {
            OrgChart.animate(
              t.element.querySelector("#boc-ppdf-content"),
              { opacity: 1 },
              { opacity: 0 },
              300,
              OrgChart.anim.inSin,
              function () {
                t.element.querySelector("#boc-ppdf-content").innerHTML = "";
                var r = d.value.split(",");
                if (4 == r.length) {
                  for (var i = 0; i < r.length; i++) r[i] = parseInt(r[i]);
                  (e.margin = r), t.exportPDF(e, OrgChart.pdfPrevUI._handler);
                }
              }
            );
          }, 1e3));
      }),
      c.addEventListener("keyup", function () {
        clearTimeout(n),
          (n = setTimeout(function () {
            OrgChart.animate(
              t.element.querySelector("#boc-ppdf-content"),
              { opacity: 1 },
              { opacity: 0 },
              300,
              OrgChart.anim.inSin,
              function () {
                (t.element.querySelector("#boc-ppdf-content").innerHTML = ""),
                  (e.header = c.value),
                  t.exportPDF(e, OrgChart.pdfPrevUI._handler);
              }
            );
          }, 1e3));
      }),
      g.addEventListener("keyup", function () {
        clearTimeout(o),
          (o = setTimeout(function () {
            OrgChart.animate(
              t.element.querySelector("#boc-ppdf-content"),
              { opacity: 1 },
              { opacity: 0 },
              300,
              OrgChart.anim.inSin,
              function () {
                (t.element.querySelector("#boc-ppdf-content").innerHTML = ""),
                  (e.footer = g.value),
                  t.exportPDF(e, OrgChart.pdfPrevUI._handler);
              }
            );
          }, 1e3));
      });
  }),
  (OrgChart.pdfPrevUI._showHide = function (t, e, r) {
    "A4" == t.value ||
    "A3" == t.value ||
    "A2" == t.value ||
    "A1" == t.value ||
    "Letter" == t.value ||
    "Legal" == t.value
      ? ((e.parentNode.style.display = "block"),
        (r.parentNode.style.display = "block"))
      : ((e.parentNode.style.display = "none"),
        (r.parentNode.style.display = "none"));
  }),
  (OrgChart.pdfPrevUI._handler = function (t, e, r) {
    var i = e.options,
      a = e.pages,
      n = i.margin[0],
      o = i.margin[2],
      l = document.createElement("div");
    l.classList.add(t.config.mode),
      (l.innerHTML = r.outerHTML),
      OrgChart._browser().msie &&
        (l.innerHTML = new XMLSerializer().serializeToString(r));
    for (
      var s = l.querySelector("svg"),
        h = t.element.querySelector("#boc-ppdf-content"),
        d = 0;
      d < a.length;
      d++
    ) {
      var c = document.createElement("iframe");
      Object.assign(c.style, {
        display: "block",
        margin: "10px auto",
        border: "1px solid #eeeeee",
        "box-shadow":
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }),
        h.appendChild(c),
        s && s.style.backgroundColor
          ? (c.style.backgroundColor = s.style.backgroundColor)
          : (c.style.backgroundColor = "#fff");
      var g = c.contentWindow.document;
      g.open(),
        (c.style.width = a[d].size.w + "px"),
        (c.style.height = a[d].size.h + "px"),
        (c.style.margin = "10 auto"),
        a[d].backgroundColor &&
          (c.style.backgroundColor = a[d].backgroundColor);
      var p = i.header;
      a[d].header && (p = a[d].header),
        p &&
          (p = p
            .replace("{current-page}", d + 1)
            .replace("{total-pages}", a.length));
      var u = i.footer;
      a[d].footer && (u = a[d].footer),
        u &&
          (u = u
            .replace("{current-page}", d + 1)
            .replace("{total-pages}", a.length)),
        a[d].html
          ? g.write(
              OrgChart._exportHtml(
                a[d].html,
                e.styles,
                i,
                a[d].innerSize.w,
                a[d].innerSize.h,
                p,
                u,
                t.config.mode
              )
            )
          : (s.setAttribute("viewBox", a[d].vb),
            g.write(
              OrgChart._exportHtml(
                l.innerHTML,
                e.styles,
                i,
                a[d].innerSize.w,
                a[d].innerSize.h,
                p,
                u,
                t.config.mode
              )
            ));
      var f = g.getElementById("boc-header"),
        m = g.getElementById("boc-footer");
      if (f) {
        var C = n - f.offsetHeight - 7;
        f.style.top = C + "px";
      }
      if (m) {
        var O = o - m.offsetHeight - 7;
        m.style.bottom = O + "px";
      }
      g.close();
    }
    var b = t.element.querySelector("#boc-ppdf-content");
    OrgChart.animate(
      b,
      { opacity: 0 },
      { opacity: 1 },
      300,
      OrgChart.anim.outSin
    );
  }),
  (OrgChart.pdfPrevUI._getViewBox = function (t) {
    var e = null;
    return t
      ? ((e = (e = "[" + (e = t.getAttribute("viewBox")) + "]").replace(
          /\ /g,
          ","
        )),
        (e = JSON.parse(e)))
      : null;
  }),
  (OrgChart._exportHtml = function (t, e, r, i, a, n, o, l) {
    for (var s = "", h = 0; h < r.margin.length; h++) s += r.margin[h] + "px ";
    var d =
      '<!DOCTYPE html><html style="margin:0;padding:0;"><head></head>' +
      e +
      '<body class="boc-' +
      l +
      '" style="margin:0; padding:0;"><div style="margin: ' +
      s +
      ";overflow:hidden;width:" +
      i +
      "px;height:" +
      a +
      'px">';
    return (
      n &&
        (d +=
          '<div id="boc-header" style="width:' +
          i +
          "px;color:#757575;position:absolute;left:" +
          r.margin[3] +
          'px;top:0;">' +
          n +
          "</div>"),
      (d += t),
      o &&
        (d +=
          '<div id="boc-footer" style="width:' +
          i +
          "px;color:#757575;position:absolute;left:" +
          r.margin[3] +
          'px;bottom:0;">' +
          o +
          "</div>"),
      (d += "</div>"),
      (d += "</body></html>")
    );
  }),
  (OrgChart.pdfPrevUI.hide = function (t) {
    var e = t.element.querySelector("#boc-ppdf-wrapper");
    if (e) {
      e.parentNode.removeChild(e), (e.style.opacity = 0);
      var r = t.element.querySelector("#boc-ppdf-btns");
      r.parentNode.removeChild(r);
    }
  }),
  void 0 === OrgChart && (OrgChart = {}),
  OrgChart.events.on("renderdefs", function (t, e) {
    for (var r = 0; r < t.config.clinks.length; r++) {
      var i = t.config.clinks[r].template;
      i || (i = "orange");
      var a = OrgChart.clinkTemplates[i];
      e.defs += a.defs;
    }
  }),
  OrgChart.events.on("prerender", function (t, e) {
    OrgChart.RENDER_CLINKS_BEFORE_NODES && t._clink(t, e);
  }),
  OrgChart.events.on("render", function (t, e) {
    OrgChart.RENDER_CLINKS_BEFORE_NODES || t._clink(t, e);
  }),
  OrgChart.events.on("drag", function (t, e, r, i) {
    if (t instanceof OrgChart && t.config.movable && i)
      for (var a = 0; a < i.length; a++) {
        for (
          var n = i[a],
            o = t.element.querySelectorAll(`[data-c-l-from="${n}"]`),
            l = t.element.querySelectorAll(`[data-c-l-to="${n}"]`),
            s = 0;
          s < o.length;
          s++
        )
          o[s].parentNode.removeChild(o[s]);
        for (s = 0; s < l.length; s++) l[s].parentNode.removeChild(l[s]);
      }
  }),
  (OrgChart.prototype._clink = function (t, e) {
    for (var r = "", i = 0; i < this.config.clinks.length; i++) {
      var a = this.config.clinks[i],
        n = t.getNode(a.from),
        o = t.getNode(a.to);
      if (
        n &&
        -1 != e.res.visibleNodeIds.indexOf(n.id) &&
        o &&
        -1 != e.res.visibleNodeIds.indexOf(o.id)
      ) {
        var l = n.x,
          s = n.y,
          h = o.x,
          d = o.y,
          c = {},
          g = {},
          p = l + n.w / 2,
          u = h + o.w / 2,
          f = s + n.h / 2,
          m = d + o.h / 2,
          C = 1;
        switch (this.config.orientation) {
          case OrgChart.orientation.top:
          case OrgChart.orientation.top_left:
            p <= u
              ? ((C = 1), (c.x = p + n.w / 10), (g.x = u - o.w / 10))
              : ((C = -1), (c.x = p - n.w / 10), (g.x = u + o.w / 10)),
              s == d
                ? ((C = 1), (c.y = s), (g.y = d))
                : s > d
                ? ((c.y = s), (g.y = d + o.h))
                : ((c.y = s + n.h), (g.y = d));
            break;
          case OrgChart.orientation.bottom:
          case OrgChart.orientation.bottom_left:
            p <= u
              ? ((C = -1), (c.x = p + n.w / 10), (g.x = u + o.w / 10))
              : ((C = 1), (c.x = p - n.w / 10), (g.x = u + o.w / 10)),
              s == d
                ? ((C = -1), (c.y = s + n.h), (g.y = d + o.h))
                : s > d
                ? ((c.y = s), (g.y = d + o.h))
                : ((c.y = s + n.h), (g.y = d));
            break;
          case OrgChart.orientation.left:
          case OrgChart.orientation.left_top:
            f <= m
              ? ((C = -1), (c.y = f + n.h / 5), (g.y = m + o.h / 5))
              : ((C = 1), (c.y = f - n.h / 5), (g.y = m + o.h / 5)),
              l == h
                ? ((C = -1), (c.x = l), (g.x = h))
                : l > h
                ? ((c.x = l), (g.x = h + o.w))
                : ((c.x = l + n.w), (g.x = h));
            break;
          case OrgChart.orientation.right:
          case OrgChart.orientation.right_top:
            f <= m
              ? ((C = 1), (c.y = f + n.h / 5), (g.y = m + o.h / 5))
              : ((C = -1), (c.y = f - n.h / 5), (g.y = m + o.h / 5)),
              l == h
                ? ((C = 1), (c.x = l + n.w), (g.x = h + o.w))
                : l > h
                ? ((c.x = l), (g.x = h + o.w))
                : ((c.x = l + n.w), (g.x = h));
        }
        var O = _(c, g, C),
          b = a.template;
        b || (b = "orange");
        var v = OrgChart.clinkTemplates[b];
        if (a.label) {
          var y = OrgChart.clinkLabelPosition(a, c, g, O);
          r += v.label
            .replace("{x}", y.x)
            .replace("{y}", y.y)
            .replace("{val}", a.label);
        }
        var x =
          "M" +
          c.x +
          "," +
          c.y +
          "C" +
          c.x +
          "," +
          c.y +
          " " +
          O.x +
          "," +
          O.y +
          " " +
          g.x +
          "," +
          g.y;
        (r +=
          (
            "<g " +
            OrgChart.attr.c_link_from +
            '="{from}" ' +
            OrgChart.attr.c_link_to +
            '="{to}">'
          )
            .replace("{from}", n.id)
            .replace("{to}", o.id) +
          v.link.replaceAll("{d}", x) +
          '<path stroke="transparent" stroke-width="15" fill="none" d="' +
          x +
          '" />'),
          (r += OrgChart.grCloseTag);
      }
      function _(t, e, r) {
        null == r && (r = 1);
        var i = e.x - t.x,
          n = e.y - t.y,
          o = Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)) / 3;
        return (
          (o = (o / (Math.sqrt(i * i + n * n) * r)) * OrgChart.clinkCurve(a)),
          { x: t.x + i / 2 - n * o, y: t.y + n / 2 + i * o }
        );
      }
    }
    e.content += r;
  }),
  (OrgChart.clinkLabelPosition = function (t, e, r, i) {
    var a = (r.x - e.x) / 2 + e.x,
      n = (r.y - e.y) / 2 + e.y;
    return { x: (a - i.x) / 2 + i.x, y: (n - i.y) / 2 + i.y };
  }),
  (OrgChart.clinkCurve = function (t) {
    return OrgChart.CLINK_CURVE;
  }),
  (OrgChart.prototype.addClink = function (t, e, r, i) {
    this._putInUndoStack(), this.clearRedo();
    for (var a = this.config.clinks.length - 1; a >= 0; a--) {
      var n = this.config.clinks[a];
      n.from == t && n.to == e && this.config.clinks.splice(a, 1);
    }
    return (
      this.config.clinks.push({ from: t, to: e, label: r, template: i }),
      OrgChart.events.publish("updated", [this]),
      this
    );
  }),
  (OrgChart.prototype.removeClink = function (t, e) {
    this._putInUndoStack(), this.clearRedo();
    for (var r = this.config.clinks.length - 1; r >= 0; r--) {
      var i = this.config.clinks[r];
      i.from == t && i.to == e && this.config.clinks.splice(r, 1);
    }
    return OrgChart.events.publish("updated", [this]), this;
  }),
  (OrgChart.clinkTemplates = {}),
  (OrgChart.clinkTemplates.orange = {
    defs: '<marker id="arrowOrange" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path fill="#F57C00" d="M 0 0 L 10 5 L 0 10 z" /></marker><marker id="dotOrange" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5"> <circle cx="5" cy="5" r="5" fill="#F57C00" /></marker>',
    link: '<path marker-start="url(#dotOrange)" marker-end="url(#arrowOrange)" stroke="#F57C00" stroke-width="2" fill="none" d="{d}" />',
    label:
      '<text fill="#F57C00" text-anchor="middle" x="{x}" y="{y}">{val}</text>',
  }),
  (OrgChart.clinkTemplates.blue = {
    defs: '<marker id="arrowBlue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path fill="#039BE5" d="M 0 0 L 10 5 L 0 10 z" /></marker><marker id="dotBlue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5"> <circle cx="5" cy="5" r="5" fill="#039BE5" /></marker>',
    link: '<path marker-start="url(#dotBlue)" marker-end="url(#arrowBlue)" stroke="#039BE5" stroke-width="2" fill="none" d="{d}" />',
    label:
      '<text fill="#039BE5"  text-anchor="middle" x="{x}" y="{y}">{val}</text>',
  }),
  (OrgChart.clinkTemplates.yellow = {
    defs: '<marker id="arrowYellow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path fill="#FFCA28" d="M 0 0 L 10 5 L 0 10 z" /></marker><marker id="dotYellow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5"> <circle cx="5" cy="5" r="5" fill="#FFCA28" /></marker>',
    link: '<path marker-start="url(#dotYellow)" marker-end="url(#arrowYellow)" stroke="#FFCA28" stroke-width="2" fill="none" d="{d}" />',
    label:
      '<text fill="#FFCA28"  text-anchor="middle" x="{x}" y="{y}">{val}</text>',
  }),
  void 0 === OrgChart && (OrgChart = {}),
  OrgChart.events.on("renderdefs", function (t, e) {
    for (var r = 0; r < t.config.slinks.length; r++) {
      var i = t.config.slinks[r].template;
      i || (i = "orange");
      var a = OrgChart.slinkTemplates[i];
      e.defs += a.defs;
    }
  }),
  OrgChart.events.on("render", function (t, e) {
    t._slinks(t, e);
  }),
  OrgChart.events.on("drag", function (t, e, r, i) {
    if (t instanceof OrgChart && t.config.movable && i)
      for (var a = 0; a < i.length; a++) {
        for (
          var n = i[a],
            o = t.element.querySelectorAll(`[data-s-l-from="${n}"]`),
            l = t.element.querySelectorAll(`[data-s-l-to="${n}"]`),
            s = 0;
          s < o.length;
          s++
        )
          o[s].parentNode.removeChild(o[s]);
        for (s = 0; s < l.length; s++) l[s].parentNode.removeChild(l[s]);
      }
  }),
  (OrgChart.prototype._slinks = function (t, e) {
    var r = "",
      i = this.getScale(),
      a = e.res.boundary;
    function n(e, n, o) {
      var s = [],
        h = null,
        d = "left",
        c = e.lcn ? e.lcn : "base",
        g = t._layoutConfigs[c];
      switch (g.orientation) {
        case OrgChart.orientation.top:
        case OrgChart.orientation.top_left:
        case OrgChart.orientation.bottom:
        case OrgChart.orientation.bottom_left:
          n.x > e.x && (d = "right");
          break;
        case OrgChart.orientation.left:
        case OrgChart.orientation.left_top:
        case OrgChart.orientation.right:
        case OrgChart.orientation.right_top:
          (d = "top"), n.y > e.y && (d = "bottom");
      }
      var p = OrgChart.t(e.templateName, e.min, i),
        u = g.levelSeparation;
      e.parent && e.parent.layout && (u = g.mixedHierarchyNodesSeparation);
      var f = {
        p: e.x + e.w / 2 + p.expandCollapseSize,
        q: e.y,
        r: e.x + e.w / 2 + p.expandCollapseSize,
        s: a.minY + u,
      };
      if (e.sl == n.sl)
        switch (((h = n), g.orientation)) {
          case OrgChart.orientation.top:
          case OrgChart.orientation.top_left:
            s.push([f.p, f.q]),
              s.push([f.p, f.q - u / 3]),
              (p = OrgChart.t(h.templateName, h.min, i)),
              s.push([
                h.x + h.w / 2 + p.expandCollapseSize,
                s[s.length - 1][1],
              ]),
              s.push([s[s.length - 1][0], h.y]);
            break;
          case OrgChart.orientation.bottom:
          case OrgChart.orientation.bottom_left:
            (f.q = e.y + e.h),
              (f.s = a.maxY - u),
              s.push([f.p, f.q]),
              s.push([f.r, e.y + e.h + u / 3]),
              (p = OrgChart.t(h.templateName, h.min, i)),
              s.push([
                h.x + h.w / 2 + p.expandCollapseSize,
                s[s.length - 1][1],
              ]),
              s.push([s[s.length - 1][0], h.y + h.h]);
            break;
          case OrgChart.orientation.left:
          case OrgChart.orientation.left_top:
            (f.p = e.x),
              (f.q = e.y + e.h / 2 + p.expandCollapseSize),
              (f.r = a.minX - u),
              (f.s = e.y + e.h / 2 + p.expandCollapseSize),
              s.push([f.p, f.q]),
              s.push([e.x - u / 3, f.q]),
              (p = OrgChart.t(h.templateName, h.min, i)),
              s.push([
                s[s.length - 1][0],
                h.y + h.h / 2 + p.expandCollapseSize,
              ]),
              s.push([h.x, s[s.length - 1][1]]);
            break;
          case OrgChart.orientation.right:
          case OrgChart.orientation.right_top:
            (f.p = e.x + e.w),
              (f.q = e.y + e.h / 2 + p.expandCollapseSize),
              (f.r = a.maxX + u),
              (f.s = e.y + e.h / 2 + p.expandCollapseSize),
              s.push([f.p, f.q]),
              s.push([e.x + e.w + u / 3, f.q]),
              (p = OrgChart.t(h.templateName, h.min, i)),
              s.push([
                s[s.length - 1][0],
                h.y + h.h / 2 + p.expandCollapseSize,
              ]),
              s.push([h.x + h.w, s[s.length - 1][1]]);
        }
      else {
        switch (g.orientation) {
          case OrgChart.orientation.top:
          case OrgChart.orientation.top_left:
            s.push([f.p, f.q]), s.push([f.r, e.y - u / 3]);
            break;
          case OrgChart.orientation.bottom:
          case OrgChart.orientation.bottom_left:
            (f.q = e.y + e.h),
              (f.s = a.maxY - u),
              s.push([f.p, f.q]),
              s.push([f.r, e.y + e.h + u / 3]);
            break;
          case OrgChart.orientation.left:
          case OrgChart.orientation.left_top:
            (f.p = e.x),
              (f.q = e.y + e.h / 2 + p.expandCollapseSize),
              (f.r = a.minX - u),
              (f.s = e.y + e.h / 2 + p.expandCollapseSize),
              s.push([f.p, f.q]),
              s.push([e.x - u / 3, f.q]);
            break;
          case OrgChart.orientation.right:
          case OrgChart.orientation.right_top:
            (f.p = e.x + e.w),
              (f.q = e.y + e.h / 2 + p.expandCollapseSize),
              (f.r = a.maxX + u),
              (f.s = e.y + e.h / 2 + p.expandCollapseSize),
              s.push([f.p, f.q]),
              s.push([e.x + e.w + u / 3, f.q]);
        }
        for (var m = e, C = e; C.parent; ) C = C.parent;
        for (; null == h; ) {
          var O = !1,
            b = m.parent,
            v = b.leftNeighbor,
            y = b.rightNeighbor;
          if (
            (b.id == n.id
              ? (h = b)
              : OrgChart._intersects(b, f, g) &&
                ((f = OrgChart._addPoint(b, s, g, f, d)), (O = !0)),
            b.id != n.id)
          ) {
            for (; v; ) {
              if (v.id == n.id) {
                h = v;
                break;
              }
              OrgChart._intersects(v, f, g) &&
                ((f = OrgChart._addPoint(v, s, g, f, d)), (O = !0)),
                (v = v.leftNeighbor);
            }
            for (; y; ) {
              if (y.id == n.id) {
                h = y;
                break;
              }
              OrgChart._intersects(y, f, g) &&
                ((f = OrgChart._addPoint(y, s, g, f, d)), (O = !0)),
                (y = y.rightNeighbor);
            }
          }
          if (!O) {
            var x = s[s.length - 1][0],
              _ = 0;
            if (b.parent) {
              (u = g.levelSeparation),
                b.parent.layout && (u = g.mixedHierarchyNodesSeparation);
              var w = t.manager.bordersByRootIdAndLevel[C.id][b.parent.sl];
              switch (g.orientation) {
                case OrgChart.orientation.top:
                case OrgChart.orientation.top_left:
                  _ = w.maxY + u * (2 / 3);
                  break;
                case OrgChart.orientation.bottom:
                case OrgChart.orientation.bottom_left:
                  _ = w.minY - u * (2 / 3);
                  break;
                case OrgChart.orientation.left:
                case OrgChart.orientation.left_top:
                  (x = w.maxX + u * (2 / 3)), (_ = s[s.length - 1][1]);
                  break;
                case OrgChart.orientation.right:
                case OrgChart.orientation.right_top:
                  (x = w.minX - u * (2 / 3)), (_ = s[s.length - 1][1]);
              }
            }
            s.push([x, _]);
          }
          m = b;
        }
        switch (
          ((p = OrgChart.t(h.templateName, h.min, i)),
          s.splice(s.length - 1, 1),
          g.orientation)
        ) {
          case OrgChart.orientation.top:
          case OrgChart.orientation.top_left:
            s.push([h.x + h.w / 2 + p.expandCollapseSize, s[s.length - 1][1]]),
              s.push([s[s.length - 1][0], h.y + h.h]);
            break;
          case OrgChart.orientation.bottom:
          case OrgChart.orientation.bottom_left:
            s.push([h.x + h.w / 2 + p.expandCollapseSize, s[s.length - 1][1]]),
              s.push([s[s.length - 1][0], h.y]);
            break;
          case OrgChart.orientation.left:
          case OrgChart.orientation.left_top:
            s.push([s[s.length - 1][0], h.y + h.h / 2 + p.expandCollapseSize]),
              s.push([h.x + h.w, s[s.length - 1][1]]);
            break;
          case OrgChart.orientation.right:
          case OrgChart.orientation.right_top:
            s.push([s[s.length - 1][0], h.y + h.h / 2 + p.expandCollapseSize]),
              s.push([h.x, s[s.length - 1][1]]);
        }
      }
      var k = l.template;
      k || (k = "orange");
      var S,
        I,
        A = null;
      switch ((p = OrgChart.slinkTemplates[k]).labelPosition) {
        case "start":
          A = { x: s[1][0], y: s[1][1] };
          break;
        case "middle":
          var L = Math.ceil(s.length / 2);
          (S = s[L]),
            (I = s[L - 1]),
            (A = { x: (S[0] + I[0]) / 2, y: (S[1] + I[1]) / 2 });
          break;
        case "end":
          A = { x: s[s.length - 2][0], y: s[s.length - 2][1] };
      }
      o && (s = s.reverse()), s[0].unshift("M");
      for (var N = 1; N < s.length; N++) s[N].unshift("L");
      var E = OrgChart.roundPathCorners(s, OrgChart.LINK_ROUNDED_CORNERS, !1);
      if (l.label) {
        var M = p.label
            .replace("{x}", A.x)
            .replace("{y}", A.y)
            .replace("{val}", l.label),
          T = OrgChart._getLabelSize(M),
          B = -T.height / 2;
        switch (g.orientation) {
          case OrgChart.orientation.bottom:
          case OrgChart.orientation.bottom_left:
            B = T.height;
        }
        r += p.label
          .replace("{x}", A.x)
          .replace("{y}", A.y + B)
          .replace("{val}", l.label);
      }
      var U = e.id,
        R = n.id;
      o && ((U = n.id), (R = e.id)),
        (r +=
          (
            "<g " +
            OrgChart.attr.s_link_from +
            '="{from}" ' +
            OrgChart.attr.s_link_to +
            '="{to}">'
          )
            .replace("{from}", U)
            .replace("{to}", R) +
          p.link.replaceAll("{d}", E) +
          '<path stroke="transparent" stroke-width="15" fill="none" d="' +
          E +
          '" />'),
        (r += OrgChart.grCloseTag);
    }
    for (var o = 0; o < this.config.slinks.length; o++) {
      var l = this.config.slinks[o],
        s = t.getNode(l.from),
        h = t.getNode(l.to);
      s &&
        h &&
        -1 != e.res.visibleNodeIds.indexOf(h.id) &&
        -1 != e.res.visibleNodeIds.indexOf(s.id) &&
        (s.sl >= h.sl ? n(s, h, !1) : n(h, s, !0));
    }
    e.content += r;
  }),
  (OrgChart.prototype.addSlink = function (t, e, r, i) {
    this._putInUndoStack(), this.clearRedo();
    for (var a = this.config.slinks.length - 1; a >= 0; a--) {
      var n = this.config.slinks[a];
      n.from == t && n.to == e && this.config.slinks.splice(a, 1);
    }
    return (
      this.config.slinks.push({ from: t, to: e, label: r, template: i }),
      OrgChart.events.publish("updated", [this]),
      this
    );
  }),
  (OrgChart.prototype.removeSlink = function (t, e) {
    this._putInUndoStack(), this.clearRedo();
    for (var r = this.config.slinks.length - 1; r >= 0; r--) {
      var i = this.config.slinks[r];
      i.from == t && i.to == e && this.config.slinks.splice(r, 1);
    }
    return OrgChart.events.publish("updated", [this]), this;
  }),
  (OrgChart.slinkTemplates = {}),
  (OrgChart.slinkTemplates.orange = {
    defs: '<marker id="arrowSlinkOrange" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path fill="#F57C00" d="M 0 0 L 10 5 L 0 10 z" /></marker><marker id="dotSlinkOrange" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5"> <circle cx="5" cy="5" r="5" fill="#F57C00" /></marker>',
    link: '<path stroke-dasharray="4, 2" marker-start="url(#dotSlinkOrange)" marker-end="url(#arrowSlinkOrange)" stroke-linejoin="round" stroke="#F57C00" stroke-width="2" fill="none" d="{d}" />',
    label:
      '<text dominant-baseline="middle" fill="#F57C00" alignment-baseline="middle" text-anchor="middle" x="{x}" y="{y}">{val}</text>',
    labelPosition: "middle",
  }),
  (OrgChart.slinkTemplates.blue = {
    defs: '<marker id="arrowSlinkBlue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path fill="#039BE5" d="M 0 0 L 10 5 L 0 10 z" /></marker><marker id="dotSlinkBlue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5"> <circle cx="5" cy="5" r="5" fill="#039BE5" /></marker>',
    link: '<path stroke-dasharray="4, 2" marker-start="url(#dotSlinkBlue)" marker-end="url(#arrowSlinkBlue)" stroke-linejoin="round" stroke="#039BE5" stroke-width="2" fill="none" d="{d}" />',
    label:
      '<text fill="#039BE5" text-anchor="middle" x="{x}" y="{y}">{val}</text>',
    labelPosition: "middle",
  }),
  (OrgChart.slinkTemplates.yellow = {
    defs: '<marker id="arrowSlinkYellow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path fill="#FFCA28" d="M 0 0 L 10 5 L 0 10 z" /></marker><marker id="dotSlinkYellow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5"> <circle cx="5" cy="5" r="5" fill="#FFCA28" /></marker>',
    link: '<path stroke-dasharray="4, 2" marker-start="url(#dotSlinkYellow)" marker-end="url(#arrowSlinkYellow)" stroke-linejoin="round" stroke="#FFCA28" stroke-width="2" fill="none" d="{d}" />',
    label:
      '<text  fill="#FFCA28" text-anchor="middle" x="{x}" y="{y}">{val}</text>',
    labelPosition: "middle",
  }),
  OrgChart.events.on("renderbuttons", function (t, e) {
    if (e.node && e.node.tags && e.node.tags.has("group-dotted-lines")) {
      var r = t.getScale(),
        i = OrgChart.t(e.node.templateName, e.node.min, r),
        a = "";
      e.node.min
        ? (i.nodeGroupDottedOpenButton ||
            console.error(
              `[${e.node.templateName}].nodeGroupDottedOpenButton is not defined`
            ),
          (a += `<g style="cursor:pointer;"  data-ctrl-n-dotted-open="${e.node.id}" transform="matrix(1,0,0,1,${e.node.x},${e.node.y})">`),
          (a += i.nodeGroupDottedOpenButton))
        : (i.nodeGroupDottedCloseButton ||
            console.error(
              `[${e.node.templateName}].nodeGroupDottedCloseButton is not defined`
            ),
          (a += `<g style="cursor:pointer;" transform="matrix(1,0,0,1,${e.node.x},${e.node.y})" data-ctrl-n-dotted-close="${e.node.id}">`),
          (a += i.nodeGroupDottedCloseButton)),
        (a = (a += "</g>")
          .replaceAll("{cw}", e.node.w / 2)
          .replaceAll("{ch}", e.node.h / 2)
          .replaceAll(
            "{ew}",
            e.node.w - (e.node.padding ? e.node.padding[1] : 0)
          )
          .replaceAll(
            "{eh}",
            e.node.h - (e.node.padding ? e.node.padding[2] : 0)
          ));
      var n = t.getNode(e.node.stChildrenIds[0]);
      if (-1 != a.indexOf("{collapsed-children-count}")) {
        var o = OrgChart.collapsedChildrenCount(t, n);
        a = a.replace("{collapsed-children-count}", o);
      }
      if (-1 != a.indexOf("{collapsed-children-total-count}")) {
        var l = OrgChart.collapsedChildrenTotalCount(t, n);
        a = a.replace("{collapsed-children-total-count}", l);
      }
      if (-1 != a.indexOf("{children-count}")) {
        var s = OrgChart.childrenCount(t, n);
        a = a.replace("{children-count}", s);
      }
      if (-1 != a.indexOf("{children-total-count}")) {
        var h = OrgChart.childrenTotalCount(t, n);
        a = a.replace("{children-total-count}", h);
      }
      e.html += a;
    }
  }),
  OrgChart.events.on("redraw", function (t, e) {
    if (t.config.groupDottedLines.length) {
      for (
        var r = t.element.querySelectorAll("[data-ctrl-n-dotted-close]"), i = 0;
        i < r.length;
        i++
      )
        r[i].addEventListener("click", function () {
          var e = this.getAttribute("data-ctrl-n-dotted-close");
          t.minimize(e);
        });
      var a = t.element.querySelectorAll("[data-ctrl-n-dotted-open]");
      for (i = 0; i < a.length; i++)
        a[i].addEventListener("click", function () {
          var e = this.getAttribute("data-ctrl-n-dotted-open");
          t.maximize(e);
        });
    }
  }),
  void 0 === OrgChart && (OrgChart = {}),
  (OrgChart.prototype.undo = function (t) {
    if (this.config.undoRedoStorageName) {
      var e = this.undoStepsCount();
      if (0 != e) {
        this._putInRedoStack();
        var r = `${this.config.undoRedoStorageName}_undo_` + (e - 1),
          i = sessionStorage.getItem(r);
        sessionStorage.removeItem(r);
        var a = JSON.parse(i);
        (this.config.nodes = a.nodes),
          (this.config.clinks = a.clinks),
          (this.config.slinks = a.slinks),
          (this.config.groupDottedLines = a.groupDottedLines),
          (this.config.dottedLines = a.dottedLines),
          OrgChart.events.publish("updated", [this]),
          this.filterUI.update(),
          this.draw(OrgChart.action.update, void 0, t),
          this.undoRedoUI.refresh();
      }
    }
  }),
  (OrgChart.prototype.redo = function (t) {
    if (this.config.undoRedoStorageName) {
      var e = this.redoStepsCount();
      if (0 != e) {
        this._putInUndoStack();
        var r = `${this.config.undoRedoStorageName}_redo_` + (e - 1),
          i = sessionStorage.getItem(r);
        sessionStorage.removeItem(r);
        var a = JSON.parse(i);
        (this.config.nodes = a.nodes),
          (this.config.clinks = a.clinks),
          (this.config.slinks = a.slinks),
          (this.config.groupDottedLines = a.groupDottedLines),
          (this.config.dottedLines = a.dottedLines),
          OrgChart.events.publish("updated", [this]),
          this.filterUI.update(),
          this.draw(OrgChart.action.update, void 0, t),
          this.undoRedoUI.refresh();
      }
    }
  }),
  (OrgChart.prototype.clearRedo = function () {
    if (this.config.undoRedoStorageName) {
      for (
        var t = `${this.config.undoRedoStorageName}_redo_`,
          e = Object.keys(sessionStorage),
          r = 0;
        -1 != e.indexOf(t + r);

      )
        sessionStorage.removeItem(t + r), r++;
      this.undoRedoUI.refresh();
    }
  }),
  (OrgChart.prototype.clearUndo = function () {
    if (this.config.undoRedoStorageName) {
      for (
        var t = `${this.config.undoRedoStorageName}_undo_`,
          e = Object.keys(sessionStorage),
          r = 0;
        -1 != e.indexOf(t + r);

      )
        sessionStorage.removeItem(t + r), r++;
      this.undoRedoUI.refresh();
    }
  }),
  (OrgChart.prototype.undoStepsCount = function () {
    for (
      var t = `${this.config.undoRedoStorageName}_undo_`,
        e = Object.keys(sessionStorage),
        r = 0;
      -1 != e.indexOf(t + r);

    )
      r++;
    return r;
  }),
  (OrgChart.prototype.redoStepsCount = function () {
    for (
      var t = `${this.config.undoRedoStorageName}_redo_`,
        e = Object.keys(sessionStorage),
        r = 0;
      -1 != e.indexOf(t + r);

    )
      r++;
    return r;
  }),
  (OrgChart.prototype._putInUndoStack = function () {
    if (this.config.undoRedoStorageName) {
      var t =
        `${this.config.undoRedoStorageName}_undo_` + this.undoStepsCount();
      sessionStorage.setItem(
        t,
        JSON.stringify({
          nodes: this.config.nodes,
          clinks: this.config.clinks,
          slinks: this.config.slinks,
          groupDottedLines: this.config.groupDottedLines,
          dottedLines: this.config.dottedLines,
        })
      );
    }
  }),
  (OrgChart.prototype._putInRedoStack = function () {
    if (this.config.undoRedoStorageName) {
      var t =
        `${this.config.undoRedoStorageName}_redo_` + this.redoStepsCount();
      sessionStorage.setItem(
        t,
        JSON.stringify({
          nodes: this.config.nodes,
          clinks: this.config.clinks,
          slinks: this.config.slinks,
          groupDottedLines: this.config.groupDottedLines,
          dottedLines: this.config.dottedLines,
        })
      );
    }
  }),
  void 0 === OrgChart && (OrgChart = {}),
  (OrgChart.undoRedoUI = function () {
    (this.instance = null), (this._event_id = OrgChart._guid());
  }),
  (OrgChart.undoRedoUI.prototype.init = function (t) {
    t.config.undoRedoStorageName && ((this.instance = t), this.refresh());
  }),
  (OrgChart.undoRedoUI.prototype.refresh = function () {
    var t = this;
    if (this.instance.config.undoRedoStorageName) {
      var e = {
        undoStepsCount: this.instance.undoStepsCount(),
        redoStepsCount: this.instance.redoStepsCount(),
      };
      if (!1 !== OrgChart.events.publish("change", [this, e])) {
        var r = this.instance.element.querySelector("[data-undo]"),
          i = this.instance.element.querySelector("[data-redo]");
        if (!r || !i) {
          var a = document.createElement("div");
          a.classList.add("boc-undo-redo"),
            (a.innerHTML = `<span data-undo>${OrgChart.icon.undo(
              50,
              50,
              ""
            )}<span class="boc-undo-i"></span></span>\n                            <span data-redo>${OrgChart.icon.redo(
              50,
              50,
              ""
            )}<span class="boc-redo-i"></span></span>`),
            this.instance.element.appendChild(a),
            (r = this.instance.element.querySelector("[data-undo]")),
            (i = this.instance.element.querySelector("[data-redo]")),
            r.addEventListener("click", function () {
              t.instance.undo();
            }),
            i.addEventListener("click", function () {
              t.instance.redo();
            });
        }
        e.undoStepsCount > 0
          ? (r.classList.add("boc-ur-clickable"),
            (r.querySelector(".boc-undo-i").innerHTML = e.undoStepsCount),
            (r.querySelector(".boc-undo-i").style.display = "inline-block"))
          : (r.classList.remove("boc-ur-clickable"),
            (r.querySelector(".boc-undo-i").style.display = "none")),
          e.redoStepsCount > 0
            ? (i.classList.add("boc-ur-clickable"),
              (i.querySelector(".boc-redo-i").innerHTML = e.redoStepsCount),
              (i.querySelector(".boc-redo-i").style.display = "inline-block"))
            : (i.classList.remove("boc-ur-clickable"),
              (i.querySelector(".boc-redo-i").style.display = "none"));
      }
    }
  }),
  (OrgChart.undoRedoUI.prototype.on = function (t, e) {
    return OrgChart.events.on(t, e, this._event_id), this;
  }),
  (OrgChart.undoRedoUI.prototype.onChange = function (t) {
    return this.on("change", function (e, r) {
      return t.call(e, r);
    });
  }),
  OrgChart.events.on("redraw", function (t, e) {
    if (t.config.miniMap) {
      if (t.manager.action != OrgChart.action.move) {
        (OrgChart.miniMap._settings._scale = Math.min(
          OrgChart.miniMap.width /
            (t.response.boundary.maxX - t.response.boundary.minX),
          OrgChart.miniMap.height /
            (t.response.boundary.maxY - t.response.boundary.minY)
        )),
          (OrgChart.miniMap._settings._translateX =
            -t.response.boundary.minX * OrgChart.miniMap._settings._scale +
            (OrgChart.miniMap.width -
              (t.response.boundary.maxX - t.response.boundary.minX) *
                OrgChart.miniMap._settings._scale) /
              2),
          (OrgChart.miniMap._settings._translateY =
            -t.response.boundary.minY * OrgChart.miniMap._settings._scale +
            (OrgChart.miniMap.height -
              (t.response.boundary.maxY - t.response.boundary.minY) *
                OrgChart.miniMap._settings._scale) /
              2);
        var r = t.getViewBox();
        OrgChart.miniMap._init(t),
          OrgChart.miniMap._drawMainCanvas(t),
          OrgChart.miniMap._drawRectSelectorCanvas(t, r);
        var i,
          a,
          n,
          o,
          l = t.element.querySelector('[data-id="mini-map-focus"]'),
          s = !1,
          h = null;
        (l.onmousedown = function (t) {
          var e,
            n,
            o,
            h = l.getBoundingClientRect(),
            d = h.left,
            c = h.top;
          if (
            ((i = parseInt(t.clientX - d)),
            (a = parseInt(t.clientY - c)),
            (e = a),
            (n =
              (i - OrgChart.miniMap._settings._translateX) /
              OrgChart.miniMap._settings._scale),
            (o =
              (e - OrgChart.miniMap._settings._translateY) /
              OrgChart.miniMap._settings._scale),
            n > r[0] && n < r[0] + r[2] && o > r[1] && o < r[1] + r[3])
          )
            return t.preventDefault(), t.stopPropagation(), void (s = !0);
        }),
          (l.onmousemove = function (e) {
            if (s) {
              e.preventDefault(),
                e.stopPropagation(),
                (OrgChart.miniMap._mouseMove = !0);
              var d = l.getBoundingClientRect(),
                c = d.left,
                g = d.top;
              (n = parseInt(e.clientX - c)), (o = parseInt(e.clientY - g));
              var p = (n - i) / OrgChart.miniMap._settings._scale,
                u = (o - a) / OrgChart.miniMap._settings._scale;
              (r[0] = p + r[0]),
                (r[1] = u + r[1]),
                t.setViewBox(r),
                h && (clearTimeout(h), (h = null)),
                (h = setTimeout(function () {
                  t._draw(!0, OrgChart.action.move);
                }, 300)),
                OrgChart.miniMap._drawRectSelectorCanvas(t, r),
                (i = n),
                (a = o);
            }
          }),
          (l.onmouseup = function (t) {
            s && (t.preventDefault(), t.stopPropagation(), (s = !1));
          }),
          (l.onmouseout = function (t) {
            s &&
              (t.preventDefault(),
              t.stopPropagation(),
              (s = !1),
              (OrgChart.miniMap._mouseMove = !1));
          }),
          (l.onclick = function (e) {
            if (
              (e.preventDefault(),
              e.stopPropagation(),
              OrgChart.miniMap._mouseMove)
            )
              OrgChart.miniMap._mouseMove = !1;
            else {
              var i = l.getBoundingClientRect(),
                a = i.left,
                s = i.top;
              (n = parseInt(e.clientX - a)), (o = parseInt(e.clientY - s));
              var d = n / OrgChart.miniMap._settings._scale,
                c = o / OrgChart.miniMap._settings._scale;
              (r[0] =
                d -
                (r[0] + r[2] - r[0]) / 2 -
                OrgChart.miniMap._settings._translateX /
                  OrgChart.miniMap._settings._scale),
                (r[1] =
                  c -
                  (r[1] + r[3] - r[1]) / 2 -
                  OrgChart.miniMap._settings._translateY /
                    OrgChart.miniMap._settings._scale),
                t.setViewBox(r),
                h && (clearTimeout(h), (h = null)),
                (h = setTimeout(function () {
                  t._draw(!0, OrgChart.action.move);
                }, 300)),
                OrgChart.miniMap._drawRectSelectorCanvas(t, r);
            }
          });
      }
    } else {
      var d = t.element.querySelector('[data-id="mini-map"]');
      d && d.parentNode.removeChild(d);
    }
  }),
  (OrgChart.miniMap = {}),
  (OrgChart.miniMap._settings = { _translateX: 0, _translateY: 0, _scale: 1 }),
  (OrgChart.miniMap._drawMainCanvas = function (t) {
    var e = t.element.querySelector('[data-id="mini-map-main"]'),
      r = e.getContext("2d");
    OrgChart.miniMap._initCtx(t, e, 1);
    var i = 0,
      a = [];
    !(function t(e, n) {
      if (Array.isArray(n)) for (var o = 0; o < n.length; o++) t(e, n[o]);
      else {
        (r.fillStyle = OrgChart.miniMap.colors[3]),
          r.beginPath(),
          (r.lineWidth = "0.5"),
          r.fillRect(n.x, n.y, n.w, n.h),
          r.strokeRect(n.x, n.y, n.w, n.h);
        for (o = 0; o < n.stChildrenIds.length; o++)
          i++,
            a.includes(n.id) ||
              (1 == i
                ? (r.fillStyle = OrgChart.miniMap.colors[0])
                : 2 == i
                ? (r.fillStyle = OrgChart.miniMap.colors[1])
                : 3 == i && (r.fillStyle = OrgChart.miniMap.colors[2]),
              r.beginPath(),
              r.fillRect(n.x, n.y, n.w, n.h),
              r.strokeRect(n.x, n.y, n.w, n.h),
              a.push(n.id)),
            t(e, e.getNode(n.stChildrenIds[o])),
            i--;
        for (o = 0; o < n.childrenIds.length; o++)
          t(e, e.getNode(n.childrenIds[o]));
      }
    })(t, t.roots);
  }),
  (OrgChart.miniMap._drawRectSelectorCanvas = function (t, e) {
    var r = t.element.querySelector('[data-id="mini-map-focus"]'),
      i = r.getContext("2d");
    OrgChart.miniMap._initCtx(t, r, OrgChart.miniMap.opacity);
    var a = e[0],
      n = e[1],
      o = e[2],
      l = e[3];
    (i.lineWidth = 0.5 / OrgChart.miniMap._settings._scale),
      (i.strokeStyle = OrgChart.miniMap.focusStroke),
      (i.globalAlpha = 1),
      i.clearRect(a, n, o, l),
      i.strokeRect(a, n, o, l);
  }),
  (OrgChart.miniMap._initCtx = function (t, e, r) {
    var i = e.getContext("2d");
    (e.width = e.width),
      (e.height = e.height),
      i.clearRect(0, 0, OrgChart.miniMap.width, OrgChart.miniMap.height),
      (i.globalAlpha = r),
      1 != r &&
        ((i.fillStyle = OrgChart.miniMap.selectorBackgroundColor),
        i.fillRect(0, 0, OrgChart.miniMap.width, OrgChart.miniMap.height)),
      i.translate(
        OrgChart.miniMap._settings._translateX,
        OrgChart.miniMap._settings._translateY
      ),
      i.scale(
        OrgChart.miniMap._settings._scale,
        OrgChart.miniMap._settings._scale
      );
  }),
  (OrgChart.miniMap._init = function (t) {
    if (!t.element.querySelector('[data-id="mini-map"]')) {
      var e = document.createElement("canvas");
      (e.width = OrgChart.miniMap.width),
        (e.height = OrgChart.miniMap.height),
        e.setAttribute("data-id", "mini-map-main"),
        (e.style.display = "inline-block"),
        (e.style.backgroundColor = OrgChart.miniMap.backgroundColor),
        (e.style.position = "absolute"),
        (e.style.top = 0),
        (e.style.left = 0);
      var r = document.createElement("canvas");
      (r.width = OrgChart.miniMap.width),
        (r.height = OrgChart.miniMap.height),
        r.setAttribute("data-id", "mini-map-focus"),
        (r.style.display = "inline-block"),
        (r.style.position = "absolute"),
        (r.style.top = 0),
        (r.style.left = 0);
      var i = document.createElement("div");
      i.setAttribute("data-id", "mini-map"), (i.style.position = "absolute");
      for (
        var a = ["top", "right", "left", "bottom"], n = 0;
        n < a.length;
        n++
      ) {
        var o = a[n];
        OrgChart.isNEU(OrgChart.miniMap.position[o]) ||
          ("padding" == OrgChart.miniMap.position[o]
            ? (i.style[o] = t.config.padding + "px")
            : (i.style[o] = OrgChart.miniMap.position[o] + "px"));
      }
      (i.style.border = OrgChart.miniMap.border),
        (i.style.padding = OrgChart.miniMap.padding + "px"),
        (i.style.backgroundColor = OrgChart.miniMap.backgroundColor);
      var l = document.createElement("div");
      (l.style.position = "relative"),
        (l.style.width = OrgChart.miniMap.width + "px"),
        (l.style.height = OrgChart.miniMap.height + "px"),
        l.appendChild(e),
        l.appendChild(r),
        i.appendChild(l),
        t.element.appendChild(i);
      var s = function (e, r) {
        t.__mouseScrollHandler(i, r);
      };
      t._addEvent(i, "DOMMouseScroll", s), t._addEvent(i, "mousewheel", s);
      var h = 0,
        d = 0,
        c = function (t) {
          OrgChart.miniMap._mouseMove = !0;
          var e = t.clientX - h,
            r = t.clientY - d;
          if (!OrgChart.isNEU(i.style.left)) {
            var a = parseFloat(i.style.left) + e;
            i.style.left = `${a}px`;
          }
          if (!OrgChart.isNEU(i.style.right)) {
            var n = parseFloat(i.style.right) - e;
            i.style.right = `${n}px`;
          }
          if (!OrgChart.isNEU(i.style.bottom)) {
            var o = parseFloat(i.style.bottom) - r;
            i.style.bottom = `${o}px`;
          }
          if (!OrgChart.isNEU(i.style.top)) {
            var l = parseFloat(i.style.top) + r;
            i.style.top = `${l}px`;
          }
          (h = t.clientX), (d = t.clientY);
        },
        g = function () {
          document.removeEventListener("mousemove", c),
            document.removeEventListener("mouseup", g);
        };
      OrgChart.miniMap.draggable &&
        i.addEventListener("mousedown", function (t) {
          (h = t.clientX),
            (d = t.clientY),
            document.addEventListener("mousemove", c),
            document.addEventListener("mouseup", g);
        });
    }
  }),
  (OrgChart.miniMap.colors = ["#E0E0E0", "#BDBDBD", "#9E9E9E", "#757575"]),
  (OrgChart.miniMap.selectorBackgroundColor = "white"),
  (OrgChart.miniMap.backgroundColor = "white"),
  (OrgChart.miniMap.focusStroke = "#f57c00"),
  (OrgChart.miniMap.opacity = 0.4),
  (OrgChart.miniMap.border = "1px solid #aeaeae"),
  (OrgChart.miniMap.width = 250),
  (OrgChart.miniMap.height = 140),
  (OrgChart.miniMap.padding = 5),
  (OrgChart.miniMap.position = {
    top: void 0,
    left: "padding",
    right: void 0,
    bottom: "padding",
  }),
  (OrgChart.miniMap.draggable = !0),
  (OrgChart._search = {}),
  (OrgChart._search.search = function (t, e, r, i, a, n, o) {
    var l = [],
      s = e.toLowerCase(),
      h = s.split(" ");
    if (o && h.length > 1) {
      var d = h[0];
      o[d] && ((r = [o[d]]), (h = (s = s.replace(d, "").trim()).split(" ")));
    }
    h = h.filter(function (t, e, r) {
      return r.indexOf(t) === e;
    });
    for (var c = {}, g = 0; g < t.length; g++)
      for (var p = t[g], u = 0; u < r.length; u++) {
        var f = r[u];
        if (!OrgChart.isNEU(p[f])) {
          var m = p[f];
          if (
            null != (e = OrgChart._search.searchAndComputeScore(h, m, f, n))
          ) {
            var C = p.id;
            if (c[C]) {
              if (c[C] && c[C] < e.__score) {
                c[C] = e.__score;
                for (var O = l.length - 1; O >= 0; O--)
                  l[O].id == C && l.splice(O, 1);
                OrgChart._search.addNodeToResult(l, i, p, e, f, a);
              }
            } else
              (c[C] = e.__score),
                OrgChart._search.addNodeToResult(l, i, p, e, f, a);
          }
        }
      }
    return (
      l.sort(function (t, e) {
        return t.__score < e.__score ? 1 : t.__score > e.__score ? -1 : 0;
      }),
      l
    );
  }),
  (OrgChart._search.addNodeToResult = function (t, e, r, i, a, n) {
    var o = {};
    (o.id = r.id), OrgChart.isNEU(r[n]) || (o[n] = r[n]);
    for (var l = 0; l < e.length; l++) {
      var s = e[l];
      OrgChart.isNEU(r[s]) || (OrgChart.isNEU(o[s]) && (o[s] = r[s]));
    }
    null != i &&
      (OrgChart.isNEU(o.__score) && (o.__score = i.__score),
      OrgChart.isNEU(o.__searchField) && (o.__searchField = a),
      OrgChart.isNEU(o.__searchMarks) && (o.__searchMarks = i.__searchMarks)),
      t.push(o);
  }),
  (OrgChart._search.searchAndComputeScore = function (t, e, r, i) {
    if (OrgChart.isNEU(e)) return null;
    if (OrgChart.isNEU(t)) return null;
    if (!t.length) return null;
    "string" != typeof e && (e = e.toString());
    var a = e.toLowerCase(),
      n = OrgChart._search.searchIndexesOf(a, t);
    if (!n.length) return null;
    for (
      var o = a.length / 100, l = 0, s = 0, h = l > 0 ? 100 : 0, d = 0, c = 0;
      c < t.length;
      c++
    )
      for (var g = t[c], p = 0; p < n.length; p++)
        if (-1 != g.indexOf(n[p].searchPhrase)) {
          d++;
          break;
        }
    var u = 100 / (t.length / d);
    if (n.length) {
      s = n[0].start;
      for (p = 0; p < n.length; p++)
        if (
          ((l += n[p].length),
          n[p].start < s && (s = n[p].start),
          p >= 1 && n[p - 1].start > n[p].start)
        ) {
          h = 0;
          break;
        }
    }
    var f = 0;
    0 != l && (f = l / o);
    var m = l > 0 ? 100 : 0;
    0 != s && (m = 100 - s / o);
    var C = 0;
    i && i[r] && (C = i[r]),
      u && (u = (u / 100) * 50),
      f > 0 && (f = (f / 100) * 10),
      m > 0 && (m = (m / 100) * 10),
      h > 0 && (h = (h / 100) * 10),
      C > 0 && (C = (C / 100) * 20);
    var O = Math.round(1e4 * (u + f + m + h + C));
    n.sort(function (t, e) {
      return t.start < e.start ? -1 : t.start > e.start ? 1 : 0;
    });
    var b = e;
    for (p = n.length - 1; p >= 0; p--)
      b = (b = b.insert(n[p].start + n[p].length, "</mark>")).insert(
        n[p].start,
        "<mark>"
      );
    return { __searchMarks: b, __score: O };
  }),
  (OrgChart._search.searchIndexesOf = function (t, e) {
    var r = [];
    if (!OrgChart.isNEU(t))
      for (var i = 0; i < e.length; i++) {
        var a = e[i];
        if (!OrgChart.isNEU(a))
          for (var n = 0; (n = t.indexOf(a, n)) > -1; )
            r.push({ length: a.length, start: n, searchPhrase: a }),
              (n += a.length);
      }
    return (
      r.sort(function (t, e) {
        return t.length < e.length
          ? 1
          : t.length > e.length || t.start < e.start
          ? -1
          : t.start > e.start
          ? 1
          : 0;
      }),
      (r = r.filter(function (t) {
        for (var e = !1, i = 0; i < r.length; i++) {
          var a = r[i].start,
            n = r[i].start + r[i].length - 1,
            o = t.start,
            l = t.start + t.length - 1;
          if (a == o && n == l) {
            e = !1;
            break;
          }
          if (a >= o && n <= l) {
            e = !0;
            break;
          }
          if (a <= o && n >= l) {
            e = !0;
            break;
          }
        }
        return !e;
      }))
    );
  }),
  OrgChart.events.on("redraw", function (t, e) {
    if (t.config.state) {
      var r = [],
        i = [];
      !(function t(e) {
        if (Array.isArray(e)) for (var a = 0; a < e.length; a++) t(e[a]);
        else {
          ("string" != typeof e.id ||
            ("string" == typeof e.id &&
              -1 == e.id.indexOf("split") &&
              -1 == e.id.indexOf("mirror"))) &&
            (r.push(e.id), 1 == e.min && i.push(e.id));
          for (a = 0; a < e.stChildren.length; a++) t(e.stChildren[a]);
          for (a = 0; a < e.children.length; a++) t(e.children[a]);
        }
      })(t.roots),
        OrgChart.state._put(
          t.config.roots,
          t.width(),
          t.height(),
          t.response.viewBox,
          r,
          i,
          t.response.adjustify,
          t.config.state
        );
    }
  }),
  (OrgChart.state = {}),
  (OrgChart.state._buildStateNames = function (t) {
    return {
      paramScale: t + "-scale",
      paramX: t + "-x",
      paramY: t + "-y",
      paramExp: t + "-exp",
      paramMin: t + "-min",
      paramRoots: t + "-roots",
      paramAdjustify: t + "-adjustify",
    };
  }),
  (OrgChart.state._put = function (t, e, r, i, a, n, o, l) {
    if (l && !OrgChart.isNEU(a) && 0 != a.length) {
      var s = OrgChart.state._buildStateNames(l.name),
        h = {
          roots: t,
          scale: Math.min(e / i[2], r / i[3]),
          x: i[0],
          y: i[1],
          exp: a,
          min: n,
          adjustify: o,
        };
      if (l.writeToUrlParams) {
        var d = new URLSearchParams(window.location.search);
        d.has(s.paramScale)
          ? d.set(s.paramScale, h.scale)
          : d.append(s.paramScale, h.scale),
          d.has(s.paramX) ? d.set(s.paramX, h.x) : d.append(s.paramX, h.x),
          d.has(s.paramY) ? d.set(s.paramY, h.y) : d.append(s.paramY, h.y),
          d.has(s.paramExp)
            ? d.set(s.paramExp, h.exp.join("*"))
            : d.append(s.paramExp, h.exp.join("*")),
          d.has(s.paramRoots) && Array.isArray(h.roots)
            ? d.set(s.paramRoots, h.roots.join("*"))
            : Array.isArray(h.roots) &&
              d.append(s.paramRoots, h.roots.join("*")),
          d.has(s.paramMin)
            ? d.set(s.paramMin, h.min.join("*"))
            : d.append(s.paramMin, h.min.join("*")),
          d.has(s.paramAdjustify)
            ? d.set(s.paramAdjustify, h.adjustify.x + "*" + h.adjustify.y)
            : d.append(s.paramAdjustify, h.adjustify.x + "*" + h.adjustify.y),
          window.history.replaceState(null, null, "?" + d);
      }
      l.writeToIndexedDB &&
        ((h.id = l.name),
        OrgChart.idb.put(h, function (t) {
          0 == t && console.error("Cannot write row - " + l.name);
        })),
        l.writeToLocalStorage &&
          OrgChart.localStorage.setItem(l.name, JSON.stringify(h));
    }
  }),
  (OrgChart.state._get = function (t, e, r, i) {
    if (t) {
      var a = OrgChart.state._buildStateNames(t.name);
      if (t.readFromUrlParams) {
        var n = new URLSearchParams(window.location.search);
        if (
          n.has(a.paramScale) &&
          n.has(a.paramX) &&
          n.has(a.paramY) &&
          n.has(a.paramExp) &&
          n.has(a.paramMin) &&
          n.has(a.paramAdjustify)
        ) {
          var o = {},
            l = parseFloat(n.get(a.paramScale)),
            s = parseFloat(n.get(a.paramX)),
            h = parseFloat(n.get(a.paramY));
          ((c = [])[0] = s),
            (c[1] = h),
            (c[2] = e / l),
            (c[3] = r / l),
            (o.vb = c),
            (o.scale = l),
            (o.x = s),
            (o.y = h),
            (o.roots = null),
            n.has(a.paramRoots) && (o.roots = n.get(a.paramRoots).split("*")),
            (o.exp = n.get(a.paramExp).split("*")),
            (o.min = n.get(a.paramMin).split("*"));
          var d = n.get(a.paramAdjustify).split("*");
          return (
            (o.adjustify = { x: parseFloat(d[0]), y: parseFloat(d[1]) }),
            void i(o)
          );
        }
        if (!t.readFromIndexedDB && !t.readFromLocalStorage)
          return void i(null);
      }
      if (t.readFromLocalStorage) {
        var c;
        if (null != (o = OrgChart.localStorage.getItem(t.name)))
          return (
            (o = JSON.parse(o)),
            ((c = [])[0] = o.x),
            (c[1] = o.y),
            (c[2] = e / o.scale),
            (c[3] = r / o.scale),
            (o.vb = c),
            void i(o)
          );
        if (!t.readFromIndexedDB) return void i(null);
      }
      t.readFromIndexedDB &&
        OrgChart.idb.read(t.name, function (a, n) {
          if (0 == a) console.error("Cannot read from - " + t.name), i(null);
          else if (null == a) i(null);
          else {
            var o = [];
            (o[0] = n.x),
              (o[1] = n.y),
              (o[2] = e / n.scale),
              (o[3] = r / n.scale),
              (n.vb = o),
              i(n);
          }
        });
    } else i(null);
  }),
  (OrgChart.state.clear = function (t) {
    if (!t) return !1;
    try {
      localStorage.removeItem(t);
      var e = OrgChart.state._buildStateNames(t),
        r = new URLSearchParams(window.location.search);
      r.has(e.paramScale) && r.delete(e.paramScale),
        r.has(e.paramX) && r.delete(e.paramX),
        r.has(e.paramY) && r.delete(e.paramY),
        r.has(e.paramExp) && r.delete(e.paramExp),
        r.has(e.paramRoots) && r.delete(e.paramRoots),
        r.has(e.paramMin) && r.delete(e.paramMin),
        r.has(e.paramAdjustify) && r.delete(e.paramAdjustify),
        window.history.replaceState(null, null, "?" + r),
        OrgChart.idb.delete(t, function (e) {
          0 == e && console.error("Cannot delete row - " + t);
        });
    } catch {}
  }),
  (OrgChart._magnify = {}),
  (OrgChart.prototype.magnify = function (t, e, r, i, a) {
    i || (i = this.config.anim);
    var n = this.getNode(t),
      o = this.getNodeElement(t);
    if (n || o) {
      var l = OrgChart._magnify[t];
      if (
        (l &&
          (null != l.timer && clearInterval(l.timer),
          null != l.timerBack && clearInterval(l.timerBack),
          o.setAttribute(
            "transform",
            "matrix(" + l.transformStart.toString() + ")"
          ),
          (OrgChart._magnify[t] = null)),
        r)
      )
        (o = o.cloneNode(!0)), this.getSvg().appendChild(o);
      var s = OrgChart._getTransform(o),
        h = JSON.parse(JSON.stringify(s));
      (h[0] = e), (h[3] = e);
      var d = n.w + n.w * (e - 1),
        c = n.h + n.h * (e - 1);
      (h[4] += (n.w - d) / 2), (h[5] += (n.h - c) / 2);
      var g = OrgChart.animate(
        o,
        { transform: s },
        { transform: h },
        i.duration,
        i.func
      );
      (OrgChart._magnify[t] = {
        timer: g,
        transformStart: s,
        nodeElement: o,
        front: r,
      }),
        a && a(o);
    }
  }),
  (OrgChart.prototype.magnifyBack = function (t, e, r) {
    e || (e = this.config.anim);
    var i = OrgChart._magnify[t];
    if (i) {
      null != i.timer && clearInterval(i.timer),
        null != i.timerBack && clearInterval(i.timerBack);
      var a = OrgChart._getTransform(i.nodeElement);
      i.timerBack = OrgChart.animate(
        i.nodeElement,
        { transform: a },
        { transform: i.transformStart },
        e.duration,
        e.func,
        function (t) {
          var e = t[0].getAttribute(OrgChart.attr.node_id);
          OrgChart._magnify[e] &&
            OrgChart._magnify[e].front &&
            (t[0].parentNode.removeChild(t[0]), (OrgChart._magnify[e] = null)),
            r && r(t[0]);
        }
      );
    }
  }),
  void 0 === OrgChart && (OrgChart = {}),
  OrgChart.events.on("init", function (t, e) {
    if (
      t.config.keyNavigation &&
      (t._addEvent(window, "keydown", t._windowKeyDownHandler),
      OrgChart.isNEU(t._keyNavigationActiveNodeId) && t.roots && t.roots.length)
    ) {
      var r = t.roots[0].id;
      OrgChart.isNEU(t.config.keyNavigation.focusId) ||
        (r = t.config.keyNavigation.focusId),
        (t._keyNavigationActiveNodeId = r),
        t.center(t._keyNavigationActiveNodeId);
    }
  }),
  (OrgChart.prototype._windowKeyDownHandler = function (t, e) {
    for (var r = e.target, i = null; r && r != this.element; ) {
      if (r.hasAttribute && r.hasAttribute(OrgChart.attr.node_id)) {
        i = r.getAttribute(OrgChart.attr.node_id);
        break;
      }
      r = r.parentNode;
    }
    if (r) {
      var a = i ? this.getNode(i) : null,
        n = { node: a, data: i ? this.get(i) : null, event: e };
      if (!1 !== OrgChart.events.publish("key-down", [this, n]) && a)
        if ("KeyF" == e.code) this.searchUI.find("");
        else if (
          "ArrowRight" == e.code ||
          (a.isAssistant && "ArrowDown" == e.code) ||
          (a.isPartner && "ArrowDown" == e.code)
        ) {
          if ((s = this.getNode(a.pid))) {
            var o = s.childrenIds.indexOf(a.id);
            if (++o < s.childrenIds.length) {
              var l = s.childrenIds[o];
              (this._keyNavigationActiveNodeId = l), this.center(l);
            }
          }
        } else if ("ArrowLeft" == e.code) {
          if ((s = this.getNode(a.pid))) {
            o = s.childrenIds.indexOf(a.id);
            if (--o >= 0) {
              l = s.childrenIds[o];
              (this._keyNavigationActiveNodeId = l), this.center(l);
            }
          }
        } else if ("ArrowUp" == e.code) {
          var s;
          if ((s = this.getNode(a.pid))) {
            l = s.id;
            if (
              a.isAssistant ||
              s.hasAssistants ||
              a.isPartner ||
              s.hasPartners
            ) {
              o = s.childrenIds.indexOf(a.id);
              --o >= 0 && (l = s.childrenIds[o]);
            }
            (this._keyNavigationActiveNodeId = l), this.center(l);
          }
        } else if ("ArrowDown" == e.code)
          a.childrenIds.length &&
            ((this._keyNavigationActiveNodeId = a.childrenIds[0]),
            this.center(a.childrenIds[0]));
        else if ("Space" == e.code) {
          var h = r.getAttribute(OrgChart.attr.node_id);
          return void this.toggleExpandCollapse(h, e);
        }
    }
  }),
  OrgChart.events.on("redraw", function (t, e) {
    t.config.keyNavigation && OrgChart._keyNavigation(t);
  }),
  OrgChart.events.on("click", function (t, e) {
    t.config &&
      t.config.keyNavigation &&
      ((t._keyNavigationActiveNodeId = e.node.id), t.center(e.node.id));
  }),
  (OrgChart._keyNavigation = function (t) {
    var e = t.element.querySelector(":focus");
    if (
      e &&
      e.parentElement &&
      e.parentElement.hasAttribute(OrgChart.attr.node_id)
    ) {
      var r = e.parentElement;
      (a = (i = e).querySelector("title")) && a.parentNode.removeChild(a),
        i.removeAttribute("tabindex");
    }
    if (
      !OrgChart.isNEU(t._keyNavigationActiveNodeId) &&
      (r = t.getNodeElement(t._keyNavigationActiveNodeId)) &&
      r.children.length
    ) {
      var i;
      (i = r.children[0]).setAttribute("tabindex", 2);
      var a,
        n = { text: "", id: t._keyNavigationActiveNodeId };
      if (
        (OrgChart.events.publish("screen-reader-text", [t, n]),
        !OrgChart.isNEU(n.text))
      )
        ((a = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "title"
        )).innerHTML = n.text),
          i.appendChild(a);
      OrgChart.SEARCH_CLOSE_RESULT_ON_ESCAPE_OR_CLICKOUTSIDE &&
        t.searchUI.hide(),
        i.focus();
    }
  }),
  (OrgChart.elements = {}),
  (OrgChart.elements.textbox = function (t, e, r, i) {
    var a = OrgChart.elements._vidrf(t, e, i);
    if (a.doNotRender) return { html: "" };
    var n = "";
    return (
      e.btn &&
        (n = `<a href="#" data-input-btn="" class="boc-link boc-link-boc-button">${e.btn}</a>`),
      {
        html: `<div class="boc-form-field" style="min-width: ${r};">\n                    <div class="boc-input" data-boc-input="" ${
          a.disabledAttribute
        } ${a.vlidators}>\n                        <label for="${
          a.id
        }">${OrgChart._escapeGreaterLessSign(
          a.label
        )}</label>\n                        <input ${
          a.readOnlyAttribute
        } data-binding="${OrgChart._escapeDoubleQuotes(
          a.binding
        )}" maxlength="256" id="${a.id}" name="${
          a.id
        }" type="text" value="${OrgChart._escapeDoubleQuotes(
          a.value
        )}" autocomplete="off">\n                        ${n}\n                    </div>\n                </div>`,
        id: a.id,
        value: a.value,
      }
    );
  }),
  (OrgChart.elements.checkbox = function (t, e, r, i) {
    var a = OrgChart.elements._vidrf(t, e, i);
    if (a.doNotRender) return { html: "" };
    var n = a.value ? "checked" : "",
      o = i ? 'onclick="return false;"' : "";
    return {
      html: `<div class="boc-form-field"  style="min-width: ${r};" >\n                        <label class="boc-checkbox" data-boc-input="" ${
        a.disabledAttribute
      }>\n                            <input ${n} ${o} data-binding="${OrgChart._escapeDoubleQuotes(
        a.binding
      )}" type="checkbox"><span class="boc-checkbox-checkmark" type="checkbox"></span>${OrgChart._escapeGreaterLessSign(
        a.label
      )}\n                        </label>\n                    </div>`,
      id: a.id,
      value: n,
    };
  }),
  (OrgChart.elements.select = function (t, e, r, i) {
    if (i) return OrgChart.elements.textbox(t, e, r, i);
    var a = OrgChart.elements._vidrf(t, e, i);
    return a.doNotRender
      ? { html: "" }
      : {
          html: `<div class="boc-form-field" style="min-width: ${r};">\n                    <div class="boc-input" data-boc-input="" ${
            a.disabledAttribute
          } ${a.vlidators}>\n                        <label for="${
            a.id
          }">${OrgChart._escapeGreaterLessSign(
            a.label
          )}</label>\n                        <select data-binding="${OrgChart._escapeDoubleQuotes(
            a.binding
          )}" ${a.readOnlyAttribute} id="${a.id}" name="${
            a.id
          }">\n                            ${(function () {
            for (var t = "", e = 0; e < a.options.length; e++) {
              var r = a.options[e];
              t += `<option ${
                r.value == a.value ? "selected" : ""
              } value="${OrgChart._escapeDoubleQuotes(
                r.value
              )}">${OrgChart._escapeGreaterLessSign(r.text)}</option>`;
            }
            return t;
          })()}                           \n                        </select>\n                    </div>\n                </div>`,
          id: a.id,
          value: a.value,
        };
  }),
  (OrgChart.elements.multiSelect = function (t, e, r, i) {
    if (i) return OrgChart.elements.textbox(t, e, r, i);
    var a = OrgChart.elements._vidrf(t, e, i);
    return a.doNotRender
      ? { html: "" }
      : {
          html: `<div class="boc-form-field" style="min-width: ${r};">\n                    <div class="boc-input" data-boc-input="" ${
            a.disabledAttribute
          } ${a.vlidators}>\n                        <label for="${
            a.id
          }">${OrgChart._escapeGreaterLessSign(
            a.label
          )}</label>\n                        <select class="multiple" data-binding="${OrgChart._escapeDoubleQuotes(
            a.binding
          )}" ${a.readOnlyAttribute} id="${a.id}" name="${
            a.id
          }" multiple>\n                            ${(function () {
            for (var t = "", e = 0; e < a.options.length; e++) {
              var r = a.options[e];
              t += `<option ${
                a.value.includes(r.value) ? "selected" : ""
              } value="${OrgChart._escapeDoubleQuotes(
                r.value
              )}">${OrgChart._escapeGreaterLessSign(r.text)}</option>`;
            }
            return t;
          })()}                           \n                        </select>\n                    </div>\n                </div>`,
          id: a.id,
          value: a.value,
        };
  }),
  (OrgChart.elements.date = function (t, e, r, i) {
    var a = OrgChart.elements._vidrf(t, e, i);
    return a.doNotRender
      ? { html: "" }
      : {
          html: `<div class="boc-form-field" style="min-width: ${r};">\n                    <div class="boc-input" data-boc-input="" ${
            a.disabledAttribute
          } ${a.vlidators}>\n                        <label for="${
            a.id
          }" class="hasval">${OrgChart._escapeGreaterLessSign(
            a.label
          )}</label>\n                        <input data-binding="${OrgChart._escapeDoubleQuotes(
            a.binding
          )}" ${a.readOnlyAttribute} maxlength="256" id="${a.id}" name="${
            a.id
          }" type="date" value="${OrgChart._escapeDoubleQuotes(
            a.value
          )}" autocomplete="off">\n                    </div>\n                </div>`,
          id: a.id,
          value: a.value,
        };
  }),
  (OrgChart.elements._vidrf = function (t, e, r) {
    var i = {};
    if (
      (e.binding || (e.binding = ""),
      e.label || (e.label = ""),
      "select" != e.type || Array.isArray(e.options)
        ? (i.options = e.options)
        : (i.options = []),
      (i.value = t && !OrgChart.isNEU(t[e.binding]) ? t[e.binding] : ""),
      r && i.options)
    )
      for (var a = 0; a < i.options.length; a++)
        if (i.options[a].value == i.value) {
          i.value = i.options[a].text;
          break;
        }
    if (
      ((i.id = OrgChart.elements.generateId()),
      (i.disabledAttribute = r ? "data-boc-input-disabled" : ""),
      (i.readOnlyAttribute = r ? "readonly" : ""),
      (i.id = i.id),
      r && OrgChart.isNEU(i.value) && (i.doNotRender = !0),
      r && "photo" == e.binding && ((i.id = null), (i.doNotRender = !0)),
      (i.binding = e.binding),
      (i.label = e.label),
      (i.vlidators = ""),
      e.vlidators)
    )
      for (var n in e.vlidators)
        i.vlidators += `data-v-${n}="${e.vlidators[n]}" `;
    return i;
  }),
  (OrgChart.elements.ids = []),
  (OrgChart.elements.generateId = function () {
    for (;;) {
      var t =
        "_" +
        ("0000" + ((Math.random() * Math.pow(36, 4)) | 0).toString(36)).slice(
          -4
        );
      if (!OrgChart.elements.ids.has(t))
        return OrgChart.elements.ids.push(t), t;
    }
  }),
  (OrgChart.input = {}),
  (OrgChart.input._timeout = null),
  (OrgChart.input.initWithTimeout = function () {
    OrgChart.input._timeout &&
      (clearTimeout(OrgChart.input._timeout), (OrgChart.input._timeout = null)),
      (OrgChart.input._timeout = setTimeout(OrgChart.input.init, 200));
  }),
  (OrgChart.input.init = function (t) {
    var e;
    e = t
      ? t.querySelectorAll("[data-boc-input]")
      : document.querySelectorAll("[data-boc-input]");
    for (var r = 0; r < e.length; r++) {
      var i = e[r],
        a = null;
      i.type && "hidden" == i.type.toLowerCase() && (a = i),
        a || (a = i.querySelector("input")),
        a || (a = i.querySelector("select"));
      var n = i.querySelector("label");
      n &&
        (a.value ||
          ("select-one" == a.type &&
            a.selectedOptions &&
            a.selectedOptions.length &&
            "" == a.selectedOptions[0].value &&
            a.selectedOptions[0].innerHTML)) &&
        n.classList.add("hasval"),
        "checkbox" != a.type.toLowerCase() &&
          a.addEventListener("focus", function () {
            this.classList.remove("boc-validation-error");
            var t = this.parentNode.querySelector("label");
            t.classList.add("focused");
            var e = t.querySelector(".boc-validation-error-message");
            e && e.parentNode.removeChild(e);
          }),
        "checkbox" != a.type.toLowerCase() &&
          a.addEventListener("blur", function () {
            OrgChart.input.blurHandler(this);
          });
    }
  }),
  (OrgChart.input.blurHandler = function (t) {
    var e = t.parentNode.querySelector("label");
    e.classList.remove("focused"),
      t.value || "date" == t.type
        ? e.classList.add("hasval")
        : e.classList.remove("hasval");
  }),
  (OrgChart.input.validate = function (t) {
    var e = null;
    t.type && "hidden" == t.type.toLowerCase() && (e = t),
      e || (e = t.querySelector("input")),
      e || (e = t.querySelector("select"));
    var r = t.querySelector("label");
    if ((e.classList.remove("boc-validation-error"), r)) {
      var i = r.querySelector(".boc-validation-error-message");
      i && i.parentNode.removeChild(i);
    }
    !e.selectedOptions && e.value && (e.value = e.value.trim());
    var a = t.getAttribute("data-v-required"),
      n = t.getAttribute("data-v-password"),
      o = t.getAttribute("data-v-email"),
      l = t.getAttribute("data-v-emails");
    return a && "" == e.value
      ? ((r.innerHTML +=
          '<span class="boc-validation-error-message">&nbsp;' + a + "</span>"),
        e.classList.add("boc-validation-error"),
        !1)
      : n && !OrgChart.input.validatePassword(e.value)
      ? ((r.innerHTML +=
          '<span class="boc-validation-error-message">&nbsp;' + n + "</span>"),
        e.classList.add("boc-validation-error"),
        !1)
      : o && !OrgChart.input.isValidEmail(e.value)
      ? ((r.innerHTML +=
          '<span class="boc-validation-error-message">&nbsp;' + o + "</span>"),
        e.classList.add("boc-validation-error"),
        !1)
      : !(l && !OrgChart.input.isValidEmails(e.value)) ||
        ((r.innerHTML +=
          '<span class="boc-validation-error-message">&nbsp;' + l + "</span>"),
        e.classList.add("boc-validation-error"),
        !1);
  }),
  (OrgChart.input.validateAndGetData = function (t) {
    for (
      var e = t.querySelectorAll("[data-boc-input]"), r = !0, i = 0;
      i < e.length;
      i++
    ) {
      var a = e[i];
      OrgChart.input.validate(a) || (r = !1);
    }
    if (!r) return !1;
    var n = t.querySelectorAll("[data-binding]"),
      o = {};
    for (i = 0; i < n.length; i++) {
      var l = n[i],
        s = l.getAttribute("data-binding");
      if ("checkbox" == l.type.toLowerCase()) o[s] = l.checked;
      else if (l.selectedOptions && l.hasAttribute("multiple")) {
        var h = l.selectedOptions;
        o[s] = Array.from(h).map(({ value: t }) => t);
      } else o[s] = l.value;
    }
    return o;
  }),
  (OrgChart.input.validatePassword = function (t) {
    return (
      t && (t = t.trim()),
      !(t.length < 5) && !(t.length > 18) && -1 == t.indexOf(" ")
    );
  }),
  (OrgChart.input.isValidEmails = function (t) {
    if (t)
      for (var e = t.split(","), r = 0; r < e.length; r++) {
        var i = e[r].trim();
        if (!OrgChart.input.isValidEmail(i)) return !1;
      }
    return !0;
  }),
  (OrgChart.input.isValidEmail = function (t) {
    t && (t = t.trim());
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      String(t).toLowerCase()
    );
  }),
  (OrgChart.ui.css = function () {
    return '<style data-boc-styles>.boc-button{background-color:#039be5;cursor:pointer;width:calc(100%);height:50px;color:#fff;padding-top:5px;padding-left:7px;padding-right:7px;text-align:center;text-transform:uppercase;border:1px solid #3fc0ff;display:inline-block;border-radius:5px}.boc-button.orange{background-color:#f57c00;border:1px solid #ffa03e}.boc-button.yellow{background-color:#ffca28;border:1px solid #ffdf7c}.boc-button.lower{text-transform:unset}.boc-button.transparent{background-color:transparent}.boc-button:hover{background-color:#35afea}.boc-button.orange:hover{background-color:#f79632}.boc-button.yellow:hover{background-color:#ffd452}.boc-button:active{transform:matrix(.98,0,0,.98,0,0)}.boc-button-icon{text-align:initial;cursor:pointer;margin-bottom:15px;color:#039be5}.boc-dark .boc-button-icon:hover{background-color:#2d2d2d}.boc-light .boc-button-icon:hover{background-color:#ececec}.boc-button-icon>img{height:24px;width:24px;vertical-align:middle;padding:7px}.boc-button:focus{outline:0}.boc-button-icon>img{filter:invert(46%) sepia(66%) saturate(2530%) hue-rotate(171deg) brightness(95%) contrast(98%)}.boc-light .boc-button.transparent{color:#039be5}.boc-light .boc-button.transparent:hover{color:#fff}.boc-button-loading{background-color:transparent;cursor:pointer;width:calc(100% - 2px);height:50px;color:#fff;text-align:center;text-transform:uppercase;border:1px solid #027cb7;display:inline-block;display:flex;justify-content:center;align-items:center;display:none}.boc-button-loading .boc-loading-dots div{margin:0 10px}.boc-link-boc-button{position:absolute;right:10px;top:-1px}@media screen and (max-width:1000px){.boc-link-boc-button{right:50px}}[data-boc-input-disabled] .boc-link-boc-button{display:none}[dir=rtl] .boc-link-boc-button{left:10px;right:unset}.boc-img-button{width:48px;height:48px;cursor:pointer;border-radius:50%;background-color:#039be5;background-repeat:no-repeat;background-size:24px 24px;background-position:center center;margin:3px;display:inline-block}.boc-img-button:hover{background-color:#f57c00}.boc-checkbox{display:block;position:relative;padding-left:35px;margin-bottom:12px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;white-space:nowrap}.boc-checkbox input{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.boc-checkbox-checkmark{position:absolute;top:0;left:0;height:25px;width:25px;border-radius:5px}.boc-dark [data-boc-input-disabled] .boc-checkbox-checkmark,.boc-dark [data-boc-input-disabled].boc-checkbox input:checked~.boc-checkbox-checkmark,.boc-light [data-boc-input-disabled] .boc-checkbox-checkmark,.boc-light [data-boc-input-disabled].boc-checkbox input:checked~.boc-checkbox-checkmark{background-color:#aeaeae!important}[data-boc-input-disabled].boc-checkbox{cursor:default}[dir=rtl] .boc-checkbox-checkmark{right:0}[dir=rtl] .boc-checkbox{padding-left:unset;padding-right:35px}.boc-dark .boc-checkbox-checkmark{background-color:#333;border:1px solid #5b5b5b}.boc-light .boc-checkbox-checkmark{background-color:#fff;border:1px solid #c7c7c7}.boc-dark .boc-checkbox:hover input~.boc-checkbox-checkmark{background-color:#3c3c3c}.boc-light .boc-checkbox:hover input~.boc-checkbox-checkmark{background-color:#f8f9f9}.boc-dark .boc-checkbox input:checked~.boc-checkbox-checkmark{background-color:#039be5}.boc-light .boc-checkbox input:checked~.boc-checkbox-checkmark{background-color:#039be5}.boc-checkbox-checkmark:after{content:"";position:absolute;display:none}.boc-checkbox input:checked~.boc-checkbox-checkmark:after{display:block}.boc-checkbox .boc-checkbox-checkmark:after{left:9px;top:5px;width:5px;height:10px;border:solid #fff;border-width:0 3px 3px 0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.boc-filter{user-select:none}.boc-light .boc-filter{color:#757575}.boc-dark .boc-filter{color:#ccc}.boc-filter>div>div{display:inline-block;padding:3px 10px;cursor:pointer}.boc-filter-menu fieldset,.boc-filter>div,.filter-field-selected{border-radius:5px}.boc-filter-menu fieldset{overflow-y:auto;max-height:300px}.boc-filter>div.boc-filter-menu{padding:10px}.boc-light .boc-filter>div.boc-filter-menu,.boc-light .filter-field-selected{background-color:#f8f9f9}.boc-dark .boc-filter>div.boc-filter-menu,.boc-dark .filter-field-selected{background-color:#3c3c3c}.boc-light .boc-filter>div{background-color:#eee}.boc-dark .boc-filter>div{background-color:#333}.boc-form-perspective{transform-style:preserve-3d;perspective:500px;position:absolute;top:32px}.boc-form{box-shadow:rgba(0,0,0,.2) 0 6px 6px 0,rgba(0,0,0,.19) 0 13px 20px 0;padding:14px;transform-origin:top center;user-select:none;display:none;position:relative;max-height:calc(100vh - 100px);overflow-y:auto;border-bottom-left-radius:5px;border-bottom-right-radius:5px}.boc-form-bottom{border-bottom-left-radius:unset;border-bottom-right-radius:unset;border-top-left-radius:5px;border-top-right-radius:5px}.boc-form .separator{margin:0 10px}@media screen and (max-width:1000px){.boc-form-perspective{min-width:100%;max-height:calc(100% - 32px);left:unset!important;right:unset!important;transform:none!important}.boc-form .set{max-height:calc(100vh - 74px)}.boc-form-fieldset{max-width:unset!important}}.boc-light .boc-form .separator{border-bottom:1px solid #c7c7c7}.boc-dark .boc-form .separator{border-bottom:1px solid #5b5b5b}.boc-light .boc-form{background-color:#fff}.boc-dark .boc-form{background-color:#252526}.boc-item{padding:6px 12px 6px 12px;display:flex;flex-direction:row}.boc-light .boc-form .boc-item.selected,.boc-light .boc-form .boc-item:hover{background-color:#0074e8;color:#fff}.boc-dark .boc-form .boc-item.selected,.boc-dark .boc-form .boc-item:hover{background-color:#094771;color:#fff}.boc-item.selected img,.boc-item:hover img{filter:invert(100%)}.boc-item.selected img{visibility:visible!important}.boc-form-fieldset{display:flex;flex-wrap:wrap;margin:0!important}.boc-form-field{flex:1 0 21%;margin:3px;min-width:200px}.boc-form-field-100{flex:1 0 96%;margin:3px;min-width:200px}.boc-input{position:relative}.boc-input>input,.boc-input>select{height:50px;padding:18px 10px 2px 9px;width:100%;box-sizing:border-box;border-style:solid;border-width:1px}.boc-input select{height:50px;padding:20px 5px 4px 5px}[data-boc-input-disabled].boc-input>input,[data-boc-input-disabled].boc-input>select{border-color:transparent!important}.boc-light [data-boc-input-disabled]>input,.boc-light [data-boc-input-disabled]>select{background-color:#fff!important}.boc-dark [data-boc-input-disabled]>input,.boc-dark [data-boc-input-disabled]>select{background-color:#252526!important}[data-boc-input-disabled]>select{appearance:none;padding-left:8px}.boc-input>label{display:inline-block;position:absolute;padding-left:10px;padding-right:10px;color:#acacac;cursor:text;-webkit-transition:all .1s ease-out;-moz-transition:all .1s ease-out;-ms-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1 ease-out;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:initial;text-align:initial;white-space:nowrap}.boc-input>label{top:12px;overflow:hidden;text-overflow:ellipsis;max-width:calc(100% - 14px)}.boc-input>label.focused,.boc-input>label.hasval{top:-1px}.boc-input>input,.boc-input>select{outline:0;border-radius:5px}.boc-dark .boc-input>label.focused,.boc-light .boc-input>label.focused{color:#039be5}.boc-dark .boc-input>input,.boc-dark .boc-input>select{color:#ccc;background-color:#333;border-color:#5b5b5b}.boc-light .boc-input>input,.boc-light .boc-input>select{color:#757575;background-color:#fff;border-color:#c7c7c7}.boc-light .boc-input>input:focus,.boc-light .boc-input>select:focus{border-color:#039be5;background-color:#f8f9f9}.boc-dark .boc-input>input:focus,.boc-dark .boc-input>select:focus{border-color:#039be5;background-color:#3c3c3c}.boc-dark .boc-input>input.boc-validation-error,.boc-dark .boc-input>select.boc-validation-error,.boc-light .boc-input>input.boc-validation-error,.boc-light .boc-input>select.boc-validation-error{border-color:#ca2a2a}.boc-dark .boc-validation-error-message,.boc-light .boc-validation-error-message{color:#ca2a2a}.boc-input select.multiple{height:initial}.boc-link{color:#039be5;cursor:pointer;text-decoration:underline}.boc-link:hover{color:#f57c00}.boc-dark ::-webkit-scrollbar,.boc-light ::-webkit-scrollbar{width:15px;height:15px}.boc-dark ::-webkit-scrollbar-corner{background:#1e1e1e}.boc-dark ::-webkit-scrollbar-track{background:#1e1e1e;border-left:1px solid #333;border-top:1px solid #333}.boc-dark ::-webkit-scrollbar-thumb{background:#424242}.boc-dark ::-webkit-scrollbar-thumb:hover{background:#4f4f4f}.boc-dark ::-webkit-scrollbar-thumb:active{background:#5e5e5e}.boc-light ::-webkit-scrollbar-corner{background:#fff}.boc-light ::-webkit-scrollbar-track{background:#fff;border-left:1px solid #ddd;border-top:1px solid #ddd}.boc-light ::-webkit-scrollbar-thumb{background:#c1c1c1}.boc-light ::-webkit-scrollbar-thumb:hover{background:#929292}.boc-light ::-webkit-scrollbar-thumb:active{background:#666}.boc-edit-form{position:fixed;top:0;right:0;height:100%;width:100%;box-shadow:rgba(0,0,0,.2) 0 6px 6px 0,rgba(0,0,0,.19) 0 13px 20px 0;display:flex;flex-direction:column;height:100%;width:400px}@media screen and (max-width:1000px){.boc-edit-form{width:100%}}.boc-dark .boc-edit-form{background-color:#252526}.boc-light .boc-edit-form{background-color:#fff}.boc-edit-form-header{height:200px;text-align:center;border-radius:10px}.export-service .boc-edit-form-header{border-radius:unset}.boc-edit-form-title{color:#fff;margin:0;padding:14px 17px 7px 17px}.boc-edit-form-avatar{border-radius:50%;width:150px;height:150px;position:absolute;top:75px;border:5px solid #fff;left:50%;transform:translateX(-50%);background-color:#cacaca;box-shadow:rgba(0,0,0,.2) 0 6px 6px 0,rgba(0,0,0,.19) 0 13px 20px 0}.boc-edit-form-close{position:absolute;right:14px;top:14px;width:34px;height:34px;cursor:pointer}.boc-edit-form-fields{flex-grow:1;overflow-y:auto;overflow-x:hidden}.boc-edit-form-fields-inner{margin:0 7px 20px 7px}.boc-chart-menu{opacity:0;display:inline-block;position:absolute;text-align:left;user-select:none;min-width:270px;box-shadow:rgba(0,0,0,.2) 0 4px 8px 0,rgba(0,0,0,.19) 0 6px 20px 0;font:13px/28px Helvetica,"Segoe UI",Arial,sans-serif;border-radius:10px}.boc-chart-menu>div:hover img{filter:invert(100%)}.boc-chart-menu [data-item]{text-align:start;padding:7px 10px}.boc-dark .boc-chart-menu [data-item]{background-color:#252526;color:#acacac;border-bottom:1px solid #333}.boc-dark .boc-chart-menu [data-item]:hover{background-color:#094771!important;color:#fff!important}.boc-dark .boc-chart-menu [data-item]:hover svg{filter:brightness(0) invert(1)}.boc-light .boc-chart-menu [data-item]{background-color:#fff;color:#333;border-bottom:1px solid #c7c7c7}.boc-light .boc-chart-menu [data-item]:hover{background-color:#0074e8!important;color:#fff!important}.boc-light .boc-chart-menu [data-item]:hover svg{filter:brightness(0) invert(1)}.boc-chart-menu [data-item] svg{vertical-align:middle}.boc-chart-menu [data-item]:first-child{border-top-left-radius:7px;border-top-right-radius:7px}.boc-chart-menu [data-item]:last-child{border-bottom-width:0;border-bottom-style:none;border-bottom-left-radius:7px;border-bottom-right-radius:7px}.boc-search{position:absolute}@media screen and (max-width:500px){.boc-search{width:calc(100% - 30px);left:15px}}.boc-search .boc-input{margin-bottom:0}.boc-search-input{color:#7a7a7a;width:100%;border:none;outline:0;padding-top:10px;padding-right:47px}.boc-search-image-td{width:43px}.boc-search-text-td{padding-inline-end:7px;line-height:15px;text-align:start}.boc-search table{box-shadow:rgba(0,0,0,.2) 0 4px 8px 0,rgba(0,0,0,.19) 0 6px 20px 0;margin:0 3.5px 0 3.5px;width:calc(100% - 7px);border-radius:7px}.boc-search table tr:first-child td:first-child{border-top-left-radius:7px}.boc-search table tr:first-child td:last-child{border-top-right-radius:7px}[dir=rtl] .boc-search table tr:first-child td:first-child{border-top-left-radius:unset;border-top-right-radius:7px}[dir=rtl] .boc-search table tr:first-child td:last-child{border-top-right-radius:unset;border-top-left-radius:7px}.boc-search table tr:last-child td:first-child{border-bottom-left-radius:7px}.boc-search table tr:last-child td:last-child{border-bottom-right-radius:7px}[dir=rtl] .boc-search table tr:last-child td:first-child{border-bottom-left-radius:unset;border-bottom-right-radius:7px}[dir=rtl] .boc-search table tr:last-child td:last-child{border-bottom-right-radius:unset;border-bottom-left-radius:7px}.boc-dark .boc-search table{background-color:#252526;color:#acacac}.boc-search [data-search-item-id]{cursor:pointer}.boc-search-photo{margin:7px 7px 0 7px;width:32px;height:32px;background-size:cover;background-position:top center;border-radius:50%;display:inline-block;border:1px solid #8c8c8c}.boc-search [data-search-item-id]:hover .boc-link{color:#ffca28}.boc-search [data-search-item-id]:hover .boc-link:hover{color:#f57c00}.boc-dark .boc-search [data-search-item-id] td{border-top:1px solid #333}.boc-dark .boc-search [data-search-item-id]:hover,.boc-dark .boc-search [data-selected=yes]{background-color:#094771;color:#fff}.boc-light .boc-search table{background-color:#fff;color:#333}.boc-light .boc-search [data-search-item-id] td{border-top:1px solid #c7c7c7}.boc-light .boc-search [data-search-item-id]:hover,.boc-light .boc-search [data-selected=yes]{background-color:#0074e8;color:#fff}.boc-search [data-search-item-id]:first-child td{border-top:unset}.boc-ripple-container{position:absolute;top:0;right:0;bottom:0;left:0}.boc-drag-over rect{opacity:.5}.boc-ripple-container span{transform:scale(0);border-radius:100%;position:absolute;opacity:.75;background-color:#fff;animation:boc-ripple 1s}@-moz-keyframes boc-ripple{to{opacity:0;transform:scale(2)}}@-webkit-keyframes boc-ripple{to{opacity:0;transform:scale(2)}}@-o-keyframes boc-ripple{to{opacity:0;transform:scale(2)}}@keyframes boc-ripple{to{opacity:0;transform:scale(2)}}.boc-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;-webkit-transition:.4s;transition:.4s}.boc-slider:before{position:absolute;content:"";height:16px;width:16px;left:4px;bottom:4px;background-color:#fff;-webkit-transition:.4s;transition:.4s}.boc-slider.round{border-radius:24px}.boc-slider.round:before{border-radius:50%}svg text:hover{cursor:default}svg.boc-cursor-grab,svg.boc-cursor-grab text:hover{cursor:grab}svg.boc-cursor-nodrop,svg.boc-cursor-nodrop text:hover{cursor:no-drop}svg.boc-cursor-copy,svg.boc-cursor-copy text:hover{cursor:copy}svg.boc-cursor-move,svg.boc-cursor-move text:hover{cursor:move}#boc-close-btn:focus,#boc-close-btn:hover{color:#000;text-decoration:none;cursor:pointer}#boc-id-select:focus{outline:.5px solid #aeaeae}#boc-sampleDialog #title:hover{cursor:default;background:gray}.boc-light{background-color:#fff;font:13px/28px Helvetica,"Segoe UI",Arial,sans-serif}.boc-dark{background-color:#1e1e1e;font:13px/28px Helvetica,"Segoe UI",Arial,sans-serif}.boc-light .boc-fill{fill:#fff}.boc-dark .boc-fill{fill:#1e1e1e}.boc-dark input,.boc-dark select,.boc-light input,.boc-light select{font:16px Helvetica,"Segoe UI",Arial,sans-serif}.boc-dark h1,.boc-light h1{font-size:30px;line-height:1}.boc-edit-form{position:absolute;border-radius:10px}.export-service .boc-edit-form{border-radius:unset}.boc-dark .boc-edit-form{color:#acacac}.boc-light .boc-edit-form{color:#333}.boc-dark ::-webkit-calendar-picker-indicator{filter:invert(70%)}.boc-light ::-webkit-calendar-picker-indicator{filter:invert(50%)}.boc-edit-form-instruments{margin:42px 10px 0 10px;text-align:center;min-height:70px}.boc-img-button svg{position:relative;top:12px}.boc-light .boc-toolbar-container svg circle,.boc-light .boc-toolbar-container svg line,.boc-light .boc-toolbar-container svg path{stroke:#8c8c8c!important}.boc-dark .boc-toolbar-container svg circle,.boc-dark .boc-toolbar-container svg line,.boc-dark .boc-toolbar-container svg path{stroke:#8c8c8c!important}.boc-dark .boc-toolbar-container svg rect{fill:#252526!important}.boc-dark .boc-toolbar-container [data-tlbr=minus] svg{border-left:1px solid #5b5b5b!important;border-right:1px solid #5b5b5b!important;border-bottom:1px solid #5b5b5b!important}.boc-dark .boc-toolbar-container [data-tlbr=plus] svg{border-left:1px solid #5b5b5b!important;border-right:1px solid #5b5b5b!important;border-top:1px solid #5b5b5b!important}.boc-dark .boc-toolbar-container [data-tlbr]>svg{border:1px solid #5b5b5b!important;background-color:#252526!important}.boc-toolbar-layout{height:123px;padding-top:20px;position:absolute;width:100%;left:"0";bottom:"-145px"}.boc-light .boc-toolbar-layout{border-top:1px solid #c7c7c7;background-color:#f9f9f9}.boc-dark .boc-toolbar-layout{border-top:1px solid #5b5b5b;background-color:#2b2b2b}.boc-dotted-connector path{stroke-dasharray:7}.boc-undo-redo{position:absolute;top:23px;left:23px}@media screen and (max-width:500px){.boc-undo-redo{position:absolute;top:83px;left:23px}}.boc-light .boc-undo-redo path{fill:#cacaca}.boc-dark .boc-undo-redo path{fill:#5b5b5b}.boc-light .boc-undo-redo .boc-ur-clickable path{fill:#9c9c9c}.boc-dark .boc-undo-redo .boc-ur-clickable path{fill:#8c8c8c}.boc-undo-redo .boc-ur-clickable rect{cursor:pointer}.boc-undo-redo>span{position:relative;display:inline-block;user-select:none}.boc-undo-redo .boc-undo-i{left:-6px;top:-6px}.boc-undo-redo .boc-redo-i{right:-6px;bottom:6px}.boc-undo-redo>span>span{color:#fff;position:absolute;display:inline-block;min-width:20px;min-height:20px;border-radius:50%;line-height:20px;text-align:center;padding:1px;user-select:none;cursor:pointer}.boc-light .boc-undo-redo>span>span{background-color:#9c9c9c}.boc-dark .boc-undo-redo>span>span{background-color:#8c8c8c}</style>';
  }),
  void 0 === OrgChart && (OrgChart = {}),
  (OrgChart.prototype.onField = function (t) {
    return this.on("field", function (e, r) {
      return t.call(e, r);
    });
  }),
  (OrgChart.prototype.onInit = function (t) {
    return this.on("init", function (e) {
      return t.call(e);
    });
  }),
  (OrgChart.prototype.onRedraw = function (t) {
    return this.on("redraw", function (e) {
      return t.call(e);
    });
  }),
  (OrgChart.prototype.onUpdateNode = function (t) {
    return this.on("update", function (e, r, i) {
      var a = { oldData: r, newData: i };
      return t.call(e, a);
    });
  }),
  (OrgChart.prototype.onUpdated = function (t) {
    return this.on("updated", function (e) {
      return t.call(e);
    });
  }),
  (OrgChart.prototype.onRemoveNode = function (t) {
    return this.on("remove", function (e, r, i) {
      var a = { id: r, newPidsAndStpidsForIds: i };
      return t.call(e, a);
    });
  }),
  (OrgChart.prototype.onAddNode = function (t) {
    return this.on("add", function (e, r) {
      var i = { data: r };
      return t.call(e, i);
    });
  }),
  (OrgChart.prototype.onDrop = function (t) {
    return this.on("drop", function (e, r, i, a, n) {
      var o = { dragId: r, dropId: i, dragNodeElement: a, event: n };
      return t.call(e, o);
    });
  }),
  (OrgChart.prototype.onDrag = function (t) {
    return this.on("drag", function (e, r, i, a) {
      var n = { dragId: r, event: i, nodeIds: a };
      return t.call(e, n);
    });
  }),
  (OrgChart.prototype.onExpandCollpaseButtonClick = function (t) {
    return this.on("expcollclick", function (e, r, i, a) {
      var n = { collapsing: r, id: i, ids: a };
      return t.call(e, n);
    });
  }),
  (OrgChart.prototype.onExportStart = function (t) {
    return this.on("exportstart", function (e, r) {
      return t.call(e, r);
    });
  }),
  (OrgChart.prototype.onExportEnd = function (t) {
    return this.on("exportend", function (e, r) {
      return t.call(e, r);
    });
  }),
  (OrgChart.prototype.onNodeClick = function (t) {
    return this.on("click", function (e, r) {
      return t.call(e, r);
    });
  }),
  (OrgChart.prototype.onNodeDoubleClick = function (t) {
    return this.on("dbclick", function (e, r) {
      var i = { data: r };
      return t.call(e, i);
    });
  }),
  (OrgChart.filterUI = function () {}),
  (OrgChart.filterUI.prototype.init = function (t) {
    (this.instance = t),
      (this.element = null),
      (this.filterBy = null),
      (this._event_id = OrgChart._guid());
  }),
  (OrgChart.filterUI.prototype.addFilterTag = function (t) {
    if (!this.instance.config.filterBy) return !1;
    if (OrgChart.isNEU(t)) return !1;
    if (
      (null !== this.filterBy ||
        "object" != typeof this.instance.config.filterBy ||
        Array.isArray(this.instance.config.filterBy) ||
        (this.filterBy = JSON.parse(
          JSON.stringify(this.instance.config.filterBy)
        )),
      null != this.filterBy)
    )
      for (var e in this.filterBy) {
        var r = t[e];
        if (null != r) {
          var i = this.filterBy[e];
          if (null != i) {
            var a = i[r];
            if (null != a && !1 === a.checked) return !0;
          }
        }
      }
    return !1;
  }),
  (OrgChart.filterUI.prototype.show = function (t) {
    var e = this.element.querySelector('[data-filter-field="' + t + '"]');
    e && e.click();
  }),
  (OrgChart.filterUI.prototype.hide = function () {
    var t = this.instance.element.querySelector("[data-filter-close]");
    t && t.click();
  }),
  (OrgChart.filterUI.prototype.update = function () {
    if (this.instance.config.filterBy) {
      var t = {};
      if ("all" == this.instance.config.filterBy)
        for (
          var e = OrgChart.manager.getAllFields(this.instance.config), r = 0;
          r < e.length;
          r++
        ) {
          var i = e[r];
          "tags" != i &&
            "id" != i &&
            "pid" != i &&
            "ppid" != i &&
            "stpid" != i &&
            (t[i] = {});
        }
      else if (Array.isArray(this.instance.config.filterBy))
        for (r = 0; r < this.instance.config.filterBy.length; r++)
          t[this.instance.config.filterBy[r]] = {};
      else if ("object" == typeof this.instance.config.filterBy)
        for (var a in this.instance.config.filterBy) t[a] = {};
      for (var n in t) {
        var o = t[n];
        for (r = 0; r < this.instance.config.nodes.length; r++) {
          var l = this.instance.config.nodes[r][n];
          null != l && (o[l] || (o[l] = { checked: !0, text: l }));
        }
      }
      if (null != this.filterBy)
        for (var s in t)
          if (this.filterBy[s])
            for (var h in t[s])
              this.filterBy[s][h] && (t[s][h] = this.filterBy[s][h]);
      this.filterBy = t;
      var d = this;
      (this.element = this.instance.element.querySelector("[data-filter]")),
        this.element && this.element.parentNode.removeChild(this.element),
        (this.element = document.createElement("div")),
        this.element.setAttribute("data-filter", ""),
        (this.element.style.position = "absolute"),
        this.element.setAttribute("class", "boc-filter"),
        this.instance.config.undoRedoStorageName
          ? ((this.element.style.top = 0),
            (this.element.style.left = "50%"),
            (this.element.style.transform = "translate(-50%)"))
          : ((this.element.style.top = this.instance.config.padding + "px"),
            (this.element.style.left = this.instance.config.padding + "px"));
      var c = "";
      for (var s in this.filterBy) {
        var g = { name: s, html: `<div data-filter-field="${s}">${s}</div>` };
        OrgChart.events.publish("add-filter", [d, g]), (c += g.html);
      }
      (this.element.innerHTML = `<div>${c}</div>`),
        this.element.addEventListener("click", function (t) {
          if (
            t.target.hasAttribute("data-filter-close") ||
            t.target.hasAttribute("data-filter-field")
          ) {
            for (
              var e = t.target.getAttribute("data-filter-field"),
                r = d.instance.element.querySelectorAll("[data-filter-menu]"),
                i = 0;
              i < r.length;
              i++
            )
              r[i].style.display = "none";
            var a = d.instance.element.querySelectorAll(
              ".filter-field-selected"
            );
            for (i = 0; i < a.length; i++)
              a[i].classList.remove("filter-field-selected");
            var n = d.instance.element.querySelector("[data-filter-close]");
            if (
              (n && n.parentNode.removeChild(n),
              t.target.hasAttribute("data-filter-close"))
            )
              return;
            if (!t.target.hasAttribute("data-filter-field")) return;
            var o = d.instance.element.querySelector(
              `[data-filter-menu="${e}"]`
            );
            if (!o) {
              var l = {
                name: e,
                text: "[All]",
                value: e,
                checked: !0,
                html: `<div>\n                        <input data-all type="checkbox" id="${e}" name="${e}" checked>\n                        <label for="${e}">[All]</label>\n                    </div>`,
              };
              OrgChart.events.publish("add-item", [d, l]);
              var s = l.html;
              for (var h in d.filterBy[e]) {
                var c = d.filterBy[e][h],
                  g = c.text;
                null == g && (g = h),
                  (l = {
                    name: e,
                    text: g,
                    value: h,
                    checked: c.checked,
                    html: `<div>\n                            <input  type="checkbox" id="${h}" name="${h}" ${
                      c.checked ? "checked" : ""
                    }>\n                            <label for="${h}">${g}</label>\n                        </div>`,
                  }),
                  OrgChart.events.publish("add-item", [d, l]),
                  (s += l.html);
              }
              o = document.createElement("div");
              var p = OrgChart.filterUI.textFilterBy;
              (o.innerHTML = `<fieldset>\n                                                    <legend>${p} ${e}:</legend>\n                                                    ${s}\n                                                </fieldset>`),
                o.setAttribute("data-filter-menu", e),
                o.classList.add("boc-filter-menu"),
                t.target.parentNode.parentNode.appendChild(o);
              var u = o.querySelectorAll("input");
              for (i = 0; i < u.length; i++)
                u[i].addEventListener("change", function (t) {
                  for (
                    var e = t.target;
                    e && !e.hasAttribute("data-filter-menu");

                  )
                    e = e.parentNode;
                  if (e) {
                    var r = e.getAttribute("data-filter-menu");
                    if (t.target.hasAttribute("data-all")) {
                      for (
                        var i =
                            t.target.parentNode.parentNode.querySelectorAll(
                              "input"
                            ),
                          a = 0;
                        a < i.length;
                        a++
                      )
                        if (i[a] != t.target)
                          for (var n in ((i[a].checked = t.target.checked),
                          d.filterBy[r]))
                            d.filterBy[r][n].checked = t.target.checked;
                    } else if (
                      (null != d.filterBy[r][this.name] &&
                        (d.filterBy[r][this.name].checked = this.checked),
                      this.checked)
                    )
                      for (
                        var o = d.instance.config.nodes, l = 0;
                        l < o.length;
                        l++
                      )
                        if (o[l][r] == this.name)
                          for (var s = o[l]; s; )
                            if (OrgChart.isNEU(s.stpid))
                              s = OrgChart.isNEU(s.pid)
                                ? null
                                : d.instance._get(s.pid);
                            else if ((s = d.instance._get(s.stpid))[r]) {
                              var h =
                                t.target.parentNode.parentNode.querySelector(
                                  '[name="' + s[r] + '"]'
                                );
                              h
                                ? ((h.checked = this.checked),
                                  (d.filterBy[r][s[r]].checked = this.checked))
                                : console.error(
                                    'Cannot find element with selector: [name="' +
                                      s[r] +
                                      '"]'
                                  );
                            }
                    d.instance.draw();
                  }
                });
            }
            (o.style.display = "block"),
              t.target.classList.add("filter-field-selected"),
              (n = document.createElement("div")).classList.add("close"),
              (n.innerHTML = "x"),
              n.setAttribute("data-filter-close", ""),
              t.target.parentNode.appendChild(n),
              OrgChart.events.publish("show-items", [d, { name: e }]);
          }
        }),
        this.instance.element.appendChild(this.element),
        OrgChart.events.publish("update", [this, {}]);
    }
  }),
  (OrgChart.filterUI.prototype.on = function (t, e) {
    return OrgChart.events.on(t, e, this._event_id), this;
  }),
  (OrgChart.filterUI.textFilterBy = "Filter by"),
  void 0 === OrgChart && (OrgChart = {}),
  void 0 === OrgChart.remote && (OrgChart.remote = {}),
  (OrgChart.LIMIT_NODES = !0),
  (OrgChart.remote._fromResDTO = function (t, e, r, i, a) {
    var n = e[t.id];
    (t.x = n.p[0]),
      (t.y = n.p[1]),
      (t.w = n.p[2]),
      (t.h = n.p[3]),
      null != n.ln && (t.leftNeighbor = a[n.ln]),
      null != n.rn && (t.rightNeighbor = a[n.rn]);
    for (var o = 0; o < t.stChildren.length; o++)
      OrgChart.remote._fromResDTO(t.stChildren[o], e, r, i, a);
    for (o = 0; o < t.children.length; o++)
      OrgChart.remote._fromResDTO(t.children[o], e, r, i, a);
  }),
  (OrgChart.remote._toReqDTO = function (t, e) {
    var r = {
      p: [
        t.id,
        null != t.parent ? t.parent.id : null,
        null != t.stParent ? t.stParent.id : null,
        t.w,
        t.h,
      ],
    };
    t.children.length > 0 &&
      (r.c = OrgChart.remote._convertToIdArray(t.children)),
      t.stChildren.length > 0 &&
        (r.v = OrgChart.remote._convertToIdArray(t.stChildren)),
      null != t.layout && 0 != t.layout && (r.l = t.layout),
      t.isAssistant && (r.a = 1),
      t.isSplit && (r.s = t.isSplit),
      t.isMirror && (r.im = t.isMirror),
      t.padding && (r.q = t.padding),
      t.lcn && (r.k = t.lcn),
      t.stContainerNodes &&
        (r.b = OrgChart.remote._convertToIdArray(t.stContainerNodes)),
      t.isPartner && (r.i = t.isPartner),
      t.hasPartners && (r.g = t.hasPartners),
      t.partnerSeparation && (r.e = t.partnerSeparation),
      e.push(r);
    for (var i = 0; i < t.stChildren.length; i++)
      OrgChart.remote._toReqDTO(t.stChildren[i], e);
    for (i = 0; i < t.children.length; i++)
      OrgChart.remote._toReqDTO(t.children[i], e);
  });
(OrgChart.remote._toReqLayoutConfigsDTO = function (t) {
  var e = {};
  for (var r in t) {
    var i = t[r];
    e[r] || (e[r] = []),
      (e[r][0] = i.orientation),
      (e[r][1] = i.levelSeparation),
      (e[r][2] = i.mixedHierarchyNodesSeparation),
      (e[r][3] = i.subtreeSeparation),
      (e[r][4] = i.siblingSeparation),
      (e[r][5] = i.layout),
      (e[r][6] = i.columns),
      (e[r][7] = i.collapse),
      (e[r][8] = i.assistantSeparation),
      (e[r][9] = i.partnerNodeSeparation);
  }
  return e;
}),
  (OrgChart.remote._convertToIdArray = function (t) {
    for (var e = [], r = 0; r < t.length; r++) e.push(t[r].id);
    return e;
  }),
  (OrgChart.remote._setPositions = function (t, e, r, i) {
    for (
      var a = [], n = [], o = OrgChart.remote._toReqLayoutConfigsDTO(e), l = 0;
      l < t.length;
      l++
    )
      n.push(t[l].id), OrgChart.remote._toReqDTO(t[l], a);
    var s = { n: a, c: o, r: n, v: "8.14.00" };
    if (
      (OrgChart.LIMIT_NODES || (s.l = !0), null != OrgChart.remote._fromReqDTO)
    )
      OrgChart.remote._fromReqDTO(s.n, s.r, s.c, function (e) {
        for (var a = 0; a < t.length; a++)
          OrgChart.remote._fromResDTO(t[a], e, 0, t, i);
        r();
      });
    else {
      s = JSON.stringify(s);
      var h = OrgChart.localStorage.getItem(s);
      h && (h = JSON.parse(h)),
        h && !h.limit
          ? OrgChart.remote._proceed(t, h, i, r)
          : OrgChart.remote._findRegion(function (e) {
              OrgChart._ajax(e, "post", s, "json", function (e) {
                e.error
                  ? r(2)
                  : (OrgChart.remote._proceed(t, e, i, r),
                    OrgChart.localStorage.setItem(s, JSON.stringify(e)));
              });
            });
    }
  }),
  (OrgChart.remote._proceed = function (t, e, r, i) {
    if (("string" == typeof e && (e = JSON.parse(e)), e.limit && 1 == e.limit))
      i(e.limit);
    else {
      for (var a = 0; a < t.length; a++)
        OrgChart.remote._fromResDTO(t[a], e, 0, t, r);
      i();
    }
  }),
  (OrgChart.remote._findRegion = function (t) {
    var e = OrgChart.localStorage.getItem("funcUrl");
    if (e) t(e);
    else {
      for (
        var r = [
            "au-e",
            "au-se",
            "brs",
            "ca",
            "ca-e",
            "easia",
            "eus-2",
            "eus",
            "fr",
            "ind",
            "jp-e",
            "jp-w",
            "kr",
            "n-eu",
            "se-asia",
            "s-ind",
            "uk-s",
            "uk-w",
            "us",
            "us-n-c",
            "us-s-c",
            "w-c-us",
            "w-eu",
            "w-ind",
            "w-us-2",
            "wus",
          ],
          i = [],
          a = 0;
        a < r.length;
        a++
      )
        i.push(new XMLHttpRequest());
      for (a = 0; a < r.length; a++)
        !(function () {
          var e =
              "https://" +
              r[a] +
              "-balkangraph.azurewebsites.net/api/OrgChartJS",
            n = i[a];
          (n.onreadystatechange = function () {
            if (4 == this.readyState && 200 == this.status) {
              OrgChart.localStorage.setItem("funcUrl", e), t(e);
              for (var r = 0; r < i.length; r++) i[r].abort();
            }
          }),
            n.open("GET", e, !0),
            n.send();
        })();
    }
  });
