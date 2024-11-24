let buildForm = document.getElementById("build-form");

// Add an event listener to the form
buildForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Create a FormData object to gather form data
    let p = document.getElementById("p-input").value;
    let q = document.getElementById("q-input").value;

    data = {
        p: p,
        q: q,
    };

    console.log(data);

    // Send the form data using fetch
    fetch(`${window.env.API}` + "/signature_scheme/rsa/generate_key", {
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
            document.getElementById("b-result").value = result.publicKey.e;
            document.getElementById("a-result").value = result.privateKey.d;
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

function hash(input) {
    let hash = 0;
    if (input.length == 0) {
        return hash;
    }
    for (let i = 0; i < input.length; i++) {
        let char = input.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return hash;
}
function sign() {
    let plainText = document.getElementById("plain-integer-encrypt").value;
    let privateKey = {
        n: document.getElementById("n-result").value,
        d: document.getElementById("a-result").value,
    };

    let data = {
        privateKey: privateKey,
        message: plainText,
    };

    console.log(data);

    fetch(`${window.env.API}` + "/signature_scheme/rsa/sign", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            document.getElementById("cipher-integer-encrypt").value =
                result.signature.value;
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
    let message = document.getElementById("message-integer-verify").value;
    let signature = document.getElementById("message-signature-verify").value;
    let publicKey = {
        n: document.getElementById("n-result").value,
        e: document.getElementById("b-result").value,
    };

    let data = {
        publicKey: publicKey,
        message: message,
        signature: {
            value: signature,
        },
    };

    console.log(data);

    fetch(`${window.env.API}` + "/signature_scheme/rsa/verify", {
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

function autoGenCrypSys() {
    let p = document.getElementById("p-input");
    let q = document.getElementById("q-input");

    p.value = 2614159;
    q.value = 4695947;

    fetch(`${window.env.API}` + "/prime/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            bit_length: 128,
        }),
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
        body: JSON.stringify({
            bit_length: 128,
        }),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            q.value = result.prime;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
