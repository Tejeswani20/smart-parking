let occupiedSlots = 0;
let revenue = 0;

function parkVehicle() {

    const rfid = document.getElementById("rfid").value.trim();
    const vehicle = document.getElementById("vehicleNumber").value.trim();
    const message = document.getElementById("message");

    if (rfid === "" || vehicle === "") {
        message.innerText = "⚠️ Please enter RFID number and vehicle number.";
        message.style.color = "red";
        return;
    }

    // Find first available slot
    let selectedSlot = null;

    for (let i = 1; i <= 8; i++) {

        const slot = document.getElementById("slot" + i);

        if (slot.classList.contains("available-slot")) {
            selectedSlot = slot;
            break;
        }
    }

    if (selectedSlot === null) {
        message.innerText = "❌ No parking slots available.";
        message.style.color = "red";
        return;
    }

    // Change slot to occupied
    selectedSlot.classList.remove("available-slot");
    selectedSlot.classList.add("occupied-slot");

    selectedSlot.querySelector("p").innerText = "OCCUPIED 🚗";

    occupiedSlots++;

    document.getElementById("occupiedSlots").innerText = occupiedSlots;
    document.getElementById("availableSlots").innerText =
        8 - occupiedSlots;

    // Current time
    const time = new Date().toLocaleTimeString();

    // Add parking history
    const history = document.getElementById("history");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${rfid}</td>
        <td>${vehicle}</td>
        <td>${selectedSlot.querySelector("h3").innerText}</td>
        <td>${time}</td>
    `;

    history.appendChild(row);

    // Demo parking fee
    revenue += 20;

    document.getElementById("revenue").innerText =
        "₹" + revenue;

    message.innerText =
        "✅ Vehicle parked successfully in " +
        selectedSlot.querySelector("h3").innerText;

    message.style.color = "green";

    // Clear inputs
    document.getElementById("rfid").value = "";
    document.getElementById("vehicleNumber").value = "";
}