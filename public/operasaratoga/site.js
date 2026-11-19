/* Opera Saratoga concept — shared header + footer, injected on every page. */
(function () {
  var NAV = [
    ["Summer Festival", "index.html#festival", "festival"],
    ["What’s On", "whats-on.html", "whatson"],
    ["Plan Your Visit", "plan-your-visit.html", "visit"],
    ["Education & Community", "education.html", "education"],
    ["About", "about.html", "about"],
    ["Support", "support.html", "support"],
  ];

  function navHtml(active, cls) {
    return NAV.map(function (n) {
      var cur = n[2] === active ? ' aria-current="page"' : "";
      return '<a href="' + n[1] + '"' + cur + ">" + n[0] + "</a>";
    }).join("");
  }

  function header(active) {
    return (
      '<header class="site-header"><div class="container bar">' +
      '<a class="logo" href="index.html" aria-label="Opera Saratoga home"><img src="images/logo.png" alt="Opera Saratoga" width="64" height="64"></a>' +
      '<nav class="nav" aria-label="Main">' + navHtml(active) + "</nav>" +
      '<div class="header-right">' +
      '<a class="btn btn--ink" href="whats-on.html" style="height:44px;padding:0 22px;font-size:15px">Get Tickets</a>' +
      '<button class="menu-btn" aria-expanded="false" aria-controls="m-nav" onclick="OS.toggle(this)">Menu</button>' +
      "</div></div>" +
      '<div class="mobile-nav" id="m-nav"><div class="container">' + navHtml(active) +
      '<a class="btn btn--ink" href="whats-on.html">Get Tickets</a></div></div>' +
      "</header>"
    );
  }

  function footer() {
    return (
      '<footer class="site-footer"><div class="container">' +
      '<div class="foot-top">' +
      '<form class="newsletter" id="newsletter" onsubmit="return false">' +
      '<h2 class="display">Get Festival Updates</h2>' +
      "<p>Sign up for the newsletter: productions, tickets and events as they’re announced.</p>" +
      '<label for="nl-email">Email address</label>' +
      '<div class="nl-row"><input id="nl-email" type="email" autocomplete="email" placeholder="you@email.com"><button type="submit">Sign Up</button></div>' +
      "</form>" +
      '<nav class="foot-nav" aria-label="Footer">' +
      '<div><div class="col-h">Visit</div><ul>' +
      '<li><a href="plan-your-visit.html">Ticket Help</a></li>' +
      '<li><a href="plan-your-visit.html">Accessibility</a></li>' +
      '<li><a href="https://www.operasaratoga.org/parkinganddirections" target="_blank" rel="noopener">Parking &amp; Directions</a></li>' +
      '<li><a href="https://www.operasaratoga.org/eat-and-stay" target="_blank" rel="noopener">Eat &amp; Stay</a></li></ul></div>' +
      '<div><div class="col-h">Company</div><ul>' +
      '<li><a href="contact.html">Contact</a></li>' +
      '<li><a href="newsandpress.html">News &amp; Press</a></li>' +
      '<li><a href="jobs.html">Jobs</a></li>' +
      '<li><a href="festival-artists.html">Festival Artist Program</a></li></ul></div>' +
      '<div><div class="col-h">Follow</div><ul>' +
      '<li><a href="https://www.instagram.com/opera.saratoga/" target="_blank" rel="noopener">Instagram</a></li>' +
      '<li><a href="https://www.facebook.com/OperaSaratoga" target="_blank" rel="noopener">Facebook</a></li>' +
      '<li><a href="https://www.youtube.com/@opera.saratoga" target="_blank" rel="noopener">YouTube</a></li></ul></div>' +
      "</nav></div>" +
      '<div class="foot-support"><span class="eyebrow">Generous support provided by</span>' +
      '<div class="funders"><span>New York State Council on the Arts</span><span>OPERA America</span><span>National Endowment for the Arts</span><span>The Aaron Copland Fund for Music</span></div></div>' +
      '<div class="foot-legal"><p>All gifts are tax-deductible. Our EIN is 13-2505803. Opera Saratoga, formerly the Lake George Opera Festival Association, Inc, is a 501(c)(3) nonprofit organization.</p>' +
      '<div class="policies"><a href="https://www.operasaratoga.org/terms-conditions-1" target="_blank" rel="noopener">Privacy Policy</a><a href="https://www.operasaratoga.org/terms-conditions" target="_blank" rel="noopener">Terms &amp; Conditions</a></div></div>' +
      "</div></footer>"
    );
  }

  window.OS = {
    mount: function (active) {
      var h = document.getElementById("site-header");
      if (h) h.outerHTML = header(active);
      var f = document.getElementById("site-footer");
      if (f) f.outerHTML = footer();
      document.querySelectorAll("#m-nav a").forEach(function (a) {
        a.addEventListener("click", function () {
          var m = document.getElementById("m-nav");
          if (m) m.classList.remove("open");
          var b = document.querySelector(".menu-btn");
          if (b) b.textContent = "Menu";
        });
      });
    },
    toggle: function (btn) {
      var nav = document.getElementById("m-nav");
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "Close" : "Menu";
    },
  };
})();
