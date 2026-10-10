// ============================================================
// STEGOART - COMPLETE SCRIPT
// IMAGE + TEXT + AUDIO STEGANOGRAPHY
// ============================================================

document.addEventListener("DOMContentLoaded", () =>{
    // ========================================================
// STEGOART LOGIN + DIGITAL SIGNATURE
// ========================================================


// --------------------------------------------------------
// LOGIN ELEMENTS
// --------------------------------------------------------

const loginScreen =
    document.getElementById("loginScreen");

const loginUserId =
    document.getElementById("loginUserId");

const loginPassword =
    document.getElementById("loginPassword");

const loginPasswordToggle =
    document.getElementById(
        "loginPasswordToggle"
    );

const loginBtn =
    document.getElementById("loginBtn");

const loginMessage =
    document.getElementById("loginMessage");

const digitalSignature =
    document.getElementById(
        "digitalSignature"
    );

const clearSignatureBtn =
    document.getElementById(
        "clearSignatureBtn"
    );


// --------------------------------------------------------
// DEMO LOGIN CREDENTIALS
// --------------------------------------------------------

const STEGOART_USER_ID = "stegoart";

const STEGOART_PASSWORD = "csc2026";


// --------------------------------------------------------
// PASSWORD SHOW / HIDE
// --------------------------------------------------------

if (loginPasswordToggle) {

    loginPasswordToggle.addEventListener(
        "click",
        () => {

            if (
                loginPassword.type ===
                "password"
            ) {

                loginPassword.type =
                    "text";

                loginPasswordToggle.textContent =
                    "HIDE";

            } else {

                loginPassword.type =
                    "password";

                loginPasswordToggle.textContent =
                    "SHOW";
            }

        }
    );

}


// --------------------------------------------------------
// DIGITAL SIGNATURE DRAWING
// --------------------------------------------------------

let signatureDrawing = false;

let signatureHasData = false;


if (digitalSignature) {

    const canvas =
        digitalSignature;

    const ctx =
        canvas.getContext("2d");


    function getSignaturePosition(event) {

        const rect =
            canvas.getBoundingClientRect();

        let clientX;
        let clientY;


        if (
            event.touches &&
            event.touches.length
        ) {

            clientX =
                event.touches[0].clientX;

            clientY =
                event.touches[0].clientY;

        } else {

            clientX =
                event.clientX;

            clientY =
                event.clientY;

        }


        return {

            x:
                (
                    clientX -
                    rect.left
                ) *
                (
                    canvas.width /
                    rect.width
                ),

            y:
                (
                    clientY -
                    rect.top
                ) *
                (
                    canvas.height /
                    rect.height
                )
        };

    }


    function startSignature(event) {

        event.preventDefault();

        signatureDrawing = true;

        signatureHasData = true;

        canvas.parentElement.classList.add(
            "signed"
        );


        const pos =
            getSignaturePosition(
                event
            );

        ctx.beginPath();

        ctx.moveTo(
            pos.x,
            pos.y
        );

    }


    function drawSignature(event) {

        if (!signatureDrawing) return;

        event.preventDefault();


        const pos =
            getSignaturePosition(
                event
            );


        ctx.lineWidth = 2.5;

        ctx.lineCap = "round";

        ctx.lineJoin = "round";

        ctx.strokeStyle =
            "#00d9ff";


        ctx.lineTo(
            pos.x,
            pos.y
        );

        ctx.stroke();

        ctx.beginPath();

        ctx.moveTo(
            pos.x,
            pos.y
        );

    }


    function stopSignature(event) {

        if (event) {

            event.preventDefault();

        }

        signatureDrawing = false;

        ctx.beginPath();

    }


    // Mouse

    canvas.addEventListener(
        "mousedown",
        startSignature
    );

    canvas.addEventListener(
        "mousemove",
        drawSignature
    );

    canvas.addEventListener(
        "mouseup",
        stopSignature
    );

    canvas.addEventListener(
        "mouseleave",
        stopSignature
    );


    // Touch

    canvas.addEventListener(
        "touchstart",
        startSignature,
        { passive: false }
    );

    canvas.addEventListener(
        "touchmove",
        drawSignature,
        { passive: false }
    );

    canvas.addEventListener(
        "touchend",
        stopSignature,
        { passive: false }
    );

}


// --------------------------------------------------------
// CLEAR SIGNATURE
// --------------------------------------------------------

if (clearSignatureBtn) {

    clearSignatureBtn.addEventListener(
        "click",
        () => {

            if (!digitalSignature) return;


            const ctx =
                digitalSignature
                    .getContext("2d");


            ctx.clearRect(
                0,
                0,
                digitalSignature.width,
                digitalSignature.height
            );


            signatureHasData = false;


            digitalSignature
                .parentElement
                .classList.remove(
                    "signed"
                );

        }
    );

}


// --------------------------------------------------------
// LOGIN FUNCTION
// --------------------------------------------------------

if (loginBtn) {

    loginBtn.addEventListener(
        "click",
        () => {

            const userId =
                loginUserId
                    ? loginUserId.value.trim()
                    : "";

            const password =
                loginPassword
                    ? loginPassword.value
                    : "";


            // Check User ID

            if (!userId) {

                showLoginMessage(
                    "⚠ Please enter your User ID.",
                    "error"
                );

                loginUserId.focus();

                return;

            }


            // Check Password

            if (!password) {

                showLoginMessage(
                    "⚠ Please enter your password.",
                    "error"
                );

                loginPassword.focus();

                return;

            }


            // Check Signature

            if (!signatureHasData) {

                showLoginMessage(
                    "⚠ Please provide your digital signature.",
                    "error"
                );

                return;

            }


            // Disable button

            loginBtn.disabled = true;

            loginBtn.textContent =
                "AUTHENTICATING...";


            // Small authentication delay

            setTimeout(
                () => {

                    if (
                        userId ===
                        STEGOART_USER_ID &&
                        password ===
                        STEGOART_PASSWORD
                    ) {

                        // SUCCESS

                        showLoginMessage(
                            "✓ ACCESS GRANTED",
                            "success"
                        );


                        loginBtn.textContent =
                            "✓ AUTHENTICATED";
                            const accessGrantedScreen =
    document.getElementById(
        "accessGrantedScreen"
    );

const accessUserName =
    document.getElementById(
        "accessUserName"
    );

if (accessUserName) {

    accessUserName.textContent =
        userId.toUpperCase();

}

if (accessGrantedScreen) {

    accessGrantedScreen.classList.add(
        "show"
    );

}
                          setTimeout(
    () => {

        loginScreen.style.display =
            "none";

    },
    900
);  
setTimeout(
    () => {

        if (accessGrantedScreen) {

            accessGrantedScreen.style.opacity =
                "0";

            accessGrantedScreen.style.transition =
                "opacity 0.5s ease";

        }

    },
    2800
);


setTimeout(
    () => {

        if (accessGrantedScreen) {

            accessGrantedScreen.style.display =
                "none";

        }

    },
    3400
);


                        

                    } else {

                        // FAILED

                        showLoginMessage(
                            "❌ Invalid User ID or Password.",
                            "error"
                        );


                        loginBtn.disabled =
                            false;

                        loginBtn.textContent =
                            "🔐 AUTHENTICATE";

                    }

                },
                700
            );

        }
    );

}


// --------------------------------------------------------
// LOGIN MESSAGE
// --------------------------------------------------------

function showLoginMessage(
    message,
    type
) {

    if (!loginMessage) return;


    loginMessage.textContent =
        message;


    if (type === "success") {

        loginMessage.style.color =
            "#6ee7b7";

    } else {

        loginMessage.style.color =
            "#ff6b6b";

    }

}
    function startScanAnimation(element) {
    if (!element) return;

    element.classList.add("scan-animation", "scanning");
}

function stopScanAnimation(element) {
    if (!element) return;

    element.classList.remove("scan-animation");
    element.classList.remove("scanning");
}
    // =========================================
// SCAN ANIMATION HELPERS
// =========================================

function stopScanAnimation(element) {
    if (!element) return;

    element.classList.remove("scan-animation");
    element.classList.remove("scanning");
}

    // ========================================================
    // ELEMENTS
    // ========================================================

    const encodeImage = document.getElementById("encodeImage");
    const decodeImage = document.getElementById("decodeImage");

    const encodePreview = document.getElementById("encodePreview");
    const decodePreview = document.getElementById("decodePreview");
    const encodedPreview = document.getElementById("encodedPreview");

    const fileName = document.getElementById("fileName");
    const imageDimensions = document.getElementById("imageDimensions");
    const imageCapacity = document.getElementById("imageCapacity");

    const secretMessage = document.getElementById("secretMessage");
    const encryptionPassword = document.getElementById("encryptionPassword");
    const decodePassword = document.getElementById("decodePassword");

    const togglePassword = document.getElementById("togglePassword");
    const toggleDecodePassword =
        document.getElementById("toggleDecodePassword");

    const encodeBtn = document.getElementById("encodeBtn");
    const decodeBtn = document.getElementById("decodeBtn");
    const downloadBtn = document.getElementById("downloadBtn");

    const clearEncodeBtn = document.getElementById("clearEncodeBtn");
    const clearDecodeBtn = document.getElementById("clearDecodeBtn");

    const decodedText = document.getElementById("decodedText");
    const characterCount = document.getElementById("characterCount");

    const capacityFill = document.getElementById("capacityFill");
    const capacityText = document.getElementById("capacityText");

    const processStatus = document.getElementById("processStatus");
    const decodeStatus = document.getElementById("decodeStatus");

    // AI SMART HIDING
    const smartHidingToggle = document.getElementById("smartHidingToggle");
    const smartModeStatus = document.getElementById("smartModeStatus");
    const smartAnalysis = document.getElementById("smartAnalysis");
    const smartAnalysisStatus = document.getElementById("smartAnalysisStatus");
    const smartRegionCount = document.getElementById("smartRegionCount");
    const smartStrategy = document.getElementById("smartStrategy");

    // TEXT
    const coverText = document.getElementById("coverText");
    const hiddenText = document.getElementById("hiddenText");
    const encodeTextBtn = document.getElementById("encodeTextBtn");
    const encodedTextResult = document.getElementById("encodedTextResult");
    const encodedTextInput = document.getElementById("encodedTextInput");
    const decodeTextBtn = document.getElementById("decodeTextBtn");
    const decodedTextResult = document.getElementById("decodedTextResult");

    // AUDIO
    const encodeAudio = document.getElementById("encodeAudio");
    const audioSecretMessage =
        document.getElementById("audioSecretMessage");
    const audioPassword = document.getElementById("audioPassword");
    const toggleAudioPassword =
        document.getElementById("toggleAudioPassword");
    const encodeAudioBtn =
        document.getElementById("encodeAudioBtn");
    const audioEncodeResult =
        document.getElementById("audioEncodeResult");
    const downloadAudioBtn =
        document.getElementById("downloadAudioBtn");

    const decodeAudio = document.getElementById("decodeAudio");
    const decodeAudioPassword =
        document.getElementById("decodeAudioPassword");
    const toggleDecodeAudioPassword =
        document.getElementById("toggleDecodeAudioPassword");
    const decodeAudioBtn =
        document.getElementById("decodeAudioBtn");
    const decodedAudioMessage =
        document.getElementById("decodedAudioMessage");
            // VIDEO
    const encodeVideo =
        document.getElementById("encodeVideo");

    const encodeVideoPreview =
        document.getElementById("encodeVideoPreview");

    const videoSecretMessage =
        document.getElementById("videoSecretMessage");

    const videoPassword =
        document.getElementById("videoPassword");

    const toggleVideoPassword =
        document.getElementById("toggleVideoPassword");

    const encodeVideoBtn =
        document.getElementById("encodeVideoBtn");

    const videoEncodeResult =
        document.getElementById("videoEncodeResult");

    const downloadVideoBtn =
        document.getElementById("downloadVideoBtn");

    const decodeVideo =
        document.getElementById("decodeVideo");

    const decodeVideoPreview =
        document.getElementById("decodeVideoPreview");

    const decodeVideoPassword =
        document.getElementById("decodeVideoPassword");

    const toggleDecodeVideoPassword =
        document.getElementById(
            "toggleDecodeVideoPassword"
        );

    const decodeVideoBtn =
        document.getElementById("decodeVideoBtn");

    const decodedVideoMessage =
        document.getElementById("decodedVideoMessage");


    // ========================================================
    // GENERAL HELPERS
    // ========================================================

    function setText(element, text) {
        if (element) element.textContent = text;
    }

    function setValue(element, text) {
        if (element) element.value = text;
    }

    function showPreview(file, container) {

        if (!file || !container) return;

        const reader = new FileReader();

        reader.onload = function () {

            container.innerHTML = "";

            const img = document.createElement("img");

            img.src = reader.result;
            img.alt = "Preview";

            img.style.maxWidth = "100%";
            img.style.maxHeight = "300px";
            img.style.objectFit = "contain";

            container.appendChild(img);
        };

        reader.readAsDataURL(file);
    }


    function setupPasswordToggle(input, button) {

        if (!input || !button) return;

        button.addEventListener("click", () => {

            if (input.type === "password") {
                input.type = "text";
                button.textContent = "HIDE";
            } else {
                input.type = "password";
                button.textContent = "SHOW";
            }
        });
    }


    setupPasswordToggle(
        encryptionPassword,
        togglePassword
    );

    setupPasswordToggle(
        decodePassword,
        toggleDecodePassword
    );

    setupPasswordToggle(
        audioPassword,
        toggleAudioPassword
    );

    setupPasswordToggle(
        decodeAudioPassword,
        toggleDecodeAudioPassword
    );
        setupPasswordToggle(
        videoPassword,
        toggleVideoPassword
    );

    setupPasswordToggle(
        decodeVideoPassword,
        toggleDecodeVideoPassword
    );


    // ========================================================
    // CHARACTER COUNT
    // ========================================================

    if (secretMessage && characterCount) {

        secretMessage.addEventListener("input", () => {

            const count = secretMessage.value.length;

            characterCount.textContent =
                `${count} character${count === 1 ? "" : "s"}`;

            updateCapacity();
        });
    }


    // ========================================================
    // IMAGE LOADING
    // ========================================================

    let encodeImageData = null;
    let decodeImageData = null;
    let encodedCanvas = null;


    function loadImageFile(file, callback) {

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function () {

            const img = new Image();

            img.onload = function () {

                const canvas =
                    document.createElement("canvas");

                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext("2d");

                ctx.drawImage(
                    img,
                    0,
                    0
                );

                const imageData =
                    ctx.getImageData(
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );

                callback({
                    canvas,
                    imageData,
                    width: img.width,
                    height: img.height
                });
            };

            img.src = reader.result;
        };

        reader.readAsDataURL(file);
    }


    if (encodeImage) {

        encodeImage.addEventListener("change", () => {

            const file = encodeImage.files[0];

            if (!file) return;

            if (fileName)
                fileName.textContent = file.name;

            showPreview(
                file,
                encodePreview
            );

            loadImageFile(
                file,
                data => {

                    encodeImageData = data;

                    if (smartHidingToggle && smartHidingToggle.checked) {
                        analyzeSmartImage(data.imageData);
                    }

                    if (imageDimensions) {

                        imageDimensions.textContent =
                            `${data.width} × ${data.height}`;
                    }

                    updateCapacity();
                }
            );
        });
    }


    if (decodeImage) {

        decodeImage.addEventListener("change", () => {

            const file = decodeImage.files[0];

            if (!file) return;

            showPreview(
                file,
                decodePreview
            );

            loadImageFile(
                file,
                data => {
                    decodeImageData = data;
                }
            );
        });
    }


    // ========================================================
    // IMAGE CAPACITY
    // ========================================================

    function updateCapacity() {

        if (!encodeImageData) return;

        const pixels =
            encodeImageData.width *
            encodeImageData.height;

        const capacityBytes =
            Math.floor(
                (pixels * 3) / 8
            );

        const capacityChars =
            Math.max(
                0,
                capacityBytes - 32
            );

        if (imageCapacity) {

            imageCapacity.textContent =
                `${capacityChars.toLocaleString()} characters`;
        }

        if (capacityText) {

            const used =
                secretMessage
                    ? secretMessage.value.length
                    : 0;

            capacityText.textContent =
                `${used} / ${capacityChars} characters`;
        }

        if (capacityFill) {

            const used =
                secretMessage
                    ? secretMessage.value.length
                    : 0;

            const percent =
                capacityChars > 0
                    ? Math.min(
                        100,
                        (used / capacityChars) * 100
                    )
                    : 0;

            capacityFill.style.width =
                percent + "%";
        }
    }


    // ========================================================
    // UTF-8 HELPERS
    // ========================================================

    function textToBytes(text) {

        return new TextEncoder().encode(text);
    }


    function bytesToText(bytes) {

        return new TextDecoder().decode(bytes);
    }


    function numberToBytes(number) {

        return new Uint8Array([
            (number >>> 24) & 255,
            (number >>> 16) & 255,
            (number >>> 8) & 255,
            number & 255
        ]);
    }


    function bytesToNumber(bytes) {

        return (
            bytes[0] * 16777216 +
            bytes[1] * 65536 +
            bytes[2] * 256 +
            bytes[3]
        );
    }


    function bytesToBits(bytes) {

        const bits = [];

        for (const byte of bytes) {

            for (let i = 7; i >= 0; i--) {

                bits.push(
                    (byte >> i) & 1
                );
            }
        }

        return bits;
    }


    function bitsToBytes(bits) {

        const result =
            new Uint8Array(
                Math.floor(bits.length / 8)
            );

        for (
            let i = 0;
            i < result.length;
            i++
        ) {

            let value = 0;

            for (let j = 0; j < 8; j++) {

                value =
                    (value << 1) |
                    bits[i * 8 + j];
            }

            result[i] = value;
        }

        return result;
    }


    // ========================================================
    // PASSWORD ENCRYPTION
    // ========================================================

    async function deriveKey(password, salt) {

        const material =
            await crypto.subtle.importKey(
                "raw",
                textToBytes(password),
                "PBKDF2",
                false,
                ["deriveKey"]
            );

        return crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt,
                iterations: 100000,
                hash: "SHA-256"
            },
            material,
            {
                name: "AES-GCM",
                length: 256
            },
            false,
            ["encrypt", "decrypt"]
        );
    }


    async function encryptMessage(message, password) {

        const salt =
            crypto.getRandomValues(
                new Uint8Array(16)
            );

        const iv =
            crypto.getRandomValues(
                new Uint8Array(12)
            );

        const key =
            await deriveKey(
                password,
                salt
            );

        const encrypted =
            await crypto.subtle.encrypt(
                {
                    name: "AES-GCM",
                    iv
                },
                key,
                textToBytes(message)
            );

        const output =
            new Uint8Array(
                28 + encrypted.byteLength
            );

        output.set(
            salt,
            0
        );

        output.set(
            iv,
            16
        );

        output.set(
            new Uint8Array(encrypted),
            28
        );

        return output;
    }


    async function decryptMessage(data, password) {

        if (data.length < 29) {

            throw new Error(
                "Invalid hidden message."
            );
        }

        const salt =
            data.slice(
                0,
                16
            );

        const iv =
            data.slice(
                16,
                28
            );

        const encrypted =
            data.slice(
                28
            );

        const key =
            await deriveKey(
                password,
                salt
            );

        const decrypted =
            await crypto.subtle.decrypt(
                {
                    name: "AES-GCM",
                    iv
                },
                key,
                encrypted
            );

        return bytesToText(
            new Uint8Array(decrypted)
        );
    }


    // ========================================================
    // ========================================================
