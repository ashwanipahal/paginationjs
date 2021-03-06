/*
 * pagination.js 2.1.5
 * A jQuery plugin to provide simple yet fully customisable pagination.
 * https://github.com/superRaytin/paginationjs
 *
 * Homepage: http://pagination.js.org
 *
 * Copyright 2014-2100, superRaytin
 * Released under the MIT license.
 */

!(function (a, b) {
  function c(a) {
    throw new Error('Pagination: ' + a);
  }
  function d(a) {
    a.dataSource || c('"dataSource" is required.'),
      'string' == typeof a.dataSource
        ? void 0 === a.totalNumber
          ? c('"totalNumber" is required.')
          : b.isNumeric(a.totalNumber) || c('"totalNumber" is incorrect. (Number)')
        : i.isObject(a.dataSource) &&
          (void 0 === a.locator
            ? c('"dataSource" is an Object, please specify "locator".')
            : 'string' == typeof a.locator ||
              b.isFunction(a.locator) ||
              c(a.locator + ' is incorrect. (String | Function)'));
  }
  function e(a) {
    var c = ['go', 'previous', 'next', 'disable', 'enable', 'refresh', 'show', 'hide', 'destroy'];
    b.each(c, function (b, c) {
      a.off(h + c);
    }),
      a.data('pagination', {}),
      b('.paginationjs', a).remove();
  }
  function f(a, b) {
    return ('object' == (b = typeof a)
      ? (null == a && 'null') || Object.prototype.toString.call(a).slice(8, -1)
      : b
    ).toLowerCase();
  }
  void 0 === b && c('Pagination requires jQuery.');
  var g = 'pagination',
    h = '__pagination-';
  b.fn.pagination && (g = 'pagination2'),
    (b.fn[g] = function (f) {
      if (void 0 === f) return this;
      var j = b(this),
        k = {
          initialize: function () {
            var a = this;
            if ((j.data('pagination') || j.data('pagination', {}), !1 !== a.callHook('beforeInit'))) {
              j.data('pagination').initialized && b('.paginationjs', j).remove(), (a.disabled = !!m.disabled);
              var c = (a.model = { pageRange: m.pageRange, pageSize: m.pageSize });
              a.parseDataSource(m.dataSource, function (b) {
                if (
                  ((a.sync = i.isArray(b)),
                  a.sync && (c.totalNumber = m.totalNumber = b.length),
                  (c.totalPage = a.getTotalPage()),
                  !(m.hideWhenLessThanOnePage && c.totalPage <= 1))
                ) {
                  var d = a.render(!0);
                  m.className && d.addClass(m.className),
                    (c.el = d),
                    j['bottom' === m.position ? 'append' : 'prepend'](d),
                    a.observer(),
                    (j.data('pagination').initialized = !0),
                    a.callHook('afterInit', d);
                }
              });
            }
          },
          render: function (a) {
            var c = this,
              d = c.model,
              e = d.el || b('<div class="paginationjs"></div>'),
              f = !0 !== a;
            c.callHook('beforeRender', f);
            var g = d.pageNumber || m.pageNumber,
              h = m.pageRange,
              i = d.totalPage,
              j = g - h,
              k = g + h;
            return (
              k > i && ((k = i), (j = i - 2 * h), (j = j < 1 ? 1 : j)),
              j <= 1 && ((j = 1), (k = Math.min(2 * h + 1, i))),
              e.html(c.createTemplate({ currentPage: g, pageRange: h, totalPage: i, rangeStart: j, rangeEnd: k })),
              c.callHook('afterRender', f),
              e
            );
          },
          createTemplate: function (a) {
            var c,
              d,
              e = this,
              f = a.currentPage,
              g = a.totalPage,
              h = a.rangeStart,
              i = a.rangeEnd,
              j = m.pageSize,
              k = m.totalNumber,
              l = m.showFirst,
              n = m.showPrevious,
              o = m.showNext,
              p = m.showLast,
              q = m.showPageNumbers,
              r = m.showNavigator,
              s = m.showGoInput,
              t = m.showGoButton,
              u = m.showLengthController,
              v = m.lengthController,
              w = m.pageLink,
              x = m.firstText,
              y = m.prevText,
              z = m.nextText,
              A = m.lastText,
              B = m.ellipsisText,
              C = m.goButtonText,
              D = m.classPrefix,
              E = m.activeClassName,
              F = m.disableClassName,
              G = m.ulClassName,
              H = b.isFunction(m.formatNavigator) ? m.formatLengthController() : m.formatLengthController,
              I = b.isFunction(m.formatNavigator) ? m.formatNavigator() : m.formatNavigator,
              J = b.isFunction(m.formatGoInput) ? m.formatGoInput() : m.formatGoInput,
              K = b.isFunction(m.formatGoButton) ? m.formatGoButton() : m.formatGoButton,
              L = b.isFunction(m.autoHidePrevious) ? m.autoHidePrevious() : m.autoHidePrevious,
              M = b.isFunction(m.autoHideNext) ? m.autoHideNext() : m.autoHideNext,
              N = b.isFunction(m.header) ? m.header() : m.header,
              O = b.isFunction(m.footer) ? m.footer() : m.footer,
              P = '',
              Q = '<select class="J-paginationjs-length-select">',
              R = '<input type="text" class="J-paginationjs-go-pagenumber">',
              S = '<input type="button" class="J-paginationjs-go-button" value="' + C + '">';
            if (
              (N && ((c = e.replaceVariables(N, { currentPage: f, totalPage: g, totalNumber: k })), (P += c)),
              u && '[object Array]' === Object.prototype.toString.call(v))
            ) {
              for (d = 0; d < v.length; d++)
                Q += '<option value="' + v[d] + '"' + (v[d] === j ? 'selected' : '') + '>' + v[d] + '</option>';
              (Q += '</select>'),
                H &&
                  ((c = e.replaceVariables(H, { length: Q, total: k })),
                  (P += '<div class="paginationjs-length-controller">' + c + '</div>'));
            }
            if (l || n || q || o || p) {
              if (
                ((P += '<div class="paginationjs-pages">'),
                (P += G ? '<ul class="' + G + '">' : '<ul>'),
                l &&
                  (P +=
                    1 === f
                      ? '<li class="' + D + '-first ' + F + '" data-num="1"><a>' + x + '</a></li>'
                      : '<li class="' +
                        D +
                        '-first J-paginationjs-page" data-num="1" title="First page"><a href="' +
                        w +
                        '">' +
                        x +
                        '</a></li>'),
                n &&
                  (1 === f
                    ? L || (P += '<li class="' + D + '-prev ' + F + '"><a>' + y + '</a></li>')
                    : (P +=
                        '<li class="' +
                        D +
                        '-prev J-paginationjs-previous" data-num="' +
                        (f - 1) +
                        '" title="Previous page"><a href="' +
                        w +
                        '">' +
                        y +
                        '</a></li>')),
                q)
              ) {
                if (h <= 3)
                  for (d = 1; d < h; d++)
                    P +=
                      d == f
                        ? '<li class="' +
                          D +
                          '-page J-paginationjs-page ' +
                          E +
                          '" data-num="' +
                          d +
                          '"><a>' +
                          d +
                          '</a></li>'
                        : '<li class="' +
                          D +
                          '-page J-paginationjs-page" data-num="' +
                          d +
                          '"><a href="' +
                          w +
                          '">' +
                          d +
                          '</a></li>';
                else
                  m.showFirstOnEllipsisShow &&
                    (P +=
                      '<li class="' +
                      D +
                      '-page ' +
                      D +
                      '-first J-paginationjs-page" data-num="1"><a href="' +
                      w +
                      '">1</a></li>'),
                    (P += '<li class="' + D + '-ellipsis ' + F + '"><a>' + B + '</a></li>');
                for (d = h; d <= i; d++)
                  P +=
                    d == f
                      ? '<li class="' +
                        D +
                        '-page J-paginationjs-page ' +
                        E +
                        '" data-num="' +
                        d +
                        '"><a>' +
                        d +
                        '</a></li>'
                      : '<li class="' +
                        D +
                        '-page J-paginationjs-page" data-num="' +
                        d +
                        '"><a href="' +
                        w +
                        '">' +
                        d +
                        '</a></li>';
                if (i >= g - 2)
                  for (d = i + 1; d <= g; d++)
                    P +=
                      '<li class="' +
                      D +
                      '-page J-paginationjs-page" data-num="' +
                      d +
                      '"><a href="' +
                      w +
                      '">' +
                      d +
                      '</a></li>';
                else
                  (P += '<li class="' + D + '-ellipsis ' + F + '"><a>' + B + '</a></li>'),
                    m.showLastOnEllipsisShow &&
                      (P +=
                        '<li class="' +
                        D +
                        '-page ' +
                        D +
                        '-last J-paginationjs-page" data-num="' +
                        g +
                        '"><a href="' +
                        w +
                        '">' +
                        g +
                        '</a></li>');
              }
              o &&
                (f == g
                  ? M || (P += '<li class="' + D + '-next ' + F + '"><a>' + z + '</a></li>')
                  : (P +=
                      '<li class="' +
                      D +
                      '-next J-paginationjs-next" data-num="' +
                      (f + 1) +
                      '" title="Next page"><a href="' +
                      w +
                      '">' +
                      z +
                      '</a></li>')),
                p &&
                  (P +=
                    f == g
                      ? '<li class="' + D + '-last ' + F + '" data-num="' + g + '"><a>' + A + '</a></li>'
                      : '<li class="' +
                        D +
                        '-last J-paginationjs-page" data-num="' +
                        g +
                        '" title="Last page"><a href="' +
                        w +
                        '">' +
                        A +
                        '</a></li>'),
                (P += '</ul></div>');
            }
            return (
              r &&
                I &&
                ((c = e.replaceVariables(I, { currentPage: f, totalPage: g, totalNumber: k })),
                (P += '<div class="' + D + '-nav J-paginationjs-nav">' + c + '</div>')),
              s &&
                J &&
                ((c = e.replaceVariables(J, { currentPage: f, totalPage: g, totalNumber: k, input: R })),
                (P += '<div class="' + D + '-go-input">' + c + '</div>')),
              t &&
                K &&
                ((c = e.replaceVariables(K, { currentPage: f, totalPage: g, totalNumber: k, button: S })),
                (P += '<div class="' + D + '-go-button">' + c + '</div>')),
              O && ((c = e.replaceVariables(O, { currentPage: f, totalPage: g, totalNumber: k })), (P += c)),
              P
            );
          },
          go: function (a, c) {
            function d(a) {
              if (!1 === e.callHook('beforePaging', g)) return !1;
              if (
                ((f.direction = void 0 === f.pageNumber ? 0 : g > f.pageNumber ? 1 : -1),
                (f.pageNumber = g),
                e.render(),
                e.disabled && !e.sync && e.enable(),
                (j.data('pagination').model = f),
                b.isFunction(m.formatResult))
              ) {
                var d = b.extend(!0, [], a);
                i.isArray((a = m.formatResult(d))) || (a = d);
              }
              (j.data('pagination').currentPageData = a),
                e.doCallback(a, c),
                e.callHook('afterPaging', g),
                1 == g && e.callHook('afterIsFirstPage'),
                g == f.totalPage && e.callHook('afterIsLastPage');
            }
            var e = this,
              f = e.model;
            if (!e.disabled) {
              var g = a,
                h = m.pageSize,
                k = f.totalPage;
              if (!(!(g = parseInt(g)) || g < 1 || g > k)) {
                if (e.sync) return void d(e.getDataSegment(g));
                var l = {},
                  n = m.alias || {};
                (l[n.pageSize ? n.pageSize : 'pageSize'] = h), (l[n.pageNumber ? n.pageNumber : 'pageNumber'] = g);
                var o = {
                  type: 'get',
                  cache: !1,
                  data: {},
                  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                  dataType: 'json',
                  async: !0,
                };
                b.extend(!0, o, m.ajax),
                  b.extend(o.data || {}, l),
                  (o.url = m.dataSource),
                  (o.success = function (a) {
                    d(e.filterDataByLocator(a));
                  }),
                  (o.error = function (a, b, c) {
                    m.formatAjaxError && m.formatAjaxError(a, b, c), e.enable();
                  }),
                  e.disable(),
                  b.ajax(o);
              }
            }
          },
          doCallback: function (a, c) {
            var d = this,
              e = d.model;
            b.isFunction(c) ? c(a, e) : b.isFunction(m.callback) && m.callback(a, e);
          },
          destroy: function () {
            !1 !== this.callHook('beforeDestroy') &&
              (this.model.el.remove(), j.off(), b('#paginationjs-style').remove(), this.callHook('afterDestroy'));
          },
          previous: function (a) {
            this.go(this.model.pageNumber - 1, a);
          },
          next: function (a) {
            this.go(this.model.pageNumber + 1, a);
          },
          disable: function () {
            var a = this,
              b = a.sync ? 'sync' : 'async';
            !1 !== a.callHook('beforeDisable', b) &&
              ((a.disabled = !0), (a.model.disabled = !0), a.callHook('afterDisable', b));
          },
          enable: function () {
            var a = this,
              b = a.sync ? 'sync' : 'async';
            !1 !== a.callHook('beforeEnable', b) &&
              ((a.disabled = !1), (a.model.disabled = !1), a.callHook('afterEnable', b));
          },
          refresh: function (a) {
            this.go(this.model.pageNumber, a);
          },
          show: function () {
            var a = this;
            a.model.el.is(':visible') || a.model.el.show();
          },
          hide: function () {
            var a = this;
            a.model.el.is(':visible') && a.model.el.hide();
          },
          replaceVariables: function (a, b) {
            var c;
            for (var d in b) {
              var e = b[d],
                f = new RegExp('<%=\\s*' + d + '\\s*%>', 'img');
              c = (c || a).replace(f, e);
            }
            return c;
          },
          getDataSegment: function (a) {
            var b = m.pageSize,
              c = m.dataSource,
              d = m.totalNumber,
              e = b * (a - 1) + 1,
              f = Math.min(a * b, d);
            return c.slice(e - 1, f);
          },
          getTotalPage: function () {
            return Math.ceil(m.totalNumber / m.pageSize);
          },
          getLocator: function (a) {
            var d;
            return (
              'string' == typeof a
                ? (d = a)
                : b.isFunction(a)
                ? (d = a())
                : c('"locator" is incorrect. (String | Function)'),
              d
            );
          },
          filterDataByLocator: function (a) {
            var d,
              e = this.getLocator(m.locator);
            if (i.isObject(a)) {
              try {
                b.each(e.split('.'), function (b, c) {
                  d = (d || a)[c];
                });
              } catch (a) {}
              d ? i.isArray(d) || c('dataSource.' + e + ' must be an Array.') : c('dataSource.' + e + ' is undefined.');
            }
            return d || a;
          },
          parseDataSource: function (a, d) {
            var e = this;
            i.isObject(a)
              ? d((m.dataSource = e.filterDataByLocator(a)))
              : i.isArray(a)
              ? d((m.dataSource = a))
              : b.isFunction(a)
              ? m.dataSource(function (a) {
                  b.isFunction(a) && c('Unexpect parameter of the "done" Function.'), e.parseDataSource.call(e, a, d);
                })
              : 'string' == typeof a
              ? (/^https?|file:/.test(a) && (m.ajaxDataType = 'jsonp'), d(a))
              : c('Unexpect data type of the "dataSource".');
          },
          callHook: function (c) {
            var d,
              e = j.data('pagination'),
              f = Array.prototype.slice.apply(arguments);
            return (
              f.shift(),
              m[c] && b.isFunction(m[c]) && !1 === m[c].apply(a, f) && (d = !1),
              e.hooks &&
                e.hooks[c] &&
                b.each(e.hooks[c], function (b, c) {
                  !1 === c.apply(a, f) && (d = !1);
                }),
              !1 !== d
            );
          },
          observer: function () {
            var a = this,
              d = a.model.el;
            j.on(h + 'go', function (d, e, f) {
              (e = parseInt(b.trim(e))) && (b.isNumeric(e) || c('"pageNumber" is incorrect. (Number)'), a.go(e, f));
            }),
              d.delegate('.J-paginationjs-length-select', 'change', function (c) {
                var d = b(c.currentTarget),
                  e = parseInt(d.val());
                if ('number' == typeof e)
                  return (
                    !1 !== a.callHook('beforeLengthSelectOnChange', c, e) &&
                    ((m.pageSize = e),
                    a.refresh(),
                    a.callHook('afterLengthSelectOnChange', c, pageNumber),
                    !!m.pageLink && void 0)
                  );
              }),
              d.delegate('.J-paginationjs-page', 'click', function (c) {
                var d = b(c.currentTarget),
                  e = b.trim(d.attr('data-num'));
                if (e && !d.hasClass(m.disableClassName) && !d.hasClass(m.activeClassName))
                  return (
                    !1 !== a.callHook('beforePageOnClick', c, e) &&
                    (a.go(e), a.callHook('afterPageOnClick', c, e), !!m.pageLink && void 0)
                  );
              }),
              d.delegate('.J-paginationjs-previous', 'click', function (c) {
                var d = b(c.currentTarget),
                  e = b.trim(d.attr('data-num'));
                if (e && !d.hasClass(m.disableClassName))
                  return (
                    !1 !== a.callHook('beforePreviousOnClick', c, e) &&
                    (a.go(e), a.callHook('afterPreviousOnClick', c, e), !!m.pageLink && void 0)
                  );
              }),
              d.delegate('.J-paginationjs-next', 'click', function (c) {
                var d = b(c.currentTarget),
                  e = b.trim(d.attr('data-num'));
                if (e && !d.hasClass(m.disableClassName))
                  return (
                    !1 !== a.callHook('beforeNextOnClick', c, e) &&
                    (a.go(e), a.callHook('afterNextOnClick', c, e), !!m.pageLink && void 0)
                  );
              }),
              d.delegate('.J-paginationjs-go-button', 'click', function (c) {
                var e = b('.J-paginationjs-go-pagenumber', d).val();
                if (!1 === a.callHook('beforeGoButtonOnClick', c, e)) return !1;
                j.trigger(h + 'go', e), a.callHook('afterGoButtonOnClick', c, e);
              }),
              d.delegate('.J-paginationjs-go-pagenumber', 'keyup', function (c) {
                if (13 === c.which) {
                  var e = b(c.currentTarget).val();
                  if (!1 === a.callHook('beforeGoInputOnEnter', c, e)) return !1;
                  j.trigger(h + 'go', e),
                    b('.J-paginationjs-go-pagenumber', d).focus(),
                    a.callHook('afterGoInputOnEnter', c, e);
                }
              }),
              j.on(h + 'previous', function (b, c) {
                a.previous(c);
              }),
              j.on(h + 'next', function (b, c) {
                a.next(c);
              }),
              j.on(h + 'disable', function () {
                a.disable();
              }),
              j.on(h + 'enable', function () {
                a.enable();
              }),
              j.on(h + 'refresh', function (b, c) {
                a.refresh(c);
              }),
              j.on(h + 'show', function () {
                a.show();
              }),
              j.on(h + 'hide', function () {
                a.hide();
              }),
              j.on(h + 'destroy', function () {
                a.destroy();
              }),
              m.triggerPagingOnInit && j.trigger(h + 'go', Math.min(m.pageNumber, a.model.totalPage));
          },
        };
      if (j.data('pagination') && !0 === j.data('pagination').initialized) {
        if (b.isNumeric(f)) return j.trigger.call(this, h + 'go', f, arguments[1]), this;
        if ('string' == typeof f) {
          var l = Array.prototype.slice.apply(arguments);
          switch (((l[0] = h + l[0]), f)) {
            case 'previous':
            case 'next':
            case 'go':
            case 'disable':
            case 'enable':
            case 'refresh':
            case 'show':
            case 'hide':
            case 'destroy':
              j.trigger.apply(this, l);
              break;
            case 'getSelectedPageNum':
              return j.data('pagination').model
                ? j.data('pagination').model.pageNumber
                : j.data('pagination').attributes.pageNumber;
            case 'getTotalPage':
              return j.data('pagination').model.totalPage;
            case 'getSelectedPageData':
              return j.data('pagination').currentPageData;
            case 'isDisabled':
              return !0 === j.data('pagination').model.disabled;
            default:
              c('Pagination do not provide action: ' + f);
          }
          return this;
        }
        e(j);
      } else i.isObject(f) || c('Illegal options');
      var m = b.extend({}, b.fn[g].defaults, f);
      return d(m), k.initialize(), this;
    }),
    (b.fn[g].defaults = {
      totalNumber: 1,
      pageNumber: 1,
      pageSize: 10,
      pageRange: 2,
      showFirst: !0,
      showLast: !0,
      showPrevious: !0,
      showNext: !0,
      showPageNumbers: !0,
      showNavigator: !1,
      showGoInput: !1,
      showGoButton: !1,
      showLengthController: !1,
      lengthController: [10, 20, 50],
      pageLink: '',
      firstText: '&laquo;',
      prevText: '&lsaquo;',
      nextText: '&rsaquo;',
      lastText: '&raquo;',
      ellipsisText: '...',
      goButtonText: 'Go',
      classPrefix: 'paginationjs',
      activeClassName: 'active',
      disableClassName: 'disabled',
      inlineStyle: !0,
      formatLengthController: 'Showing <%= length %> entries per page from <%= total %> entries',
      formatNavigator: '<%= currentPage %> / <%= totalPage %>',
      formatGoInput: '<%= input %>',
      formatGoButton: '<%= button %>',
      position: 'bottom',
      autoHidePrevious: !1,
      autoHideNext: !1,
      triggerPagingOnInit: !0,
      hideWhenLessThanOnePage: !1,
      showFirstOnEllipsisShow: !0,
      showLastOnEllipsisShow: !0,
      callback: function () {},
    }),
    (b.fn.addHook = function (a, d) {
      arguments.length < 2 && c('Missing argument.'), b.isFunction(d) || c('callback must be a function.');
      var e = b(this),
        f = e.data('pagination');
      f || (e.data('pagination', {}), (f = e.data('pagination'))),
        !f.hooks && (f.hooks = {}),
        (f.hooks[a] = f.hooks[a] || []),
        f.hooks[a].push(d);
    }),
    (b[g] = function (a, d) {
      arguments.length < 2 && c('Requires two parameters.');
      var e;
      if (((e = 'string' != typeof a && a instanceof jQuery ? a : b(a)), e.length)) return e.pagination(d), e;
    });
  var i = {};
  b.each(['Object', 'Array'], function (a, b) {
    i['is' + b] = function (a) {
      return f(a) === b.toLowerCase();
    };
  }),
    'function' == typeof define &&
      define.amd &&
      define(function () {
        return b;
      });
})(this, window.jQuery);
