let buildForm = document.getElementById("build-form");

// Add an event listener to the form
buildForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Create a FormData object to gather form data
    let p = document.getElementById("p-input").value;
    let q = document.getElementById("q-input").value;
    let e = document.getElementById("e-input").value;

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

function encryptText() {
    let plainText = document.getElementById("plain-integer-encrypt").value;
    let publicKey = {
        n: document.getElementById("n-result").value,
        e: document.getElementById("e-result").value,
    };

    let data = {
        publicKey: publicKey,
        message: plainText,
    };

    console.log(data);

    fetch("http://localhost:8000/crypto_system/rsa/encrypt", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            document.getElementById("cipher-integer-encrypt").value = result.encrypted_message;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}


function convertIntegerToText(integer) {
    let result = '';
    let num = BigInt(integer);
    while (num > 0) {
        result = String.fromCharCode(Number(num % BigInt(256))) + result;
        num = num / BigInt(256);
    }
    return result;
}


function decryptText() {
    let cipherText = document.getElementById("cipher-integer-decrypt").value;
    let privateKey = {
        n: document.getElementById("n-result").value,
        d: document.getElementById("d-result").value,
    };

    let data = {
        privateKey: privateKey,
        encrypted_message: cipherText,
    };

    console.log(data);

    fetch("http://localhost:8000/crypto_system/rsa/decrypt", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            document.getElementById("plain-integer-decrypt").value = result.decrypted_message;
            document.getElementById("plain-alphabet-decrypt").value = convertIntegerToText(result.decrypted_message);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function autoGenCrypSys() {
    let p = document.getElementById("p-input");
    let q = document.getElementById("q-input");
    let e = document.getElementById("e-input");

    p.value = 2614159;
    q.value = 4695947;
    // e.value = 17;
}