// IMAGE STEGANOGRAPHY - MATCHED ENCODE / DECODE
// ========================================================

const IMAGE_MAGIC = "STGA";
const SMART_MARKER = "A";


// --------------------------------------------------------
// AI SMART HIDING HELPERS
// --------------------------------------------------------

function getAdaptivePixelOrder(imageData) {

    const { data, width, height } = imageData;
    const scores = new Array(width * height);

    function luminanceAt(x, y) {
        const i = (y * width + x) * 4;
        // Ignore the two lowest bits so the ranking stays stable
        // after StegoArt modifies LSBs during encoding.
        const r = data[i] >> 2;
        const g = data[i + 1] >> 2;
        const b = data[i + 2] >> 2;
        return (299 * r + 587 * g + 114 * b) / 1000;
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = y * width + x;
            const current = luminanceAt(x, y);
            const right = x + 1 < width ? luminanceAt(x + 1, y) : current;
            const down = y + 1 < height ? luminanceAt(x, y + 1) : current;
            scores[index] = {
                index,
                score: Math.abs(current - right) + Math.abs(current - down)
            };
        }
    }

    // Higher texture/detail first. The first three pixels are reserved
    // for the smart-mode marker so the decoder can identify the format.
    return scores
        .filter(item => item.index > 2)
        .sort((a, b) => b.score - a.score)
        .map(item => item.index);
}

