// ওয়েবসাইটের ওপরের অংশ (Header & Search Bar) তৈরি
const headerHTML = `
<div style="background: #333; padding: 15px; position: sticky; top: 0; z-index: 1000; text-align: center;">
    <h2 style="color: white; margin: 0 0 10px 0;">CKART SHOP</h2>
    <div style="display: flex; justify-content: center; gap: 5px;">
        <input type="text" id="mainSearch" placeholder="প্রোডাক্ট খুঁজুন..." 
               style="width: 80%; max-width: 400px; padding: 10px; border-radius: 20px; border: none; outline: none;">
        <button onclick="globalSearch()" style="padding: 10px 20px; border-radius: 20px; border: none; background: #1a73e8; color: white; cursor: pointer;">খুঁজুন</button>
    </div>
</div>
`;

// এটি অটোমেটিক সব পেজের শুরুতে বসে যাবে
document.body.insertAdjacentHTML('afterbegin', headerHTML);

// গ্লোবাল সার্চ ফাংশন
function globalSearch() {
    const query = document.getElementById('mainSearch').value.toLowerCase();
    if (query.trim() === "") return;
    
    // সার্চ রেজাল্ট পেজে নিয়ে যাবে (ভবিষ্যতের জন্য)
    alert("আপনি খুঁজছেন: " + query + "\\n(সার্চ রেজাল্ট সিস্টেমটি index.html এ অ্যাড করা হচ্ছে...)");
}
