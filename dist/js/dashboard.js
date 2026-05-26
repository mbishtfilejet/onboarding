// filter start

document.addEventListener("DOMContentLoaded", function () {
    function setupMultiSelect(containerId, dropdownId, searchInputId, checkboxClass, selectAllId, defaultSelected = [], maxSelection = 2) {
        const dropdown = document.getElementById(dropdownId);
        const multiSelectContainer = document.getElementById(containerId);
        const selectAllCheckbox = document.getElementById(selectAllId);

        // ✅ Skip setup if container or dropdown not present
        if (!dropdown || !multiSelectContainer) return;

        const checkboxes = dropdown.querySelectorAll(`.${checkboxClass}`);

        function getMaxSelection() {
            // added-code-start this need to be added to actual code of setupMultiSelect
            if (window.innerWidth <= 1600 && ["sopStatusContainer", "sopCheckContainer", "SOPjurisdictionContainer", "RAjurisdictionContainer"].includes(containerId)) return 1;
            // added-code-end

            if (window.innerWidth < 1300) {
                if ([
                    "addjurisdictionContainer", "roleContainer1", "roleContainer2", "roleContainer4",
                    "memberroleContainer", "annualroleContainer", "reqselectEntityContainer2",
                    "reqselectEntityContainer3", "selectEntityContainer", "exaddjurisdictionContainer"
                ].includes(containerId)) {
                    return 3;
                }
                return 1;
            }
            return maxSelection;
        }

        // Insert search box
        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.classList.add("dropdown-search-input");
        searchInput.placeholder = "Search...";
        searchInput.autocomplete = "off";

        // add search field only when search is allowed
        if (!dropdown.classList.contains('search-disabled')) {
            dropdown.prepend(searchInput);
        }

        // Set default checkboxes
        checkboxes.forEach(cb => {
            if (defaultSelected.includes(cb.getAttribute("data-value"))) {
                cb.checked = true;
            }
        });

        updateSelectedOptions(false);

        // Search filter
        searchInput.addEventListener("input", function () {
            const filter = searchInput.value.toLowerCase();
            const items = dropdown.querySelectorAll(".dropdown-item");
            items.forEach(item => {
                const text = item.innerText.toLowerCase();
                item.style.display = text.includes(filter) ? "" : "none";
            });
        });

        dropdown.addEventListener("change", function (event) {
            if (event.target.classList.contains(checkboxClass)) {
                updateSelectedOptions(true);
            }
        });

        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener("change", function () {
                checkboxes.forEach(cb => {
                    cb.checked = selectAllCheckbox.checked;
                });
                updateSelectedOptions(true);
            });
        }

        function updateSelectedOptions(shouldFocus = true) {
            const selectedCheckboxes = dropdown.querySelectorAll(`.${checkboxClass}:checked`);
            const selectedValues = Array.from(selectedCheckboxes).map(cb => cb.getAttribute("data-value"));

            // Clear container
            multiSelectContainer.innerHTML = "";

            // Add selected options
            selectedValues.slice(0, getMaxSelection()).forEach(value => {
                const span = document.createElement("span");
                span.classList.add("selected-option");
                span.innerHTML = `
          <span class="selected-option-text">${value}</span>
          <span class="remove-option">
            <img src="/dist/images/icons/filter-close.svg" alt="Remove" class="remove-icon-img">
          </span>
        `;
                span.querySelector(".remove-option").addEventListener("click", function () {
                    const checkbox = [...dropdown.querySelectorAll(`.${checkboxClass}`)].find(cb => cb.getAttribute("data-value") === value);
                    if (checkbox) {
                        if (checkbox.getAttribute("data-value") === "All") {
                            checkboxes.forEach(cb => {
                                cb.checked = false;
                            });
                        }
                        checkbox.checked = false;
                    };
                    updateSelectedOptions(true);
                });
                multiSelectContainer.appendChild(span);
            });

            if (selectedValues.length > getMaxSelection()) {
                const summarySpan = document.createElement("span");
                summarySpan.classList.add("selected-option");
                summarySpan.innerHTML = `+${selectedValues.length - getMaxSelection()}`;
                multiSelectContainer.appendChild(summarySpan);
            }

            const input = document.createElement("input");
            input.type = "button";
            input.classList.add("search-input");
            input.id = searchInputId;
            input.value = selectedValues.length === 0 ? getPlaceholder(containerId) : "";
            input.autocomplete = "off";
            multiSelectContainer.appendChild(input);

            if (shouldFocus) input.focus();
        }

        function getPlaceholder(containerId) {
            switch (containerId) {
                case "jurisdictionContainer":
                case "entityJurisdictionContainer":
                case "orderJurisdictionContainer":
                case "RAjurisdictionContainer":
                case "SOPjurisdictionContainer":
                    return "Jurisdictions";
                case "taskContainer": return "Tasks";
                case "tagContainer": return "Filter By Tag";
                case "orderTaskContainer": return "Service";
                case "addjurisdictionContainer":
                case "exaddjurisdictionContainer": return "Select States";
                case "entityStatusContainer": return "Entity Status";
                case "roleContainer1":
                case "roleContainer2":
                case "roleContainer4":
                case "memberroleContainer": return "Role";
                case "roleContainer5":
                case "roleContainer6": return "Select Role";
                case "selectEntityContainer":
                case "selectEntityContainer2":
                case "reqselectEntityContainer":
                case "reqselectEntityContainer2":
                case "reqselectEntityContainer3": return "Select Entity";
                case "entityDetailOwnershipContainer": return "As of Today";
                case "entityDetailDirectorContainer": return "As of Today";
                case "registeredAgentContainer": return "Filejet and Others";
                case "sopCheckContainer": return "Has Check";
                case "invoiceContainer":
                case "paymentContainer": return "Date Range";
                case "groupUserRoleContainer": return "Filter by Role";
                case "usersAccessContainer":
                case "externalUserContainer": return "Filter by Access"
                case "groupPaymentContainer":
                case "groupContainer": return "Group"
                default: return "Status";
            }
        }

        // Recalculate on resize
        window.addEventListener("resize", updateSelectedOptions);
    }

    // 🔁 Register all multi-select dropdowns (safe with check)
    const dropdownConfigs = [
        ["jurisdictionContainer", "jurisdictionDropdown", "jurisdictionSearch", "jurisdiction-checkbox", "jurisdictionSelectAll"],
        ["entityJurisdictionContainer", "entityJurisdictionDropdown", "entityJurisdictionSearch", "entityJurisdiction-checkbox", "entityJurisdictionSelectAll"],
        ["orderJurisdictionContainer", "orderJurisdictionDropdown", "orderJurisdictionSearch", "orderJurisdiction-checkbox", "orderJurisdictionSelectAll"],
        ["entityDetailOwnershipContainer", "entityDetailOwnershipDropdown", "entityDetailOwnershipSearch", "entityDetailOwnership-checkbox"],
        ["entityDetailDirectorContainer", "entityDetailDirectorDropdown", "entityDetailDirectorSearch", "entityDetailDirector-checkbox"],
        ["entityStatusContainer", "entityStatusDropdown", "entityStatusSearch", "entityStatus-checkbox", "entityStatusSelectAll"],
        ["orderStatusContainer", "orderStatusDropdown", "orderStatusSearch", "orderStatus-checkbox", "orderStatusSelectAll"],
        ["taskContainer", "taskDropdown", "taskSearch", "task-checkbox", "taskSelectAll"],
        ["tagContainer", "tagDropdown", "tagSearch", "tag-checkbox"],
        ["orderTaskContainer", "orderTaskDropdown", "orderTaskSearch", "orderTask-checkbox", "orderTaskSelectAll"],
        ["addjurisdictionContainer", "addjurisdictionDropdown", "addjurisdictionSearch", "addjurisdiction-checkbox", "addjurisdictionSelectAll"],
        ["exaddjurisdictionContainer", "exaddjurisdictionDropdown", "exaddjurisdictionSearch", "exaddjurisdiction-checkbox", "exaddjurisdictionSelectAll"],
        ["roleContainer1", "roleDropdown1", "roleSearch1", "role-checkbox1", "roleSelectAll1"],
        ["roleContainer2", "roleDropdown2", "roleSearch2", "role-checkbox2", "roleSelectAll2"],
        ["roleContainer4", "roleDropdown4", "roleSearch4", "role-checkbox4", "roleSelectAll4"],
        ["roleContainer5", "roleDropdown5", "roleSearch5", "role-checkbox5"],
        ["roleContainer6", "roleDropdown6", "roleSearch6", "role-checkbox6"],
        ["memberroleContainer", "memberroleDropdown", "memberroleSearch", "memberrole-checkbox", "memberroleSelectAll"],
        ["annualroleContainer", "annualroleDropdown", "annualroleSearch", "annualrole-checkbox", "annualroleSelectAll", ["CEO"]],
        ["selectEntityContainer", "selectEntityDropdown", "selectEntitySearch", "selectEntity-checkbox"],
        ["selectEntityContainer2", "selectEntityDropdown2", "selectEntitySearch2", "selectEntity-checkbox2"],
        ["reqselectEntityContainer", "reqselectEntityDropdown", "reqselectEntitySearch", "reqselectEntity-checkbox"],
        ["reqselectEntityContainer2", "reqselectEntityDropdown2", "reqselectEntitySearch2", "reqselectEntity-checkbox2"],
        ["reqselectEntityContainer3", "reqselectEntityDropdown3", "reqselectEntitySearch3", "reqselectEntity-checkbox3"],
        ["statusContainer", "statusDropdown", "statusSearch", "status-checkbox", "statusSelectAll", ["Overdue", "Upcoming"]],
        ["RAjurisdictionContainer", "RAjurisdictionDropdown", "RAjurisdictionSearch", "RAjurisdiction-checkbox", "RAjurisdictionSelectAll"],
        ["SOPjurisdictionContainer", "SOPjurisdictionDropdown", "SOPjurisdictionSearch", "SOPjurisdiction-checkbox", "SOPjurisdictionSelectAll"],
        ["registeredAgentContainer", "registeredAgentDropdown", "registeredAgentSearch", "registeredAgent-checkbox"],
        ["sopStatusContainer", "sopStatusDropdown", "sopStatusSearch", "sopStatus-checkbox"],
        ["sopCheckContainer", "sopCheckDropdown", "sopCheckSearch", "sopCheck-checkbox"],
        ["invoiceContainer", "invoiceDropdown", "invoiceSearch", "invoice-checkbox"],
        ["paymentContainer", "paymentDropdown", "paymentSearch", "payment-checkbox"],
        ["groupUserRoleContainer", "groupUserRoleDropdown", "groupUserRoleSearch", "groupUserRole-checkbox"],
        ["usersAccessContainer", "usersAccessDropdown", "usersAccessSearch", "usersAccess-checkbox"],
        ["externalUserContainer", "externalUserDropdown", "externalUserSearch", "externalUser-checkbox"],
        ["groupPaymentContainer", "groupPaymentDropdown", "groupPaymentSearch", "groupPayment-checkbox", "groupPaymentSelectAll"],
        ["groupContainer", "groupDropdown", "groupSearch", "group-checkbox", "groupSelectAll"]
    ];

    dropdownConfigs.forEach(args => setupMultiSelect(...args));
});


