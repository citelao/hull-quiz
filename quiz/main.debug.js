this.Hull = this.Hull || {};
this.Hull.templates = this.Hull.templates || {};
this.Hull.templates._default = this.Hull.templates._default || {};
Hull.templates._default["quiz/fields/checkboxes"]=function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, helper;
  buffer += "\n<div>\n  <label class='fb-option'>\n    <input type='checkbox' name=\""
    + escapeExpression(((stack1 = (depth1 && depth1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "[]\" value=\"";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.required), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " />\n    ";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n  </label>\n</div>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "checked";
  }

function program4(depth0,data) {
  
  
  return "data-parsley-maxcheck=\"1\"";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n<div class='other-option'>\n  <label class='fb-option'>\n    <input type='checkbox' name=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "[]\" value=\"other\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.other_value), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " />\n    Other\n  </label>\n\n  <input type='text' name=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "_other_value\" value=\"";
  if (helper = helpers.other_value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.other_value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n</div>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.field_options)),stack1 == null || stack1 === false ? stack1 : stack1.options), {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.field_options)),stack1 == null || stack1 === false ? stack1 : stack1.include_other_option), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  };
Hull.templates._default["quiz/fields/date"]=function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return "required";
  }

  buffer += "<input id=\"";
  if (helper = helpers.input_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.input_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" type='date' name='";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "'\n  ";
  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.required) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.required); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.required) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  value=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\n/>\n";
  return buffer;
  };
Hull.templates._default["quiz/fields/dropdown"]=function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n      <option value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" ";
  stack1 = (helper = helpers.ifEqual || (depth0 && depth0.ifEqual),options={hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data},helper ? helper.call(depth0, depth0, (depth1 && depth1.value), options) : helperMissing.call(depth0, "ifEqual", depth0, (depth1 && depth1.value), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        "
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\n      </option>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "selected";
  }

  buffer += "<div class=\"dropdown\">\n  <select name=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" id=\"profile-form-field-";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0['enum']), {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </select>\n</div>\n";
  return buffer;
  };
Hull.templates._default["quiz/fields/email"]=function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return "required";
  }

  buffer += "<input id=\"profile-form-field-";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" type='email' name='";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "'\n  ";
  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.required) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.required); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.required) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  value=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\n  placeholder=\"";
  if (helper = helpers.placeholder) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.placeholder); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\n/>\n";
  return buffer;
  };
Hull.templates._default["quiz/fields/number"]=function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "min=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.field_options)),stack1 == null || stack1 === false ? stack1 : stack1.min)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "max=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.field_options)),stack1 == null || stack1 === false ? stack1 : stack1.max)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "data-parsley-type=\"integer\"";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <span class=\"add-on input-group-addon\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.field_options)),stack1 == null || stack1 === false ? stack1 : stack1.units)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n  ";
  return buffer;
  }

  buffer += "<span class=\"input-group input-append\">\n\n  <input type='text' name=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" value=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"  class=\"form-control\"\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.field_options)),stack1 == null || stack1 === false ? stack1 : stack1.min), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.field_options)),stack1 == null || stack1 === false ? stack1 : stack1.max), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.field_options)),stack1 == null || stack1 === false ? stack1 : stack1.integer_only), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    data-parsley-trigger=\"change\"\n    data-parsley-errors-container=\"#parsley-errors-";
  if (helper = helpers.input_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.input_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\n  /> \n  ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.field_options)),stack1 == null || stack1 === false ? stack1 : stack1.units), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</span>\n\n<span id=\"parsley-errors-";
  if (helper = helpers.input_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.input_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></span>\n";
  return buffer;
  };
Hull.templates._default["quiz/fields/paragraph"]=function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<textarea id=\"";
  if (helper = helpers.input_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.input_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" name=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</textarea>\n";
  return buffer;
  };
