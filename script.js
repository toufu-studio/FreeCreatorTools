document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById("imageInput");
    const compressButton = document.getElementById("compressButton");
    const compressedImage = document.getElementById("compressedImage");
    const downloadButton = document.getElementById("downloadButton");
    const imagePreview = document.getElementById("imagePreview");

    const qualitySlider = document.getElementById('qualitySlider');
    const qualityValue = document.getElementById('qualityValue'); // 品質表示

    document.getElementById("compressButton").addEventListener("click", function () {
        document.getElementById("noimage").classList.add("hidden");
    });
        
    compressButton.addEventListener("click", function () {
        if (imageInput.files.length > 0) {
            const imageFile = imageInput.files[0];
            const reader = new FileReader();

            reader.onload = function () {
                const originalImage = new Image();
                originalImage.src = reader.result;

                originalImage.onload = function () {
                    // 画像を指定サイズにリサイズ
                    const maxWidth = 500; // リサイズ後の最大幅
                    const maxHeight = 500; // リサイズ後の最大高さ

                    let width = originalImage.width;
                    let height = originalImage.height;

                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }

                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }

                    const canvas = document.createElement("canvas");
                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(originalImage, 0, 0, width, height);

                    // スライダーの値を取得
                    const sliderValue = parseFloat(qualitySlider.value); 

                    // 圧縮された画像を取得 (JPEG形式)
                    const compressedImageData = canvas.toDataURL("image/jpeg", sliderValue); //sildervalue=スライダーの値

                    // 圧縮後の画像を表示
                    compressedImage.src = compressedImageData;

                    // ダウンロードボタンを有効にする
                    downloadButton.disabled = false;
                };
            };

            reader.readAsDataURL(imageFile);
        }
    });

    // スライダーの値をリアルタイムで監視
    qualitySlider.addEventListener('input', function() {
        // スライダーの値を取得
        const sliderValue = parseFloat(qualitySlider.value);
        // 品質の値を表示
        qualityValue.textContent = sliderValue.toFixed(2);
    });

    //圧縮ボタンの有効化
    imageInput.addEventListener("change", function () {
        if (imageInput.files.length > 0) {
            compressButton.removeAttribute("disabled");
        } else {
            compressButton.setAttribute("disabled", "true");
        }

        document.getElementById("noimage1").classList.add("hidden");
    });

    //圧縮後画像のダウンロード
    downloadButton.addEventListener("click", function () {
        const a = document.createElement("a");
        a.href = compressedImage.src;
        a.download = "compressed_image.jpg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    //圧縮前画像の表示
    imageInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const image = document.createElement("img");
                image.src = e.target.result;
                image.alt = "選択した画像";
                imagePreview.innerHTML = "";
                imagePreview.appendChild(image);
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.innerHTML = "選択した画像がありません。";
        }
    });

    // script.js
document.querySelector('.column').addEventListener('click', function() {
    // 別のページに遷移
    window.location.href = '別のページのURL.html'; // リンク先のURLを指定してください
});

});
