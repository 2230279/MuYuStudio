function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

document.addEventListener('DOMContentLoaded', function() {
    var firstTab = document.querySelector('.tab-button');
    if (firstTab) {
        firstTab.click();
    }

    // 處理表單提交
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // 表單提交處理
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            console.log("表單驗證失敗");
            formMessage.style.display = 'block';
            formMessage.textContent = '請填寫所有必填欄位。';
            formMessage.style.color = 'red';
            return;
        }
        
        console.log("表單驗證通過，準備提交");
        const formData = new FormData(form);

        // 確保「想說的話」欄位正確映射
        const messageField = document.querySelector('[name="entry.273793141"]');
        if (messageField) {
            formData.set('entry.273793141', messageField.value);
        }

        // 在提交前，讓我們檢查並打印所有要提交的數據
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        const url = 'https://docs.google.com/forms/d/e/1FAIpQLSevjVunNOVfrEPOJplpthOYQvmmeWV_wpwaF7o52MX8cf9ESw/formResponse';
        
        // 使用fetch提交前，確保所有數據都正確映射
        formMessage.style.display = 'block';
        formMessage.textContent = '正在提交表單，請稍候...';
        formMessage.style.color = 'blue';

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            console.log('表單提交成功');
            formMessage.textContent = '表單提交成功！我們會盡快與您聯繫。';
            formMessage.style.color = 'green';
            form.reset();
        })
        .catch(error => {
            console.error('表單提交失敗:', error);
            let errorMessage;
            if (error instanceof TypeError) {
                errorMessage = '網絡連接失敗，請檢查您的網絡並稍後再試。';
            } else {
                errorMessage = '表單提交失敗，請稍後再試。';
            }
            formMessage.textContent = errorMessage;
            formMessage.style.color = 'red';
        });
    });

    // 處理日期輸入
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

    // 初始化 Flatpickr
    flatpickr("#completion-date", {
        dateFormat: "Y/m/d",
        locale: "zh_tw",
        disableMobile: "true"
    });
});

// 滚动到顶部按钮功能
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    var backToTopBtn = document.getElementById("backToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

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
            console.log(`Field "${field.name}" is not valid`);
            isValid = false;
        }
    });

    if (!isValid) {
        console.log("Form validation failed");
    } else {
        console.log("Form validation passed");
    }

    return isValid;
}
