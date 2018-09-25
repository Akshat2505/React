/*
 *
 * cover details
 * JavaScripts
 *
 */

// initialise jquery ui datepicker and button state changes
window.aa.salesJourneyApp.modules.coverDetails = new (function () {

    function initCoverDetails() {

        var _self = window.aa.salesJourneyApp,
            model = _self.models.CoverageDetailsBlock,
            vrnLightBoxModel = _self.models.CaptureVrnLightbox,
            $coverDetailsModule = $('.cover-details-module'),
            $vrnLookup = $coverDetailsModule.find('.vrn-search'),
            $vrnField = $coverDetailsModule.find('.vehicle-reg'),
            $formField = _self.cache.$main.find('.form-field'),
            $infoContainer = $coverDetailsModule.find('.info'),
            $infoMessageContainer = $infoContainer.find('.info-message-container'),
            $infoMessage = $infoContainer.find('.info-message'),
            $infoMessageCovers = $infoContainer.find('.info-message.covers'),
            $infoMessagePgc = $infoContainer.find('.info-message.pgc-cover'),
            $modalAppScreen = _self.cache.$modalScreen,
            $modalContentPlaceholder = $modalAppScreen.find('#modal-app-placeholder'),
            modelData = model.Data,
            todayStartDate = modelData.TodayDateDefaultSelection,
            tomorrowStartDate = modelData.TomorrowDateDefaultSelection,
            theDayAfterTomorrowStartDate = modelData.TheDayAfterTomorrowDefaultSelection,
            alternateDate,
            alternateDateFormatted,
            monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            vehicles = [],
            timer;

        _self.cache.$blocks.find('.full-submit').removeclassName('disabled').prop('disabled', false);

        _self.helpers.focusFormElement($formField.closest('li'), 'click');

        // render vrn error messages from lightbox model
        function renderVrnErrorMessage(model, $errorField) {

            if (_self.helpers.isDefined(model)) {
                $errorField.html(model);
            }
        }

        // reset vehicle registration input validation state on load
        function resetVrnValidation() {
            $formField.removeclassName('error');
            $formField.find('.err-msgs div, .err-msgs p').hide();
        }

        // initialise and position datepicker
        function datePicker($thisDatepicker) {

            var $otherDateContainer = $thisDatepicker.closest('li').find('.other'),
                $datePickerInput = $otherDateContainer.find('#datepicker'),
                date,
                day,
                year,
                currentMonth;

            $thisDatepicker.datepicker({
                altField: '#alternate',
                altFormat: 'd M',
                minDate: 0,
                maxDate: 60,
                showAnim: false,
                dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                showOtherMonths: true,
                beforeShow: function () {

                    var $datePickerDiv = $('#ui-datepicker-div');

                    function focusDatePickerTable() {
                        $datePickerDiv.find('table').attr('aria-role', 'grid').attr('tabIndex', '0').focus();
                    }

                    function hideDatePicker() {
                        window.aa.helpers.cache.cachedElements.$body.removeclassName('datepicker-active');
                        $datePickerDiv.removeclassName('focused').attr('aria-hidden', 'true').attr('aria-expanded', 'false').hide().add($datePickerDiv.find('table')).blur();
                    }

                    window.aa.helpers.cache.cachedElements.$body.addclassName('datepicker-active');
                    $datePickerDiv.attr('aria-hidden', 'false').attr('aria-expanded', 'true').addclassName('focused');

                    // allow time for table to be dynamically added
                    setTimeout(focusDatePickerTable, 100);

                    // allow key events within the calendar
                    $datePickerDiv.on('keydown', 'td', function (e) {
                        // enter, esc
                        switch (e.which) {
                            case 13:
                                $(this).find('a').trigger('click');
                                break;
                            case 27:
                                hideDatePicker();
                        }
                    });

                    $datePickerDiv.on('keydown', function (e) {
                        // arrow left, arrow right, esc
                        switch (e.which) {
                            case 37:
                                e.preventDefault();

                                $datePickerDiv.find('.ui-datepicker-prev').trigger('click');
                                focusDatePickerTable();
                                break;
                            case 39:
                                e.preventDefault();

                                $datePickerDiv.find('.ui-datepicker-next').trigger('click');
                                focusDatePickerTable();
                                break;
                            case 27:
                                hideDatePicker();
                        }
                    });
                },
                onSelect: function () {

                    var thisDate = $(this).val();

                    date = new Date(thisDate);
                    day = date.getDate();
                    year = date.getFullYear();
                    currentMonth = date.getMonth() + 1;
                    alternateDateFormatted = year + '-' + currentMonth + '-' + day + 'T00:00:00+00:00',
                        alternateDate = year + '/' + currentMonth + '/' + day;

                    $otherDateContainer.find('.cover-date').children('.stylish-text').addclassName('active');
                    $otherDateContainer.find('#other-date').val(alternateDate);
                    $datePickerInput.attr('data-id', alternateDateFormatted);
                    $thisDatepicker.add($datePickerInput).val(alternateDateFormatted);
                    $datePickerInput.change();
                    $('#ui-datepicker-div').find('table').blur();
                },
                onClose: function () {
                    window.aa.helpers.cache.cachedElements.$body.removeclassName('datepicker-active');
                }
            });

            // move datepicker markup
            $('#ui-datepicker-div').attr('aria-hidden', 'true').attr('aria-expanded', 'false').attr('tabIndex', '-1').appendTo('.assistance-date');
            $('#alternate').attr('tabIndex', '-1'); // remove readOnly input from flow

        }

        function formatDate() {

            var $dateContainer = $(this),
                $dateLabel = $dateContainer.find('.cover-date'),
                date = new Date(),
                day = date.getDate(),
                tomorrowDate = new Date(new Date().getTime() + (1 * 24 * 60 * 60 * 1000)),
                tomorrow = tomorrowDate.getDate();

            if ($dateContainer.hasclassName('today')) {
                $dateLabel.html(day + ' ' + monthNames[date.getMonth()]);

            } else {
                $dateLabel.html(tomorrow + ' ' + monthNames[tomorrowDate.getMonth()]);
            }
        }

        function formatDayAfterTommorow() {

            var $otherDateLabel = $coverDetailsModule.find('.start-date.other .stylish-text'),
                $datePicker = $coverDetailsModule.find('#datepicker'),
                dayAfterTomorrow = new Date(new Date().getTime() + (2 * 24 * 60 * 60 * 1000)),
                day = dayAfterTomorrow.getDate(),
                monthValue = dayAfterTomorrow.getMonth() + 1,
                year = dayAfterTomorrow.getFullYear(),
                formattedDate = year + '-' + monthValue + '-' + day + 'T00:00:00+00:00';

            $otherDateLabel.addclassName('active');
            $otherDateLabel.find('#alternate').val(day + ' ' + monthNames[dayAfterTomorrow.getMonth()]);
            $coverDetailsModule.find('#other-date').add($datePicker).val(formattedDate);
            $datePicker.attr('data-id', formattedDate);
        }

        // get array of options and display dynamic messages based on cover start date/options selection
        function getCoverOptions() {

            var $setCoverStartDate = $coverDetailsModule.find('.cover-button'),
                $vrnNumbersList = $coverDetailsModule.find('.vrn-numbers-list'),
                viewModelData = _self.helpers.isDefined(_self.models.PricingSummaryBlock.PricingSummary) ? _self.models.PricingSummaryBlock.PricingSummary : '',
                options = _self.helpers.isDefined(_self.models.PricingSummaryBlock.PricingSummary) ? viewModelData.CoverageOptions : [],
                vehicleCoverOption = _self.cache.$main.find('.help-me-choose').length ? _self.cache.$blocks.find('.cover-type-playback').data('default-cover') : _self.cache.$main.find('.cover-type-options').data('default-cover'),
                coverageOptions = options.slice(0),
                twoDaysCoverMessage = $infoContainer.data('two-days'),
                anyTimeCoverMessage = $infoContainer.data('any-time'),
                savedVehicles = viewModelData.Vehicles,
                lightboxViewModel = _self.models.CaptureVrnLightbox,
                vrnDetailsView = _self.views.VrnDetails,
                partsAndGarageCode = _self.cache.$blocks.find('.vrn-capture .option').data('id'),
                vrnDetails = [],
                vehicleCoverIsSet = false,
                partAndGarageIsSet = false;

            for (var i = 0; i < options.length; i += 1) {

                switch (options[i]) {
                    case vehicleCoverOption:
                        vehicleCoverIsSet = true;
                        break;
                    case partsAndGarageCode:
                        partAndGarageIsSet = true;
                        break;
                }
            }

            // if cover options selected display message variations
            if (_self.helpers.isDefined(viewModelData)) {

                var $coversMessage = $coverDetailsModule.find('.info-message.covers'),
                    message;

                // remove cover type option from array
                coverageOptions.shift();

                //playback vrn if brc cover is set
                function playBackVrnNumbers() {

                    var $vrnPlaybackTitle = $vrnNumbersList.find('.playback-title'),
                        $vrnPlaybackInfo = $vrnNumbersList.find('.vrn-info-message'),
                        $playbackTitle = $vrnNumbersList.find('.playback-title'),
                        $vrnInfo = $vrnNumbersList.find('.vrn-info-message'),
                        singleCaptureLabel = $playbackTitle.data('single-capture-label'),
                        multipleCaptureLabel = $playbackTitle.data('multiple-capture-label'),
                        singleCaptureVrnEligibilityText = $vrnInfo.data('single-capture-eligibility-text'),
                        multipleCaptureVrnEligibilityText = $vrnInfo.data('multiple-capture-eligibility-text');

                    for (var i = 0; i < savedVehicles.length; i += 1) {
                        vrnDetails.push('<span>' + _self.helpers.ifVehicleSpec('', savedVehicles[i].Vrn) + _self.helpers.ifVehicleSpec(' - ', savedVehicles[i].Make) + _self.helpers.ifVehicleSpec(' ', savedVehicles[i].Model) + '</span>');
                    }

                    $vrnNumbersList.find('.vrn-detail').each(function (index) {

                        var $element = $(this);

                        $element.html(vrnDetails[index]);

                        if ($element.find('span').length) {
                            $element.parent().addclassName('show-vrn');

                        } else {
                            $element.closest('li').remove();
                        }
                    });

                    if (savedVehicles.length === 1) {
                        $vrnPlaybackTitle.html(singleCaptureLabel);
                        $vrnPlaybackInfo.html(singleCaptureVrnEligibilityText);

                    } else if (savedVehicles.length > 1) {
                        $vrnPlaybackTitle.html(multipleCaptureLabel);
                        $vrnPlaybackInfo.html(multipleCaptureVrnEligibilityText);
                    }
                }

                // set cover start date
                function setCoverStartDate($selector, startDateBoolean) {

                    var checkedSelect = $selector.filter(':checked');

                    if (startDateBoolean) {
                        checkedSelect.trigger('change').closest('label').addclassName('active-border');
                    }
                }

                if (partAndGarageIsSet && savedVehicles.length && _self.helpers.isDefined(lightboxViewModel)) {
                    _self.helpers.renderDynamicMarkup(lightboxViewModel, vrnDetailsView, $vrnNumbersList);
                    // playback entered vrn
                    playBackVrnNumbers();
                    $vrnNumbersList.show();

                } else {
                    $vrnNumbersList.empty();
                }

                $setCoverStartDate.on('change', function () {

                    var $dateCheckbox = $(this),
                        $datePickerContainer = $dateCheckbox.closest('li'),
                        $datePicker = $datePickerContainer.find('.datepicker'),
                        $option,
                        toDateString = Date.parse($datePickerContainer.find('#other-date').val());

                    message = [];
                    alternateDate = new Date(toDateString);

                    function countOptions() {

                        var $optionsContainer = $(this),
                            pgcOption = $optionsContainer.find('#' + partsAndGarageCode + '-0');

                        pgcOption.remove();
                        $option = $optionsContainer.find('.cover-option');

                        if ($option.length > 2) {
                            $option.not(':last-child').append(', ');
                        }

                        if ($option.length > 1) {
                            $option.last().prepend(' and ');

                        } else if ($option.length === 0) {
                            $infoMessageCovers.hide();
                        }
                    }

                    function rendermessage(covermessage) {

                        var products = [];

                        if (_self.helpers.isDefined(coverageOptions)) {

                            $.each(coverageOptions, function (key, value) {
                                if (value !== partsAndGarageCode) {
                                    products.push('<span id="' + value.replace(/\s+/g, '') + '-0" className="cover-option">' + value + '</span>');
                                }
                            });

                            $coversMessage.empty();

                            message.push(covermessage.replace('{cover-options}', products.join('')));

                            if ($.inArray(partsAndGarageCode, coverageOptions) !== -1 && coverageOptions.length > 1) {
                                $coversMessage.append(message);
                                $infoContainer.add($infoMessagePgc).show();

                            } else if ($.inArray(partsAndGarageCode, coverageOptions) !== -1 && coverageOptions.length === 1) {
                                $infoContainer.add($infoMessagePgc).show();

                            } else {
                                $coversMessage.append(message);
                                $infoContainer.show();
                                $infoMessagePgc.hide();
                            }

                            $infoMessageContainer.each(countOptions);
                        }
                    }

                    if (_self.helpers.isDefined(coverageOptions) && coverageOptions.length >= 1 && $dateCheckbox.is(':checked') && !$datePicker.length) {
                        rendermessage(twoDaysCoverMessage);
                    } else if (_self.helpers.isDefined(alternateDate) && $datePicker.length) {
                        rendermessage(anyTimeCoverMessage);
                    }

                    if (!coverageOptions.length) {
                        $coversMessage.closest('.info').hide();
                    }
                });

                setCoverStartDate($setCoverStartDate, todayStartDate);
                setCoverStartDate($setCoverStartDate, tomorrowStartDate);
                setCoverStartDate($setCoverStartDate, theDayAfterTomorrowStartDate);

            } else {
                $infoContainer.add($infoMessage).hide();
            }
        }

        // find your vehicle
        function findVehicle() {

            var $thisVehicleFinder = $(this),
                $mandatoryFieldErrorMessage = $coverDetailsModule.find('[data-mandatory]'),
                $vrnSubmit = $thisVehicleFinder.find('.find-your-vehicle'),
                $vehicleData = $coverDetailsModule.find('.vehicles-data'),
                regNumber,
                oneVehicle = 1;

            renderVrnErrorMessage(vrnLightBoxModel.VrnFormatIsInvalidMessage, $coverDetailsModule.find('[data-validation="minLength"]'));
            renderVrnErrorMessage(model.VrnIsInvalidError, $coverDetailsModule.find('[data-validation="regex"]'));
            renderVrnErrorMessage(vrnLightBoxModel.VrnIsMandatoryErrorMessage, $mandatoryFieldErrorMessage);
            renderVrnErrorMessage(vrnLightBoxModel.VrnLookupServiceErrorMessage, $vrnField.find('.vrn-connect'));

            // show items as inline-blocks
            function show($selector) {
                $selector.addclassName('inline-block');
            }

            // enable submit button
            function enableSubmitBtn() {
                $vrnLookup.find('.find-your-vehicle').removeclassName('disabled processing').prop('disabled', false);
            }

            function vehicleFound(data, eligibilityStatus) {

                var $yourVehicles = $vrnLookup.find('.your-vehicles'),
                    $registrationNumberInput = $vrnLookup.find('#vehicle-reg'),
                    $vrnDetails = $vrnLookup.find('.vrn-details'),
                    regNumberHtml = [],
                    vehicleData,
                    yearOfRegistration = data.ViewModelData.RegistrationYear,
                    registrationDate = data.ViewModelData.RegistrationDate,
                    make = data.ViewModelData.Make,
                    model = data.ViewModelData.Model,
                    fuel = data.ViewModelData.FuelType,
                    vrn = data.ViewModelData.Vrn.toUpperCase();

                // get vehicle details
                function getVehicleDataField(vehicleProperty, fieldType, value) {
                    return '<input className="vehicle-field" type="' + fieldType + '" readOnly name="' + vehicleProperty + '" value="' + value + '" />';
                }

                // render vehicle details fields
                function renderVrnDetailsToBeSent() {

                    vehicleData = [];

                    // add vehicle data information to send
                    vehicleData.push(getVehicleDataField('RegistrationDate', 'hidden', registrationDate));
                    vehicleData.push(getVehicleDataField('Make', 'hidden', make));
                    vehicleData.push(getVehicleDataField('Model', 'hidden', model));
                    vehicleData.push(getVehicleDataField('FuelType', 'hidden', fuel));
                    vehicleData.push(getVehicleDataField('Vrn', 'hidden', vrn));
                    vehicleData.push(getVehicleDataField('YearOfRegistration', 'hidden', yearOfRegistration));
                    vehicleData.push(getVehicleDataField('EligibilityStatus', 'hidden', eligibilityStatus));

                    // render vehicle data markup
                    $vehicleData.append('<div className="vehicle">' + vehicleData.join('') + '</div>');
                };

                $yourVehicles.show();
                $vrnDetails.hide().removeclassName('inline-block');
                regNumberHtml.push('<td>Your Vehicle</td><td><h5>' + _self.helpers.ifVehicleSpec('', vrn) + _self.helpers.ifVehicleSpec(' - ', make) + ' ' + _self.helpers.ifVehicleSpec(' ', model) + '</h5><button className="edit button">Edit</button></td>');
                renderVrnDetailsToBeSent();
                $yourVehicles.find('td').remove();
                $yourVehicles.find('table').append(regNumberHtml);
                $registrationNumberInput.focus().change();
            }

            function vrnCheck(data) {

                var viewModel = data.ViewModelData,
                    eligibilityStatus = viewModel.EligibilityStatus;

                if (_self.helpers.isDefined(viewModel)) {

                    switch (eligibilityStatus) {
                        case 0:
                            vehicleFound(data, eligibilityStatus);
                            initVrnModalEvents(viewModel);
                            break;
                        case 1:
                            vehicleFound(data, eligibilityStatus);
                            break;
                        default:
                            initVrnModalEvents(viewModel, eligibilityStatus);
                    }
                }
            }

            // find vehicle details based on vrn
            function retrieveVehicleDetail() {

                var $registrationNumberInput = $vrnLookup.find('#vehicle-reg'),
                    $vrnMissing = $vrnLookup.find('.vrn-missing'),
                    $vrnConnect = $vrnLookup.find('.vrn-connect');

                $vrnSubmit = $vrnLookup.find('.find-your-vehicle');
                regNumber = $registrationNumberInput.val().toUpperCase();

                $vrnMissing.add($vrnConnect).hide().removeclassName('error-message inline-block');

                $vrnSubmit.prop('disabled', true).addclassName('disabled processing');

                // set to true in order to prevent redirect to next step when ajaxStop is called
                _self.cache.coverOptionsChanged = true;

                if (regNumber.length >= 2 && regNumber.length <= 10 && oneVehicle === 1 && $registrationNumberInput.val() !== '') {

                    $.ajax({
                        url: '/cms/ajax/api/SalesJourney/FindVehicle?vehicleNumber=' + regNumber,
                        method: 'POST',
                        success: function (data) {
                            if (_self.helpers.isDefined(data.ViewModelData)) {
                                $vrnSubmit.hide().removeclassName('inline-block');
                                vrnCheck(data);
                                enableSubmitBtn();
                                $vrnLookup.removeclassName('errors');

                            } else {
                                $vrnSubmit.prop('disabled', false).removeclassName('disabled processing');
                            }
                        },
                        error: function () {
                            show($vrnConnect);
                            $vrnConnect.addclassName('error-message');
                            $vrnSubmit.show().removeclassName('disabled processing');
                        }
                    });

                } else {
                    $vrnMissing.hide().removeclassName('inline-block');
                }
            }

            function initVrnModalEvents(vrnModelData) {

                var $vehicles,
                    modalFields;

                function getModalFields() {

                    var $modalDetailsContainer = $modalContentPlaceholder.find('.additional-details'),
                        $registrationNumberInput = $vrnLookup.find('#vehicle-reg'),
                        $vrnModal = $modalContentPlaceholder.find('#vrn-modal'),
                        $closeVrnModal = $vrnModal.closest('.modal-window').find('button.modal-close'),
                        $mainVrnField = $vrnModal.find('.vehicle-reg.main'),
                        $mainVrnSubmit = $vrnModal.find('.find-your-vehicle'),
                        $optionalField = $vrnModal.find('.vehicle-reg.optional'),
                        $mainCoverTitle = $mainVrnField.prev('.main-form-section-title'),
                        $vehicleDetailedSearch = $vrnModal.find('.vrn-detailed-search'),
                        $vehicleRegistrationField = $vrnModal.find('.vehicle-reg'),
                        $searchedVrn = $vehicleDetailedSearch.find('.vehicle-number'),
                        $modalVrnForm = $vrnModal.find('.vrn-search'),
                        $modalVrnDetails = $vrnModal.find('.vrn-details'),
                        $modalRegistrationYear = $vrnModal.find('.registration-year'),
                        $selectMakeGroup = $vrnModal.find('.select-make-group'),
                        $selectMake = $selectMakeGroup.find('.make-select'),
                        $selectModelGroup = $vrnModal.find('.select-model-group'),
                        $selectModel = $vrnModal.find('.model-select'),
                        $selectModelDropdown = $selectModelGroup.find('.stylish-select'),
                        $resetVrnLookup = $vrnModal.find('.reset-vrn-search'),
                        $editVrnLookup = $vrnModal.find('button.edit'),
                        $modalContinue = $vrnModal.find('.continue'),
                        $agreeButton = $vrnModal.find('.button.agree'),
                        searchedVrn = $registrationNumberInput.val();

                    return {
                        ModalDetailsContainer: $modalDetailsContainer,
                        VrnModal: $vrnModal,
                        CloseVrnModal: $closeVrnModal,
                        MainVrnSubmit: $mainVrnSubmit,
                        MainVrnField: $mainVrnField,
                        OptionalField: $optionalField,
                        OptionalVrn: $optionalField.find('.registration'),
                        VrnContinue: $modalDetailsContainer.find('.button.continue'),
                        VrnAgree: $modalDetailsContainer.find('.button.agree'),
                        MainAltlabel: $mainVrnField.find('.vrn-details label'),
                        FindVehiclesLabel: $mainVrnSubmit.data('alt-label'),
                        MainVrnSecondaryLabelText: $mainVrnField.data('secondary-label'),
                        VehiclesForm: $vrnModal.find('.vehicles-data'),
                        VehicleRegistrationField: $vehicleRegistrationField,
                        VehicleDetailedSearch: $vehicleDetailedSearch,
                        ModalVrnForm: $modalVrnForm,
                        ModalVrnDetails: $modalVrnDetails,
                        ModalRegistrationYear: $modalRegistrationYear,
                        MainCoverTitle: $mainCoverTitle,
                        SelectMakeGroup: $selectMakeGroup,
                        SelectMake: $selectMake,
                        SelectModelGroup: $selectModelGroup,
                        SelectModelDropdown: $selectModelDropdown,
                        SelectModel: $selectModel,
                        ResetVrnLookup: $resetVrnLookup,
                        EditVrnLookup: $editVrnLookup,
                        ModalContinue: $modalContinue,
                        AgreeButton: $agreeButton,
                        SearchedVrn: $searchedVrn,
                        SearchedVrnValue: searchedVrn
                    }
                }

                function loadModalContent(callback, view) {

                    var viewModel = _self.models.CaptureVrnLightbox,
                        html = Mustache.render(view, viewModel);

                    $modalContentPlaceholder.html(html); // render modal content
                    _self.helpers.openModal(); // init modal events
                    _self.application.loadModuleScripts(callback); // load additional-details script
                    _self.application.initValidation(); // init validation
                    stylishForms.update(); // update stylishForms
                    $modalContentPlaceholder.find('.vrn-detailed-search').data('eligibility-status', vrnModelData.EligibilityStatus);

                    switch (vrnModelData.EligibilityStatus) {
                        case 0:
                            initDimensionsUnknownModalEvents();
                            break;

                        case 2:
                            initNotEligibleModalEvents();
                            break;

                        case 3:
                            initNotFoundVrnEvents();
                            break;
                    }
                }

                function resetModal() {
                    _self.helpers.destroyModal();
                    $vrnLookup.find('#vehicle-reg').focus();
                    $vrnSubmit.show();
                }

                function renderNotFoundVrn() {

                    var modalFields = getModalFields();

                    modalFields.VehicleRegistrationField.addclassName('active');
                    modalFields.SearchedVrn.find('table h5').html(modalFields.SearchedVrnValue);
                }

                function renderVrnDetails() {

                    var modalFields = getModalFields();

                    modalFields.VehicleRegistrationField.addclassName('active');

                    if (_self.helpers.isDefined(vrnModelData)) {
                        modalFields.SearchedVrn.find('table h5').html(_self.helpers.ifVehicleSpec('', vrnModelData.Vrn) + _self.helpers.ifVehicleSpec(' - ', vrnModelData.Make) + _self.helpers.ifVehicleSpec(' ', vrnModelData.Model));
                    }
                }

                function initDefaultModalEvents() {

                    var modalFields = getModalFields();

                    _self.modules.additionalDetails.initAdditionalDetails();
                    renderVrnDetails();
                    modalFields.VehicleDetailedSearch.show();

                    modalFields.EditVrnLookup.on('click', function (e) {
                        e.preventDefault();
                        resetModal();
                    });
                }

                // init events for not eligible vrn
                function initNotEligibleModalEvents() {

                    var modalFields = getModalFields(),
                        notEligible = true;

                    initDefaultModalEvents();

                    modalFields.CloseVrnModal.on('click', function (e) {
                        e.preventDefault();

                        if (notEligible) {
                            notEligible = false;

                            resetModal();
                        }
                    });

                    window.aa.helpers.cache.cachedElements.$document.on('keyup', function (e) {
                        e.preventDefault();

                        if (e.which === 27 && notEligible) {
                            notEligible = false;

                            resetModal();
                        }
                    });
                }

                // init events for dimensions unknown vrn
                function initDimensionsUnknownModalEvents() {

                    var modalFields = getModalFields(),
                        $title = modalFields.MainCoverTitle,
                        unknownDimensions = true;

                    initDefaultModalEvents();
                    renderVrnDetails();

                    $modalContentPlaceholder.find('.incomplete-details, .continue').show();
                    $title.text($title.data('info-found'));

                    modalFields.ModalContinue.on('click', function (e) {
                        e.preventDefault();
                        _self.helpers.destroyModal();
                        $vrnSubmit.hide();
                    });

                    modalFields.CloseVrnModal.on('click', function (e) {
                        e.preventDefault();

                        if (unknownDimensions) {
                            editVrnDetails();
                            _self.helpers.destroyModal();
                        }

                        unknownDimensions = false;
                    });

                    window.aa.helpers.cache.cachedElements.$document.on('keyup', function (e) {
                        e.preventDefault();

                        if (e.which === 27 && unknownDimensions) {
                            unknownDimensions = false;

                            editVrnDetails();
                            resetModal();
                            $vehicleData.empty();
                        }
                    });

                    modalFields.EditVrnLookup.on('click', function (e) {
                        e.preventDefault();
                        editVrnDetails();
                        _self.helpers.destroyModal();
                    });
                }

                // init events for not found vrn
                function initNotFoundVrnEvents() {

                    var $vrnMissing = $vrnLookup.find('.vrn-missing'),
                        modalFields = getModalFields(),
                        notFoundVrn = true;

                    function checkMakesAndModels() {

                        var viewModel = _self.models.MakesAndModelsList,
                            makesOptions = [],
                            modelsOptions,
                            selectedVehicleModels = [],
                            selectDropdown,
                            selectedVehicleMake,
                            vehicleModel;

                        function renderOptions($selectGroup, $select, array) {

                            selectDropdown = $selectGroup.find('.stylish-select');

                            if (selectDropdown.length) {
                                $selectGroup.find('.dropdown-list').remove();
                                $selectGroup.attr('data-stylish-form', 'true');
                                $selectGroup.find('.selected').remove();
                                $select.unwrap();
                            }

                            $selectGroup.attr('data-stylish-form', 'true');
                            $select.find('option.default').nextAll('option').remove();
                            $select.find('option.default').after(array);
                            stylishForms.update(); // update stylishForms
                            $selectGroup.show();
                        }

                        if (_self.helpers.isDefined(viewModel)) {

                            $.each(viewModel, function (vehicleMake) {
                                makesOptions.push(' <option value="' + vehicleMake + '">' + vehicleMake + '</option>');
                            });

                            modalFields.SelectMakeGroup.hide();
                            renderOptions(modalFields.SelectMakeGroup, modalFields.SelectMake, makesOptions);
                            modalFields.SelectModelGroup.show();
                            modalFields.SelectModel.val('-1').change();
                            modalFields.SelectModelDropdown.addclassName('disabled');
                            //init not found vrn form instant feedback
                            _self.helpers.checkNotFoundVrnFormField();

                            modalFields.SelectMake.on('change', function () {

                                selectedVehicleMake = $(this).val();

                                if (selectedVehicleMake !== '-1') {

                                    modelsOptions = [];
                                    selectedVehicleModels = _self.models.MakesAndModelsList[selectedVehicleMake].map(function (item) { return item.Name; });

                                    $.each(selectedVehicleModels,
                                        function (index) {

                                            vehicleModel = selectedVehicleModels[index];

                                            modelsOptions.push(' <option value="' + vehicleModel + '">' + vehicleModel + '</option>');
                                        });

                                    renderOptions(modalFields.SelectModelGroup, modalFields.SelectModel, modelsOptions);
                                    modalFields.SelectModelDropdown.removeclassName('disabled');

                                } else {
                                    modalFields.SelectMake.closest('.form-section').find('.select-model-group .stylish-select').addclassName('disabled');
                                }
                            });
                        }
                    }

                    renderNotFoundVrn();
                    initDefaultModalEvents();
                    $vrnMissing.add(modalFields.VehicleDetailedSearch).show();
                    modalFields.ModalVrnForm.add(modalFields.VehicleDetailedSearch).addclassName('vrn-not-found');
                    modalFields.ModalVrnDetails.hide().removeclassName('inline-block');
                    show(modalFields.ModalContinue);

                    // populate select dropdown options from endpoint
                    _self.helpers.getMakesAndModels(checkMakesAndModels);

                    modalFields.ModalContinue.on('click', function (e) {

                        e.preventDefault();

                        $vrnMissing.hide().removeclassName('inline-block');
                        addVehicleToBeSent(); // save vehicles details to server

                        if ($modalContentPlaceholder.find('.errors').length) {
                            return;
                        }

                        notFoundVrn = false;

                        resetModal();
                    });

                    modalFields.CloseVrnModal.on('click', function (e) {
                        e.preventDefault();

                        if (notFoundVrn) {
                            notFoundVrn = false;

                            resetModal();
                        }
                    });

                    window.aa.helpers.cache.cachedElements.$document.on('keyup', function (e) {
                        e.preventDefault();

                        if (e.which === 27 && notFoundVrn) {
                            notFoundVrn = false;

                            resetModal();
                        }
                    });
                }

                function sendNotFoundVehicleDetails() {

                    var $form = $(this),
                        eligibilityStatus = $form.data('eligibility-status'),
                        $selectModel = $form.find('.model-select'),
                        $selectMake = $form.find('.make-select'),
                        yearOfRegistration = $form.find('.registration-year').val(),
                        registrationDate = yearOfRegistration + '-' + $form.find('.not-found-vrn-select-month').find('select').val() + '-01T00:00:00',
                        vrn = $form.find('.vrn-playback h5').text().toUpperCase(),
                        model = $selectModel.val(),
                        make = $selectMake.val(),
                        notFoundVehicleData = [],
                        regNumberHtml = [];

                    function renderAdditionalVehicleDetails() {

                        var $yourVehicles = $vrnLookup.find('.your-vehicles');

                        regNumberHtml.push('<td>Your Vehicle</td><td><h5>' + _self.helpers.ifVehicleSpec('', vrn) + _self.helpers.ifVehicleSpec(' - ', make) + _self.helpers.ifVehicleSpec(' ', model) + '</h5><button className="edit button">Edit</button></td>');
                        $yourVehicles.find('td').remove();
                        $yourVehicles.find('table').append(regNumberHtml);
                        $yourVehicles.show();
                        $vrnLookup.find('.vrn-details').add($vrnLookup.find('.find-your-vehicle')).hide().removeclassName('inline-block');
                    }

                    _self.helpers.validateNotFoundVrnForm($form);

                    if (yearOfRegistration.length === 4 && make !== '-1' && $selectModel.val() !== '-1') {

                        // get vehicle details
                        function getVehicleDataField(vehicleProperty, fieldType, value) {
                            return '<input className="vehicle-field" type="' + fieldType + '" readOnly name="' + vehicleProperty + '" value="' + value + '" />';
                        }

                        // add vehicle data information to send
                        notFoundVehicleData.push(getVehicleDataField('RegistrationDate', 'hidden', registrationDate));
                        notFoundVehicleData.push(getVehicleDataField('Make', 'hidden', make));
                        notFoundVehicleData.push(getVehicleDataField('Model', 'hidden', model));
                        notFoundVehicleData.push(getVehicleDataField('Vrn', 'hidden', vrn));
                        notFoundVehicleData.push(getVehicleDataField('YearOfRegistration', 'hidden', yearOfRegistration));
                        notFoundVehicleData.push(getVehicleDataField('EligibilityStatus', 'hidden', eligibilityStatus));
                        // render vehicle data markup
                        $vehicleData.append('<div className="vehicle">' + notFoundVehicleData.join('') + '</div>');
                        renderAdditionalVehicleDetails();
                    }
                }

                // save vehicles
                function addVehicleToBeSent() {

                    var vehiclesData;

                    modalFields = getModalFields();
                    $vehicles = $modalContentPlaceholder.find('.vehicle');

                    modalFields.VrnAgree.add(modalFields.VrnContinue).addclassName('disabled processing').prop('disabled', true);

                    $('.vrn-detailed-search.vrn-not-found').each(sendNotFoundVehicleDetails);

                    if ($modalContentPlaceholder.find('.errors').length) {
                        $modalContentPlaceholder.find('.continue').add($modalContentPlaceholder.find('.agree')).removeclassName('processing disabled').prop('disabled', false);
                        return;
                    }

                    $vehicles.each(function () {

                        var $target = $(this),
                            $vehicleFields = $target.find('input.vehicle-field'),
                            vehicle = {};

                        vehicles = [];
                        vehiclesData = {
                            Vehicles: vehicles
                        }

                        $vehicleFields.each(function () {

                            var $field = $(this);

                            vehicle[$field.attr('name')] = $field.val().toUpperCase();
                        });

                        vehicles.push(vehicle);
                    });

                    _self.helpers.destroyModal();
                }

                switch (vrnModelData.EligibilityStatus) {
                    case 0:
                        loadModalContent(_self.modules.additionalDetails.initAdditionalDetails, _self.views.UnknownDimensionsVrn);
                        break;

                    case 2:
                        loadModalContent(_self.modules.additionalDetails.initAdditionalDetails, _self.views.NotEligibleVrn);
                        break;

                    case 3:
                        loadModalContent(_self.modules.additionalDetails.initAdditionalDetails, _self.views.NotFoundVrnModal);
                        break;
                }

            }

            function editVrnDetails() {

                var $registrationNumberInput = $vrnLookup.find('#vehicle-reg'),
                    $yourVehicles = $vrnLookup.find('.your-vehicles');

                $vrnSubmit = $vrnLookup.find('.find-your-vehicle');

                $vrnSubmit.removeclassName('disabled processing').prop('disabled', false);
                $thisVehicleFinder.find('.vehicle').remove();
                $yourVehicles.hide();
                $vrnLookup.find('.vrn-details').add($vrnSubmit).show();
                $registrationNumberInput.val('').focus();
                $yourVehicles.find('td').remove();
                $registrationNumberInput.focus().change();
            }

            // init input validation
            _self.helpers.initInputMasking(_self.cache.$main.find('input.alphanumerical-only'), _self.constants.regex.alphanumeric);

            // set cover start date for day after tommorrow
            if (theDayAfterTomorrowStartDate === true) {
                formatDayAfterTommorow();
            }

            // reset form validation instant feedback on load
            clearTimeout(timer);

            timer = setTimeout(resetVrnValidation);

            // init vrn search
            $vrnSubmit.on('click', function (e) {

                var $registrationNumberInput = $vrnLookup.find('#vehicle-reg'),
                    vehicleFinderActiveFieldValue = $registrationNumberInput.val();

                e.preventDefault();

                if (vehicleFinderActiveFieldValue.length >= 2 && aa.salesJourneyApp.constants.regex.registrationNumber.test(vehicleFinderActiveFieldValue)) {
                    retrieveVehicleDetail();
                } else if (vehicleFinderActiveFieldValue.length >= 2 && !aa.salesJourneyApp.constants.regex.registrationNumber.test(vehicleFinderActiveFieldValue) && !$vrnField.find('.your-vehicles td').length) {
                    _self.helpers.checkRegistrationNumber($registrationNumberInput);
                } else if (vehicleFinderActiveFieldValue.length < 2 && !$vrnField.find('.your-vehicles td').length) {
                    _self.helpers.checkRegistrationNumber($registrationNumberInput);
                }
            });

            $vrnLookup.find('#vehicle-reg').off('change').on('change', function (e) {

                var $input = $(this);

                e.preventDefault();

                if ($input.closest('.error').length) {
                    _self.helpers.checkRegistrationNumber($input);
                }
            });

            window.aa.helpers.cache.cachedElements.$document.on('keyup', function (e) {
                if (e.which === 13 && $vrnLookup.find('#vehicle-reg').is(e.target)) {
                    $vrnSubmit.trigger('click');
                }
            });

            // pressing the edit button takes users back to the find vehicle step
            $coverDetailsModule.on('click', '.edit', function (e) {
                e.preventDefault();
                editVrnDetails();
            });
        }

        //change borders and clear value for "Other date" on click
        function buttonsState($thisModule) {

            var $coverButton = $thisModule.find('.cover-button');

            $coverButton.on('change', function () {

                var $button = $(this);

                // empty datepicker
                if (!$button.closest('li').find('.datepicker').length) {
                    $thisModule.find('.other').find('.stylish-text').removeclassName('active');
                    $thisModule.find('.alternate').add('#other-date').val('');
                    $thisModule.find('.datepicker').datepicker('setDate', '0');
                    $thisModule.find('#ui-datepicker-div').hide();
                    resetVrnValidation();
                }

                $coverButton.prop('checked', false);
                $button.prop('checked', true);
                $thisModule.find('.start-date').removeclassName('active-border');
                $button.closest('.start-date').toggleclassName('active-border');
                resetVrnValidation();
            });
        }

        // VRN vehicle finder
        $coverDetailsModule.each(findVehicle);
        _self.helpers.initInputMasking('input.alphanumerical-only', _self.constants.regex.alphanumeric);

        _self.helpers.getIndicativePrice(getCoverOptions);

        // datepicker settings
        $('.datepicker').each(function () {
            datePicker($(this));
        });

        $coverDetailsModule.each(function () {
            buttonsState($(this));
        });

        $coverDetailsModule.find('.start-date:not(.other)').each(formatDate);

        _self.application.initValidation(); // init validation
    }

    // entry

    // @using formValidation API

    // public save action method for external invocation
    this.saveAction = function () {

        var _self = window.aa.salesJourneyApp,
            $coverDetailsModule = _self.cache.$blocks.find('.blocks-visible .cover-details-module'),
            formId = $coverDetailsModule.data('id'),
            vehicles = [];

        // save vehicles
        function saveVehicle() {

            var vehiclesData,
                $vehicle = $coverDetailsModule.find('.vehicle');

            $vehicle.each(function () {

                var $target = $(this),
                    $vehicleFields = $target.find('input.vehicle-field'),
                    vehicle = {};

                $vehicleFields.each(function () {

                    var $field = $(this);

                    vehicle[$field.attr('name')] = $field.val();
                });

                vehiclesData = { Vehicles: vehicles }

                vehicles.push(vehicle);
            });

            if ($vehicle.length) {
                _self.helpers.saveBlockData('SaveVehiclesList', _self.models.CaptureVrnLightbox.Id, vehiclesData);
            }
        }

        if ($coverDetailsModule.length) {
            // trigger validation on the form
            formValidation.api[formId].validateForm();

            if ($coverDetailsModule.hasclassName('errors')) {
                $coverDetailsModule.find('.error').eq(0).find('input:first').focus();
                return;
            }

            var dto = serialise.jQueryData($coverDetailsModule, 'transfer-model');

            // save completed changes
            _self.helpers.saveBlockData('SaveCoverDetails', $coverDetailsModule.data('block-id'), dto);
            saveVehicle();
        }
    };

    // public init action method for external invocation
    this.init = function () {

        if ($('.cover-details-module').length) {
            initCoverDetails();
        }
    };

    // init cover details block events
    initCoverDetails();

})();