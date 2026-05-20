// Select payment method start
$(document).ready(function () {
  $('.payment-section').each(function () {
    const section = $(this);

    // Initial setup
    section.find('.on-file-content, .add-new-content, .ach-form, .credit-card-form, .bill-to-client').hide();

    section.find('.pricing-method').on('change', function () {
      const selected = $(this).val();
      section.find('.on-file-content, .add-new-content, .ach-form, .credit-card-form, .bill-to-client').hide();

      if (selected === 'account-default') {
        // No additional section shown
      } else if (selected === 'on-file') {
        section.find('.on-file-content').show();
      } else if (selected === 'add-new') {
        section.find('.add-new-content').show();
        section.find('.ach-option').prop('checked', true);
        section.find('.credit-option').prop('checked', false);
        section.find('.ach-form').show();
      } else if(selected === "bill-to-client"){
        section.find('.bill-to-client').show();
      }
    });

    section.find('.ach-option').on('change', function () {
      if ($(this).is(':checked')) {
        section.find('.credit-option').prop('checked', false);
        section.find('.ach-form').show();
        section.find('.credit-card-form').hide();
      }
    });

    section.find('.credit-option').on('change', function () {
      if ($(this).is(':checked')) {
        section.find('.ach-option').prop('checked', false);
        section.find('.credit-card-form').show();
        section.find('.ach-form').hide();
      }
    });
  });
});




// inviteuser form
document.addEventListener("DOMContentLoaded", function () {
  const originalForm = document.querySelector(".invitefillingstate");
  const filledState = document.querySelector(".invitefilledstate");
  const inviteContainer = document.getElementById("inviteContainer");

  // ADD button (initial)
  document.getElementById("inviteaddBtn").addEventListener("click", function () {
    originalForm.style.display = "none";
    filledState.style.display = "block";
  });

  // MORE ADD button
  document.querySelector(".moreaddinvite").addEventListener("click", function () {
    const newForm = originalForm.cloneNode(true);
    const addBtn = newForm.querySelector("#inviteaddBtn");
    const updateBtn = newForm.querySelector("#inviteupdateBtn");
    const cancelBtn = newForm.querySelector("#inviteCancelBtn");

    // Reset form values
    newForm.querySelector("#groupName").value = "";
    newForm.querySelector("#groupEmail").value = "";

    // Set correct visibility
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    cancelBtn.classList.remove("d-none");

    newForm.style.display = "block";

    // Ensure unique ID per instance (if needed)
    newForm.classList.add("dynamicInvite");

    // Event: Add (from dynamic form)
    addBtn.addEventListener("click", function () {
      newForm.remove();
      filledState.style.display = "block";
    });

    // Event: Cancel
    cancelBtn.addEventListener("click", function () {
      newForm.remove();
    });

    inviteContainer.insertBefore(newForm, inviteContainer.firstChild);
  });

  // EDIT button inside filled state
  filledState.addEventListener("click", function (e) {
    if (e.target.classList.contains("icon-new-edit")) {
      // Show original form in edit mode
      originalForm.style.display = "block";
      filledState.style.display = "none";

      // Switch buttons
      document.getElementById("inviteaddBtn").classList.add("d-none");
      document.getElementById("inviteupdateBtn").classList.remove("d-none");
      document.getElementById("inviteCancelBtn").classList.remove("d-none");
    }
  });

  // CANCEL from original form (edit mode)
  document.getElementById("inviteCancelBtn").addEventListener("click", function () {
    originalForm.style.display = "none";
    filledState.style.display = "block";

    document.getElementById("inviteaddBtn").classList.remove("d-none");
    document.getElementById("inviteupdateBtn").classList.add("d-none");
    document.getElementById("inviteCancelBtn").classList.add("d-none");
  });
});




// alert function start
document.addEventListener("DOMContentLoaded", function () {
  const entityInput = document.querySelector("#entityInput"); // Add an ID to your input field
  const alertBox = document.querySelector(".alert-warning");

  // Hide alert initially
  alertBox.style.display = "none";

  // Show alert when typing
  entityInput.addEventListener("input", function () {
    alertBox.style.display = "flex"; // Show alert
  });
});


