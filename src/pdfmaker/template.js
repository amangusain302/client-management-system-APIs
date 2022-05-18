
const invoiceTemplate = (data, invoice_no) => {
    let total_price = 0;
    let template = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap" rel="stylesheet">
    <!-- font awsm -->
    <link rel="preconnect" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    <style>
        * {
            font-family: 'Roboto', sans-serif;
            margin: 0px;
        }
        
        .conatiner {
            
            height: fit-content;
            
        }
        
        
        .set-ol {
            list-style: none;
            background: #8f6d1e;
            padding: 25px 90px;
        }
        
        .set-tr {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
        }
        
        .set-invoice {
            letter-spacing: 10px;
            font-size: 33px;
            font-weight: 700;
            text-align: center;
            /* padding-right: px; */
            margin-bottom: 20px;
        }
        /*  */
        
        .sub-flex {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            flex-direction: column;
        }
        
        .sub-flex div {
            margin-left: 18px;
            
        }
        
        .sub-flex1 div {
            margin-left: 18px;
        }
        
        .sub-flex1 {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
        }
        
        .main-flex {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
        }
        
        .style-none ol {
            list-style: none;
            background-color: #2c89c7;
            padding: 30px 70px 30px 10px;
            width: 80%;
            color: white;
        }
        
        .set-logo img {
            width: 185px;
            position: relative;
            top: 10%;
            margin: 25px 0px 20px 0;
            left: 2%;
            
        }
        
        .set-table {
            margin: 50px 7%;
        }
        
        .detail-flex {
            display: flex;
        }
        
        .set-tab th {
            width: 25vw;
            text-align: center;
        }
        
        table {
            border-collapse: collapse;
        }
        
        .set-td {
            text-align: center;
        }
        
        .set-td td {
            /* padding: 14px 10px; */
            padding: 10px 20px;
            border-bottom: 0.1px solid grey;
        }
        
        .set-tr1 th {
            border-bottom: 2px solid grey;
            padding: 10px 20px;
            color: #1a7fc3;
        }
        
        
        .last-tr {
            text-align: center;
        }
        
        .pay-flex {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
        
        .grand-total th {
            background: #1a7fc3;
            color: white;
            margin: 20px;
            padding: 10px 20px;
        }
        
        .tab-2 tr td {
            padding: 2px 20px;
        }
        
        .terms p {
            width: 100%;
            font-size: 13px;
            font-weight: 300;
        }
        
        .footer {
            /* position: relative; */
            margin: 20px 0px 0px 0px;
            top: 40px;
            align-items: center;
            display: flex;
            justify-content: space-between;
        }
        
        .esign img {
            margin: 25px 0px 0px 0px;
            height: 70px;
            width: auto;
        }
    </style>
</head>

<body>
    <div class="conatiner">
        <div class="set-logo">
            <img src="https://www.dooranddocksolutionsinc.com/images/logo.webp" alt="Logo">
            <div class="main-flex">
                <div class="style-none">
                    <ol>
                        <li>Door and Dock Solutions, Inc</li>
                        <li>1530 Greensmark Dr</li>
                        <li>#671825</li>
                        <li>Houston, TX 77267
                        </li>
                    </ol>
                </div>
                <div>
                    <div class="set-invoice">INVOICE</div>
                    <div class="detail-flex">
                        <div class="sub-flex">
                            <div>Invoice Number</div>
                            <div>203</div>
                        </div>
                        <div class="sub-flex">
                            <div>Invoice Date</div>
                            <div>9/05/2022</div>
                        </div>
                        <div class="sub-flex">
                            <div>Project</div>
                            <div>A233DHUJDH</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="set-table">


            <table class="set-tab">
                <div class="table-head">
                    <h3>
                        DETAILS :-
                    </h3>
                </div>
                <tbody>
                    <tr class="set-tr1">
                        <th>
                            ITEM NAME
                        </th>

                        <th>
                            DISCRIPTIONS
                        </th>
                        <th>
                            UNIT PRICE
                        </th>
                        <th>
                            QTY
                        </th>
                        <th>
                            TOTAL
                        </th>
                    </tr>

                    <tr class="set-td">
                        <td>
                            Item 1
                        </td>
                        <td>
                            good & service
                        </td>
                        <td>
                            1201
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            1201
                        </td>
                    </tr>
                    <tr class="set-td">
                        <td>
                            Item 1
                        </td>
                        <td>
                            good & service
                        </td>
                        <td>
                            1201
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            1201
                        </td>
                    </tr>
                    <tr class="set-td">
                        <td>
                            Item 1
                        </td>
                        <td>
                            good & service
                        </td>
                        <td>
                            1201
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            1201
                        </td>
                    </tr>
                    <tr class="set-td">
                        <td>
                            Item 1
                        </td>
                        <td>
                            good & service
                        </td>
                        <td>
                            1201
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            1201
                        </td>
                    </tr>
                    <tr class="set-td">
                        <td>
                            Item 1
                        </td>
                        <td>
                            good & service
                        </td>
                        <td>
                            1201
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            1201
                        </td>
                    </tr>
                    <tr class="set-td">
                        <td>
                            Item 1
                        </td>
                        <td>
                            good & service
                        </td>
                        <td>
                            1201
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            1201
                        </td>
                    </tr>
                    <tr class="set-td">
                        <td>
                            Item 1
                        </td>
                        <td>
                            good & service
                        </td>
                        <td>
                            1201
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            1201
                        </td>
                    </tr>
                    <tr class="set-td">
                        <td>
                            Item 1
                        </td>
                        <td>
                            good & service
                        </td>
                        <td>
                            1201
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            1201
                        </td>
                    </tr>

                    <tr class="last-tr" bgcolor="#2C89C7">
                        <td><strong style="color: white;">SUB TOTAL </strong></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><strong style="color: white;">$1201</strong></td>
                    </tr>
                </tbody>
            </table>
            <h3 style="margin:25px 0px -15px 0px;">SHIP TO</h3>
            <div class="pay-flex">
                <div class="ppay">

                    <strong>
                        Name:- &nbsp;&nbsp;&nbsp;
                        </stong>XYZ<br>
                        <strong>
                            Address:-
                            </stong>Noida, Uttar pardesh, India
                </div>
                <div>
                    <table class="tab-2">
                        <tr>
                            <td>Sales Tax (8.25%)</td>
                            <td>$1300</td>

                        </tr>
                        <br />
                        <br />
                        <tr class="grand-total">
                            <th>
                                GRAND TOTAL
                            </th>
                            <th>
                                $1300
                            </th>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="terms">
                <h3>TERMS & CONDITION</h3>
                <P>
                    PLEASE REVIEW OUR STANDARD TERMS AND CONDITIONS FOR OUR LATEST<br> AGREEMENT INFO:<br>
                    <a href="https://www.dooranddocksolutionsinc.com/standard-terms-and-conditions.html">https://www.dooranddocksolutionsinc.com/standard-terms-and-conditions.html</a>
                </P>
            </div>
            <div class="esign">
                <img src="https://www.freepnglogos.com/uploads/signature-png/nguy-ecnh-nguyen-van-binh-signature-png-5.png" alt="E-Signature">
            </div>
            <div class="footer">
                <div class="sign">
                    <h2>THOMAS EALSOM</h2>
                    <h4>Director</h4>
                </div>
                <div class="fontss">
                    <ul>
                        <li>
                            <i class="fas fa-phone-alt"></i> 832-232-9150
                        </li>
                        <li>
                            sales@dooranddock.co
                        </li>
                        <li>                          <a href="https://dooranddocksolutionsinc.com" >dooranddocksolutionsinc website</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>


</body>

</html>
    `;
    return template;
}
module.exports = invoiceTemplate;