Hull.templates._default["quiz/fields/radio"]=function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, helper;
  buffer += "\n<div>\n  <label class='fb-option'>\n    <input type='radio' name=\""
    + escapeExpression(((stack1 = (depth1 && depth1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" value=\"";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " />\n    ";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n  </label>\n</div>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "checked";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n<div class='other-option'>\n  <label class='fb-option'>\n    <input type='radio' name=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" value=\"other\" ";
  stack1 = (helper = helpers.ifEqual || (depth0 && depth0.ifEqual),options={hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.value), "other", options) : helperMissing.call(depth0, "ifEqual", (depth0 && depth0.value), "other", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " />\n    Other\n  </label>\n\n  <input type='text' name=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "_other_value\" value=\"";
  if (helper = helpers.other_value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.other_value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n</div>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.field_options)),stack1 == null || stack1 === false ? stack1 : stack1.options), {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.field_options)),stack1 == null || stack1 === false ? stack1 : stack1.include_other_option), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  };
Hull.templates._default["quiz/fields/text"]=function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return "required";
  }

  buffer += "<input id=\"profile-form-field-";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" type='text' name='";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "'\n  ";
  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.required) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.required); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.required) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  value=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\n/>\n";
  return buffer;
  };
Hull.templates._default["quiz/fields/website"]=function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return "required";
  }

  buffer += "<input  id=\"";
  if (helper = helpers.input_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.input_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" type='url' name='";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "' class=\"form-control\" ";
  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.required) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.required); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.required) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" placeholder=\"http://\"/>";
  return buffer;
  };
Hull.templates._default["quiz/footer"]=function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<footer class=\"footer\">\n  <p>By playing, you agree to <a href=\"#\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.org)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'s Privacy Policy</a> and <a href=\"#\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.org)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'s Terms of Service</a>.</p>\n  <p>\n    <a data-hull-action=\"share\" data-hull-provider=\"facebook\">Share on Facebook</a>\n    <a data-hull-action=\"share\" data-hull-provider=\"twitter\">Share on Twitter</a>\n  </p>\n</footer>\n";
  return buffer;
  };
Hull.templates._default["quiz/header"]=function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <img class=\"logo\" src=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.logo_image)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" alt=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.quiz)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n  ";
  return buffer;
  }

  stack1 = self.invokePartial(partials['quiz/styles'], 'quiz/styles', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<div class=\"header\">\n  ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.logo_image), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n\n";
  return buffer;
  };
Hull.templates._default["quiz/intro"]=function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  ";
  stack1 = self.invokePartial(partials['quiz/result'], 'quiz/result', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n  <div class=\"row experience experience-intro\">\n    <div class=\"large-12 columns\">\n      <h1>"
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},data:data},helper ? helper.call(depth0, "intro_title", options) : helperMissing.call(depth0, "t", "intro_title", options)))
    + "</h1>\n      <p>"
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},data:data},helper ? helper.call(depth0, "intro_description", options) : helperMissing.call(depth0, "t", "intro_description", options)))
    + "</p>\n\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.loggedIn), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n  </div>\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\n        <a class=\"button\" role=\"button\" data-hull-action=\"start\">"
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},data:data},helper ? helper.call(depth0, "Start", options) : helperMissing.call(depth0, "t", "Start", options)))
    + "</a>\n      ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"social-login\">\n          ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.authServices), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n      ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n            <a role=\"button\" data-hull-action=\"start\" data-hull-provider=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"button social-btn social-btn-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n              "
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},data:data},helper ? helper.call(depth0, "Login and play with", options) : helperMissing.call(depth0, "t", "Login and play with", options)))
    + " "
    + escapeExpression((helper = helpers.humanize || (depth0 && depth0.humanize),options={hash:{},data:data},helper ? helper.call(depth0, (data == null || data === false ? data : data.key), options) : helperMissing.call(depth0, "humanize", (data == null || data === false ? data : data.key), options)))
    + "\n            </a>\n          ";
  return buffer;
  }

  stack1 = self.invokePartial(partials['quiz/header'], 'quiz/header', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.badge), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = self.invokePartial(partials['quiz/footer'], 'quiz/footer', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  };
