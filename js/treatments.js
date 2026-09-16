(function () {
  "use strict";
  var grid = document.getElementById("treatments-grid");
  var treatments = window.TREATMENTS || [];
  if (!grid) return;
  grid.innerHTML = treatments.map(function (item) {
    var url = "treatment-details.html?slug=" + encodeURIComponent(item.slug);
    return '<article class="treatment-card">' +
      '<a class="treatment-card-image" href="' + url + '" aria-label="View ' + item.title + '">' +
        '<img src="' + item.image + '" alt="' + item.title + '" loading="lazy">' +
        '<span class="treatment-image-overlay"></span>' +
      '</a>' +
      '<div class="treatment-card-body">' +
        '<span class="treatment-card-label">SPECIALIZED CARE</span>' +
        '<h3><a href="' + url + '">' + item.title + '</a></h3>' +
        '<p>' + item.shortDescription + '</p>' +
        '<a class="treatment-read-more" href="' + url + '">Read More <span>↗</span></a>' +
      '</div>' +
    '</article>';
  }).join("");
})();