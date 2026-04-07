'use strict';

$(document).ready(function () {
    initExample2();

    // click-to-edit only for NEW unsaved rows
    $(document).on('click', '#example-2 tbody tr.pending-row td.editable .tabledit-span', function () {
    var $cell = $(this).closest('td');

    if ($cell.find('.tabledit-input').is(':visible')) return;

    $cell.find('.tabledit-span').hide();
    $cell.find('.tabledit-input').show().prop('disabled', false).focus();
});

    // save new row
$(document).on('click', '.save-new-row', function () {
    var $row = $(this).closest('tr');
    console.log("clicking btn");
    

    var datas = {
        bundlecode: $row.find('input[name="bdcode"]').val(),
        nname: $row.find('input[name="nname"]').val(),
        buntype: $row.find('input[name="buntype"]').val(),
        size: $row.find('input[name="size"]').val(),
        dura: $row.find('input[name="dura"]').val(),
        apicost: $row.find('input[name="apicost"]').val(),
        cost: $row.find('input[name="cost"]').val()
    };

    console.log("My Backend Data ",datas);
    const dd = "Testing this data";

    $.ajax({
        url: '/save-new-dataplan',
        type: 'POST',
        data: datas,
        success: function (response) {
            // $row.removeClass('pending-row');

            // $row.html(
            //     '<td>' + (response.bundle_code || '') + '</td>' +
            //     '<td>' + (response.nname || '') + '</td>' +
            //     '<td>' + (response.bun_type || '') + '</td>' +
            //     '<td>' + (response.size || '') + '</td>' +
            //     '<td>' + (response.dura || '') + '</td>' +
            //     '<td>' + (response.api_cost || '') + '</td>' +
            //     '<td>' + (response.cost || '') + '</td>' +
            //     '<td>' + (((Number(response.cost) || 0) - (Number(response.api_cost) || 0)).toFixed(2)) + '</td>'
            // );

            // $('#example-2').Tabledit('destroy');
            // initExample2();

            setTimeout(function () {
                    swal({
                        title: "Success!",
                        text: "New data plan saved successfully.",
                        type: "success"
                    }, function () {
                        location.reload();
                    });
                }, 200);

            // swal("Success!", "", "success");
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
            swal("Error!", "Could not save new row.", "error");
        }
    });
});

// saving editting row
  $(document).on('click', '.edit-save', function () {
    var $row = $(this).closest('tr');
    console.log("clicking btn");
      swal({
        title: "Are you sure?",
        text: "You want to Modify this Data plan ?",
        type: "info",
        showCancelButton: true,
        confirmButtonText: "Yes, proceed",
        cancelButtonText: "No, cancel",
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function (isConfirm) {

        var datas = {
        bundlecode: ($row.find('input[name="bdcode"]').val() || '').trim(),
        nname: ($row.find('input[name="nname"]').val() || '').trim(),
        buntype: ($row.find('input[name="buntype"]').val() || '').trim(),
        size: ($row.find('input[name="size"]').val() || '').trim(),
        dura: ($row.find('input[name="dura"]').val() || '').trim(),
        apicost: ($row.find('input[name="apicost"]').val() || '')
            .replace(/₦/g, '')
            .replace(/,/g, '')
            .trim(),
        cost: ($row.find('input[name="cost"]').val() || '')
            .replace(/₦/g, '')
            .replace(/,/g, '')
            .trim()
    };


        if (!isConfirm) {
            swal("Cancelled", "Transaction was cancelled", "error");
            return;
        }

        $.ajax({
            url: '/edit-dataplan',
            type: 'POST',
            data: datas,
            success: function (response) {
                swal.close();

                setTimeout(function () {
                    swal({
                        title: "Success!",
                        text: "Modification saved!.",
                        type: "success"
                    }, function () {
                        location.reload();
                    });
                }, 200);
            },
            error: function () {
                swal("Error!", "There was an error processing your request.", "error");
            }
        });

    });
});

 $(document).on('click', '.edit-delete', function () {
    var $row = $(this).closest('tr');
    console.log("clicking btn");
    

    
        const bundlecodeID = $row.find('input[name="bdcode"]').val();
       
   swal({
        title: "Are you sure?",
        text: "You want to delete this Data Plan?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, proceed",
        cancelButtonText: "No, cancel",
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function (isConfirm) {

        if (!isConfirm) {
            swal("Cancelled", "Transaction was cancelled", "error");
            return;
        }

        $.ajax({
            url: '/delete-data-plan',
            type: 'POST',
            data: {
                bundlecodeid: bundlecodeID
            },
            success: function (response) {
                swal.close();

                setTimeout(function () {
                    swal({
                        title: "Success!",
                        text: "User has been made an admin.",
                        type: "success"
                    }, function () {
                        location.reload();
                    });
                }, 200);
            },
            error: function () {
                swal("Error!", "There was an error processing your request.", "error");
            }
        });

    });
});


    // cancel new row
    $(document).on('click', '.cancel-new-row', function () {
        $(this).closest('tr').remove();
    });
});

function initExample2() {
    $('#example-2').Tabledit({
        editButton: true,
        deleteButton: true,
        hideIdentifier: false,
        buttons: {
            edit: {
                class: 'btn btn-sm btn-primary',
                html: 'Edit',
                action: 'edit'
            },
            delete: {
                class: 'btn btn-sm btn-danger edit-delete ',
                html: 'Delete',
                action: 'delete'
            },
            save: {
                class: 'btn btn-sm btn-success edit-save',
                html: 'Save'
            },
            restore: {
                class: 'btn btn-sm btn-warning',
                html: 'Restore',
                action: 'restore'
            },
            // confirm: {
                
            //     class: 'btn btn-sm btn-default',
            //     html: 'Confirm'
            // }
        },
        columns: {
            identifier: [0, 'bdcode'],
            editable: [
                [1, 'nname'],
                [2, 'buntype'],
                [3, 'size'],
                [4, 'dura'],
                [5, 'apicost'],
                [6, 'cost'],
                // [7, 'Profit']
            ]
        }
    });
}

function add_row_example2() {
    var table = document.getElementById("example-2").getElementsByTagName("tbody")[0];
    var row = table.insertRow(-1);

    row.className = 'pending-row';

var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);
var cell4 = row.insertCell(3);
var cell5 = row.insertCell(4);
var cell6 = row.insertCell(5);
var cell7 = row.insertCell(6);
var cell8 = row.insertCell(7);
var cell9 = row.insertCell(8);


// make ALL editable
cell1.className = 'editable';
cell2.className = 'editable';
cell3.className = 'editable';
cell4.className = 'editable';
cell5.className = 'editable';
cell6.className = 'editable';
cell7.className = 'editable';
// cell8.className = 'editable';

cell1.innerHTML = createInput('bdcode'); // ID (not editable)

cell2.innerHTML = createInput('nname');
cell3.innerHTML = createInput('buntype');
cell4.innerHTML = createInput('size');
cell5.innerHTML = createInput('dura');
cell6.innerHTML = createInput('apicost');
cell7.innerHTML = createInput('cost');
cell8.innerHTML = '<span class="profit-value">0</span>';

 cell9.innerHTML =
        '<button type="button" class="btn btn-sm btn-success save-new-row">Save</button> ' + 
        '<button type="button" class="btn btn-sm btn-secondary cancel-new-row">Cancel</button>';

// cell1.innerHTML =
//     '<span class="tabledit-span">New</span>' +
//     '<input class="tabledit-input form-control input-sm" type="text" name="id" value="New" style="display:none;" disabled>';

// cell2.innerHTML =
//     '<span class="tabledit-span">Click to edit</span>' +
//     '<input class="tabledit-input form-control input-sm" type="text" name="First Name" value="" style="display:none;" disabled>';

// cell3.innerHTML =
//     '<span class="tabledit-span">Click to edit</span>' +
//     '<input class="tabledit-input form-control input-sm" type="text" name="Last Name" value="" style="display:none;" disabled>';

//     cell4.innerHTML =
//         '<button type="button" class="btn btn-sm btn-success save-new-row">Save</button> ' +
//         '<button type="button" class="btn btn-sm btn-secondary cancel-new-row">Cancel</button>';
}

function createInput(name, value = '') {
    return `
        <span class="tabledit-span">${value || 'Edit'}</span>
        <input class="tabledit-input form-control input-sm"
               type="text"
               name="${name}"
               value="${value}"
               style="display:none;"
               disabled>
    `;
}

//   'use strict';
//  $(document).ready(function() {  
// $('#example-1').Tabledit({

//     editButton: false,
//     deleteButton: false,
//     hideIdentifier: true,
//     columns: {
//         identifier: [0, 'id'],
//         editable: [[1, 'First Name'], [2, 'Last Name']]
//     }
// });
//     $('#example-2').Tabledit({

//         columns: {

//           identifier: [0, 'id'],

//           editable: [[1, 'First Name'], [2, 'Last Name']]

//       }

//   });
// });
// function add_row()
// {
//     var table = document.getElementById("example-1");
//     var t1=(table.rows.length);
//     var row = table.insertRow(t1);
//     var cell1 = row.insertCell(0);
//     var cell2 = row.insertCell(1);
//      var cell3 = row.insertCell(2);

// cell1.className='abc';
// cell2.className='abc';

//    $('<span class="tabledit-span" >Click Me To Edit</span><input class="tabledit-input form-control input-sm" type="text" name="First" value="undefined" disabled="">').appendTo(cell1);
//      $('<span class="tabledit-span" >Click Me To Edit</span><input class="tabledit-input form-control input-sm" type="text" name="Last" value="undefined"  disabled="">').appendTo(cell2);
//      $('<span class="tabledit-span" >@mdo</span><select class="tabledit-input form-control input-sm" name="Nickname"  disabled="" ><option value="1">@mdo</option><option value="2">@fat</option><option value="3">@twitter</option></select>').appendTo(cell3);

// };

