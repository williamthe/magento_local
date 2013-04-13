CityUpdater = Class.create();
CityUpdater.prototype = {
    initialize: function (countryEl, regionTextEl, regionSelectEl, cityTextEl, citySelectEl, cities, disableAction, zipEl)
    {
        this.countryEl = $(countryEl);
        this.regionTextEl = $(regionTextEl);
        this.regionSelectEl = $(regionSelectEl);
        this.zipEl = $(zipEl);
		this.cityTextEl = $(cityTextEl);
		this.citySelectEl = $(citySelectEl);
		this.cities = cities;

        this.disableAction = (typeof disableAction=='undefined') ? 'hide' : disableAction;
        this.zipOptions = (typeof zipOptions=='undefined') ? false : zipOptions;

        if (this.citySelectEl.options.length<=1) {
            this.update();
        }

        Event.observe(this.countryEl, 'change', this.update.bind(this));
		Event.observe(this.regionSelectEl, 'change', this.update.bind(this));
		Event.observe(this.citySelectEl, 'change', this._updateField.bind(this));
    },
	
	_updateField: function()
	{
		if(this.citySelectEl.value != null && this.citySelectEl.value != "")
		{
			this.cityTextEl.value = this.citySelectEl.value;
		}
	},

    _checkRegionRequired: function()
    {
        var label, wildCard;
        var elements = [this.regionTextEl, this.regionSelectEl];
        var that = this;
        if (typeof this.config == 'undefined') {
            return;
        }
        var regionRequired = this.config.regions_required.indexOf(this.countryEl.value) >= 0;

        elements.each(function(currentElement) {
            Validation.reset(currentElement);
            label = $$('label[for="' + currentElement.id + '"]')[0];
            if (label) {
                wildCard = label.down('em') || label.down('span.required');
                if (!that.config.show_all_regions) {
                    if (regionRequired) {
                        label.up().show();
                    } else {
                        label.up().hide();
                    }
                }
            }

            if (label && wildCard) {
                if (!regionRequired) {
                    wildCard.hide();
                    if (label.hasClassName('required')) {
                        label.removeClassName('required');
                    }
                } else if (regionRequired) {
                    wildCard.show();
                    if (!label.hasClassName('required')) {
                        label.addClassName('required')
                    }
                }
            }

            if (!regionRequired) {
                if (currentElement.hasClassName('required-entry')) {
                    currentElement.removeClassName('required-entry');
                }
                if ('select' == currentElement.tagName.toLowerCase() &&
                    currentElement.hasClassName('validate-select')) {
                    currentElement.removeClassName('validate-select');
                }
            } else {
                if (!currentElement.hasClassName('required-entry')) {
                    currentElement.addClassName('required-entry');
                }
                if ('select' == currentElement.tagName.toLowerCase() &&
                    !currentElement.hasClassName('validate-select')) {
                    currentElement.addClassName('validate-select');
                }
            }
        });
    },

    update: function()
    {
        if (typeof this.cities[this.countryEl.value] != 'undefined' && typeof this.cities[this.countryEl.value][this.regionSelectEl.value] != 'undefined') {
            var i, option, region, def;

            def = this.citySelectEl.getAttribute('defaultValue');

            if (this.cityTextEl) {
                if (!def) {
                    def = this.cityTextEl.value.toLowerCase();
                }
                this.cityTextEl.value = '';
            }

            this.citySelectEl.options.length = 1;
            for (cityId in this.cities[this.countryEl.value][this.regionSelectEl.value]) {
                city = this.cities[this.countryEl.value][this.regionSelectEl.value][cityId];

                option = document.createElement('OPTION');
                option.value = city.code;
                option.text = city.name.stripTags();
                option.title = city.name;

                if (this.citySelectEl.options.add) {
                    this.citySelectEl.options.add(option);
                } else {
                    this.citySelectEl.appendChild(option);
                }

                if (city.code==def || (city.name && city.name.toLowerCase()==def) ||
                    (city.name && city.code.toLowerCase()==def)
                ) {
                    //this.citySelectEl.value = cityId;
					this.citySelectEl.value = city.code;
					this.cityTextEl.value = city.code;
                }
            }

            if (this.disableAction=='hide') {
                if (this.cityTextEl) {
                    this.cityTextEl.style.display = 'none';
                }

                this.citySelectEl.style.display = '';
            } else if (this.disableAction=='disable') {
                if (this.cityTextEl) {
                    this.cityTextEl.disabled = true;
                }
                this.citySelectEl.disabled = false;
            }
            this.setMarkDisplay(this.citySelectEl, true);
        } else {
            if (this.disableAction=='hide') {
                if (this.cityTextEl) {
                    this.cityTextEl.style.display = '';
                }
                this.citySelectEl.style.display = 'none';
                Validation.reset(this.citySelectEl);
            } else if (this.disableAction=='disable') {
                if (this.cityTextEl) {
                    this.cityTextEl.disabled = false;
                }
                this.citySelectEl.disabled = true;
            } else if (this.disableAction=='nullify') {
                this.citySelectEl.options.length = 1;
                this.citySelectEl.value = '';
                this.citySelectEl.selectedIndex = 0;
                this.lastCountryId = '';
            }
            this.setMarkDisplay(this.citySelectEl, false);
        }

        //this._checkRegionRequired();
        // Make Zip and its label required/optional
        //var zipUpdater = new ZipUpdater(this.countryEl.value, this.zipEl);
        //zipUpdater.update();
    },

    setMarkDisplay: function(elem, display){
        elem = $(elem);
        var labelElement = elem.up(0).down('label > span.required') ||
                           elem.up(1).down('label > span.required') ||
                           elem.up(0).down('label.required > em') ||
                           elem.up(1).down('label.required > em');
        if(labelElement) {
            inputElement = labelElement.up().next('input');
            if (display) {
                labelElement.show();
                if (inputElement) {
                    inputElement.addClassName('required-entry');
                }
            } else {
                labelElement.hide();
                if (inputElement) {
                    inputElement.removeClassName('required-entry');
                }
            }
        }
    }
}