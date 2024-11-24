let buildForm = document.getElementById("build-form");

// Add an event listener to the form
buildForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Create a FormData object to gather form data
    let p = document.getElementById("p-input").value;
    let a = document.getElementById("a-input").value;

    data = {
        p: p,
        a: a,
    };

    console.log(data);

    // Send the form data using fetch
    fetch(`${window.env.API}` + "/signature_scheme/elgamal/generate_key", {
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
            document.getElementById("p-result").value = result.publicKey.p;
            document.getElementById("alpha-result").value =
                result.publicKey.alpha;
            document.getElementById("beta-result").value =
                result.publicKey.beta;
            document.getElementById("a-result").value = result.privateKey.a;
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

function sign() {
    let message = document.getElementById("plain-integer-encrypt").value;
    let privateKey = {
        p: document.getElementById("p-result").value,
        a: document.getElementById("a-result").value,
        alpha: document.getElementById("alpha-result").value,
    };

    let data = {
        privateKey: privateKey,
        message: message,
    };

    console.log(data);

    fetch(`${window.env.API}` + "/signature_scheme/elgamal/sign", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            document.getElementById("y1-signature-sign").value =
                result.signature.y1;
            document.getElementById("y2-signature-sign").value =
                result.signature.y2;
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

function verify() {
    let y1 = document.getElementById("y1-signature-verify").value;
    let y2 = document.getElementById("y2-signature-verify").value;
    let signature = {
        y1: y1,
        y2: y2,
    };
    let publicKey = {
        p: document.getElementById("p-result").value,
        alpha: document.getElementById("alpha-result").value,
        beta: document.getElementById("beta-result").value,
    };
    let message = document.getElementById("message-integer-verify").value;

    let data = {
        publicKey: publicKey,
        message: message,
        signature: signature,
    };

    console.log(data);

    fetch(`${window.env.API}` + "/signature_scheme/elgamal/verify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            document.getElementById("result-signature-verify").value =
                result.is_valid;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

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
function autoGenCrypSys() {
    let p = document.getElementById("p-input");
    let a = document.getElementById("a-input");

    fetch(`${window.env.API}` + "/prime/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ bit_length: 128 }),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            p.value = result.prime;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    fetch(`${window.env.API}` + "/prime/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ bit_length: 10 }),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            a.value = result.prime;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