Hull.templates._default["quiz/profile-form"]=function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n      <div class=\"field ";
  if (helper = helpers.field_type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.field_type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n        <label for=\"profile-form-field-";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</label>\n        ";
  stack1 = (helper = helpers.formField || (depth0 && depth0.formField),options={hash:{},data:data},helper ? helper.call(depth0, depth0, options) : helperMissing.call(depth0, "formField", depth0, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </div>\n    ";
  return buffer;
  }

  buffer += "<form class=\"profile-form\" data-action=\"profile\">\n  <div class=\"fields\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.profileFormFields), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n\n  <button class=\"button\" type=\"submit\">\n    "
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},data:data},helper ? helper.call(depth0, "Save my profile", options) : helperMissing.call(depth0, "t", "Save my profile", options)))
    + "\n  </button>\n</form>\n";
  return buffer;
  };
Hull.templates._default["quiz/question"]=function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "\n      <div class=\"progress round\">\n        <span class=\"meter\" data-hull-quiz-ticker style=\"width: 100%;\"></span>\n      </div>\n    ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n      <div class=\"question\">\n        <h1>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h1>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.description), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </div>\n    ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n          <p>";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n        ";
  return buffer;
  }

function program6(depth0,data) {
  
  
  return "\n      <div class=\"progress round\">\n        <span class=\"meter\" data-hull-question-ticker style=\"width: 100%;\"></span>\n      </div>\n    ";
  }

function program8(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.picture), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        <div class=\"answers\">\n        ";
  options={hash:{},inverse:self.noop,fn:self.programWithDepth(11, program11, data, depth0),data:data}
  if (helper = helpers.answers) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.answers); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.answers) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(11, program11, data, depth0),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n      ";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n          <img src=\"";
  if (helper = helpers.picture) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.picture); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" width=\"100%\" />\n        ";
  return buffer;
  }

function program11(depth0,data,depth1) {
  
  var buffer = "", stack1, helper;
  buffer += "\n          <a href=\"#\" data-hull-action=\"answer\" class=\"answer\" data-hull-answer-ref=\"";
  if (helper = helpers.ref) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.ref); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-hull-question-ref=\""
    + escapeExpression(((stack1 = (depth1 && depth1.ref)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            <h4>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.description), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </a>\n        ";
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n              <p>";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n            ";
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <div class=\"pagination-centered\">\n        <ul class=\"pagination\" role=\"menubar\" aria-label=\"Pagination\">\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.question)),stack1 == null || stack1 === false ? stack1 : stack1.pagination)),stack1 == null || stack1 === false ? stack1 : stack1.previous), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.question)),stack1 == null || stack1 === false ? stack1 : stack1.pagination)),stack1 == null || stack1 === false ? stack1 : stack1.next), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n      </div>\n    ";
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\n            <li class=\"arrow\"><a href=\"#\" data-hull-action=\"previous\">&laquo; "
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},data:data},helper ? helper.call(depth0, "Previous", options) : helperMissing.call(depth0, "t", "Previous", options)))
    + "</a></li>\n          ";
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\n            <li class=\"arrow\"><a href=\"#\" data-hull-action=\"next\">"
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},data:data},helper ? helper.call(depth0, "Next", options) : helperMissing.call(depth0, "t", "Next", options)))
    + " &raquo;</a></li>\n          ";
  return buffer;
  }

  stack1 = self.invokePartial(partials['quiz/header'], 'quiz/header', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<div class=\"row experience experience-question\">\n  <div class=\"large-12\">\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.quiz_timer), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  options={hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data}
  if (helper = helpers.question) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.question); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.question) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.question_timer), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    <div data-hull-question=\"";
  if (helper = helpers.ref) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.ref); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n      ";
  options={hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data}
  if (helper = helpers.question) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.question); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.question) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.display_pagination), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</div>\n\n";
  stack1 = self.invokePartial(partials['quiz/footer'], 'quiz/footer', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  };
