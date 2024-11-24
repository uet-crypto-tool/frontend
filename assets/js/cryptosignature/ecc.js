document.addEventListener('DOMContentLoaded', (event) => {
    // console.log('RSA script loaded');

    // Get the textarea elements
    const plainTextAlphabet = document.getElementById('plain-alphabet-sign');
    const plainTextInteger = document.getElementById('plain-integer-sign');

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
    fetch("http://localhost:8000/crypto_system/rsa/generate_key", {
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

function verify() {
    let plainText = document.getElementById("plain-integer-verify").value;
    let publicKey = {
        curve_name: curve_name,
        Q: {
            x: document.getElementById("xQ-pubkey").value,
            y: document.getElementById("yQ-pubkey").value,
        },
        message: plainText,
    };
    let signature = {
        r: document.getElementById("r-signature-verify").value,
        s: document.getElementById("s-signature-verify").value,
    };

    let data = {
        publicKey: publicKey,
        message: plainText,
        signature: signature,
    };

    console.log(data);

    fetch("http://localhost:8000/signature_scheme/ecdsa/verify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            document.getElementById("verification-result").value = result.is_valid;
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

function sign() {
    let message = document.getElementById("plain-integer-sign").value;
    let privateKey = {
        curve_name: curve_name,
        d: document.getElementById("d-prikey").value,
    };

    let data = {
        privateKey: privateKey,
        message: message,
    };

    console.log(data);

    fetch("http://localhost:8000/signature_scheme/ecdsa/sign", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            document.getElementById("r-signature-sign").value =
                result.signature.r;
            document.getElementById("s-signature-sign").value =
                result.signature.s;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function generateKey() {
    let s = document.getElementById("s-input");
    data = {
        curve_name: curve_name,
    };
    console.log(data);
    url = "http://localhost:8000/signature_scheme/ecdsa/generate_key";
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
            d = document.getElementById("d-input");

            d.value = result.privateKey.d
            document.getElementById("p-pubkey").value = p.value;
            document.getElementById("a-pubkey").value = a.value;
            document.getElementById("b-pubkey").value = b.value;
            document.getElementById("p-prikey").value = p.value;
            document.getElementById("a-prikey").value = a.value;
            document.getElementById("b-prikey").value = b.value;
            document.getElementById("xQ-pubkey").value = result.publicKey.Q.x;
            document.getElementById("yQ-pubkey").value = result.publicKey.Q.y;
            document.getElementById("d-prikey").value = result.privateKey.d
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
    url = "http://localhost:8000/elliptice_curve/domains/" + curve_name;
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
            // generateKey();
        }).then(() => {
            generateKey();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