// manager individual and corporate function function start
$(document).ready(function () {
  // Initially hide all forms
  $('.toggle-form').css('display', 'none');

  // Show the form that matches the checked radio
  $('.toggle-radio:checked').each(function () {
    var target = $(this).data('target');
    $('#' + target).css('display', 'block');
  });

  // On radio button change
  $('.toggle-radio').on('change', function () {
    var target = $(this).data('target');

    // First, hide all forms related to the same group
    var groupName = $(this).attr('name'); // Get radio group name
    $('input[name="' + groupName + '"]').each(function () {
      var relatedTarget = $(this).data('target');
      $('#' + relatedTarget).css('display', 'none');
    });

    // Then show the selected form
    $('#' + target).css('display', 'block');
  });
});



// enable disable form
function setupToggleForms(radioGroupNames) {
  radioGroupNames.forEach(baseName => {
    // Select all radio buttons starting with the given base name
    document.querySelectorAll(`input[name^="${baseName}"]`).forEach(radio => {
      radio.addEventListener('change', function () {
        // Match the name and optional numeric suffix (e.g., "registeredAgentStatus2")
        const groupMatch = this.name.match(/^([a-zA-Z]+)(\d*)$/);
        const namePart = groupMatch[1]; // e.g., "registeredAgentStatus"
        const suffix = groupMatch[2] || ''; // e.g., "2"

        // Determine form group type
        if (namePart.includes('registeredAgentStatus')) {
          groupSuffix = 'RegisteredAgent';
        } else if (namePart.includes('annualReport')) {
          groupSuffix = 'AnnualReport';
        } else if (namePart.includes('preparationOfFiling')) {
          groupSuffix = 'PreparationOfFiling';
        } else if (namePart.includes('statementFile')) {
          groupSuffix = 'StatementFile';
        }


        // Construct form section IDs with suffix
        const enabledFormId = `enabledForm${groupSuffix}${suffix}`;
        const disabledFormId = `disabledForm${groupSuffix}${suffix}`;
        const isEnabled = this.value === 'enabled';

        // Show/hide appropriate form sections
        const enabledEl = document.getElementById(enabledFormId);
        const disabledEl = document.getElementById(disabledFormId);

        if (enabledEl && disabledEl) {
          enabledEl.style.display = isEnabled ? 'block' : 'none';
          disabledEl.style.display = isEnabled ? 'none' : 'block';
        }
      });
    });
  });
}

// Call the function with all expected radio group base names
setupToggleForms([
  'registeredAgentStatus',
  'annualReport',
  'registeredAgentStatus2',
  'annualReport2',
  'preparationOfFiling',
  'statementFile',
  'statementFile2',
  'preparationOfFiling2',
  'registeredAgentStatus3',
  'registeredAgentStatus4',
  'registeredAgentStatus5',
  'annualReport3',
  'annualReport4',
  'preparationOfFiling3',
  'registeredAgentStatus6',
  'registeredAgentStatus7',
  'registeredAgentStatus8',
  'registeredAgentStatus9',
  'registeredAgentStatus10',
  'registeredAgentStatus12',
  'registeredAgentStatus13',
  'annualReport5',
  'annualReport6',
  'annualReport8',
  'annualReport11',
  'annualReport12',
  'preparationOfFiling4',
  'preparationOfFiling5',
  'preparationOfFiling6'
]);




// toggle between all checkbox start
document.querySelectorAll('.single-check').forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    if (this.checked) {
      document.querySelectorAll('.single-check').forEach(cb => {
        if (cb !== this) cb.checked = false;
      });
    }
  });
});



// upload document start
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.upload-group').forEach(group => {
    const yesRadio = group.querySelector('.yes-checkbox');
    const noRadio = group.querySelector('.no-checkbox');
    const uploadBtn = group.parentElement.querySelector('.upload-btn');

    if (!yesRadio || !noRadio || !uploadBtn) return; // Safety check

    const toggleButton = () => {
      uploadBtn.style.display = yesRadio.checked ? 'block' : 'none';
    };

    // Attach event listeners
    yesRadio.addEventListener('change', toggleButton);
    noRadio.addEventListener('change', toggleButton);

    // Run on page load
    toggleButton();
  });
});




// table pagination remove
$(document).ready(function () {
  $('.usertable').each(function () {
    const $table = $(this);

    // Avoid reinitializing
    if (!$.fn.DataTable.isDataTable(this)) {
      $table.DataTable({
        paging: false,           // ✅ No pagination
        info: false,             // ✅ Hide info text
        searching: false,        // ✅ No search box
        ordering: true,          // ✅ Sorting enabled
        columnDefs: [
          { orderable: false, targets: 0 }  // ❌ First column not sortable
        ]
      });
    }
  });
});