Hull.templates._default["quiz/result"]=function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n      <h1>"
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},data:data},helper ? helper.call(depth0, "Bravo", options) : helperMissing.call(depth0, "t", "Bravo", options)))
    + "</h1>\n      <p>\n        ";
  if (helper = helpers.score) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.score); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " "
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},data:data},helper ? helper.call(depth0, "points", options) : helperMissing.call(depth0, "t", "points", options)))
    + " "
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},data:data},helper ? helper.call(depth0, "after", options) : helperMissing.call(depth0, "t", "after", options)))
    + " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.stats)),stack1 == null || stack1 === false ? stack1 : stack1.attempts)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},data:data},helper ? helper.call(depth0, "attempts", options) : helperMissing.call(depth0, "t", "attempts", options)))
    + "\n        <a href=\"#\" data-hull-action='replay'>"
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},data:data},helper ? helper.call(depth0, "Replay", options) : helperMissing.call(depth0, "t", "Replay", options)))
    + "</a> or\n        complete your profile.\n      </p>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      ";
  stack1 = self.invokePartial(partials['quiz/profile-form'], 'quiz/profile-form', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }

  stack1 = self.invokePartial(partials['quiz/header'], 'quiz/header', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<div class=\"row experience experience-result\">\n  <div class=\"large-12\">\n    ";
  stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.badge)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.profileFormFields), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</div>\n\n";
  stack1 = self.invokePartial(partials['quiz/footer'], 'quiz/footer', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  };
Hull.templates._default["quiz/styles"]=function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <link rel=\"stylesheet\" href=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.ship)),stack1 == null || stack1 === false ? stack1 : stack1.config)),stack1 == null || stack1 === false ? stack1 : stack1.appearance)),stack1 == null || stack1 === false ? stack1 : stack1.stylesheet_url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.ship)),stack1 == null || stack1 === false ? stack1 : stack1.config)),stack1 == null || stack1 === false ? stack1 : stack1.appearance)),stack1 == null || stack1 === false ? stack1 : stack1.stylesheet_url), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<style>\n\nbody {\n  color: "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.text_color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";\n  color: "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.text_color_alpha)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";\n  background-color: "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.background_color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";\n}\n\na {\n  color: "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.text_color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";\n  color: "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.text_color_alpha)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";\n}\n\nh1, h2, h3, h4, h5, h6, a:hover, a:active {\n  color: "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.text_color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";\n}\n\n.main {\n  background: linear-gradient(to bottom,\n  "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.background_color_alpha)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " 60%, "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.background_color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " 100%);\n}\n\n.button, .button:hover, .button:focus {\n  color: "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.button_text_color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";\n  background-color: "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.button_background_color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n}\n\n.main::after {\n  content: \"\";\n  background: url("
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.background_image)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ");\n  background-position: top center;\n  background-size: cover;\n  opacity: "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.background_image_opacity)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  position: absolute;\n  z-index: -1;\n  -webkit-filter: blur("
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.background_image_blur)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "px);\n  -moz-filter: blur("
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.background_image_blur)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "px);\n  -o-filter: blur("
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.background_image_blur)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "px);\n  -ms-filter: blur("
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.background_image_blur)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "px);\n  filter: blur("
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.background_image_blur)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "px);\n}\n\n.answer {\n  background: "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.answer_background_color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";\n  border: 1px solid "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.answer_border_color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";\n}\n\n.answer:hover,\n.answer:focus {\n  background: "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.answer_background_color_active)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";\n  border: 1px solid "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.answer_border_color_active)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";\n  box-shadow: 0 0 10px "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.answer_border_color_active)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";\n}\n\nul.pagination li a {\n  color: "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.text_color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";\n  text-decoration: none;\n}\n\nul.pagination li:hover a {\n  color: "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.button_text_color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";\n  background-color: "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.button_background_color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n}\n\n.progress {\n  background: "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.answer_background_color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";\n}\n\n.progress .meter {\n  background-color: "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.state)),stack1 == null || stack1 === false ? stack1 : stack1.options)),stack1 == null || stack1 === false ? stack1 : stack1.button_background_color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n}\n\n</style>\n";
  return buffer;
  };
