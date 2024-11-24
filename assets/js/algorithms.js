
let aksForm = document.getElementById("aks-form");

// Add an event listener to the form
aksForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission
    // Show the loading spinner
    document.getElementById("loading-spinner-aks").style.display = "block";
    // Hide the result divs
    document.getElementById("is-prime-aks").style.display = "none";
    document.getElementById("not-prime-aks").style.display = "none";
    // Get the input value
    let p = document.getElementById("p-input-aks").value;
    // Create the data object
    let data = {
        number: p,
    };
    console.log(data);
    // Send the form data using fetch
    fetch("http://localhost:8000/prime/aks/check", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        }) // Parse the response as JSON
        .then((result) => {
            console.log("Success:", data);
            // console.log(result);
            document.getElementById("loading-spinner-aks").style.display = "none";
            // Handle the response data here (e.g., display a message)
            if (result.isPrime) {
                document.getElementById("is-prime-aks").style.display = "block";
                document.getElementById("not-prime-aks").style.display = "none";
            } else {
                document.getElementById("is-prime-aks").style.display = "none";
                document.getElementById("not-prime-aks").style.display = "block";
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});



let millerRabbinForm = document.getElementById("miller-rabbin-form");

// Add an event listener to the form
millerRabbinForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission
    // Show the loading spinner
    document.getElementById("loading-spinner-miller-rabbin").style.display = "block";
    // Hide the result divs
    document.getElementById("is-prime-miller-rabbin").style.display = "none";
    document.getElementById("not-prime-miller-rabbin").style.display = "none";
    // Get the input value
    let p = document.getElementById("p-input-miller-rabbin").value;
    // Create the data object
    let data = {
        number: p,
    };
    console.log(data);
    // Send the form data using fetch
    fetch("http://localhost:8000/prime/miller_rabbin/check", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        }) // Parse the response as JSON
        .then((result) => {
            console.log("Success:", data);
            // console.log(result);
            document.getElementById("loading-spinner-miller-rabbin").style.display = "none";
            // Handle the response data here (e.g., display a message)
            if (result.isPrime) {
                document.getElementById("is-prime-miller-rabbin").style.display = "block";
                document.getElementById("not-prime-miller-rabbin").style.display = "none";
            } else {
                document.getElementById("is-prime-miller-rabbin").style.display = "none";
                document.getElementById("not-prime-miller-rabbin").style.display = "block";
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});

let generatePrimeForm = document.getElementById("generate-prime-form");

// Add an event listener to the form
generatePrimeForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission
    // Show the loading spinner
    document.getElementById("loading-spinner-generate-prime").style.display = "block";
    // Get the input value
    let bits = document.getElementById("bits-input").value;
    // Create the data object
    let data = {
        bit_length: bits,
    };
    console.log(data);
    // Send the form data using fetch
    fetch("http://localhost:8000/prime/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        }) // Parse the response as JSON
        .then((result) => {
            console.log("Success:", data);
            // console.log(result);
            document.getElementById("loading-spinner-generate-prime").style.display = "none";
            // Handle the response data here (e.g., display a message)
            document.getElementById("prime-result").value = result.prime;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});

function generateRelativePrime() {
    // Show the loading spinner
    document.getElementById("loading-spinner-relative-prime").style.display = "block";
    // Get the input value
    let p = document.getElementById("relative-prime-input").value;

    // Send the form data using fetch
    fetch(`http://localhost:8000/prime/generate_relative_prime?p=${p}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        }) // Parse the response as JSON
        .then((result) => {
            // console.log(result);
            document.getElementById("loading-spinner-relative-prime").style.display = "none";
            // Handle the response data here (e.g., display a message)
            document.getElementById("relative-prime-result").value = result.relative_prime;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

// Define the copyToClipboard function
function copyToClipboard(elementId) {
    var copyText = document.getElementById(elementId);
    copyText.select();
    // copyText.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    // alert("Copied the text: " + copyText.value);
}