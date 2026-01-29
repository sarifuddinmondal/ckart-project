// cpu.js - ID জেনারেশন এবং ডেটা প্রসেসিং ইউনিট

export const CPU = {
    // অর্ডার আইডি তৈরি (CK + তারিখ + সময়)
    generateOrderID: () => {
        const now = new Date();
        const datePart = now.toLocaleDateString('en-GB').replace(/\//g, ''); // DDMMYYYY
        const timePart = now.getHours().toString().padStart(2, '0') + 
                         now.getMinutes().toString().padStart(2, '0');
        return `CK${datePart}${timePart}`;
    },

    // কাস্টমার আইডি তৈরি (র‍্যান্ডম ৮ ডিজিট)
    generateConsumerID: () => {
        return Math.floor(10000000 + Math.random() * 90000000);
    },

    // ওটিপি জেনারেশন (৬ ডিজিট)
    generateOTP: () => {
        return Math.floor(100000 + Math.random() * 900000);
    }
};