function analyzeSmartImage(data) {
    if (!data) return;

    const order = getAdaptivePixelOrder(data);
    const selected = Math.max(1, Math.floor(order.length * 0.30));

    if (smartAnalysis) smartAnalysis.hidden = false;
    if (smartAnalysisStatus) smartAnalysisStatus.textContent = "ANALYSIS COMPLETE";
    if (smartRegionCount) smartRegionCount.textContent = `${selected.toLocaleString()} regions`;
    if (smartStrategy) smartStrategy.textContent = "High-detail adaptive embedding";
}

function setSmartMode(enabled) {
    if (smartModeStatus) {
        smartModeStatus.textContent = enabled ? "AI SMART" : "STANDARD";
    }

    if (smartAnalysis) {
        smartAnalysis.hidden = !enabled;
    }

    if (enabled && encodeImageData) {
        analyzeSmartImage(encodeImageData.imageData);
    }
}

if (smartHidingToggle) {
    smartHidingToggle.addEventListener("change", () => {
        setSmartMode(smartHidingToggle.checked);
        if (encodeBtn) {
            encodeBtn.textContent = smartHidingToggle.checked
                ? "🤖 AI SMART ENCODE"
                : "🔐 ENCODE MESSAGE";
        }
    });
}


// --------------------------------------------------------
// IMAGE ENCODE
// --------------------------------------------------------

if (encodeBtn) {

    encodeBtn.addEventListener("click", async () => {

        try {

            if (!encodeImageData) {
                throw new Error("Please select an image first.");
            }

            const message = secretMessage ? secretMessage.value : "";
            if (!message.trim()) {
                throw new Error("Please enter a secret message.");
            }

            const password = encryptionPassword ? encryptionPassword.value : "";
            if (!password) {
                throw new Error("Please enter an encryption password.");
            }

            const smartMode = Boolean(smartHidingToggle && smartHidingToggle.checked);

            encodeBtn.disabled = true;
            encodeBtn.textContent = smartMode ? "🤖 ANALYZING IMAGE..." : "ENCODING...";
            startScanAnimation(encodePreview);

            if (smartMode && processStatus) {
                processStatus.textContent = "🤖 Analyzing image texture and selecting adaptive hiding regions...";
            }

            const encrypted = await encryptMessage(message, password);

            const magic = new TextEncoder().encode(IMAGE_MAGIC);
            const length = numberToBytes(encrypted.length);
            const payload = new Uint8Array(8 + encrypted.length);

            payload.set(magic, 0);
            payload.set(length, 4);
            payload.set(encrypted, 8);

            const source = encodeImageData.imageData;
            const originalPixels = new Uint8ClampedArray(source.data);
            const pixels = source.data;
            const availablePixels = Math.floor(pixels.length / 4);

            let bitIndex = 0;

            if (smartMode) {
                const payloadBits = bytesToBits(payload);
                const baseOrder = getAdaptivePixelOrder(source);

                if (payloadBits.length > baseOrder.length * 3) {
                    throw new Error("Message is too large for AI Smart Hiding mode.");
                }

                // AI Smart Hiding feedback loop:
                // create several adaptive candidates, run the detector on each,
                // and keep the candidate with the lowest estimated detectability.
                const candidateOffsets = [0, 120, 300, 600];
                let best = null;

                for (let attempt = 0; attempt < candidateOffsets.length; attempt++) {
                    source.data.set(originalPixels);

                    const markerBits = bytesToBits(new TextEncoder().encode(SMART_MARKER));
                    for (let i = 0; i < markerBits.length; i++) {
                        const pixelIndex = Math.floor(i / 3);
                        const channel = i % 3;
                        const offset = pixelIndex * 4 + channel;
                        pixels[offset] = (pixels[offset] & 254) | markerBits[i];
                    }

                    const shift = candidateOffsets[attempt] % Math.max(1, baseOrder.length);
                    const order = baseOrder.slice(shift).concat(baseOrder.slice(0, shift));
                    bitIndex = 0;

                    for (let p = 0; p < order.length && bitIndex < payloadBits.length; p++) {
                        const pixelIndex = order[p];
                        const offset = pixelIndex * 4;
                        for (let channel = 0; channel < 3 && bitIndex < payloadBits.length; channel++) {
                            pixels[offset + channel] = (pixels[offset + channel] & 254) | payloadBits[bitIndex++];
                        }
                    }

                    const candidateResult = typeof detectorAnalyze === "function"
                        ? detectorAnalyze(pixels, true)
                        : { probability: 50, lsbScore: 50, channelScore: 50 };

                    if (processStatus) {
                        processStatus.textContent = `🤖 Smart candidate ${attempt + 1}/${candidateOffsets.length} checked: ${candidateResult.probability}% estimated detectability.`;
                    }

                    if (!best || candidateResult.probability < best.result.probability) {
                        best = { result: candidateResult, pixels: new Uint8ClampedArray(pixels) };
                    }
                }

                source.data.set(best.pixels);

                if (smartAnalysisStatus) smartAnalysisStatus.textContent = `ML FEEDBACK COMPLETE • ${best.result.probability}% ESTIMATED DETECTABILITY`;
                if (processStatus) processStatus.textContent = `✓ AI Smart Hiding selected the lowest-detectability candidate (${best.result.probability}%).`;

            } else {
                const bits = bytesToBits(payload);
                const availableBits = Math.floor(pixels.length / 4) * 3;

                if (bits.length > availableBits) {
                    throw new Error("Message is too large for this image.");
                }

                for (let i = 0; i < pixels.length && bitIndex < bits.length; i += 4) {
                    pixels[i] = (pixels[i] & 254) | bits[bitIndex++];
                    if (bitIndex < bits.length) pixels[i + 1] = (pixels[i + 1] & 254) | bits[bitIndex++];
                    if (bitIndex < bits.length) pixels[i + 2] = (pixels[i + 2] & 254) | bits[bitIndex++];
                }

                if (processStatus) processStatus.textContent = "✓ Message successfully hidden in the image.";
            }

            const canvas = encodeImageData.canvas;
            const ctx = canvas.getContext("2d");
            ctx.putImageData(source, 0, 0);
            encodedCanvas = canvas;

            const dataURL = canvas.toDataURL("image/png");

            if (encodedPreview) {
                encodedPreview.innerHTML = "";
                const img = document.createElement("img");
                img.src = dataURL;
                img.style.maxWidth = "100%";
                img.style.maxHeight = "300px";
                img.style.objectFit = "contain";
                encodedPreview.appendChild(img);
            }

            if (downloadBtn) {
                downloadBtn.style.display = "inline-block";
                downloadBtn.onclick = () => {
                    const link = document.createElement("a");
                    link.href = dataURL;
                    link.download = smartMode
                        ? "StegoArt_AI_Smart_Encoded.png"
                        : "StegoArt_Encoded.png";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                };
            }

            encodeBtn.textContent = smartMode ? "✓ AI SMART ENCODED" : "✓ ENCODED";

        } catch (error) {

            console.error("IMAGE ENCODE ERROR:", error);
            if (processStatus) processStatus.textContent = "❌ " + error.message;

        } finally {

            setTimeout(() => stopScanAnimation(encodePreview), 800);
            encodeBtn.disabled = false;
            encodeBtn.textContent = smartHidingToggle && smartHidingToggle.checked
                ? "🤖 AI SMART ENCODE"
                : "🔐 ENCODE MESSAGE";
        }

    });

}


// --------------------------------------------------------
// IMAGE DECODE
// --------------------------------------------------------

