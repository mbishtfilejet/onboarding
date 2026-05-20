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