// filter end

$(document).ready(function () {
    //group listing Table

    const tableOptions = {
        ajax: {
            url: "data-new.json",
            dataSrc: 'groups_listing_data'
        },
        processing: true,
        scrollX: true,
        scrollY: false,
        columns: [
            { data: "group_name" },
            { data: "group_id" },
            { data: "primary_contact" },
            { data: "entities" },
            { data: "registrations" },
            { data: "partner_users" },
            {
                data: null, render: function (data, type, row) {
                    return `
                        <div class="d-flex align-items-center">
                            <span data-toggle="tooltip" data-bs-original-title="EDIT" data-bs-toggle="modal" data-bs-target="#editGroup-modal" class="me-1 me-md-2 d-inline-block" role="button" data-bs-toggle="modal" data-bs-target="#edit-owner-modal">
                            <span class="icon icon-entity-edit m-0"></span>
                            </span>
                            <span data-toggle="tooltip" data-bs-original-title="DELETE" data-bs-toggle="modal" data-bs-target="#deleteGroup-modal" class="me-1 me-md-2 d-inline-block" role="button" data-bs-toggle="modal" data-bs-target="#delete-modal">
                            <span class="icon icon-entity-delete m-0"></span>
                            </span>
                        </div>
                    `
                }
            }
        ],
        order: [[0, "asc"]],
        lengthChange: false,  // Removed pagination
        paging: false,  // Disable pagination
        info: false,    // Hide table info (e.g., "Showing 1 to 10 of 50 entries"
    }

    $("#group-listing-table").DataTable(tableOptions);
})