if (decodeBtn) {

    decodeBtn.addEventListener("click", async () => {

        try {

            if (!decodeImageData) {
                throw new Error("Please select the encoded PNG image.");
            }

            const password = decodePassword ? decodePassword.value : "";
            if (!password) {
                throw new Error("Please enter the password.");
            }

            decodeBtn.disabled = true;
            decodeBtn.textContent = "DECODING...";
            startScanAnimation(decodePreview);

            const pixels = decodeImageData.imageData.data;

            // The first 8 bits identify the format. Old StegoArt images
            // start with 'S' because their magic is STGA. Smart images use 'A'.
            const markerBits = [];
            for (let i = 0; i < 8; i++) {
                markerBits.push(pixels[Math.floor(i / 3) * 4 + (i % 3)] & 1);
            }
            const marker = bytesToText(bitsToBytes(markerBits));

            let bits = [];
            let header;
            let encryptedLength;
            let startBit;

            if (marker === SMART_MARKER) {
                const order = getAdaptivePixelOrder(decodeImageData.imageData);

                const smartHeaderBits = [];
                for (let p = 0; p < order.length && smartHeaderBits.length < 64; p++) {
                    const offset = order[p] * 4;
                    smartHeaderBits.push(pixels[offset] & 1);
                    if (smartHeaderBits.length < 64) smartHeaderBits.push(pixels[offset + 1] & 1);
                    if (smartHeaderBits.length < 64) smartHeaderBits.push(pixels[offset + 2] & 1);
                }

                header = bitsToBytes(smartHeaderBits.slice(0, 64));

                const magic = bytesToText(header.slice(0, 4));
                if (magic !== IMAGE_MAGIC) {
                    throw new Error("No valid StegoArt Smart Hiding data detected.");
                }

                encryptedLength = bytesToNumber(header.slice(4, 8));

                const totalBitsNeeded = encryptedLength * 8;
                const payloadBits = [];
                let consumed = 0;

                for (let p = 0; p < order.length && consumed < 64 + totalBitsNeeded; p++) {
                    const offset = order[p] * 4;
                    for (let channel = 0; channel < 3 && consumed < 64 + totalBitsNeeded; channel++) {
                        if (consumed >= 64) payloadBits.push(pixels[offset + channel] & 1);
                        consumed++;
                    }
                }

                if (payloadBits.length < totalBitsNeeded) {
                    throw new Error("The Smart Hiding payload is incomplete.");
                }

                bits = payloadBits;
                startBit = 0;

            } else {
                // Existing standard StegoArt images remain fully compatible.
                for (let i = 0; i < pixels.length; i += 4) {
                    bits.push(pixels[i] & 1);
                    bits.push(pixels[i + 1] & 1);
                    bits.push(pixels[i + 2] & 1);
                }

                if (bits.length < 64) throw new Error("Image does not contain enough data.");

                header = bitsToBytes(bits.slice(0, 64));
                const magic = bytesToText(header.slice(0, 4));
                if (magic !== IMAGE_MAGIC) {
                    throw new Error("No hidden StegoArt message detected. Select the encoded PNG produced by StegoArt.");
                }

                encryptedLength = bytesToNumber(header.slice(4, 8));
                startBit = 64;
            }

            if (!Number.isFinite(encryptedLength) || encryptedLength <= 0) {
                throw new Error("Invalid hidden message data.");
            }

            const encrypted = bitsToBytes(
                bits.slice(startBit, startBit + encryptedLength * 8)
            );

            const message = await decryptMessage(encrypted, password);

            if (decodedText) decodedText.textContent = message;
            if (decodeStatus) {
                decodeStatus.textContent = marker === SMART_MARKER
                    ? "✓ Smart Hiding message decoded successfully."
                    : "✓ Secret message decoded successfully.";
            }

        } catch (error) {

            console.error("IMAGE DECODE ERROR:", error);
            if (decodedText) decodedText.textContent = "No hidden message detected yet.";
            if (decodeStatus) decodeStatus.textContent = "❌ " + error.message;

        } finally {
            setTimeout(() => stopScanAnimation(decodePreview), 800);
            decodeBtn.disabled = false;
            decodeBtn.textContent = "🔓 DECODE MESSAGE";
        }

    });

}


        // ========================================================
    // CLEAR IMAGE ENCODE
    // ========================================================

    if (clearEncodeBtn) {

        clearEncodeBtn.addEventListener("click", () => {

            if (encodeImage)
                encodeImage.value = "";

            if (secretMessage)
                secretMessage.value = "";

            if (encryptionPassword)
                encryptionPassword.value = "";

            if (encodePreview)
                encodePreview.innerHTML = "";

            if (encodedPreview)
                encodedPreview.innerHTML = "";

            if (fileName)
                fileName.textContent = "";

            if (imageDimensions)
                imageDimensions.textContent = "";

            if (imageCapacity)
                imageCapacity.textContent = "";

            if (smartHidingToggle) {
                smartHidingToggle.checked = false;
                setSmartMode(false);
            }

            if (characterCount)
                characterCount.textContent = "0 characters";

            if (capacityText)
                capacityText.textContent =
                    "0 / 0 characters";

            if (capacityFill)
                capacityFill.style.width = "0%";

            if (processStatus)
                processStatus.textContent = "";

            encodeImageData = null;
            encodedCanvas = null;
        });
    }


    // ========================================================
    // CLEAR IMAGE DECODE
    // ========================================================

    if (clearDecodeBtn) {

        clearDecodeBtn.addEventListener("click", () => {

            if (decodeImage)
                decodeImage.value = "";

            if (decodePassword)
                decodePassword.value = "";

            if (decodePreview)
                decodePreview.innerHTML = "";

            if (decodedText)
                decodedText.textContent = "No hidden message detected yet.";

            if (decodeStatus)
                decodeStatus.textContent = "";

            decodeImageData = null;
        });
    }


    // ========================================================
    // TEXT STEGANOGRAPHY
    // ========================================================

    const TEXT_START = "\u2060\u2061\u2062";
    const TEXT_END = "\u2062\u2061\u2060";

    function encodeTextMessage(message) {

        const bytes =
            new TextEncoder().encode(message);

        let binary = "";

        for (const byte of bytes) {

            binary += byte
                .toString(2)
                .padStart(8, "0");
        }

        let hidden = "";

        for (const bit of binary) {

            hidden +=
                bit === "0"
                    ? "\u200B"
                    : "\u200C";
        }

        return TEXT_START +
            hidden +
            TEXT_END;
    }


    function decodeTextMessage(text) {

        const start =
            text.indexOf(TEXT_START);

        const end =
            text.indexOf(
                TEXT_END,
                start + TEXT_START.length
            );

        if (
            start === -1 ||
            end === -1
        ) {

            throw new Error(
                "No hidden StegoArt text found."
            );
        }

        const hidden =
            text.slice(
                start + TEXT_START.length,
                end
            );

        let binary = "";

        for (const char of hidden) {

            if (char === "\u200B")
                binary += "0";

            else if (char === "\u200C")
                binary += "1";
        }

        if (
            binary.length === 0 ||
            binary.length % 8 !== 0
        ) {

            throw new Error(
                "Invalid hidden text data."
            );
        }

        const bytes =
            new Uint8Array(
                binary.length / 8
            );

        for (
            let i = 0;
            i < bytes.length;
            i++
        ) {

            bytes[i] =
                parseInt(
                    binary.slice(
                        i * 8,
                        i * 8 + 8
                    ),
                    2
                );
        }

        return new TextDecoder().decode(bytes);
    }


    if (encodeTextBtn) {

        encodeTextBtn.addEventListener(
            "click",
            () => {

                try {

                    if (!coverText ||
                        !coverText.value) {

                        throw new Error(
                            "Please enter cover text."
                        );
                    }

                    if (!hiddenText ||
                        !hiddenText.value) {

                        throw new Error(
                            "Please enter the secret message."
                        );
                    }

                    const encoded =
                        coverText.value +
                        encodeTextMessage(
                            hiddenText.value
                        );

                    if (encodedTextResult) {

                        encodedTextResult.value =
                            encoded;
                    }

                    if (encodedTextInput) {

                        encodedTextInput.value =
                            encoded;
                    }

                } catch (error) {

                    console.error(error);

                    if (encodedTextResult)
                        encodedTextResult.value =
                            "❌ " + error.message;
                }
            }
        );
    }


    if (decodeTextBtn) {

        decodeTextBtn.addEventListener(
            "click",
            () => {

                try {

                    const input =
                        encodedTextInput
                            ? encodedTextInput.value
                            : "";

                    if (!input) {

                        throw new Error(
                            "Please paste the encoded text."
                        );
                    }

                    const message =
                        decodeTextMessage(input);

                    if (decodedTextResult) {

                        decodedTextResult.value =
                            message;
                    }

                } catch (error) {

                    console.error(error);

                    if (decodedTextResult)
                        decodedTextResult.value =
                            "❌ " + error.message;
                }
            }
        );
    }


    // ========================================================
    // AUDIO STEGANOGRAPHY
    // ========================================================

    const AUDIO_MAGIC = "STGAAUD2";

    let encodedAudioBlob = null;


    function createWavFile(
        samples,
        sampleRate,
        channels
    ) {

        const bytesPerSample = 2;

        const blockAlign =
            channels *
            bytesPerSample;

        const byteRate =
            sampleRate *
            blockAlign;

        const dataSize =
            samples.length *
            bytesPerSample;

        const buffer =
            new ArrayBuffer(
                44 + dataSize
            );

        const view =
            new DataView(buffer);


        function writeString(
            offset,
            string
        ) {

            for (
                let i = 0;
                i < string.length;
                i++
            ) {

                view.setUint8(
                    offset + i,
                    string.charCodeAt(i)
                );
            }
        }


        writeString(0, "RIFF");

        view.setUint32(
            4,
            36 + dataSize,
            true
        );

        writeString(8, "WAVE");

        writeString(12, "fmt ");

        view.setUint32(
            16,
            16,
            true
        );

        view.setUint16(
            20,
            1,
            true
        );

        view.setUint16(
            22,
            channels,
            true
        );

        view.setUint32(
            24,
            sampleRate,
            true
        );

        view.setUint32(
            28,
            byteRate,
            true
        );

        view.setUint16(
            32,
            blockAlign,
            true
        );

        view.setUint16(
            34,
            16,
            true
        );

        writeString(36, "data");

        view.setUint32(
            40,
            dataSize,
            true
        );


        for (
            let i = 0;
            i < samples.length;
            i++
        ) {

            let sample =
                Math.max(
                    -1,
                    Math.min(
                        1,
                        samples[i]
                    )
                );

            let value;

            if (sample < 0) {

                value =
                    Math.round(
                        sample * 32768
                    );

            } else {

                value =
                    Math.round(
                        sample * 32767
                    );
            }

            view.setInt16(
                44 + i * 2,
                value,
                true
            );
        }


        return new Blob(
            [buffer],
            {
                type: "audio/wav"
            }
        );
    }


    function audioBytesToBits(bytes) {

        const bits = [];

        for (const byte of bytes) {

            for (
                let i = 7;
                i >= 0;
                i--
            ) {

                bits.push(
                    (byte >> i) & 1
                );
            }
        }

        return bits;
    }


    function audioBitsToBytes(bits) {

        const bytes =
            new Uint8Array(
                Math.floor(
                    bits.length / 8
                )
            );

        for (
            let i = 0;
            i < bytes.length;
            i++
        ) {

            let value = 0;

            for (
                let j = 0;
                j < 8;
                j++
            ) {

                value =
                    (value << 1) |
                    bits[i * 8 + j];
            }

            bytes[i] = value;
        }

        return bytes;
    }


    async function readAudioFile(file) {

        const arrayBuffer =
            await file.arrayBuffer();

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) {

            throw new Error(
                "Web Audio API is not supported."
            );
        }

        const context =
            new AudioContext();

        try {

            const decoded =
                await context.decodeAudioData(
                    arrayBuffer.slice(0)
                );

            const channels =
                decoded.numberOfChannels;

            const length =
                decoded.length;

            const sampleRate =
                decoded.sampleRate;

            const samples =
                new Float32Array(
                    length * channels
                );

            for (
                let ch = 0;
                ch < channels;
                ch++
            ) {

                const channelData =
                    decoded.getChannelData(ch);

                for (
                    let i = 0;
                    i < length;
                    i++
                ) {

                    samples[
                        i * channels + ch
                    ] =
                        channelData[i];
                }
            }

            return {
                samples,
                sampleRate,
                channels
            };

        } finally {

            if (context.close)
                await context.close();
        }
    }


    // ========================================================
    // AUDIO ENCODE
    // ========================================================

    if (encodeAudioBtn) {

        encodeAudioBtn.addEventListener(
            "click",
            async () => {

                try {

                    const file =
                        encodeAudio
                            ? encodeAudio.files[0]
                            : null;

                    if (!file) {

                        throw new Error(
                            "Please select an audio file."
                        );
                    }

                    const message =
                        audioSecretMessage
                            ? audioSecretMessage.value
                            : "";

                    if (!message.trim()) {

                        throw new Error(
                            "Please enter a secret message."
                        );
                    }

                    const password =
                        audioPassword
                            ? audioPassword.value
                            : "";

                    if (!password) {

                        throw new Error(
                            "Please enter a password."
                        );
                    }

                    encodeAudioBtn.disabled = true;

                    encodeAudioBtn.textContent =
                        "ENCODING...";


                    const audio =
                        await readAudioFile(file);


                    const encrypted =
                        await encryptMessage(
                            message,
                            password
                        );


                    const magic =
                        new TextEncoder().encode(
                            AUDIO_MAGIC
                        );

                    const length =
                        numberToBytes(
                            encrypted.length
                        );


                    const payload =
                        new Uint8Array(
                            magic.length +
                            length.length +
                            encrypted.length
                        );

                    payload.set(
                        magic,
                        0
                    );

                    payload.set(
                        length,
                        magic.length
                    );

                    payload.set(
                        encrypted,
                        magic.length +
                        length.length
                    );


                    const bits =
                        audioBytesToBits(
                            payload
                        );


                    const samples =
                        new Float32Array(
                            audio.samples
                        );


                    if (
                        bits.length >
                        samples.length
                    ) {

                        throw new Error(
                            "The audio file is too short for this message."
                        );
                    }


                    for (
                        let i = 0;
                        i < bits.length;
                        i++
                    ) {

                        let value =
                            Math.round(
                                samples[i] * 32767
                            );

                        value =
                            Math.max(
                                -32768,
                                Math.min(
                                    32767,
                                    value
                                )
                            );

                        value =
                            (value & 0xFFFE) |
                            bits[i];

                        samples[i] =
                            value / 32767;
                    }


                    encodedAudioBlob =
                        createWavFile(
                            samples,
                            audio.sampleRate,
                            audio.channels
                        );


                    const url =
                        URL.createObjectURL(
                            encodedAudioBlob
                        );


                    if (audioEncodeResult) {

                        audioEncodeResult.innerHTML =
                            "";

                        const audioPlayer =
                            document.createElement(
                                "audio"
                            );

                        audioPlayer.controls = true;

                        audioPlayer.src = url;

                        audioEncodeResult.appendChild(
                            audioPlayer
                        );
                    }


                    if (downloadAudioBtn) {

                        downloadAudioBtn.style.display =
                            "inline-block";

                        downloadAudioBtn.onclick =
                            () => {

                                const link =
                                    document.createElement(
                                        "a"
                                    );

                                link.href = url;

                                link.download =
                                    "StegoArt_Encoded.wav";

                                link.click();
                            };
                    }


                    encodeAudioBtn.textContent =
                        "✓ AUDIO ENCODED";

                } catch (error) {

                    console.error(error);

                    if (audioEncodeResult) {

                        audioEncodeResult.textContent =
                            "❌ " +
                            error.message;
                    }

                    encodeAudioBtn.textContent =
                        "ENCODE AUDIO";

                } finally {

                    encodeAudioBtn.disabled =
                        false;
                }
            }
        );
    }


    // ========================================================
    // FIND WAV DATA CHUNK
    // ========================================================

    function findWavDataChunk(buffer) {

        const view =
            new DataView(buffer);

        if (view.byteLength < 44)
            throw new Error(
                "Invalid WAV file."
            );

        const riff =
            String.fromCharCode(
                view.getUint8(0),
                view.getUint8(1),
                view.getUint8(2),
                view.getUint8(3)
            );

        if (riff !== "RIFF")
            throw new Error(
                "Not a WAV file."
            );

        let offset = 12;

        while (
            offset + 8 <=
            view.byteLength
        ) {

            const id =
                String.fromCharCode(
                    view.getUint8(offset),
                    view.getUint8(offset + 1),
                    view.getUint8(offset + 2),
                    view.getUint8(offset + 3)
                );

            const size =
                view.getUint32(
                    offset + 4,
                    true
                );

            if (id === "data") {

                return {
                    offset: offset + 8,
                    size
                };
            }

            offset +=
                8 + size;

            if (size % 2 !== 0)
                offset++;
        }

        throw new Error(
            "WAV data section not found."
        );
    }


    // ========================================================
    // AUDIO DECODE
    // ========================================================

    if (decodeAudioBtn) {

        decodeAudioBtn.addEventListener(
            "click",
            async () => {

                try {

                    const file =
                        decodeAudio
                            ? decodeAudio.files[0]
                            : null;

                    if (!file) {

                        throw new Error(
                            "Please select an encoded WAV audio file."
                        );
                    }

                    const password =
                        decodeAudioPassword
                            ? decodeAudioPassword.value
                            : "";

                    if (!password) {

                        throw new Error(
                            "Please enter the password."
                        );
                    }


                    decodeAudioBtn.disabled = true;

                    decodeAudioBtn.textContent =
                        "DECODING...";


                    const buffer =
                        await file.arrayBuffer();


                    const chunk =
                        findWavDataChunk(
                            buffer
                        );


                    const view =
                        new DataView(buffer);


                    const sampleCount =
                        Math.floor(
                            Math.min(
                                chunk.size,
                                view.byteLength -
                                chunk.offset
                            ) / 2
                        );


                    const bits = [];


                    for (
                        let i = 0;
                        i < sampleCount;
                        i++
                    ) {

                        const sample =
                            view.getInt16(
                                chunk.offset +
                                i * 2,
                                true
                            );

                        bits.push(
                            sample & 1
                        );
                    }


                    const magicLength =
                        AUDIO_MAGIC.length *
                        8;


                    if (
                        bits.length <
                        magicLength + 32
                    ) {

                        throw new Error(
                            "No StegoArt audio message found."
                        );
                    }


                    const magicBytes =
                        audioBitsToBytes(
                            bits.slice(
                                0,
                                magicLength
                            )
                        );


                    const magic =
                        new TextDecoder().decode(
                            magicBytes
                        );


                    if (magic !== AUDIO_MAGIC) {

                        throw new Error(
                            "No StegoArt hidden message found."
                        );
                    }


                    const lengthStart =
                        magicLength;


                    const lengthBytes =
                        audioBitsToBytes(
                            bits.slice(
                                lengthStart,
                                lengthStart + 32
                            )
                        );


                    const encryptedLength =
                        bytesToNumber(
                            lengthBytes
                        );


                    const dataStart =
                        lengthStart + 32;


                    const dataEnd =
                        dataStart +
                        encryptedLength * 8;


                    if (
                        dataEnd >
                        bits.length
                    ) {

                        throw new Error(
                            "Encoded audio data is incomplete."
                        );
                    }


                    const encrypted =
                        audioBitsToBytes(
                            bits.slice(
                                dataStart,
                                dataEnd
                            )
                        );


                    const message =
                        await decryptMessage(
                            encrypted,
                            password
                        );


                    if (decodedAudioMessage) {

                        if (
                            "value" in
                            decodedAudioMessage
                        ) {

                            decodedAudioMessage.value =
                                message;

                        } else {

                            decodedAudioMessage.textContent =
                                message;
                        }
                    }


                    decodeAudioBtn.textContent =
                        "✓ AUDIO DECODED";

                } catch (error) {

                    console.error(error);

                    if (decodedAudioMessage) {

                        if (
                            "value" in
                            decodedAudioMessage
                        ) {

                            decodedAudioMessage.value =
                                "❌ " +
                                error.message;

                        } else {

                            decodedAudioMessage.textContent =
                                "❌ " +
                                error.message;
                        }
                    }

                    decodeAudioBtn.textContent =
                        "DECODE AUDIO";

                } finally {

                    decodeAudioBtn.disabled =
                        false;
                }
            }
        );
    }
    // ========================================================
