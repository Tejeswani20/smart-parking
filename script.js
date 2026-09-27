let occupiedSlots = 0;
let revenue = 0;

let parkedVehicles = {};

function parkVehicle() {

    const rfid = document.getElementById("rfid").value.trim();
    const vehicle = document.getElementById("vehicleNumber").value.trim();
    const message = document.getElementById("message");

    if (rfid === "" || vehicle === "") {
        message.innerText = "⚠️ Please enter RFID and vehicle number.";
        message.style.color = "red";
        return;
    }

    if (parkedVehicles[vehicle]) {
        message.innerText = "⚠️ Vehicle is already parked.";
        message.style.color = "red";
        return;
    }

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

    const slotName = selectedSlot.querySelector("h3").innerText;
    const entryTime = new Date();

    selectedSlot.classList.remove("available-slot");
    selectedSlot.classList.add("occupied-slot");

    selectedSlot.querySelector("p").innerText = "OCCUPIED 🚗";

    occupiedSlots++;

    document.getElementById("occupiedSlots").innerText = occupiedSlots;
    document.getElementById("availableSlots").innerText =
        8 - occupiedSlots;

    parkedVehicles[vehicle] = {
        rfid: rfid,
        slot: slotName,
        entryTime: entryTime
    };

    const history = document.getElementById("history");

    const row = document.createElement("tr");

    row.id = "vehicle-" + vehicle;

    row.innerHTML = `
        <td>${rfid}</td>
        <td>${vehicle}</td>
        <td>${slotName}</td>
        <td>${entryTime.toLocaleTimeString()}</td>
    `;

    history.appendChild(row);

    message.innerText =
        "✅ Vehicle parked successfully in " + slotName;

    message.style.color = "green";

    document.getElementById("rfid").value = "";
    document.getElementById("vehicleNumber").value = "";
}


function exitVehicle() {

    const vehicle = document.getElementById("exitVehicle").value.trim();
    const message = document.getElementById("exitMessage");

    if (vehicle === "") {
        message.innerText = "⚠️ Enter vehicle number.";
        message.style.color = "red";
        return;
    }

    const vehicleData = parkedVehicles[vehicle];

    if (!vehicleData) {
        message.innerText = "❌ Vehicle not found.";
        message.style.color = "red";
        return;
    }

    const exitTime = new Date();

    const duration =
        Math.max(
            1,
            Math.ceil(
                (exitTime - vehicleData.entryTime) / (1000 * 60 * 60)
            )
        );

    const fee = duration * 20;

    revenue += fee;

    document.getElementById("revenue").innerText =
        "₹" + revenue;

    const slot = document.getElementById(
        "slot" + vehicleData.slot.substring(1)
    );

    slot.classList.remove("occupied-slot");
    slot.classList.add("available-slot");

    slot.querySelector("p").innerText = "AVAILABLE";

    occupiedSlots--;

    document.getElementById("occupiedSlots").innerText =
        occupiedSlots;

    document.getElementById("availableSlots").innerText =
        8 - occupiedSlots;

    const historyRow =
        document.getElementById("vehicle-" + vehicle);

    if (historyRow) {
        historyRow.remove();
    }

    delete parkedVehicles[vehicle];

    message.innerText =
        "✅ Exit successful! Parking Fee: ₹" + fee;

    message.style.color = "green";

    document.getElementById("exitVehicle").value = "";
}