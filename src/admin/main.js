Hull.component({
  templates: ['main'],
  require: ['jsoneditor'],

  datasources: {
    schema: function() {
      return this.schema || $.getJSON("./schema.json");
    },
    ship: function() {
      return this.ship || $.getJSON('./ship.json');
    },
  },

  actions: {
    displaySection: function(event, action) {
      this.$('[role="tablist"] li').removeClass('active');
      this.editSection(action.data.section);
    }
  },

  createEditor: function(schema, startval, el) {
    return new JSONEditor(el || document.createElement('div'), {
      ajax: true,
      schema: schema || {},
      startval: startval || {},
      theme: this.options.theme || 'hullstrap',
      iconlib: this.options.iconlib || 'hullstrap',
      no_additional_properties: true,
      disable_edit_json: true,
      disable_properties: true
    });
  },

  editSection: function(sectionName) {
    var section = this.sections[sectionName];
    console.warn("Editing section:", sectionName, section);
    if (section) {
      var _ = this.sandbox.util._;
      this.editor && this.editor.destroy();
      this.editor = this.createEditor(section.schema, this.ship[sectionName], this.$editorElement[0]);
      this.$("[data-hull-section='" + sectionName + "']").parent().addClass('active');
      var onChange = _.debounce(_.bind(this.onChange, this, sectionName), 50);
      this.editor.on('change', onChange);
      return this.editor;
    }
  },

  onChange: function(sectionName) {
    var errors = this.editor.validate();
    if (errors.length == 0) {
      this.ship[sectionName] = this.editor.getValue();
      this.sandbox.emit('ship.update', this.ship);
    } else {
      console.error('Validation Errors', errors);
    }
  },

  beforeRender: function(data) {
    var _ = this.sandbox.util._;
    var editor = this.rootEditor = this.createEditor(data.schema);
    this.ship = data.ship;
    this.sections = data.sections = {};
    _.map(data.schema.properties, function(prop, sectionName) {
      data.sections[sectionName] = {
        schema: _.extend({}, {
          definitions: data.schema.definitions
        }, editor.expandRefs(prop))
      }
    });
  },

  afterRender: function(data) {
    var _ = this.sandbox.util._;
    this.$editorElement = this.$('[data-editor]');
    var firstSection = _.keys(this.sections)[0];
    this.editSection(firstSection);
  }
});