// VIDEO STEGANOGRAPHY
// ========================================================

const VIDEO_MAGIC = "STGAVID1";

const VIDEO_UUID = new Uint8Array([
    0x53, 0x54, 0x47, 0x41,
    0x56, 0x49, 0x44, 0x31,
    0x53, 0x54, 0x45, 0x47,
    0x4F, 0x41, 0x52, 0x54
]);

let encodedVideoBlob = null;


// --------------------------------------------------------
// VIDEO FILE PREVIEW
// --------------------------------------------------------

function showVideoPreview(file, videoElement) {

    if (!file || !videoElement) return;

    if (videoElement.dataset.objectUrl) {

        URL.revokeObjectURL(
            videoElement.dataset.objectUrl
        );
    }

    const url =
        URL.createObjectURL(file);

    videoElement.dataset.objectUrl = url;

    videoElement.src = url;

    videoElement.style.display = "block";

    videoElement.load();
}


// --------------------------------------------------------
// CREATE MP4 UUID BOX
// --------------------------------------------------------

function createVideoStegoBox(payload) {

    const boxSize =
        8 +
        VIDEO_UUID.length +
        payload.length;

    if (boxSize > 0xFFFFFFFF) {

        throw new Error(
            "Secret data is too large."
        );
    }

    const buffer =
        new ArrayBuffer(boxSize);

    const view =
        new DataView(buffer);

    // Box size
    view.setUint32(
        0,
        boxSize,
        false
    );

    // Box type: uuid
    view.setUint8(4, 0x75); // u
    view.setUint8(5, 0x75); // u
    view.setUint8(6, 0x69); // i
    view.setUint8(7, 0x64); // d

    // UUID
    new Uint8Array(buffer).set(
        VIDEO_UUID,
        8
    );

    // Payload
    new Uint8Array(buffer).set(
        payload,
        8 + VIDEO_UUID.length
    );

    return new Uint8Array(buffer);
}


// --------------------------------------------------------
// VIDEO ENCODE
// --------------------------------------------------------

