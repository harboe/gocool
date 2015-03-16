var ParameterViewModel = function(data) {

	if (data.id) {
		data = $.extend({}, sharepoint.data(data.id), data);
		sharepoint.registerValue(data.id, this);
	}

	this.id = ko.observable(data.id);
	this.name = ko.observable(data.name || data.id);
	this.desc = ko.observable(data.desc || this.name());
	this.type = ko.observable(data.type || 'text');
	this.help = ko.observable(data.help || '');
	this.value = ko.observable(data.value);
	this.validation = ko.observable('');
	this.aux = data.aux;

	console.log(ko.toJS(this));

	if (!templates[this.type()]) {
		this.type('text');
	}

	this.hasHelp = ko.computed(function() {
		return this.help().length > 0;
	}, this);

	console.log(ko.toJS(this));
};

var GroupViewModel = function(data) {
	this.id = ko.observable(data.id || data.name);
	this.name = ko.observable(data.name);
	this.type = ko.observable(data.type || 'group');
	this.params = ko.observableArray().map(data.params, ParameterViewModel);
	this.groups = ko.observableArray().map(data.groups, GroupViewModel);
	
	this.paramType = function(viewModel, e) {
		return ko.unwrap(viewModel.type);
	};
	this.groupType = function(viewModel) {
		return ko.unwrap(viewModel.type);
	};
};

$().ready(function() {
	var b = $('body'), 
	f = $('.ms-formtable'),
	viewModel = new GroupViewModel(coolioLayout);
	coolio = '<div id="coolio" class="container-fluid" data-bind="template: { name: type, data: $data }"></div>';

	for (var t in templates) {
		b.append('<template id="' + t + '">' + templates[t] + '</template>');
	}

	if (f.length === 0) {
		b.append(coolio);
	} else {
		$('#DeltaPlaceHolderMain').prepend(coolio);
	}
	
	console.log('coolio says elo!');
	ko.applyBindings(viewModel, doc.getElementById('coolio'));
});

console.log('testing...');