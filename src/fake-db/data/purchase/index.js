import mock from "@/fake-db/mock.js"

const data = {
    purchases: {
        "draw": 1,
        "recordsTotal": 10,
        "recordsFiltered": 10,
        "data": [{
                "id": 90,
                "key": 0,
                "date": "17/11/2020",
                "reference_no": "pr-20201118-061543",
                "supplier": null,
                "purchase_status": "<div class=\"badge badge-success\">Received</div>",
                "payment_status": "<div class=\"badge badge-danger\">Due</div>",
                "grand_total": "33,600.00",
                "paid_amount": "33,000.00",
                "due": "600.00",
                "options": "<div class=\"btn-group\">\n                            <button type=\"button\" class=\"btn btn-default btn-sm dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Action\n                              <span class=\"caret\"></span>\n                              <span class=\"sr-only\">Toggle Dropdown</span>\n                            </button>\n                            <ul class=\"dropdown-menu edit-options dropdown-menu-right dropdown-default\" user=\"menu\">\n                                <li>\n                                    <button type=\"button\" class=\"btn btn-link view\"><i class=\"fa fa-eye\"></i> View</button>\n                                </li><li>\n                        <a href=\"http://salepropos.com/purchases/90/edit\" class=\"btn btn-link\"><i class=\"dripicons-document-edit\"></i> Edit</a>\n                        </li><li>\n                        <button type=\"button\" class=\"add-payment btn btn-link\" data-id = \"90\" data-toggle=\"modal\" data-target=\"#add-payment\"><i class=\"fa fa-plus\"></i> Add Payment</button>\n                    </li>\n                    <li>\n                        <button type=\"button\" class=\"get-payment btn btn-link\" data-id = \"90\"><i class=\"fa fa-money\"></i> View Payment</button>\n                    </li><form method=\"POST\" action=\"http://salepropos.com/purchases/90\" accept-charset=\"UTF-8\"><input name=\"_method\" type=\"hidden\" value=\"DELETE\"><input name=\"_token\" type=\"hidden\" value=\"Ty3CrPUBV5sNYlydCBnSILkUGVyPFyhnadOrryBE\">\n                            <li>\n                              <button type=\"submit\" class=\"btn btn-link\" onclick=\"return confirmDelete()\"><i class=\"dripicons-trash\"></i> Delete</button> \n                            </li></form>\n                        </ul>\n                    </div>",
                "purchase": [
                    "[ \"17/11/2020\"",
                    " \"pr-20201118-061543\"",
                    " \"Received\"",
                    " \"90\"",
                    " \"warehouse 2\"",
                    " \"1234\"",
                    " \"boropul, chittagong\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"4500\"",
                    " \"0\"",
                    " \"34500\"",
                    " \"0\"",
                    " \"0\"",
                    " \"1000\"",
                    " \"100\"",
                    " \"33600\"",
                    " \"33000\"",
                    " \"\"",
                    " \"admin\"",
                    " \"admin@gmail.com\"]"
                ]
            },
            {
                "id": 89,
                "key": 1,
                "date": "16/11/2020",
                "reference_no": "pr-20201116-030145",
                "supplier": null,
                "purchase_status": "<div class=\"badge badge-success\">Received</div>",
                "payment_status": "<div class=\"badge badge-danger\">Due</div>",
                "grand_total": "353.00",
                "paid_amount": "0.00",
                "due": "353.00",
                "options": "<div class=\"btn-group\">\n                            <button type=\"button\" class=\"btn btn-default btn-sm dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Action\n                              <span class=\"caret\"></span>\n                              <span class=\"sr-only\">Toggle Dropdown</span>\n                            </button>\n                            <ul class=\"dropdown-menu edit-options dropdown-menu-right dropdown-default\" user=\"menu\">\n                                <li>\n                                    <button type=\"button\" class=\"btn btn-link view\"><i class=\"fa fa-eye\"></i> View</button>\n                                </li><li>\n                        <a href=\"http://salepropos.com/purchases/89/edit\" class=\"btn btn-link\"><i class=\"dripicons-document-edit\"></i> Edit</a>\n                        </li><li>\n                        <button type=\"button\" class=\"add-payment btn btn-link\" data-id = \"89\" data-toggle=\"modal\" data-target=\"#add-payment\"><i class=\"fa fa-plus\"></i> Add Payment</button>\n                    </li>\n                    <li>\n                        <button type=\"button\" class=\"get-payment btn btn-link\" data-id = \"89\"><i class=\"fa fa-money\"></i> View Payment</button>\n                    </li><form method=\"POST\" action=\"http://salepropos.com/purchases/89\" accept-charset=\"UTF-8\"><input name=\"_method\" type=\"hidden\" value=\"DELETE\"><input name=\"_token\" type=\"hidden\" value=\"Ty3CrPUBV5sNYlydCBnSILkUGVyPFyhnadOrryBE\">\n                            <li>\n                              <button type=\"submit\" class=\"btn btn-link\" onclick=\"return confirmDelete()\"><i class=\"dripicons-trash\"></i> Delete</button> \n                            </li></form>\n                        </ul>\n                    </div>",
                "purchase": [
                    "[ \"16/11/2020\"",
                    " \"pr-20201116-030145\"",
                    " \"Received\"",
                    " \"89\"",
                    " \"warehouse 1\"",
                    " \"2312121\"",
                    " \"khatungonj, chittagong\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"32\"",
                    " \"0\"",
                    " \"353\"",
                    " \"0\"",
                    " \"0\"",
                    " \"\"",
                    " \"\"",
                    " \"353\"",
                    " \"0\"",
                    " \"\"",
                    " \"admin\"",
                    " \"admin@gmail.com\"]"
                ]
            },
            {
                "id": 87,
                "key": 2,
                "date": "01/11/2020",
                "reference_no": "pr-20201102-093644",
                "supplier": null,
                "purchase_status": "<div class=\"badge badge-success\">Received</div>",
                "payment_status": "<div class=\"badge badge-danger\">Due</div>",
                "grand_total": "352.00",
                "paid_amount": "0.00",
                "due": "352.00",
                "options": "<div class=\"btn-group\">\n                            <button type=\"button\" class=\"btn btn-default btn-sm dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Action\n                              <span class=\"caret\"></span>\n                              <span class=\"sr-only\">Toggle Dropdown</span>\n                            </button>\n                            <ul class=\"dropdown-menu edit-options dropdown-menu-right dropdown-default\" user=\"menu\">\n                                <li>\n                                    <button type=\"button\" class=\"btn btn-link view\"><i class=\"fa fa-eye\"></i> View</button>\n                                </li><li>\n                        <a href=\"http://salepropos.com/purchases/87/edit\" class=\"btn btn-link\"><i class=\"dripicons-document-edit\"></i> Edit</a>\n                        </li><li>\n                        <button type=\"button\" class=\"add-payment btn btn-link\" data-id = \"87\" data-toggle=\"modal\" data-target=\"#add-payment\"><i class=\"fa fa-plus\"></i> Add Payment</button>\n                    </li>\n                    <li>\n                        <button type=\"button\" class=\"get-payment btn btn-link\" data-id = \"87\"><i class=\"fa fa-money\"></i> View Payment</button>\n                    </li><form method=\"POST\" action=\"http://salepropos.com/purchases/87\" accept-charset=\"UTF-8\"><input name=\"_method\" type=\"hidden\" value=\"DELETE\"><input name=\"_token\" type=\"hidden\" value=\"Ty3CrPUBV5sNYlydCBnSILkUGVyPFyhnadOrryBE\">\n                            <li>\n                              <button type=\"submit\" class=\"btn btn-link\" onclick=\"return confirmDelete()\"><i class=\"dripicons-trash\"></i> Delete</button> \n                            </li></form>\n                        </ul>\n                    </div>",
                "purchase": [
                    "[ \"01/11/2020\"",
                    " \"pr-20201102-093644\"",
                    " \"Received\"",
                    " \"87\"",
                    " \"warehouse 1\"",
                    " \"2312121\"",
                    " \"khatungonj, chittagong\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"32\"",
                    " \"0\"",
                    " \"352\"",
                    " \"0\"",
                    " \"0\"",
                    " \"0\"",
                    " \"0\"",
                    " \"352\"",
                    " \"0\"",
                    " \"kjkljklj lljkljkljkl jhjhjh.\"",
                    " \"admin\"",
                    " \"admin@gmail.com\"]"
                ]
            },
            {
                "id": 85,
                "key": 3,
                "date": "01/11/2020",
                "reference_no": "pr-20201102-092952",
                "supplier": null,
                "purchase_status": "<div class=\"badge badge-success\">Received</div>",
                "payment_status": "<div class=\"badge badge-danger\">Due</div>",
                "grand_total": "352.00",
                "paid_amount": "0.00",
                "due": "352.00",
                "options": "<div class=\"btn-group\">\n                            <button type=\"button\" class=\"btn btn-default btn-sm dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Action\n                              <span class=\"caret\"></span>\n                              <span class=\"sr-only\">Toggle Dropdown</span>\n                            </button>\n                            <ul class=\"dropdown-menu edit-options dropdown-menu-right dropdown-default\" user=\"menu\">\n                                <li>\n                                    <button type=\"button\" class=\"btn btn-link view\"><i class=\"fa fa-eye\"></i> View</button>\n                                </li><li>\n                        <a href=\"http://salepropos.com/purchases/85/edit\" class=\"btn btn-link\"><i class=\"dripicons-document-edit\"></i> Edit</a>\n                        </li><li>\n                        <button type=\"button\" class=\"add-payment btn btn-link\" data-id = \"85\" data-toggle=\"modal\" data-target=\"#add-payment\"><i class=\"fa fa-plus\"></i> Add Payment</button>\n                    </li>\n                    <li>\n                        <button type=\"button\" class=\"get-payment btn btn-link\" data-id = \"85\"><i class=\"fa fa-money\"></i> View Payment</button>\n                    </li><form method=\"POST\" action=\"http://salepropos.com/purchases/85\" accept-charset=\"UTF-8\"><input name=\"_method\" type=\"hidden\" value=\"DELETE\"><input name=\"_token\" type=\"hidden\" value=\"Ty3CrPUBV5sNYlydCBnSILkUGVyPFyhnadOrryBE\">\n                            <li>\n                              <button type=\"submit\" class=\"btn btn-link\" onclick=\"return confirmDelete()\"><i class=\"dripicons-trash\"></i> Delete</button> \n                            </li></form>\n                        </ul>\n                    </div>",
                "purchase": [
                    "[ \"01/11/2020\"",
                    " \"pr-20201102-092952\"",
                    " \"Received\"",
                    " \"85\"",
                    " \"warehouse 1\"",
                    " \"2312121\"",
                    " \"khatungonj, chittagong\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"32\"",
                    " \"0\"",
                    " \"352\"",
                    " \"0\"",
                    " \"0\"",
                    " \"\"",
                    " \"\"",
                    " \"352\"",
                    " \"0\"",
                    " \"asasda dasdasd\"",
                    " \"admin\"",
                    " \"admin@gmail.com\"]"
                ]
            },
            {
                "id": 84,
                "key": 4,
                "date": "26/10/2020",
                "reference_no": "pr-20201027-045658",
                "supplier": null,
                "purchase_status": "<div class=\"badge badge-success\">Received</div>",
                "payment_status": "<div class=\"badge badge-danger\">Due</div>",
                "grand_total": "4.00",
                "paid_amount": "0.00",
                "due": "4.00",
                "options": "<div class=\"btn-group\">\n                            <button type=\"button\" class=\"btn btn-default btn-sm dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Action\n                              <span class=\"caret\"></span>\n                              <span class=\"sr-only\">Toggle Dropdown</span>\n                            </button>\n                            <ul class=\"dropdown-menu edit-options dropdown-menu-right dropdown-default\" user=\"menu\">\n                                <li>\n                                    <button type=\"button\" class=\"btn btn-link view\"><i class=\"fa fa-eye\"></i> View</button>\n                                </li><li>\n                        <a href=\"http://salepropos.com/purchases/84/edit\" class=\"btn btn-link\"><i class=\"dripicons-document-edit\"></i> Edit</a>\n                        </li><li>\n                        <button type=\"button\" class=\"add-payment btn btn-link\" data-id = \"84\" data-toggle=\"modal\" data-target=\"#add-payment\"><i class=\"fa fa-plus\"></i> Add Payment</button>\n                    </li>\n                    <li>\n                        <button type=\"button\" class=\"get-payment btn btn-link\" data-id = \"84\"><i class=\"fa fa-money\"></i> View Payment</button>\n                    </li><form method=\"POST\" action=\"http://salepropos.com/purchases/84\" accept-charset=\"UTF-8\"><input name=\"_method\" type=\"hidden\" value=\"DELETE\"><input name=\"_token\" type=\"hidden\" value=\"Ty3CrPUBV5sNYlydCBnSILkUGVyPFyhnadOrryBE\">\n                            <li>\n                              <button type=\"submit\" class=\"btn btn-link\" onclick=\"return confirmDelete()\"><i class=\"dripicons-trash\"></i> Delete</button> \n                            </li></form>\n                        </ul>\n                    </div>",
                "purchase": [
                    "[ \"26/10/2020\"",
                    " \"pr-20201027-045658\"",
                    " \"Received\"",
                    " \"84\"",
                    " \"warehouse 1\"",
                    " \"2312121\"",
                    " \"khatungonj, chittagong\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"0\"",
                    " \"0\"",
                    " \"4\"",
                    " \"0\"",
                    " \"0\"",
                    " \"\"",
                    " \"\"",
                    " \"4\"",
                    " \"0\"",
                    " \"\"",
                    " \"admin\"",
                    " \"admin@gmail.com\"]"
                ]
            },
            {
                "id": 83,
                "key": 5,
                "date": "26/10/2020",
                "reference_no": "pr-20201027-045611",
                "supplier": null,
                "purchase_status": "<div class=\"badge badge-success\">Received</div>",
                "payment_status": "<div class=\"badge badge-danger\">Due</div>",
                "grand_total": "2.00",
                "paid_amount": "0.00",
                "due": "2.00",
                "options": "<div class=\"btn-group\">\n                            <button type=\"button\" class=\"btn btn-default btn-sm dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Action\n                              <span class=\"caret\"></span>\n                              <span class=\"sr-only\">Toggle Dropdown</span>\n                            </button>\n                            <ul class=\"dropdown-menu edit-options dropdown-menu-right dropdown-default\" user=\"menu\">\n                                <li>\n                                    <button type=\"button\" class=\"btn btn-link view\"><i class=\"fa fa-eye\"></i> View</button>\n                                </li><li>\n                        <a href=\"http://salepropos.com/purchases/83/edit\" class=\"btn btn-link\"><i class=\"dripicons-document-edit\"></i> Edit</a>\n                        </li><li>\n                        <button type=\"button\" class=\"add-payment btn btn-link\" data-id = \"83\" data-toggle=\"modal\" data-target=\"#add-payment\"><i class=\"fa fa-plus\"></i> Add Payment</button>\n                    </li>\n                    <li>\n                        <button type=\"button\" class=\"get-payment btn btn-link\" data-id = \"83\"><i class=\"fa fa-money\"></i> View Payment</button>\n                    </li><form method=\"POST\" action=\"http://salepropos.com/purchases/83\" accept-charset=\"UTF-8\"><input name=\"_method\" type=\"hidden\" value=\"DELETE\"><input name=\"_token\" type=\"hidden\" value=\"Ty3CrPUBV5sNYlydCBnSILkUGVyPFyhnadOrryBE\">\n                            <li>\n                              <button type=\"submit\" class=\"btn btn-link\" onclick=\"return confirmDelete()\"><i class=\"dripicons-trash\"></i> Delete</button> \n                            </li></form>\n                        </ul>\n                    </div>",
                "purchase": [
                    "[ \"26/10/2020\"",
                    " \"pr-20201027-045611\"",
                    " \"Received\"",
                    " \"83\"",
                    " \"warehouse 1\"",
                    " \"2312121\"",
                    " \"khatungonj, chittagong\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"0\"",
                    " \"0\"",
                    " \"2\"",
                    " \"0\"",
                    " \"0\"",
                    " \"\"",
                    " \"\"",
                    " \"2\"",
                    " \"0\"",
                    " \"\"",
                    " \"admin\"",
                    " \"admin@gmail.com\"]"
                ]
            },
            {
                "id": 74,
                "key": 6,
                "date": "23/10/2020",
                "reference_no": "pr-20201024-070201",
                "supplier": "abdullah",
                "purchase_status": "<div class=\"badge badge-success\">Received</div>",
                "payment_status": "<div class=\"badge badge-danger\">Due</div>",
                "grand_total": "41,470.00",
                "paid_amount": "0.00",
                "due": "41,470.00",
                "options": "<div class=\"btn-group\">\n                            <button type=\"button\" class=\"btn btn-default btn-sm dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Action\n                              <span class=\"caret\"></span>\n                              <span class=\"sr-only\">Toggle Dropdown</span>\n                            </button>\n                            <ul class=\"dropdown-menu edit-options dropdown-menu-right dropdown-default\" user=\"menu\">\n                                <li>\n                                    <button type=\"button\" class=\"btn btn-link view\"><i class=\"fa fa-eye\"></i> View</button>\n                                </li><li>\n                        <a href=\"http://salepropos.com/purchases/74/edit\" class=\"btn btn-link\"><i class=\"dripicons-document-edit\"></i> Edit</a>\n                        </li><li>\n                        <button type=\"button\" class=\"add-payment btn btn-link\" data-id = \"74\" data-toggle=\"modal\" data-target=\"#add-payment\"><i class=\"fa fa-plus\"></i> Add Payment</button>\n                    </li>\n                    <li>\n                        <button type=\"button\" class=\"get-payment btn btn-link\" data-id = \"74\"><i class=\"fa fa-money\"></i> View Payment</button>\n                    </li><form method=\"POST\" action=\"http://salepropos.com/purchases/74\" accept-charset=\"UTF-8\"><input name=\"_method\" type=\"hidden\" value=\"DELETE\"><input name=\"_token\" type=\"hidden\" value=\"Ty3CrPUBV5sNYlydCBnSILkUGVyPFyhnadOrryBE\">\n                            <li>\n                              <button type=\"submit\" class=\"btn btn-link\" onclick=\"return confirmDelete()\"><i class=\"dripicons-trash\"></i> Delete</button> \n                            </li></form>\n                        </ul>\n                    </div>",
                "purchase": [
                    "[ \"23/10/2020\"",
                    " \"pr-20201024-070201\"",
                    " \"Received\"",
                    " \"74\"",
                    " \"warehouse 2\"",
                    " \"1234\"",
                    " \"boropul, chittagong\"",
                    " \"abdullah\"",
                    " \"global touch\"",
                    " \"abdullah@globaltouch.com\"",
                    " \"231231\"",
                    " \"fsdfs\"",
                    " \"fsdfs\"",
                    " \"5270\"",
                    " \"0\"",
                    " \"41470\"",
                    " \"0\"",
                    " \"0\"",
                    " \"0\"",
                    " \"0\"",
                    " \"41470\"",
                    " \"0\"",
                    " \"\"",
                    " \"admin\"",
                    " \"admin@gmail.com\"]"
                ]
            },
            {
                "id": 73,
                "key": 7,
                "date": "27/09/2020",
                "reference_no": "pr-20200927-125533",
                "supplier": null,
                "purchase_status": "<div class=\"badge badge-success\">Received</div>",
                "payment_status": "<div class=\"badge badge-danger\">Due</div>",
                "grand_total": "2.00",
                "paid_amount": "0.00",
                "due": "2.00",
                "options": "<div class=\"btn-group\">\n                            <button type=\"button\" class=\"btn btn-default btn-sm dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Action\n                              <span class=\"caret\"></span>\n                              <span class=\"sr-only\">Toggle Dropdown</span>\n                            </button>\n                            <ul class=\"dropdown-menu edit-options dropdown-menu-right dropdown-default\" user=\"menu\">\n                                <li>\n                                    <button type=\"button\" class=\"btn btn-link view\"><i class=\"fa fa-eye\"></i> View</button>\n                                </li><li>\n                        <a href=\"http://salepropos.com/purchases/73/edit\" class=\"btn btn-link\"><i class=\"dripicons-document-edit\"></i> Edit</a>\n                        </li><li>\n                        <button type=\"button\" class=\"add-payment btn btn-link\" data-id = \"73\" data-toggle=\"modal\" data-target=\"#add-payment\"><i class=\"fa fa-plus\"></i> Add Payment</button>\n                    </li>\n                    <li>\n                        <button type=\"button\" class=\"get-payment btn btn-link\" data-id = \"73\"><i class=\"fa fa-money\"></i> View Payment</button>\n                    </li><form method=\"POST\" action=\"http://salepropos.com/purchases/73\" accept-charset=\"UTF-8\"><input name=\"_method\" type=\"hidden\" value=\"DELETE\"><input name=\"_token\" type=\"hidden\" value=\"Ty3CrPUBV5sNYlydCBnSILkUGVyPFyhnadOrryBE\">\n                            <li>\n                              <button type=\"submit\" class=\"btn btn-link\" onclick=\"return confirmDelete()\"><i class=\"dripicons-trash\"></i> Delete</button> \n                            </li></form>\n                        </ul>\n                    </div>",
                "purchase": [
                    "[ \"27/09/2020\"",
                    " \"pr-20200927-125533\"",
                    " \"Received\"",
                    " \"73\"",
                    " \"warehouse 1\"",
                    " \"2312121\"",
                    " \"khatungonj, chittagong\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"\"",
                    " \"0\"",
                    " \"0\"",
                    " \"2\"",
                    " \"0\"",
                    " \"0\"",
                    " \"0\"",
                    " \"0\"",
                    " \"2\"",
                    " \"0\"",
                    " \"\"",
                    " \"admin\"",
                    " \"admin@gmail.com\"]"
                ]
            },
            {
                "id": 72,
                "key": 8,
                "date": "16/08/2020",
                "reference_no": "pr-20200816-100207",
                "supplier": "abdullah",
                "purchase_status": "<div class=\"badge badge-success\">Received</div>",
                "payment_status": "<div class=\"badge badge-danger\">Due</div>",
                "grand_total": "30,750.00",
                "paid_amount": "0.00",
                "due": "30,750.00",
                "options": "<div class=\"btn-group\">\n                            <button type=\"button\" class=\"btn btn-default btn-sm dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Action\n                              <span class=\"caret\"></span>\n                              <span class=\"sr-only\">Toggle Dropdown</span>\n                            </button>\n                            <ul class=\"dropdown-menu edit-options dropdown-menu-right dropdown-default\" user=\"menu\">\n                                <li>\n                                    <button type=\"button\" class=\"btn btn-link view\"><i class=\"fa fa-eye\"></i> View</button>\n                                </li><li>\n                        <a href=\"http://salepropos.com/purchases/72/edit\" class=\"btn btn-link\"><i class=\"dripicons-document-edit\"></i> Edit</a>\n                        </li><li>\n                        <button type=\"button\" class=\"add-payment btn btn-link\" data-id = \"72\" data-toggle=\"modal\" data-target=\"#add-payment\"><i class=\"fa fa-plus\"></i> Add Payment</button>\n                    </li>\n                    <li>\n                        <button type=\"button\" class=\"get-payment btn btn-link\" data-id = \"72\"><i class=\"fa fa-money\"></i> View Payment</button>\n                    </li><form method=\"POST\" action=\"http://salepropos.com/purchases/72\" accept-charset=\"UTF-8\"><input name=\"_method\" type=\"hidden\" value=\"DELETE\"><input name=\"_token\" type=\"hidden\" value=\"Ty3CrPUBV5sNYlydCBnSILkUGVyPFyhnadOrryBE\">\n                            <li>\n                              <button type=\"submit\" class=\"btn btn-link\" onclick=\"return confirmDelete()\"><i class=\"dripicons-trash\"></i> Delete</button> \n                            </li></form>\n                        </ul>\n                    </div>",
                "purchase": [
                    "[ \"16/08/2020\"",
                    " \"pr-20200816-100207\"",
                    " \"Received\"",
                    " \"72\"",
                    " \"warehouse 2\"",
                    " \"1234\"",
                    " \"boropul, chittagong\"",
                    " \"abdullah\"",
                    " \"global touch\"",
                    " \"abdullah@globaltouch.com\"",
                    " \"231231\"",
                    " \"fsdfs\"",
                    " \"fsdfs\"",
                    " \"3750\"",
                    " \"5000\"",
                    " \"28750\"",
                    " \"0\"",
                    " \"0\"",
                    " \"\"",
                    " \"2000\"",
                    " \"30750\"",
                    " \"0\"",
                    " \"\"",
                    " \"admin\"",
                    " \"admin@gmail.com\"]"
                ]
            },
            {
                "id": 71,
                "key": 9,
                "date": "06/04/2020",
                "reference_no": "pr-20200406-073512",
                "supplier": "ismail",
                "purchase_status": "<div class=\"badge badge-success\">Received</div>",
                "payment_status": "<div class=\"badge badge-danger\">Due</div>",
                "grand_total": "3,355.00",
                "paid_amount": "2,000.00",
                "due": "1,355.00",
                "options": "<div class=\"btn-group\">\n                            <button type=\"button\" class=\"btn btn-default btn-sm dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Action\n                              <span class=\"caret\"></span>\n                              <span class=\"sr-only\">Toggle Dropdown</span>\n                            </button>\n                            <ul class=\"dropdown-menu edit-options dropdown-menu-right dropdown-default\" user=\"menu\">\n                                <li>\n                                    <button type=\"button\" class=\"btn btn-link view\"><i class=\"fa fa-eye\"></i> View</button>\n                                </li><li>\n                        <a href=\"http://salepropos.com/purchases/71/edit\" class=\"btn btn-link\"><i class=\"dripicons-document-edit\"></i> Edit</a>\n                        </li><li>\n                        <button type=\"button\" class=\"add-payment btn btn-link\" data-id = \"71\" data-toggle=\"modal\" data-target=\"#add-payment\"><i class=\"fa fa-plus\"></i> Add Payment</button>\n                    </li>\n                    <li>\n                        <button type=\"button\" class=\"get-payment btn btn-link\" data-id = \"71\"><i class=\"fa fa-money\"></i> View Payment</button>\n                    </li><form method=\"POST\" action=\"http://salepropos.com/purchases/71\" accept-charset=\"UTF-8\"><input name=\"_method\" type=\"hidden\" value=\"DELETE\"><input name=\"_token\" type=\"hidden\" value=\"Ty3CrPUBV5sNYlydCBnSILkUGVyPFyhnadOrryBE\">\n                            <li>\n                              <button type=\"submit\" class=\"btn btn-link\" onclick=\"return confirmDelete()\"><i class=\"dripicons-trash\"></i> Delete</button> \n                            </li></form>\n                        </ul>\n                    </div>",
                "purchase": [
                    "[ \"06/04/2020\"",
                    " \"pr-20200406-073512\"",
                    " \"Received\"",
                    " \"71\"",
                    " \"warehouse 2\"",
                    " \"1234\"",
                    " \"boropul, chittagong\"",
                    " \"ismail\"",
                    " \"techbd\"",
                    " \"ismail@test.com\"",
                    " \"23123123\"",
                    " \"mohammadpur\"",
                    " \"dhaka\"",
                    " \"150\"",
                    " \"0\"",
                    " \"3050\"",
                    " \"305\"",
                    " \"10\"",
                    " \"\"",
                    " \"\"",
                    " \"3355\"",
                    " \"2000\"",
                    " \"\"",
                    " \"admin\"",
                    " \"admin@gmail.com\"]"
                ]
            }
        ]
    }
}

mock.onGet("/api/purchases").reply(() => {
    return [200, JSON.parse(JSON.stringify(data.purchases)).data.reverse()];
});

// POST : Add new Item
mock.onPost("/api/purchases/").reply((request) => {

    // Get event from post data
    let item = JSON.parse(request.data).item

    const length = data.purchases.length
    let lastIndex = 0
    if (length) {
        lastIndex = data.purchases[length - 1].id
    }
    item.id = lastIndex + 1

    data.purchases.push(item)

    return [201, { id: item.id }]
})

// Update Product
mock.onPost(/\/api\/data-list\/purchases\/\d+/).reply((request) => {

    const itemId = request.url.substring(request.url.lastIndexOf("/") + 1)

    let item = data.purchases.find((item) => item.id == itemId)
    Object.assign(item, JSON.parse(request.data).item)

    return [200, item]
})

// DELETE: Remove Item
mock.onDelete(/\/api\/data-list\/purchases\/\d+/).reply((request) => {

    const itemId = request.url.substring(request.url.lastIndexOf("/") + 1)

    const itemIndex = data.purchases.findIndex((p) => p.id == itemId)
    data.purchases.splice(itemIndex, 1)
    return [200]
})