if (encodeVideoBtn) {

    encodeVideoBtn.addEventListener(
        "click",
        async () => {

            try {

                const file =
                    encodeVideo
                        ? encodeVideo.files[0]
                        : null;

                if (!file) {

                    throw new Error(
                        "Please select an MP4 video."
                    );
                }


                if (
                    !file.name
                        .toLowerCase()
                        .endsWith(".mp4")
                ) {

                    throw new Error(
                        "Please select an MP4 video file."
                    );
                }


                const message =
                    videoSecretMessage
                        ? videoSecretMessage.value
                        : "";


                if (!message.trim()) {

                    throw new Error(
                        "Please enter a secret message."
                    );
                }


                const password =
                    videoPassword
                        ? videoPassword.value
                        : "";


                if (!password) {

                    throw new Error(
                        "Please enter a password."
                    );
                }


                encodeVideoBtn.disabled = true;

                encodeVideoBtn.textContent =
                    "ENCODING...";


                // Start scan animation
                startScanAnimation(
                    encodeVideoPreview
                );


                // Encrypt message
                const encrypted =
                    await encryptMessage(
                        message,
                        password
                    );


                // -----------------------------------------
                // VIDEO PAYLOAD
                //
                // 8 bytes = STGAVID1
                // 4 bytes = encrypted data length
                // N bytes = encrypted message
                // -----------------------------------------

                const magic =
                    new TextEncoder().encode(
                        VIDEO_MAGIC
                    );


                const length =
                    numberToBytes(
                        encrypted.length
                    );


                const payload =
                    new Uint8Array(
                        magic.length +
                        length.length +
                        encrypted.length
                    );


                payload.set(
                    magic,
                    0
                );


                payload.set(
                    length,
                    magic.length
                );


                payload.set(
                    encrypted,
                    magic.length +
                    length.length
                );


                // Create MP4 container box
                const stegoBox =
                    createVideoStegoBox(
                        payload
                    );


                // Read original MP4
                const original =
                    new Uint8Array(
                        await file.arrayBuffer()
                    );


                // Append valid MP4 UUID box
                const combined =
                    new Uint8Array(
                        original.length +
                        stegoBox.length
                    );


                combined.set(
                    original,
                    0
                );


                combined.set(
                    stegoBox,
                    original.length
                );


                encodedVideoBlob =
                    new Blob(
                        [combined],
                        {
                            type: "video/mp4"
                        }
                    );


                // Preview encoded video
                showVideoPreview(
                    encodedVideoBlob,
                    encodeVideoPreview
                );


                // Result
                if (videoEncodeResult) {

                    videoEncodeResult.textContent =
                        "✓ Secret message successfully hidden inside the MP4 video.";
                }


                // Download
                if (downloadVideoBtn) {

                    const url =
                        URL.createObjectURL(
                            encodedVideoBlob
                        );


                    downloadVideoBtn.style.display =
                        "inline-block";


                    downloadVideoBtn.onclick =
                        () => {

                            const link =
                                document.createElement("a");

                            link.href = url;

                            link.download =
                                "StegoArt_Encoded_Video.mp4";

                            document.body.appendChild(
                                link
                            );

                            link.click();

                            document.body.removeChild(
                                link
                            );
                        };
                }


                encodeVideoBtn.textContent =
                    "✓ VIDEO ENCODED";


            } catch (error) {

                console.error(
                    "VIDEO ENCODE ERROR:",
                    error
                );


                if (videoEncodeResult) {

                    videoEncodeResult.textContent =
                        "❌ " +
                        error.message;
                }


                encodeVideoBtn.textContent =
                    "🔐 ENCODE VIDEO";


            } finally {

                setTimeout(() => {

                    stopScanAnimation(
                        encodeVideoPreview
                    );

                }, 3000);


                encodeVideoBtn.disabled =
                    false;
            }
        }
    );
}


// --------------------------------------------------------
// FIND STEGO UUID BOX
// --------------------------------------------------------

function findVideoStegoPayload(buffer) {

    const data =
        new Uint8Array(buffer);

    let offset = 0;


    while (
        offset + 8 <=
        data.length
    ) {

        const view =
            new DataView(
                data.buffer,
                data.byteOffset,
                data.byteLength
            );


        const size =
            view.getUint32(
                offset,
                false
            );


        if (size < 8) {
            break;
        }


        if (
            offset + size >
            data.length
        ) {
            break;
        }


        const type =
            String.fromCharCode(
                data[offset + 4],
                data[offset + 5],
                data[offset + 6],
                data[offset + 7]
            );


        if (
            type === "uuid" &&
            size >=
                8 +
                VIDEO_UUID.length
        ) {

            let match = true;


            for (
                let i = 0;
                i < VIDEO_UUID.length;
                i++
            ) {

                if (
                    data[
                        offset +
                        8 +
                        i
                    ] !== VIDEO_UUID[i]
                ) {

                    match = false;
                    break;
                }
            }


            if (match) {

                const payloadStart =
                    offset +
                    8 +
                    VIDEO_UUID.length;


                const payloadEnd =
                    offset +
                    size;


                return data.slice(
                    payloadStart,
                    payloadEnd
                );
            }
        }


        offset += size;
    }


    // Also check for our box if it was
    // appended after the normal MP4 structure.
    const uuidPosition =
        findSequence(
            data,
            VIDEO_UUID
        );


    if (
        uuidPosition !== -1 &&
        uuidPosition >= 8
    ) {

        const payloadStart =
            uuidPosition +
            VIDEO_UUID.length;


        return data.slice(
            payloadStart
        );
    }


    throw new Error(
        "No StegoArt hidden message found in this MP4."
    );
}


// --------------------------------------------------------
// FIND BYTE SEQUENCE
// --------------------------------------------------------

function findSequence(data, sequence) {

    outerLoop:

    for (
        let i = 0;
        i <= data.length - sequence.length;
        i++
    ) {

        for (
            let j = 0;
            j < sequence.length;
            j++
        ) {

            if (
                data[i + j] !==
                sequence[j]
            ) {

                continue outerLoop;
            }
        }

        return i;
    }


    return -1;
}


// --------------------------------------------------------
// VIDEO DECODE
// --------------------------------------------------------

if (decodeVideoBtn) {

    decodeVideoBtn.addEventListener(
        "click",
        async () => {

            try {

                const file =
                    decodeVideo
                        ? decodeVideo.files[0]
                        : null;


                if (!file) {

                    throw new Error(
                        "Please select an encoded MP4 video."
                    );
                }


                if (
                    !file.name
                        .toLowerCase()
                        .endsWith(".mp4")
                ) {

                    throw new Error(
                        "Please select an MP4 video file."
                    );
                }


                const password =
                    decodeVideoPassword
                        ? decodeVideoPassword.value
                        : "";


                if (!password) {

                    throw new Error(
                        "Please enter the password."
                    );
                }


                decodeVideoBtn.disabled =
                    true;


                decodeVideoBtn.textContent =
                    "DECODING...";


                // Start scan animation
                startScanAnimation(
                    decodeVideoPreview
                );


                // Show selected video
                showVideoPreview(
                    file,
                    decodeVideoPreview
                );


                const buffer =
                    await file.arrayBuffer();


                const payload =
                    findVideoStegoPayload(
                        buffer
                    );


                const magicLength =
                    VIDEO_MAGIC.length;


                if (
                    payload.length <
                    magicLength + 4
                ) {

                    throw new Error(
                        "Invalid StegoArt video data."
                    );
                }


                const magic =
                    bytesToText(
                        payload.slice(
                            0,
                            magicLength
                        )
                    );


                if (
                    magic !== VIDEO_MAGIC
                ) {

                    throw new Error(
                        "No StegoArt hidden message found."
                    );
                }


                // Read encrypted data length
                const lengthBytes =
                    payload.slice(
                        magicLength,
                        magicLength + 4
                    );


                const encryptedLength =
                    bytesToNumber(
                        lengthBytes
                    );


                if (
                    !Number.isFinite(
                        encryptedLength
                    ) ||
                    encryptedLength <= 0
                ) {

                    throw new Error(
                        "Invalid hidden video message."
                    );
                }


                const dataStart =
                    magicLength + 4;


                const dataEnd =
                    dataStart +
                    encryptedLength;


                if (
                    dataEnd >
                    payload.length
                ) {

                    throw new Error(
                        "The hidden video message is incomplete."
                    );
                }


                const encrypted =
                    payload.slice(
                        dataStart,
                        dataEnd
                    );


                // Decrypt
                const message =
                    await decryptMessage(
                        encrypted,
                        password
                    );


                if (decodedVideoMessage) {

                    decodedVideoMessage.value =
                        message;
                }


                decodeVideoBtn.textContent =
                    "✓ VIDEO DECODED";


            } catch (error) {

                console.error(
                    "VIDEO DECODE ERROR:",
                    error
                );


                if (decodedVideoMessage) {

                    decodedVideoMessage.value =
                        "❌ " +
                        error.message;
                }


                decodeVideoBtn.textContent =
                    "🔓 DECODE VIDEO";


            } finally {

                setTimeout(() => {

                    stopScanAnimation(
                        decodeVideoPreview
                    );

                }, 3000);


                decodeVideoBtn.disabled =
                    false;
            }
        }
    );
}

