// 获取模态框元素
const lightbox = document.getElementById('lightbox');

// 获取关闭按钮元素
const closeBtn = document.getElementsByClassName('close')[0];

// 获取所有带有类名 'lightbox-trigger' 的图片元素
const images = document.getElementsByClassName('lightbox-trigger');
const lightboxImage = document.getElementById('lightbox-image');

// 为每张图片添加点击事件
for (let i = 0; i < images.length; i++) {
    images[i].addEventListener('click', function() {
        lightbox.style.display = 'block';
        lightboxImage.src = this.src; // 将点击的图片源设置到模态框中
    });
}

// 点击关闭按钮时，隐藏模态框
closeBtn.onclick = function() {
    lightbox.style.display = 'none';
}

// 点击模态框之外的地方时，隐藏模态框
lightbox.onclick = function(event) {
    if (event.target === lightbox) {
        lightbox.style.display = 'none';
    }
}

// 获取回到顶部按钮
const backToTopBtn = document.getElementById('backToTopBtn');

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
};

// 回到顶部功能
function scrollToTop() {
    document.body.scrollTop = 0; // 对于Safari
    document.documentElement.scrollTop = 0; // 对于Chrome、Firefox、IE和Opera
}