//  radio active and iactive 
$(document).ready(function () {
  function updateAllRadioLabels() {
    $('input[type="radio"]').each(function () {
      var label = $('label[for="' + this.id + '"]');
      if ($(this).is(':checked')) {
        label.removeClass('inactive');
      } else {
        label.addClass('inactive');
      }
    });
  }

  // Call once on page load
  updateAllRadioLabels();

  // Update whenever any radio button changes
  $('input[type="radio"]').on('change', function () {
    updateAllRadioLabels();
  });
});

// datepicker start
function initializeDatePicker(selector) {
  $(selector).daterangepicker({
    singleDatePicker: true,
    autoUpdateInput: false,
    autoApply: true,
    parentEl: $('.calender-input'),
    applyButtonClasses: 'btn-info',
    drops: 'auto',
    minYear: 1901,
    maxYear: parseInt(moment().format('YYYY'), 10)
  });

  $(selector).on('apply.daterangepicker', function (ev, picker) {
    $(this).val(picker.startDate.format('MM/DD/YYYY'));
  });
}

$(function () {
  initializeDatePicker('.modaldatepicker');
});


// Entity type professional corporatio
document.addEventListener('DOMContentLoaded', function () {
  const containers = document.querySelectorAll('.entity-container');

  containers.forEach(function (container) {
    const entityTypeSelect = container.querySelector('.entityType-model');
    const specialtyFieldset = container.querySelector('.professional-specialty');

    entityTypeSelect.addEventListener('change', function () {
      const selectedOptionText = entityTypeSelect.options[entityTypeSelect.selectedIndex].text;
      if (selectedOptionText === 'Profit Corporation - Professional') {
        specialtyFieldset.style.display = 'block';
      } else {
        specialtyFieldset.style.display = 'none';
      }
    });
  });
});


// on file payment methos edit and delete
document.addEventListener("DOMContentLoaded", function () {
  // Handle Edit Click
  document.querySelectorAll(".icon-new-edit").forEach(function (editIcon) {
    editIcon.addEventListener("click", function () {
      const paymentCard = editIcon.closest(".payment-card");
      const methodDiv = paymentCard.querySelector(".methodiv");

      if (methodDiv) {
        const isEditing = methodDiv.getAttribute("contenteditable") === "true";

        if (isEditing) {
          // Save Mode: Turn off editing
          methodDiv.setAttribute("contenteditable", "false");
          methodDiv.classList.remove("editable");

          // Change icon back to edit
          editIcon.classList.remove("icon-save-purple");
          editIcon.classList.add("icon-new-edit");

          // Update tooltip text
          editIcon.setAttribute("data-bs-original-title", "Edit");

          // Optionally, trigger save action
          console.log("Saved content:", methodDiv.innerText);
        } else {
          // Edit Mode: Enable editing
          methodDiv.setAttribute("contenteditable", "true");
          methodDiv.focus();
          methodDiv.classList.add("editable");

          // Change icon to save
          editIcon.classList.remove("icon-new-edit");
          editIcon.classList.add("icon-save-purple");

          // Update tooltip text
          editIcon.setAttribute("data-bs-original-title", "Save");
        }

        // Force Bootstrap tooltip refresh
        const tooltipInstance = bootstrap.Tooltip.getInstance(editIcon);
        if (tooltipInstance) {
          tooltipInstance.update(); // Refresh the tooltip
        }
      }
    });
  });
});







// verfify account div
document.addEventListener('DOMContentLoaded', function () {
  const verifyButtons = document.querySelectorAll('.verifybtn');

  verifyButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const container = btn.closest('.container');
      const verifyDiv = container.querySelector('.verifyaccountDiv');
      if (verifyDiv) {
        verifyDiv.style.display = verifyDiv.style.display === 'none' ? 'block' : 'none'; // toggle
      }
    });
  });
});