function highlightTabs(tabparent) {
    if (!tabparent) return;
    const activeTab = tabparent.find('.nav-link.active');
    const tabOffset = activeTab.position();

    tabparent.css({
        '--tab-left': tabOffset.left + 'px',
        '--tab-top': tabOffset.top + 'px',
        '--tab-width': activeTab.outerWidth() + 'px',
        '--tab-height': activeTab.outerHeight() + 'px'
    })
}



$(document).ready(function () {
    if (!$('.users_tablist').length) return;
    $(".users_tablist .nav-link").on("shown.bs.tab", function () {
        highlightTabs($(".users_tablist"));
    });

    // handle resize
    $(window).on("resize", function () {
        highlightTabs($(".users_tablist"));
    });

    highlightTabs($(".users_tablist"));
})


// users listing table

$(document).ready(function () {
    const tableOptions = {
        ajax: {
            url: "data-new.json",
            dataSrc: 'account_users_data',
        },
        scrollX: true,
        scrollY: false,
        columns: [
            { data: "username" },
            { data: "email" },
            { data: "phone" },
            {
                data: "role", render: function (data, type, row) {
                    return `<span class="d-inline-block p-2 rounded-2" style="background-color:${row.bgColor};color:${row.textColor};">${data}</span>`;
                }
            },
            {
                data: "status", render: function (data, type, row) {
                    return `
                    <div class="d-inline-block p-1 px-2 rounded-pill badge-user-${data.toLowerCase()}">
                        <span class="">${data}</span>
                    </div>
                    `;
                }
            },
            { data: "groups" },
            { data: "entities" },
            {
                data: null, render: function (data, type, row) {
                    return `
                        <div class="d-flex align-items-center">
                            <span role="button" tabindex="0"> 
                                <span data-toggle="tooltip" data-bs-toggle="modal" data-bs-target="#EditUserDetails" aria-label="EDIT" data-bs-original-title="EDIT" 
                                    class="icon icon-entity-edit me-1 me-md-2"></span>
                            </span>
                            
                            ${row.role.toLowerCase().includes("admin") ? "" :
                            row.status !== "Invited" ? `<span role="button" tabindex="0" data-bs-toggle="modal" data-bs-target="#deactivateUser">
                                    <span data-toggle="tooltip" aria-label="DEACTIVATE" data-bs-original-title="DEACTIVATE" 
                                        class="icon icon-entity-delete me-1 me-md-2"></span> 
                                </span>`:
                                `<span role="button" tabindex="0" data-bs-toggle="modal" data-bs-target="#activateUser">
                                    <span data-toggle="tooltip" aria-label="RESEND INVITE" data-bs-original-title="RESEND INVITE" 
                                    class="icon icon-user-invited icon-md me-1 me-md-2"></span> 
                                </span>`
                        }
                        </div>`;
                }
            }
        ],
        order: [[0, "asc"]],
        lengthChange: false,  // Removed pagination
        paging: false,  // Disable pagination
        info: false,    // Hide table info (e.g., "Showing 1 to 10 of 50 entries"
    }

    $('#users-listing-table').DataTable(tableOptions);


    const tableOptions_1 = {
        ajax: {
            url: "data-new.json",
            dataSrc: 'account_users_data',
        },
        scrollX: true,
        scrollY: false,
        columns: [
            {
                data: "role", render: function (data, type, row) {
                    return `<span class="d-inline-block p-2 rounded-2" style="background-color:${row.bgColor};color:${row.textColor};">${data}</span>`;
                }
            },
            { data: "groups" },
            { data: "entities" },
            {
                data: null, render: function (data, type, row) {
                    return `
                        <div class="d-flex align-items-center">
                            <span role="button" tabindex="0"> 
                                <span data-toggle="tooltip" aria-label="EDIT" data-bs-original-title="EDIT" data-bs-toggle="modal" data-bs-target="#EditRole"
                                    class="icon icon-entity-edit me-1 me-md-2"></span>
                            </span>
                            
                            ${row.role.toLowerCase().includes("admin") ? "" : `<span role="button" tabindex="0" data-bs-toggle="modal" data-bs-target="#deleteRole">
                                <span data-toggle="tooltip" aria-label="REMOVE" data-bs-original-title="REMOVE" 
                                    class="icon icon-entity-delete me-1 me-md-2"></span> 
                            </span>`}
                        </div>
                        `
                }
            }
        ],
        order: [[0, "asc"]],
        lengthChange: false,  // Removed pagination
        paging: false,  // Disable pagination
        info: false,    // Hide table info (e.g., "Showing 1 to 10 of 50 entries"
    }


    $('#roles-listing-table').DataTable(tableOptions_1)
})




