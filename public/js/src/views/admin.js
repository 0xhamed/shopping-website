export const adminV = (user) => {
    let lists = ''
    if (user.role === 'admin') lists = `
            <a class="list-group-item list-group-item-action" onclick="getUsers()" data-toggle="list"
            href="#list-users">- Users</a>
            
            <a class="list-group-item list-group-item-action" onclick="getProducts()" data-toggle="list"
            href="#list-products">- Products</a>
            `
    else if (user.role === 'mod') lists = `
            <a class="list-group-item list-group-item-action" onclick="getProducts()" data-toggle="list"
            href="#list-products">- Products</a>
            `

    return `
    <div class="container mt-5 d-none" id="page-container">
    <div class="row">
        <div class="col-12 col-lg-2">
            <div class="list-group">
                <a class="list-group-item list-group-item-action active" data-toggle="list" href="#profile"
                    _id="${user._id}" onclick="getProfile(this)">-
                    Profile</a>
                ${lists}  
                <a class="list-group-item list-group-item-action" data-toggle="list" href="#order"
                    _id="${user._id}" onclick="getOrders(this)">-
                    Orders</a> 
            </div>
        </div>

        <div class="col-lg-10">
            <div class="tab-content mt-lg-0 mt-3" id="nav-tabContent">
                <div class="row">
                    <div class="col col-md-6 offset-md-3 text-center">
                        <div class="alert" hidden>

                        </div>
                    </div>
                </div>

                <div class="loading d-none" id="profile-load">
                    <div class="spinner-border spinner"></div>
                </div>

                <!-- profile -->
                <div class="tab-pane fade show active" id="profile">
                    <div class="row">
                        <div class="col col-md-6 offset-md-3">
                            <button class="btn btn-primary address mb-3" data-toggle="modal"
                                data-target="#add-address-modal" _id="${user._id}"
                                onclick="getAddress(this)">Add/Edit Address</button>

                            <form id="profile-form">


                                <div class="form-group">
                                    <input type="text" class="form-control" name="name" placeholder="Full Name" required
                                        autofocus value="${user.name}">
                                </div>

                                <div class="form-group">
                                    <input type="email" class="form-control" name="email" placeholder="Email address"
                                        required autocomplete="email" value="${user.email}">
                                </div>

                                <div class="form-group">
                                    <input type="text" class="form-control" name="role" value="${user.role}"
                                        disabled>
                                </div>

                                <div class="form-group">
                                    <input type="password" class="form-control" name="password" required
                                        placeholder="Old Password" required>
                                </div>

                                <div class="form-group">
                                    <input type="password" class="form-control" name="newPassword"
                                        placeholder="New Password">
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control" name="cpassword"
                                        placeholder="Confirm Password">
                                </div>

                                <div class="form-group">
                                    <button class="btn btn-lg btn-primary btn-block" _id="${user._id}"
                                        onclick="editProfile(this)" type="submit">Submit</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                <!-- /profile -->

                <!-- products -->
                <div class="tab-pane fade" id="list-products">
                    <button class="btn btn-primary" data-toggle="modal" onclick="addProduct()"
                        data-target="#add-product-modal">Add
                        Product</button>

                    <table class="table table-striped mt-4 ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Date</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>

                        <tbody id="products-table-body">
                            <!-- products content -->
                        </tbody>
                    </table>

                </div>
                <!-- /products -->

                <!-- users -->
                <div class="tab-pane fade" id="list-users">
                    <button class="btn btn-primary" onclick="addUser()" data-toggle="modal"
                        data-target="#add-user-modal">Add
                        User</button>
                        
                    <table class="table table-striped mt-4">

                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Id</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>

                        <tbody id="users-table-body">
                            <!-- users content -->
                        </tbody>

                    </table>
                </div>
                <!-- /users -->

                
                <!-- orders -->
                <div class="tab-pane fade" id="order">
                        
                    <table class="table table-striped mt-4">

                        <thead>
                            <tr>
                                
                                <th scope="col">Products</th>  
                                <th scope="col">Order</th>
   ${user.role === 'admin' || user.role === 'mod' ? '<th scope="col">PaymentId</th>' : ''}  
                                 <th scope="col">Total</th>
   ${user.role === 'admin' || user.role === 'mod' ? '<th scope="col">Email</th>' : ''}  
                                <th scope="col">Address</th>
                                <th scope="col">Status</th>
   ${user.role === 'admin' || user.role === 'mod' ? '<th scope="col"></th>' : ''}  

                            </tr>
                        </thead>

                        <tbody id="orders-table-body">
                    
                            <!-- orders content -->
                        </tbody>

                    </table>
                </div>
                <!-- /orders -->



                <!-- add-products-modal -->
                <div class="modal fade" id="add-product-modal" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Add Product</h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div class="modal-body">
                                <form id="add-product-form">

                                    <div class="form-group">
                                        <label>Product Name</label>
                                        <input type="text" class="form-control" name="name"
                                            placeholder="Enter Product Name" required>
                                    </div>

                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col">
                                                <label>Product Price</label>
                                                <input type="text" class="form-control" name="price"
                                                    placeholder="Enter Product Price" required>
                                                <small class="form-text text-muted ml-2"> *only
                                                    numbers</small>
                                            </div>
                                            <div class="col">
                                                <label>Discounted Price</label>
                                                <input type="text" class="form-control" name="dprice"
                                                    placeholder="Enter Discounted Price">
                                                <small class="form-text text-muted ml-2"> *not
                                                    required</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label>Product Image</label>
                                        <input type="file" class="form-control-file" name="image" accept="image/*"
                                            required>
                                    </div>

                                    <div class="form-group">
                                        <label>Product Description</label>
                                        <textarea class="form-control" name="description" rows="5" required></textarea>
                                    </div>

                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /add-products-modal -->


                <!-- edit-products-modal -->
                <div class="modal fade" id="edit-product-modal" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Edit Product</h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div class="modal-body">
                                <form id="edit-product-form">

                                    <div class="form-group">
                                        <label>Product ID</label>
                                        <input type="text" class="form-control form-control-inline" disabled name="_id">
                                    </div>

                                    <div class="form-group">
                                        <label>Product Name</label>
                                        <input type="text" class="form-control" name="name" required
                                            placeholder="Enter Product Name">
                                    </div>

                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col">
                                                <label>Product Price</label>
                                                <input type="text" class="form-control" name="price" required
                                                    placeholder="Enter Product Price">
                                                <small class="form-text text-muted ml-2"> *only numbers</small>
                                            </div>
                                            <div class="col">
                                                <label>Discounted Price</label>
                                                <input type="text" class="form-control" name="dprice"
                                                    placeholder="Enter Discounted Price">
                                                <small class="form-text text-muted ml-2"> *not
                                                    required</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label>Product Image</label>
                                        <input type="file" class="form-control-file" name="image" accept="image/*">
                                        <small class="form-text text-muted ml-2"> *png/jpeg & max 300kb</small>
                                    </div>

                                    <div class="form-group">
                                        <label>Product Description</label>
                                        <textarea class="form-control" name="description" required rows="5"></textarea>
                                    </div>

                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /edit-products-modal -->


                <!-- add-user-modal -->
                <div class="modal fade" id="add-user-modal" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Add User</h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div class="modal-body">
                                <form id="add-user-form">

                                    <div class="form-group">
                                        <label>Name</label>
                                        <input type="text" class="form-control" name="name" required
                                            placeholder="Enter User Name">
                                    </div>

                                    <div class="form-group">
                                        <label>Email</label>
                                        <input type="email" class="form-control" name="email" required
                                            placeholder="Enter User Email">
                                    </div>

                                    <div class="form-group">
                                        <label>Password</label>
                                        <input type="password" class="form-control" name="password" required
                                            placeholder="Enter User password">
                                    </div>

                                    <div class="form-group">
                                        <label>Confirm Password</label>
                                        <input type="password" class="form-control" name="cpassword" required
                                            placeholder="Confirm User password">
                                    </div>

                                    <div class="form-group">
                                        <label class="d-block">Role</label>
                                        <select name="role" class="btn btn-secondary">
                                            <option value="user">user</option>
                                            <option value="mod">mod</option>
                                            <option value="admin">admin</option>
                                        </select>

                                    </div>

                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /add-user-modal -->


                <!-- edit-user-modal -->
                <div class="modal fade" id="edit-user-modal" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Edit User</h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div class="modal-body">
                                <form id="edit-user-form">

                                    <div class="form-group">
                                        <label>Id</label>
                                        <input type="text" class="form-control form-control-inline" disabled name="_id">
                                    </div>

                                    <div class="form-group">
                                        <label>Name</label>
                                        <input type="text" class="form-control" name="name" required
                                            placeholder="Enter User Name">
                                    </div>

                                    <div class="form-group">
                                        <label>Email</label>
                                        <input type="text" class="form-control" name="email" required
                                            placeholder="Enter User Email">
                                    </div>

                                    <div class="form-group">
                                        <label class="d-block">Role</label>
                                        <select name="role" class="btn btn-secondary">
                                            <option value="user">user</option>
                                            <option value="mod">mod</option>
                                            <option value="admin">admin</option>
                                        </select>

                                    </div>

                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /edit-user-modal -->



                <!-- add-address-modal -->
                <div class="modal fade" id="add-address-modal" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Add/Edit Address</h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div class="modal-body">
                                <form id="address-form">
                                    <div class="form-group">
                                        <label>Full Name</label>
                                        <input type="text" class="form-control" name="name" placeholder="Full Name"
                                            required>
                                    </div>

                                    <div class="form-group">
                                        <label>Street Address</label>
                                        <input type="text" class="form-control" name="street"
                                            placeholder="Street address, P.O. box, company name, c/o" required>
                                    </div>

                                    <div class="form-group">
                                        <label>City</label>
                                        <input type="text" class="form-control" name="city" placeholder="City" required>
                                    </div>

                                    <div class="form-group">
                                        <label>Zip Code</label>
                                        <input type="text" class="form-control" name="zip" placeholder="Zip Code"
                                            required>
                                    </div>

                                    <div class="form-group">
                                        <label>Country</label>
                                        <select class="form-control" name="country" value="co">
                                            <option selected="selected">Select country</option>
                                            <option value="AF">Afghanistan</option>
                                            <option value="AL">Albania</option>
                                            <option value="DZ">Algeria</option>
                                            <option value="AS">American Samoa</option>
                                            <option value="AD">Andorra</option>
                                            <option value="AO">Angola</option>
                                            <option value="AI">Anguilla</option>
                                            <option value="AQ">Antarctica</option>
                                            <option value="AG">Antigua and Barbuda</option>
                                            <option value="AR">Argentina</option>
                                            <option value="AM">Armenia</option>
                                            <option value="AW">Aruba</option>
                                            <option value="AU">Australia</option>
                                            <option value="AT">Austria</option>
                                            <option value="AZ">Azerbaijan</option>
                                            <option value="BS">Bahamas</option>
                                            <option value="BH">Bahrain</option>
                                            <option value="BD">Bangladesh</option>
                                            <option value="BB">Barbados</option>
                                            <option value="BY">Belarus</option>
                                            <option value="BE">Belgium</option>
                                            <option value="BZ">Belize</option>
                                            <option value="BJ">Benin</option>
                                            <option value="BM">Bermuda</option>
                                            <option value="BT">Bhutan</option>
                                            <option value="BO">Bolivia</option>
                                            <option value="BA">Bosnia and Herzegowina</option>
                                            <option value="BW">Botswana</option>
                                            <option value="BV">Bouvet Island</option>
                                            <option value="BR">Brazil</option>
                                            <option value="IO">British Indian Ocean Territory</option>
                                            <option value="BN">Brunei Darussalam</option>
                                            <option value="BG">Bulgaria</option>
                                            <option value="BF">Burkina Faso</option>
                                            <option value="BI">Burundi</option>
                                            <option value="KH">Cambodia</option>
                                            <option value="CM">Cameroon</option>
                                            <option value="CA">Canada</option>
                                            <option value="CV">Cape Verde</option>
                                            <option value="KY">Cayman Islands</option>
                                            <option value="CF">Central African Republic</option>
                                            <option value="TD">Chad</option>
                                            <option value="CL">Chile</option>
                                            <option value="CN">China</option>
                                            <option value="CX">Christmas Island</option>
                                            <option value="CC">Cocos (Keeling) Islands</option>
                                            <option value="CO">Colombia</option>
                                            <option value="KM">Comoros</option>
                                            <option value="CG">Congo</option>
                                            <option value="CD">Congo, the Democratic Republic of the</option>
                                            <option value="CK">Cook Islands</option>
                                            <option value="CR">Costa Rica</option>
                                            <option value="CI">Cote d'Ivoire</option>
                                            <option value="HR">Croatia (Hrvatska)</option>
                                            <option value="CU">Cuba</option>
                                            <option value="CY">Cyprus</option>
                                            <option value="CZ">Czech Republic</option>
                                            <option value="DK">Denmark</option>
                                            <option value="DJ">Djibouti</option>
                                            <option value="DM">Dominica</option>
                                            <option value="DO">Dominican Republic</option>
                                            <option value="TP">East Timor</option>
                                            <option value="EC">Ecuador</option>
                                            <option value="EG">Egypt</option>
                                            <option value="SV">El Salvador</option>
                                            <option value="GQ">Equatorial Guinea</option>
                                            <option value="ER">Eritrea</option>
                                            <option value="EE">Estonia</option>
                                            <option value="ET">Ethiopia</option>
                                            <option value="FK">Falkland Islands (Malvinas)</option>
                                            <option value="FO">Faroe Islands</option>
                                            <option value="FJ">Fiji</option>
                                            <option value="FI">Finland</option>
                                            <option value="FR">France</option>
                                            <option value="FX">France, Metropolitan</option>
                                            <option value="GF">French Guiana</option>
                                            <option value="PF">French Polynesia</option>
                                            <option value="TF">French Southern Territories</option>
                                            <option value="GA">Gabon</option>
                                            <option value="GM">Gambia</option>
                                            <option value="GE">Georgia</option>
                                            <option value="DE">Germany</option>
                                            <option value="GH">Ghana</option>
                                            <option value="GI">Gibraltar</option>
                                            <option value="GR">Greece</option>
                                            <option value="GL">Greenland</option>
                                            <option value="GD">Grenada</option>
                                            <option value="GP">Guadeloupe</option>
                                            <option value="GU">Guam</option>
                                            <option value="GT">Guatemala</option>
                                            <option value="GN">Guinea</option>
                                            <option value="GW">Guinea-Bissau</option>
                                            <option value="GY">Guyana</option>
                                            <option value="HT">Haiti</option>
                                            <option value="HM">Heard and Mc Donald Islands</option>
                                            <option value="VA">Holy See (Vatican City State)</option>
                                            <option value="HN">Honduras</option>
                                            <option value="HK">Hong Kong</option>
                                            <option value="HU">Hungary</option>
                                            <option value="IS">Iceland</option>
                                            <option value="IN">India</option>
                                            <option value="ID">Indonesia</option>
                                            <option value="IR">Iran (Islamic Republic of)</option>
                                            <option value="IQ">Iraq</option>
                                            <option value="IE">Ireland</option>
                                            <option value="IL">Israel</option>
                                            <option value="IT">Italy</option>
                                            <option value="JM">Jamaica</option>
                                            <option value="JP">Japan</option>
                                            <option value="JO">Jordan</option>
                                            <option value="KZ">Kazakhstan</option>
                                            <option value="KE">Kenya</option>
                                            <option value="KI">Kiribati</option>
                                            <option value="KP">Korea, Democratic People's Republic of</option>
                                            <option value="KR">Korea, Republic of</option>
                                            <option value="KW">Kuwait</option>
                                            <option value="KG">Kyrgyzstan</option>
                                            <option value="LA">Lao People's Democratic Republic</option>
                                            <option value="LV">Latvia</option>
                                            <option value="LB">Lebanon</option>
                                            <option value="LS">Lesotho</option>
                                            <option value="LR">Liberia</option>
                                            <option value="LY">Libyan Arab Jamahiriya</option>
                                            <option value="LI">Liechtenstein</option>
                                            <option value="LT">Lithuania</option>
                                            <option value="LU">Luxembourg</option>
                                            <option value="MO">Macau</option>
                                            <option value="MK">Macedonia, The Former Yugoslav Republic of</option>
                                            <option value="MG">Madagascar</option>
                                            <option value="MW">Malawi</option>
                                            <option value="MY">Malaysia</option>
                                            <option value="MV">Maldives</option>
                                            <option value="ML">Mali</option>
                                            <option value="MT">Malta</option>
                                            <option value="MH">Marshall Islands</option>
                                            <option value="MQ">Martinique</option>
                                            <option value="MR">Mauritania</option>
                                            <option value="MU">Mauritius</option>
                                            <option value="YT">Mayotte</option>
                                            <option value="MX">Mexico</option>
                                            <option value="FM">Micronesia, Federated States of</option>
                                            <option value="MD">Moldova, Republic of</option>
                                            <option value="MC">Monaco</option>
                                            <option value="MN">Mongolia</option>
                                            <option value="MS">Montserrat</option>
                                            <option value="MA">Morocco</option>
                                            <option value="MZ">Mozambique</option>
                                            <option value="MM">Myanmar</option>
                                            <option value="NA">Namibia</option>
                                            <option value="NR">Nauru</option>
                                            <option value="NP">Nepal</option>
                                            <option value="NL">Netherlands</option>
                                            <option value="AN">Netherlands Antilles</option>
                                            <option value="NC">New Caledonia</option>
                                            <option value="NZ">New Zealand</option>
                                            <option value="NI">Nicaragua</option>
                                            <option value="NE">Niger</option>
                                            <option value="NG">Nigeria</option>
                                            <option value="NU">Niue</option>
                                            <option value="NF">Norfolk Island</option>
                                            <option value="MP">Northern Mariana Islands</option>
                                            <option value="NO">Norway</option>
                                            <option value="OM">Oman</option>
                                            <option value="PK">Pakistan</option>
                                            <option value="PW">Palau</option>
                                            <option value="PA">Panama</option>
                                            <option value="PG">Papua New Guinea</option>
                                            <option value="PY">Paraguay</option>
                                            <option value="PE">Peru</option>
                                            <option value="PH">Philippines</option>
                                            <option value="PN">Pitcairn</option>
                                            <option value="PL">Poland</option>
                                            <option value="PT">Portugal</option>
                                            <option value="PR">Puerto Rico</option>
                                            <option value="QA">Qatar</option>
                                            <option value="RE">Reunion</option>
                                            <option value="RO">Romania</option>
                                            <option value="RU">Russian Federation</option>
                                            <option value="RW">Rwanda</option>
                                            <option value="KN">Saint Kitts and Nevis</option>
                                            <option value="LC">Saint LUCIA</option>
                                            <option value="VC">Saint Vincent and the Grenadines</option>
                                            <option value="WS">Samoa</option>
                                            <option value="SM">San Marino</option>
                                            <option value="ST">Sao Tome and Principe</option>
                                            <option value="SA">Saudi Arabia</option>
                                            <option value="SN">Senegal</option>
                                            <option value="SC">Seychelles</option>
                                            <option value="SL">Sierra Leone</option>
                                            <option value="SG">Singapore</option>
                                            <option value="SK">Slovakia (Slovak Republic)</option>
                                            <option value="SI">Slovenia</option>
                                            <option value="SB">Solomon Islands</option>
                                            <option value="SO">Somalia</option>
                                            <option value="ZA">South Africa</option>
                                            <option value="GS">South Georgia and the South Sandwich Islands</option>
                                            <option value="ES">Spain</option>
                                            <option value="LK">Sri Lanka</option>
                                            <option value="SH">St. Helena</option>
                                            <option value="PM">St. Pierre and Miquelon</option>
                                            <option value="SD">Sudan</option>
                                            <option value="SR">Suriname</option>
                                            <option value="SJ">Svalbard and Jan Mayen Islands</option>
                                            <option value="SZ">Swaziland</option>
                                            <option value="SE">Sweden</option>
                                            <option value="CH">Switzerland</option>
                                            <option value="SY">Syrian Arab Republic</option>
                                            <option value="TW">Taiwan, Province of China</option>
                                            <option value="TJ">Tajikistan</option>
                                            <option value="TZ">Tanzania, United Republic of</option>
                                            <option value="TH">Thailand</option>
                                            <option value="TG">Togo</option>
                                            <option value="TK">Tokelau</option>
                                            <option value="TO">Tonga</option>
                                            <option value="TT">Trinidad and Tobago</option>
                                            <option value="TN">Tunisia</option>
                                            <option value="TR">Turkey</option>
                                            <option value="TM">Turkmenistan</option>
                                            <option value="TC">Turks and Caicos Islands</option>
                                            <option value="TV">Tuvalu</option>
                                            <option value="UG">Uganda</option>
                                            <option value="UA">Ukraine</option>
                                            <option value="AE">United Arab Emirates</option>
                                            <option value="GB">United Kingdom</option>
                                            <option value="US">United States</option>
                                            <option value="UM">United States Minor Outlying Islands</option>
                                            <option value="UY">Uruguay</option>
                                            <option value="UZ">Uzbekistan</option>
                                            <option value="VU">Vanuatu</option>
                                            <option value="VE">Venezuela</option>
                                            <option value="VN">Viet Nam</option>
                                            <option value="VG">Virgin Islands (British)</option>
                                            <option value="VI">Virgin Islands (U.S.)</option>
                                            <option value="WF">Wallis and Futuna Islands</option>
                                            <option value="EH">Western Sahara</option>
                                            <option value="YE">Yemen</option>
                                            <option value="YU">Yugoslavia</option>
                                            <option value="ZM">Zambia</option>
                                            <option value="ZW">Zimbabwe</option>
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
                <!-- /add-address-modal -->

            </div>
        </div>
    </div>
</div>

<div class="container pcontainer d-flex justify-content-center">
    <ul class="pagination d-none">
        <li class="page-item disabled">
            <a class="page-link">
                &laquo;
            </a>
        </li>
        <!-- pages-content -->
        <li class="page-item last">
            <a class="page-link">
                &raquo;
            </a>
        </li>
    </ul>
</div>
    
    `
}