// ========================================================
// LOGOUT
// ========================================================

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        // Show login screen
        if (loginScreen) {

            loginScreen.style.display = "flex";
            loginScreen.style.opacity = "1";

        }

        // Clear login details
        if (loginUserId) {
            loginUserId.value = "";
        }

        if (loginPassword) {
            loginPassword.value = "";
        }

        // Clear digital signature
        if (digitalSignature) {

            const ctx =
                digitalSignature.getContext("2d");

            ctx.clearRect(
                0,
                0,
                digitalSignature.width,
                digitalSignature.height
            );

            digitalSignature
                .parentElement
                .classList.remove("signed");
        }

        // Reset signature
        signatureHasData = false;

        // Reset login button
        if (loginBtn) {

            loginBtn.disabled = false;

            loginBtn.textContent =
                "🔐 AUTHENTICATE";
        }

        // Clear message
        if (loginMessage) {
            loginMessage.textContent = "";
        }

        // Scroll to top
        window.scrollTo(0, 0);

    });

}
    // ========================================================
    // AI STEGANOGRAPHY DETECTOR
    // Browser-based statistical detector for images.
    // It also recognizes the exact StegoArt "STGA" signature.
    // ========================================================

    const detectorImage =
        document.getElementById("detectorImage");

    const detectorPreview =
        document.getElementById("detectorPreview");

    const analyzeStegoBtn =
        document.getElementById("analyzeStegoBtn");

    const clearDetectorBtn =
        document.getElementById("clearDetectorBtn");

    const detectorIdle =
        document.getElementById("detectorIdle");

    const detectorResults =
        document.getElementById("detectorResults");

    const detectorProbability =
        document.getElementById("detectorProbability");

    const detectorScoreFill =
        document.getElementById("detectorScoreFill");

    const detectorVerdict =
        document.getElementById("detectorVerdict");

    const detectorFileName =
        document.getElementById("detectorFileName");

    const detectorDimensions =
        document.getElementById("detectorDimensions");

    const detectorLsbScore =
        document.getElementById("detectorLsbScore");

    let detectorImageData = null;
    let detectorFile = null;

    function detectorLoadImage(file) {

        return new Promise((resolve, reject) => {

            if (!file) {
                reject(new Error("Please select an image."));
                return;
            }

            if (!file.type.startsWith("image/")) {
                reject(new Error("Please select a valid image."));
                return;
            }

            const reader = new FileReader();

            reader.onload = () => {

                const img = new Image();

                img.onload = () => {

                    const canvas =
                        document.createElement("canvas");

                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;

                    const ctx =
                        canvas.getContext("2d", {
                            willReadFrequently: true
                        });

                    ctx.drawImage(
                        img,
                        0,
                        0
                    );

                    const imageData =
                        ctx.getImageData(
                            0,
                            0,
                            canvas.width,
                            canvas.height
                        );

                    resolve({
                        canvas,
                        imageData,
                        width: canvas.width,
                        height: canvas.height
                    });
                };

                img.onerror = () =>
                    reject(
                        new Error("The image could not be read.")
                    );

                img.src = reader.result;
            };

            reader.onerror = () =>
                reject(
                    new Error("The image could not be loaded.")
                );

            reader.readAsDataURL(file);
        });
    }

    function detectorGetFirstBits(data, count) {

        const bits = [];

        for (
            let i = 0;
            i < data.length && bits.length < count;
            i += 4
        ) {

            bits.push(data[i] & 1);

            if (bits.length < count)
                bits.push(data[i + 1] & 1);

            if (bits.length < count)
                bits.push(data[i + 2] & 1);
        }

        return bits;
    }

    function detectorBitsToBytes(bits) {

        const bytes = [];

        for (
            let i = 0;
            i + 7 < bits.length;
            i += 8
        ) {

            let value = 0;

            for (let j = 0; j < 8; j++) {
                value =
                    (value << 1) |
                    bits[i + j];
            }

            bytes.push(value);
        }

        return bytes;
    }

    function detectorHasStegoArtSignature(data) {

        const bits =
            detectorGetFirstBits(data, 32);

        const bytes =
            detectorBitsToBytes(bits);

        return (
            bytes.length >= 4 &&
            bytes[0] === 0x53 &&
            bytes[1] === 0x54 &&
            bytes[2] === 0x47 &&
            bytes[3] === 0x41
        );
    }

    function detectorCalculateLsbScore(data) {

        /*
         * Analyze a sample of RGB LSBs.
         * A perfectly random-looking LSB stream can be a sign
         * of embedded data, but natural images can also behave
         * this way. Therefore this is only one part of the score.
         */

        const maxPixels = 120000;
        const totalPixels =
            Math.floor(data.length / 4);

        const step =
            Math.max(
                1,
                Math.floor(totalPixels / maxPixels)
            );

        let ones = 0;
        let zeros = 0;
        let transitions = 0;
        let previous = null;
        let sampledBits = 0;

        for (
            let pixel = 0;
            pixel < totalPixels;
            pixel += step
        ) {

            const base = pixel * 4;

            for (let channel = 0; channel < 3; channel++) {

                const bit =
                    data[base + channel] & 1;

                if (bit === 1) ones++;
                else zeros++;

                if (
                    previous !== null &&
                    previous !== bit
                ) {
                    transitions++;
                }

                previous = bit;
                sampledBits++;
            }
        }

        if (sampledBits < 30) {
            return {
                score: 0,
                balance: 0,
                transitionRate: 0
            };
        }

        const balance =
            Math.min(ones, zeros) /
            Math.max(ones, zeros);

        const transitionRate =
            transitions /
            Math.max(1, sampledBits - 1);

        /*
         * Natural-image LSBs are often not perfectly balanced.
         * Embedded data tends to push the stream toward a more
         * balanced, high-transition pattern.
         */

        const balanceScore =
            Math.max(
                0,
                Math.min(
                    1,
                    (balance - 0.55) / 0.45
                )
            );

        const transitionScore =
            Math.max(
                0,
                Math.min(
                    1,
                    (transitionRate - 0.42) / 0.16
                )
            );

        const score =
            (
                balanceScore * 0.55 +
                transitionScore * 0.45
            ) * 100;

        return {
            score,
            balance,
            transitionRate
        };
    }

    function detectorCalculateChannelScore(data) {

        const sampleLimit = 60000;
        const pixels =
            Math.floor(data.length / 4);

        const step =
            Math.max(
                1,
                Math.floor(pixels / sampleLimit)
            );

        let evenOddDifference = 0;
        let samples = 0;

        /*
         * Compare neighbouring RGB LSBs. This does not prove
         * steganography, but gives another statistical feature.
         */

        for (
            let p = 0;
            p < pixels - step;
            p += step
        ) {

            const a = p * 4;
            const b = (p + step) * 4;

            for (let c = 0; c < 3; c++) {

                const bitA = data[a + c] & 1;
                const bitB = data[b + c] & 1;

                if (bitA !== bitB) {
                    evenOddDifference++;
                }

                samples++;
            }
        }

        if (!samples) return 0;

        const rate =
            evenOddDifference / samples;

        return Math.max(
            0,
            Math.min(
                100,
                ((rate - 0.40) / 0.18) * 100
            )
        );
    }

    function detectorAnalyze(data, ignoreSignature = false) {

        /*
         * First check the exact signature used by StegoArt's
         * current image encoder: "STGA" in the first 32 RGB LSBs.
         * This is deterministic for StegoArt-generated images.
         */

        const exactStegoArt =
            detectorHasStegoArtSignature(data);

        const lsb =
            detectorCalculateLsbScore(data);

        const channel =
            detectorCalculateChannelScore(data);

        let probability;

        if (exactStegoArt && !ignoreSignature) {

            probability = 100;

        } else {

            /*
             * Heuristic probability:
             * 70% statistical LSB behavior
             * 30% channel behavior
             *
             * This is an estimate, not a trained AI confidence.
             */

            probability =
                Math.round(
                    (
                        lsb.score * 0.70 +
                        channel * 0.30
                    )
                );

            /*
             * Keep ordinary images from being labelled as
             * highly suspicious based on one weak signal.
             */

            probability =
                Math.max(
                    2,
                    Math.min(
                        94,
                        probability
                    )
                );
        }

        return {
            probability,
            exactStegoArt,
            lsbScore: Math.round(lsb.score),
            channelScore: Math.round(channel)
        };
    }

    function detectorSetProgress(value) {

        if (detectorProbability) {
            detectorProbability.textContent =
                value;
        }

        if (detectorScoreFill) {
            detectorScoreFill.style.width =
                value + "%";
        }

        if (typeof window.detectorSetScan === "function") {
            window.detectorSetScan(
                value,
                value >= 90
                    ? "SIGNATURE / ANOMALY TRACE DETECTED"
                    : value >= 60
                        ? "RED FLAG PATTERNS DETECTED"
                        : value >= 30
                            ? "CHECKING LSB IRREGULARITIES..."
                            : "SCANNING PIXEL DISTRIBUTION..."
            );
        }
    }

    if (detectorImage) {

        detectorImage.addEventListener(
            "change",
            async () => {

                const file =
                    detectorImage.files[0];

                if (!file) return;

                detectorFile = file;

                try {

                    detectorImageData =
                        await detectorLoadImage(file);

                    if (detectorPreview) {

                        detectorPreview.innerHTML = "";

                        const img =
                            document.createElement("img");

                        img.src =
                            detectorImageData.canvas.toDataURL(
                                "image/png"
                            );

                        img.alt =
                            "Detector preview";

                        detectorPreview.appendChild(img);
                    }

                    if (detectorFileName) {
                        detectorFileName.textContent =
                            file.name;
                    }

                    if (detectorDimensions) {
                        detectorDimensions.textContent =
                            `${detectorImageData.width} × ${detectorImageData.height}`;
                    }

                    if (detectorIdle)
                        detectorIdle.style.display = "block";

                    if (detectorResults)
                        detectorResults.style.display = "none";

                } catch (error) {

                    console.error(
                        "DETECTOR IMAGE ERROR:",
                        error
                    );

                    alert(error.message);

                }
            }
        );
    }

    if (analyzeStegoBtn) {

        analyzeStegoBtn.addEventListener(
            "click",
            async () => {

                if (!detectorImageData) {

                    alert(
                        "Please upload an image first."
                    );

                    return;
                }

                analyzeStegoBtn.disabled = true;
                analyzeStegoBtn.textContent =
                    "🔎 ANALYZING...";

                if (detectorIdle)
                    detectorIdle.style.display = "none";

                if (detectorResults)
                    detectorResults.style.display = "block";

                detectorSetProgress(0);

                if (detectorVerdict) {
                    detectorVerdict.textContent =
                        "SCANNING PIXEL DATA...";
                }

                /*
                 * Small staged animation so the user can see
                 * that analysis is happening.
                 */

                for (const value of [18, 36, 55, 74]) {

                    detectorSetProgress(value);

                    await new Promise(
                        resolve =>
                            setTimeout(resolve, 180)
                    );
                }

                const result =
                    detectorAnalyze(
                        detectorImageData.imageData.data
                    );

                detectorSetProgress(
                    result.probability
                );

                if (detectorLsbScore) {
                    detectorLsbScore.textContent =
                        `${result.lsbScore}%`;
                }

                if (detectorVerdict) {

                    if (result.exactStegoArt) {

                        detectorVerdict.textContent =
                            "✓ STEGOART STEGANOGRAPHY DETECTED";

                    } else if (result.probability >= 70) {

                        detectorVerdict.textContent =
                            "⚠ HIGH PROBABILITY OF HIDDEN DATA";

                    } else if (result.probability >= 40) {

                        detectorVerdict.textContent =
                            "⚠ SUSPICIOUS IMAGE PATTERNS";

                    } else {

                        detectorVerdict.textContent =
                            "✓ LOW PROBABILITY OF STEGANOGRAPHY";
                    }
                }

                analyzeStegoBtn.disabled = false;
                analyzeStegoBtn.textContent =
                    "🤖 ANALYZE IMAGE";
            }
        );
    }

    if (clearDetectorBtn) {

        clearDetectorBtn.addEventListener(
            "click",
            () => {

                detectorFile = null;
                detectorImageData = null;

                if (detectorImage)
                    detectorImage.value = "";

                if (detectorPreview)
                    detectorPreview.innerHTML = "";

                if (detectorIdle)
                    detectorIdle.style.display = "block";

                if (detectorResults)
                    detectorResults.style.display = "none";

                detectorSetProgress(0);

                if (detectorLsbScore)
                    detectorLsbScore.textContent = "--";

                if (detectorFileName)
                    detectorFileName.textContent = "--";

                if (detectorDimensions)
                    detectorDimensions.textContent = "--";
            }
        );
    }

    // ========================================================

    // INITIAL STATE
    // ========================================================

    if (downloadBtn)
        downloadBtn.style.display = "none";

    if (downloadAudioBtn)
        downloadAudioBtn.style.display = "none";

    updateCapacity();

    console.log(
        "StegoArt initialized successfully."
    );

    // Make shared functions available to Smart Lab (outside this callback).
    window.getAdaptivePixelOrder = getAdaptivePixelOrder;
    window.detectorAnalyze = detectorAnalyze;
    window.bytesToBits = bytesToBits;

});
/* ============================================================
   SMART LAB — INTERACTIVE ANALYSIS
   Uses the same adaptive ranking + browser detector already
   used by the Image Steganography and AI Detector sections.
   ============================================================ */