$(document).on('shown.bs.tab', function (e) {
    const currentTab = $(e.target);
    const tableKey = currentTab.data('table-key');
    $(`#${tableKey}`).DataTable().columns.adjust();
});




$(document).ready(function () {

    const tableAccessOption = (table) => {
        return {
            ajax: {
                url: "data-new.json",
                dataSrc: 'group_entities_data',
            },
            createdRow: function (row, data, dataIndex) {
                $(row).attr('data-id', data.id).addClass("parent");
            },
            drawCallback: function () {
                const tbody = $(this.api().table().body());
                // const thead = $(this.api().table().header());

                // prevent duplicates
                // thead.find('.group-row').remove();

                // const columnNames = this.api().table().columns().header().toArray().slice(1).map(th => $(th).attr('column-id'));

                // // add custom row at top
                // thead.append(`
                //     <tr class="group-row odd">
                //         <th>All Groups & Entities</th>
                //         ${columnNames.map(column => `<th>
                //                 <div class="d-flex align-item-center">
                //                     <input data-column="${column}" class="form-check-input green-checkbox allgroup-select row-select ${column === "permissions" ? "ms-4" : "ms-1"}" type="checkbox" id="">
                //                 </div>
                //                 </th>` ).join("")
                //     }

                //     </tr>
                // `);

                const realRows = tbody.find('tr');
                realRows.removeClass('odd even');
                realRows.each(function (index) {
                    $(this).addClass(
                        index % 2 === 0 ? 'even' : 'odd'
                    );
                });
            },
            columns: [
                {
                    data: "group_name", render: function (data, type, row) {
                        return `
                        <div class="d-flex align-items-start gap-2">
                            <button type="button" class="dt-control ${!row?.entities?.length ? "no-control" : ""} m-0"></button>
                            <div class="d-flex align-items-start gap-2" role="button">
                                <span class="icon icon-folder-thin icon-md flex-shrink-0 m-0"></span>
                                <span class="text-break">${data}</span>
                            </div>
                        </div>
                        `
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        if (table === "role_2") {
                            return `<div class="d-flex align-item-center"><input data-column="view" data-some-checked="false" class="form-check-input green-checkbox row-select ms-1" type="checkbox" id=""></div>`;
                        }
                        const { view: { checked, someChecked } } = row.rights;
                        return `<div class="d-flex align-item-center"><input data-column="view" ${checked ? "checked" : ""} data-some-checked="${someChecked}" class="form-check-input green-checkbox row-select ms-1" type="checkbox" id=""></div>`;
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        if (table === "role_2") {
                            return `<div class="d-flex align-item-center"><input data-column="edit" data-some-checked="false" class="form-check-input green-checkbox row-select ms-1" type="checkbox" id=""></div>`;
                        }
                        const { edit: { checked, someChecked } } = row.rights;
                        return `<div class="d-flex align-item-center"><input data-column="edit" ${checked ? "checked" : ""} data-some-checked="${someChecked}" class="form-check-input green-checkbox row-select ms-1" type="checkbox" id=""></div>`;
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        if (table === "role_2") {
                            return `<div class="d-flex align-item-center"><input data-column="submit" data-some-checked="false" class="form-check-input green-checkbox row-select ms-1" type="checkbox" id=""></div>`;
                        }
                        const { submit: { checked, someChecked } } = row.rights;
                        return `<div class="d-flex align-item-center"><input data-column="submit" ${checked ? "checked" : ""} data-some-checked="${someChecked}" class="form-check-input green-checkbox row-select ms-1" type="checkbox" id=""></div>`;
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        if (table === "role_2") {
                            return `<div class="d-flex align-item-center"><input data-column="upload" data-some-checked="false" class="form-check-input green-checkbox row-select ms-1" type="checkbox" id=""></div>`;
                        }
                        const { upload: { checked, someChecked } } = row.rights;
                        return `<div class="d-flex align-item-center"><input data-column="upload" ${checked ? "checked" : ""} data-some-checked="${someChecked}" class="form-check-input green-checkbox row-select ms-1" type="checkbox" id=""></div>`;
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        if (table === "role_2") {
                            return `<div class="d-flex align-item-center"><input data-column="download" data-some-checked="false" class="form-check-input green-checkbox row-select ms-1" type="checkbox" id=""></div>`;
                        }
                        const { download: { checked, someChecked } } = row.rights;
                        return `<div class="d-flex align-item-center"><input data-column="download" ${checked ? "checked" : ""} data-some-checked="${someChecked}" class="form-check-input green-checkbox row-select ms-1" type="checkbox" id=""></div>`;
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        if (table === "role_2") {
                            return `<div class="d-flex align-item-center"><input data-column="invoices" data-some-checked="false" class="form-check-input green-checkbox row-select ms-1" type="checkbox" id=""></div>`;
                        }
                        const { invoices: { checked, someChecked } } = row.rights;
                        return `<div class="d-flex align-item-center"><input data-column="invoices" ${checked ? "checked" : ""} data-some-checked="${someChecked}" class="form-check-input green-checkbox row-select ms-1" type="checkbox" id=""></div>`;
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        if (table === "role_2") {
                            return `<div class="d-flex align-item-center"><input data-column="acknowledge" data-some-checked="false" class="form-check-input green-checkbox row-select ms-1" type="checkbox" id=""></div>`;
                        }
                        const { acknowledge: { checked, someChecked } } = row.rights;
                        return `<div class="d-flex align-item-center"><input data-column="acknowledge" ${checked ? "checked" : ""} data-some-checked="${someChecked}" class="form-check-input green-checkbox row-select ms-1" type="checkbox" id=""></div>`;
                    }
                }
            ],
            lengthChange: false,
            info: false,
            order: false,
            scrollY: "400px",
            scrollCollapse: true,
            scrollX: false,
            paging: false,
        }
    }

    const tablesId = [
        {
            id: "#rights-table_1", tableContext: "users"
        },
        {
            id: "#rights-table_2", tableContext: "users"
        },
        {
            id: "#user-rights-table-1", tableContext: "role_1"
        },
        {
            id: "#user-rights-table-2", tableContext: "role_2"
        }
    ]

    tablesId.forEach(value => {
        $(value.id).DataTable(tableAccessOption(value.tableContext))
        multiSelectRowCheckbox($(value.id))
    })

    $(".user-data-table tbody").on("click", "td .dt-control", function () {
        const tr = $(this).closest("tr");

        const table = tr.closest('table');
        const td = $(this).closest('td')
        const dataTable = table.DataTable();
        const row = dataTable.row(tr);
        const isCheckboxDisabled = tr.hasClass('check-disabled')

        const cacheCheckBox = table?.data('cacheCheckBox');

        const columnNames = dataTable.columns().header().toArray().slice(1).map(th => $(th).attr('column-id'));

        const rowId = row.data().id;

        if (tr.hasClass("expanded-row")) {
            table.find(`tr.expanded-content[data-parent="${rowId}"]`).remove();
            tr.removeClass("expanded-row");
        } else {
            let expandedRows = formatExpandedRows(row.data(), columnNames, rowId, tr, cacheCheckBox, isCheckboxDisabled);
            tr.after(expandedRows);
            tr.addClass("expanded-row");
        }
        dataTable.columns.adjust();
    });

    function formatExpandedRows(data, columnNames, rowId, row, cache, isCheckboxDisabled) {
        return data.entities.map((value, index) => `
                <tr class="expanded-content" data-parent="${rowId}">
                    <td>
                        <div class="ms-4 d-flex align-items-start gap-2">
                            <span class="icon icon-entity-main icon-smd flex-shrink-0 m-0 mt-1"></span>
                            <span class="text-break">${value}</span>
                        </div>
                    </td>
                    ${columnNames.map(column => `<td data-value="${value}"> 
                        <div class="d-flex align-item-center"><input ${isCheckboxDisabled ? 'disabled' : ''} data-column="${column}" class="form-check-input row-select light-green-checkbox ${column === "permissions" ? "ms-4" : "ms-1"}" type="checkbox" ${row.find(`.row-select[data-column="${column}"]`).is(":checked") || cache.getChildValue(rowId, column, value) ? "checked" : ""} id=""></div>
                    </td>`).join("")
            }
                </tr>
            `).join("");
    }


    $(`.customSelect2`).each(function () {
        const modal = $(this).closest('.modal')
        const options = {
            placeholder: $(this).find('option[value=""]').text().trim()
        }

        if (modal.length) {
            options.dropdownParent = modal
        } else {
            options.dropdownParent = $(this).closest('.custom-dropdown')
        }
        $(this).select2(options);

        if ($(this).hasClass('roles-select')) {
            setTimeout(() => {
                toggleTable(this);
            }, 0)
        }
    });

    $('.customSelect2').on('select2:open', function () {
        // Finds the search field within the opened dropdown and sets its placeholder
        $('.select2-search__field').attr('placeholder', 'Search...');
    });

    $('.customSelect2.roles-select').on('select2:select', function () {
        toggleTable(this);
    });

    function toggleTable(select) {
        const selectedValue = $(select).val()?.trim();

        if (!selectedValue) return;

        const accessSection = $(select).closest('.modal').find('.access-table-section');

        if (!accessSection) return;

        if (selectedValue === "None") {
            $('.access-table-section').fadeOut(100).addClass('d-none');
            return;
        }

        accessSection.removeClass('d-none').hide().fadeIn(100);
        const userRightsTable = accessSection.find('.user-data-table');

        if (!userRightsTable) return;

        const checkBoxtobeDisabled = userRightsTable.closest('.userAccessTable').find('input[type=checkbox]');

        if (selectedValue === "Custom User") {
            checkBoxtobeDisabled.prop('disabled', false)
            userRightsTable.find('tr').removeClass('check-disabled')
        } else {
            checkBoxtobeDisabled.prop('disabled', true)
            userRightsTable.find('tr').addClass('check-disabled')
        }
        userRightsTable.DataTable().columns.adjust();
    }


})


