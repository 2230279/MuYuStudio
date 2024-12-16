document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // 日期選擇器初始化
    flatpickr("#completion-date", {
        dateFormat: "Y/m/d",
        locale: "zh-tw",
        disableMobile: "true"
    });

    // 日期輸入處理
    const dateInput = document.getElementById('completion-date');
    const hiddenDateInput = document.getElementById('hidden-date');

    if (dateInput && hiddenDateInput) {
        dateInput.addEventListener('click', function() {
            hiddenDateInput.focus();
            hiddenDateInput.click();
        });

        hiddenDateInput.addEventListener('change', function() {
            const date = new Date(this.value);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            dateInput.value = `${year}/${month}/${day}`;
        });
    }

    // 表單驗證函數
    function validateForm() {
        let isValid = true;
        const requiredFields = document.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            let fieldIsValid = true;
            if (field.type === 'radio') {
                const radioGroup = document.querySelectorAll(`input[name="${field.name}"]`);
                fieldIsValid = Array.from(radioGroup).some(radio => radio.checked);
            } else if (field.type === 'select-one') {
                fieldIsValid = field.value !== '';
            } else {
                fieldIsValid = field.value.trim() !== '';
            }

            if (!fieldIsValid) {
                field.classList.add('invalid');
                isValid = false;
            } else {
                field.classList.remove('invalid');
            }
        });

        return isValid;
    }

    // 表單提交事件監聽器
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 執行表單驗證
        if (!validateForm()) {
            formMessage.style.display = 'block';
            formMessage.textContent = '請填寫所有必填欄位。';
            formMessage.style.color = 'red';
            return;
        }
        
        // 準備表單數據
        const formData = new FormData(form);
        
        // 確保「想說的話」欄位正確映射
        const messageField = document.querySelector('[name="entry.273793141"]');
        if (messageField) {
            formData.set('entry.273793141', messageField.value);
        }
        
        // 設置 Google 表單的提交 URL
        form.action = 'https://docs.google.com/forms/d/e/1FAIpQLSevjVunNOVfrEPOJplpthOYQvmmeWV_wpwaF7o52MX8cf9ESw/formResponse';
        form.method = 'POST';
        form.target = '_blank'; // 在新標籤中打開
        
        // 顯示提交中消息
        formMessage.style.display = 'block';
        formMessage.textContent = '正在提交表單，請稍候...';
        formMessage.style.color = 'blue';
        
        // 提交表單
        form.submit();
        
        // 成功提交後的處理
        setTimeout(() => {
            formMessage.textContent = '表單提交成功！我們會盡快與您聯繫。';
            formMessage.style.color = 'green';
            form.reset();
        }, 1000);
    });

    // 返回頂部按鈕功能
    window.onscroll = function() {
        var backToTopBtn = document.getElementById("backToTopBtn");
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    };

    function scrollToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
});
