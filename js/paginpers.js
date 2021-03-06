let paginpers = function () {
    //Pagination
    pageSize = 4;
    incremSlide = 5;
    startPage = 0;
    numberPage = 0;

    var pageCount = $(".line-content").length / pageSize;
    var totalSlidepPage = Math.floor(pageCount / incremSlide);
    $("#pagin").html("");
    for (var i = 0; i < pageCount; i++) {
        $("#pagin").append('<li><a href="javascript:void()">' + (i + 1) + '</a></li> ');
    }

    $("#pagin li").first().addClass("active");

    $("#pagin li").eq(0).addClass("active");

    $("#pagin li a").click(function () {
        $("#pagin li").removeClass("active");
        $(this).parent().addClass("active");
        showPage(parseInt($(this).text()));
    });
}
slide = function (sens) {
    $("#pagin li").hide();

    for (t = startPage; t < incremSlide; t++) {
        $("#pagin li").eq(t + 1).show();
    }
    if (startPage == 0) {
        next.show();
        prev.hide();
    } else if (numberPage == totalSlidepPage) {
        next.hide();
        prev.show();
    } else {
        next.show();
        prev.show();
    }
}

showPage = function (page) {
    $(".line-content").hide();
    $(".line-content").each(function (n) {
        if (n >= pageSize * (page - 1) && n < pageSize * page)
            $(this).show();
    });
}