$(document).on('shown.bs.modal', '.modal', function () {
    $(this).find('.user-data-table').each(function () {
        $(this).DataTable().columns.adjust();
    });
});

function multiSelectRowCheckbox(tableContainer) {

    // row checkbox event handle
    const cacheCheckBox = cacheChildCheckboxState();
    tableContainer.data('cacheCheckBox', cacheCheckBox);
    const dataTable = tableContainer.DataTable();

    // checkbox event
    const table_wrapper = tableContainer.closest(".dataTables_wrapper")
    table_wrapper.on('change', '.row-select', function () {
        const checkbox = $(this);
        const row = checkbox.closest('tr');
        const td = checkbox.closest('td');
        const columnValue = td.data('value');
        const column = checkbox.data('column');
        const isChecked = $(this).prop("checked");

        const parentId = row.data('id') || row.data('parent');

        if (row.hasClass('expanded-content')) {
            cacheCheckBox.setChildValue(parentId, column, columnValue, isChecked)
        }

        if (row.hasClass('expanded-row') || row.hasClass('parent')) {
            const rowData = dataTable.row(row).data();

            if (!row.find('.row-select').prop('indeterminate')) {
                rowData.entities.forEach((value) => {
                    cacheCheckBox.setChildValue(parentId, column, value, isChecked)
                })
            }
        }


        if (row.hasClass('expanded-row')) {
            toggleChildren(isChecked, parentId, column);
        }

        if (row.hasClass('expanded-content')) {
            updateParent(parentId, column);
        }
        updateAllState(column, checkbox, isChecked);
    })

    //update All State Checkbox

    function updateAllState(column, checkbox = '', isChecked = false) {

        const checkboxes = table_wrapper.find(`tr:not(.group-row):not(.check-disabled) td .row-select[data-column="${column}"]`);
        if (checkbox && checkbox.hasClass('allgroup-select')) {
            checkboxes.prop({
                checked: isChecked,
                indeterminate: false
            }).trigger('change');
            return;
        }

        const groupallcheckbox = table_wrapper.find(`tr.group-row .allgroup-select[data-column="${column}"]`)

        const totalCheckbox = checkboxes.length;
        const checkedCheckbox = checkboxes.filter(':checked').length;

        const hasIndeterminate = checkboxes.filter(function () { return $(this).prop('indeterminate'); }).length > 0;

        if (checkedCheckbox === 0 && !hasIndeterminate) {
            groupallcheckbox.prop({
                checked: false,
                indeterminate: false
            });
        } else if (checkedCheckbox === totalCheckbox && !hasIndeterminate) {
            groupallcheckbox.prop({
                checked: true,
                indeterminate: false
            });
        } else {
            groupallcheckbox.prop({
                checked: false,
                indeterminate: true
            });
        }


    }

    // update children checkbox
    function toggleChildren(isChecked, parentId, column) {
        if (!parentId) return;

        const children = tableContainer.find(`tr.expanded-content[data-parent="${parentId}"]:not(.check-disabled)`);

        if (!children.length) return;

        const childValidCheckBox = children.find(
            `td .row-select[data-column="${column}"]`
        );

        childValidCheckBox.prop('checked', isChecked)
    }



    // update parent
    function updateParent(parentId, column) {

        if (!parentId) return;

        const children = tableContainer.find(`tr[data-parent="${parentId}"]:not(.check-disabled)`);

        if (!children.length) return;

        const validCheckBox = children.find(
            `td .row-select[data-column="${column}"]`
        );

        if (!validCheckBox.length) return;

        const totalCheckbox = validCheckBox.length;
        const checkedCheckbox = validCheckBox.filter(':checked').length;

        const parentCheckbox = tableContainer.find(
            `tr.expanded-row[data-id="${parentId}"] .row-select[data-column="${column}"]`
        );

        if (!parentCheckbox.length) return;

        if (checkedCheckbox === 0) {
            parentCheckbox.prop({
                checked: false,
                indeterminate: false
            });

        } else if (checkedCheckbox === totalCheckbox) {
            parentCheckbox.prop({
                checked: true,
                indeterminate: false
            });

        } else {
            parentCheckbox.prop({
                checked: false,
                indeterminate: true
            });

        }
    }


    $(document).ready(function () {
        dataTable.on('draw', function () {
            const tbodyCheckbox = tableContainer.find('td');
            const thCheckbox = tableContainer.find('.allgroup-select');

            tableContainer.find('tr:not(.check-disabled) td .row-select').each(function () {
                const checkbox = $(this);
                const isIndeterminate = checkbox.data('someChecked');
                if (isIndeterminate) {
                    checkbox.prop('indeterminate', isIndeterminate)
                }
            });

            const columnNames = thCheckbox.toArray().map(th => $(th).data('column'));
            columnNames.forEach(column => updateAllState(column, '', false))
        })
    })


}

