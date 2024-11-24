document.addEventListener('DOMContentLoaded', (event) => {
    // console.log('RSA script loaded');

    // Get the textarea elements
    const plainTextAlphabet = document.getElementById('plain-alphabet-encrypt');
    const plainTextInteger = document.getElementById('plain-integer-encrypt');

    // Function to convert text to integer representation
    function convertTextToInteger(text) {
        let result = BigInt(0); // Start with a large integer
        for (let i = 0; i < text.length; i++) {
            result = result * BigInt(256) + BigInt(text.charCodeAt(i));
        }
        return result.toString(); // Convert BigInt to string for large number handling
    }

    // Event listener for input on the plain text (alphabet) textarea
    plainTextAlphabet.addEventListener('input', (event) => {
        const text = event.target.value;
        const integerRepresentation = convertTextToInteger(text);
        plainTextInteger.value = integerRepresentation;
    });
});

let buildForm = document.getElementById("build-form");

// Add an event listener to the form
buildForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Create a FormData object to gather form data
    let p = document.getElementById("p-input").value;
    let a = document.getElementById("a-input").value;
    let b = document.getElementById("b-input").value;

    data = {
        p: p,
        q: q,
    };

    console.log(data);

    // Send the form data using fetch
    fetch(process.env.API+"/crypto_system/rsa/generate_key", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json()) // Parse the response as JSON
        .then((result) => {
            console.log(result);
            // Handle the response data here (e.g., display a message)
            console.log("Success:", data);
            document.getElementById("n-result").value = result.publicKey.n;
            document.getElementById("e-result").value = result.publicKey.e;
            document.getElementById("d-result").value = result.privateKey.d;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});

// Define the copyToClipboard function
function copyToClipboard(elementId) {
    var copyText = document.getElementById(elementId);
    copyText.select();
    // copyText.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    // alert("Copied the text: " + copyText.value);
}

document.addEventListener("DOMContentLoaded", (event) => {
    // console.log('RSA script loaded');

    // Get the textarea elements
    const plainTextAlphabet = document.getElementById("plain-alphabet-encrypt");
    const plainTextInteger = document.getElementById("plain-integer-encrypt");

    // Function to convert text to integer representation
    function convertTextToInteger(text) {
        let result = BigInt(0); // Start with a large integer
        for (let i = 0; i < text.length; i++) {
            result = result * BigInt(256) + BigInt(text.charCodeAt(i));
        }
        return result.toString(); // Convert BigInt to string for large number handling
    }

    // Event listener for input on the plain text (alphabet) textarea
    plainTextAlphabet.addEventListener("input", (event) => {
        const text = event.target.value;
        const integerRepresentation = convertTextToInteger(text);
        plainTextInteger.value = integerRepresentation;
    });
});

function encryptText() {
    let plainText = document.getElementById("plain-integer-encrypt").value;
    let publicKey = {
        curve_name: curve_name,
        B: {
            x: document.getElementById("xB-pubkey").value,
            y: document.getElementById("yB-pubkey").value,
        },
        message: plainText,
    };

    let data = {
        publicKey: publicKey,
        message: plainText,
    };

    console.log(data);

    fetch(process.env.API+"/crypto_system/asymmetric/ecc/encrypt", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            document.getElementById("cipher-x-encrypt-1").value = result.encrypted_message.pair_points[0][0].x;
            document.getElementById("cipher-y-encrypt-1").value = result.encrypted_message.pair_points[0][0].y;
            document.getElementById("cipher-x-encrypt-2").value = result.encrypted_message.pair_points[0][1].x;
            document.getElementById("cipher-y-encrypt-2").value = result.encrypted_message.pair_points[0][1].y;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function convertIntegerToText(integer) {
    let result = "";
    let num = BigInt(integer);
    while (num > 0) {
        result = String.fromCharCode(Number(num % BigInt(256))) + result;
        num = num / BigInt(256);
    }
    return result;
}

function decryptText() {
    let x_cipherText1 = document.getElementById("cipher-x-decrypt-1").value;
    let y_cipherText1 = document.getElementById("cipher-y-decrypt-1").value;
    let x_cipherText2 = document.getElementById("cipher-x-decrypt-2").value;
    let y_cipherText2 = document.getElementById("cipher-y-decrypt-2").value;
    let privateKey = {
        curve_name: curve_name,
        secret_number: document.getElementById("s-prikey").value,
    };

    let data = {
        privateKey: privateKey,
        encrypted_message: {
            pair_points:[[x_cipherText1, y_cipherText1], [x_cipherText2, y_cipherText2]]
        },
    };

    console.log(data);

    fetch(process.env.API+"/crypto_system/asymmetric/ecc/decrypt", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            document.getElementById("plain-integer-decrypt").value =
                result.decrypted_message;
            document.getElementById("plain-alphabet-decrypt").value =
                convertIntegerToText(result.decrypted_message);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function generateKey() {
    let s = document.getElementById("s-input");
    data = {
        curve_name: curve_name,
        secret_number: s.value,
    };
    console.log(data);
    url = process.env.API+"/crypto_system/asymmetric/ecc/generate_key";
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            p = document.getElementById("p-input");
            a = document.getElementById("a-input");
            b = document.getElementById("b-input");

            document.getElementById("p-pubkey").value = p.value;
            document.getElementById("a-pubkey").value = a.value;
            document.getElementById("b-pubkey").value = b.value;
            document.getElementById("p-prikey").value = p.value;
            document.getElementById("a-prikey").value = a.value;
            document.getElementById("b-prikey").value = b.value;
            document.getElementById("xB-pubkey").value = result.publicKey.B.x;
            document.getElementById("yB-pubkey").value = result.publicKey.B.y;
            document.getElementById("s-prikey").value = result.privateKey.secret_number
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function autoGenCrypSys() {
    list_curve = [
        "brainpoolP160r1",
        "brainpoolP192r1",
        "brainpoolP224r1",
        "brainpoolP256r1",
        "brainpoolP320r1",
        "brainpoolP384r1",
        "brainpoolP512r1",
        "secp192r1",
        "secp224r1",
        "secp256r1",
        "secp256k1",
        "secp384r1",
        "secp521r1",
    ];
    curve_name = list_curve[Math.floor(Math.random() * list_curve.length)];
    url = process.env.API+"/elliptice_curve/domains/" + curve_name;
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            let p = document.getElementById("p-input");
            let a = document.getElementById("a-input");
            let b = document.getElementById("b-input");
            let s = document.getElementById("s-input");

            p.value = result.p;
            a.value = result.a;
            b.value = result.b;
            // Generate a random integer between 1 and p
            let random = Math.floor(Math.random() * 1000000) + 1;
            s.value = random;
            generateKey();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