(function initSmartLab() {
    const imageInput = document.getElementById("smartLabImage");
    const messageInput = document.getElementById("smartLabMessage");
    const runBtn = document.getElementById("runSmartLabBtn");
    const clearBtn = document.getElementById("clearSmartLabBtn");
    const canvas = document.getElementById("smartLabCanvas");
    const canvasEmpty = document.getElementById("smartLabCanvasEmpty");
    const status = document.getElementById("smartLabStatus");
    const results = document.getElementById("smartLabResults");

    if (!imageInput || !runBtn || !canvas) return;

    let labImage = null;

    function loadLabImage(file) {
        return new Promise((resolve, reject) => {
            if (!file || !file.type.startsWith("image/")) {
                reject(new Error("Please select a valid PNG or JPG image."));
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.onload = () => {
                    const sourceCanvas = document.createElement("canvas");
                    sourceCanvas.width = img.naturalWidth;
                    sourceCanvas.height = img.naturalHeight;
                    const ctx = sourceCanvas.getContext("2d", { willReadFrequently: true });
                    ctx.drawImage(img, 0, 0);
                    resolve({
                        image: img,
                        canvas: sourceCanvas,
                        imageData: ctx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height)
                    });
                };
                img.onerror = () => reject(new Error("The image could not be read."));
                img.src = reader.result;
            };
            reader.onerror = () => reject(new Error("The image could not be loaded."));
            reader.readAsDataURL(file);
        });
    }

    function calculateTextureStats(imageData) {
        const orderObjects = [];
        const { data, width, height } = imageData;
        const sampleLimit = 90000;
        const total = width * height;
        const step = Math.max(1, Math.ceil(total / sampleLimit));
        let sum = 0;

        function lum(x, y) {
            const i = (y * width + x) * 4;
            return (299 * (data[i] >> 2) + 587 * (data[i + 1] >> 2) + 114 * (data[i + 2] >> 2)) / 1000;
        }

        for (let p = 0; p < total; p += step) {
            const x = p % width;
            const y = Math.floor(p / width);
            const c = lum(x, y);
            const r = x + 1 < width ? lum(x + 1, y) : c;
            const d = y + 1 < height ? lum(x, y + 1) : c;
            const score = Math.abs(c - r) + Math.abs(c - d);
            sum += score;
            orderObjects.push({ index: p, score });
        }
        orderObjects.sort((a, b) => b.score - a.score);
        return {
            sample: orderObjects,
            average: sum / Math.max(1, orderObjects.length),
            total
        };
    }

    function drawLabMap(imageData, ranked) {
        const ctx = canvas.getContext("2d");
        const maxW = 760;
        const maxH = 460;
        const scale = Math.min(maxW / imageData.width, maxH / imageData.height, 1);
        canvas.width = Math.max(1, Math.round(imageData.width * scale));
        canvas.height = Math.max(1, Math.round(imageData.height * scale));
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const source = document.createElement("canvas");
        source.width = imageData.width;
        source.height = imageData.height;
        source.getContext("2d").putImageData(imageData, 0, 0);
        ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

        const selectedCount = Math.max(1, Math.floor(ranked.length * 0.20));
        const step = Math.max(1, Math.floor(selectedCount / 9000));
        ctx.save();
        ctx.globalAlpha = 0.42;
        ctx.fillStyle = "#ef3340";
        for (let i = 0; i < selectedCount; i += step) {
            const p = ranked[i].index;
            const x = p % imageData.width;
            const y = Math.floor(p / imageData.width);
            const px = x * scale;
            const py = y * scale;
            ctx.fillRect(px, py, Math.max(1, 2 * scale), Math.max(1, 2 * scale));
        }
        ctx.restore();
        if (canvasEmpty) canvasEmpty.style.display = "none";
    }

    function embedLabBits(original, bits, pixelOrder) {
        const output = new Uint8ClampedArray(original);
        let bit = 0;
        for (let p = 0; p < pixelOrder.length && bit < bits.length; p++) {
            const base = pixelOrder[p] * 4;
            for (let c = 0; c < 3 && bit < bits.length; c++) {
                output[base + c] = (output[base + c] & 254) | bits[bit++];
            }
        }
        return output;
    }

    function calculatePSNR(a, b) {
        let mse = 0;
        let count = 0;
        for (let i = 0; i < a.length; i += 4) {
            for (let c = 0; c < 3; c++) {
                const d = a[i + c] - b[i + c];
                mse += d * d;
                count++;
            }
        }
        mse /= Math.max(1, count);
        if (mse === 0) return 99.99;
        return 10 * Math.log10((255 * 255) / mse);
    }

    function renderStats(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    imageInput.addEventListener("change", async () => {
        const file = imageInput.files[0];
        if (!file) return;
        try {
            labImage = await loadLabImage(file);
            const ranked = window.getAdaptivePixelOrder(labImage.imageData);
            const stats = calculateTextureStats(labImage.imageData);
            drawLabMap(labImage.imageData, stats.sample.length ? stats.sample : ranked.map(index => ({index, score:0})));
            renderStats("smartLabPixels", (labImage.imageData.width * labImage.imageData.height).toLocaleString());
            renderStats("smartLabRegions", Math.floor((labImage.imageData.width * labImage.imageData.height) * 0.20).toLocaleString());
            renderStats("smartLabCapacity", `${Math.floor(ranked.length * 3 / 8).toLocaleString()} bytes`);
            renderStats("smartLabTexture", stats.average.toFixed(2));
            if (status) status.textContent = "IMAGE READY";
        } catch (e) {
            alert(e.message);
        }
    });

    runBtn.addEventListener("click", async () => {
        try {
            if (!labImage) throw new Error("Please upload a cover image first.");
            const message = (messageInput?.value || "").trim();
            if (!message) throw new Error("Please enter a short test secret message.");

            runBtn.disabled = true;
            runBtn.textContent = "🤖 ANALYZING...";
            if (status) status.textContent = "RUNNING ANALYSIS";
            if (results) results.hidden = false;

            await new Promise(r => setTimeout(r, 120));

            const source = labImage.imageData;
            const adaptive = window.getAdaptivePixelOrder(source);
            const payload = new TextEncoder().encode(message);
            const bits = window.bytesToBits(payload);
            const requiredPixels = Math.ceil(bits.length / 3);
            const availablePixels = Math.floor(source.data.length / 4) - 3;
            const standard = Array.from({length: Math.max(0, Math.min(requiredPixels, availablePixels))}, (_, i) => i + 3);

            if (requiredPixels > availablePixels || requiredPixels > adaptive.length) {
                throw new Error("The test message is too large for this image.");
            }

            const standardPixels = embedLabBits(source.data, bits, standard);
            const smartPixels = embedLabBits(source.data, bits, adaptive);
            const standardResult = window.detectorAnalyze(standardPixels, true);
            const smartResult = window.detectorAnalyze(smartPixels, true);
            const standardPsnr = calculatePSNR(source.data, standardPixels);
            const smartPsnr = calculatePSNR(source.data, smartPixels);
            const delta = smartResult.probability - standardResult.probability;

            renderStats("smartLabStandardProb", standardResult.probability);
            renderStats("smartLabSmartProb", smartResult.probability);
            renderStats("smartLabStandardPsnr", standardPsnr.toFixed(2));
            renderStats("smartLabSmartPsnr", smartPsnr.toFixed(2));
            renderStats("smartLabSelectedPixels", requiredPixels.toLocaleString());
            renderStats("smartLabMessageBits", bits.length.toLocaleString());
            renderStats("smartLabDelta", `${delta > 0 ? "+" : ""}${delta}%`);
            renderStats("smartLabStrategy", "High-detail adaptive embedding");

            const feedback = document.getElementById("smartLabFeedback");
            if (feedback) {
                if (delta < 0) {
                    feedback.textContent = `Detector feedback: adaptive hiding measured ${Math.abs(delta)} percentage points lower estimated detectability than the standard candidate in this test.`;
                } else if (delta > 0) {
                    feedback.textContent = `Detector feedback: adaptive hiding measured ${delta} percentage points higher estimated detectability in this test. The result is image-dependent.`;
                } else {
                    feedback.textContent = "Detector feedback: both candidates produced the same estimated detectability in this test.";
                }
            }
            if (status) status.textContent = "ANALYSIS COMPLETE";
        } catch (e) {
            alert(e.message);
            if (results) results.hidden = true;
            if (status) status.textContent = "ERROR";
        } finally {
            runBtn.disabled = false;
            runBtn.textContent = "🤖 RUN SMART ANALYSIS";
        }
    });

    clearBtn?.addEventListener("click", () => {
        labImage = null;
        imageInput.value = "";
        if (messageInput) messageInput.value = "";
        if (results) results.hidden = true;
        if (canvasEmpty) canvasEmpty.style.display = "flex";
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ["smartLabPixels","smartLabRegions","smartLabCapacity","smartLabTexture","smartLabStandardProb","smartLabSmartProb","smartLabStandardPsnr","smartLabSmartPsnr","smartLabSelectedPixels","smartLabMessageBits","smartLabDelta","smartLabStrategy"].forEach(id => renderStats(id, "--"));
        if (status) status.textContent = "WAITING";
        const feedback = document.getElementById("smartLabFeedback");
        if (feedback) feedback.textContent = "Detector feedback will appear here after analysis.";
    });
})();

/* ============================================================
   DETECTOR RED ERROR / ANOMALY TRACE
   ============================================================ */
(function enhanceDetectorScan() {
    const lines = document.querySelectorAll("#detectorErrorLines span");
    const scanStatus = document.getElementById("detectorScanStatus");
    if (!lines.length) return;

    window.detectorSetScan = function(value, label) {
        const v = Math.max(0, Math.min(100, Number(value) || 0));
        const widths = [0.42, 0.68, 0.86, 0.57, 0.76];
        lines.forEach((line, i) => {
            const threshold = (i + 1) * 14;
            const active = v >= threshold;
            line.style.width = `${Math.max(5, Math.min(100, v * widths[i] + (i * 4)))}%`;
            line.style.opacity = active ? "1" : "0.28";
            line.classList.toggle("active", active);
        });
        if (scanStatus) scanStatus.textContent = label || `ANOMALY TRACE: ${Math.round(v)}%`;
    };

    window.detectorSetScan(0, "SCANNING PIXEL DISTRIBUTION...");
})();