// manager form start
document.addEventListener("DOMContentLoaded", function () {
  let sectionCounter = 1;

  function setupDynamicFormSection({
    sectionSelector,
    radioSelector,
    individualFormSelector,
    corporateFormSelector,
    individualFilledSelector,
    corporateFilledSelector,
    individualAddBtnSelector,
    corporateAddBtnSelector,
    individualUpdateBtnSelector,
    corporateUpdateBtnSelector,
    addMoreBtnSelector,
    radioContainerSelector
  }) {
    document.querySelectorAll(sectionSelector).forEach(section => {
      assignUniqueIDs(section, {
        radioSelector,
        individualFormSelector,
        corporateFormSelector
      });
      setupSection(section);
    });

    function setupSection(section) {
      const individualForm = section.querySelector(individualFormSelector);
      const corporateForm = section.querySelector(corporateFormSelector);
      const individualFilledForm = section.querySelector(individualFilledSelector);
      const corporateFilledForm = section.querySelector(corporateFilledSelector);
      const individualAddBtn = section.querySelector(individualAddBtnSelector);
      const corporateAddBtn = section.querySelector(corporateAddBtnSelector);
      const individualUpdateBtn = section.querySelector(individualUpdateBtnSelector);
      const corporateUpdateBtn = section.querySelector(corporateUpdateBtnSelector);
      const addMoreManagerBtn = section.querySelector(addMoreBtnSelector);
      const radioContainer = section.querySelector(radioContainerSelector);

      const individualCancelBtn = section.querySelector('.individualcancelBtn');
      const corporateCancelBtn = section.querySelector('.corporatecancelBtn');

      const toggleRadios = section.querySelectorAll(radioSelector);

      toggleRadios.forEach(radio => {
        radio.addEventListener('change', function () {
          if (this.dataset.target === individualForm.id) {
            individualForm.style.display = 'block';
            corporateForm.style.display = 'none';
          } else if (this.dataset.target === corporateForm.id) {
            corporateForm.style.display = 'block';
            individualForm.style.display = 'none';
          }
        });
      });

      individualAddBtn.addEventListener('click', function () {
        individualForm.style.display = 'none';
        corporateForm.style.display = 'none';
        section.classList.add('show-addmore');
        individualFilledForm.style.display = 'block';
        individualAddBtn.style.display = 'none';
        individualUpdateBtn.classList.remove('d-none');
        individualCancelBtn?.classList.add('d-none');
        radioContainer.style.display = 'none';
      });

      corporateAddBtn.addEventListener('click', function () {
        individualForm.style.display = 'none';
        corporateForm.style.display = 'none';
        section.classList.add('show-addmore');
        corporateFilledForm.style.display = 'block';
        corporateAddBtn.style.display = 'none';
        corporateUpdateBtn.classList.remove('d-none');
        corporateCancelBtn?.classList.add('d-none');
        radioContainer.style.display = 'none';
      });

      individualFilledForm.querySelectorAll('.icon-new-edit').forEach(editIcon => {
        editIcon.addEventListener('click', function () {
          individualForm.style.display = 'block';
          section.classList.remove('show-addmore');
          individualFilledForm.style.display = 'none';
          individualAddBtn.style.display = 'none';
          individualUpdateBtn.classList.remove('d-none');
          individualCancelBtn?.classList.remove('d-none');
          radioContainer.style.display = 'flex';
        });
      });

      corporateFilledForm.querySelectorAll('.icon-new-edit').forEach(editIcon => {
        editIcon.addEventListener('click', function () {
          corporateForm.style.display = 'block';
          section.classList.remove('show-addmore');
          corporateFilledForm.style.display = 'none';
          corporateAddBtn.style.display = 'none';
          corporateUpdateBtn.classList.remove('d-none');
          corporateCancelBtn?.classList.remove('d-none');
          radioContainer.style.display = 'flex';
        });
      });

      individualCancelBtn?.addEventListener('click', function () {
        individualForm.style.display = 'none';
        section.classList.add('show-addmore');
        individualFilledForm.style.display = 'block';
        individualAddBtn.style.display = 'none';
        individualUpdateBtn.classList.add('d-none');
        individualCancelBtn.classList.add('d-none');
        radioContainer.style.display = 'none';
      });

      corporateCancelBtn?.addEventListener('click', function () {
        corporateForm.style.display = 'none';
        section.classList.add('show-addmore');
        corporateFilledForm.style.display = 'block';
        corporateAddBtn.style.display = 'none';
        corporateUpdateBtn.classList.add('d-none');
        corporateCancelBtn.classList.add('d-none');
        radioContainer.style.display = 'none';
      });

      addMoreManagerBtn.addEventListener('click', function (e) {
        e.preventDefault();
        section.classList.remove('show-addmore');

        const newSection = section.cloneNode(true);
        resetSection(newSection);

        if (individualFilledForm.style.display === 'block') {
          individualFilledForm.parentNode.insertBefore(newSection, individualFilledForm);
        } else if (corporateFilledForm.style.display === 'block') {
          corporateFilledForm.parentNode.insertBefore(newSection, corporateFilledForm);
        } else {
          section.parentNode.insertBefore(newSection, section);
        }

        assignUniqueIDs(newSection, {
          radioSelector,
          individualFormSelector,
          corporateFormSelector
        });

        setupSection(newSection);

        const individualAddBtn = newSection.querySelector(individualAddBtnSelector);
        if (individualAddBtn) {
          const cancelNewBtn = document.createElement('button');
          cancelNewBtn.type = 'button';
          cancelNewBtn.className = 'btn btn-small py-0 px-4 me-2';
          cancelNewBtn.textContent = 'CANCEL';

          individualAddBtn.parentNode.insertBefore(cancelNewBtn, individualAddBtn);

          cancelNewBtn.addEventListener('click', function () {
            newSection.remove();
          });
        }
      });
    }

    function resetSection(section) {
      section.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
      section.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
      section.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
      section.querySelectorAll('.search-input').forEach(input => input.value = 'Role');

      section.querySelector(individualFormSelector).style.display = 'block';
      section.querySelector(corporateFormSelector).style.display = 'none';
      section.querySelector(individualFilledSelector).style.display = 'none';
      section.querySelector(corporateFilledSelector).style.display = 'none';

      section.querySelector(individualAddBtnSelector).style.display = '';
      section.querySelector(corporateAddBtnSelector).style.display = '';
      section.querySelector(individualUpdateBtnSelector).classList.add('d-none');
      section.querySelector(corporateUpdateBtnSelector).classList.add('d-none');

      section.querySelector('.individualcancelBtn')?.classList.add('d-none');
      section.querySelector('.corporatecancelBtn')?.classList.add('d-none');

      section.querySelector(radioContainerSelector).style.display = 'flex';
      section.classList.add('show-addmore');
    }

    function assignUniqueIDs(section, { radioSelector, individualFormSelector, corporateFormSelector }) {
      const individualForm = section.querySelector(individualFormSelector);
      const corporateForm = section.querySelector(corporateFormSelector);
      const radios = section.querySelectorAll(radioSelector);

      const uniqueSuffix = sectionCounter++;

      individualForm.id = 'individualForm_' + uniqueSuffix;
      corporateForm.id = 'corporateForm_' + uniqueSuffix;

      const individualRadio = radios[0];
      const corporateRadio = radios[1];

      individualRadio.dataset.target = individualForm.id;
      corporateRadio.dataset.target = corporateForm.id;

      individualRadio.name = 'managerType_' + uniqueSuffix;
      corporateRadio.name = 'managerType_' + uniqueSuffix;

      individualRadio.id = 'individual_' + uniqueSuffix;
      corporateRadio.id = 'corporate_' + uniqueSuffix;

      const individualLabel = section.querySelector(`label[for^="individual"]`);
      const corporateLabel = section.querySelector(`label[for^="corporate"]`);

      if (individualLabel) individualLabel.setAttribute('for', individualRadio.id);
      if (corporateLabel) corporateLabel.setAttribute('for', corporateRadio.id);
    }
  }

  setupDynamicFormSection({
    sectionSelector: '.section',
    radioSelector: '.toggle-radio',
    individualFormSelector: '.individualForm',
    corporateFormSelector: '.corporateForm',
    individualFilledSelector: '.individualForm3',
    corporateFilledSelector: '.corporateForm3',
    individualAddBtnSelector: '.individualaddBtn',
    corporateAddBtnSelector: '.corporateaddBtn',
    individualUpdateBtnSelector: '.individualupdateBtn',
    corporateUpdateBtnSelector: '.corporateupdateBtn',
    addMoreBtnSelector: '.addmoreManager',
    radioContainerSelector: '.radioDiv'
  });
});