//cache row child state

function cacheChildCheckboxState() {
    const cache = new Map();

    function getKey(parentId, column) {
        return `${parentId}_${column}`;
    }

    function cached(parentId, column) {
        const key = getKey(parentId, column);

        if (!cache.has(key)) {
            cache.set(key, {
                childValue: {}
            })
        }

        return cache.get(key)
    }

    function setChildValue(parentId, column, childId, checkboxValue) {

        const entry = cached(parentId, column);
        entry.childValue[childId] = checkboxValue;
    }

    function getChildValue(parentId, column, childId) {

        const entry = cached(parentId, column);
        return entry.childValue[childId] ?? false;
    }

    function deleteKeyValue(parentId, column) {
        const key = getKey(parentId, column);
        if (cache.has(key)) {
            cache.delete(key)
        }
    }

    return {
        setChildValue,
        getChildValue,
        deleteKeyValue
    }
}


function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(amount)
}

$(document).ready(function () {
    $(document).on('input change', '.tag-color-picker', function () {
        const $picker = $(this);
        const tagContainer = $picker.closest(".modal-tags-container");
        const tagColorPicker_wrapper = $picker.closest(".tag-colorPicker-wrapper");
        const svg = tagColorPicker_wrapper.find('.tagSvg');
        const colorType = $picker.data('color-type');
        const gradientID = svg.find('linearGradient').attr('id');
        const pickedColor = $picker.val() || "";
        const fillColor = pickedColor || url(`#${gradientID}`);
        svg.find('.svgBackground').attr("fill", fillColor);
        const colors = tagContainer.data('colors') || {};
        colors[colorType] = pickedColor;
        tagContainer.data('colors', colors);
    });
})

