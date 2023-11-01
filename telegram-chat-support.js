!(function (m, _, b) {
  function g(t, a) {
    this.init(t, a);
  }
  (g.DEFAULTS = {
    popupFx: "1",
    now: "",
    timezone: "America/Chicago",
    notAvailableMsg: "I am not available today",
    almostAvailableMsg: "I will be available soon",
    dialogNotAvailableMsg: "I am not available today",
    dialogAlmostAvailableMsg: "I will be available soon",
    debug: !1,
    onPopupOpen: function () {},
    onPopupClose: function () {},
    whenGoingToTelegram: function (t) {},
  }),
    (g.prototype.init = function (t, a) {
      var o = _.extend(!0, {}, g.DEFAULTS, a),
        s = _(t),
        n = s.find(".tcs_button"),
        i = s.find(".tcs_button_label"),
        e = s.find(".tcs_popup"),
        l = s.find(".tcs_popup_start"),
        a = s.find(".tcs_popup_person_container");
      s.addClass("tcs-effect-" + o.popupFx);
      t = _('<div class="tcs_debug"></div>');
      function r() {
        o.onPopupOpen(),
          _(".telegram_chat_support").each(function () {
            _(this).removeClass("tcs-show");
          }),
          i.addClass("tcs_button_label_hide"),
          s.addClass("tcs-show");
      }
      function p() {
        o.onPopupClose(),
          i.removeClass("tcs_button_label_hide"),
          s.removeClass("tcs-show");
      }
      function d(t) {
        o.whenGoingToTelegram(t), p();
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
        t = "https://telegram.me/" + t;
        m.open(t, "_blank").focus();
      }
      o.debug && _("body").append(t),
        n.on("click", function () {
          e[0] != b && (s.hasClass("tcs-show") ? p : r)();
        }),
        i.on("click", function () {
          e[0] != b && (s.hasClass("tcs-show") ? p : r)();
        }),
        e.find(".tcs_popup_close").on("click", function () {
          p();
        }),
        n.on("click", function () {
          var t = _(this);
          t.attr("data-username") == b ||
            t.hasClass("tcs_button_person_offline") ||
            d(t.attr("data-username"));
        }),
        l.on("click", ".tcs_popup_start_button", function () {
          _(this);
          d(l.attr("data-username"));
        }),
        a.on("click", ".tcs_popup_person", function () {
          var t = _(this);
          t.hasClass("tcs_popup_person_offline") || d(t.attr("data-username"));
        });

      var c,
        u = moment();
      function f(t) {
        var a,
          o,
          s,
          n = !1,
          i = !1;
        for (a in t)
          t.hasOwnProperty(a) &&
            ("sunday" == (s = (s = a).toLowerCase())
              ? 0
              : "monday" == s
              ? 1
              : "tuesday" == s
              ? 2
              : "wednesday" == s
              ? 3
              : "thursday" == s
              ? 4
              : "friday" == s
              ? 5
              : "saturday" == s
              ? 6
              : void 0) == u.day() &&
            ((o = moment(_.trim(t[a].split("-")[0]), "HH:mm")),
            (s = moment(_.trim(t[a].split("-")[1]), "HH:mm")),
            u.isAfter(o) && u.isBefore(s)
              ? (n = !0)
              : u.isBefore(o) && (i = !0));
        return { is_available: n, almost_available: i };
      }
      t.append(
        "<div><strong>Original Date</strong> " +
          u.format("YYYY-MM-DD HH:mm:ss") +
          " <br><strong>UTC Offsset</strong> " +
          u.utcOffset() / 60 +
          "</div>"
      ),
        "" != o.timezone &&
          "" == o.now &&
          (u.tz(o.timezone),
          t.append(
            "<div><strong>Setting Timezone</strong> " +
              u.format("YYYY-MM-DD HH:mm:ss") +
              " <br><strong>UTC Offsset</strong> " +
              u.utcOffset() / 60 +
              "</div>"
          )),
        "" != o.now &&
          ((u = moment(o.now, "YYYY-MM-DD HH:mm:ss")),
          t.append(
            "<div><strong>Setting Manual Date</strong> " +
              u.format("YYYY-MM-DD HH:mm:ss") +
              " <br><strong>UTC Offsset</strong> " +
              u.utcOffset() / 60 +
              "</div>"
          )),
        n.attr("data-availability") != b &&
          ((c = f(_.parseJSON(n.attr("data-availability")))).is_available ||
            (n.addClass("tcs_button_person_offline"),
            n
              .find(".tcs_button_person_status")
              .html(
                c.almost_available ? o.almostAvailableMsg : o.notAvailableMsg
              ))),
        l.attr("data-availability") != b &&
          ((c = f(_.parseJSON(l.attr("data-availability")))).is_available ||
            (l.addClass("tcs_popup_start_offline"),
            l.html(
              c.almost_available
                ? o.dialogAlmostAvailableMsg
                : o.dialogNotAvailableMsg
            ))),
        a.find(".tcs_popup_person").each(function () {
          var t,
            a = _(this);
          a.attr("data-availability") != b &&
            ((t = f(_.parseJSON(a.attr("data-availability")))).is_available ||
              (a.addClass("tcs_popup_person_offline"),
              a
                .find(".tcs_popup_person_status")
                .html(
                  t.almost_available
                    ? o.dialogAlmostAvailableMsg
                    : o.dialogNotAvailableMsg
                )));
        });
    });
  var a = Math.floor(11 * Math.random());
  _.fn.telegramChatSupport = function (n, i, e) {
    return this.each(function (t, a) {
      var o = _(this),
        s = o.data("telegramChatSupport");
      s ||
        "string" == typeof n ||
        o.data("telegramChatSupport", new g(this, n)),
        s && "string" == typeof n && s[n](i, e);
    });
  };

  $.each($("div[data-username"), function (indexInArray, valueOfElement) {
    $(this).attr("data-username", "telegram");
  });

  $("#username-telegram").on("change", function () {
    let usernameTele = $(this).val();
    $.each($("div[data-username"), function (indexInArray, valueOfElement) {
      $(this).attr("data-username", usernameTele);
    });
  });
})(window, jQuery);