// submit annuall report stakeholder
document.addEventListener('DOMContentLoaded', function () {
  const modalIds = ['annualreportDetail', 'annualreportDetail2'];

  modalIds.forEach(id => {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.addEventListener('shown.bs.modal', function () {
      const section = modal.querySelector('.section');
      if (!section) return;

      const individualForm = section.querySelector('.individualForm');
      const corporateForm = section.querySelector('.corporateForm');
      const individualFilled = section.querySelector('.individualForm3');
      const corporateFilled = section.querySelector('.corporateForm3');
      const radioDiv = section.querySelector('.radioDiv');
      const addBtn = section.querySelector('.individualaddBtn');
      const updateBtn = section.querySelector('.individualupdateBtn');
      const cancelBtn = section.querySelector('.individualcancelBtn');

      // Hide all form inputs
      if (individualForm) individualForm.style.display = 'none';
      if (corporateForm) corporateForm.style.display = 'none';

      // Hide corporate filled view just in case
      if (corporateFilled) corporateFilled.style.display = 'none';

      // Show only individual filled state
      if (individualFilled) individualFilled.style.display = 'block';

      // Hide ADD button
      if (addBtn) addBtn.style.display = 'none';

      // Show UPDATE button
      if (updateBtn) updateBtn.classList.remove('d-none');

      // Hide cancel button
      if (cancelBtn) cancelBtn.classList.add('d-none');

      // Hide radio buttons
      if (radioDiv) radioDiv.style.display = 'none';

      // Mark section as filled
      section.classList.add('show-addmore');
      section.classList.add('mt-4');
    });
  });
});



