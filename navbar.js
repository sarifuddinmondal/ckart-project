// নেভিগেশন বার এবং সার্চ বারের ডিজাইন
const navHTML = `
<div style="background: #222; padding: 15px; position: sticky; top: 0; z-index: 1000; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">
    <div style="max-width: 1200px; margin: auto; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 10px;">
        
        <div style="display: flex; gap: 20px; align-items: center;">
            <a href="index.html" style="color: white; text-decoration: none; font-size: 24px; font-weight: bold;">CKART</a>
            <a href="index.html" style="color: #ddd; text-decoration: none; font-size: 16px;">Home</a>
        </div>

        <div style="flex-grow: 1; display: flex; justify-content: center; max-width: 500px;">
            <input type="text" id="globalSearchInput" placeholder="সব ক্যাটাগরিতে প্রোডাক্ট খুঁজুন..." 
                   style="width: 100%; padding: 10px 15px; border-radius: 20px 0 0 20px; border: none; outline: none;">
            <button onclick="triggerSearch()" style="padding: 10px 20px; border-radius: 0 20px 20px 0; border: none; background: #1a73e8; color: white; cursor: pointer; font-weight: bold;">খুঁজুন</button>
        </div>

        <div>
            <a href="admin.html" style="color: white; text-decoration: none; background: #444; padding: 8px 15px; border-radius: 5px; font-size: 14px; border: 1px solid #666;">Login / Admin</a>
        </div>
    </div>
</div>
`;

// সব পেজের শুরুতে এটি বসিয়ে দেবে
document.body.insertAdjacentHTML('afterbegin', navHTML);

// সার্চ ট্রিগার করার ফাংশন
function triggerSearch() {
    const query = document.getElementById('globalSearchInput').value.trim();
    if (typeof searchAllCategories === "function") {
        searchAllCategories(query);
    } else {
        window.location.href = "index.html?search=" + encodeURIComponent(query);
    }
}
