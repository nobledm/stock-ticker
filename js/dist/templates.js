(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['dailyReport'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.propertyIsEnumerable;

  return "<h3 class=\"symbol\">Symbol: "
    + container.escapeExpression(((helper = (helper = helpers.symbol || (depth0 != null ? depth0.symbol : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"symbol","hash":{},"data":data}) : helper)))
    + "</h3>\r\n\r\n"
    + ((stack1 = container.invokePartial(partials.dailyTrend,depth0,{"name":"dailyTrend","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['dailyTrend'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4=container.escapeExpression;

  return "    <ul>\r\n        <li class=\"date\">"
    + alias4((helpers.dateUTC||(depth0 && depth0.dateUTC)||alias3).call(alias2,(depth0 != null ? depth0.day : depth0),{"name":"dateUTC","hash":{},"data":data}))
    + "</li>\r\n        <li>Open: "
    + alias4((helpers.currency||(depth0 && depth0.currency)||alias3).call(alias2,(depth0 != null ? depth0.open : depth0),{"name":"currency","hash":{},"data":data}))
    + "</li>\r\n        <li>Close: "
    + alias4((helpers.currency||(depth0 && depth0.currency)||alias3).call(alias2,(depth0 != null ? depth0.close : depth0),{"name":"currency","hash":{},"data":data}))
    + "</li>\r\n        <li>High: "
    + alias4((helpers.currency||(depth0 && depth0.currency)||alias3).call(alias2,(depth0 != null ? depth0.high : depth0),{"name":"currency","hash":{},"data":data}))
    + "</li>\r\n        <li>Low: "
    + alias4((helpers.currency||(depth0 && depth0.currency)||alias3).call(alias2,(depth0 != null ? depth0.low : depth0),{"name":"currency","hash":{},"data":data}))
    + "</li>\r\n    </ul>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.checkedDays : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();