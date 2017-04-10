/**
 * Created by DELL on 2017/4/7.
 */
$.jsonWhere: function (data, action) {
    if (action == null) return;
    var reval = new Array();
    $(data).each(function (i, v) {
        if (action(v)) {
            reval.push(v);
        }
    })
    return reval;
};
$.each(data, function (i) {
    var row = data[i];
    if (row.F_ParentId == "0") {
        if (i == 0) {
            _html += '<li class="treeview active">';
        } else {
            _html += '<li class="treeview">';
        }
        _html += '<a href="#">'
        _html += '<i class="' + row.F_Icon + '"></i><span>' + row.F_FullName + '</span><i class="fa fa-angle-left pull-right"></i>'
        _html += '</a>'
        var childNodes = $.learunindex.jsonWhere(data, function (v) { return v.F_ParentId == row.F_ModuleId });
        if (childNodes.length > 0) {
            _html += '<ul class="treeview-menu">';
            $.each(childNodes, function (i) {
                var subrow = childNodes[i];
                var subchildNodes = $.learunindex.jsonWhere(data, function (v) { return v.F_ParentId == subrow.F_ModuleId });
                _html += '<li>';
                if (subchildNodes.length > 0) {
                    _html += '<a href="#"><i class="' + subrow.F_Icon + '"></i>' + subrow.F_FullName + '';
                    _html += '<i class="fa fa-angle-left pull-right"></i></a>';
                    _html += '<ul class="treeview-menu">';
                    $.each(subchildNodes, function (i) {
                        var subchildNodesrow = subchildNodes[i];
                        _html += '<li><a class="menuItem" data-id="' + subrow.F_ModuleId + '" href="' + subrow.F_UrlAddress + '"><i class="' + subchildNodesrow.F_Icon + '"></i>' + subchildNodesrow.F_FullName + '</a></li>';
                    });
                    _html += '</ul>';

                } else {
                    _html += '<a class="menuItem" data-id="' + subrow.F_ModuleId + '" href="' + subrow.F_UrlAddress + '"><i class="' + subrow.F_Icon + '"></i>' + subrow.F_FullName + '</a>';
                }
                _html += '</li>';
            });
            _html += '</ul>';
        }
        _html += '</li>'
    }
});