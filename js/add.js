document.getElementById("workForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const formData = {
      companyname: document.getElementById("companyname").value,
      jobtitle: document.getElementById("jobtitle").value,
      location: document.getElementById("location").value,
      startdate: document.getElementById("startdate").value,
      enddate: document.getElementById("enddate").value,
      description: document.getElementById("description").value,
    };
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/workexperience`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Något gick fel vid sparandet!");
      }
  
      document.getElementById("message").textContent = "Erfarenhet tillagd!";
      document.getElementById("workForm").reset();
    } catch (error) {
      document.getElementById("message").textContent = error.message;
    }
  });