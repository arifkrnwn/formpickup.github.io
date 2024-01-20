async function fetchDataFromAPI() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxo2CAGPtgDEoHrPkV-kga0TC83FKu7u47Odp5UC09P39yP-Hn6U2Gzy0on8Uj3jueL/exec?action=getDropdown"
    );
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function fillDatalists() {
  const jsonData = await fetchDataFromAPI();

  if (jsonData) {
    // Mengambil datalist dan data yang diperlukan
    const datalist1 = document.getElementById("customerpu");
    const datalist2 = document.getElementById("driver");
    const data1 = jsonData.data1;
    const data2 = jsonData.data2;

    // Mengisi datalist pertama
    data1.forEach((item) => {
      const option = document.createElement("option");
      option.value = item[0];
      datalist1.appendChild(option);
    });

    // Mengisi datalist kedua
    data2.forEach((item) => {
      const option = document.createElement("option");
      option.value = item[0];
      datalist2.appendChild(option);
    });
  }
}

// Panggil fungsi untuk mengisi datalist saat halaman dimuat
window.onload = fillDatalists;

const scriptURL =
  "https://script.google.com/macros/s/AKfycbxo2CAGPtgDEoHrPkV-kga0TC83FKu7u47Odp5UC09P39yP-Hn6U2Gzy0on8Uj3jueL/exec";
const form = document.forms["formpickup"];
const btnKirim = document.querySelector(".btn-kirim");
const btnLoading = document.querySelector(".btn-loading");
const myalert = document.querySelector(".alert");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  btnLoading.classList.toggle("d-none");
  btnKirim.classList.toggle("d-none");
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      btnKirim.classList.toggle("d-none");
      btnLoading.classList.toggle("d-none");
      myalert.classList.toggle("d-none");

      form.reset();

      console.log("Success!", response);
    })
    .catch((error) => console.error("Error!", error.message));
});
