async function fetchDataFromAPI() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyxmSpHry0izzjK4z1Va8vRsMXfz95om48-5HPoGhUVWOefcZZoldGKacs6wVGFY3yY/exec?action=getDropdown"
    );
    const jsonData = await response.json();
    console.log(jsonData);
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
    const datalist1 = document.getElementById("customer");
    const datalist2 = document.getElementById("driver");
    const data1 = jsonData.data1;
    const data2 = jsonData.data2;
    console.log(data1);
    console.log(data2);

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

document.getElementById("myForm").addEventListener("submit", function (event) {
  // Mencegah perilaku default formulir
  event.preventDefault();

  // Mendapatkan data formulir
  var formData = new FormData(this);

  // Mengirim data ke API menggunakan fetch
  fetch(
    "https://script.google.com/macros/s/AKfycbyxmSpHry0izzjK4z1Va8vRsMXfz95om48-5HPoGhUVWOefcZZoldGKacs6wVGFY3yY/exec",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Gagal mengirim data");
      }
      return response.json();
    })
    .then((data) => {
      // Handle respons dari API (jika diperlukan)
      console.log("Sukses mengirim data:", data);
    })
    .catch((error) => {
      // Handle kesalahan
      console.error("Error:", error);
    });
});