Hull.templates._default["quiz/thanks"]=function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  stack1 = self.invokePartial(partials['quiz/header'], 'quiz/header', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<div class=\"row experience experience-thanks\">\n  <div class=\"large-12\">\n    <h1>"
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},data:data},helper ? helper.call(depth0, "thanks_title", options) : helperMissing.call(depth0, "t", "thanks_title", options)))
    + "</h1>\n    <p>"
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},data:data},helper ? helper.call(depth0, "thanks_descriptions", options) : helperMissing.call(depth0, "t", "thanks_descriptions", options)))
    + "</p>\n  </div>\n</div>\n\n";
  stack1 = self.invokePartial(partials['quiz/footer'], 'quiz/footer', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  } ; 

Hull.component({
  templates: [
    'intro',
    'question',
    'result',
    'profile-form',
    'header',
    'footer',
    'styles',
    'thanks',
    'fields/text',
    'fields/date',
    'fields/number',
    'fields/dropdown',
    'fields/paragraph',
    'fields/radio',
    'fields/checkboxes',
    'fields/website',
    'fields/email'
  ],

  refreshEvents: ['model.hull.me.change'],

  require: ['i18n', 'parsley'],

  defaultOptions: {
    sample_questions: false,
    auto_start: false,
    auto_next: false,
    shuffle_answers: true,
    question_timer: 0,
    quiz_timer: 0
  },

  datasources: {
    ship: function() {
      return this.api.model('app');
    }
  },

  events: {
    'submit form[data-action="profile"]': function(e) {
      e.preventDefault();
      var _ = this.sandbox.util._;
      var self = this;
      var formResource = this.profileForm;
      var formData = this.sandbox.dom.getFormData(e.target);
      this.disableForm();
      var ret = this.api.put(formResource.id + "/submit", { data: formData });
      ret.then(function(form) {
        self.ship.resources['profile-form'] = form;
        self.profileForm = form;
        self.renderSection('thanks');
      }, function(err) {
        self.enableForm();
        self.alertMessage(err.message);
      });
    }
  },

  alertMessage: function(msg) {
    var $alert = this.$('.alert-message');
    if (msg) {
      $alert.html(msg);
      $alert.show();
    } else {
      $alert.hide();
    }
  },

  actions: {
    share: function(event, action) {
      event && event.preventDefault();

      var provider = action.data.provider;
      if (provider) {
        Hull.share({
          provider: provider,
          params: { href: document.location.toString() }
        });
      }
    },

    answer: function(event, action) {
      var qRef = action.data.questionRef.toString();
      var aRef = action.data.answerRef.toString();

      this.selectAnswer(qRef, aRef);
    },

    next: function() {
      this.selectNextQuestion();
    },

    previous: function() {
      this.selectPreviousQuestion();
    },

    replay: function(event, action) {
      this.initState();
      this.startQuiz();
    },

    start: function(event, action) {
      if (this.loggedIn()) {
        this.startQuiz();
      } else if (action.data.provider) {
        var self = this;
        this.sandbox.login(action.data.provider).then(function() {
          self.startQuiz.call(self);
        });
      }
    }
  },

  helpers: {
    formField: function(field) {
      var tpl = "fields/" + field.field_type;
      return this.renderTemplate(tpl, field);
    },

    t: function(key, opts) {
      return I18n.t(key, opts);
    }
  },

  disableForm: function() {
    this.$('form fieldset').attr('disabled', true);
  },

  enableForm: function() {
    this.$('form fieldset').attr('disabled', false);
  },

  initialize: function() {
    this.injectLinkTag('parsley');
    var _ = this.sandbox.util._;
    this.sandbox.on('ship.update', function(ship) {
      this.ship = ship;
      this.initState();
      this.initTimer();
      this.renderSection(this.currentSection);
    }, this);

    this.$el.attr('id', this.cid);
    I18n.fallbacks = true;
    I18n.locale = this.options.locale || navigator.language;
    this.helpers.formField = _.bind(this.helpers.formField, this);
  },

  renderSection: function(section, data) {
    var _ = this.sandbox.util._;
    this.currentSection = section || this.currentSection || this.getTemplate();
    this.render(this.currentSection, data);
  },

  getTemplate: function(tpl) {
    var _ = this.sandbox.util._;

    if (!this.loggedIn()) { return 'intro'; }

    if (this.state.playing) { return 'question'; }

    if (this.state.badge) {
      return tpl;
    } else {
      return 'intro';
    }
  },

  initState: function() {
    var _ = this.sandbox.util._;
    I18n.translations = this.ship.translations;
    this.state = {
      options: this.getOptions(),
      playing: false,
      currentQuestionIndex: 0,
      answers: {}
    };
    this.state.questions = this.getQuestions();
    this.initTimer();
    return this.state;
  },

  initTimer: function() {
    this.state.timer = {
      countdowns: { question: this.getOption('question_timer'), quiz: this.getOption('quiz_timer') },
      timings: {},
      startedAt: new Date()
    };
  },

  getOptions: function() {
    var _ = this.sandbox.util._;
    var shipConfig = this.ship.settings || {};
    return _.extend({}, this.defaultOptions, shipConfig);
  },

  // Rendering

  beforeRender: function(data) {
    this.ship = data.ship;
    this.profileForm = $.extend(true, {}, this.ship.resources['profile-form']);
    shipConfig = this.ship.settings;
    var _ = this.sandbox.util._;
    data.styleNamespace = "#" + this.cid;
    data.quiz = this.quiz = data.ship.resources.quiz;
    if (!this.state) this.initState();
    data.state = this.state;
    data.question = this.getCurrentQuestion();
    var authServices = this.authServices();
    data.authServices = {};
    var loggedIn = this.loggedIn();
    _.map(authServices, function(provider) {
      data.authServices[provider] = {
        linked: loggedIn && loggedIn[provider]
      };
    });
    data.profileFormFields = data.ship.resources['profile-form'].fields_list;

    data.state.options.text_color_alpha = this.alpha(data.state.options.text_color, 0.6);
    data.state.options.background_color_alpha = this.alpha(data.state.options.background_color, 0);
    data.state.options.answer_background_color = this.alpha(data.state.options.text_color, 0.05);
    data.state.options.answer_border_color = this.alpha(data.state.options.text_color, 0.1);
    data.state.options.answer_background_color_active = this.alpha(data.state.options.text_color, 0.1);
    data.state.options.answer_border_color_active = this.alpha(data.state.options.text_color, 0.2);
  },

  afterRender: function() {
    var $form = this.$('form.profile-form');
    if ($form.length) { $form.parsley(); }
  },

  getOption: function (key) {
    return this.state.options[key];
  },

  alpha: function(hex, alpha) {
    var h = hex.replace('#', '');
    h =  h.match(new RegExp('(.{' + h.length / 3 + '})', 'g'));

    for(var i = 0; i < h.length; i++)
    h[i] = parseInt(h[i].length === 1 ? h[i]+h[i] : h[i], 16);

    if (typeof alpha != 'undefined') { h.push(alpha); }

    return 'rgba(' + h.join(',') + ')';
  },

  // Questions

  getQuestions: function() {
    var _ = this.sandbox.util._, self = this;
    var questions = (this.quiz.questions || []).slice(0);
    if (this.getOption('sample_questions') > 0) {
      questions = _.sample(questions, this.getOption('sample_questions'));
    }
    var questionsCount = questions.length
    var questions = _.map(questions, function(q, i) {
      var index = i + 1
      if (self.getOption('shuffle_answers')) {
        q.answers = _.shuffle(q.answers);
      }
      return _.extend(q, { pagination: {
        index: index,
        total: questions.length,
        next: (index < (questionsCount + 1)),
        previous: (index > 1)
      } });
    });
    return questions;
  },

  getQuestion: function(idx) {
    return this.state.questions && this.state.questions[idx];
  },

  getCurrentQuestion: function() {
    return this.getQuestion(this.state.currentQuestionIndex);
  },

  getNextQuestion: function() {
    return this.getQuestion(this.state.currentQuestionIndex + 1);
  },

  getPreviousQuestion: function() {
    return this.getQuestion(this.state.currentQuestionIndex - 1);
  },

  // Quiz Lifecycle

  startQuiz: function() {
    var self = this;
    this.state.currentQuestionIndex = 0;
    this.state.playing = true;
    this.startTicker();
    this.renderSection('question');
    return this;
  },

  finishQuiz: function() {
    var self = this, timer = this.state.timer;
    this.stopTicker();
    var timing = timer.finishedAt - timer.startedAt;
    if (this.quiz && this.quiz.id) {
      this.api(this.quiz.id + "/achieve", 'post', { answers: this.state.answers || [], timing: timing }, function(badge) {
        self.state.playing = false;
        self.state.badge = badge;
        self.renderSection('result');
      });
    }
  },

  // Timers
  startTicker: function() {
    this.ticker = setInterval(this.onTick.bind(this), 1000);
    this.initTimer();
  },

  stopTicker: function() {
    this.state.timer.finishedAt = new Date();
    clearInterval(this.ticker);
  },

  onTick: function() {
    if (this.sandbox.stopped) { return this.stopTicker(); }

    var timer = this.state.timer;

    // Global Timer
    if (this.getOption('quiz_timer')) {
      if (timer.countdowns.quiz > 0) {
        timer.countdowns.quiz -= 1;
        this.onQuizTick(timer.countdowns.quiz, this.getOption('quiz_timer'));
      } else if (timer.countdowns.quiz === 0) {
        this.finishQuiz();
      }
    }

    // Question Timer
    if (this.getOption('question_timer')) {
      if (timer.countdowns.question > 0) {
        timer.countdowns.question -= 1;
        this.onQuestionTick(timer.countdowns.question, this.getOption('question_timer'));
      } else if (timer.countdowns.question === 0) {
        this.selectNextQuestion();
      }
    }
  },

  resetQuestionCountdown: function() {
    var t = this.getOption('question_timer');

    if (t) {
      this.state.timer.countdowns.question = t;
      this.onQuestionTick(t, t);
    }
  },

  onQuestionTick: function(remaining, total) {
    var p = (remaining / total) * 100;
    this.$find('[data-hull-question-ticker]').css({ width: p + '%' });
  },

  onQuizTick: function(remaining, total) {
    var p = (remaining / total) * 100;
    this.$find('[data-hull-quiz-ticker]').css({ width: p + '%' });
  },

  // Navigation

  selectNextQuestion: function() {
    var q = this.getNextQuestion();
    if (q) {
      this.state.currentQuestionIndex += 1;
      this.resetQuestionCountdown();
      this.renderSection('question');
    } else {
      this.state.playing = false;
      this.finishQuiz();
    }
  },

  selectPreviousQuestion: function() {
    var q = this.getPreviousQuestion();
    if (q) {
      this.state.currentQuestionIndex -= 1;
      this.resetQuestionCountdown();
      this.renderSection('question');
    }
  },

  selectAnswer: function(qRef, aRef) {
    this.state.answers[qRef] = aRef;

    this.$('.next-step').removeClass('disabled');
    this.selectNextQuestion();
  },

  injectLinkTag: function(file) {
    // Helper to inject styles
    if (this.linkTagInjected || this.options.injectLinkTag === false) { return; }

    var e = document.createElement('link');
    e.href = this.options.baseUrl + '/' + file + '.css';
    e.rel = 'stylesheet';

    document.getElementsByTagName('head')[0].appendChild(e);

    this.linkTagsInjected = true;
  }
});