// foreign and home check
document.addEventListener('DOMContentLoaded', function () {
  const foreignCheck = document.getElementById('foreignCheck');
  const additionalEntity = document.querySelector('.additionalentity');
  const foreignHomeEntity = document.querySelector('.foreignhomeEntity');

  function toggleEntities() {
    if (foreignCheck.checked) {
      additionalEntity.style.display = 'none';
      foreignHomeEntity.style.display = 'block';
    } else {
      additionalEntity.style.display = 'block';
      foreignHomeEntity.style.display = 'none';
    }
  }

  foreignCheck.addEventListener('change', toggleEntities);

  // Initialize visibility on load
  toggleEntities();
});


// officer manager autosearch
const fullNames = [
  "James Smith", "Mary Johnson", "John Williams", "Patricia Brown", "Robert Jones",
  "Jennifer Garcia", "Michael Miller", "Linda Davis", "William Rodriguez", "Elizabeth Martinez",
  "David Hernandez", "Barbara Lopez", "Richard Gonzalez", "Susan Wilson", "Joseph Anderson",
  "Jessica Thomas", "Thomas Taylor", "Sarah Moore", "Charles Jackson", "Karen Martin"
];

document.querySelectorAll('.autocomplete-input').forEach(input => {
  const suggestions = input.nextElementSibling;

  input.addEventListener('input', () => {
    const val = input.value.toLowerCase().trim();
    if (!val) {
      suggestions.style.display = 'none';
      suggestions.innerHTML = '';
      return;
    }
    const filtered = fullNames.filter(name => name.toLowerCase().startsWith(val));
    if (filtered.length === 0) {
      suggestions.innerHTML = '<div class="no-result">No results found</div>';
    } else {
      suggestions.innerHTML = filtered.map(name => `<div class="item">${name}</div>`).join('');
    }
    suggestions.style.display = 'block';
  });

  suggestions.addEventListener('click', e => {
    if (e.target.classList.contains('item')) {
      input.value = e.target.textContent;
      suggestions.style.display = 'none';
    }
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.autocomplete-wrapper')) {
      suggestions.style.display = 'none';
    }
  });
});



// mailind Address
document.addEventListener('DOMContentLoaded', function () {
  const addressSections = document.querySelectorAll('.same-address-checkbox');

  addressSections.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      // Find the closest parent fieldset or container
      const container = checkbox.closest('fieldset');

      // Within that container, find the corresponding mailing address fields
      const mailingFields = container.querySelector('.mailing-address-fields');

      if (mailingFields) {
        mailingFields.style.display = checkbox.checked ? 'none' : 'block';
      }
    });
  });
});




// Attach upload toggle and quantity control to a component block
function setupQtyComponent(block) {
  const yesCheckbox = block.querySelector('.yes-checkbox');
  const qtyBtn = block.querySelector('.qty-btn');
  const numberInput = block.querySelector('input[type="text"]');
  const btnIncrease = block.querySelector('.numInce');
  const btnDecrease = block.querySelector('.numDec');

  if (!yesCheckbox || !qtyBtn || !numberInput) return;

  // Show or hide the qty-btn based on checkbox state
  const toggleQty = () => {
    qtyBtn.style.display = yesCheckbox.checked ? 'block' : 'none';
  };

  yesCheckbox.addEventListener('change', toggleQty);
  toggleQty(); // initialize on load

  // Quantity change
  const changeValue = (delta) => {
    const current = parseInt(numberInput.value) || 0;
    const next = Math.max(0, current + delta);
    numberInput.value = next;
  };

  btnIncrease?.addEventListener('click', () => changeValue(+1));
  btnDecrease?.addEventListener('click', () => changeValue(-1));
}