// payment method

$(document).ready(function () {
    const tableOptions_1 = {
        ajax: {
            url: "data-new.json",
            dataSrc: 'payment_method_data',
        },
        scrollX: true,
        scrollY: false,
        columns: [
            {
                data: null, render: function (data, type, row) {
                    return `<input data-column="payMtdCheck" class="d-flex form-check-input row-select" type="checkbox" value="${row?.id}">`;
                }
            },
            { data: "nickname" },
            { data: "account" },
            {
                data: "status", render: function (data, type, row) {
                    return `<span class="badge badge-${row.status.label} badge-text-dark">${row.status.value}</span>`
                }
            },
            {
                data: "available_to", render: function (data, type, row) {
                    return data + `${row.isDefault ? " (Default)" : ''}`;
                }
            },
            {
                data: null, render: function (data, type, row) {
                    if (row.account === "Terms") return '';

                    return `
                    <div class="d-flex align-items-center">
                            <span role="button" tabindex="0"> 
                                <span data-toggle="tooltip" aria-label="EDIT" data-bs-original-title="EDIT" data-bs-toggle="modal" data-bs-target="#editPaymentMethod"
                                    class="icon icon-entity-edit me-1 me-md-2"></span>
                            </span>
                            <span role="button" tabindex="0">
                                <span data-toggle="tooltip" aria-label="DELETE" data-bs-original-title="DELETE" data-bs-toggle="modal" data-bs-target="#deletePaymentMethod"
                                    class="icon icon-entity-delete me-1 me-md-2"></span> 
                            </span>
                    </div>
                    `
                }
            }
        ],
        order: [[1, "asc"]],
        lengthChange: false,  // Removed pagination
        paging: false,  // Disable pagination
        info: false,    // Hide table info (e.g., "Showing 1 to 10 of 50 entries"
    }

    $('#payment-methods-table').DataTable(tableOptions_1)
    multiSelectRowCheckbox($('#payment-methods-table'))
})