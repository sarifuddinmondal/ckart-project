// Navbar & UI Elements
const uiHTML = `
<div id="top-nav" style="background:#222; color:white; padding:10px; position:sticky; top:0; z-index:1000; font-family:sans-serif;">
    <div style="max-width:1200px; margin:auto; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <a href="index.html" style="color:gold; text-decoration:none; font-size:22px; font-weight:bold;">CKART</a>
        <div style="flex-grow:1; display:flex; max-width:400px;">
            <input type="text" id="gSearch" placeholder="Search..." style="width:100%; padding:8px; border-radius:5px 0 0 5px; border:none;">
            <button onclick="triggerSearch()" style="background:gold; border:none; padding:8px 15px; border-radius:0 5px 5px 0; cursor:pointer;">🔍</button>
        </div>
        <div style="display:flex; gap:15px; align-items:center;">
            <span id="auth-btn"></span>
            <div onclick="toggleCart()" style="position:relative; cursor:pointer; font-size:22px;">
                👜 <span id="cart-count" style="position:absolute; top:-8px; right:-8px; background:red; color:white; border-radius:50%; padding:2px 6px; font-size:12px;">0</span>
            </div>
        </div>
    </div>
</div>

<div id="cartBag" style="position:fixed; right:-350px; top:0; width:320px; height:100%; background:white; box-shadow:-5px 0 15px rgba(0,0,0,0.3); z-index:2000; transition:0.4s; padding:20px; overflow-y:auto; color:#333;">
    <div style="display:flex; justify-content:space-between; border-bottom:1px solid #ddd; padding-bottom:10px;">
        <h3>My Cart Bag</h3>
        <button onclick="toggleCart()" style="background:none; border:none; font-size:25px; cursor:pointer;">&times;</button>
    </div>
    <div id="bagItems" style="margin-top:20px;"></div>
    <div style="border-top:1px solid #ddd; padding-top:15px; margin-top:20px;">
        <h4 id="bagTotal">Total: 0 TK</h4>
        <button onclick="checkout()" style="width:100%; background:green; color:white; padding:12px; border:none; border-radius:5px; font-weight:bold; cursor:pointer;">ORDER NOW</button>
    </div>
</div>

<div id="loginPop" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:3000; justify-content:center; align-items:center; color:#333;">
    <div style="background:white; padding:25px; border-radius:10px; width:90%; max-width:350px; text-align:left;">
        <h3>Consumer Login</h3>
        <input type="number" id="c_mob" placeholder="Mobile Number" style="width:100%; padding:10px; margin:5px 0;">
        <input type="text" id="c_fn" placeholder="First Name" style="width:100%; padding:10px; margin:5px 0;">
        <input type="text" id="c_ln" placeholder="Last Name" style="width:100%; padding:10px; margin:5px 0;">
        <input type="text" id="c_addr" placeholder="Full Address" style="width:100%; padding:10px; margin:5px 0;">
        <input type="number" id="c_pin" placeholder="Pincode" style="width:100%; padding:10px; margin:5px 0;">
        <button onclick="regConsumer()" style="width:100%; background:#e91e63; color:white; padding:12px; border:none; margin-top:10px; cursor:pointer; font-weight:bold;">ENTER & GET ID</button>
        <button onclick="document.getElementById('loginPop').style.display='none'" style="width:100%; background:none; border:none; margin-top:10px; cursor:pointer;">Cancel</button>
    </div>
</div>
`;

document.body.insertAdjacentHTML('afterbegin', uiHTML);

// Logic
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const user = JSON.parse(localStorage.getItem('ckart_user'));

function updateUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const authBtn = document.getElementById('auth-btn');
    if(user) {
        authBtn.innerHTML = `<a href="profile.html" style="color:white; text-decoration:none;">👤 ${user.fname}</a>`;
    } else {
        authBtn.innerHTML = `<button onclick="openLogin()" style="background:none; color:gold; border:1px solid gold; padding:5px 10px; cursor:pointer;">Login</button>`;
    }
}

function openLogin() { document.getElementById('loginPop').style.display='flex'; }
function toggleCart() { 
    const bag = document.getElementById('cartBag');
    bag.style.right = bag.style.right === '0px' ? '-350px' : '0px';
    renderBag();
}

function regConsumer() {
    const cid = "CON" + Math.floor(Math.random() * 10000);
    const data = {
        id: cid,
        mobile: document.getElementById('c_mob').value,
        fname: document.getElementById('c_fn').value,
        lname: document.getElementById('c_ln').value,
        address: document.getElementById('c_addr').value,
        pincode: document.getElementById('c_pin').value
    };
    localStorage.setItem('ckart_user', JSON.stringify(data));
    alert("Login Success! Your ID: " + cid);
    location.reload();
}

function addToCart(p) {
    const exist = cart.find(i => i.code === p.code);
    if(exist) exist.qty++;
    else cart.push({...p, qty: 1});
    localStorage.setItem('cart', JSON.stringify(cart));
    updateUI();
}

function renderBag() {
    const cont = document.getElementById('bagItems');
    let total = 0;
    cont.innerHTML = cart.map((item, i) => {
        total += item.price * item.qty;
        return `<div style="display:flex; justify-content:space-between; margin-bottom:10px; align-items:center;">
            <img src="${item.img}" width="40">
            <div style="flex-grow:1; padding-left:10px;">
                <div style="font-size:12px;">${item.name}</div>
                <button onclick="updateQty(${i},-1)">-</button> ${item.qty} <button onclick="updateQty(${i},1)">+</button>
            </div>
            <b>${item.price * item.qty}</b>
        </div>`;
    }).join('');
    document.getElementById('bagTotal').innerText = "Total: " + total + " TK";
}

function updateQty(i, d) {
    cart[i].qty += d;
    if(cart[i].qty < 1) cart.splice(i,1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderBag();
    updateUI();
}

function checkout() {
    if(!user) { alert("Please Login First!"); openLogin(); return; }
    const oid = "OD" + new Date().getTime();
    alert("Order Placed! ID: " + oid);
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    location.href = "profile.html";
}

window.onload = updateUI;