// Initialize all components on page load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.component-block').forEach(setupQtyComponent);
});



// selet2 
$(document).ready(function () {
  // List of modal IDs
  const modals = ['#NWForeign', '#NWexistingForeign', '#appointRA', '#requestCS', '#entityFRServices', '#INTentity', '#BLentity', '#requestCSGood', '#disEntity', '#addEXEntity', '#docEntity', '#EINEntity', '#f25102Entity', "#subSEntity"];

  // Attach the same event handler to all modals
  modals.forEach(modalId => {
    $(modalId).on('show.bs.modal', function (e) {
      $('.home-entity-field').select2({
        dropdownParent: $(modalId),
        placeholder: ["#docEntity", "#EINEntity", "#f25102Entity", "#subSEntity"].includes(modalId) ? "Select Entity" : "Entity",  // Add placeholder here
      });
    });
  });
});






// annual report filing 
document.addEventListener("DOMContentLoaded", function () {
  const yesRadio = document.getElementById("yes2an2");
  const noRadio = document.getElementById("no1an2");
  const nextBtn = document.getElementById("nextBtnan2");

  function updateButton() {
    if (yesRadio.checked) {
      nextBtn.textContent = "Complete";
      nextBtn.removeAttribute("data-bs-target");
      nextBtn.removeAttribute("data-bs-toggle");
      nextBtn.setAttribute("data-bs-dismiss", "modal"); // Close modal
    } else {
      nextBtn.textContent = "Next";
      nextBtn.setAttribute("data-bs-target", "#annualreportDetail2");
      nextBtn.setAttribute("data-bs-toggle", "modal");
      nextBtn.removeAttribute("data-bs-dismiss"); // Do not close modal
    }
  }

  yesRadio.addEventListener("change", updateButton);
  noRadio.addEventListener("change", updateButton);
});



document.addEventListener("DOMContentLoaded", function () {
  const yesRadio2 = document.getElementById("yes2an");
  const noRadio2 = document.getElementById("no1an");
  const nextBtn2 = document.getElementById("nextBtnan");

  function updateButton2() {
    if (yesRadio2.checked) {
      nextBtn2.textContent = "Complete";
      nextBtn2.removeAttribute("data-bs-target");
      nextBtn2.removeAttribute("data-bs-toggle");
      nextBtn2.setAttribute("data-bs-dismiss", "modal"); // Close modal when clicking Complete
    } else {
      nextBtn2.textContent = "Next";
      nextBtn2.setAttribute("data-bs-target", "#annualreportDetail");
      nextBtn2.setAttribute("data-bs-toggle", "modal");
      nextBtn2.removeAttribute("data-bs-dismiss"); // Continue to next modal
    }
  }

  yesRadio2.addEventListener("change", updateButton2);
  noRadio2.addEventListener("change", updateButton2);
});





// certifiled number
function changeValue(element, step) {
  // Find the closest parent container
  const container = element.closest('.incDecNum');

  // Find the input inside this container
  const input = container.querySelector('.numberInput');

  // Get current value and safely convert to number
  let currentValue = parseInt(input.value) || 0;

  // Change value
  currentValue += step;

  // Optional: Prevent negative values
  if (currentValue < 0) {
    currentValue = 0;
  }

  // Set new value
  input.value = currentValue;
}



// new entity sub service
$('#entitySummery').on('shown.bs.modal', function () {
  console.log('Modal opened');

  if ($.fn.DataTable.isDataTable('#subTableservice')) {
    console.log('Destroying existing DataTable');
    $('#subTableservice').DataTable().destroy(); // ✅ Don't use .clear()
  }

  console.log('Reinitializing DataTable');
  $('#subTableservice').DataTable({
    ordering: false,
    order: [],
    paging: false,
    info: false,
    searching: false,
    columnDefs: [
      { orderable: false, targets: '_all' }
    ]
  });
});


// existing entity sub service
$('#addentitySummery').on('shown.bs.modal', function () {
  console.log('Modal opened');

  if ($.fn.DataTable.isDataTable('#existingSubservice')) {
    console.log('Destroying existing DataTable');
    $('#existingSubservice').DataTable().destroy(); // ✅ Don't use .clear()
  }

  console.log('Reinitializing DataTable');
  $('#existingSubservice').DataTable({
    ordering: false,
    order: [],
    paging: false,
    info: false,
    searching: false,
    columnDefs: [
      { orderable: false, targets: '_all' }
    ]
  });
});



