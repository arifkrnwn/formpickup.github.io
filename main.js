async function fetchDataFromAPI() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyxmSpHry0izzjK4z1Va8vRsMXfz95om48-5HPoGhUVWOefcZZoldGKacs6wVGFY3yY/exec?action=getDropdown"
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
    const datalist1 = document.getElementById("customer");
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

document
  .getElementById("formpickup")
  .addEventListener("submit", async function (event) {
    // Prevent default form submission
    event.preventDefault();

    // Get form data
    const formData = new FormData(this);

    try {
      // Send data to the API using fetch
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyxmSpHry0izzjK4z1Va8vRsMXfz95om48-5HPoGhUVWOefcZZoldGKacs6wVGFY3yY/exec",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Gagal mengirim data"); // Throw error for non-200 status codes
      }

      // Handle successful response
      const responseData = await response.json();
      console.log(responseData); // Log response data for debugging

      // Example: Display a success message to the user
      alert("Data berhasil dikirim!");
    } catch (error) {
      // Handle errors
      console.error("Error:", error); // Log error for debugging

      // Example: Display an error message to the user
      alert("Terjadi kesalahan saat mengirim data");
    }
  });
