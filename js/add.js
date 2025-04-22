//  Eventlyssnare för formuläret när man klickar submit
document.getElementById("workForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Så att inte sidan laddas om

    // Hämtar värden från formuläret
  const formData = {
    companyname: document.getElementById("companyname").value,
    jobtitle: document.getElementById("jobtitle").value,
    location: document.getElementById("location").value,
    startdate: document.getElementById("startdate").value,
    enddate: document.getElementById("enddate").value,
    description: document.getElementById("description").value,
  };

  try {
    // Skickar värdena till webbtjänsten/API:t i JSON-format
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  
    // Läser svaret
    const data = await response.json(); 
    
    // Visa felmeddelande  - om något gått fel
    if (!response.ok) {
      const errorMessage =
        data.error ||
        (data.errors ? data.errors.join(" ") : "Något gick fel vid sparandet!");
      throw new Error(errorMessage);
    }
    
    // Visar ett meddelandeom allt ok och nollställer formuläret
    document.getElementById("message").textContent = "Erfarenhet tillagd!";
    document.getElementById("workForm").reset();
  } catch (error) {
    // Visar felmeddelande om något gick fel
    document.getElementById("message").textContent = error.message;
  } 
});