$(document).ready(function () {
  // Hide the table when the modal opens
  $('#appointRA').on('shown.bs.modal', function () {
    $('.entityDiv').hide();
  });

  // Show the table when the select input is clicked or focused
  $('#appointRA').on('focus click', '#entityType-modeltable', function () {
    $('.entityDiv').show();
  });
});


// payment method one checkbox at a time
document.addEventListener("DOMContentLoaded", function () {
  // Get all checkboxes inside payment-card
  let checkboxes = document.querySelectorAll('.payment-card .form-check-input[type="checkbox"]');

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      if (this.checked) {
        // Uncheck all other checkboxes
        checkboxes.forEach(function (cb) {
          if (cb !== checkbox) {
            cb.checked = false;
          }
        });
      }
    });
  });
});

// date to file checkbox
document.addEventListener('DOMContentLoaded', function () {
  const radioButton = document.querySelector('.yes-checkboxdate');
  const dateInputContainer = document.querySelector('.upload-btndate');

  // Show input by default since radio is pre-selected
  if (radioButton.checked) {
    dateInputContainer.style.display = 'block';
  }

  radioButton.addEventListener('change', function () {
    if (this.checked) {
      dateInputContainer.style.display = 'block';
    } else {
      dateInputContainer.style.display = 'none';
    }
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.getElementById("statusCheckbox");
  const uploadSection = document.getElementById("uploadSection");

  function toggleUpload() {
    uploadSection.style.display = checkbox.checked ? "none" : "block";
  }

  // Initialize visibility on page load
  toggleUpload();

  // Add event listener
  checkbox.addEventListener("change", toggleUpload);
});


// select word limit
document.addEventListener("DOMContentLoaded", function () {
  const selects = document.querySelectorAll(".custom-dropdown");
  const maxChars = 52; // Customize this number to your select width

  selects.forEach(select => {
    select.querySelectorAll("option").forEach(option => {
      const fullText = option.text.trim();
      option.dataset.fullText = fullText;
      option.title = fullText;
      if (fullText.length > maxChars) {
        option.textContent = fullText.slice(0, maxChars) + "...";
      }
    });
  });
});



// selct tittle remove
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('select').forEach(select => {
    select.removeAttribute('title'); // remove from <select> itself
    select.querySelectorAll('option').forEach(option => {
      option.removeAttribute('title'); // remove from each option
    });
  });
});


// select2 tittle removal
$(document).ready(function () {
  $('.select2').select2();

  // Remove title from rendered selection box and options
  $('.select2').on('select2:open select2:select', function () {
    setTimeout(function () {
      $('.select2-selection').removeAttr('title');
      $('.select2-results__option').removeAttr('title');
    }, 0);
  });

  // Also remove title from initial selection box
  $('.select2-selection').removeAttr('title');
});




// request search filter
const autoSuggestions = [
  // Entity Names
  "RESOURCE INCOME PARTNERS LIMITED PARTNERSHIP",
  "RASA Realty LLC",
  "Pikewood Group, LLC",
  "EXPLORATION CAPITAL PARTNERS 2012 LIMITED PARTNERSHIP",
  "GDS DESIGNS, INC.",
  "KK RENEWAL HOLDINGS CORP",
  "MARKSET FUND I -01-SERIES 1 L.L.C.",
  // Jurisdictions
  "CA", "DE", "FL", "LA", "TR", "KS", "SK"
];

document.querySelectorAll('.autocomplete-input2').forEach(input => {
  const suggestions = input.nextElementSibling;

  input.addEventListener('input', () => {
    const val = input.value.toLowerCase().trim();
    if (!val) {
      suggestions.style.display = 'none';
      suggestions.innerHTML = '';
      return;
    }

    const filtered = autoSuggestions.filter(item => item.toLowerCase().startsWith(val));
    if (filtered.length === 0) {
      suggestions.innerHTML = '<div class="no-result">No results found</div>';
    } else {
      suggestions.innerHTML = filtered.map(item => `<div class="item">${item}</div>`).join('');
    }
    suggestions.style.display = 'block';
  });

  suggestions.addEventListener('click', e => {
    if (e.target.classList.contains('item')) {
      input.value = e.target.textContent;
      suggestions.style.display = 'none';
    }
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.autocomplete-wrapper2')) {
      suggestions.style.display = 'none';
    }
  });
});





